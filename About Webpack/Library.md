# Library

- libraryTarget 还可以直接挂载到当前 window 、this 上，当用 script 标签引入的时候，就可以在页面中 用这个库了。
-

```javascript
const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  //  打包的时候 如果遇到这个lodash库 就忽略 不打包到js里 而是让业务代码去引入
  externals: "lodash",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "library.js",
    // script 标签引入的时候 可以使用 root.  访问库里的内容
    library: "root",
    // 支持 esmodule amd cmd
    libraryTarget: "umd"
  }
};
```

- npm adduser
- npm publish
