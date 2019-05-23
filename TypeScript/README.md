# TS 是微软的产品

- 规范我们的js代码，同时方便报错 提示等。提高可维护性。一般后缀为 ts 或 tsx
- 类型检测机制

- npm i ts-loader typescript -D
- TS的webpack 配置
- 配置 ts-loader 后 还需要 配置 tsconfig.json 文件

```javascript
{
	"compilerOpitons": {
		"outDir": "./dist",
		"module": "es6",
		"target": "es5",
		"allowJs": true,
	}
}
```
- 引入 lodash 库  当方法使用错误时  直接提示，这时候需要引入lodash 对应ts的一个类型文件 
- npm i @types/lodash -D
  - typesearch 搜索 http://microsoft.github.io/TypeSearch/   （查找模块的类型文件）
```javascript
import * as _ from 'lodash';

class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
  	return _.join(["Hello,", ' ', this.greeting], '');
  }
}

let greeter = new Greeter("world");

alert(greeter.greet());
```