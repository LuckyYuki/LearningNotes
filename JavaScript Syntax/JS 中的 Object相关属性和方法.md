# JS 中的 Object相关属性和方法

## isPrototypeOf

isPrototypeOf是用来判断指定对象object1是否存在于另一个对象object2的原型链中，是则返回true，否则返回false。 
格式如下： 
object1.isPrototypeOf(object2); 
object1是一个对象的实例； 
object2是另一个将要检查其原型链的对象。 
原型链可以用来在同一个对象类型的不同实例之间共享功能。 
如果 object2 的原型链中包含object1，那么 isPrototypeOf 方法返回 true。 
如果 object2 不是一个对象或者 object1 没有出现在 object2 中的原型链中，isPrototypeOf 方法将返回 false。 

## hasOwnProperty

hasOwnProperty判断一个对象是否有名称的属性或对象，此方法无法检查该对象的原型链中是否具有该属性，该属性必须是对象本身的一个成员。
就是说无法检查继承过来的属性。
如果该属性或者方法是该 对象自身定义的而不是器原型链中定义的 则返回true;否则返回false; 
格式如下： 
object.hasOwnProperty(proName); 
判断proName的名称是不是object对象的一个属性或对象。

> 遍历一个对象的所有自身属性

在看开源项目的过程中，经常会看到类似如下的源码。for...in循环对象的所有枚举属性，然后再使用hasOwnProperty()方法来忽略继承属性。

```javascript
var buz = {
    fog: 'stack'
};

for (var name in buz) {
    if (buz.hasOwnProperty(name)) {
        alert("this is fog (" + name + ") for sure. Value: " + buz[name]);
    }
    else {
        alert(name); // toString or something else
    }
}
```

> 注意 hasOwnProperty 作为属性名

JavaScript 并没有保护 hasOwnProperty 属性名，因此，可能存在于一个包含此属性名的对象，有必要使用一个可扩展的hasOwnProperty方法来获取正确的结果：

```javascript
var foo = {
    hasOwnProperty: function() {
        return false;
    },
    bar: 'Here be dragons'
};

foo.hasOwnProperty('bar'); // 始终返回 false

// 如果担心这种情况，可以直接使用原型链上真正的 hasOwnProperty 方法
// 使用另一个对象的`hasOwnProperty` 并且call
({}).hasOwnProperty.call(foo, 'bar'); // true

// 也可以使用 Object 原型上的 hasOwnProperty 属性
Object.prototype.hasOwnProperty.call(foo, 'bar'); // true
```

## 使用in和hasOwnProperty获取对象属性的区别

in判断的是对象的所有属性，包括对象实例及其原型的属性；
而hasOwnProperty则是判断对象实例的是否具有某个属性。

## propertyIsEnumerable()方法

propertyIsEnumerable()用来检测属性是否属于某个对象的，如果检测到了，返回true,否则false

```javascript
obj.propertyIsEnumerable("属性名");
```

每个对象都有propertyIsEnumerable()方法，这个方法可以判断出指定的属性是否可枚举。
- 这个属性必须属于实例的，并且不属于原型。
- 这个属性必须是可枚举的，也就是自定义的属性。
- 如果对象没有指定的属性，该方法返回false

如果符合前两个要求，就会返回true.

可枚举： 如果一个属性可以使用for in 能遍历出，就是可枚举的。

下面例子使用propertyIsEnumerable()方法判断实例属性和原型属性：

```javascript
function Person(){
  this.name="我是实例属性";
  this.age=19;
}
var p=new Person();
console.log(p.propertyIsEnumerable("name")); //true

Person.prototype.prop="我是原型属性";//添加一个原型属性
console.log(p.propertyIsEnumerable("prop"));//false prop是继承自原型上的属性，所以返回的是false

for(var k in p){
  console.log(k+","+p[k]);//name,我是实例属性  age,19  prop,我是原型属性
}
```
