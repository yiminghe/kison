import Item from './Item';

class ItemSet {
  __cache: Record<string, number> = {};
  items: Item[] = [];
  gotos: Record<string, ItemSet> = {};
  // 多个来源同一个symbol指向自己
  //{ c: [x,y]}
  reverseGotos: Record<string, ItemSet[]> = {};

  constructor(cfg: { items?: Item[] } = {}) {
    Object.assign(this, cfg);
  }

  // Insert item by order
  addItem(item: Item) {
    var items = this.items;
    for (var i = 0; i < items.length; i++) {
      if (items[i].production.toString() > item.production.toString()) {
        break;
      }
    }
    items.splice(i, 0, item);
  }

  size() {
    return this.items.length;
  }

  findItemIndex(item: Item, ignoreLookAhead?: boolean) {
    var oneItems = this.items;
    for (var i = 0; i < oneItems.length; i++) {
      if (oneItems[i].equals(item, ignoreLookAhead)) {
        return i;
      }
    }
    return -1;
  }

  getItemAt(index: number) {
    return this.items[index];
  }

  equals(other: ItemSet, ignoreLookAhead?: boolean) {
    var oneItems = this.items,
      i,
      otherItems = other.items;
    if (oneItems.length !== otherItems.length) {
      return false;
    }
    for (i = 0; i < oneItems.length; i++) {
      if (!oneItems[i].equals(otherItems[i], ignoreLookAhead)) {
        return false;
      }
    }
    return true;
  }

  toString(withGoto?: boolean) {
    var ret: string[] = [],
      gotos = this.gotos;
    for (const item of this.items) {
      ret.push(item.toString());
    }
    if (withGoto) {
      ret.push('start gotos:');
      for (const symbol of Object.keys(gotos)) {
        const itemSet = gotos[symbol];
        ret.push(symbol + ' -> ');
        ret.push(itemSet.toString());
      }
      ret.push('end gotos:');
    }
    return ret.join(' \n ');
  }

  addReverseGoto(symbol: string, itemSet: ItemSet) {
    var reverseGotos = this.reverseGotos;
    reverseGotos[symbol] = reverseGotos[symbol] || [];
    reverseGotos[symbol].push(itemSet);
  }
}

export default ItemSet;
