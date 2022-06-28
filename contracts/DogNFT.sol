// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DogNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("DogNFT", "DNFT") {}

    function awardToken(address owner, string memory tokenURI) 
        public
        onlyOwner
        returns(uint256)
    {
        uint256 newTokenId = _tokenIds.current();
        _mint(owner, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        _tokenIds.increment();
        return newTokenId;
    }
}