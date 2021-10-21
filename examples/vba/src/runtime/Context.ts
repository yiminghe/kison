import parser from '../parser';
import type { AstRootNode } from '../parser';
import type { VBValue, SubBinder, FileId, SymbolName } from './types';
import { evaluate } from './evaluator/index';
import { build } from './symbol-table/index';
import { SymbolItem, VBScope, ArgInfo, VB_EMPTY, VBObject } from './types';
import { last } from './utils';

const defaultFileId = 'default.vb';

export class Context {
  astMap = new Map<string, AstRootNode>();

  subBindersMap = new Map<string, SubBinder>();

  currentFileId: FileId = '';

  symbolTable = new Map<FileId, Map<SymbolName, SymbolItem>>();

  scopeStack: VBScope[] = [];

  run(code: string, fileId: FileId = defaultFileId) {
    const { ast, error } = parser.parse(code);
    if (error) {
      throw new Error(error.errorMessage);
    }
    this.astMap.set(fileId, ast);
    this.currentFileId = fileId;
    this.symbolTable.set(fileId, new Map());
    return build(ast, this);
  }

  registerSymbolItem(name: string, item: SymbolItem) {
    const { symbolTable, currentFileId } = this;
    const currentTable = symbolTable.get(currentFileId)!;
    currentTable.set(name, item);
  }

  registerSubBinder(subBinder: SubBinder) {
    this.subBindersMap.set(subBinder.name, subBinder);
  }

  getCurrentScope() {
    return last(this.scopeStack)!;
  }

  async callSub(
    subName: string,
    args: (VBValue | VBObject)[] = [],
    fileId: string = defaultFileId,
  ) {
    const setupScope = (argumentsInfo: ArgInfo[]) => {
      const scope = new VBScope();
      let i = -1;
      for (const a of args) {
        ++i;
        const argInfo = argumentsInfo[i];
        if (!argInfo) {
          continue;
        }
        if (a.type === 'Object' && argInfo.byRef) {
          scope.setVariable(
            argInfo.name,
            new VBObject(a, argInfo.asType?.type || 'Variant'),
          );
        } else {
          scope.setVariableValue(argInfo.name, a);
        }
      }
      this.scopeStack.push(scope);
    };

    const { subBindersMap, symbolTable } = this;
    const subSymbolItem = symbolTable.get(fileId)?.get(subName);
    if (subSymbolItem && subSymbolItem.type === 'sub') {
      const argumentsInfo = subSymbolItem.getArugmentsInfo();
      setupScope(argumentsInfo);
      const ret = await evaluate(subSymbolItem.block, this);
      this.scopeStack.pop();
      return ret;
    }
    const def = subBindersMap.get(subName);
    if (!def) {
      throw new Error('Can not find sub definition: ' + subName);
    }
    setupScope(def.argumentsInfo);
    let ret = def.fn(this);
    if (ret && (ret as Promise<any>).then) {
      ret = await ret;
    }
    this.scopeStack.pop();
    return ret || VB_EMPTY;
  }
}
