# Airbnb JavaScript 代码规范

*一种写JavaScript更合理的代码风格。*

## <a id="table-of-contents">目录</a>

1. [对象](#objects)
2. [数组](#arrays)

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
