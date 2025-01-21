# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```


## 部署
1、启动链：npx hardhat node
2、编写部署脚本 deploy-hello.ts
3、部署：npx hardhat run ./scipts/deploy-hello.ts --network localhost
