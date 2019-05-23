# [中高级面试](https://www.jianshu.com/p/d7c31c56229f)

面试出题尽量避免直接问知识点，而是转化成一些实际的使用场景提问。一方面避开培训机构应试教育，一方面考察应用能力。

## HTML 与 CSS 问题

考察点：

基础、应用、各种方案取舍背后的逻辑
渲染
缓存

行内元素和块元素有哪些，有哪些差别	1	基础	正确列举和描述	嵌套、padding 的特殊效果	
承：行内元素和块元素应用上的差别	2	应用	嵌套、margin & padding、padding 的特殊效果	

css选择器优先级	1	基础	列举全面	讲出实际应该如何应用	
浏览器内核	1	基础	能正确分类（Trident/Webkit/Gecko）	无需说出具体名字
css画三角形	1	应用	border + height	

清除浮动的方法	1	基础	伪元素	伪元素+zoom1	
承：各方法的原理及优缺点	2	深度	可维护性、BFC闭合浮动	

伪类伪元素的列举、差异	1	基础	讲清定义、写法的差异	

承：::before 中 content 的取值	2	应用	attr、counter、quote 中的一个及以上	

多行文字溢出显示省略号	2	应用	能解答并指出 webkit	

元素保持宽高比缩放	2	应用	padding 百分比+完整方案	

手机滑屏卡顿如何解决	3	渲染	考虑多方面可能性并给出解决方案	

哪些东西会被缓存，缓存逻辑是什么

2	缓存 讲清楚缓存机制，对服务器有所了解

## JS问题

考察点：

问题	级别	考察点	得分点	加分点	备注

ajax 请求时，get 和 post 的区别	1	基础	restful、数据量	缓存	

闭包的概念和使用场景	1	应用	变量保存、插件、…	

js变量的作用域	1	基础	函数级、全局、块级	讲到函数内不带 var	

jsonp 后端原理	1	逻辑	参数作为函数名拼接字符串	

概念解释：Array 的几个方法、ls、

websocket、webworker、historyapi

ajax post 跨域及原理	2	应用	CORS、接口转发	

XSS概念及解决办法	2	应用	encodeURI、innerText、…	

js 对象深克隆及原理	2	基础	递归赋值、引用类型

json.parse+stringify

x = new a() 可以用哪几行代码替代	2	原型链	x = {}; a.apply(x); x.__proto__ = a.prototype;	

代码题：

读下面代码，看注释各处的各个值都是什么，要求解释全过程。考察 new 和 this。

function a(){ this.x = 1; }
// a.x 			undefined
a.x = 2;
// a.x 			2
var b = a();
// b.x 			报错 or undefined
var c = new a();
// c.x			1
