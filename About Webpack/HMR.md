# HMR

```javascript
// import './style.css';
// var btn = document.createElement('button');
// btn.innerHTML = '新增';
// document.body.appendChild(btn);

// btn.onclick = function() {
// 	var div = document.createElement('div');
// 	div.innerHTML = 'item';
// 	document.body.appendChild(div);
// }

import counter from "./counter";
import number from "./number";

counter();
number();
// 这段代码是HMR热更新原理，当更改js某一模块的时候，以下代码会自动替换相应模块，css同样需要这段处理的代码，只不过我们不用写，cs-loader帮我们实现了，写vue的时候 vue-loader 也帮我们实现了，react的时候 babel-preset 也内置了这种实现，所以在写react的时候 也不用写HMR的这段代码。当引入一些比较偏的类型文件时候 这时候对应的loader并没有实现hmr的效果  此时需要写这种代码。
if (module.hot) {
  // 当number变化时 执行这个回调
  module.hot.accept("./number", () => {
    document.body.removeChild(document.getElementById("number"));
    number();
  });
}
```
