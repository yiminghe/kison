# vba engine

vba engine, written in typescript/javascript

https://github.com/yiminghe/kison

## usage

```typescript
import { Context, SubBinder } from 'vba';

const sampleCode = `
sub main
MsgBox 1
MsgBox 2
end sub
`.trim();

const MsgBoxSub: SubBinder = {
  name: 'MsgBox',
  argumentsInfo:[{
    name:'msg',
  }],
  async fn(args) {
    console.log(args.msg?.value.value);
  },
};

async function main(){
  const context = new Context();
  context.registerSubBinder(MsgBoxSub);
  await context.load(sampleCode);
  await context.callSub('main');
}

main();
```

