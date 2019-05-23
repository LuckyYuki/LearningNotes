# Shimming 就是指的垫片这种东西

- 比如说某些库没有引入 lodash 或者 jquery 但是库里采用了 \$ 和 \_ 的操作，这样库是不能用的，但是我们还想用，这样就可以用 垫片 这个功能。
- webpack 自带相关插件为： ProvidePlugin

```javascript
new webpack.ProvidePlugin({
			$: 'jquery',
            _join: ['lodash', 'join'],
            // 这里配置的  lodash 和 jquery  不用在顶部 import 也不是变量
            _: 'lodash'
		}),
```

- 一个模块里的 this 永远指向这个模块本身，但是有时候想让 this 指的是 window，我们这样来做：
- 引入： npm i imports-loader -D

```javascript
{
    test: /\.js$/,
    exclude: /node_modules/,
    use: [{
        loader: 'babel-loader'
    }, {
        loader: 'imports-loader?this=>window'
    }]
}
```
