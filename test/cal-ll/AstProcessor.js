class AstProcessor {
  stack = [];

  pushStack(node) {
    this.stack.push(node);
  }

  popStack() {
    return this.stack.pop();
  }

  createOpNode(op1) {
    const { stack } = this;
    const right = stack.pop();
    const op = stack.pop();
    const left = stack.pop();
    if (op1 !== op) {
      throw new Error("unmatched operator!");
    }
    const ret = op === "*" ? left * right : left + right;
    stack.push(ret);
    return ret;
  }
}

export default AstProcessor;
