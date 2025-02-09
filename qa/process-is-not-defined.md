报错信息 `process is not defined` 表明在代码里使用了 `process` 对象，不过这个对象在浏览器环境中并未定义。`process` 对象是 Node.js 环境特有的，浏览器环境里没有该对象，所以会出现此错误。

### 解决方案

#### 1. 使用环境变量加载工具
要是你用的是 Webpack 这类打包工具，可以借助 `dotenv-webpack` 插件来加载环境变量。

**步骤如下**：
- **安装依赖**：
```bash
npm install dotenv-webpack --save-dev
```
- **配置 Webpack**：
在 `webpack.config.js` 里添加如下配置：
```javascript
const Dotenv = require('dotenv-webpack');

module.exports = {
    // 其他配置...
    plugins: [
        new Dotenv()
    ]
};
```
- **创建 `.env` 文件**：
在项目根目录下创建 `.env` 文件，并且设置 `COUNTER_ADDRESS` 环境变量：
```plaintext
COUNTER_ADDRESS=your_contract_address
```

#### 2. 直接在代码中硬编码合约地址
若不想使用环境变量，也可以直接在代码里硬编码合约地址。

```typescript
import { ethers } from "ethers";
import { get } from "http";

function getEth() {
    // @ts-ignore
    const eth = window.ethereum;
    if (!eth) {
        throw new Error("No ethereum provider found");
    }
    return eth;
}

async function requestAccess() {
    const eth = getEth();
    const result = await eth.request({ method: "eth_requestAccounts" }) as string[];
    return result && result.length > 0;
}

async function hasSigners() {
    const metamask = getEth();
    const signers = await metamask.request({ method: "eth_accounts" }) as string[];
    return signers.length > 0;
}

async function getContract() {
    if (!await hasSigners() && !await requestAccess()) {
        throw new Error("No ethereum provider found");
    }

    const provider = new ethers.BrowserProvider(getEth());
    // 直接硬编码合约地址
    const address = "your_contract_address";
    if (!address) {
        throw new Error(" CONTRACT_ADDRESS environment variable is not set.");
    }
    const contract = new ethers.Contract(
        address,
        [
            "function increment() external",
            "function countV() public view returns (uint)"
        ],
        await provider.getSigner()
    );
    const counter = document.createElement("div");
    async function getCount() {
        counter.innerHTML = await contract.countV();
    }
    getCount();
    async function increment() {
        await contract.increment();
    }
    const btn = document.createElement("button");
    btn.innerHTML = "Increment";
    btn.onclick = async function () {
        const tx = await contract.increment();
        await tx.wait();
        getCount();
    }

    document.body.appendChild(counter);
    document.body.appendChild(btn);
}

async function main() {
    await getContract();
}

main();
```

### 总结
- 若需要在不同环境中使用不同的合约地址，建议采用 `dotenv-webpack` 插件加载环境变量。
- 若只是用于测试或者开发环境，直接硬编码合约地址会更简便。 