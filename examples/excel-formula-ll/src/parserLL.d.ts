// TODO: improve Tuple type
type Optional<T> = T | undefined;
type OneOrMore<T> = T extends Array<infer U> ? [...T, ...U[]] : [T, ...T[]];
type ZeroOrMore<T> = T extends Array<infer U> ? U[] : T[];

export type AstNode = AstSymbolNode | AstTokenNode;

// replace start
export type AstSymbolNode = Formula_Node|Exp_Node|ReferenceItem_Node|Reference_Node|ArrayElement_Node|Array_Node|FunctionExp_Node|ArgumentsList_Node|StructureReference_Node|TableSpecifier_Node|TableThisRow_Node|TableSpecifierInner_Node|TableSpecifierItem_Node|TableColumnSpecifier_Node;
export type AstTokenNode = $EOF_Node|$UNKNOWN_Node|TOKEN_0_Node|TOKEN_1_Node|TOKEN_2_Node|TOKEN_3_Node|TOKEN_4_Node|TOKEN_5_Node|TOKEN_6_Node|TOKEN_7_Node|TOKEN_8_Node|TOKEN_9_Node|TOKEN_10_Node|TOKEN_11_Node|TOKEN_12_Node|TOKEN_13_Node|TOKEN_14_Node|TOKEN_15_Node|NUMBER_Node|STRING_Node|LOGIC_Node|ERROR_Node|CELL_Node|NAME_Node|REF_UNION_OPERATOR_Node|REF_RANGE_OPERATOR_Node|TOKEN_16_Node|TOKEN_17_Node|FUNCTION_Node|TABLE_NAME_Node|TABLE_ITEM_SPECIFIER_Node|TOKEN_18_Node|TOKEN_19_Node|TABLE_AT_Node|TABLE_COLUMN_SPECIFIER_Node|ARRAY_SEPARATOR_Node|ARGUMENT_SEPARATOR_Node|SPECIFIER_SEPARATOR_Node;
export type LiteralToken = "$HIDDEN"|"SPECIFIER_SEPARATOR"|"TABLE_ITEM_SPECIFIER"|"TABLE_AT"|"TABLE_COLUMN_SPECIFIER"|"ARRAY_SEPARATOR"|"REF_UNION_OPERATOR"|"REF_RANGE_OPERATOR"|"ARGUMENT_SEPARATOR"|"STRING"|"FUNCTION"|"TABLE_NAME"|"ERROR"|"CELL"|"LOGIC"|"NAME"|"NUMBER"|"$EOF"|"$UNKNOWN"|"="|"<="|">="|"<>"|">"|"<"|"&"|"+"|"-"|"*"|"/"|"^"|"@"|"%"|"("|")"|"{"|"}"|"["|"]";
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

declare function parse(input: string, options?: ParserOptions): ParseResult;

declare function lex<T = any>(input: string, options?: LexerOptions<T>): LexResult<T>;

declare const parser: { parse: typeof parse, lex: typeof lex };

export default parser;

export interface $EOF_Node extends BaseTokenNode {
      token:"$EOF";
      parent:AstSymbolNode;
    }
export interface $UNKNOWN_Node extends BaseTokenNode {
      token:"$UNKNOWN";
      parent:AstSymbolNode;
    }

        type Array_38_group_2_Parent_Node = Array_Node;
        

        type ArgumentsList_40_group_1_Parent_Node_52 = ArgumentsList_Node_38|ArgumentsList_Node_39;
        

        type ArgumentsList_40_group_1_Parent_Node_53 = ArgumentsList_Node_38|ArgumentsList_Node_39;
        

        type TableColumnSpecifier_51_group_1_Parent_Node = TableColumnSpecifier_Node;
        
interface Formula_Node extends BaseSymbolNode {
        symbol:"formula";
        
        children:[Exp_Node];
        
      }
export interface TOKEN_0_Node extends BaseTokenNode {
            token:"=";
            parent:Exp_Node_1;
          }
interface Exp_Node_1 extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Exp_Node,TOKEN_0_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
export interface TOKEN_1_Node extends BaseTokenNode {
            token:"<=";
            parent:Exp_Node_2;
          }
interface Exp_Node_2 extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Exp_Node,TOKEN_1_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
export interface TOKEN_2_Node extends BaseTokenNode {
            token:">=";
            parent:Exp_Node_3;
          }
interface Exp_Node_3 extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Exp_Node,TOKEN_2_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
export interface TOKEN_3_Node extends BaseTokenNode {
            token:"<>";
            parent:Exp_Node_4;
          }
interface Exp_Node_4 extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Exp_Node,TOKEN_3_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
export interface TOKEN_4_Node extends BaseTokenNode {
            token:">";
            parent:Exp_Node_5;
          }
interface Exp_Node_5 extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Exp_Node,TOKEN_4_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
export interface TOKEN_5_Node extends BaseTokenNode {
            token:"<";
            parent:Exp_Node_6;
          }
interface Exp_Node_6 extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Exp_Node,TOKEN_5_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
export interface TOKEN_6_Node extends BaseTokenNode {
            token:"&";
            parent:Exp_Node_7;
          }
interface Exp_Node_7 extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Exp_Node,TOKEN_6_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
export interface TOKEN_7_Node extends BaseTokenNode {
            token:"+";
            parent:Exp_Node_8 | Exp_Node_13;
          }
interface Exp_Node_8 extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Exp_Node,TOKEN_7_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
export interface TOKEN_8_Node extends BaseTokenNode {
            token:"-";
            parent:Exp_Node_9 | Exp_Node_14;
          }
interface Exp_Node_9 extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Exp_Node,TOKEN_8_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
export interface TOKEN_9_Node extends BaseTokenNode {
            token:"*";
            parent:Exp_Node_10;
          }
interface Exp_Node_10 extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Exp_Node,TOKEN_9_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
export interface TOKEN_10_Node extends BaseTokenNode {
            token:"/";
            parent:Exp_Node_11;
          }
interface Exp_Node_11 extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Exp_Node,TOKEN_10_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
export interface TOKEN_11_Node extends BaseTokenNode {
            token:"^";
            parent:Exp_Node_12;
          }
interface Exp_Node_12 extends BaseSymbolNode {
        symbol:"exp";
        label:"binaryExp";
        children:[Exp_Node,TOKEN_11_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
interface Exp_Node_13 extends BaseSymbolNode {
        symbol:"exp";
        label:"prefixExp";
        children:[TOKEN_7_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
interface Exp_Node_14 extends BaseSymbolNode {
        symbol:"exp";
        label:"prefixExp";
        children:[TOKEN_8_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
export interface TOKEN_12_Node extends BaseTokenNode {
            token:"@";
            parent:Exp_Node_15;
          }
interface Exp_Node_15 extends BaseSymbolNode {
        symbol:"exp";
        label:"clipExp";
        children:[TOKEN_12_Node,Exp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
export interface TOKEN_13_Node extends BaseTokenNode {
            token:"%";
            parent:Exp_Node_16;
          }
interface Exp_Node_16 extends BaseSymbolNode {
        symbol:"exp";
        label:"percentageExp";
        children:[Exp_Node,TOKEN_13_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
export interface TOKEN_14_Node extends BaseTokenNode {
            token:"(";
            parent:Exp_Node_17 | FunctionExp_Node;
          }
export interface TOKEN_15_Node extends BaseTokenNode {
            token:")";
            parent:Exp_Node_17 | FunctionExp_Node;
          }
interface Exp_Node_17 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[TOKEN_14_Node,Exp_Node,TOKEN_15_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
export interface NUMBER_Node extends BaseTokenNode {
            token:"NUMBER";
            parent:Exp_Node_18 | ArrayElement_Node_33;
          }
interface Exp_Node_18 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[NUMBER_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
export interface STRING_Node extends BaseTokenNode {
            token:"STRING";
            parent:Exp_Node_19 | ArrayElement_Node_32;
          }
interface Exp_Node_19 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[STRING_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
export interface LOGIC_Node extends BaseTokenNode {
            token:"LOGIC";
            parent:Exp_Node_20 | ArrayElement_Node_34;
          }
interface Exp_Node_20 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[LOGIC_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
export interface ERROR_Node extends BaseTokenNode {
            token:"ERROR";
            parent:Exp_Node_21 | ArrayElement_Node_35;
          }
interface Exp_Node_21 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[ERROR_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
interface Exp_Node_22 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Reference_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
export interface CELL_Node extends BaseTokenNode {
            token:"CELL";
            parent:ReferenceItem_Node_23;
          }
interface ReferenceItem_Node_23 extends BaseSymbolNode {
        symbol:"referenceItem";
        
        children:[CELL_Node];
        parent:Reference_Node_29;
      }
export interface NAME_Node extends BaseTokenNode {
            token:"NAME";
            parent:ReferenceItem_Node_24;
          }
interface ReferenceItem_Node_24 extends BaseSymbolNode {
        symbol:"referenceItem";
        
        children:[NAME_Node];
        parent:Reference_Node_29;
      }
interface ReferenceItem_Node_25 extends BaseSymbolNode {
        symbol:"referenceItem";
        
        children:[StructureReference_Node];
        parent:Reference_Node_29;
      }
export interface REF_UNION_OPERATOR_Node extends BaseTokenNode {
            token:"REF_UNION_OPERATOR";
            parent:Reference_Node_26;
          }
interface Reference_Node_26 extends BaseSymbolNode {
        symbol:"reference";
        label:"unionReference";
        children:[Reference_Node,REF_UNION_OPERATOR_Node,Reference_Node];
        parent:Exp_Node_22 | Reference_Node_26 | Reference_Node_27 | Reference_Node_28;
      }
interface Reference_Node_27 extends BaseSymbolNode {
        symbol:"reference";
        label:"intersectionReference";
        children:[Reference_Node,Reference_Node];
        parent:Exp_Node_22 | Reference_Node_26 | Reference_Node_27 | Reference_Node_28;
      }
export interface REF_RANGE_OPERATOR_Node extends BaseTokenNode {
            token:"REF_RANGE_OPERATOR";
            parent:Reference_Node_28;
          }
interface Reference_Node_28 extends BaseSymbolNode {
        symbol:"reference";
        label:"rangeReference";
        children:[Reference_Node,REF_RANGE_OPERATOR_Node,Reference_Node];
        parent:Exp_Node_22 | Reference_Node_26 | Reference_Node_27 | Reference_Node_28;
      }
interface Reference_Node_29 extends BaseSymbolNode {
        symbol:"reference";
        
        children:[ReferenceItem_Node];
        parent:Exp_Node_22 | Reference_Node_26 | Reference_Node_27 | Reference_Node_28;
      }
interface Exp_Node_30 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[FunctionExp_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
interface Exp_Node_31 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Array_Node];
        parent:Formula_Node | Exp_Node_1 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | ArgumentsList_Node_38 | ArgumentsList_40_group_1_Parent_Node_52;
      }
interface ArrayElement_Node_32 extends BaseSymbolNode {
        symbol:"arrayElement";
        
        children:[STRING_Node];
        parent:Array_Node | Array_38_group_2_Parent_Node;
      }
interface ArrayElement_Node_33 extends BaseSymbolNode {
        symbol:"arrayElement";
        
        children:[NUMBER_Node];
        parent:Array_Node | Array_38_group_2_Parent_Node;
      }
interface ArrayElement_Node_34 extends BaseSymbolNode {
        symbol:"arrayElement";
        
        children:[LOGIC_Node];
        parent:Array_Node | Array_38_group_2_Parent_Node;
      }
interface ArrayElement_Node_35 extends BaseSymbolNode {
        symbol:"arrayElement";
        
        children:[ERROR_Node];
        parent:Array_Node | Array_38_group_2_Parent_Node;
      }
export interface TOKEN_16_Node extends BaseTokenNode {
            token:"{";
            parent:Array_Node;
          }
export interface TOKEN_17_Node extends BaseTokenNode {
            token:"}";
            parent:Array_Node;
          }
interface Array_Node extends BaseSymbolNode {
        symbol:"array";
        
        children:[TOKEN_16_Node,ArrayElement_Node,...ZeroOrMore<Array_38_group_2_Node>,TOKEN_17_Node];
        parent:Exp_Node_31;
      }
export interface FUNCTION_Node extends BaseTokenNode {
            token:"FUNCTION";
            parent:FunctionExp_Node;
          }
interface FunctionExp_Node extends BaseSymbolNode {
        symbol:"functionExp";
        
        children:[FUNCTION_Node,TOKEN_14_Node,ArgumentsList_Node,TOKEN_15_Node];
        parent:Exp_Node_30;
      }
interface ArgumentsList_Node_38 extends BaseSymbolNode {
        symbol:"argumentsList";
        
        children:[Exp_Node,...ZeroOrMore<ArgumentsList_40_group_1_Node>];
        parent:FunctionExp_Node;
      }
interface ArgumentsList_Node_39 extends BaseSymbolNode {
        symbol:"argumentsList";
        
        children:[...ZeroOrMore<ArgumentsList_40_group_1_Node>];
        parent:FunctionExp_Node;
      }
export interface TABLE_NAME_Node extends BaseTokenNode {
            token:"TABLE_NAME";
            parent:StructureReference_Node_40;
          }
interface StructureReference_Node_40 extends BaseSymbolNode {
        symbol:"structureReference";
        
        children:[TABLE_NAME_Node,TableSpecifier_Node];
        parent:ReferenceItem_Node_25;
      }
interface StructureReference_Node_41 extends BaseSymbolNode {
        symbol:"structureReference";
        
        children:[TableSpecifier_Node];
        parent:ReferenceItem_Node_25;
      }
export interface TABLE_ITEM_SPECIFIER_Node extends BaseTokenNode {
            token:"TABLE_ITEM_SPECIFIER";
            parent:TableSpecifier_Node_42 | TableSpecifierItem_Node_49;
          }
interface TableSpecifier_Node_42 extends BaseSymbolNode {
        symbol:"tableSpecifier";
        
        children:[TABLE_ITEM_SPECIFIER_Node];
        parent:StructureReference_Node_40 | StructureReference_Node_41;
      }
export interface TOKEN_18_Node extends BaseTokenNode {
            token:"[";
            parent:TableSpecifier_Node_43;
          }
export interface TOKEN_19_Node extends BaseTokenNode {
            token:"]";
            parent:TableSpecifier_Node_43;
          }
interface TableSpecifier_Node_43 extends BaseSymbolNode {
        symbol:"tableSpecifier";
        
        children:[TOKEN_18_Node,TableSpecifierInner_Node,TOKEN_19_Node];
        parent:StructureReference_Node_40 | StructureReference_Node_41;
      }
export interface TABLE_AT_Node extends BaseTokenNode {
            token:"TABLE_AT";
            parent:TableThisRow_Node_44 | TableThisRow_Node_45;
          }
interface TableThisRow_Node_44 extends BaseSymbolNode {
        symbol:"tableThisRow";
        
        children:[TABLE_AT_Node];
        parent:TableSpecifierInner_Node_46;
      }
export interface TABLE_COLUMN_SPECIFIER_Node extends BaseTokenNode {
            token:"TABLE_COLUMN_SPECIFIER";
            parent:TableThisRow_Node_45 | TableSpecifierItem_Node_48;
          }
interface TableThisRow_Node_45 extends BaseSymbolNode {
        symbol:"tableThisRow";
        
        children:[TABLE_AT_Node,TABLE_COLUMN_SPECIFIER_Node];
        parent:TableSpecifierInner_Node_46;
      }
interface TableSpecifierInner_Node_46 extends BaseSymbolNode {
        symbol:"tableSpecifierInner";
        
        children:[TableThisRow_Node];
        parent:TableSpecifier_Node_43;
      }
interface TableSpecifierInner_Node_47 extends BaseSymbolNode {
        symbol:"tableSpecifierInner";
        
        children:[TableColumnSpecifier_Node];
        parent:TableSpecifier_Node_43;
      }
interface TableSpecifierItem_Node_48 extends BaseSymbolNode {
        symbol:"tableSpecifierItem";
        
        children:[TABLE_COLUMN_SPECIFIER_Node];
        parent:TableColumnSpecifier_Node | TableColumnSpecifier_51_group_1_Parent_Node;
      }
interface TableSpecifierItem_Node_49 extends BaseSymbolNode {
        symbol:"tableSpecifierItem";
        
        children:[TABLE_ITEM_SPECIFIER_Node];
        parent:TableColumnSpecifier_Node | TableColumnSpecifier_51_group_1_Parent_Node;
      }
interface TableColumnSpecifier_Node extends BaseSymbolNode {
        symbol:"tableColumnSpecifier";
        
        children:[TableSpecifierItem_Node,...ZeroOrMore<TableColumnSpecifier_51_group_1_Node>];
        parent:TableSpecifierInner_Node_47;
      }
export interface ARRAY_SEPARATOR_Node extends BaseTokenNode {
            token:"ARRAY_SEPARATOR";
            parent:Array_38_group_2_Parent_Node;
          }
type Array_38_group_2_Node  = [ARRAY_SEPARATOR_Node,ArrayElement_Node];
export interface ARGUMENT_SEPARATOR_Node extends BaseTokenNode {
            token:"ARGUMENT_SEPARATOR";
            parent:ArgumentsList_40_group_1_Parent_Node_52 | ArgumentsList_40_group_1_Parent_Node_53;
          }
type ArgumentsList_40_group_1_Node_52  = [ARGUMENT_SEPARATOR_Node,Exp_Node];
type ArgumentsList_40_group_1_Node_53  = [ARGUMENT_SEPARATOR_Node];
export interface SPECIFIER_SEPARATOR_Node extends BaseTokenNode {
            token:"SPECIFIER_SEPARATOR";
            parent:TableColumnSpecifier_51_group_1_Parent_Node;
          }
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