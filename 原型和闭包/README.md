# 原型和闭包

```javascript

```

## 对象

```javascript
function show(x) {

            console.log(typeof x);    // undefined
            console.log(typeof 10);   // number
            console.log(typeof 'abc'); // string
            console.log(typeof true);  // boolean

            console.log(typeof function () {});  //function

            console.log(typeof [1, 'a', true]);  //object
            console.log(typeof { a: 10, b: 20 });  //object
            console.log(typeof null);  //object
            console.log(typeof new Number(10));  //object
        }
        show();
```

- 以上代码列出了typeof输出的集中类型标识，其中上面的四种（undefined, number, string, boolean）属于简单的值类型，不是对象。剩下的几种情况——函数、数组、对象、null、new Number(10)都是对象。他们都是引用类型。

- 一切（引用类型）都是对象，对象是属性的集合。

## 函数和对象的关系

- 对象都是通过函数来创建的。

## 函数的prototype原型

- 函数也是一种对象。他也是属性的集合，你也可以对函数进行自定义属性。
- 默认的给函数一个属性——prototype。对，每个函数都有一个属性叫做prototype。
- 这个prototype的属性值是一个对象（属性的集合，再次强调！），默认的只有一个叫做constructor的属性，指向这个函数本身。
- 每个对象都有一个隐藏的属性——“__proto__”，这个属性引用了创建这个对象的函数的prototype。即：fn.__proto__ === Fn.prototype ，这里的"__proto__"成为“隐式原型”

## __proto__ 隐式原型

- 每个函数function都有一个prototype，即原型。这里再加一句话——每个对象都有一个__proto__，可成为隐式原型。

```javascript
var obj = {}
console.log(obj.__proto__)
```

- 上面结果看来，obj.__proto__和Object.prototype的属性一样！
- obj这个对象本质上是被Object函数创建的，因此obj.__proto__=== Object.prototype。
- **每个对象都有一个__proto__属性，指向创建该对象的函数的prototype。**
- **但是Object.prototype确实一个特例——它的__proto__指向的是null，切记切记！**
- **自定义函数Foo.__proto__指向Function.prototype，Object.__proto__指向Function.prototype**
- 注意以上两条的区别

> Function.prototype指向的对象，它的__proto__是不是也指向Object.prototype？
> 答案是肯定的。因为Function.prototype指向的对象也是一个普通的被Object创建的对象，所以也遵循基本的规则。

- Function也是一个函数，函数是一种对象，也有__proto__属性。既然是函数，那么它一定是被Function创建。所以——Function是被自身创建的。所以它的__proto__指向了自身的Prototype。

## instanceof

- Instanceof运算符的第一个变量是一个对象，暂时称为A；第二个变量一般是一个函数，暂时称为B。

- Instanceof的判断规则是：沿着A的__proto__这条线来找，同时沿着B的prototype这条线来找，如果两条线能找到同一个引用，即同一个对象，那么就返回true。如果找到终点还未重合，则返回false。

- Instanceof这样设计，到底有什么用？到底instanceof想表达什么呢？

> instanceof表示的就是一种继承关系，或者原型链的结构。

## 继承和原型链

- javascript中的继承是通过原型链来体现的。
- **访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着__proto__这条链向上找，这就是原型链。**
- 在实际应用中如何区分一个属性到底是基本的还是从原型中找到的呢？大家可能都知道答案了——hasOwnProperty
- 由于所有的对象的原型链都会找到Object.prototype，因此所有的对象都会有Object.prototype的方法。这就是所谓的“继承”。
- 举个函数的例子

> 我们都知道每个函数都有call，apply方法，都有length，arguments，caller等属性。为什么每个函数都有？这肯定是“继承”的。函数由Function函数创建，因此继承的Function.prototype中的方法。

## 原型的灵活性

- 首先，对象属性可以随时改动。
- 其次，如果继承的方法不合适，可以做出修改。
- 最后，如果感觉当前缺少你要用的方法，可以自己去创建。
- 如果你要添加内置方法的原型属性，最好做一步判断，如果该属性不存在，则添加。如果本来就存在，就没必要再添加了。

## 简述【执行上下文】上

- javascript在执行一个代码段之前，都会进行这些“准备工作”来生成执行上下文。这个“代码段”其实分三种情况——全局代码，函数体，eval代码。
  - 首先，全局代码是一种，这个应该没有非议，本来就是手写文本到<script>标签里面的。
  - 其次，eval代码接收的也是一段文本形式的代码。**eval("alert(111)");**
  - 最后，函数体是代码段是因为函数在创建时，本质上是 new Function(…) 得来的，其中需要传入一个文本形式的参数作为函数体。

- 函数每被调用一次，都会产生一个新的执行上下文环境。因为不同的调用可能就会有不同的参数。
- 函数在定义的时候（不是调用的时候），就已经确定了函数体内部自由变量的作用域。

- 全局环境下的**准备工作**，即**全局代码的上下文环境**数据内容为：
  - 普通变量、函数表达式——变量声明，默认赋值为undefined；
  - this——赋值；
  - 函数声明  function fn() { } ——赋值；

- 如果代码段是函数体，那么在此基础上需要附加：
  - 参数 赋值
  - arguments（参数的 数组形式） 赋值
  - 自由变量的取值作用域 赋值

- 给执行上下文环境下一个通俗的定义——在执行代码之前，把将要用到的所有的变量都事先拿出来，有的直接赋值了，有的先用undefined占个空。

> 讲完了上下文环境，又来了新的问题——在执行js代码时，会有数不清的函数调用次数，会产生许多个上下文环境。这么多上下文环境该如何管理，以及如何销毁而释放内存呢？下一节将通过“执行上下文栈”来解释这个问题。

## this






















- 注意这两个this的指向

```javascript
var obj={
    x:10,
    fn:function(){
        console.log(this)
        function f() {
            console.log(this)
        }
        f()
    }
}
// {x: 10, fn: ƒ}
// Window
```
