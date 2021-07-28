# regexp in js

https://github.com/yiminghe/kison

## usage

```js
import * as regexp from '@yiminghe/regexp';

// parse ast
console.log(regexp.parse('(a|b)*z'));

// match
const patternInstance = regexp.compile('(a|b)*z');
const matcher = patternInstance.matcher('abzaaz');
let m;
while (m = matcher.match()) {
  console.log(m);
}
```
