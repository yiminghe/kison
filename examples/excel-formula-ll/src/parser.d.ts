type AstNode = AstSymbolNode | AstTokenNode;

// replace start
type AstSymbolNode = Formula_Node|Exp_Node|ReferenceItem_Node|Reference_Node|ArrayElement_Node|ArrayElementPart_Node|ZeroMore_arrayElementPart_1_Node|Array_Node|Function_Node|ZeroMore_argumentPart_2_Node|Arguments_Node|ArgumentPart_Node|StructureReference_Node|TableSpecifier_Node|TableThisRow_Node|TableSpecifierInner_Node|TableSpecifierItem_Node|ZeroMore_tableSpecifierItemPart_3_Node|TableColumnSpecifier_Node|TableSpecifierItemPart_Node;
type AstTokenNode = $EOF_Node|$UNKNOWN_Node|TOKEN_0_Node|TOKEN_1_Node|TOKEN_2_Node|TOKEN_3_Node|TOKEN_4_Node|TOKEN_5_Node|TOKEN_6_Node|TOKEN_7_Node|TOKEN_8_Node|TOKEN_9_Node|TOKEN_10_Node|TOKEN_11_Node|TOKEN_12_Node|TOKEN_13_Node|TOKEN_14_Node|TOKEN_15_Node|NUMBER_Node|STRING_Node|LOGIC_Node|ERROR_Node|CELL_Node|NAME_Node|REF_UNION_OPERATOR_Node|REF_RANGE_OPERATOR_Node|ARRAY_SEPARATOR_Node|TOKEN_16_Node|TOKEN_17_Node|FUNCTION_Node|ARGUMENT_SEPARATOR_Node|TABLE_NAME_Node|TABLE_ITEM_SPECIFIER_Node|TOKEN_18_Node|TOKEN_19_Node|TOKEN_20_Node|TABLE_COLUMN_SPECIFIER_Node|SPECIFIER_SEPARATOR_Node;
type LiteralToken = "$HIDDEN"|"SPECIFIER_SEPARATOR"|"TABLE_ITEM_SPECIFIER"|"TABLE_COLUMN_SPECIFIER"|"ARRAY_SEPARATOR"|"REF_UNION_OPERATOR"|"REF_RANGE_OPERATOR"|"ARGUMENT_SEPARATOR"|"STRING"|"FUNCTION"|"TABLE_NAME"|"ERROR"|"CELL"|"LOGIC"|"NAME"|"NUMBER"|"NUMBER"|"$EOF"|"$UNKOWN"|"="|"<="|">="|"<>"|">"|"<"|"&"|"+"|"-"|"*"|"/"|"^"|"@"|"%"|"("|")"|"{"|"}"|"["|"]"|"TABLE_@";
type AstRootNode = Formula_Node;
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
  expected: LiteralToken[];
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
  LiteralToken,
  LexerOptions, AstTokenNode, Token, AstNode, AstSymbolNode
}

interface Formula_Node extends BaseSymbolNode {
        symbol:"formula";
        
        children:[Exp_Node];
        
      }
interface Exp_Node_0 extends BaseSymbolNode {
        symbol:"exp";
        label:"binary-exp";
        children:[Exp_Node,TOKEN_0_Node,Exp_Node];
        parent:Formula_Node | Exp_Node | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Arguments_Node | ArgumentPart_Node;
      }
interface Exp_Node_3 extends BaseSymbolNode {
        symbol:"exp";
        label:"binary-exp";
        children:[Exp_Node,TOKEN_1_Node,Exp_Node];
        parent:Formula_Node | Exp_Node | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Arguments_Node | ArgumentPart_Node;
      }
interface Exp_Node_4 extends BaseSymbolNode {
        symbol:"exp";
        label:"binary-exp";
        children:[Exp_Node,TOKEN_2_Node,Exp_Node];
        parent:Formula_Node | Exp_Node | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Arguments_Node | ArgumentPart_Node;
      }
interface Exp_Node_5 extends BaseSymbolNode {
        symbol:"exp";
        label:"binary-exp";
        children:[Exp_Node,TOKEN_3_Node,Exp_Node];
        parent:Formula_Node | Exp_Node | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Arguments_Node | ArgumentPart_Node;
      }
interface Exp_Node_6 extends BaseSymbolNode {
        symbol:"exp";
        label:"binary-exp";
        children:[Exp_Node,TOKEN_4_Node,Exp_Node];
        parent:Formula_Node | Exp_Node | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Arguments_Node | ArgumentPart_Node;
      }
interface Exp_Node_7 extends BaseSymbolNode {
        symbol:"exp";
        label:"binary-exp";
        children:[Exp_Node,TOKEN_5_Node,Exp_Node];
        parent:Formula_Node | Exp_Node | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Arguments_Node | ArgumentPart_Node;
      }
interface Exp_Node_8 extends BaseSymbolNode {
        symbol:"exp";
        label:"binary-exp";
        children:[Exp_Node,TOKEN_6_Node,Exp_Node];
        parent:Formula_Node | Exp_Node | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Arguments_Node | ArgumentPart_Node;
      }
interface Exp_Node_9 extends BaseSymbolNode {
        symbol:"exp";
        label:"binary-exp";
        children:[Exp_Node,TOKEN_7_Node,Exp_Node];
        parent:Formula_Node | Exp_Node | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Arguments_Node | ArgumentPart_Node;
      }
interface Exp_Node_10 extends BaseSymbolNode {
        symbol:"exp";
        label:"binary-exp";
        children:[Exp_Node,TOKEN_8_Node,Exp_Node];
        parent:Formula_Node | Exp_Node | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Arguments_Node | ArgumentPart_Node;
      }
interface Exp_Node_11 extends BaseSymbolNode {
        symbol:"exp";
        label:"binary-exp";
        children:[Exp_Node,TOKEN_9_Node,Exp_Node];
        parent:Formula_Node | Exp_Node | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Arguments_Node | ArgumentPart_Node;
      }
interface Exp_Node_12 extends BaseSymbolNode {
        symbol:"exp";
        label:"binary-exp";
        children:[Exp_Node,TOKEN_10_Node,Exp_Node];
        parent:Formula_Node | Exp_Node | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Arguments_Node | ArgumentPart_Node;
      }
interface Exp_Node_13 extends BaseSymbolNode {
        symbol:"exp";
        label:"binary-exp";
        children:[Exp_Node,TOKEN_11_Node,Exp_Node];
        parent:Formula_Node | Exp_Node | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Arguments_Node | ArgumentPart_Node;
      }
interface Exp_Node_14 extends BaseSymbolNode {
        symbol:"exp";
        label:"prefix-exp";
        children:[TOKEN_7_Node,Exp_Node];
        parent:Formula_Node | Exp_Node | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Arguments_Node | ArgumentPart_Node;
      }
interface Exp_Node_15 extends BaseSymbolNode {
        symbol:"exp";
        label:"prefix-exp";
        children:[TOKEN_8_Node,Exp_Node];
        parent:Formula_Node | Exp_Node | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Arguments_Node | ArgumentPart_Node;
      }
interface Exp_Node_16 extends BaseSymbolNode {
        symbol:"exp";
        label:"clip-exp";
        children:[TOKEN_12_Node,Exp_Node];
        parent:Formula_Node | Exp_Node | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Arguments_Node | ArgumentPart_Node;
      }
interface Exp_Node_17 extends BaseSymbolNode {
        symbol:"exp";
        label:"percentage-exp";
        children:[Exp_Node,TOKEN_13_Node];
        parent:Formula_Node | Exp_Node | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Arguments_Node | ArgumentPart_Node;
      }
interface Exp_Node_18 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[TOKEN_14_Node,Exp_Node,TOKEN_15_Node];
        parent:Formula_Node | Exp_Node | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Arguments_Node | ArgumentPart_Node;
      }
interface Exp_Node_19 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[NUMBER_Node];
        parent:Formula_Node | Exp_Node | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Arguments_Node | ArgumentPart_Node;
      }
interface Exp_Node_20 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[STRING_Node];
        parent:Formula_Node | Exp_Node | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Arguments_Node | ArgumentPart_Node;
      }
interface Exp_Node_21 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[LOGIC_Node];
        parent:Formula_Node | Exp_Node | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Arguments_Node | ArgumentPart_Node;
      }
interface Exp_Node_22 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[ERROR_Node];
        parent:Formula_Node | Exp_Node | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Arguments_Node | ArgumentPart_Node;
      }
interface Exp_Node_23 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Reference_Node];
        parent:Formula_Node | Exp_Node | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Arguments_Node | ArgumentPart_Node;
      }
interface Exp_Node_31 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Function_Node];
        parent:Formula_Node | Exp_Node | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Arguments_Node | ArgumentPart_Node;
      }
interface Exp_Node_32 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Array_Node];
        parent:Formula_Node | Exp_Node | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Arguments_Node | ArgumentPart_Node;
      }
type Exp_Node = Exp_Node_0 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12 | Exp_Node_13 | Exp_Node_14 | Exp_Node_15 | Exp_Node_16 | Exp_Node_17 | Exp_Node_18 | Exp_Node_19 | Exp_Node_20 | Exp_Node_21 | Exp_Node_22 | Exp_Node_23 | Exp_Node_31 | Exp_Node_32;
interface ReferenceItem_Node_0 extends BaseSymbolNode {
        symbol:"reference-item";
        
        children:[CELL_Node];
        parent:Reference_Node_30;
      }
interface ReferenceItem_Node_25 extends BaseSymbolNode {
        symbol:"reference-item";
        
        children:[NAME_Node];
        parent:Reference_Node_30;
      }
interface ReferenceItem_Node_26 extends BaseSymbolNode {
        symbol:"reference-item";
        
        children:[StructureReference_Node];
        parent:Reference_Node_30;
      }
type ReferenceItem_Node = ReferenceItem_Node_0 | ReferenceItem_Node_25 | ReferenceItem_Node_26;
interface Reference_Node_0 extends BaseSymbolNode {
        symbol:"reference";
        label:"union-reference";
        children:[Reference_Node,REF_UNION_OPERATOR_Node,Reference_Node];
        parent:Exp_Node_23 | Reference_Node | Reference_Node_28 | Reference_Node_29;
      }
interface Reference_Node_28 extends BaseSymbolNode {
        symbol:"reference";
        label:"intersection-reference";
        children:[Reference_Node,Reference_Node];
        parent:Exp_Node_23 | Reference_Node | Reference_Node_28 | Reference_Node_29;
      }
interface Reference_Node_29 extends BaseSymbolNode {
        symbol:"reference";
        label:"range-reference";
        children:[Reference_Node,REF_RANGE_OPERATOR_Node,Reference_Node];
        parent:Exp_Node_23 | Reference_Node | Reference_Node_28 | Reference_Node_29;
      }
interface Reference_Node_30 extends BaseSymbolNode {
        symbol:"reference";
        
        children:[ReferenceItem_Node];
        parent:Exp_Node_23 | Reference_Node | Reference_Node_28 | Reference_Node_29;
      }
type Reference_Node = Reference_Node_0 | Reference_Node_28 | Reference_Node_29 | Reference_Node_30;
interface ArrayElement_Node_0 extends BaseSymbolNode {
        symbol:"array-element";
        
        children:[STRING_Node];
        parent:ArrayElementPart_Node | Array_Node;
      }
interface ArrayElement_Node_34 extends BaseSymbolNode {
        symbol:"array-element";
        
        children:[NUMBER_Node];
        parent:ArrayElementPart_Node | Array_Node;
      }
interface ArrayElement_Node_35 extends BaseSymbolNode {
        symbol:"array-element";
        
        children:[LOGIC_Node];
        parent:ArrayElementPart_Node | Array_Node;
      }
interface ArrayElement_Node_36 extends BaseSymbolNode {
        symbol:"array-element";
        
        children:[ERROR_Node];
        parent:ArrayElementPart_Node | Array_Node;
      }
type ArrayElement_Node = ArrayElement_Node_0 | ArrayElement_Node_34 | ArrayElement_Node_35 | ArrayElement_Node_36;
interface ArrayElementPart_Node extends BaseSymbolNode {
        symbol:"array-element-part";
        
        children:[ARRAY_SEPARATOR_Node,ArrayElement_Node];
        parent:ZeroMore_arrayElementPart_1_Node;
      }
interface ZeroMore_arrayElementPart_1_Node_0 extends BaseSymbolNode {
        symbol:"zeroMore_array-element-part_1";
        
        children:Array<ARRAY_SEPARATOR_Node | ArrayElement_Node>;
        parent:Array_Node;
      }
interface ZeroMore_arrayElementPart_1_Node_39 extends BaseSymbolNode {
        symbol:"zeroMore_array-element-part_1";
        
        children:[];
        parent:Array_Node;
      }
type ZeroMore_arrayElementPart_1_Node = ZeroMore_arrayElementPart_1_Node_0 | ZeroMore_arrayElementPart_1_Node_39;
interface Array_Node extends BaseSymbolNode {
        symbol:"array";
        
        children:Array<TOKEN_16_Node | ArrayElement_Node | ARRAY_SEPARATOR_Node | ArrayElement_Node | TOKEN_17_Node>;
        parent:Exp_Node_32;
      }
interface Function_Node extends BaseSymbolNode {
        symbol:"function";
        
        children:[FUNCTION_Node,TOKEN_14_Node,Arguments_Node,TOKEN_15_Node];
        parent:Exp_Node_31;
      }
interface ZeroMore_argumentPart_2_Node_0 extends BaseSymbolNode {
        symbol:"zeroMore_argumentPart_2";
        
        children:Array<Exp_Node | ARGUMENT_SEPARATOR_Node>;
        parent:Arguments_Node | Arguments_Node_45;
      }
interface ZeroMore_argumentPart_2_Node_43 extends BaseSymbolNode {
        symbol:"zeroMore_argumentPart_2";
        
        children:[];
        parent:Arguments_Node | Arguments_Node_45;
      }
type ZeroMore_argumentPart_2_Node = ZeroMore_argumentPart_2_Node_0 | ZeroMore_argumentPart_2_Node_43;
interface Arguments_Node_0 extends BaseSymbolNode {
        symbol:"arguments";
        
        children:Array<Exp_Node | ARGUMENT_SEPARATOR_Node | Exp_Node>;
        parent:Function_Node;
      }
interface Arguments_Node_45 extends BaseSymbolNode {
        symbol:"arguments";
        
        children:Array<ARGUMENT_SEPARATOR_Node | Exp_Node>;
        parent:Function_Node;
      }
type Arguments_Node = Arguments_Node_0 | Arguments_Node_45;
interface ArgumentPart_Node_0 extends BaseSymbolNode {
        symbol:"argumentPart";
        
        children:[ARGUMENT_SEPARATOR_Node,Exp_Node];
        parent:ZeroMore_argumentPart_2_Node;
      }
interface ArgumentPart_Node_47 extends BaseSymbolNode {
        symbol:"argumentPart";
        
        children:[ARGUMENT_SEPARATOR_Node];
        parent:ZeroMore_argumentPart_2_Node;
      }
type ArgumentPart_Node = ArgumentPart_Node_0 | ArgumentPart_Node_47;
interface StructureReference_Node_0 extends BaseSymbolNode {
        symbol:"structure-reference";
        
        children:[TABLE_NAME_Node,TableSpecifier_Node];
        parent:ReferenceItem_Node_26;
      }
interface StructureReference_Node_49 extends BaseSymbolNode {
        symbol:"structure-reference";
        
        children:[TableSpecifier_Node];
        parent:ReferenceItem_Node_26;
      }
type StructureReference_Node = StructureReference_Node_0 | StructureReference_Node_49;
interface TableSpecifier_Node_0 extends BaseSymbolNode {
        symbol:"table-specifier";
        
        children:[TABLE_ITEM_SPECIFIER_Node];
        parent:StructureReference_Node | StructureReference_Node_49;
      }
interface TableSpecifier_Node_51 extends BaseSymbolNode {
        symbol:"table-specifier";
        
        children:[TOKEN_18_Node,TableSpecifierInner_Node,TOKEN_19_Node];
        parent:StructureReference_Node | StructureReference_Node_49;
      }
type TableSpecifier_Node = TableSpecifier_Node_0 | TableSpecifier_Node_51;
interface TableThisRow_Node_0 extends BaseSymbolNode {
        symbol:"table-this-row";
        
        children:[TOKEN_20_Node];
        parent:TableSpecifierInner_Node;
      }
interface TableThisRow_Node_53 extends BaseSymbolNode {
        symbol:"table-this-row";
        
        children:[TOKEN_20_Node,TABLE_COLUMN_SPECIFIER_Node];
        parent:TableSpecifierInner_Node;
      }
type TableThisRow_Node = TableThisRow_Node_0 | TableThisRow_Node_53;
interface TableSpecifierInner_Node_0 extends BaseSymbolNode {
        symbol:"table-specifier-inner";
        
        children:[TableThisRow_Node];
        parent:TableSpecifier_Node_51;
      }
interface TableSpecifierInner_Node_55 extends BaseSymbolNode {
        symbol:"table-specifier-inner";
        
        children:[TableColumnSpecifier_Node];
        parent:TableSpecifier_Node_51;
      }
type TableSpecifierInner_Node = TableSpecifierInner_Node_0 | TableSpecifierInner_Node_55;
interface TableSpecifierItem_Node_0 extends BaseSymbolNode {
        symbol:"table-specifier-item";
        
        children:[TABLE_COLUMN_SPECIFIER_Node];
        parent:TableColumnSpecifier_Node | TableSpecifierItemPart_Node;
      }
interface TableSpecifierItem_Node_57 extends BaseSymbolNode {
        symbol:"table-specifier-item";
        
        children:[TABLE_ITEM_SPECIFIER_Node];
        parent:TableColumnSpecifier_Node | TableSpecifierItemPart_Node;
      }
type TableSpecifierItem_Node = TableSpecifierItem_Node_0 | TableSpecifierItem_Node_57;
interface ZeroMore_tableSpecifierItemPart_3_Node_0 extends BaseSymbolNode {
        symbol:"zeroMore_table-specifier-item-part_3";
        
        children:Array<TableSpecifierItem_Node | SPECIFIER_SEPARATOR_Node>;
        parent:TableColumnSpecifier_Node;
      }
interface ZeroMore_tableSpecifierItemPart_3_Node_59 extends BaseSymbolNode {
        symbol:"zeroMore_table-specifier-item-part_3";
        
        children:[];
        parent:TableColumnSpecifier_Node;
      }
type ZeroMore_tableSpecifierItemPart_3_Node = ZeroMore_tableSpecifierItemPart_3_Node_0 | ZeroMore_tableSpecifierItemPart_3_Node_59;
interface TableColumnSpecifier_Node extends BaseSymbolNode {
        symbol:"table-column-specifier";
        
        children:Array<TableSpecifierItem_Node | TableSpecifierItem_Node | SPECIFIER_SEPARATOR_Node>;
        parent:TableSpecifierInner_Node_55;
      }
interface TableSpecifierItemPart_Node extends BaseSymbolNode {
        symbol:"table-specifier-item-part";
        
        children:[SPECIFIER_SEPARATOR_Node,TableSpecifierItem_Node];
        parent:ZeroMore_tableSpecifierItemPart_3_Node;
      }
interface $EOF_Node extends BaseTokenNode {
        token:"$EOF";
        parent:AstSymbolNode;
      }
interface $UNKNOWN_Node extends BaseTokenNode {
        token:"$UNKNOWN";
        parent:AstSymbolNode;
      }
interface TOKEN_0_Node extends BaseTokenNode {
            token:"=";
            parent:Exp_Node;
          }
interface TOKEN_1_Node extends BaseTokenNode {
            token:"<=";
            parent:Exp_Node_3;
          }
interface TOKEN_2_Node extends BaseTokenNode {
            token:">=";
            parent:Exp_Node_4;
          }
interface TOKEN_3_Node extends BaseTokenNode {
            token:"<>";
            parent:Exp_Node_5;
          }
interface TOKEN_4_Node extends BaseTokenNode {
            token:">";
            parent:Exp_Node_6;
          }
interface TOKEN_5_Node extends BaseTokenNode {
            token:"<";
            parent:Exp_Node_7;
          }
interface TOKEN_6_Node extends BaseTokenNode {
            token:"&";
            parent:Exp_Node_8;
          }
interface TOKEN_7_Node extends BaseTokenNode {
            token:"+";
            parent:Exp_Node_9 | Exp_Node_14;
          }
interface TOKEN_8_Node extends BaseTokenNode {
            token:"-";
            parent:Exp_Node_10 | Exp_Node_15;
          }
interface TOKEN_9_Node extends BaseTokenNode {
            token:"*";
            parent:Exp_Node_11;
          }
interface TOKEN_10_Node extends BaseTokenNode {
            token:"/";
            parent:Exp_Node_12;
          }
interface TOKEN_11_Node extends BaseTokenNode {
            token:"^";
            parent:Exp_Node_13;
          }
interface TOKEN_12_Node extends BaseTokenNode {
            token:"@";
            parent:Exp_Node_16;
          }
interface TOKEN_13_Node extends BaseTokenNode {
            token:"%";
            parent:Exp_Node_17;
          }
interface TOKEN_14_Node extends BaseTokenNode {
            token:"(";
            parent:Exp_Node_18 | Function_Node;
          }
interface TOKEN_15_Node extends BaseTokenNode {
            token:")";
            parent:Exp_Node_18 | Function_Node;
          }
interface NUMBER_Node extends BaseTokenNode {
            token:"NUMBER";
            parent:Exp_Node_19 | ArrayElement_Node_34;
          }
interface STRING_Node extends BaseTokenNode {
            token:"STRING";
            parent:Exp_Node_20 | ArrayElement_Node;
          }
interface LOGIC_Node extends BaseTokenNode {
            token:"LOGIC";
            parent:Exp_Node_21 | ArrayElement_Node_35;
          }
interface ERROR_Node extends BaseTokenNode {
            token:"ERROR";
            parent:Exp_Node_22 | ArrayElement_Node_36;
          }
interface CELL_Node extends BaseTokenNode {
            token:"CELL";
            parent:ReferenceItem_Node;
          }
interface NAME_Node extends BaseTokenNode {
            token:"NAME";
            parent:ReferenceItem_Node_25;
          }
interface REF_UNION_OPERATOR_Node extends BaseTokenNode {
            token:"REF_UNION_OPERATOR";
            parent:Reference_Node;
          }
interface REF_RANGE_OPERATOR_Node extends BaseTokenNode {
            token:"REF_RANGE_OPERATOR";
            parent:Reference_Node_29;
          }
interface ARRAY_SEPARATOR_Node extends BaseTokenNode {
            token:"ARRAY_SEPARATOR";
            parent:Array_Node;
          }
interface TOKEN_16_Node extends BaseTokenNode {
            token:"{";
            parent:Array_Node;
          }
interface TOKEN_17_Node extends BaseTokenNode {
            token:"}";
            parent:Array_Node;
          }
interface FUNCTION_Node extends BaseTokenNode {
            token:"FUNCTION";
            parent:Function_Node;
          }
interface ARGUMENT_SEPARATOR_Node extends BaseTokenNode {
            token:"ARGUMENT_SEPARATOR";
            parent:Arguments_Node | Arguments_Node_45;
          }
interface TABLE_NAME_Node extends BaseTokenNode {
            token:"TABLE_NAME";
            parent:StructureReference_Node;
          }
interface TABLE_ITEM_SPECIFIER_Node extends BaseTokenNode {
            token:"TABLE_ITEM_SPECIFIER";
            parent:TableSpecifier_Node | TableSpecifierItem_Node_57;
          }
interface TOKEN_18_Node extends BaseTokenNode {
            token:"[";
            parent:TableSpecifier_Node_51;
          }
interface TOKEN_19_Node extends BaseTokenNode {
            token:"]";
            parent:TableSpecifier_Node_51;
          }
interface TOKEN_20_Node extends BaseTokenNode {
            token:"TABLE_@";
            parent:TableThisRow_Node | TableThisRow_Node_53;
          }
interface TABLE_COLUMN_SPECIFIER_Node extends BaseTokenNode {
            token:"TABLE_COLUMN_SPECIFIER";
            parent:TableThisRow_Node_53 | TableSpecifierItem_Node;
          }
interface SPECIFIER_SEPARATOR_Node extends BaseTokenNode {
            token:"SPECIFIER_SEPARATOR";
            parent:TableColumnSpecifier_Node;
          }
export type { Formula_Node,Exp_Node,ReferenceItem_Node,Reference_Node,ArrayElement_Node,ArrayElementPart_Node,ZeroMore_arrayElementPart_1_Node,Array_Node,Function_Node,ZeroMore_argumentPart_2_Node,Arguments_Node,ArgumentPart_Node,StructureReference_Node,TableSpecifier_Node,TableThisRow_Node,TableSpecifierInner_Node,TableSpecifierItem_Node,ZeroMore_tableSpecifierItemPart_3_Node,TableColumnSpecifier_Node,TableSpecifierItemPart_Node,$EOF_Node,$UNKNOWN_Node,TOKEN_0_Node,TOKEN_1_Node,TOKEN_2_Node,TOKEN_3_Node,TOKEN_4_Node,TOKEN_5_Node,TOKEN_6_Node,TOKEN_7_Node,TOKEN_8_Node,TOKEN_9_Node,TOKEN_10_Node,TOKEN_11_Node,TOKEN_12_Node,TOKEN_13_Node,TOKEN_14_Node,TOKEN_15_Node,NUMBER_Node,STRING_Node,LOGIC_Node,ERROR_Node,CELL_Node,NAME_Node,REF_UNION_OPERATOR_Node,REF_RANGE_OPERATOR_Node,ARRAY_SEPARATOR_Node,TOKEN_16_Node,TOKEN_17_Node,FUNCTION_Node,ARGUMENT_SEPARATOR_Node,TABLE_NAME_Node,TABLE_ITEM_SPECIFIER_Node,TOKEN_18_Node,TOKEN_19_Node,TOKEN_20_Node,TABLE_COLUMN_SPECIFIER_Node,SPECIFIER_SEPARATOR_Node }