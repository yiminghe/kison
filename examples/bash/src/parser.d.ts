// TODO: improve Tuple type
type Optional<T> = T | undefined;
type OneOrMore<T> = T extends Array<infer U> ? [...T, ...U[]] : [T, ...T[]];
type ZeroOrMore<T> = T extends Array<infer U> ? U[] : T[];

export type AstNode = AstSymbolNode | AstTokenNode;

// replace start
export type AstSymbolNode = Ast_Progam_Node|Ast_Statements_Node|Ast_Statement_Node|Ast_Command_Node|Ast_Literal_Node|Ast_Primary_expression_Node|Ast_String_Node;
export type AstTokenNode = Ast_$EOF_Node|Ast_$UNKNOWN_Node|Ast_EQ_CURL_Node|Ast_EQ_EQ_Node|Ast_WORD_Node|Ast_RAW_STRING_Node|Ast_ANSII_C_STRING_Node|Ast_DOLLAR_Node|Ast_STRING_CONTENT_Node|Ast_QUOTE_Node;
export type LiteralToken = "QUOTE"|"STRING_CONTENT"|"WORD"|"RAW_STRING"|"ANSII_C_STRING"|"HIDDEN"|"EQ_CURL"|"EQ_EQ"|"DOLLAR"|"$EOF"|"$UNKNOWN";
export type AstRootNode = Ast_Progam_Node;
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
  token: Token;
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
progam: Ast_Progam_Node;
statements: Ast_Statements_Node;
statement: Ast_Statement_Node;
command: Ast_Command_Node;
literal: Ast_Literal_Node;
primary_expression: Ast_Primary_expression_Node;
string: Ast_String_Node;
$EOF: Ast_$EOF_Node;
$UNKNOWN: Ast_$UNKNOWN_Node;
EQ_CURL: Ast_EQ_CURL_Node;
EQ_EQ: Ast_EQ_EQ_Node;
WORD: Ast_WORD_Node;
RAW_STRING: Ast_RAW_STRING_Node;
ANSII_C_STRING: Ast_ANSII_C_STRING_Node;
DOLLAR: Ast_DOLLAR_Node;
STRING_CONTENT: Ast_STRING_CONTENT_Node;
QUOTE: Ast_QUOTE_Node;
};

export type All_Names = Exclude<
  LiteralToken | AstSymbolNode['symbol'] | AstSymbolNode['label'],
  ''
>;

export type AstVisitor<T extends string, C, OtherParams = any, R = any> = (
  node: AstNodeTypeMap[T extends All_Names ? T : 'ast'],
  context: C,
  otherParams?: OtherParams,
) => R;

export type AstVisitors<T extends string, C, OtherParams = any, R = any> = {
  [e in All_Names | '' as e extends ''
  ? T
  : `${T}${Capitalize<e>}`]?: AstVisitor<e, C, OtherParams, R>;
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
        

        type Ast_Command_group_def_4_Parent_Node = Ast_Command_group_3_Parent_Node_5;
        

        type Ast_Command_group_3_Parent_Node_5 = Ast_Command_Node;
        

        type Ast_Command_group_def_5_Parent_Node = Ast_Command_group_3_Parent_Node_7;
        

        type Ast_Command_group_3_Parent_Node_7 = Ast_Command_Node;
        

        type Ast_Command_group_def_6_Parent_Node = Ast_Command_group_3_Parent_Node_9;
        

        type Ast_Command_group_3_Parent_Node_9 = Ast_Command_Node;
        

        type Ast_String_group_def_8_Parent_Node_16 = Ast_String_Node;
        

        type Ast_String_group_def_8_Parent_Node_17 = Ast_String_Node;
        
interface Ast_Progam_Node_ extends BaseSymbolNode {
        symbol:"progam";
        
        children:[Ast_Statements_Node];
        
      }
type Ast_Progam_Node = Ast_Progam_Node_;
type Ast_Statements_group_def_2_Node  = [Ast_Statement_Node];
interface Ast_Statements_Node_ extends BaseSymbolNode {
        symbol:"statements";
        
        children:[...OneOrMore<Ast_Statements_group_def_2_Node>];
        parent:Ast_Progam_Node;
      }
type Ast_Statements_Node = Ast_Statements_Node_;
interface Ast_Statement_Node_ extends BaseSymbolNode {
        symbol:"statement";
        
        children:[Ast_Command_Node];
        parent:Ast_Statements_group_def_2_Parent_Node;
      }
type Ast_Statement_Node = Ast_Statement_Node_;
type Ast_Command_group_def_4_Node  = [Ast_Literal_Node];
type Ast_Command_group_3_Node_5  = [...Ast_Command_group_def_4_Node];
interface Ast_EQ_CURL_Node_ extends BaseTokenNode {
            token:"EQ_CURL";
            parent:Ast_Command_group_def_5_Parent_Node;
          }
export type Ast_EQ_CURL_Node = Ast_EQ_CURL_Node_;
type Ast_Command_group_def_5_Node  = [Ast_EQ_CURL_Node];
type Ast_Command_group_3_Node_7  = [...Ast_Command_group_def_5_Node];
interface Ast_EQ_EQ_Node_ extends BaseTokenNode {
            token:"EQ_EQ";
            parent:Ast_Command_group_def_6_Parent_Node;
          }
export type Ast_EQ_EQ_Node = Ast_EQ_EQ_Node_;
type Ast_Command_group_def_6_Node  = [Ast_EQ_EQ_Node,Ast_Literal_Node];
type Ast_Command_group_3_Node_9  = [...Ast_Command_group_def_6_Node];
interface Ast_Command_Node_ extends BaseSymbolNode {
        symbol:"command";
        
        children:[Ast_Literal_Node,...ZeroOrMore<Ast_Command_group_3_Node>];
        parent:Ast_Statement_Node;
      }
type Ast_Command_Node = Ast_Command_Node_;
interface Ast_Literal_Node_ extends BaseSymbolNode {
        symbol:"literal";
        
        children:[Ast_Primary_expression_Node];
        parent:Ast_Command_group_def_4_Parent_Node | Ast_Command_group_def_6_Parent_Node | Ast_Command_Node;
      }
type Ast_Literal_Node = Ast_Literal_Node_;
interface Ast_WORD_Node_ extends BaseTokenNode {
            token:"WORD";
            parent:Ast_Primary_expression_Node_12;
          }
export type Ast_WORD_Node = Ast_WORD_Node_;
interface Ast_Primary_expression_Node_12_ extends BaseSymbolNode {
        symbol:"primary_expression";
        
        children:[Ast_WORD_Node];
        parent:Ast_Literal_Node;
      }
type Ast_Primary_expression_Node_12 = Ast_Primary_expression_Node_12_;
interface Ast_Primary_expression_Node_13_ extends BaseSymbolNode {
        symbol:"primary_expression";
        
        children:[Ast_String_Node];
        parent:Ast_Literal_Node;
      }
type Ast_Primary_expression_Node_13 = Ast_Primary_expression_Node_13_;
interface Ast_RAW_STRING_Node_ extends BaseTokenNode {
            token:"RAW_STRING";
            parent:Ast_Primary_expression_Node_14;
          }
export type Ast_RAW_STRING_Node = Ast_RAW_STRING_Node_;
interface Ast_Primary_expression_Node_14_ extends BaseSymbolNode {
        symbol:"primary_expression";
        
        children:[Ast_RAW_STRING_Node];
        parent:Ast_Literal_Node;
      }
type Ast_Primary_expression_Node_14 = Ast_Primary_expression_Node_14_;
interface Ast_ANSII_C_STRING_Node_ extends BaseTokenNode {
            token:"ANSII_C_STRING";
            parent:Ast_Primary_expression_Node_15;
          }
export type Ast_ANSII_C_STRING_Node = Ast_ANSII_C_STRING_Node_;
interface Ast_Primary_expression_Node_15_ extends BaseSymbolNode {
        symbol:"primary_expression";
        
        children:[Ast_ANSII_C_STRING_Node];
        parent:Ast_Literal_Node;
      }
type Ast_Primary_expression_Node_15 = Ast_Primary_expression_Node_15_;
interface Ast_DOLLAR_Node_ extends BaseTokenNode {
            token:"DOLLAR";
            parent:Ast_String_group_def_8_Parent_Node_16;
          }
export type Ast_DOLLAR_Node = Ast_DOLLAR_Node_;
interface Ast_STRING_CONTENT_Node_ extends BaseTokenNode {
            token:"STRING_CONTENT";
            parent:Ast_String_group_def_8_Parent_Node_16 | Ast_String_group_def_8_Parent_Node_17;
          }
export type Ast_STRING_CONTENT_Node = Ast_STRING_CONTENT_Node_;
type Ast_String_group_def_8_Node_16  = [Ast_DOLLAR_Node,Ast_STRING_CONTENT_Node];
type Ast_String_group_def_8_Node_17  = [Ast_STRING_CONTENT_Node];
interface Ast_QUOTE_Node_ extends BaseTokenNode {
            token:"QUOTE";
            parent:Ast_String_Node;
          }
export type Ast_QUOTE_Node = Ast_QUOTE_Node_;
interface Ast_String_Node_ extends BaseSymbolNode {
        symbol:"string";
        
        children:[Ast_QUOTE_Node,...ZeroOrMore<Ast_String_group_def_8_Node>,Ast_QUOTE_Node];
        parent:Ast_Primary_expression_Node_13;
      }
type Ast_String_Node = Ast_String_Node_;
export type { Ast_Progam_Node };
export type { Ast_Statements_Node };
export type { Ast_Statement_Node };
type Ast_Command_group_3_Node = Ast_Command_group_3_Node_5 | Ast_Command_group_3_Node_7 | Ast_Command_group_3_Node_9;
export type { Ast_Command_Node };
export type { Ast_Literal_Node };
export type Ast_Primary_expression_Node = Ast_Primary_expression_Node_12 | Ast_Primary_expression_Node_13 | Ast_Primary_expression_Node_14 | Ast_Primary_expression_Node_15;
type Ast_String_group_def_8_Node = Ast_String_group_def_8_Node_16 | Ast_String_group_def_8_Node_17;
export type { Ast_String_Node };