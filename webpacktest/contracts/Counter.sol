// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "hardhat/console.sol";

contract Counter {
    uint public count;

    constructor() {
        count = 0;
    }

    function increment() public {
        count += 1;
    }

    function countV() public view returns (uint) {
        return count;
    }

}