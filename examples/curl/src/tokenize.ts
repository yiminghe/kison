import { AstNode, Ast_Command_Node, parser } from 'bash-parse';

interface TokenizeResult {
  cmdName: string;
  args: string[];
  stdin?: string | undefined;
  stdinFile?: string | undefined;
}

export const tokenize = (curlCommand: string): TokenizeResult => {
  const ret = parser.parse(curlCommand);
  // TODO: support strings with variable expansions inside
  // TODO: support prefixed variables, e.g. "MY_VAR=hello curl example.com"
  if (ret.error) {
    throw new Error(ret.error.errorMessage);
  }

  const ast = ret.ast;

  if (ast.children.length < 1) {
    throw new Error('empty "program" node');
  }

  // Get the curl call AST node. Skip comments
  let command: Ast_Command_Node | null = null,
    lastNode,
    stdin,
    stdinFile;
  for (const node of ast.children) {
    if (node.symbol === 'command') {
      command = node;
      lastNode = node;
      break;
    } else {
      throw new Error(
        'expected a "command"  instead got ' +
          node.symbol +
          '\n' +
          underlineBadNode(curlCommand, node),
      );
    }
  }
  if (!command) {
    throw new Error('expected a "command" AST node');
  }
  if (command.children.length < 1) {
    throw new Error('empty "command" node');
  }
  const [cmdName, ...args] = command.children;
  return {
    cmdName: toVal(cmdName.children[0], curlCommand),
    args: args.map((a) => toVal(a.children[0], curlCommand)),
    stdin,
    stdinFile,
  };
};

function toVal(node: AstNode, curlCommand: string): string {
  if (node.type === 'symbol') {
    if (node.symbol === 'string') {
      return parseDoubleQuoteString(
        node.children
          .slice(1, -1)
          .map((n) => n.text)
          .join(''),
      );
    }
  } else if (node.type === 'token') {
    if (node.token === 'ANSII_C_STRING') {
      return parseAnsiCString(node.text);
    } else if (node.token === 'RAW_STRING') {
      return parseSingleQuoteString(node.text);
    } else if (node.token === 'WORD') {
      return parseWord(node.text);
    }
  }
  throw new Error(
    'expected a "value"' + '\n' + underlineBadNode(curlCommand, node),
  );
}

const parseWord = (str: string): string => {
  const BACKSLASHES = /\\./gs;
  const unescapeChar = (m: string) => (m.charAt(1) === '\n' ? '' : m.charAt(1));
  return str.replace(BACKSLASHES, unescapeChar);
};

const parseDoubleQuoteString = (str: string): string => {
  const BACKSLASHES = /\\(\n|\\|")/gs;
  const unescapeChar = (m: string) => (m.charAt(1) === '\n' ? '' : m.charAt(1));
  return str.replace(BACKSLASHES, unescapeChar);
};

const parseSingleQuoteString = (str: string): string => {
  const BACKSLASHES = /\\(\n|')/gs;
  const unescapeChar = (m: string) => (m.charAt(1) === '\n' ? '' : m.charAt(1));
  return str.slice(1, -1).replace(BACKSLASHES, unescapeChar);
};

const parseAnsiCString = (str: string): string => {
  const ANSI_BACKSLASHES =
    /\\(\\|a|b|e|E|f|n|r|t|v|'|"|\?|[0-7]{1,3}|x[0-9A-Fa-f]{1,2}|u[0-9A-Fa-f]{1,4}|U[0-9A-Fa-f]{1,8}|c.)/gs;
  const unescapeChar = (m: string) => {
    switch (m.charAt(1)) {
      case '\\':
        return '\\';
      case 'a':
        return '\x07';
      case 'b':
        return '\b';
      case 'e':
      case 'E':
        return '\x1B';
      case 'f':
        return '\f';
      case 'n':
        return '\n';
      case 'r':
        return '\r';
      case 't':
        return '\t';
      case 'v':
        return '\v';
      case "'":
        return "'";
      case '"':
        return '"';
      case '?':
        return '?';
      case 'c':
        // bash handles all characters by considering the first byte
        // of its UTF-8 input and can produce invalid UTF-8, whereas
        // JavaScript stores strings in UTF-16
        if (m.codePointAt(2)! > 127) {
          throw new Error(
            'non-ASCII control character in ANSI-C quoted string: "\\u{' +
              m.codePointAt(2)!.toString(16) +
              '}"',
          );
        }
        // If this produces a 0x00 (null) character, it will cause bash to
        // terminate the string at that character, but we return the null
        // character in the result.
        return m[2] === '?'
          ? '\x7F'
          : String.fromCodePoint(
              m[2].toUpperCase().codePointAt(0)! & 0b00011111,
            );
      case 'x':
      case 'u':
      case 'U':
        // Hexadecimal character literal
        // Unlike bash, this will error if the the code point is greater than 10FFFF
        return String.fromCodePoint(parseInt(m.slice(2), 16));
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
        // Octal character literal
        return String.fromCodePoint(parseInt(m.slice(1), 8) % 256);
      default:
        // There must be a mis-match between ANSI_BACKSLASHES and the switch statement
        throw new Error(
          'unhandled character in ANSI-C escape code: ' + JSON.stringify(m),
        );
    }
  };

  return str.slice(2, -1).replace(ANSI_BACKSLASHES, unescapeChar);
};

const underlineBadNode = (curlCommand: string, node: AstNode): string => {
  const line = curlCommand.split('\n')[node.firstLine];
  const onOneLine = node.lastLine === node.firstLine;
  const end = onOneLine ? node.lastColumn : line.length;
  return (
    `${line}\n` +
    ' '.repeat(node.firstColumn) +
    '^'.repeat(end - node.firstColumn) +
    (onOneLine ? '' : '^')
  );
};
