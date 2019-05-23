# ESLint 

```javascript
module.exports = {
	"extends": "airbnb",
    "parser": "babel-eslint",
    "rules": {
        "react/prefer-stateless-function": 0,
        "react/jsx-filename-extension": 0
    },
    globals: {
    //   指的是document 这个全局变量 在代码里 不允许覆盖 
    // ReactDom.render(<App />, document.getElementById('root'));
        document: false
    }
};
```

- npm i eslint-loader -D
- 即使编辑器没有安装eslint检测，在webpack打包时  也会提示eslint错误
```javascript
{ 
    test: /\.js$/, 
    exclude: /node_modules/, 
    use: ['babel-loader', 'eslint-loader']
}

devServer: {
    // 打包报错后 弹出报错的提示层
    overlay: true,
}
```

- 但是 eslint-loader 会降低打包的速度  所以要用 git钩子  来实现这个代码规范检测