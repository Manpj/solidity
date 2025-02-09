以下是对使用 `yarn add -D` 命令安装的各个插件的详细解释：

### 1. `webpack`
- **作用**：Webpack 是一个模块打包工具，它可以将各种资源（如 JavaScript、CSS、图片等）视为模块，并将它们打包成一个或多个文件。Webpack 能够处理模块之间的依赖关系，对代码进行优化、分割和合并，从而提高应用程序的加载性能。
- **使用场景**：在大型项目中，当代码被拆分成多个模块时，Webpack 可以帮助管理这些模块之间的关系，并将它们打包成适合在浏览器或 Node.js 环境中运行的文件。

### 2. `webpack-cli`
- **作用**：Webpack CLI 是 Webpack 的命令行工具，它提供了一系列命令，用于在终端中配置和运行 Webpack。通过 Webpack CLI，你可以方便地执行打包、开发服务器启动等操作。
- **使用场景**：当你需要在命令行中执行 Webpack 相关任务时，例如运行打包命令 `webpack` 或者启动开发服务器 `webpack-dev-server`，就需要使用 Webpack CLI。

### 3. `ts-loader`
- **作用**：`ts-loader` 是一个 Webpack 加载器，用于处理 TypeScript 文件。它可以将 TypeScript 代码编译成 JavaScript 代码，使得 Webpack 能够识别和处理 TypeScript 模块。
- **使用场景**：当你的项目使用 TypeScript 编写时，需要使用 `ts-loader` 将 TypeScript 文件转换为 JavaScript 文件，以便 Webpack 进行打包。

### 4. `html-webpack-plugin`
- **作用**：`html-webpack-plugin` 用于生成 HTML 文件，并自动将 Webpack 打包生成的 JavaScript 和 CSS 文件注入到 HTML 文件中。它可以根据模板文件生成 HTML，简化了手动配置 HTML 文件的过程。
- **使用场景**：在 Web 项目中，通常需要一个 HTML 文件作为入口页面，使用 `html-webpack-plugin` 可以自动生成包含打包后资源的 HTML 文件，方便开发和部署。

### 5. `dotenv`
- **作用**：`dotenv` 是一个零依赖的模块，用于从 `.env` 文件中加载环境变量。在开发过程中，我们经常需要使用一些敏感信息（如 API 密钥、数据库连接字符串等），可以将这些信息存储在 `.env` 文件中，并使用 `dotenv` 加载到项目中，避免将敏感信息硬编码在代码中。
- **使用场景**：当你需要在项目中使用环境变量，并且希望将这些变量与代码分离时，可以使用 `dotenv`。

### 6. `webpack-dev-server`
- **作用**：`webpack-dev-server` 是一个基于 Express 的开发服务器，它可以为 Webpack 打包的应用程序提供一个本地开发环境。它支持热更新（Hot Module Replacement，HMR），当代码发生变化时，会自动重新编译并更新浏览器中的页面，无需手动刷新。
- **使用场景**：在开发过程中，使用 `webpack-dev-server` 可以提高开发效率，快速预览代码的变化。

综上所述，这些插件组合在一起可以帮助你构建一个功能强大的 Webpack 开发环境，支持 TypeScript 开发、自动生成 HTML 文件、管理环境变量以及提供热更新的开发服务器。