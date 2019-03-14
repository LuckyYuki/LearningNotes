# Airbnb JavaScript 代码规范

*一种写JavaScript更合理的代码风格。*

## <a id="table-of-contents">目录</a>

1. [对象](#objects)

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

**[⬆ 返回目录](#table-of-contents)**
