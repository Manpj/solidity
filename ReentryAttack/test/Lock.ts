import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
const { expect } = require("chai");
const { ethers} = require("hardhat");
const { parseEther } = require("ethers/lib/utils");

describe("Reentrancy Attack", function () {
  let vulnerableContract: any;
  let attackerContract: any;
  let owner: any;
  let attacker: any;

  beforeEach(async function(){
    [owner, attacker]= await ethers.getSigners();

    const VulnerableContract = await ethers.getContractFactory("ReentrancyVulnerable");
    vulnerableContract = await VulnerableContract.deploy();
    await vulnerableContract.deployed();
    console.log("Deploying ReentrancyVulnerable",vulnerableContract.address);

    const AttackerContract = await ethers.getContractFactory("ReentrancyAttacker");
    attackerContract = await AttackerContract.deploy(vulnerableContract.address);
    await attackerContract.deployed();
    console.log("Deploying AttackerVulnerable",attackerContract.address);
  });
  
  it("Should not allow reentrancy attack", async function () {
    // Deposit 1 ETH to vulnerable contract
    
    await owner.sendTransaction({
      to: vulnerableContract.address,
      value: ethers.utils.parseEther('10'),
    });

    const balanceBefore = await ethers.provider.getBalance(attacker.address);
    expect(balanceBefore).to.equal(ethers.utils.parseEther("10000"));

    //攻击合约开始攻击
    const inputValue = ethers.utils.parseEther("0.0000000000000001");
    console.log("InputValue", inputValue);
    await vulnerableContract.connect(attacker).withdraw(inputValue);

    //等待一段时间
    await ethers.provider.send("evm_increaseTime", [10]);

    //验证攻击后合约的余额
    const finalBalance = await vulnerableContract.getBalance();
    expect(finalBalance).to.lessThan(ethers.parseEther("10"));
    
  });
});