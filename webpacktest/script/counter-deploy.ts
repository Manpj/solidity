import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";

async function main() {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    return counter;
}
// @ts-ignore
async function countV(counter){
    console.log("counter:",await counter.countV());
}
//这样执行后部署完成，会输出一段话
main().then(countV);