class CopyrightWebpackPlugin {
  // webpack 的一个实例  包含webpack相关的各种配置和打包的内容

  apply(compiler) {
    // 同步的写法
    compiler.hooks.compile.tap("CopyrightWebpackPlugin", compilation => {
      console.log("compiler");
    });
    // 异步的写法
    compiler.hooks.emit.tapAsync(
      "CopyrightWebpackPlugin",
      (compilation, cb) => {
        // node 调试工具  见 package.json
        debugger;
        compilation.assets["copyright.txt"] = {
          source: function() {
            return "copyright by dell lee";
          },
          size: function() {
            return 21;
          }
        };
        cb();
      }
    );
  }
}

module.exports = CopyrightWebpackPlugin;
