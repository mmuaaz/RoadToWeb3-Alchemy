// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol"; //      < going to used to keep track of tokenIDs
import "@openzeppelin/contracts/utils/Strings.sol"; //      < is gonna help us things like converting intergers into strings
import "@openzeppelin/contracts/utils/Base64.sol"; //      < helps us work with svg and create long base64 encoded string

contract OnChainBattles is ERC721URIStorage {
    using Strings for uint256;
    using Counters for Counters.Counter; //going to help us creating tokenIds

    Counters.Counter private _tokenIds;

    mapping(uint256 => uint256) public tokenIdToLevels; //basically a hash map; mapping two key values together

    constructor() ERC721("Chain Battles", "CBTLS") {} //"Chain Battles" name of our contract, "CBTLS" is acronym

    //Generating SVGs

    //creating SVGs is not supported on solidity
    //using abi.encodePacked library to concatenate strings

    function generateCharacter(uint256 tokenId) public returns (string memory) {
        bytes memory svg = abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
            "<style>.base { fill: white; font-family: serif; font-size: 14px; }</style>",
            '<rect width="100%" height="100%" fill="black" />',
            '<text x="50%" y="40%" class="base" dominant-baseline="middle" text-anchor="middle">',
            "Warrior",
            "</text>",
            '<text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">',
            "Levels: ",
            getLevels(tokenId),
            "</text>",
            "</svg>"
        ); //abi.encodePakced gonig to take args which will turn string into bytes over to our base64 utility

        //going to typecasting abi.encodePacked to which always returns some bytes

        return
            string(
                abi.encodePacked("data:image/svg+xml;base64,", Base64.encode(svg)) //this will return us that data type which we can copy and paste into URL bar and get that image
                // we used that base65 utility from openzeppelin contracts to convert that svg into a string instead of going to a website and converting it manually
            );
    }

    function getLevels(uint256 tokenId) public view returns (string memory) {
        uint256 levels = tokenIdToLevels[tokenId];
        return levels.toString();
    } //this function is going to take a tokenId and return a string in the form of levels by using Strings function from the openzeppelin contracts

    //we need this to be a String because "abi.encodePacked" must always resolve to strings

    function getTokenURI(uint256 tokenId) public returns (string memory) {
        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "Chain Battles #',
            tokenId.toString(),
            '",',
            '"description": "Battles on chain",',
            '"image": "',
            generateCharacter(tokenId),
            '"',
            "}"
        );
        return string(abi.encodePacked("data:application/json;base64,", Base64.encode(dataURI)));
    }

    function mint() public {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        tokenIdToLevels[newItemId] = 0;
        _setTokenURI(newItemId, getTokenURI(newItemId));
    }

    function train(uint256 tokenId) public {
        require(_exists(tokenId), "Please use an existing token");
        require(ownerOf(tokenId) == msg.sender, "You must own this token to train it");
        uint256 currentLevel = tokenIdToLevels[tokenId];
        tokenIdToLevels[tokenId] = currentLevel + 1;
        _setTokenURI(tokenId, getTokenURI(tokenId));
    }
}
