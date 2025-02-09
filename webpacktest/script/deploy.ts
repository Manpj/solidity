import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";

async function deploy() {
    const Lock = await ethers.getContractFactory("Lock");
    const hello = await Lock.deploy(2);
    await hello.hello();

    return hello;
}

// @ts-ignore
async function sayHello(hello) {
    console.log("Say Hello:", await hello.hello());
}

deploy().then(sayHello);