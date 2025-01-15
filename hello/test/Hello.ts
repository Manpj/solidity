import "@nomicfoundation/hardhat-ethers";
import {ethers} from "hardhat";
import {expect} from "chai";

describe("HelloWorld",function (){
  it("should say hello",async function (){
    //安装合约setup
    //import contract
    //test action
    
    const HW=await ethers.getContractFactory("HelloWorld");
    const hw=await HW.deploy();
    await hw.waitForDeployment();

    expect(await hw.hello()).to.equal("Hello, World");
  });
});