// TODO: improve Tuple type
type Optional<T> = T | undefined;
type OneOrMore<T> = T extends Array<infer U> ? [...T, ...U[]] : [T, ...T[]];
type ZeroOrMore<T> = T extends Array<infer U> ? U[] : T[];

export type AstNode = AstSymbolNode | AstTokenNode;

// replace start
export type AstSymbolNode = Ast_Formula_Node|Ast_Exp_Node|Ast_ReferenceItem_Node|Ast_Reference_Node|Ast_ArrayElement_Node|Ast_Array_Node|Ast_FunctionExp_Node|Ast_ArgumentsList_Node|Ast_StructureReference_Node|Ast_TableSpecifier_Node|Ast_TableThisRow_Node|Ast_TableSpecifierInner_Node|Ast_TableSpecifierItem_Node|Ast_TableColumnSpecifier_Node;
export type AstTokenNode = Ast_$EOF_Node|Ast_$UNKNOWN_Node|Ast_TOKEN_0_Node|Ast_TOKEN_1_Node|Ast_TOKEN_2_Node|Ast_TOKEN_3_Node|Ast_TOKEN_4_Node|Ast_TOKEN_5_Node|Ast_TOKEN_6_Node|Ast_TOKEN_7_Node|Ast_TOKEN_8_Node|Ast_TOKEN_9_Node|Ast_TOKEN_10_Node|Ast_TOKEN_11_Node|Ast_TOKEN_12_Node|Ast_TOKEN_13_Node|Ast_TOKEN_14_Node|Ast_TOKEN_15_Node|Ast_NUMBER_Node|Ast_STRING_Node|Ast_LOGIC_Node|Ast_ERROR_Node|Ast_CELL_Node|Ast_NAME_Node|Ast_REF_UNION_OPERATOR_Node|Ast_REF_RANGE_OPERATOR_Node|Ast_ARRAY_SEPARATOR_Node|Ast_TOKEN_16_Node|Ast_TOKEN_17_Node|Ast_FUNCTION_Node|Ast_ARGUMENT_SEPARATOR_Node|Ast_TABLE_NAME_Node|Ast_TABLE_ITEM_SPECIFIER_Node|Ast_TOKEN_18_Node|Ast_TOKEN_19_Node|Ast_TABLE_AT_Node|Ast_TABLE_COLUMN_SPECIFIER_Node|Ast_SPECIFIER_SEPARATOR_Node;
export type LiteralToken = "HIDDEN"|"SPECIFIER_SEPARATOR"|"TABLE_ITEM_SPECIFIER"|"TABLE_AT"|"TABLE_COLUMN_SPECIFIER"|"ARRAY_SEPARATOR"|"REF_UNION_OPERATOR"|"REF_RANGE_OPERATOR"|"ARGUMENT_SEPARATOR"|"STRING"|"FUNCTION"|"TABLE_NAME"|"ERROR"|"CELL"|"LOGIC"|"NAME"|"NUMBER"|"$EOF"|"$UNKNOWN"|"="|"<="|">="|"<>"|">"|"<"|"&"|"+"|"-"|"*"|"/"|"^"|"@"|"%"|"("|")"|"{"|"}"|"["|"]";
export type AstRootNode = Ast_Formula_Node;
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
formula: Ast_Formula_Node;
exp: Ast_Exp_Node;
referenceItem: Ast_ReferenceItem_Node;
reference: Ast_Reference_Node;
arrayElement: Ast_ArrayElement_Node;
array: Ast_Array_Node;
functionExp: Ast_FunctionExp_Node;
argumentsList: Ast_ArgumentsList_Node;
structureReference: Ast_StructureReference_Node;
tableSpecifier: Ast_TableSpecifier_Node;
tableThisRow: Ast_TableThisRow_Node;
tableSpecifierInner: Ast_TableSpecifierInner_Node;
tableSpecifierItem: Ast_TableSpecifierItem_Node;
tableColumnSpecifier: Ast_TableColumnSpecifier_Node;
binaryExp: Ast_BinaryExp_Node;
prefixExp: Ast_PrefixExp_Node;
clipExp: Ast_ClipExp_Node;
percentageExp: Ast_PercentageExp_Node;
unionReference: Ast_UnionReference_Node;
intersectionReference: Ast_IntersectionReference_Node;
rangeReference: Ast_RangeReference_Node;
$EOF: Ast_$EOF_Node;
$UNKNOWN: Ast_$UNKNOWN_Node;
TOKEN_0: Ast_TOKEN_0_Node;
TOKEN_1: Ast_TOKEN_1_Node;
TOKEN_2: Ast_TOKEN_2_Node;
TOKEN_3: Ast_TOKEN_3_Node;
TOKEN_4: Ast_TOKEN_4_Node;
TOKEN_5: Ast_TOKEN_5_Node;
TOKEN_6: Ast_TOKEN_6_Node;
TOKEN_7: Ast_TOKEN_7_Node;
TOKEN_8: Ast_TOKEN_8_Node;
TOKEN_9: Ast_TOKEN_9_Node;
TOKEN_10: Ast_TOKEN_10_Node;
TOKEN_11: Ast_TOKEN_11_Node;
TOKEN_12: Ast_TOKEN_12_Node;
TOKEN_13: Ast_TOKEN_13_Node;
TOKEN_14: Ast_TOKEN_14_Node;
TOKEN_15: Ast_TOKEN_15_Node;
NUMBER: Ast_NUMBER_Node;
STRING: Ast_STRING_Node;
LOGIC: Ast_LOGIC_Node;
ERROR: Ast_ERROR_Node;
CELL: Ast_CELL_Node;
NAME: Ast_NAME_Node;
REF_UNION_OPERATOR: Ast_REF_UNION_OPERATOR_Node;
REF_RANGE_OPERATOR: Ast_REF_RANGE_OPERATOR_Node;
ARRAY_SEPARATOR: Ast_ARRAY_SEPARATOR_Node;
TOKEN_16: Ast_TOKEN_16_Node;
TOKEN_17: Ast_TOKEN_17_Node;
FUNCTION: Ast_FUNCTION_Node;
ARGUMENT_SEPARATOR: Ast_ARGUMENT_SEPARATOR_Node;
TABLE_NAME: Ast_TABLE_NAME_Node;
TABLE_ITEM_SPECIFIER: Ast_TABLE_ITEM_SPECIFIER_Node;
TOKEN_18: Ast_TOKEN_18_Node;
TOKEN_19: Ast_TOKEN_19_Node;
TABLE_AT: Ast_TABLE_AT_Node;
TABLE_COLUMN_SPECIFIER: Ast_TABLE_COLUMN_SPECIFIER_Node;
SPECIFIER_SEPARATOR: Ast_SPECIFIER_SEPARATOR_Node;
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

        type Ast_Array_group_def_2_Parent_Node = Ast_Array_Node;
        

        type Ast_ArgumentsList_group_def_4_Parent_Node_39 = Ast_ArgumentsList_Node_41|Ast_ArgumentsList_Node_42;
        

        type Ast_ArgumentsList_group_def_4_Parent_Node_40 = Ast_ArgumentsList_Node_41|Ast_ArgumentsList_Node_42;
        

        type Ast_TableColumnSpecifier_group_def_6_Parent_Node = Ast_TableColumnSpecifier_Node;
        
interface Ast_Formula_Node_ extends BaseSymbolNode {
        symbol:"formula";
        
        children:[Ast_Exp_Node];
        
      }
type Ast_Formula_Node = Ast_Formula_Node_;
interface Ast_TOKEN_0_Node_ extends BaseTokenNode {
            token:"=";
            parent:Ast_Exp_Node_1;
          }
export type Ast_TOKEN_0_Node = Ast_TOKEN_0_Node_;
interface Ast_Exp_Node_1_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Ast_Exp_Node,Ast_TOKEN_0_Node,Ast_Exp_Node];
        parent:Ast_Formula_Node | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_Node_41;
      }
type Ast_Exp_Node_1 = Ast_Exp_Node_1_;
interface Ast_TOKEN_1_Node_ extends BaseTokenNode {
            token:"<=";
            parent:Ast_Exp_Node_2;
          }
export type Ast_TOKEN_1_Node = Ast_TOKEN_1_Node_;
interface Ast_Exp_Node_2_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Ast_Exp_Node,Ast_TOKEN_1_Node,Ast_Exp_Node];
        parent:Ast_Formula_Node | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_Node_41;
      }
type Ast_Exp_Node_2 = Ast_Exp_Node_2_;
interface Ast_TOKEN_2_Node_ extends BaseTokenNode {
            token:">=";
            parent:Ast_Exp_Node_3;
          }
export type Ast_TOKEN_2_Node = Ast_TOKEN_2_Node_;
interface Ast_Exp_Node_3_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Ast_Exp_Node,Ast_TOKEN_2_Node,Ast_Exp_Node];
        parent:Ast_Formula_Node | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_Node_41;
      }
type Ast_Exp_Node_3 = Ast_Exp_Node_3_;
interface Ast_TOKEN_3_Node_ extends BaseTokenNode {
            token:"<>";
            parent:Ast_Exp_Node_4;
          }
export type Ast_TOKEN_3_Node = Ast_TOKEN_3_Node_;
interface Ast_Exp_Node_4_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Ast_Exp_Node,Ast_TOKEN_3_Node,Ast_Exp_Node];
        parent:Ast_Formula_Node | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_Node_41;
      }
type Ast_Exp_Node_4 = Ast_Exp_Node_4_;
interface Ast_TOKEN_4_Node_ extends BaseTokenNode {
            token:">";
            parent:Ast_Exp_Node_5;
          }
export type Ast_TOKEN_4_Node = Ast_TOKEN_4_Node_;
interface Ast_Exp_Node_5_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Ast_Exp_Node,Ast_TOKEN_4_Node,Ast_Exp_Node];
        parent:Ast_Formula_Node | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_Node_41;
      }
type Ast_Exp_Node_5 = Ast_Exp_Node_5_;
interface Ast_TOKEN_5_Node_ extends BaseTokenNode {
            token:"<";
            parent:Ast_Exp_Node_6;
          }
export type Ast_TOKEN_5_Node = Ast_TOKEN_5_Node_;
interface Ast_Exp_Node_6_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Ast_Exp_Node,Ast_TOKEN_5_Node,Ast_Exp_Node];
        parent:Ast_Formula_Node | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_Node_41;
      }
type Ast_Exp_Node_6 = Ast_Exp_Node_6_;
interface Ast_TOKEN_6_Node_ extends BaseTokenNode {
            token:"&";
            parent:Ast_Exp_Node_7;
          }
export type Ast_TOKEN_6_Node = Ast_TOKEN_6_Node_;
interface Ast_Exp_Node_7_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Ast_Exp_Node,Ast_TOKEN_6_Node,Ast_Exp_Node];
        parent:Ast_Formula_Node | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_Node_41;
      }
type Ast_Exp_Node_7 = Ast_Exp_Node_7_;
interface Ast_TOKEN_7_Node_ extends BaseTokenNode {
            token:"+";
            parent:Ast_Exp_Node_8 | Ast_Exp_Node_13;
          }
export type Ast_TOKEN_7_Node = Ast_TOKEN_7_Node_;
interface Ast_Exp_Node_8_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Ast_Exp_Node,Ast_TOKEN_7_Node,Ast_Exp_Node];
        parent:Ast_Formula_Node | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_Node_41;
      }
type Ast_Exp_Node_8 = Ast_Exp_Node_8_;
interface Ast_TOKEN_8_Node_ extends BaseTokenNode {
            token:"-";
            parent:Ast_Exp_Node_9 | Ast_Exp_Node_14;
          }
export type Ast_TOKEN_8_Node = Ast_TOKEN_8_Node_;
interface Ast_Exp_Node_9_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Ast_Exp_Node,Ast_TOKEN_8_Node,Ast_Exp_Node];
        parent:Ast_Formula_Node | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_Node_41;
      }
type Ast_Exp_Node_9 = Ast_Exp_Node_9_;
interface Ast_TOKEN_9_Node_ extends BaseTokenNode {
            token:"*";
            parent:Ast_Exp_Node_10;
          }
export type Ast_TOKEN_9_Node = Ast_TOKEN_9_Node_;
interface Ast_Exp_Node_10_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Ast_Exp_Node,Ast_TOKEN_9_Node,Ast_Exp_Node];
        parent:Ast_Formula_Node | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_Node_41;
      }
type Ast_Exp_Node_10 = Ast_Exp_Node_10_;
interface Ast_TOKEN_10_Node_ extends BaseTokenNode {
            token:"/";
            parent:Ast_Exp_Node_11;
          }
export type Ast_TOKEN_10_Node = Ast_TOKEN_10_Node_;
interface Ast_Exp_Node_11_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Ast_Exp_Node,Ast_TOKEN_10_Node,Ast_Exp_Node];
        parent:Ast_Formula_Node | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_Node_41;
      }
type Ast_Exp_Node_11 = Ast_Exp_Node_11_;
interface Ast_TOKEN_11_Node_ extends BaseTokenNode {
            token:"^";
            parent:Ast_Exp_Node_12;
          }
export type Ast_TOKEN_11_Node = Ast_TOKEN_11_Node_;
interface Ast_Exp_Node_12_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Ast_Exp_Node,Ast_TOKEN_11_Node,Ast_Exp_Node];
        parent:Ast_Formula_Node | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_Node_41;
      }
type Ast_Exp_Node_12 = Ast_Exp_Node_12_;
interface Ast_Exp_Node_13_ extends BaseSymbolNode {
        symbol:"exp";
        label:"prefixExp";
        children:[Ast_TOKEN_7_Node,Ast_Exp_Node];
        parent:Ast_Formula_Node | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_Node_41;
      }
type Ast_Exp_Node_13 = Ast_Exp_Node_13_;
interface Ast_Exp_Node_14_ extends BaseSymbolNode {
        symbol:"exp";
        label:"prefixExp";
        children:[Ast_TOKEN_8_Node,Ast_Exp_Node];
        parent:Ast_Formula_Node | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_Node_41;
      }
type Ast_Exp_Node_14 = Ast_Exp_Node_14_;
interface Ast_TOKEN_12_Node_ extends BaseTokenNode {
            token:"@";
            parent:Ast_Exp_Node_15;
          }
export type Ast_TOKEN_12_Node = Ast_TOKEN_12_Node_;
interface Ast_Exp_Node_15_ extends BaseSymbolNode {
        symbol:"exp";
        label:"clipExp";
        children:[Ast_TOKEN_12_Node,Ast_Exp_Node];
        parent:Ast_Formula_Node | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_Node_41;
      }
type Ast_Exp_Node_15 = Ast_Exp_Node_15_;
interface Ast_TOKEN_13_Node_ extends BaseTokenNode {
            token:"%";
            parent:Ast_Exp_Node_16;
          }
export type Ast_TOKEN_13_Node = Ast_TOKEN_13_Node_;
interface Ast_Exp_Node_16_ extends BaseSymbolNode {
        symbol:"exp";
        label:"percentageExp";
        children:[Ast_Exp_Node,Ast_TOKEN_13_Node];
        parent:Ast_Formula_Node | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_Node_41;
      }
type Ast_Exp_Node_16 = Ast_Exp_Node_16_;
interface Ast_TOKEN_14_Node_ extends BaseTokenNode {
            token:"(";
            parent:Ast_Exp_Node_17 | Ast_FunctionExp_Node;
          }
export type Ast_TOKEN_14_Node = Ast_TOKEN_14_Node_;
interface Ast_TOKEN_15_Node_ extends BaseTokenNode {
            token:")";
            parent:Ast_Exp_Node_17 | Ast_FunctionExp_Node;
          }
export type Ast_TOKEN_15_Node = Ast_TOKEN_15_Node_;
interface Ast_Exp_Node_17_ extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Ast_TOKEN_14_Node,Ast_Exp_Node,Ast_TOKEN_15_Node];
        parent:Ast_Formula_Node | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_Node_41;
      }
type Ast_Exp_Node_17 = Ast_Exp_Node_17_;
interface Ast_NUMBER_Node_ extends BaseTokenNode {
            token:"NUMBER";
            parent:Ast_Exp_Node_18 | Ast_ArrayElement_Node_33;
          }
export type Ast_NUMBER_Node = Ast_NUMBER_Node_;
interface Ast_Exp_Node_18_ extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Ast_NUMBER_Node];
        parent:Ast_Formula_Node | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_Node_41;
      }
type Ast_Exp_Node_18 = Ast_Exp_Node_18_;
interface Ast_STRING_Node_ extends BaseTokenNode {
            token:"STRING";
            parent:Ast_Exp_Node_19 | Ast_ArrayElement_Node_32;
          }
export type Ast_STRING_Node = Ast_STRING_Node_;
interface Ast_Exp_Node_19_ extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Ast_STRING_Node];
        parent:Ast_Formula_Node | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_Node_41;
      }
type Ast_Exp_Node_19 = Ast_Exp_Node_19_;
interface Ast_LOGIC_Node_ extends BaseTokenNode {
            token:"LOGIC";
            parent:Ast_Exp_Node_20 | Ast_ArrayElement_Node_34;
          }
export type Ast_LOGIC_Node = Ast_LOGIC_Node_;
interface Ast_Exp_Node_20_ extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Ast_LOGIC_Node];
        parent:Ast_Formula_Node | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_Node_41;
      }
type Ast_Exp_Node_20 = Ast_Exp_Node_20_;
interface Ast_ERROR_Node_ extends BaseTokenNode {
            token:"ERROR";
            parent:Ast_Exp_Node_21 | Ast_ArrayElement_Node_35;
          }
export type Ast_ERROR_Node = Ast_ERROR_Node_;
interface Ast_Exp_Node_21_ extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Ast_ERROR_Node];
        parent:Ast_Formula_Node | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_Node_41;
      }
type Ast_Exp_Node_21 = Ast_Exp_Node_21_;
interface Ast_Exp_Node_22_ extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Ast_Reference_Node];
        parent:Ast_Formula_Node | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_Node_41;
      }
type Ast_Exp_Node_22 = Ast_Exp_Node_22_;
interface Ast_CELL_Node_ extends BaseTokenNode {
            token:"CELL";
            parent:Ast_ReferenceItem_Node_23;
          }
export type Ast_CELL_Node = Ast_CELL_Node_;
interface Ast_ReferenceItem_Node_23_ extends BaseSymbolNode {
        symbol:"referenceItem";
        
        children:[Ast_CELL_Node];
        parent:Ast_Reference_Node_29;
      }
type Ast_ReferenceItem_Node_23 = Ast_ReferenceItem_Node_23_;
interface Ast_NAME_Node_ extends BaseTokenNode {
            token:"NAME";
            parent:Ast_ReferenceItem_Node_24;
          }
export type Ast_NAME_Node = Ast_NAME_Node_;
interface Ast_ReferenceItem_Node_24_ extends BaseSymbolNode {
        symbol:"referenceItem";
        
        children:[Ast_NAME_Node];
        parent:Ast_Reference_Node_29;
      }
type Ast_ReferenceItem_Node_24 = Ast_ReferenceItem_Node_24_;
interface Ast_ReferenceItem_Node_25_ extends BaseSymbolNode {
        symbol:"referenceItem";
        
        children:[Ast_StructureReference_Node];
        parent:Ast_Reference_Node_29;
      }
type Ast_ReferenceItem_Node_25 = Ast_ReferenceItem_Node_25_;
interface Ast_REF_UNION_OPERATOR_Node_ extends BaseTokenNode {
            token:"REF_UNION_OPERATOR";
            parent:Ast_Reference_Node_26;
          }
export type Ast_REF_UNION_OPERATOR_Node = Ast_REF_UNION_OPERATOR_Node_;
interface Ast_Reference_Node_26_ extends BaseSymbolNode {
        symbol:"reference";
        label:"unionReference";
        children:[Ast_Reference_Node,Ast_REF_UNION_OPERATOR_Node,Ast_Reference_Node];
        parent:Ast_Exp_Node_22 | Ast_Reference_Node_26 | Ast_Reference_Node_27 | Ast_Reference_Node_28;
      }
type Ast_Reference_Node_26 = Ast_Reference_Node_26_;
interface Ast_Reference_Node_27_ extends BaseSymbolNode {
        symbol:"reference";
        label:"intersectionReference";
        children:[Ast_Reference_Node,Ast_Reference_Node];
        parent:Ast_Exp_Node_22 | Ast_Reference_Node_26 | Ast_Reference_Node_27 | Ast_Reference_Node_28;
      }
type Ast_Reference_Node_27 = Ast_Reference_Node_27_;
interface Ast_REF_RANGE_OPERATOR_Node_ extends BaseTokenNode {
            token:"REF_RANGE_OPERATOR";
            parent:Ast_Reference_Node_28;
          }
export type Ast_REF_RANGE_OPERATOR_Node = Ast_REF_RANGE_OPERATOR_Node_;
interface Ast_Reference_Node_28_ extends BaseSymbolNode {
        symbol:"reference";
        label:"rangeReference";
        children:[Ast_Reference_Node,Ast_REF_RANGE_OPERATOR_Node,Ast_Reference_Node];
        parent:Ast_Exp_Node_22 | Ast_Reference_Node_26 | Ast_Reference_Node_27 | Ast_Reference_Node_28;
      }
type Ast_Reference_Node_28 = Ast_Reference_Node_28_;
interface Ast_Reference_Node_29_ extends BaseSymbolNode {
        symbol:"reference";
        
        children:[Ast_ReferenceItem_Node];
        parent:Ast_Exp_Node_22 | Ast_Reference_Node_26 | Ast_Reference_Node_27 | Ast_Reference_Node_28;
      }
type Ast_Reference_Node_29 = Ast_Reference_Node_29_;
interface Ast_Exp_Node_30_ extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Ast_FunctionExp_Node];
        parent:Ast_Formula_Node | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_Node_41;
      }
type Ast_Exp_Node_30 = Ast_Exp_Node_30_;
interface Ast_Exp_Node_31_ extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Ast_Array_Node];
        parent:Ast_Formula_Node | Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_Node_41;
      }
type Ast_Exp_Node_31 = Ast_Exp_Node_31_;
interface Ast_ArrayElement_Node_32_ extends BaseSymbolNode {
        symbol:"arrayElement";
        
        children:[Ast_STRING_Node];
        parent:Ast_Array_group_def_2_Parent_Node | Ast_Array_Node;
      }
type Ast_ArrayElement_Node_32 = Ast_ArrayElement_Node_32_;
interface Ast_ArrayElement_Node_33_ extends BaseSymbolNode {
        symbol:"arrayElement";
        
        children:[Ast_NUMBER_Node];
        parent:Ast_Array_group_def_2_Parent_Node | Ast_Array_Node;
      }
type Ast_ArrayElement_Node_33 = Ast_ArrayElement_Node_33_;
interface Ast_ArrayElement_Node_34_ extends BaseSymbolNode {
        symbol:"arrayElement";
        
        children:[Ast_LOGIC_Node];
        parent:Ast_Array_group_def_2_Parent_Node | Ast_Array_Node;
      }
type Ast_ArrayElement_Node_34 = Ast_ArrayElement_Node_34_;
interface Ast_ArrayElement_Node_35_ extends BaseSymbolNode {
        symbol:"arrayElement";
        
        children:[Ast_ERROR_Node];
        parent:Ast_Array_group_def_2_Parent_Node | Ast_Array_Node;
      }
type Ast_ArrayElement_Node_35 = Ast_ArrayElement_Node_35_;
interface Ast_ARRAY_SEPARATOR_Node_ extends BaseTokenNode {
            token:"ARRAY_SEPARATOR";
            parent:Ast_Array_group_def_2_Parent_Node;
          }
export type Ast_ARRAY_SEPARATOR_Node = Ast_ARRAY_SEPARATOR_Node_;
type Ast_Array_group_def_2_Node  = [Ast_ARRAY_SEPARATOR_Node,Ast_ArrayElement_Node];
interface Ast_TOKEN_16_Node_ extends BaseTokenNode {
            token:"{";
            parent:Ast_Array_Node;
          }
export type Ast_TOKEN_16_Node = Ast_TOKEN_16_Node_;
interface Ast_TOKEN_17_Node_ extends BaseTokenNode {
            token:"}";
            parent:Ast_Array_Node;
          }
export type Ast_TOKEN_17_Node = Ast_TOKEN_17_Node_;
interface Ast_Array_Node_ extends BaseSymbolNode {
        symbol:"array";
        
        children:[Ast_TOKEN_16_Node,Ast_ArrayElement_Node,...ZeroOrMore<Ast_Array_group_def_2_Node>,Ast_TOKEN_17_Node];
        parent:Ast_Exp_Node_31;
      }
type Ast_Array_Node = Ast_Array_Node_;
interface Ast_FUNCTION_Node_ extends BaseTokenNode {
            token:"FUNCTION";
            parent:Ast_FunctionExp_Node;
          }
export type Ast_FUNCTION_Node = Ast_FUNCTION_Node_;
interface Ast_FunctionExp_Node_ extends BaseSymbolNode {
        symbol:"functionExp";
        
        children:[Ast_FUNCTION_Node,Ast_TOKEN_14_Node,Ast_ArgumentsList_Node,Ast_TOKEN_15_Node];
        parent:Ast_Exp_Node_30;
      }
type Ast_FunctionExp_Node = Ast_FunctionExp_Node_;
interface Ast_ARGUMENT_SEPARATOR_Node_ extends BaseTokenNode {
            token:"ARGUMENT_SEPARATOR";
            parent:Ast_ArgumentsList_group_def_4_Parent_Node_39 | Ast_ArgumentsList_group_def_4_Parent_Node_40;
          }
export type Ast_ARGUMENT_SEPARATOR_Node = Ast_ARGUMENT_SEPARATOR_Node_;
type Ast_ArgumentsList_group_def_4_Node_39  = [Ast_ARGUMENT_SEPARATOR_Node,Ast_Exp_Node];
type Ast_ArgumentsList_group_def_4_Node_40  = [Ast_ARGUMENT_SEPARATOR_Node];
interface Ast_ArgumentsList_Node_41_ extends BaseSymbolNode {
        symbol:"argumentsList";
        
        children:[Ast_Exp_Node,...ZeroOrMore<Ast_ArgumentsList_group_def_4_Node>];
        parent:Ast_FunctionExp_Node;
      }
type Ast_ArgumentsList_Node_41 = Ast_ArgumentsList_Node_41_;
interface Ast_ArgumentsList_Node_42_ extends BaseSymbolNode {
        symbol:"argumentsList";
        
        children:[...ZeroOrMore<Ast_ArgumentsList_group_def_4_Node>];
        parent:Ast_FunctionExp_Node;
      }
type Ast_ArgumentsList_Node_42 = Ast_ArgumentsList_Node_42_;
interface Ast_TABLE_NAME_Node_ extends BaseTokenNode {
            token:"TABLE_NAME";
            parent:Ast_StructureReference_Node_43;
          }
export type Ast_TABLE_NAME_Node = Ast_TABLE_NAME_Node_;
interface Ast_StructureReference_Node_43_ extends BaseSymbolNode {
        symbol:"structureReference";
        
        children:[Ast_TABLE_NAME_Node,Ast_TableSpecifier_Node];
        parent:Ast_ReferenceItem_Node_25;
      }
type Ast_StructureReference_Node_43 = Ast_StructureReference_Node_43_;
interface Ast_StructureReference_Node_44_ extends BaseSymbolNode {
        symbol:"structureReference";
        
        children:[Ast_TableSpecifier_Node];
        parent:Ast_ReferenceItem_Node_25;
      }
type Ast_StructureReference_Node_44 = Ast_StructureReference_Node_44_;
interface Ast_TABLE_ITEM_SPECIFIER_Node_ extends BaseTokenNode {
            token:"TABLE_ITEM_SPECIFIER";
            parent:Ast_TableSpecifier_Node_45 | Ast_TableSpecifierItem_Node_52;
          }
export type Ast_TABLE_ITEM_SPECIFIER_Node = Ast_TABLE_ITEM_SPECIFIER_Node_;
interface Ast_TableSpecifier_Node_45_ extends BaseSymbolNode {
        symbol:"tableSpecifier";
        
        children:[Ast_TABLE_ITEM_SPECIFIER_Node];
        parent:Ast_StructureReference_Node_43 | Ast_StructureReference_Node_44;
      }
type Ast_TableSpecifier_Node_45 = Ast_TableSpecifier_Node_45_;
interface Ast_TOKEN_18_Node_ extends BaseTokenNode {
            token:"[";
            parent:Ast_TableSpecifier_Node_46;
          }
export type Ast_TOKEN_18_Node = Ast_TOKEN_18_Node_;
interface Ast_TOKEN_19_Node_ extends BaseTokenNode {
            token:"]";
            parent:Ast_TableSpecifier_Node_46;
          }
export type Ast_TOKEN_19_Node = Ast_TOKEN_19_Node_;
interface Ast_TableSpecifier_Node_46_ extends BaseSymbolNode {
        symbol:"tableSpecifier";
        
        children:[Ast_TOKEN_18_Node,Ast_TableSpecifierInner_Node,Ast_TOKEN_19_Node];
        parent:Ast_StructureReference_Node_43 | Ast_StructureReference_Node_44;
      }
type Ast_TableSpecifier_Node_46 = Ast_TableSpecifier_Node_46_;
interface Ast_TABLE_AT_Node_ extends BaseTokenNode {
            token:"TABLE_AT";
            parent:Ast_TableThisRow_Node_47 | Ast_TableThisRow_Node_48;
          }
export type Ast_TABLE_AT_Node = Ast_TABLE_AT_Node_;
interface Ast_TableThisRow_Node_47_ extends BaseSymbolNode {
        symbol:"tableThisRow";
        
        children:[Ast_TABLE_AT_Node];
        parent:Ast_TableSpecifierInner_Node_49;
      }
type Ast_TableThisRow_Node_47 = Ast_TableThisRow_Node_47_;
interface Ast_TABLE_COLUMN_SPECIFIER_Node_ extends BaseTokenNode {
            token:"TABLE_COLUMN_SPECIFIER";
            parent:Ast_TableThisRow_Node_48 | Ast_TableSpecifierItem_Node_51;
          }
export type Ast_TABLE_COLUMN_SPECIFIER_Node = Ast_TABLE_COLUMN_SPECIFIER_Node_;
interface Ast_TableThisRow_Node_48_ extends BaseSymbolNode {
        symbol:"tableThisRow";
        
        children:[Ast_TABLE_AT_Node,Ast_TABLE_COLUMN_SPECIFIER_Node];
        parent:Ast_TableSpecifierInner_Node_49;
      }
type Ast_TableThisRow_Node_48 = Ast_TableThisRow_Node_48_;
interface Ast_TableSpecifierInner_Node_49_ extends BaseSymbolNode {
        symbol:"tableSpecifierInner";
        
        children:[Ast_TableThisRow_Node];
        parent:Ast_TableSpecifier_Node_46;
      }
type Ast_TableSpecifierInner_Node_49 = Ast_TableSpecifierInner_Node_49_;
interface Ast_TableSpecifierInner_Node_50_ extends BaseSymbolNode {
        symbol:"tableSpecifierInner";
        
        children:[Ast_TableColumnSpecifier_Node];
        parent:Ast_TableSpecifier_Node_46;
      }
type Ast_TableSpecifierInner_Node_50 = Ast_TableSpecifierInner_Node_50_;
interface Ast_TableSpecifierItem_Node_51_ extends BaseSymbolNode {
        symbol:"tableSpecifierItem";
        
        children:[Ast_TABLE_COLUMN_SPECIFIER_Node];
        parent:Ast_TableColumnSpecifier_group_def_6_Parent_Node | Ast_TableColumnSpecifier_Node;
      }
type Ast_TableSpecifierItem_Node_51 = Ast_TableSpecifierItem_Node_51_;
interface Ast_TableSpecifierItem_Node_52_ extends BaseSymbolNode {
        symbol:"tableSpecifierItem";
        
        children:[Ast_TABLE_ITEM_SPECIFIER_Node];
        parent:Ast_TableColumnSpecifier_group_def_6_Parent_Node | Ast_TableColumnSpecifier_Node;
      }
type Ast_TableSpecifierItem_Node_52 = Ast_TableSpecifierItem_Node_52_;
interface Ast_SPECIFIER_SEPARATOR_Node_ extends BaseTokenNode {
            token:"SPECIFIER_SEPARATOR";
            parent:Ast_TableColumnSpecifier_group_def_6_Parent_Node;
          }
export type Ast_SPECIFIER_SEPARATOR_Node = Ast_SPECIFIER_SEPARATOR_Node_;
type Ast_TableColumnSpecifier_group_def_6_Node  = [Ast_SPECIFIER_SEPARATOR_Node,Ast_TableSpecifierItem_Node];
interface Ast_TableColumnSpecifier_Node_ extends BaseSymbolNode {
        symbol:"tableColumnSpecifier";
        
        children:[Ast_TableSpecifierItem_Node,...ZeroOrMore<Ast_TableColumnSpecifier_group_def_6_Node>];
        parent:Ast_TableSpecifierInner_Node_50;
      }
type Ast_TableColumnSpecifier_Node = Ast_TableColumnSpecifier_Node_;
export type { Ast_Formula_Node };
export type Ast_Exp_Node = Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12 | Ast_Exp_Node_13 | Ast_Exp_Node_14 | Ast_Exp_Node_15 | Ast_Exp_Node_16 | Ast_Exp_Node_17 | Ast_Exp_Node_18 | Ast_Exp_Node_19 | Ast_Exp_Node_20 | Ast_Exp_Node_21 | Ast_Exp_Node_22 | Ast_Exp_Node_30 | Ast_Exp_Node_31;
export type Ast_ReferenceItem_Node = Ast_ReferenceItem_Node_23 | Ast_ReferenceItem_Node_24 | Ast_ReferenceItem_Node_25;
export type Ast_Reference_Node = Ast_Reference_Node_26 | Ast_Reference_Node_27 | Ast_Reference_Node_28 | Ast_Reference_Node_29;
export type Ast_ArrayElement_Node = Ast_ArrayElement_Node_32 | Ast_ArrayElement_Node_33 | Ast_ArrayElement_Node_34 | Ast_ArrayElement_Node_35;
export type { Ast_Array_Node };
export type { Ast_FunctionExp_Node };
type Ast_ArgumentsList_group_def_4_Node = Ast_ArgumentsList_group_def_4_Node_39 | Ast_ArgumentsList_group_def_4_Node_40;
export type Ast_ArgumentsList_Node = Ast_ArgumentsList_Node_41 | Ast_ArgumentsList_Node_42;
export type Ast_StructureReference_Node = Ast_StructureReference_Node_43 | Ast_StructureReference_Node_44;
export type Ast_TableSpecifier_Node = Ast_TableSpecifier_Node_45 | Ast_TableSpecifier_Node_46;
export type Ast_TableThisRow_Node = Ast_TableThisRow_Node_47 | Ast_TableThisRow_Node_48;
export type Ast_TableSpecifierInner_Node = Ast_TableSpecifierInner_Node_49 | Ast_TableSpecifierInner_Node_50;
export type Ast_TableSpecifierItem_Node = Ast_TableSpecifierItem_Node_51 | Ast_TableSpecifierItem_Node_52;
export type { Ast_TableColumnSpecifier_Node };
export type Ast_BinaryExp_Node = Ast_Exp_Node_1 | Ast_Exp_Node_2 | Ast_Exp_Node_3 | Ast_Exp_Node_4 | Ast_Exp_Node_5 | Ast_Exp_Node_6 | Ast_Exp_Node_7 | Ast_Exp_Node_8 | Ast_Exp_Node_9 | Ast_Exp_Node_10 | Ast_Exp_Node_11 | Ast_Exp_Node_12;
export type Ast_PrefixExp_Node = Ast_Exp_Node_13 | Ast_Exp_Node_14;
export type Ast_ClipExp_Node = Ast_Exp_Node_15;
export type Ast_PercentageExp_Node = Ast_Exp_Node_16;
export type Ast_UnionReference_Node = Ast_Reference_Node_26;
export type Ast_IntersectionReference_Node = Ast_Reference_Node_27;
export type Ast_RangeReference_Node = Ast_Reference_Node_28;