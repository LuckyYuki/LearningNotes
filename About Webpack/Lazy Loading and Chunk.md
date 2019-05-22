# Lazy Loading

- 模块懒加载示例
- import 这种语法 可以在我们页面执行时 需要某些模块的时候 再去请求那些模块 的源代码 不需要一次性加载

```javascript
function getComponent() {
  return import(/* webpackChunkName:"lodash" */ "lodash").then(
    ({ default: _ }) => {
      var element = document.createElement("div");
      element.innerHTML = _.join(["Dell", "Lee"], "-");
      return element;
    }
  );
}

document.addEventListener("click", () => {
  getComponent().then(element => {
    document.body.appendChild(element);
  });
});
```

- 或者这样

```javascript
async function getComponent() {
  const { default: _ } = await import(/* webpackChunkName:"lodash" */ "lodash");
  const element = document.createElement("div");
  element.innerHTML = _.join(["Dell", "Lee"], "-");
  return element;
}

document.addEventListener("click", () => {
  getComponent().then(element => {
    document.body.appendChild(element);
  });
});
```

- Chunk 打包后的一个 js 文件 就叫一个 chunk
