import "@nomicfoundation/hardhat-ethers"
import { ethers } from "hardhat";

async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const helloWorld = await HelloWorld.deploy();
  await helloWorld.waitForDeployment();
  console.log(`HelloWorld deployed to ${helloWorld.target}`);
  return helloWorld;
}

async function sayHello(hello:any){
    console.log(await hello.hello());
}

main().then(sayHello);