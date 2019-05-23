# Progressive Web Application.

- PWA 的打包配置
- PWA (只有要上线的代码 才需要做 PWA 的处理)
- PWA 的技术: 当 web 服务挂掉了之后 依然可以访问之前访问过的页面（本地缓存了）
- 安装插件：npm i workbox-webpack-plugin -D 谷歌提供的插件
- serviceWorker 可以多看看~~~
- const WorkboxPlugin = require('workbox-webpack-plugin');

```javascript
plugins: [
  // SW service work
  new WorkboxPlugin.GenerateSW({
    //
    clientsClaim: true,
    //
    skipWaiting: true
  })
],
  // 业务代码中：
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration => {
        console.log("service-worker registed");
      })
      .catch(error => {
        console.log("service-worker register error");
      });
  });
}
```

- 打包后会生成 service-work.js 和 一个 precache-manifest.js 文件 就可以实现 PWA
