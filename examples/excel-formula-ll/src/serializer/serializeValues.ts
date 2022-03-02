import { serialize, registerSerializers } from './serializers';

registerSerializers({
  serializeNUMBER(node) {
    return node.text;
  },
  serializeSTRING(node) {
    return node.text;
  },

  serializeArray(node) {
    const { children: raw } = node;
    const children = raw.slice(1, -1);
    let ret: string = '';
    let row: string[] = [];
    let lastRow: string[];
    let error = 0;

    function pushRow() {
      if (lastRow && row.length !== lastRow.length) {
        error = 1;
      }
      ret += row.join(',') + ';';
      lastRow = row;
    }

    for (const c of children) {
      if (c.type === 'token' && c.token === 'ARRAY_SEPARATOR') {
        if (c.text === ';') {
          pushRow();
          row = [];
        }
        continue;
      }
      const t = serialize(c);
      row.push(t);
    }

    if (row.length) {
      pushRow();
    }

    return ret;
  },
});
