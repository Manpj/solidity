import { ethers } from "ethers";

async function getContract(){
    // // 1. 地址
    // // 2. 方法名
    // // 3. provider
    const provider = new ethers.JsonRpcProvider("http://localhost:8545");
    const address = process.env.CONTRACT_ADDRESS;
    if (!address) {
        throw new Error(" CONTRACT_ADDRESS environment variable is not set.");
    }
    const contract = new ethers.Contract(
        address,
        [
            "function hello() public pure returns (string memory)"
        ],
        provider
    )
    document.body.innerHTML = await contract.hello();
}

async function main(){
    await getContract();
}

main();