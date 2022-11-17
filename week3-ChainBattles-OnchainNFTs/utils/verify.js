const { run } = require("hardhat")

async function verify(contractAddress, args) {
    // const verify = async (ContractAddress, args) => {}

    //manually verification can be running a command "yarn hardhat verify --network rinkeby DELOYED_CONTRACT_ADDRESS "constructor arguments 1""
    try {
        // "try catch" is a way to solve the problem in which if u expect an error to stop the code from runing ahead you just by pass the
        // error in the "catch" part and still run the code which is ahead
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified")
        } else {
            console.log(e)
        } // this portion of the code is saying is that "try" the await part of code, if it has an error then "catch" that error in "e"
        // if "e" includes "already verified" message then tell us "Already Verified" and continue running the code otherwise keep runing the
        //code and display whatever message is there
    }
}
module.exports = { verify }
