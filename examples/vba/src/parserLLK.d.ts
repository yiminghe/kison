type AstNode = AstSymbolNode | AstTokenNode;

// replace start
type AstSymbolNode = Progam_Node|ModuleBody_Node|ModuleBodyElement_Node|Visibility_Node|SubStmt_Node|FunctionStmt_Node|Block_Node|BlockStmt_Node|ExitStmt_Node|LetStmt_Node|SetStmt_Node|ExplicitCallStmt_Node|ECS_ProcedureCall_Node|ImplicitCallStmt_InBlock_Node|ICS_B_ProcedureCall_Node|ArgsCall_Node|ArgCall_Node|DictionaryCallStmt_Node|VariableStmt_Node|VariableListStmt_Node|VariableSubStmt_Node|Subscripts_Node|Subscript__Node|ArgList_Node|ValueStmt_Node|ImplicitCallStmt_InStmt_Node|ICS_S_ProcedureOrArrayCall_Node|ICS_S_VariableOrProcedureCall_Node|Literal_Node|TypeHint_Node|Arg_Node|ArgDefaultValue_Node|AsTypeClause_Node|Type__Node|BaseType_Node|FieldLength_Node;
type AstTokenNode = $EOF_Node|$UNKNOWN_Node|PRIVATE_Node|PUBLIC_Node|FRIEND_Node|GLOBAL_Node|STATIC_Node|SUB_Node|IDENTIFIER_Node|END_SUB_Node|FUNCTION_Node|END_FUNCTION_Node|EXIT_DO_Node|EXIT_FOR_Node|EXIT_FUNCTION_Node|EXIT_PROPERTY_Node|EXIT_SUB_Node|END_Node|LET_Node|EQ_Node|PLUS_EQ_Node|MINUS_EQ_Node|SET_Node|CALL_Node|LPAREN_Node|BYREF_Node|RPAREN_Node|BYVAL_Node|PARAMARRAY_Node|TOKEN_0_Node|DIM_Node|WITHEVENTS_Node|INTEGERLITERAL_Node|STRINGLITERAL_Node|TOKEN_1_Node|TOKEN_2_Node|TOKEN_3_Node|TOKEN_4_Node|$_Node|OPTIONAL_Node|AS_Node|NEW_Node|BOOLEAN_Node|BYTE_Node|COLLECTION_Node|DATE_Node|DOUBLE_Node|INTEGER_Node|LONG_Node|SINGLE_Node|VARIANT_Node|STRING_Node|MULT_Node|TOKEN_5_Node|TOKEN_6_Node|TO_Node;
type LiteralToken = "ACCESS"|"ADDRESSOF"|"ALIAS"|"AND"|"ATTRIBUTE"|"APPACTIVATE"|"APPEND"|"AS"|"BEGIN"|"BEEP"|"BINARY"|"BOOLEAN"|"BYVAL"|"BYREF"|"BYTE"|"CALL"|"CASE"|"CHDIR"|"CHDRIVE"|"CLASS"|"CLOSE"|"COLLECTION"|"CONST"|"DATABASE"|"DATE"|"DECLARE"|"DEFBOOL"|"DEFBYTE"|"DEFDATE"|"DEFDBL"|"DEFDEC"|"DEFCUR"|"DEFINT"|"DEFLNG"|"DEFOBJ"|"DEFSNG"|"DEFSTR"|"DEFVAR"|"DELETESETTING"|"DIM"|"DO"|"DOUBLE"|"EACH"|"ELSE"|"ELSEIF"|"END_ENUM"|"END_FUNCTION"|"END_IF"|"END_PROPERTY"|"END_SELECT"|"END_SUB"|"END_TYPE"|"END_WITH"|"END"|"ENUM"|"EQV"|"ERASE"|"ERROR"|"EVENT"|"EXIT_DO"|"EXIT_FOR"|"EXIT_FUNCTION"|"EXIT_PROPERTY"|"EXIT_SUB"|"FALSE"|"FILECOPY"|"FRIEND"|"FOR"|"FUNCTION"|"GET"|"GLOBAL"|"GOSUB"|"GOTO"|"IF"|"IMP"|"IMPLEMENTS"|"IN"|"INPUT"|"IS"|"INTEGER"|"KILL"|"LOAD"|"LOCK"|"LONG"|"LOOP"|"LEN"|"LET"|"LIB"|"LIKE"|"LINE_INPUT"|"LOCK_READ"|"LOCK_WRITE"|"LOCK_READ_WRITE"|"LSET"|"MACRO_CONST"|"MACRO_IF"|"MACRO_ELSEIF"|"MACRO_ELSE"|"MACRO_END_IF"|"ME"|"MID"|"MKDIR"|"MOD"|"NAME"|"NEXT"|"NEW"|"NOT"|"NOTHING"|"NULL"|"ON"|"ON_ERROR"|"ON_LOCAL_ERROR"|"OPEN"|"OPTIONAL"|"OPTION_BASE"|"OPTION_EXPLICIT"|"OPTION_COMPARE"|"OPTION_PRIVATE_MODULE"|"OR"|"OUTPUT"|"PARAMARRAY"|"PRESERVE"|"PRINT"|"PRIVATE"|"PROPERTY_GET"|"PROPERTY_LET"|"PROPERTY_SET"|"PTRSAFE"|"PUBLIC"|"PUT"|"RANDOM"|"RANDOMIZE"|"RAISEEVENT"|"READ"|"READ_WRITE"|"REDIM"|"RESET"|"RESUME"|"RETURN"|"RMDIR"|"RSET"|"SAVEPICTURE"|"SAVESETTING"|"SEEK"|"SELECT"|"SENDKEYS"|"SET"|"SETATTR"|"SHARED"|"SINGLE"|"SPC"|"STATIC"|"STEP"|"STOP"|"STRING"|"SUB"|"TAB"|"TEXT"|"THEN"|"TIME"|"TO"|"TRUE"|"TYPE"|"TYPEOF"|"UNLOAD"|"UNLOCK"|"UNTIL"|"VARIANT"|"VERSION"|"WEND"|"WHILE"|"WIDTH"|"WITH"|"WITHEVENTS"|"WRITE"|"XOR"|"AMPERSAND"|"ASSIGN"|"DIV"|"EQ"|"GEQ"|"GT"|"LEQ"|"LPAREN"|"LT"|"MINUS"|"MINUS_EQ"|"MULT"|"NEQ"|"PLUS"|"PLUS_EQ"|"POW"|"RPAREN"|"L_SQUARE_BRACKET"|"R_SQUARE_BRACKET"|"$HIDDEN"|"STRINGLITERAL"|"INTEGERLITERAL"|"IDENTIFIER"|"$"|"$EOF"|"$UNKOWN"|"!"|"&"|"%"|"#"|"@"|","|";";
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
  symbol: string;
  parent?: AstSymbolNode;
  label: string;
  children: AstNode[];
}

interface BaseTokenNode extends Position {
  type: 'token';
  token: string;
  t: string;
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
  t: string;
  recovery?: string;
  token: LiteralToken;
}

interface ParseError {
  errorMessage: string;
  expected: LiteralToken[];
  lexer: Token;
  recovery?: Boolean;
  symbol: AstSymbolNode['symbol'];
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
  AstErrorNode,
  AstRootNode,
  ParseError,
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
interface ModuleBodyElement_Node_0 extends BaseSymbolNode {
        symbol:"moduleBodyElement";
        
        children:[FunctionStmt_Node];
        parent:ModuleBody_Node | ModuleBody_Node;
      }
interface ModuleBodyElement_Node_7 extends BaseSymbolNode {
        symbol:"moduleBodyElement";
        
        children:[SubStmt_Node];
        parent:ModuleBody_Node | ModuleBody_Node;
      }
type ModuleBodyElement_Node = ModuleBodyElement_Node_0 | ModuleBodyElement_Node_7;
interface Visibility_Node_0 extends BaseSymbolNode {
        symbol:"visibility";
        
        children:[PRIVATE_Node];
        parent:SubStmt_Node | FunctionStmt_Node | VariableStmt_Node_178 | VariableStmt_Node_179;
      }
interface Visibility_Node_9 extends BaseSymbolNode {
        symbol:"visibility";
        
        children:[PUBLIC_Node];
        parent:SubStmt_Node | FunctionStmt_Node | VariableStmt_Node_178 | VariableStmt_Node_179;
      }
interface Visibility_Node_10 extends BaseSymbolNode {
        symbol:"visibility";
        
        children:[FRIEND_Node];
        parent:SubStmt_Node | FunctionStmt_Node | VariableStmt_Node_178 | VariableStmt_Node_179;
      }
interface Visibility_Node_11 extends BaseSymbolNode {
        symbol:"visibility";
        
        children:[GLOBAL_Node];
        parent:SubStmt_Node | FunctionStmt_Node | VariableStmt_Node_178 | VariableStmt_Node_179;
      }
type Visibility_Node = Visibility_Node_0 | Visibility_Node_9 | Visibility_Node_10 | Visibility_Node_11;
interface SubStmt_Node_0 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,STATIC_Node,SUB_Node,IDENTIFIER_Node,ArgList_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_7;
      }
interface SubStmt_Node_13 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,STATIC_Node,SUB_Node,IDENTIFIER_Node,ArgList_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_7;
      }
interface SubStmt_Node_14 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,STATIC_Node,SUB_Node,IDENTIFIER_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_7;
      }
interface SubStmt_Node_15 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,STATIC_Node,SUB_Node,IDENTIFIER_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_7;
      }
interface SubStmt_Node_16 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,SUB_Node,IDENTIFIER_Node,ArgList_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_7;
      }
interface SubStmt_Node_17 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,SUB_Node,IDENTIFIER_Node,ArgList_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_7;
      }
interface SubStmt_Node_18 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,SUB_Node,IDENTIFIER_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_7;
      }
interface SubStmt_Node_19 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,SUB_Node,IDENTIFIER_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_7;
      }
interface SubStmt_Node_20 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[STATIC_Node,SUB_Node,IDENTIFIER_Node,ArgList_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_7;
      }
interface SubStmt_Node_21 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[STATIC_Node,SUB_Node,IDENTIFIER_Node,ArgList_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_7;
      }
interface SubStmt_Node_22 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[STATIC_Node,SUB_Node,IDENTIFIER_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_7;
      }
interface SubStmt_Node_23 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[STATIC_Node,SUB_Node,IDENTIFIER_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_7;
      }
interface SubStmt_Node_24 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[SUB_Node,IDENTIFIER_Node,ArgList_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_7;
      }
interface SubStmt_Node_25 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[SUB_Node,IDENTIFIER_Node,ArgList_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_7;
      }
interface SubStmt_Node_26 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[SUB_Node,IDENTIFIER_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_7;
      }
interface SubStmt_Node_27 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[SUB_Node,IDENTIFIER_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_7;
      }
type SubStmt_Node = SubStmt_Node_0 | SubStmt_Node_13 | SubStmt_Node_14 | SubStmt_Node_15 | SubStmt_Node_16 | SubStmt_Node_17 | SubStmt_Node_18 | SubStmt_Node_19 | SubStmt_Node_20 | SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_23 | SubStmt_Node_24 | SubStmt_Node_25 | SubStmt_Node_26 | SubStmt_Node_27;
interface FunctionStmt_Node_0 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,ArgList_Node,AsTypeClause_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_29 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,ArgList_Node,AsTypeClause_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_30 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,ArgList_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_31 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,ArgList_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_32 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_33 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_34 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_35 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_36 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,ArgList_Node,AsTypeClause_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_37 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,ArgList_Node,AsTypeClause_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_38 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,ArgList_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_39 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,ArgList_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_40 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,AsTypeClause_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_41 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,AsTypeClause_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_42 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_43 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_44 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,ArgList_Node,AsTypeClause_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_45 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,ArgList_Node,AsTypeClause_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_46 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,ArgList_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_47 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,ArgList_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_48 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_49 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_50 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_51 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_52 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,IDENTIFIER_Node,ArgList_Node,AsTypeClause_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_53 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,IDENTIFIER_Node,ArgList_Node,AsTypeClause_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_54 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,IDENTIFIER_Node,ArgList_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_55 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,IDENTIFIER_Node,ArgList_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_56 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,IDENTIFIER_Node,AsTypeClause_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_57 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,IDENTIFIER_Node,AsTypeClause_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_58 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,IDENTIFIER_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_59 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,IDENTIFIER_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_60 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,ArgList_Node,AsTypeClause_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_61 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,ArgList_Node,AsTypeClause_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_62 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,ArgList_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_63 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,ArgList_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_64 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_65 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_66 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_67 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_68 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,ArgList_Node,AsTypeClause_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_69 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,ArgList_Node,AsTypeClause_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_70 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,ArgList_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_71 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,ArgList_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_72 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,AsTypeClause_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_73 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,AsTypeClause_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_74 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_75 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,IDENTIFIER_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_76 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,ArgList_Node,AsTypeClause_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_77 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,ArgList_Node,AsTypeClause_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_78 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,ArgList_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_79 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,ArgList_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_80 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_81 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_82 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_83 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,IDENTIFIER_Node,TypeHint_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_84 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,IDENTIFIER_Node,ArgList_Node,AsTypeClause_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_85 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,IDENTIFIER_Node,ArgList_Node,AsTypeClause_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_86 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,IDENTIFIER_Node,ArgList_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_87 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,IDENTIFIER_Node,ArgList_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_88 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,IDENTIFIER_Node,AsTypeClause_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_89 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,IDENTIFIER_Node,AsTypeClause_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_90 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,IDENTIFIER_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
interface FunctionStmt_Node_91 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,IDENTIFIER_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node;
      }
type FunctionStmt_Node = FunctionStmt_Node_0 | FunctionStmt_Node_29 | FunctionStmt_Node_30 | FunctionStmt_Node_31 | FunctionStmt_Node_32 | FunctionStmt_Node_33 | FunctionStmt_Node_34 | FunctionStmt_Node_35 | FunctionStmt_Node_36 | FunctionStmt_Node_37 | FunctionStmt_Node_38 | FunctionStmt_Node_39 | FunctionStmt_Node_40 | FunctionStmt_Node_41 | FunctionStmt_Node_42 | FunctionStmt_Node_43 | FunctionStmt_Node_44 | FunctionStmt_Node_45 | FunctionStmt_Node_46 | FunctionStmt_Node_47 | FunctionStmt_Node_48 | FunctionStmt_Node_49 | FunctionStmt_Node_50 | FunctionStmt_Node_51 | FunctionStmt_Node_52 | FunctionStmt_Node_53 | FunctionStmt_Node_54 | FunctionStmt_Node_55 | FunctionStmt_Node_56 | FunctionStmt_Node_57 | FunctionStmt_Node_58 | FunctionStmt_Node_59 | FunctionStmt_Node_60 | FunctionStmt_Node_61 | FunctionStmt_Node_62 | FunctionStmt_Node_63 | FunctionStmt_Node_64 | FunctionStmt_Node_65 | FunctionStmt_Node_66 | FunctionStmt_Node_67 | FunctionStmt_Node_68 | FunctionStmt_Node_69 | FunctionStmt_Node_70 | FunctionStmt_Node_71 | FunctionStmt_Node_72 | FunctionStmt_Node_73 | FunctionStmt_Node_74 | FunctionStmt_Node_75 | FunctionStmt_Node_76 | FunctionStmt_Node_77 | FunctionStmt_Node_78 | FunctionStmt_Node_79 | FunctionStmt_Node_80 | FunctionStmt_Node_81 | FunctionStmt_Node_82 | FunctionStmt_Node_83 | FunctionStmt_Node_84 | FunctionStmt_Node_85 | FunctionStmt_Node_86 | FunctionStmt_Node_87 | FunctionStmt_Node_88 | FunctionStmt_Node_89 | FunctionStmt_Node_90 | FunctionStmt_Node_91;
interface Block_Node extends BaseSymbolNode {
        symbol:"block";
        
        children:Array<BlockStmt_Node | BlockStmt_Node>;
        parent:SubStmt_Node | FunctionStmt_Node;
      }
interface BlockStmt_Node_0 extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[ExitStmt_Node];
        parent:Block_Node | Block_Node;
      }
interface BlockStmt_Node_96 extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[VariableStmt_Node];
        parent:Block_Node | Block_Node;
      }
interface BlockStmt_Node_97 extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[ImplicitCallStmt_InBlock_Node];
        parent:Block_Node | Block_Node;
      }
interface BlockStmt_Node_98 extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[ExplicitCallStmt_Node];
        parent:Block_Node | Block_Node;
      }
interface BlockStmt_Node_99 extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[SetStmt_Node];
        parent:Block_Node | Block_Node;
      }
interface BlockStmt_Node_100 extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[LetStmt_Node];
        parent:Block_Node | Block_Node;
      }
type BlockStmt_Node = BlockStmt_Node_0 | BlockStmt_Node_96 | BlockStmt_Node_97 | BlockStmt_Node_98 | BlockStmt_Node_99 | BlockStmt_Node_100;
interface ExitStmt_Node_0 extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[EXIT_DO_Node];
        parent:BlockStmt_Node;
      }
interface ExitStmt_Node_102 extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[EXIT_FOR_Node];
        parent:BlockStmt_Node;
      }
interface ExitStmt_Node_103 extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[EXIT_FUNCTION_Node];
        parent:BlockStmt_Node;
      }
interface ExitStmt_Node_104 extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[EXIT_PROPERTY_Node];
        parent:BlockStmt_Node;
      }
interface ExitStmt_Node_105 extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[EXIT_SUB_Node];
        parent:BlockStmt_Node;
      }
interface ExitStmt_Node_106 extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[END_Node];
        parent:BlockStmt_Node;
      }
type ExitStmt_Node = ExitStmt_Node_0 | ExitStmt_Node_102 | ExitStmt_Node_103 | ExitStmt_Node_104 | ExitStmt_Node_105 | ExitStmt_Node_106;
interface LetStmt_Node_0 extends BaseSymbolNode {
        symbol:"letStmt";
        
        children:[LET_Node,ImplicitCallStmt_InStmt_Node,EQ_Node,ValueStmt_Node];
        parent:BlockStmt_Node_100;
      }
interface LetStmt_Node_108 extends BaseSymbolNode {
        symbol:"letStmt";
        
        children:[ImplicitCallStmt_InStmt_Node,EQ_Node,ValueStmt_Node];
        parent:BlockStmt_Node_100;
      }
interface LetStmt_Node_109 extends BaseSymbolNode {
        symbol:"letStmt";
        
        children:[LET_Node,ImplicitCallStmt_InStmt_Node,PLUS_EQ_Node,ValueStmt_Node];
        parent:BlockStmt_Node_100;
      }
interface LetStmt_Node_110 extends BaseSymbolNode {
        symbol:"letStmt";
        
        children:[ImplicitCallStmt_InStmt_Node,PLUS_EQ_Node,ValueStmt_Node];
        parent:BlockStmt_Node_100;
      }
interface LetStmt_Node_111 extends BaseSymbolNode {
        symbol:"letStmt";
        
        children:[LET_Node,ImplicitCallStmt_InStmt_Node,MINUS_EQ_Node,ValueStmt_Node];
        parent:BlockStmt_Node_100;
      }
interface LetStmt_Node_112 extends BaseSymbolNode {
        symbol:"letStmt";
        
        children:[ImplicitCallStmt_InStmt_Node,MINUS_EQ_Node,ValueStmt_Node];
        parent:BlockStmt_Node_100;
      }
type LetStmt_Node = LetStmt_Node_0 | LetStmt_Node_108 | LetStmt_Node_109 | LetStmt_Node_110 | LetStmt_Node_111 | LetStmt_Node_112;
interface SetStmt_Node extends BaseSymbolNode {
        symbol:"setStmt";
        
        children:[SET_Node,ImplicitCallStmt_InStmt_Node,EQ_Node,ValueStmt_Node];
        parent:BlockStmt_Node_99;
      }
interface ExplicitCallStmt_Node extends BaseSymbolNode {
        symbol:"explicitCallStmt";
        
        children:[ECS_ProcedureCall_Node];
        parent:BlockStmt_Node_98;
      }
interface ECS_ProcedureCall_Node_0 extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:Array<CALL_Node | IDENTIFIER_Node | TypeHint_Node | ArgsCall_Node | LPAREN_Node | RPAREN_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node>;
        parent:ExplicitCallStmt_Node;
      }
interface ECS_ProcedureCall_Node_116 extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:Array<CALL_Node | IDENTIFIER_Node | TypeHint_Node | ArgsCall_Node | LPAREN_Node | RPAREN_Node>;
        parent:ExplicitCallStmt_Node;
      }
interface ECS_ProcedureCall_Node_117 extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:Array<CALL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node>;
        parent:ExplicitCallStmt_Node;
      }
interface ECS_ProcedureCall_Node_118 extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[CALL_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ExplicitCallStmt_Node;
      }
interface ECS_ProcedureCall_Node_119 extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:Array<CALL_Node | IDENTIFIER_Node | ArgsCall_Node | LPAREN_Node | RPAREN_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node>;
        parent:ExplicitCallStmt_Node;
      }
interface ECS_ProcedureCall_Node_120 extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:Array<CALL_Node | IDENTIFIER_Node | ArgsCall_Node | LPAREN_Node | RPAREN_Node>;
        parent:ExplicitCallStmt_Node;
      }
interface ECS_ProcedureCall_Node_121 extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:Array<CALL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node>;
        parent:ExplicitCallStmt_Node;
      }
interface ECS_ProcedureCall_Node_122 extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[CALL_Node,IDENTIFIER_Node];
        parent:ExplicitCallStmt_Node;
      }
type ECS_ProcedureCall_Node = ECS_ProcedureCall_Node_0 | ECS_ProcedureCall_Node_116 | ECS_ProcedureCall_Node_117 | ECS_ProcedureCall_Node_118 | ECS_ProcedureCall_Node_119 | ECS_ProcedureCall_Node_120 | ECS_ProcedureCall_Node_121 | ECS_ProcedureCall_Node_122;
interface ImplicitCallStmt_InBlock_Node extends BaseSymbolNode {
        symbol:"implicitCallStmt_InBlock";
        
        children:[ICS_B_ProcedureCall_Node];
        parent:BlockStmt_Node_97;
      }
interface ICS_B_ProcedureCall_Node_0 extends BaseSymbolNode {
        symbol:"iCS_B_ProcedureCall";
        
        children:Array<IDENTIFIER_Node | ArgsCall_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node>;
        parent:ImplicitCallStmt_InBlock_Node;
      }
interface ICS_B_ProcedureCall_Node_125 extends BaseSymbolNode {
        symbol:"iCS_B_ProcedureCall";
        
        children:[IDENTIFIER_Node,ArgsCall_Node];
        parent:ImplicitCallStmt_InBlock_Node;
      }
interface ICS_B_ProcedureCall_Node_126 extends BaseSymbolNode {
        symbol:"iCS_B_ProcedureCall";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node>;
        parent:ImplicitCallStmt_InBlock_Node;
      }
interface ICS_B_ProcedureCall_Node_127 extends BaseSymbolNode {
        symbol:"iCS_B_ProcedureCall";
        
        children:[IDENTIFIER_Node];
        parent:ImplicitCallStmt_InBlock_Node;
      }
type ICS_B_ProcedureCall_Node = ICS_B_ProcedureCall_Node_0 | ICS_B_ProcedureCall_Node_125 | ICS_B_ProcedureCall_Node_126 | ICS_B_ProcedureCall_Node_127;
interface ArgsCall_Node_0 extends BaseSymbolNode {
        symbol:"argsCall";
        
        children:Array<ArgCall_Node | TOKEN_5_Node | ArgCall_Node | ArgCall_Node | TOKEN_5_Node>;
        parent:ICS_B_ProcedureCall_Node | ICS_S_ProcedureOrArrayCall_Node | ECS_ProcedureCall_Node;
      }
interface ArgsCall_Node_137 extends BaseSymbolNode {
        symbol:"argsCall";
        
        children:Array<TOKEN_5_Node | ArgCall_Node | ArgCall_Node | TOKEN_6_Node | ArgCall_Node>;
        parent:ICS_B_ProcedureCall_Node | ICS_S_ProcedureOrArrayCall_Node | ECS_ProcedureCall_Node;
      }
interface ArgsCall_Node_142 extends BaseSymbolNode {
        symbol:"argsCall";
        
        children:Array<TOKEN_6_Node | ArgCall_Node | ArgCall_Node | TOKEN_5_Node | ArgCall_Node>;
        parent:ICS_B_ProcedureCall_Node | ICS_S_ProcedureOrArrayCall_Node | ECS_ProcedureCall_Node;
      }
interface ArgsCall_Node_147 extends BaseSymbolNode {
        symbol:"argsCall";
        
        children:Array<TOKEN_6_Node | ArgCall_Node | ArgCall_Node | TOKEN_6_Node | ArgCall_Node>;
        parent:ICS_B_ProcedureCall_Node | ICS_S_ProcedureOrArrayCall_Node | ECS_ProcedureCall_Node;
      }
type ArgsCall_Node = ArgsCall_Node_0 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_147;
interface ArgCall_Node_0 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,BYREF_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
      }
interface ArgCall_Node_149 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,BYREF_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
      }
interface ArgCall_Node_150 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
      }
interface ArgCall_Node_151 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
      }
interface ArgCall_Node_152 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[BYREF_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
      }
interface ArgCall_Node_153 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[BYREF_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
      }
interface ArgCall_Node_154 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
      }
interface ArgCall_Node_155 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
      }
interface ArgCall_Node_156 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,BYVAL_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
      }
interface ArgCall_Node_157 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,BYVAL_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
      }
interface ArgCall_Node_158 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
      }
interface ArgCall_Node_159 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
      }
interface ArgCall_Node_160 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[BYVAL_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
      }
interface ArgCall_Node_161 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[BYVAL_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
      }
interface ArgCall_Node_162 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
      }
interface ArgCall_Node_163 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
      }
interface ArgCall_Node_164 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,PARAMARRAY_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
      }
interface ArgCall_Node_165 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,PARAMARRAY_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
      }
interface ArgCall_Node_166 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
      }
interface ArgCall_Node_167 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
      }
interface ArgCall_Node_168 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[PARAMARRAY_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
      }
interface ArgCall_Node_169 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[PARAMARRAY_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
      }
interface ArgCall_Node_170 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
      }
interface ArgCall_Node_171 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[ValueStmt_Node];
        parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
      }
type ArgCall_Node = ArgCall_Node_0 | ArgCall_Node_149 | ArgCall_Node_150 | ArgCall_Node_151 | ArgCall_Node_152 | ArgCall_Node_153 | ArgCall_Node_154 | ArgCall_Node_155 | ArgCall_Node_156 | ArgCall_Node_157 | ArgCall_Node_158 | ArgCall_Node_159 | ArgCall_Node_160 | ArgCall_Node_161 | ArgCall_Node_162 | ArgCall_Node_163 | ArgCall_Node_164 | ArgCall_Node_165 | ArgCall_Node_166 | ArgCall_Node_167 | ArgCall_Node_168 | ArgCall_Node_169 | ArgCall_Node_170 | ArgCall_Node_171;
interface DictionaryCallStmt_Node_0 extends BaseSymbolNode {
        symbol:"dictionaryCallStmt";
        
        children:[TOKEN_0_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ICS_S_ProcedureOrArrayCall_Node | ICS_S_VariableOrProcedureCall_Node;
      }
interface DictionaryCallStmt_Node_173 extends BaseSymbolNode {
        symbol:"dictionaryCallStmt";
        
        children:[TOKEN_0_Node,IDENTIFIER_Node];
        parent:ICS_S_ProcedureOrArrayCall_Node | ICS_S_VariableOrProcedureCall_Node;
      }
interface DictionaryCallStmt_Node_226 extends BaseSymbolNode {
        symbol:"dictionaryCallStmt";
        
        children:[TOKEN_0_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ICS_S_ProcedureOrArrayCall_Node | ICS_S_VariableOrProcedureCall_Node;
      }
interface DictionaryCallStmt_Node_227 extends BaseSymbolNode {
        symbol:"dictionaryCallStmt";
        
        children:[TOKEN_0_Node,IDENTIFIER_Node];
        parent:ICS_S_ProcedureOrArrayCall_Node | ICS_S_VariableOrProcedureCall_Node;
      }
type DictionaryCallStmt_Node = DictionaryCallStmt_Node_0 | DictionaryCallStmt_Node_173 | DictionaryCallStmt_Node_226 | DictionaryCallStmt_Node_227;
interface VariableStmt_Node_0 extends BaseSymbolNode {
        symbol:"variableStmt";
        
        children:[DIM_Node,WITHEVENTS_Node,VariableListStmt_Node];
        parent:BlockStmt_Node_96;
      }
interface VariableStmt_Node_175 extends BaseSymbolNode {
        symbol:"variableStmt";
        
        children:[DIM_Node,VariableListStmt_Node];
        parent:BlockStmt_Node_96;
      }
interface VariableStmt_Node_176 extends BaseSymbolNode {
        symbol:"variableStmt";
        
        children:[STATIC_Node,WITHEVENTS_Node,VariableListStmt_Node];
        parent:BlockStmt_Node_96;
      }
interface VariableStmt_Node_177 extends BaseSymbolNode {
        symbol:"variableStmt";
        
        children:[STATIC_Node,VariableListStmt_Node];
        parent:BlockStmt_Node_96;
      }
interface VariableStmt_Node_178 extends BaseSymbolNode {
        symbol:"variableStmt";
        
        children:[Visibility_Node,WITHEVENTS_Node,VariableListStmt_Node];
        parent:BlockStmt_Node_96;
      }
interface VariableStmt_Node_179 extends BaseSymbolNode {
        symbol:"variableStmt";
        
        children:[Visibility_Node,VariableListStmt_Node];
        parent:BlockStmt_Node_96;
      }
type VariableStmt_Node = VariableStmt_Node_0 | VariableStmt_Node_175 | VariableStmt_Node_176 | VariableStmt_Node_177 | VariableStmt_Node_178 | VariableStmt_Node_179;
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
interface VariableSubStmt_Node_184 extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node | TypeHint_Node>;
        parent:VariableListStmt_Node | VariableListStmt_Node;
      }
interface VariableSubStmt_Node_185 extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node | AsTypeClause_Node>;
        parent:VariableListStmt_Node | VariableListStmt_Node;
      }
interface VariableSubStmt_Node_186 extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node>;
        parent:VariableListStmt_Node | VariableListStmt_Node;
      }
interface VariableSubStmt_Node_187 extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:VariableListStmt_Node | VariableListStmt_Node;
      }
interface VariableSubStmt_Node_188 extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[IDENTIFIER_Node,TypeHint_Node];
        parent:VariableListStmt_Node | VariableListStmt_Node;
      }
interface VariableSubStmt_Node_189 extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[IDENTIFIER_Node,AsTypeClause_Node];
        parent:VariableListStmt_Node | VariableListStmt_Node;
      }
interface VariableSubStmt_Node_190 extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[IDENTIFIER_Node];
        parent:VariableListStmt_Node | VariableListStmt_Node;
      }
type VariableSubStmt_Node = VariableSubStmt_Node_0 | VariableSubStmt_Node_184 | VariableSubStmt_Node_185 | VariableSubStmt_Node_186 | VariableSubStmt_Node_187 | VariableSubStmt_Node_188 | VariableSubStmt_Node_189 | VariableSubStmt_Node_190;
interface Subscripts_Node extends BaseSymbolNode {
        symbol:"subscripts";
        
        children:Array<Subscript__Node | Subscript__Node | TOKEN_5_Node>;
        parent:ECS_ProcedureCall_Node | ICS_B_ProcedureCall_Node | VariableSubStmt_Node | ICS_S_ProcedureOrArrayCall_Node | ICS_S_VariableOrProcedureCall_Node;
      }
interface Subscript__Node_0 extends BaseSymbolNode {
        symbol:"subscript_";
        
        children:Array<ValueStmt_Node | TO_Node | ValueStmt_Node>;
        parent:Subscripts_Node | Subscripts_Node;
      }
interface Subscript__Node_195 extends BaseSymbolNode {
        symbol:"subscript_";
        
        children:[ValueStmt_Node];
        parent:Subscripts_Node | Subscripts_Node;
      }
type Subscript__Node = Subscript__Node_0 | Subscript__Node_195;
interface ArgList_Node_0 extends BaseSymbolNode {
        symbol:"argList";
        
        children:Array<LPAREN_Node | Arg_Node | TOKEN_5_Node | RPAREN_Node>;
        parent:SubStmt_Node | FunctionStmt_Node;
      }
interface ArgList_Node_197 extends BaseSymbolNode {
        symbol:"argList";
        
        children:[LPAREN_Node,RPAREN_Node];
        parent:SubStmt_Node | FunctionStmt_Node;
      }
type ArgList_Node = ArgList_Node_0 | ArgList_Node_197;
interface ValueStmt_Node_0 extends BaseSymbolNode {
        symbol:"valueStmt";
        
        children:[Literal_Node];
        parent:LetStmt_Node | SetStmt_Node | ArgCall_Node | Subscript__Node | ArgDefaultValue_Node | Subscript__Node | BaseType_Node_508;
      }
interface ValueStmt_Node_199 extends BaseSymbolNode {
        symbol:"valueStmt";
        
        children:[ImplicitCallStmt_InStmt_Node];
        parent:LetStmt_Node | SetStmt_Node | ArgCall_Node | Subscript__Node | ArgDefaultValue_Node | Subscript__Node | BaseType_Node_508;
      }
type ValueStmt_Node = ValueStmt_Node_0 | ValueStmt_Node_199;
interface ImplicitCallStmt_InStmt_Node_0 extends BaseSymbolNode {
        symbol:"implicitCallStmt_InStmt";
        
        children:[ICS_S_VariableOrProcedureCall_Node];
        parent:LetStmt_Node | SetStmt_Node | ValueStmt_Node_199;
      }
interface ImplicitCallStmt_InStmt_Node_201 extends BaseSymbolNode {
        symbol:"implicitCallStmt_InStmt";
        
        children:[ICS_S_ProcedureOrArrayCall_Node];
        parent:LetStmt_Node | SetStmt_Node | ValueStmt_Node_199;
      }
type ImplicitCallStmt_InStmt_Node = ImplicitCallStmt_InStmt_Node_0 | ImplicitCallStmt_InStmt_Node_201;
interface ICS_S_ProcedureOrArrayCall_Node_0 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:Array<IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | ArgsCall_Node | RPAREN_Node | DictionaryCallStmt_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node>;
        parent:ImplicitCallStmt_InStmt_Node_201;
      }
interface ICS_S_ProcedureOrArrayCall_Node_203 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[IDENTIFIER_Node,TypeHint_Node,LPAREN_Node,ArgsCall_Node,RPAREN_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node_201;
      }
interface ICS_S_ProcedureOrArrayCall_Node_204 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:Array<IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | ArgsCall_Node | RPAREN_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node>;
        parent:ImplicitCallStmt_InStmt_Node_201;
      }
interface ICS_S_ProcedureOrArrayCall_Node_205 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[IDENTIFIER_Node,TypeHint_Node,LPAREN_Node,ArgsCall_Node,RPAREN_Node];
        parent:ImplicitCallStmt_InStmt_Node_201;
      }
interface ICS_S_ProcedureOrArrayCall_Node_206 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:Array<IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | DictionaryCallStmt_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node>;
        parent:ImplicitCallStmt_InStmt_Node_201;
      }
interface ICS_S_ProcedureOrArrayCall_Node_207 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[IDENTIFIER_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node_201;
      }
interface ICS_S_ProcedureOrArrayCall_Node_208 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:Array<IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node>;
        parent:ImplicitCallStmt_InStmt_Node_201;
      }
interface ICS_S_ProcedureOrArrayCall_Node_209 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[IDENTIFIER_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node];
        parent:ImplicitCallStmt_InStmt_Node_201;
      }
interface ICS_S_ProcedureOrArrayCall_Node_210 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | ArgsCall_Node | RPAREN_Node | DictionaryCallStmt_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node>;
        parent:ImplicitCallStmt_InStmt_Node_201;
      }
interface ICS_S_ProcedureOrArrayCall_Node_211 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[IDENTIFIER_Node,LPAREN_Node,ArgsCall_Node,RPAREN_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node_201;
      }
interface ICS_S_ProcedureOrArrayCall_Node_212 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | ArgsCall_Node | RPAREN_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node>;
        parent:ImplicitCallStmt_InStmt_Node_201;
      }
interface ICS_S_ProcedureOrArrayCall_Node_213 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[IDENTIFIER_Node,LPAREN_Node,ArgsCall_Node,RPAREN_Node];
        parent:ImplicitCallStmt_InStmt_Node_201;
      }
interface ICS_S_ProcedureOrArrayCall_Node_214 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | DictionaryCallStmt_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node>;
        parent:ImplicitCallStmt_InStmt_Node_201;
      }
interface ICS_S_ProcedureOrArrayCall_Node_215 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[IDENTIFIER_Node,LPAREN_Node,RPAREN_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node_201;
      }
interface ICS_S_ProcedureOrArrayCall_Node_216 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node>;
        parent:ImplicitCallStmt_InStmt_Node_201;
      }
interface ICS_S_ProcedureOrArrayCall_Node_217 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[IDENTIFIER_Node,LPAREN_Node,RPAREN_Node];
        parent:ImplicitCallStmt_InStmt_Node_201;
      }
type ICS_S_ProcedureOrArrayCall_Node = ICS_S_ProcedureOrArrayCall_Node_0 | ICS_S_ProcedureOrArrayCall_Node_203 | ICS_S_ProcedureOrArrayCall_Node_204 | ICS_S_ProcedureOrArrayCall_Node_205 | ICS_S_ProcedureOrArrayCall_Node_206 | ICS_S_ProcedureOrArrayCall_Node_207 | ICS_S_ProcedureOrArrayCall_Node_208 | ICS_S_ProcedureOrArrayCall_Node_209 | ICS_S_ProcedureOrArrayCall_Node_210 | ICS_S_ProcedureOrArrayCall_Node_211 | ICS_S_ProcedureOrArrayCall_Node_212 | ICS_S_ProcedureOrArrayCall_Node_213 | ICS_S_ProcedureOrArrayCall_Node_214 | ICS_S_ProcedureOrArrayCall_Node_215 | ICS_S_ProcedureOrArrayCall_Node_216 | ICS_S_ProcedureOrArrayCall_Node_217;
interface ICS_S_VariableOrProcedureCall_Node_0 extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:Array<IDENTIFIER_Node | TypeHint_Node | DictionaryCallStmt_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node>;
        parent:ImplicitCallStmt_InStmt_Node;
      }
interface ICS_S_VariableOrProcedureCall_Node_219 extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[IDENTIFIER_Node,TypeHint_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node;
      }
interface ICS_S_VariableOrProcedureCall_Node_220 extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:Array<IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node>;
        parent:ImplicitCallStmt_InStmt_Node;
      }
interface ICS_S_VariableOrProcedureCall_Node_221 extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[IDENTIFIER_Node,TypeHint_Node];
        parent:ImplicitCallStmt_InStmt_Node;
      }
interface ICS_S_VariableOrProcedureCall_Node_222 extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:Array<IDENTIFIER_Node | DictionaryCallStmt_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node>;
        parent:ImplicitCallStmt_InStmt_Node;
      }
interface ICS_S_VariableOrProcedureCall_Node_223 extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[IDENTIFIER_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node;
      }
interface ICS_S_VariableOrProcedureCall_Node_224 extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | Subscripts_Node>;
        parent:ImplicitCallStmt_InStmt_Node;
      }
interface ICS_S_VariableOrProcedureCall_Node_225 extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[IDENTIFIER_Node];
        parent:ImplicitCallStmt_InStmt_Node;
      }
type ICS_S_VariableOrProcedureCall_Node = ICS_S_VariableOrProcedureCall_Node_0 | ICS_S_VariableOrProcedureCall_Node_219 | ICS_S_VariableOrProcedureCall_Node_220 | ICS_S_VariableOrProcedureCall_Node_221 | ICS_S_VariableOrProcedureCall_Node_222 | ICS_S_VariableOrProcedureCall_Node_223 | ICS_S_VariableOrProcedureCall_Node_224 | ICS_S_VariableOrProcedureCall_Node_225;
interface Literal_Node_0 extends BaseSymbolNode {
        symbol:"literal";
        
        children:[INTEGERLITERAL_Node];
        parent:ValueStmt_Node;
      }
interface Literal_Node_229 extends BaseSymbolNode {
        symbol:"literal";
        
        children:[STRINGLITERAL_Node];
        parent:ValueStmt_Node;
      }
type Literal_Node = Literal_Node_0 | Literal_Node_229;
interface TypeHint_Node_0 extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[TOKEN_1_Node];
        parent:FunctionStmt_Node | ECS_ProcedureCall_Node | DictionaryCallStmt_Node | VariableSubStmt_Node | ICS_S_ProcedureOrArrayCall_Node | ICS_S_VariableOrProcedureCall_Node | Arg_Node;
      }
interface TypeHint_Node_231 extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[TOKEN_2_Node];
        parent:FunctionStmt_Node | ECS_ProcedureCall_Node | DictionaryCallStmt_Node | VariableSubStmt_Node | ICS_S_ProcedureOrArrayCall_Node | ICS_S_VariableOrProcedureCall_Node | Arg_Node;
      }
interface TypeHint_Node_232 extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[TOKEN_3_Node];
        parent:FunctionStmt_Node | ECS_ProcedureCall_Node | DictionaryCallStmt_Node | VariableSubStmt_Node | ICS_S_ProcedureOrArrayCall_Node | ICS_S_VariableOrProcedureCall_Node | Arg_Node;
      }
interface TypeHint_Node_233 extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[TOKEN_0_Node];
        parent:FunctionStmt_Node | ECS_ProcedureCall_Node | DictionaryCallStmt_Node | VariableSubStmt_Node | ICS_S_ProcedureOrArrayCall_Node | ICS_S_VariableOrProcedureCall_Node | Arg_Node;
      }
interface TypeHint_Node_234 extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[TOKEN_4_Node];
        parent:FunctionStmt_Node | ECS_ProcedureCall_Node | DictionaryCallStmt_Node | VariableSubStmt_Node | ICS_S_ProcedureOrArrayCall_Node | ICS_S_VariableOrProcedureCall_Node | Arg_Node;
      }
interface TypeHint_Node_235 extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[$_Node];
        parent:FunctionStmt_Node | ECS_ProcedureCall_Node | DictionaryCallStmt_Node | VariableSubStmt_Node | ICS_S_ProcedureOrArrayCall_Node | ICS_S_VariableOrProcedureCall_Node | Arg_Node;
      }
type TypeHint_Node = TypeHint_Node_0 | TypeHint_Node_231 | TypeHint_Node_232 | TypeHint_Node_233 | TypeHint_Node_234 | TypeHint_Node_235;
interface Arg_Node_0 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_237 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_238 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_239 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_240 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_241 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_242 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_243 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_244 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_245 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_246 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_247 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_248 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_249 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_250 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_251 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_252 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_253 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_254 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_255 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_256 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_257 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_258 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_259 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_260 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_261 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_262 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_263 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYVAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_264 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_265 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_266 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_267 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_268 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_269 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_270 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_271 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_272 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_273 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_274 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_275 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_276 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_277 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_278 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_279 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_280 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_281 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_282 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_283 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_284 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_285 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_286 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_287 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_288 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_289 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_290 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_291 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_292 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_293 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_294 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_295 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_296 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_297 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_298 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_299 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_300 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_301 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_302 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_303 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_304 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_305 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_306 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_307 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_308 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_309 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_310 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_311 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_312 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_313 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_314 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_315 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_316 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_317 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_318 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_319 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_320 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_321 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_322 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_323 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_324 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_325 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_326 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_327 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYVAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_328 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_329 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_330 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_331 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_332 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_333 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_334 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_335 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_336 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_337 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_338 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_339 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_340 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_341 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_342 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_343 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_344 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_345 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_346 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_347 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_348 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_349 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_350 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_351 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_352 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_353 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_354 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_355 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_356 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_357 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_358 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_359 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_360 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_361 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_362 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_363 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_364 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_365 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_366 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_367 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_368 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_369 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_370 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_371 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_372 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_373 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_374 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_375 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_376 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_377 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_378 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_379 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_380 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_381 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_382 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_383 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_384 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_385 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_386 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_387 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_388 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_389 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_390 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_391 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | BYREF_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_392 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_393 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_394 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_395 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_396 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_397 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_398 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_399 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_400 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_401 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_402 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_403 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_404 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_405 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_406 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_407 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_408 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_409 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_410 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_411 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_412 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_413 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_414 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_415 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_416 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_417 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_418 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_419 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_420 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_421 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_422 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_423 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<OPTIONAL_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_424 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_425 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_426 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_427 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_428 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_429 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_430 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_431 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_432 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_433 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_434 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_435 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_436 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_437 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_438 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_439 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_440 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_441 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_442 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_443 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_444 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_445 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_446 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_447 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_448 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_449 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_450 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_451 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_452 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_453 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_454 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_455 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<BYREF_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_456 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_457 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_458 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_459 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_460 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_461 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_462 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_463 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_464 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_465 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_466 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_467 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_468 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_469 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_470 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_471 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<PARAMARRAY_Node | IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_472 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_473 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_474 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_475 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,IDENTIFIER_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_476 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_477 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_478 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_479 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | TypeHint_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_480 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_481 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_482 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_483 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,TypeHint_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_484 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_485 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | AsTypeClause_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_486 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node | ArgDefaultValue_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_487 extends BaseSymbolNode {
        symbol:"arg";
        
        children:Array<IDENTIFIER_Node | LPAREN_Node | RPAREN_Node>;
        parent:ArgList_Node;
      }
interface Arg_Node_488 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_489 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,AsTypeClause_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_490 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node,ArgDefaultValue_Node];
        parent:ArgList_Node;
      }
interface Arg_Node_491 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[IDENTIFIER_Node];
        parent:ArgList_Node;
      }
type Arg_Node = Arg_Node_0 | Arg_Node_237 | Arg_Node_238 | Arg_Node_239 | Arg_Node_240 | Arg_Node_241 | Arg_Node_242 | Arg_Node_243 | Arg_Node_244 | Arg_Node_245 | Arg_Node_246 | Arg_Node_247 | Arg_Node_248 | Arg_Node_249 | Arg_Node_250 | Arg_Node_251 | Arg_Node_252 | Arg_Node_253 | Arg_Node_254 | Arg_Node_255 | Arg_Node_256 | Arg_Node_257 | Arg_Node_258 | Arg_Node_259 | Arg_Node_260 | Arg_Node_261 | Arg_Node_262 | Arg_Node_263 | Arg_Node_264 | Arg_Node_265 | Arg_Node_266 | Arg_Node_267 | Arg_Node_268 | Arg_Node_269 | Arg_Node_270 | Arg_Node_271 | Arg_Node_272 | Arg_Node_273 | Arg_Node_274 | Arg_Node_275 | Arg_Node_276 | Arg_Node_277 | Arg_Node_278 | Arg_Node_279 | Arg_Node_280 | Arg_Node_281 | Arg_Node_282 | Arg_Node_283 | Arg_Node_284 | Arg_Node_285 | Arg_Node_286 | Arg_Node_287 | Arg_Node_288 | Arg_Node_289 | Arg_Node_290 | Arg_Node_291 | Arg_Node_292 | Arg_Node_293 | Arg_Node_294 | Arg_Node_295 | Arg_Node_296 | Arg_Node_297 | Arg_Node_298 | Arg_Node_299 | Arg_Node_300 | Arg_Node_301 | Arg_Node_302 | Arg_Node_303 | Arg_Node_304 | Arg_Node_305 | Arg_Node_306 | Arg_Node_307 | Arg_Node_308 | Arg_Node_309 | Arg_Node_310 | Arg_Node_311 | Arg_Node_312 | Arg_Node_313 | Arg_Node_314 | Arg_Node_315 | Arg_Node_316 | Arg_Node_317 | Arg_Node_318 | Arg_Node_319 | Arg_Node_320 | Arg_Node_321 | Arg_Node_322 | Arg_Node_323 | Arg_Node_324 | Arg_Node_325 | Arg_Node_326 | Arg_Node_327 | Arg_Node_328 | Arg_Node_329 | Arg_Node_330 | Arg_Node_331 | Arg_Node_332 | Arg_Node_333 | Arg_Node_334 | Arg_Node_335 | Arg_Node_336 | Arg_Node_337 | Arg_Node_338 | Arg_Node_339 | Arg_Node_340 | Arg_Node_341 | Arg_Node_342 | Arg_Node_343 | Arg_Node_344 | Arg_Node_345 | Arg_Node_346 | Arg_Node_347 | Arg_Node_348 | Arg_Node_349 | Arg_Node_350 | Arg_Node_351 | Arg_Node_352 | Arg_Node_353 | Arg_Node_354 | Arg_Node_355 | Arg_Node_356 | Arg_Node_357 | Arg_Node_358 | Arg_Node_359 | Arg_Node_360 | Arg_Node_361 | Arg_Node_362 | Arg_Node_363 | Arg_Node_364 | Arg_Node_365 | Arg_Node_366 | Arg_Node_367 | Arg_Node_368 | Arg_Node_369 | Arg_Node_370 | Arg_Node_371 | Arg_Node_372 | Arg_Node_373 | Arg_Node_374 | Arg_Node_375 | Arg_Node_376 | Arg_Node_377 | Arg_Node_378 | Arg_Node_379 | Arg_Node_380 | Arg_Node_381 | Arg_Node_382 | Arg_Node_383 | Arg_Node_384 | Arg_Node_385 | Arg_Node_386 | Arg_Node_387 | Arg_Node_388 | Arg_Node_389 | Arg_Node_390 | Arg_Node_391 | Arg_Node_392 | Arg_Node_393 | Arg_Node_394 | Arg_Node_395 | Arg_Node_396 | Arg_Node_397 | Arg_Node_398 | Arg_Node_399 | Arg_Node_400 | Arg_Node_401 | Arg_Node_402 | Arg_Node_403 | Arg_Node_404 | Arg_Node_405 | Arg_Node_406 | Arg_Node_407 | Arg_Node_408 | Arg_Node_409 | Arg_Node_410 | Arg_Node_411 | Arg_Node_412 | Arg_Node_413 | Arg_Node_414 | Arg_Node_415 | Arg_Node_416 | Arg_Node_417 | Arg_Node_418 | Arg_Node_419 | Arg_Node_420 | Arg_Node_421 | Arg_Node_422 | Arg_Node_423 | Arg_Node_424 | Arg_Node_425 | Arg_Node_426 | Arg_Node_427 | Arg_Node_428 | Arg_Node_429 | Arg_Node_430 | Arg_Node_431 | Arg_Node_432 | Arg_Node_433 | Arg_Node_434 | Arg_Node_435 | Arg_Node_436 | Arg_Node_437 | Arg_Node_438 | Arg_Node_439 | Arg_Node_440 | Arg_Node_441 | Arg_Node_442 | Arg_Node_443 | Arg_Node_444 | Arg_Node_445 | Arg_Node_446 | Arg_Node_447 | Arg_Node_448 | Arg_Node_449 | Arg_Node_450 | Arg_Node_451 | Arg_Node_452 | Arg_Node_453 | Arg_Node_454 | Arg_Node_455 | Arg_Node_456 | Arg_Node_457 | Arg_Node_458 | Arg_Node_459 | Arg_Node_460 | Arg_Node_461 | Arg_Node_462 | Arg_Node_463 | Arg_Node_464 | Arg_Node_465 | Arg_Node_466 | Arg_Node_467 | Arg_Node_468 | Arg_Node_469 | Arg_Node_470 | Arg_Node_471 | Arg_Node_472 | Arg_Node_473 | Arg_Node_474 | Arg_Node_475 | Arg_Node_476 | Arg_Node_477 | Arg_Node_478 | Arg_Node_479 | Arg_Node_480 | Arg_Node_481 | Arg_Node_482 | Arg_Node_483 | Arg_Node_484 | Arg_Node_485 | Arg_Node_486 | Arg_Node_487 | Arg_Node_488 | Arg_Node_489 | Arg_Node_490 | Arg_Node_491;
interface ArgDefaultValue_Node extends BaseSymbolNode {
        symbol:"argDefaultValue";
        
        children:[EQ_Node,ValueStmt_Node];
        parent:Arg_Node;
      }
interface AsTypeClause_Node_0 extends BaseSymbolNode {
        symbol:"asTypeClause";
        
        children:[AS_Node,NEW_Node,Type__Node,FieldLength_Node];
        parent:FunctionStmt_Node | VariableSubStmt_Node | Arg_Node;
      }
interface AsTypeClause_Node_494 extends BaseSymbolNode {
        symbol:"asTypeClause";
        
        children:[AS_Node,NEW_Node,Type__Node];
        parent:FunctionStmt_Node | VariableSubStmt_Node | Arg_Node;
      }
interface AsTypeClause_Node_495 extends BaseSymbolNode {
        symbol:"asTypeClause";
        
        children:[AS_Node,Type__Node,FieldLength_Node];
        parent:FunctionStmt_Node | VariableSubStmt_Node | Arg_Node;
      }
interface AsTypeClause_Node_496 extends BaseSymbolNode {
        symbol:"asTypeClause";
        
        children:[AS_Node,Type__Node];
        parent:FunctionStmt_Node | VariableSubStmt_Node | Arg_Node;
      }
type AsTypeClause_Node = AsTypeClause_Node_0 | AsTypeClause_Node_494 | AsTypeClause_Node_495 | AsTypeClause_Node_496;
interface Type__Node_0 extends BaseSymbolNode {
        symbol:"type_";
        
        children:Array<BaseType_Node | LPAREN_Node | RPAREN_Node>;
        parent:AsTypeClause_Node;
      }
interface Type__Node_498 extends BaseSymbolNode {
        symbol:"type_";
        
        children:[BaseType_Node];
        parent:AsTypeClause_Node;
      }
type Type__Node = Type__Node_0 | Type__Node_498;
interface BaseType_Node_0 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[BOOLEAN_Node];
        parent:Type__Node;
      }
interface BaseType_Node_500 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[BYTE_Node];
        parent:Type__Node;
      }
interface BaseType_Node_501 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[COLLECTION_Node];
        parent:Type__Node;
      }
interface BaseType_Node_502 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[DATE_Node];
        parent:Type__Node;
      }
interface BaseType_Node_503 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[DOUBLE_Node];
        parent:Type__Node;
      }
interface BaseType_Node_504 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[INTEGER_Node];
        parent:Type__Node;
      }
interface BaseType_Node_505 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[LONG_Node];
        parent:Type__Node;
      }
interface BaseType_Node_506 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[SINGLE_Node];
        parent:Type__Node;
      }
interface BaseType_Node_507 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[VARIANT_Node];
        parent:Type__Node;
      }
interface BaseType_Node_508 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:Array<STRING_Node | ValueStmt_Node | MULT_Node>;
        parent:Type__Node;
      }
interface BaseType_Node_509 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[STRING_Node];
        parent:Type__Node;
      }
type BaseType_Node = BaseType_Node_0 | BaseType_Node_500 | BaseType_Node_501 | BaseType_Node_502 | BaseType_Node_503 | BaseType_Node_504 | BaseType_Node_505 | BaseType_Node_506 | BaseType_Node_507 | BaseType_Node_508 | BaseType_Node_509;
interface FieldLength_Node_0 extends BaseSymbolNode {
        symbol:"fieldLength";
        
        children:[MULT_Node,INTEGERLITERAL_Node];
        parent:AsTypeClause_Node;
      }
interface FieldLength_Node_511 extends BaseSymbolNode {
        symbol:"fieldLength";
        
        children:[MULT_Node,IDENTIFIER_Node];
        parent:AsTypeClause_Node;
      }
type FieldLength_Node = FieldLength_Node_0 | FieldLength_Node_511;
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
            parent:Visibility_Node_9;
          }
interface FRIEND_Node extends BaseTokenNode {
            token:"FRIEND";
            parent:Visibility_Node_10;
          }
interface GLOBAL_Node extends BaseTokenNode {
            token:"GLOBAL";
            parent:Visibility_Node_11;
          }
interface STATIC_Node extends BaseTokenNode {
            token:"STATIC";
            parent:SubStmt_Node | FunctionStmt_Node | VariableStmt_Node_176 | VariableStmt_Node_177;
          }
interface SUB_Node extends BaseTokenNode {
            token:"SUB";
            parent:SubStmt_Node;
          }
interface IDENTIFIER_Node extends BaseTokenNode {
            token:"IDENTIFIER";
            parent:SubStmt_Node | FunctionStmt_Node | ECS_ProcedureCall_Node | ICS_B_ProcedureCall_Node | DictionaryCallStmt_Node | VariableSubStmt_Node | ICS_S_ProcedureOrArrayCall_Node | ICS_S_VariableOrProcedureCall_Node | Arg_Node | FieldLength_Node_511;
          }
interface END_SUB_Node extends BaseTokenNode {
            token:"END_SUB";
            parent:SubStmt_Node;
          }
interface FUNCTION_Node extends BaseTokenNode {
            token:"FUNCTION";
            parent:FunctionStmt_Node;
          }
interface END_FUNCTION_Node extends BaseTokenNode {
            token:"END_FUNCTION";
            parent:FunctionStmt_Node;
          }
interface EXIT_DO_Node extends BaseTokenNode {
            token:"EXIT_DO";
            parent:ExitStmt_Node;
          }
interface EXIT_FOR_Node extends BaseTokenNode {
            token:"EXIT_FOR";
            parent:ExitStmt_Node_102;
          }
interface EXIT_FUNCTION_Node extends BaseTokenNode {
            token:"EXIT_FUNCTION";
            parent:ExitStmt_Node_103;
          }
interface EXIT_PROPERTY_Node extends BaseTokenNode {
            token:"EXIT_PROPERTY";
            parent:ExitStmt_Node_104;
          }
interface EXIT_SUB_Node extends BaseTokenNode {
            token:"EXIT_SUB";
            parent:ExitStmt_Node_105;
          }
interface END_Node extends BaseTokenNode {
            token:"END";
            parent:ExitStmt_Node_106;
          }
interface LET_Node extends BaseTokenNode {
            token:"LET";
            parent:LetStmt_Node;
          }
interface EQ_Node extends BaseTokenNode {
            token:"EQ";
            parent:LetStmt_Node | SetStmt_Node | ArgDefaultValue_Node;
          }
interface PLUS_EQ_Node extends BaseTokenNode {
            token:"PLUS_EQ";
            parent:LetStmt_Node_109 | LetStmt_Node_110;
          }
interface MINUS_EQ_Node extends BaseTokenNode {
            token:"MINUS_EQ";
            parent:LetStmt_Node_111 | LetStmt_Node_112;
          }
interface SET_Node extends BaseTokenNode {
            token:"SET";
            parent:SetStmt_Node;
          }
interface CALL_Node extends BaseTokenNode {
            token:"CALL";
            parent:ECS_ProcedureCall_Node;
          }
interface LPAREN_Node extends BaseTokenNode {
            token:"LPAREN";
            parent:ArgCall_Node | ArgList_Node | ICS_S_ProcedureOrArrayCall_Node | ECS_ProcedureCall_Node | ECS_ProcedureCall_Node | ICS_B_ProcedureCall_Node | VariableSubStmt_Node | ICS_S_ProcedureOrArrayCall_Node | ICS_S_VariableOrProcedureCall_Node | Arg_Node | Arg_Node_364 | Arg_Node_365 | Arg_Node_366 | Arg_Node_367 | Arg_Node_372 | Arg_Node_373 | Arg_Node_374 | Arg_Node_375 | Arg_Node_380 | Arg_Node_381 | Arg_Node_382 | Arg_Node_383 | Arg_Node_388 | Arg_Node_389 | Arg_Node_390 | Arg_Node_391 | Arg_Node_396 | Arg_Node_397 | Arg_Node_398 | Arg_Node_399 | Arg_Node_404 | Arg_Node_405 | Arg_Node_406 | Arg_Node_407 | Arg_Node_412 | Arg_Node_413 | Arg_Node_414 | Arg_Node_415 | Arg_Node_420 | Arg_Node_421 | Arg_Node_422 | Arg_Node_423 | Arg_Node_428 | Arg_Node_429 | Arg_Node_430 | Arg_Node_431 | Arg_Node_436 | Arg_Node_437 | Arg_Node_438 | Arg_Node_439 | Arg_Node_444 | Arg_Node_445 | Arg_Node_446 | Arg_Node_447 | Arg_Node_452 | Arg_Node_453 | Arg_Node_454 | Arg_Node_455 | Arg_Node_460 | Arg_Node_461 | Arg_Node_462 | Arg_Node_463 | Arg_Node_468 | Arg_Node_469 | Arg_Node_470 | Arg_Node_471 | Arg_Node_476 | Arg_Node_477 | Arg_Node_478 | Arg_Node_479 | Arg_Node_484 | Arg_Node_485 | Arg_Node_486 | Arg_Node_487 | Type__Node;
          }
interface BYREF_Node extends BaseTokenNode {
            token:"BYREF";
            parent:ArgCall_Node | Arg_Node_364 | Arg_Node_365 | Arg_Node_366 | Arg_Node_367 | Arg_Node_368 | Arg_Node_369 | Arg_Node_370 | Arg_Node_371 | Arg_Node_372 | Arg_Node_373 | Arg_Node_374 | Arg_Node_375 | Arg_Node_376 | Arg_Node_377 | Arg_Node_378 | Arg_Node_379 | Arg_Node_380 | Arg_Node_381 | Arg_Node_382 | Arg_Node_383 | Arg_Node_384 | Arg_Node_385 | Arg_Node_386 | Arg_Node_387 | Arg_Node_388 | Arg_Node_389 | Arg_Node_390 | Arg_Node_391 | Arg_Node_392 | Arg_Node_393 | Arg_Node_394 | Arg_Node_395 | Arg_Node_428 | Arg_Node_429 | Arg_Node_430 | Arg_Node_431 | Arg_Node_432 | Arg_Node_433 | Arg_Node_434 | Arg_Node_435 | Arg_Node_436 | Arg_Node_437 | Arg_Node_438 | Arg_Node_439 | Arg_Node_440 | Arg_Node_441 | Arg_Node_442 | Arg_Node_443 | Arg_Node_444 | Arg_Node_445 | Arg_Node_446 | Arg_Node_447 | Arg_Node_448 | Arg_Node_449 | Arg_Node_450 | Arg_Node_451 | Arg_Node_452 | Arg_Node_453 | Arg_Node_454 | Arg_Node_455 | Arg_Node_456 | Arg_Node_457 | Arg_Node_458 | Arg_Node_459;
          }
interface RPAREN_Node extends BaseTokenNode {
            token:"RPAREN";
            parent:ArgCall_Node | ArgList_Node | ICS_S_ProcedureOrArrayCall_Node | ECS_ProcedureCall_Node | ECS_ProcedureCall_Node | ICS_B_ProcedureCall_Node | VariableSubStmt_Node | ICS_S_ProcedureOrArrayCall_Node | ICS_S_VariableOrProcedureCall_Node | Arg_Node | Arg_Node_364 | Arg_Node_365 | Arg_Node_366 | Arg_Node_367 | Arg_Node_372 | Arg_Node_373 | Arg_Node_374 | Arg_Node_375 | Arg_Node_380 | Arg_Node_381 | Arg_Node_382 | Arg_Node_383 | Arg_Node_388 | Arg_Node_389 | Arg_Node_390 | Arg_Node_391 | Arg_Node_396 | Arg_Node_397 | Arg_Node_398 | Arg_Node_399 | Arg_Node_404 | Arg_Node_405 | Arg_Node_406 | Arg_Node_407 | Arg_Node_412 | Arg_Node_413 | Arg_Node_414 | Arg_Node_415 | Arg_Node_420 | Arg_Node_421 | Arg_Node_422 | Arg_Node_423 | Arg_Node_428 | Arg_Node_429 | Arg_Node_430 | Arg_Node_431 | Arg_Node_436 | Arg_Node_437 | Arg_Node_438 | Arg_Node_439 | Arg_Node_444 | Arg_Node_445 | Arg_Node_446 | Arg_Node_447 | Arg_Node_452 | Arg_Node_453 | Arg_Node_454 | Arg_Node_455 | Arg_Node_460 | Arg_Node_461 | Arg_Node_462 | Arg_Node_463 | Arg_Node_468 | Arg_Node_469 | Arg_Node_470 | Arg_Node_471 | Arg_Node_476 | Arg_Node_477 | Arg_Node_478 | Arg_Node_479 | Arg_Node_484 | Arg_Node_485 | Arg_Node_486 | Arg_Node_487 | Type__Node;
          }
interface BYVAL_Node extends BaseTokenNode {
            token:"BYVAL";
            parent:ArgCall_Node_156 | ArgCall_Node_157 | ArgCall_Node_160 | ArgCall_Node_161 | Arg_Node;
          }
interface PARAMARRAY_Node extends BaseTokenNode {
            token:"PARAMARRAY";
            parent:ArgCall_Node_164 | ArgCall_Node_165 | ArgCall_Node_168 | ArgCall_Node_169 | Arg_Node;
          }
interface TOKEN_0_Node extends BaseTokenNode {
            token:"!";
            parent:DictionaryCallStmt_Node | TypeHint_Node_233;
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
            parent:Literal_Node_229;
          }
interface TOKEN_1_Node extends BaseTokenNode {
            token:"&";
            parent:TypeHint_Node;
          }
interface TOKEN_2_Node extends BaseTokenNode {
            token:"%";
            parent:TypeHint_Node_231;
          }
interface TOKEN_3_Node extends BaseTokenNode {
            token:"#";
            parent:TypeHint_Node_232;
          }
interface TOKEN_4_Node extends BaseTokenNode {
            token:"@";
            parent:TypeHint_Node_234;
          }
interface $_Node extends BaseTokenNode {
            token:"$";
            parent:TypeHint_Node_235;
          }
interface OPTIONAL_Node extends BaseTokenNode {
            token:"OPTIONAL";
            parent:Arg_Node;
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
            parent:BaseType_Node_500;
          }
interface COLLECTION_Node extends BaseTokenNode {
            token:"COLLECTION";
            parent:BaseType_Node_501;
          }
interface DATE_Node extends BaseTokenNode {
            token:"DATE";
            parent:BaseType_Node_502;
          }
interface DOUBLE_Node extends BaseTokenNode {
            token:"DOUBLE";
            parent:BaseType_Node_503;
          }
interface INTEGER_Node extends BaseTokenNode {
            token:"INTEGER";
            parent:BaseType_Node_504;
          }
interface LONG_Node extends BaseTokenNode {
            token:"LONG";
            parent:BaseType_Node_505;
          }
interface SINGLE_Node extends BaseTokenNode {
            token:"SINGLE";
            parent:BaseType_Node_506;
          }
interface VARIANT_Node extends BaseTokenNode {
            token:"VARIANT";
            parent:BaseType_Node_507;
          }
interface STRING_Node extends BaseTokenNode {
            token:"STRING";
            parent:BaseType_Node_508 | BaseType_Node_509;
          }
interface MULT_Node extends BaseTokenNode {
            token:"MULT";
            parent:FieldLength_Node | BaseType_Node_508;
          }
interface TOKEN_5_Node extends BaseTokenNode {
            token:",";
            parent:ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_142 | VariableListStmt_Node | Subscripts_Node | ArgsCall_Node | ArgsCall_Node | ArgsCall_Node_137 | ArgsCall_Node_142 | VariableListStmt_Node | Subscripts_Node | ArgList_Node;
          }
interface TOKEN_6_Node extends BaseTokenNode {
            token:";";
            parent:ArgsCall_Node_137 | ArgsCall_Node_142 | ArgsCall_Node_147 | ArgsCall_Node_147;
          }
interface TO_Node extends BaseTokenNode {
            token:"TO";
            parent:Subscript__Node;
          }
export type AstNodeTypeMap = { ast: AstNode;
$START: $START_Node;
progam: Progam_Node;
zeroMore_moduleBodyElement_1: ZeroMore_moduleBodyElement_1_Node;
moduleBody: ModuleBody_Node;
moduleBodyElement: ModuleBodyElement_Node;
visibility: Visibility_Node;
subStmt: SubStmt_Node;
functionStmt: FunctionStmt_Node;
zeroMore_blockStmt_2: ZeroMore_blockStmt_2_Node;
block: Block_Node;
blockStmt: BlockStmt_Node;
exitStmt: ExitStmt_Node;
letStmt: LetStmt_Node;
setStmt: SetStmt_Node;
explicitCallStmt: ExplicitCallStmt_Node;
eCS_ProcedureCall: ECS_ProcedureCall_Node;
implicitCallStmt_InBlock: ImplicitCallStmt_InBlock_Node;
iCS_B_ProcedureCall: ICS_B_ProcedureCall_Node;
zeroMore_argsCall_33_group_0_3: ZeroMore_argsCall_33_group_0_3_Node;
zeroMore_argsCall_33_group_7_4: ZeroMore_argsCall_33_group_7_4_Node;
argsCall: ArgsCall_Node;
zeroMore_argsCall_34_group_0_5: ZeroMore_argsCall_34_group_0_5_Node;
zeroMore_argsCall_34_group_7_6: ZeroMore_argsCall_34_group_7_6_Node;
zeroMore_argsCall_35_group_0_7: ZeroMore_argsCall_35_group_0_7_Node;
zeroMore_argsCall_35_group_7_8: ZeroMore_argsCall_35_group_7_8_Node;
zeroMore_argsCall_36_group_0_9: ZeroMore_argsCall_36_group_0_9_Node;
zeroMore_argsCall_36_group_7_10: ZeroMore_argsCall_36_group_7_10_Node;
argCall: ArgCall_Node;
dictionaryCallStmt: DictionaryCallStmt_Node;
variableStmt: VariableStmt_Node;
zeroMore_variableListStmt_44_group_1_11: ZeroMore_variableListStmt_44_group_1_11_Node;
variableListStmt: VariableListStmt_Node;
variableSubStmt: VariableSubStmt_Node;
zeroMore_subscripts_46_group_1_12: ZeroMore_subscripts_46_group_1_12_Node;
subscripts: Subscripts_Node;
subscript_: Subscript__Node;
argList: ArgList_Node;
valueStmt: ValueStmt_Node;
implicitCallStmt_InStmt: ImplicitCallStmt_InStmt_Node;
iCS_S_ProcedureOrArrayCall: ICS_S_ProcedureOrArrayCall_Node;
iCS_S_VariableOrProcedureCall: ICS_S_VariableOrProcedureCall_Node;
literal: Literal_Node;
typeHint: TypeHint_Node;
arg: Arg_Node;
argDefaultValue: ArgDefaultValue_Node;
asTypeClause: AsTypeClause_Node;
type_: Type__Node;
baseType: BaseType_Node;
fieldLength: FieldLength_Node;
eCS_ProcedureCall_30_group_3: ECS_ProcedureCall_30_group_3_Node;
eCS_ProcedureCall_30_group_8: ECS_ProcedureCall_30_group_8_Node;
iCS_B_ProcedureCall_32_group_2: ICS_B_ProcedureCall_32_group_2_Node;
argsCall_33_group_0: ArgsCall_33_group_0_Node;
argsCall_33_group_7: ArgsCall_33_group_7_Node;
argsCall_34_group_0: ArgsCall_34_group_0_Node;
argsCall_34_group_7: ArgsCall_34_group_7_Node;
argsCall_35_group_0: ArgsCall_35_group_0_Node;
argsCall_35_group_7: ArgsCall_35_group_7_Node;
argsCall_36_group_0: ArgsCall_36_group_0_Node;
argsCall_36_group_7: ArgsCall_36_group_7_Node;
variableListStmt_44_group_1: VariableListStmt_44_group_1_Node;
variableSubStmt_45_group_1: VariableSubStmt_45_group_1_Node;
subscripts_46_group_1: Subscripts_46_group_1_Node;
subscript__47_group_0: Subscript__47_group_0_Node;
zeroMore_argList_48_group_1_176_group_1_13: ZeroMore_argList_48_group_1_176_group_1_13_Node;
argList_48_group_1: ArgList_48_group_1_Node;
iCS_S_ProcedureOrArrayCall_53_group_6: ICS_S_ProcedureOrArrayCall_53_group_6_Node;
iCS_S_VariableOrProcedureCall_54_group_3: ICS_S_VariableOrProcedureCall_54_group_3_Node;
arg_64_group_7: Arg_64_group_7_Node;
arg_65_group_7: Arg_65_group_7_Node;
type__68_group_1: Type__68_group_1_Node;
baseType_78_group_1: BaseType_78_group_1_Node;
argList_48_group_1_176_group_1: ArgList_48_group_1_176_group_1_Node;
$EOF: $EOF_Node;
$UNKNOWN: $UNKNOWN_Node;
PRIVATE: PRIVATE_Node;
PUBLIC: PUBLIC_Node;
FRIEND: FRIEND_Node;
GLOBAL: GLOBAL_Node;
STATIC: STATIC_Node;
SUB: SUB_Node;
IDENTIFIER: IDENTIFIER_Node;
END_SUB: END_SUB_Node;
FUNCTION: FUNCTION_Node;
END_FUNCTION: END_FUNCTION_Node;
EXIT_DO: EXIT_DO_Node;
EXIT_FOR: EXIT_FOR_Node;
EXIT_FUNCTION: EXIT_FUNCTION_Node;
EXIT_PROPERTY: EXIT_PROPERTY_Node;
EXIT_SUB: EXIT_SUB_Node;
END: END_Node;
LET: LET_Node;
EQ: EQ_Node;
PLUS_EQ: PLUS_EQ_Node;
MINUS_EQ: MINUS_EQ_Node;
SET: SET_Node;
CALL: CALL_Node;
LPAREN: LPAREN_Node;
BYREF: BYREF_Node;
RPAREN: RPAREN_Node;
BYVAL: BYVAL_Node;
PARAMARRAY: PARAMARRAY_Node;
TOKEN_0: TOKEN_0_Node;
DIM: DIM_Node;
WITHEVENTS: WITHEVENTS_Node;
INTEGERLITERAL: INTEGERLITERAL_Node;
STRINGLITERAL: STRINGLITERAL_Node;
TOKEN_1: TOKEN_1_Node;
TOKEN_2: TOKEN_2_Node;
TOKEN_3: TOKEN_3_Node;
TOKEN_4: TOKEN_4_Node;
$: $_Node;
OPTIONAL: OPTIONAL_Node;
AS: AS_Node;
NEW: NEW_Node;
BOOLEAN: BOOLEAN_Node;
BYTE: BYTE_Node;
COLLECTION: COLLECTION_Node;
DATE: DATE_Node;
DOUBLE: DOUBLE_Node;
INTEGER: INTEGER_Node;
LONG: LONG_Node;
SINGLE: SINGLE_Node;
VARIANT: VARIANT_Node;
STRING: STRING_Node;
MULT: MULT_Node;
TOKEN_5: TOKEN_5_Node;
TOKEN_6: TOKEN_6_Node;
TO: TO_Node;
};
export type { Progam_Node,ModuleBody_Node,ModuleBodyElement_Node,Visibility_Node,SubStmt_Node,FunctionStmt_Node,Block_Node,BlockStmt_Node,ExitStmt_Node,LetStmt_Node,SetStmt_Node,ExplicitCallStmt_Node,ECS_ProcedureCall_Node,ImplicitCallStmt_InBlock_Node,ICS_B_ProcedureCall_Node,ArgsCall_Node,ArgCall_Node,DictionaryCallStmt_Node,VariableStmt_Node,VariableListStmt_Node,VariableSubStmt_Node,Subscripts_Node,Subscript__Node,ArgList_Node,ValueStmt_Node,ImplicitCallStmt_InStmt_Node,ICS_S_ProcedureOrArrayCall_Node,ICS_S_VariableOrProcedureCall_Node,Literal_Node,TypeHint_Node,Arg_Node,ArgDefaultValue_Node,AsTypeClause_Node,Type__Node,BaseType_Node,FieldLength_Node,$EOF_Node,$UNKNOWN_Node,PRIVATE_Node,PUBLIC_Node,FRIEND_Node,GLOBAL_Node,STATIC_Node,SUB_Node,IDENTIFIER_Node,END_SUB_Node,FUNCTION_Node,END_FUNCTION_Node,EXIT_DO_Node,EXIT_FOR_Node,EXIT_FUNCTION_Node,EXIT_PROPERTY_Node,EXIT_SUB_Node,END_Node,LET_Node,EQ_Node,PLUS_EQ_Node,MINUS_EQ_Node,SET_Node,CALL_Node,LPAREN_Node,BYREF_Node,RPAREN_Node,BYVAL_Node,PARAMARRAY_Node,TOKEN_0_Node,DIM_Node,WITHEVENTS_Node,INTEGERLITERAL_Node,STRINGLITERAL_Node,TOKEN_1_Node,TOKEN_2_Node,TOKEN_3_Node,TOKEN_4_Node,$_Node,OPTIONAL_Node,AS_Node,NEW_Node,BOOLEAN_Node,BYTE_Node,COLLECTION_Node,DATE_Node,DOUBLE_Node,INTEGER_Node,LONG_Node,SINGLE_Node,VARIANT_Node,STRING_Node,MULT_Node,TOKEN_5_Node,TOKEN_6_Node,TO_Node }