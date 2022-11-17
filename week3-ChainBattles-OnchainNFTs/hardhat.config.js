//module.exports = {
//require("hardhat-contract-sizer")
require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
// require("hardhat-gas-reporter")
// require("solidity-coverage")
// require("hardhat-deploy")
require("dotenv").config()

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || ""

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x"

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const POLYGON_TEST_RPC_URL = process.env.POLYGON_TEST_RPC_URL || blablabla
//const REPORT_GAS = process.env.REPORT_GAS || false
//const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL || abc
module.exports = {
    solidity: {
        compilers: [
            { version: "0.8.10" },
            { version: "0.8.0" },
            { version: "0.6.0" },
            { version: "0.6.12" },
        ],
    },
    // gasReporter: {
    //     enabled: false,
    //     currency: "USD",
    //     outputFile: "gas-report.txt",
    //     noColors: true,
    //     // coinmarketcap: COINMARKETCAP_API_KEY,
    // },
    // namedAccounts: {
    //     deployer: {
    //         default: 0, // here this will by default take the first account as deployer
    //         //Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    //     },
    //     player: {
    //         default: 1,
    //     },
    // },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            // forking: {
            //     url: MAINNET_RPC_URL,
            // },
            blockConfirmations: 6,
        },
        localhost: {
            chainId: 31337,
            blockConfirmations: 6,
        },
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
            blockConfirmations: 6,
        },
        mumbai: {
            url: POLYGON_TEST_RPC_URL,
            accounts: [PRIVATE_KEY],
        },
    },
    etherscan: {
        // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
        apiKey: {
            goerli: ETHERSCAN_API_KEY,
        },
    },
    // mocha: {
    //     timeout: 100000000, // 500 seconds max for running tests
    // },
}
