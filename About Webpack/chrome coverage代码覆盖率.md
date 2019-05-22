# chrome coverage 代码覆盖率

- 高性能前端代码 重点考虑代码使用率
- 剩下没使用的代码 用异步加载的方式 可提高首页渲染时间 效率 即首屏加载时间

- 多写一些异步加载的代码 才能让网站的性能真正的提升 而同步的代码 只能增加缓存 提升有限

```javascript
document.addEventListener("click", () => {
  import(/* webpackPrefetch: true */ "./click.js").then(({ default: func }) => {
    func();
  });
});

// click.js
function handleClick() {
  const element = document.createElement("div");
  element.innerHTML = "Dell Lee";
  document.body.appendChild(element);
}

export default handleClick;
```

- 缓存代码带来的性能提升是有限的，多想想如何让页面加载的代码 提升代码的覆盖率 有些交互的组件完全可以写在异步组件中去 通过懒加载的方式 加载进来 不过你可能觉得 懒加载会牺牲一些用户体检 这时候就可以 用 import(/_ webpackPrefetch: true _/ "./click.js").then 来解决， 但是 Prefetch 在某些浏览器上会有些兼容性的问题，使用的时候注意即可
