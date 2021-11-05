// TODO: improve Tuple type
type Optional<T> = T | undefined;
type OneOrMore<T> = T extends Array<infer U> ? [...T, ...U[]] : [T, ...T[]];
type ZeroOrMore<T> = T extends Array<infer U> ? U[] : T[];

export type AstNode = AstSymbolNode | AstTokenNode;

// replace start
export type AstSymbolNode = Exp_Node;
export type AstTokenNode = $EOF_Node|$UNKNOWN_Node|TOKEN_0_Node|TOKEN_1_Node|TOKEN_2_Node|TOKEN_3_Node|TOKEN_4_Node|TOKEN_5_Node|TOKEN_6_Node|NUMBER_Node;
export type LiteralToken = "HIDDEN"|"NUMBER"|"$EOF"|"$UNKNOWN"|"("|")"|"+"|"-"|"*"|"/"|"^";
export type AstRootNode = Exp_Node;
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
}) => AstNode | null;

export interface Token extends Position {
  text: string;
  t: string;
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
exp: Exp_Node;
$EOF: $EOF_Node;
$UNKNOWN: $UNKNOWN_Node;
TOKEN_0: TOKEN_0_Node;
TOKEN_1: TOKEN_1_Node;
TOKEN_2: TOKEN_2_Node;
TOKEN_3: TOKEN_3_Node;
TOKEN_4: TOKEN_4_Node;
TOKEN_5: TOKEN_5_Node;
TOKEN_6: TOKEN_6_Node;
NUMBER: NUMBER_Node;
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

declare const parser: { parse: typeof parse, lex: typeof lex };

export default parser;

interface $EOF_Node_ extends BaseTokenNode {
      token:"$EOF";
      parent:AstSymbolNode;
    }
export type $EOF_Node = $EOF_Node_;
interface $UNKNOWN_Node_ extends BaseTokenNode {
      token:"$UNKNOWN";
      parent:AstSymbolNode;
    }
export type $UNKNOWN_Node = $UNKNOWN_Node_;
interface TOKEN_0_Node_ extends BaseTokenNode {
            token:"(";
            parent:Exp_Node_0;
          }
export type TOKEN_0_Node = TOKEN_0_Node_;
interface TOKEN_1_Node_ extends BaseTokenNode {
            token:")";
            parent:Exp_Node_0;
          }
export type TOKEN_1_Node = TOKEN_1_Node_;
interface Exp_Node_0_ extends BaseSymbolNode {
        symbol:"exp";
        
        children:[TOKEN_0_Node,Exp_Node,TOKEN_1_Node];
        parent:Exp_Node_0 | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6;
      }
type Exp_Node_0 = Exp_Node_0_;
interface TOKEN_2_Node_ extends BaseTokenNode {
            token:"+";
            parent:Exp_Node_1;
          }
export type TOKEN_2_Node = TOKEN_2_Node_;
interface Exp_Node_1_ extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Exp_Node,TOKEN_2_Node,Exp_Node];
        parent:Exp_Node_0 | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6;
      }
type Exp_Node_1 = Exp_Node_1_;
interface TOKEN_3_Node_ extends BaseTokenNode {
            token:"-";
            parent:Exp_Node_2 | Exp_Node_5;
          }
export type TOKEN_3_Node = TOKEN_3_Node_;
interface Exp_Node_2_ extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Exp_Node,TOKEN_3_Node,Exp_Node];
        parent:Exp_Node_0 | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6;
      }
type Exp_Node_2 = Exp_Node_2_;
interface TOKEN_4_Node_ extends BaseTokenNode {
            token:"*";
            parent:Exp_Node_3;
          }
export type TOKEN_4_Node = TOKEN_4_Node_;
interface Exp_Node_3_ extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Exp_Node,TOKEN_4_Node,Exp_Node];
        parent:Exp_Node_0 | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6;
      }
type Exp_Node_3 = Exp_Node_3_;
interface TOKEN_5_Node_ extends BaseTokenNode {
            token:"/";
            parent:Exp_Node_4;
          }
export type TOKEN_5_Node = TOKEN_5_Node_;
interface Exp_Node_4_ extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Exp_Node,TOKEN_5_Node,Exp_Node];
        parent:Exp_Node_0 | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6;
      }
type Exp_Node_4 = Exp_Node_4_;
interface Exp_Node_5_ extends BaseSymbolNode {
        symbol:"exp";
        
        children:[TOKEN_3_Node,Exp_Node];
        parent:Exp_Node_0 | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6;
      }
type Exp_Node_5 = Exp_Node_5_;
interface TOKEN_6_Node_ extends BaseTokenNode {
            token:"^";
            parent:Exp_Node_6;
          }
export type TOKEN_6_Node = TOKEN_6_Node_;
interface Exp_Node_6_ extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Exp_Node,TOKEN_6_Node,Exp_Node];
        parent:Exp_Node_0 | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6;
      }
type Exp_Node_6 = Exp_Node_6_;
interface NUMBER_Node_ extends BaseTokenNode {
            token:"NUMBER";
            parent:Exp_Node_7;
          }
export type NUMBER_Node = NUMBER_Node_;
interface Exp_Node_7_ extends BaseSymbolNode {
        symbol:"exp";
        
        children:[NUMBER_Node];
        parent:Exp_Node_0 | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6;
      }
type Exp_Node_7 = Exp_Node_7_;
export type Exp_Node = Exp_Node_0 | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7;