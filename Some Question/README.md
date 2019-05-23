# Some Question

- 请写出一下代码的输出结果：

```javascript
Array.prototype.max = function() {
    return 1;
};
const seats = [1, 2, 3, 4];
let total = 0; 
for (const i in seats) {
    total += parseInt(i, 10);
} 
console.log(total);
```

输出结果：

- 产生一个数组，长度为10，并向其中随机插入数字为1-50的整数，并且不能重复。

- 写一个parseData函数

输入数据如下格式：

```javascript
const data = [
    ['a', 'b', ...], // 个数不确定
    ['A', 'B', ...], // 个数不确定
    ['0', '1', ...], // 个数不确定
    ... // 个数不确定
];
```

输出数据为以下格式 ：
['aA0', 'aB0', 'aA1', 'aB1','bA0', 'bB0', 'bA1', 'bB1',...]

示例：

parseData([ ['a'], ['A', 'B'], ['0', '1'] ]); // ==> ['aA0', 'aB0', 'aA1', 'aB1']
parseData([ ['a', 'b'], ['A', 'B'], ['0', '1'] ]); // ==> ['aA0', 'aB0', 'aA1', 'aB1','bA0', 'bB0', 'bA1', 'bB1']

- div中div元素水平垂直居中（长度宽度均未知）

- 以下代码输出以下结果：

```javascript
console.log(1);
setTimeout(() => {
    console.log(2)
}, 0);
const promist = new Promist ((resolve, reject ) => {
    console.log(3);
    resolve(4);
});
promise.then((val) => {
    console.log(val);
})
```

## VUE：

1. 响应式原理
2. Vue（生命周期，通信, nextTick-->可结合event loop）
3. 单页面应用（以及优缺点）和多页面区别
4. 路由原理，传参方式，keepalive beforeRouteEnter beforeRouteLeave
5. vuex

JS：

1. js基本类型，typeof 输出
2. 介绍原型链 概念 原理
3. 继承方法和原理
4. http缓存机制（强制缓存和协商缓存等介绍，每次返回的http状态码多少，tcp链接 三次握手 四次挥手 为啥握手需要三次但挥手需要四次）
5. 输入url到看到页面整个过程，越详细越好（dns查询，在本地缓存或dns服务器寻找。。。）
6. 赋值 浅拷贝 深拷贝 区别 写代码实现
7. 预加载，图片懒加载原理
8. 函数防抖 函数节流 及应用场景
9. 函数的arguments是数组吗，怎样转数组
10. js实现一个闭包函数，每次调用都自增1
11. webview之间通信方法
12. js执行机制（event loop 微任务 宏任务）
13. 项目性能优化方法
14. webpack介绍(入口文件怎么配置等)
15. ES6常用功能（箭头函数this，promise，数组对象方法扩展，数组去重）
16. 判断环境（ios android 微信等）
17. js模块化（export和export default区别 Commonjs AMD CMD规范）
18. 正则（身份证号 手机号 邮箱 一段数字加上千位符）

CSS：

1. 动画（transition animation transform）
2. BFC是什么（block formatting context 块级格式化上下文）BFC布局规则，哪些行为会触发BFC
3. 刘海屏兼容
4. scss sass常用功能
5. 实现三角形
