import type {
  AstNode,
  AstSymbolNode,
  AstTokenNode,
  ParseResult,
} from './parser.js';
import type { Position } from 'monaco-editor';

export function getFunctionInfoFromPosition(
  ast: ParseResult,
  position: Position,
) {
  const { lineNumber, column } = position;
  const { terminalNodes, errorNode } = ast;
  let ret: {
    functionName: string;
    argumentIndex?: number;
  } = {
    functionName: '',
  };

  let cursorNode: AstTokenNode | undefined = errorNode;

  for (const n of terminalNodes) {
    if (n.firstLine < lineNumber) {
      continue;
    }
    if (n.firstLine > lineNumber) {
      cursorNode = n;
      break;
    }
    if (n.firstColumn <= column && n.lastColumn > column) {
      cursorNode = n;
      break;
    }
    if (n.firstColumn > column) {
      cursorNode = n;
      break;
    }
  }

  if (cursorNode) {
    {
      let func = getTopCursorTokenFunction(cursorNode, position);
      if (func && func.symbol === 'function') {
        ret.functionName = func.children[0].text;
        return ret;
      }
    }
    let func: AstSymbolNode | undefined = cursorNode.parent;
    // if hover function name skip
    if (cursorNode.token === 'FUNCTION') {
      func = func.parent;
    }
    while (func && !insideFunction(func, position)) {
      func = func.parent;
    }
    if (func && func.symbol === 'function') {
      let args = findNodeBySymbol(func.children, 'arguments');
      if (args) {
        let argumentIndex = getArgumentIndex(args, position);
        ret = {
          argumentIndex,
          functionName: func.children[0].text,
        };
      } else {
        ret = {
          argumentIndex: 1,
          functionName: func.children[0].text,
        };
      }
    }
  }
  return ret;
}

function getTopCursorTokenFunction(
  node: AstTokenNode,
  { lineNumber, column }: Position,
) {
  if (!node) {
    return null;
  }

  const parent = node.parent;

  if (parent && parent.symbol === 'function') {
    if (node.token === 'FUNCTION') {
      if (lineNumber !== node.firstLine || column !== node.firstColumn) {
        return returnIfTopFn(parent);
      }
    } else if (node.token === '(') {
      return returnIfTopFn(parent);
    }
  }

  return null;
}

function returnIfTopFn(n: AstSymbolNode) {
  let topFn = n.parent;
  while (topFn && topFn.symbol !== 'function') {
    topFn = topFn.parent;
  }
  return (!topFn && n) || null;
}

function insideFunction(node: AstSymbolNode, { lineNumber, column }: Position) {
  if (node.symbol !== 'function') {
    return false;
  }
  return (
    node.children[1] &&
    (lineNumber > node.children[1].firstLine ||
      lineNumber == node.children[1].firstLine ||
      column > node.children[1].firstColumn)
  );
}

function findNodeBySymbol(nodes: AstNode[], symbol: string) {
  for (const n of nodes) {
    if (n.type === 'symbol' && n.symbol === symbol) {
      return n;
    }
  }
  return null;
}

function isNodeAfterOrEq(node: AstNode, position: Position) {
  return (
    node.firstLine > position.lineNumber ||
    (node.firstLine === position.lineNumber &&
      node.firstColumn >= position.column)
  );
}

function isInsideNode(node: AstNode, position: Position) {
  return (
    (node.firstLine < position.lineNumber ||
      (node.firstLine === position.lineNumber &&
        node.firstColumn <= position.column)) &&
    (node.lastLine > position.lineNumber ||
      (node.lastLine === position.lineNumber &&
        node.lastColumn >= position.column))
  );
}

function getArgumentIndex(args: AstSymbolNode, position: Position) {
  const { children = [] } = args;
  let index = 1;
  for (let i = 0; i < children.length; i++) {
    let c = children[i];
    if (c.type === 'token' && c.token === 'ARGUMENT_SEPARATOR') {
      if (isNodeAfterOrEq(c, position)) {
        return index;
      }
      index++;
    }
  }
  return index;
}

export function getTableNameByPosition(nodes: AstNode[], position: Position) {
  let prev;
  for (const t of nodes) {
    if (isNodeAfterOrEq(t, position)) {
      break;
    }
    prev = t;
  }
  if (prev) {
    while (
      prev &&
      prev.type === 'symbol' &&
      prev.symbol !== 'structure-reference'
    ) {
      prev = prev.parent;
    }
    if (prev && prev.type === 'symbol') {
      const child = prev.children[0];
      if (child.type === 'token') {
        return child.text;
      }
    }
  }
}

export function getTokenByPosition(
  terminals: AstTokenNode[],
  position: Position,
) {
  for (let i = 0; i < terminals.length; i++) {
    const t = terminals[i];
    if (isInsideNode(t, position)) {
      return t;
    }
  }
}
