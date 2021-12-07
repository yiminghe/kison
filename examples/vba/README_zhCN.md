## vba

### 特性支持
‒ 基本类型：integer, array, string, double, date
‒ 操作符：not > < <> = >= <= + & * / \ ^ += -= xor and or
‒ 可访问性： public/private for variable/sub/function
‒ 控制逻辑：with, if then else, do while, for next, for each, goto
‒ 函数：sub/function, 静态变量，参数按值传递，参数按地址传递
‒ 错误处理：可以在函数级别抛出错误和捕获错误，并支持错误冒泡。
‒ 用户自定义类模块
‒ js 绑定：支持 js 函数，对象和类通过绑定机制注入到 vba engine。同时 vba 的一些内置函数和类目前也是通过绑定在外部实现，例如 lbound/ubound/Collection，对于一些缺失类和函数，用户可以同样在外部实现。

### 代码示例
推荐使用 typecript，基本上不需要看文档，如果想要了解全部特性支持，可具体翻阅测试用例.

```typescript
import { Context, SubBinding } from 'vba';

const sampleCode = `
sub main
debug.print 1
debug.print 2
end sub
`.trim();

const MsgBoxSub: SubBinding = {
  name: 'debug.print',
  argumentsInfo: [
    {
      name: 'msg',
    },
  ],
  async value(args) {
    console.log((await args.getValue('msg'))?.value);
  },
};

async function main(){
  const context = new Context();
  context.registerSubBinding(MsgBoxSub);
  await context.load(sampleCode);
  await context.callSub('main');
  // console log 1 and 2
}

main();
```

### 主要 api
‒ new Context: 初始化一个运行环境，模块级别的变量会保存在这里
‒ registerXXBinding: 将 js 环境下的变量，函数，类注入到 vba engine
‒ load(code,file): 加载代码，可以指定代码为模块文件还是类文件，类文件需要指定名字，用来被 new XX 调用
‒ callSub(name, file): 运行入口 vba 函数，可以指定函数所在的文档，不指定的话会从所有已加载的代码中查找同名的 public 函数.
