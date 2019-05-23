# Lodash

- 学习lodash——这一篇就够用
  - https://blog.csdn.net/qq_35414779/article/details/79077618

- lodash入门
  - https://www.jianshu.com/p/d46abfa4ddc9

- Lodash学习笔记
  - https://www.cnblogs.com/webbest/p/8268115.html

```javascript
    var objA = {
        "name": "戈德斯文"
    };
    var objB = _.cloneDeep(objA);
    console.log(objA);
    console.log(objB);
    console.log(objA === objB);
```

> 深度克隆JavaScript对象是困难的，并且也没有什么简单的解决方案。你可以使用原生的解决方案:JSON.parse(JSON.stringify(objectToClone)) 进行深度克隆。但是，这种方案仅在对象内部没有方法的时候才可行。

