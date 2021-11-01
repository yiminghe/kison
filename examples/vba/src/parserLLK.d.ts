// TODO: improve Tuple type
type Optional<T> = T | undefined;
type OneOrMore<T> = T extends Array<infer U> ? [...T, ...U[]] : [T, ...T[]];
type ZeroOrMore<T> = T extends Array<infer U> ? U[] : T[];

export type AstNode = AstSymbolNode | AstTokenNode;

// replace start
export type AstSymbolNode = Progam_Node|EndOfLine_Node|EndOfStatement_Node|ModuleDeclarations_Node|ModuleDeclarationsElement_Node|ModuleBody_Node|ModuleBodyElement_Node|Visibility_Node|SubStmt_Node|PropertyGetStmt_Node|PropertySetStmt_Node|PropertyLetStmt_Node|FunctionStmt_Node|Block_Node|BlockStmt_Node|EraseStmt_Node|RedimStmt_Node|RedimSubStmt_Node|ExitStmt_Node|LetStmt_Node|SetStmt_Node|ExplicitCallStmt_Node|ECS_MemberProcedureCall_Node|ECS_ProcedureCall_Node|ImplicitCallStmt_InBlock_Node|ICS_B_MemberProcedureCall_Node|ICS_B_ProcedureCall_Node|ArgsCall_Node|ArgCall_Node|VariableStmt_Node|VariableListStmt_Node|VariableSubStmt_Node|Indexes_Node|Subscript__Node|Subscripts_Node|ArgList_Node|ValueStmt_Node|ImplicitCallStmt_InStmt_Node|ICS_S_MembersCall_Node|ICS_S_MemberCall_Node|ICS_S_ProcedureOrArrayCall_Node|ICS_S_VariableOrProcedureCall_Node|DictionaryCallStmt_Node|Literal_Node|TypeHint_Node|Arg_Node|ArgDefaultValue_Node|AsTypeClause_Node|Type__Node|ComplexType_Node|BaseType_Node|FieldLength_Node|AmbiguousIdentifier_Node;
export type AstTokenNode = $EOF_Node|$UNKNOWN_Node|NEWLINE_Node|COMMENT_Node|REMCOMMENT_Node|COLON_Node|PRIVATE_Node|PUBLIC_Node|FRIEND_Node|GLOBAL_Node|STATIC_Node|SUB_Node|END_SUB_Node|PROPERTY_GET_Node|LPAREN_Node|RPAREN_Node|END_PROPERTY_Node|PROPERTY_SET_Node|PROPERTY_LET_Node|FUNCTION_Node|END_FUNCTION_Node|ERASE_Node|REDIM_Node|PRESERVE_Node|EXIT_DO_Node|EXIT_FOR_Node|EXIT_FUNCTION_Node|EXIT_PROPERTY_Node|EXIT_SUB_Node|END_Node|LET_Node|EQ_Node|PLUS_EQ_Node|MINUS_EQ_Node|SET_Node|CALL_Node|TOKEN_0_Node|BYREF_Node|BYVAL_Node|PARAMARRAY_Node|DIM_Node|WITHEVENTS_Node|TOKEN_1_Node|INTEGERLITERAL_Node|STRINGLITERAL_Node|TOKEN_2_Node|TOKEN_3_Node|TOKEN_4_Node|TOKEN_5_Node|$_Node|OPTIONAL_Node|AS_Node|NEW_Node|BOOLEAN_Node|BYTE_Node|COLLECTION_Node|DOUBLE_Node|INTEGER_Node|LONG_Node|SINGLE_Node|VARIANT_Node|STRING_Node|MULT_Node|IDENTIFIER_Node|TOKEN_6_Node|TO_Node;
export type LiteralToken = "ACCESS"|"ADDRESSOF"|"ALIAS"|"AND"|"ATTRIBUTE"|"APPACTIVATE"|"APPEND"|"AS"|"BEGIN"|"BEEP"|"BINARY"|"BOOLEAN"|"BYVAL"|"BYREF"|"BYTE"|"CALL"|"CASE"|"CHDIR"|"CHDRIVE"|"CLASS"|"CLOSE"|"COLLECTION"|"CONST"|"DATABASE"|"DECLARE"|"DEFBOOL"|"DEFBYTE"|"DEFDATE"|"DEFDBL"|"DEFDEC"|"DEFCUR"|"DEFINT"|"DEFLNG"|"DEFOBJ"|"DEFSNG"|"DEFSTR"|"DEFVAR"|"DELETESETTING"|"DIM"|"DO"|"DOUBLE"|"EACH"|"ELSE"|"ELSEIF"|"END_ENUM"|"END_FUNCTION"|"END_IF"|"END_PROPERTY"|"END_SELECT"|"END_SUB"|"END_TYPE"|"END_WITH"|"END"|"ENUM"|"EQV"|"ERASE"|"ERROR"|"EVENT"|"EXIT_DO"|"EXIT_FOR"|"EXIT_FUNCTION"|"EXIT_PROPERTY"|"EXIT_SUB"|"FALSE"|"FILECOPY"|"FRIEND"|"FOR"|"FUNCTION"|"GET"|"GLOBAL"|"GOSUB"|"GOTO"|"IF"|"IMP"|"IMPLEMENTS"|"IN"|"INPUT"|"IS"|"INTEGER"|"KILL"|"LOAD"|"LOCK"|"LONG"|"LOOP"|"LEN"|"LET"|"LIB"|"LIKE"|"LINE_INPUT"|"LOCK_READ"|"LOCK_WRITE"|"LOCK_READ_WRITE"|"LSET"|"MACRO_CONST"|"MACRO_IF"|"MACRO_ELSEIF"|"MACRO_ELSE"|"MACRO_END_IF"|"ME"|"MID"|"MKDIR"|"MOD"|"NAME"|"NEXT"|"NEW"|"NOT"|"NOTHING"|"NULL"|"ON"|"ON_ERROR"|"ON_LOCAL_ERROR"|"OPEN"|"OPTIONAL"|"OPTION_BASE"|"OPTION_EXPLICIT"|"OPTION_COMPARE"|"OPTION_PRIVATE_MODULE"|"OR"|"OUTPUT"|"PARAMARRAY"|"PRESERVE"|"PRIVATE"|"PROPERTY_GET"|"PROPERTY_LET"|"PROPERTY_SET"|"PTRSAFE"|"PUBLIC"|"PUT"|"RANDOM"|"RANDOMIZE"|"RAISEEVENT"|"READ"|"READ_WRITE"|"REDIM"|"RESET"|"RESUME"|"RETURN"|"RMDIR"|"RSET"|"SAVEPICTURE"|"SAVESETTING"|"SEEK"|"SELECT"|"SENDKEYS"|"SET"|"SETATTR"|"SHARED"|"SINGLE"|"SPC"|"STATIC"|"STEP"|"STOP"|"STRING"|"SUB"|"TAB"|"TEXT"|"THEN"|"TIME"|"TO"|"TRUE"|"TYPE"|"TYPEOF"|"UNLOAD"|"UNLOCK"|"UNTIL"|"VARIANT"|"VERSION"|"WEND"|"WHILE"|"WIDTH"|"WITH"|"WITHEVENTS"|"WRITE"|"XOR"|"COLON"|"AMPERSAND"|"ASSIGN"|"DIV"|"EQ"|"GEQ"|"GT"|"LEQ"|"LPAREN"|"LT"|"MINUS"|"MINUS_EQ"|"MULT"|"NEQ"|"PLUS"|"PLUS_EQ"|"POW"|"RPAREN"|"L_SQUARE_BRACKET"|"R_SQUARE_BRACKET"|"NEWLINE"|"REMCOMMENT"|"COMMENT"|"$HIDDEN"|"STRINGLITERAL"|"INTEGERLITERAL"|"IDENTIFIER"|"$"|"$EOF"|"$UNKNOWN"|"."|"!"|"&"|"%"|"#"|"@"|",";
export type AstRootNode = Progam_Node;
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

        type ModuleDeclarations_8_group_1_Parent_Node = ModuleDeclarations_Node;
        

        type ModuleBody_10_group_1_Parent_Node = ModuleBody_Node;
        

        type Block_25_group_1_Parent_Node = Block_Node;
        

        type EraseStmt_34_group_2_Parent_Node = EraseStmt_Node|Indexes_Node;
        

        type RedimStmt_35_group_3_Parent_Node = RedimStmt_Node_175|RedimStmt_Node_176;
        

        type ECS_MemberProcedureCall_49_group_5_Parent_Node = ECS_MemberProcedureCall_Node_194|ECS_MemberProcedureCall_Node_195|ECS_MemberProcedureCall_Node_198|ECS_MemberProcedureCall_Node_199|ECS_MemberProcedureCall_Node_202|ECS_MemberProcedureCall_Node_203|ECS_MemberProcedureCall_Node_206|ECS_MemberProcedureCall_Node_207|ECS_ProcedureCall_Node_210|ECS_ProcedureCall_Node_211|ECS_ProcedureCall_Node_214|ECS_ProcedureCall_Node_215;
        

        type ECS_MemberProcedureCall_49_group_10_Parent_Node = ECS_MemberProcedureCall_Node_194|ECS_MemberProcedureCall_Node_196|ECS_MemberProcedureCall_Node_198|ECS_MemberProcedureCall_Node_200|ECS_MemberProcedureCall_Node_202|ECS_MemberProcedureCall_Node_204|ECS_MemberProcedureCall_Node_206|ECS_MemberProcedureCall_Node_208|ECS_ProcedureCall_Node_210|ECS_ProcedureCall_Node_212|ECS_ProcedureCall_Node_214|ECS_ProcedureCall_Node_216|ICS_B_MemberProcedureCall_Node_220|ICS_B_MemberProcedureCall_Node_222|ICS_B_MemberProcedureCall_Node_224|ICS_B_MemberProcedureCall_Node_226|ICS_B_MemberProcedureCall_Node_228|ICS_B_MemberProcedureCall_Node_230|ICS_B_MemberProcedureCall_Node_232|ICS_B_MemberProcedureCall_Node_234|ICS_S_MembersCall_Node_294|ICS_S_MembersCall_Node_296|ICS_S_MembersCall_Node_298|ICS_S_MembersCall_Node_300|ICS_S_MembersCall_Node_302|ICS_S_MembersCall_Node_304|ICS_S_MembersCall_Node_306|ICS_S_MembersCall_Node_308|ICS_S_ProcedureOrArrayCall_Node_314|ICS_S_ProcedureOrArrayCall_Node_316|ICS_S_ProcedureOrArrayCall_Node_318|ICS_S_ProcedureOrArrayCall_Node_320|ICS_S_ProcedureOrArrayCall_Node_322|ICS_S_ProcedureOrArrayCall_Node_324|ICS_S_ProcedureOrArrayCall_Node_326|ICS_S_ProcedureOrArrayCall_Node_328|ICS_S_VariableOrProcedureCall_Node_330|ICS_S_VariableOrProcedureCall_Node_332|ICS_S_VariableOrProcedureCall_Node_334|ICS_S_VariableOrProcedureCall_Node_336;
        

        type ICS_B_ProcedureCall_54_group_2_Parent_Node = ICS_B_ProcedureCall_Node_236|ICS_B_ProcedureCall_Node_238;
        

        type ArgsCall_55_group_1_Parent_Node_636 = ArgsCall_Node_240|ArgsCall_Node_241;
        

        type ArgsCall_55_group_1_Parent_Node_637 = ArgsCall_Node_240|ArgsCall_Node_241;
        

        type VariableListStmt_62_group_1_Parent_Node = VariableListStmt_Node;
        

        type VariableSubStmt_63_group_1_Parent_Node_639 = VariableSubStmt_Node_273|VariableSubStmt_Node_274|VariableSubStmt_Node_275|VariableSubStmt_Node_276;
        

        type VariableSubStmt_63_group_1_Parent_Node_640 = VariableSubStmt_Node_273|VariableSubStmt_Node_274|VariableSubStmt_Node_275|VariableSubStmt_Node_276;
        

        type Subscript__65_group_0_Parent_Node = Subscript__Node_282|Subscript__Node_285;
        

        type Subscripts_66_group_1_Parent_Node = Subscripts_Node;
        

        type ArgList_68_group_1_Parent_Node = ArgList_Node_287;
        

        type Arg_91_group_7_Parent_Node = Arg_Node_348|Arg_Node_349|Arg_Node_350|Arg_Node_351|Arg_Node_356|Arg_Node_357|Arg_Node_358|Arg_Node_359|Arg_Node_364|Arg_Node_365|Arg_Node_366|Arg_Node_367|Arg_Node_372|Arg_Node_373|Arg_Node_374|Arg_Node_375|Arg_Node_380|Arg_Node_381|Arg_Node_382|Arg_Node_383|Arg_Node_388|Arg_Node_389|Arg_Node_390|Arg_Node_391|Arg_Node_396|Arg_Node_397|Arg_Node_398|Arg_Node_399|Arg_Node_404|Arg_Node_405|Arg_Node_406|Arg_Node_407|Arg_Node_412|Arg_Node_413|Arg_Node_414|Arg_Node_415|Arg_Node_420|Arg_Node_421|Arg_Node_422|Arg_Node_423|Arg_Node_428|Arg_Node_429|Arg_Node_430|Arg_Node_431|Arg_Node_436|Arg_Node_437|Arg_Node_438|Arg_Node_439|Arg_Node_444|Arg_Node_445|Arg_Node_446|Arg_Node_447|Arg_Node_452|Arg_Node_453|Arg_Node_454|Arg_Node_455|Arg_Node_460|Arg_Node_461|Arg_Node_462|Arg_Node_463|Arg_Node_468|Arg_Node_469|Arg_Node_470|Arg_Node_471|Arg_Node_476|Arg_Node_477|Arg_Node_478|Arg_Node_479|Arg_Node_484|Arg_Node_485|Arg_Node_486|Arg_Node_487|Arg_Node_492|Arg_Node_493|Arg_Node_494|Arg_Node_495|Arg_Node_500|Arg_Node_501|Arg_Node_502|Arg_Node_503|Arg_Node_508|Arg_Node_509|Arg_Node_510|Arg_Node_511|Arg_Node_516|Arg_Node_517|Arg_Node_518|Arg_Node_519|Arg_Node_524|Arg_Node_525|Arg_Node_526|Arg_Node_527|Arg_Node_532|Arg_Node_533|Arg_Node_534|Arg_Node_535|Arg_Node_540|Arg_Node_541|Arg_Node_542|Arg_Node_543|Arg_Node_548|Arg_Node_549|Arg_Node_550|Arg_Node_551|Arg_Node_556|Arg_Node_557|Arg_Node_558|Arg_Node_559|Arg_Node_564|Arg_Node_565|Arg_Node_566|Arg_Node_567|Arg_Node_572|Arg_Node_573|Arg_Node_574|Arg_Node_575|Arg_Node_580|Arg_Node_581|Arg_Node_582|Arg_Node_583|Arg_Node_588|Arg_Node_589|Arg_Node_590|Arg_Node_591|Arg_Node_596|Arg_Node_597|Arg_Node_598|Arg_Node_599|Type__Node_609|Type__Node_611;
        

        type ComplexType_97_group_1_Parent_Node = ComplexType_Node_613;
        

        type ComplexType_98_group_1_Parent_Node = ComplexType_Node_614;
        

        type BaseType_107_group_1_Parent_Node = BaseType_Node_623;
        

        type ArgList_68_group_1_234_group_1_Parent_Node = ArgList_68_group_1_Parent_Node;
        
interface Progam_Node_0 extends BaseSymbolNode {
        symbol:"progam";
        
        children:[ModuleDeclarations_Node,...ZeroOrMore<EndOfLine_Node>,ModuleBody_Node,...ZeroOrMore<EndOfLine_Node>];
        
      }
interface Progam_Node_1 extends BaseSymbolNode {
        symbol:"progam";
        
        children:[ModuleDeclarations_Node,...ZeroOrMore<EndOfLine_Node>,...ZeroOrMore<EndOfLine_Node>];
        
      }
interface Progam_Node_2 extends BaseSymbolNode {
        symbol:"progam";
        
        children:[...ZeroOrMore<EndOfLine_Node>,ModuleBody_Node,...ZeroOrMore<EndOfLine_Node>];
        
      }
interface Progam_Node_3 extends BaseSymbolNode {
        symbol:"progam";
        
        children:[...ZeroOrMore<EndOfLine_Node>,...ZeroOrMore<EndOfLine_Node>];
        
      }
export interface NEWLINE_Node extends BaseTokenNode {
            token:"NEWLINE";
            parent:EndOfLine_Node_4;
          }
interface EndOfLine_Node_4 extends BaseSymbolNode {
        symbol:"endOfLine";
        
        children:[NEWLINE_Node];
        parent:Progam_Node_0 | Progam_Node_1 | Progam_Node_2 | Progam_Node_3 | EndOfStatement_Node_7 | ModuleDeclarations_Node | ModuleBody_Node | ModuleDeclarations_8_group_1_Parent_Node | ModuleBody_10_group_1_Parent_Node;
      }
export interface COMMENT_Node extends BaseTokenNode {
            token:"COMMENT";
            parent:EndOfLine_Node_5;
          }
interface EndOfLine_Node_5 extends BaseSymbolNode {
        symbol:"endOfLine";
        
        children:[COMMENT_Node];
        parent:Progam_Node_0 | Progam_Node_1 | Progam_Node_2 | Progam_Node_3 | EndOfStatement_Node_7 | ModuleDeclarations_Node | ModuleBody_Node | ModuleDeclarations_8_group_1_Parent_Node | ModuleBody_10_group_1_Parent_Node;
      }
export interface REMCOMMENT_Node extends BaseTokenNode {
            token:"REMCOMMENT";
            parent:EndOfLine_Node_6;
          }
interface EndOfLine_Node_6 extends BaseSymbolNode {
        symbol:"endOfLine";
        
        children:[REMCOMMENT_Node];
        parent:Progam_Node_0 | Progam_Node_1 | Progam_Node_2 | Progam_Node_3 | EndOfStatement_Node_7 | ModuleDeclarations_Node | ModuleBody_Node | ModuleDeclarations_8_group_1_Parent_Node | ModuleBody_10_group_1_Parent_Node;
      }
interface EndOfStatement_Node_7 extends BaseSymbolNode {
        symbol:"endOfStatement";
        
        children:[...ZeroOrMore<EndOfLine_Node>];
        parent:SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_23 | SubStmt_Node_24 | SubStmt_Node_25 | SubStmt_Node_26 | SubStmt_Node_27 | SubStmt_Node_28 | SubStmt_Node_29 | SubStmt_Node_30 | SubStmt_Node_31 | SubStmt_Node_32 | SubStmt_Node_33 | SubStmt_Node_34 | SubStmt_Node_35 | SubStmt_Node_36 | PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_52 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_59 | PropertyGetStmt_Node_60 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_66 | PropertyGetStmt_Node_67 | PropertyGetStmt_Node_68 | PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_71 | PropertySetStmt_Node_72 | PropertySetStmt_Node_73 | PropertySetStmt_Node_74 | PropertySetStmt_Node_75 | PropertySetStmt_Node_76 | PropertySetStmt_Node_77 | PropertySetStmt_Node_78 | PropertySetStmt_Node_79 | PropertySetStmt_Node_80 | PropertySetStmt_Node_81 | PropertySetStmt_Node_82 | PropertySetStmt_Node_83 | PropertySetStmt_Node_84 | PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_87 | PropertyLetStmt_Node_88 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_90 | PropertyLetStmt_Node_91 | PropertyLetStmt_Node_92 | PropertyLetStmt_Node_93 | PropertyLetStmt_Node_94 | PropertyLetStmt_Node_95 | PropertyLetStmt_Node_96 | PropertyLetStmt_Node_97 | PropertyLetStmt_Node_98 | PropertyLetStmt_Node_99 | PropertyLetStmt_Node_100 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_115 | FunctionStmt_Node_116 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_127 | FunctionStmt_Node_128 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_131 | FunctionStmt_Node_132 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_143 | FunctionStmt_Node_144 | FunctionStmt_Node_145 | FunctionStmt_Node_146 | FunctionStmt_Node_147 | FunctionStmt_Node_148 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_155 | FunctionStmt_Node_156 | FunctionStmt_Node_157 | FunctionStmt_Node_158 | FunctionStmt_Node_159 | FunctionStmt_Node_160 | FunctionStmt_Node_161 | FunctionStmt_Node_162 | FunctionStmt_Node_163 | FunctionStmt_Node_164 | Block_Node | Block_25_group_1_Parent_Node;
      }
export interface COLON_Node extends BaseTokenNode {
            token:"COLON";
            parent:EndOfStatement_Node_8;
          }
interface EndOfStatement_Node_8 extends BaseSymbolNode {
        symbol:"endOfStatement";
        
        children:[...ZeroOrMore<COLON_Node>];
        parent:SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_23 | SubStmt_Node_24 | SubStmt_Node_25 | SubStmt_Node_26 | SubStmt_Node_27 | SubStmt_Node_28 | SubStmt_Node_29 | SubStmt_Node_30 | SubStmt_Node_31 | SubStmt_Node_32 | SubStmt_Node_33 | SubStmt_Node_34 | SubStmt_Node_35 | SubStmt_Node_36 | PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_52 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_59 | PropertyGetStmt_Node_60 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_66 | PropertyGetStmt_Node_67 | PropertyGetStmt_Node_68 | PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_71 | PropertySetStmt_Node_72 | PropertySetStmt_Node_73 | PropertySetStmt_Node_74 | PropertySetStmt_Node_75 | PropertySetStmt_Node_76 | PropertySetStmt_Node_77 | PropertySetStmt_Node_78 | PropertySetStmt_Node_79 | PropertySetStmt_Node_80 | PropertySetStmt_Node_81 | PropertySetStmt_Node_82 | PropertySetStmt_Node_83 | PropertySetStmt_Node_84 | PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_87 | PropertyLetStmt_Node_88 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_90 | PropertyLetStmt_Node_91 | PropertyLetStmt_Node_92 | PropertyLetStmt_Node_93 | PropertyLetStmt_Node_94 | PropertyLetStmt_Node_95 | PropertyLetStmt_Node_96 | PropertyLetStmt_Node_97 | PropertyLetStmt_Node_98 | PropertyLetStmt_Node_99 | PropertyLetStmt_Node_100 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_115 | FunctionStmt_Node_116 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_127 | FunctionStmt_Node_128 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_131 | FunctionStmt_Node_132 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_143 | FunctionStmt_Node_144 | FunctionStmt_Node_145 | FunctionStmt_Node_146 | FunctionStmt_Node_147 | FunctionStmt_Node_148 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_155 | FunctionStmt_Node_156 | FunctionStmt_Node_157 | FunctionStmt_Node_158 | FunctionStmt_Node_159 | FunctionStmt_Node_160 | FunctionStmt_Node_161 | FunctionStmt_Node_162 | FunctionStmt_Node_163 | FunctionStmt_Node_164 | Block_Node | Block_25_group_1_Parent_Node;
      }
interface ModuleDeclarations_Node extends BaseSymbolNode {
        symbol:"moduleDeclarations";
        
        children:[ModuleDeclarationsElement_Node,...ZeroOrMore<ModuleDeclarations_8_group_1_Node>,...ZeroOrMore<EndOfLine_Node>];
        parent:Progam_Node_0 | Progam_Node_1;
      }
interface ModuleDeclarationsElement_Node extends BaseSymbolNode {
        symbol:"moduleDeclarationsElement";
        
        children:[VariableStmt_Node];
        parent:ModuleDeclarations_Node | ModuleDeclarations_8_group_1_Parent_Node;
      }
interface ModuleBody_Node extends BaseSymbolNode {
        symbol:"moduleBody";
        
        children:[ModuleBodyElement_Node,...ZeroOrMore<ModuleBody_10_group_1_Node>,...ZeroOrMore<EndOfLine_Node>];
        parent:Progam_Node_0 | Progam_Node_2;
      }
interface ModuleBodyElement_Node_12 extends BaseSymbolNode {
        symbol:"moduleBodyElement";
        
        children:[FunctionStmt_Node];
        parent:ModuleBody_Node | ModuleBody_10_group_1_Parent_Node;
      }
interface ModuleBodyElement_Node_13 extends BaseSymbolNode {
        symbol:"moduleBodyElement";
        
        children:[PropertyGetStmt_Node];
        parent:ModuleBody_Node | ModuleBody_10_group_1_Parent_Node;
      }
interface ModuleBodyElement_Node_14 extends BaseSymbolNode {
        symbol:"moduleBodyElement";
        
        children:[PropertySetStmt_Node];
        parent:ModuleBody_Node | ModuleBody_10_group_1_Parent_Node;
      }
interface ModuleBodyElement_Node_15 extends BaseSymbolNode {
        symbol:"moduleBodyElement";
        
        children:[PropertyLetStmt_Node];
        parent:ModuleBody_Node | ModuleBody_10_group_1_Parent_Node;
      }
interface ModuleBodyElement_Node_16 extends BaseSymbolNode {
        symbol:"moduleBodyElement";
        
        children:[SubStmt_Node];
        parent:ModuleBody_Node | ModuleBody_10_group_1_Parent_Node;
      }
export interface PRIVATE_Node extends BaseTokenNode {
            token:"PRIVATE";
            parent:Visibility_Node_17;
          }
interface Visibility_Node_17 extends BaseSymbolNode {
        symbol:"visibility";
        
        children:[PRIVATE_Node];
        parent:SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_23 | SubStmt_Node_24 | SubStmt_Node_25 | SubStmt_Node_26 | SubStmt_Node_27 | SubStmt_Node_28 | PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_52 | PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_71 | PropertySetStmt_Node_72 | PropertySetStmt_Node_73 | PropertySetStmt_Node_74 | PropertySetStmt_Node_75 | PropertySetStmt_Node_76 | PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_87 | PropertyLetStmt_Node_88 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_90 | PropertyLetStmt_Node_91 | PropertyLetStmt_Node_92 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_115 | FunctionStmt_Node_116 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_127 | FunctionStmt_Node_128 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_131 | FunctionStmt_Node_132 | VariableStmt_Node_270 | VariableStmt_Node_271;
      }
export interface PUBLIC_Node extends BaseTokenNode {
            token:"PUBLIC";
            parent:Visibility_Node_18;
          }
interface Visibility_Node_18 extends BaseSymbolNode {
        symbol:"visibility";
        
        children:[PUBLIC_Node];
        parent:SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_23 | SubStmt_Node_24 | SubStmt_Node_25 | SubStmt_Node_26 | SubStmt_Node_27 | SubStmt_Node_28 | PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_52 | PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_71 | PropertySetStmt_Node_72 | PropertySetStmt_Node_73 | PropertySetStmt_Node_74 | PropertySetStmt_Node_75 | PropertySetStmt_Node_76 | PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_87 | PropertyLetStmt_Node_88 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_90 | PropertyLetStmt_Node_91 | PropertyLetStmt_Node_92 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_115 | FunctionStmt_Node_116 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_127 | FunctionStmt_Node_128 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_131 | FunctionStmt_Node_132 | VariableStmt_Node_270 | VariableStmt_Node_271;
      }
export interface FRIEND_Node extends BaseTokenNode {
            token:"FRIEND";
            parent:Visibility_Node_19;
          }
interface Visibility_Node_19 extends BaseSymbolNode {
        symbol:"visibility";
        
        children:[FRIEND_Node];
        parent:SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_23 | SubStmt_Node_24 | SubStmt_Node_25 | SubStmt_Node_26 | SubStmt_Node_27 | SubStmt_Node_28 | PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_52 | PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_71 | PropertySetStmt_Node_72 | PropertySetStmt_Node_73 | PropertySetStmt_Node_74 | PropertySetStmt_Node_75 | PropertySetStmt_Node_76 | PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_87 | PropertyLetStmt_Node_88 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_90 | PropertyLetStmt_Node_91 | PropertyLetStmt_Node_92 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_115 | FunctionStmt_Node_116 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_127 | FunctionStmt_Node_128 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_131 | FunctionStmt_Node_132 | VariableStmt_Node_270 | VariableStmt_Node_271;
      }
export interface GLOBAL_Node extends BaseTokenNode {
            token:"GLOBAL";
            parent:Visibility_Node_20;
          }
interface Visibility_Node_20 extends BaseSymbolNode {
        symbol:"visibility";
        
        children:[GLOBAL_Node];
        parent:SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_23 | SubStmt_Node_24 | SubStmt_Node_25 | SubStmt_Node_26 | SubStmt_Node_27 | SubStmt_Node_28 | PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_52 | PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_71 | PropertySetStmt_Node_72 | PropertySetStmt_Node_73 | PropertySetStmt_Node_74 | PropertySetStmt_Node_75 | PropertySetStmt_Node_76 | PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_87 | PropertyLetStmt_Node_88 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_90 | PropertyLetStmt_Node_91 | PropertyLetStmt_Node_92 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_115 | FunctionStmt_Node_116 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_127 | FunctionStmt_Node_128 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_131 | FunctionStmt_Node_132 | VariableStmt_Node_270 | VariableStmt_Node_271;
      }
export interface STATIC_Node extends BaseTokenNode {
            token:"STATIC";
            parent:SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_23 | SubStmt_Node_24 | SubStmt_Node_29 | SubStmt_Node_30 | SubStmt_Node_31 | SubStmt_Node_32 | PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_59 | PropertyGetStmt_Node_60 | PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_71 | PropertySetStmt_Node_72 | PropertySetStmt_Node_77 | PropertySetStmt_Node_78 | PropertySetStmt_Node_79 | PropertySetStmt_Node_80 | PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_87 | PropertyLetStmt_Node_88 | PropertyLetStmt_Node_93 | PropertyLetStmt_Node_94 | PropertyLetStmt_Node_95 | PropertyLetStmt_Node_96 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_115 | FunctionStmt_Node_116 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_143 | FunctionStmt_Node_144 | FunctionStmt_Node_145 | FunctionStmt_Node_146 | FunctionStmt_Node_147 | FunctionStmt_Node_148 | VariableStmt_Node_268 | VariableStmt_Node_269;
          }
export interface SUB_Node extends BaseTokenNode {
            token:"SUB";
            parent:SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_23 | SubStmt_Node_24 | SubStmt_Node_25 | SubStmt_Node_26 | SubStmt_Node_27 | SubStmt_Node_28 | SubStmt_Node_29 | SubStmt_Node_30 | SubStmt_Node_31 | SubStmt_Node_32 | SubStmt_Node_33 | SubStmt_Node_34 | SubStmt_Node_35 | SubStmt_Node_36;
          }
export interface END_SUB_Node extends BaseTokenNode {
            token:"END_SUB";
            parent:SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_23 | SubStmt_Node_24 | SubStmt_Node_25 | SubStmt_Node_26 | SubStmt_Node_27 | SubStmt_Node_28 | SubStmt_Node_29 | SubStmt_Node_30 | SubStmt_Node_31 | SubStmt_Node_32 | SubStmt_Node_33 | SubStmt_Node_34 | SubStmt_Node_35 | SubStmt_Node_36;
          }
interface SubStmt_Node_21 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,STATIC_Node,SUB_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
interface SubStmt_Node_22 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,STATIC_Node,SUB_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
interface SubStmt_Node_23 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,STATIC_Node,SUB_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
interface SubStmt_Node_24 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,STATIC_Node,SUB_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
interface SubStmt_Node_25 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,SUB_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
interface SubStmt_Node_26 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,SUB_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
interface SubStmt_Node_27 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,SUB_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
interface SubStmt_Node_28 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,SUB_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
interface SubStmt_Node_29 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[STATIC_Node,SUB_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
interface SubStmt_Node_30 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[STATIC_Node,SUB_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
interface SubStmt_Node_31 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[STATIC_Node,SUB_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
interface SubStmt_Node_32 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[STATIC_Node,SUB_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
interface SubStmt_Node_33 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[SUB_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
interface SubStmt_Node_34 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[SUB_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
interface SubStmt_Node_35 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[SUB_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
interface SubStmt_Node_36 extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[SUB_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
export interface PROPERTY_GET_Node extends BaseTokenNode {
            token:"PROPERTY_GET";
            parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_52 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_59 | PropertyGetStmt_Node_60 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_66 | PropertyGetStmt_Node_67 | PropertyGetStmt_Node_68;
          }
export interface LPAREN_Node extends BaseTokenNode {
            token:"LPAREN";
            parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_52 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_59 | PropertyGetStmt_Node_60 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_66 | PropertyGetStmt_Node_67 | PropertyGetStmt_Node_68 | RedimSubStmt_Node_177 | RedimSubStmt_Node_178 | ArgCall_Node_242 | ArgCall_Node_243 | ArgCall_Node_244 | ArgCall_Node_245 | ArgCall_Node_250 | ArgCall_Node_251 | ArgCall_Node_252 | ArgCall_Node_253 | ArgCall_Node_258 | ArgCall_Node_259 | ArgCall_Node_260 | ArgCall_Node_261 | ArgList_Node_287 | ArgList_Node_288 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_316 | ICS_S_ProcedureOrArrayCall_Node_317 | ICS_S_ProcedureOrArrayCall_Node_318 | ICS_S_ProcedureOrArrayCall_Node_319 | ICS_S_ProcedureOrArrayCall_Node_320 | ICS_S_ProcedureOrArrayCall_Node_321 | ICS_S_ProcedureOrArrayCall_Node_322 | ICS_S_ProcedureOrArrayCall_Node_323 | ICS_S_ProcedureOrArrayCall_Node_324 | ICS_S_ProcedureOrArrayCall_Node_325 | ICS_S_ProcedureOrArrayCall_Node_326 | ICS_S_ProcedureOrArrayCall_Node_327 | ICS_S_ProcedureOrArrayCall_Node_328 | ICS_S_ProcedureOrArrayCall_Node_329 | ECS_MemberProcedureCall_49_group_5_Parent_Node | ECS_MemberProcedureCall_49_group_10_Parent_Node | ICS_B_ProcedureCall_54_group_2_Parent_Node | VariableSubStmt_63_group_1_Parent_Node_639 | VariableSubStmt_63_group_1_Parent_Node_640 | Arg_91_group_7_Parent_Node;
          }
export interface RPAREN_Node extends BaseTokenNode {
            token:"RPAREN";
            parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_52 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_59 | PropertyGetStmt_Node_60 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_66 | PropertyGetStmt_Node_67 | PropertyGetStmt_Node_68 | RedimSubStmt_Node_177 | RedimSubStmt_Node_178 | ArgCall_Node_242 | ArgCall_Node_244 | ArgCall_Node_246 | ArgCall_Node_248 | ArgCall_Node_250 | ArgCall_Node_252 | ArgCall_Node_254 | ArgCall_Node_256 | ArgCall_Node_258 | ArgCall_Node_260 | ArgCall_Node_262 | ArgCall_Node_264 | ArgList_Node_287 | ArgList_Node_288 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_316 | ICS_S_ProcedureOrArrayCall_Node_317 | ICS_S_ProcedureOrArrayCall_Node_318 | ICS_S_ProcedureOrArrayCall_Node_319 | ICS_S_ProcedureOrArrayCall_Node_320 | ICS_S_ProcedureOrArrayCall_Node_321 | ICS_S_ProcedureOrArrayCall_Node_322 | ICS_S_ProcedureOrArrayCall_Node_323 | ICS_S_ProcedureOrArrayCall_Node_324 | ICS_S_ProcedureOrArrayCall_Node_325 | ICS_S_ProcedureOrArrayCall_Node_326 | ICS_S_ProcedureOrArrayCall_Node_327 | ICS_S_ProcedureOrArrayCall_Node_328 | ICS_S_ProcedureOrArrayCall_Node_329 | ECS_MemberProcedureCall_49_group_5_Parent_Node | ECS_MemberProcedureCall_49_group_10_Parent_Node | ICS_B_ProcedureCall_54_group_2_Parent_Node | VariableSubStmt_63_group_1_Parent_Node_639 | VariableSubStmt_63_group_1_Parent_Node_640 | Arg_91_group_7_Parent_Node;
          }
export interface END_PROPERTY_Node extends BaseTokenNode {
            token:"END_PROPERTY";
            parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_52 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_59 | PropertyGetStmt_Node_60 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_66 | PropertyGetStmt_Node_67 | PropertyGetStmt_Node_68 | PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_71 | PropertySetStmt_Node_72 | PropertySetStmt_Node_73 | PropertySetStmt_Node_74 | PropertySetStmt_Node_75 | PropertySetStmt_Node_76 | PropertySetStmt_Node_77 | PropertySetStmt_Node_78 | PropertySetStmt_Node_79 | PropertySetStmt_Node_80 | PropertySetStmt_Node_81 | PropertySetStmt_Node_82 | PropertySetStmt_Node_83 | PropertySetStmt_Node_84 | PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_87 | PropertyLetStmt_Node_88 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_90 | PropertyLetStmt_Node_91 | PropertyLetStmt_Node_92 | PropertyLetStmt_Node_93 | PropertyLetStmt_Node_94 | PropertyLetStmt_Node_95 | PropertyLetStmt_Node_96 | PropertyLetStmt_Node_97 | PropertyLetStmt_Node_98 | PropertyLetStmt_Node_99 | PropertyLetStmt_Node_100;
          }
interface PropertyGetStmt_Node_37 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_38 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_39 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_40 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_41 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_42 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_43 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_44 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_45 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_46 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_47 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_48 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_49 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_50 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_51 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_52 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_53 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_54 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_55 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_56 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_57 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_58 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_59 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_60 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_61 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_62 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_63 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_64 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_65 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_66 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_67 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
interface PropertyGetStmt_Node_68 extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
export interface PROPERTY_SET_Node extends BaseTokenNode {
            token:"PROPERTY_SET";
            parent:PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_71 | PropertySetStmt_Node_72 | PropertySetStmt_Node_73 | PropertySetStmt_Node_74 | PropertySetStmt_Node_75 | PropertySetStmt_Node_76 | PropertySetStmt_Node_77 | PropertySetStmt_Node_78 | PropertySetStmt_Node_79 | PropertySetStmt_Node_80 | PropertySetStmt_Node_81 | PropertySetStmt_Node_82 | PropertySetStmt_Node_83 | PropertySetStmt_Node_84;
          }
interface PropertySetStmt_Node_69 extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_SET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
interface PropertySetStmt_Node_70 extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_SET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
interface PropertySetStmt_Node_71 extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_SET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
interface PropertySetStmt_Node_72 extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_SET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
interface PropertySetStmt_Node_73 extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Visibility_Node,PROPERTY_SET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
interface PropertySetStmt_Node_74 extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Visibility_Node,PROPERTY_SET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
interface PropertySetStmt_Node_75 extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Visibility_Node,PROPERTY_SET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
interface PropertySetStmt_Node_76 extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Visibility_Node,PROPERTY_SET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
interface PropertySetStmt_Node_77 extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[STATIC_Node,PROPERTY_SET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
interface PropertySetStmt_Node_78 extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[STATIC_Node,PROPERTY_SET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
interface PropertySetStmt_Node_79 extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[STATIC_Node,PROPERTY_SET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
interface PropertySetStmt_Node_80 extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[STATIC_Node,PROPERTY_SET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
interface PropertySetStmt_Node_81 extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[PROPERTY_SET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
interface PropertySetStmt_Node_82 extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[PROPERTY_SET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
interface PropertySetStmt_Node_83 extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[PROPERTY_SET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
interface PropertySetStmt_Node_84 extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[PROPERTY_SET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
export interface PROPERTY_LET_Node extends BaseTokenNode {
            token:"PROPERTY_LET";
            parent:PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_87 | PropertyLetStmt_Node_88 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_90 | PropertyLetStmt_Node_91 | PropertyLetStmt_Node_92 | PropertyLetStmt_Node_93 | PropertyLetStmt_Node_94 | PropertyLetStmt_Node_95 | PropertyLetStmt_Node_96 | PropertyLetStmt_Node_97 | PropertyLetStmt_Node_98 | PropertyLetStmt_Node_99 | PropertyLetStmt_Node_100;
          }
interface PropertyLetStmt_Node_85 extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_LET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
interface PropertyLetStmt_Node_86 extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_LET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
interface PropertyLetStmt_Node_87 extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_LET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
interface PropertyLetStmt_Node_88 extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_LET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
interface PropertyLetStmt_Node_89 extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Visibility_Node,PROPERTY_LET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
interface PropertyLetStmt_Node_90 extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Visibility_Node,PROPERTY_LET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
interface PropertyLetStmt_Node_91 extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Visibility_Node,PROPERTY_LET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
interface PropertyLetStmt_Node_92 extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Visibility_Node,PROPERTY_LET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
interface PropertyLetStmt_Node_93 extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[STATIC_Node,PROPERTY_LET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
interface PropertyLetStmt_Node_94 extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[STATIC_Node,PROPERTY_LET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
interface PropertyLetStmt_Node_95 extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[STATIC_Node,PROPERTY_LET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
interface PropertyLetStmt_Node_96 extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[STATIC_Node,PROPERTY_LET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
interface PropertyLetStmt_Node_97 extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[PROPERTY_LET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
interface PropertyLetStmt_Node_98 extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[PROPERTY_LET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
interface PropertyLetStmt_Node_99 extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[PROPERTY_LET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
interface PropertyLetStmt_Node_100 extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[PROPERTY_LET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
export interface FUNCTION_Node extends BaseTokenNode {
            token:"FUNCTION";
            parent:FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_115 | FunctionStmt_Node_116 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_127 | FunctionStmt_Node_128 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_131 | FunctionStmt_Node_132 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_143 | FunctionStmt_Node_144 | FunctionStmt_Node_145 | FunctionStmt_Node_146 | FunctionStmt_Node_147 | FunctionStmt_Node_148 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_155 | FunctionStmt_Node_156 | FunctionStmt_Node_157 | FunctionStmt_Node_158 | FunctionStmt_Node_159 | FunctionStmt_Node_160 | FunctionStmt_Node_161 | FunctionStmt_Node_162 | FunctionStmt_Node_163 | FunctionStmt_Node_164;
          }
export interface END_FUNCTION_Node extends BaseTokenNode {
            token:"END_FUNCTION";
            parent:FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_115 | FunctionStmt_Node_116 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_127 | FunctionStmt_Node_128 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_131 | FunctionStmt_Node_132 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_143 | FunctionStmt_Node_144 | FunctionStmt_Node_145 | FunctionStmt_Node_146 | FunctionStmt_Node_147 | FunctionStmt_Node_148 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_155 | FunctionStmt_Node_156 | FunctionStmt_Node_157 | FunctionStmt_Node_158 | FunctionStmt_Node_159 | FunctionStmt_Node_160 | FunctionStmt_Node_161 | FunctionStmt_Node_162 | FunctionStmt_Node_163 | FunctionStmt_Node_164;
          }
interface FunctionStmt_Node_101 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_102 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_103 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_104 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_105 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_106 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_107 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_108 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_109 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_110 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_111 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_112 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_113 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_114 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_115 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_116 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_117 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_118 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_119 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_120 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_121 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_122 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_123 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_124 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_125 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_126 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_127 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_128 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_129 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_130 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_131 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_132 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_133 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_134 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_135 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_136 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_137 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_138 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_139 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_140 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_141 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_142 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_143 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_144 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_145 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_146 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_147 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_148 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_149 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_150 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_151 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_152 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_153 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_154 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_155 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_156 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_157 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_158 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_159 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_160 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_161 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_162 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_163 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface FunctionStmt_Node_164 extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
interface Block_Node extends BaseSymbolNode {
        symbol:"block";
        
        children:[BlockStmt_Node,...ZeroOrMore<Block_25_group_1_Node>,EndOfStatement_Node];
        parent:SubStmt_Node_21 | SubStmt_Node_23 | SubStmt_Node_25 | SubStmt_Node_27 | SubStmt_Node_29 | SubStmt_Node_31 | SubStmt_Node_33 | SubStmt_Node_35 | PropertyGetStmt_Node_37 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_59 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_67 | PropertySetStmt_Node_69 | PropertySetStmt_Node_71 | PropertySetStmt_Node_73 | PropertySetStmt_Node_75 | PropertySetStmt_Node_77 | PropertySetStmt_Node_79 | PropertySetStmt_Node_81 | PropertySetStmt_Node_83 | PropertyLetStmt_Node_85 | PropertyLetStmt_Node_87 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_91 | PropertyLetStmt_Node_93 | PropertyLetStmt_Node_95 | PropertyLetStmt_Node_97 | PropertyLetStmt_Node_99 | FunctionStmt_Node_101 | FunctionStmt_Node_103 | FunctionStmt_Node_105 | FunctionStmt_Node_107 | FunctionStmt_Node_109 | FunctionStmt_Node_111 | FunctionStmt_Node_113 | FunctionStmt_Node_115 | FunctionStmt_Node_117 | FunctionStmt_Node_119 | FunctionStmt_Node_121 | FunctionStmt_Node_123 | FunctionStmt_Node_125 | FunctionStmt_Node_127 | FunctionStmt_Node_129 | FunctionStmt_Node_131 | FunctionStmt_Node_133 | FunctionStmt_Node_135 | FunctionStmt_Node_137 | FunctionStmt_Node_139 | FunctionStmt_Node_141 | FunctionStmt_Node_143 | FunctionStmt_Node_145 | FunctionStmt_Node_147 | FunctionStmt_Node_149 | FunctionStmt_Node_151 | FunctionStmt_Node_153 | FunctionStmt_Node_155 | FunctionStmt_Node_157 | FunctionStmt_Node_159 | FunctionStmt_Node_161 | FunctionStmt_Node_163;
      }
interface BlockStmt_Node_166 extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[EraseStmt_Node];
        parent:Block_Node | Block_25_group_1_Parent_Node;
      }
interface BlockStmt_Node_167 extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[ExitStmt_Node];
        parent:Block_Node | Block_25_group_1_Parent_Node;
      }
interface BlockStmt_Node_168 extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[ExplicitCallStmt_Node];
        parent:Block_Node | Block_25_group_1_Parent_Node;
      }
interface BlockStmt_Node_169 extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[SetStmt_Node];
        parent:Block_Node | Block_25_group_1_Parent_Node;
      }
interface BlockStmt_Node_170 extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[RedimStmt_Node];
        parent:Block_Node | Block_25_group_1_Parent_Node;
      }
interface BlockStmt_Node_171 extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[LetStmt_Node];
        parent:Block_Node | Block_25_group_1_Parent_Node;
      }
interface BlockStmt_Node_172 extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[VariableStmt_Node];
        parent:Block_Node | Block_25_group_1_Parent_Node;
      }
interface BlockStmt_Node_173 extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[ImplicitCallStmt_InBlock_Node];
        parent:Block_Node | Block_25_group_1_Parent_Node;
      }
export interface ERASE_Node extends BaseTokenNode {
            token:"ERASE";
            parent:EraseStmt_Node;
          }
interface EraseStmt_Node extends BaseSymbolNode {
        symbol:"eraseStmt";
        
        children:[ERASE_Node,ValueStmt_Node,...ZeroOrMore<EraseStmt_34_group_2_Node>];
        parent:BlockStmt_Node_166;
      }
export interface REDIM_Node extends BaseTokenNode {
            token:"REDIM";
            parent:RedimStmt_Node_175 | RedimStmt_Node_176;
          }
export interface PRESERVE_Node extends BaseTokenNode {
            token:"PRESERVE";
            parent:RedimStmt_Node_175;
          }
interface RedimStmt_Node_175 extends BaseSymbolNode {
        symbol:"redimStmt";
        
        children:[REDIM_Node,PRESERVE_Node,RedimSubStmt_Node,...ZeroOrMore<RedimStmt_35_group_3_Node>];
        parent:BlockStmt_Node_170;
      }
interface RedimStmt_Node_176 extends BaseSymbolNode {
        symbol:"redimStmt";
        
        children:[REDIM_Node,RedimSubStmt_Node,...ZeroOrMore<RedimStmt_35_group_3_Node>];
        parent:BlockStmt_Node_170;
      }
interface RedimSubStmt_Node_177 extends BaseSymbolNode {
        symbol:"redimSubStmt";
        
        children:[ImplicitCallStmt_InStmt_Node,LPAREN_Node,Subscripts_Node,RPAREN_Node,AsTypeClause_Node];
        parent:RedimStmt_Node_175 | RedimStmt_Node_176 | RedimStmt_35_group_3_Parent_Node;
      }
interface RedimSubStmt_Node_178 extends BaseSymbolNode {
        symbol:"redimSubStmt";
        
        children:[ImplicitCallStmt_InStmt_Node,LPAREN_Node,Subscripts_Node,RPAREN_Node];
        parent:RedimStmt_Node_175 | RedimStmt_Node_176 | RedimStmt_35_group_3_Parent_Node;
      }
export interface EXIT_DO_Node extends BaseTokenNode {
            token:"EXIT_DO";
            parent:ExitStmt_Node_179;
          }
interface ExitStmt_Node_179 extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[EXIT_DO_Node];
        parent:BlockStmt_Node_167;
      }
export interface EXIT_FOR_Node extends BaseTokenNode {
            token:"EXIT_FOR";
            parent:ExitStmt_Node_180;
          }
interface ExitStmt_Node_180 extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[EXIT_FOR_Node];
        parent:BlockStmt_Node_167;
      }
export interface EXIT_FUNCTION_Node extends BaseTokenNode {
            token:"EXIT_FUNCTION";
            parent:ExitStmt_Node_181;
          }
interface ExitStmt_Node_181 extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[EXIT_FUNCTION_Node];
        parent:BlockStmt_Node_167;
      }
export interface EXIT_PROPERTY_Node extends BaseTokenNode {
            token:"EXIT_PROPERTY";
            parent:ExitStmt_Node_182;
          }
interface ExitStmt_Node_182 extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[EXIT_PROPERTY_Node];
        parent:BlockStmt_Node_167;
      }
export interface EXIT_SUB_Node extends BaseTokenNode {
            token:"EXIT_SUB";
            parent:ExitStmt_Node_183;
          }
interface ExitStmt_Node_183 extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[EXIT_SUB_Node];
        parent:BlockStmt_Node_167;
      }
export interface END_Node extends BaseTokenNode {
            token:"END";
            parent:ExitStmt_Node_184;
          }
interface ExitStmt_Node_184 extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[END_Node];
        parent:BlockStmt_Node_167;
      }
export interface LET_Node extends BaseTokenNode {
            token:"LET";
            parent:LetStmt_Node_185 | LetStmt_Node_187 | LetStmt_Node_189;
          }
export interface EQ_Node extends BaseTokenNode {
            token:"EQ";
            parent:LetStmt_Node_185 | LetStmt_Node_186 | SetStmt_Node | ArgDefaultValue_Node;
          }
interface LetStmt_Node_185 extends BaseSymbolNode {
        symbol:"letStmt";
        
        children:[LET_Node,ImplicitCallStmt_InStmt_Node,EQ_Node,ValueStmt_Node];
        parent:BlockStmt_Node_171;
      }
interface LetStmt_Node_186 extends BaseSymbolNode {
        symbol:"letStmt";
        
        children:[ImplicitCallStmt_InStmt_Node,EQ_Node,ValueStmt_Node];
        parent:BlockStmt_Node_171;
      }
export interface PLUS_EQ_Node extends BaseTokenNode {
            token:"PLUS_EQ";
            parent:LetStmt_Node_187 | LetStmt_Node_188;
          }
interface LetStmt_Node_187 extends BaseSymbolNode {
        symbol:"letStmt";
        
        children:[LET_Node,ImplicitCallStmt_InStmt_Node,PLUS_EQ_Node,ValueStmt_Node];
        parent:BlockStmt_Node_171;
      }
interface LetStmt_Node_188 extends BaseSymbolNode {
        symbol:"letStmt";
        
        children:[ImplicitCallStmt_InStmt_Node,PLUS_EQ_Node,ValueStmt_Node];
        parent:BlockStmt_Node_171;
      }
export interface MINUS_EQ_Node extends BaseTokenNode {
            token:"MINUS_EQ";
            parent:LetStmt_Node_189 | LetStmt_Node_190;
          }
interface LetStmt_Node_189 extends BaseSymbolNode {
        symbol:"letStmt";
        
        children:[LET_Node,ImplicitCallStmt_InStmt_Node,MINUS_EQ_Node,ValueStmt_Node];
        parent:BlockStmt_Node_171;
      }
interface LetStmt_Node_190 extends BaseSymbolNode {
        symbol:"letStmt";
        
        children:[ImplicitCallStmt_InStmt_Node,MINUS_EQ_Node,ValueStmt_Node];
        parent:BlockStmt_Node_171;
      }
export interface SET_Node extends BaseTokenNode {
            token:"SET";
            parent:SetStmt_Node;
          }
interface SetStmt_Node extends BaseSymbolNode {
        symbol:"setStmt";
        
        children:[SET_Node,ImplicitCallStmt_InStmt_Node,EQ_Node,ValueStmt_Node];
        parent:BlockStmt_Node_169;
      }
interface ExplicitCallStmt_Node_192 extends BaseSymbolNode {
        symbol:"explicitCallStmt";
        
        children:[ECS_MemberProcedureCall_Node];
        parent:BlockStmt_Node_168;
      }
interface ExplicitCallStmt_Node_193 extends BaseSymbolNode {
        symbol:"explicitCallStmt";
        
        children:[ECS_ProcedureCall_Node];
        parent:BlockStmt_Node_168;
      }
export interface CALL_Node extends BaseTokenNode {
            token:"CALL";
            parent:ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_198 | ECS_MemberProcedureCall_Node_199 | ECS_MemberProcedureCall_Node_200 | ECS_MemberProcedureCall_Node_201 | ECS_MemberProcedureCall_Node_202 | ECS_MemberProcedureCall_Node_203 | ECS_MemberProcedureCall_Node_204 | ECS_MemberProcedureCall_Node_205 | ECS_MemberProcedureCall_Node_206 | ECS_MemberProcedureCall_Node_207 | ECS_MemberProcedureCall_Node_208 | ECS_MemberProcedureCall_Node_209 | ECS_ProcedureCall_Node_210 | ECS_ProcedureCall_Node_211 | ECS_ProcedureCall_Node_212 | ECS_ProcedureCall_Node_213 | ECS_ProcedureCall_Node_214 | ECS_ProcedureCall_Node_215 | ECS_ProcedureCall_Node_216 | ECS_ProcedureCall_Node_217;
          }
export interface TOKEN_0_Node extends BaseTokenNode {
            token:".";
            parent:ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_198 | ECS_MemberProcedureCall_Node_199 | ECS_MemberProcedureCall_Node_200 | ECS_MemberProcedureCall_Node_201 | ECS_MemberProcedureCall_Node_202 | ECS_MemberProcedureCall_Node_203 | ECS_MemberProcedureCall_Node_204 | ECS_MemberProcedureCall_Node_205 | ECS_MemberProcedureCall_Node_206 | ECS_MemberProcedureCall_Node_207 | ECS_MemberProcedureCall_Node_208 | ECS_MemberProcedureCall_Node_209 | ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_226 | ICS_B_MemberProcedureCall_Node_227 | ICS_B_MemberProcedureCall_Node_228 | ICS_B_MemberProcedureCall_Node_229 | ICS_B_MemberProcedureCall_Node_230 | ICS_B_MemberProcedureCall_Node_231 | ICS_B_MemberProcedureCall_Node_232 | ICS_B_MemberProcedureCall_Node_233 | ICS_B_MemberProcedureCall_Node_234 | ICS_B_MemberProcedureCall_Node_235 | ICS_S_MemberCall_Node_310 | ICS_S_MemberCall_Node_311 | ComplexType_97_group_1_Parent_Node;
          }
interface ECS_MemberProcedureCall_Node_194 extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,...ECS_MemberProcedureCall_49_group_5_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ExplicitCallStmt_Node_192;
      }
interface ECS_MemberProcedureCall_Node_195 extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,...ECS_MemberProcedureCall_49_group_5_Node];
        parent:ExplicitCallStmt_Node_192;
      }
interface ECS_MemberProcedureCall_Node_196 extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ExplicitCallStmt_Node_192;
      }
interface ECS_MemberProcedureCall_Node_197 extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ExplicitCallStmt_Node_192;
      }
interface ECS_MemberProcedureCall_Node_198 extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,...ECS_MemberProcedureCall_49_group_5_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ExplicitCallStmt_Node_192;
      }
interface ECS_MemberProcedureCall_Node_199 extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,...ECS_MemberProcedureCall_49_group_5_Node];
        parent:ExplicitCallStmt_Node_192;
      }
interface ECS_MemberProcedureCall_Node_200 extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ExplicitCallStmt_Node_192;
      }
interface ECS_MemberProcedureCall_Node_201 extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node];
        parent:ExplicitCallStmt_Node_192;
      }
interface ECS_MemberProcedureCall_Node_202 extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,...ECS_MemberProcedureCall_49_group_5_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ExplicitCallStmt_Node_192;
      }
interface ECS_MemberProcedureCall_Node_203 extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,...ECS_MemberProcedureCall_49_group_5_Node];
        parent:ExplicitCallStmt_Node_192;
      }
interface ECS_MemberProcedureCall_Node_204 extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ExplicitCallStmt_Node_192;
      }
interface ECS_MemberProcedureCall_Node_205 extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ExplicitCallStmt_Node_192;
      }
interface ECS_MemberProcedureCall_Node_206 extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,...ECS_MemberProcedureCall_49_group_5_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ExplicitCallStmt_Node_192;
      }
interface ECS_MemberProcedureCall_Node_207 extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,...ECS_MemberProcedureCall_49_group_5_Node];
        parent:ExplicitCallStmt_Node_192;
      }
interface ECS_MemberProcedureCall_Node_208 extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ExplicitCallStmt_Node_192;
      }
interface ECS_MemberProcedureCall_Node_209 extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,TOKEN_0_Node,AmbiguousIdentifier_Node];
        parent:ExplicitCallStmt_Node_192;
      }
interface ECS_ProcedureCall_Node_210 extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[CALL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...ECS_MemberProcedureCall_49_group_5_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ExplicitCallStmt_Node_193;
      }
interface ECS_ProcedureCall_Node_211 extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[CALL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...ECS_MemberProcedureCall_49_group_5_Node];
        parent:ExplicitCallStmt_Node_193;
      }
interface ECS_ProcedureCall_Node_212 extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[CALL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ExplicitCallStmt_Node_193;
      }
interface ECS_ProcedureCall_Node_213 extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[CALL_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ExplicitCallStmt_Node_193;
      }
interface ECS_ProcedureCall_Node_214 extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[CALL_Node,AmbiguousIdentifier_Node,...ECS_MemberProcedureCall_49_group_5_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ExplicitCallStmt_Node_193;
      }
interface ECS_ProcedureCall_Node_215 extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[CALL_Node,AmbiguousIdentifier_Node,...ECS_MemberProcedureCall_49_group_5_Node];
        parent:ExplicitCallStmt_Node_193;
      }
interface ECS_ProcedureCall_Node_216 extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[CALL_Node,AmbiguousIdentifier_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ExplicitCallStmt_Node_193;
      }
interface ECS_ProcedureCall_Node_217 extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[CALL_Node,AmbiguousIdentifier_Node];
        parent:ExplicitCallStmt_Node_193;
      }
interface ImplicitCallStmt_InBlock_Node_218 extends BaseSymbolNode {
        symbol:"implicitCallStmt_InBlock";
        
        children:[ICS_B_MemberProcedureCall_Node];
        parent:BlockStmt_Node_173;
      }
interface ImplicitCallStmt_InBlock_Node_219 extends BaseSymbolNode {
        symbol:"implicitCallStmt_InBlock";
        
        children:[ICS_B_ProcedureCall_Node];
        parent:BlockStmt_Node_173;
      }
interface ICS_B_MemberProcedureCall_Node_220 extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgsCall_Node,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
interface ICS_B_MemberProcedureCall_Node_221 extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgsCall_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
interface ICS_B_MemberProcedureCall_Node_222 extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgsCall_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
interface ICS_B_MemberProcedureCall_Node_223 extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgsCall_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
interface ICS_B_MemberProcedureCall_Node_224 extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
interface ICS_B_MemberProcedureCall_Node_225 extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
interface ICS_B_MemberProcedureCall_Node_226 extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
interface ICS_B_MemberProcedureCall_Node_227 extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
interface ICS_B_MemberProcedureCall_Node_228 extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,ArgsCall_Node,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
interface ICS_B_MemberProcedureCall_Node_229 extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,ArgsCall_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
interface ICS_B_MemberProcedureCall_Node_230 extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,ArgsCall_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
interface ICS_B_MemberProcedureCall_Node_231 extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,ArgsCall_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
interface ICS_B_MemberProcedureCall_Node_232 extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
interface ICS_B_MemberProcedureCall_Node_233 extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
interface ICS_B_MemberProcedureCall_Node_234 extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
interface ICS_B_MemberProcedureCall_Node_235 extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
interface ICS_B_ProcedureCall_Node_236 extends BaseSymbolNode {
        symbol:"iCS_B_ProcedureCall";
        
        children:[AmbiguousIdentifier_Node,ArgsCall_Node,...ICS_B_ProcedureCall_54_group_2_Node];
        parent:ImplicitCallStmt_InBlock_Node_219;
      }
interface ICS_B_ProcedureCall_Node_237 extends BaseSymbolNode {
        symbol:"iCS_B_ProcedureCall";
        
        children:[AmbiguousIdentifier_Node,ArgsCall_Node];
        parent:ImplicitCallStmt_InBlock_Node_219;
      }
interface ICS_B_ProcedureCall_Node_238 extends BaseSymbolNode {
        symbol:"iCS_B_ProcedureCall";
        
        children:[AmbiguousIdentifier_Node,...ICS_B_ProcedureCall_54_group_2_Node];
        parent:ImplicitCallStmt_InBlock_Node_219;
      }
interface ICS_B_ProcedureCall_Node_239 extends BaseSymbolNode {
        symbol:"iCS_B_ProcedureCall";
        
        children:[AmbiguousIdentifier_Node];
        parent:ImplicitCallStmt_InBlock_Node_219;
      }
interface ArgsCall_Node_240 extends BaseSymbolNode {
        symbol:"argsCall";
        
        children:[ArgCall_Node,...ZeroOrMore<ArgsCall_55_group_1_Node>];
        parent:ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_228 | ICS_B_MemberProcedureCall_Node_229 | ICS_B_MemberProcedureCall_Node_230 | ICS_B_MemberProcedureCall_Node_231 | ICS_B_ProcedureCall_Node_236 | ICS_B_ProcedureCall_Node_237 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_316 | ICS_S_ProcedureOrArrayCall_Node_317 | ICS_S_ProcedureOrArrayCall_Node_322 | ICS_S_ProcedureOrArrayCall_Node_323 | ICS_S_ProcedureOrArrayCall_Node_324 | ICS_S_ProcedureOrArrayCall_Node_325 | ECS_MemberProcedureCall_49_group_5_Parent_Node;
      }
interface ArgsCall_Node_241 extends BaseSymbolNode {
        symbol:"argsCall";
        
        children:[...ZeroOrMore<ArgsCall_55_group_1_Node>];
        parent:ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_228 | ICS_B_MemberProcedureCall_Node_229 | ICS_B_MemberProcedureCall_Node_230 | ICS_B_MemberProcedureCall_Node_231 | ICS_B_ProcedureCall_Node_236 | ICS_B_ProcedureCall_Node_237 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_316 | ICS_S_ProcedureOrArrayCall_Node_317 | ICS_S_ProcedureOrArrayCall_Node_322 | ICS_S_ProcedureOrArrayCall_Node_323 | ICS_S_ProcedureOrArrayCall_Node_324 | ICS_S_ProcedureOrArrayCall_Node_325 | ECS_MemberProcedureCall_49_group_5_Parent_Node;
      }
export interface BYREF_Node extends BaseTokenNode {
            token:"BYREF";
            parent:ArgCall_Node_242 | ArgCall_Node_243 | ArgCall_Node_246 | ArgCall_Node_247 | Arg_Node_476 | Arg_Node_477 | Arg_Node_478 | Arg_Node_479 | Arg_Node_480 | Arg_Node_481 | Arg_Node_482 | Arg_Node_483 | Arg_Node_484 | Arg_Node_485 | Arg_Node_486 | Arg_Node_487 | Arg_Node_488 | Arg_Node_489 | Arg_Node_490 | Arg_Node_491 | Arg_Node_492 | Arg_Node_493 | Arg_Node_494 | Arg_Node_495 | Arg_Node_496 | Arg_Node_497 | Arg_Node_498 | Arg_Node_499 | Arg_Node_500 | Arg_Node_501 | Arg_Node_502 | Arg_Node_503 | Arg_Node_504 | Arg_Node_505 | Arg_Node_506 | Arg_Node_507 | Arg_Node_540 | Arg_Node_541 | Arg_Node_542 | Arg_Node_543 | Arg_Node_544 | Arg_Node_545 | Arg_Node_546 | Arg_Node_547 | Arg_Node_548 | Arg_Node_549 | Arg_Node_550 | Arg_Node_551 | Arg_Node_552 | Arg_Node_553 | Arg_Node_554 | Arg_Node_555 | Arg_Node_556 | Arg_Node_557 | Arg_Node_558 | Arg_Node_559 | Arg_Node_560 | Arg_Node_561 | Arg_Node_562 | Arg_Node_563 | Arg_Node_564 | Arg_Node_565 | Arg_Node_566 | Arg_Node_567 | Arg_Node_568 | Arg_Node_569 | Arg_Node_570 | Arg_Node_571;
          }
interface ArgCall_Node_242 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,BYREF_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
interface ArgCall_Node_243 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,BYREF_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
interface ArgCall_Node_244 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
interface ArgCall_Node_245 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
interface ArgCall_Node_246 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[BYREF_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
interface ArgCall_Node_247 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[BYREF_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
interface ArgCall_Node_248 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
interface ArgCall_Node_249 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
export interface BYVAL_Node extends BaseTokenNode {
            token:"BYVAL";
            parent:ArgCall_Node_250 | ArgCall_Node_251 | ArgCall_Node_254 | ArgCall_Node_255 | Arg_Node_348 | Arg_Node_349 | Arg_Node_350 | Arg_Node_351 | Arg_Node_352 | Arg_Node_353 | Arg_Node_354 | Arg_Node_355 | Arg_Node_356 | Arg_Node_357 | Arg_Node_358 | Arg_Node_359 | Arg_Node_360 | Arg_Node_361 | Arg_Node_362 | Arg_Node_363 | Arg_Node_364 | Arg_Node_365 | Arg_Node_366 | Arg_Node_367 | Arg_Node_368 | Arg_Node_369 | Arg_Node_370 | Arg_Node_371 | Arg_Node_372 | Arg_Node_373 | Arg_Node_374 | Arg_Node_375 | Arg_Node_376 | Arg_Node_377 | Arg_Node_378 | Arg_Node_379 | Arg_Node_412 | Arg_Node_413 | Arg_Node_414 | Arg_Node_415 | Arg_Node_416 | Arg_Node_417 | Arg_Node_418 | Arg_Node_419 | Arg_Node_420 | Arg_Node_421 | Arg_Node_422 | Arg_Node_423 | Arg_Node_424 | Arg_Node_425 | Arg_Node_426 | Arg_Node_427 | Arg_Node_428 | Arg_Node_429 | Arg_Node_430 | Arg_Node_431 | Arg_Node_432 | Arg_Node_433 | Arg_Node_434 | Arg_Node_435 | Arg_Node_436 | Arg_Node_437 | Arg_Node_438 | Arg_Node_439 | Arg_Node_440 | Arg_Node_441 | Arg_Node_442 | Arg_Node_443;
          }
interface ArgCall_Node_250 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,BYVAL_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
interface ArgCall_Node_251 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,BYVAL_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
interface ArgCall_Node_252 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
interface ArgCall_Node_253 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
interface ArgCall_Node_254 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[BYVAL_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
interface ArgCall_Node_255 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[BYVAL_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
interface ArgCall_Node_256 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
interface ArgCall_Node_257 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
export interface PARAMARRAY_Node extends BaseTokenNode {
            token:"PARAMARRAY";
            parent:ArgCall_Node_258 | ArgCall_Node_259 | ArgCall_Node_262 | ArgCall_Node_263 | Arg_Node_348 | Arg_Node_349 | Arg_Node_350 | Arg_Node_351 | Arg_Node_352 | Arg_Node_353 | Arg_Node_354 | Arg_Node_355 | Arg_Node_356 | Arg_Node_357 | Arg_Node_358 | Arg_Node_359 | Arg_Node_360 | Arg_Node_361 | Arg_Node_362 | Arg_Node_363 | Arg_Node_380 | Arg_Node_381 | Arg_Node_382 | Arg_Node_383 | Arg_Node_384 | Arg_Node_385 | Arg_Node_386 | Arg_Node_387 | Arg_Node_388 | Arg_Node_389 | Arg_Node_390 | Arg_Node_391 | Arg_Node_392 | Arg_Node_393 | Arg_Node_394 | Arg_Node_395 | Arg_Node_412 | Arg_Node_413 | Arg_Node_414 | Arg_Node_415 | Arg_Node_416 | Arg_Node_417 | Arg_Node_418 | Arg_Node_419 | Arg_Node_420 | Arg_Node_421 | Arg_Node_422 | Arg_Node_423 | Arg_Node_424 | Arg_Node_425 | Arg_Node_426 | Arg_Node_427 | Arg_Node_444 | Arg_Node_445 | Arg_Node_446 | Arg_Node_447 | Arg_Node_448 | Arg_Node_449 | Arg_Node_450 | Arg_Node_451 | Arg_Node_452 | Arg_Node_453 | Arg_Node_454 | Arg_Node_455 | Arg_Node_456 | Arg_Node_457 | Arg_Node_458 | Arg_Node_459 | Arg_Node_476 | Arg_Node_477 | Arg_Node_478 | Arg_Node_479 | Arg_Node_480 | Arg_Node_481 | Arg_Node_482 | Arg_Node_483 | Arg_Node_484 | Arg_Node_485 | Arg_Node_486 | Arg_Node_487 | Arg_Node_488 | Arg_Node_489 | Arg_Node_490 | Arg_Node_491 | Arg_Node_508 | Arg_Node_509 | Arg_Node_510 | Arg_Node_511 | Arg_Node_512 | Arg_Node_513 | Arg_Node_514 | Arg_Node_515 | Arg_Node_516 | Arg_Node_517 | Arg_Node_518 | Arg_Node_519 | Arg_Node_520 | Arg_Node_521 | Arg_Node_522 | Arg_Node_523 | Arg_Node_540 | Arg_Node_541 | Arg_Node_542 | Arg_Node_543 | Arg_Node_544 | Arg_Node_545 | Arg_Node_546 | Arg_Node_547 | Arg_Node_548 | Arg_Node_549 | Arg_Node_550 | Arg_Node_551 | Arg_Node_552 | Arg_Node_553 | Arg_Node_554 | Arg_Node_555 | Arg_Node_572 | Arg_Node_573 | Arg_Node_574 | Arg_Node_575 | Arg_Node_576 | Arg_Node_577 | Arg_Node_578 | Arg_Node_579 | Arg_Node_580 | Arg_Node_581 | Arg_Node_582 | Arg_Node_583 | Arg_Node_584 | Arg_Node_585 | Arg_Node_586 | Arg_Node_587;
          }
interface ArgCall_Node_258 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,PARAMARRAY_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
interface ArgCall_Node_259 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,PARAMARRAY_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
interface ArgCall_Node_260 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
interface ArgCall_Node_261 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
interface ArgCall_Node_262 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[PARAMARRAY_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
interface ArgCall_Node_263 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[PARAMARRAY_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
interface ArgCall_Node_264 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
interface ArgCall_Node_265 extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
export interface DIM_Node extends BaseTokenNode {
            token:"DIM";
            parent:VariableStmt_Node_266 | VariableStmt_Node_267;
          }
export interface WITHEVENTS_Node extends BaseTokenNode {
            token:"WITHEVENTS";
            parent:VariableStmt_Node_266 | VariableStmt_Node_268 | VariableStmt_Node_270;
          }
interface VariableStmt_Node_266 extends BaseSymbolNode {
        symbol:"variableStmt";
        
        children:[DIM_Node,WITHEVENTS_Node,VariableListStmt_Node];
        parent:ModuleDeclarationsElement_Node | BlockStmt_Node_172;
      }
interface VariableStmt_Node_267 extends BaseSymbolNode {
        symbol:"variableStmt";
        
        children:[DIM_Node,VariableListStmt_Node];
        parent:ModuleDeclarationsElement_Node | BlockStmt_Node_172;
      }
interface VariableStmt_Node_268 extends BaseSymbolNode {
        symbol:"variableStmt";
        
        children:[STATIC_Node,WITHEVENTS_Node,VariableListStmt_Node];
        parent:ModuleDeclarationsElement_Node | BlockStmt_Node_172;
      }
interface VariableStmt_Node_269 extends BaseSymbolNode {
        symbol:"variableStmt";
        
        children:[STATIC_Node,VariableListStmt_Node];
        parent:ModuleDeclarationsElement_Node | BlockStmt_Node_172;
      }
interface VariableStmt_Node_270 extends BaseSymbolNode {
        symbol:"variableStmt";
        
        children:[Visibility_Node,WITHEVENTS_Node,VariableListStmt_Node];
        parent:ModuleDeclarationsElement_Node | BlockStmt_Node_172;
      }
interface VariableStmt_Node_271 extends BaseSymbolNode {
        symbol:"variableStmt";
        
        children:[Visibility_Node,VariableListStmt_Node];
        parent:ModuleDeclarationsElement_Node | BlockStmt_Node_172;
      }
interface VariableListStmt_Node extends BaseSymbolNode {
        symbol:"variableListStmt";
        
        children:[VariableSubStmt_Node,...ZeroOrMore<VariableListStmt_62_group_1_Node>];
        parent:VariableStmt_Node_266 | VariableStmt_Node_267 | VariableStmt_Node_268 | VariableStmt_Node_269 | VariableStmt_Node_270 | VariableStmt_Node_271;
      }
interface VariableSubStmt_Node_273 extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[AmbiguousIdentifier_Node,...VariableSubStmt_63_group_1_Node,TypeHint_Node,AsTypeClause_Node];
        parent:VariableListStmt_Node | VariableListStmt_62_group_1_Parent_Node;
      }
interface VariableSubStmt_Node_274 extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[AmbiguousIdentifier_Node,...VariableSubStmt_63_group_1_Node,TypeHint_Node];
        parent:VariableListStmt_Node | VariableListStmt_62_group_1_Parent_Node;
      }
interface VariableSubStmt_Node_275 extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[AmbiguousIdentifier_Node,...VariableSubStmt_63_group_1_Node,AsTypeClause_Node];
        parent:VariableListStmt_Node | VariableListStmt_62_group_1_Parent_Node;
      }
interface VariableSubStmt_Node_276 extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[AmbiguousIdentifier_Node,...VariableSubStmt_63_group_1_Node];
        parent:VariableListStmt_Node | VariableListStmt_62_group_1_Parent_Node;
      }
interface VariableSubStmt_Node_277 extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:VariableListStmt_Node | VariableListStmt_62_group_1_Parent_Node;
      }
interface VariableSubStmt_Node_278 extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node];
        parent:VariableListStmt_Node | VariableListStmt_62_group_1_Parent_Node;
      }
interface VariableSubStmt_Node_279 extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:VariableListStmt_Node | VariableListStmt_62_group_1_Parent_Node;
      }
interface VariableSubStmt_Node_280 extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[AmbiguousIdentifier_Node];
        parent:VariableListStmt_Node | VariableListStmt_62_group_1_Parent_Node;
      }
interface Indexes_Node extends BaseSymbolNode {
        symbol:"indexes";
        
        children:[ValueStmt_Node,...ZeroOrMore<EraseStmt_34_group_2_Node>];
        parent:ECS_MemberProcedureCall_49_group_10_Parent_Node;
      }
interface Subscript__Node_282 extends BaseSymbolNode {
        symbol:"subscript_";
        
        children:[...Subscript__65_group_0_Node,ValueStmt_Node];
        parent:Subscripts_Node | Subscripts_66_group_1_Parent_Node;
      }
interface Subscript__Node_283 extends BaseSymbolNode {
        symbol:"subscript_";
        
        children:[ValueStmt_Node];
        parent:Subscripts_Node | Subscripts_66_group_1_Parent_Node;
      }
interface Subscripts_Node extends BaseSymbolNode {
        symbol:"subscripts";
        
        children:[Subscript__Node,...ZeroOrMore<Subscripts_66_group_1_Node>];
        parent:RedimSubStmt_Node_177 | RedimSubStmt_Node_178 | ICS_B_ProcedureCall_54_group_2_Parent_Node | VariableSubStmt_63_group_1_Parent_Node_639;
      }
interface Subscript__Node_285 extends BaseSymbolNode {
        symbol:"subscript_";
        
        children:[...Subscript__65_group_0_Node,ValueStmt_Node];
        parent:Subscripts_Node | Subscripts_66_group_1_Parent_Node;
      }
interface Subscript__Node_286 extends BaseSymbolNode {
        symbol:"subscript_";
        
        children:[ValueStmt_Node];
        parent:Subscripts_Node | Subscripts_66_group_1_Parent_Node;
      }
interface ArgList_Node_287 extends BaseSymbolNode {
        symbol:"argList";
        
        children:[LPAREN_Node,...ArgList_68_group_1_Node,RPAREN_Node];
        parent:SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_25 | SubStmt_Node_26 | SubStmt_Node_29 | SubStmt_Node_30 | SubStmt_Node_33 | SubStmt_Node_34 | PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_73 | PropertySetStmt_Node_74 | PropertySetStmt_Node_77 | PropertySetStmt_Node_78 | PropertySetStmt_Node_81 | PropertySetStmt_Node_82 | PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_90 | PropertyLetStmt_Node_93 | PropertyLetStmt_Node_94 | PropertyLetStmt_Node_97 | PropertyLetStmt_Node_98 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_127 | FunctionStmt_Node_128 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_143 | FunctionStmt_Node_144 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_157 | FunctionStmt_Node_158 | FunctionStmt_Node_159 | FunctionStmt_Node_160;
      }
interface ArgList_Node_288 extends BaseSymbolNode {
        symbol:"argList";
        
        children:[LPAREN_Node,RPAREN_Node];
        parent:SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_25 | SubStmt_Node_26 | SubStmt_Node_29 | SubStmt_Node_30 | SubStmt_Node_33 | SubStmt_Node_34 | PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_73 | PropertySetStmt_Node_74 | PropertySetStmt_Node_77 | PropertySetStmt_Node_78 | PropertySetStmt_Node_81 | PropertySetStmt_Node_82 | PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_90 | PropertyLetStmt_Node_93 | PropertyLetStmt_Node_94 | PropertyLetStmt_Node_97 | PropertyLetStmt_Node_98 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_127 | FunctionStmt_Node_128 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_143 | FunctionStmt_Node_144 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_157 | FunctionStmt_Node_158 | FunctionStmt_Node_159 | FunctionStmt_Node_160;
      }
interface ValueStmt_Node_289 extends BaseSymbolNode {
        symbol:"valueStmt";
        
        children:[Literal_Node];
        parent:EraseStmt_Node | LetStmt_Node_185 | LetStmt_Node_186 | LetStmt_Node_187 | LetStmt_Node_188 | LetStmt_Node_189 | LetStmt_Node_190 | SetStmt_Node | ArgCall_Node_242 | ArgCall_Node_243 | ArgCall_Node_244 | ArgCall_Node_245 | ArgCall_Node_246 | ArgCall_Node_247 | ArgCall_Node_248 | ArgCall_Node_249 | ArgCall_Node_250 | ArgCall_Node_251 | ArgCall_Node_252 | ArgCall_Node_253 | ArgCall_Node_254 | ArgCall_Node_255 | ArgCall_Node_256 | ArgCall_Node_257 | ArgCall_Node_258 | ArgCall_Node_259 | ArgCall_Node_260 | ArgCall_Node_261 | ArgCall_Node_262 | ArgCall_Node_263 | ArgCall_Node_264 | ArgCall_Node_265 | Indexes_Node | Subscript__Node_282 | Subscript__Node_283 | Subscript__Node_285 | Subscript__Node_286 | ArgDefaultValue_Node | EraseStmt_34_group_2_Parent_Node | Subscript__65_group_0_Parent_Node | BaseType_107_group_1_Parent_Node;
      }
interface ValueStmt_Node_290 extends BaseSymbolNode {
        symbol:"valueStmt";
        
        children:[ImplicitCallStmt_InStmt_Node];
        parent:EraseStmt_Node | LetStmt_Node_185 | LetStmt_Node_186 | LetStmt_Node_187 | LetStmt_Node_188 | LetStmt_Node_189 | LetStmt_Node_190 | SetStmt_Node | ArgCall_Node_242 | ArgCall_Node_243 | ArgCall_Node_244 | ArgCall_Node_245 | ArgCall_Node_246 | ArgCall_Node_247 | ArgCall_Node_248 | ArgCall_Node_249 | ArgCall_Node_250 | ArgCall_Node_251 | ArgCall_Node_252 | ArgCall_Node_253 | ArgCall_Node_254 | ArgCall_Node_255 | ArgCall_Node_256 | ArgCall_Node_257 | ArgCall_Node_258 | ArgCall_Node_259 | ArgCall_Node_260 | ArgCall_Node_261 | ArgCall_Node_262 | ArgCall_Node_263 | ArgCall_Node_264 | ArgCall_Node_265 | Indexes_Node | Subscript__Node_282 | Subscript__Node_283 | Subscript__Node_285 | Subscript__Node_286 | ArgDefaultValue_Node | EraseStmt_34_group_2_Parent_Node | Subscript__65_group_0_Parent_Node | BaseType_107_group_1_Parent_Node;
      }
interface ImplicitCallStmt_InStmt_Node_291 extends BaseSymbolNode {
        symbol:"implicitCallStmt_InStmt";
        
        children:[ICS_S_MembersCall_Node];
        parent:RedimSubStmt_Node_177 | RedimSubStmt_Node_178 | LetStmt_Node_185 | LetStmt_Node_186 | LetStmt_Node_187 | LetStmt_Node_188 | LetStmt_Node_189 | LetStmt_Node_190 | SetStmt_Node | ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_198 | ECS_MemberProcedureCall_Node_199 | ECS_MemberProcedureCall_Node_200 | ECS_MemberProcedureCall_Node_201 | ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_226 | ICS_B_MemberProcedureCall_Node_227 | ICS_B_MemberProcedureCall_Node_228 | ICS_B_MemberProcedureCall_Node_229 | ICS_B_MemberProcedureCall_Node_230 | ICS_B_MemberProcedureCall_Node_231 | ICS_B_MemberProcedureCall_Node_232 | ICS_B_MemberProcedureCall_Node_233 | ICS_B_MemberProcedureCall_Node_234 | ICS_B_MemberProcedureCall_Node_235 | ValueStmt_Node_290;
      }
interface ImplicitCallStmt_InStmt_Node_292 extends BaseSymbolNode {
        symbol:"implicitCallStmt_InStmt";
        
        children:[ICS_S_VariableOrProcedureCall_Node];
        parent:RedimSubStmt_Node_177 | RedimSubStmt_Node_178 | LetStmt_Node_185 | LetStmt_Node_186 | LetStmt_Node_187 | LetStmt_Node_188 | LetStmt_Node_189 | LetStmt_Node_190 | SetStmt_Node | ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_198 | ECS_MemberProcedureCall_Node_199 | ECS_MemberProcedureCall_Node_200 | ECS_MemberProcedureCall_Node_201 | ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_226 | ICS_B_MemberProcedureCall_Node_227 | ICS_B_MemberProcedureCall_Node_228 | ICS_B_MemberProcedureCall_Node_229 | ICS_B_MemberProcedureCall_Node_230 | ICS_B_MemberProcedureCall_Node_231 | ICS_B_MemberProcedureCall_Node_232 | ICS_B_MemberProcedureCall_Node_233 | ICS_B_MemberProcedureCall_Node_234 | ICS_B_MemberProcedureCall_Node_235 | ValueStmt_Node_290;
      }
interface ImplicitCallStmt_InStmt_Node_293 extends BaseSymbolNode {
        symbol:"implicitCallStmt_InStmt";
        
        children:[ICS_S_ProcedureOrArrayCall_Node];
        parent:RedimSubStmt_Node_177 | RedimSubStmt_Node_178 | LetStmt_Node_185 | LetStmt_Node_186 | LetStmt_Node_187 | LetStmt_Node_188 | LetStmt_Node_189 | LetStmt_Node_190 | SetStmt_Node | ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_198 | ECS_MemberProcedureCall_Node_199 | ECS_MemberProcedureCall_Node_200 | ECS_MemberProcedureCall_Node_201 | ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_226 | ICS_B_MemberProcedureCall_Node_227 | ICS_B_MemberProcedureCall_Node_228 | ICS_B_MemberProcedureCall_Node_229 | ICS_B_MemberProcedureCall_Node_230 | ICS_B_MemberProcedureCall_Node_231 | ICS_B_MemberProcedureCall_Node_232 | ICS_B_MemberProcedureCall_Node_233 | ICS_B_MemberProcedureCall_Node_234 | ICS_B_MemberProcedureCall_Node_235 | ValueStmt_Node_290;
      }
interface ICS_S_MembersCall_Node_294 extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[ICS_S_VariableOrProcedureCall_Node,...OneOrMore<ICS_S_MemberCall_Node>,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
interface ICS_S_MembersCall_Node_295 extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[ICS_S_VariableOrProcedureCall_Node,...OneOrMore<ICS_S_MemberCall_Node>,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
interface ICS_S_MembersCall_Node_296 extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[ICS_S_VariableOrProcedureCall_Node,...OneOrMore<ICS_S_MemberCall_Node>,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
interface ICS_S_MembersCall_Node_297 extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[ICS_S_VariableOrProcedureCall_Node,...OneOrMore<ICS_S_MemberCall_Node>];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
interface ICS_S_MembersCall_Node_298 extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[...OneOrMore<ICS_S_MemberCall_Node>,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
interface ICS_S_MembersCall_Node_299 extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[...OneOrMore<ICS_S_MemberCall_Node>,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
interface ICS_S_MembersCall_Node_300 extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[...OneOrMore<ICS_S_MemberCall_Node>,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
interface ICS_S_MembersCall_Node_301 extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[...OneOrMore<ICS_S_MemberCall_Node>];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
interface ICS_S_MembersCall_Node_302 extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[ICS_S_ProcedureOrArrayCall_Node,...OneOrMore<ICS_S_MemberCall_Node>,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
interface ICS_S_MembersCall_Node_303 extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[ICS_S_ProcedureOrArrayCall_Node,...OneOrMore<ICS_S_MemberCall_Node>,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
interface ICS_S_MembersCall_Node_304 extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[ICS_S_ProcedureOrArrayCall_Node,...OneOrMore<ICS_S_MemberCall_Node>,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
interface ICS_S_MembersCall_Node_305 extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[ICS_S_ProcedureOrArrayCall_Node,...OneOrMore<ICS_S_MemberCall_Node>];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
interface ICS_S_MembersCall_Node_306 extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[...OneOrMore<ICS_S_MemberCall_Node>,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
interface ICS_S_MembersCall_Node_307 extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[...OneOrMore<ICS_S_MemberCall_Node>,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
interface ICS_S_MembersCall_Node_308 extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[...OneOrMore<ICS_S_MemberCall_Node>,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
interface ICS_S_MembersCall_Node_309 extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[...OneOrMore<ICS_S_MemberCall_Node>];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
interface ICS_S_MemberCall_Node_310 extends BaseSymbolNode {
        symbol:"iCS_S_MemberCall";
        
        children:[TOKEN_0_Node,ICS_S_VariableOrProcedureCall_Node];
        parent:ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MembersCall_Node_298 | ICS_S_MembersCall_Node_299 | ICS_S_MembersCall_Node_300 | ICS_S_MembersCall_Node_301 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MembersCall_Node_306 | ICS_S_MembersCall_Node_307 | ICS_S_MembersCall_Node_308 | ICS_S_MembersCall_Node_309;
      }
interface ICS_S_MemberCall_Node_311 extends BaseSymbolNode {
        symbol:"iCS_S_MemberCall";
        
        children:[TOKEN_0_Node,ICS_S_ProcedureOrArrayCall_Node];
        parent:ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MembersCall_Node_298 | ICS_S_MembersCall_Node_299 | ICS_S_MembersCall_Node_300 | ICS_S_MembersCall_Node_301 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MembersCall_Node_306 | ICS_S_MembersCall_Node_307 | ICS_S_MembersCall_Node_308 | ICS_S_MembersCall_Node_309;
      }
export interface TOKEN_1_Node extends BaseTokenNode {
            token:"!";
            parent:ICS_S_MemberCall_Node_312 | ICS_S_MemberCall_Node_313 | DictionaryCallStmt_Node_338 | DictionaryCallStmt_Node_339 | TypeHint_Node_345 | ComplexType_98_group_1_Parent_Node;
          }
interface ICS_S_MemberCall_Node_312 extends BaseSymbolNode {
        symbol:"iCS_S_MemberCall";
        
        children:[TOKEN_1_Node,ICS_S_VariableOrProcedureCall_Node];
        parent:ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MembersCall_Node_298 | ICS_S_MembersCall_Node_299 | ICS_S_MembersCall_Node_300 | ICS_S_MembersCall_Node_301 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MembersCall_Node_306 | ICS_S_MembersCall_Node_307 | ICS_S_MembersCall_Node_308 | ICS_S_MembersCall_Node_309;
      }
interface ICS_S_MemberCall_Node_313 extends BaseSymbolNode {
        symbol:"iCS_S_MemberCall";
        
        children:[TOKEN_1_Node,ICS_S_ProcedureOrArrayCall_Node];
        parent:ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MembersCall_Node_298 | ICS_S_MembersCall_Node_299 | ICS_S_MembersCall_Node_300 | ICS_S_MembersCall_Node_301 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MembersCall_Node_306 | ICS_S_MembersCall_Node_307 | ICS_S_MembersCall_Node_308 | ICS_S_MembersCall_Node_309;
      }
interface ICS_S_ProcedureOrArrayCall_Node_314 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,ArgsCall_Node,RPAREN_Node,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
interface ICS_S_ProcedureOrArrayCall_Node_315 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,ArgsCall_Node,RPAREN_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
interface ICS_S_ProcedureOrArrayCall_Node_316 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,ArgsCall_Node,RPAREN_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
interface ICS_S_ProcedureOrArrayCall_Node_317 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,ArgsCall_Node,RPAREN_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
interface ICS_S_ProcedureOrArrayCall_Node_318 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
interface ICS_S_ProcedureOrArrayCall_Node_319 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
interface ICS_S_ProcedureOrArrayCall_Node_320 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
interface ICS_S_ProcedureOrArrayCall_Node_321 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
interface ICS_S_ProcedureOrArrayCall_Node_322 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,LPAREN_Node,ArgsCall_Node,RPAREN_Node,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
interface ICS_S_ProcedureOrArrayCall_Node_323 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,LPAREN_Node,ArgsCall_Node,RPAREN_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
interface ICS_S_ProcedureOrArrayCall_Node_324 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,LPAREN_Node,ArgsCall_Node,RPAREN_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
interface ICS_S_ProcedureOrArrayCall_Node_325 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,LPAREN_Node,ArgsCall_Node,RPAREN_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
interface ICS_S_ProcedureOrArrayCall_Node_326 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
interface ICS_S_ProcedureOrArrayCall_Node_327 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
interface ICS_S_ProcedureOrArrayCall_Node_328 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
interface ICS_S_ProcedureOrArrayCall_Node_329 extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
interface ICS_S_VariableOrProcedureCall_Node_330 extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_292 | ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MemberCall_Node_310 | ICS_S_MemberCall_Node_312;
      }
interface ICS_S_VariableOrProcedureCall_Node_331 extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node_292 | ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MemberCall_Node_310 | ICS_S_MemberCall_Node_312;
      }
interface ICS_S_VariableOrProcedureCall_Node_332 extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_292 | ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MemberCall_Node_310 | ICS_S_MemberCall_Node_312;
      }
interface ICS_S_VariableOrProcedureCall_Node_333 extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ImplicitCallStmt_InStmt_Node_292 | ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MemberCall_Node_310 | ICS_S_MemberCall_Node_312;
      }
interface ICS_S_VariableOrProcedureCall_Node_334 extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[AmbiguousIdentifier_Node,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_292 | ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MemberCall_Node_310 | ICS_S_MemberCall_Node_312;
      }
interface ICS_S_VariableOrProcedureCall_Node_335 extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[AmbiguousIdentifier_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node_292 | ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MemberCall_Node_310 | ICS_S_MemberCall_Node_312;
      }
interface ICS_S_VariableOrProcedureCall_Node_336 extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[AmbiguousIdentifier_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_292 | ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MemberCall_Node_310 | ICS_S_MemberCall_Node_312;
      }
interface ICS_S_VariableOrProcedureCall_Node_337 extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[AmbiguousIdentifier_Node];
        parent:ImplicitCallStmt_InStmt_Node_292 | ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MemberCall_Node_310 | ICS_S_MemberCall_Node_312;
      }
interface DictionaryCallStmt_Node_338 extends BaseSymbolNode {
        symbol:"dictionaryCallStmt";
        
        children:[TOKEN_1_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_228 | ICS_B_MemberProcedureCall_Node_229 | ICS_B_MemberProcedureCall_Node_232 | ICS_B_MemberProcedureCall_Node_233 | ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_298 | ICS_S_MembersCall_Node_299 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_306 | ICS_S_MembersCall_Node_307 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_318 | ICS_S_ProcedureOrArrayCall_Node_319 | ICS_S_ProcedureOrArrayCall_Node_322 | ICS_S_ProcedureOrArrayCall_Node_323 | ICS_S_ProcedureOrArrayCall_Node_326 | ICS_S_ProcedureOrArrayCall_Node_327 | ICS_S_VariableOrProcedureCall_Node_330 | ICS_S_VariableOrProcedureCall_Node_331 | ICS_S_VariableOrProcedureCall_Node_334 | ICS_S_VariableOrProcedureCall_Node_335;
      }
interface DictionaryCallStmt_Node_339 extends BaseSymbolNode {
        symbol:"dictionaryCallStmt";
        
        children:[TOKEN_1_Node,AmbiguousIdentifier_Node];
        parent:ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_228 | ICS_B_MemberProcedureCall_Node_229 | ICS_B_MemberProcedureCall_Node_232 | ICS_B_MemberProcedureCall_Node_233 | ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_298 | ICS_S_MembersCall_Node_299 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_306 | ICS_S_MembersCall_Node_307 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_318 | ICS_S_ProcedureOrArrayCall_Node_319 | ICS_S_ProcedureOrArrayCall_Node_322 | ICS_S_ProcedureOrArrayCall_Node_323 | ICS_S_ProcedureOrArrayCall_Node_326 | ICS_S_ProcedureOrArrayCall_Node_327 | ICS_S_VariableOrProcedureCall_Node_330 | ICS_S_VariableOrProcedureCall_Node_331 | ICS_S_VariableOrProcedureCall_Node_334 | ICS_S_VariableOrProcedureCall_Node_335;
      }
export interface INTEGERLITERAL_Node extends BaseTokenNode {
            token:"INTEGERLITERAL";
            parent:Literal_Node_340 | FieldLength_Node_625;
          }
interface Literal_Node_340 extends BaseSymbolNode {
        symbol:"literal";
        
        children:[INTEGERLITERAL_Node];
        parent:ValueStmt_Node_289;
      }
export interface STRINGLITERAL_Node extends BaseTokenNode {
            token:"STRINGLITERAL";
            parent:Literal_Node_341;
          }
interface Literal_Node_341 extends BaseSymbolNode {
        symbol:"literal";
        
        children:[STRINGLITERAL_Node];
        parent:ValueStmt_Node_289;
      }
export interface TOKEN_2_Node extends BaseTokenNode {
            token:"&";
            parent:TypeHint_Node_342;
          }
interface TypeHint_Node_342 extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[TOKEN_2_Node];
        parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_155 | FunctionStmt_Node_156 | ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_202 | ECS_MemberProcedureCall_Node_203 | ECS_MemberProcedureCall_Node_204 | ECS_MemberProcedureCall_Node_205 | ECS_ProcedureCall_Node_210 | ECS_ProcedureCall_Node_211 | ECS_ProcedureCall_Node_212 | ECS_ProcedureCall_Node_213 | ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_226 | ICS_B_MemberProcedureCall_Node_227 | VariableSubStmt_Node_273 | VariableSubStmt_Node_274 | VariableSubStmt_Node_277 | VariableSubStmt_Node_278 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_316 | ICS_S_ProcedureOrArrayCall_Node_317 | ICS_S_ProcedureOrArrayCall_Node_318 | ICS_S_ProcedureOrArrayCall_Node_319 | ICS_S_ProcedureOrArrayCall_Node_320 | ICS_S_ProcedureOrArrayCall_Node_321 | ICS_S_VariableOrProcedureCall_Node_330 | ICS_S_VariableOrProcedureCall_Node_331 | ICS_S_VariableOrProcedureCall_Node_332 | ICS_S_VariableOrProcedureCall_Node_333 | DictionaryCallStmt_Node_338 | Arg_Node_348 | Arg_Node_349 | Arg_Node_350 | Arg_Node_351 | Arg_Node_352 | Arg_Node_353 | Arg_Node_354 | Arg_Node_355 | Arg_Node_364 | Arg_Node_365 | Arg_Node_366 | Arg_Node_367 | Arg_Node_368 | Arg_Node_369 | Arg_Node_370 | Arg_Node_371 | Arg_Node_380 | Arg_Node_381 | Arg_Node_382 | Arg_Node_383 | Arg_Node_384 | Arg_Node_385 | Arg_Node_386 | Arg_Node_387 | Arg_Node_396 | Arg_Node_397 | Arg_Node_398 | Arg_Node_399 | Arg_Node_400 | Arg_Node_401 | Arg_Node_402 | Arg_Node_403 | Arg_Node_412 | Arg_Node_413 | Arg_Node_414 | Arg_Node_415 | Arg_Node_416 | Arg_Node_417 | Arg_Node_418 | Arg_Node_419 | Arg_Node_428 | Arg_Node_429 | Arg_Node_430 | Arg_Node_431 | Arg_Node_432 | Arg_Node_433 | Arg_Node_434 | Arg_Node_435 | Arg_Node_444 | Arg_Node_445 | Arg_Node_446 | Arg_Node_447 | Arg_Node_448 | Arg_Node_449 | Arg_Node_450 | Arg_Node_451 | Arg_Node_460 | Arg_Node_461 | Arg_Node_462 | Arg_Node_463 | Arg_Node_464 | Arg_Node_465 | Arg_Node_466 | Arg_Node_467 | Arg_Node_476 | Arg_Node_477 | Arg_Node_478 | Arg_Node_479 | Arg_Node_480 | Arg_Node_481 | Arg_Node_482 | Arg_Node_483 | Arg_Node_492 | Arg_Node_493 | Arg_Node_494 | Arg_Node_495 | Arg_Node_496 | Arg_Node_497 | Arg_Node_498 | Arg_Node_499 | Arg_Node_508 | Arg_Node_509 | Arg_Node_510 | Arg_Node_511 | Arg_Node_512 | Arg_Node_513 | Arg_Node_514 | Arg_Node_515 | Arg_Node_524 | Arg_Node_525 | Arg_Node_526 | Arg_Node_527 | Arg_Node_528 | Arg_Node_529 | Arg_Node_530 | Arg_Node_531 | Arg_Node_540 | Arg_Node_541 | Arg_Node_542 | Arg_Node_543 | Arg_Node_544 | Arg_Node_545 | Arg_Node_546 | Arg_Node_547 | Arg_Node_556 | Arg_Node_557 | Arg_Node_558 | Arg_Node_559 | Arg_Node_560 | Arg_Node_561 | Arg_Node_562 | Arg_Node_563 | Arg_Node_572 | Arg_Node_573 | Arg_Node_574 | Arg_Node_575 | Arg_Node_576 | Arg_Node_577 | Arg_Node_578 | Arg_Node_579 | Arg_Node_588 | Arg_Node_589 | Arg_Node_590 | Arg_Node_591 | Arg_Node_592 | Arg_Node_593 | Arg_Node_594 | Arg_Node_595;
      }
export interface TOKEN_3_Node extends BaseTokenNode {
            token:"%";
            parent:TypeHint_Node_343;
          }
interface TypeHint_Node_343 extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[TOKEN_3_Node];
        parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_155 | FunctionStmt_Node_156 | ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_202 | ECS_MemberProcedureCall_Node_203 | ECS_MemberProcedureCall_Node_204 | ECS_MemberProcedureCall_Node_205 | ECS_ProcedureCall_Node_210 | ECS_ProcedureCall_Node_211 | ECS_ProcedureCall_Node_212 | ECS_ProcedureCall_Node_213 | ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_226 | ICS_B_MemberProcedureCall_Node_227 | VariableSubStmt_Node_273 | VariableSubStmt_Node_274 | VariableSubStmt_Node_277 | VariableSubStmt_Node_278 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_316 | ICS_S_ProcedureOrArrayCall_Node_317 | ICS_S_ProcedureOrArrayCall_Node_318 | ICS_S_ProcedureOrArrayCall_Node_319 | ICS_S_ProcedureOrArrayCall_Node_320 | ICS_S_ProcedureOrArrayCall_Node_321 | ICS_S_VariableOrProcedureCall_Node_330 | ICS_S_VariableOrProcedureCall_Node_331 | ICS_S_VariableOrProcedureCall_Node_332 | ICS_S_VariableOrProcedureCall_Node_333 | DictionaryCallStmt_Node_338 | Arg_Node_348 | Arg_Node_349 | Arg_Node_350 | Arg_Node_351 | Arg_Node_352 | Arg_Node_353 | Arg_Node_354 | Arg_Node_355 | Arg_Node_364 | Arg_Node_365 | Arg_Node_366 | Arg_Node_367 | Arg_Node_368 | Arg_Node_369 | Arg_Node_370 | Arg_Node_371 | Arg_Node_380 | Arg_Node_381 | Arg_Node_382 | Arg_Node_383 | Arg_Node_384 | Arg_Node_385 | Arg_Node_386 | Arg_Node_387 | Arg_Node_396 | Arg_Node_397 | Arg_Node_398 | Arg_Node_399 | Arg_Node_400 | Arg_Node_401 | Arg_Node_402 | Arg_Node_403 | Arg_Node_412 | Arg_Node_413 | Arg_Node_414 | Arg_Node_415 | Arg_Node_416 | Arg_Node_417 | Arg_Node_418 | Arg_Node_419 | Arg_Node_428 | Arg_Node_429 | Arg_Node_430 | Arg_Node_431 | Arg_Node_432 | Arg_Node_433 | Arg_Node_434 | Arg_Node_435 | Arg_Node_444 | Arg_Node_445 | Arg_Node_446 | Arg_Node_447 | Arg_Node_448 | Arg_Node_449 | Arg_Node_450 | Arg_Node_451 | Arg_Node_460 | Arg_Node_461 | Arg_Node_462 | Arg_Node_463 | Arg_Node_464 | Arg_Node_465 | Arg_Node_466 | Arg_Node_467 | Arg_Node_476 | Arg_Node_477 | Arg_Node_478 | Arg_Node_479 | Arg_Node_480 | Arg_Node_481 | Arg_Node_482 | Arg_Node_483 | Arg_Node_492 | Arg_Node_493 | Arg_Node_494 | Arg_Node_495 | Arg_Node_496 | Arg_Node_497 | Arg_Node_498 | Arg_Node_499 | Arg_Node_508 | Arg_Node_509 | Arg_Node_510 | Arg_Node_511 | Arg_Node_512 | Arg_Node_513 | Arg_Node_514 | Arg_Node_515 | Arg_Node_524 | Arg_Node_525 | Arg_Node_526 | Arg_Node_527 | Arg_Node_528 | Arg_Node_529 | Arg_Node_530 | Arg_Node_531 | Arg_Node_540 | Arg_Node_541 | Arg_Node_542 | Arg_Node_543 | Arg_Node_544 | Arg_Node_545 | Arg_Node_546 | Arg_Node_547 | Arg_Node_556 | Arg_Node_557 | Arg_Node_558 | Arg_Node_559 | Arg_Node_560 | Arg_Node_561 | Arg_Node_562 | Arg_Node_563 | Arg_Node_572 | Arg_Node_573 | Arg_Node_574 | Arg_Node_575 | Arg_Node_576 | Arg_Node_577 | Arg_Node_578 | Arg_Node_579 | Arg_Node_588 | Arg_Node_589 | Arg_Node_590 | Arg_Node_591 | Arg_Node_592 | Arg_Node_593 | Arg_Node_594 | Arg_Node_595;
      }
export interface TOKEN_4_Node extends BaseTokenNode {
            token:"#";
            parent:TypeHint_Node_344;
          }
interface TypeHint_Node_344 extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[TOKEN_4_Node];
        parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_155 | FunctionStmt_Node_156 | ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_202 | ECS_MemberProcedureCall_Node_203 | ECS_MemberProcedureCall_Node_204 | ECS_MemberProcedureCall_Node_205 | ECS_ProcedureCall_Node_210 | ECS_ProcedureCall_Node_211 | ECS_ProcedureCall_Node_212 | ECS_ProcedureCall_Node_213 | ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_226 | ICS_B_MemberProcedureCall_Node_227 | VariableSubStmt_Node_273 | VariableSubStmt_Node_274 | VariableSubStmt_Node_277 | VariableSubStmt_Node_278 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_316 | ICS_S_ProcedureOrArrayCall_Node_317 | ICS_S_ProcedureOrArrayCall_Node_318 | ICS_S_ProcedureOrArrayCall_Node_319 | ICS_S_ProcedureOrArrayCall_Node_320 | ICS_S_ProcedureOrArrayCall_Node_321 | ICS_S_VariableOrProcedureCall_Node_330 | ICS_S_VariableOrProcedureCall_Node_331 | ICS_S_VariableOrProcedureCall_Node_332 | ICS_S_VariableOrProcedureCall_Node_333 | DictionaryCallStmt_Node_338 | Arg_Node_348 | Arg_Node_349 | Arg_Node_350 | Arg_Node_351 | Arg_Node_352 | Arg_Node_353 | Arg_Node_354 | Arg_Node_355 | Arg_Node_364 | Arg_Node_365 | Arg_Node_366 | Arg_Node_367 | Arg_Node_368 | Arg_Node_369 | Arg_Node_370 | Arg_Node_371 | Arg_Node_380 | Arg_Node_381 | Arg_Node_382 | Arg_Node_383 | Arg_Node_384 | Arg_Node_385 | Arg_Node_386 | Arg_Node_387 | Arg_Node_396 | Arg_Node_397 | Arg_Node_398 | Arg_Node_399 | Arg_Node_400 | Arg_Node_401 | Arg_Node_402 | Arg_Node_403 | Arg_Node_412 | Arg_Node_413 | Arg_Node_414 | Arg_Node_415 | Arg_Node_416 | Arg_Node_417 | Arg_Node_418 | Arg_Node_419 | Arg_Node_428 | Arg_Node_429 | Arg_Node_430 | Arg_Node_431 | Arg_Node_432 | Arg_Node_433 | Arg_Node_434 | Arg_Node_435 | Arg_Node_444 | Arg_Node_445 | Arg_Node_446 | Arg_Node_447 | Arg_Node_448 | Arg_Node_449 | Arg_Node_450 | Arg_Node_451 | Arg_Node_460 | Arg_Node_461 | Arg_Node_462 | Arg_Node_463 | Arg_Node_464 | Arg_Node_465 | Arg_Node_466 | Arg_Node_467 | Arg_Node_476 | Arg_Node_477 | Arg_Node_478 | Arg_Node_479 | Arg_Node_480 | Arg_Node_481 | Arg_Node_482 | Arg_Node_483 | Arg_Node_492 | Arg_Node_493 | Arg_Node_494 | Arg_Node_495 | Arg_Node_496 | Arg_Node_497 | Arg_Node_498 | Arg_Node_499 | Arg_Node_508 | Arg_Node_509 | Arg_Node_510 | Arg_Node_511 | Arg_Node_512 | Arg_Node_513 | Arg_Node_514 | Arg_Node_515 | Arg_Node_524 | Arg_Node_525 | Arg_Node_526 | Arg_Node_527 | Arg_Node_528 | Arg_Node_529 | Arg_Node_530 | Arg_Node_531 | Arg_Node_540 | Arg_Node_541 | Arg_Node_542 | Arg_Node_543 | Arg_Node_544 | Arg_Node_545 | Arg_Node_546 | Arg_Node_547 | Arg_Node_556 | Arg_Node_557 | Arg_Node_558 | Arg_Node_559 | Arg_Node_560 | Arg_Node_561 | Arg_Node_562 | Arg_Node_563 | Arg_Node_572 | Arg_Node_573 | Arg_Node_574 | Arg_Node_575 | Arg_Node_576 | Arg_Node_577 | Arg_Node_578 | Arg_Node_579 | Arg_Node_588 | Arg_Node_589 | Arg_Node_590 | Arg_Node_591 | Arg_Node_592 | Arg_Node_593 | Arg_Node_594 | Arg_Node_595;
      }
interface TypeHint_Node_345 extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[TOKEN_1_Node];
        parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_155 | FunctionStmt_Node_156 | ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_202 | ECS_MemberProcedureCall_Node_203 | ECS_MemberProcedureCall_Node_204 | ECS_MemberProcedureCall_Node_205 | ECS_ProcedureCall_Node_210 | ECS_ProcedureCall_Node_211 | ECS_ProcedureCall_Node_212 | ECS_ProcedureCall_Node_213 | ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_226 | ICS_B_MemberProcedureCall_Node_227 | VariableSubStmt_Node_273 | VariableSubStmt_Node_274 | VariableSubStmt_Node_277 | VariableSubStmt_Node_278 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_316 | ICS_S_ProcedureOrArrayCall_Node_317 | ICS_S_ProcedureOrArrayCall_Node_318 | ICS_S_ProcedureOrArrayCall_Node_319 | ICS_S_ProcedureOrArrayCall_Node_320 | ICS_S_ProcedureOrArrayCall_Node_321 | ICS_S_VariableOrProcedureCall_Node_330 | ICS_S_VariableOrProcedureCall_Node_331 | ICS_S_VariableOrProcedureCall_Node_332 | ICS_S_VariableOrProcedureCall_Node_333 | DictionaryCallStmt_Node_338 | Arg_Node_348 | Arg_Node_349 | Arg_Node_350 | Arg_Node_351 | Arg_Node_352 | Arg_Node_353 | Arg_Node_354 | Arg_Node_355 | Arg_Node_364 | Arg_Node_365 | Arg_Node_366 | Arg_Node_367 | Arg_Node_368 | Arg_Node_369 | Arg_Node_370 | Arg_Node_371 | Arg_Node_380 | Arg_Node_381 | Arg_Node_382 | Arg_Node_383 | Arg_Node_384 | Arg_Node_385 | Arg_Node_386 | Arg_Node_387 | Arg_Node_396 | Arg_Node_397 | Arg_Node_398 | Arg_Node_399 | Arg_Node_400 | Arg_Node_401 | Arg_Node_402 | Arg_Node_403 | Arg_Node_412 | Arg_Node_413 | Arg_Node_414 | Arg_Node_415 | Arg_Node_416 | Arg_Node_417 | Arg_Node_418 | Arg_Node_419 | Arg_Node_428 | Arg_Node_429 | Arg_Node_430 | Arg_Node_431 | Arg_Node_432 | Arg_Node_433 | Arg_Node_434 | Arg_Node_435 | Arg_Node_444 | Arg_Node_445 | Arg_Node_446 | Arg_Node_447 | Arg_Node_448 | Arg_Node_449 | Arg_Node_450 | Arg_Node_451 | Arg_Node_460 | Arg_Node_461 | Arg_Node_462 | Arg_Node_463 | Arg_Node_464 | Arg_Node_465 | Arg_Node_466 | Arg_Node_467 | Arg_Node_476 | Arg_Node_477 | Arg_Node_478 | Arg_Node_479 | Arg_Node_480 | Arg_Node_481 | Arg_Node_482 | Arg_Node_483 | Arg_Node_492 | Arg_Node_493 | Arg_Node_494 | Arg_Node_495 | Arg_Node_496 | Arg_Node_497 | Arg_Node_498 | Arg_Node_499 | Arg_Node_508 | Arg_Node_509 | Arg_Node_510 | Arg_Node_511 | Arg_Node_512 | Arg_Node_513 | Arg_Node_514 | Arg_Node_515 | Arg_Node_524 | Arg_Node_525 | Arg_Node_526 | Arg_Node_527 | Arg_Node_528 | Arg_Node_529 | Arg_Node_530 | Arg_Node_531 | Arg_Node_540 | Arg_Node_541 | Arg_Node_542 | Arg_Node_543 | Arg_Node_544 | Arg_Node_545 | Arg_Node_546 | Arg_Node_547 | Arg_Node_556 | Arg_Node_557 | Arg_Node_558 | Arg_Node_559 | Arg_Node_560 | Arg_Node_561 | Arg_Node_562 | Arg_Node_563 | Arg_Node_572 | Arg_Node_573 | Arg_Node_574 | Arg_Node_575 | Arg_Node_576 | Arg_Node_577 | Arg_Node_578 | Arg_Node_579 | Arg_Node_588 | Arg_Node_589 | Arg_Node_590 | Arg_Node_591 | Arg_Node_592 | Arg_Node_593 | Arg_Node_594 | Arg_Node_595;
      }
export interface TOKEN_5_Node extends BaseTokenNode {
            token:"@";
            parent:TypeHint_Node_346;
          }
interface TypeHint_Node_346 extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[TOKEN_5_Node];
        parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_155 | FunctionStmt_Node_156 | ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_202 | ECS_MemberProcedureCall_Node_203 | ECS_MemberProcedureCall_Node_204 | ECS_MemberProcedureCall_Node_205 | ECS_ProcedureCall_Node_210 | ECS_ProcedureCall_Node_211 | ECS_ProcedureCall_Node_212 | ECS_ProcedureCall_Node_213 | ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_226 | ICS_B_MemberProcedureCall_Node_227 | VariableSubStmt_Node_273 | VariableSubStmt_Node_274 | VariableSubStmt_Node_277 | VariableSubStmt_Node_278 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_316 | ICS_S_ProcedureOrArrayCall_Node_317 | ICS_S_ProcedureOrArrayCall_Node_318 | ICS_S_ProcedureOrArrayCall_Node_319 | ICS_S_ProcedureOrArrayCall_Node_320 | ICS_S_ProcedureOrArrayCall_Node_321 | ICS_S_VariableOrProcedureCall_Node_330 | ICS_S_VariableOrProcedureCall_Node_331 | ICS_S_VariableOrProcedureCall_Node_332 | ICS_S_VariableOrProcedureCall_Node_333 | DictionaryCallStmt_Node_338 | Arg_Node_348 | Arg_Node_349 | Arg_Node_350 | Arg_Node_351 | Arg_Node_352 | Arg_Node_353 | Arg_Node_354 | Arg_Node_355 | Arg_Node_364 | Arg_Node_365 | Arg_Node_366 | Arg_Node_367 | Arg_Node_368 | Arg_Node_369 | Arg_Node_370 | Arg_Node_371 | Arg_Node_380 | Arg_Node_381 | Arg_Node_382 | Arg_Node_383 | Arg_Node_384 | Arg_Node_385 | Arg_Node_386 | Arg_Node_387 | Arg_Node_396 | Arg_Node_397 | Arg_Node_398 | Arg_Node_399 | Arg_Node_400 | Arg_Node_401 | Arg_Node_402 | Arg_Node_403 | Arg_Node_412 | Arg_Node_413 | Arg_Node_414 | Arg_Node_415 | Arg_Node_416 | Arg_Node_417 | Arg_Node_418 | Arg_Node_419 | Arg_Node_428 | Arg_Node_429 | Arg_Node_430 | Arg_Node_431 | Arg_Node_432 | Arg_Node_433 | Arg_Node_434 | Arg_Node_435 | Arg_Node_444 | Arg_Node_445 | Arg_Node_446 | Arg_Node_447 | Arg_Node_448 | Arg_Node_449 | Arg_Node_450 | Arg_Node_451 | Arg_Node_460 | Arg_Node_461 | Arg_Node_462 | Arg_Node_463 | Arg_Node_464 | Arg_Node_465 | Arg_Node_466 | Arg_Node_467 | Arg_Node_476 | Arg_Node_477 | Arg_Node_478 | Arg_Node_479 | Arg_Node_480 | Arg_Node_481 | Arg_Node_482 | Arg_Node_483 | Arg_Node_492 | Arg_Node_493 | Arg_Node_494 | Arg_Node_495 | Arg_Node_496 | Arg_Node_497 | Arg_Node_498 | Arg_Node_499 | Arg_Node_508 | Arg_Node_509 | Arg_Node_510 | Arg_Node_511 | Arg_Node_512 | Arg_Node_513 | Arg_Node_514 | Arg_Node_515 | Arg_Node_524 | Arg_Node_525 | Arg_Node_526 | Arg_Node_527 | Arg_Node_528 | Arg_Node_529 | Arg_Node_530 | Arg_Node_531 | Arg_Node_540 | Arg_Node_541 | Arg_Node_542 | Arg_Node_543 | Arg_Node_544 | Arg_Node_545 | Arg_Node_546 | Arg_Node_547 | Arg_Node_556 | Arg_Node_557 | Arg_Node_558 | Arg_Node_559 | Arg_Node_560 | Arg_Node_561 | Arg_Node_562 | Arg_Node_563 | Arg_Node_572 | Arg_Node_573 | Arg_Node_574 | Arg_Node_575 | Arg_Node_576 | Arg_Node_577 | Arg_Node_578 | Arg_Node_579 | Arg_Node_588 | Arg_Node_589 | Arg_Node_590 | Arg_Node_591 | Arg_Node_592 | Arg_Node_593 | Arg_Node_594 | Arg_Node_595;
      }
export interface $_Node extends BaseTokenNode {
            token:"$";
            parent:TypeHint_Node_347;
          }
interface TypeHint_Node_347 extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[$_Node];
        parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_155 | FunctionStmt_Node_156 | ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_202 | ECS_MemberProcedureCall_Node_203 | ECS_MemberProcedureCall_Node_204 | ECS_MemberProcedureCall_Node_205 | ECS_ProcedureCall_Node_210 | ECS_ProcedureCall_Node_211 | ECS_ProcedureCall_Node_212 | ECS_ProcedureCall_Node_213 | ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_226 | ICS_B_MemberProcedureCall_Node_227 | VariableSubStmt_Node_273 | VariableSubStmt_Node_274 | VariableSubStmt_Node_277 | VariableSubStmt_Node_278 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_316 | ICS_S_ProcedureOrArrayCall_Node_317 | ICS_S_ProcedureOrArrayCall_Node_318 | ICS_S_ProcedureOrArrayCall_Node_319 | ICS_S_ProcedureOrArrayCall_Node_320 | ICS_S_ProcedureOrArrayCall_Node_321 | ICS_S_VariableOrProcedureCall_Node_330 | ICS_S_VariableOrProcedureCall_Node_331 | ICS_S_VariableOrProcedureCall_Node_332 | ICS_S_VariableOrProcedureCall_Node_333 | DictionaryCallStmt_Node_338 | Arg_Node_348 | Arg_Node_349 | Arg_Node_350 | Arg_Node_351 | Arg_Node_352 | Arg_Node_353 | Arg_Node_354 | Arg_Node_355 | Arg_Node_364 | Arg_Node_365 | Arg_Node_366 | Arg_Node_367 | Arg_Node_368 | Arg_Node_369 | Arg_Node_370 | Arg_Node_371 | Arg_Node_380 | Arg_Node_381 | Arg_Node_382 | Arg_Node_383 | Arg_Node_384 | Arg_Node_385 | Arg_Node_386 | Arg_Node_387 | Arg_Node_396 | Arg_Node_397 | Arg_Node_398 | Arg_Node_399 | Arg_Node_400 | Arg_Node_401 | Arg_Node_402 | Arg_Node_403 | Arg_Node_412 | Arg_Node_413 | Arg_Node_414 | Arg_Node_415 | Arg_Node_416 | Arg_Node_417 | Arg_Node_418 | Arg_Node_419 | Arg_Node_428 | Arg_Node_429 | Arg_Node_430 | Arg_Node_431 | Arg_Node_432 | Arg_Node_433 | Arg_Node_434 | Arg_Node_435 | Arg_Node_444 | Arg_Node_445 | Arg_Node_446 | Arg_Node_447 | Arg_Node_448 | Arg_Node_449 | Arg_Node_450 | Arg_Node_451 | Arg_Node_460 | Arg_Node_461 | Arg_Node_462 | Arg_Node_463 | Arg_Node_464 | Arg_Node_465 | Arg_Node_466 | Arg_Node_467 | Arg_Node_476 | Arg_Node_477 | Arg_Node_478 | Arg_Node_479 | Arg_Node_480 | Arg_Node_481 | Arg_Node_482 | Arg_Node_483 | Arg_Node_492 | Arg_Node_493 | Arg_Node_494 | Arg_Node_495 | Arg_Node_496 | Arg_Node_497 | Arg_Node_498 | Arg_Node_499 | Arg_Node_508 | Arg_Node_509 | Arg_Node_510 | Arg_Node_511 | Arg_Node_512 | Arg_Node_513 | Arg_Node_514 | Arg_Node_515 | Arg_Node_524 | Arg_Node_525 | Arg_Node_526 | Arg_Node_527 | Arg_Node_528 | Arg_Node_529 | Arg_Node_530 | Arg_Node_531 | Arg_Node_540 | Arg_Node_541 | Arg_Node_542 | Arg_Node_543 | Arg_Node_544 | Arg_Node_545 | Arg_Node_546 | Arg_Node_547 | Arg_Node_556 | Arg_Node_557 | Arg_Node_558 | Arg_Node_559 | Arg_Node_560 | Arg_Node_561 | Arg_Node_562 | Arg_Node_563 | Arg_Node_572 | Arg_Node_573 | Arg_Node_574 | Arg_Node_575 | Arg_Node_576 | Arg_Node_577 | Arg_Node_578 | Arg_Node_579 | Arg_Node_588 | Arg_Node_589 | Arg_Node_590 | Arg_Node_591 | Arg_Node_592 | Arg_Node_593 | Arg_Node_594 | Arg_Node_595;
      }
export interface OPTIONAL_Node extends BaseTokenNode {
            token:"OPTIONAL";
            parent:Arg_Node_348 | Arg_Node_349 | Arg_Node_350 | Arg_Node_351 | Arg_Node_352 | Arg_Node_353 | Arg_Node_354 | Arg_Node_355 | Arg_Node_356 | Arg_Node_357 | Arg_Node_358 | Arg_Node_359 | Arg_Node_360 | Arg_Node_361 | Arg_Node_362 | Arg_Node_363 | Arg_Node_364 | Arg_Node_365 | Arg_Node_366 | Arg_Node_367 | Arg_Node_368 | Arg_Node_369 | Arg_Node_370 | Arg_Node_371 | Arg_Node_372 | Arg_Node_373 | Arg_Node_374 | Arg_Node_375 | Arg_Node_376 | Arg_Node_377 | Arg_Node_378 | Arg_Node_379 | Arg_Node_380 | Arg_Node_381 | Arg_Node_382 | Arg_Node_383 | Arg_Node_384 | Arg_Node_385 | Arg_Node_386 | Arg_Node_387 | Arg_Node_388 | Arg_Node_389 | Arg_Node_390 | Arg_Node_391 | Arg_Node_392 | Arg_Node_393 | Arg_Node_394 | Arg_Node_395 | Arg_Node_396 | Arg_Node_397 | Arg_Node_398 | Arg_Node_399 | Arg_Node_400 | Arg_Node_401 | Arg_Node_402 | Arg_Node_403 | Arg_Node_404 | Arg_Node_405 | Arg_Node_406 | Arg_Node_407 | Arg_Node_408 | Arg_Node_409 | Arg_Node_410 | Arg_Node_411 | Arg_Node_476 | Arg_Node_477 | Arg_Node_478 | Arg_Node_479 | Arg_Node_480 | Arg_Node_481 | Arg_Node_482 | Arg_Node_483 | Arg_Node_484 | Arg_Node_485 | Arg_Node_486 | Arg_Node_487 | Arg_Node_488 | Arg_Node_489 | Arg_Node_490 | Arg_Node_491 | Arg_Node_492 | Arg_Node_493 | Arg_Node_494 | Arg_Node_495 | Arg_Node_496 | Arg_Node_497 | Arg_Node_498 | Arg_Node_499 | Arg_Node_500 | Arg_Node_501 | Arg_Node_502 | Arg_Node_503 | Arg_Node_504 | Arg_Node_505 | Arg_Node_506 | Arg_Node_507 | Arg_Node_508 | Arg_Node_509 | Arg_Node_510 | Arg_Node_511 | Arg_Node_512 | Arg_Node_513 | Arg_Node_514 | Arg_Node_515 | Arg_Node_516 | Arg_Node_517 | Arg_Node_518 | Arg_Node_519 | Arg_Node_520 | Arg_Node_521 | Arg_Node_522 | Arg_Node_523 | Arg_Node_524 | Arg_Node_525 | Arg_Node_526 | Arg_Node_527 | Arg_Node_528 | Arg_Node_529 | Arg_Node_530 | Arg_Node_531 | Arg_Node_532 | Arg_Node_533 | Arg_Node_534 | Arg_Node_535 | Arg_Node_536 | Arg_Node_537 | Arg_Node_538 | Arg_Node_539;
          }
interface Arg_Node_348 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_349 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_350 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_351 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_352 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_353 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_354 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_355 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_356 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_357 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_358 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_359 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_360 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_361 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_362 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_363 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_364 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_365 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_366 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_367 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_368 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_369 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_370 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_371 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_372 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_373 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_374 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_375 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_376 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_377 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_378 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_379 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_380 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_381 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_382 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_383 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_384 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_385 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_386 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_387 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_388 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_389 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_390 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_391 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_392 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_393 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_394 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_395 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_396 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_397 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_398 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_399 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_400 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_401 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_402 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_403 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_404 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_405 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_406 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_407 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_408 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_409 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_410 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_411 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_412 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_413 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_414 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_415 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_416 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_417 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_418 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_419 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_420 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_421 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_422 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_423 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_424 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_425 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_426 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_427 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_428 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_429 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_430 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_431 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_432 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_433 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_434 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_435 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_436 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_437 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_438 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_439 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_440 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_441 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_442 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_443 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_444 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_445 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_446 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_447 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_448 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_449 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_450 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_451 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_452 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_453 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_454 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_455 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_456 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_457 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_458 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_459 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_460 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_461 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_462 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_463 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_464 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_465 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_466 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_467 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_468 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_469 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_470 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_471 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_472 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_473 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_474 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_475 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_476 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_477 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_478 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_479 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_480 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_481 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_482 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_483 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_484 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_485 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_486 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_487 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_488 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_489 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_490 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_491 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_492 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_493 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_494 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_495 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_496 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_497 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_498 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_499 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_500 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_501 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_502 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_503 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_504 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_505 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_506 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_507 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_508 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_509 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_510 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_511 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_512 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_513 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_514 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_515 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_516 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_517 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_518 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_519 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_520 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_521 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_522 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_523 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_524 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_525 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_526 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_527 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_528 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_529 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_530 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_531 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_532 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_533 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_534 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_535 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_536 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_537 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_538 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_539 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_540 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_541 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_542 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_543 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_544 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_545 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_546 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_547 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_548 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_549 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_550 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_551 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_552 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_553 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_554 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_555 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_556 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_557 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_558 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_559 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_560 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_561 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_562 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_563 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_564 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_565 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_566 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_567 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_568 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_569 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_570 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_571 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_572 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_573 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_574 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_575 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_576 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_577 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_578 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_579 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_580 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_581 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_582 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_583 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_584 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_585 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_586 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_587 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_588 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_589 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_590 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_591 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_592 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_593 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_594 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_595 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_596 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_597 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_598 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_599 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_600 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_601 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_602 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface Arg_Node_603 extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
interface ArgDefaultValue_Node extends BaseSymbolNode {
        symbol:"argDefaultValue";
        
        children:[EQ_Node,ValueStmt_Node];
        parent:Arg_Node_348 | Arg_Node_350 | Arg_Node_352 | Arg_Node_354 | Arg_Node_356 | Arg_Node_358 | Arg_Node_360 | Arg_Node_362 | Arg_Node_364 | Arg_Node_366 | Arg_Node_368 | Arg_Node_370 | Arg_Node_372 | Arg_Node_374 | Arg_Node_376 | Arg_Node_378 | Arg_Node_380 | Arg_Node_382 | Arg_Node_384 | Arg_Node_386 | Arg_Node_388 | Arg_Node_390 | Arg_Node_392 | Arg_Node_394 | Arg_Node_396 | Arg_Node_398 | Arg_Node_400 | Arg_Node_402 | Arg_Node_404 | Arg_Node_406 | Arg_Node_408 | Arg_Node_410 | Arg_Node_412 | Arg_Node_414 | Arg_Node_416 | Arg_Node_418 | Arg_Node_420 | Arg_Node_422 | Arg_Node_424 | Arg_Node_426 | Arg_Node_428 | Arg_Node_430 | Arg_Node_432 | Arg_Node_434 | Arg_Node_436 | Arg_Node_438 | Arg_Node_440 | Arg_Node_442 | Arg_Node_444 | Arg_Node_446 | Arg_Node_448 | Arg_Node_450 | Arg_Node_452 | Arg_Node_454 | Arg_Node_456 | Arg_Node_458 | Arg_Node_460 | Arg_Node_462 | Arg_Node_464 | Arg_Node_466 | Arg_Node_468 | Arg_Node_470 | Arg_Node_472 | Arg_Node_474 | Arg_Node_476 | Arg_Node_478 | Arg_Node_480 | Arg_Node_482 | Arg_Node_484 | Arg_Node_486 | Arg_Node_488 | Arg_Node_490 | Arg_Node_492 | Arg_Node_494 | Arg_Node_496 | Arg_Node_498 | Arg_Node_500 | Arg_Node_502 | Arg_Node_504 | Arg_Node_506 | Arg_Node_508 | Arg_Node_510 | Arg_Node_512 | Arg_Node_514 | Arg_Node_516 | Arg_Node_518 | Arg_Node_520 | Arg_Node_522 | Arg_Node_524 | Arg_Node_526 | Arg_Node_528 | Arg_Node_530 | Arg_Node_532 | Arg_Node_534 | Arg_Node_536 | Arg_Node_538 | Arg_Node_540 | Arg_Node_542 | Arg_Node_544 | Arg_Node_546 | Arg_Node_548 | Arg_Node_550 | Arg_Node_552 | Arg_Node_554 | Arg_Node_556 | Arg_Node_558 | Arg_Node_560 | Arg_Node_562 | Arg_Node_564 | Arg_Node_566 | Arg_Node_568 | Arg_Node_570 | Arg_Node_572 | Arg_Node_574 | Arg_Node_576 | Arg_Node_578 | Arg_Node_580 | Arg_Node_582 | Arg_Node_584 | Arg_Node_586 | Arg_Node_588 | Arg_Node_590 | Arg_Node_592 | Arg_Node_594 | Arg_Node_596 | Arg_Node_598 | Arg_Node_600 | Arg_Node_602;
      }
export interface AS_Node extends BaseTokenNode {
            token:"AS";
            parent:AsTypeClause_Node_605 | AsTypeClause_Node_606 | AsTypeClause_Node_607 | AsTypeClause_Node_608;
          }
export interface NEW_Node extends BaseTokenNode {
            token:"NEW";
            parent:AsTypeClause_Node_605 | AsTypeClause_Node_606;
          }
interface AsTypeClause_Node_605 extends BaseSymbolNode {
        symbol:"asTypeClause";
        
        children:[AS_Node,NEW_Node,Type__Node,FieldLength_Node];
        parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_66 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_145 | FunctionStmt_Node_146 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_157 | FunctionStmt_Node_158 | FunctionStmt_Node_161 | FunctionStmt_Node_162 | RedimSubStmt_Node_177 | VariableSubStmt_Node_273 | VariableSubStmt_Node_275 | VariableSubStmt_Node_277 | VariableSubStmt_Node_279 | Arg_Node_348 | Arg_Node_349 | Arg_Node_352 | Arg_Node_353 | Arg_Node_356 | Arg_Node_357 | Arg_Node_360 | Arg_Node_361 | Arg_Node_364 | Arg_Node_365 | Arg_Node_368 | Arg_Node_369 | Arg_Node_372 | Arg_Node_373 | Arg_Node_376 | Arg_Node_377 | Arg_Node_380 | Arg_Node_381 | Arg_Node_384 | Arg_Node_385 | Arg_Node_388 | Arg_Node_389 | Arg_Node_392 | Arg_Node_393 | Arg_Node_396 | Arg_Node_397 | Arg_Node_400 | Arg_Node_401 | Arg_Node_404 | Arg_Node_405 | Arg_Node_408 | Arg_Node_409 | Arg_Node_412 | Arg_Node_413 | Arg_Node_416 | Arg_Node_417 | Arg_Node_420 | Arg_Node_421 | Arg_Node_424 | Arg_Node_425 | Arg_Node_428 | Arg_Node_429 | Arg_Node_432 | Arg_Node_433 | Arg_Node_436 | Arg_Node_437 | Arg_Node_440 | Arg_Node_441 | Arg_Node_444 | Arg_Node_445 | Arg_Node_448 | Arg_Node_449 | Arg_Node_452 | Arg_Node_453 | Arg_Node_456 | Arg_Node_457 | Arg_Node_460 | Arg_Node_461 | Arg_Node_464 | Arg_Node_465 | Arg_Node_468 | Arg_Node_469 | Arg_Node_472 | Arg_Node_473 | Arg_Node_476 | Arg_Node_477 | Arg_Node_480 | Arg_Node_481 | Arg_Node_484 | Arg_Node_485 | Arg_Node_488 | Arg_Node_489 | Arg_Node_492 | Arg_Node_493 | Arg_Node_496 | Arg_Node_497 | Arg_Node_500 | Arg_Node_501 | Arg_Node_504 | Arg_Node_505 | Arg_Node_508 | Arg_Node_509 | Arg_Node_512 | Arg_Node_513 | Arg_Node_516 | Arg_Node_517 | Arg_Node_520 | Arg_Node_521 | Arg_Node_524 | Arg_Node_525 | Arg_Node_528 | Arg_Node_529 | Arg_Node_532 | Arg_Node_533 | Arg_Node_536 | Arg_Node_537 | Arg_Node_540 | Arg_Node_541 | Arg_Node_544 | Arg_Node_545 | Arg_Node_548 | Arg_Node_549 | Arg_Node_552 | Arg_Node_553 | Arg_Node_556 | Arg_Node_557 | Arg_Node_560 | Arg_Node_561 | Arg_Node_564 | Arg_Node_565 | Arg_Node_568 | Arg_Node_569 | Arg_Node_572 | Arg_Node_573 | Arg_Node_576 | Arg_Node_577 | Arg_Node_580 | Arg_Node_581 | Arg_Node_584 | Arg_Node_585 | Arg_Node_588 | Arg_Node_589 | Arg_Node_592 | Arg_Node_593 | Arg_Node_596 | Arg_Node_597 | Arg_Node_600 | Arg_Node_601;
      }
interface AsTypeClause_Node_606 extends BaseSymbolNode {
        symbol:"asTypeClause";
        
        children:[AS_Node,NEW_Node,Type__Node];
        parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_66 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_145 | FunctionStmt_Node_146 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_157 | FunctionStmt_Node_158 | FunctionStmt_Node_161 | FunctionStmt_Node_162 | RedimSubStmt_Node_177 | VariableSubStmt_Node_273 | VariableSubStmt_Node_275 | VariableSubStmt_Node_277 | VariableSubStmt_Node_279 | Arg_Node_348 | Arg_Node_349 | Arg_Node_352 | Arg_Node_353 | Arg_Node_356 | Arg_Node_357 | Arg_Node_360 | Arg_Node_361 | Arg_Node_364 | Arg_Node_365 | Arg_Node_368 | Arg_Node_369 | Arg_Node_372 | Arg_Node_373 | Arg_Node_376 | Arg_Node_377 | Arg_Node_380 | Arg_Node_381 | Arg_Node_384 | Arg_Node_385 | Arg_Node_388 | Arg_Node_389 | Arg_Node_392 | Arg_Node_393 | Arg_Node_396 | Arg_Node_397 | Arg_Node_400 | Arg_Node_401 | Arg_Node_404 | Arg_Node_405 | Arg_Node_408 | Arg_Node_409 | Arg_Node_412 | Arg_Node_413 | Arg_Node_416 | Arg_Node_417 | Arg_Node_420 | Arg_Node_421 | Arg_Node_424 | Arg_Node_425 | Arg_Node_428 | Arg_Node_429 | Arg_Node_432 | Arg_Node_433 | Arg_Node_436 | Arg_Node_437 | Arg_Node_440 | Arg_Node_441 | Arg_Node_444 | Arg_Node_445 | Arg_Node_448 | Arg_Node_449 | Arg_Node_452 | Arg_Node_453 | Arg_Node_456 | Arg_Node_457 | Arg_Node_460 | Arg_Node_461 | Arg_Node_464 | Arg_Node_465 | Arg_Node_468 | Arg_Node_469 | Arg_Node_472 | Arg_Node_473 | Arg_Node_476 | Arg_Node_477 | Arg_Node_480 | Arg_Node_481 | Arg_Node_484 | Arg_Node_485 | Arg_Node_488 | Arg_Node_489 | Arg_Node_492 | Arg_Node_493 | Arg_Node_496 | Arg_Node_497 | Arg_Node_500 | Arg_Node_501 | Arg_Node_504 | Arg_Node_505 | Arg_Node_508 | Arg_Node_509 | Arg_Node_512 | Arg_Node_513 | Arg_Node_516 | Arg_Node_517 | Arg_Node_520 | Arg_Node_521 | Arg_Node_524 | Arg_Node_525 | Arg_Node_528 | Arg_Node_529 | Arg_Node_532 | Arg_Node_533 | Arg_Node_536 | Arg_Node_537 | Arg_Node_540 | Arg_Node_541 | Arg_Node_544 | Arg_Node_545 | Arg_Node_548 | Arg_Node_549 | Arg_Node_552 | Arg_Node_553 | Arg_Node_556 | Arg_Node_557 | Arg_Node_560 | Arg_Node_561 | Arg_Node_564 | Arg_Node_565 | Arg_Node_568 | Arg_Node_569 | Arg_Node_572 | Arg_Node_573 | Arg_Node_576 | Arg_Node_577 | Arg_Node_580 | Arg_Node_581 | Arg_Node_584 | Arg_Node_585 | Arg_Node_588 | Arg_Node_589 | Arg_Node_592 | Arg_Node_593 | Arg_Node_596 | Arg_Node_597 | Arg_Node_600 | Arg_Node_601;
      }
interface AsTypeClause_Node_607 extends BaseSymbolNode {
        symbol:"asTypeClause";
        
        children:[AS_Node,Type__Node,FieldLength_Node];
        parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_66 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_145 | FunctionStmt_Node_146 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_157 | FunctionStmt_Node_158 | FunctionStmt_Node_161 | FunctionStmt_Node_162 | RedimSubStmt_Node_177 | VariableSubStmt_Node_273 | VariableSubStmt_Node_275 | VariableSubStmt_Node_277 | VariableSubStmt_Node_279 | Arg_Node_348 | Arg_Node_349 | Arg_Node_352 | Arg_Node_353 | Arg_Node_356 | Arg_Node_357 | Arg_Node_360 | Arg_Node_361 | Arg_Node_364 | Arg_Node_365 | Arg_Node_368 | Arg_Node_369 | Arg_Node_372 | Arg_Node_373 | Arg_Node_376 | Arg_Node_377 | Arg_Node_380 | Arg_Node_381 | Arg_Node_384 | Arg_Node_385 | Arg_Node_388 | Arg_Node_389 | Arg_Node_392 | Arg_Node_393 | Arg_Node_396 | Arg_Node_397 | Arg_Node_400 | Arg_Node_401 | Arg_Node_404 | Arg_Node_405 | Arg_Node_408 | Arg_Node_409 | Arg_Node_412 | Arg_Node_413 | Arg_Node_416 | Arg_Node_417 | Arg_Node_420 | Arg_Node_421 | Arg_Node_424 | Arg_Node_425 | Arg_Node_428 | Arg_Node_429 | Arg_Node_432 | Arg_Node_433 | Arg_Node_436 | Arg_Node_437 | Arg_Node_440 | Arg_Node_441 | Arg_Node_444 | Arg_Node_445 | Arg_Node_448 | Arg_Node_449 | Arg_Node_452 | Arg_Node_453 | Arg_Node_456 | Arg_Node_457 | Arg_Node_460 | Arg_Node_461 | Arg_Node_464 | Arg_Node_465 | Arg_Node_468 | Arg_Node_469 | Arg_Node_472 | Arg_Node_473 | Arg_Node_476 | Arg_Node_477 | Arg_Node_480 | Arg_Node_481 | Arg_Node_484 | Arg_Node_485 | Arg_Node_488 | Arg_Node_489 | Arg_Node_492 | Arg_Node_493 | Arg_Node_496 | Arg_Node_497 | Arg_Node_500 | Arg_Node_501 | Arg_Node_504 | Arg_Node_505 | Arg_Node_508 | Arg_Node_509 | Arg_Node_512 | Arg_Node_513 | Arg_Node_516 | Arg_Node_517 | Arg_Node_520 | Arg_Node_521 | Arg_Node_524 | Arg_Node_525 | Arg_Node_528 | Arg_Node_529 | Arg_Node_532 | Arg_Node_533 | Arg_Node_536 | Arg_Node_537 | Arg_Node_540 | Arg_Node_541 | Arg_Node_544 | Arg_Node_545 | Arg_Node_548 | Arg_Node_549 | Arg_Node_552 | Arg_Node_553 | Arg_Node_556 | Arg_Node_557 | Arg_Node_560 | Arg_Node_561 | Arg_Node_564 | Arg_Node_565 | Arg_Node_568 | Arg_Node_569 | Arg_Node_572 | Arg_Node_573 | Arg_Node_576 | Arg_Node_577 | Arg_Node_580 | Arg_Node_581 | Arg_Node_584 | Arg_Node_585 | Arg_Node_588 | Arg_Node_589 | Arg_Node_592 | Arg_Node_593 | Arg_Node_596 | Arg_Node_597 | Arg_Node_600 | Arg_Node_601;
      }
interface AsTypeClause_Node_608 extends BaseSymbolNode {
        symbol:"asTypeClause";
        
        children:[AS_Node,Type__Node];
        parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_66 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_145 | FunctionStmt_Node_146 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_157 | FunctionStmt_Node_158 | FunctionStmt_Node_161 | FunctionStmt_Node_162 | RedimSubStmt_Node_177 | VariableSubStmt_Node_273 | VariableSubStmt_Node_275 | VariableSubStmt_Node_277 | VariableSubStmt_Node_279 | Arg_Node_348 | Arg_Node_349 | Arg_Node_352 | Arg_Node_353 | Arg_Node_356 | Arg_Node_357 | Arg_Node_360 | Arg_Node_361 | Arg_Node_364 | Arg_Node_365 | Arg_Node_368 | Arg_Node_369 | Arg_Node_372 | Arg_Node_373 | Arg_Node_376 | Arg_Node_377 | Arg_Node_380 | Arg_Node_381 | Arg_Node_384 | Arg_Node_385 | Arg_Node_388 | Arg_Node_389 | Arg_Node_392 | Arg_Node_393 | Arg_Node_396 | Arg_Node_397 | Arg_Node_400 | Arg_Node_401 | Arg_Node_404 | Arg_Node_405 | Arg_Node_408 | Arg_Node_409 | Arg_Node_412 | Arg_Node_413 | Arg_Node_416 | Arg_Node_417 | Arg_Node_420 | Arg_Node_421 | Arg_Node_424 | Arg_Node_425 | Arg_Node_428 | Arg_Node_429 | Arg_Node_432 | Arg_Node_433 | Arg_Node_436 | Arg_Node_437 | Arg_Node_440 | Arg_Node_441 | Arg_Node_444 | Arg_Node_445 | Arg_Node_448 | Arg_Node_449 | Arg_Node_452 | Arg_Node_453 | Arg_Node_456 | Arg_Node_457 | Arg_Node_460 | Arg_Node_461 | Arg_Node_464 | Arg_Node_465 | Arg_Node_468 | Arg_Node_469 | Arg_Node_472 | Arg_Node_473 | Arg_Node_476 | Arg_Node_477 | Arg_Node_480 | Arg_Node_481 | Arg_Node_484 | Arg_Node_485 | Arg_Node_488 | Arg_Node_489 | Arg_Node_492 | Arg_Node_493 | Arg_Node_496 | Arg_Node_497 | Arg_Node_500 | Arg_Node_501 | Arg_Node_504 | Arg_Node_505 | Arg_Node_508 | Arg_Node_509 | Arg_Node_512 | Arg_Node_513 | Arg_Node_516 | Arg_Node_517 | Arg_Node_520 | Arg_Node_521 | Arg_Node_524 | Arg_Node_525 | Arg_Node_528 | Arg_Node_529 | Arg_Node_532 | Arg_Node_533 | Arg_Node_536 | Arg_Node_537 | Arg_Node_540 | Arg_Node_541 | Arg_Node_544 | Arg_Node_545 | Arg_Node_548 | Arg_Node_549 | Arg_Node_552 | Arg_Node_553 | Arg_Node_556 | Arg_Node_557 | Arg_Node_560 | Arg_Node_561 | Arg_Node_564 | Arg_Node_565 | Arg_Node_568 | Arg_Node_569 | Arg_Node_572 | Arg_Node_573 | Arg_Node_576 | Arg_Node_577 | Arg_Node_580 | Arg_Node_581 | Arg_Node_584 | Arg_Node_585 | Arg_Node_588 | Arg_Node_589 | Arg_Node_592 | Arg_Node_593 | Arg_Node_596 | Arg_Node_597 | Arg_Node_600 | Arg_Node_601;
      }
interface Type__Node_609 extends BaseSymbolNode {
        symbol:"type_";
        
        children:[BaseType_Node,...Arg_91_group_7_Node];
        parent:AsTypeClause_Node_605 | AsTypeClause_Node_606 | AsTypeClause_Node_607 | AsTypeClause_Node_608;
      }
interface Type__Node_610 extends BaseSymbolNode {
        symbol:"type_";
        
        children:[BaseType_Node];
        parent:AsTypeClause_Node_605 | AsTypeClause_Node_606 | AsTypeClause_Node_607 | AsTypeClause_Node_608;
      }
interface Type__Node_611 extends BaseSymbolNode {
        symbol:"type_";
        
        children:[ComplexType_Node,...Arg_91_group_7_Node];
        parent:AsTypeClause_Node_605 | AsTypeClause_Node_606 | AsTypeClause_Node_607 | AsTypeClause_Node_608;
      }
interface Type__Node_612 extends BaseSymbolNode {
        symbol:"type_";
        
        children:[ComplexType_Node];
        parent:AsTypeClause_Node_605 | AsTypeClause_Node_606 | AsTypeClause_Node_607 | AsTypeClause_Node_608;
      }
interface ComplexType_Node_613 extends BaseSymbolNode {
        symbol:"complexType";
        
        children:[AmbiguousIdentifier_Node,...ZeroOrMore<ComplexType_97_group_1_Node>];
        parent:Type__Node_611 | Type__Node_612;
      }
interface ComplexType_Node_614 extends BaseSymbolNode {
        symbol:"complexType";
        
        children:[AmbiguousIdentifier_Node,...ZeroOrMore<ComplexType_98_group_1_Node>];
        parent:Type__Node_611 | Type__Node_612;
      }
export interface BOOLEAN_Node extends BaseTokenNode {
            token:"BOOLEAN";
            parent:BaseType_Node_615;
          }
interface BaseType_Node_615 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[BOOLEAN_Node];
        parent:Type__Node_609 | Type__Node_610;
      }
export interface BYTE_Node extends BaseTokenNode {
            token:"BYTE";
            parent:BaseType_Node_616;
          }
interface BaseType_Node_616 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[BYTE_Node];
        parent:Type__Node_609 | Type__Node_610;
      }
export interface COLLECTION_Node extends BaseTokenNode {
            token:"COLLECTION";
            parent:BaseType_Node_617;
          }
interface BaseType_Node_617 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[COLLECTION_Node];
        parent:Type__Node_609 | Type__Node_610;
      }
export interface DOUBLE_Node extends BaseTokenNode {
            token:"DOUBLE";
            parent:BaseType_Node_618;
          }
interface BaseType_Node_618 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[DOUBLE_Node];
        parent:Type__Node_609 | Type__Node_610;
      }
export interface INTEGER_Node extends BaseTokenNode {
            token:"INTEGER";
            parent:BaseType_Node_619;
          }
interface BaseType_Node_619 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[INTEGER_Node];
        parent:Type__Node_609 | Type__Node_610;
      }
export interface LONG_Node extends BaseTokenNode {
            token:"LONG";
            parent:BaseType_Node_620;
          }
interface BaseType_Node_620 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[LONG_Node];
        parent:Type__Node_609 | Type__Node_610;
      }
export interface SINGLE_Node extends BaseTokenNode {
            token:"SINGLE";
            parent:BaseType_Node_621;
          }
interface BaseType_Node_621 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[SINGLE_Node];
        parent:Type__Node_609 | Type__Node_610;
      }
export interface VARIANT_Node extends BaseTokenNode {
            token:"VARIANT";
            parent:BaseType_Node_622;
          }
interface BaseType_Node_622 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[VARIANT_Node];
        parent:Type__Node_609 | Type__Node_610;
      }
export interface STRING_Node extends BaseTokenNode {
            token:"STRING";
            parent:BaseType_Node_623 | BaseType_Node_624;
          }
interface BaseType_Node_623 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[STRING_Node,...BaseType_107_group_1_Node];
        parent:Type__Node_609 | Type__Node_610;
      }
interface BaseType_Node_624 extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[STRING_Node];
        parent:Type__Node_609 | Type__Node_610;
      }
export interface MULT_Node extends BaseTokenNode {
            token:"MULT";
            parent:FieldLength_Node_625 | FieldLength_Node_626 | BaseType_107_group_1_Parent_Node;
          }
interface FieldLength_Node_625 extends BaseSymbolNode {
        symbol:"fieldLength";
        
        children:[MULT_Node,INTEGERLITERAL_Node];
        parent:AsTypeClause_Node_605 | AsTypeClause_Node_607;
      }
interface FieldLength_Node_626 extends BaseSymbolNode {
        symbol:"fieldLength";
        
        children:[MULT_Node,AmbiguousIdentifier_Node];
        parent:AsTypeClause_Node_605 | AsTypeClause_Node_607;
      }
export interface IDENTIFIER_Node extends BaseTokenNode {
            token:"IDENTIFIER";
            parent:AmbiguousIdentifier_Node;
          }
interface AmbiguousIdentifier_Node extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[IDENTIFIER_Node];
        parent:SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_23 | SubStmt_Node_24 | SubStmt_Node_25 | SubStmt_Node_26 | SubStmt_Node_27 | SubStmt_Node_28 | SubStmt_Node_29 | SubStmt_Node_30 | SubStmt_Node_31 | SubStmt_Node_32 | SubStmt_Node_33 | SubStmt_Node_34 | SubStmt_Node_35 | SubStmt_Node_36 | PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_52 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_59 | PropertyGetStmt_Node_60 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_66 | PropertyGetStmt_Node_67 | PropertyGetStmt_Node_68 | PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_71 | PropertySetStmt_Node_72 | PropertySetStmt_Node_73 | PropertySetStmt_Node_74 | PropertySetStmt_Node_75 | PropertySetStmt_Node_76 | PropertySetStmt_Node_77 | PropertySetStmt_Node_78 | PropertySetStmt_Node_79 | PropertySetStmt_Node_80 | PropertySetStmt_Node_81 | PropertySetStmt_Node_82 | PropertySetStmt_Node_83 | PropertySetStmt_Node_84 | PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_87 | PropertyLetStmt_Node_88 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_90 | PropertyLetStmt_Node_91 | PropertyLetStmt_Node_92 | PropertyLetStmt_Node_93 | PropertyLetStmt_Node_94 | PropertyLetStmt_Node_95 | PropertyLetStmt_Node_96 | PropertyLetStmt_Node_97 | PropertyLetStmt_Node_98 | PropertyLetStmt_Node_99 | PropertyLetStmt_Node_100 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_115 | FunctionStmt_Node_116 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_127 | FunctionStmt_Node_128 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_131 | FunctionStmt_Node_132 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_143 | FunctionStmt_Node_144 | FunctionStmt_Node_145 | FunctionStmt_Node_146 | FunctionStmt_Node_147 | FunctionStmt_Node_148 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_155 | FunctionStmt_Node_156 | FunctionStmt_Node_157 | FunctionStmt_Node_158 | FunctionStmt_Node_159 | FunctionStmt_Node_160 | FunctionStmt_Node_161 | FunctionStmt_Node_162 | FunctionStmt_Node_163 | FunctionStmt_Node_164 | ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_198 | ECS_MemberProcedureCall_Node_199 | ECS_MemberProcedureCall_Node_200 | ECS_MemberProcedureCall_Node_201 | ECS_MemberProcedureCall_Node_202 | ECS_MemberProcedureCall_Node_203 | ECS_MemberProcedureCall_Node_204 | ECS_MemberProcedureCall_Node_205 | ECS_MemberProcedureCall_Node_206 | ECS_MemberProcedureCall_Node_207 | ECS_MemberProcedureCall_Node_208 | ECS_MemberProcedureCall_Node_209 | ECS_ProcedureCall_Node_210 | ECS_ProcedureCall_Node_211 | ECS_ProcedureCall_Node_212 | ECS_ProcedureCall_Node_213 | ECS_ProcedureCall_Node_214 | ECS_ProcedureCall_Node_215 | ECS_ProcedureCall_Node_216 | ECS_ProcedureCall_Node_217 | ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_226 | ICS_B_MemberProcedureCall_Node_227 | ICS_B_MemberProcedureCall_Node_228 | ICS_B_MemberProcedureCall_Node_229 | ICS_B_MemberProcedureCall_Node_230 | ICS_B_MemberProcedureCall_Node_231 | ICS_B_MemberProcedureCall_Node_232 | ICS_B_MemberProcedureCall_Node_233 | ICS_B_MemberProcedureCall_Node_234 | ICS_B_MemberProcedureCall_Node_235 | ICS_B_ProcedureCall_Node_236 | ICS_B_ProcedureCall_Node_237 | ICS_B_ProcedureCall_Node_238 | ICS_B_ProcedureCall_Node_239 | VariableSubStmt_Node_273 | VariableSubStmt_Node_274 | VariableSubStmt_Node_275 | VariableSubStmt_Node_276 | VariableSubStmt_Node_277 | VariableSubStmt_Node_278 | VariableSubStmt_Node_279 | VariableSubStmt_Node_280 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_316 | ICS_S_ProcedureOrArrayCall_Node_317 | ICS_S_ProcedureOrArrayCall_Node_318 | ICS_S_ProcedureOrArrayCall_Node_319 | ICS_S_ProcedureOrArrayCall_Node_320 | ICS_S_ProcedureOrArrayCall_Node_321 | ICS_S_ProcedureOrArrayCall_Node_322 | ICS_S_ProcedureOrArrayCall_Node_323 | ICS_S_ProcedureOrArrayCall_Node_324 | ICS_S_ProcedureOrArrayCall_Node_325 | ICS_S_ProcedureOrArrayCall_Node_326 | ICS_S_ProcedureOrArrayCall_Node_327 | ICS_S_ProcedureOrArrayCall_Node_328 | ICS_S_ProcedureOrArrayCall_Node_329 | ICS_S_VariableOrProcedureCall_Node_330 | ICS_S_VariableOrProcedureCall_Node_331 | ICS_S_VariableOrProcedureCall_Node_332 | ICS_S_VariableOrProcedureCall_Node_333 | ICS_S_VariableOrProcedureCall_Node_334 | ICS_S_VariableOrProcedureCall_Node_335 | ICS_S_VariableOrProcedureCall_Node_336 | ICS_S_VariableOrProcedureCall_Node_337 | DictionaryCallStmt_Node_338 | DictionaryCallStmt_Node_339 | Arg_Node_348 | Arg_Node_349 | Arg_Node_350 | Arg_Node_351 | Arg_Node_352 | Arg_Node_353 | Arg_Node_354 | Arg_Node_355 | Arg_Node_356 | Arg_Node_357 | Arg_Node_358 | Arg_Node_359 | Arg_Node_360 | Arg_Node_361 | Arg_Node_362 | Arg_Node_363 | Arg_Node_364 | Arg_Node_365 | Arg_Node_366 | Arg_Node_367 | Arg_Node_368 | Arg_Node_369 | Arg_Node_370 | Arg_Node_371 | Arg_Node_372 | Arg_Node_373 | Arg_Node_374 | Arg_Node_375 | Arg_Node_376 | Arg_Node_377 | Arg_Node_378 | Arg_Node_379 | Arg_Node_380 | Arg_Node_381 | Arg_Node_382 | Arg_Node_383 | Arg_Node_384 | Arg_Node_385 | Arg_Node_386 | Arg_Node_387 | Arg_Node_388 | Arg_Node_389 | Arg_Node_390 | Arg_Node_391 | Arg_Node_392 | Arg_Node_393 | Arg_Node_394 | Arg_Node_395 | Arg_Node_396 | Arg_Node_397 | Arg_Node_398 | Arg_Node_399 | Arg_Node_400 | Arg_Node_401 | Arg_Node_402 | Arg_Node_403 | Arg_Node_404 | Arg_Node_405 | Arg_Node_406 | Arg_Node_407 | Arg_Node_408 | Arg_Node_409 | Arg_Node_410 | Arg_Node_411 | Arg_Node_412 | Arg_Node_413 | Arg_Node_414 | Arg_Node_415 | Arg_Node_416 | Arg_Node_417 | Arg_Node_418 | Arg_Node_419 | Arg_Node_420 | Arg_Node_421 | Arg_Node_422 | Arg_Node_423 | Arg_Node_424 | Arg_Node_425 | Arg_Node_426 | Arg_Node_427 | Arg_Node_428 | Arg_Node_429 | Arg_Node_430 | Arg_Node_431 | Arg_Node_432 | Arg_Node_433 | Arg_Node_434 | Arg_Node_435 | Arg_Node_436 | Arg_Node_437 | Arg_Node_438 | Arg_Node_439 | Arg_Node_440 | Arg_Node_441 | Arg_Node_442 | Arg_Node_443 | Arg_Node_444 | Arg_Node_445 | Arg_Node_446 | Arg_Node_447 | Arg_Node_448 | Arg_Node_449 | Arg_Node_450 | Arg_Node_451 | Arg_Node_452 | Arg_Node_453 | Arg_Node_454 | Arg_Node_455 | Arg_Node_456 | Arg_Node_457 | Arg_Node_458 | Arg_Node_459 | Arg_Node_460 | Arg_Node_461 | Arg_Node_462 | Arg_Node_463 | Arg_Node_464 | Arg_Node_465 | Arg_Node_466 | Arg_Node_467 | Arg_Node_468 | Arg_Node_469 | Arg_Node_470 | Arg_Node_471 | Arg_Node_472 | Arg_Node_473 | Arg_Node_474 | Arg_Node_475 | Arg_Node_476 | Arg_Node_477 | Arg_Node_478 | Arg_Node_479 | Arg_Node_480 | Arg_Node_481 | Arg_Node_482 | Arg_Node_483 | Arg_Node_484 | Arg_Node_485 | Arg_Node_486 | Arg_Node_487 | Arg_Node_488 | Arg_Node_489 | Arg_Node_490 | Arg_Node_491 | Arg_Node_492 | Arg_Node_493 | Arg_Node_494 | Arg_Node_495 | Arg_Node_496 | Arg_Node_497 | Arg_Node_498 | Arg_Node_499 | Arg_Node_500 | Arg_Node_501 | Arg_Node_502 | Arg_Node_503 | Arg_Node_504 | Arg_Node_505 | Arg_Node_506 | Arg_Node_507 | Arg_Node_508 | Arg_Node_509 | Arg_Node_510 | Arg_Node_511 | Arg_Node_512 | Arg_Node_513 | Arg_Node_514 | Arg_Node_515 | Arg_Node_516 | Arg_Node_517 | Arg_Node_518 | Arg_Node_519 | Arg_Node_520 | Arg_Node_521 | Arg_Node_522 | Arg_Node_523 | Arg_Node_524 | Arg_Node_525 | Arg_Node_526 | Arg_Node_527 | Arg_Node_528 | Arg_Node_529 | Arg_Node_530 | Arg_Node_531 | Arg_Node_532 | Arg_Node_533 | Arg_Node_534 | Arg_Node_535 | Arg_Node_536 | Arg_Node_537 | Arg_Node_538 | Arg_Node_539 | Arg_Node_540 | Arg_Node_541 | Arg_Node_542 | Arg_Node_543 | Arg_Node_544 | Arg_Node_545 | Arg_Node_546 | Arg_Node_547 | Arg_Node_548 | Arg_Node_549 | Arg_Node_550 | Arg_Node_551 | Arg_Node_552 | Arg_Node_553 | Arg_Node_554 | Arg_Node_555 | Arg_Node_556 | Arg_Node_557 | Arg_Node_558 | Arg_Node_559 | Arg_Node_560 | Arg_Node_561 | Arg_Node_562 | Arg_Node_563 | Arg_Node_564 | Arg_Node_565 | Arg_Node_566 | Arg_Node_567 | Arg_Node_568 | Arg_Node_569 | Arg_Node_570 | Arg_Node_571 | Arg_Node_572 | Arg_Node_573 | Arg_Node_574 | Arg_Node_575 | Arg_Node_576 | Arg_Node_577 | Arg_Node_578 | Arg_Node_579 | Arg_Node_580 | Arg_Node_581 | Arg_Node_582 | Arg_Node_583 | Arg_Node_584 | Arg_Node_585 | Arg_Node_586 | Arg_Node_587 | Arg_Node_588 | Arg_Node_589 | Arg_Node_590 | Arg_Node_591 | Arg_Node_592 | Arg_Node_593 | Arg_Node_594 | Arg_Node_595 | Arg_Node_596 | Arg_Node_597 | Arg_Node_598 | Arg_Node_599 | Arg_Node_600 | Arg_Node_601 | Arg_Node_602 | Arg_Node_603 | ComplexType_Node_613 | ComplexType_Node_614 | FieldLength_Node_626 | ComplexType_97_group_1_Parent_Node | ComplexType_98_group_1_Parent_Node;
      }
type ModuleDeclarations_8_group_1_Node  = [...OneOrMore<EndOfLine_Node>,ModuleDeclarationsElement_Node];
type ModuleBody_10_group_1_Node  = [...OneOrMore<EndOfLine_Node>,ModuleBodyElement_Node];
type Block_25_group_1_Node  = [EndOfStatement_Node,BlockStmt_Node];
export interface TOKEN_6_Node extends BaseTokenNode {
            token:",";
            parent:EraseStmt_34_group_2_Parent_Node | RedimStmt_35_group_3_Parent_Node | ArgsCall_55_group_1_Parent_Node_636 | ArgsCall_55_group_1_Parent_Node_637 | VariableListStmt_62_group_1_Parent_Node | Subscripts_66_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
          }
type EraseStmt_34_group_2_Node  = [TOKEN_6_Node,ValueStmt_Node];
type RedimStmt_35_group_3_Node  = [TOKEN_6_Node,RedimSubStmt_Node];
type ECS_MemberProcedureCall_49_group_5_Node  = [LPAREN_Node,ArgsCall_Node,RPAREN_Node];
type ECS_MemberProcedureCall_49_group_10_Node  = [LPAREN_Node,Indexes_Node,RPAREN_Node];
type ICS_B_ProcedureCall_54_group_2_Node  = [LPAREN_Node,Subscripts_Node,RPAREN_Node];
type ArgsCall_55_group_1_Node_636  = [TOKEN_6_Node,ArgCall_Node];
type ArgsCall_55_group_1_Node_637  = [TOKEN_6_Node];
type VariableListStmt_62_group_1_Node  = [TOKEN_6_Node,VariableSubStmt_Node];
type VariableSubStmt_63_group_1_Node_639  = [LPAREN_Node,Subscripts_Node,RPAREN_Node];
type VariableSubStmt_63_group_1_Node_640  = [LPAREN_Node,RPAREN_Node];
export interface TO_Node extends BaseTokenNode {
            token:"TO";
            parent:Subscript__65_group_0_Parent_Node;
          }
type Subscript__65_group_0_Node  = [ValueStmt_Node,TO_Node];
type Subscripts_66_group_1_Node  = [TOKEN_6_Node,Subscript__Node];
type ArgList_68_group_1_Node  = [Arg_Node,...ZeroOrMore<ArgList_68_group_1_234_group_1_Node>];
type Arg_91_group_7_Node  = [LPAREN_Node,RPAREN_Node];
type ComplexType_97_group_1_Node  = [TOKEN_0_Node,AmbiguousIdentifier_Node];
type ComplexType_98_group_1_Node  = [TOKEN_1_Node,AmbiguousIdentifier_Node];
type BaseType_107_group_1_Node  = [MULT_Node,ValueStmt_Node];
type ArgList_68_group_1_234_group_1_Node  = [TOKEN_6_Node,Arg_Node];
export type Progam_Node = Progam_Node_0 | Progam_Node_1 | Progam_Node_2 | Progam_Node_3;
export type EndOfLine_Node = EndOfLine_Node_4 | EndOfLine_Node_5 | EndOfLine_Node_6;
export type EndOfStatement_Node = EndOfStatement_Node_7 | EndOfStatement_Node_8;
export type { ModuleDeclarations_Node };
export type { ModuleDeclarationsElement_Node };
export type { ModuleBody_Node };
export type ModuleBodyElement_Node = ModuleBodyElement_Node_12 | ModuleBodyElement_Node_13 | ModuleBodyElement_Node_14 | ModuleBodyElement_Node_15 | ModuleBodyElement_Node_16;
export type Visibility_Node = Visibility_Node_17 | Visibility_Node_18 | Visibility_Node_19 | Visibility_Node_20;
export type SubStmt_Node = SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_23 | SubStmt_Node_24 | SubStmt_Node_25 | SubStmt_Node_26 | SubStmt_Node_27 | SubStmt_Node_28 | SubStmt_Node_29 | SubStmt_Node_30 | SubStmt_Node_31 | SubStmt_Node_32 | SubStmt_Node_33 | SubStmt_Node_34 | SubStmt_Node_35 | SubStmt_Node_36;
export type PropertyGetStmt_Node = PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_52 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_59 | PropertyGetStmt_Node_60 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_66 | PropertyGetStmt_Node_67 | PropertyGetStmt_Node_68;
export type PropertySetStmt_Node = PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_71 | PropertySetStmt_Node_72 | PropertySetStmt_Node_73 | PropertySetStmt_Node_74 | PropertySetStmt_Node_75 | PropertySetStmt_Node_76 | PropertySetStmt_Node_77 | PropertySetStmt_Node_78 | PropertySetStmt_Node_79 | PropertySetStmt_Node_80 | PropertySetStmt_Node_81 | PropertySetStmt_Node_82 | PropertySetStmt_Node_83 | PropertySetStmt_Node_84;
export type PropertyLetStmt_Node = PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_87 | PropertyLetStmt_Node_88 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_90 | PropertyLetStmt_Node_91 | PropertyLetStmt_Node_92 | PropertyLetStmt_Node_93 | PropertyLetStmt_Node_94 | PropertyLetStmt_Node_95 | PropertyLetStmt_Node_96 | PropertyLetStmt_Node_97 | PropertyLetStmt_Node_98 | PropertyLetStmt_Node_99 | PropertyLetStmt_Node_100;
export type FunctionStmt_Node = FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_115 | FunctionStmt_Node_116 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_127 | FunctionStmt_Node_128 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_131 | FunctionStmt_Node_132 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_143 | FunctionStmt_Node_144 | FunctionStmt_Node_145 | FunctionStmt_Node_146 | FunctionStmt_Node_147 | FunctionStmt_Node_148 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_155 | FunctionStmt_Node_156 | FunctionStmt_Node_157 | FunctionStmt_Node_158 | FunctionStmt_Node_159 | FunctionStmt_Node_160 | FunctionStmt_Node_161 | FunctionStmt_Node_162 | FunctionStmt_Node_163 | FunctionStmt_Node_164;
export type { Block_Node };
export type BlockStmt_Node = BlockStmt_Node_166 | BlockStmt_Node_167 | BlockStmt_Node_168 | BlockStmt_Node_169 | BlockStmt_Node_170 | BlockStmt_Node_171 | BlockStmt_Node_172 | BlockStmt_Node_173;
export type { EraseStmt_Node };
export type RedimStmt_Node = RedimStmt_Node_175 | RedimStmt_Node_176;
export type RedimSubStmt_Node = RedimSubStmt_Node_177 | RedimSubStmt_Node_178;
export type ExitStmt_Node = ExitStmt_Node_179 | ExitStmt_Node_180 | ExitStmt_Node_181 | ExitStmt_Node_182 | ExitStmt_Node_183 | ExitStmt_Node_184;
export type LetStmt_Node = LetStmt_Node_185 | LetStmt_Node_186 | LetStmt_Node_187 | LetStmt_Node_188 | LetStmt_Node_189 | LetStmt_Node_190;
export type { SetStmt_Node };
export type ExplicitCallStmt_Node = ExplicitCallStmt_Node_192 | ExplicitCallStmt_Node_193;
export type ECS_MemberProcedureCall_Node = ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_198 | ECS_MemberProcedureCall_Node_199 | ECS_MemberProcedureCall_Node_200 | ECS_MemberProcedureCall_Node_201 | ECS_MemberProcedureCall_Node_202 | ECS_MemberProcedureCall_Node_203 | ECS_MemberProcedureCall_Node_204 | ECS_MemberProcedureCall_Node_205 | ECS_MemberProcedureCall_Node_206 | ECS_MemberProcedureCall_Node_207 | ECS_MemberProcedureCall_Node_208 | ECS_MemberProcedureCall_Node_209;
export type ECS_ProcedureCall_Node = ECS_ProcedureCall_Node_210 | ECS_ProcedureCall_Node_211 | ECS_ProcedureCall_Node_212 | ECS_ProcedureCall_Node_213 | ECS_ProcedureCall_Node_214 | ECS_ProcedureCall_Node_215 | ECS_ProcedureCall_Node_216 | ECS_ProcedureCall_Node_217;
export type ImplicitCallStmt_InBlock_Node = ImplicitCallStmt_InBlock_Node_218 | ImplicitCallStmt_InBlock_Node_219;
export type ICS_B_MemberProcedureCall_Node = ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_226 | ICS_B_MemberProcedureCall_Node_227 | ICS_B_MemberProcedureCall_Node_228 | ICS_B_MemberProcedureCall_Node_229 | ICS_B_MemberProcedureCall_Node_230 | ICS_B_MemberProcedureCall_Node_231 | ICS_B_MemberProcedureCall_Node_232 | ICS_B_MemberProcedureCall_Node_233 | ICS_B_MemberProcedureCall_Node_234 | ICS_B_MemberProcedureCall_Node_235;
export type ICS_B_ProcedureCall_Node = ICS_B_ProcedureCall_Node_236 | ICS_B_ProcedureCall_Node_237 | ICS_B_ProcedureCall_Node_238 | ICS_B_ProcedureCall_Node_239;
export type ArgsCall_Node = ArgsCall_Node_240 | ArgsCall_Node_241;
export type ArgCall_Node = ArgCall_Node_242 | ArgCall_Node_243 | ArgCall_Node_244 | ArgCall_Node_245 | ArgCall_Node_246 | ArgCall_Node_247 | ArgCall_Node_248 | ArgCall_Node_249 | ArgCall_Node_250 | ArgCall_Node_251 | ArgCall_Node_252 | ArgCall_Node_253 | ArgCall_Node_254 | ArgCall_Node_255 | ArgCall_Node_256 | ArgCall_Node_257 | ArgCall_Node_258 | ArgCall_Node_259 | ArgCall_Node_260 | ArgCall_Node_261 | ArgCall_Node_262 | ArgCall_Node_263 | ArgCall_Node_264 | ArgCall_Node_265;
export type VariableStmt_Node = VariableStmt_Node_266 | VariableStmt_Node_267 | VariableStmt_Node_268 | VariableStmt_Node_269 | VariableStmt_Node_270 | VariableStmt_Node_271;
export type { VariableListStmt_Node };
export type VariableSubStmt_Node = VariableSubStmt_Node_273 | VariableSubStmt_Node_274 | VariableSubStmt_Node_275 | VariableSubStmt_Node_276 | VariableSubStmt_Node_277 | VariableSubStmt_Node_278 | VariableSubStmt_Node_279 | VariableSubStmt_Node_280;
export type { Indexes_Node };
export type Subscript__Node = Subscript__Node_282 | Subscript__Node_283 | Subscript__Node_285 | Subscript__Node_286;
export type { Subscripts_Node };
export type ArgList_Node = ArgList_Node_287 | ArgList_Node_288;
export type ValueStmt_Node = ValueStmt_Node_289 | ValueStmt_Node_290;
export type ImplicitCallStmt_InStmt_Node = ImplicitCallStmt_InStmt_Node_291 | ImplicitCallStmt_InStmt_Node_292 | ImplicitCallStmt_InStmt_Node_293;
export type ICS_S_MembersCall_Node = ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MembersCall_Node_298 | ICS_S_MembersCall_Node_299 | ICS_S_MembersCall_Node_300 | ICS_S_MembersCall_Node_301 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MembersCall_Node_306 | ICS_S_MembersCall_Node_307 | ICS_S_MembersCall_Node_308 | ICS_S_MembersCall_Node_309;
export type ICS_S_MemberCall_Node = ICS_S_MemberCall_Node_310 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_312 | ICS_S_MemberCall_Node_313;
export type ICS_S_ProcedureOrArrayCall_Node = ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_316 | ICS_S_ProcedureOrArrayCall_Node_317 | ICS_S_ProcedureOrArrayCall_Node_318 | ICS_S_ProcedureOrArrayCall_Node_319 | ICS_S_ProcedureOrArrayCall_Node_320 | ICS_S_ProcedureOrArrayCall_Node_321 | ICS_S_ProcedureOrArrayCall_Node_322 | ICS_S_ProcedureOrArrayCall_Node_323 | ICS_S_ProcedureOrArrayCall_Node_324 | ICS_S_ProcedureOrArrayCall_Node_325 | ICS_S_ProcedureOrArrayCall_Node_326 | ICS_S_ProcedureOrArrayCall_Node_327 | ICS_S_ProcedureOrArrayCall_Node_328 | ICS_S_ProcedureOrArrayCall_Node_329;
export type ICS_S_VariableOrProcedureCall_Node = ICS_S_VariableOrProcedureCall_Node_330 | ICS_S_VariableOrProcedureCall_Node_331 | ICS_S_VariableOrProcedureCall_Node_332 | ICS_S_VariableOrProcedureCall_Node_333 | ICS_S_VariableOrProcedureCall_Node_334 | ICS_S_VariableOrProcedureCall_Node_335 | ICS_S_VariableOrProcedureCall_Node_336 | ICS_S_VariableOrProcedureCall_Node_337;
export type DictionaryCallStmt_Node = DictionaryCallStmt_Node_338 | DictionaryCallStmt_Node_339;
export type Literal_Node = Literal_Node_340 | Literal_Node_341;
export type TypeHint_Node = TypeHint_Node_342 | TypeHint_Node_343 | TypeHint_Node_344 | TypeHint_Node_345 | TypeHint_Node_346 | TypeHint_Node_347;
export type Arg_Node = Arg_Node_348 | Arg_Node_349 | Arg_Node_350 | Arg_Node_351 | Arg_Node_352 | Arg_Node_353 | Arg_Node_354 | Arg_Node_355 | Arg_Node_356 | Arg_Node_357 | Arg_Node_358 | Arg_Node_359 | Arg_Node_360 | Arg_Node_361 | Arg_Node_362 | Arg_Node_363 | Arg_Node_364 | Arg_Node_365 | Arg_Node_366 | Arg_Node_367 | Arg_Node_368 | Arg_Node_369 | Arg_Node_370 | Arg_Node_371 | Arg_Node_372 | Arg_Node_373 | Arg_Node_374 | Arg_Node_375 | Arg_Node_376 | Arg_Node_377 | Arg_Node_378 | Arg_Node_379 | Arg_Node_380 | Arg_Node_381 | Arg_Node_382 | Arg_Node_383 | Arg_Node_384 | Arg_Node_385 | Arg_Node_386 | Arg_Node_387 | Arg_Node_388 | Arg_Node_389 | Arg_Node_390 | Arg_Node_391 | Arg_Node_392 | Arg_Node_393 | Arg_Node_394 | Arg_Node_395 | Arg_Node_396 | Arg_Node_397 | Arg_Node_398 | Arg_Node_399 | Arg_Node_400 | Arg_Node_401 | Arg_Node_402 | Arg_Node_403 | Arg_Node_404 | Arg_Node_405 | Arg_Node_406 | Arg_Node_407 | Arg_Node_408 | Arg_Node_409 | Arg_Node_410 | Arg_Node_411 | Arg_Node_412 | Arg_Node_413 | Arg_Node_414 | Arg_Node_415 | Arg_Node_416 | Arg_Node_417 | Arg_Node_418 | Arg_Node_419 | Arg_Node_420 | Arg_Node_421 | Arg_Node_422 | Arg_Node_423 | Arg_Node_424 | Arg_Node_425 | Arg_Node_426 | Arg_Node_427 | Arg_Node_428 | Arg_Node_429 | Arg_Node_430 | Arg_Node_431 | Arg_Node_432 | Arg_Node_433 | Arg_Node_434 | Arg_Node_435 | Arg_Node_436 | Arg_Node_437 | Arg_Node_438 | Arg_Node_439 | Arg_Node_440 | Arg_Node_441 | Arg_Node_442 | Arg_Node_443 | Arg_Node_444 | Arg_Node_445 | Arg_Node_446 | Arg_Node_447 | Arg_Node_448 | Arg_Node_449 | Arg_Node_450 | Arg_Node_451 | Arg_Node_452 | Arg_Node_453 | Arg_Node_454 | Arg_Node_455 | Arg_Node_456 | Arg_Node_457 | Arg_Node_458 | Arg_Node_459 | Arg_Node_460 | Arg_Node_461 | Arg_Node_462 | Arg_Node_463 | Arg_Node_464 | Arg_Node_465 | Arg_Node_466 | Arg_Node_467 | Arg_Node_468 | Arg_Node_469 | Arg_Node_470 | Arg_Node_471 | Arg_Node_472 | Arg_Node_473 | Arg_Node_474 | Arg_Node_475 | Arg_Node_476 | Arg_Node_477 | Arg_Node_478 | Arg_Node_479 | Arg_Node_480 | Arg_Node_481 | Arg_Node_482 | Arg_Node_483 | Arg_Node_484 | Arg_Node_485 | Arg_Node_486 | Arg_Node_487 | Arg_Node_488 | Arg_Node_489 | Arg_Node_490 | Arg_Node_491 | Arg_Node_492 | Arg_Node_493 | Arg_Node_494 | Arg_Node_495 | Arg_Node_496 | Arg_Node_497 | Arg_Node_498 | Arg_Node_499 | Arg_Node_500 | Arg_Node_501 | Arg_Node_502 | Arg_Node_503 | Arg_Node_504 | Arg_Node_505 | Arg_Node_506 | Arg_Node_507 | Arg_Node_508 | Arg_Node_509 | Arg_Node_510 | Arg_Node_511 | Arg_Node_512 | Arg_Node_513 | Arg_Node_514 | Arg_Node_515 | Arg_Node_516 | Arg_Node_517 | Arg_Node_518 | Arg_Node_519 | Arg_Node_520 | Arg_Node_521 | Arg_Node_522 | Arg_Node_523 | Arg_Node_524 | Arg_Node_525 | Arg_Node_526 | Arg_Node_527 | Arg_Node_528 | Arg_Node_529 | Arg_Node_530 | Arg_Node_531 | Arg_Node_532 | Arg_Node_533 | Arg_Node_534 | Arg_Node_535 | Arg_Node_536 | Arg_Node_537 | Arg_Node_538 | Arg_Node_539 | Arg_Node_540 | Arg_Node_541 | Arg_Node_542 | Arg_Node_543 | Arg_Node_544 | Arg_Node_545 | Arg_Node_546 | Arg_Node_547 | Arg_Node_548 | Arg_Node_549 | Arg_Node_550 | Arg_Node_551 | Arg_Node_552 | Arg_Node_553 | Arg_Node_554 | Arg_Node_555 | Arg_Node_556 | Arg_Node_557 | Arg_Node_558 | Arg_Node_559 | Arg_Node_560 | Arg_Node_561 | Arg_Node_562 | Arg_Node_563 | Arg_Node_564 | Arg_Node_565 | Arg_Node_566 | Arg_Node_567 | Arg_Node_568 | Arg_Node_569 | Arg_Node_570 | Arg_Node_571 | Arg_Node_572 | Arg_Node_573 | Arg_Node_574 | Arg_Node_575 | Arg_Node_576 | Arg_Node_577 | Arg_Node_578 | Arg_Node_579 | Arg_Node_580 | Arg_Node_581 | Arg_Node_582 | Arg_Node_583 | Arg_Node_584 | Arg_Node_585 | Arg_Node_586 | Arg_Node_587 | Arg_Node_588 | Arg_Node_589 | Arg_Node_590 | Arg_Node_591 | Arg_Node_592 | Arg_Node_593 | Arg_Node_594 | Arg_Node_595 | Arg_Node_596 | Arg_Node_597 | Arg_Node_598 | Arg_Node_599 | Arg_Node_600 | Arg_Node_601 | Arg_Node_602 | Arg_Node_603;
export type { ArgDefaultValue_Node };
export type AsTypeClause_Node = AsTypeClause_Node_605 | AsTypeClause_Node_606 | AsTypeClause_Node_607 | AsTypeClause_Node_608;
export type Type__Node = Type__Node_609 | Type__Node_610 | Type__Node_611 | Type__Node_612;
export type ComplexType_Node = ComplexType_Node_613 | ComplexType_Node_614;
export type BaseType_Node = BaseType_Node_615 | BaseType_Node_616 | BaseType_Node_617 | BaseType_Node_618 | BaseType_Node_619 | BaseType_Node_620 | BaseType_Node_621 | BaseType_Node_622 | BaseType_Node_623 | BaseType_Node_624;
export type FieldLength_Node = FieldLength_Node_625 | FieldLength_Node_626;
export type { AmbiguousIdentifier_Node };
type ArgsCall_55_group_1_Node = ArgsCall_55_group_1_Node_636 | ArgsCall_55_group_1_Node_637;
type VariableSubStmt_63_group_1_Node = VariableSubStmt_63_group_1_Node_639 | VariableSubStmt_63_group_1_Node_640;
export type AstNodeTypeMap = { ast: AstNode;
progam: Progam_Node;
endOfLine: EndOfLine_Node;
endOfStatement: EndOfStatement_Node;
moduleDeclarations: ModuleDeclarations_Node;
moduleDeclarationsElement: ModuleDeclarationsElement_Node;
moduleBody: ModuleBody_Node;
moduleBodyElement: ModuleBodyElement_Node;
visibility: Visibility_Node;
subStmt: SubStmt_Node;
propertyGetStmt: PropertyGetStmt_Node;
propertySetStmt: PropertySetStmt_Node;
propertyLetStmt: PropertyLetStmt_Node;
functionStmt: FunctionStmt_Node;
block: Block_Node;
blockStmt: BlockStmt_Node;
eraseStmt: EraseStmt_Node;
redimStmt: RedimStmt_Node;
redimSubStmt: RedimSubStmt_Node;
exitStmt: ExitStmt_Node;
letStmt: LetStmt_Node;
setStmt: SetStmt_Node;
explicitCallStmt: ExplicitCallStmt_Node;
eCS_MemberProcedureCall: ECS_MemberProcedureCall_Node;
eCS_ProcedureCall: ECS_ProcedureCall_Node;
implicitCallStmt_InBlock: ImplicitCallStmt_InBlock_Node;
iCS_B_MemberProcedureCall: ICS_B_MemberProcedureCall_Node;
iCS_B_ProcedureCall: ICS_B_ProcedureCall_Node;
argsCall: ArgsCall_Node;
argCall: ArgCall_Node;
variableStmt: VariableStmt_Node;
variableListStmt: VariableListStmt_Node;
variableSubStmt: VariableSubStmt_Node;
indexes: Indexes_Node;
subscript_: Subscript__Node;
subscripts: Subscripts_Node;
argList: ArgList_Node;
valueStmt: ValueStmt_Node;
implicitCallStmt_InStmt: ImplicitCallStmt_InStmt_Node;
iCS_S_MembersCall: ICS_S_MembersCall_Node;
iCS_S_MemberCall: ICS_S_MemberCall_Node;
iCS_S_ProcedureOrArrayCall: ICS_S_ProcedureOrArrayCall_Node;
iCS_S_VariableOrProcedureCall: ICS_S_VariableOrProcedureCall_Node;
dictionaryCallStmt: DictionaryCallStmt_Node;
literal: Literal_Node;
typeHint: TypeHint_Node;
arg: Arg_Node;
argDefaultValue: ArgDefaultValue_Node;
asTypeClause: AsTypeClause_Node;
type_: Type__Node;
complexType: ComplexType_Node;
baseType: BaseType_Node;
fieldLength: FieldLength_Node;
ambiguousIdentifier: AmbiguousIdentifier_Node;
$EOF: $EOF_Node;
$UNKNOWN: $UNKNOWN_Node;
NEWLINE: NEWLINE_Node;
COMMENT: COMMENT_Node;
REMCOMMENT: REMCOMMENT_Node;
COLON: COLON_Node;
PRIVATE: PRIVATE_Node;
PUBLIC: PUBLIC_Node;
FRIEND: FRIEND_Node;
GLOBAL: GLOBAL_Node;
STATIC: STATIC_Node;
SUB: SUB_Node;
END_SUB: END_SUB_Node;
PROPERTY_GET: PROPERTY_GET_Node;
LPAREN: LPAREN_Node;
RPAREN: RPAREN_Node;
END_PROPERTY: END_PROPERTY_Node;
PROPERTY_SET: PROPERTY_SET_Node;
PROPERTY_LET: PROPERTY_LET_Node;
FUNCTION: FUNCTION_Node;
END_FUNCTION: END_FUNCTION_Node;
ERASE: ERASE_Node;
REDIM: REDIM_Node;
PRESERVE: PRESERVE_Node;
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
TOKEN_0: TOKEN_0_Node;
BYREF: BYREF_Node;
BYVAL: BYVAL_Node;
PARAMARRAY: PARAMARRAY_Node;
DIM: DIM_Node;
WITHEVENTS: WITHEVENTS_Node;
TOKEN_1: TOKEN_1_Node;
INTEGERLITERAL: INTEGERLITERAL_Node;
STRINGLITERAL: STRINGLITERAL_Node;
TOKEN_2: TOKEN_2_Node;
TOKEN_3: TOKEN_3_Node;
TOKEN_4: TOKEN_4_Node;
TOKEN_5: TOKEN_5_Node;
$: $_Node;
OPTIONAL: OPTIONAL_Node;
AS: AS_Node;
NEW: NEW_Node;
BOOLEAN: BOOLEAN_Node;
BYTE: BYTE_Node;
COLLECTION: COLLECTION_Node;
DOUBLE: DOUBLE_Node;
INTEGER: INTEGER_Node;
LONG: LONG_Node;
SINGLE: SINGLE_Node;
VARIANT: VARIANT_Node;
STRING: STRING_Node;
MULT: MULT_Node;
IDENTIFIER: IDENTIFIER_Node;
TOKEN_6: TOKEN_6_Node;
TO: TO_Node;
};