# JavaScript 代码规范

*一种写JavaScript更合理的代码风格。*

## <a id="table-of-contents">目录</a>

1. [对象](#objects)
2. [数组](#arrays)
3. [解构](#destructuring)
4. [方法](#functions)
5. [箭头函数](#arrow-functions)
6. [类和构造器](#classes--constructors)
7. [模块](#modules)

## <a id="objects">对象</a>

- 1.1 在创建具有动态属性名称的对象时使用计算属性名。

 > 为什么? 它允许你在一个地方定义对象的所有属性。

  ```javascript
  function getKey(k) {
    return `a key named ${k}`;
  }

  // bad
  const obj = {
    id: 5,
    name: 'San Francisco',
  };
  obj[getKey('enabled')] = true;

  // good
  const obj = {
    id: 5,
    name: 'San Francisco',
    [getKey('enabled')]: true,
  };
  ```

- 1.2 只使用引号标注无效标识符的属性。

> 为什么? 总的来说，我们认为这样更容易阅读。 它提升了语法高亮显示，并且更容易通过许多 JS 引擎优化。

```javascript
// bad
const bad = {
  'foo': 3,
  'bar': 4,
  'data-blah': 5,
};

// good
const good = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
};
```

- 1.3 不能直接调用 Object.prototype 的方法，如： hasOwnProperty 、 propertyIsEnumerable 和 isPrototypeOf。

> 为什么? 这些方法可能被一下问题对象的属性追踪 - 相应的有 { hasOwnProperty: false } - 或者，对象是一个空对象 (Object.create(null))。

```javascript
// bad
console.log(object.hasOwnProperty(key));

// good
console.log(Object.prototype.hasOwnProperty.call(object, key));

// best
const has = Object.prototype.hasOwnProperty; // 在模块范围内的缓存中查找一次
/* or */
import has from 'has'; // https://www.npmjs.com/package/has
// ...
console.log(has.call(object, key));
```

- 1.4 更喜欢对象扩展操作符，而不是用 Object.assign 浅拷贝一个对象。 使用对象的 rest 操作符来获得一个具有某些属性的新对象。

```javascript
// very bad
const original = { a: 1, b: 2 };
const copy = Object.assign(original, { c: 3 }); // 变异的 `original` ಠ_ಠ
delete copy.a; // 这....

// bad
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

// good
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
```

**[⬆ 返回目录](#table-of-contents)**

## <a id="arrays">数组</a>

- 2.1 使用数组展开方法 ... 来拷贝数组。

```javascript
// bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i += 1) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];
```

- 2.2 将一个类数组对象转换成一个数组， 使用展开方法 ... 代替 Array.from。

```javascript
const foo = document.querySelectorAll('.foo');

// good
const nodes = Array.from(foo);

// best
const nodes = [...foo];
```

- 2.3 对于对迭代器的映射，使用 Array.from 替代展开方法 ... ， 因为它避免了创建中间数组。

```javascript
// bad
const baz = [...foo].map(bar);

// good
const baz = Array.from(foo, bar);

eg.
var foo=[1,2,3];
var bar=a=>a+1;
[...foo].map(bar);
// [2, 3, 4]
Array.from(foo, bar);
// [2, 3, 4]
```

**[⬆ 返回目录](#table-of-contents)**

## <a id="destructuring">解构</a>

- 3.1 在访问和使用对象的多个属性的时候使用对象的解构。

> 为什么? 解构可以避免为这些属性创建临时引用。

```javascript
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;

  return `${firstName} ${lastName}`;
}

// good
function getFullName(user) {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}

// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
```

- 3.2 使用数组解构。

```javascript
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```

- 3.3 对于多个返回值使用对象解构，而不是数组解构。

> 为什么? 你可以随时添加新的属性或者改变属性的顺序，而不用修改调用方。

```javascript
// bad
function processInput(input) {
  // 处理代码...
  return [left, right, top, bottom];
}

// 调用者需要考虑返回数据的顺序。
const [left, __, top] = processInput(input);

// good
function processInput(input) {
  // 处理代码...
  return { left, right, top, bottom };
}

// 调用者只选择他们需要的数据。
const { left, top } = processInput(input);
```

**[⬆ 返回目录](#table-of-contents)**

## <a id="functions">方法</a>

- 4.1 使用命名的函数表达式代替函数声明。

> 为什么? 函数声明是挂起的，这意味着在它在文件中定义之前，很容易引用函数。这会损害可读性和可维护性。如果您发现函数的定义是大的或复杂的，以至于它干扰了对文件的其余部分的理解，那么也许是时候将它提取到它自己的模块中了!不要忘记显式地命名这个表达式，不管它的名称是否从包含变量(在现代浏览器中经常是这样，或者在使用诸如Babel之类的编译器时)。这消除了对错误的调用堆栈的任何假设。

```javascript
// bad
function foo() {
  // ...
}

// bad
const foo = function () {
  // ...
};

// good
// 从变量引用调用中区分的词汇名称
const short = function longUniqueMoreDescriptiveLexicalFoo() {
  // ...
};
```

- 4.2 Wrap立即调用函数表达式。

> 为什么? 立即调用的函数表达式是单个单元 - 包装， 并且拥有括号调用, 在括号内, 清晰的表达式。 请注意，在一个到处都是模块的世界中，您几乎不需要一个 IIFE 。

```javascript
// immediately-invoked function expression (IIFE) 立即调用的函数表达式
(function () {
  console.log('Welcome to the Internet. Please follow me.');
}());
```

- 4.3 切记不要在非功能块中声明函数 (if, while, 等)。 将函数赋值给变量。 浏览器允许你这样做，但是他们都有不同的解释，这是个坏消息。

> ECMA-262 将 block 定义为语句列表。 函数声明不是语句。

```javascript
// bad
if (currentUser) {
  function test() {
    console.log('Nope.');
  }
}

// good
let test;
if (currentUser) {
  test = () => {
    console.log('Yup.');
  };
}
```

- 4.4 不要使用 arguments, 选择使用 rest 语法 ... 代替。

> 为什么? ... 明确了你想要拉取什么参数。 更甚, rest 参数是一个真正的数组，而不仅仅是类数组的 arguments 。

```javascript
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('');
}
```

- 4.5 使用默认的参数语法，而不是改变函数参数。

```javascript
// really bad
function handleThings(opts) {
  // No! We shouldn’t mutate function arguments.
  // Double bad: if opts is falsy it'll be set to an object which may
  // be what you want but it can introduce subtle bugs.
  opts = opts || {};
  // ...
}

// still bad
function handleThings(opts) {
  if (opts === void 0) {
    opts = {};
  }
  // ...
}

// good
function handleThings(opts = {}) {
  // ...
}
```

- 4.6 总是把默认参数放在最后。

```javascript
// bad
function handleThings(opts = {}, name) {
  // ...
}

// good
function handleThings(name, opts = {}) {
  // ...
}
```

- 4.7 没用变异参数。

> 为什么? 将传入的对象作为参数进行操作可能会在原始调用程序中造成不必要的变量副作用。

```javascript
// bad
function f1(obj) {
  obj.key = 1;
}

// good
function f2(obj) {
  const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
}
```

- 4.8 不要再赋值参数。

> 为什么? 重新赋值参数会导致意外的行为，尤其是在访问 `arguments` 对象的时候。 它还可能导致性能优化问题，尤其是在 V8 中。

```javascript
// bad
function f1(a) {
  a = 1;
  // ...
}

function f2(a) {
  if (!a) { a = 1; }
  // ...
}

// good
function f3(a) {
  const b = a || 1;
  // ...
}

function f4(a = 1) {
  // ...
}
```
- 4.9 优先使用扩展运算符 ... 来调用可变参数函数。

> 为什么? 它更加干净，你不需要提供上下文，并且你不能轻易的使用 `apply` 来 `new` 。

```javascript
// bad
const x = [1, 2, 3, 4, 5];
console.log.apply(console, x);

// good
const x = [1, 2, 3, 4, 5];
console.log(...x);

// bad
new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]));

// good
new Date(...[2016, 8, 5]);
```

**[⬆ 返回目录](#table-of-contents)**

## <a id="arrow-functions">箭头函数</a>

- 5.1 避免箭头函数符号 (=>) 和比较运算符 (<=, >=) 的混淆。

```javascript
// bad
const itemHeight = item => item.height > 256 ? item.largeSize : item.smallSize;

// bad
const itemHeight = (item) => item.height > 256 ? item.largeSize : item.smallSize;

// good
const itemHeight = item => (item.height > 256 ? item.largeSize : item.smallSize);

// good
const itemHeight = (item) => {
  const { height, largeSize, smallSize } = item;
  return height > 256 ? largeSize : smallSize;
};
```

**[⬆ 返回目录](#table-of-contents)**

## <a id="classes--constructors">类和构造器</a>

- 6.1 尽量使用 class. 避免直接操作 prototype .

> 为什么? `class` 语法更简洁，更容易推理。

```javascript
// bad
function Queue(contents = []) {
  this.queue = [...contents];
}
Queue.prototype.pop = function () {
  const value = this.queue[0];
  this.queue.splice(0, 1);
  return value;
};

// good
class Queue {
  constructor(contents = []) {
    this.queue = [...contents];
  }
  pop() {
    const value = this.queue[0];
    this.queue.splice(0, 1);
    return value;
  }
}
```

- 6.2 使用 extends 来扩展继承。

> 为什么? 它是一个内置的方法，可以在不破坏 `instanceof` 的情况下继承原型功能。

```javascript
// 彻底搞懂JS中的prototype、__proto__与constructor（图解）

// bad
const inherits = require('inherits');
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function () {
  return this.queue[0];
};

// good
class PeekableQueue extends Queue {
  peek() {
    return this.queue[0];
  }
}
```

- 6.3 方法返回了 `this` 来供其内部方法调用。

```javascript
// bad
Jedi.prototype.jump = function () {
  this.jumping = true;
  return true;
};

Jedi.prototype.setHeight = function (height) {
  this.height = height;
};

const luke = new Jedi();
luke.jump(); // => true
luke.setHeight(20); // => undefined

// good
class Jedi {
  jump() {
    this.jumping = true;
    return this;
  }

  setHeight(height) {
    this.height = height;
    return this;
  }
}

const luke = new Jedi();

luke.jump()
  .setHeight(20);
```

- 6.4 只要在确保能正常工作并且不产生任何副作用的情况下，编写一个自定义的 toString() 方法也是可以的。

```javascript
class Jedi {
  constructor(options = {}) {
    this.name = options.name || 'no name';
  }

  getName() {
    return this.name;
  }

  toString() {
    return `Jedi - ${this.getName()}`;
  }
}
```

**[⬆ 返回目录](#table-of-contents)**

## <a id="modules">模块</a>

- 7.1 你可能经常使用模块 (import/export) 在一些非标准模块的系统上。 你也可以在你喜欢的模块系统上相互转换。

> 为什么? 模块是未来的趋势，让我们拥抱未来。

```javascript
// bad
const AirbnbStyleGuide = require('./AirbnbStyleGuide');
module.exports = AirbnbStyleGuide.es6;

// ok
import AirbnbStyleGuide from './AirbnbStyleGuide';
export default AirbnbStyleGuide.es6;

// best
import { es6 } from './AirbnbStyleGuide';
export default es6;
```

- 7.2 只从一个路径导入所有需要的东西。

> 为什么? 从同一个路径导入多个行，使代码更难以维护。

```javascript
// bad
import foo from 'foo';
// … 其他导入 … //
import { named1, named2 } from 'foo';

// good
import foo, { named1, named2 } from 'foo';

// good
import foo, {
  named1,
  named2,
} from 'foo';
```

- 7.3 不要导出可变的引用。

> 为什么? 在一般情况下，应该避免发生突变，但是在导出可变引用时及其容易发生突变。虽然在某些特殊情况下，可能需要这样，但是一般情况下只需要导出常量引用。

```javascript
// bad
let foo = 3;
export { foo };

// good
const foo = 3;
export { foo };
```

- 7.4 在单个导出的模块中，选择默认模块而不是指定的导出。

> 为什么? 为了鼓励更多的文件只导出一件东西，这样可读性和可维护性更好。

```javascript
// bad
export function foo() {}

// good
export default function foo() {}
```

- 7.5 将所有的 imports 语句放在所有非导入语句的上边。

> 为什么? 由于所有的 `import` 都被提前，保持他们在顶部是为了防止意外发生。

```javascript
// bad
import foo from 'foo';
foo.init();

import bar from 'bar';

// good
import foo from 'foo';
import bar from 'bar';

foo.init();
```



**[⬆ 返回目录](#table-of-contents)**

## <a id="functions">方法</a>

- 4.1 

**[⬆ 返回目录](#table-of-contents)**

## <a id="functions">方法</a>

- 4.1 

**[⬆ 返回目录](#table-of-contents)**

## <a id="functions">方法</a>

- 4.1 

**[⬆ 返回目录](#table-of-contents)**

## <a id="functions">方法</a>

- 4.1 

**[⬆ 返回目录](#table-of-contents)**

## <a id="functions">方法</a>

- 4.1 

**[⬆ 返回目录](#table-of-contents)**

## <a id="functions">方法</a>

- 4.1 

**[⬆ 返回目录](#table-of-contents)**

## <a id="functions">方法</a>

- 4.1 

**[⬆ 返回目录](#table-of-contents)**

## <a id="functions">方法</a>

- 4.1 

**[⬆ 返回目录](#table-of-contents)**

## <a id="functions">方法</a>

- 4.1 

**[⬆ 返回目录](#table-of-contents)**
