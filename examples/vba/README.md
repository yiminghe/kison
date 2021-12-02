# vba engine

vba engine, written in typescript/javascript

https://yiminghe.me/kison/examples/vba

## feature
- basic type: integer, array, string, double
- expression: not > < <> = >= <= + * / \ ^ += -= xor and or
- visibility: public/private variable and sub/function
- control logic: with, if then else, do while, for next, for each, goto
- function: sub/function, static variable
- error handling: function top level error handling
- class module
- binding: sub binding and class binding, vba engine even sub binding to provide native vba function/class, such as lbound/ubound/Collection

## usage

typescript recommended, it will provide latest documentation. for details, checkout tests: https://github.com/yiminghe/kison/tree/master/examples/vba/tests

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

## api

### Context

### new Context()

initialize a execution context (where module level variable resides)

#### Context.prototype.registerSubBinding

register a js function into vb engine, argument type can be paramarray, optional or with defaultValue.

### Context.prototype.registerVariableBinding

register a js value into vb engine.

### Context.prototype.registerClassBinding

register a js class into vb engine.

### Context.prototype.load(code, file)

load vba code into engine, it can be specified as module file or class file with id and name, class's name `XX` will be used when call `new XX`.

### Context.prototype.callSub(subName, file?)

call sub by name inside a specified file, if omit file vba engine will search all public subs within loaded module file. 

