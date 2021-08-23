export function getFunctionInfoFromPosition(ast, position) {
  const { lineNumber, column } = position;
  const { terminalNodes, errorNode } = ast;
  let ret = {};
  let cursorNode;
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
  cursorNode = cursorNode || errorNode;

  if (cursorNode) {
    let func = isTopCursorTokenFunction(cursorNode, position);
    if (func) {
      ret.functionName = func.children[0].text;
      return ret;
    }
    func = cursorNode.parent;
    // if hover function name skip
    if (cursorNode.token === "FUNCTION") {
      func = func.parent;
    }
    while (func && !insideFunction(func, position)) {
      func = func.parent;
    }
    if (func) {
      let args = findNodeBySymbol(func.children, "arguments");
      if (args) {
        let argumentIndex = getArgumentIndex(args, position);
        ret = {
          argumentIndex,
          functionName: func.children[0].text
        };
      } else {
        ret = {
          argumentIndex: 1,
          functionName: func.children[0].text
        };
      }
    }
  }
  return ret;
}

function isTopCursorTokenFunction(node, { lineNumber, column }) {
  if (!node) {
    return false;
  }

  const parent = node.parent;

  if (parent && parent.symbol === "function") {
    if (node.token === "FUNCTION") {
      if (lineNumber !== node.firstLine || column !== node.firstColumn) {
        return returnIfTopFn(parent);
      }
    } else if (node.token === "(") {
      return returnIfTopFn(parent);
    }
  }

  return false;
}

function returnIfTopFn(n) {
  let topFn = n.parent;
  while (topFn && topFn.symbol !== "function") {
    topFn = topFn.parent;
  }
  return !topFn && n;
}

function insideFunction(node, { lineNumber, column }) {
  if (node.symbol !== "function") {
    return false;
  }
  return (
    node.children[1] &&
    (lineNumber > node.children[1].firstLine ||
      lineNumber == node.children[1].firstLine ||
      column > node.children[1].column)
  );
}

function findNodeBySymbol(nodes, symbol) {
  for (const n of nodes) {
    if (n.symbol === symbol) {
      return n;
    }
  }
  return null;
}

function isNodeAfterOrEq(node, position) {
  return (
    node.firstLine > position.lineNumber ||
    (node.firstLine === position.lineNumber &&
      node.firstColumn >= position.column)
  );
}

function getArgumentIndex(args, position) {
  const { children = [] } = args;
  let index = 1;
  for (let i = 0; i < children.length; i++) {
    let c = children[i];
    if (c.token === "ARGUMENT_SEPARATOR") {
      if (isNodeAfterOrEq(c, position)) {
        return index;
      }
      index++;
    }
  }
  return index;
}

export function getTableNameByPosition(terminals, position) {
  let prev;
  for (const t of terminals) {
    if (isNodeAfterOrEq(t, position)) {
      break;
    }
    prev = t;
  }

  if (prev) {
    while (prev && prev.symbol !== "structure-reference") {
      prev = prev.parent;
    }
    if (prev) {
      return prev.children[0].text;
    }
  }
}
