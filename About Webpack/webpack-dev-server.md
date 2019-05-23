# 请求转发

- 做请求转发 而不是跨域处理
```javascript
entry: {
		main: './src/index.js'
	},
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true,
		hotOnly: true,
		// WebpackDevServer 解决单页面应用路由问题 
		historyApiFallback: true,
		proxy: {
			'/react/api': {
                target: 'https://www.dell-lee.com',
                // false 能对 https 网址进行转发
                secure: false,
                // /react/api/header.json 改为请求demo.json
				pathRewrite: {
					'header.json': 'demo.json'
                },
                // 有些网站对 origin 做了限制 防止外部网站爬虫  设置为true 就可以了
                changeOrigin: true,
                // 
				headers: {
                    host: 'www.dell-lee.com',
                    // 做些登录 鉴权的操作 ？？？
                    cookie: 'flag'
				}
			}
		}
	},
```

- WebpackDevServer 解决单页面应用路由问题

