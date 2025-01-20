# 重入攻击演示例子

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
npx hardhat compile
```


## 创建项目：
```shell
1、创建文件夹
2、yarn init -y
3、yarn add -D hardhat
4、npx hardhat
```

## receive 和 fallback函数 区别
is msg.data empty?
yes:receive()  
    receive exists?
        yes:receive()
        no:fallback()
no:fallback()


## 避免可重入攻击
1、先修改余额，再转账。可以确保攻击者转走的币是正确的。
2、使用transfer()或transferFrom()，执行的时候有gas限制，gas用完，会自动回滚。
