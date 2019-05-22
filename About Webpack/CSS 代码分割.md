# CSS 代码分割

## 借助 webpack 插件

- 一般在线上环境用，因为不支持热更新
- npm install --save-dev mini-css-extract-plugin

```javascript
import './style.css';
import './style1.css';
console.log('hello world');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

optimization: {
		usedExports: true,
		splitChunks: {
      chunks: 'all'
    }
    },

"sideEffects": [
    "*.css"
  ],

module: {
		rules:[{
			test: /\.scss$/,
			use: [
				loader: MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}, {
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader'
			]
		}]
    },
plugins: [
		new MiniCssExtractPlugin({
            // 用了这个插件后  打包后index.html页面将直接引用css文件时 就走filename 间接引用就走第二个 (实际测试中 一个css引入另一个css  这个插件会默认将两个css文件合并在一个css文件 加入到index.html中)
			filename: '[name].css',
			chunkFilename: '[name].chunk.css'
		})
    ]

```

## optimize-css-assets-webpack-plugin css 代码压缩、合并插件

```javascript
npm install --save-dev optimize-css-assets-webpack-plugin

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  },
```

- optimize-css-assets-webpack-plugin 借助 splitChunks 的 cacheGroups 可实现按入口不同打包到不同 css 文件 或者全部打包到 一个 style.css 的文件当中。
