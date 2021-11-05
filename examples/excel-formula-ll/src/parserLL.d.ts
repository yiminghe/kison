// TODO: improve Tuple type
type Optional<T> = T | undefined;
type OneOrMore<T> = T extends Array<infer U> ? [...T, ...U[]] : [T, ...T[]];
type ZeroOrMore<T> = T extends Array<infer U> ? U[] : T[];

export type AstNode = AstSymbolNode | AstTokenNode;

// replace start
export type AstSymbolNode = Formula_Node|Exp_Node|ReferenceItem_Node|Reference_Node|ArrayElement_Node|Array_Node|FunctionExp_Node|ArgumentsList_Node|StructureReference_Node|TableSpecifier_Node|TableThisRow_Node|TableSpecifierInner_Node|TableSpecifierItem_Node|TableColumnSpecifier_Node;
export type AstTokenNode = $EOF_Node|$UNKNOWN_Node|TOKEN_0_Node|TOKEN_1_Node|TOKEN_2_Node|TOKEN_3_Node|TOKEN_4_Node|TOKEN_5_Node|TOKEN_6_Node|TOKEN_7_Node|TOKEN_8_Node|TOKEN_9_Node|TOKEN_10_Node|TOKEN_11_Node|TOKEN_12_Node|TOKEN_13_Node|TOKEN_14_Node|TOKEN_15_Node|NUMBER_Node|STRING_Node|LOGIC_Node|ERROR_Node|CELL_Node|NAME_Node|REF_UNION_OPERATOR_Node|REF_RANGE_OPERATOR_Node|TOKEN_16_Node|TOKEN_17_Node|FUNCTION_Node|TABLE_NAME_Node|TABLE_ITEM_SPECIFIER_Node|TOKEN_18_Node|TOKEN_19_Node|TABLE_AT_Node|TABLE_COLUMN_SPECIFIER_Node|ARRAY_SEPARATOR_Node|ARGUMENT_SEPARATOR_Node|SPECIFIER_SEPARATOR_Node;
export type LiteralToken = "HIDDEN"|"SPECIFIER_SEPARATOR"|"TABLE_ITEM_SPECIFIER"|"TABLE_AT"|"TABLE_COLUMN_SPECIFIER"|"ARRAY_SEPARATOR"|"REF_UNION_OPERATOR"|"REF_RANGE_OPERATOR"|"ARGUMENT_SEPARATOR"|"STRING"|"FUNCTION"|"TABLE_NAME"|"ERROR"|"CELL"|"LOGIC"|"NAME"|"NUMBER"|"$EOF"|"$UNKNOWN"|"="|"<="|">="|"<>"|">"|"<"|"&"|"+"|"-"|"*"|"/"|"^"|"@"|"%"|"("|")"|"{"|"}"|"["|"]";
export type AstRootNode = Formula_Node;
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
formula: Formula_Node;
exp: Exp_Node;
referenceItem: ReferenceItem_Node;
reference: Reference_Node;
arrayElement: ArrayElement_Node;
array: Array_Node;
functionExp: FunctionExp_Node;
argumentsList: ArgumentsList_Node;
structureReference: StructureReference_Node;
tableSpecifier: TableSpecifier_Node;
tableThisRow: TableThisRow_Node;
tableSpecifierInner: TableSpecifierInner_Node;
tableSpecifierItem: TableSpecifierItem_Node;
tableColumnSpecifier: TableColumnSpecifier_Node;
binaryExp: BinaryExp_Node;
prefixExp: PrefixExp_Node;
clipExp: ClipExp_Node;
percentageExp: PercentageExp_Node;
unionReference: UnionReference_Node;
intersectionReference: IntersectionReference_Node;
rangeReference: RangeReference_Node;
$EOF: $EOF_Node;
$UNKNOWN: $UNKNOWN_Node;
TOKEN_0: TOKEN_0_Node;
TOKEN_1: TOKEN_1_Node;
TOKEN_2: TOKEN_2_Node;
TOKEN_3: TOKEN_3_Node;
TOKEN_4: TOKEN_4_Node;
TOKEN_5: TOKEN_5_Node;
TOKEN_6: TOKEN_6_Node;
TOKEN_7: TOKEN_7_Node;
TOKEN_8: TOKEN_8_Node;
TOKEN_9: TOKEN_9_Node;
TOKEN_10: TOKEN_10_Node;
TOKEN_11: TOKEN_11_Node;
TOKEN_12: TOKEN_12_Node;
TOKEN_13: TOKEN_13_Node;
TOKEN_14: TOKEN_14_Node;
TOKEN_15: TOKEN_15_Node;
NUMBER: NUMBER_Node;
STRING: STRING_Node;
LOGIC: LOGIC_Node;
ERROR: ERROR_Node;
CELL: CELL_Node;
NAME: NAME_Node;
REF_UNION_OPERATOR: REF_UNION_OPERATOR_Node;
REF_RANGE_OPERATOR: REF_RANGE_OPERATOR_Node;
TOKEN_16: TOKEN_16_Node;
TOKEN_17: TOKEN_17_Node;
FUNCTION: FUNCTION_Node;
TABLE_NAME: TABLE_NAME_Node;
TABLE_ITEM_SPECIFIER: TABLE_ITEM_SPECIFIER_Node;
TOKEN_18: TOKEN_18_Node;
TOKEN_19: TOKEN_19_Node;
TABLE_AT: TABLE_AT_Node;
TABLE_COLUMN_SPECIFIER: TABLE_COLUMN_SPECIFIER_Node;
ARRAY_SEPARATOR: ARRAY_SEPARATOR_Node;
ARGUMENT_SEPARATOR: ARGUMENT_SEPARATOR_Node;
SPECIFIER_SEPARATOR: SPECIFIER_SEPARATOR_Node;
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

        type Array_38_group_2_Parent_Node = Array_Node;
        

        type ArgumentsList_40_group_1_Parent_Node_52 = ArgumentsList_Node_38|ArgumentsList_Node_39;
        

        type ArgumentsList_40_group_1_Parent_Node_53 = ArgumentsList_Node_38|ArgumentsList_Node_39;
        

        type TableColumnSpecifier_51_group_1_Parent_Node = TableColumnSpecifier_Node;
        
interface Formula_Node_ extends BaseSymbolNode {
        symbol:"formula";
        
        children:[Exp_Node];
        
      }
type Formula_Node = Formula_Node_;
interface TOKEN_0_Node_ extends BaseTokenNode {
            token:"=";
            parent:Exp_Node_1;
          }
export type TOKEN_0_Node = TOKEN_0_Node_;
interface Exp_Node_1_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Exp_Node,TOKEN_0_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
type Exp_Node_1 = Exp_Node_1_;
interface TOKEN_1_Node_ extends BaseTokenNode {
            token:"<=";
            parent:Exp_Node_2;
          }
export type TOKEN_1_Node = TOKEN_1_Node_;
interface Exp_Node_2_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Exp_Node,TOKEN_1_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
type Exp_Node_2 = Exp_Node_2_;
interface TOKEN_2_Node_ extends BaseTokenNode {
            token:">=";
            parent:Exp_Node_3;
          }
export type TOKEN_2_Node = TOKEN_2_Node_;
interface Exp_Node_3_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Exp_Node,TOKEN_2_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
type Exp_Node_3 = Exp_Node_3_;
interface TOKEN_3_Node_ extends BaseTokenNode {
            token:"<>";
            parent:Exp_Node_4;
          }
export type TOKEN_3_Node = TOKEN_3_Node_;
interface Exp_Node_4_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Exp_Node,TOKEN_3_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
type Exp_Node_4 = Exp_Node_4_;
interface TOKEN_4_Node_ extends BaseTokenNode {
            token:">";
            parent:Exp_Node_5;
          }
export type TOKEN_4_Node = TOKEN_4_Node_;
interface Exp_Node_5_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Exp_Node,TOKEN_4_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
type Exp_Node_5 = Exp_Node_5_;
interface TOKEN_5_Node_ extends BaseTokenNode {
            token:"<";
            parent:Exp_Node_6;
          }
export type TOKEN_5_Node = TOKEN_5_Node_;
interface Exp_Node_6_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Exp_Node,TOKEN_5_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
type Exp_Node_6 = Exp_Node_6_;
interface TOKEN_6_Node_ extends BaseTokenNode {
            token:"&";
            parent:Exp_Node_7;
          }
export type TOKEN_6_Node = TOKEN_6_Node_;
interface Exp_Node_7_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Exp_Node,TOKEN_6_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
type Exp_Node_7 = Exp_Node_7_;
interface TOKEN_7_Node_ extends BaseTokenNode {
            token:"+";
            parent:Exp_Node_8 | Exp_Node_13;
          }
export type TOKEN_7_Node = TOKEN_7_Node_;
interface Exp_Node_8_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Exp_Node,TOKEN_7_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
type Exp_Node_8 = Exp_Node_8_;
interface TOKEN_8_Node_ extends BaseTokenNode {
            token:"-";
            parent:Exp_Node_9 | Exp_Node_14;
          }
export type TOKEN_8_Node = TOKEN_8_Node_;
interface Exp_Node_9_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Exp_Node,TOKEN_8_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
type Exp_Node_9 = Exp_Node_9_;
interface TOKEN_9_Node_ extends BaseTokenNode {
            token:"*";
            parent:Exp_Node_10;
          }
export type TOKEN_9_Node = TOKEN_9_Node_;
interface Exp_Node_10_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Exp_Node,TOKEN_9_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
type Exp_Node_10 = Exp_Node_10_;
interface TOKEN_10_Node_ extends BaseTokenNode {
            token:"/";
            parent:Exp_Node_11;
          }
export type TOKEN_10_Node = TOKEN_10_Node_;
interface Exp_Node_11_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Exp_Node,TOKEN_10_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
type Exp_Node_11 = Exp_Node_11_;
interface TOKEN_11_Node_ extends BaseTokenNode {
            token:"^";
            parent:Exp_Node_12;
          }
export type TOKEN_11_Node = TOKEN_11_Node_;
interface Exp_Node_12_ extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Exp_Node,TOKEN_11_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
type Exp_Node_12 = Exp_Node_12_;
interface Exp_Node_13_ extends BaseSymbolNode {
        symbol:"exp";
        label:"prefixExp";
        children:[TOKEN_7_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
type Exp_Node_13 = Exp_Node_13_;
interface Exp_Node_14_ extends BaseSymbolNode {
        symbol:"exp";
        label:"prefixExp";
        children:[TOKEN_8_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
type Exp_Node_14 = Exp_Node_14_;
interface TOKEN_12_Node_ extends BaseTokenNode {
            token:"@";
            parent:Exp_Node_15;
          }
export type TOKEN_12_Node = TOKEN_12_Node_;
interface Exp_Node_15_ extends BaseSymbolNode {
        symbol:"exp";
        label:"clipExp";
        children:[TOKEN_12_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
type Exp_Node_15 = Exp_Node_15_;
interface TOKEN_13_Node_ extends BaseTokenNode {
            token:"%";
            parent:Exp_Node_16;
          }
export type TOKEN_13_Node = TOKEN_13_Node_;
interface Exp_Node_16_ extends BaseSymbolNode {
        symbol:"exp";
        label:"percentageExp";
        children:[Exp_Node,TOKEN_13_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
type Exp_Node_16 = Exp_Node_16_;
interface TOKEN_14_Node_ extends BaseTokenNode {
            token:"(";
            parent:Exp_Node_17 | FunctionExp_Node;
          }
export type TOKEN_14_Node = TOKEN_14_Node_;
interface TOKEN_15_Node_ extends BaseTokenNode {
            token:")";
            parent:Exp_Node_17 | FunctionExp_Node;
          }
export type TOKEN_15_Node = TOKEN_15_Node_;
interface Exp_Node_17_ extends BaseSymbolNode {
        symbol:"exp";
        
        children:[TOKEN_14_Node,Exp_Node,TOKEN_15_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
type Exp_Node_17 = Exp_Node_17_;
interface NUMBER_Node_ extends BaseTokenNode {
            token:"NUMBER";
            parent:Exp_Node_18 | ArrayElement_Node_33;
          }
export type NUMBER_Node = NUMBER_Node_;
interface Exp_Node_18_ extends BaseSymbolNode {
        symbol:"exp";
        
        children:[NUMBER_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
type Exp_Node_18 = Exp_Node_18_;
interface STRING_Node_ extends BaseTokenNode {
            token:"STRING";
            parent:Exp_Node_19 | ArrayElement_Node_32;
          }
export type STRING_Node = STRING_Node_;
interface Exp_Node_19_ extends BaseSymbolNode {
        symbol:"exp";
        
        children:[STRING_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
type Exp_Node_19 = Exp_Node_19_;
interface LOGIC_Node_ extends BaseTokenNode {
            token:"LOGIC";
            parent:Exp_Node_20 | ArrayElement_Node_34;
          }
export type LOGIC_Node = LOGIC_Node_;
interface Exp_Node_20_ extends BaseSymbolNode {
        symbol:"exp";
        
        children:[LOGIC_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
type Exp_Node_20 = Exp_Node_20_;
interface ERROR_Node_ extends BaseTokenNode {
            token:"ERROR";
            parent:Exp_Node_21 | ArrayElement_Node_35;
          }
export type ERROR_Node = ERROR_Node_;
interface Exp_Node_21_ extends BaseSymbolNode {
        symbol:"exp";
        
        children:[ERROR_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
type Exp_Node_21 = Exp_Node_21_;
interface Exp_Node_22_ extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Reference_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
type Exp_Node_22 = Exp_Node_22_;
interface CELL_Node_ extends BaseTokenNode {
            token:"CELL";
            parent:ReferenceItem_Node_23;
          }
export type CELL_Node = CELL_Node_;
interface ReferenceItem_Node_23_ extends BaseSymbolNode {
        symbol:"referenceItem";
        
        children:[CELL_Node];
        parent:Reference_Node_29;
      }
type ReferenceItem_Node_23 = ReferenceItem_Node_23_;
interface NAME_Node_ extends BaseTokenNode {
            token:"NAME";
            parent:ReferenceItem_Node_24;
          }
export type NAME_Node = NAME_Node_;
interface ReferenceItem_Node_24_ extends BaseSymbolNode {
        symbol:"referenceItem";
        
        children:[NAME_Node];
        parent:Reference_Node_29;
      }
type ReferenceItem_Node_24 = ReferenceItem_Node_24_;
interface ReferenceItem_Node_25_ extends BaseSymbolNode {
        symbol:"referenceItem";
        
        children:[StructureReference_Node];
        parent:Reference_Node_29;
      }
type ReferenceItem_Node_25 = ReferenceItem_Node_25_;
interface REF_UNION_OPERATOR_Node_ extends BaseTokenNode {
            token:"REF_UNION_OPERATOR";
            parent:Reference_Node_26;
          }
export type REF_UNION_OPERATOR_Node = REF_UNION_OPERATOR_Node_;
interface Reference_Node_26_ extends BaseSymbolNode {
        symbol:"reference";
        label:"unionReference";
        children:[Reference_Node,REF_UNION_OPERATOR_Node,Reference_Node];
        parent:Exp_Node_22 | Reference_Node_26 | Reference_Node_27 | Reference_Node_28;
      }
type Reference_Node_26 = Reference_Node_26_;
interface Reference_Node_27_ extends BaseSymbolNode {
        symbol:"reference";
        label:"intersectionReference";
        children:[Reference_Node,Reference_Node];
        parent:Exp_Node_22 | Reference_Node_26 | Reference_Node_27 | Reference_Node_28;
      }
type Reference_Node_27 = Reference_Node_27_;
interface REF_RANGE_OPERATOR_Node_ extends BaseTokenNode {
            token:"REF_RANGE_OPERATOR";
            parent:Reference_Node_28;
          }
export type REF_RANGE_OPERATOR_Node = REF_RANGE_OPERATOR_Node_;
interface Reference_Node_28_ extends BaseSymbolNode {
        symbol:"reference";
        label:"rangeReference";
        children:[Reference_Node,REF_RANGE_OPERATOR_Node,Reference_Node];
        parent:Exp_Node_22 | Reference_Node_26 | Reference_Node_27 | Reference_Node_28;
      }
type Reference_Node_28 = Reference_Node_28_;
interface Reference_Node_29_ extends BaseSymbolNode {
        symbol:"reference";
        
        children:[ReferenceItem_Node];
        parent:Exp_Node_22 | Reference_Node_26 | Reference_Node_27 | Reference_Node_28;
      }
type Reference_Node_29 = Reference_Node_29_;
interface Exp_Node_30_ extends BaseSymbolNode {
        symbol:"exp";
        
        children:[FunctionExp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
type Exp_Node_30 = Exp_Node_30_;
interface Exp_Node_31_ extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Array_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
type Exp_Node_31 = Exp_Node_31_;
interface ArrayElement_Node_32_ extends BaseSymbolNode {
        symbol:"arrayElement";
        
        children:[STRING_Node];
        parent:Array_Node | Array_38_group_2_Parent_Node;
      }
type ArrayElement_Node_32 = ArrayElement_Node_32_;
interface ArrayElement_Node_33_ extends BaseSymbolNode {
        symbol:"arrayElement";
        
        children:[NUMBER_Node];
        parent:Array_Node | Array_38_group_2_Parent_Node;
      }
type ArrayElement_Node_33 = ArrayElement_Node_33_;
interface ArrayElement_Node_34_ extends BaseSymbolNode {
        symbol:"arrayElement";
        
        children:[LOGIC_Node];
        parent:Array_Node | Array_38_group_2_Parent_Node;
      }
type ArrayElement_Node_34 = ArrayElement_Node_34_;
interface ArrayElement_Node_35_ extends BaseSymbolNode {
        symbol:"arrayElement";
        
        children:[ERROR_Node];
        parent:Array_Node | Array_38_group_2_Parent_Node;
      }
type ArrayElement_Node_35 = ArrayElement_Node_35_;
interface TOKEN_16_Node_ extends BaseTokenNode {
            token:"{";
            parent:Array_Node;
          }
export type TOKEN_16_Node = TOKEN_16_Node_;
interface TOKEN_17_Node_ extends BaseTokenNode {
            token:"}";
            parent:Array_Node;
          }
export type TOKEN_17_Node = TOKEN_17_Node_;
interface Array_Node_ extends BaseSymbolNode {
        symbol:"array";
        
        children:[TOKEN_16_Node,ArrayElement_Node,...ZeroOrMore<Array_38_group_2_Node>,TOKEN_17_Node];
        parent:Exp_Node_31;
      }
type Array_Node = Array_Node_;
interface FUNCTION_Node_ extends BaseTokenNode {
            token:"FUNCTION";
            parent:FunctionExp_Node;
          }
export type FUNCTION_Node = FUNCTION_Node_;
interface FunctionExp_Node_ extends BaseSymbolNode {
        symbol:"functionExp";
        
        children:[FUNCTION_Node,TOKEN_14_Node,ArgumentsList_Node,TOKEN_15_Node];
        parent:Exp_Node_30;
      }
type FunctionExp_Node = FunctionExp_Node_;
interface ArgumentsList_Node_38_ extends BaseSymbolNode {
        symbol:"argumentsList";
        
        children:[Exp_Node,...ZeroOrMore<ArgumentsList_40_group_1_Node>];
        parent:FunctionExp_Node;
      }
type ArgumentsList_Node_38 = ArgumentsList_Node_38_;
interface ArgumentsList_Node_39_ extends BaseSymbolNode {
        symbol:"argumentsList";
        
        children:[...ZeroOrMore<ArgumentsList_40_group_1_Node>];
        parent:FunctionExp_Node;
      }
type ArgumentsList_Node_39 = ArgumentsList_Node_39_;
interface TABLE_NAME_Node_ extends BaseTokenNode {
            token:"TABLE_NAME";
            parent:StructureReference_Node_40;
          }
export type TABLE_NAME_Node = TABLE_NAME_Node_;
interface StructureReference_Node_40_ extends BaseSymbolNode {
        symbol:"structureReference";
        
        children:[TABLE_NAME_Node,TableSpecifier_Node];
        parent:ReferenceItem_Node_25;
      }
type StructureReference_Node_40 = StructureReference_Node_40_;
interface StructureReference_Node_41_ extends BaseSymbolNode {
        symbol:"structureReference";
        
        children:[TableSpecifier_Node];
        parent:ReferenceItem_Node_25;
      }
type StructureReference_Node_41 = StructureReference_Node_41_;
interface TABLE_ITEM_SPECIFIER_Node_ extends BaseTokenNode {
            token:"TABLE_ITEM_SPECIFIER";
            parent:TableSpecifier_Node_42 | TableSpecifierItem_Node_49;
          }
export type TABLE_ITEM_SPECIFIER_Node = TABLE_ITEM_SPECIFIER_Node_;
interface TableSpecifier_Node_42_ extends BaseSymbolNode {
        symbol:"tableSpecifier";
        
        children:[TABLE_ITEM_SPECIFIER_Node];
        parent:StructureReference_Node_40 | StructureReference_Node_41;
      }
type TableSpecifier_Node_42 = TableSpecifier_Node_42_;
interface TOKEN_18_Node_ extends BaseTokenNode {
            token:"[";
            parent:TableSpecifier_Node_43;
          }
export type TOKEN_18_Node = TOKEN_18_Node_;
interface TOKEN_19_Node_ extends BaseTokenNode {
            token:"]";
            parent:TableSpecifier_Node_43;
          }
export type TOKEN_19_Node = TOKEN_19_Node_;
interface TableSpecifier_Node_43_ extends BaseSymbolNode {
        symbol:"tableSpecifier";
        
        children:[TOKEN_18_Node,TableSpecifierInner_Node,TOKEN_19_Node];
        parent:StructureReference_Node_40 | StructureReference_Node_41;
      }
type TableSpecifier_Node_43 = TableSpecifier_Node_43_;
interface TABLE_AT_Node_ extends BaseTokenNode {
            token:"TABLE_AT";
            parent:TableThisRow_Node_44 | TableThisRow_Node_45;
          }
export type TABLE_AT_Node = TABLE_AT_Node_;
interface TableThisRow_Node_44_ extends BaseSymbolNode {
        symbol:"tableThisRow";
        
        children:[TABLE_AT_Node];
        parent:TableSpecifierInner_Node_46;
      }
type TableThisRow_Node_44 = TableThisRow_Node_44_;
interface TABLE_COLUMN_SPECIFIER_Node_ extends BaseTokenNode {
            token:"TABLE_COLUMN_SPECIFIER";
            parent:TableThisRow_Node_45 | TableSpecifierItem_Node_48;
          }
export type TABLE_COLUMN_SPECIFIER_Node = TABLE_COLUMN_SPECIFIER_Node_;
interface TableThisRow_Node_45_ extends BaseSymbolNode {
        symbol:"tableThisRow";
        
        children:[TABLE_AT_Node,TABLE_COLUMN_SPECIFIER_Node];
        parent:TableSpecifierInner_Node_46;
      }
type TableThisRow_Node_45 = TableThisRow_Node_45_;
interface TableSpecifierInner_Node_46_ extends BaseSymbolNode {
        symbol:"tableSpecifierInner";
        
        children:[TableThisRow_Node];
        parent:TableSpecifier_Node_43;
      }
type TableSpecifierInner_Node_46 = TableSpecifierInner_Node_46_;
interface TableSpecifierInner_Node_47_ extends BaseSymbolNode {
        symbol:"tableSpecifierInner";
        
        children:[TableColumnSpecifier_Node];
        parent:TableSpecifier_Node_43;
      }
type TableSpecifierInner_Node_47 = TableSpecifierInner_Node_47_;
interface TableSpecifierItem_Node_48_ extends BaseSymbolNode {
        symbol:"tableSpecifierItem";
        
        children:[TABLE_COLUMN_SPECIFIER_Node];
        parent:TableColumnSpecifier_Node | TableColumnSpecifier_51_group_1_Parent_Node;
      }
type TableSpecifierItem_Node_48 = TableSpecifierItem_Node_48_;
interface TableSpecifierItem_Node_49_ extends BaseSymbolNode {
        symbol:"tableSpecifierItem";
        
        children:[TABLE_ITEM_SPECIFIER_Node];
        parent:TableColumnSpecifier_Node | TableColumnSpecifier_51_group_1_Parent_Node;
      }
type TableSpecifierItem_Node_49 = TableSpecifierItem_Node_49_;
interface TableColumnSpecifier_Node_ extends BaseSymbolNode {
        symbol:"tableColumnSpecifier";
        
        children:[TableSpecifierItem_Node,...ZeroOrMore<TableColumnSpecifier_51_group_1_Node>];
        parent:TableSpecifierInner_Node_47;
      }
type TableColumnSpecifier_Node = TableColumnSpecifier_Node_;
interface ARRAY_SEPARATOR_Node_ extends BaseTokenNode {
            token:"ARRAY_SEPARATOR";
            parent:Array_38_group_2_Parent_Node;
          }
export type ARRAY_SEPARATOR_Node = ARRAY_SEPARATOR_Node_;
type Array_38_group_2_Node  = [ARRAY_SEPARATOR_Node,ArrayElement_Node];
interface ARGUMENT_SEPARATOR_Node_ extends BaseTokenNode {
            token:"ARGUMENT_SEPARATOR";
            parent:ArgumentsList_40_group_1_Parent_Node_52 | ArgumentsList_40_group_1_Parent_Node_53;
          }
export type ARGUMENT_SEPARATOR_Node = ARGUMENT_SEPARATOR_Node_;
type ArgumentsList_40_group_1_Node_52  = [ARGUMENT_SEPARATOR_Node,Exp_Node];
type ArgumentsList_40_group_1_Node_53  = [ARGUMENT_SEPARATOR_Node];
interface SPECIFIER_SEPARATOR_Node_ extends BaseTokenNode {
            token:"SPECIFIER_SEPARATOR";
            parent:TableColumnSpecifier_51_group_1_Parent_Node;
          }
export type SPECIFIER_SEPARATOR_Node = SPECIFIER_SEPARATOR_Node_;
type TableColumnSpecifier_51_group_1_Node  = [SPECIFIER_SEPARATOR_Node,TableSpecifierItem_Node];
export type { Formula_Node };
export type Exp_Node = Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Exp_Node_19 | Exp_Node_20 | Exp_Node_21 | Exp_Node_22 | Exp_Node_30 | Exp_Node_31;
export type ReferenceItem_Node = ReferenceItem_Node_23 | ReferenceItem_Node_24 | ReferenceItem_Node_25;
export type Reference_Node = Reference_Node_26 | Reference_Node_27 | Reference_Node_28 | Reference_Node_29;
export type ArrayElement_Node = ArrayElement_Node_32 | ArrayElement_Node_33 | ArrayElement_Node_34 | ArrayElement_Node_35;
export type { Array_Node };
export type { FunctionExp_Node };
export type ArgumentsList_Node = ArgumentsList_Node_38 | ArgumentsList_Node_39;
export type StructureReference_Node = StructureReference_Node_40 | StructureReference_Node_41;
export type TableSpecifier_Node = TableSpecifier_Node_42 | TableSpecifier_Node_43;
export type TableThisRow_Node = TableThisRow_Node_44 | TableThisRow_Node_45;
export type TableSpecifierInner_Node = TableSpecifierInner_Node_46 | TableSpecifierInner_Node_47;
export type TableSpecifierItem_Node = TableSpecifierItem_Node_48 | TableSpecifierItem_Node_49;
export type { TableColumnSpecifier_Node };
type ArgumentsList_40_group_1_Node = ArgumentsList_40_group_1_Node_52 | ArgumentsList_40_group_1_Node_53;
export type BinaryExp_Node = Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12;
export type PrefixExp_Node = Exp_Node_13 | Exp_Node_14;
export type ClipExp_Node = Exp_Node_15;
export type PercentageExp_Node = Exp_Node_16;
export type UnionReference_Node = Reference_Node_26;
export type IntersectionReference_Node = Reference_Node_27;
export type RangeReference_Node = Reference_Node_28;