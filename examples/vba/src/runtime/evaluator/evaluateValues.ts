import type { AstTokenNode } from '../../parser';
import { VBNumber } from '../types';
import { evaluators } from './evaluators';

Object.assign(evaluators, {
  evaluate_INTEGERLITERAL(node: AstTokenNode) {
    return new VBNumber(parseInt(node.text));
  },
});
