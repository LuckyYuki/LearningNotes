# Code Splitting

```javascript
// 当遇到公用的类库时  自动分割代码
optimization: {
  splitChunks: {
    chunks: "all";
  }
}
```

- 代码分割，和 webpack 无关
- webpack 中实现代码分割，两种方式
- 同步代码： 只需要在 webpack.common.js 中做 optimization 的配置即可
- 异步代码(import): 异步代码，无需做任何配置，会自动进行代码分割，放置到新的文件中

  - 不管是同步的还是异步的代码分割，都是需要 splitChunkplugin 这个插件，并配置 webpack 配置

- 异步示例

```javascript
function getComponent() {
  // 执行这个 import 为 异步的实验性的语法 需要引入：
  // npm i babel-plugin-dynamic-import-webpack --save-dev
  // 安装完后 需要在babel。config.js中配置一下
  return import("lodash").then(({ default: _ }) => {
    var element = document.createElement("div");
    element.innerHTML = _.join(["Dell", "Lee"], "-");
    return element;
  });
}

getComponent().then(element => {
  document.body.appendChild(element);
});
// babel配置
{
	presets: [
		[
			"@babel/preset-env", {
				targets: {
					chrome: "67",
				},
				useBuiltIns: 'usage'
			}
		],
		"@babel/preset-react"
	],
	plugins: ["dynamic-import-webpack"]
}

```

- babel-plugin-dynamic-import-webpack 为非官方推荐的 import 动态引入组件的插件
- 官方推荐的是 @babel/plugin-syntax-dynamic-import 这个可以配置如下的写法,
- 而 babel-plugin-dynamic-import-webpack 不能这样写 不支持

```javascript
function getComponent() {
    // 魔法注释 代码分割的时候起的名字叫 lodash.js
  return import(/* webpackChunkName:"lodash" */ "lodash").then(({ default: _ }) => {
    var element = document.createElement("div");
    element.innerHTML = _.join(["Dell", "Lee"], "-");
    return element;
  });
}

getComponent().then(element => {
  document.body.appendChild(element);
});

// webpack 配置

module.exports = {
  // 默认配置
  optimization: {
    splitChunks: {
        // 只对异步代码有效  如果同步的有效 改成chunks: 'all', 或者initial （同步） 还需要配置cacheGroups 下的 vendors 下的test
      chunks: 'async',
    //   字节数  小于30000  就不 做代码分割  一般30KB 就可以了
      minSize: 30000,
      maxSize: 0,
      // 当一个模块用了至少多少次的时候 才进行代码分割
      minChunks: 1,
      // 同时加载的模块 5个   一般不用改
      maxAsyncRequests: 5,
      // 入口文件 如果引入超过3个库  最多也分割成3个js  一般不用改
      maxInitialRequests: 3,
      // 文件连接符
      automaticNameDelimiter: '~',
      // 让以下的 filename 有效
      name: true,
      // 更改默认配置以下的vendors default  这样就是lodash名字了  /* webpackChunkName:"lodash" */
      //  cacheGroups
      cacheGroups: {
        vendors: false,
        default: false
        // vendors: {
        //   test: /[\\/]node_modules[\\/]/,
            // 指定 名称
        //   filename: 'vendors.js',
            // 打包的优先级 比较高
        //   priority: -10
        // },
        // default: {
        //   minChunks: 2,
        //   priority: -20,
            // 复用已经打包过的模块
        //   reuseExistingChunk: true,
        //   filename: 'common.js',
        // }
      }
    }
  }
};

// babel配置
{
	presets: [
		[
			"@babel/preset-env", {
				targets: {
					chrome: "67",
				},
				useBuiltIns: 'usage'
			}
		],
		"@babel/preset-react"
	],
	plugins: [" @babel/plugin-syntax-dynamic-import"]
}

```
