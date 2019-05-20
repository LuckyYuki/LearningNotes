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

- 运行webpack打包三种方式
    - webpack index.js
    - npx webpack index.js
    - npm run bundle -> webpack

- webpack-cli 这个工具作用：
    - 让我们可以在命令行中使用webpack这个命令

- chunks就是代码块的意思，有name的chunk是在entry里配置了name的，那些1，2，3，4啥的应该是用了code splitting配置生成的，数字是chunk的id

- 多个chunk合在一起就是bundle，一个bundle可以理解为一个大的js打包之后生成的文件，而多个bundle里可能有公共的部分，或者一个bundle里的东西并不需要一次性加载，需要按照路由按需加载，这个时候就需要按需加载，拆分成不同的chunk

- file-loader 和 url-loader 打包静太文件的区别：后者可以指定 limit 的options ，是否可以将图片打包成base64到js文件中。

- 打包css样式文件的时候，需要 style-loader 和 css-loader，后者会分析css文件之间的引用关系，前者将css-loader处理过的css文件挂载到index.html文件的head标签下的style中。

- scss文件的打包需安装：sass-loader 和node-sass.loader，loader执行顺序：从下到上，从右到左的顺序

- css浏览器前缀loader: postcss-loader,且需要配置 postcss.config.js 文件。安装autoprefixer插件

```javascript
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
```

- css modules 模块化css打包需要配置 css-loader 中的options：importLoaders指的是在scss文件当中可以使用@import 样式文件，然后依次用postcss-loader -> sass-loader -> css-loader -> style-loader

```javascript
options: {
    importLoaders: 2,
    modules: true
}
```

- 打包字体文件 eot ttf woff svg 等，需要用到file-loader

- htmlWebpackPlugin 会在打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件当中。
    - plugin 可以在webpack运行到某一时刻的时候，帮我们做一些事情。
    - 比如说自动在dist文件夹生成html文件，且使用index.html模板
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
    - 举例：当后台需要index.html文件作为入口文件时，打包生成的js文件要上传到cdn上，这时需要 HtmlWebpackPlugin 做的是：插入打包后的js文件时，加个cdn的域名，如下配置：

```javascript
output: {
    publicPath: 'http://cdn.com.cn',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
}
```
