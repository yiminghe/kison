type AstNode = AstSymbolNode | AstTokenNode;

// replace start
type AstSymbolNode = {};
type AstTokenNode = {};
type LiteralToken = {};
type AstRootNode = {};
// replace end

type AstErrorNode = AstTokenNode & {
  error: ParseError;
}

interface Position {
  start: number;
  end: number;
  firstLine: number;
  lastLine: number;
  firstColumn: number;
  lastColumn: number;
}

interface BaseSymbolNode extends Position {
  type: 'symbol';
  parent?: AstSymbolNode;
  label: '';
}

interface BaseTokenNode extends Position {
  type: 'token';
  text: string;
  parent: AstSymbolNode;
}

type TransformNode = (arg: {
  index: number;
  node: AstNode;
  parent: AstSymbolNode;
  defaultTransformNode: TransformNode;
}) => AstNode | null;

interface Token extends Position {
  text: string;
  token: LiteralToken;
}

interface ParseError {
  errorMessage: string;
  expected: Token[];
  token: Token;
  recovery: Boolean;
  symbol: Symbol;
  tip: string;
}

interface LexerOptions<T = any> {
  env?: string;
  state?: {
    userData?: T,
    stateStack?: string[];
  }
}

interface ParserOptions {
  lexerOptions?: LexerOptions;
  transformNode?: TransformNode | false;
  onErrorRecovery?: (args: {
    parseTree: AstNode;
    errorNode: AstErrorNode;
  }, recommendedAction: {
    action?: 'del' | 'add'
  }) => void;
}

interface ParseResult {
  ast: AstRootNode;
  error?: ParseError;
  errorNode?: AstErrorNode;
  recoveryTokens: Token[];
  terminalNodes: AstTokenNode[];
  tokens: Token[];
}

interface LexResult<T = any> {
  tokens: Token[];
  state: {
    userData: T,
    stateStack: string[];
  }
}

declare function parse(input: string, options?: ParserOptions): ParseResult;

declare function lex<T = any>(input: string, options?: LexerOptions<T>): LexResult<T>;

declare const parser: { parse: typeof parse, lex: typeof lex };

export default parser;

export type {
  ParseResult, LexResult, ParserOptions,
  TransformNode,
  AstRootNode,
  Position,
  LexerOptions, AstTokenNode, Token, AstNode, AstSymbolNode
}
