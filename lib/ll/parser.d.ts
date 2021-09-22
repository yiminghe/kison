type AstNode = AstSymbolNode | AstTokenNode;

// replace start
type AstSymbolNode = {};
type AstTokenNode = {};
type LiteralToken = {};
// replace end

interface NodeLocation {
  start: number;
  end: number;
  firstLine: number;
  endLine: number;
  firstColumn: number;
  endColumn: number;
}

interface BaseSymbolNode extends NodeLocation {
  type: 'symbol',
  label: string;
}

interface BaseTokenNode extends NodeLocation {
  type: 'token',
  text: string;
}

type AstErrorNode = AstNode & {
  error: ParseError;
};

type TransformNode = (arg: {
  node: AstNode;
  parent: AstNode;
  defaultTransformNode: TransformNode;
}) => AstNode | null;

interface Token extends NodeLocation {
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

interface LexerOptions {
  env?: string;
}

interface ParserOptions {
  lexerOptions: LexerOptions;
  transformNode?: TransformNode;
  onErrorRecovery?: (args: {
    parseTree: AstNode;
    action: () => void;
    token: Token;
  }) => void;
}

interface ParseResult {
  ast: AstSymbolNode;
  error: ParseError;
  errorNode: AstErrorNode;
  recoveryTokens: Token[];
  terminalNodes: AstTokenNode[];
  tokens: Token[];
}

interface LexResult {
  tokens: Token[];
}

declare function parse(input: string, options?: ParserOptions): ParseResult;

declare function lex(input: string, options?: LexerOptions): LexResult;

declare const parser: { parse: typeof parse, lex: typeof lex };

export default parser;

export type { ParseResult, LexResult, ParserOptions, LexerOptions }
