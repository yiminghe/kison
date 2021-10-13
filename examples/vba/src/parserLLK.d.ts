type AstNode = AstSymbolNode | AstTokenNode;

// replace start
type AstSymbolNode = Progam_Node|ModuleBody_Node|ModuleBodyElement_Node|Visibility_Node|SubStmt_Node|Block_Node|BlockStmt_Node|ImplicitCallStmt_InBlock_Node|ICS_B_ProcedureCall_Node|ArgsCall_Node|ArgCall_Node|DictionaryCallStmt_Node|VariableStmt_Node|VariableListStmt_Node|VariableSubStmt_Node|Subscripts_Node|Subscript__Node|ArgList_Node|ValueStmt_Node|Literal_Node|TypeHint_Node|Arg_Node|ArgDefaultValue_Node|AsTypeClause_Node|Type__Node|BaseType_Node|FieldLength_Node;
type AstTokenNode = $EOF_Node|$UNKNOWN_Node|PRIVATE_Node|PUBLIC_Node|FRIEND_Node|GLOBAL_Node|STATIC_Node|SUB_Node|IDENTIFIER_Node|END_SUB_Node|LPAREN_Node|BYREF_Node|RPAREN_Node|BYVAL_Node|PARAMARRAY_Node|TOKEN_0_Node|DIM_Node|WITHEVENTS_Node|INTEGERLITERAL_Node|STRINGLITERAL_Node|TOKEN_1_Node|TOKEN_2_Node|TOKEN_3_Node|TOKEN_4_Node|$_Node|OPTIONAL_Node|EQ_Node|AS_Node|NEW_Node|BOOLEAN_Node|BYTE_Node|COLLECTION_Node|DATE_Node|DOUBLE_Node|INTEGER_Node|LONG_Node|SINGLE_Node|VARIANT_Node|MULT_Node|TOKEN_5_Node|TOKEN_6_Node|TO_Node;
type LiteralToken = "ACCESS"|"ADDRESSOF"|"ALIAS"|"AND"|"ATTRIBUTE"|"APPACTIVATE"|"APPEND"|"AS"|"BEGIN"|"BEEP"|"BINARY"|"BOOLEAN"|"BYVAL"|"BYREF"|"BYTE"|"CALL"|"CASE"|"CHDIR"|"CHDRIVE"|"CLASS"|"CLOSE"|"COLLECTION"|"CONST"|"DATABASE"|"DATE"|"DECLARE"|"DEFBOOL"|"DEFBYTE"|"DEFDATE"|"DEFDBL"|"DEFDEC"|"DEFCUR"|"DEFINT"|"DEFLNG"|"DEFOBJ"|"DEFSNG"|"DEFSTR"|"DEFVAR"|"DELETESETTING"|"DIM"|"DO"|"DOUBLE"|"EACH"|"ELSE"|"ELSEIF"|"END_ENUM"|"END_FUNCTION"|"END_IF"|"END_PROPERTY"|"END_SELECT"|"END_SUB"|"END_TYPE"|"END_WITH"|"END"|"ENUM"|"EQV"|"ERASE"|"ERROR"|"EVENT"|"EXIT_DO"|"EXIT_FOR"|"EXIT_FUNCTION"|"EXIT_PROPERTY"|"EXIT_SUB"|"FALSE"|"FILECOPY"|"FRIEND"|"FOR"|"FUNCTION"|"GET"|"GLOBAL"|"GOSUB"|"GOTO"|"IF"|"IMP"|"IMPLEMENTS"|"IN"|"INPUT"|"IS"|"INTEGER"|"KILL"|"LOAD"|"LOCK"|"LONG"|"LOOP"|"LEN"|"LET"|"LIB"|"LIKE"|"LINE_INPUT"|"LOCK_READ"|"LOCK_WRITE"|"LOCK_READ_WRITE"|"LSET"|"MACRO_CONST"|"MACRO_IF"|"MACRO_ELSEIF"|"MACRO_ELSE"|"MACRO_END_IF"|"ME"|"MID"|"MKDIR"|"MOD"|"NAME"|"NEXT"|"NEW"|"NOT"|"NOTHING"|"NULL"|"ON"|"ON_ERROR"|"ON_LOCAL_ERROR"|"OPEN"|"OPTIONAL"|"OPTION_BASE"|"OPTION_EXPLICIT"|"OPTION_COMPARE"|"OPTION_PRIVATE_MODULE"|"OR"|"OUTPUT"|"PARAMARRAY"|"PRESERVE"|"PRINT"|"PRIVATE"|"PROPERTY_GET"|"PROPERTY_LET"|"PROPERTY_SET"|"PTRSAFE"|"PUBLIC"|"PUT"|"RANDOM"|"RANDOMIZE"|"RAISEEVENT"|"READ"|"READ_WRITE"|"REDIM"|"REM"|"RESET"|"RESUME"|"RETURN"|"RMDIR"|"RSET"|"SAVEPICTURE"|"SAVESETTING"|"SEEK"|"SELECT"|"SENDKEYS"|"SET"|"SETATTR"|"SHARED"|"SINGLE"|"SPC"|"STATIC"|"STEP"|"STOP"|"STRING"|"SUB"|"TAB"|"TEXT"|"THEN"|"TIME"|"TO"|"TRUE"|"TYPE"|"TYPEOF"|"UNLOAD"|"UNLOCK"|"UNTIL"|"VARIANT"|"VERSION"|"WEND"|"WHILE"|"WIDTH"|"WITH"|"WITHEVENTS"|"WRITE"|"XOR"|"AMPERSAND"|"ASSIGN"|"DIV"|"EQ"|"GEQ"|"GT"|"LEQ"|"LPAREN"|"LT"|"MINUS"|"MINUS_EQ"|"MULT"|"NEQ"|"PLUS"|"PLUS_EQ"|"POW"|"RPAREN"|"L_SQUARE_BRACKET"|"R_SQUARE_BRACKET"|"$HIDDEN"|"STRINGLITERAL"|"INTEGERLITERAL"|"IDENTIFIER"|"$"|"$EOF"|"$UNKOWN"|"!"|"&"|"%"|"#"|"@"|","|";";
type AstRootNode = Progam_Node;
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

interface Progam_Node_0 extends BaseSymbolNode {
        symbol:"progam";
        
        children:[ModuleBody_Node];
        
      }
interface Progam_Node_2 extends BaseSymbolNode {
        symbol:"progam";
        
        children:[];
        
      }
type Progam_Node = Progam_Node_0 | Progam_Node_2;
interface ModuleBody_Node extends BaseSymbolNode {
        symbol:"moduleBody";
        
        children:Array<ModuleBodyElement_Node | ModuleBodyElement_Node>;
        parent:Progam_Node;
      }
interface ModuleBodyElement_Node extends BaseSymbolNode {
        symbol:"moduleBodyElement";
        
        children:[SubStmt_Node];
        parent:ModuleBody_Node | ModuleBody_Node;
      }
interface Visibility_Node_0 extends BaseSymbolNode {
        symbol:"visibility";
        
        children:[PRIVATE_Node];
        parent:SubStmt_Node | VariableStmt_Node;
      }
interface Visibility_Node_8 extends BaseSymbolNode {
        symbol:"visibility";
        
        children:[PUBLIC_Node];
        parent:SubStmt_Node | VariableStmt_Node;
      }
interface Visibility_Node_9 extends BaseSymbolNode {
        symbol:"visibility";
        
        children:[FRIEND_Node];
        parent:SubStmt_Node | VariableStmt_Node;
      }
interface Visibility_Node_10 extends BaseSymbolNode {
        symbol:"visibility";
        
        children:[GLOBAL_Node];
        parent:SubStmt_Node | VariableStmt_Node;
      }
type Visibility_Node = Visibility_Node_0 | Visibility_Node_8 | Visibility_Node_9 | Visibility_Node_10;
interface SubStmt_Node_0 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,STATIC_Node,SUB_Node,IDENTIFIER_Node,ArgList_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node;
      }
interface SubStmt_Node_12 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,STATIC_Node,SUB_Node,IDENTIFIER_Node,ArgList_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node;
      }
interface SubStmt_Node_13 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,STATIC_Node,SUB_Node,IDENTIFIER_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node;
      }
interface SubStmt_Node_14 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,STATIC_Node,SUB_Node,IDENTIFIER_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node;
      }
interface SubStmt_Node_15 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,SUB_Node,IDENTIFIER_Node,ArgList_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node;
      }
interface SubStmt_Node_16 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,SUB_Node,IDENTIFIER_Node,ArgList_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node;
      }
interface SubStmt_Node_17 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,SUB_Node,IDENTIFIER_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node;
      }
interface SubStmt_Node_18 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,SUB_Node,IDENTIFIER_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node;
      }
interface SubStmt_Node_19 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[STATIC_Node,SUB_Node,IDENTIFIER_Node,ArgList_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node;
      }
interface SubStmt_Node_20 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[STATIC_Node,SUB_Node,IDENTIFIER_Node,ArgList_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node;
      }
interface SubStmt_Node_21 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[STATIC_Node,SUB_Node,IDENTIFIER_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node;
      }
interface SubStmt_Node_22 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[STATIC_Node,SUB_Node,IDENTIFIER_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node;
      }
interface SubStmt_Node_23 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[SUB_Node,IDENTIFIER_Node,ArgList_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node;
      }
interface SubStmt_Node_24 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[SUB_Node,IDENTIFIER_Node,ArgList_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node;
      }
interface SubStmt_Node_25 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[SUB_Node,IDENTIFIER_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node;
      }
interface SubStmt_Node_26 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[SUB_Node,IDENTIFIER_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node;
      }
type SubStmt_Node = SubStmt_Node_0 | SubStmt_Node_12 | SubStmt_Node_13 | SubStmt_Node_14 | SubStmt_Node_15 | SubStmt_Node_16 | SubStmt_Node_17 | SubStmt_Node_18 | SubStmt_Node_19 | SubStmt_Node_20 | SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_23 | SubStmt_Node_24 | SubStmt_Node_25 | SubStmt_Node_26;
interface Block_Node extends BaseSymbolNode {
        symbol:"block";
        
        children:Array<BlockStmt_Node | BlockStmt_Node>;
        parent:SubStmt_Node;
      }
interface BlockStmt_Node_0 extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[VariableStmt_Node];
        parent:Block_Node | Block_Node;
      }
interface BlockStmt_Node_31 extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[ImplicitCallStmt_InBlock_Node];
        parent:Block_Node | Block_Node;
      }
type BlockStmt_Node = BlockStmt_Node_0 | BlockStmt_Node_31;
interface ImplicitCallStmt_InBlock_Node extends BaseSymbolNode {
        symbol:"implicitCallStmt_InBlock";
        
        children:[ICS_B_ProcedureCall_Node];
        parent:BlockStmt_Node_31;
      }
interface ICS_B_ProcedureCall_Node_0 extends BaseSymbolNode {
        symbol:"iCS_B_ProcedureCall";
        
        children:Array<IDENTIFIER_Node | ArgsCall_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node>;
        parent:ImplicitCallStmt_InBlock_Node;
      }
interface ICS_B_ProcedureCall_Node_36 extends BaseSymbolNode {
        symbol:"iCS_B_ProcedureCall";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node>;
        parent:ImplicitCallStmt_InBlock_Node;
      }
type ICS_B_ProcedureCall_Node = ICS_B_ProcedureCall_Node_0 | ICS_B_ProcedureCall_Node_36;
interface ArgsCall_Node_0 extends BaseSymbolNode {
        symbol:"argsCall";
        
        children:Array<ArgCall_Node | TOKEN_5_Node | ArgCall_Node | ArgCall_Node | TOKEN_5_Node>;
        parent:ICS_B_ProcedureCall_Node;
      }
interface ArgsCall_Node_46 extends BaseSymbolNode {
        symbol:"argsCall";
        
        children:Array<TOKEN_5_Node | ArgCall_Node | ArgCall_Node | TOKEN_6_Node | ArgCall_Node>;
        parent:ICS_B_ProcedureCall_Node;
      }
interface ArgsCall_Node_51 extends BaseSymbolNode {
        symbol:"argsCall";
        
        children:Array<TOKEN_6_Node | ArgCall_Node | ArgCall_Node | TOKEN_5_Node | ArgCall_Node>;
        parent:ICS_B_ProcedureCall_Node;
      }
interface ArgsCall_Node_56 extends BaseSymbolNode {
        symbol:"argsCall";
        
        children:Array<TOKEN_6_Node | ArgCall_Node | ArgCall_Node | TOKEN_6_Node | ArgCall_Node>;
        parent:ICS_B_ProcedureCall_Node;
      }
type ArgsCall_Node = ArgsCall_Node_0 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_56;
interface ArgCall_Node_0 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,BYREF_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
      }
interface ArgCall_Node_58 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,BYREF_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
      }
interface ArgCall_Node_59 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
      }
interface ArgCall_Node_60 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
      }
interface ArgCall_Node_61 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[BYREF_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
      }
interface ArgCall_Node_62 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[BYREF_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
      }
interface ArgCall_Node_63 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
      }
interface ArgCall_Node_64 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
      }
interface ArgCall_Node_65 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,BYVAL_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
      }
interface ArgCall_Node_66 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,BYVAL_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
      }
interface ArgCall_Node_67 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
      }
interface ArgCall_Node_68 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
      }
interface ArgCall_Node_69 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[BYVAL_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
      }
interface ArgCall_Node_70 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[BYVAL_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
      }
interface ArgCall_Node_71 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
      }
interface ArgCall_Node_72 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
      }
interface ArgCall_Node_73 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,PARAMARRAY_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
      }
interface ArgCall_Node_74 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,PARAMARRAY_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
      }
interface ArgCall_Node_75 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
      }
interface ArgCall_Node_76 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
      }
interface ArgCall_Node_77 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[PARAMARRAY_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
      }
interface ArgCall_Node_78 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[PARAMARRAY_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
      }
interface ArgCall_Node_79 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
      }
interface ArgCall_Node_80 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
      }
type ArgCall_Node = ArgCall_Node_0 | ArgCall_Node_58 | ArgCall_Node_59 | ArgCall_Node_60 | ArgCall_Node_61 | ArgCall_Node_62 | ArgCall_Node_63 | ArgCall_Node_64 | ArgCall_Node_65 | ArgCall_Node_66 | ArgCall_Node_67 | ArgCall_Node_68 | ArgCall_Node_69 | ArgCall_Node_70 | ArgCall_Node_71 | ArgCall_Node_72 | ArgCall_Node_73 | ArgCall_Node_74 | ArgCall_Node_75 | ArgCall_Node_76 | ArgCall_Node_77 | ArgCall_Node_78 | ArgCall_Node_79 | ArgCall_Node_80;
interface DictionaryCallStmt_Node_0 extends BaseSymbolNode {
        symbol:"dictionaryCallStmt";
        
        children:[TOKEN_0_Node,IDENTIFIER_Node,TypeHint_Node];
        
      }
interface DictionaryCallStmt_Node_82 extends BaseSymbolNode {
        symbol:"dictionaryCallStmt";
        
        children:[TOKEN_0_Node,IDENTIFIER_Node];
        
      }
type DictionaryCallStmt_Node = DictionaryCallStmt_Node_0 | DictionaryCallStmt_Node_82;
interface VariableStmt_Node_0 extends BaseSymbolNode {
        symbol:"variableStmt";
        
        children:[DIM_Node,STATIC_Node,Visibility_Node,WITHEVENTS_Node,VariableListStmt_Node];
        parent:BlockStmt_Node;
      }
interface VariableStmt_Node_84 extends BaseSymbolNode {
        symbol:"variableStmt";
        
        children:[DIM_Node,STATIC_Node,Visibility_Node,VariableListStmt_Node];
        parent:BlockStmt_Node;
      }
type VariableStmt_Node = VariableStmt_Node_0 | VariableStmt_Node_84;
interface VariableListStmt_Node extends BaseSymbolNode {
        symbol:"variableListStmt";
        
        children:Array<VariableSubStmt_Node | VariableSubStmt_Node | TOKEN_5_Node>;
        parent:VariableStmt_Node;
      }
interface VariableSubStmt_Node_0 extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node | TypeHint_Node | AsTypeClause_Node>;
        parent:VariableListStmt_Node | VariableListStmt_Node;
      }
interface VariableSubStmt_Node_89 extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node | TypeHint_Node>;
        parent:VariableListStmt_Node | VariableListStmt_Node;
      }
interface VariableSubStmt_Node_90 extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node | AsTypeClause_Node>;
        parent:VariableListStmt_Node | VariableListStmt_Node;
      }
interface VariableSubStmt_Node_91 extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node>;
        parent:VariableListStmt_Node | VariableListStmt_Node;
      }
interface VariableSubStmt_Node_92 extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:VariableListStmt_Node | VariableListStmt_Node;
      }
interface VariableSubStmt_Node_93 extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[IDENTIFIER_Node,TypeHint_Node];
        parent:VariableListStmt_Node | VariableListStmt_Node;
      }
interface VariableSubStmt_Node_94 extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[IDENTIFIER_Node,AsTypeClause_Node];
        parent:VariableListStmt_Node | VariableListStmt_Node;
      }
interface VariableSubStmt_Node_95 extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[IDENTIFIER_Node];
        parent:VariableListStmt_Node | VariableListStmt_Node;
      }
type VariableSubStmt_Node = VariableSubStmt_Node_0 | VariableSubStmt_Node_89 | VariableSubStmt_Node_90 | VariableSubStmt_Node_91 | VariableSubStmt_Node_92 | VariableSubStmt_Node_93 | VariableSubStmt_Node_94 | VariableSubStmt_Node_95;
interface Subscripts_Node extends BaseSymbolNode {
        symbol:"subscripts";
        
        children:Array<Subscript__Node | Subscript__Node | TOKEN_5_Node>;
        parent:VariableSubStmt_Node | ICS_B_ProcedureCall_Node;
      }
interface Subscript__Node_0 extends BaseSymbolNode {
        symbol:"subscript_";
        
        children:Array<ValueStmt_Node | TO_Node | ValueStmt_Node>;
        parent:Subscripts_Node | Subscripts_Node;
      }
interface Subscript__Node_100 extends BaseSymbolNode {
        symbol:"subscript_";
        
        children:[ValueStmt_Node];
        parent:Subscripts_Node | Subscripts_Node;
      }
type Subscript__Node = Subscript__Node_0 | Subscript__Node_100;
interface ArgList_Node_0 extends BaseSymbolNode {
        symbol:"argList";
        
        children:Array<LPAREN_Node | Arg_Node | TOKEN_5_Node | RPAREN_Node>;
        parent:SubStmt_Node;
      }
interface ArgList_Node_102 extends BaseSymbolNode {
        symbol:"argList";
        
        children:[LPAREN_Node,RPAREN_Node];
        parent:SubStmt_Node;
      }
type ArgList_Node = ArgList_Node_0 | ArgList_Node_102;
interface ValueStmt_Node extends BaseSymbolNode {
        symbol:"valueStmt";
        
        children:[Literal_Node];
        parent:ArgCall_Node | Subscript__Node | ArgDefaultValue_Node | Subscript__Node;
      }
interface Literal_Node_0 extends BaseSymbolNode {
        symbol:"literal";
        
        children:[INTEGERLITERAL_Node];
        parent:ValueStmt_Node;
      }
interface Literal_Node_105 extends BaseSymbolNode {
        symbol:"literal";
        
        children:[STRINGLITERAL_Node];
        parent:ValueStmt_Node;
      }
type Literal_Node = Literal_Node_0 | Literal_Node_105;
interface TypeHint_Node_0 extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[TOKEN_1_Node];
        parent:DictionaryCallStmt_Node | VariableSubStmt_Node | Arg_Node;
      }
interface TypeHint_Node_107 extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[TOKEN_2_Node];
        parent:DictionaryCallStmt_Node | VariableSubStmt_Node | Arg_Node;
      }
interface TypeHint_Node_108 extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[TOKEN_3_Node];
        parent:DictionaryCallStmt_Node | VariableSubStmt_Node | Arg_Node;
      }
interface TypeHint_Node_109 extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[TOKEN_0_Node];
        parent:DictionaryCallStmt_Node | VariableSubStmt_Node | Arg_Node;
      }
interface TypeHint_Node_110 extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[TOKEN_4_Node];
        parent:DictionaryCallStmt_Node | VariableSubStmt_Node | Arg_Node;
      }
interface TypeHint_Node_111 extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[$_Node];
        parent:DictionaryCallStmt_Node | VariableSubStmt_Node | Arg_Node;
      }
type TypeHint_Node = TypeHint_Node_0 | TypeHint_Node_107 | TypeHint_Node_108 | TypeHint_Node_109 | TypeHint_Node_110 | TypeHint_Node_111;
interface Arg_Node_0 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_114 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_115 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_116 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_117 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_118 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_119 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_120 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_121 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_122 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_123 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_124 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_125 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_126 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_127 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_128 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_129 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_130 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_131 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_132 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_133 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_134 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_135 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_136 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_137 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_138 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_139 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_140 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_141 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_142 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_143 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_144 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_145 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_146 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_147 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_148 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_149 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_150 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_151 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_152 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_153 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_154 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_155 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_156 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_157 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_158 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_159 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_160 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_161 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_162 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_163 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_164 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_165 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_166 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_167 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_168 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_169 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_170 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_171 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_172 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_173 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_174 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_175 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_176 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_177 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_178 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_179 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_180 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_181 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_182 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_183 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_184 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_185 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_186 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_187 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_188 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_189 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_190 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_191 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_192 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_193 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_194 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_195 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_196 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_197 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_198 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_199 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_200 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_201 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_202 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_203 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_204 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_205 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_206 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_207 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_208 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_209 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_210 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_211 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_212 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_213 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_214 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_215 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_216 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_217 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_218 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_219 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_220 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_221 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_222 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_223 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_224 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_225 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_226 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_227 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_228 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_229 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_230 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_231 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_232 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_233 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_234 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_235 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_236 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_237 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_238 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_239 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_240 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_241 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_242 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_243 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_244 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_245 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_246 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_247 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_248 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_249 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_250 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_251 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_252 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_253 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_254 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_255 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_256 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_257 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_258 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_259 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_260 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_261 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_262 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_263 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_264 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_265 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_266 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_267 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_268 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_269 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_270 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_271 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_272 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_273 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_274 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_275 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_276 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_277 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_278 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_279 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_280 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_281 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_282 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_283 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_284 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_285 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_286 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_287 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_288 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_289 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_290 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_291 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_292 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_293 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_294 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_295 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_296 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_297 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_298 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_299 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_300 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_301 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_302 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_303 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_304 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_305 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_306 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_307 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_308 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_309 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_310 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_311 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_312 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_313 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_314 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_315 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_316 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_317 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_318 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_319 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_320 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_321 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_322 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_323 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_324 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_325 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_326 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_327 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_328 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_329 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_330 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_331 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_332 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_333 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_334 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_335 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_336 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_337 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_338 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_339 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_340 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_341 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_342 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_343 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_344 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_345 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_346 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_347 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_348 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_349 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_350 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_351 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_352 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_353 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_354 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_355 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_356 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_357 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_358 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_359 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_360 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_361 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_362 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_363 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_364 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_365 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_366 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_367 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_368 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node];
        parent:ArgList_Node;
      }
type Arg_Node = Arg_Node_0 | Arg_Node_114 | Arg_Node_115 | Arg_Node_116 | Arg_Node_117 | Arg_Node_118 | Arg_Node_119 | Arg_Node_120 | Arg_Node_121 | Arg_Node_122 | Arg_Node_123 | Arg_Node_124 | Arg_Node_125 | Arg_Node_126 | Arg_Node_127 | Arg_Node_128 | Arg_Node_129 | Arg_Node_130 | Arg_Node_131 | Arg_Node_132 | Arg_Node_133 | Arg_Node_134 | Arg_Node_135 | Arg_Node_136 | Arg_Node_137 | Arg_Node_138 | Arg_Node_139 | Arg_Node_140 | Arg_Node_141 | Arg_Node_142 | Arg_Node_143 | Arg_Node_144 | Arg_Node_145 | Arg_Node_146 | Arg_Node_147 | Arg_Node_148 | Arg_Node_149 | Arg_Node_150 | Arg_Node_151 | Arg_Node_152 | Arg_Node_153 | Arg_Node_154 | Arg_Node_155 | Arg_Node_156 | Arg_Node_157 | Arg_Node_158 | Arg_Node_159 | Arg_Node_160 | Arg_Node_161 | Arg_Node_162 | Arg_Node_163 | Arg_Node_164 | Arg_Node_165 | Arg_Node_166 | Arg_Node_167 | Arg_Node_168 | Arg_Node_169 | Arg_Node_170 | Arg_Node_171 | Arg_Node_172 | Arg_Node_173 | Arg_Node_174 | Arg_Node_175 | Arg_Node_176 | Arg_Node_177 | Arg_Node_178 | Arg_Node_179 | Arg_Node_180 | Arg_Node_181 | Arg_Node_182 | Arg_Node_183 | Arg_Node_184 | Arg_Node_185 | Arg_Node_186 | Arg_Node_187 | Arg_Node_188 | Arg_Node_189 | Arg_Node_190 | Arg_Node_191 | Arg_Node_192 | Arg_Node_193 | Arg_Node_194 | Arg_Node_195 | Arg_Node_196 | Arg_Node_197 | Arg_Node_198 | Arg_Node_199 | Arg_Node_200 | Arg_Node_201 | Arg_Node_202 | Arg_Node_203 | Arg_Node_204 | Arg_Node_205 | Arg_Node_206 | Arg_Node_207 | Arg_Node_208 | Arg_Node_209 | Arg_Node_210 | Arg_Node_211 | Arg_Node_212 | Arg_Node_213 | Arg_Node_214 | Arg_Node_215 | Arg_Node_216 | Arg_Node_217 | Arg_Node_218 | Arg_Node_219 | Arg_Node_220 | Arg_Node_221 | Arg_Node_222 | Arg_Node_223 | Arg_Node_224 | Arg_Node_225 | Arg_Node_226 | Arg_Node_227 | Arg_Node_228 | Arg_Node_229 | Arg_Node_230 | Arg_Node_231 | Arg_Node_232 | Arg_Node_233 | Arg_Node_234 | Arg_Node_235 | Arg_Node_236 | Arg_Node_237 | Arg_Node_238 | Arg_Node_239 | Arg_Node_240 | Arg_Node_241 | Arg_Node_242 | Arg_Node_243 | Arg_Node_244 | Arg_Node_245 | Arg_Node_246 | Arg_Node_247 | Arg_Node_248 | Arg_Node_249 | Arg_Node_250 | Arg_Node_251 | Arg_Node_252 | Arg_Node_253 | Arg_Node_254 | Arg_Node_255 | Arg_Node_256 | Arg_Node_257 | Arg_Node_258 | Arg_Node_259 | Arg_Node_260 | Arg_Node_261 | Arg_Node_262 | Arg_Node_263 | Arg_Node_264 | Arg_Node_265 | Arg_Node_266 | Arg_Node_267 | Arg_Node_268 | Arg_Node_269 | Arg_Node_270 | Arg_Node_271 | Arg_Node_272 | Arg_Node_273 | Arg_Node_274 | Arg_Node_275 | Arg_Node_276 | Arg_Node_277 | Arg_Node_278 | Arg_Node_279 | Arg_Node_280 | Arg_Node_281 | Arg_Node_282 | Arg_Node_283 | Arg_Node_284 | Arg_Node_285 | Arg_Node_286 | Arg_Node_287 | Arg_Node_288 | Arg_Node_289 | Arg_Node_290 | Arg_Node_291 | Arg_Node_292 | Arg_Node_293 | Arg_Node_294 | Arg_Node_295 | Arg_Node_296 | Arg_Node_297 | Arg_Node_298 | Arg_Node_299 | Arg_Node_300 | Arg_Node_301 | Arg_Node_302 | Arg_Node_303 | Arg_Node_304 | Arg_Node_305 | Arg_Node_306 | Arg_Node_307 | Arg_Node_308 | Arg_Node_309 | Arg_Node_310 | Arg_Node_311 | Arg_Node_312 | Arg_Node_313 | Arg_Node_314 | Arg_Node_315 | Arg_Node_316 | Arg_Node_317 | Arg_Node_318 | Arg_Node_319 | Arg_Node_320 | Arg_Node_321 | Arg_Node_322 | Arg_Node_323 | Arg_Node_324 | Arg_Node_325 | Arg_Node_326 | Arg_Node_327 | Arg_Node_328 | Arg_Node_329 | Arg_Node_330 | Arg_Node_331 | Arg_Node_332 | Arg_Node_333 | Arg_Node_334 | Arg_Node_335 | Arg_Node_336 | Arg_Node_337 | Arg_Node_338 | Arg_Node_339 | Arg_Node_340 | Arg_Node_341 | Arg_Node_342 | Arg_Node_343 | Arg_Node_344 | Arg_Node_345 | Arg_Node_346 | Arg_Node_347 | Arg_Node_348 | Arg_Node_349 | Arg_Node_350 | Arg_Node_351 | Arg_Node_352 | Arg_Node_353 | Arg_Node_354 | Arg_Node_355 | Arg_Node_356 | Arg_Node_357 | Arg_Node_358 | Arg_Node_359 | Arg_Node_360 | Arg_Node_361 | Arg_Node_362 | Arg_Node_363 | Arg_Node_364 | Arg_Node_365 | Arg_Node_366 | Arg_Node_367 | Arg_Node_368;
interface ArgDefaultValue_Node extends BaseSymbolNode {
        symbol:"argDefaultValue";
        
        children:[EQ_Node,ValueStmt_Node];
        parent:Arg_Node;
      }
interface AsTypeClause_Node_0 extends BaseSymbolNode {
        symbol:"asTypeClause";
        
        children:[AS_Node,NEW_Node,Type__Node,FieldLength_Node];
        parent:VariableSubStmt_Node | Arg_Node;
      }
interface AsTypeClause_Node_371 extends BaseSymbolNode {
        symbol:"asTypeClause";
        
        children:[AS_Node,NEW_Node,Type__Node];
        parent:VariableSubStmt_Node | Arg_Node;
      }
interface AsTypeClause_Node_372 extends BaseSymbolNode {
        symbol:"asTypeClause";
        
        children:[AS_Node,Type__Node,FieldLength_Node];
        parent:VariableSubStmt_Node | Arg_Node;
      }
interface AsTypeClause_Node_373 extends BaseSymbolNode {
        symbol:"asTypeClause";
        
        children:[AS_Node,Type__Node];
        parent:VariableSubStmt_Node | Arg_Node;
      }
type AsTypeClause_Node = AsTypeClause_Node_0 | AsTypeClause_Node_371 | AsTypeClause_Node_372 | AsTypeClause_Node_373;
interface Type__Node_0 extends BaseSymbolNode {
        symbol:"type_";
        
        children:Array<BaseType_Node | LPAREN_Node | RPAREN_Node>;
        parent:AsTypeClause_Node;
      }
interface Type__Node_375 extends BaseSymbolNode {
        symbol:"type_";
        
        children:[BaseType_Node];
        parent:AsTypeClause_Node;
      }
type Type__Node = Type__Node_0 | Type__Node_375;
interface BaseType_Node_0 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[BOOLEAN_Node];
        parent:Type__Node;
      }
interface BaseType_Node_377 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[BYTE_Node];
        parent:Type__Node;
      }
interface BaseType_Node_378 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[COLLECTION_Node];
        parent:Type__Node;
      }
interface BaseType_Node_379 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[DATE_Node];
        parent:Type__Node;
      }
interface BaseType_Node_380 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[DOUBLE_Node];
        parent:Type__Node;
      }
interface BaseType_Node_381 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[INTEGER_Node];
        parent:Type__Node;
      }
interface BaseType_Node_382 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[LONG_Node];
        parent:Type__Node;
      }
interface BaseType_Node_383 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[SINGLE_Node];
        parent:Type__Node;
      }
interface BaseType_Node_384 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[VARIANT_Node];
        parent:Type__Node;
      }
interface BaseType_Node_385 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[];
        parent:Type__Node;
      }
type BaseType_Node = BaseType_Node_0 | BaseType_Node_377 | BaseType_Node_378 | BaseType_Node_379 | BaseType_Node_380 | BaseType_Node_381 | BaseType_Node_382 | BaseType_Node_383 | BaseType_Node_384 | BaseType_Node_385;
interface FieldLength_Node_0 extends BaseSymbolNode {
        symbol:"fieldLength";
        
        children:[MULT_Node,INTEGERLITERAL_Node];
        parent:AsTypeClause_Node;
      }
interface FieldLength_Node_387 extends BaseSymbolNode {
        symbol:"fieldLength";
        
        children:[MULT_Node,IDENTIFIER_Node];
        parent:AsTypeClause_Node;
      }
type FieldLength_Node = FieldLength_Node_0 | FieldLength_Node_387;
interface $EOF_Node extends BaseTokenNode {
        token:"$EOF";
        parent:AstSymbolNode;
      }
interface $UNKNOWN_Node extends BaseTokenNode {
        token:"$UNKNOWN";
        parent:AstSymbolNode;
      }
interface PRIVATE_Node extends BaseTokenNode {
            token:"PRIVATE";
            parent:Visibility_Node;
          }
interface PUBLIC_Node extends BaseTokenNode {
            token:"PUBLIC";
            parent:Visibility_Node_8;
          }
interface FRIEND_Node extends BaseTokenNode {
            token:"FRIEND";
            parent:Visibility_Node_9;
          }
interface GLOBAL_Node extends BaseTokenNode {
            token:"GLOBAL";
            parent:Visibility_Node_10;
          }
interface STATIC_Node extends BaseTokenNode {
            token:"STATIC";
            parent:SubStmt_Node | VariableStmt_Node;
          }
interface SUB_Node extends BaseTokenNode {
            token:"SUB";
            parent:SubStmt_Node;
          }
interface IDENTIFIER_Node extends BaseTokenNode {
            token:"IDENTIFIER";
            parent:SubStmt_Node | ICS_B_ProcedureCall_Node | DictionaryCallStmt_Node | VariableSubStmt_Node | Arg_Node | FieldLength_Node_387;
          }
interface END_SUB_Node extends BaseTokenNode {
            token:"END_SUB";
            parent:SubStmt_Node;
          }
interface LPAREN_Node extends BaseTokenNode {
            token:"LPAREN";
            parent:ArgCall_Node | ArgList_Node | Arg_Node | Type__Node | VariableSubStmt_Node | ICS_B_ProcedureCall_Node;
          }
interface BYREF_Node extends BaseTokenNode {
            token:"BYREF";
            parent:ArgCall_Node | Arg_Node_241 | Arg_Node_242 | Arg_Node_243 | Arg_Node_244 | Arg_Node_245 | Arg_Node_246 | Arg_Node_247 | Arg_Node_248 | Arg_Node_249 | Arg_Node_250 | Arg_Node_251 | Arg_Node_252 | Arg_Node_253 | Arg_Node_254 | Arg_Node_255 | Arg_Node_256 | Arg_Node_257 | Arg_Node_258 | Arg_Node_259 | Arg_Node_260 | Arg_Node_261 | Arg_Node_262 | Arg_Node_263 | Arg_Node_264 | Arg_Node_265 | Arg_Node_266 | Arg_Node_267 | Arg_Node_268 | Arg_Node_269 | Arg_Node_270 | Arg_Node_271 | Arg_Node_272 | Arg_Node_305 | Arg_Node_306 | Arg_Node_307 | Arg_Node_308 | Arg_Node_309 | Arg_Node_310 | Arg_Node_311 | Arg_Node_312 | Arg_Node_313 | Arg_Node_314 | Arg_Node_315 | Arg_Node_316 | Arg_Node_317 | Arg_Node_318 | Arg_Node_319 | Arg_Node_320 | Arg_Node_321 | Arg_Node_322 | Arg_Node_323 | Arg_Node_324 | Arg_Node_325 | Arg_Node_326 | Arg_Node_327 | Arg_Node_328 | Arg_Node_329 | Arg_Node_330 | Arg_Node_331 | Arg_Node_332 | Arg_Node_333 | Arg_Node_334 | Arg_Node_335 | Arg_Node_336;
          }
interface RPAREN_Node extends BaseTokenNode {
            token:"RPAREN";
            parent:ArgCall_Node | ArgList_Node | Arg_Node | Type__Node | VariableSubStmt_Node | ICS_B_ProcedureCall_Node;
          }
interface BYVAL_Node extends BaseTokenNode {
            token:"BYVAL";
            parent:ArgCall_Node_65 | ArgCall_Node_66 | ArgCall_Node_69 | ArgCall_Node_70 | Arg_Node;
          }
interface PARAMARRAY_Node extends BaseTokenNode {
            token:"PARAMARRAY";
            parent:ArgCall_Node_73 | ArgCall_Node_74 | ArgCall_Node_77 | ArgCall_Node_78 | Arg_Node;
          }
interface TOKEN_0_Node extends BaseTokenNode {
            token:"!";
            parent:DictionaryCallStmt_Node | TypeHint_Node_109;
          }
interface DIM_Node extends BaseTokenNode {
            token:"DIM";
            parent:VariableStmt_Node;
          }
interface WITHEVENTS_Node extends BaseTokenNode {
            token:"WITHEVENTS";
            parent:VariableStmt_Node;
          }
interface INTEGERLITERAL_Node extends BaseTokenNode {
            token:"INTEGERLITERAL";
            parent:Literal_Node | FieldLength_Node;
          }
interface STRINGLITERAL_Node extends BaseTokenNode {
            token:"STRINGLITERAL";
            parent:Literal_Node_105;
          }
interface TOKEN_1_Node extends BaseTokenNode {
            token:"&";
            parent:TypeHint_Node;
          }
interface TOKEN_2_Node extends BaseTokenNode {
            token:"%";
            parent:TypeHint_Node_107;
          }
interface TOKEN_3_Node extends BaseTokenNode {
            token:"#";
            parent:TypeHint_Node_108;
          }
interface TOKEN_4_Node extends BaseTokenNode {
            token:"@";
            parent:TypeHint_Node_110;
          }
interface $_Node extends BaseTokenNode {
            token:"$";
            parent:TypeHint_Node_111;
          }
interface OPTIONAL_Node extends BaseTokenNode {
            token:"OPTIONAL";
            parent:Arg_Node;
          }
interface EQ_Node extends BaseTokenNode {
            token:"EQ";
            parent:ArgDefaultValue_Node;
          }
interface AS_Node extends BaseTokenNode {
            token:"AS";
            parent:AsTypeClause_Node;
          }
interface NEW_Node extends BaseTokenNode {
            token:"NEW";
            parent:AsTypeClause_Node;
          }
interface BOOLEAN_Node extends BaseTokenNode {
            token:"BOOLEAN";
            parent:BaseType_Node;
          }
interface BYTE_Node extends BaseTokenNode {
            token:"BYTE";
            parent:BaseType_Node_377;
          }
interface COLLECTION_Node extends BaseTokenNode {
            token:"COLLECTION";
            parent:BaseType_Node_378;
          }
interface DATE_Node extends BaseTokenNode {
            token:"DATE";
            parent:BaseType_Node_379;
          }
interface DOUBLE_Node extends BaseTokenNode {
            token:"DOUBLE";
            parent:BaseType_Node_380;
          }
interface INTEGER_Node extends BaseTokenNode {
            token:"INTEGER";
            parent:BaseType_Node_381;
          }
interface LONG_Node extends BaseTokenNode {
            token:"LONG";
            parent:BaseType_Node_382;
          }
interface SINGLE_Node extends BaseTokenNode {
            token:"SINGLE";
            parent:BaseType_Node_383;
          }
interface VARIANT_Node extends BaseTokenNode {
            token:"VARIANT";
            parent:BaseType_Node_384;
          }
interface MULT_Node extends BaseTokenNode {
            token:"MULT";
            parent:FieldLength_Node;
          }
interface TOKEN_5_Node extends BaseTokenNode {
            token:",";
            parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_51 | VariableListStmt_Node | Subscripts_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_46 | ArgsCall_Node_51 | VariableListStmt_Node | Subscripts_Node | ArgList_Node;
          }
interface TOKEN_6_Node extends BaseTokenNode {
            token:";";
            parent:ArgsCall_Node_46 | ArgsCall_Node_51 | ArgsCall_Node_56 | ArgsCall_Node_56;
          }
interface TO_Node extends BaseTokenNode {
            token:"TO";
            parent:Subscript__Node;
          }
export type { Progam_Node,ModuleBody_Node,ModuleBodyElement_Node,Visibility_Node,SubStmt_Node,Block_Node,BlockStmt_Node,ImplicitCallStmt_InBlock_Node,ICS_B_ProcedureCall_Node,ArgsCall_Node,ArgCall_Node,DictionaryCallStmt_Node,VariableStmt_Node,VariableListStmt_Node,VariableSubStmt_Node,Subscripts_Node,Subscript__Node,ArgList_Node,ValueStmt_Node,Literal_Node,TypeHint_Node,Arg_Node,ArgDefaultValue_Node,AsTypeClause_Node,Type__Node,BaseType_Node,FieldLength_Node,$EOF_Node,$UNKNOWN_Node,PRIVATE_Node,PUBLIC_Node,FRIEND_Node,GLOBAL_Node,STATIC_Node,SUB_Node,IDENTIFIER_Node,END_SUB_Node,LPAREN_Node,BYREF_Node,RPAREN_Node,BYVAL_Node,PARAMARRAY_Node,TOKEN_0_Node,DIM_Node,WITHEVENTS_Node,INTEGERLITERAL_Node,STRINGLITERAL_Node,TOKEN_1_Node,TOKEN_2_Node,TOKEN_3_Node,TOKEN_4_Node,$_Node,OPTIONAL_Node,EQ_Node,AS_Node,NEW_Node,BOOLEAN_Node,BYTE_Node,COLLECTION_Node,DATE_Node,DOUBLE_Node,INTEGER_Node,LONG_Node,SINGLE_Node,VARIANT_Node,MULT_Node,TOKEN_5_Node,TOKEN_6_Node,TO_Node }