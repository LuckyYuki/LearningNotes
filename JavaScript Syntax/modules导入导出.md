# moudle.exports 与 exports，export 与 export default 之间的关系的区别 

> 前提，CommonJS模块规范和ES6模块规范完全是两种不同的概念。

## CommonJS模块规范

- Node应用由模块组成，采用CommonJS模块规范。根据这个规范，每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。

```javascript
var x = 5;
var addX = function (value) {
  return value + x;
};
module.exports.x = x;
module.exports.addX = addX;

```

- 上面代码通过module.exports输出变量x和函数addX。

- require方法用于加载模块。

```javascript
var example = require('./example.js');

console.log(example.x); // 5
console.log(example.addX(1)); // 6
```

### exports 与 module.exports

- 为了方便，Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行这样的命令。

```javascript
var exports = module.exports;
```

- 于是我们可以直接在 exports 对象上添加方法，表示对外输出的接口，如同在module.exports上添加一样。注意，不能直接将exports变量指向一个值，因为这样等于切断了exports与module.exports的联系。

## ES6模块规范

- 不同于CommonJS，ES6使用 export 和 import 来导出、导入模块。

```javascript
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};
```

- 需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

```javascript
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};
```

### export default 命令

- 使用export default命令，为模块指定默认输出。

```javascript
// export-default.js
export default function () {
  console.log('foo');
}
```
