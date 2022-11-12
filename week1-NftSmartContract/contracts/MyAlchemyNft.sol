// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts@4.8.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.8.0/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts@4.8.0/token/ERC721/extensions/ERC721URIStorage.sol";
//import "@openzeppelin/contracts@4.8.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.8.0/utils/Counters.sol";

contract MyAlchemyNft is ERC721, ERC721Enumerable, ERC721URIStorage { //ownable has been deleted
    using Counters for Counters.Counter;    //We are initilializing the counters library

// IMPLEMENTING >>> supply of the NFTs in this project

    Counters.Counter private _tokenIdCounter;
    uint256 MAX_SUPPLY = 10000;


    constructor() ERC721("MyAlchemyNft", "MTK") {}  //constructor is used to create instance of our SC
    //what I think its more like a function that is called right when the SC is deployed and you can initlialize variables right in the deployement of the SC

    function safeMint(address to, string memory uri) public  {  //we deleted the onlyoOwner modifier from here so that users can mint the NFT
        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId <= MAX_SUPPLY, "All NFTs have been minted!!!"); //if the tokenId 10,000 is minted then its going to revert with an error
        require(balanceOf(msg.sender) <= 4, "You are only allowed to Mint 5 NFTs ");
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.
    // so the overrides basically meaning that the function you are inheriting from other imports, you want to copy them in you SC, and then you want to modify
    //them a little bit according to your needs 
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal //internal functions can be accessed by other SCs that are inheriting this SC
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view //view is a modifier here; functions that are reading from the BC, are needed to be marketed as view so that it does cost any gas upon calling 
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
