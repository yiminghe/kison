class AstProcessor {
  stack = [];

  pushStack(node) {
    this.stack.push(node);
  }

  createUnaryNode(op) {
    const { stack } = this;
    const right = stack.pop();
    let rv = right;
    if (typeof right === 'object' && 'v' in right) {
      rv = right.v;
    }
    let ret;
    switch (op) {
      case '-':
        ret = -rv;
        break;
    }
    stack.push({
      op,
      v: ret,
    });
    return ret;
  }

  createOpNode() {
    const { stack } = this;
    const right = stack.pop();
    let rv = right;
    if (typeof right === 'object' && 'v' in right) {
      rv = right.v;
    }
    const op = stack.pop();
    const left = stack.pop();
    let lv = left;
    if (typeof left === 'object' && 'v' in left) {
      lv = left.v;
    }
    let ret;
    switch (op) {
      case '*':
        ret = lv * rv;
        break;
      case '+':
        ret = lv + rv;
        break;
      case '-':
        ret = lv - rv;
        break;
      case '/':
        ret = lv / rv;
        break;
      case '^':
        ret = lv ** rv;
        break;
    }
    stack.push({
      op,
      left,
      right,
      v: ret,
    });
    return ret;
  }
}

export default AstProcessor;
