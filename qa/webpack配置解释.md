```
const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.ts", // bundle"s entry point
    output: {
        path: path.resolve(__dirname, "dist"), // output directory
        filename: "[name].js", // name of the generated bundle
    },
    resolve: {
        extensions: [".js", ".ts", ".json"],
    },

    mode: "development",

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },

            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: "body",
        }),
        new webpack.DefinePlugin({
            'process.env.CONTRACT_ADDRESS': JSON.stringify(process.env.CONTRACT_ADDRESS),
            'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
        }),
    ],

    devServer: {
        historyApiFallback: true,
        port:8080,
        hot:true
    }
};
```

以下是对这段 Webpack 配置文件的详细解释：

### 环境变量加载部分
```javascript
const dotenv = require("dotenv");
dotenv.config();
```
- `dotenv` 是一个用于从 `.env` 文件加载环境变量到 `process.env` 的模块。
- `dotenv.config()` 会读取项目根目录下的 `.env` 文件，并将其中的键值对添加到 `process.env` 对象中，这样在 Webpack 配置和项目代码里就可以使用这些环境变量了。

### 引入必要的模块
```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
```
- `path` 是 Node.js 的内置模块，用于处理和转换文件路径，确保在不同操作系统上路径的正确性。
- `HtmlWebpackPlugin` 用于生成 HTML 文件，并自动将 Webpack 打包生成的 JavaScript 和 CSS 文件注入到 HTML 中。
- `webpack` 引入了 Webpack 自身，可用于使用 Webpack 提供的一些内置插件。

### 配置对象主体
```javascript
module.exports = {
    // ...
};
```
这是一个导出的对象，包含了 Webpack 的所有配置信息。

### 入口和输出配置
```javascript
entry: "./src/index.ts", // bundle's entry point
output: {
    path: path.resolve(__dirname, "dist"), // output directory
    filename: "[name].js", // name of the generated bundle
},
```
- `entry`：指定 Webpack 开始打包的入口文件，这里是 `./src/index.ts`，Webpack 会从这个文件开始，递归解析其依赖的所有模块。
- `output`：定义了打包后的文件输出位置和文件名。
  - `path`：使用 `path.resolve` 方法将当前目录（`__dirname`）和 `dist` 拼接成一个绝对路径，作为打包文件的输出目录。
  - `filename`：`[name]` 是一个占位符，代表入口文件的名称，最终生成的打包文件会以入口文件的名称命名，扩展名为 `.js`。

### 模块解析配置
```javascript
resolve: {
    extensions: [".js", ".ts", ".json"],
},
```
- `resolve.extensions`：告诉 Webpack 在解析模块时，尝试查找的文件扩展名列表。当你在代码中导入模块时，如果没有指定扩展名，Webpack 会按照这个列表依次尝试查找对应的文件。

### 模式配置
```javascript
mode: "development",
```
- `mode`：指定 Webpack 的打包模式，这里是 `development`，表示开发模式。在开发模式下，Webpack 会进行一些优化，例如生成更详细的 source map，方便调试代码。

### 模块规则配置
```javascript
module: {
    rules: [
        {
            test: /\.ts$/,
            loader: "ts-loader",
            exclude: /node_modules/,
        },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
    ],
},
```
- `module.rules`：定义了一系列的规则，用于处理不同类型的文件。
  - 第一个规则：
    - `test`：使用正则表达式 `/\.ts$/` 匹配所有扩展名为 `.ts` 的文件。
    - `loader`：指定使用 `ts-loader` 来处理这些 TypeScript 文件，`ts-loader` 会将 TypeScript 代码编译为 JavaScript 代码。
    - `exclude`：使用正则表达式 `/node_modules/` 排除 `node_modules` 目录下的文件，避免对第三方模块进行不必要的处理。
  - 第二个规则：
    - `test`：使用正则表达式 `/\.css$/i` 匹配所有扩展名为 `.css` 的文件，`i` 表示忽略大小写。
    - `use`：指定使用多个加载器来处理 CSS 文件，加载器的执行顺序是从右到左。`css-loader` 负责解析 CSS 文件中的 `@import` 和 `url()` 语句，`style-loader` 负责将 CSS 代码插入到 HTML 的 `<style>` 标签中。

### 插件配置
```javascript
plugins: [
    new HtmlWebpackPlugin({
        template: "./src/index.html",
        inject: "body",
    }),
    new webpack.DefinePlugin({
        'process.env.CONTRACT_ADDRESS': JSON.stringify(process.env.CONTRACT_ADDRESS),
        'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
    }),
],
```
- `HtmlWebpackPlugin`：
  - `template`：指定 HTML 模板文件的路径，Webpack 会根据这个模板生成最终的 HTML 文件。
  - `inject`：指定将打包后的 JavaScript 文件注入到 HTML 文件的哪个位置，这里是 `body`，表示注入到 `<body>` 标签内。
- `webpack.DefinePlugin`：用于在编译时定义全局常量。这里将 `.env` 文件中定义的 `CONTRACT_ADDRESS` 和 `DEBUG` 环境变量注入到项目代码中，使用 `JSON.stringify` 确保这些变量以字符串形式注入。

### 开发服务器配置
```javascript
devServer: {
    historyApiFallback: true,
    port: 8080,
    hot: true
}
```
- `devServer`：配置 Webpack 开发服务器的行为。
  - `historyApiFallback`：设置为 `true` 时，当访问的路径在服务器上不存在时，会返回 `index.html`，这对于使用 HTML5 History API 的单页应用非常有用。
  - `port`：指定开发服务器监听的端口号，这里是 `8080`。
  - `hot`：设置为 `true` 时，启用热模块替换（Hot Module Replacement，HMR）功能，当代码发生变化时，开发服务器会自动更新浏览器中的页面，而不需要刷新整个页面。