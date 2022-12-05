;/===============Building Dynamic NFTs where the data for metadata URI is gonna be completely on-chain /
;/Setting up the project/
//
// first RUN COMM: npm intsall
//RUN COMM: npm init -y   < gives us a package.json that we can work with to start our project
// RUN COMM: yarn add hardhat
// RUN COMM: npx hardhat
// RUN COMM: yarn add @openzeppelin/contracts
// RUN COMM: yarn add @nomiclabs/hardhat-etherscan  < going to help us verifying our contracts
// RUN COMM: yarn add dotenv
// RUN COMM: yarn add prettier
//
// copy your hardhat.config.js and .env files
;/Writing COntract for on_Chain NFT metadata/
;/Write deploy script/
// RUN COMM: npx hardhat run scripts/deploy.js --network mumbai
;/Verify your contract/
// RUN COMM: npx hardhat verify <deploy contract address> --network mumbai
