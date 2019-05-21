# Tree Shaking 只支持 es module

- 引入什么就是什么，而不是全量引入
- import { add } from './main.js'
- 配置 Tree Shaking
- devalopment 默认没有 Tree Shaking 的功能
- 如何添加？

```javascript
// webpack module 配置项中配置这个，开发环境中是这样的。生产环境有默认的就可以，不用配置这个选项，但是 "sideEffects": false 仍需要配置
optimization: {
    usedExports: true
},
```

- 然后在 package.json 中配置：
  - "sideEffects": false
- 含义为：Tree Shaking 正常对所有的模块进行 Tree Shaking 没有需要特殊处理的东西。
- 但在开发环境中 仍会将 （import { add } from './main.js'）除了 add 的 minus 打包到 js 文件中，这样利于调试和 sourceMap，生产环境就只会引入 add 了。

- 如果业务代码中，有引入 import ‘@babel/poly-fill’（@babel/poly-fill 其实不导出东西，会在 window 上挂载一些方法） 这种 还有像 import ‘xxx.css’文件时，因为这些都没有导出东西， 所以 Tree Shaking 会在打包的时候 忽略这种东西 进而可能对代码产生影响。
- "sideEffects": ['@babel/poly-fill']
- 以上为： Tree Shaking 就不会对@babel/poly-fill 起作用，就会正常打包，而不是忽略 babel/poly-fill
- 通常在 package.json 文件中 配置 "sideEffects": ['*.css'] ,就是说遇到 css 文件后，不使用 Tree Shaking
