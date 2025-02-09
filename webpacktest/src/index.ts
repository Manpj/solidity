import {ethers} from "ethers";
import { get } from "http";

function getEth(){
    // @ts-ignore
    const eth = window.ethereum;
    if (!eth) {
        throw new Error("No ethereum provider found");
    }
    return eth;
}

async function requestAccess(){
    const eth=getEth();
    const result=await eth.request({method:"eth_requestAccounts"}) as string[];
    return result && result.length > 0;
}

async function hasSigners(){
    const metamask = getEth();
    const signers = await metamask.request({ method: "eth_accounts" }) as string[];
    return signers.length > 0;
}

async function getContract(){

    if (!await hasSigners() && !await requestAccess()) {
        throw new Error("No ethereum provider found");
    }

    const provider=new ethers.BrowserProvider(getEth());
    const address=process.env.COUNTER_ADDRESS;
    if (!address) {
        throw new Error(" CONTRACT_ADDRESS environment variable is not set.");
    }
    const contract=new ethers.Contract(
        address,
        [
            "function increment() external",
            "function countV() public view returns (uint)"
        ],
        await provider.getSigner()
    );
    const counter=document.createElement("div");
    async function getCount(){
        counter.innerHTML=await contract.countV();
    }
    getCount();
    async function increment(){
        await contract.increment();
    }
    const btn=document.createElement("button");
    btn.innerHTML="Increment";
    btn.onclick=async function (){
        const tx=await contract.increment();
        await tx.wait();
        getCount();
    }

    document.body.appendChild(counter);
    document.body.appendChild(btn);
}

async function main(){
    await getContract();
}

main();