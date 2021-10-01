# This Tiltfile contains the deployment and build config for the Wormhole devnet.
#
#  We use Buildkit cache mounts and careful layering to avoid unnecessary rebuilds - almost
#  all source code changes result in small, incremental rebuilds. Dockerfiles are written such
#  that, for example, changing the contract source code won't cause Solana itself to be rebuilt.
#

load("ext://namespace", "namespace_create", "namespace_inject")
load("ext://secret", "secret_yaml_generic")

trigger_mode(TRIGGER_MODE_MANUAL)

allow_k8s_contexts("ci")

# Disable telemetry by default
analytics_settings(False)

# Runtime configuration
config.define_bool("ci", False, "We are running in CI")

config.define_string("num", False, "Number of guardian nodes to run")

# You do not usually need to set this argument - this argument is for debugging only. If you do use a different
# namespace, note that the "wormhole" namespace is hardcoded in tests and don't forget specifying the argument
# when running "tilt down".
#
config.define_string("namespace", False, "Kubernetes namespace to use")

# These arguments will enable writing Guardian events to a cloud BigTable instance.
# Writing to a cloud BigTable is optional. These arguments are not required to run the devnet.
config.define_string("gcpProject", False, "GCP project ID for BigTable persistence")
config.define_string("bigTableKeyPath", False, "Path to BigTable json key file")

# Components
config.define_bool("pyth", False, "Enable Pyth-to-Wormhole component")
config.define_bool("explorer", False, "Enable explorer component")
config.define_bool("bridge_ui", False, "Enable bridge UI component")

cfg = config.parse()
num_guardians = int(cfg.get("num", "1"))
namespace = cfg.get("namespace", "wormhole")
gcpProject = cfg.get("gcpProject", "local-dev")
bigTableKeyPath = cfg.get("bigTableKeyPath", "./event_database/devnet_key.json")
ci = cfg.get("ci", False)
pyth = cfg.get("pyth", ci)
explorer = cfg.get("explorer", ci)
bridge_ui = cfg.get("bridge_ui", ci)

# namespace

if not ci:
    namespace_create(namespace)

def k8s_yaml_with_ns(objects):
    return k8s_yaml(namespace_inject(objects, namespace))

# protos

proto_deps = ["./proto", "./generate-protos.sh", "buf.yaml", "buf.gen.yaml"]

local_resource(
    name = "proto-gen",
    deps = proto_deps,
    cmd = "tilt docker build -- --target go-export -f Dockerfile.proto -o type=local,dest=node .",
    env = {"DOCKER_BUILDKIT": "1"},
)

local_resource(
    name = "proto-gen-web",
    deps = proto_deps,
    resource_deps = ["proto-gen"],
    cmd = "tilt docker build -- --target node-export -f Dockerfile.proto -o type=local,dest=. .",
    env = {"DOCKER_BUILDKIT": "1"},
)

# wasm

local_resource(
    name = "wasm-gen",
    deps = ["solana"],
    dir = "solana",
    cmd = "tilt docker build -- -f Dockerfile.wasm -o type=local,dest=.. .",
    env = {"DOCKER_BUILDKIT": "1"},
)

# node

if explorer:
    k8s_yaml_with_ns(
        secret_yaml_generic(
            "node-bigtable-key",
            from_file = "bigtable-key.json=" + bigTableKeyPath,
        ),
    )

docker_build(
    ref = "guardiand-image",
    context = "node",
    dockerfile = "node/Dockerfile",
)

def build_node_yaml():
    node_yaml = read_yaml_stream("devnet/node.yaml")

    for obj in node_yaml:
        if obj["kind"] == "StatefulSet" and obj["metadata"]["name"] == "guardian":
            obj["spec"]["replicas"] = num_guardians
            container = obj["spec"]["template"]["spec"]["containers"][0]
            if container["name"] != "guardiand":
                fail("container 0 is not guardiand")
            container["command"] += ["--devNumGuardians", str(num_guardians)]

            if explorer:
                container["command"] += [
                    "--bigTablePersistenceEnabled",
                    "--bigTableInstanceName",
                    "wormhole",
                    "--bigTableTableName",
                    "v2Events",
                    "--bigTableKeyPath",
                    "/tmp/mounted-keys/bigtable-key.json",
                    "--bigTableGCPProject",
                    gcpProject,
                ]

    return encode_yaml_stream(node_yaml)

k8s_yaml_with_ns(build_node_yaml())

k8s_resource("guardian", resource_deps = ["proto-gen", "solana-devnet"], port_forwards = [
    port_forward(6060, name = "Debug/Status Server [:6060]"),
    port_forward(7070, name = "Public gRPC [:7070]"),
    port_forward(7071, name = "Public REST [:7071]"),
    port_forward(2345, name = "Debugger [:2345]"),
])

# solana client cli (used for devnet setup)

docker_build(
    ref = "bridge-client",
    context = ".",
    only = ["./proto", "./solana", "./ethereum", "./clients"],
    dockerfile = "Dockerfile.client",
    # Ignore target folders from local (non-container) development.
    ignore = ["./solana/*/target"],
)

# solana smart contract

docker_build(
    ref = "solana-contract",
    context = "solana",
    dockerfile = "solana/Dockerfile",
)

# solana local devnet

k8s_yaml_with_ns("devnet/solana-devnet.yaml")

k8s_resource(
    "solana-devnet",
    resource_deps = ["wasm-gen"],
    port_forwards = [
        port_forward(8899, name = "Solana RPC [:8899]"),
        port_forward(8900, name = "Solana WS [:8900]"),
        port_forward(9000, name = "Solana PubSub [:9000]"),
    ],
)

# eth devnet

docker_build(
    ref = "eth-node",
    context = "./ethereum",
    dockerfile = "./ethereum/Dockerfile",

    # ignore local node_modules (in case they're present)
    ignore = ["./ethereum/node_modules"],

    # sync external scripts for incremental development
    # (everything else needs to be restarted from scratch for determinism)
    #
    # This relies on --update-mode=exec to work properly with a non-root user.
    # https://github.com/tilt-dev/tilt/issues/3708
    live_update = [
        sync("./ethereum/src", "/home/node/app/src"),
    ],
)

if pyth:
    # pyth autopublisher
    docker_build(
        ref = "pyth",
        context = ".",
        dockerfile = "third_party/pyth/Dockerfile.pyth",
    )
    k8s_yaml_with_ns("./devnet/pyth.yaml")

    k8s_resource("pyth", resource_deps = ["solana-devnet"])

    # pyth2wormhole client autoattester
    docker_build(
        ref = "p2w-attest",
        context = ".",
        only = ["./solana", "./third_party"],
        dockerfile = "./third_party/pyth/Dockerfile.p2w-attest",
        ignore = ["./solana/*/target"],
    )

    k8s_yaml_with_ns("devnet/p2w-attest.yaml")
    k8s_resource(
        "p2w-attest",
        resource_deps = ["solana-devnet", "pyth", "guardian"],
        port_forwards = [],
    )

k8s_yaml_with_ns("devnet/eth-devnet.yaml")

k8s_resource("eth-devnet", port_forwards = [
    port_forward(8545, name = "Ganache RPC [:8545]"),
])

k8s_resource("eth-devnet2", port_forwards = [
    port_forward(8546, name = "Ganache RPC [:8546]"),
])

if bridge_ui:

    docker_build(
        ref = "bridge-ui",
        context = ".",
        only = ["./ethereum", "./sdk", "./bridge_ui"],
        dockerfile = "bridge_ui/Dockerfile",
        live_update = [
            sync("./bridge_ui/src", "/app/bridge_ui/src"),
        ],
    )

    k8s_yaml_with_ns("devnet/bridge-ui.yaml")

    k8s_resource(
        "bridge-ui",
        resource_deps = ["proto-gen-web", "wasm-gen"],
        port_forwards = [
            port_forward(3000, name = "Bridge UI [:3000]"),
        ],
    )

# bigtable

def build_cloud_function(container_name, go_func_name, path, builder):
    # Invokes Tilt's custom_build(), with a Pack command.
    # inspired by https://github.com/tilt-dev/tilt-extensions/tree/master/pack
    tag = "latest"
    caching_ref = container_name + ":" + tag

    pack_build_cmd = " ".join([
        "./tools/bin/pack build",
        caching_ref,
        "--path " + path,
        "--builder " + builder,
        "--run-image devnet-cloud-function",
        "--env " + "GOOGLE_FUNCTION_TARGET=%s" % go_func_name,
        "--env " + "GOOGLE_FUNCTION_SIGNATURE_TYPE=http",
    ])

    disable_push = True
    skips_local_docker = True
    if ci:
        # inherit the DOCKER_HOST socket provided by custom_build.
        pack_build_cmd = pack_build_cmd + " --docker-host inherit"
        # do not attempt to access Docker cache in CI
        # pack_build_cmd = pack_build_cmd + " --clear-cache"
        # don't try to pull previous container versions in CI
        pack_build_cmd = pack_build_cmd + " --pull-policy never"
        # push to kubernetes registry
        disable_push = False
        skips_local_docker = False

    docker_tag_cmd  = "tilt docker -- tag " + caching_ref + " $EXPECTED_REF"
    custom_build(
        container_name,
        pack_build_cmd + " && " + docker_tag_cmd,
        [path],
        tag=tag,
        skips_local_docker=skips_local_docker,
        disable_push=disable_push,
    )

if explorer:

    local_resource(
        name = "devnet-cloud-function",
        cmd = "tilt docker -- build -f ./event_database/cloud_functions/Dockerfile.run . -t devnet-cloud-function --label builtby=tilt",
        env = {"DOCKER_BUILDKIT": "1"},
        labels = ["explorer"],
    )

    local_resource(
        name = "pack-bin",
        cmd = "go build -mod=readonly -o bin/pack github.com/buildpacks/pack/cmd/pack",
        dir = "tools",
        labels = ["explorer"],
    )

    k8s_yaml_with_ns("devnet/bigtable.yaml")

    k8s_resource("bigtable-emulator",
        port_forwards = [port_forward(8086, name = "BigTable clients [:8086]")],
        labels = ["explorer"],
    )

    build_cloud_function(
        container_name = "bigtable-functions",
        go_func_name = "Entry",
        path = "./event_database/cloud_functions",
        builder = "gcr.io/buildpacks/builder:v1",
    )
    k8s_resource(
        "bigtable-functions",
        resource_deps = ["proto-gen", "bigtable-emulator"],
        port_forwards = [port_forward(8090, name = "BigTable Functions [:8090]")],
        labels = ["explorer"]
    )

    # explorer web app
    docker_build(
        ref = "explorer",
        context = "./explorer",
        dockerfile = "./explorer/Dockerfile",
        ignore = ["./explorer/node_modules"],
        live_update = [
            sync("./explorer/src", "/home/node/app/src"),
            sync("./explorer/public", "/home/node/app/public"),
        ],
    )

    k8s_yaml_with_ns("devnet/explorer.yaml")

    k8s_resource(
        "explorer",
        resource_deps = ["proto-gen-web"],
        port_forwards = [
            port_forward(8001, name = "Explorer Web UI [:8001]"),
        ],
        labels = ["explorer"],
    )

# terra devnet

docker_build(
    ref = "terra-image",
    context = "./terra/devnet",
    dockerfile = "terra/devnet/Dockerfile",
)

docker_build(
    ref = "terra-contracts",
    context = "./terra",
    dockerfile = "./terra/Dockerfile",
)

k8s_yaml_with_ns("devnet/terra-devnet.yaml")

k8s_resource(
    "terra-terrad",
    port_forwards = [
        port_forward(26657, name = "Terra RPC [:26657]"),
        port_forward(1317, name = "Terra LCD [:1317]"),
    ],
)

k8s_resource(
    "terra-fcd",
    port_forwards = [port_forward(3060, name = "Terra FCD [:3060]")],
)
