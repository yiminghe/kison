import { resolveCell } from '../interpreter/utils';
import { toCoordString } from '../utils';
import { transform, registerTransformers } from './transformers';

registerTransformers({
  transformRangeReference(node, context) {
    transform(node.children[0], context);
    transform(node.children[1], context);
  },

  transformCELL(node, context) {
    const cell = resolveCell(node.text);
    // TODO row
    const { start, end } = cell.value[0];
    const newStart = context.transformCellAdress(start);
    let changed = newStart !== start;
    if (changed && start === end) {
      node.text = toCoordString(newStart);
    } else {
      const newEnd = context.transformCellAdress(end);
      changed = changed || newEnd !== end;
      if (changed) {
        node.text = toCoordString(newStart) + ':' + toCoordString(newEnd);
      }
    }
  },
});
