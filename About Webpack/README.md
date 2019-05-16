# About Webpack 模块打包工具

- npm init -y 生成默认配置
- npm info webpack 查看历史所有版本
- webpack -v 全局的版本
- npx webpack -v 当前项目安装的版本
- npm i webpack@4.16.5 -D 安装某版本
- 对已提交不必要文件的处理方法
    - git rm -r --cached node_modules（要删除的文件名）
    - git push

- 自动生成 .gitignore 文件
    - https://www.gitignore.io/

- 指定配置文件打包
    - npx webpack --config config.js

- 运行webpack打包三种方式
    - webpack index.js
    - npx webpack index.js
    - npm run bundle -> webpack

- webpack-cli 这个工具作用：
    - 让我们可以在命令行中使用webpack这个命令

- chunks就是代码块的意思，有name的chunk是在entry里配置了name的，那些1，2，3，4啥的应该是用了code splitting配置生成的，数字是chunk的id

- 多个chunk合在一起就是bundle，一个bundle可以理解为一个大的js打包之后生成的文件，而多个bundle里可能有公共的部分，或者一个bundle里的东西并不需要一次性加载，需要按照路由按需加载，这个时候就需要按需加载，拆分成不同的chunk
