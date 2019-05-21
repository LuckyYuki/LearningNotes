# babel

- AST 抽象语法树
- babel-loader 只是 webpack 与 babel 通信的桥梁，真正能转 es6 代码的是 @babel/preset-env（包含了 es5 转为 es6 的规则）
-

```javascript
npm install --save-dev babel-loader @babel/core

module: {
  rules: [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
  ]
}

npm install @babel/preset-env --save-dev

// @babel/preset-env 只能转换一部分es6 代码的语法  @babel/polyfill 会将promise map 等这一些低版本浏览器缺失的对象或者函数  补充进去
npm install --save @babel/polyfill

// 在业务代码中 可引入  不过这样是全量引入，不过配置了 useBuiltIns: 'usage' 就可以省略以下一行import
import "@babel/polyfill";
// 可以不用这样  只需要配置下 @babel/preset-env 参数就可以

module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets:[
                    ['@babel/preset-env',{
                        targets: {
                            edge: "17",
                            firefox: "60",
                            chrome: "67",
                            safari: "11.1",
                        },
                        // 代表业务代码中用了什么特性 就添加什么样的polyfill到打包后的js文件当中  类似按需加载吧
                        useBuiltIns: 'usage'
                    }]
                ]
            }

        }
    ]
}

```

- 当写业务代码的时候 只需配上面的 presets 参数就好了
- 但是如果开发类库或组件库的时候(就是说不同的打包方案) 就需要以下：
- 这样会有效避免 presets 和 polyfill 的问题，避免全局变量污染（polyfill 会有变量污染这个问题）@babel/plugin-transform-runtime 会以闭包的形式注入 或者间接帮助组件去引入 polyfill 的内容，不存在全局污染的情况
- npm install --save-dev @babel/plugin-transform-runtime
- npm install --save @babel/runtime
- npm install --save @babel/runtime-corejs2

```javascript
options: {
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        // 当页面不存在 promise 或者 map方法等，才会自动打包到js文件中 如果不配置2 是不会打包进去的
        "corejs": 2,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```

- 当 options 选项过多时 或者习惯创建 .babelrc 文件 现在推荐 babel.config.js
