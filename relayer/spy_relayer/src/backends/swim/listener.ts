/** The swim backend is relaying payload 3 with swim payload token bridge messages only */
import {
  ChainId,
  CHAIN_ID_SOLANA,
  uint8ArrayToHex,
  tryHexToNativeString,
  getEmitterAddressEth,
  getEmitterAddressSolana,
  getEmitterAddressTerra,
  tryNativeToHexString,
  CHAIN_ID_ETH,
  isTerraChain,
} from "@certusone/wormhole-sdk";
import { getListenerEnvironment } from "../../configureEnv";
import { getScopedLogger, ScopedLogger } from "../../helpers/logHelper";
import {
  ParsedVaa,
  parseVaaTyped,
  ParsedTransferWithArbDataPayload,
  ParsedSwimData,
} from "../../listener/validation";
import { TypedFilter, Listener } from "../definitions";
import {
  initPayloadWithVAA,
  storeInRedis,
  checkQueue,
  StoreKey,
  storeKeyFromParsedVAA,
  storeKeyToJson,
  StorePayload,
  storePayloadToJson,
  getCurrentRate
} from "../../helpers/redisHelper";
import { parseSwimPayload, parseTransferWithArbPayload } from "../../utils/swim";

async function encodeEmitterAddress(
  myChainId: ChainId,
  emitterAddressStr: string
): Promise<string> {
  if (myChainId === CHAIN_ID_SOLANA) {
    return await getEmitterAddressSolana(emitterAddressStr);
  }

  if (isTerraChain(myChainId)) {
    return await getEmitterAddressTerra(emitterAddressStr);
  }

  return getEmitterAddressEth(emitterAddressStr);
}

/** Listener for payload 3 with swim payload token bridge messages only */
export class SwimListener implements Listener {
  logger: ScopedLogger;

  /**
   * @throws - when the listener environment setup fails
   */
  constructor() {
    this.logger = getScopedLogger(["SwimListener"]);
  }

  /** Verify this payload is version 3. */
  verifyIsPayloadV3(parsedVaa: ParsedVaa<Uint8Array>): boolean {
    if (parsedVaa.payload[0] !== 3) {
      this.logger.debug("Specified vaa is not payload version 3.");
      return false;
    }
    return true;
  }

  /** Verify that we are only getting messages that are sending to our routing contract addresses */
  verifyToSwimContracts(parsedVaaPayload: ParsedTransferWithArbDataPayload<ParsedSwimData>): boolean {
    let env = getListenerEnvironment();
    const expectedSwimEvmContractAddress = tryNativeToHexString(
      env.swimEvmContractAddress, CHAIN_ID_ETH
    );
    const expectedSwimSolanaContractAddress = tryNativeToHexString(
      env.swimSolanaContractAddress.toString(), CHAIN_ID_SOLANA
    )
    const isToEvm = parsedVaaPayload.targetAddress == expectedSwimEvmContractAddress;
    const isToSolana = parsedVaaPayload.targetAddress == expectedSwimSolanaContractAddress;
    return isToEvm || isToSolana;
  }

  /** Verify the the token in this payload in the approved token list. */
  verifyIsApprovedToken(payload: ParsedTransferWithArbDataPayload<ParsedSwimData>): boolean {
    let originAddressNative: string;
    let env = getListenerEnvironment();
    try {
      originAddressNative = tryHexToNativeString(
        payload.originAddress,
        payload.originChain
      );
    } catch (e: any) {
      return false;
    }

    // Token is in the SUPPORTED_TOKENS env var config
    const isApprovedToken = env.supportedTokens.find((token) => {
      return (
        originAddressNative &&
        token.address.toLowerCase() === originAddressNative.toLowerCase() &&
        token.chainId === payload.originChain
      );
    });

    if (!isApprovedToken) {
      this.logger.debug("Token transfer is not for an approved token.");
      return false;
    }

    return true;
  }

  verifyIsPropellerEnabled(payload: ParsedTransferWithArbDataPayload<ParsedSwimData>): boolean {
    return payload.extraPayload.propellerEnabled;
  }

  /**
   * Rate limit filter for xHack workshop, returns true if numRequests has exceed request limit
   * @param payload
   * @returns
   */
  async verifyIsRateLimited(payload: ParsedTransferWithArbDataPayload<ParsedSwimData>): Promise<boolean> {
    let env = getListenerEnvironment();
    if (env.requestLimit < 0) {
      return true;
    }

    const baseKey = payload.extraPayload.targetChainRecipient;
    const currentNumRequests = await getCurrentRate(baseKey);
    this.logger.debug("currentNumRequests: " + currentNumRequests);

    return currentNumRequests >= 0 ? currentNumRequests < env.requestLimit : false;
  }

  /**
   * Sanity check the maxSwimUSDFee field.
   * To prevent exploits, we automatically reject any payload with a maxSwimUSDFee that is less than 0.01 swimUSD (10000)
   *
   * TODO: add more fee checks
   * The engine ensures `maxPropellerFee` is fair if it can cover the following expenses:
      1. Service fee
      2. Gas kickstart fee (needs to be converted from native gas to swimUSD)
      3. Gas remuneration (needs to be converted from native gas to swimUSD)
   *
   */
  verifyMaxSwimUSDFeeIsValid(payload: ParsedTransferWithArbDataPayload<ParsedSwimData>): boolean {
    const minimumSwimUSDFee = 10000n;
    if (payload.extraPayload.maxSwimUSDFee <= minimumSwimUSDFee) {
      this.logger.debug(`Payload rejected, maxSwimUSDFee ${payload.extraPayload.maxSwimUSDFee} is less than ${minimumSwimUSDFee}`);
    }
    return payload.extraPayload.maxSwimUSDFee > 10000n;
  }

  /** Parses a raw VAA byte array
   *
   * @throws when unable to parse the VAA
   */
  public async parseVaa(rawVaa: Uint8Array): Promise<ParsedVaa<Uint8Array>> {
    let parsedVaa: ParsedVaa<Uint8Array> | null = null;

    try {
      parsedVaa = await parseVaaTyped(rawVaa);
    } catch (e) {
      this.logger.error("Encountered error while parsing raw VAA " + e);
    }
    if (!parsedVaa) {
      throw new Error("Unable to parse the specified VAA.");
    }

    return parsedVaa;
  }

  /** Parse the VAA and return the payload nicely typed */
  public async parseTransferWithSwimPayload(
    rawPayload: Uint8Array
  ): Promise<ParsedTransferWithArbDataPayload<ParsedSwimData>> {
    let parsedPayload: any;
    let parsedSwimPayload: any;
    try {
      parsedPayload = parseTransferWithArbPayload(Buffer.from(rawPayload));
    } catch (e) {
      this.logger.error("Encountered error while parsing vaa payload" + e);
    }

    if (!parsedPayload) {
      const error = "Failed to parse the transfer with data payload"
      this.logger.debug(error);
      throw new Error(error);
    }

    try {
      parsedSwimPayload = parseSwimPayload(Buffer.from(parsedPayload.extraPayload));
    } catch (e) {
      this.logger.error("Encountered error while parsing swim payload from arbitrary data in payload 3" + e);
    }

    if (!parseSwimPayload) {
      const error = "Encountered error while parsing swim payload from arbitrary data in payload 3";
      this.logger.debug(error);
      throw new Error(error);
    }
    return { ...parsedPayload, extraPayload: parsedSwimPayload};
  }

  /** Verify this is a VAA we want to relay. */
  public async validate(
    rawVaa: Uint8Array
  ): Promise<ParsedVaa<ParsedTransferWithArbDataPayload<ParsedSwimData>> | string> {
    let parsedVaa = await this.parseVaa(rawVaa);
    let parsedPayload: ParsedTransferWithArbDataPayload<ParsedSwimData>;

    // Verify this is actually a token bridge transfer with payload
    if (!this.verifyIsPayloadV3(parsedVaa)) {
      return "Wrong payload type";
    }
    try {
      parsedPayload = await this.parseTransferWithSwimPayload(parsedVaa.payload);
    } catch (e: any) {
      return "Payload parsing failure";
    }

    // Verify we want to relay this request
    if (
      !this.verifyIsApprovedToken(parsedPayload) ||
      !this.verifyToSwimContracts(parsedPayload) ||
      !this.verifyIsPropellerEnabled(parsedPayload) ||
      !this.verifyMaxSwimUSDFeeIsValid(parsedPayload) ||
      !(await this.verifyIsRateLimited(parsedPayload))
    ) {
      return "Validation failed for VAA sequence " + parsedVaa.sequence + " from chainId " + parsedVaa.emitterChain;
    }

    // Great success!
    return { ...parsedVaa, payload: parsedPayload };
  }

  /** Get spy filters for all emitters we care about */
  public async getEmitterFilters(): Promise<TypedFilter[]> {
    let env = getListenerEnvironment();
    let filters: {
      emitterFilter: { chainId: ChainId; emitterAddress: string };
    }[] = [];
    for (let i = 0; i < env.spyServiceFilters.length; i++) {
      const filter = env.spyServiceFilters[i];
      this.logger.info(
        "Getting spyServiceFilter[" +
          i +
          "]: chainId = " +
          filter.chainId +
          ", emmitterAddress = [" +
          filter.emitterAddress +
          "]"
      );
      const typedFilter = {
        emitterFilter: {
          chainId: filter.chainId as ChainId,
          emitterAddress: await encodeEmitterAddress(
            filter.chainId,
            filter.emitterAddress
          ),
        },
      };
      this.logger.info(
        "adding filter: chainId: [" +
          typedFilter.emitterFilter.chainId +
          "], emitterAddress: [" +
          typedFilter.emitterFilter.emitterAddress +
          "]"
      );
      filters.push(typedFilter);
    }
    return filters;
  }

  /** Process and validate incoming VAAs from the spy. */
  public async process(rawVaa: Uint8Array): Promise<void> {
    // TODO: Use a type guard function to verify the ParsedVaa type too?
    const validationResults: ParsedVaa<ParsedTransferWithArbDataPayload<ParsedSwimData>> | string =
      await this.validate(rawVaa);

    if (typeof validationResults === "string") {
      this.logger.debug(`Skipping spied request: ${validationResults}`);
      return;
    }
    const parsedVaa: ParsedVaa<ParsedTransferWithArbDataPayload<ParsedSwimData>> = validationResults;

    const redisKey: StoreKey = storeKeyFromParsedVAA(parsedVaa);
    const isQueued = await checkQueue(storeKeyToJson(redisKey));
    if (isQueued) {
      this.logger.error(`Not storing in redis: ${isQueued}`);
      return;
    }

    this.logger.info(
      "forwarding vaa to relayer: emitter: [" +
        parsedVaa.emitterChain +
        ":" +
        uint8ArrayToHex(parsedVaa.emitterAddress) +
        "], seqNum: " +
        parsedVaa.sequence +
        ", payload: origin: [" +
        parsedVaa.payload.originAddress +
        ":" +
        parsedVaa.payload.originAddress +
        "], target: [" +
        parsedVaa.payload.targetChain +
        ":" +
        parsedVaa.payload.targetAddress +
        "],  amount: " +
        parsedVaa.payload.amount +
        "]"
    );

    const redisPayload: StorePayload = initPayloadWithVAA(
      uint8ArrayToHex(rawVaa)
    );

    await this.store(redisKey, redisPayload);
  }

  public async store(key: StoreKey, payload: StorePayload): Promise<void> {
    let serializedKey = storeKeyToJson(key);
    let serializedPayload = storePayloadToJson(payload);

    this.logger.debug(
      `storing: key: [${key.chain_id}/${key.emitter_address}/${key.sequence}], payload: [${serializedPayload}]`
    );

    return await storeInRedis(serializedKey, serializedPayload);
  }
}