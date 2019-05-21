# Visual Studio Code 下的 jsconfig.json

## jsconfig.json 是什么?

如果你的项目中有一个 jsconfig.json文件的话,这个文件的配置可以对你的文件所在目录下的所有js代码做出个性化支持.

Tip: 如果你在项目中新加了这个文件,记得重启一下vscode哦~

例子
exclude 属性
当vscode扫描项目代码的时候,如果遇到了node_module的话是会变得很慢的.

如果想要编辑器的性能有一个提升的话,我们应该排除这个文件夹.

```javascript
{
    "exclude": [
        "node_modules"
    ]
}
```

include 属性
当然还有相对的include属性

```javascript
{
    "include": [
        "src/**/*"
    ]
}
```

webpack aliases 的支持
如果我们在我们的webpack里面配置的路径的别名,心细的小朋友就发现了. 我们的vscode不能根据别名路径导入的包跳转文件了.所以我们还需要jsconfig.json的支持.

```javascript
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@component": ["./src/component"]
    }
  }
}
```

- jsconfig.json的配置是tsconfig.json的子集.
