import {ethers} from "hardhat";
import {expect} from "chai";
import {Counter} from "../typechain-types";


describe("Counter",function (){
    let counter:Counter;
    
    beforeEach(async function (){
        const counterFactory=await ethers.getContractFactory("Counter");
        counter=await counterFactory.deploy();
    });

    it("Should return the new count once it's changed",async function (){
        expect(await counter.count()).to.equal(0);
        await counter.increment();
        expect(await counter.count()).to.equal(1);
    });
});