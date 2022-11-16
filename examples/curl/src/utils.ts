// https://github.com/curlconverter/curlconverter

export class CCError extends Error {}

import { parser } from 'bash-parse';

type Warnings = [string, string][];

interface TokenizeResult {
  cmdName: string;
  args: string[];
  stdin?: string;
  stdinFile?: string;
}

export const tokenize = (
  curlCommand: string,
  warnings: Warnings = [],
): TokenizeResult => {
  const ret = parser.parse(curlCommand);
  // TODO: support strings with variable expansions inside
  // TODO: support prefixed variables, e.g. "MY_VAR=hello curl example.com"
  // TODO: get only named children?
  if (ret.error) {
    // TODO: better error message.
    throw new CCError(ret.error.errorMessage);
  }

  const ast = ret.ast;

  if (ast.rootNode.childCount < 1 || !ast.rootNode.children) {
    // TODO: better error message.
    throw new CCError('empty "program" node');
  }

  // Get the curl call AST node. Skip comments
  let command, lastNode, stdin, stdinFile;
  for (const n of ast.rootNode.children) {
    if (n.type === 'comment') {
      continue;
    } else if (n.type === 'command') {
      command = n;
      lastNode = n;
      break;
    } else if (n.type === 'redirected_statement') {
      if (!n.childCount) {
        throw new CCError('got empty "redirected_statement" AST node');
      }
      let redirects;
      [command, ...redirects] = n.namedChildren;
      lastNode = n;
      if (command.type !== 'command') {
        throw new CCError(
          'got "redirected_statement" AST node whose first child is not a "command", got ' +
            command.type +
            ' instead\n' +
            underlineBadNode(curlCommand, command),
        );
      }
      if (n.childCount < 2) {
        throw new CCError(
          'got "redirected_statement" AST node with only one child - no redirect',
        );
      }
      if (redirects.length > 1) {
        warnings.push([
          'multiple-redirects',
          // TODO: only the Python generator uses the redirect so this is misleading.
          'found ' +
            redirects.length +
            ' redirect nodes. Only the first one will be used:\n' +
            underlineBadNode(curlCommand, redirects[1]),
        ]);
      }
      const redirect = redirects[0];
      if (redirect.type === 'file_redirect') {
        stdinFile = toVal(redirect.namedChildren[0], curlCommand);
      } else if (redirect.type === 'heredoc_redirect') {
        // heredoc bodies are children of the parent program node
        // https://github.com/tree-sitter/tree-sitter-bash/issues/118
        if (redirect.namedChildCount < 1) {
          throw new CCError(
            'got "redirected_statement" AST node with heredoc but no heredoc start',
          );
        }
        const heredocStart = redirect.namedChildren[0].text;
        const heredocBody = n.nextNamedSibling;
        lastNode = heredocBody;
        if (!heredocBody) {
          throw new CCError(
            'got "redirected_statement" AST node with no heredoc body',
          );
        }
        // TODO: herestrings and heredocs are different
        if (heredocBody.type !== 'heredoc_body') {
          throw new CCError(
            'got "redirected_statement" AST node with heredoc but no heredoc body, got ' +
              heredocBody.type +
              ' instead',
          );
        }
        // TODO: heredocs do variable expansion and stuff
        if (heredocStart.length) {
          stdin = heredocBody.text.slice(0, -heredocStart.length);
        } else {
          // this shouldn't happen
          stdin = heredocBody.text;
        }
        // Curl removes newlines when you pass any @filename including @- for stdin
        // TODO: bash_redirect_heredoc.sh makes it seem like this isn't actually true.
        stdin = stdin.replace(/\n/g, '');
      } else if (redirect.type === 'herestring_redirect') {
        if (redirect.namedChildCount < 1 || !redirect.firstNamedChild) {
          throw new CCError(
            'got "redirected_statement" AST node with empty herestring',
          );
        }
        // TODO: this just converts bash code to text
        stdin = redirect.firstNamedChild.text;
      } else {
        throw new CCError(
          'got "redirected_statement" AST node whose second child is not one of "file_redirect", "heredoc_redirect" or "herestring_redirect", got ' +
            command.type +
            ' instead',
        );
      }

      break;
    } else if (n.type === 'ERROR') {
      throw new CCError(
        `Bash parsing error on line ${n.startPosition.row + 1}:\n` +
          underlineBadNode(curlCommand, n),
      );
    } else {
      // TODO: better error message.
      throw new CCError(
        'expected a "command" or "redirected_statement" AST node, instead got ' +
          ast.rootNode.children[0].type +
          '\n' +
          underlineBadNode(curlCommand, ast.rootNode.children[0]),
      );
    }
  }
  // TODO: better logic, skip comments.
  if (lastNode && lastNode.nextNamedSibling) {
    // TODO: better wording
    warnings.push([
      'extra-commands',
      `curl command ends on line ${
        lastNode.endPosition.row + 1
      }, everything after this is ignored:\n` +
        underlineBadNodeEnd(curlCommand, lastNode),
    ]);

    const curlCommandLines = curlCommand.split('\n');
    const lastNodeLine = curlCommandLines[lastNode.endPosition.row];
    const impromperBackslash = lastNodeLine.match(/\\\s+$/);
    if (
      impromperBackslash &&
      curlCommandLines.length > lastNode.endPosition.row + 1 &&
      impromperBackslash.index !== undefined
    ) {
      warnings.push([
        'unescaped-newline',
        "The trailling '\\' on line " +
          (lastNode.endPosition.row + 1) +
          " is followed by whitespace, so it won't escape the newline after it:\n" +
          // TODO: cut off line if it's very long?
          lastNodeLine +
          '\n' +
          ' '.repeat(impromperBackslash.index) +
          '^'.repeat(impromperBackslash[0].length),
      ]);
    }
  }
  if (!command) {
    // NOTE: if you add more node types in the `for` loop above, this error needs to be updated.
    // We would probably need to keep track of the node types we've seen.
    throw new CCError(
      'expected a "command" or "redirected_statement" AST node, only found "comment" nodes',
    );
  }
  for (const n of ast.rootNode.children) {
    if (n.type === 'ERROR') {
      warnings.push([
        'bash',
        `Bash parsing error on line ${n.startPosition.row + 1}:\n` +
          underlineBadNode(curlCommand, n),
      ]);
    }
  }

  if (command.childCount < 1) {
    // TODO: better error message.
    throw new CCError('empty "command" node');
  }
  // Use namedChildren so that variable_assignment/file_redirect is skipped
  // TODO: warn when command variable_assignment is skipped
  // TODO: add childrenForFieldName to tree-sitter node/web bindings
  const [cmdName, ...args] = command.namedChildren;
  if (cmdName.type !== 'command_name') {
    throw new CCError(
      'expected a "command_name" AST node, found ' +
        cmdName.type +
        ' instead\n' +
        underlineBadNode(curlCommand, cmdName),
    );
  }
  if (cmdName.childCount < 1) {
    throw new CCError(
      'found empty "command_name" AST node\n' +
        underlineBadNode(curlCommand, cmdName),
    );
  }

  return {
    cmdName: toVal(cmdName.firstChild!, curlCommand),
    args: args.map((a) => toVal(a, curlCommand)),
    stdin,
    stdinFile,
  };
};

function toVal(node: Parser.SyntaxNode, curlCommand: string): string {
  switch (node.type) {
    case 'word':
      return parseWord(node.text);
    case 'string':
      return parseDoubleQuoteString(node.text);
    case 'raw_string':
      return parseSingleQuoteString(node.text);
    case 'ansii_c_string':
      return parseAnsiCString(node.text);
    default:
      throw new CCError(
        'unexpected argument type ' +
          JSON.stringify(node.type) +
          '. Must be one of "word", "string", "raw_string", "ansii_c_string", "expansion", "simple_expansion", "string_expansion" or "concatenation"\n' +
          underlineBadNode(curlCommand, node),
      );
  }
}

const parseWord = (str: string): string => {
  const BACKSLASHES = /\\./gs;
  const unescapeChar = (m: string) => (m.charAt(1) === '\n' ? '' : m.charAt(1));
  return str.replace(BACKSLASHES, unescapeChar);
};

const parseDoubleQuoteString = (str: string): string => {
  const BACKSLASHES = /\\(\n|\\|")/gs;
  const unescapeChar = (m: string) => (m.charAt(1) === '\n' ? '' : m.charAt(1));
  return str.slice(1, -1).replace(BACKSLASHES, unescapeChar);
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
          throw new CCError(
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
        throw new CCError(
          'unhandled character in ANSI-C escape code: ' + JSON.stringify(m),
        );
    }
  };

  return str.slice(2, -1).replace(ANSI_BACKSLASHES, unescapeChar);
};

const underlineBadNode = (curlCommand: string, node: any): string => {
  // TODO: is this exactly how tree-sitter splits lines?
  const line = curlCommand.split('\n')[node.startPosition.row];
  const onOneLine = node.endPosition.row === node.startPosition.row;
  const end = onOneLine ? node.endPosition.column : line.length;
  return (
    `${line}\n` +
    ' '.repeat(node.startPosition.column) +
    '^'.repeat(end - node.startPosition.column) +
    (onOneLine ? '' : '^') // TODO: something else?
  );
};
