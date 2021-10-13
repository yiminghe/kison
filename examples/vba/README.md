# vba js runtime

https://github.com/yiminghe/kison

## usage

```typescript
import { Runtime, SubDef } from 'vba';

const sampleCode = `
sub test
MsgBox 1
MsgBox 2
end sub
`.trim();

const MsgBoxSub: SubDef = {
  name: 'MsgBox',
  fn({ args }) {
    alert(args[0]?.value);
    return undefined;
  },
};

const runtime = new Runtime();
runtime.registerSub(MsgBoxSub);
runtime.run(sampleCode);
runtime.callSub('test');
```

