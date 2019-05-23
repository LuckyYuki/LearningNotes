# First Question

js里面怎么新创建一个对象，有几种方法（基础）

```javascript
a = {},a = new constructor(), a = Object.create()。

然后引申new是怎么实现的，如果了解过后面的这种方法问下原型链相关的东西

new 的实现如下：

function objectFactory() {

var obj = new Object(),

Constructor = [].shift.call(arguments);

obj.__proto__ = Constructor.prototype;

var ret = Constructor.apply(obj, arguments);

return typeof ret === 'object' ? ret : obj;

};
```

call的实现（基础）

```javascript
Function.prototype.call2 = function (context) {
var context = context || window;
context.fn = this;

var args = [];
for(var i = 1, len = arguments.length; i < len; i++) {
args.push('arguments[' + i + ']');
}

var result = eval('context.fn(' + args +')');

delete context.fn
return result;
}

// 测试一下
var value = 2;

var obj = {
value: 1
}

function bar(name, age) {
console.log(this.value);
return {
value: this.value,
name: name,
age: age
}
}

bar.call2(null); // 2

console.log(bar.call2(obj, 'kevin', 18));
```

apply的实现（基础）

```javascript
Function.prototype.apply = function (context, arr) {
var context = Object(context) || window;
context.fn = this;

var result;
if (!arr) {
result = context.fn();
}
else {
var args = [];
for (var i = 0, len = arr.length; i < len; i++) {
args.push('arr[' + i + ']');
}
result = eval('context.fn(' + args + ')')
}

delete context.fn
return result;
}

```

bind和call、apply的区别（基础）

```javascript
主要区别在于bind的返回值是一个函数，这个函数又可以作为构造函数来使用
```

apply传值是一个数组，还是一个类数组结构（基础）

```javascript
类数组结构和数组结构的区别在哪里，类数组怎么转换成数组结构
```

bind的实现（基础）

```javascript
Function.prototype.bind2 = function (context) {

if (typeof this !== "function") {
throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
}

var self = this;
var args = Array.prototype.slice.call(arguments, 1);

var fNOP = function () {};

var fBound = function () {
var bindArgs = Array.prototype.slice.call(arguments);
return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
}

fNOP.prototype = this.prototype;
fBound.prototype = new fNOP();
return fBound;
}
```

关于原型链（基础）

prototype和_proto_
prototype和_proto_

      1、prototype 是函数(function) 的一个属性, 它指向函数的原型.

      2、__proto__ 是对象的内部属性, 它指向构造器的原型, 对象依赖它进行原型链查询

prototype属性的引入

考虑到这一点，Brendan Eich决定为构造函数设置一个prototype属性。

这个属性包含一个对象（以下简称"prototype对象"），所有实例对象需要共享的属性和方法，都放在这个对象里面；那些不需要共享的属性和方法，就放在构造函数里面。

实例对象一旦创建，将自动引用prototype对象的属性和方法。也就是说，实例对象的属性和方法，分成两种，一种是本地的，另一种是引用的。

function DOG(name){

　this.name = name;

}

DOG.prototype = { species : '犬科' };

var dogA = new DOG('大毛');

var dogB = new DOG('二毛');

alert(dogA.species); // 犬科

alert(dogB.species); // 犬科

object.create()方法

假如说let a = object.create({b:'test',funA:function(){}}),那么它的原型链是什么样的。 a._proto_ === {b:‘test’,funA:function(){}}

缓存（需了解）

## request-header里面包含的字段

Header	解释	示例
Accept	指定客户端能够接收的内容类型	Accept: text/plain, text/html
Accept-Charset	浏览器可以接受的字符编码集。	Accept-Charset: iso-8859-5
Accept-Encoding	指定浏览器可以支持的web服务器返回内容压缩编码类型。	Accept-Encoding: compress, gzip
Accept-Language	浏览器可接受的语言	Accept-Language: en,zh
Accept-Ranges	可以请求网页实体的一个或者多个子范围字段	Accept-Ranges: bytes
Authorization	HTTP授权的授权证书	Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
Cache-Control	指定请求和响应遵循的缓存机制	Cache-Control: no-cache
Connection	表示是否需要持久连接。（HTTP 1.1默认进行持久连接）	Connection: close
Cookie	HTTP请求发送时，会把保存在该请求域名下的所有cookie值一起发送给web服务器。	Cookie: $Version=1; Skin=new;
Content-Length	请求的内容长度	Content-Length: 348
Content-Type	请求的与实体对应的MIME信息	Content-Type: application/x-www-form-urlencoded
Date	请求发送的日期和时间	Date: Tue, 15 Nov 2010 08:12:31 GMT
Expect	请求的特定的服务器行为	Expect: 100-continue
From	发出请求的用户的Email	From: user@email.com
Host	指定请求的服务器的域名和端口号	Host: www.zcmhi.com
If-Match	只有请求内容与实体相匹配才有效	If-Match: “737060cd8c284d8af7ad3082f209582d”
If-Modified-Since	如果请求的部分在指定时间之后被修改则请求成功，未被修改则返回304代码	If-Modified-Since: Sat, 29 Oct 2010 19:43:31 GMT
If-None-Match	如果内容未改变返回304代码，参数为服务器先前发送的Etag，与服务器回应的Etag比较判断是否改变	If-None-Match: “737060cd8c284d8af7ad3082f209582d”
If-Range	如果实体未改变，服务器发送客户端丢失的部分，否则发送整个实体。参数也为Etag	If-Range: “737060cd8c284d8af7ad3082f209582d”
If-Unmodified-Since	只在实体在指定时间之后未被修改才请求成功	If-Unmodified-Since: Sat, 29 Oct 2010 19:43:31 GMT
Max-Forwards	限制信息通过代理和网关传送的时间	Max-Forwards: 10
Pragma	用来包含实现特定的指令	Pragma: no-cache
Proxy-Authorization	连接到代理的授权证书	Proxy-Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
Range	只请求实体的一部分，指定范围	Range: bytes=500-999
Referer	先前网页的地址，当前请求网页紧随其后,即来路	Referer: http://www.zcmhi.com/archives/71.html
TE	客户端愿意接受的传输编码，并通知服务器接受接受尾加头信息	TE: trailers,deflate;q=0.5
Upgrade	向服务器指定某种传输协议以便服务器进行转换（如果支持）	Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11
User-Agent	User-Agent的内容包含发出请求的用户信息	User-Agent: Mozilla/5.0 (Linux; X11)
Via	通知中间网关或代理服务器地址，通信协议	Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)
Warning	关于消息实体的警告信息	Warn: 199 Miscellaneous warning

## Cache-Control (http1.1的常见头)

      1）public   
         仅体现在响应头，通知浏览器可以无条件的缓存该响应。
      2）private  
         仅体现在响应头，通知浏览器只针对单个用户缓存响应. 且可以具体指定某个字段.如private –“username”
      3）no-cache
          a) 请求头中：告诉浏览器回去服务器取数据，并验证你的缓存(如果有的话)。
          b) 响应头中：告诉浏览器，一定要回服务器校验，不管有没有缓存数据。 如果确定没有被改，可以使用缓存中的数据
      4）no-store 
          告诉浏览器任何情况下都不要被缓存。
      5）max-age
          a) 请求头中：强制响应浏览器，根据该值,校验缓存.即与自身的Age值,与请求时间做比较.如果超出max-    age值,则强制去服务器端验证.以确保返回一个新鲜的响应.其功能本质上与传统的Expires类似,但区别在于Ex    pires是根据某个特定日期值做比较.一但缓存者自身的时间不准确.则结果可能就是错误的.而max-age,显然无    此问题. Max-age的优先级也是高于Expires的.
          b) 响应头中：同上

ETag: "50b1c1d4f775c61:df3"  
        客户端的查询更新格式是这样的：  
        If-None-Match: W/"50b1c1d4f775c61:df3"  
        如果ETag没改变，则返回状态304然后不返回，这也和Last-Modified一样。

cookie相关（基础）

cookie选项包括：expires、domain、path、secure、HttpOnly。前端怎么获取到cookie，怎么修改，删除。

如果跨域的时候怎么带上去cookie

跨域的原理（基础）

jsonp、cros、https://segmentfault.com/a/1190000015597029

css（基础）

flex、rem有了解过吗和em的区别

深浅拷贝有了解吗（基础）

Object.assign是深拷贝还是浅拷贝，深拷贝一般是怎么实现的

for in，Object.keys，for of 的区别（进阶）

for...in循环出的是key，for...of循环出的是value

- for in

遍历对象及其原型链上可枚举的属性；
如果用于遍历数组，处理遍历其元素外，还会遍历开发者对数组对象自定义的可枚举属性及其原型链上的可枚举属性；
遍历对象返回的属性名和遍历数组返回的索引都是 string 类型；
某些情况下，可能按随机顺序遍历数组元素；

- Object.keys

返回对象自身可枚举属性组成的数组
不会遍历对象原型链上的属性以及 Symbol 属性
对数组的遍历顺序和 for in 一致
script标签加defer 、async 以及默认时的区别？（基础）

解释下event loop（进阶）

setInterval,serTimeout,process.nextTick,promise

es6有了解过吗。（进阶）

vue、react相关(进阶)

vue双向数据绑定的原理，数据更新视图没更新的问题、vue父子组件传值的方式，vue生命周期父组件子组件的created,mounted谁先执行

react生命周期介绍，react16新特性，不建议使用componentWillReceiveProps后对于props里面的传值该怎么处理，怎么对于一个内部数据很复杂的子组件来讲怎么快速把这个组件重置。

react-router,hashHistory,browserHistory有什么区别，怎么监听hash的变化

setState是异步的还是同步的，什么时候会同步（微任务的时候会同步执行）

怎么减少Dom操作，为什么（基础）

节流和防抖（基础，和闭包相关）

vue数据更新视图没更新解决办法(进阶)

数组，对象分别怎么处理。set，数组变异方法。对象的话set,object.assign 方法

## Another

问题

要点

记录

基础	

### css

1、父元素: width:100px,子元素 padding-top：20%,width:40px;最后渲染出来的结果是？为什么？

2、absolute、fixed、relative都是相对于谁定位？fixed 只是相对于窗口定位吗？有没有例外？

3、绝对居中

4、css3了解哪些

1、padding margin 百分比都是相对于父元素的宽度

2、fixed + transform

### js/html

1、为什么说要把script放后面,css放前面？

2、script标签加defer 、async 以及默认时的区别？

3、[[1,2],[3,4],[5,6]] 变成一维数组？一句话能实现吗？

4、正则：驼峰变中划线 aBcdEfG变成 a-bcd-ef-g

5、计数器，封装一个计数器，调一下+1，并返回当前计的数，不调就不变

6、es6了解的多吗，有哪些常见的属性或者方法？

7、浅拷贝和深拷贝的区别是什么？Object.assign是浅拷贝还是深拷贝？手写一个深拷贝函数？

8、跨域

jsonP原理
CROS原理

9、event loop

10.防抖和节流？

11、npm 版本号

x.x.x : 主版本号、次版本号、修订号
^ : 表示同一主版本号中，不小于指定版本号的版本号。
~ ：表示同一主版本号和次版本号中，不小于指定版本号的版本号

3、Array.prototype.concat.apply([], array);

apply 和 call 的区别是什么
5、考点：闭包

```javascript
var count = function (){
let i =0;

return function(){

return i++;

};
}
```

let var const 的区别
const a = {}; a.a =1;会报错吗？为什么？
const a；会报错吗？为什么？
6、箭头函数和es6之前的函数最显著的一个区别是什么？this

7、

```javascript
deepClone(parent){
    let child = {};
    if (typeof parent === 'object' && Object.keys(parent).length > 0) {
        for (var i in parent) {
            if (parent.hasOwnProperty(i)) {
               if (Object.prototype.toString.call(i) === "[Object Array]") {
                    child[i] = parent[i].slice();
                } else if (Object.prototype.toString.call(i) === "[Object Object]") {
                    child[i] = deepClone(parent[i]);
                } else {
                    child[i] = parent[i];
                }
            }
        }
    } else {
        child = parent;
    }
    return child;
}
```

### 框架	

1、vue 组件通信，原理是什么

### 开放性

- 关注过性能优化吗？性能优化应该从哪几个方面来做？
1、缓存

浏览器缓存
http缓存
通过什么字段控制的？
cache-control有哪些字段？no-cache VS no-store 区别？Etag是什么？原理是？
no-cache :
强制所有缓存了该响应的用户，在使用已缓存的数据前，发送带验证器的请求到服务器。不是字面意思上的不缓存。
no-store :
禁止缓存，每次请求都要向服务器重新获取数据

如果同时设置了cache-control 的 max-age 和 expired，哪个生效？为什么？

2、图片压缩

压缩算法了解过吗？
webP是有损还是无损（混合），PNG呢（无）？JPEG呢（有）？
3、CDN

CDN是什么？
哪些资源能分发到节点？哪些只能放源站？为什么？
4、压缩打包等

webpack 和 gulp 的区别是什么？
Gulp ： 基于流的自动化构建工具，处理文件的压缩、合并打包等，并不能将图片css等非js资源模块化。Gulp 让简单的任务简单，复杂的任务可管理
Webpack: 模块化管理和打包工具，能模块化非js资源，比如css 图片等等，代码分割按需加载
有写过webpack的插件吗？如果我希望在每个js文件头部加一句话，应该怎么做？

2、讲一件你觉得最有成就感的事，大概讲一下这件事情的背景、需求、你做了什么、遇到什么困难、你是怎么克服的	STAR 模型

### 算法

1、快排

### 思维方式

1、有人反馈，在天津那边打开一个h5页面白屏，你在北京这边打开是好的，这可能是什么原因导致的，说一下你的排查思路？
1、排除代码本身的问题

2、网络问题？4G、wifi 切换

3、劫持问题，http劫持，DNS劫持

4、怎么解决劫持的问题

http → https

DNS劫持 → local-DNS

2、某个h5的页面，在pc上看着没问题，但是在手机上有问题，应该怎么去排查这个问题。
