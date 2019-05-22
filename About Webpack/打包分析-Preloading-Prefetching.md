# 打包分析-Preloading-Prefetching

## 打包分析

- 看打包后的结果合不合理，以下为分析工具的仓库
  - www.github.com/webpack/analyse

```javascript
"dev-build": "webpack --profile --json > stats.json --config ./build/webpack.dev.js",
```

- 生成的 json 文件 可用来分析 http://webpack.github.com/analyse

## Preloading

```javascript
document.addEventListener("click", () => {
  // 在主要的js 加载完之后  再加载 click.js 。 这样即满足首屏异步加载  又满足预加载 提升性能
  import(/* webpackPreload: true */ "./click.js").then(({ default: func }) => {
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

## Prefetching

- webpackPrefetch 会等待核心代码加载完之后 带宽空余的时候加载 webpackPreload 会跟核心代码一起加载 所以这个不是很好

```javascript
document.addEventListener("click", () => {
  // 在主要的js 加载完之后  再加载 click.js 。 这样即满足首屏异步加载  又满足预加载 提升性能
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
