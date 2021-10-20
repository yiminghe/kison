# vba js runtime

https://github.com/yiminghe/kison

## usage

```typescript
import { Runtime, SubBinder } from 'vba';

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
  async fn(runtime) {
    console.log(runtime.getCurrentScope().getVariable('msg')?.value.value);
    return undefined;
  },
};

const runtime = new Runtime();
runtime.registerSubBinder(MsgBoxSub);
runtime.run(sampleCode);
runtime.callSub('test');
```

