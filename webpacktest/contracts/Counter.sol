// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "hardhat/console.sol";

contract Counter {
    uint public count;

    event CountChanged(address sender,uint newCount);

    constructor() {
        count = 0;
    }

    function increment() public {
        count += 1;
        emit CountChanged(msg.sender,count);
    }

    function countV() public view returns (uint) {
        return count;
    }

}