import { REF_ERROR } from '../common/constants';
import { isSingleCellRange, resolveCell } from '../interpreter/utils';
import { isValidCellAddress, isValidCellRange, toCoordString } from '../utils';
import { transform, registerTransformers } from './transformers';

registerTransformers({
  transformRangeReference(node, context) {
    transform(node.children[0], context);
    transform(node.children[1], context);
  },

  transformCELL(node, context) {
    const cell = resolveCell(node.text);
    // TODO row
    const range = cell.value[0];
    const newStart = context.transformCellAdress(range.start);
    if (isSingleCellRange(range)) {
      if (newStart !== range.start) {
        if (isValidCellAddress(newStart)) {
          node.text = toCoordString(newStart);
        } else {
          node.text = REF_ERROR;
        }
      }
    } else {
      const newRange = context.transformCellRange(range);
      if (newRange !== range) {
        if (isValidCellRange(newRange)) {
          node.text =
            toCoordString(newRange.start) + ':' + toCoordString(newRange.end);
        } else {
          node.text = REF_ERROR;
        }
      }
    }
  },
});
