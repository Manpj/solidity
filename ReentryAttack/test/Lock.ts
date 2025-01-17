import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("Reentrancy Attack", function () {
  let vulnerableContract: any;
  let attackerContract: any;
  let owner: any;
  let attacker: any;

  beforeEach(async function(){
    [owner, attacker]= await hre.ethers.getSigners();

    const VulnerableContract = await hre.ethers.getContractFactory("ReentrancyVulnerable");
    vulnerableContract = await VulnerableContract.deploy();
    await vulnerableContract.waitForDeployment();

    const AttackerContract = await hre.ethers.getContractFactory("ReentrancyAttacker");
    attackerContract = await AttackerContract.deploy(vulnerableContract.target);
    await attackerContract.waitForDeployment();
  });
  
  it("Should not allow reentrancy attack", async function () {
    // Deposit 1 ETH to vulnerable contract
    
    await owner.sendTransaction({
      to: vulnerableContract.address,
      value: hre.ethers.parseEther("10")
    });

    const balanceBefore = await hre.ethers.provider.getBalance(attacker.address);
    expect(balanceBefore).to.equal(hre.ethers.parseEther("10"));

    //攻击合约开始攻击
    await attackerContract.connect(attacker).withdraw({value: hre.ethers.parseEther("1")});

    //等待一段时间
    await hre.ethers.provider.send("evm_increaseTime", [10]);

    //验证攻击后合约的余额
    const finalBalance = await vulnerableContract.getBalance();
    expect(finalBalance).to.lessThan(hre.ethers.parseEther("10"));
    
  });
});