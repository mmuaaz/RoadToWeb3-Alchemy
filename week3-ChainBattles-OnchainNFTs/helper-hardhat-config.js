const networkConfig = {
    5: {
        name: "goerli",
        vrfCoordinatorV2: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
        gasLane: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        subscriptionId: "797", //same subscription ID can be used for NFT SC
        callbackGasLimit: "500000",
        mintFee: "100000000000000000",
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    },
    31337: {
        name: "hardhat",
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", //"blablabla",
        callbackGasLimit: "500000",
        mintFee: "100000000000000000",
    },
}
const developmentChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
//const DECIMALS = 8 // impored from "MockV3Aggregator.sol", it is a "constructor" function arguments and a function as well
//const INITIAL_ANSWER = 200000000000 // the INITIAL ANSWER is starting at 2000 and 8 zeroes after that
module.exports = {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
}
// subscriptionID: ID 797
