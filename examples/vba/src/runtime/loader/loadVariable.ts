import { VBVariableInfo, Visibility, VariableSymbolItem } from '../types';
import { registerLoaders } from './loaders';
import { evaluate } from '../evaluator/index';

registerLoaders({
  async load_variableStmt(node, context) {
    const { children } = node;
    const first = children[0];
    let isStatic: boolean = false;
    if (first.type === 'token') {
      isStatic = first.token === 'STATIC';
    }
    let visibility: Visibility = 'PUBLIC';
    if (first.type === 'symbol') {
      visibility = first.children[0].token;
    }
    const variableListStmt = children[children.length - 1];
    const variables: VBVariableInfo[] = await evaluate(
      variableListStmt,
      context,
    );
    const variableSymbolItems = variables.map(
      (v) => new VariableSymbolItem(v, isStatic, visibility, context),
    );
    for (const item of variableSymbolItems) {
      context.registerSymbolItem(item.value.name, item);
    }
  },
});
