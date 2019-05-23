# Caching

```javascript
output: {
		filename: '[name].[contenthash].js',
		chunkFilename: '[name].[contenthash].js'
	}
```

- 新版本的 webpack 不该代码 生成的 hash 不会变，但是老版本的 webpack4（比较低的）会改变 hash，这时候为了客户端缓存，是需要额外配置的：(新版本设置了也没有问题)
- 但是会多生成个 runtime 的 js 文件，是因为 manifest 这个的原因，它代表 js 文件之间的关系代码，在老版本中这个 manifest 会存在各个 js 文件之间 代码没变 hash 变了的原因就是这个代表关系的 manifest 变化了，所以导致 hash 变了。而老版本配置了以下选项后 就把这个 manifest 放到了 runtime 文件当中。

```javascript
optimization: {
  runtimeChunk: {
    name: "runtime";
  }
}
```
