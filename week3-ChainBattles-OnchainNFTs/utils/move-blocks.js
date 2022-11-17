//this will be a utility that we use to move the blocks; so that we run our Hardhat node then we
//have complete control over our node what we want our node to do
// we can manually mine nodes and move blocks ahead
// we should not mine too many blocks at a time because Moralis server will have a hardtime indexing so many blocks at one time

const { network } = require("hardhat")

;/===/ //instead of this being a script; we are going to have like a utlilty that we can import to other scripts
// so we dont need a main function
function sleep(timeInMs) {
    return new Promise((resolve) => setTimeout(resolve, timeInMs))
}

async function moveBlocks(
    amount,
    sleepAmount = 0
) /**amount is the no. of block, sleep amount is the optional param; if we want to move blocks and sleep a sec or many
 seconds between blocks to resemble a real BC*/ {
    console.log("Moving bloxxxx.....@!!!")
    for (let index = 0; index < amount; index++) {
        await network.provider.request({
            method: "evm_mine",
            params: [] /**similar to our "Raffle" project*/,
        }) // we are making a raw call to EVM mine, we dont do this alot because ethers abstracts this under the hood
        if (sleepAmount) {
            console.log(` Sleeping for ${sleepAmount}`)
            await sleep(sleepAmount) // going to be in milliseconds
            // we need to use await in the sleep function as it is a promise which is gonna resolve when the timeout in milliseconds passes
        }
    }
}
module.exports = {
    moveBlocks,
    sleep,
}
