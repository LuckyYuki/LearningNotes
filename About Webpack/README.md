# About Webpack 模块打包工具

- npm init -y 生成默认配置
- npm info webpack 查看历史所有版本
- webpack -v 全局的版本
- npx webpack -v 当前项目安装的版本
- npm i webpack@4.16.5 -D 安装某版本
- 对已提交不必要文件的处理方法

  - git rm -r --cached node_modules（要删除的文件名）
  - git push

- 自动生成 .gitignore 文件

  - https://www.gitignore.io/

- 指定配置文件打包

  - npx webpack --config config.js

- 运行 webpack 打包三种方式

  - webpack index.js
  - npx webpack index.js
  - npm run bundle -> webpack

- webpack-cli 这个工具作用：

  - 让我们可以在命令行中使用 webpack 这个命令

- chunks 就是代码块的意思，有 name 的 chunk 是在 entry 里配置了 name 的，那些 1，2，3，4 啥的应该是用了 code splitting 配置生成的，数字是 chunk 的 id

- 多个 chunk 合在一起就是 bundle，一个 bundle 可以理解为一个大的 js 打包之后生成的文件，而多个 bundle 里可能有公共的部分，或者一个 bundle 里的东西并不需要一次性加载，需要按照路由按需加载，这个时候就需要按需加载，拆分成不同的 chunk

- file-loader 和 url-loader(可以将文件拷贝到 dist 目录下 并返回文件的地址) 打包静太文件的区别：后者可以指定 limit 的 options ，是否可以将图片打包成 base64 到 js 文件中。

- 打包 css 样式文件的时候，需要 style-loader 和 css-loader，后者会分析 css 文件之间的引用关系，前者将 css-loader 处理过的 css 文件挂载到 index.html 文件的 head 标签下的 style 中。

- scss 文件的打包需安装：sass-loader 和 node-sass.loader，loader 执行顺序：从下到上，从右到左的顺序

- css 浏览器前缀 loader: postcss-loader,且需要配置 postcss.config.js 文件。安装 autoprefixer 插件

```javascript
module.exports = {
  plugins: [require("autoprefixer")]
};
```

- css modules 模块化 css 打包需要配置 css-loader 中的 options：importLoaders 指的是在 scss 文件当中可以使用@import 样式文件，然后依次用 postcss-loader -> sass-loader -> css-loader -> style-loader

```javascript
options: {
    importLoaders: 2,
    modules: true
}
```

- 打包字体文件 eot ttf woff svg 等，需要用到 file-loader

- htmlWebpackPlugin 会在打包结束后，自动生成一个 html 文件，并把打包生成的 js 自动引入到这个 html 文件当中。
  - plugin 可以在 webpack 运行到某一时刻的时候，帮我们做一些事情。
  - 比如说自动在 dist 文件夹生成 html 文件，且使用 index.html 模板
  - npm clean-webpack-plugin -D
  -

```javascript
plugins: [
    // 打包之后运行
    new HtmlWebpackPlugin({
        template: 'src/index.html'
    }),
    // 打包之前运行 删除dist文件夹
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin()
],
```

- output 选项配置：
  - 举例：当后台需要 index.html 文件作为入口文件时，打包生成的 js 文件要上传到 cdn 上，这时需要 HtmlWebpackPlugin 做的是：插入打包后的 js 文件时，加个 cdn 的域名，如下配置：

```javascript
output: {
    publicPath: 'http://cdn.com.cn',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
}
```

- mode: 'development' 开发环境下默认 sourceMap 功能是开启的 关闭是： devtool：'none'，
  - sourceMap 是一个映射关系，打包后的 js 文件代码对应源代码的哪行哪行，这样容易排错（告诉哪一行哪一列）。
  - 打开这种模式： devtool: 'source-map'
  - 如果配置 inline-source-map 后，会把 sourceMap 文件直接打包到 js 文件当中，更多配置及配置项区别（速度）请查阅官网。
  - 如果再加上个 cheap （cheap-inline-source-map）代表 你只要告诉我哪一行出错了就可以，与上面的有区别。还有个区别是 只会将业务代码做映射，而不会将像是 loader 这种代码做映射。如果需要 loader 这种代码映射，那就再加个 module （cheap-module-inline-source-map）
  - devtool：'eval' 是打包速度最快的配置：执行效率最高，性能最好的打包方式，是使用 eval 的方式做映射关系，但是针对复杂的代码，提示错误信息可能不全面。
  - 开发环境推荐： cheap-module-eval-source-map
  - 生产环境推荐：cheap-module-source-map
- 热更新的方式：

  - scripts："watch": "webpack --watch"
  - scripts："start": "webpack-dev-server"
  - scripts："server": "node server.js" : 用 node 自己写一个 webpack-dev-server

    - 借助 webpack-dev-middleware 监听到我们的代码变化，进而重新打包

    ```javascript
    const express = require("express");
    const webpack = require("webpack");
    const webpackDevMiddleware = require("webpack-dev-middleware");
    const config = require("./webpack.config.js");
    // 在node中直接使用webpack
    // 在命令行里使用webpack
    const complier = webpack(config);

    const app = express();

    app.use(
      webpackDevMiddleware(complier, {
        // publicPath: config.output.publicPath
      })
    );

    app.listen(3000, () => {
      console.log("server is running");
    });
    ```

- webpack-dev-server： 先安装。运行后 并不会把编译后的文件打包到 dist 目录中，而是放到内存中，提升打包速度，进而提升开发效率。

  - 增加配置

```javascript
devServer: {
    // 再哪个目录下启动服务器
    contentBase: './dist',
    // 自动打开浏览器 和 地址
    open: true,
    port: 8080,
    // 热更新 开启hot module replacement
    hot: true,
    // 即使HMR的功能没有生效 也不让浏览器自动刷新
    hotOnly: true,
    // devServer支持跨域代理，当访问/api 下的请求时 自动转发到http://localhost:3000
    proxy: {
        '/api': 'http://localhost:3000'
    }
},
```

- 要使用 HMR 需要先引入 webpack 然后在 plugins 中增加：

```javascript
plugins: [
  new HtmlWebpackPlugin({
    template: "src/index.html"
  }),
  new CleanWebpackPlugin(["dist"]),
  // 自带的HMR插件
  new webpack.HotModuleReplacementPlugin()
];
```
