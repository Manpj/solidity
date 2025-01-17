// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ReentrancyVulnerable {
    
    mapping(address=>uint) public balances;

    constructor(){
        balances[msg.sender]=1000 ether;
    }

    function withdraw(uint amount) external {
        //验证余额
        require(balances[msg.sender]>amount,"balance is not enough.");
        //转账
        (bool success,)=msg.sender.call{value:amount}("");
        require(success,"transfer failed.");
        //减掉取出的数量
        balances[msg.sender]-=amount;
    }

    //获取余额,合约部署的时候要存入1000ether
    function getBalance() external view returns(uint){
        return balances[msg.sender];
    }

    receive() external payable{}


}
