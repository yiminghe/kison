import { VBVariableInfo, Visibility, VBVariable, VBObject } from '../types';
import { registerLoaders } from './loaders';
import { evaluate } from '../evaluator/index';

registerLoaders({
  async loadVariableStmt(node, context) {
    const { children } = node;
    const first = children[0];
    let isStatic: boolean = false;
    if (first.type === 'token') {
      isStatic = first.token === 'STATIC';
    }
    let visibility: Visibility = 'PRIVATE';
    if (first.type === 'symbol') {
      visibility = first.children[0].token;
    }
    const variableListStmt = children[children.length - 1];
    const variables: VBVariableInfo[] = await evaluate(
      variableListStmt,
      context,
    );
    const values: VBObject[] = [];
    for (const v of variables) {
      values.push(await v.value());
    }
    const vbVariables = variables.map(
      (v, index) =>
        new VBVariable(values[index], v, isStatic, visibility, context),
    );
    for (const vbVariable of vbVariables) {
      context.registerSymbolItemInternal(
        vbVariable.variableInfo.name,
        vbVariable,
      );
    }
  },
});
