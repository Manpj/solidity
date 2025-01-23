import {ethers} from "ethers";

function getEth(){
    const eth=window.ethereum;

    if(!eth){
        throw new Error("No ethereum object");
    }
    return eth;
}

async function hasSigner(){
    const eth=getEth();
    const signers=await eth.request({method:"eth_accounts"}) as string[];
    return signers.length>0;
}


async function connectWallet(){
    const eth=getEth();
    const accounts=await eth.request({method:"eth_requestAccounts"}) as string[];
    
    return accounts && accounts.length>0;
}

async function getContract(){

    if(!await hasSigner() && !await connectWallet()){
        throw new Error("No wallet connected");
    }

    const provider = new ethers.BrowserProvider(getEth()); 
    const contract = new ethers.Contract(
        process.env.CONTRACT_ADDRESS,
        [
            "function hello() public pure returns (string memory)"
        ],
        provider
    );

    document.body.innerHTML=await contract.hello();
}

async function main(){
    await getContract();
}

