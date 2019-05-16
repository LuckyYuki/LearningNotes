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

- 制定配置文件打包
    - npx webpack --config config.js

- 运行webpack打包三种方式
    - webpack index.js
    - npx webpack index.js
    - npm run bundle -> webpack

- webpack-cli 这个工具作用：
    - 让我们可以在命令行中使用webpack这个命令

