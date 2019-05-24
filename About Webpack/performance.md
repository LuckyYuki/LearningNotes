# performance

- 1
  - 跟上技术的迭代 node、npm、Yarn、webpack
  - 在尽可能少的模块上应用loader  include exclude
  - 尽可能少地使用plugin 并确保可靠性，没有必要用的就不要用

- 2
  - resolve 参数合理配置

```javascript
entry: {
		main: './src/index.js',
	},
	resolve: {
        // 省略后缀  尽量少配置这些后缀
		extensions: ['.js', '.jsx'],
        // 默认引入文件 一般不配置
        mainFiles: ['index', 'child'],
        // 别名
		alias: {
			child: path.resolve(__dirname, '../src/a/b/c/child')
		}
	},
```

- 3 目标：使用DllPlugin 提高打包速度 
  - 第三方模块只打包一次
  - 引入第三方模块的时候 要去使用dll文件引入（这时候就要生成 manifest文件了）

```javascript

// 可以将打包后的js文件 添加到index.html文件当中
npm i add-asset-html-webpack-plugin -S
// webpack.common.js
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
new AddAssetHtmlWebpackPlugin({
    filepath: path.resolve(__dirname, '../dll/vendors.dll.js')
})
// 找第三方包的 映射关系  找到了就使用全局的变量去拿 第三方模块的东西 找不到才去 node-modules
// 里去找
new webpack.DllReferencePlugin({
    manifest: path.resolve(__dirname, '../dll/vendors.manifest.json')
})

"build:dll": "webpack --config ./build/webpack.dll.js"
//  webpack.dll.js

const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'production',
	entry: {
		vendors: ['react', 'react-dom', 'lodash']
	},
	output: {
		filename: '[name].dll.js',
        // 打包第三方库
		path: path.resolve(__dirname, '../dll'),
        // 生成个全局变量 供插件分析代码之间的引用关系 放入 manifest.json
		library: '[name]'
	},
	plugins: [
        // 插件分析代码之间的引用关系 放入 manifest.json
		new webpack.DllPlugin({
			name: '[name]',
			path: path.resolve(__dirname, '../dll/[name].manifest.json'),
		})
	]
}

```

- 优化 上面的代码：

```javascript
// webpack.dll.js
entry: {
    vendors: ['lodash'],
    react: ['react', 'react-dom'],
    jquery: ['jquery']
},
// webpack.common.js
const path = require('path');
const fs = require('fs');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');

const plugins = [
	new HtmlWebpackPlugin({
		template: 'src/index.html'
	}), 
	new CleanWebpackPlugin(['dist'], {
		root: path.resolve(__dirname, '../')
	})
];

const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
files.forEach(file => {
	if(/.*\.dll.js/.test(file)) {
		plugins.push(new AddAssetHtmlWebpackPlugin({
			filepath: path.resolve(__dirname, '../dll', file)
		}))
	}
	if(/.*\.manifest.json/.test(file)) {
		plugins.push(new webpack.DllReferencePlugin({
			manifest: path.resolve(__dirname, '../dll', file)
		}))
	}
})

```

- 4 控制包文件大小
  - 运用 代码分割
  - 使用 tree shaking

- 5 thread-loader happypack  这些运用node里的多进程或者 多cpu 打包
- 6  parallel-webpack 多个页面同时打包
- 7 合理使用source-map  
  - source-map 越详细 打包越慢
- 8 结合 stats 的json文件 分析打包结果  也很常用
- 9 开发环境内存编译  webpack-dev-server 不会生成dist目录 会放到内存里 
- 10 开发环境 无用  没必要的插件剔除  
- 11 有些loader的配置参数 也可以提高打包速度