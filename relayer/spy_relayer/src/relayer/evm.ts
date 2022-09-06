import {
  CHAIN_ID_CELO,
  CHAIN_ID_FANTOM,
  CHAIN_ID_KLAYTN,
  CHAIN_ID_POLYGON,
  getIsTransferCompletedEth,
  hexToUint8Array,
} from "@certusone/wormhole-sdk";
import { ethers } from "ethers";
import { ChainConfigInfo } from "../configureEnv";
import { getScopedLogger, ScopedLogger } from "../helpers/logHelper";
import { PromHelper } from "../helpers/promHelpers";
import { CeloProvider, CeloWallet } from "@celo-tools/celo-ethers-wrapper";
import { Routing__factory } from "@swim-io/evm-contracts";

export function newProvider(
  url: string,
  batch: boolean = false
): ethers.providers.JsonRpcProvider | ethers.providers.JsonRpcBatchProvider {
  // only support http(s), not ws(s) as the websocket constructor can blow up the entire process
  // it uses a nasty setTimeout(()=>{},0) so we are unable to cleanly catch its errors
  if (url.startsWith("http")) {
    if (batch) {
      return new ethers.providers.JsonRpcBatchProvider(url);
    }
    return new ethers.providers.JsonRpcProvider(url);
  }
  throw new Error("url does not start with http/https!");
}

export async function relayEVM(
  chainConfigInfo: ChainConfigInfo,
  signedVAA: string,
  checkOnly: boolean,
  walletPrivateKey: string,
  relayLogger: ScopedLogger,
  metrics: PromHelper,
  swimEvmContractAddress: string,
) {
  const logger = getScopedLogger(
    ["evm", chainConfigInfo.chainName],
    relayLogger
  );
  const signedVaaArray = hexToUint8Array(signedVAA);
  let provider = undefined;
  let signer = undefined;
  if (chainConfigInfo.chainId === CHAIN_ID_CELO) {
    provider = new CeloProvider(chainConfigInfo.nodeUrl);
    await provider.ready;
    signer = new CeloWallet(walletPrivateKey, provider);
  } else {
    provider = newProvider(chainConfigInfo.nodeUrl);
    signer = new ethers.Wallet(walletPrivateKey, provider);
  }

  logger.debug("Checking to see if vaa has already been redeemed.");
  const alreadyRedeemed = await getIsTransferCompletedEth(
    chainConfigInfo.tokenBridgeAddress,
    provider,
    signedVaaArray
  );

  if (alreadyRedeemed) {
    logger.info("VAA has already been redeemed!");
    return { redeemed: true, result: "already redeemed" };
  }
  if (checkOnly) {
    return { redeemed: false, result: "not redeemed" };
  }

  logger.info("Will redeem using pubkey: %s", await signer.getAddress());
  logger.debug("Redeeming.");
  let overrides = {};
  if (chainConfigInfo.chainId === CHAIN_ID_POLYGON) {
    // look, there's something janky with Polygon + ethers + EIP-1559
    let feeData = await provider.getFeeData();
    overrides = {
      maxFeePerGas: feeData.maxFeePerGas?.mul(50) || undefined,
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas?.mul(50) || undefined,
    };
  } else if (chainConfigInfo.chainId === CHAIN_ID_KLAYTN || chainConfigInfo.chainId === CHAIN_ID_FANTOM) {
    // Klaytn and Fantom require specifying gasPrice
    overrides = { gasPrice: (await signer.getGasPrice()).toString() };
  }
  // TODO add gasLimit from env var here
  logger.debug("signer address:");
  logger.debug(signer.address);
  logger.debug(await signer.getBalance());
  logger.debug("swim evm contract address");
  logger.debug(swimEvmContractAddress);

  overrides = { ...overrides, gasLimit: ethers.BigNumber.from("2000000") };

  const routing_contract = Routing__factory.connect(
    swimEvmContractAddress,
    signer
  );

  // TODO fill out memo
  const tx = await routing_contract.propellerIn(
    signedVaaArray,
    //overrides
  );

  logger.info("waiting for tx hash: %s", tx.hash);
  const receipt = await tx.wait();

  // Checking getIsTransferCompletedEth can be problematic if we get
  // load balanced to a node that is behind the block of our accepted tx
  // The auditor worker should confirm that our tx was successful
  const success = true;

  if (provider instanceof ethers.providers.WebSocketProvider) {
    await provider.destroy();
  }

  logger.info("success: %s tx hash: %s", success, receipt.transactionHash);
  metrics.incSuccesses(chainConfigInfo.chainId);
  return { redeemed: success, result: receipt };
}
