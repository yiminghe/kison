// TODO: improve Tuple type
type Optional<T> = T | undefined;
type OneOrMore<T> = T extends Array<infer U> ? [...T, ...U[]] : [T, ...T[]];
type ZeroOrMore<T> = T extends Array<infer U> ? U[] : T[];

export type AstNode = AstSymbolNode | AstTokenNode;

// replace start
export type AstSymbolNode = Ast_Program_Node|Ast_Statements_Node|Ast_Exp_Node;
export type AstTokenNode = Ast_$EOF_Node|Ast_$UNKNOWN_Node|Ast_NEW_LINE_Node|Ast_TOKEN_0_Node|Ast_TOKEN_1_Node|Ast_TOKEN_2_Node|Ast_TOKEN_3_Node|Ast_TOKEN_4_Node|Ast_NUMBER_Node|Ast_TOKEN_5_Node|Ast_TOKEN_6_Node;
export type LiteralToken = "NEW_LINE"|"NUMBER"|"$EOF"|"$UNKNOWN"|"+"|"-"|"*"|"/"|"^"|"("|")";
export type AstRootNode = Ast_Program_Node;
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
program: Ast_Program_Node;
statements: Ast_Statements_Node;
exp: Ast_Exp_Node;
binaryExp: Ast_BinaryExp_Node;
prefixExp: Ast_PrefixExp_Node;
singleExp: Ast_SingleExp_Node;
groupExp: Ast_GroupExp_Node;
$EOF: Ast_$EOF_Node;
$UNKNOWN: Ast_$UNKNOWN_Node;
NEW_LINE: Ast_NEW_LINE_Node;
TOKEN_0: Ast_TOKEN_0_Node;
TOKEN_1: Ast_TOKEN_1_Node;
TOKEN_2: Ast_TOKEN_2_Node;
TOKEN_3: Ast_TOKEN_3_Node;
TOKEN_4: Ast_TOKEN_4_Node;
NUMBER: Ast_NUMBER_Node;
TOKEN_5: Ast_TOKEN_5_Node;
TOKEN_6: Ast_TOKEN_6_Node;
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

interface Ast_$EOF_Node_ extends BaseTokenNode {
      token:"$EOF";
      parent:AstSymbolNode;
    }
export type Ast_$EOF_Node = Ast_$EOF_Node_;
interface Ast_$UNKNOWN_Node_ extends BaseTokenNode {
      token:"$UNKNOWN";
      parent:AstSymbolNode;
    }
export type Ast_$UNKNOWN_Node = Ast_$UNKNOWN_Node_;

        type Ast_Statements_group_def_2_Parent_Node = Ast_Statements_Node;
        
interface Ast_Program_Node_ extends BaseSymbolNode {
        symbol:"program";
        
        children:[Ast_Statements_Node];
        
      }
type Ast_Program_Node = Ast_Program_Node_;
interface Ast_NEW_LINE_Node_ extends BaseTokenNode {
            token:"NEW_LINE";
            parent:Ast_Statements_group_def_2_Parent_Node;
          }
export type Ast_NEW_LINE_Node = Ast_NEW_LINE_Node_;
type Ast_Statements_group_def_2_Node  = [Ast_Exp_Node,Ast_NEW_LINE_Node];
interface Ast_Statements_Node_ extends BaseSymbolNode {
        symbol:"statements";
        
        children:[...OneOrMore<Ast_Statements_group_def_2_Node>];
        parent:Ast_Program_Node;
      }
type Ast_Statements_Node = Ast_Statements_Node_;
interface Ast_TOKEN_0_Node_ extends BaseTokenNode {
            token:"+";
            parent:Ast_Exp_Node_3;
          }
export type Ast_TOKEN_0_Node = Ast_TOKEN_0_Node_;
interface Ast_Exp_Node_3_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Ast_Exp_Node,Ast_TOKEN_0_Node,Ast_Exp_Node];
        parent:Ast_Statements_group_def_2_Parent_Node | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_10;
      }
type Ast_Exp_Node_3 = Ast_Exp_Node_3_;
interface Ast_TOKEN_1_Node_ extends BaseTokenNode {
            token:"-";
            parent:Ast_Exp_Node_4 | Ast_Exp_Node_8;
          }
export type Ast_TOKEN_1_Node = Ast_TOKEN_1_Node_;
interface Ast_Exp_Node_4_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Ast_Exp_Node,Ast_TOKEN_1_Node,Ast_Exp_Node];
        parent:Ast_Statements_group_def_2_Parent_Node | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_10;
      }
type Ast_Exp_Node_4 = Ast_Exp_Node_4_;
interface Ast_TOKEN_2_Node_ extends BaseTokenNode {
            token:"*";
            parent:Ast_Exp_Node_5;
          }
export type Ast_TOKEN_2_Node = Ast_TOKEN_2_Node_;
interface Ast_Exp_Node_5_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Ast_Exp_Node,Ast_TOKEN_2_Node,Ast_Exp_Node];
        parent:Ast_Statements_group_def_2_Parent_Node | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_10;
      }
type Ast_Exp_Node_5 = Ast_Exp_Node_5_;
interface Ast_TOKEN_3_Node_ extends BaseTokenNode {
            token:"/";
            parent:Ast_Exp_Node_6;
          }
export type Ast_TOKEN_3_Node = Ast_TOKEN_3_Node_;
interface Ast_Exp_Node_6_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Ast_Exp_Node,Ast_TOKEN_3_Node,Ast_Exp_Node];
        parent:Ast_Statements_group_def_2_Parent_Node | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_10;
      }
type Ast_Exp_Node_6 = Ast_Exp_Node_6_;
interface Ast_TOKEN_4_Node_ extends BaseTokenNode {
            token:"^";
            parent:Ast_Exp_Node_7;
          }
export type Ast_TOKEN_4_Node = Ast_TOKEN_4_Node_;
interface Ast_Exp_Node_7_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Ast_Exp_Node,Ast_TOKEN_4_Node,Ast_Exp_Node];
        parent:Ast_Statements_group_def_2_Parent_Node | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_10;
      }
type Ast_Exp_Node_7 = Ast_Exp_Node_7_;
interface Ast_Exp_Node_8_ extends BaseSymbolNode {
        symbol:"exp";
        label:"prefixExp";
        children:[Ast_TOKEN_1_Node,Ast_Exp_Node];
        parent:Ast_Statements_group_def_2_Parent_Node | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_10;
      }
type Ast_Exp_Node_8 = Ast_Exp_Node_8_;
interface Ast_NUMBER_Node_ extends BaseTokenNode {
            token:"NUMBER";
            parent:Ast_Exp_Node_9;
          }
export type Ast_NUMBER_Node = Ast_NUMBER_Node_;
interface Ast_Exp_Node_9_ extends BaseSymbolNode {
        symbol:"exp";
        label:"singleExp";
        children:[Ast_NUMBER_Node];
        parent:Ast_Statements_group_def_2_Parent_Node | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_10;
      }
type Ast_Exp_Node_9 = Ast_Exp_Node_9_;
interface Ast_TOKEN_5_Node_ extends BaseTokenNode {
            token:"(";
            parent:Ast_Exp_Node_10;
          }
export type Ast_TOKEN_5_Node = Ast_TOKEN_5_Node_;
interface Ast_TOKEN_6_Node_ extends BaseTokenNode {
            token:")";
            parent:Ast_Exp_Node_10;
          }
export type Ast_TOKEN_6_Node = Ast_TOKEN_6_Node_;
interface Ast_Exp_Node_10_ extends BaseSymbolNode {
        symbol:"exp";
        label:"groupExp";
        children:[Ast_TOKEN_5_Node,Ast_Exp_Node,Ast_TOKEN_6_Node];
        parent:Ast_Statements_group_def_2_Parent_Node | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_10;
      }
type Ast_Exp_Node_10 = Ast_Exp_Node_10_;
export type { Ast_Program_Node };
export type { Ast_Statements_Node };
export type Ast_Exp_Node = Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10;
export type Ast_BinaryExp_Node = Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7;
export type Ast_PrefixExp_Node = Ast_Exp_Node_8;
export type Ast_SingleExp_Node = Ast_Exp_Node_9;
export type Ast_GroupExp_Node = Ast_Exp_Node_10;