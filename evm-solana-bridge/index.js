const { ethers } = require('ethers');
const { Connection, PublicKey } = require('@solana/web3.js');

// EVM 部分：获取以太坊账户余额
async function getEVMBalance() {
    // 以太坊测试网的 RPC 节点
    const provider = new ethers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/0cv9PADdl-UI8649PQeIMsXWaqFlBaCc');
    // 替换为你自己的以太坊地址
    const address = 'xxx';

    try {
        const balance = await provider.getBalance(address);
        const balanceInEther = ethers.formatEther(balance);
        console.log(`EVM 账户余额: ${balanceInEther} ETH`);
    } catch (error) {
        console.error('获取 EVM 账户余额时出错:', error);
    }
}

// Solana 部分：获取 Solana 账户余额
async function getSolanaBalance() {
    // Solana 测试网的 RPC 节点
    const connection = new Connection('https://solana-devnet.g.alchemy.com/v2/UE3cxMLiM9pM6G0rF__xeZIkacGKtcG3');
    // 替换为你自己的 Solana 地址,softlare 中赋值
    const address = new PublicKey('xxx');

    try {
        const balance = await connection.getBalance(address);
        const balanceInSol = balance / 1000000000; // 转换为 SOL
        console.log(`Solana 账户余额: ${balanceInSol} SOL`);
    } catch (error) {
        console.error('获取 Solana 账户余额时出错:', error);
    }
}

// 主函数
async function main() {
    //await getEVMBalance();
    await getSolanaBalance();
}

main();