# vba js context

https://github.com/yiminghe/kison

## usage

```typescript
import { Context, SubBinder } from 'vba';

const sampleCode = `
sub test
MsgBox 1
MsgBox 2
end sub
`.trim();

const MsgBoxSub: SubBinder = {
  name: 'MsgBox',
  argumentsInfo:[{
    name:'msg',
  }],
  async fn(context) {
    console.log(context.getCurrentScope().getVariable('msg')?.value.value);
    return undefined;
  },
};

const context = new Context();
context.registerSubBinder(MsgBoxSub);
context.run(sampleCode);
context.callSub('test');
```

