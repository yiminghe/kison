import formula from "../src/parser.js";

let currentText;
let currentAst;

function getAst(value, onErrorRecovery) {
  if (currentText === value) {
    return currentAst;
  }
  console.log("***********************", value);
  currentText = value;
  currentAst = formula.parse(value, {
    // lexerOptions: {env:'en'},
    onErrorRecovery
  });
  console.log(currentAst);
  if (currentAst.error) {
    console.error(currentAst.error.errorMessage);
  }
  console.log("***********************");
  return currentAst;
}

function $(id) {
  return document.getElementById(id);
}

const input = $("input");
const fix = $("fix");
const parse = $("parse");
const evaluate = $("evaluate");
const ARGUMENT_SEPARATOR = "ARGUMENT_SEPARATOR";

evaluate.addEventListener("click", () => {
  const { ast, errorNode } = getAst(input.value);
  console.log("TODO");
});

fix.addEventListener(
  "click",
  () => {
    currentText = undefined;
    let fixed = false;
    const { ast, error, recoveryTokens, tokens } = getAst(
      input.value,
      ({ errorNode }, { action }) => {
        if (action === "add") {
          let token = ")";
          const {
            parent: { symbol },
            error: { expected }
          } = errorNode;
          const hasToken = expected.indexOf(token) !== -1;
          if ((symbol === "arguments" || symbol === "function") && hasToken) {
            fixed = true;
            return {
              action,
              token,
              text: token
            };
          }
        }
      }
    );
    if (fixed) {
      const val = recoveryTokens.map(t => t.text).join("");
      console.log("`" + input.value.trim() + "` will fixed to `" + val + "`");
      input.value = val;
    }
  },
  false
);

parse.addEventListener(
  "click",
  () => {
    currentText = undefined;
    getAst(input.value);
  },
  false
);

function detectCursor(e) {
  const { selectionStart } = input;
  // console.log('cursor position:', selectionStart)
  const { terminalNodes, errorNode } = getAst(input.value);
  let cursorNode;
  for (const n of terminalNodes) {
    if (n.start <= selectionStart && n.end > selectionStart) {
      cursorNode = n;
      break;
    }
    if (n.start > selectionStart) {
      cursorNode = n;
      break;
    }
  }
  cursorNode = cursorNode || errorNode;
  console.log("cursor node", cursorNode);

  if (cursorNode) {
    let func = isTopCursorTokenFunction(cursorNode, selectionStart);
    if (func) {
      console.log(`at function ${func.children[0].text}`);
      return;
    }
    func = cursorNode.parent;
    while (func && !insideFunction(func, selectionStart)) {
      func = func.parent;
    }
    if (func) {
      let args = findNodeBySymbol(func.children, "arguments");
      if (args) {
        let argumentIndex = getArgumentIndex(args, selectionStart);
        console.log(
          `at argument index ${argumentIndex} of function ${func.children[0].text}`
        );
      } else {
        console.log(
          `at argument index ${1} of function ${func.children[0].text}`
        );
        return;
      }
    }
  }
}

function insideFunction(node, selectionStart) {
  if (node.symbol !== "function") {
    return false;
  }
  // (
  return node.children[1] && selectionStart > node.children[1].start;
}

function debounce(fn, ms) {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, ms);
  };
}

input.addEventListener("click", detectCursor);
input.addEventListener("keydown", debounce(detectCursor, 100));

function prevSibling(node) {
  const index = node.parent.children.indexOf(node);
  return node.parent.children[index - 1];
}

function findNodeBySymbol(nodes, symbol) {
  for (const n of nodes) {
    if (n.symbol === symbol) {
      return n;
    }
  }
  return null;
}

function isTopCursorTokenFunction(node, selectionStart) {
  if (!node) {
    return false;
  }

  const parent = node.parent;

  if (parent && parent.symbol === "function") {
    if (node.token === "FUNCTION") {
      if (selectionStart !== node.start) {
        return returnIfTopFn(parent);
      }
    } else if (node.token === "(") {
      return returnIfTopFn(parent);
    }
  }

  return false;

  function returnIfTopFn(n) {
    let topFn = n.parent;
    while (topFn && topFn.symbol !== "function") {
      topFn = topFn.parent;
    }
    return !topFn && n;
  }
}

function getArgumentIndex(args, selectionStart) {
  const { children = [] } = args;
  let index = 1;
  for (let i = 0; i < children.length; i++) {
    let c = children[i];
    if (c.token === "ARGUMENT_SEPARATOR") {
      if (c.start >= selectionStart) {
        return index;
      }
      index++;
    }
  }
  return index;
}

function lastChild(c) {
  c = c.children || [];
  return c[c.length - 1];
}
