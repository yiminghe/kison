import type {
  AstNode,
  AstSymbolNode,
  AstTokenNode,
  ParseResult,
} from 'bash-parse';
import type { Position } from 'monaco-editor';

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

export function getTokenByPosition(
  terminals: AstTokenNode[],
  position: Position,
) {
  let first = true;
  for (let i = 0; i < terminals.length; i++) {
    const t = terminals[i];

    if (isInsideNode(t, position)) {
      return { first, token: t };
    }
    if (t.token !== 'LINE_END') {
      first = false;
    } else {
      first = true;
    }
  }
  return {};
}
