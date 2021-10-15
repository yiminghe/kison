// @ts-check

import Production from '../Production';

function equals(s1: any, s2: any) {
  for (var i in s1) {
    if (!(i in s2)) {
      return false;
    }
  }

  for (i in s2) {
    if (!(i in s1)) {
      return false;
    }
  }

  return true;
}

interface Params {
  dotPosition?: number;
  production: Production;
  lookAhead?: Record<string, number>;
}

class Item {
  dotPosition = 0;

  /*
             2012-07-27
             improve performance,use object to compare( equal )
             and find( indexOf )
             instead of array
             */
  lookAhead: Record<string, number> = {};

  production: Production;

  constructor(cfg: Params) {
    Object.assign(this, cfg);
    this.production = cfg.production;
  }

  equals(other: Item, ignoreLookAhead?: boolean) {
    var self = this;
    if (!other.production.equals(self.production)) {
      return false;
    }
    if (other.dotPosition !== self.dotPosition) {
      return false;
    }
    if (!ignoreLookAhead) {
      if (!equals(self.lookAhead, other.lookAhead)) {
        return false;
      }
    }
    return true;
  }

  toString(ignoreLookAhead?: boolean) {
    return (
      this.production.toString(this.dotPosition) +
      (ignoreLookAhead ? '' : ',' + Object.keys(this.lookAhead).join('/'))
    );
  }

  addLookAhead(ls: Record<string, number>): number {
    var lookAhead = this.lookAhead,
      ret = 0;
    for (const k of Object.keys(ls)) {
      if (!lookAhead[k]) {
        lookAhead[k] = 1;
        ret = 1;
      }
    }
    return ret;
  }
}

export default Item;
