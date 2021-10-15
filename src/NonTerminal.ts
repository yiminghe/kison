import type Production from './Production';

interface Params {
  productions?: Production[];
  symbol: string;
}

/**
 * non-terminal symbol for grammar
 */
export default class NonTerminal {
  productions: Production[] = [];
  symbol: string = '';
  firsts: Record<string, number> = {};
  nullable: boolean = false;
  follows: Record<string, number> = {};

  constructor(cfg: Params) {
    Object.assign(this, cfg);
  }

  addFollows(follows: Record<string, number>) {
    const { follows: myFollow } = this;
    let changed = false;
    for (var key in follows) {
      if (!myFollow[key]) {
        myFollow[key] = 1;
        changed = true;
      }
    }
    return changed;
  }
}
