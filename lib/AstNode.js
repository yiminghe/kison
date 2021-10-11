class AstNode {
  parent = null;
  symbol = undefined;
  label = undefined;
  type = undefined;

  constructor(cfg) {
    Object.assign(this, cfg);
    if (cfg.children) {
      this.setChildren(cfg.children);
    }
  }

  addChild(c) {
    this.addChildren([c]);
  }

  addChildren(cs) {
    this.children.push(...cs);
    this.setChildren(this.children);
  }

  setChildren(cs) {
    if (!cs.length) {
      this.children = [];
      return;
    }
    const first = cs[0];
    const last = cs[cs.length - 1];
    this.start = first.start;
    this.end = last.end;
    this.firstLine = first.firstLine;
    this.lastLine = last.lastLine;
    this.firstColumn = first.firstColumn;
    this.lastColumn = last.lastColumn;
    this.children = cs;
    for (const c of cs) {
      c.parent = this;
    }
  }

  toJSON() {
    const ret = {};
    for (const k of Object.keys(this)) {
      if (k !== 'parent' && k !== 't') {
        ret[k] = this[k];
      }
    }
    return ret;
  }
}

module.exports = {
  AstNode,
};
