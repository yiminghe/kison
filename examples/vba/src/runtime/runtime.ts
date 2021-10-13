import parser from '../parser';
import type { AstRootNode, SubStmt_Node } from '../parser';
import type { VBTypes, SubDef } from './types';
import { evaluate } from './evaluator/index';

const defaultFileId = 'default.vb';

export class Runtime {
  astMap = new Map<string, AstRootNode>();

  subDefMap = new Map<string, SubDef>();

  currentFileId = '';

  subDeclareMap = new Map<string, Map<string, SubStmt_Node>>();

  run(code: string, fileId: string = defaultFileId) {
    const { ast, error } = parser.parse(code);
    if (error) {
      throw new Error(error.errorMessage);
    }
    this.astMap.set(fileId, ast);
    this.currentFileId = fileId;
    return this.evaluate(ast);
  }

  registerSubDeclare(subName: string, sub: SubStmt_Node) {
    const { subDeclareMap, currentFileId } = this;
    let map = subDeclareMap.get(currentFileId);
    if (!map) {
      subDeclareMap.set(currentFileId, (map = new Map()));
    }
    map.set(subName, sub);
  }

  registerSub(subDef: SubDef) {
    this.subDefMap.set(subDef.name, subDef);
  }

  callSub(
    subName: string,
    args: VBTypes[] = [],
    fileId: string = defaultFileId,
  ) {
    const { subDefMap, subDeclareMap } = this;
    const subDeclare = subDeclareMap.get(fileId)?.get(subName);
    if (subDeclare) {
      return evaluate(
        subDeclare.children.filter(
          (c) => c.type === 'symbol' && c.symbol === 'block',
        )[0],
        this,
      );
    }
    const def = subDefMap.get(subName);
    if (!def) {
      throw new Error('Can not find sub definition: ' + subName);
    }
    return def.fn({ args });
  }

  evaluate(ast: AstRootNode) {
    return evaluate(ast, this);
  }
}
