// TODO: improve Tuple type
type Optional<T> = T | undefined;
type OneOrMore<T> = T extends Array<infer U> ? [...T, ...U[]] : [T, ...T[]];
type ZeroOrMore<T> = T extends Array<infer U> ? U[] : T[];

export type AstNode = AstSymbolNode | AstTokenNode;

// replace start
export type AstSymbolNode = Ast_Progam_Node|Ast_Command_Node|Ast_Literal_Node|Ast_String_Node;
export type AstTokenNode = Ast_$EOF_Node|Ast_$UNKNOWN_Node|Ast_LINE_END_Node|Ast_WORD_Node|Ast_RAW_STRING_Node|Ast_ANSII_C_STRING_Node|Ast_DOLLAR_Node|Ast_STRING_CONTENT_Node|Ast_QUOTE_Node;
export type LiteralToken = "QUOTE"|"STRING_CONTENT"|"WORD"|"RAW_STRING"|"ANSII_C_STRING"|"LINE_END"|"HIDDEN"|"DOLLAR"|"$EOF"|"$UNKNOWN";
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
command: Ast_Command_Node;
literal: Ast_Literal_Node;
string: Ast_String_Node;
$EOF: Ast_$EOF_Node;
$UNKNOWN: Ast_$UNKNOWN_Node;
LINE_END: Ast_LINE_END_Node;
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

        type Ast_Progam_group_def_2_Parent_Node = Ast_Progam_Node_1|Ast_Progam_Node_2|Ast_Progam_Node_3|Ast_Progam_Node_4;
        

        type Ast_Command_group_def_4_Parent_Node = Ast_Command_Node;
        

        type Ast_String_group_def_6_Parent_Node_11 = Ast_String_Node;
        

        type Ast_String_group_def_6_Parent_Node_12 = Ast_String_Node;
        
interface Ast_LINE_END_Node_ extends BaseTokenNode {
            token:"LINE_END";
            parent:Ast_Progam_group_def_2_Parent_Node | Ast_Progam_Node_1 | Ast_Progam_Node_2 | Ast_Progam_Node_3;
          }
export type Ast_LINE_END_Node = Ast_LINE_END_Node_;
type Ast_Progam_group_def_2_Node  = [Ast_LINE_END_Node,Ast_Command_Node];
interface Ast_Progam_Node_1_ extends BaseSymbolNode {
        symbol:"progam";
        
        children:[Ast_LINE_END_Node,Ast_Command_Node,...ZeroOrMore<Ast_Progam_group_def_2_Node>,Ast_LINE_END_Node];
        
      }
type Ast_Progam_Node_1 = Ast_Progam_Node_1_;
interface Ast_Progam_Node_2_ extends BaseSymbolNode {
        symbol:"progam";
        
        children:[Ast_LINE_END_Node,Ast_Command_Node,...ZeroOrMore<Ast_Progam_group_def_2_Node>];
        
      }
type Ast_Progam_Node_2 = Ast_Progam_Node_2_;
interface Ast_Progam_Node_3_ extends BaseSymbolNode {
        symbol:"progam";
        
        children:[Ast_Command_Node,...ZeroOrMore<Ast_Progam_group_def_2_Node>,Ast_LINE_END_Node];
        
      }
type Ast_Progam_Node_3 = Ast_Progam_Node_3_;
interface Ast_Progam_Node_4_ extends BaseSymbolNode {
        symbol:"progam";
        
        children:[Ast_Command_Node,...ZeroOrMore<Ast_Progam_group_def_2_Node>];
        
      }
type Ast_Progam_Node_4 = Ast_Progam_Node_4_;
type Ast_Command_group_def_4_Node  = [Ast_Literal_Node];
interface Ast_Command_Node_ extends BaseSymbolNode {
        symbol:"command";
        
        children:[...OneOrMore<Ast_Command_group_def_4_Node>];
        parent:Ast_Progam_group_def_2_Parent_Node | Ast_Progam_Node_1 | Ast_Progam_Node_2 | Ast_Progam_Node_3 | Ast_Progam_Node_4;
      }
type Ast_Command_Node = Ast_Command_Node_;
interface Ast_WORD_Node_ extends BaseTokenNode {
            token:"WORD";
            parent:Ast_Literal_Node_7;
          }
export type Ast_WORD_Node = Ast_WORD_Node_;
interface Ast_Literal_Node_7_ extends BaseSymbolNode {
        symbol:"literal";
        
        children:[Ast_WORD_Node];
        parent:Ast_Command_group_def_4_Parent_Node;
      }
type Ast_Literal_Node_7 = Ast_Literal_Node_7_;
interface Ast_Literal_Node_8_ extends BaseSymbolNode {
        symbol:"literal";
        
        children:[Ast_String_Node];
        parent:Ast_Command_group_def_4_Parent_Node;
      }
type Ast_Literal_Node_8 = Ast_Literal_Node_8_;
interface Ast_RAW_STRING_Node_ extends BaseTokenNode {
            token:"RAW_STRING";
            parent:Ast_Literal_Node_9;
          }
export type Ast_RAW_STRING_Node = Ast_RAW_STRING_Node_;
interface Ast_Literal_Node_9_ extends BaseSymbolNode {
        symbol:"literal";
        
        children:[Ast_RAW_STRING_Node];
        parent:Ast_Command_group_def_4_Parent_Node;
      }
type Ast_Literal_Node_9 = Ast_Literal_Node_9_;
interface Ast_ANSII_C_STRING_Node_ extends BaseTokenNode {
            token:"ANSII_C_STRING";
            parent:Ast_Literal_Node_10;
          }
export type Ast_ANSII_C_STRING_Node = Ast_ANSII_C_STRING_Node_;
interface Ast_Literal_Node_10_ extends BaseSymbolNode {
        symbol:"literal";
        
        children:[Ast_ANSII_C_STRING_Node];
        parent:Ast_Command_group_def_4_Parent_Node;
      }
type Ast_Literal_Node_10 = Ast_Literal_Node_10_;
interface Ast_DOLLAR_Node_ extends BaseTokenNode {
            token:"DOLLAR";
            parent:Ast_String_group_def_6_Parent_Node_11;
          }
export type Ast_DOLLAR_Node = Ast_DOLLAR_Node_;
interface Ast_STRING_CONTENT_Node_ extends BaseTokenNode {
            token:"STRING_CONTENT";
            parent:Ast_String_group_def_6_Parent_Node_11 | Ast_String_group_def_6_Parent_Node_12;
          }
export type Ast_STRING_CONTENT_Node = Ast_STRING_CONTENT_Node_;
type Ast_String_group_def_6_Node_11  = [Ast_DOLLAR_Node,Ast_STRING_CONTENT_Node];
type Ast_String_group_def_6_Node_12  = [Ast_STRING_CONTENT_Node];
interface Ast_QUOTE_Node_ extends BaseTokenNode {
            token:"QUOTE";
            parent:Ast_String_Node;
          }
export type Ast_QUOTE_Node = Ast_QUOTE_Node_;
interface Ast_String_Node_ extends BaseSymbolNode {
        symbol:"string";
        
        children:[Ast_QUOTE_Node,...ZeroOrMore<Ast_String_group_def_6_Node>,Ast_QUOTE_Node];
        parent:Ast_Literal_Node_8;
      }
type Ast_String_Node = Ast_String_Node_;
export type Ast_Progam_Node = Ast_Progam_Node_1 | Ast_Progam_Node_2 | Ast_Progam_Node_3 | Ast_Progam_Node_4;
export type { Ast_Command_Node };
export type Ast_Literal_Node = Ast_Literal_Node_7 | Ast_Literal_Node_8 | Ast_Literal_Node_9 | Ast_Literal_Node_10;
type Ast_String_group_def_6_Node = Ast_String_group_def_6_Node_11 | Ast_String_group_def_6_Node_12;
export type { Ast_String_Node };