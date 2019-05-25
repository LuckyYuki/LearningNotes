# Bundler 源码编写（模块分析）

- npm i cli-highlight -g 高亮显示工具
- node bundler.js | hightlight

- 帮助分析语法的库 @babel/parse

- 快速帮我们找到import的节点  @babel/traverse

- 找到依赖关系后还需要 对代码进行翻译 比如es6 转为 es5
- 用到库 @babel/core


## Bundler 源码编写 Dependencies Graph 依赖图谱

- 遍历所有源文件 生成Dependencies Graph
- Bundler 源码编写（ 生成代码 ）
