# React

- @babel/preset-react 可以帮助我们解析 react 中的 jsx 代码

- 首先安装 react npm install react react-dom --save
- npm install --save-dev @babel/preset-react

```javascript
{
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          edge: "17",
          firefox: "60",
          chrome: "67",
          safari: "11.1"
        },
        useBuiltIns: "usage"
      }
    ],
    // 是有顺序的：从下到上，先将react转换为js代码  然后用@babel/preset-env转为es5
    "@babel/preset-react"
  ];
}
```
