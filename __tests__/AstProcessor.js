class AstProcessor {
  stack = [];

  pushStack(node) {
    this.stack.push(node);
  }

  popStack() {
    return this.stack.pop();
  }

  createOpNode(op1) {
    const right = this.stack.pop();
    const op = this.stack.pop();
    const left = this.stack.pop();
    if (op1 !== op) {
      throw new Error("unmatched operator!");
    }
    this.stack.push({
      left,
      right,
      type: op
    });
  }
}

export default AstProcessor;
