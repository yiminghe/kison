// TODO: improve Tuple type
type Optional<T> = T | undefined;
type OneOrMore<T> = T extends Array<infer U> ? [...T, ...U[]] : [T, ...T[]];
type ZeroOrMore<T> = T extends Array<infer U> ? U[] : T[];

export type AstNode = AstSymbolNode | AstTokenNode;

// replace start
export type AstSymbolNode = Ast_Exp_Node;
export type AstTokenNode = Ast_$EOF_Node|Ast_$UNKNOWN_Node|Ast_TOKEN_0_Node|Ast_TOKEN_1_Node|Ast_TOKEN_2_Node|Ast_NUMBER_Node;
export type LiteralToken = "HIDDEN"|"NUMBER"|"$EOF"|"$UNKNOWN"|"+"|"*"|"-";
export type AstRootNode = Ast_Exp_Node;
// replace end

export type AstErrorNode = AstTokenNode & {
  error: ParseError;
}

export interface Position {
  start: number;
  end: number;
  firstLine: number;
  lastLine: number;
  firstColumn: number;
  lastColumn: number;
}

interface BaseSymbolNode extends Position {
  type: 'symbol';
  symbol: '';
  parent?: AstSymbolNode;
  label: '';
  children: AstNode[];
}

interface BaseTokenNode extends Position {
  type: 'token';
  token: '';
  t: string;
  text: string;
  parent: AstSymbolNode;
}

export type TransformNode = (arg: {
  index: number;
  node: AstNode;
  parent: AstSymbolNode;
  defaultTransformNode: TransformNode;
}) => AstNode | AstNode[] | null;

export interface Token extends Position {
  text: string;
  t: string;
  more?: boolean;
  channel?: string | string[];
  recovery?: string;
  token: LiteralToken;
}

export interface ParseError {
  errorMessage: string;
  expected: LiteralToken[];
  lexer: Token;
  recovery?: Boolean;
  symbol: AstSymbolNode['symbol'];
  tip: string;
}

export interface LexerOptions<T = any> {
  env?: string;
  unicode?: boolean;
  state?: {
    userData?: T,
    stateStack?: string[];
  }
}

export interface ParserOptions {
  // only for llk, global match improve accuracy but impact parse speed
  globalMatch?: boolean;
  lexerOptions?: LexerOptions;
  transformNode?: TransformNode | false;
  startSymbol?: string;
  parseTree?: boolean;
  onErrorRecovery?: (args: {
    parseTree: AstNode;
    errorNode: AstErrorNode;
  }, recommendedAction: {
    action?: 'del' | 'add'
  }) => void;
}

export interface ParseResult {
  ast: AstRootNode;
  error?: ParseError;
  errorNode?: AstErrorNode;
  recoveryTokens: Token[];
  terminalNodes: AstTokenNode[];
  tokens: Token[];
}

export interface LexResult<T = any> {
  tokens: Token[];
  state: {
    userData: T,
    stateStack: string[];
  }
}

export type AstNodeTypeMap = { ast: AstNode;
exp: Ast_Exp_Node;
binaryExp: Ast_BinaryExp_Node;
prefixExp: Ast_PrefixExp_Node;
singleExp: Ast_SingleExp_Node;
$EOF: Ast_$EOF_Node;
$UNKNOWN: Ast_$UNKNOWN_Node;
TOKEN_0: Ast_TOKEN_0_Node;
TOKEN_1: Ast_TOKEN_1_Node;
TOKEN_2: Ast_TOKEN_2_Node;
NUMBER: Ast_NUMBER_Node;
};

export type All_Names = Exclude<
  LiteralToken | AstSymbolNode['symbol'] | AstSymbolNode['label'],
  ''
>;

export type AstVisitor<T extends string, C, R = any> = (
  node: AstNodeTypeMap[T extends All_Names ? T : 'ast'],
  context: C,
) => R;

export type AstVisitors<T extends string, C, R = any> = {
  [e in All_Names | '' as e extends ''
  ? T
  : `${T}${Capitalize<e>}`]?: AstVisitor<e, C, R>;
};

declare function parse(input: string, options?: ParserOptions): ParseResult;

declare function lex<T = any>(input: string, options?: LexerOptions<T>): LexResult<T>;

declare const parser: {
  parse: typeof parse, lex: typeof lex, lexer: {
    getCurrentToken: Token;
    getLastToken(filter?: (token: Token) => boolean): Token;
  }
};

export default parser;

// BinaryExpNode['userData'] = AstNodeUserDataTypes['binaryExp'] & AstNodeUserDataTypes['exp'] & AstNodeUserDataTypes['symbol'] & AstNodeUserDataTypes['ast'];

type AstNodeUserDataTypes={
  ast:{},
  symbol:{},
  token:{},
  'exp':{
    value:number;
  },
  binaryExp:{},
};

type SingleAstNodeUserDataType<T extends string> =  T extends keyof AstNodeUserDataTypes?AstNodeUserDataTypes[T]:{};

      type ShiftArray<A extends any[]> = A extends [any,...infer U]?U:[];

      type AstNodeUserDataType<T extends string[], R={}> =  
      T['length'] extends 0 ?R:AstNodeUserDataType<ShiftArray<T>,R & SingleAstNodeUserDataType<T[0]>>
      ;
interface Ast_$EOF_Node_ extends BaseTokenNode {
      token:"$EOF";
      parent:AstSymbolNode;
    }
export type Ast_$EOF_Node = Ast_$EOF_Node_ & {userData:AstNodeUserDataType<["$EOF","token","ast"]>};
interface Ast_$UNKNOWN_Node_ extends BaseTokenNode {
      token:"$UNKNOWN";
      parent:AstSymbolNode;
    }
export type Ast_$UNKNOWN_Node = Ast_$UNKNOWN_Node_ & {userData:AstNodeUserDataType<["$UNKNOWN","token","ast"]>};
interface Ast_TOKEN_0_Node_ extends BaseTokenNode {
            token:"+";
            parent:Ast_Exp_Node_0;
          }
export type Ast_TOKEN_0_Node = Ast_TOKEN_0_Node_ & {userData:AstNodeUserDataType<["+","token","ast"]>};
interface Ast_Exp_Node_0_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Ast_Exp_Node,Ast_TOKEN_0_Node,Ast_Exp_Node];
        parent:Ast_Exp_Node_0 | Ast_Exp_Node_1 | Ast_Exp_Node_2;
      }
type Ast_Exp_Node_0 = Ast_Exp_Node_0_ & {userData:AstNodeUserDataType<["binaryExp","exp","symbol","ast"]>};
interface Ast_TOKEN_1_Node_ extends BaseTokenNode {
            token:"*";
            parent:Ast_Exp_Node_1;
          }
export type Ast_TOKEN_1_Node = Ast_TOKEN_1_Node_ & {userData:AstNodeUserDataType<["*","token","ast"]>};
interface Ast_Exp_Node_1_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Ast_Exp_Node,Ast_TOKEN_1_Node,Ast_Exp_Node];
        parent:Ast_Exp_Node_0 | Ast_Exp_Node_1 | Ast_Exp_Node_2;
      }
type Ast_Exp_Node_1 = Ast_Exp_Node_1_ & {userData:AstNodeUserDataType<["binaryExp","exp","symbol","ast"]>};
interface Ast_TOKEN_2_Node_ extends BaseTokenNode {
            token:"-";
            parent:Ast_Exp_Node_2;
          }
export type Ast_TOKEN_2_Node = Ast_TOKEN_2_Node_ & {userData:AstNodeUserDataType<["-","token","ast"]>};
interface Ast_Exp_Node_2_ extends BaseSymbolNode {
        symbol:"exp";
        label:"prefixExp";
        children:[Ast_TOKEN_2_Node,Ast_Exp_Node];
        parent:Ast_Exp_Node_0 | Ast_Exp_Node_1 | Ast_Exp_Node_2;
      }
type Ast_Exp_Node_2 = Ast_Exp_Node_2_ & {userData:AstNodeUserDataType<["prefixExp","exp","symbol","ast"]>};
interface Ast_NUMBER_Node_ extends BaseTokenNode {
            token:"NUMBER";
            parent:Ast_Exp_Node_3;
          }
export type Ast_NUMBER_Node = Ast_NUMBER_Node_ & {userData:AstNodeUserDataType<["NUMBER","token","ast"]>};
interface Ast_Exp_Node_3_ extends BaseSymbolNode {
        symbol:"exp";
        label:"singleExp";
        children:[Ast_NUMBER_Node];
        parent:Ast_Exp_Node_0 | Ast_Exp_Node_1 | Ast_Exp_Node_2;
      }
type Ast_Exp_Node_3 = Ast_Exp_Node_3_ & {userData:AstNodeUserDataType<["singleExp","exp","symbol","ast"]>};
export type Ast_Exp_Node = Ast_Exp_Node_0 | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3;
export type Ast_BinaryExp_Node = Ast_Exp_Node_0 | Ast_Exp_Node_1;
export type Ast_PrefixExp_Node = Ast_Exp_Node_2;
export type Ast_SingleExp_Node = Ast_Exp_Node_3;