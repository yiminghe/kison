// TODO: improve Tuple type
type Optional<T> = T | undefined;
type OneOrMore<T> = T extends Array<infer U> ? [...T, ...U[]] : [T, ...T[]];
type ZeroOrMore<T> = T extends Array<infer U> ? U[] : T[];

export type AstNode = AstSymbolNode | AstTokenNode;

// replace start
export type AstSymbolNode = Ast_Progam_Node|Ast_EndOfLine_Node|Ast_EndOfStatement_Node|Ast_ModuleDeclarations_Node|Ast_ModuleDeclarationsElement_Node|Ast_ModuleOption_Node|Ast_ModuleBody_Node|Ast_ModuleBodyElement_Node|Ast_Visibility_Node|Ast_SubStmt_Node|Ast_PropertyGetStmt_Node|Ast_PropertySetStmt_Node|Ast_PropertyLetStmt_Node|Ast_FunctionStmt_Node|Ast_Block_Node|Ast_BlockStmt_Node|Ast_EraseStmt_Node|Ast_RedimStmt_Node|Ast_RedimSubStmt_Node|Ast_ExitStmt_Node|Ast_LetStmt_Node|Ast_SetStmt_Node|Ast_ExplicitCallStmt_Node|Ast_ECS_MemberProcedureCall_Node|Ast_ECS_ProcedureCall_Node|Ast_ImplicitCallStmt_InBlock_Node|Ast_ICS_B_MemberProcedureCall_Node|Ast_ICS_B_ProcedureCall_Node|Ast_ArgsCall_Node|Ast_ArgCall_Node|Ast_VariableStmt_Node|Ast_VariableListStmt_Node|Ast_VariableSubStmt_Node|Ast_Indexes_Node|Ast_Subscript__Node|Ast_Subscripts_Node|Ast_ArgList_Node|Ast_ValueStmt_Node|Ast_ImplicitCallStmt_InStmt_Node|Ast_ICS_S_MembersCall_Node|Ast_ICS_S_MemberCall_Node|Ast_ICS_S_ProcedureOrArrayCall_Node|Ast_ICS_S_VariableOrProcedureCall_Node|Ast_DictionaryCallStmt_Node|Ast_Literal_Node|Ast_TypeHint_Node|Ast_Arg_Node|Ast_ArgDefaultValue_Node|Ast_AsTypeClause_Node|Ast_Type__Node|Ast_ComplexType_Node|Ast_BaseType_Node|Ast_FieldLength_Node|Ast_AmbiguousIdentifier_Node;
export type AstTokenNode = Ast_$EOF_Node|Ast_$UNKNOWN_Node|Ast_NEWLINE_Node|Ast_COMMENT_Node|Ast_REMCOMMENT_Node|Ast_COLON_Node|Ast_OPTION_BASE_Node|Ast_INTEGERLITERAL_Node|Ast_OPTION_COMPARE_Node|Ast_IDENTIFIER_Node|Ast_OPTION_EXPLICIT_Node|Ast_OPTION_PRIVATE_MODULE_Node|Ast_PRIVATE_Node|Ast_PUBLIC_Node|Ast_FRIEND_Node|Ast_GLOBAL_Node|Ast_STATIC_Node|Ast_SUB_Node|Ast_END_SUB_Node|Ast_PROPERTY_GET_Node|Ast_LPAREN_Node|Ast_RPAREN_Node|Ast_END_PROPERTY_Node|Ast_PROPERTY_SET_Node|Ast_PROPERTY_LET_Node|Ast_FUNCTION_Node|Ast_END_FUNCTION_Node|Ast_TOKEN_0_Node|Ast_ERASE_Node|Ast_REDIM_Node|Ast_PRESERVE_Node|Ast_EXIT_DO_Node|Ast_EXIT_FOR_Node|Ast_EXIT_FUNCTION_Node|Ast_EXIT_PROPERTY_Node|Ast_EXIT_SUB_Node|Ast_END_Node|Ast_EQ_Node|Ast_PLUS_EQ_Node|Ast_MINUS_EQ_Node|Ast_LET_Node|Ast_SET_Node|Ast_CALL_Node|Ast_TOKEN_1_Node|Ast_BYREF_Node|Ast_BYVAL_Node|Ast_PARAMARRAY_Node|Ast_DIM_Node|Ast_WITHEVENTS_Node|Ast_TO_Node|Ast_NEW_Node|Ast_TOKEN_2_Node|Ast_STRINGLITERAL_Node|Ast_NOTHING_Node|Ast_NULL_Node|Ast_TRUE_Node|Ast_FALSE_Node|Ast_TOKEN_3_Node|Ast_TOKEN_4_Node|Ast_TOKEN_5_Node|Ast_TOKEN_6_Node|Ast_$_Node|Ast_OPTIONAL_Node|Ast_AS_Node|Ast_BOOLEAN_Node|Ast_BYTE_Node|Ast_DOUBLE_Node|Ast_INTEGER_Node|Ast_LONG_Node|Ast_SINGLE_Node|Ast_VARIANT_Node|Ast_MULT_Node|Ast_STRING_Node;
export type LiteralToken = "ALIAS"|"AND"|"ATTRIBUTE"|"AS"|"BEGIN"|"BOOLEAN"|"BYVAL"|"BYREF"|"BYTE"|"CALL"|"CASE"|"CONST"|"DECLARE"|"DEFBOOL"|"DEFBYTE"|"DEFDATE"|"DEFDBL"|"DEFDEC"|"DEFCUR"|"DEFINT"|"DEFLNG"|"DEFOBJ"|"DEFSNG"|"DEFSTR"|"DEFVAR"|"DIM"|"DO"|"DOUBLE"|"EACH"|"ELSE"|"ELSEIF"|"END_ENUM"|"END_FUNCTION"|"END_IF"|"END_PROPERTY"|"END_SELECT"|"END_SUB"|"END_TYPE"|"END_WITH"|"END"|"ENUM"|"EQV"|"ERASE"|"ERROR"|"EVENT"|"EXIT_DO"|"EXIT_FOR"|"EXIT_FUNCTION"|"EXIT_PROPERTY"|"EXIT_SUB"|"FALSE"|"FRIEND"|"FOR"|"FUNCTION"|"GET"|"GLOBAL"|"GOSUB"|"GOTO"|"IF"|"IMPLEMENTS"|"IN"|"IS"|"INTEGER"|"LONG"|"LOOP"|"LEN"|"LET"|"LIB"|"LIKE"|"LSET"|"MACRO_CONST"|"MACRO_IF"|"MACRO_ELSEIF"|"MACRO_ELSE"|"MACRO_END_IF"|"MOD"|"NEXT"|"NEW"|"NOT"|"NOTHING"|"NULL"|"ON"|"ON_ERROR"|"ON_LOCAL_ERROR"|"OPTIONAL"|"OPTION_BASE"|"OPTION_EXPLICIT"|"OPTION_COMPARE"|"OPTION_PRIVATE_MODULE"|"OR"|"PARAMARRAY"|"PRESERVE"|"PRIVATE"|"PROPERTY_GET"|"PROPERTY_LET"|"PROPERTY_SET"|"PTRSAFE"|"PUBLIC"|"RAISEEVENT"|"REDIM"|"RESET"|"RESUME"|"RETURN"|"SELECT"|"SET"|"SINGLE"|"STATIC"|"STEP"|"STOP"|"STRING"|"SUB"|"THEN"|"TO"|"TRUE"|"TYPEOF"|"UNTIL"|"VARIANT"|"WEND"|"WHILE"|"WITH"|"WITHEVENTS"|"XOR"|"$EOF"|"COLON"|"AMPERSAND"|"ASSIGN"|"DIV"|"EQ"|"GEQ"|"GT"|"LEQ"|"LPAREN"|"LT"|"MINUS"|"MINUS_EQ"|"MULT"|"NEQ"|"PLUS"|"PLUS_EQ"|"POW"|"RPAREN"|"L_SQUARE_BRACKET"|"R_SQUARE_BRACKET"|"NEWLINE"|"REMCOMMENT"|"COMMENT"|"HIDDEN"|"STRINGLITERAL"|"INTEGERLITERAL"|"IDENTIFIER"|"$"|"$UNKNOWN"|","|"."|"!"|"&"|"%"|"#"|"@";
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
progam: Ast_Progam_Node;
endOfLine: Ast_EndOfLine_Node;
endOfStatement: Ast_EndOfStatement_Node;
moduleDeclarations: Ast_ModuleDeclarations_Node;
moduleDeclarationsElement: Ast_ModuleDeclarationsElement_Node;
moduleOption: Ast_ModuleOption_Node;
moduleBody: Ast_ModuleBody_Node;
moduleBodyElement: Ast_ModuleBodyElement_Node;
visibility: Ast_Visibility_Node;
subStmt: Ast_SubStmt_Node;
propertyGetStmt: Ast_PropertyGetStmt_Node;
propertySetStmt: Ast_PropertySetStmt_Node;
propertyLetStmt: Ast_PropertyLetStmt_Node;
functionStmt: Ast_FunctionStmt_Node;
block: Ast_Block_Node;
blockStmt: Ast_BlockStmt_Node;
eraseStmt: Ast_EraseStmt_Node;
redimStmt: Ast_RedimStmt_Node;
redimSubStmt: Ast_RedimSubStmt_Node;
exitStmt: Ast_ExitStmt_Node;
letStmt: Ast_LetStmt_Node;
setStmt: Ast_SetStmt_Node;
explicitCallStmt: Ast_ExplicitCallStmt_Node;
eCS_MemberProcedureCall: Ast_ECS_MemberProcedureCall_Node;
eCS_ProcedureCall: Ast_ECS_ProcedureCall_Node;
implicitCallStmt_InBlock: Ast_ImplicitCallStmt_InBlock_Node;
iCS_B_MemberProcedureCall: Ast_ICS_B_MemberProcedureCall_Node;
iCS_B_ProcedureCall: Ast_ICS_B_ProcedureCall_Node;
argsCall: Ast_ArgsCall_Node;
argCall: Ast_ArgCall_Node;
variableStmt: Ast_VariableStmt_Node;
variableListStmt: Ast_VariableListStmt_Node;
variableSubStmt: Ast_VariableSubStmt_Node;
indexes: Ast_Indexes_Node;
subscript_: Ast_Subscript__Node;
subscripts: Ast_Subscripts_Node;
argList: Ast_ArgList_Node;
valueStmt: Ast_ValueStmt_Node;
implicitCallStmt_InStmt: Ast_ImplicitCallStmt_InStmt_Node;
iCS_S_MembersCall: Ast_ICS_S_MembersCall_Node;
iCS_S_MemberCall: Ast_ICS_S_MemberCall_Node;
iCS_S_ProcedureOrArrayCall: Ast_ICS_S_ProcedureOrArrayCall_Node;
iCS_S_VariableOrProcedureCall: Ast_ICS_S_VariableOrProcedureCall_Node;
dictionaryCallStmt: Ast_DictionaryCallStmt_Node;
literal: Ast_Literal_Node;
typeHint: Ast_TypeHint_Node;
arg: Ast_Arg_Node;
argDefaultValue: Ast_ArgDefaultValue_Node;
asTypeClause: Ast_AsTypeClause_Node;
type_: Ast_Type__Node;
complexType: Ast_ComplexType_Node;
baseType: Ast_BaseType_Node;
fieldLength: Ast_FieldLength_Node;
ambiguousIdentifier: Ast_AmbiguousIdentifier_Node;
$EOF: Ast_$EOF_Node;
$UNKNOWN: Ast_$UNKNOWN_Node;
NEWLINE: Ast_NEWLINE_Node;
COMMENT: Ast_COMMENT_Node;
REMCOMMENT: Ast_REMCOMMENT_Node;
COLON: Ast_COLON_Node;
OPTION_BASE: Ast_OPTION_BASE_Node;
INTEGERLITERAL: Ast_INTEGERLITERAL_Node;
OPTION_COMPARE: Ast_OPTION_COMPARE_Node;
IDENTIFIER: Ast_IDENTIFIER_Node;
OPTION_EXPLICIT: Ast_OPTION_EXPLICIT_Node;
OPTION_PRIVATE_MODULE: Ast_OPTION_PRIVATE_MODULE_Node;
PRIVATE: Ast_PRIVATE_Node;
PUBLIC: Ast_PUBLIC_Node;
FRIEND: Ast_FRIEND_Node;
GLOBAL: Ast_GLOBAL_Node;
STATIC: Ast_STATIC_Node;
SUB: Ast_SUB_Node;
END_SUB: Ast_END_SUB_Node;
PROPERTY_GET: Ast_PROPERTY_GET_Node;
LPAREN: Ast_LPAREN_Node;
RPAREN: Ast_RPAREN_Node;
END_PROPERTY: Ast_END_PROPERTY_Node;
PROPERTY_SET: Ast_PROPERTY_SET_Node;
PROPERTY_LET: Ast_PROPERTY_LET_Node;
FUNCTION: Ast_FUNCTION_Node;
END_FUNCTION: Ast_END_FUNCTION_Node;
TOKEN_0: Ast_TOKEN_0_Node;
ERASE: Ast_ERASE_Node;
REDIM: Ast_REDIM_Node;
PRESERVE: Ast_PRESERVE_Node;
EXIT_DO: Ast_EXIT_DO_Node;
EXIT_FOR: Ast_EXIT_FOR_Node;
EXIT_FUNCTION: Ast_EXIT_FUNCTION_Node;
EXIT_PROPERTY: Ast_EXIT_PROPERTY_Node;
EXIT_SUB: Ast_EXIT_SUB_Node;
END: Ast_END_Node;
EQ: Ast_EQ_Node;
PLUS_EQ: Ast_PLUS_EQ_Node;
MINUS_EQ: Ast_MINUS_EQ_Node;
LET: Ast_LET_Node;
SET: Ast_SET_Node;
CALL: Ast_CALL_Node;
TOKEN_1: Ast_TOKEN_1_Node;
BYREF: Ast_BYREF_Node;
BYVAL: Ast_BYVAL_Node;
PARAMARRAY: Ast_PARAMARRAY_Node;
DIM: Ast_DIM_Node;
WITHEVENTS: Ast_WITHEVENTS_Node;
TO: Ast_TO_Node;
NEW: Ast_NEW_Node;
TOKEN_2: Ast_TOKEN_2_Node;
STRINGLITERAL: Ast_STRINGLITERAL_Node;
NOTHING: Ast_NOTHING_Node;
NULL: Ast_NULL_Node;
TRUE: Ast_TRUE_Node;
FALSE: Ast_FALSE_Node;
TOKEN_3: Ast_TOKEN_3_Node;
TOKEN_4: Ast_TOKEN_4_Node;
TOKEN_5: Ast_TOKEN_5_Node;
TOKEN_6: Ast_TOKEN_6_Node;
$: Ast_$_Node;
OPTIONAL: Ast_OPTIONAL_Node;
AS: Ast_AS_Node;
BOOLEAN: Ast_BOOLEAN_Node;
BYTE: Ast_BYTE_Node;
DOUBLE: Ast_DOUBLE_Node;
INTEGER: Ast_INTEGER_Node;
LONG: Ast_LONG_Node;
SINGLE: Ast_SINGLE_Node;
VARIANT: Ast_VARIANT_Node;
MULT: Ast_MULT_Node;
STRING: Ast_STRING_Node;
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

        type Ast_EndOfStatement_group_def_2_Parent_Node = Ast_EndOfStatement_group_1_Parent_Node_8;
        

        type Ast_EndOfStatement_group_1_Parent_Node_8 = Ast_EndOfStatement_Node;
        

        type Ast_EndOfStatement_group_def_3_Parent_Node = Ast_EndOfStatement_group_1_Parent_Node_10;
        

        type Ast_EndOfStatement_group_1_Parent_Node_10 = Ast_EndOfStatement_Node;
        

        type Ast_ModuleDeclarations_group_def_5_Parent_Node = Ast_ModuleDeclarations_Node;
        

        type Ast_ModuleBody_group_def_7_Parent_Node = Ast_ModuleBody_Node;
        

        type Ast_Block_group_def_9_Parent_Node = Ast_Block_Node;
        

        type Ast_EraseStmt_group_def_11_Parent_Node = Ast_EraseStmt_Node|Ast_Indexes_Node;
        

        type Ast_RedimStmt_group_def_13_Parent_Node = Ast_RedimStmt_Node_189|Ast_RedimStmt_Node_190;
        

        type Ast_LetStmt_group_def_15_Parent_Node = Ast_LetStmt_group_14_Parent_Node_200;
        

        type Ast_LetStmt_group_14_Parent_Node_200 = Ast_LetStmt_Node_205|Ast_LetStmt_Node_206;
        

        type Ast_LetStmt_group_def_16_Parent_Node = Ast_LetStmt_group_14_Parent_Node_202;
        

        type Ast_LetStmt_group_14_Parent_Node_202 = Ast_LetStmt_Node_205|Ast_LetStmt_Node_206;
        

        type Ast_LetStmt_group_def_17_Parent_Node = Ast_LetStmt_group_14_Parent_Node_204;
        

        type Ast_LetStmt_group_14_Parent_Node_204 = Ast_LetStmt_Node_205|Ast_LetStmt_Node_206;
        

        type Ast_ECS_MemberProcedureCall_group_def_19_Parent_Node = Ast_ECS_MemberProcedureCall_Node_212|Ast_ECS_MemberProcedureCall_Node_214|Ast_ECS_MemberProcedureCall_Node_216|Ast_ECS_MemberProcedureCall_Node_218|Ast_ECS_ProcedureCall_Node_220|Ast_ECS_ProcedureCall_Node_222;
        

        type Ast_ECS_MemberProcedureCall_group_def_21_Parent_Node = Ast_ECS_MemberProcedureCall_Node_212|Ast_ECS_MemberProcedureCall_Node_213|Ast_ECS_MemberProcedureCall_Node_214|Ast_ECS_MemberProcedureCall_Node_215|Ast_ECS_MemberProcedureCall_Node_216|Ast_ECS_MemberProcedureCall_Node_217|Ast_ECS_MemberProcedureCall_Node_218|Ast_ECS_MemberProcedureCall_Node_219|Ast_ECS_ProcedureCall_Node_220|Ast_ECS_ProcedureCall_Node_221|Ast_ECS_ProcedureCall_Node_222|Ast_ECS_ProcedureCall_Node_223|Ast_ICS_B_MemberProcedureCall_Node_226|Ast_ICS_B_MemberProcedureCall_Node_227|Ast_ICS_B_MemberProcedureCall_Node_228|Ast_ICS_B_MemberProcedureCall_Node_229|Ast_ICS_B_MemberProcedureCall_Node_230|Ast_ICS_B_MemberProcedureCall_Node_231|Ast_ICS_B_MemberProcedureCall_Node_232|Ast_ICS_B_MemberProcedureCall_Node_233|Ast_ICS_B_ProcedureCall_Node_234|Ast_ICS_B_ProcedureCall_Node_236|Ast_ICS_S_MembersCall_Node_297|Ast_ICS_S_MembersCall_Node_298|Ast_ICS_S_MembersCall_Node_299|Ast_ICS_S_MembersCall_Node_300|Ast_ICS_S_ProcedureOrArrayCall_Node_308|Ast_ICS_S_ProcedureOrArrayCall_Node_309|Ast_ICS_S_ProcedureOrArrayCall_Node_310|Ast_ICS_S_ProcedureOrArrayCall_Node_311|Ast_ICS_S_ProcedureOrArrayCall_Node_312|Ast_ICS_S_ProcedureOrArrayCall_Node_313|Ast_ICS_S_ProcedureOrArrayCall_Node_314|Ast_ICS_S_ProcedureOrArrayCall_Node_315|Ast_ICS_S_VariableOrProcedureCall_Node_316|Ast_ICS_S_VariableOrProcedureCall_Node_317|Ast_ICS_S_VariableOrProcedureCall_Node_318|Ast_ICS_S_VariableOrProcedureCall_Node_319;
        

        type Ast_ArgsCall_group_def_27_Parent_Node_238 = Ast_ArgsCall_Node;
        

        type Ast_ArgsCall_group_def_27_Parent_Node_239 = Ast_ArgsCall_Node;
        

        type Ast_ArgCall_group_def_29_Parent_Node = Ast_ArgCall_group_28_Parent_Node_242|Ast_Arg_group_60_Parent_Node_335;
        

        type Ast_ArgCall_group_28_Parent_Node_242 = Ast_ArgCall_Node_247|Ast_ArgCall_Node_248|Ast_ArgCall_Node_251|Ast_ArgCall_Node_252;
        

        type Ast_ArgCall_group_def_30_Parent_Node = Ast_ArgCall_group_28_Parent_Node_244|Ast_Arg_group_60_Parent_Node_334;
        

        type Ast_ArgCall_group_28_Parent_Node_244 = Ast_ArgCall_Node_247|Ast_ArgCall_Node_248|Ast_ArgCall_Node_251|Ast_ArgCall_Node_252;
        

        type Ast_ArgCall_group_def_31_Parent_Node = Ast_ArgCall_group_28_Parent_Node_246;
        

        type Ast_ArgCall_group_28_Parent_Node_246 = Ast_ArgCall_Node_247|Ast_ArgCall_Node_248|Ast_ArgCall_Node_251|Ast_ArgCall_Node_252;
        

        type Ast_VariableStmt_group_def_33_Parent_Node = Ast_VariableStmt_group_32_Parent_Node_256;
        

        type Ast_VariableStmt_group_32_Parent_Node_256 = Ast_VariableStmt_Node_261|Ast_VariableStmt_Node_262;
        

        type Ast_VariableStmt_group_def_34_Parent_Node = Ast_VariableStmt_group_32_Parent_Node_258;
        

        type Ast_VariableStmt_group_32_Parent_Node_258 = Ast_VariableStmt_Node_261|Ast_VariableStmt_Node_262;
        

        type Ast_VariableStmt_group_def_35_Parent_Node = Ast_VariableStmt_group_32_Parent_Node_260;
        

        type Ast_VariableStmt_group_32_Parent_Node_260 = Ast_VariableStmt_Node_261|Ast_VariableStmt_Node_262;
        

        type Ast_VariableListStmt_group_def_37_Parent_Node = Ast_VariableListStmt_Node;
        

        type Ast_VariableSubStmt_group_def_39_Parent_Node_265 = Ast_VariableSubStmt_Node_267|Ast_VariableSubStmt_Node_268|Ast_VariableSubStmt_Node_269|Ast_VariableSubStmt_Node_270;
        

        type Ast_VariableSubStmt_group_def_39_Parent_Node_266 = Ast_VariableSubStmt_Node_267|Ast_VariableSubStmt_Node_268|Ast_VariableSubStmt_Node_269|Ast_VariableSubStmt_Node_270;
        

        type Ast_Subscript__group_def_42_Parent_Node = Ast_Subscript__Node_277|Ast_Subscript__Node_281;
        

        type Ast_Subscripts_group_def_44_Parent_Node = Ast_Subscripts_Node;
        

        type Ast_ArgList_group_def_48_Parent_Node = Ast_ArgList_group_def_49_Parent_Node;
        

        type Ast_ArgList_group_def_49_Parent_Node = Ast_ArgList_Node_285;
        

        type Ast_ICS_S_MembersCall_group_def_51_Parent_Node = Ast_ICS_S_MembersCall_group_50_Parent_Node_294|Ast_ICS_S_MemberCall_group_57_Parent_Node_305;
        

        type Ast_ICS_S_MembersCall_group_50_Parent_Node_294 = Ast_ICS_S_MembersCall_Node_297|Ast_ICS_S_MembersCall_Node_298;
        

        type Ast_ICS_S_MembersCall_group_def_52_Parent_Node = Ast_ICS_S_MembersCall_group_50_Parent_Node_296|Ast_ICS_S_MemberCall_group_57_Parent_Node_306;
        

        type Ast_ICS_S_MembersCall_group_50_Parent_Node_296 = Ast_ICS_S_MembersCall_Node_297|Ast_ICS_S_MembersCall_Node_298;
        

        type Ast_ICS_S_MemberCall_group_def_55_Parent_Node = Ast_ICS_S_MemberCall_group_54_Parent_Node_302|Ast_ComplexType_group_68_Parent_Node_476;
        

        type Ast_ICS_S_MemberCall_group_54_Parent_Node_302 = Ast_ICS_S_MemberCall_Node;
        

        type Ast_ICS_S_MemberCall_group_def_56_Parent_Node = Ast_ICS_S_MemberCall_group_54_Parent_Node_304|Ast_ComplexType_group_68_Parent_Node_477;
        

        type Ast_ICS_S_MemberCall_group_54_Parent_Node_304 = Ast_ICS_S_MemberCall_Node;
        

        type Ast_ICS_S_MemberCall_group_57_Parent_Node_305 = Ast_ICS_S_MemberCall_Node;
        

        type Ast_ICS_S_MemberCall_group_57_Parent_Node_306 = Ast_ICS_S_MemberCall_Node;
        

        type Ast_Arg_group_60_Parent_Node_334 = Ast_Arg_Node_337|Ast_Arg_Node_338|Ast_Arg_Node_339|Ast_Arg_Node_340|Ast_Arg_Node_341|Ast_Arg_Node_342|Ast_Arg_Node_343|Ast_Arg_Node_344|Ast_Arg_Node_345|Ast_Arg_Node_346|Ast_Arg_Node_347|Ast_Arg_Node_348|Ast_Arg_Node_349|Ast_Arg_Node_350|Ast_Arg_Node_351|Ast_Arg_Node_352|Ast_Arg_Node_353|Ast_Arg_Node_354|Ast_Arg_Node_355|Ast_Arg_Node_356|Ast_Arg_Node_357|Ast_Arg_Node_358|Ast_Arg_Node_359|Ast_Arg_Node_360|Ast_Arg_Node_361|Ast_Arg_Node_362|Ast_Arg_Node_363|Ast_Arg_Node_364|Ast_Arg_Node_365|Ast_Arg_Node_366|Ast_Arg_Node_367|Ast_Arg_Node_368|Ast_Arg_Node_401|Ast_Arg_Node_402|Ast_Arg_Node_403|Ast_Arg_Node_404|Ast_Arg_Node_405|Ast_Arg_Node_406|Ast_Arg_Node_407|Ast_Arg_Node_408|Ast_Arg_Node_409|Ast_Arg_Node_410|Ast_Arg_Node_411|Ast_Arg_Node_412|Ast_Arg_Node_413|Ast_Arg_Node_414|Ast_Arg_Node_415|Ast_Arg_Node_416|Ast_Arg_Node_417|Ast_Arg_Node_418|Ast_Arg_Node_419|Ast_Arg_Node_420|Ast_Arg_Node_421|Ast_Arg_Node_422|Ast_Arg_Node_423|Ast_Arg_Node_424|Ast_Arg_Node_425|Ast_Arg_Node_426|Ast_Arg_Node_427|Ast_Arg_Node_428|Ast_Arg_Node_429|Ast_Arg_Node_430|Ast_Arg_Node_431|Ast_Arg_Node_432;
        

        type Ast_Arg_group_60_Parent_Node_335 = Ast_Arg_Node_337|Ast_Arg_Node_338|Ast_Arg_Node_339|Ast_Arg_Node_340|Ast_Arg_Node_341|Ast_Arg_Node_342|Ast_Arg_Node_343|Ast_Arg_Node_344|Ast_Arg_Node_345|Ast_Arg_Node_346|Ast_Arg_Node_347|Ast_Arg_Node_348|Ast_Arg_Node_349|Ast_Arg_Node_350|Ast_Arg_Node_351|Ast_Arg_Node_352|Ast_Arg_Node_353|Ast_Arg_Node_354|Ast_Arg_Node_355|Ast_Arg_Node_356|Ast_Arg_Node_357|Ast_Arg_Node_358|Ast_Arg_Node_359|Ast_Arg_Node_360|Ast_Arg_Node_361|Ast_Arg_Node_362|Ast_Arg_Node_363|Ast_Arg_Node_364|Ast_Arg_Node_365|Ast_Arg_Node_366|Ast_Arg_Node_367|Ast_Arg_Node_368|Ast_Arg_Node_401|Ast_Arg_Node_402|Ast_Arg_Node_403|Ast_Arg_Node_404|Ast_Arg_Node_405|Ast_Arg_Node_406|Ast_Arg_Node_407|Ast_Arg_Node_408|Ast_Arg_Node_409|Ast_Arg_Node_410|Ast_Arg_Node_411|Ast_Arg_Node_412|Ast_Arg_Node_413|Ast_Arg_Node_414|Ast_Arg_Node_415|Ast_Arg_Node_416|Ast_Arg_Node_417|Ast_Arg_Node_418|Ast_Arg_Node_419|Ast_Arg_Node_420|Ast_Arg_Node_421|Ast_Arg_Node_422|Ast_Arg_Node_423|Ast_Arg_Node_424|Ast_Arg_Node_425|Ast_Arg_Node_426|Ast_Arg_Node_427|Ast_Arg_Node_428|Ast_Arg_Node_429|Ast_Arg_Node_430|Ast_Arg_Node_431|Ast_Arg_Node_432;
        

        type Ast_Arg_group_def_62_Parent_Node = Ast_Arg_Node_337|Ast_Arg_Node_338|Ast_Arg_Node_339|Ast_Arg_Node_340|Ast_Arg_Node_345|Ast_Arg_Node_346|Ast_Arg_Node_347|Ast_Arg_Node_348|Ast_Arg_Node_353|Ast_Arg_Node_354|Ast_Arg_Node_355|Ast_Arg_Node_356|Ast_Arg_Node_361|Ast_Arg_Node_362|Ast_Arg_Node_363|Ast_Arg_Node_364|Ast_Arg_Node_369|Ast_Arg_Node_370|Ast_Arg_Node_371|Ast_Arg_Node_372|Ast_Arg_Node_377|Ast_Arg_Node_378|Ast_Arg_Node_379|Ast_Arg_Node_380|Ast_Arg_Node_385|Ast_Arg_Node_386|Ast_Arg_Node_387|Ast_Arg_Node_388|Ast_Arg_Node_393|Ast_Arg_Node_394|Ast_Arg_Node_395|Ast_Arg_Node_396|Ast_Arg_Node_401|Ast_Arg_Node_402|Ast_Arg_Node_403|Ast_Arg_Node_404|Ast_Arg_Node_409|Ast_Arg_Node_410|Ast_Arg_Node_411|Ast_Arg_Node_412|Ast_Arg_Node_417|Ast_Arg_Node_418|Ast_Arg_Node_419|Ast_Arg_Node_420|Ast_Arg_Node_425|Ast_Arg_Node_426|Ast_Arg_Node_427|Ast_Arg_Node_428|Ast_Arg_Node_433|Ast_Arg_Node_434|Ast_Arg_Node_435|Ast_Arg_Node_436|Ast_Arg_Node_441|Ast_Arg_Node_442|Ast_Arg_Node_443|Ast_Arg_Node_444|Ast_Arg_Node_449|Ast_Arg_Node_450|Ast_Arg_Node_451|Ast_Arg_Node_452|Ast_Arg_Node_457|Ast_Arg_Node_458|Ast_Arg_Node_459|Ast_Arg_Node_460|Ast_Type__Node_474;
        

        type Ast_Type__group_def_64_Parent_Node = Ast_Type__group_63_Parent_Node_471;
        

        type Ast_Type__group_63_Parent_Node_471 = Ast_Type__Node_474|Ast_Type__Node_475;
        

        type Ast_Type__group_def_65_Parent_Node = Ast_Type__group_63_Parent_Node_473;
        

        type Ast_Type__group_63_Parent_Node_473 = Ast_Type__Node_474|Ast_Type__Node_475;
        

        type Ast_ComplexType_group_68_Parent_Node_476 = Ast_ComplexType_group_def_69_Parent_Node;
        

        type Ast_ComplexType_group_68_Parent_Node_477 = Ast_ComplexType_group_def_69_Parent_Node;
        

        type Ast_ComplexType_group_def_69_Parent_Node = Ast_ComplexType_Node;
        

        type Ast_BaseType_group_def_71_Parent_Node = Ast_BaseType_Node_488;
        
interface Ast_Progam_Node_0_ extends BaseSymbolNode {
        symbol:"progam";
        
        children:[Ast_ModuleDeclarations_Node,...ZeroOrMore<Ast_EndOfLine_Node>,Ast_ModuleBody_Node,...ZeroOrMore<Ast_EndOfLine_Node>,Ast_$EOF_Node];
        
      }
type Ast_Progam_Node_0 = Ast_Progam_Node_0_;
interface Ast_Progam_Node_1_ extends BaseSymbolNode {
        symbol:"progam";
        
        children:[Ast_ModuleDeclarations_Node,...ZeroOrMore<Ast_EndOfLine_Node>,...ZeroOrMore<Ast_EndOfLine_Node>,Ast_$EOF_Node];
        
      }
type Ast_Progam_Node_1 = Ast_Progam_Node_1_;
interface Ast_Progam_Node_2_ extends BaseSymbolNode {
        symbol:"progam";
        
        children:[...ZeroOrMore<Ast_EndOfLine_Node>,Ast_ModuleBody_Node,...ZeroOrMore<Ast_EndOfLine_Node>,Ast_$EOF_Node];
        
      }
type Ast_Progam_Node_2 = Ast_Progam_Node_2_;
interface Ast_Progam_Node_3_ extends BaseSymbolNode {
        symbol:"progam";
        
        children:[...ZeroOrMore<Ast_EndOfLine_Node>,...ZeroOrMore<Ast_EndOfLine_Node>,Ast_$EOF_Node];
        
      }
type Ast_Progam_Node_3 = Ast_Progam_Node_3_;
interface Ast_NEWLINE_Node_ extends BaseTokenNode {
            token:"NEWLINE";
            parent:Ast_EndOfLine_Node_4;
          }
export type Ast_NEWLINE_Node = Ast_NEWLINE_Node_;
interface Ast_EndOfLine_Node_4_ extends BaseSymbolNode {
        symbol:"endOfLine";
        
        children:[Ast_NEWLINE_Node];
        parent:Ast_Progam_Node_0 | Ast_Progam_Node_1 | Ast_Progam_Node_2 | Ast_Progam_Node_3 | Ast_EndOfStatement_group_def_2_Parent_Node | Ast_ModuleDeclarations_group_def_5_Parent_Node | Ast_ModuleDeclarations_Node | Ast_ModuleBody_group_def_7_Parent_Node | Ast_ModuleBody_Node;
      }
type Ast_EndOfLine_Node_4 = Ast_EndOfLine_Node_4_;
interface Ast_COMMENT_Node_ extends BaseTokenNode {
            token:"COMMENT";
            parent:Ast_EndOfLine_Node_5 | Ast_ModuleDeclarationsElement_Node_14;
          }
export type Ast_COMMENT_Node = Ast_COMMENT_Node_;
interface Ast_EndOfLine_Node_5_ extends BaseSymbolNode {
        symbol:"endOfLine";
        
        children:[Ast_COMMENT_Node];
        parent:Ast_Progam_Node_0 | Ast_Progam_Node_1 | Ast_Progam_Node_2 | Ast_Progam_Node_3 | Ast_EndOfStatement_group_def_2_Parent_Node | Ast_ModuleDeclarations_group_def_5_Parent_Node | Ast_ModuleDeclarations_Node | Ast_ModuleBody_group_def_7_Parent_Node | Ast_ModuleBody_Node;
      }
type Ast_EndOfLine_Node_5 = Ast_EndOfLine_Node_5_;
interface Ast_REMCOMMENT_Node_ extends BaseTokenNode {
            token:"REMCOMMENT";
            parent:Ast_EndOfLine_Node_6;
          }
export type Ast_REMCOMMENT_Node = Ast_REMCOMMENT_Node_;
interface Ast_EndOfLine_Node_6_ extends BaseSymbolNode {
        symbol:"endOfLine";
        
        children:[Ast_REMCOMMENT_Node];
        parent:Ast_Progam_Node_0 | Ast_Progam_Node_1 | Ast_Progam_Node_2 | Ast_Progam_Node_3 | Ast_EndOfStatement_group_def_2_Parent_Node | Ast_ModuleDeclarations_group_def_5_Parent_Node | Ast_ModuleDeclarations_Node | Ast_ModuleBody_group_def_7_Parent_Node | Ast_ModuleBody_Node;
      }
type Ast_EndOfLine_Node_6 = Ast_EndOfLine_Node_6_;
type Ast_EndOfStatement_group_def_2_Node  = [Ast_EndOfLine_Node];
type Ast_EndOfStatement_group_1_Node_8  = [...Ast_EndOfStatement_group_def_2_Node];
interface Ast_COLON_Node_ extends BaseTokenNode {
            token:"COLON";
            parent:Ast_EndOfStatement_group_def_3_Parent_Node;
          }
export type Ast_COLON_Node = Ast_COLON_Node_;
type Ast_EndOfStatement_group_def_3_Node  = [Ast_COLON_Node];
type Ast_EndOfStatement_group_1_Node_10  = [...Ast_EndOfStatement_group_def_3_Node];
interface Ast_EndOfStatement_Node_ extends BaseSymbolNode {
        symbol:"endOfStatement";
        
        children:[...ZeroOrMore<Ast_EndOfStatement_group_1_Node>];
        parent:Ast_SubStmt_Node_32 | Ast_SubStmt_Node_33 | Ast_SubStmt_Node_34 | Ast_SubStmt_Node_35 | Ast_SubStmt_Node_36 | Ast_SubStmt_Node_37 | Ast_SubStmt_Node_38 | Ast_SubStmt_Node_39 | Ast_SubStmt_Node_40 | Ast_SubStmt_Node_41 | Ast_SubStmt_Node_42 | Ast_SubStmt_Node_43 | Ast_SubStmt_Node_44 | Ast_SubStmt_Node_45 | Ast_SubStmt_Node_46 | Ast_SubStmt_Node_47 | Ast_PropertyGetStmt_Node_48 | Ast_PropertyGetStmt_Node_49 | Ast_PropertyGetStmt_Node_50 | Ast_PropertyGetStmt_Node_51 | Ast_PropertyGetStmt_Node_52 | Ast_PropertyGetStmt_Node_53 | Ast_PropertyGetStmt_Node_54 | Ast_PropertyGetStmt_Node_55 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_69 | Ast_PropertyGetStmt_Node_70 | Ast_PropertyGetStmt_Node_71 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_PropertyGetStmt_Node_78 | Ast_PropertyGetStmt_Node_79 | Ast_PropertySetStmt_Node_80 | Ast_PropertySetStmt_Node_81 | Ast_PropertySetStmt_Node_82 | Ast_PropertySetStmt_Node_83 | Ast_PropertySetStmt_Node_84 | Ast_PropertySetStmt_Node_85 | Ast_PropertySetStmt_Node_86 | Ast_PropertySetStmt_Node_87 | Ast_PropertySetStmt_Node_88 | Ast_PropertySetStmt_Node_89 | Ast_PropertySetStmt_Node_90 | Ast_PropertySetStmt_Node_91 | Ast_PropertySetStmt_Node_92 | Ast_PropertySetStmt_Node_93 | Ast_PropertySetStmt_Node_94 | Ast_PropertySetStmt_Node_95 | Ast_PropertyLetStmt_Node_96 | Ast_PropertyLetStmt_Node_97 | Ast_PropertyLetStmt_Node_98 | Ast_PropertyLetStmt_Node_99 | Ast_PropertyLetStmt_Node_100 | Ast_PropertyLetStmt_Node_101 | Ast_PropertyLetStmt_Node_102 | Ast_PropertyLetStmt_Node_103 | Ast_PropertyLetStmt_Node_104 | Ast_PropertyLetStmt_Node_105 | Ast_PropertyLetStmt_Node_106 | Ast_PropertyLetStmt_Node_107 | Ast_PropertyLetStmt_Node_108 | Ast_PropertyLetStmt_Node_109 | Ast_PropertyLetStmt_Node_110 | Ast_PropertyLetStmt_Node_111 | Ast_FunctionStmt_Node_112 | Ast_FunctionStmt_Node_113 | Ast_FunctionStmt_Node_114 | Ast_FunctionStmt_Node_115 | Ast_FunctionStmt_Node_116 | Ast_FunctionStmt_Node_117 | Ast_FunctionStmt_Node_118 | Ast_FunctionStmt_Node_119 | Ast_FunctionStmt_Node_120 | Ast_FunctionStmt_Node_121 | Ast_FunctionStmt_Node_122 | Ast_FunctionStmt_Node_123 | Ast_FunctionStmt_Node_124 | Ast_FunctionStmt_Node_125 | Ast_FunctionStmt_Node_126 | Ast_FunctionStmt_Node_127 | Ast_FunctionStmt_Node_128 | Ast_FunctionStmt_Node_129 | Ast_FunctionStmt_Node_130 | Ast_FunctionStmt_Node_131 | Ast_FunctionStmt_Node_132 | Ast_FunctionStmt_Node_133 | Ast_FunctionStmt_Node_134 | Ast_FunctionStmt_Node_135 | Ast_FunctionStmt_Node_136 | Ast_FunctionStmt_Node_137 | Ast_FunctionStmt_Node_138 | Ast_FunctionStmt_Node_139 | Ast_FunctionStmt_Node_140 | Ast_FunctionStmt_Node_141 | Ast_FunctionStmt_Node_142 | Ast_FunctionStmt_Node_143 | Ast_FunctionStmt_Node_144 | Ast_FunctionStmt_Node_145 | Ast_FunctionStmt_Node_146 | Ast_FunctionStmt_Node_147 | Ast_FunctionStmt_Node_148 | Ast_FunctionStmt_Node_149 | Ast_FunctionStmt_Node_150 | Ast_FunctionStmt_Node_151 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_158 | Ast_FunctionStmt_Node_159 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_166 | Ast_FunctionStmt_Node_167 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_171 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_FunctionStmt_Node_174 | Ast_FunctionStmt_Node_175 | Ast_Block_group_def_9_Parent_Node | Ast_Block_Node;
      }
type Ast_EndOfStatement_Node = Ast_EndOfStatement_Node_;
type Ast_ModuleDeclarations_group_def_5_Node  = [...OneOrMore<Ast_EndOfLine_Node>,Ast_ModuleDeclarationsElement_Node];
interface Ast_ModuleDeclarations_Node_ extends BaseSymbolNode {
        symbol:"moduleDeclarations";
        
        children:[Ast_ModuleDeclarationsElement_Node,...ZeroOrMore<Ast_ModuleDeclarations_group_def_5_Node>,...ZeroOrMore<Ast_EndOfLine_Node>];
        parent:Ast_Progam_Node_0 | Ast_Progam_Node_1;
      }
type Ast_ModuleDeclarations_Node = Ast_ModuleDeclarations_Node_;
interface Ast_ModuleDeclarationsElement_Node_14_ extends BaseSymbolNode {
        symbol:"moduleDeclarationsElement";
        
        children:[Ast_COMMENT_Node];
        parent:Ast_ModuleDeclarations_group_def_5_Parent_Node | Ast_ModuleDeclarations_Node;
      }
type Ast_ModuleDeclarationsElement_Node_14 = Ast_ModuleDeclarationsElement_Node_14_;
interface Ast_ModuleDeclarationsElement_Node_15_ extends BaseSymbolNode {
        symbol:"moduleDeclarationsElement";
        
        children:[Ast_VariableStmt_Node];
        parent:Ast_ModuleDeclarations_group_def_5_Parent_Node | Ast_ModuleDeclarations_Node;
      }
type Ast_ModuleDeclarationsElement_Node_15 = Ast_ModuleDeclarationsElement_Node_15_;
interface Ast_ModuleDeclarationsElement_Node_16_ extends BaseSymbolNode {
        symbol:"moduleDeclarationsElement";
        
        children:[Ast_ModuleOption_Node];
        parent:Ast_ModuleDeclarations_group_def_5_Parent_Node | Ast_ModuleDeclarations_Node;
      }
type Ast_ModuleDeclarationsElement_Node_16 = Ast_ModuleDeclarationsElement_Node_16_;
interface Ast_OPTION_BASE_Node_ extends BaseTokenNode {
            token:"OPTION_BASE";
            parent:Ast_ModuleOption_Node_17;
          }
export type Ast_OPTION_BASE_Node = Ast_OPTION_BASE_Node_;
interface Ast_INTEGERLITERAL_Node_ extends BaseTokenNode {
            token:"INTEGERLITERAL";
            parent:Ast_ModuleOption_Node_17 | Ast_Literal_Node_322 | Ast_FieldLength_Node_490;
          }
export type Ast_INTEGERLITERAL_Node = Ast_INTEGERLITERAL_Node_;
interface Ast_ModuleOption_Node_17_ extends BaseSymbolNode {
        symbol:"moduleOption";
        
        children:[Ast_OPTION_BASE_Node,Ast_INTEGERLITERAL_Node];
        parent:Ast_ModuleDeclarationsElement_Node_16;
      }
type Ast_ModuleOption_Node_17 = Ast_ModuleOption_Node_17_;
interface Ast_OPTION_COMPARE_Node_ extends BaseTokenNode {
            token:"OPTION_COMPARE";
            parent:Ast_ModuleOption_Node_18;
          }
export type Ast_OPTION_COMPARE_Node = Ast_OPTION_COMPARE_Node_;
interface Ast_IDENTIFIER_Node_ extends BaseTokenNode {
            token:"IDENTIFIER";
            parent:Ast_ModuleOption_Node_18 | Ast_AmbiguousIdentifier_Node;
          }
export type Ast_IDENTIFIER_Node = Ast_IDENTIFIER_Node_;
interface Ast_ModuleOption_Node_18_ extends BaseSymbolNode {
        symbol:"moduleOption";
        
        children:[Ast_OPTION_COMPARE_Node,Ast_IDENTIFIER_Node];
        parent:Ast_ModuleDeclarationsElement_Node_16;
      }
type Ast_ModuleOption_Node_18 = Ast_ModuleOption_Node_18_;
interface Ast_OPTION_EXPLICIT_Node_ extends BaseTokenNode {
            token:"OPTION_EXPLICIT";
            parent:Ast_ModuleOption_Node_19;
          }
export type Ast_OPTION_EXPLICIT_Node = Ast_OPTION_EXPLICIT_Node_;
interface Ast_ModuleOption_Node_19_ extends BaseSymbolNode {
        symbol:"moduleOption";
        
        children:[Ast_OPTION_EXPLICIT_Node];
        parent:Ast_ModuleDeclarationsElement_Node_16;
      }
type Ast_ModuleOption_Node_19 = Ast_ModuleOption_Node_19_;
interface Ast_OPTION_PRIVATE_MODULE_Node_ extends BaseTokenNode {
            token:"OPTION_PRIVATE_MODULE";
            parent:Ast_ModuleOption_Node_20;
          }
export type Ast_OPTION_PRIVATE_MODULE_Node = Ast_OPTION_PRIVATE_MODULE_Node_;
interface Ast_ModuleOption_Node_20_ extends BaseSymbolNode {
        symbol:"moduleOption";
        
        children:[Ast_OPTION_PRIVATE_MODULE_Node];
        parent:Ast_ModuleDeclarationsElement_Node_16;
      }
type Ast_ModuleOption_Node_20 = Ast_ModuleOption_Node_20_;
type Ast_ModuleBody_group_def_7_Node  = [...OneOrMore<Ast_EndOfLine_Node>,Ast_ModuleBodyElement_Node];
interface Ast_ModuleBody_Node_ extends BaseSymbolNode {
        symbol:"moduleBody";
        
        children:[Ast_ModuleBodyElement_Node,...ZeroOrMore<Ast_ModuleBody_group_def_7_Node>,...ZeroOrMore<Ast_EndOfLine_Node>];
        parent:Ast_Progam_Node_0 | Ast_Progam_Node_2;
      }
type Ast_ModuleBody_Node = Ast_ModuleBody_Node_;
interface Ast_ModuleBodyElement_Node_23_ extends BaseSymbolNode {
        symbol:"moduleBodyElement";
        
        children:[Ast_FunctionStmt_Node];
        parent:Ast_ModuleBody_group_def_7_Parent_Node | Ast_ModuleBody_Node;
      }
type Ast_ModuleBodyElement_Node_23 = Ast_ModuleBodyElement_Node_23_;
interface Ast_ModuleBodyElement_Node_24_ extends BaseSymbolNode {
        symbol:"moduleBodyElement";
        
        children:[Ast_PropertyGetStmt_Node];
        parent:Ast_ModuleBody_group_def_7_Parent_Node | Ast_ModuleBody_Node;
      }
type Ast_ModuleBodyElement_Node_24 = Ast_ModuleBodyElement_Node_24_;
interface Ast_ModuleBodyElement_Node_25_ extends BaseSymbolNode {
        symbol:"moduleBodyElement";
        
        children:[Ast_PropertySetStmt_Node];
        parent:Ast_ModuleBody_group_def_7_Parent_Node | Ast_ModuleBody_Node;
      }
type Ast_ModuleBodyElement_Node_25 = Ast_ModuleBodyElement_Node_25_;
interface Ast_ModuleBodyElement_Node_26_ extends BaseSymbolNode {
        symbol:"moduleBodyElement";
        
        children:[Ast_PropertyLetStmt_Node];
        parent:Ast_ModuleBody_group_def_7_Parent_Node | Ast_ModuleBody_Node;
      }
type Ast_ModuleBodyElement_Node_26 = Ast_ModuleBodyElement_Node_26_;
interface Ast_ModuleBodyElement_Node_27_ extends BaseSymbolNode {
        symbol:"moduleBodyElement";
        
        children:[Ast_SubStmt_Node];
        parent:Ast_ModuleBody_group_def_7_Parent_Node | Ast_ModuleBody_Node;
      }
type Ast_ModuleBodyElement_Node_27 = Ast_ModuleBodyElement_Node_27_;
interface Ast_PRIVATE_Node_ extends BaseTokenNode {
            token:"PRIVATE";
            parent:Ast_Visibility_Node_28;
          }
export type Ast_PRIVATE_Node = Ast_PRIVATE_Node_;
interface Ast_Visibility_Node_28_ extends BaseSymbolNode {
        symbol:"visibility";
        
        children:[Ast_PRIVATE_Node];
        parent:Ast_SubStmt_Node_32 | Ast_SubStmt_Node_33 | Ast_SubStmt_Node_34 | Ast_SubStmt_Node_35 | Ast_SubStmt_Node_36 | Ast_SubStmt_Node_37 | Ast_SubStmt_Node_38 | Ast_SubStmt_Node_39 | Ast_PropertyGetStmt_Node_48 | Ast_PropertyGetStmt_Node_49 | Ast_PropertyGetStmt_Node_50 | Ast_PropertyGetStmt_Node_51 | Ast_PropertyGetStmt_Node_52 | Ast_PropertyGetStmt_Node_53 | Ast_PropertyGetStmt_Node_54 | Ast_PropertyGetStmt_Node_55 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertySetStmt_Node_80 | Ast_PropertySetStmt_Node_81 | Ast_PropertySetStmt_Node_82 | Ast_PropertySetStmt_Node_83 | Ast_PropertySetStmt_Node_84 | Ast_PropertySetStmt_Node_85 | Ast_PropertySetStmt_Node_86 | Ast_PropertySetStmt_Node_87 | Ast_PropertyLetStmt_Node_96 | Ast_PropertyLetStmt_Node_97 | Ast_PropertyLetStmt_Node_98 | Ast_PropertyLetStmt_Node_99 | Ast_PropertyLetStmt_Node_100 | Ast_PropertyLetStmt_Node_101 | Ast_PropertyLetStmt_Node_102 | Ast_PropertyLetStmt_Node_103 | Ast_FunctionStmt_Node_112 | Ast_FunctionStmt_Node_113 | Ast_FunctionStmt_Node_114 | Ast_FunctionStmt_Node_115 | Ast_FunctionStmt_Node_116 | Ast_FunctionStmt_Node_117 | Ast_FunctionStmt_Node_118 | Ast_FunctionStmt_Node_119 | Ast_FunctionStmt_Node_120 | Ast_FunctionStmt_Node_121 | Ast_FunctionStmt_Node_122 | Ast_FunctionStmt_Node_123 | Ast_FunctionStmt_Node_124 | Ast_FunctionStmt_Node_125 | Ast_FunctionStmt_Node_126 | Ast_FunctionStmt_Node_127 | Ast_FunctionStmt_Node_128 | Ast_FunctionStmt_Node_129 | Ast_FunctionStmt_Node_130 | Ast_FunctionStmt_Node_131 | Ast_FunctionStmt_Node_132 | Ast_FunctionStmt_Node_133 | Ast_FunctionStmt_Node_134 | Ast_FunctionStmt_Node_135 | Ast_FunctionStmt_Node_136 | Ast_FunctionStmt_Node_137 | Ast_FunctionStmt_Node_138 | Ast_FunctionStmt_Node_139 | Ast_FunctionStmt_Node_140 | Ast_FunctionStmt_Node_141 | Ast_FunctionStmt_Node_142 | Ast_FunctionStmt_Node_143 | Ast_VariableStmt_group_def_35_Parent_Node;
      }
type Ast_Visibility_Node_28 = Ast_Visibility_Node_28_;
interface Ast_PUBLIC_Node_ extends BaseTokenNode {
            token:"PUBLIC";
            parent:Ast_Visibility_Node_29;
          }
export type Ast_PUBLIC_Node = Ast_PUBLIC_Node_;
interface Ast_Visibility_Node_29_ extends BaseSymbolNode {
        symbol:"visibility";
        
        children:[Ast_PUBLIC_Node];
        parent:Ast_SubStmt_Node_32 | Ast_SubStmt_Node_33 | Ast_SubStmt_Node_34 | Ast_SubStmt_Node_35 | Ast_SubStmt_Node_36 | Ast_SubStmt_Node_37 | Ast_SubStmt_Node_38 | Ast_SubStmt_Node_39 | Ast_PropertyGetStmt_Node_48 | Ast_PropertyGetStmt_Node_49 | Ast_PropertyGetStmt_Node_50 | Ast_PropertyGetStmt_Node_51 | Ast_PropertyGetStmt_Node_52 | Ast_PropertyGetStmt_Node_53 | Ast_PropertyGetStmt_Node_54 | Ast_PropertyGetStmt_Node_55 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertySetStmt_Node_80 | Ast_PropertySetStmt_Node_81 | Ast_PropertySetStmt_Node_82 | Ast_PropertySetStmt_Node_83 | Ast_PropertySetStmt_Node_84 | Ast_PropertySetStmt_Node_85 | Ast_PropertySetStmt_Node_86 | Ast_PropertySetStmt_Node_87 | Ast_PropertyLetStmt_Node_96 | Ast_PropertyLetStmt_Node_97 | Ast_PropertyLetStmt_Node_98 | Ast_PropertyLetStmt_Node_99 | Ast_PropertyLetStmt_Node_100 | Ast_PropertyLetStmt_Node_101 | Ast_PropertyLetStmt_Node_102 | Ast_PropertyLetStmt_Node_103 | Ast_FunctionStmt_Node_112 | Ast_FunctionStmt_Node_113 | Ast_FunctionStmt_Node_114 | Ast_FunctionStmt_Node_115 | Ast_FunctionStmt_Node_116 | Ast_FunctionStmt_Node_117 | Ast_FunctionStmt_Node_118 | Ast_FunctionStmt_Node_119 | Ast_FunctionStmt_Node_120 | Ast_FunctionStmt_Node_121 | Ast_FunctionStmt_Node_122 | Ast_FunctionStmt_Node_123 | Ast_FunctionStmt_Node_124 | Ast_FunctionStmt_Node_125 | Ast_FunctionStmt_Node_126 | Ast_FunctionStmt_Node_127 | Ast_FunctionStmt_Node_128 | Ast_FunctionStmt_Node_129 | Ast_FunctionStmt_Node_130 | Ast_FunctionStmt_Node_131 | Ast_FunctionStmt_Node_132 | Ast_FunctionStmt_Node_133 | Ast_FunctionStmt_Node_134 | Ast_FunctionStmt_Node_135 | Ast_FunctionStmt_Node_136 | Ast_FunctionStmt_Node_137 | Ast_FunctionStmt_Node_138 | Ast_FunctionStmt_Node_139 | Ast_FunctionStmt_Node_140 | Ast_FunctionStmt_Node_141 | Ast_FunctionStmt_Node_142 | Ast_FunctionStmt_Node_143 | Ast_VariableStmt_group_def_35_Parent_Node;
      }
type Ast_Visibility_Node_29 = Ast_Visibility_Node_29_;
interface Ast_FRIEND_Node_ extends BaseTokenNode {
            token:"FRIEND";
            parent:Ast_Visibility_Node_30;
          }
export type Ast_FRIEND_Node = Ast_FRIEND_Node_;
interface Ast_Visibility_Node_30_ extends BaseSymbolNode {
        symbol:"visibility";
        
        children:[Ast_FRIEND_Node];
        parent:Ast_SubStmt_Node_32 | Ast_SubStmt_Node_33 | Ast_SubStmt_Node_34 | Ast_SubStmt_Node_35 | Ast_SubStmt_Node_36 | Ast_SubStmt_Node_37 | Ast_SubStmt_Node_38 | Ast_SubStmt_Node_39 | Ast_PropertyGetStmt_Node_48 | Ast_PropertyGetStmt_Node_49 | Ast_PropertyGetStmt_Node_50 | Ast_PropertyGetStmt_Node_51 | Ast_PropertyGetStmt_Node_52 | Ast_PropertyGetStmt_Node_53 | Ast_PropertyGetStmt_Node_54 | Ast_PropertyGetStmt_Node_55 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertySetStmt_Node_80 | Ast_PropertySetStmt_Node_81 | Ast_PropertySetStmt_Node_82 | Ast_PropertySetStmt_Node_83 | Ast_PropertySetStmt_Node_84 | Ast_PropertySetStmt_Node_85 | Ast_PropertySetStmt_Node_86 | Ast_PropertySetStmt_Node_87 | Ast_PropertyLetStmt_Node_96 | Ast_PropertyLetStmt_Node_97 | Ast_PropertyLetStmt_Node_98 | Ast_PropertyLetStmt_Node_99 | Ast_PropertyLetStmt_Node_100 | Ast_PropertyLetStmt_Node_101 | Ast_PropertyLetStmt_Node_102 | Ast_PropertyLetStmt_Node_103 | Ast_FunctionStmt_Node_112 | Ast_FunctionStmt_Node_113 | Ast_FunctionStmt_Node_114 | Ast_FunctionStmt_Node_115 | Ast_FunctionStmt_Node_116 | Ast_FunctionStmt_Node_117 | Ast_FunctionStmt_Node_118 | Ast_FunctionStmt_Node_119 | Ast_FunctionStmt_Node_120 | Ast_FunctionStmt_Node_121 | Ast_FunctionStmt_Node_122 | Ast_FunctionStmt_Node_123 | Ast_FunctionStmt_Node_124 | Ast_FunctionStmt_Node_125 | Ast_FunctionStmt_Node_126 | Ast_FunctionStmt_Node_127 | Ast_FunctionStmt_Node_128 | Ast_FunctionStmt_Node_129 | Ast_FunctionStmt_Node_130 | Ast_FunctionStmt_Node_131 | Ast_FunctionStmt_Node_132 | Ast_FunctionStmt_Node_133 | Ast_FunctionStmt_Node_134 | Ast_FunctionStmt_Node_135 | Ast_FunctionStmt_Node_136 | Ast_FunctionStmt_Node_137 | Ast_FunctionStmt_Node_138 | Ast_FunctionStmt_Node_139 | Ast_FunctionStmt_Node_140 | Ast_FunctionStmt_Node_141 | Ast_FunctionStmt_Node_142 | Ast_FunctionStmt_Node_143 | Ast_VariableStmt_group_def_35_Parent_Node;
      }
type Ast_Visibility_Node_30 = Ast_Visibility_Node_30_;
interface Ast_GLOBAL_Node_ extends BaseTokenNode {
            token:"GLOBAL";
            parent:Ast_Visibility_Node_31;
          }
export type Ast_GLOBAL_Node = Ast_GLOBAL_Node_;
interface Ast_Visibility_Node_31_ extends BaseSymbolNode {
        symbol:"visibility";
        
        children:[Ast_GLOBAL_Node];
        parent:Ast_SubStmt_Node_32 | Ast_SubStmt_Node_33 | Ast_SubStmt_Node_34 | Ast_SubStmt_Node_35 | Ast_SubStmt_Node_36 | Ast_SubStmt_Node_37 | Ast_SubStmt_Node_38 | Ast_SubStmt_Node_39 | Ast_PropertyGetStmt_Node_48 | Ast_PropertyGetStmt_Node_49 | Ast_PropertyGetStmt_Node_50 | Ast_PropertyGetStmt_Node_51 | Ast_PropertyGetStmt_Node_52 | Ast_PropertyGetStmt_Node_53 | Ast_PropertyGetStmt_Node_54 | Ast_PropertyGetStmt_Node_55 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertySetStmt_Node_80 | Ast_PropertySetStmt_Node_81 | Ast_PropertySetStmt_Node_82 | Ast_PropertySetStmt_Node_83 | Ast_PropertySetStmt_Node_84 | Ast_PropertySetStmt_Node_85 | Ast_PropertySetStmt_Node_86 | Ast_PropertySetStmt_Node_87 | Ast_PropertyLetStmt_Node_96 | Ast_PropertyLetStmt_Node_97 | Ast_PropertyLetStmt_Node_98 | Ast_PropertyLetStmt_Node_99 | Ast_PropertyLetStmt_Node_100 | Ast_PropertyLetStmt_Node_101 | Ast_PropertyLetStmt_Node_102 | Ast_PropertyLetStmt_Node_103 | Ast_FunctionStmt_Node_112 | Ast_FunctionStmt_Node_113 | Ast_FunctionStmt_Node_114 | Ast_FunctionStmt_Node_115 | Ast_FunctionStmt_Node_116 | Ast_FunctionStmt_Node_117 | Ast_FunctionStmt_Node_118 | Ast_FunctionStmt_Node_119 | Ast_FunctionStmt_Node_120 | Ast_FunctionStmt_Node_121 | Ast_FunctionStmt_Node_122 | Ast_FunctionStmt_Node_123 | Ast_FunctionStmt_Node_124 | Ast_FunctionStmt_Node_125 | Ast_FunctionStmt_Node_126 | Ast_FunctionStmt_Node_127 | Ast_FunctionStmt_Node_128 | Ast_FunctionStmt_Node_129 | Ast_FunctionStmt_Node_130 | Ast_FunctionStmt_Node_131 | Ast_FunctionStmt_Node_132 | Ast_FunctionStmt_Node_133 | Ast_FunctionStmt_Node_134 | Ast_FunctionStmt_Node_135 | Ast_FunctionStmt_Node_136 | Ast_FunctionStmt_Node_137 | Ast_FunctionStmt_Node_138 | Ast_FunctionStmt_Node_139 | Ast_FunctionStmt_Node_140 | Ast_FunctionStmt_Node_141 | Ast_FunctionStmt_Node_142 | Ast_FunctionStmt_Node_143 | Ast_VariableStmt_group_def_35_Parent_Node;
      }
type Ast_Visibility_Node_31 = Ast_Visibility_Node_31_;
interface Ast_STATIC_Node_ extends BaseTokenNode {
            token:"STATIC";
            parent:Ast_SubStmt_Node_32 | Ast_SubStmt_Node_33 | Ast_SubStmt_Node_34 | Ast_SubStmt_Node_35 | Ast_SubStmt_Node_40 | Ast_SubStmt_Node_41 | Ast_SubStmt_Node_42 | Ast_SubStmt_Node_43 | Ast_PropertyGetStmt_Node_48 | Ast_PropertyGetStmt_Node_49 | Ast_PropertyGetStmt_Node_50 | Ast_PropertyGetStmt_Node_51 | Ast_PropertyGetStmt_Node_52 | Ast_PropertyGetStmt_Node_53 | Ast_PropertyGetStmt_Node_54 | Ast_PropertyGetStmt_Node_55 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_69 | Ast_PropertyGetStmt_Node_70 | Ast_PropertyGetStmt_Node_71 | Ast_PropertySetStmt_Node_80 | Ast_PropertySetStmt_Node_81 | Ast_PropertySetStmt_Node_82 | Ast_PropertySetStmt_Node_83 | Ast_PropertySetStmt_Node_88 | Ast_PropertySetStmt_Node_89 | Ast_PropertySetStmt_Node_90 | Ast_PropertySetStmt_Node_91 | Ast_PropertyLetStmt_Node_96 | Ast_PropertyLetStmt_Node_97 | Ast_PropertyLetStmt_Node_98 | Ast_PropertyLetStmt_Node_99 | Ast_PropertyLetStmt_Node_104 | Ast_PropertyLetStmt_Node_105 | Ast_PropertyLetStmt_Node_106 | Ast_PropertyLetStmt_Node_107 | Ast_FunctionStmt_Node_112 | Ast_FunctionStmt_Node_113 | Ast_FunctionStmt_Node_114 | Ast_FunctionStmt_Node_115 | Ast_FunctionStmt_Node_116 | Ast_FunctionStmt_Node_117 | Ast_FunctionStmt_Node_118 | Ast_FunctionStmt_Node_119 | Ast_FunctionStmt_Node_120 | Ast_FunctionStmt_Node_121 | Ast_FunctionStmt_Node_122 | Ast_FunctionStmt_Node_123 | Ast_FunctionStmt_Node_124 | Ast_FunctionStmt_Node_125 | Ast_FunctionStmt_Node_126 | Ast_FunctionStmt_Node_127 | Ast_FunctionStmt_Node_144 | Ast_FunctionStmt_Node_145 | Ast_FunctionStmt_Node_146 | Ast_FunctionStmt_Node_147 | Ast_FunctionStmt_Node_148 | Ast_FunctionStmt_Node_149 | Ast_FunctionStmt_Node_150 | Ast_FunctionStmt_Node_151 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_158 | Ast_FunctionStmt_Node_159 | Ast_VariableStmt_group_def_34_Parent_Node;
          }
export type Ast_STATIC_Node = Ast_STATIC_Node_;
interface Ast_SUB_Node_ extends BaseTokenNode {
            token:"SUB";
            parent:Ast_SubStmt_Node_32 | Ast_SubStmt_Node_33 | Ast_SubStmt_Node_34 | Ast_SubStmt_Node_35 | Ast_SubStmt_Node_36 | Ast_SubStmt_Node_37 | Ast_SubStmt_Node_38 | Ast_SubStmt_Node_39 | Ast_SubStmt_Node_40 | Ast_SubStmt_Node_41 | Ast_SubStmt_Node_42 | Ast_SubStmt_Node_43 | Ast_SubStmt_Node_44 | Ast_SubStmt_Node_45 | Ast_SubStmt_Node_46 | Ast_SubStmt_Node_47;
          }
export type Ast_SUB_Node = Ast_SUB_Node_;
interface Ast_END_SUB_Node_ extends BaseTokenNode {
            token:"END_SUB";
            parent:Ast_SubStmt_Node_32 | Ast_SubStmt_Node_33 | Ast_SubStmt_Node_34 | Ast_SubStmt_Node_35 | Ast_SubStmt_Node_36 | Ast_SubStmt_Node_37 | Ast_SubStmt_Node_38 | Ast_SubStmt_Node_39 | Ast_SubStmt_Node_40 | Ast_SubStmt_Node_41 | Ast_SubStmt_Node_42 | Ast_SubStmt_Node_43 | Ast_SubStmt_Node_44 | Ast_SubStmt_Node_45 | Ast_SubStmt_Node_46 | Ast_SubStmt_Node_47;
          }
export type Ast_END_SUB_Node = Ast_END_SUB_Node_;
interface Ast_SubStmt_Node_32_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_SUB_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_27;
      }
type Ast_SubStmt_Node_32 = Ast_SubStmt_Node_32_;
interface Ast_SubStmt_Node_33_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_SUB_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_27;
      }
type Ast_SubStmt_Node_33 = Ast_SubStmt_Node_33_;
interface Ast_SubStmt_Node_34_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_SUB_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_27;
      }
type Ast_SubStmt_Node_34 = Ast_SubStmt_Node_34_;
interface Ast_SubStmt_Node_35_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_SUB_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_27;
      }
type Ast_SubStmt_Node_35 = Ast_SubStmt_Node_35_;
interface Ast_SubStmt_Node_36_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_Visibility_Node,Ast_SUB_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_27;
      }
type Ast_SubStmt_Node_36 = Ast_SubStmt_Node_36_;
interface Ast_SubStmt_Node_37_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_Visibility_Node,Ast_SUB_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_27;
      }
type Ast_SubStmt_Node_37 = Ast_SubStmt_Node_37_;
interface Ast_SubStmt_Node_38_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_Visibility_Node,Ast_SUB_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_27;
      }
type Ast_SubStmt_Node_38 = Ast_SubStmt_Node_38_;
interface Ast_SubStmt_Node_39_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_Visibility_Node,Ast_SUB_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_27;
      }
type Ast_SubStmt_Node_39 = Ast_SubStmt_Node_39_;
interface Ast_SubStmt_Node_40_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_STATIC_Node,Ast_SUB_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_27;
      }
type Ast_SubStmt_Node_40 = Ast_SubStmt_Node_40_;
interface Ast_SubStmt_Node_41_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_STATIC_Node,Ast_SUB_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_27;
      }
type Ast_SubStmt_Node_41 = Ast_SubStmt_Node_41_;
interface Ast_SubStmt_Node_42_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_STATIC_Node,Ast_SUB_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_27;
      }
type Ast_SubStmt_Node_42 = Ast_SubStmt_Node_42_;
interface Ast_SubStmt_Node_43_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_STATIC_Node,Ast_SUB_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_27;
      }
type Ast_SubStmt_Node_43 = Ast_SubStmt_Node_43_;
interface Ast_SubStmt_Node_44_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_SUB_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_27;
      }
type Ast_SubStmt_Node_44 = Ast_SubStmt_Node_44_;
interface Ast_SubStmt_Node_45_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_SUB_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_27;
      }
type Ast_SubStmt_Node_45 = Ast_SubStmt_Node_45_;
interface Ast_SubStmt_Node_46_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_SUB_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_27;
      }
type Ast_SubStmt_Node_46 = Ast_SubStmt_Node_46_;
interface Ast_SubStmt_Node_47_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_SUB_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_27;
      }
type Ast_SubStmt_Node_47 = Ast_SubStmt_Node_47_;
interface Ast_PROPERTY_GET_Node_ extends BaseTokenNode {
            token:"PROPERTY_GET";
            parent:Ast_PropertyGetStmt_Node_48 | Ast_PropertyGetStmt_Node_49 | Ast_PropertyGetStmt_Node_50 | Ast_PropertyGetStmt_Node_51 | Ast_PropertyGetStmt_Node_52 | Ast_PropertyGetStmt_Node_53 | Ast_PropertyGetStmt_Node_54 | Ast_PropertyGetStmt_Node_55 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_69 | Ast_PropertyGetStmt_Node_70 | Ast_PropertyGetStmt_Node_71 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_PropertyGetStmt_Node_78 | Ast_PropertyGetStmt_Node_79;
          }
export type Ast_PROPERTY_GET_Node = Ast_PROPERTY_GET_Node_;
interface Ast_LPAREN_Node_ extends BaseTokenNode {
            token:"LPAREN";
            parent:Ast_PropertyGetStmt_Node_48 | Ast_PropertyGetStmt_Node_49 | Ast_PropertyGetStmt_Node_50 | Ast_PropertyGetStmt_Node_51 | Ast_PropertyGetStmt_Node_52 | Ast_PropertyGetStmt_Node_53 | Ast_PropertyGetStmt_Node_54 | Ast_PropertyGetStmt_Node_55 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_69 | Ast_PropertyGetStmt_Node_70 | Ast_PropertyGetStmt_Node_71 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_PropertyGetStmt_Node_78 | Ast_PropertyGetStmt_Node_79 | Ast_RedimSubStmt_Node_191 | Ast_RedimSubStmt_Node_192 | Ast_ECS_MemberProcedureCall_group_def_19_Parent_Node | Ast_ECS_MemberProcedureCall_group_def_21_Parent_Node | Ast_ArgCall_Node_247 | Ast_ArgCall_Node_248 | Ast_ArgCall_Node_249 | Ast_ArgCall_Node_250 | Ast_VariableSubStmt_group_def_39_Parent_Node_265 | Ast_VariableSubStmt_group_def_39_Parent_Node_266 | Ast_ArgList_Node_285 | Ast_ArgList_Node_286 | Ast_ICS_S_ProcedureOrArrayCall_Node_308 | Ast_ICS_S_ProcedureOrArrayCall_Node_309 | Ast_ICS_S_ProcedureOrArrayCall_Node_310 | Ast_ICS_S_ProcedureOrArrayCall_Node_311 | Ast_ICS_S_ProcedureOrArrayCall_Node_312 | Ast_ICS_S_ProcedureOrArrayCall_Node_313 | Ast_ICS_S_ProcedureOrArrayCall_Node_314 | Ast_ICS_S_ProcedureOrArrayCall_Node_315 | Ast_Arg_group_def_62_Parent_Node;
          }
export type Ast_LPAREN_Node = Ast_LPAREN_Node_;
interface Ast_RPAREN_Node_ extends BaseTokenNode {
            token:"RPAREN";
            parent:Ast_PropertyGetStmt_Node_48 | Ast_PropertyGetStmt_Node_49 | Ast_PropertyGetStmt_Node_50 | Ast_PropertyGetStmt_Node_51 | Ast_PropertyGetStmt_Node_52 | Ast_PropertyGetStmt_Node_53 | Ast_PropertyGetStmt_Node_54 | Ast_PropertyGetStmt_Node_55 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_69 | Ast_PropertyGetStmt_Node_70 | Ast_PropertyGetStmt_Node_71 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_PropertyGetStmt_Node_78 | Ast_PropertyGetStmt_Node_79 | Ast_RedimSubStmt_Node_191 | Ast_RedimSubStmt_Node_192 | Ast_ECS_MemberProcedureCall_group_def_19_Parent_Node | Ast_ECS_MemberProcedureCall_group_def_21_Parent_Node | Ast_ArgCall_Node_247 | Ast_ArgCall_Node_249 | Ast_ArgCall_Node_251 | Ast_ArgCall_Node_253 | Ast_VariableSubStmt_group_def_39_Parent_Node_265 | Ast_VariableSubStmt_group_def_39_Parent_Node_266 | Ast_ArgList_Node_285 | Ast_ArgList_Node_286 | Ast_ICS_S_ProcedureOrArrayCall_Node_308 | Ast_ICS_S_ProcedureOrArrayCall_Node_309 | Ast_ICS_S_ProcedureOrArrayCall_Node_310 | Ast_ICS_S_ProcedureOrArrayCall_Node_311 | Ast_ICS_S_ProcedureOrArrayCall_Node_312 | Ast_ICS_S_ProcedureOrArrayCall_Node_313 | Ast_ICS_S_ProcedureOrArrayCall_Node_314 | Ast_ICS_S_ProcedureOrArrayCall_Node_315 | Ast_Arg_group_def_62_Parent_Node;
          }
export type Ast_RPAREN_Node = Ast_RPAREN_Node_;
interface Ast_END_PROPERTY_Node_ extends BaseTokenNode {
            token:"END_PROPERTY";
            parent:Ast_PropertyGetStmt_Node_48 | Ast_PropertyGetStmt_Node_49 | Ast_PropertyGetStmt_Node_50 | Ast_PropertyGetStmt_Node_51 | Ast_PropertyGetStmt_Node_52 | Ast_PropertyGetStmt_Node_53 | Ast_PropertyGetStmt_Node_54 | Ast_PropertyGetStmt_Node_55 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_69 | Ast_PropertyGetStmt_Node_70 | Ast_PropertyGetStmt_Node_71 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_PropertyGetStmt_Node_78 | Ast_PropertyGetStmt_Node_79 | Ast_PropertySetStmt_Node_80 | Ast_PropertySetStmt_Node_81 | Ast_PropertySetStmt_Node_82 | Ast_PropertySetStmt_Node_83 | Ast_PropertySetStmt_Node_84 | Ast_PropertySetStmt_Node_85 | Ast_PropertySetStmt_Node_86 | Ast_PropertySetStmt_Node_87 | Ast_PropertySetStmt_Node_88 | Ast_PropertySetStmt_Node_89 | Ast_PropertySetStmt_Node_90 | Ast_PropertySetStmt_Node_91 | Ast_PropertySetStmt_Node_92 | Ast_PropertySetStmt_Node_93 | Ast_PropertySetStmt_Node_94 | Ast_PropertySetStmt_Node_95 | Ast_PropertyLetStmt_Node_96 | Ast_PropertyLetStmt_Node_97 | Ast_PropertyLetStmt_Node_98 | Ast_PropertyLetStmt_Node_99 | Ast_PropertyLetStmt_Node_100 | Ast_PropertyLetStmt_Node_101 | Ast_PropertyLetStmt_Node_102 | Ast_PropertyLetStmt_Node_103 | Ast_PropertyLetStmt_Node_104 | Ast_PropertyLetStmt_Node_105 | Ast_PropertyLetStmt_Node_106 | Ast_PropertyLetStmt_Node_107 | Ast_PropertyLetStmt_Node_108 | Ast_PropertyLetStmt_Node_109 | Ast_PropertyLetStmt_Node_110 | Ast_PropertyLetStmt_Node_111;
          }
export type Ast_END_PROPERTY_Node = Ast_END_PROPERTY_Node_;
interface Ast_PropertyGetStmt_Node_48_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_48 = Ast_PropertyGetStmt_Node_48_;
interface Ast_PropertyGetStmt_Node_49_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_49 = Ast_PropertyGetStmt_Node_49_;
interface Ast_PropertyGetStmt_Node_50_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_50 = Ast_PropertyGetStmt_Node_50_;
interface Ast_PropertyGetStmt_Node_51_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_51 = Ast_PropertyGetStmt_Node_51_;
interface Ast_PropertyGetStmt_Node_52_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_52 = Ast_PropertyGetStmt_Node_52_;
interface Ast_PropertyGetStmt_Node_53_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_53 = Ast_PropertyGetStmt_Node_53_;
interface Ast_PropertyGetStmt_Node_54_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_54 = Ast_PropertyGetStmt_Node_54_;
interface Ast_PropertyGetStmt_Node_55_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_55 = Ast_PropertyGetStmt_Node_55_;
interface Ast_PropertyGetStmt_Node_56_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_56 = Ast_PropertyGetStmt_Node_56_;
interface Ast_PropertyGetStmt_Node_57_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_57 = Ast_PropertyGetStmt_Node_57_;
interface Ast_PropertyGetStmt_Node_58_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_58 = Ast_PropertyGetStmt_Node_58_;
interface Ast_PropertyGetStmt_Node_59_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_59 = Ast_PropertyGetStmt_Node_59_;
interface Ast_PropertyGetStmt_Node_60_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_60 = Ast_PropertyGetStmt_Node_60_;
interface Ast_PropertyGetStmt_Node_61_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_61 = Ast_PropertyGetStmt_Node_61_;
interface Ast_PropertyGetStmt_Node_62_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_62 = Ast_PropertyGetStmt_Node_62_;
interface Ast_PropertyGetStmt_Node_63_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_63 = Ast_PropertyGetStmt_Node_63_;
interface Ast_PropertyGetStmt_Node_64_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_64 = Ast_PropertyGetStmt_Node_64_;
interface Ast_PropertyGetStmt_Node_65_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_65 = Ast_PropertyGetStmt_Node_65_;
interface Ast_PropertyGetStmt_Node_66_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_66 = Ast_PropertyGetStmt_Node_66_;
interface Ast_PropertyGetStmt_Node_67_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_67 = Ast_PropertyGetStmt_Node_67_;
interface Ast_PropertyGetStmt_Node_68_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_68 = Ast_PropertyGetStmt_Node_68_;
interface Ast_PropertyGetStmt_Node_69_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_69 = Ast_PropertyGetStmt_Node_69_;
interface Ast_PropertyGetStmt_Node_70_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_70 = Ast_PropertyGetStmt_Node_70_;
interface Ast_PropertyGetStmt_Node_71_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_71 = Ast_PropertyGetStmt_Node_71_;
interface Ast_PropertyGetStmt_Node_72_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_72 = Ast_PropertyGetStmt_Node_72_;
interface Ast_PropertyGetStmt_Node_73_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_73 = Ast_PropertyGetStmt_Node_73_;
interface Ast_PropertyGetStmt_Node_74_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_74 = Ast_PropertyGetStmt_Node_74_;
interface Ast_PropertyGetStmt_Node_75_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_75 = Ast_PropertyGetStmt_Node_75_;
interface Ast_PropertyGetStmt_Node_76_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_76 = Ast_PropertyGetStmt_Node_76_;
interface Ast_PropertyGetStmt_Node_77_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_77 = Ast_PropertyGetStmt_Node_77_;
interface Ast_PropertyGetStmt_Node_78_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_78 = Ast_PropertyGetStmt_Node_78_;
interface Ast_PropertyGetStmt_Node_79_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_PROPERTY_GET_Node,Ast_AmbiguousIdentifier_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_24;
      }
type Ast_PropertyGetStmt_Node_79 = Ast_PropertyGetStmt_Node_79_;
interface Ast_PROPERTY_SET_Node_ extends BaseTokenNode {
            token:"PROPERTY_SET";
            parent:Ast_PropertySetStmt_Node_80 | Ast_PropertySetStmt_Node_81 | Ast_PropertySetStmt_Node_82 | Ast_PropertySetStmt_Node_83 | Ast_PropertySetStmt_Node_84 | Ast_PropertySetStmt_Node_85 | Ast_PropertySetStmt_Node_86 | Ast_PropertySetStmt_Node_87 | Ast_PropertySetStmt_Node_88 | Ast_PropertySetStmt_Node_89 | Ast_PropertySetStmt_Node_90 | Ast_PropertySetStmt_Node_91 | Ast_PropertySetStmt_Node_92 | Ast_PropertySetStmt_Node_93 | Ast_PropertySetStmt_Node_94 | Ast_PropertySetStmt_Node_95;
          }
export type Ast_PROPERTY_SET_Node = Ast_PROPERTY_SET_Node_;
interface Ast_PropertySetStmt_Node_80_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_SET_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_25;
      }
type Ast_PropertySetStmt_Node_80 = Ast_PropertySetStmt_Node_80_;
interface Ast_PropertySetStmt_Node_81_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_SET_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_25;
      }
type Ast_PropertySetStmt_Node_81 = Ast_PropertySetStmt_Node_81_;
interface Ast_PropertySetStmt_Node_82_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_SET_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_25;
      }
type Ast_PropertySetStmt_Node_82 = Ast_PropertySetStmt_Node_82_;
interface Ast_PropertySetStmt_Node_83_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_SET_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_25;
      }
type Ast_PropertySetStmt_Node_83 = Ast_PropertySetStmt_Node_83_;
interface Ast_PropertySetStmt_Node_84_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_SET_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_25;
      }
type Ast_PropertySetStmt_Node_84 = Ast_PropertySetStmt_Node_84_;
interface Ast_PropertySetStmt_Node_85_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_SET_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_25;
      }
type Ast_PropertySetStmt_Node_85 = Ast_PropertySetStmt_Node_85_;
interface Ast_PropertySetStmt_Node_86_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_SET_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_25;
      }
type Ast_PropertySetStmt_Node_86 = Ast_PropertySetStmt_Node_86_;
interface Ast_PropertySetStmt_Node_87_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_SET_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_25;
      }
type Ast_PropertySetStmt_Node_87 = Ast_PropertySetStmt_Node_87_;
interface Ast_PropertySetStmt_Node_88_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_SET_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_25;
      }
type Ast_PropertySetStmt_Node_88 = Ast_PropertySetStmt_Node_88_;
interface Ast_PropertySetStmt_Node_89_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_SET_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_25;
      }
type Ast_PropertySetStmt_Node_89 = Ast_PropertySetStmt_Node_89_;
interface Ast_PropertySetStmt_Node_90_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_SET_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_25;
      }
type Ast_PropertySetStmt_Node_90 = Ast_PropertySetStmt_Node_90_;
interface Ast_PropertySetStmt_Node_91_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_SET_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_25;
      }
type Ast_PropertySetStmt_Node_91 = Ast_PropertySetStmt_Node_91_;
interface Ast_PropertySetStmt_Node_92_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_PROPERTY_SET_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_25;
      }
type Ast_PropertySetStmt_Node_92 = Ast_PropertySetStmt_Node_92_;
interface Ast_PropertySetStmt_Node_93_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_PROPERTY_SET_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_25;
      }
type Ast_PropertySetStmt_Node_93 = Ast_PropertySetStmt_Node_93_;
interface Ast_PropertySetStmt_Node_94_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_PROPERTY_SET_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_25;
      }
type Ast_PropertySetStmt_Node_94 = Ast_PropertySetStmt_Node_94_;
interface Ast_PropertySetStmt_Node_95_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_PROPERTY_SET_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_25;
      }
type Ast_PropertySetStmt_Node_95 = Ast_PropertySetStmt_Node_95_;
interface Ast_PROPERTY_LET_Node_ extends BaseTokenNode {
            token:"PROPERTY_LET";
            parent:Ast_PropertyLetStmt_Node_96 | Ast_PropertyLetStmt_Node_97 | Ast_PropertyLetStmt_Node_98 | Ast_PropertyLetStmt_Node_99 | Ast_PropertyLetStmt_Node_100 | Ast_PropertyLetStmt_Node_101 | Ast_PropertyLetStmt_Node_102 | Ast_PropertyLetStmt_Node_103 | Ast_PropertyLetStmt_Node_104 | Ast_PropertyLetStmt_Node_105 | Ast_PropertyLetStmt_Node_106 | Ast_PropertyLetStmt_Node_107 | Ast_PropertyLetStmt_Node_108 | Ast_PropertyLetStmt_Node_109 | Ast_PropertyLetStmt_Node_110 | Ast_PropertyLetStmt_Node_111;
          }
export type Ast_PROPERTY_LET_Node = Ast_PROPERTY_LET_Node_;
interface Ast_PropertyLetStmt_Node_96_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_LET_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_26;
      }
type Ast_PropertyLetStmt_Node_96 = Ast_PropertyLetStmt_Node_96_;
interface Ast_PropertyLetStmt_Node_97_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_LET_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_26;
      }
type Ast_PropertyLetStmt_Node_97 = Ast_PropertyLetStmt_Node_97_;
interface Ast_PropertyLetStmt_Node_98_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_LET_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_26;
      }
type Ast_PropertyLetStmt_Node_98 = Ast_PropertyLetStmt_Node_98_;
interface Ast_PropertyLetStmt_Node_99_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_LET_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_26;
      }
type Ast_PropertyLetStmt_Node_99 = Ast_PropertyLetStmt_Node_99_;
interface Ast_PropertyLetStmt_Node_100_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_LET_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_26;
      }
type Ast_PropertyLetStmt_Node_100 = Ast_PropertyLetStmt_Node_100_;
interface Ast_PropertyLetStmt_Node_101_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_LET_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_26;
      }
type Ast_PropertyLetStmt_Node_101 = Ast_PropertyLetStmt_Node_101_;
interface Ast_PropertyLetStmt_Node_102_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_LET_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_26;
      }
type Ast_PropertyLetStmt_Node_102 = Ast_PropertyLetStmt_Node_102_;
interface Ast_PropertyLetStmt_Node_103_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_LET_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_26;
      }
type Ast_PropertyLetStmt_Node_103 = Ast_PropertyLetStmt_Node_103_;
interface Ast_PropertyLetStmt_Node_104_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_LET_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_26;
      }
type Ast_PropertyLetStmt_Node_104 = Ast_PropertyLetStmt_Node_104_;
interface Ast_PropertyLetStmt_Node_105_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_LET_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_26;
      }
type Ast_PropertyLetStmt_Node_105 = Ast_PropertyLetStmt_Node_105_;
interface Ast_PropertyLetStmt_Node_106_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_LET_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_26;
      }
type Ast_PropertyLetStmt_Node_106 = Ast_PropertyLetStmt_Node_106_;
interface Ast_PropertyLetStmt_Node_107_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_LET_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_26;
      }
type Ast_PropertyLetStmt_Node_107 = Ast_PropertyLetStmt_Node_107_;
interface Ast_PropertyLetStmt_Node_108_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_PROPERTY_LET_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_26;
      }
type Ast_PropertyLetStmt_Node_108 = Ast_PropertyLetStmt_Node_108_;
interface Ast_PropertyLetStmt_Node_109_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_PROPERTY_LET_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_26;
      }
type Ast_PropertyLetStmt_Node_109 = Ast_PropertyLetStmt_Node_109_;
interface Ast_PropertyLetStmt_Node_110_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_PROPERTY_LET_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_26;
      }
type Ast_PropertyLetStmt_Node_110 = Ast_PropertyLetStmt_Node_110_;
interface Ast_PropertyLetStmt_Node_111_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_PROPERTY_LET_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_26;
      }
type Ast_PropertyLetStmt_Node_111 = Ast_PropertyLetStmt_Node_111_;
interface Ast_FUNCTION_Node_ extends BaseTokenNode {
            token:"FUNCTION";
            parent:Ast_FunctionStmt_Node_112 | Ast_FunctionStmt_Node_113 | Ast_FunctionStmt_Node_114 | Ast_FunctionStmt_Node_115 | Ast_FunctionStmt_Node_116 | Ast_FunctionStmt_Node_117 | Ast_FunctionStmt_Node_118 | Ast_FunctionStmt_Node_119 | Ast_FunctionStmt_Node_120 | Ast_FunctionStmt_Node_121 | Ast_FunctionStmt_Node_122 | Ast_FunctionStmt_Node_123 | Ast_FunctionStmt_Node_124 | Ast_FunctionStmt_Node_125 | Ast_FunctionStmt_Node_126 | Ast_FunctionStmt_Node_127 | Ast_FunctionStmt_Node_128 | Ast_FunctionStmt_Node_129 | Ast_FunctionStmt_Node_130 | Ast_FunctionStmt_Node_131 | Ast_FunctionStmt_Node_132 | Ast_FunctionStmt_Node_133 | Ast_FunctionStmt_Node_134 | Ast_FunctionStmt_Node_135 | Ast_FunctionStmt_Node_136 | Ast_FunctionStmt_Node_137 | Ast_FunctionStmt_Node_138 | Ast_FunctionStmt_Node_139 | Ast_FunctionStmt_Node_140 | Ast_FunctionStmt_Node_141 | Ast_FunctionStmt_Node_142 | Ast_FunctionStmt_Node_143 | Ast_FunctionStmt_Node_144 | Ast_FunctionStmt_Node_145 | Ast_FunctionStmt_Node_146 | Ast_FunctionStmt_Node_147 | Ast_FunctionStmt_Node_148 | Ast_FunctionStmt_Node_149 | Ast_FunctionStmt_Node_150 | Ast_FunctionStmt_Node_151 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_158 | Ast_FunctionStmt_Node_159 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_166 | Ast_FunctionStmt_Node_167 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_171 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_FunctionStmt_Node_174 | Ast_FunctionStmt_Node_175;
          }
export type Ast_FUNCTION_Node = Ast_FUNCTION_Node_;
interface Ast_END_FUNCTION_Node_ extends BaseTokenNode {
            token:"END_FUNCTION";
            parent:Ast_FunctionStmt_Node_112 | Ast_FunctionStmt_Node_113 | Ast_FunctionStmt_Node_114 | Ast_FunctionStmt_Node_115 | Ast_FunctionStmt_Node_116 | Ast_FunctionStmt_Node_117 | Ast_FunctionStmt_Node_118 | Ast_FunctionStmt_Node_119 | Ast_FunctionStmt_Node_120 | Ast_FunctionStmt_Node_121 | Ast_FunctionStmt_Node_122 | Ast_FunctionStmt_Node_123 | Ast_FunctionStmt_Node_124 | Ast_FunctionStmt_Node_125 | Ast_FunctionStmt_Node_126 | Ast_FunctionStmt_Node_127 | Ast_FunctionStmt_Node_128 | Ast_FunctionStmt_Node_129 | Ast_FunctionStmt_Node_130 | Ast_FunctionStmt_Node_131 | Ast_FunctionStmt_Node_132 | Ast_FunctionStmt_Node_133 | Ast_FunctionStmt_Node_134 | Ast_FunctionStmt_Node_135 | Ast_FunctionStmt_Node_136 | Ast_FunctionStmt_Node_137 | Ast_FunctionStmt_Node_138 | Ast_FunctionStmt_Node_139 | Ast_FunctionStmt_Node_140 | Ast_FunctionStmt_Node_141 | Ast_FunctionStmt_Node_142 | Ast_FunctionStmt_Node_143 | Ast_FunctionStmt_Node_144 | Ast_FunctionStmt_Node_145 | Ast_FunctionStmt_Node_146 | Ast_FunctionStmt_Node_147 | Ast_FunctionStmt_Node_148 | Ast_FunctionStmt_Node_149 | Ast_FunctionStmt_Node_150 | Ast_FunctionStmt_Node_151 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_158 | Ast_FunctionStmt_Node_159 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_166 | Ast_FunctionStmt_Node_167 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_171 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_FunctionStmt_Node_174 | Ast_FunctionStmt_Node_175;
          }
export type Ast_END_FUNCTION_Node = Ast_END_FUNCTION_Node_;
interface Ast_FunctionStmt_Node_112_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_112 = Ast_FunctionStmt_Node_112_;
interface Ast_FunctionStmt_Node_113_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_113 = Ast_FunctionStmt_Node_113_;
interface Ast_FunctionStmt_Node_114_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_114 = Ast_FunctionStmt_Node_114_;
interface Ast_FunctionStmt_Node_115_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_115 = Ast_FunctionStmt_Node_115_;
interface Ast_FunctionStmt_Node_116_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_116 = Ast_FunctionStmt_Node_116_;
interface Ast_FunctionStmt_Node_117_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_117 = Ast_FunctionStmt_Node_117_;
interface Ast_FunctionStmt_Node_118_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_118 = Ast_FunctionStmt_Node_118_;
interface Ast_FunctionStmt_Node_119_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_119 = Ast_FunctionStmt_Node_119_;
interface Ast_FunctionStmt_Node_120_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_120 = Ast_FunctionStmt_Node_120_;
interface Ast_FunctionStmt_Node_121_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_121 = Ast_FunctionStmt_Node_121_;
interface Ast_FunctionStmt_Node_122_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_122 = Ast_FunctionStmt_Node_122_;
interface Ast_FunctionStmt_Node_123_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_123 = Ast_FunctionStmt_Node_123_;
interface Ast_FunctionStmt_Node_124_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_124 = Ast_FunctionStmt_Node_124_;
interface Ast_FunctionStmt_Node_125_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_125 = Ast_FunctionStmt_Node_125_;
interface Ast_FunctionStmt_Node_126_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_126 = Ast_FunctionStmt_Node_126_;
interface Ast_FunctionStmt_Node_127_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_127 = Ast_FunctionStmt_Node_127_;
interface Ast_FunctionStmt_Node_128_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_128 = Ast_FunctionStmt_Node_128_;
interface Ast_FunctionStmt_Node_129_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_129 = Ast_FunctionStmt_Node_129_;
interface Ast_FunctionStmt_Node_130_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_130 = Ast_FunctionStmt_Node_130_;
interface Ast_FunctionStmt_Node_131_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_131 = Ast_FunctionStmt_Node_131_;
interface Ast_FunctionStmt_Node_132_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_132 = Ast_FunctionStmt_Node_132_;
interface Ast_FunctionStmt_Node_133_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_133 = Ast_FunctionStmt_Node_133_;
interface Ast_FunctionStmt_Node_134_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_134 = Ast_FunctionStmt_Node_134_;
interface Ast_FunctionStmt_Node_135_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_135 = Ast_FunctionStmt_Node_135_;
interface Ast_FunctionStmt_Node_136_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_136 = Ast_FunctionStmt_Node_136_;
interface Ast_FunctionStmt_Node_137_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_137 = Ast_FunctionStmt_Node_137_;
interface Ast_FunctionStmt_Node_138_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_138 = Ast_FunctionStmt_Node_138_;
interface Ast_FunctionStmt_Node_139_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_139 = Ast_FunctionStmt_Node_139_;
interface Ast_FunctionStmt_Node_140_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_140 = Ast_FunctionStmt_Node_140_;
interface Ast_FunctionStmt_Node_141_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_141 = Ast_FunctionStmt_Node_141_;
interface Ast_FunctionStmt_Node_142_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_142 = Ast_FunctionStmt_Node_142_;
interface Ast_FunctionStmt_Node_143_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_143 = Ast_FunctionStmt_Node_143_;
interface Ast_FunctionStmt_Node_144_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_144 = Ast_FunctionStmt_Node_144_;
interface Ast_FunctionStmt_Node_145_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_145 = Ast_FunctionStmt_Node_145_;
interface Ast_FunctionStmt_Node_146_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_146 = Ast_FunctionStmt_Node_146_;
interface Ast_FunctionStmt_Node_147_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_147 = Ast_FunctionStmt_Node_147_;
interface Ast_FunctionStmt_Node_148_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_148 = Ast_FunctionStmt_Node_148_;
interface Ast_FunctionStmt_Node_149_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_149 = Ast_FunctionStmt_Node_149_;
interface Ast_FunctionStmt_Node_150_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_150 = Ast_FunctionStmt_Node_150_;
interface Ast_FunctionStmt_Node_151_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_151 = Ast_FunctionStmt_Node_151_;
interface Ast_FunctionStmt_Node_152_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_152 = Ast_FunctionStmt_Node_152_;
interface Ast_FunctionStmt_Node_153_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_153 = Ast_FunctionStmt_Node_153_;
interface Ast_FunctionStmt_Node_154_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_154 = Ast_FunctionStmt_Node_154_;
interface Ast_FunctionStmt_Node_155_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_155 = Ast_FunctionStmt_Node_155_;
interface Ast_FunctionStmt_Node_156_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_156 = Ast_FunctionStmt_Node_156_;
interface Ast_FunctionStmt_Node_157_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_157 = Ast_FunctionStmt_Node_157_;
interface Ast_FunctionStmt_Node_158_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_158 = Ast_FunctionStmt_Node_158_;
interface Ast_FunctionStmt_Node_159_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_159 = Ast_FunctionStmt_Node_159_;
interface Ast_FunctionStmt_Node_160_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_160 = Ast_FunctionStmt_Node_160_;
interface Ast_FunctionStmt_Node_161_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_161 = Ast_FunctionStmt_Node_161_;
interface Ast_FunctionStmt_Node_162_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_162 = Ast_FunctionStmt_Node_162_;
interface Ast_FunctionStmt_Node_163_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_163 = Ast_FunctionStmt_Node_163_;
interface Ast_FunctionStmt_Node_164_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_164 = Ast_FunctionStmt_Node_164_;
interface Ast_FunctionStmt_Node_165_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_165 = Ast_FunctionStmt_Node_165_;
interface Ast_FunctionStmt_Node_166_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_166 = Ast_FunctionStmt_Node_166_;
interface Ast_FunctionStmt_Node_167_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_167 = Ast_FunctionStmt_Node_167_;
interface Ast_FunctionStmt_Node_168_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_168 = Ast_FunctionStmt_Node_168_;
interface Ast_FunctionStmt_Node_169_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_169 = Ast_FunctionStmt_Node_169_;
interface Ast_FunctionStmt_Node_170_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_170 = Ast_FunctionStmt_Node_170_;
interface Ast_FunctionStmt_Node_171_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_171 = Ast_FunctionStmt_Node_171_;
interface Ast_FunctionStmt_Node_172_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_172 = Ast_FunctionStmt_Node_172_;
interface Ast_FunctionStmt_Node_173_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_173 = Ast_FunctionStmt_Node_173_;
interface Ast_FunctionStmt_Node_174_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_174 = Ast_FunctionStmt_Node_174_;
interface Ast_FunctionStmt_Node_175_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_AmbiguousIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_23;
      }
type Ast_FunctionStmt_Node_175 = Ast_FunctionStmt_Node_175_;
type Ast_Block_group_def_9_Node  = [Ast_EndOfStatement_Node,Ast_BlockStmt_Node];
interface Ast_Block_Node_ extends BaseSymbolNode {
        symbol:"block";
        
        children:[Ast_BlockStmt_Node,...ZeroOrMore<Ast_Block_group_def_9_Node>,Ast_EndOfStatement_Node];
        parent:Ast_SubStmt_Node_32 | Ast_SubStmt_Node_34 | Ast_SubStmt_Node_36 | Ast_SubStmt_Node_38 | Ast_SubStmt_Node_40 | Ast_SubStmt_Node_42 | Ast_SubStmt_Node_44 | Ast_SubStmt_Node_46 | Ast_PropertyGetStmt_Node_48 | Ast_PropertyGetStmt_Node_50 | Ast_PropertyGetStmt_Node_52 | Ast_PropertyGetStmt_Node_54 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_70 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_78 | Ast_PropertySetStmt_Node_80 | Ast_PropertySetStmt_Node_82 | Ast_PropertySetStmt_Node_84 | Ast_PropertySetStmt_Node_86 | Ast_PropertySetStmt_Node_88 | Ast_PropertySetStmt_Node_90 | Ast_PropertySetStmt_Node_92 | Ast_PropertySetStmt_Node_94 | Ast_PropertyLetStmt_Node_96 | Ast_PropertyLetStmt_Node_98 | Ast_PropertyLetStmt_Node_100 | Ast_PropertyLetStmt_Node_102 | Ast_PropertyLetStmt_Node_104 | Ast_PropertyLetStmt_Node_106 | Ast_PropertyLetStmt_Node_108 | Ast_PropertyLetStmt_Node_110 | Ast_FunctionStmt_Node_112 | Ast_FunctionStmt_Node_114 | Ast_FunctionStmt_Node_116 | Ast_FunctionStmt_Node_118 | Ast_FunctionStmt_Node_120 | Ast_FunctionStmt_Node_122 | Ast_FunctionStmt_Node_124 | Ast_FunctionStmt_Node_126 | Ast_FunctionStmt_Node_128 | Ast_FunctionStmt_Node_130 | Ast_FunctionStmt_Node_132 | Ast_FunctionStmt_Node_134 | Ast_FunctionStmt_Node_136 | Ast_FunctionStmt_Node_138 | Ast_FunctionStmt_Node_140 | Ast_FunctionStmt_Node_142 | Ast_FunctionStmt_Node_144 | Ast_FunctionStmt_Node_146 | Ast_FunctionStmt_Node_148 | Ast_FunctionStmt_Node_150 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_158 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_166 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_174;
      }
type Ast_Block_Node = Ast_Block_Node_;
interface Ast_BlockStmt_Node_178_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_EraseStmt_Node];
        parent:Ast_Block_group_def_9_Parent_Node | Ast_Block_Node;
      }
type Ast_BlockStmt_Node_178 = Ast_BlockStmt_Node_178_;
interface Ast_BlockStmt_Node_179_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_ExitStmt_Node];
        parent:Ast_Block_group_def_9_Parent_Node | Ast_Block_Node;
      }
type Ast_BlockStmt_Node_179 = Ast_BlockStmt_Node_179_;
interface Ast_BlockStmt_Node_180_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_ExplicitCallStmt_Node];
        parent:Ast_Block_group_def_9_Parent_Node | Ast_Block_Node;
      }
type Ast_BlockStmt_Node_180 = Ast_BlockStmt_Node_180_;
interface Ast_BlockStmt_Node_181_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_SetStmt_Node];
        parent:Ast_Block_group_def_9_Parent_Node | Ast_Block_Node;
      }
type Ast_BlockStmt_Node_181 = Ast_BlockStmt_Node_181_;
interface Ast_BlockStmt_Node_182_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_RedimStmt_Node];
        parent:Ast_Block_group_def_9_Parent_Node | Ast_Block_Node;
      }
type Ast_BlockStmt_Node_182 = Ast_BlockStmt_Node_182_;
interface Ast_BlockStmt_Node_183_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_LetStmt_Node];
        parent:Ast_Block_group_def_9_Parent_Node | Ast_Block_Node;
      }
type Ast_BlockStmt_Node_183 = Ast_BlockStmt_Node_183_;
interface Ast_BlockStmt_Node_184_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_VariableStmt_Node];
        parent:Ast_Block_group_def_9_Parent_Node | Ast_Block_Node;
      }
type Ast_BlockStmt_Node_184 = Ast_BlockStmt_Node_184_;
interface Ast_BlockStmt_Node_185_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_ImplicitCallStmt_InBlock_Node];
        parent:Ast_Block_group_def_9_Parent_Node | Ast_Block_Node;
      }
type Ast_BlockStmt_Node_185 = Ast_BlockStmt_Node_185_;
interface Ast_TOKEN_0_Node_ extends BaseTokenNode {
            token:",";
            parent:Ast_EraseStmt_group_def_11_Parent_Node | Ast_RedimStmt_group_def_13_Parent_Node | Ast_ArgsCall_group_def_27_Parent_Node_238 | Ast_ArgsCall_group_def_27_Parent_Node_239 | Ast_ArgsCall_Node | Ast_VariableListStmt_group_def_37_Parent_Node | Ast_Subscripts_group_def_44_Parent_Node | Ast_ArgList_group_def_48_Parent_Node;
          }
export type Ast_TOKEN_0_Node = Ast_TOKEN_0_Node_;
type Ast_EraseStmt_group_def_11_Node  = [Ast_TOKEN_0_Node,Ast_ValueStmt_Node];
interface Ast_ERASE_Node_ extends BaseTokenNode {
            token:"ERASE";
            parent:Ast_EraseStmt_Node;
          }
export type Ast_ERASE_Node = Ast_ERASE_Node_;
interface Ast_EraseStmt_Node_ extends BaseSymbolNode {
        symbol:"eraseStmt";
        
        children:[Ast_ERASE_Node,Ast_ValueStmt_Node,...ZeroOrMore<Ast_EraseStmt_group_def_11_Node>];
        parent:Ast_BlockStmt_Node_178;
      }
type Ast_EraseStmt_Node = Ast_EraseStmt_Node_;
type Ast_RedimStmt_group_def_13_Node  = [Ast_TOKEN_0_Node,Ast_RedimSubStmt_Node];
interface Ast_REDIM_Node_ extends BaseTokenNode {
            token:"REDIM";
            parent:Ast_RedimStmt_Node_189 | Ast_RedimStmt_Node_190;
          }
export type Ast_REDIM_Node = Ast_REDIM_Node_;
interface Ast_PRESERVE_Node_ extends BaseTokenNode {
            token:"PRESERVE";
            parent:Ast_RedimStmt_Node_189;
          }
export type Ast_PRESERVE_Node = Ast_PRESERVE_Node_;
interface Ast_RedimStmt_Node_189_ extends BaseSymbolNode {
        symbol:"redimStmt";
        
        children:[Ast_REDIM_Node,Ast_PRESERVE_Node,Ast_RedimSubStmt_Node,...ZeroOrMore<Ast_RedimStmt_group_def_13_Node>];
        parent:Ast_BlockStmt_Node_182;
      }
type Ast_RedimStmt_Node_189 = Ast_RedimStmt_Node_189_;
interface Ast_RedimStmt_Node_190_ extends BaseSymbolNode {
        symbol:"redimStmt";
        
        children:[Ast_REDIM_Node,Ast_RedimSubStmt_Node,...ZeroOrMore<Ast_RedimStmt_group_def_13_Node>];
        parent:Ast_BlockStmt_Node_182;
      }
type Ast_RedimStmt_Node_190 = Ast_RedimStmt_Node_190_;
interface Ast_RedimSubStmt_Node_191_ extends BaseSymbolNode {
        symbol:"redimSubStmt";
        
        children:[Ast_ImplicitCallStmt_InStmt_Node,Ast_LPAREN_Node,Ast_Subscripts_Node,Ast_RPAREN_Node,Ast_AsTypeClause_Node];
        parent:Ast_RedimStmt_group_def_13_Parent_Node | Ast_RedimStmt_Node_189 | Ast_RedimStmt_Node_190;
      }
type Ast_RedimSubStmt_Node_191 = Ast_RedimSubStmt_Node_191_;
interface Ast_RedimSubStmt_Node_192_ extends BaseSymbolNode {
        symbol:"redimSubStmt";
        
        children:[Ast_ImplicitCallStmt_InStmt_Node,Ast_LPAREN_Node,Ast_Subscripts_Node,Ast_RPAREN_Node];
        parent:Ast_RedimStmt_group_def_13_Parent_Node | Ast_RedimStmt_Node_189 | Ast_RedimStmt_Node_190;
      }
type Ast_RedimSubStmt_Node_192 = Ast_RedimSubStmt_Node_192_;
interface Ast_EXIT_DO_Node_ extends BaseTokenNode {
            token:"EXIT_DO";
            parent:Ast_ExitStmt_Node_193;
          }
export type Ast_EXIT_DO_Node = Ast_EXIT_DO_Node_;
interface Ast_ExitStmt_Node_193_ extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[Ast_EXIT_DO_Node];
        parent:Ast_BlockStmt_Node_179;
      }
type Ast_ExitStmt_Node_193 = Ast_ExitStmt_Node_193_;
interface Ast_EXIT_FOR_Node_ extends BaseTokenNode {
            token:"EXIT_FOR";
            parent:Ast_ExitStmt_Node_194;
          }
export type Ast_EXIT_FOR_Node = Ast_EXIT_FOR_Node_;
interface Ast_ExitStmt_Node_194_ extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[Ast_EXIT_FOR_Node];
        parent:Ast_BlockStmt_Node_179;
      }
type Ast_ExitStmt_Node_194 = Ast_ExitStmt_Node_194_;
interface Ast_EXIT_FUNCTION_Node_ extends BaseTokenNode {
            token:"EXIT_FUNCTION";
            parent:Ast_ExitStmt_Node_195;
          }
export type Ast_EXIT_FUNCTION_Node = Ast_EXIT_FUNCTION_Node_;
interface Ast_ExitStmt_Node_195_ extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[Ast_EXIT_FUNCTION_Node];
        parent:Ast_BlockStmt_Node_179;
      }
type Ast_ExitStmt_Node_195 = Ast_ExitStmt_Node_195_;
interface Ast_EXIT_PROPERTY_Node_ extends BaseTokenNode {
            token:"EXIT_PROPERTY";
            parent:Ast_ExitStmt_Node_196;
          }
export type Ast_EXIT_PROPERTY_Node = Ast_EXIT_PROPERTY_Node_;
interface Ast_ExitStmt_Node_196_ extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[Ast_EXIT_PROPERTY_Node];
        parent:Ast_BlockStmt_Node_179;
      }
type Ast_ExitStmt_Node_196 = Ast_ExitStmt_Node_196_;
interface Ast_EXIT_SUB_Node_ extends BaseTokenNode {
            token:"EXIT_SUB";
            parent:Ast_ExitStmt_Node_197;
          }
export type Ast_EXIT_SUB_Node = Ast_EXIT_SUB_Node_;
interface Ast_ExitStmt_Node_197_ extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[Ast_EXIT_SUB_Node];
        parent:Ast_BlockStmt_Node_179;
      }
type Ast_ExitStmt_Node_197 = Ast_ExitStmt_Node_197_;
interface Ast_END_Node_ extends BaseTokenNode {
            token:"END";
            parent:Ast_ExitStmt_Node_198;
          }
export type Ast_END_Node = Ast_END_Node_;
interface Ast_ExitStmt_Node_198_ extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[Ast_END_Node];
        parent:Ast_BlockStmt_Node_179;
      }
type Ast_ExitStmt_Node_198 = Ast_ExitStmt_Node_198_;
interface Ast_EQ_Node_ extends BaseTokenNode {
            token:"EQ";
            parent:Ast_LetStmt_group_def_15_Parent_Node | Ast_SetStmt_Node | Ast_ArgDefaultValue_Node;
          }
export type Ast_EQ_Node = Ast_EQ_Node_;
type Ast_LetStmt_group_def_15_Node  = [Ast_EQ_Node];
type Ast_LetStmt_group_14_Node_200  = [...Ast_LetStmt_group_def_15_Node];
interface Ast_PLUS_EQ_Node_ extends BaseTokenNode {
            token:"PLUS_EQ";
            parent:Ast_LetStmt_group_def_16_Parent_Node;
          }
export type Ast_PLUS_EQ_Node = Ast_PLUS_EQ_Node_;
type Ast_LetStmt_group_def_16_Node  = [Ast_PLUS_EQ_Node];
type Ast_LetStmt_group_14_Node_202  = [...Ast_LetStmt_group_def_16_Node];
interface Ast_MINUS_EQ_Node_ extends BaseTokenNode {
            token:"MINUS_EQ";
            parent:Ast_LetStmt_group_def_17_Parent_Node;
          }
export type Ast_MINUS_EQ_Node = Ast_MINUS_EQ_Node_;
type Ast_LetStmt_group_def_17_Node  = [Ast_MINUS_EQ_Node];
type Ast_LetStmt_group_14_Node_204  = [...Ast_LetStmt_group_def_17_Node];
interface Ast_LET_Node_ extends BaseTokenNode {
            token:"LET";
            parent:Ast_LetStmt_Node_205;
          }
export type Ast_LET_Node = Ast_LET_Node_;
interface Ast_LetStmt_Node_205_ extends BaseSymbolNode {
        symbol:"letStmt";
        
        children:[Ast_LET_Node,Ast_ImplicitCallStmt_InStmt_Node,...Ast_LetStmt_group_14_Node,Ast_ValueStmt_Node];
        parent:Ast_BlockStmt_Node_183;
      }
type Ast_LetStmt_Node_205 = Ast_LetStmt_Node_205_;
interface Ast_LetStmt_Node_206_ extends BaseSymbolNode {
        symbol:"letStmt";
        
        children:[Ast_ImplicitCallStmt_InStmt_Node,...Ast_LetStmt_group_14_Node,Ast_ValueStmt_Node];
        parent:Ast_BlockStmt_Node_183;
      }
type Ast_LetStmt_Node_206 = Ast_LetStmt_Node_206_;
interface Ast_SET_Node_ extends BaseTokenNode {
            token:"SET";
            parent:Ast_SetStmt_Node;
          }
export type Ast_SET_Node = Ast_SET_Node_;
interface Ast_SetStmt_Node_ extends BaseSymbolNode {
        symbol:"setStmt";
        
        children:[Ast_SET_Node,Ast_ImplicitCallStmt_InStmt_Node,Ast_EQ_Node,Ast_ValueStmt_Node];
        parent:Ast_BlockStmt_Node_181;
      }
type Ast_SetStmt_Node = Ast_SetStmt_Node_;
interface Ast_ExplicitCallStmt_Node_208_ extends BaseSymbolNode {
        symbol:"explicitCallStmt";
        
        children:[Ast_ECS_MemberProcedureCall_Node];
        parent:Ast_BlockStmt_Node_180;
      }
type Ast_ExplicitCallStmt_Node_208 = Ast_ExplicitCallStmt_Node_208_;
interface Ast_ExplicitCallStmt_Node_209_ extends BaseSymbolNode {
        symbol:"explicitCallStmt";
        
        children:[Ast_ECS_ProcedureCall_Node];
        parent:Ast_BlockStmt_Node_180;
      }
type Ast_ExplicitCallStmt_Node_209 = Ast_ExplicitCallStmt_Node_209_;
type Ast_ECS_MemberProcedureCall_group_def_19_Node  = [Ast_LPAREN_Node,Ast_ArgsCall_Node,Ast_RPAREN_Node];
type Ast_ECS_MemberProcedureCall_group_def_21_Node  = [Ast_LPAREN_Node,Ast_Indexes_Node,Ast_RPAREN_Node];
interface Ast_CALL_Node_ extends BaseTokenNode {
            token:"CALL";
            parent:Ast_ECS_MemberProcedureCall_Node_212 | Ast_ECS_MemberProcedureCall_Node_213 | Ast_ECS_MemberProcedureCall_Node_214 | Ast_ECS_MemberProcedureCall_Node_215 | Ast_ECS_MemberProcedureCall_Node_216 | Ast_ECS_MemberProcedureCall_Node_217 | Ast_ECS_MemberProcedureCall_Node_218 | Ast_ECS_MemberProcedureCall_Node_219 | Ast_ECS_ProcedureCall_Node_220 | Ast_ECS_ProcedureCall_Node_221 | Ast_ECS_ProcedureCall_Node_222 | Ast_ECS_ProcedureCall_Node_223;
          }
export type Ast_CALL_Node = Ast_CALL_Node_;
interface Ast_TOKEN_1_Node_ extends BaseTokenNode {
            token:".";
            parent:Ast_ECS_MemberProcedureCall_Node_212 | Ast_ECS_MemberProcedureCall_Node_213 | Ast_ECS_MemberProcedureCall_Node_214 | Ast_ECS_MemberProcedureCall_Node_215 | Ast_ECS_MemberProcedureCall_Node_216 | Ast_ECS_MemberProcedureCall_Node_217 | Ast_ECS_MemberProcedureCall_Node_218 | Ast_ECS_MemberProcedureCall_Node_219 | Ast_ICS_B_MemberProcedureCall_Node_226 | Ast_ICS_B_MemberProcedureCall_Node_227 | Ast_ICS_B_MemberProcedureCall_Node_228 | Ast_ICS_B_MemberProcedureCall_Node_229 | Ast_ICS_B_MemberProcedureCall_Node_230 | Ast_ICS_B_MemberProcedureCall_Node_231 | Ast_ICS_B_MemberProcedureCall_Node_232 | Ast_ICS_B_MemberProcedureCall_Node_233 | Ast_ICS_S_MemberCall_group_def_55_Parent_Node;
          }
export type Ast_TOKEN_1_Node = Ast_TOKEN_1_Node_;
interface Ast_ECS_MemberProcedureCall_Node_212_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[Ast_CALL_Node,Ast_ImplicitCallStmt_InStmt_Node,Ast_TOKEN_1_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_ECS_MemberProcedureCall_group_def_19_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ExplicitCallStmt_Node_208;
      }
type Ast_ECS_MemberProcedureCall_Node_212 = Ast_ECS_MemberProcedureCall_Node_212_;
interface Ast_ECS_MemberProcedureCall_Node_213_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[Ast_CALL_Node,Ast_ImplicitCallStmt_InStmt_Node,Ast_TOKEN_1_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ExplicitCallStmt_Node_208;
      }
type Ast_ECS_MemberProcedureCall_Node_213 = Ast_ECS_MemberProcedureCall_Node_213_;
interface Ast_ECS_MemberProcedureCall_Node_214_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[Ast_CALL_Node,Ast_ImplicitCallStmt_InStmt_Node,Ast_TOKEN_1_Node,Ast_AmbiguousIdentifier_Node,...Ast_ECS_MemberProcedureCall_group_def_19_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ExplicitCallStmt_Node_208;
      }
type Ast_ECS_MemberProcedureCall_Node_214 = Ast_ECS_MemberProcedureCall_Node_214_;
interface Ast_ECS_MemberProcedureCall_Node_215_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[Ast_CALL_Node,Ast_ImplicitCallStmt_InStmt_Node,Ast_TOKEN_1_Node,Ast_AmbiguousIdentifier_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ExplicitCallStmt_Node_208;
      }
type Ast_ECS_MemberProcedureCall_Node_215 = Ast_ECS_MemberProcedureCall_Node_215_;
interface Ast_ECS_MemberProcedureCall_Node_216_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[Ast_CALL_Node,Ast_TOKEN_1_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_ECS_MemberProcedureCall_group_def_19_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ExplicitCallStmt_Node_208;
      }
type Ast_ECS_MemberProcedureCall_Node_216 = Ast_ECS_MemberProcedureCall_Node_216_;
interface Ast_ECS_MemberProcedureCall_Node_217_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[Ast_CALL_Node,Ast_TOKEN_1_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ExplicitCallStmt_Node_208;
      }
type Ast_ECS_MemberProcedureCall_Node_217 = Ast_ECS_MemberProcedureCall_Node_217_;
interface Ast_ECS_MemberProcedureCall_Node_218_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[Ast_CALL_Node,Ast_TOKEN_1_Node,Ast_AmbiguousIdentifier_Node,...Ast_ECS_MemberProcedureCall_group_def_19_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ExplicitCallStmt_Node_208;
      }
type Ast_ECS_MemberProcedureCall_Node_218 = Ast_ECS_MemberProcedureCall_Node_218_;
interface Ast_ECS_MemberProcedureCall_Node_219_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[Ast_CALL_Node,Ast_TOKEN_1_Node,Ast_AmbiguousIdentifier_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ExplicitCallStmt_Node_208;
      }
type Ast_ECS_MemberProcedureCall_Node_219 = Ast_ECS_MemberProcedureCall_Node_219_;
interface Ast_ECS_ProcedureCall_Node_220_ extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[Ast_CALL_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_ECS_MemberProcedureCall_group_def_19_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ExplicitCallStmt_Node_209;
      }
type Ast_ECS_ProcedureCall_Node_220 = Ast_ECS_ProcedureCall_Node_220_;
interface Ast_ECS_ProcedureCall_Node_221_ extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[Ast_CALL_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ExplicitCallStmt_Node_209;
      }
type Ast_ECS_ProcedureCall_Node_221 = Ast_ECS_ProcedureCall_Node_221_;
interface Ast_ECS_ProcedureCall_Node_222_ extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[Ast_CALL_Node,Ast_AmbiguousIdentifier_Node,...Ast_ECS_MemberProcedureCall_group_def_19_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ExplicitCallStmt_Node_209;
      }
type Ast_ECS_ProcedureCall_Node_222 = Ast_ECS_ProcedureCall_Node_222_;
interface Ast_ECS_ProcedureCall_Node_223_ extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[Ast_CALL_Node,Ast_AmbiguousIdentifier_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ExplicitCallStmt_Node_209;
      }
type Ast_ECS_ProcedureCall_Node_223 = Ast_ECS_ProcedureCall_Node_223_;
interface Ast_ImplicitCallStmt_InBlock_Node_224_ extends BaseSymbolNode {
        symbol:"implicitCallStmt_InBlock";
        
        children:[Ast_ICS_B_MemberProcedureCall_Node];
        parent:Ast_BlockStmt_Node_185;
      }
type Ast_ImplicitCallStmt_InBlock_Node_224 = Ast_ImplicitCallStmt_InBlock_Node_224_;
interface Ast_ImplicitCallStmt_InBlock_Node_225_ extends BaseSymbolNode {
        symbol:"implicitCallStmt_InBlock";
        
        children:[Ast_ICS_B_ProcedureCall_Node];
        parent:Ast_BlockStmt_Node_185;
      }
type Ast_ImplicitCallStmt_InBlock_Node_225 = Ast_ImplicitCallStmt_InBlock_Node_225_;
interface Ast_ICS_B_MemberProcedureCall_Node_226_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[Ast_ImplicitCallStmt_InStmt_Node,Ast_TOKEN_1_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgsCall_Node,Ast_DictionaryCallStmt_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ImplicitCallStmt_InBlock_Node_224;
      }
type Ast_ICS_B_MemberProcedureCall_Node_226 = Ast_ICS_B_MemberProcedureCall_Node_226_;
interface Ast_ICS_B_MemberProcedureCall_Node_227_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[Ast_ImplicitCallStmt_InStmt_Node,Ast_TOKEN_1_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgsCall_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ImplicitCallStmt_InBlock_Node_224;
      }
type Ast_ICS_B_MemberProcedureCall_Node_227 = Ast_ICS_B_MemberProcedureCall_Node_227_;
interface Ast_ICS_B_MemberProcedureCall_Node_228_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[Ast_ImplicitCallStmt_InStmt_Node,Ast_TOKEN_1_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_DictionaryCallStmt_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ImplicitCallStmt_InBlock_Node_224;
      }
type Ast_ICS_B_MemberProcedureCall_Node_228 = Ast_ICS_B_MemberProcedureCall_Node_228_;
interface Ast_ICS_B_MemberProcedureCall_Node_229_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[Ast_ImplicitCallStmt_InStmt_Node,Ast_TOKEN_1_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ImplicitCallStmt_InBlock_Node_224;
      }
type Ast_ICS_B_MemberProcedureCall_Node_229 = Ast_ICS_B_MemberProcedureCall_Node_229_;
interface Ast_ICS_B_MemberProcedureCall_Node_230_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[Ast_ImplicitCallStmt_InStmt_Node,Ast_TOKEN_1_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgsCall_Node,Ast_DictionaryCallStmt_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ImplicitCallStmt_InBlock_Node_224;
      }
type Ast_ICS_B_MemberProcedureCall_Node_230 = Ast_ICS_B_MemberProcedureCall_Node_230_;
interface Ast_ICS_B_MemberProcedureCall_Node_231_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[Ast_ImplicitCallStmt_InStmt_Node,Ast_TOKEN_1_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgsCall_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ImplicitCallStmt_InBlock_Node_224;
      }
type Ast_ICS_B_MemberProcedureCall_Node_231 = Ast_ICS_B_MemberProcedureCall_Node_231_;
interface Ast_ICS_B_MemberProcedureCall_Node_232_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[Ast_ImplicitCallStmt_InStmt_Node,Ast_TOKEN_1_Node,Ast_AmbiguousIdentifier_Node,Ast_DictionaryCallStmt_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ImplicitCallStmt_InBlock_Node_224;
      }
type Ast_ICS_B_MemberProcedureCall_Node_232 = Ast_ICS_B_MemberProcedureCall_Node_232_;
interface Ast_ICS_B_MemberProcedureCall_Node_233_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[Ast_ImplicitCallStmt_InStmt_Node,Ast_TOKEN_1_Node,Ast_AmbiguousIdentifier_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ImplicitCallStmt_InBlock_Node_224;
      }
type Ast_ICS_B_MemberProcedureCall_Node_233 = Ast_ICS_B_MemberProcedureCall_Node_233_;
interface Ast_ICS_B_ProcedureCall_Node_234_ extends BaseSymbolNode {
        symbol:"iCS_B_ProcedureCall";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_ArgsCall_Node,...Ast_ECS_MemberProcedureCall_group_def_21_Node];
        parent:Ast_ImplicitCallStmt_InBlock_Node_225;
      }
type Ast_ICS_B_ProcedureCall_Node_234 = Ast_ICS_B_ProcedureCall_Node_234_;
interface Ast_ICS_B_ProcedureCall_Node_235_ extends BaseSymbolNode {
        symbol:"iCS_B_ProcedureCall";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_ArgsCall_Node];
        parent:Ast_ImplicitCallStmt_InBlock_Node_225;
      }
type Ast_ICS_B_ProcedureCall_Node_235 = Ast_ICS_B_ProcedureCall_Node_235_;
interface Ast_ICS_B_ProcedureCall_Node_236_ extends BaseSymbolNode {
        symbol:"iCS_B_ProcedureCall";
        
        children:[Ast_AmbiguousIdentifier_Node,...Ast_ECS_MemberProcedureCall_group_def_21_Node];
        parent:Ast_ImplicitCallStmt_InBlock_Node_225;
      }
type Ast_ICS_B_ProcedureCall_Node_236 = Ast_ICS_B_ProcedureCall_Node_236_;
interface Ast_ICS_B_ProcedureCall_Node_237_ extends BaseSymbolNode {
        symbol:"iCS_B_ProcedureCall";
        
        children:[Ast_AmbiguousIdentifier_Node];
        parent:Ast_ImplicitCallStmt_InBlock_Node_225;
      }
type Ast_ICS_B_ProcedureCall_Node_237 = Ast_ICS_B_ProcedureCall_Node_237_;
type Ast_ArgsCall_group_def_27_Node_238  = [Ast_TOKEN_0_Node,Ast_ArgCall_Node];
type Ast_ArgsCall_group_def_27_Node_239  = [Ast_TOKEN_0_Node];
interface Ast_ArgsCall_Node_ extends BaseSymbolNode {
        symbol:"argsCall";
        
        children:[...ZeroOrMore<Ast_TOKEN_0_Node>,Ast_ArgCall_Node,...ZeroOrMore<Ast_ArgsCall_group_def_27_Node>];
        parent:Ast_ECS_MemberProcedureCall_group_def_19_Parent_Node | Ast_ICS_B_MemberProcedureCall_Node_226 | Ast_ICS_B_MemberProcedureCall_Node_227 | Ast_ICS_B_MemberProcedureCall_Node_230 | Ast_ICS_B_MemberProcedureCall_Node_231 | Ast_ICS_B_ProcedureCall_Node_234 | Ast_ICS_B_ProcedureCall_Node_235 | Ast_ICS_S_ProcedureOrArrayCall_Node_308 | Ast_ICS_S_ProcedureOrArrayCall_Node_309 | Ast_ICS_S_ProcedureOrArrayCall_Node_312 | Ast_ICS_S_ProcedureOrArrayCall_Node_313;
      }
type Ast_ArgsCall_Node = Ast_ArgsCall_Node_;
interface Ast_BYREF_Node_ extends BaseTokenNode {
            token:"BYREF";
            parent:Ast_ArgCall_group_def_29_Parent_Node;
          }
export type Ast_BYREF_Node = Ast_BYREF_Node_;
type Ast_ArgCall_group_def_29_Node  = [Ast_BYREF_Node];
type Ast_ArgCall_group_28_Node_242  = [...Ast_ArgCall_group_def_29_Node];
interface Ast_BYVAL_Node_ extends BaseTokenNode {
            token:"BYVAL";
            parent:Ast_ArgCall_group_def_30_Parent_Node;
          }
export type Ast_BYVAL_Node = Ast_BYVAL_Node_;
type Ast_ArgCall_group_def_30_Node  = [Ast_BYVAL_Node];
type Ast_ArgCall_group_28_Node_244  = [...Ast_ArgCall_group_def_30_Node];
interface Ast_PARAMARRAY_Node_ extends BaseTokenNode {
            token:"PARAMARRAY";
            parent:Ast_ArgCall_group_def_31_Parent_Node | Ast_Arg_Node_337 | Ast_Arg_Node_338 | Ast_Arg_Node_339 | Ast_Arg_Node_340 | Ast_Arg_Node_341 | Ast_Arg_Node_342 | Ast_Arg_Node_343 | Ast_Arg_Node_344 | Ast_Arg_Node_345 | Ast_Arg_Node_346 | Ast_Arg_Node_347 | Ast_Arg_Node_348 | Ast_Arg_Node_349 | Ast_Arg_Node_350 | Ast_Arg_Node_351 | Ast_Arg_Node_352 | Ast_Arg_Node_369 | Ast_Arg_Node_370 | Ast_Arg_Node_371 | Ast_Arg_Node_372 | Ast_Arg_Node_373 | Ast_Arg_Node_374 | Ast_Arg_Node_375 | Ast_Arg_Node_376 | Ast_Arg_Node_377 | Ast_Arg_Node_378 | Ast_Arg_Node_379 | Ast_Arg_Node_380 | Ast_Arg_Node_381 | Ast_Arg_Node_382 | Ast_Arg_Node_383 | Ast_Arg_Node_384 | Ast_Arg_Node_401 | Ast_Arg_Node_402 | Ast_Arg_Node_403 | Ast_Arg_Node_404 | Ast_Arg_Node_405 | Ast_Arg_Node_406 | Ast_Arg_Node_407 | Ast_Arg_Node_408 | Ast_Arg_Node_409 | Ast_Arg_Node_410 | Ast_Arg_Node_411 | Ast_Arg_Node_412 | Ast_Arg_Node_413 | Ast_Arg_Node_414 | Ast_Arg_Node_415 | Ast_Arg_Node_416 | Ast_Arg_Node_433 | Ast_Arg_Node_434 | Ast_Arg_Node_435 | Ast_Arg_Node_436 | Ast_Arg_Node_437 | Ast_Arg_Node_438 | Ast_Arg_Node_439 | Ast_Arg_Node_440 | Ast_Arg_Node_441 | Ast_Arg_Node_442 | Ast_Arg_Node_443 | Ast_Arg_Node_444 | Ast_Arg_Node_445 | Ast_Arg_Node_446 | Ast_Arg_Node_447 | Ast_Arg_Node_448;
          }
export type Ast_PARAMARRAY_Node = Ast_PARAMARRAY_Node_;
type Ast_ArgCall_group_def_31_Node  = [Ast_PARAMARRAY_Node];
type Ast_ArgCall_group_28_Node_246  = [...Ast_ArgCall_group_def_31_Node];
interface Ast_ArgCall_Node_247_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[Ast_LPAREN_Node,...Ast_ArgCall_group_28_Node,Ast_RPAREN_Node,Ast_ValueStmt_Node];
        parent:Ast_ArgsCall_group_def_27_Parent_Node_238 | Ast_ArgsCall_Node;
      }
type Ast_ArgCall_Node_247 = Ast_ArgCall_Node_247_;
interface Ast_ArgCall_Node_248_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[Ast_LPAREN_Node,...Ast_ArgCall_group_28_Node,Ast_ValueStmt_Node];
        parent:Ast_ArgsCall_group_def_27_Parent_Node_238 | Ast_ArgsCall_Node;
      }
type Ast_ArgCall_Node_248 = Ast_ArgCall_Node_248_;
interface Ast_ArgCall_Node_249_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_ValueStmt_Node];
        parent:Ast_ArgsCall_group_def_27_Parent_Node_238 | Ast_ArgsCall_Node;
      }
type Ast_ArgCall_Node_249 = Ast_ArgCall_Node_249_;
interface Ast_ArgCall_Node_250_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[Ast_LPAREN_Node,Ast_ValueStmt_Node];
        parent:Ast_ArgsCall_group_def_27_Parent_Node_238 | Ast_ArgsCall_Node;
      }
type Ast_ArgCall_Node_250 = Ast_ArgCall_Node_250_;
interface Ast_ArgCall_Node_251_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[...Ast_ArgCall_group_28_Node,Ast_RPAREN_Node,Ast_ValueStmt_Node];
        parent:Ast_ArgsCall_group_def_27_Parent_Node_238 | Ast_ArgsCall_Node;
      }
type Ast_ArgCall_Node_251 = Ast_ArgCall_Node_251_;
interface Ast_ArgCall_Node_252_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[...Ast_ArgCall_group_28_Node,Ast_ValueStmt_Node];
        parent:Ast_ArgsCall_group_def_27_Parent_Node_238 | Ast_ArgsCall_Node;
      }
type Ast_ArgCall_Node_252 = Ast_ArgCall_Node_252_;
interface Ast_ArgCall_Node_253_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[Ast_RPAREN_Node,Ast_ValueStmt_Node];
        parent:Ast_ArgsCall_group_def_27_Parent_Node_238 | Ast_ArgsCall_Node;
      }
type Ast_ArgCall_Node_253 = Ast_ArgCall_Node_253_;
interface Ast_ArgCall_Node_254_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[Ast_ValueStmt_Node];
        parent:Ast_ArgsCall_group_def_27_Parent_Node_238 | Ast_ArgsCall_Node;
      }
type Ast_ArgCall_Node_254 = Ast_ArgCall_Node_254_;
interface Ast_DIM_Node_ extends BaseTokenNode {
            token:"DIM";
            parent:Ast_VariableStmt_group_def_33_Parent_Node;
          }
export type Ast_DIM_Node = Ast_DIM_Node_;
type Ast_VariableStmt_group_def_33_Node  = [Ast_DIM_Node];
type Ast_VariableStmt_group_32_Node_256  = [...Ast_VariableStmt_group_def_33_Node];
type Ast_VariableStmt_group_def_34_Node  = [Ast_STATIC_Node];
type Ast_VariableStmt_group_32_Node_258  = [...Ast_VariableStmt_group_def_34_Node];
type Ast_VariableStmt_group_def_35_Node  = [Ast_Visibility_Node];
type Ast_VariableStmt_group_32_Node_260  = [...Ast_VariableStmt_group_def_35_Node];
interface Ast_WITHEVENTS_Node_ extends BaseTokenNode {
            token:"WITHEVENTS";
            parent:Ast_VariableStmt_Node_261;
          }
export type Ast_WITHEVENTS_Node = Ast_WITHEVENTS_Node_;
interface Ast_VariableStmt_Node_261_ extends BaseSymbolNode {
        symbol:"variableStmt";
        
        children:[...Ast_VariableStmt_group_32_Node,Ast_WITHEVENTS_Node,Ast_VariableListStmt_Node];
        parent:Ast_ModuleDeclarationsElement_Node_15 | Ast_BlockStmt_Node_184;
      }
type Ast_VariableStmt_Node_261 = Ast_VariableStmt_Node_261_;
interface Ast_VariableStmt_Node_262_ extends BaseSymbolNode {
        symbol:"variableStmt";
        
        children:[...Ast_VariableStmt_group_32_Node,Ast_VariableListStmt_Node];
        parent:Ast_ModuleDeclarationsElement_Node_15 | Ast_BlockStmt_Node_184;
      }
type Ast_VariableStmt_Node_262 = Ast_VariableStmt_Node_262_;
type Ast_VariableListStmt_group_def_37_Node  = [Ast_TOKEN_0_Node,Ast_VariableSubStmt_Node];
interface Ast_VariableListStmt_Node_ extends BaseSymbolNode {
        symbol:"variableListStmt";
        
        children:[Ast_VariableSubStmt_Node,...ZeroOrMore<Ast_VariableListStmt_group_def_37_Node>];
        parent:Ast_VariableStmt_Node_261 | Ast_VariableStmt_Node_262;
      }
type Ast_VariableListStmt_Node = Ast_VariableListStmt_Node_;
type Ast_VariableSubStmt_group_def_39_Node_265  = [Ast_LPAREN_Node,Ast_Subscripts_Node,Ast_RPAREN_Node];
type Ast_VariableSubStmt_group_def_39_Node_266  = [Ast_LPAREN_Node,Ast_RPAREN_Node];
interface Ast_VariableSubStmt_Node_267_ extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[Ast_AmbiguousIdentifier_Node,...Ast_VariableSubStmt_group_def_39_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node];
        parent:Ast_VariableListStmt_group_def_37_Parent_Node | Ast_VariableListStmt_Node;
      }
type Ast_VariableSubStmt_Node_267 = Ast_VariableSubStmt_Node_267_;
interface Ast_VariableSubStmt_Node_268_ extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[Ast_AmbiguousIdentifier_Node,...Ast_VariableSubStmt_group_def_39_Node,Ast_TypeHint_Node];
        parent:Ast_VariableListStmt_group_def_37_Parent_Node | Ast_VariableListStmt_Node;
      }
type Ast_VariableSubStmt_Node_268 = Ast_VariableSubStmt_Node_268_;
interface Ast_VariableSubStmt_Node_269_ extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[Ast_AmbiguousIdentifier_Node,...Ast_VariableSubStmt_group_def_39_Node,Ast_AsTypeClause_Node];
        parent:Ast_VariableListStmt_group_def_37_Parent_Node | Ast_VariableListStmt_Node;
      }
type Ast_VariableSubStmt_Node_269 = Ast_VariableSubStmt_Node_269_;
interface Ast_VariableSubStmt_Node_270_ extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[Ast_AmbiguousIdentifier_Node,...Ast_VariableSubStmt_group_def_39_Node];
        parent:Ast_VariableListStmt_group_def_37_Parent_Node | Ast_VariableListStmt_Node;
      }
type Ast_VariableSubStmt_Node_270 = Ast_VariableSubStmt_Node_270_;
interface Ast_VariableSubStmt_Node_271_ extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node];
        parent:Ast_VariableListStmt_group_def_37_Parent_Node | Ast_VariableListStmt_Node;
      }
type Ast_VariableSubStmt_Node_271 = Ast_VariableSubStmt_Node_271_;
interface Ast_VariableSubStmt_Node_272_ extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node];
        parent:Ast_VariableListStmt_group_def_37_Parent_Node | Ast_VariableListStmt_Node;
      }
type Ast_VariableSubStmt_Node_272 = Ast_VariableSubStmt_Node_272_;
interface Ast_VariableSubStmt_Node_273_ extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node];
        parent:Ast_VariableListStmt_group_def_37_Parent_Node | Ast_VariableListStmt_Node;
      }
type Ast_VariableSubStmt_Node_273 = Ast_VariableSubStmt_Node_273_;
interface Ast_VariableSubStmt_Node_274_ extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[Ast_AmbiguousIdentifier_Node];
        parent:Ast_VariableListStmt_group_def_37_Parent_Node | Ast_VariableListStmt_Node;
      }
type Ast_VariableSubStmt_Node_274 = Ast_VariableSubStmt_Node_274_;
interface Ast_Indexes_Node_ extends BaseSymbolNode {
        symbol:"indexes";
        
        children:[Ast_ValueStmt_Node,...ZeroOrMore<Ast_EraseStmt_group_def_11_Node>];
        parent:Ast_ECS_MemberProcedureCall_group_def_21_Parent_Node;
      }
type Ast_Indexes_Node = Ast_Indexes_Node_;
interface Ast_TO_Node_ extends BaseTokenNode {
            token:"TO";
            parent:Ast_Subscript__group_def_42_Parent_Node;
          }
export type Ast_TO_Node = Ast_TO_Node_;
type Ast_Subscript__group_def_42_Node  = [Ast_ValueStmt_Node,Ast_TO_Node];
interface Ast_Subscript__Node_277_ extends BaseSymbolNode {
        symbol:"subscript_";
        
        children:[...Ast_Subscript__group_def_42_Node,Ast_ValueStmt_Node];
        parent:Ast_Subscripts_group_def_44_Parent_Node | Ast_Subscripts_Node;
      }
type Ast_Subscript__Node_277 = Ast_Subscript__Node_277_;
interface Ast_Subscript__Node_278_ extends BaseSymbolNode {
        symbol:"subscript_";
        
        children:[Ast_ValueStmt_Node];
        parent:Ast_Subscripts_group_def_44_Parent_Node | Ast_Subscripts_Node;
      }
type Ast_Subscript__Node_278 = Ast_Subscript__Node_278_;
type Ast_Subscripts_group_def_44_Node  = [Ast_TOKEN_0_Node,Ast_Subscript__Node];
interface Ast_Subscripts_Node_ extends BaseSymbolNode {
        symbol:"subscripts";
        
        children:[Ast_Subscript__Node,...ZeroOrMore<Ast_Subscripts_group_def_44_Node>];
        parent:Ast_RedimSubStmt_Node_191 | Ast_RedimSubStmt_Node_192 | Ast_VariableSubStmt_group_def_39_Parent_Node_265;
      }
type Ast_Subscripts_Node = Ast_Subscripts_Node_;
interface Ast_Subscript__Node_281_ extends BaseSymbolNode {
        symbol:"subscript_";
        
        children:[...Ast_Subscript__group_def_42_Node,Ast_ValueStmt_Node];
        parent:Ast_Subscripts_group_def_44_Parent_Node | Ast_Subscripts_Node;
      }
type Ast_Subscript__Node_281 = Ast_Subscript__Node_281_;
interface Ast_Subscript__Node_282_ extends BaseSymbolNode {
        symbol:"subscript_";
        
        children:[Ast_ValueStmt_Node];
        parent:Ast_Subscripts_group_def_44_Parent_Node | Ast_Subscripts_Node;
      }
type Ast_Subscript__Node_282 = Ast_Subscript__Node_282_;
type Ast_ArgList_group_def_48_Node  = [Ast_TOKEN_0_Node,Ast_Arg_Node];
type Ast_ArgList_group_def_49_Node  = [Ast_Arg_Node,...ZeroOrMore<Ast_ArgList_group_def_48_Node>];
interface Ast_ArgList_Node_285_ extends BaseSymbolNode {
        symbol:"argList";
        
        children:[Ast_LPAREN_Node,...Ast_ArgList_group_def_49_Node,Ast_RPAREN_Node];
        parent:Ast_SubStmt_Node_32 | Ast_SubStmt_Node_33 | Ast_SubStmt_Node_36 | Ast_SubStmt_Node_37 | Ast_SubStmt_Node_40 | Ast_SubStmt_Node_41 | Ast_SubStmt_Node_44 | Ast_SubStmt_Node_45 | Ast_PropertySetStmt_Node_80 | Ast_PropertySetStmt_Node_81 | Ast_PropertySetStmt_Node_84 | Ast_PropertySetStmt_Node_85 | Ast_PropertySetStmt_Node_88 | Ast_PropertySetStmt_Node_89 | Ast_PropertySetStmt_Node_92 | Ast_PropertySetStmt_Node_93 | Ast_PropertyLetStmt_Node_96 | Ast_PropertyLetStmt_Node_97 | Ast_PropertyLetStmt_Node_100 | Ast_PropertyLetStmt_Node_101 | Ast_PropertyLetStmt_Node_104 | Ast_PropertyLetStmt_Node_105 | Ast_PropertyLetStmt_Node_108 | Ast_PropertyLetStmt_Node_109 | Ast_FunctionStmt_Node_112 | Ast_FunctionStmt_Node_113 | Ast_FunctionStmt_Node_114 | Ast_FunctionStmt_Node_115 | Ast_FunctionStmt_Node_120 | Ast_FunctionStmt_Node_121 | Ast_FunctionStmt_Node_122 | Ast_FunctionStmt_Node_123 | Ast_FunctionStmt_Node_128 | Ast_FunctionStmt_Node_129 | Ast_FunctionStmt_Node_130 | Ast_FunctionStmt_Node_131 | Ast_FunctionStmt_Node_136 | Ast_FunctionStmt_Node_137 | Ast_FunctionStmt_Node_138 | Ast_FunctionStmt_Node_139 | Ast_FunctionStmt_Node_144 | Ast_FunctionStmt_Node_145 | Ast_FunctionStmt_Node_146 | Ast_FunctionStmt_Node_147 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_171;
      }
type Ast_ArgList_Node_285 = Ast_ArgList_Node_285_;
interface Ast_ArgList_Node_286_ extends BaseSymbolNode {
        symbol:"argList";
        
        children:[Ast_LPAREN_Node,Ast_RPAREN_Node];
        parent:Ast_SubStmt_Node_32 | Ast_SubStmt_Node_33 | Ast_SubStmt_Node_36 | Ast_SubStmt_Node_37 | Ast_SubStmt_Node_40 | Ast_SubStmt_Node_41 | Ast_SubStmt_Node_44 | Ast_SubStmt_Node_45 | Ast_PropertySetStmt_Node_80 | Ast_PropertySetStmt_Node_81 | Ast_PropertySetStmt_Node_84 | Ast_PropertySetStmt_Node_85 | Ast_PropertySetStmt_Node_88 | Ast_PropertySetStmt_Node_89 | Ast_PropertySetStmt_Node_92 | Ast_PropertySetStmt_Node_93 | Ast_PropertyLetStmt_Node_96 | Ast_PropertyLetStmt_Node_97 | Ast_PropertyLetStmt_Node_100 | Ast_PropertyLetStmt_Node_101 | Ast_PropertyLetStmt_Node_104 | Ast_PropertyLetStmt_Node_105 | Ast_PropertyLetStmt_Node_108 | Ast_PropertyLetStmt_Node_109 | Ast_FunctionStmt_Node_112 | Ast_FunctionStmt_Node_113 | Ast_FunctionStmt_Node_114 | Ast_FunctionStmt_Node_115 | Ast_FunctionStmt_Node_120 | Ast_FunctionStmt_Node_121 | Ast_FunctionStmt_Node_122 | Ast_FunctionStmt_Node_123 | Ast_FunctionStmt_Node_128 | Ast_FunctionStmt_Node_129 | Ast_FunctionStmt_Node_130 | Ast_FunctionStmt_Node_131 | Ast_FunctionStmt_Node_136 | Ast_FunctionStmt_Node_137 | Ast_FunctionStmt_Node_138 | Ast_FunctionStmt_Node_139 | Ast_FunctionStmt_Node_144 | Ast_FunctionStmt_Node_145 | Ast_FunctionStmt_Node_146 | Ast_FunctionStmt_Node_147 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_171;
      }
type Ast_ArgList_Node_286 = Ast_ArgList_Node_286_;
interface Ast_ValueStmt_Node_287_ extends BaseSymbolNode {
        symbol:"valueStmt";
        
        children:[Ast_Literal_Node];
        parent:Ast_EraseStmt_group_def_11_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_205 | Ast_LetStmt_Node_206 | Ast_SetStmt_Node | Ast_ArgCall_Node_247 | Ast_ArgCall_Node_248 | Ast_ArgCall_Node_249 | Ast_ArgCall_Node_250 | Ast_ArgCall_Node_251 | Ast_ArgCall_Node_252 | Ast_ArgCall_Node_253 | Ast_ArgCall_Node_254 | Ast_Indexes_Node | Ast_Subscript__group_def_42_Parent_Node | Ast_Subscript__Node_277 | Ast_Subscript__Node_278 | Ast_Subscript__Node_281 | Ast_Subscript__Node_282 | Ast_ValueStmt_Node_289 | Ast_ArgDefaultValue_Node | Ast_BaseType_group_def_71_Parent_Node;
      }
type Ast_ValueStmt_Node_287 = Ast_ValueStmt_Node_287_;
interface Ast_ValueStmt_Node_288_ extends BaseSymbolNode {
        symbol:"valueStmt";
        
        children:[Ast_ImplicitCallStmt_InStmt_Node];
        parent:Ast_EraseStmt_group_def_11_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_205 | Ast_LetStmt_Node_206 | Ast_SetStmt_Node | Ast_ArgCall_Node_247 | Ast_ArgCall_Node_248 | Ast_ArgCall_Node_249 | Ast_ArgCall_Node_250 | Ast_ArgCall_Node_251 | Ast_ArgCall_Node_252 | Ast_ArgCall_Node_253 | Ast_ArgCall_Node_254 | Ast_Indexes_Node | Ast_Subscript__group_def_42_Parent_Node | Ast_Subscript__Node_277 | Ast_Subscript__Node_278 | Ast_Subscript__Node_281 | Ast_Subscript__Node_282 | Ast_ValueStmt_Node_289 | Ast_ArgDefaultValue_Node | Ast_BaseType_group_def_71_Parent_Node;
      }
type Ast_ValueStmt_Node_288 = Ast_ValueStmt_Node_288_;
interface Ast_NEW_Node_ extends BaseTokenNode {
            token:"NEW";
            parent:Ast_ValueStmt_Node_289 | Ast_AsTypeClause_Node_466 | Ast_AsTypeClause_Node_467;
          }
export type Ast_NEW_Node = Ast_NEW_Node_;
interface Ast_ValueStmt_Node_289_ extends BaseSymbolNode {
        symbol:"valueStmt";
        
        children:[Ast_NEW_Node,Ast_ValueStmt_Node];
        parent:Ast_EraseStmt_group_def_11_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_205 | Ast_LetStmt_Node_206 | Ast_SetStmt_Node | Ast_ArgCall_Node_247 | Ast_ArgCall_Node_248 | Ast_ArgCall_Node_249 | Ast_ArgCall_Node_250 | Ast_ArgCall_Node_251 | Ast_ArgCall_Node_252 | Ast_ArgCall_Node_253 | Ast_ArgCall_Node_254 | Ast_Indexes_Node | Ast_Subscript__group_def_42_Parent_Node | Ast_Subscript__Node_277 | Ast_Subscript__Node_278 | Ast_Subscript__Node_281 | Ast_Subscript__Node_282 | Ast_ValueStmt_Node_289 | Ast_ArgDefaultValue_Node | Ast_BaseType_group_def_71_Parent_Node;
      }
type Ast_ValueStmt_Node_289 = Ast_ValueStmt_Node_289_;
interface Ast_ImplicitCallStmt_InStmt_Node_290_ extends BaseSymbolNode {
        symbol:"implicitCallStmt_InStmt";
        
        children:[Ast_ICS_S_MembersCall_Node];
        parent:Ast_RedimSubStmt_Node_191 | Ast_RedimSubStmt_Node_192 | Ast_LetStmt_Node_205 | Ast_LetStmt_Node_206 | Ast_SetStmt_Node | Ast_ECS_MemberProcedureCall_Node_212 | Ast_ECS_MemberProcedureCall_Node_213 | Ast_ECS_MemberProcedureCall_Node_214 | Ast_ECS_MemberProcedureCall_Node_215 | Ast_ICS_B_MemberProcedureCall_Node_226 | Ast_ICS_B_MemberProcedureCall_Node_227 | Ast_ICS_B_MemberProcedureCall_Node_228 | Ast_ICS_B_MemberProcedureCall_Node_229 | Ast_ICS_B_MemberProcedureCall_Node_230 | Ast_ICS_B_MemberProcedureCall_Node_231 | Ast_ICS_B_MemberProcedureCall_Node_232 | Ast_ICS_B_MemberProcedureCall_Node_233 | Ast_ValueStmt_Node_288;
      }
type Ast_ImplicitCallStmt_InStmt_Node_290 = Ast_ImplicitCallStmt_InStmt_Node_290_;
interface Ast_ImplicitCallStmt_InStmt_Node_291_ extends BaseSymbolNode {
        symbol:"implicitCallStmt_InStmt";
        
        children:[Ast_ICS_S_VariableOrProcedureCall_Node];
        parent:Ast_RedimSubStmt_Node_191 | Ast_RedimSubStmt_Node_192 | Ast_LetStmt_Node_205 | Ast_LetStmt_Node_206 | Ast_SetStmt_Node | Ast_ECS_MemberProcedureCall_Node_212 | Ast_ECS_MemberProcedureCall_Node_213 | Ast_ECS_MemberProcedureCall_Node_214 | Ast_ECS_MemberProcedureCall_Node_215 | Ast_ICS_B_MemberProcedureCall_Node_226 | Ast_ICS_B_MemberProcedureCall_Node_227 | Ast_ICS_B_MemberProcedureCall_Node_228 | Ast_ICS_B_MemberProcedureCall_Node_229 | Ast_ICS_B_MemberProcedureCall_Node_230 | Ast_ICS_B_MemberProcedureCall_Node_231 | Ast_ICS_B_MemberProcedureCall_Node_232 | Ast_ICS_B_MemberProcedureCall_Node_233 | Ast_ValueStmt_Node_288;
      }
type Ast_ImplicitCallStmt_InStmt_Node_291 = Ast_ImplicitCallStmt_InStmt_Node_291_;
interface Ast_ImplicitCallStmt_InStmt_Node_292_ extends BaseSymbolNode {
        symbol:"implicitCallStmt_InStmt";
        
        children:[Ast_ICS_S_ProcedureOrArrayCall_Node];
        parent:Ast_RedimSubStmt_Node_191 | Ast_RedimSubStmt_Node_192 | Ast_LetStmt_Node_205 | Ast_LetStmt_Node_206 | Ast_SetStmt_Node | Ast_ECS_MemberProcedureCall_Node_212 | Ast_ECS_MemberProcedureCall_Node_213 | Ast_ECS_MemberProcedureCall_Node_214 | Ast_ECS_MemberProcedureCall_Node_215 | Ast_ICS_B_MemberProcedureCall_Node_226 | Ast_ICS_B_MemberProcedureCall_Node_227 | Ast_ICS_B_MemberProcedureCall_Node_228 | Ast_ICS_B_MemberProcedureCall_Node_229 | Ast_ICS_B_MemberProcedureCall_Node_230 | Ast_ICS_B_MemberProcedureCall_Node_231 | Ast_ICS_B_MemberProcedureCall_Node_232 | Ast_ICS_B_MemberProcedureCall_Node_233 | Ast_ValueStmt_Node_288;
      }
type Ast_ImplicitCallStmt_InStmt_Node_292 = Ast_ImplicitCallStmt_InStmt_Node_292_;
type Ast_ICS_S_MembersCall_group_def_51_Node  = [Ast_ICS_S_VariableOrProcedureCall_Node];
type Ast_ICS_S_MembersCall_group_50_Node_294  = [...Ast_ICS_S_MembersCall_group_def_51_Node];
type Ast_ICS_S_MembersCall_group_def_52_Node  = [Ast_ICS_S_ProcedureOrArrayCall_Node];
type Ast_ICS_S_MembersCall_group_50_Node_296  = [...Ast_ICS_S_MembersCall_group_def_52_Node];
interface Ast_ICS_S_MembersCall_Node_297_ extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[...Ast_ICS_S_MembersCall_group_50_Node,...OneOrMore<Ast_ICS_S_MemberCall_Node>,Ast_DictionaryCallStmt_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ImplicitCallStmt_InStmt_Node_290;
      }
type Ast_ICS_S_MembersCall_Node_297 = Ast_ICS_S_MembersCall_Node_297_;
interface Ast_ICS_S_MembersCall_Node_298_ extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[...Ast_ICS_S_MembersCall_group_50_Node,...OneOrMore<Ast_ICS_S_MemberCall_Node>,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ImplicitCallStmt_InStmt_Node_290;
      }
type Ast_ICS_S_MembersCall_Node_298 = Ast_ICS_S_MembersCall_Node_298_;
interface Ast_ICS_S_MembersCall_Node_299_ extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[...OneOrMore<Ast_ICS_S_MemberCall_Node>,Ast_DictionaryCallStmt_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ImplicitCallStmt_InStmt_Node_290;
      }
type Ast_ICS_S_MembersCall_Node_299 = Ast_ICS_S_MembersCall_Node_299_;
interface Ast_ICS_S_MembersCall_Node_300_ extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[...OneOrMore<Ast_ICS_S_MemberCall_Node>,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ImplicitCallStmt_InStmt_Node_290;
      }
type Ast_ICS_S_MembersCall_Node_300 = Ast_ICS_S_MembersCall_Node_300_;
type Ast_ICS_S_MemberCall_group_def_55_Node  = [Ast_TOKEN_1_Node];
type Ast_ICS_S_MemberCall_group_54_Node_302  = [...Ast_ICS_S_MemberCall_group_def_55_Node];
interface Ast_TOKEN_2_Node_ extends BaseTokenNode {
            token:"!";
            parent:Ast_ICS_S_MemberCall_group_def_56_Parent_Node | Ast_DictionaryCallStmt_Node_320 | Ast_DictionaryCallStmt_Node_321 | Ast_TypeHint_Node_331;
          }
export type Ast_TOKEN_2_Node = Ast_TOKEN_2_Node_;
type Ast_ICS_S_MemberCall_group_def_56_Node  = [Ast_TOKEN_2_Node];
type Ast_ICS_S_MemberCall_group_54_Node_304  = [...Ast_ICS_S_MemberCall_group_def_56_Node];
type Ast_ICS_S_MemberCall_group_57_Node_305  = [...Ast_ICS_S_MembersCall_group_def_51_Node];
type Ast_ICS_S_MemberCall_group_57_Node_306  = [...Ast_ICS_S_MembersCall_group_def_52_Node];
interface Ast_ICS_S_MemberCall_Node_ extends BaseSymbolNode {
        symbol:"iCS_S_MemberCall";
        
        children:[...Ast_ICS_S_MemberCall_group_54_Node,...Ast_ICS_S_MemberCall_group_57_Node];
        parent:Ast_ICS_S_MembersCall_Node_297 | Ast_ICS_S_MembersCall_Node_298 | Ast_ICS_S_MembersCall_Node_299 | Ast_ICS_S_MembersCall_Node_300;
      }
type Ast_ICS_S_MemberCall_Node = Ast_ICS_S_MemberCall_Node_;
interface Ast_ICS_S_ProcedureOrArrayCall_Node_308_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_LPAREN_Node,Ast_ArgsCall_Node,Ast_RPAREN_Node,Ast_DictionaryCallStmt_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ImplicitCallStmt_InStmt_Node_292 | Ast_ICS_S_MembersCall_group_def_52_Parent_Node;
      }
type Ast_ICS_S_ProcedureOrArrayCall_Node_308 = Ast_ICS_S_ProcedureOrArrayCall_Node_308_;
interface Ast_ICS_S_ProcedureOrArrayCall_Node_309_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_LPAREN_Node,Ast_ArgsCall_Node,Ast_RPAREN_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ImplicitCallStmt_InStmt_Node_292 | Ast_ICS_S_MembersCall_group_def_52_Parent_Node;
      }
type Ast_ICS_S_ProcedureOrArrayCall_Node_309 = Ast_ICS_S_ProcedureOrArrayCall_Node_309_;
interface Ast_ICS_S_ProcedureOrArrayCall_Node_310_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_DictionaryCallStmt_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ImplicitCallStmt_InStmt_Node_292 | Ast_ICS_S_MembersCall_group_def_52_Parent_Node;
      }
type Ast_ICS_S_ProcedureOrArrayCall_Node_310 = Ast_ICS_S_ProcedureOrArrayCall_Node_310_;
interface Ast_ICS_S_ProcedureOrArrayCall_Node_311_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ImplicitCallStmt_InStmt_Node_292 | Ast_ICS_S_MembersCall_group_def_52_Parent_Node;
      }
type Ast_ICS_S_ProcedureOrArrayCall_Node_311 = Ast_ICS_S_ProcedureOrArrayCall_Node_311_;
interface Ast_ICS_S_ProcedureOrArrayCall_Node_312_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_LPAREN_Node,Ast_ArgsCall_Node,Ast_RPAREN_Node,Ast_DictionaryCallStmt_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ImplicitCallStmt_InStmt_Node_292 | Ast_ICS_S_MembersCall_group_def_52_Parent_Node;
      }
type Ast_ICS_S_ProcedureOrArrayCall_Node_312 = Ast_ICS_S_ProcedureOrArrayCall_Node_312_;
interface Ast_ICS_S_ProcedureOrArrayCall_Node_313_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_LPAREN_Node,Ast_ArgsCall_Node,Ast_RPAREN_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ImplicitCallStmt_InStmt_Node_292 | Ast_ICS_S_MembersCall_group_def_52_Parent_Node;
      }
type Ast_ICS_S_ProcedureOrArrayCall_Node_313 = Ast_ICS_S_ProcedureOrArrayCall_Node_313_;
interface Ast_ICS_S_ProcedureOrArrayCall_Node_314_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,Ast_DictionaryCallStmt_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ImplicitCallStmt_InStmt_Node_292 | Ast_ICS_S_MembersCall_group_def_52_Parent_Node;
      }
type Ast_ICS_S_ProcedureOrArrayCall_Node_314 = Ast_ICS_S_ProcedureOrArrayCall_Node_314_;
interface Ast_ICS_S_ProcedureOrArrayCall_Node_315_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ImplicitCallStmt_InStmt_Node_292 | Ast_ICS_S_MembersCall_group_def_52_Parent_Node;
      }
type Ast_ICS_S_ProcedureOrArrayCall_Node_315 = Ast_ICS_S_ProcedureOrArrayCall_Node_315_;
interface Ast_ICS_S_VariableOrProcedureCall_Node_316_ extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_DictionaryCallStmt_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ImplicitCallStmt_InStmt_Node_291 | Ast_ICS_S_MembersCall_group_def_51_Parent_Node;
      }
type Ast_ICS_S_VariableOrProcedureCall_Node_316 = Ast_ICS_S_VariableOrProcedureCall_Node_316_;
interface Ast_ICS_S_VariableOrProcedureCall_Node_317_ extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ImplicitCallStmt_InStmt_Node_291 | Ast_ICS_S_MembersCall_group_def_51_Parent_Node;
      }
type Ast_ICS_S_VariableOrProcedureCall_Node_317 = Ast_ICS_S_VariableOrProcedureCall_Node_317_;
interface Ast_ICS_S_VariableOrProcedureCall_Node_318_ extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_DictionaryCallStmt_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ImplicitCallStmt_InStmt_Node_291 | Ast_ICS_S_MembersCall_group_def_51_Parent_Node;
      }
type Ast_ICS_S_VariableOrProcedureCall_Node_318 = Ast_ICS_S_VariableOrProcedureCall_Node_318_;
interface Ast_ICS_S_VariableOrProcedureCall_Node_319_ extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[Ast_AmbiguousIdentifier_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_21_Node>];
        parent:Ast_ImplicitCallStmt_InStmt_Node_291 | Ast_ICS_S_MembersCall_group_def_51_Parent_Node;
      }
type Ast_ICS_S_VariableOrProcedureCall_Node_319 = Ast_ICS_S_VariableOrProcedureCall_Node_319_;
interface Ast_DictionaryCallStmt_Node_320_ extends BaseSymbolNode {
        symbol:"dictionaryCallStmt";
        
        children:[Ast_TOKEN_2_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node];
        parent:Ast_ICS_B_MemberProcedureCall_Node_226 | Ast_ICS_B_MemberProcedureCall_Node_228 | Ast_ICS_B_MemberProcedureCall_Node_230 | Ast_ICS_B_MemberProcedureCall_Node_232 | Ast_ICS_S_MembersCall_Node_297 | Ast_ICS_S_MembersCall_Node_299 | Ast_ICS_S_ProcedureOrArrayCall_Node_308 | Ast_ICS_S_ProcedureOrArrayCall_Node_310 | Ast_ICS_S_ProcedureOrArrayCall_Node_312 | Ast_ICS_S_ProcedureOrArrayCall_Node_314 | Ast_ICS_S_VariableOrProcedureCall_Node_316 | Ast_ICS_S_VariableOrProcedureCall_Node_318;
      }
type Ast_DictionaryCallStmt_Node_320 = Ast_DictionaryCallStmt_Node_320_;
interface Ast_DictionaryCallStmt_Node_321_ extends BaseSymbolNode {
        symbol:"dictionaryCallStmt";
        
        children:[Ast_TOKEN_2_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_ICS_B_MemberProcedureCall_Node_226 | Ast_ICS_B_MemberProcedureCall_Node_228 | Ast_ICS_B_MemberProcedureCall_Node_230 | Ast_ICS_B_MemberProcedureCall_Node_232 | Ast_ICS_S_MembersCall_Node_297 | Ast_ICS_S_MembersCall_Node_299 | Ast_ICS_S_ProcedureOrArrayCall_Node_308 | Ast_ICS_S_ProcedureOrArrayCall_Node_310 | Ast_ICS_S_ProcedureOrArrayCall_Node_312 | Ast_ICS_S_ProcedureOrArrayCall_Node_314 | Ast_ICS_S_VariableOrProcedureCall_Node_316 | Ast_ICS_S_VariableOrProcedureCall_Node_318;
      }
type Ast_DictionaryCallStmt_Node_321 = Ast_DictionaryCallStmt_Node_321_;
interface Ast_Literal_Node_322_ extends BaseSymbolNode {
        symbol:"literal";
        
        children:[Ast_INTEGERLITERAL_Node];
        parent:Ast_ValueStmt_Node_287;
      }
type Ast_Literal_Node_322 = Ast_Literal_Node_322_;
interface Ast_STRINGLITERAL_Node_ extends BaseTokenNode {
            token:"STRINGLITERAL";
            parent:Ast_Literal_Node_323;
          }
export type Ast_STRINGLITERAL_Node = Ast_STRINGLITERAL_Node_;
interface Ast_Literal_Node_323_ extends BaseSymbolNode {
        symbol:"literal";
        
        children:[Ast_STRINGLITERAL_Node];
        parent:Ast_ValueStmt_Node_287;
      }
type Ast_Literal_Node_323 = Ast_Literal_Node_323_;
interface Ast_NOTHING_Node_ extends BaseTokenNode {
            token:"NOTHING";
            parent:Ast_Literal_Node_324;
          }
export type Ast_NOTHING_Node = Ast_NOTHING_Node_;
interface Ast_Literal_Node_324_ extends BaseSymbolNode {
        symbol:"literal";
        
        children:[Ast_NOTHING_Node];
        parent:Ast_ValueStmt_Node_287;
      }
type Ast_Literal_Node_324 = Ast_Literal_Node_324_;
interface Ast_NULL_Node_ extends BaseTokenNode {
            token:"NULL";
            parent:Ast_Literal_Node_325;
          }
export type Ast_NULL_Node = Ast_NULL_Node_;
interface Ast_Literal_Node_325_ extends BaseSymbolNode {
        symbol:"literal";
        
        children:[Ast_NULL_Node];
        parent:Ast_ValueStmt_Node_287;
      }
type Ast_Literal_Node_325 = Ast_Literal_Node_325_;
interface Ast_TRUE_Node_ extends BaseTokenNode {
            token:"TRUE";
            parent:Ast_Literal_Node_326;
          }
export type Ast_TRUE_Node = Ast_TRUE_Node_;
interface Ast_Literal_Node_326_ extends BaseSymbolNode {
        symbol:"literal";
        
        children:[Ast_TRUE_Node];
        parent:Ast_ValueStmt_Node_287;
      }
type Ast_Literal_Node_326 = Ast_Literal_Node_326_;
interface Ast_FALSE_Node_ extends BaseTokenNode {
            token:"FALSE";
            parent:Ast_Literal_Node_327;
          }
export type Ast_FALSE_Node = Ast_FALSE_Node_;
interface Ast_Literal_Node_327_ extends BaseSymbolNode {
        symbol:"literal";
        
        children:[Ast_FALSE_Node];
        parent:Ast_ValueStmt_Node_287;
      }
type Ast_Literal_Node_327 = Ast_Literal_Node_327_;
interface Ast_TOKEN_3_Node_ extends BaseTokenNode {
            token:"&";
            parent:Ast_TypeHint_Node_328;
          }
export type Ast_TOKEN_3_Node = Ast_TOKEN_3_Node_;
interface Ast_TypeHint_Node_328_ extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[Ast_TOKEN_3_Node];
        parent:Ast_PropertyGetStmt_Node_48 | Ast_PropertyGetStmt_Node_49 | Ast_PropertyGetStmt_Node_50 | Ast_PropertyGetStmt_Node_51 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_FunctionStmt_Node_112 | Ast_FunctionStmt_Node_113 | Ast_FunctionStmt_Node_114 | Ast_FunctionStmt_Node_115 | Ast_FunctionStmt_Node_116 | Ast_FunctionStmt_Node_117 | Ast_FunctionStmt_Node_118 | Ast_FunctionStmt_Node_119 | Ast_FunctionStmt_Node_128 | Ast_FunctionStmt_Node_129 | Ast_FunctionStmt_Node_130 | Ast_FunctionStmt_Node_131 | Ast_FunctionStmt_Node_132 | Ast_FunctionStmt_Node_133 | Ast_FunctionStmt_Node_134 | Ast_FunctionStmt_Node_135 | Ast_FunctionStmt_Node_144 | Ast_FunctionStmt_Node_145 | Ast_FunctionStmt_Node_146 | Ast_FunctionStmt_Node_147 | Ast_FunctionStmt_Node_148 | Ast_FunctionStmt_Node_149 | Ast_FunctionStmt_Node_150 | Ast_FunctionStmt_Node_151 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_166 | Ast_FunctionStmt_Node_167 | Ast_ECS_MemberProcedureCall_Node_212 | Ast_ECS_MemberProcedureCall_Node_213 | Ast_ECS_MemberProcedureCall_Node_216 | Ast_ECS_MemberProcedureCall_Node_217 | Ast_ECS_ProcedureCall_Node_220 | Ast_ECS_ProcedureCall_Node_221 | Ast_ICS_B_MemberProcedureCall_Node_226 | Ast_ICS_B_MemberProcedureCall_Node_227 | Ast_ICS_B_MemberProcedureCall_Node_228 | Ast_ICS_B_MemberProcedureCall_Node_229 | Ast_VariableSubStmt_Node_267 | Ast_VariableSubStmt_Node_268 | Ast_VariableSubStmt_Node_271 | Ast_VariableSubStmt_Node_272 | Ast_ICS_S_ProcedureOrArrayCall_Node_308 | Ast_ICS_S_ProcedureOrArrayCall_Node_309 | Ast_ICS_S_ProcedureOrArrayCall_Node_310 | Ast_ICS_S_ProcedureOrArrayCall_Node_311 | Ast_ICS_S_VariableOrProcedureCall_Node_316 | Ast_ICS_S_VariableOrProcedureCall_Node_317 | Ast_DictionaryCallStmt_Node_320 | Ast_Arg_Node_337 | Ast_Arg_Node_338 | Ast_Arg_Node_339 | Ast_Arg_Node_340 | Ast_Arg_Node_341 | Ast_Arg_Node_342 | Ast_Arg_Node_343 | Ast_Arg_Node_344 | Ast_Arg_Node_353 | Ast_Arg_Node_354 | Ast_Arg_Node_355 | Ast_Arg_Node_356 | Ast_Arg_Node_357 | Ast_Arg_Node_358 | Ast_Arg_Node_359 | Ast_Arg_Node_360 | Ast_Arg_Node_369 | Ast_Arg_Node_370 | Ast_Arg_Node_371 | Ast_Arg_Node_372 | Ast_Arg_Node_373 | Ast_Arg_Node_374 | Ast_Arg_Node_375 | Ast_Arg_Node_376 | Ast_Arg_Node_385 | Ast_Arg_Node_386 | Ast_Arg_Node_387 | Ast_Arg_Node_388 | Ast_Arg_Node_389 | Ast_Arg_Node_390 | Ast_Arg_Node_391 | Ast_Arg_Node_392 | Ast_Arg_Node_401 | Ast_Arg_Node_402 | Ast_Arg_Node_403 | Ast_Arg_Node_404 | Ast_Arg_Node_405 | Ast_Arg_Node_406 | Ast_Arg_Node_407 | Ast_Arg_Node_408 | Ast_Arg_Node_417 | Ast_Arg_Node_418 | Ast_Arg_Node_419 | Ast_Arg_Node_420 | Ast_Arg_Node_421 | Ast_Arg_Node_422 | Ast_Arg_Node_423 | Ast_Arg_Node_424 | Ast_Arg_Node_433 | Ast_Arg_Node_434 | Ast_Arg_Node_435 | Ast_Arg_Node_436 | Ast_Arg_Node_437 | Ast_Arg_Node_438 | Ast_Arg_Node_439 | Ast_Arg_Node_440 | Ast_Arg_Node_449 | Ast_Arg_Node_450 | Ast_Arg_Node_451 | Ast_Arg_Node_452 | Ast_Arg_Node_453 | Ast_Arg_Node_454 | Ast_Arg_Node_455 | Ast_Arg_Node_456;
      }
type Ast_TypeHint_Node_328 = Ast_TypeHint_Node_328_;
interface Ast_TOKEN_4_Node_ extends BaseTokenNode {
            token:"%";
            parent:Ast_TypeHint_Node_329;
          }
export type Ast_TOKEN_4_Node = Ast_TOKEN_4_Node_;
interface Ast_TypeHint_Node_329_ extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[Ast_TOKEN_4_Node];
        parent:Ast_PropertyGetStmt_Node_48 | Ast_PropertyGetStmt_Node_49 | Ast_PropertyGetStmt_Node_50 | Ast_PropertyGetStmt_Node_51 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_FunctionStmt_Node_112 | Ast_FunctionStmt_Node_113 | Ast_FunctionStmt_Node_114 | Ast_FunctionStmt_Node_115 | Ast_FunctionStmt_Node_116 | Ast_FunctionStmt_Node_117 | Ast_FunctionStmt_Node_118 | Ast_FunctionStmt_Node_119 | Ast_FunctionStmt_Node_128 | Ast_FunctionStmt_Node_129 | Ast_FunctionStmt_Node_130 | Ast_FunctionStmt_Node_131 | Ast_FunctionStmt_Node_132 | Ast_FunctionStmt_Node_133 | Ast_FunctionStmt_Node_134 | Ast_FunctionStmt_Node_135 | Ast_FunctionStmt_Node_144 | Ast_FunctionStmt_Node_145 | Ast_FunctionStmt_Node_146 | Ast_FunctionStmt_Node_147 | Ast_FunctionStmt_Node_148 | Ast_FunctionStmt_Node_149 | Ast_FunctionStmt_Node_150 | Ast_FunctionStmt_Node_151 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_166 | Ast_FunctionStmt_Node_167 | Ast_ECS_MemberProcedureCall_Node_212 | Ast_ECS_MemberProcedureCall_Node_213 | Ast_ECS_MemberProcedureCall_Node_216 | Ast_ECS_MemberProcedureCall_Node_217 | Ast_ECS_ProcedureCall_Node_220 | Ast_ECS_ProcedureCall_Node_221 | Ast_ICS_B_MemberProcedureCall_Node_226 | Ast_ICS_B_MemberProcedureCall_Node_227 | Ast_ICS_B_MemberProcedureCall_Node_228 | Ast_ICS_B_MemberProcedureCall_Node_229 | Ast_VariableSubStmt_Node_267 | Ast_VariableSubStmt_Node_268 | Ast_VariableSubStmt_Node_271 | Ast_VariableSubStmt_Node_272 | Ast_ICS_S_ProcedureOrArrayCall_Node_308 | Ast_ICS_S_ProcedureOrArrayCall_Node_309 | Ast_ICS_S_ProcedureOrArrayCall_Node_310 | Ast_ICS_S_ProcedureOrArrayCall_Node_311 | Ast_ICS_S_VariableOrProcedureCall_Node_316 | Ast_ICS_S_VariableOrProcedureCall_Node_317 | Ast_DictionaryCallStmt_Node_320 | Ast_Arg_Node_337 | Ast_Arg_Node_338 | Ast_Arg_Node_339 | Ast_Arg_Node_340 | Ast_Arg_Node_341 | Ast_Arg_Node_342 | Ast_Arg_Node_343 | Ast_Arg_Node_344 | Ast_Arg_Node_353 | Ast_Arg_Node_354 | Ast_Arg_Node_355 | Ast_Arg_Node_356 | Ast_Arg_Node_357 | Ast_Arg_Node_358 | Ast_Arg_Node_359 | Ast_Arg_Node_360 | Ast_Arg_Node_369 | Ast_Arg_Node_370 | Ast_Arg_Node_371 | Ast_Arg_Node_372 | Ast_Arg_Node_373 | Ast_Arg_Node_374 | Ast_Arg_Node_375 | Ast_Arg_Node_376 | Ast_Arg_Node_385 | Ast_Arg_Node_386 | Ast_Arg_Node_387 | Ast_Arg_Node_388 | Ast_Arg_Node_389 | Ast_Arg_Node_390 | Ast_Arg_Node_391 | Ast_Arg_Node_392 | Ast_Arg_Node_401 | Ast_Arg_Node_402 | Ast_Arg_Node_403 | Ast_Arg_Node_404 | Ast_Arg_Node_405 | Ast_Arg_Node_406 | Ast_Arg_Node_407 | Ast_Arg_Node_408 | Ast_Arg_Node_417 | Ast_Arg_Node_418 | Ast_Arg_Node_419 | Ast_Arg_Node_420 | Ast_Arg_Node_421 | Ast_Arg_Node_422 | Ast_Arg_Node_423 | Ast_Arg_Node_424 | Ast_Arg_Node_433 | Ast_Arg_Node_434 | Ast_Arg_Node_435 | Ast_Arg_Node_436 | Ast_Arg_Node_437 | Ast_Arg_Node_438 | Ast_Arg_Node_439 | Ast_Arg_Node_440 | Ast_Arg_Node_449 | Ast_Arg_Node_450 | Ast_Arg_Node_451 | Ast_Arg_Node_452 | Ast_Arg_Node_453 | Ast_Arg_Node_454 | Ast_Arg_Node_455 | Ast_Arg_Node_456;
      }
type Ast_TypeHint_Node_329 = Ast_TypeHint_Node_329_;
interface Ast_TOKEN_5_Node_ extends BaseTokenNode {
            token:"#";
            parent:Ast_TypeHint_Node_330;
          }
export type Ast_TOKEN_5_Node = Ast_TOKEN_5_Node_;
interface Ast_TypeHint_Node_330_ extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[Ast_TOKEN_5_Node];
        parent:Ast_PropertyGetStmt_Node_48 | Ast_PropertyGetStmt_Node_49 | Ast_PropertyGetStmt_Node_50 | Ast_PropertyGetStmt_Node_51 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_FunctionStmt_Node_112 | Ast_FunctionStmt_Node_113 | Ast_FunctionStmt_Node_114 | Ast_FunctionStmt_Node_115 | Ast_FunctionStmt_Node_116 | Ast_FunctionStmt_Node_117 | Ast_FunctionStmt_Node_118 | Ast_FunctionStmt_Node_119 | Ast_FunctionStmt_Node_128 | Ast_FunctionStmt_Node_129 | Ast_FunctionStmt_Node_130 | Ast_FunctionStmt_Node_131 | Ast_FunctionStmt_Node_132 | Ast_FunctionStmt_Node_133 | Ast_FunctionStmt_Node_134 | Ast_FunctionStmt_Node_135 | Ast_FunctionStmt_Node_144 | Ast_FunctionStmt_Node_145 | Ast_FunctionStmt_Node_146 | Ast_FunctionStmt_Node_147 | Ast_FunctionStmt_Node_148 | Ast_FunctionStmt_Node_149 | Ast_FunctionStmt_Node_150 | Ast_FunctionStmt_Node_151 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_166 | Ast_FunctionStmt_Node_167 | Ast_ECS_MemberProcedureCall_Node_212 | Ast_ECS_MemberProcedureCall_Node_213 | Ast_ECS_MemberProcedureCall_Node_216 | Ast_ECS_MemberProcedureCall_Node_217 | Ast_ECS_ProcedureCall_Node_220 | Ast_ECS_ProcedureCall_Node_221 | Ast_ICS_B_MemberProcedureCall_Node_226 | Ast_ICS_B_MemberProcedureCall_Node_227 | Ast_ICS_B_MemberProcedureCall_Node_228 | Ast_ICS_B_MemberProcedureCall_Node_229 | Ast_VariableSubStmt_Node_267 | Ast_VariableSubStmt_Node_268 | Ast_VariableSubStmt_Node_271 | Ast_VariableSubStmt_Node_272 | Ast_ICS_S_ProcedureOrArrayCall_Node_308 | Ast_ICS_S_ProcedureOrArrayCall_Node_309 | Ast_ICS_S_ProcedureOrArrayCall_Node_310 | Ast_ICS_S_ProcedureOrArrayCall_Node_311 | Ast_ICS_S_VariableOrProcedureCall_Node_316 | Ast_ICS_S_VariableOrProcedureCall_Node_317 | Ast_DictionaryCallStmt_Node_320 | Ast_Arg_Node_337 | Ast_Arg_Node_338 | Ast_Arg_Node_339 | Ast_Arg_Node_340 | Ast_Arg_Node_341 | Ast_Arg_Node_342 | Ast_Arg_Node_343 | Ast_Arg_Node_344 | Ast_Arg_Node_353 | Ast_Arg_Node_354 | Ast_Arg_Node_355 | Ast_Arg_Node_356 | Ast_Arg_Node_357 | Ast_Arg_Node_358 | Ast_Arg_Node_359 | Ast_Arg_Node_360 | Ast_Arg_Node_369 | Ast_Arg_Node_370 | Ast_Arg_Node_371 | Ast_Arg_Node_372 | Ast_Arg_Node_373 | Ast_Arg_Node_374 | Ast_Arg_Node_375 | Ast_Arg_Node_376 | Ast_Arg_Node_385 | Ast_Arg_Node_386 | Ast_Arg_Node_387 | Ast_Arg_Node_388 | Ast_Arg_Node_389 | Ast_Arg_Node_390 | Ast_Arg_Node_391 | Ast_Arg_Node_392 | Ast_Arg_Node_401 | Ast_Arg_Node_402 | Ast_Arg_Node_403 | Ast_Arg_Node_404 | Ast_Arg_Node_405 | Ast_Arg_Node_406 | Ast_Arg_Node_407 | Ast_Arg_Node_408 | Ast_Arg_Node_417 | Ast_Arg_Node_418 | Ast_Arg_Node_419 | Ast_Arg_Node_420 | Ast_Arg_Node_421 | Ast_Arg_Node_422 | Ast_Arg_Node_423 | Ast_Arg_Node_424 | Ast_Arg_Node_433 | Ast_Arg_Node_434 | Ast_Arg_Node_435 | Ast_Arg_Node_436 | Ast_Arg_Node_437 | Ast_Arg_Node_438 | Ast_Arg_Node_439 | Ast_Arg_Node_440 | Ast_Arg_Node_449 | Ast_Arg_Node_450 | Ast_Arg_Node_451 | Ast_Arg_Node_452 | Ast_Arg_Node_453 | Ast_Arg_Node_454 | Ast_Arg_Node_455 | Ast_Arg_Node_456;
      }
type Ast_TypeHint_Node_330 = Ast_TypeHint_Node_330_;
interface Ast_TypeHint_Node_331_ extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[Ast_TOKEN_2_Node];
        parent:Ast_PropertyGetStmt_Node_48 | Ast_PropertyGetStmt_Node_49 | Ast_PropertyGetStmt_Node_50 | Ast_PropertyGetStmt_Node_51 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_FunctionStmt_Node_112 | Ast_FunctionStmt_Node_113 | Ast_FunctionStmt_Node_114 | Ast_FunctionStmt_Node_115 | Ast_FunctionStmt_Node_116 | Ast_FunctionStmt_Node_117 | Ast_FunctionStmt_Node_118 | Ast_FunctionStmt_Node_119 | Ast_FunctionStmt_Node_128 | Ast_FunctionStmt_Node_129 | Ast_FunctionStmt_Node_130 | Ast_FunctionStmt_Node_131 | Ast_FunctionStmt_Node_132 | Ast_FunctionStmt_Node_133 | Ast_FunctionStmt_Node_134 | Ast_FunctionStmt_Node_135 | Ast_FunctionStmt_Node_144 | Ast_FunctionStmt_Node_145 | Ast_FunctionStmt_Node_146 | Ast_FunctionStmt_Node_147 | Ast_FunctionStmt_Node_148 | Ast_FunctionStmt_Node_149 | Ast_FunctionStmt_Node_150 | Ast_FunctionStmt_Node_151 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_166 | Ast_FunctionStmt_Node_167 | Ast_ECS_MemberProcedureCall_Node_212 | Ast_ECS_MemberProcedureCall_Node_213 | Ast_ECS_MemberProcedureCall_Node_216 | Ast_ECS_MemberProcedureCall_Node_217 | Ast_ECS_ProcedureCall_Node_220 | Ast_ECS_ProcedureCall_Node_221 | Ast_ICS_B_MemberProcedureCall_Node_226 | Ast_ICS_B_MemberProcedureCall_Node_227 | Ast_ICS_B_MemberProcedureCall_Node_228 | Ast_ICS_B_MemberProcedureCall_Node_229 | Ast_VariableSubStmt_Node_267 | Ast_VariableSubStmt_Node_268 | Ast_VariableSubStmt_Node_271 | Ast_VariableSubStmt_Node_272 | Ast_ICS_S_ProcedureOrArrayCall_Node_308 | Ast_ICS_S_ProcedureOrArrayCall_Node_309 | Ast_ICS_S_ProcedureOrArrayCall_Node_310 | Ast_ICS_S_ProcedureOrArrayCall_Node_311 | Ast_ICS_S_VariableOrProcedureCall_Node_316 | Ast_ICS_S_VariableOrProcedureCall_Node_317 | Ast_DictionaryCallStmt_Node_320 | Ast_Arg_Node_337 | Ast_Arg_Node_338 | Ast_Arg_Node_339 | Ast_Arg_Node_340 | Ast_Arg_Node_341 | Ast_Arg_Node_342 | Ast_Arg_Node_343 | Ast_Arg_Node_344 | Ast_Arg_Node_353 | Ast_Arg_Node_354 | Ast_Arg_Node_355 | Ast_Arg_Node_356 | Ast_Arg_Node_357 | Ast_Arg_Node_358 | Ast_Arg_Node_359 | Ast_Arg_Node_360 | Ast_Arg_Node_369 | Ast_Arg_Node_370 | Ast_Arg_Node_371 | Ast_Arg_Node_372 | Ast_Arg_Node_373 | Ast_Arg_Node_374 | Ast_Arg_Node_375 | Ast_Arg_Node_376 | Ast_Arg_Node_385 | Ast_Arg_Node_386 | Ast_Arg_Node_387 | Ast_Arg_Node_388 | Ast_Arg_Node_389 | Ast_Arg_Node_390 | Ast_Arg_Node_391 | Ast_Arg_Node_392 | Ast_Arg_Node_401 | Ast_Arg_Node_402 | Ast_Arg_Node_403 | Ast_Arg_Node_404 | Ast_Arg_Node_405 | Ast_Arg_Node_406 | Ast_Arg_Node_407 | Ast_Arg_Node_408 | Ast_Arg_Node_417 | Ast_Arg_Node_418 | Ast_Arg_Node_419 | Ast_Arg_Node_420 | Ast_Arg_Node_421 | Ast_Arg_Node_422 | Ast_Arg_Node_423 | Ast_Arg_Node_424 | Ast_Arg_Node_433 | Ast_Arg_Node_434 | Ast_Arg_Node_435 | Ast_Arg_Node_436 | Ast_Arg_Node_437 | Ast_Arg_Node_438 | Ast_Arg_Node_439 | Ast_Arg_Node_440 | Ast_Arg_Node_449 | Ast_Arg_Node_450 | Ast_Arg_Node_451 | Ast_Arg_Node_452 | Ast_Arg_Node_453 | Ast_Arg_Node_454 | Ast_Arg_Node_455 | Ast_Arg_Node_456;
      }
type Ast_TypeHint_Node_331 = Ast_TypeHint_Node_331_;
interface Ast_TOKEN_6_Node_ extends BaseTokenNode {
            token:"@";
            parent:Ast_TypeHint_Node_332;
          }
export type Ast_TOKEN_6_Node = Ast_TOKEN_6_Node_;
interface Ast_TypeHint_Node_332_ extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[Ast_TOKEN_6_Node];
        parent:Ast_PropertyGetStmt_Node_48 | Ast_PropertyGetStmt_Node_49 | Ast_PropertyGetStmt_Node_50 | Ast_PropertyGetStmt_Node_51 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_FunctionStmt_Node_112 | Ast_FunctionStmt_Node_113 | Ast_FunctionStmt_Node_114 | Ast_FunctionStmt_Node_115 | Ast_FunctionStmt_Node_116 | Ast_FunctionStmt_Node_117 | Ast_FunctionStmt_Node_118 | Ast_FunctionStmt_Node_119 | Ast_FunctionStmt_Node_128 | Ast_FunctionStmt_Node_129 | Ast_FunctionStmt_Node_130 | Ast_FunctionStmt_Node_131 | Ast_FunctionStmt_Node_132 | Ast_FunctionStmt_Node_133 | Ast_FunctionStmt_Node_134 | Ast_FunctionStmt_Node_135 | Ast_FunctionStmt_Node_144 | Ast_FunctionStmt_Node_145 | Ast_FunctionStmt_Node_146 | Ast_FunctionStmt_Node_147 | Ast_FunctionStmt_Node_148 | Ast_FunctionStmt_Node_149 | Ast_FunctionStmt_Node_150 | Ast_FunctionStmt_Node_151 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_166 | Ast_FunctionStmt_Node_167 | Ast_ECS_MemberProcedureCall_Node_212 | Ast_ECS_MemberProcedureCall_Node_213 | Ast_ECS_MemberProcedureCall_Node_216 | Ast_ECS_MemberProcedureCall_Node_217 | Ast_ECS_ProcedureCall_Node_220 | Ast_ECS_ProcedureCall_Node_221 | Ast_ICS_B_MemberProcedureCall_Node_226 | Ast_ICS_B_MemberProcedureCall_Node_227 | Ast_ICS_B_MemberProcedureCall_Node_228 | Ast_ICS_B_MemberProcedureCall_Node_229 | Ast_VariableSubStmt_Node_267 | Ast_VariableSubStmt_Node_268 | Ast_VariableSubStmt_Node_271 | Ast_VariableSubStmt_Node_272 | Ast_ICS_S_ProcedureOrArrayCall_Node_308 | Ast_ICS_S_ProcedureOrArrayCall_Node_309 | Ast_ICS_S_ProcedureOrArrayCall_Node_310 | Ast_ICS_S_ProcedureOrArrayCall_Node_311 | Ast_ICS_S_VariableOrProcedureCall_Node_316 | Ast_ICS_S_VariableOrProcedureCall_Node_317 | Ast_DictionaryCallStmt_Node_320 | Ast_Arg_Node_337 | Ast_Arg_Node_338 | Ast_Arg_Node_339 | Ast_Arg_Node_340 | Ast_Arg_Node_341 | Ast_Arg_Node_342 | Ast_Arg_Node_343 | Ast_Arg_Node_344 | Ast_Arg_Node_353 | Ast_Arg_Node_354 | Ast_Arg_Node_355 | Ast_Arg_Node_356 | Ast_Arg_Node_357 | Ast_Arg_Node_358 | Ast_Arg_Node_359 | Ast_Arg_Node_360 | Ast_Arg_Node_369 | Ast_Arg_Node_370 | Ast_Arg_Node_371 | Ast_Arg_Node_372 | Ast_Arg_Node_373 | Ast_Arg_Node_374 | Ast_Arg_Node_375 | Ast_Arg_Node_376 | Ast_Arg_Node_385 | Ast_Arg_Node_386 | Ast_Arg_Node_387 | Ast_Arg_Node_388 | Ast_Arg_Node_389 | Ast_Arg_Node_390 | Ast_Arg_Node_391 | Ast_Arg_Node_392 | Ast_Arg_Node_401 | Ast_Arg_Node_402 | Ast_Arg_Node_403 | Ast_Arg_Node_404 | Ast_Arg_Node_405 | Ast_Arg_Node_406 | Ast_Arg_Node_407 | Ast_Arg_Node_408 | Ast_Arg_Node_417 | Ast_Arg_Node_418 | Ast_Arg_Node_419 | Ast_Arg_Node_420 | Ast_Arg_Node_421 | Ast_Arg_Node_422 | Ast_Arg_Node_423 | Ast_Arg_Node_424 | Ast_Arg_Node_433 | Ast_Arg_Node_434 | Ast_Arg_Node_435 | Ast_Arg_Node_436 | Ast_Arg_Node_437 | Ast_Arg_Node_438 | Ast_Arg_Node_439 | Ast_Arg_Node_440 | Ast_Arg_Node_449 | Ast_Arg_Node_450 | Ast_Arg_Node_451 | Ast_Arg_Node_452 | Ast_Arg_Node_453 | Ast_Arg_Node_454 | Ast_Arg_Node_455 | Ast_Arg_Node_456;
      }
type Ast_TypeHint_Node_332 = Ast_TypeHint_Node_332_;
interface Ast_$_Node_ extends BaseTokenNode {
            token:"$";
            parent:Ast_TypeHint_Node_333;
          }
export type Ast_$_Node = Ast_$_Node_;
interface Ast_TypeHint_Node_333_ extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[Ast_$_Node];
        parent:Ast_PropertyGetStmt_Node_48 | Ast_PropertyGetStmt_Node_49 | Ast_PropertyGetStmt_Node_50 | Ast_PropertyGetStmt_Node_51 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_FunctionStmt_Node_112 | Ast_FunctionStmt_Node_113 | Ast_FunctionStmt_Node_114 | Ast_FunctionStmt_Node_115 | Ast_FunctionStmt_Node_116 | Ast_FunctionStmt_Node_117 | Ast_FunctionStmt_Node_118 | Ast_FunctionStmt_Node_119 | Ast_FunctionStmt_Node_128 | Ast_FunctionStmt_Node_129 | Ast_FunctionStmt_Node_130 | Ast_FunctionStmt_Node_131 | Ast_FunctionStmt_Node_132 | Ast_FunctionStmt_Node_133 | Ast_FunctionStmt_Node_134 | Ast_FunctionStmt_Node_135 | Ast_FunctionStmt_Node_144 | Ast_FunctionStmt_Node_145 | Ast_FunctionStmt_Node_146 | Ast_FunctionStmt_Node_147 | Ast_FunctionStmt_Node_148 | Ast_FunctionStmt_Node_149 | Ast_FunctionStmt_Node_150 | Ast_FunctionStmt_Node_151 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_166 | Ast_FunctionStmt_Node_167 | Ast_ECS_MemberProcedureCall_Node_212 | Ast_ECS_MemberProcedureCall_Node_213 | Ast_ECS_MemberProcedureCall_Node_216 | Ast_ECS_MemberProcedureCall_Node_217 | Ast_ECS_ProcedureCall_Node_220 | Ast_ECS_ProcedureCall_Node_221 | Ast_ICS_B_MemberProcedureCall_Node_226 | Ast_ICS_B_MemberProcedureCall_Node_227 | Ast_ICS_B_MemberProcedureCall_Node_228 | Ast_ICS_B_MemberProcedureCall_Node_229 | Ast_VariableSubStmt_Node_267 | Ast_VariableSubStmt_Node_268 | Ast_VariableSubStmt_Node_271 | Ast_VariableSubStmt_Node_272 | Ast_ICS_S_ProcedureOrArrayCall_Node_308 | Ast_ICS_S_ProcedureOrArrayCall_Node_309 | Ast_ICS_S_ProcedureOrArrayCall_Node_310 | Ast_ICS_S_ProcedureOrArrayCall_Node_311 | Ast_ICS_S_VariableOrProcedureCall_Node_316 | Ast_ICS_S_VariableOrProcedureCall_Node_317 | Ast_DictionaryCallStmt_Node_320 | Ast_Arg_Node_337 | Ast_Arg_Node_338 | Ast_Arg_Node_339 | Ast_Arg_Node_340 | Ast_Arg_Node_341 | Ast_Arg_Node_342 | Ast_Arg_Node_343 | Ast_Arg_Node_344 | Ast_Arg_Node_353 | Ast_Arg_Node_354 | Ast_Arg_Node_355 | Ast_Arg_Node_356 | Ast_Arg_Node_357 | Ast_Arg_Node_358 | Ast_Arg_Node_359 | Ast_Arg_Node_360 | Ast_Arg_Node_369 | Ast_Arg_Node_370 | Ast_Arg_Node_371 | Ast_Arg_Node_372 | Ast_Arg_Node_373 | Ast_Arg_Node_374 | Ast_Arg_Node_375 | Ast_Arg_Node_376 | Ast_Arg_Node_385 | Ast_Arg_Node_386 | Ast_Arg_Node_387 | Ast_Arg_Node_388 | Ast_Arg_Node_389 | Ast_Arg_Node_390 | Ast_Arg_Node_391 | Ast_Arg_Node_392 | Ast_Arg_Node_401 | Ast_Arg_Node_402 | Ast_Arg_Node_403 | Ast_Arg_Node_404 | Ast_Arg_Node_405 | Ast_Arg_Node_406 | Ast_Arg_Node_407 | Ast_Arg_Node_408 | Ast_Arg_Node_417 | Ast_Arg_Node_418 | Ast_Arg_Node_419 | Ast_Arg_Node_420 | Ast_Arg_Node_421 | Ast_Arg_Node_422 | Ast_Arg_Node_423 | Ast_Arg_Node_424 | Ast_Arg_Node_433 | Ast_Arg_Node_434 | Ast_Arg_Node_435 | Ast_Arg_Node_436 | Ast_Arg_Node_437 | Ast_Arg_Node_438 | Ast_Arg_Node_439 | Ast_Arg_Node_440 | Ast_Arg_Node_449 | Ast_Arg_Node_450 | Ast_Arg_Node_451 | Ast_Arg_Node_452 | Ast_Arg_Node_453 | Ast_Arg_Node_454 | Ast_Arg_Node_455 | Ast_Arg_Node_456;
      }
type Ast_TypeHint_Node_333 = Ast_TypeHint_Node_333_;
type Ast_Arg_group_60_Node_334  = [...Ast_ArgCall_group_def_30_Node];
type Ast_Arg_group_60_Node_335  = [...Ast_ArgCall_group_def_29_Node];
type Ast_Arg_group_def_62_Node  = [Ast_LPAREN_Node,Ast_RPAREN_Node];
interface Ast_OPTIONAL_Node_ extends BaseTokenNode {
            token:"OPTIONAL";
            parent:Ast_Arg_Node_337 | Ast_Arg_Node_338 | Ast_Arg_Node_339 | Ast_Arg_Node_340 | Ast_Arg_Node_341 | Ast_Arg_Node_342 | Ast_Arg_Node_343 | Ast_Arg_Node_344 | Ast_Arg_Node_345 | Ast_Arg_Node_346 | Ast_Arg_Node_347 | Ast_Arg_Node_348 | Ast_Arg_Node_349 | Ast_Arg_Node_350 | Ast_Arg_Node_351 | Ast_Arg_Node_352 | Ast_Arg_Node_353 | Ast_Arg_Node_354 | Ast_Arg_Node_355 | Ast_Arg_Node_356 | Ast_Arg_Node_357 | Ast_Arg_Node_358 | Ast_Arg_Node_359 | Ast_Arg_Node_360 | Ast_Arg_Node_361 | Ast_Arg_Node_362 | Ast_Arg_Node_363 | Ast_Arg_Node_364 | Ast_Arg_Node_365 | Ast_Arg_Node_366 | Ast_Arg_Node_367 | Ast_Arg_Node_368 | Ast_Arg_Node_369 | Ast_Arg_Node_370 | Ast_Arg_Node_371 | Ast_Arg_Node_372 | Ast_Arg_Node_373 | Ast_Arg_Node_374 | Ast_Arg_Node_375 | Ast_Arg_Node_376 | Ast_Arg_Node_377 | Ast_Arg_Node_378 | Ast_Arg_Node_379 | Ast_Arg_Node_380 | Ast_Arg_Node_381 | Ast_Arg_Node_382 | Ast_Arg_Node_383 | Ast_Arg_Node_384 | Ast_Arg_Node_385 | Ast_Arg_Node_386 | Ast_Arg_Node_387 | Ast_Arg_Node_388 | Ast_Arg_Node_389 | Ast_Arg_Node_390 | Ast_Arg_Node_391 | Ast_Arg_Node_392 | Ast_Arg_Node_393 | Ast_Arg_Node_394 | Ast_Arg_Node_395 | Ast_Arg_Node_396 | Ast_Arg_Node_397 | Ast_Arg_Node_398 | Ast_Arg_Node_399 | Ast_Arg_Node_400;
          }
export type Ast_OPTIONAL_Node = Ast_OPTIONAL_Node_;
interface Ast_Arg_Node_337_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_337 = Ast_Arg_Node_337_;
interface Ast_Arg_Node_338_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_338 = Ast_Arg_Node_338_;
interface Ast_Arg_Node_339_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_339 = Ast_Arg_Node_339_;
interface Ast_Arg_Node_340_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_340 = Ast_Arg_Node_340_;
interface Ast_Arg_Node_341_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_341 = Ast_Arg_Node_341_;
interface Ast_Arg_Node_342_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_342 = Ast_Arg_Node_342_;
interface Ast_Arg_Node_343_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_343 = Ast_Arg_Node_343_;
interface Ast_Arg_Node_344_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_344 = Ast_Arg_Node_344_;
interface Ast_Arg_Node_345_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_345 = Ast_Arg_Node_345_;
interface Ast_Arg_Node_346_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_346 = Ast_Arg_Node_346_;
interface Ast_Arg_Node_347_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_347 = Ast_Arg_Node_347_;
interface Ast_Arg_Node_348_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_348 = Ast_Arg_Node_348_;
interface Ast_Arg_Node_349_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_349 = Ast_Arg_Node_349_;
interface Ast_Arg_Node_350_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_350 = Ast_Arg_Node_350_;
interface Ast_Arg_Node_351_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_351 = Ast_Arg_Node_351_;
interface Ast_Arg_Node_352_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_352 = Ast_Arg_Node_352_;
interface Ast_Arg_Node_353_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_353 = Ast_Arg_Node_353_;
interface Ast_Arg_Node_354_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_354 = Ast_Arg_Node_354_;
interface Ast_Arg_Node_355_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_355 = Ast_Arg_Node_355_;
interface Ast_Arg_Node_356_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_356 = Ast_Arg_Node_356_;
interface Ast_Arg_Node_357_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_357 = Ast_Arg_Node_357_;
interface Ast_Arg_Node_358_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_358 = Ast_Arg_Node_358_;
interface Ast_Arg_Node_359_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_359 = Ast_Arg_Node_359_;
interface Ast_Arg_Node_360_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_360 = Ast_Arg_Node_360_;
interface Ast_Arg_Node_361_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_361 = Ast_Arg_Node_361_;
interface Ast_Arg_Node_362_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_362 = Ast_Arg_Node_362_;
interface Ast_Arg_Node_363_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_363 = Ast_Arg_Node_363_;
interface Ast_Arg_Node_364_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_364 = Ast_Arg_Node_364_;
interface Ast_Arg_Node_365_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_365 = Ast_Arg_Node_365_;
interface Ast_Arg_Node_366_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_366 = Ast_Arg_Node_366_;
interface Ast_Arg_Node_367_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_367 = Ast_Arg_Node_367_;
interface Ast_Arg_Node_368_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_368 = Ast_Arg_Node_368_;
interface Ast_Arg_Node_369_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_369 = Ast_Arg_Node_369_;
interface Ast_Arg_Node_370_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_370 = Ast_Arg_Node_370_;
interface Ast_Arg_Node_371_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_371 = Ast_Arg_Node_371_;
interface Ast_Arg_Node_372_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_372 = Ast_Arg_Node_372_;
interface Ast_Arg_Node_373_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_373 = Ast_Arg_Node_373_;
interface Ast_Arg_Node_374_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_374 = Ast_Arg_Node_374_;
interface Ast_Arg_Node_375_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_375 = Ast_Arg_Node_375_;
interface Ast_Arg_Node_376_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_376 = Ast_Arg_Node_376_;
interface Ast_Arg_Node_377_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_377 = Ast_Arg_Node_377_;
interface Ast_Arg_Node_378_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_378 = Ast_Arg_Node_378_;
interface Ast_Arg_Node_379_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_379 = Ast_Arg_Node_379_;
interface Ast_Arg_Node_380_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_380 = Ast_Arg_Node_380_;
interface Ast_Arg_Node_381_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_381 = Ast_Arg_Node_381_;
interface Ast_Arg_Node_382_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_382 = Ast_Arg_Node_382_;
interface Ast_Arg_Node_383_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_383 = Ast_Arg_Node_383_;
interface Ast_Arg_Node_384_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_384 = Ast_Arg_Node_384_;
interface Ast_Arg_Node_385_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_385 = Ast_Arg_Node_385_;
interface Ast_Arg_Node_386_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_386 = Ast_Arg_Node_386_;
interface Ast_Arg_Node_387_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_387 = Ast_Arg_Node_387_;
interface Ast_Arg_Node_388_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_388 = Ast_Arg_Node_388_;
interface Ast_Arg_Node_389_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_389 = Ast_Arg_Node_389_;
interface Ast_Arg_Node_390_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_390 = Ast_Arg_Node_390_;
interface Ast_Arg_Node_391_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_391 = Ast_Arg_Node_391_;
interface Ast_Arg_Node_392_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_392 = Ast_Arg_Node_392_;
interface Ast_Arg_Node_393_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_393 = Ast_Arg_Node_393_;
interface Ast_Arg_Node_394_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_394 = Ast_Arg_Node_394_;
interface Ast_Arg_Node_395_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_395 = Ast_Arg_Node_395_;
interface Ast_Arg_Node_396_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_396 = Ast_Arg_Node_396_;
interface Ast_Arg_Node_397_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_397 = Ast_Arg_Node_397_;
interface Ast_Arg_Node_398_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_398 = Ast_Arg_Node_398_;
interface Ast_Arg_Node_399_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_399 = Ast_Arg_Node_399_;
interface Ast_Arg_Node_400_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_400 = Ast_Arg_Node_400_;
interface Ast_Arg_Node_401_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_401 = Ast_Arg_Node_401_;
interface Ast_Arg_Node_402_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_402 = Ast_Arg_Node_402_;
interface Ast_Arg_Node_403_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_403 = Ast_Arg_Node_403_;
interface Ast_Arg_Node_404_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_404 = Ast_Arg_Node_404_;
interface Ast_Arg_Node_405_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_405 = Ast_Arg_Node_405_;
interface Ast_Arg_Node_406_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_406 = Ast_Arg_Node_406_;
interface Ast_Arg_Node_407_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_407 = Ast_Arg_Node_407_;
interface Ast_Arg_Node_408_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_408 = Ast_Arg_Node_408_;
interface Ast_Arg_Node_409_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_409 = Ast_Arg_Node_409_;
interface Ast_Arg_Node_410_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_410 = Ast_Arg_Node_410_;
interface Ast_Arg_Node_411_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_411 = Ast_Arg_Node_411_;
interface Ast_Arg_Node_412_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_412 = Ast_Arg_Node_412_;
interface Ast_Arg_Node_413_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_413 = Ast_Arg_Node_413_;
interface Ast_Arg_Node_414_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_414 = Ast_Arg_Node_414_;
interface Ast_Arg_Node_415_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_415 = Ast_Arg_Node_415_;
interface Ast_Arg_Node_416_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_416 = Ast_Arg_Node_416_;
interface Ast_Arg_Node_417_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_417 = Ast_Arg_Node_417_;
interface Ast_Arg_Node_418_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_418 = Ast_Arg_Node_418_;
interface Ast_Arg_Node_419_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_419 = Ast_Arg_Node_419_;
interface Ast_Arg_Node_420_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_420 = Ast_Arg_Node_420_;
interface Ast_Arg_Node_421_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_421 = Ast_Arg_Node_421_;
interface Ast_Arg_Node_422_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_422 = Ast_Arg_Node_422_;
interface Ast_Arg_Node_423_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_423 = Ast_Arg_Node_423_;
interface Ast_Arg_Node_424_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_424 = Ast_Arg_Node_424_;
interface Ast_Arg_Node_425_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_425 = Ast_Arg_Node_425_;
interface Ast_Arg_Node_426_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_426 = Ast_Arg_Node_426_;
interface Ast_Arg_Node_427_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_427 = Ast_Arg_Node_427_;
interface Ast_Arg_Node_428_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_428 = Ast_Arg_Node_428_;
interface Ast_Arg_Node_429_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_429 = Ast_Arg_Node_429_;
interface Ast_Arg_Node_430_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_430 = Ast_Arg_Node_430_;
interface Ast_Arg_Node_431_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_431 = Ast_Arg_Node_431_;
interface Ast_Arg_Node_432_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_60_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_432 = Ast_Arg_Node_432_;
interface Ast_Arg_Node_433_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_433 = Ast_Arg_Node_433_;
interface Ast_Arg_Node_434_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_434 = Ast_Arg_Node_434_;
interface Ast_Arg_Node_435_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_435 = Ast_Arg_Node_435_;
interface Ast_Arg_Node_436_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_436 = Ast_Arg_Node_436_;
interface Ast_Arg_Node_437_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_437 = Ast_Arg_Node_437_;
interface Ast_Arg_Node_438_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_438 = Ast_Arg_Node_438_;
interface Ast_Arg_Node_439_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_439 = Ast_Arg_Node_439_;
interface Ast_Arg_Node_440_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_440 = Ast_Arg_Node_440_;
interface Ast_Arg_Node_441_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_441 = Ast_Arg_Node_441_;
interface Ast_Arg_Node_442_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_442 = Ast_Arg_Node_442_;
interface Ast_Arg_Node_443_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_443 = Ast_Arg_Node_443_;
interface Ast_Arg_Node_444_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_444 = Ast_Arg_Node_444_;
interface Ast_Arg_Node_445_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_445 = Ast_Arg_Node_445_;
interface Ast_Arg_Node_446_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_446 = Ast_Arg_Node_446_;
interface Ast_Arg_Node_447_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_447 = Ast_Arg_Node_447_;
interface Ast_Arg_Node_448_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_448 = Ast_Arg_Node_448_;
interface Ast_Arg_Node_449_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_449 = Ast_Arg_Node_449_;
interface Ast_Arg_Node_450_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_450 = Ast_Arg_Node_450_;
interface Ast_Arg_Node_451_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_451 = Ast_Arg_Node_451_;
interface Ast_Arg_Node_452_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_62_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_452 = Ast_Arg_Node_452_;
interface Ast_Arg_Node_453_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_453 = Ast_Arg_Node_453_;
interface Ast_Arg_Node_454_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_454 = Ast_Arg_Node_454_;
interface Ast_Arg_Node_455_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_455 = Ast_Arg_Node_455_;
interface Ast_Arg_Node_456_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_456 = Ast_Arg_Node_456_;
interface Ast_Arg_Node_457_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_457 = Ast_Arg_Node_457_;
interface Ast_Arg_Node_458_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_458 = Ast_Arg_Node_458_;
interface Ast_Arg_Node_459_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_459 = Ast_Arg_Node_459_;
interface Ast_Arg_Node_460_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_AmbiguousIdentifier_Node,...Ast_Arg_group_def_62_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_460 = Ast_Arg_Node_460_;
interface Ast_Arg_Node_461_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_461 = Ast_Arg_Node_461_;
interface Ast_Arg_Node_462_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_462 = Ast_Arg_Node_462_;
interface Ast_Arg_Node_463_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_463 = Ast_Arg_Node_463_;
interface Ast_Arg_Node_464_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_AmbiguousIdentifier_Node];
        parent:Ast_ArgList_group_def_48_Parent_Node | Ast_ArgList_group_def_49_Parent_Node;
      }
type Ast_Arg_Node_464 = Ast_Arg_Node_464_;
interface Ast_ArgDefaultValue_Node_ extends BaseSymbolNode {
        symbol:"argDefaultValue";
        
        children:[Ast_EQ_Node,Ast_ValueStmt_Node];
        parent:Ast_Arg_Node_337 | Ast_Arg_Node_339 | Ast_Arg_Node_341 | Ast_Arg_Node_343 | Ast_Arg_Node_345 | Ast_Arg_Node_347 | Ast_Arg_Node_349 | Ast_Arg_Node_351 | Ast_Arg_Node_353 | Ast_Arg_Node_355 | Ast_Arg_Node_357 | Ast_Arg_Node_359 | Ast_Arg_Node_361 | Ast_Arg_Node_363 | Ast_Arg_Node_365 | Ast_Arg_Node_367 | Ast_Arg_Node_369 | Ast_Arg_Node_371 | Ast_Arg_Node_373 | Ast_Arg_Node_375 | Ast_Arg_Node_377 | Ast_Arg_Node_379 | Ast_Arg_Node_381 | Ast_Arg_Node_383 | Ast_Arg_Node_385 | Ast_Arg_Node_387 | Ast_Arg_Node_389 | Ast_Arg_Node_391 | Ast_Arg_Node_393 | Ast_Arg_Node_395 | Ast_Arg_Node_397 | Ast_Arg_Node_399 | Ast_Arg_Node_401 | Ast_Arg_Node_403 | Ast_Arg_Node_405 | Ast_Arg_Node_407 | Ast_Arg_Node_409 | Ast_Arg_Node_411 | Ast_Arg_Node_413 | Ast_Arg_Node_415 | Ast_Arg_Node_417 | Ast_Arg_Node_419 | Ast_Arg_Node_421 | Ast_Arg_Node_423 | Ast_Arg_Node_425 | Ast_Arg_Node_427 | Ast_Arg_Node_429 | Ast_Arg_Node_431 | Ast_Arg_Node_433 | Ast_Arg_Node_435 | Ast_Arg_Node_437 | Ast_Arg_Node_439 | Ast_Arg_Node_441 | Ast_Arg_Node_443 | Ast_Arg_Node_445 | Ast_Arg_Node_447 | Ast_Arg_Node_449 | Ast_Arg_Node_451 | Ast_Arg_Node_453 | Ast_Arg_Node_455 | Ast_Arg_Node_457 | Ast_Arg_Node_459 | Ast_Arg_Node_461 | Ast_Arg_Node_463;
      }
type Ast_ArgDefaultValue_Node = Ast_ArgDefaultValue_Node_;
interface Ast_AS_Node_ extends BaseTokenNode {
            token:"AS";
            parent:Ast_AsTypeClause_Node_466 | Ast_AsTypeClause_Node_467 | Ast_AsTypeClause_Node_468 | Ast_AsTypeClause_Node_469;
          }
export type Ast_AS_Node = Ast_AS_Node_;
interface Ast_AsTypeClause_Node_466_ extends BaseSymbolNode {
        symbol:"asTypeClause";
        
        children:[Ast_AS_Node,Ast_NEW_Node,Ast_Type__Node,Ast_FieldLength_Node];
        parent:Ast_PropertyGetStmt_Node_48 | Ast_PropertyGetStmt_Node_49 | Ast_PropertyGetStmt_Node_52 | Ast_PropertyGetStmt_Node_53 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_69 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_FunctionStmt_Node_112 | Ast_FunctionStmt_Node_113 | Ast_FunctionStmt_Node_116 | Ast_FunctionStmt_Node_117 | Ast_FunctionStmt_Node_120 | Ast_FunctionStmt_Node_121 | Ast_FunctionStmt_Node_124 | Ast_FunctionStmt_Node_125 | Ast_FunctionStmt_Node_128 | Ast_FunctionStmt_Node_129 | Ast_FunctionStmt_Node_132 | Ast_FunctionStmt_Node_133 | Ast_FunctionStmt_Node_136 | Ast_FunctionStmt_Node_137 | Ast_FunctionStmt_Node_140 | Ast_FunctionStmt_Node_141 | Ast_FunctionStmt_Node_144 | Ast_FunctionStmt_Node_145 | Ast_FunctionStmt_Node_148 | Ast_FunctionStmt_Node_149 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_RedimSubStmt_Node_191 | Ast_VariableSubStmt_Node_267 | Ast_VariableSubStmt_Node_269 | Ast_VariableSubStmt_Node_271 | Ast_VariableSubStmt_Node_273 | Ast_Arg_Node_337 | Ast_Arg_Node_338 | Ast_Arg_Node_341 | Ast_Arg_Node_342 | Ast_Arg_Node_345 | Ast_Arg_Node_346 | Ast_Arg_Node_349 | Ast_Arg_Node_350 | Ast_Arg_Node_353 | Ast_Arg_Node_354 | Ast_Arg_Node_357 | Ast_Arg_Node_358 | Ast_Arg_Node_361 | Ast_Arg_Node_362 | Ast_Arg_Node_365 | Ast_Arg_Node_366 | Ast_Arg_Node_369 | Ast_Arg_Node_370 | Ast_Arg_Node_373 | Ast_Arg_Node_374 | Ast_Arg_Node_377 | Ast_Arg_Node_378 | Ast_Arg_Node_381 | Ast_Arg_Node_382 | Ast_Arg_Node_385 | Ast_Arg_Node_386 | Ast_Arg_Node_389 | Ast_Arg_Node_390 | Ast_Arg_Node_393 | Ast_Arg_Node_394 | Ast_Arg_Node_397 | Ast_Arg_Node_398 | Ast_Arg_Node_401 | Ast_Arg_Node_402 | Ast_Arg_Node_405 | Ast_Arg_Node_406 | Ast_Arg_Node_409 | Ast_Arg_Node_410 | Ast_Arg_Node_413 | Ast_Arg_Node_414 | Ast_Arg_Node_417 | Ast_Arg_Node_418 | Ast_Arg_Node_421 | Ast_Arg_Node_422 | Ast_Arg_Node_425 | Ast_Arg_Node_426 | Ast_Arg_Node_429 | Ast_Arg_Node_430 | Ast_Arg_Node_433 | Ast_Arg_Node_434 | Ast_Arg_Node_437 | Ast_Arg_Node_438 | Ast_Arg_Node_441 | Ast_Arg_Node_442 | Ast_Arg_Node_445 | Ast_Arg_Node_446 | Ast_Arg_Node_449 | Ast_Arg_Node_450 | Ast_Arg_Node_453 | Ast_Arg_Node_454 | Ast_Arg_Node_457 | Ast_Arg_Node_458 | Ast_Arg_Node_461 | Ast_Arg_Node_462;
      }
type Ast_AsTypeClause_Node_466 = Ast_AsTypeClause_Node_466_;
interface Ast_AsTypeClause_Node_467_ extends BaseSymbolNode {
        symbol:"asTypeClause";
        
        children:[Ast_AS_Node,Ast_NEW_Node,Ast_Type__Node];
        parent:Ast_PropertyGetStmt_Node_48 | Ast_PropertyGetStmt_Node_49 | Ast_PropertyGetStmt_Node_52 | Ast_PropertyGetStmt_Node_53 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_69 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_FunctionStmt_Node_112 | Ast_FunctionStmt_Node_113 | Ast_FunctionStmt_Node_116 | Ast_FunctionStmt_Node_117 | Ast_FunctionStmt_Node_120 | Ast_FunctionStmt_Node_121 | Ast_FunctionStmt_Node_124 | Ast_FunctionStmt_Node_125 | Ast_FunctionStmt_Node_128 | Ast_FunctionStmt_Node_129 | Ast_FunctionStmt_Node_132 | Ast_FunctionStmt_Node_133 | Ast_FunctionStmt_Node_136 | Ast_FunctionStmt_Node_137 | Ast_FunctionStmt_Node_140 | Ast_FunctionStmt_Node_141 | Ast_FunctionStmt_Node_144 | Ast_FunctionStmt_Node_145 | Ast_FunctionStmt_Node_148 | Ast_FunctionStmt_Node_149 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_RedimSubStmt_Node_191 | Ast_VariableSubStmt_Node_267 | Ast_VariableSubStmt_Node_269 | Ast_VariableSubStmt_Node_271 | Ast_VariableSubStmt_Node_273 | Ast_Arg_Node_337 | Ast_Arg_Node_338 | Ast_Arg_Node_341 | Ast_Arg_Node_342 | Ast_Arg_Node_345 | Ast_Arg_Node_346 | Ast_Arg_Node_349 | Ast_Arg_Node_350 | Ast_Arg_Node_353 | Ast_Arg_Node_354 | Ast_Arg_Node_357 | Ast_Arg_Node_358 | Ast_Arg_Node_361 | Ast_Arg_Node_362 | Ast_Arg_Node_365 | Ast_Arg_Node_366 | Ast_Arg_Node_369 | Ast_Arg_Node_370 | Ast_Arg_Node_373 | Ast_Arg_Node_374 | Ast_Arg_Node_377 | Ast_Arg_Node_378 | Ast_Arg_Node_381 | Ast_Arg_Node_382 | Ast_Arg_Node_385 | Ast_Arg_Node_386 | Ast_Arg_Node_389 | Ast_Arg_Node_390 | Ast_Arg_Node_393 | Ast_Arg_Node_394 | Ast_Arg_Node_397 | Ast_Arg_Node_398 | Ast_Arg_Node_401 | Ast_Arg_Node_402 | Ast_Arg_Node_405 | Ast_Arg_Node_406 | Ast_Arg_Node_409 | Ast_Arg_Node_410 | Ast_Arg_Node_413 | Ast_Arg_Node_414 | Ast_Arg_Node_417 | Ast_Arg_Node_418 | Ast_Arg_Node_421 | Ast_Arg_Node_422 | Ast_Arg_Node_425 | Ast_Arg_Node_426 | Ast_Arg_Node_429 | Ast_Arg_Node_430 | Ast_Arg_Node_433 | Ast_Arg_Node_434 | Ast_Arg_Node_437 | Ast_Arg_Node_438 | Ast_Arg_Node_441 | Ast_Arg_Node_442 | Ast_Arg_Node_445 | Ast_Arg_Node_446 | Ast_Arg_Node_449 | Ast_Arg_Node_450 | Ast_Arg_Node_453 | Ast_Arg_Node_454 | Ast_Arg_Node_457 | Ast_Arg_Node_458 | Ast_Arg_Node_461 | Ast_Arg_Node_462;
      }
type Ast_AsTypeClause_Node_467 = Ast_AsTypeClause_Node_467_;
interface Ast_AsTypeClause_Node_468_ extends BaseSymbolNode {
        symbol:"asTypeClause";
        
        children:[Ast_AS_Node,Ast_Type__Node,Ast_FieldLength_Node];
        parent:Ast_PropertyGetStmt_Node_48 | Ast_PropertyGetStmt_Node_49 | Ast_PropertyGetStmt_Node_52 | Ast_PropertyGetStmt_Node_53 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_69 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_FunctionStmt_Node_112 | Ast_FunctionStmt_Node_113 | Ast_FunctionStmt_Node_116 | Ast_FunctionStmt_Node_117 | Ast_FunctionStmt_Node_120 | Ast_FunctionStmt_Node_121 | Ast_FunctionStmt_Node_124 | Ast_FunctionStmt_Node_125 | Ast_FunctionStmt_Node_128 | Ast_FunctionStmt_Node_129 | Ast_FunctionStmt_Node_132 | Ast_FunctionStmt_Node_133 | Ast_FunctionStmt_Node_136 | Ast_FunctionStmt_Node_137 | Ast_FunctionStmt_Node_140 | Ast_FunctionStmt_Node_141 | Ast_FunctionStmt_Node_144 | Ast_FunctionStmt_Node_145 | Ast_FunctionStmt_Node_148 | Ast_FunctionStmt_Node_149 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_RedimSubStmt_Node_191 | Ast_VariableSubStmt_Node_267 | Ast_VariableSubStmt_Node_269 | Ast_VariableSubStmt_Node_271 | Ast_VariableSubStmt_Node_273 | Ast_Arg_Node_337 | Ast_Arg_Node_338 | Ast_Arg_Node_341 | Ast_Arg_Node_342 | Ast_Arg_Node_345 | Ast_Arg_Node_346 | Ast_Arg_Node_349 | Ast_Arg_Node_350 | Ast_Arg_Node_353 | Ast_Arg_Node_354 | Ast_Arg_Node_357 | Ast_Arg_Node_358 | Ast_Arg_Node_361 | Ast_Arg_Node_362 | Ast_Arg_Node_365 | Ast_Arg_Node_366 | Ast_Arg_Node_369 | Ast_Arg_Node_370 | Ast_Arg_Node_373 | Ast_Arg_Node_374 | Ast_Arg_Node_377 | Ast_Arg_Node_378 | Ast_Arg_Node_381 | Ast_Arg_Node_382 | Ast_Arg_Node_385 | Ast_Arg_Node_386 | Ast_Arg_Node_389 | Ast_Arg_Node_390 | Ast_Arg_Node_393 | Ast_Arg_Node_394 | Ast_Arg_Node_397 | Ast_Arg_Node_398 | Ast_Arg_Node_401 | Ast_Arg_Node_402 | Ast_Arg_Node_405 | Ast_Arg_Node_406 | Ast_Arg_Node_409 | Ast_Arg_Node_410 | Ast_Arg_Node_413 | Ast_Arg_Node_414 | Ast_Arg_Node_417 | Ast_Arg_Node_418 | Ast_Arg_Node_421 | Ast_Arg_Node_422 | Ast_Arg_Node_425 | Ast_Arg_Node_426 | Ast_Arg_Node_429 | Ast_Arg_Node_430 | Ast_Arg_Node_433 | Ast_Arg_Node_434 | Ast_Arg_Node_437 | Ast_Arg_Node_438 | Ast_Arg_Node_441 | Ast_Arg_Node_442 | Ast_Arg_Node_445 | Ast_Arg_Node_446 | Ast_Arg_Node_449 | Ast_Arg_Node_450 | Ast_Arg_Node_453 | Ast_Arg_Node_454 | Ast_Arg_Node_457 | Ast_Arg_Node_458 | Ast_Arg_Node_461 | Ast_Arg_Node_462;
      }
type Ast_AsTypeClause_Node_468 = Ast_AsTypeClause_Node_468_;
interface Ast_AsTypeClause_Node_469_ extends BaseSymbolNode {
        symbol:"asTypeClause";
        
        children:[Ast_AS_Node,Ast_Type__Node];
        parent:Ast_PropertyGetStmt_Node_48 | Ast_PropertyGetStmt_Node_49 | Ast_PropertyGetStmt_Node_52 | Ast_PropertyGetStmt_Node_53 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_69 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_FunctionStmt_Node_112 | Ast_FunctionStmt_Node_113 | Ast_FunctionStmt_Node_116 | Ast_FunctionStmt_Node_117 | Ast_FunctionStmt_Node_120 | Ast_FunctionStmt_Node_121 | Ast_FunctionStmt_Node_124 | Ast_FunctionStmt_Node_125 | Ast_FunctionStmt_Node_128 | Ast_FunctionStmt_Node_129 | Ast_FunctionStmt_Node_132 | Ast_FunctionStmt_Node_133 | Ast_FunctionStmt_Node_136 | Ast_FunctionStmt_Node_137 | Ast_FunctionStmt_Node_140 | Ast_FunctionStmt_Node_141 | Ast_FunctionStmt_Node_144 | Ast_FunctionStmt_Node_145 | Ast_FunctionStmt_Node_148 | Ast_FunctionStmt_Node_149 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_RedimSubStmt_Node_191 | Ast_VariableSubStmt_Node_267 | Ast_VariableSubStmt_Node_269 | Ast_VariableSubStmt_Node_271 | Ast_VariableSubStmt_Node_273 | Ast_Arg_Node_337 | Ast_Arg_Node_338 | Ast_Arg_Node_341 | Ast_Arg_Node_342 | Ast_Arg_Node_345 | Ast_Arg_Node_346 | Ast_Arg_Node_349 | Ast_Arg_Node_350 | Ast_Arg_Node_353 | Ast_Arg_Node_354 | Ast_Arg_Node_357 | Ast_Arg_Node_358 | Ast_Arg_Node_361 | Ast_Arg_Node_362 | Ast_Arg_Node_365 | Ast_Arg_Node_366 | Ast_Arg_Node_369 | Ast_Arg_Node_370 | Ast_Arg_Node_373 | Ast_Arg_Node_374 | Ast_Arg_Node_377 | Ast_Arg_Node_378 | Ast_Arg_Node_381 | Ast_Arg_Node_382 | Ast_Arg_Node_385 | Ast_Arg_Node_386 | Ast_Arg_Node_389 | Ast_Arg_Node_390 | Ast_Arg_Node_393 | Ast_Arg_Node_394 | Ast_Arg_Node_397 | Ast_Arg_Node_398 | Ast_Arg_Node_401 | Ast_Arg_Node_402 | Ast_Arg_Node_405 | Ast_Arg_Node_406 | Ast_Arg_Node_409 | Ast_Arg_Node_410 | Ast_Arg_Node_413 | Ast_Arg_Node_414 | Ast_Arg_Node_417 | Ast_Arg_Node_418 | Ast_Arg_Node_421 | Ast_Arg_Node_422 | Ast_Arg_Node_425 | Ast_Arg_Node_426 | Ast_Arg_Node_429 | Ast_Arg_Node_430 | Ast_Arg_Node_433 | Ast_Arg_Node_434 | Ast_Arg_Node_437 | Ast_Arg_Node_438 | Ast_Arg_Node_441 | Ast_Arg_Node_442 | Ast_Arg_Node_445 | Ast_Arg_Node_446 | Ast_Arg_Node_449 | Ast_Arg_Node_450 | Ast_Arg_Node_453 | Ast_Arg_Node_454 | Ast_Arg_Node_457 | Ast_Arg_Node_458 | Ast_Arg_Node_461 | Ast_Arg_Node_462;
      }
type Ast_AsTypeClause_Node_469 = Ast_AsTypeClause_Node_469_;
type Ast_Type__group_def_64_Node  = [Ast_BaseType_Node];
type Ast_Type__group_63_Node_471  = [...Ast_Type__group_def_64_Node];
type Ast_Type__group_def_65_Node  = [Ast_ComplexType_Node];
type Ast_Type__group_63_Node_473  = [...Ast_Type__group_def_65_Node];
interface Ast_Type__Node_474_ extends BaseSymbolNode {
        symbol:"type_";
        
        children:[...Ast_Type__group_63_Node,...Ast_Arg_group_def_62_Node];
        parent:Ast_AsTypeClause_Node_466 | Ast_AsTypeClause_Node_467 | Ast_AsTypeClause_Node_468 | Ast_AsTypeClause_Node_469;
      }
type Ast_Type__Node_474 = Ast_Type__Node_474_;
interface Ast_Type__Node_475_ extends BaseSymbolNode {
        symbol:"type_";
        
        children:[...Ast_Type__group_63_Node];
        parent:Ast_AsTypeClause_Node_466 | Ast_AsTypeClause_Node_467 | Ast_AsTypeClause_Node_468 | Ast_AsTypeClause_Node_469;
      }
type Ast_Type__Node_475 = Ast_Type__Node_475_;
type Ast_ComplexType_group_68_Node_476  = [...Ast_ICS_S_MemberCall_group_def_55_Node];
type Ast_ComplexType_group_68_Node_477  = [...Ast_ICS_S_MemberCall_group_def_56_Node];
type Ast_ComplexType_group_def_69_Node  = [...Ast_ComplexType_group_68_Node,Ast_AmbiguousIdentifier_Node];
interface Ast_ComplexType_Node_ extends BaseSymbolNode {
        symbol:"complexType";
        
        children:[Ast_AmbiguousIdentifier_Node,...ZeroOrMore<Ast_ComplexType_group_def_69_Node>];
        parent:Ast_Type__group_def_65_Parent_Node;
      }
type Ast_ComplexType_Node = Ast_ComplexType_Node_;
interface Ast_BOOLEAN_Node_ extends BaseTokenNode {
            token:"BOOLEAN";
            parent:Ast_BaseType_Node_480;
          }
export type Ast_BOOLEAN_Node = Ast_BOOLEAN_Node_;
interface Ast_BaseType_Node_480_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[Ast_BOOLEAN_Node];
        parent:Ast_Type__group_def_64_Parent_Node;
      }
type Ast_BaseType_Node_480 = Ast_BaseType_Node_480_;
interface Ast_BYTE_Node_ extends BaseTokenNode {
            token:"BYTE";
            parent:Ast_BaseType_Node_481;
          }
export type Ast_BYTE_Node = Ast_BYTE_Node_;
interface Ast_BaseType_Node_481_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[Ast_BYTE_Node];
        parent:Ast_Type__group_def_64_Parent_Node;
      }
type Ast_BaseType_Node_481 = Ast_BaseType_Node_481_;
interface Ast_DOUBLE_Node_ extends BaseTokenNode {
            token:"DOUBLE";
            parent:Ast_BaseType_Node_482;
          }
export type Ast_DOUBLE_Node = Ast_DOUBLE_Node_;
interface Ast_BaseType_Node_482_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[Ast_DOUBLE_Node];
        parent:Ast_Type__group_def_64_Parent_Node;
      }
type Ast_BaseType_Node_482 = Ast_BaseType_Node_482_;
interface Ast_INTEGER_Node_ extends BaseTokenNode {
            token:"INTEGER";
            parent:Ast_BaseType_Node_483;
          }
export type Ast_INTEGER_Node = Ast_INTEGER_Node_;
interface Ast_BaseType_Node_483_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[Ast_INTEGER_Node];
        parent:Ast_Type__group_def_64_Parent_Node;
      }
type Ast_BaseType_Node_483 = Ast_BaseType_Node_483_;
interface Ast_LONG_Node_ extends BaseTokenNode {
            token:"LONG";
            parent:Ast_BaseType_Node_484;
          }
export type Ast_LONG_Node = Ast_LONG_Node_;
interface Ast_BaseType_Node_484_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[Ast_LONG_Node];
        parent:Ast_Type__group_def_64_Parent_Node;
      }
type Ast_BaseType_Node_484 = Ast_BaseType_Node_484_;
interface Ast_SINGLE_Node_ extends BaseTokenNode {
            token:"SINGLE";
            parent:Ast_BaseType_Node_485;
          }
export type Ast_SINGLE_Node = Ast_SINGLE_Node_;
interface Ast_BaseType_Node_485_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[Ast_SINGLE_Node];
        parent:Ast_Type__group_def_64_Parent_Node;
      }
type Ast_BaseType_Node_485 = Ast_BaseType_Node_485_;
interface Ast_VARIANT_Node_ extends BaseTokenNode {
            token:"VARIANT";
            parent:Ast_BaseType_Node_486;
          }
export type Ast_VARIANT_Node = Ast_VARIANT_Node_;
interface Ast_BaseType_Node_486_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[Ast_VARIANT_Node];
        parent:Ast_Type__group_def_64_Parent_Node;
      }
type Ast_BaseType_Node_486 = Ast_BaseType_Node_486_;
interface Ast_MULT_Node_ extends BaseTokenNode {
            token:"MULT";
            parent:Ast_BaseType_group_def_71_Parent_Node | Ast_FieldLength_Node_490 | Ast_FieldLength_Node_491;
          }
export type Ast_MULT_Node = Ast_MULT_Node_;
type Ast_BaseType_group_def_71_Node  = [Ast_MULT_Node,Ast_ValueStmt_Node];
interface Ast_STRING_Node_ extends BaseTokenNode {
            token:"STRING";
            parent:Ast_BaseType_Node_488 | Ast_BaseType_Node_489;
          }
export type Ast_STRING_Node = Ast_STRING_Node_;
interface Ast_BaseType_Node_488_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[Ast_STRING_Node,...Ast_BaseType_group_def_71_Node];
        parent:Ast_Type__group_def_64_Parent_Node;
      }
type Ast_BaseType_Node_488 = Ast_BaseType_Node_488_;
interface Ast_BaseType_Node_489_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[Ast_STRING_Node];
        parent:Ast_Type__group_def_64_Parent_Node;
      }
type Ast_BaseType_Node_489 = Ast_BaseType_Node_489_;
interface Ast_FieldLength_Node_490_ extends BaseSymbolNode {
        symbol:"fieldLength";
        
        children:[Ast_MULT_Node,Ast_INTEGERLITERAL_Node];
        parent:Ast_AsTypeClause_Node_466 | Ast_AsTypeClause_Node_468;
      }
type Ast_FieldLength_Node_490 = Ast_FieldLength_Node_490_;
interface Ast_FieldLength_Node_491_ extends BaseSymbolNode {
        symbol:"fieldLength";
        
        children:[Ast_MULT_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_AsTypeClause_Node_466 | Ast_AsTypeClause_Node_468;
      }
type Ast_FieldLength_Node_491 = Ast_FieldLength_Node_491_;
interface Ast_AmbiguousIdentifier_Node_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_IDENTIFIER_Node];
        parent:Ast_SubStmt_Node_32 | Ast_SubStmt_Node_33 | Ast_SubStmt_Node_34 | Ast_SubStmt_Node_35 | Ast_SubStmt_Node_36 | Ast_SubStmt_Node_37 | Ast_SubStmt_Node_38 | Ast_SubStmt_Node_39 | Ast_SubStmt_Node_40 | Ast_SubStmt_Node_41 | Ast_SubStmt_Node_42 | Ast_SubStmt_Node_43 | Ast_SubStmt_Node_44 | Ast_SubStmt_Node_45 | Ast_SubStmt_Node_46 | Ast_SubStmt_Node_47 | Ast_PropertyGetStmt_Node_48 | Ast_PropertyGetStmt_Node_49 | Ast_PropertyGetStmt_Node_50 | Ast_PropertyGetStmt_Node_51 | Ast_PropertyGetStmt_Node_52 | Ast_PropertyGetStmt_Node_53 | Ast_PropertyGetStmt_Node_54 | Ast_PropertyGetStmt_Node_55 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_69 | Ast_PropertyGetStmt_Node_70 | Ast_PropertyGetStmt_Node_71 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_PropertyGetStmt_Node_78 | Ast_PropertyGetStmt_Node_79 | Ast_PropertySetStmt_Node_80 | Ast_PropertySetStmt_Node_81 | Ast_PropertySetStmt_Node_82 | Ast_PropertySetStmt_Node_83 | Ast_PropertySetStmt_Node_84 | Ast_PropertySetStmt_Node_85 | Ast_PropertySetStmt_Node_86 | Ast_PropertySetStmt_Node_87 | Ast_PropertySetStmt_Node_88 | Ast_PropertySetStmt_Node_89 | Ast_PropertySetStmt_Node_90 | Ast_PropertySetStmt_Node_91 | Ast_PropertySetStmt_Node_92 | Ast_PropertySetStmt_Node_93 | Ast_PropertySetStmt_Node_94 | Ast_PropertySetStmt_Node_95 | Ast_PropertyLetStmt_Node_96 | Ast_PropertyLetStmt_Node_97 | Ast_PropertyLetStmt_Node_98 | Ast_PropertyLetStmt_Node_99 | Ast_PropertyLetStmt_Node_100 | Ast_PropertyLetStmt_Node_101 | Ast_PropertyLetStmt_Node_102 | Ast_PropertyLetStmt_Node_103 | Ast_PropertyLetStmt_Node_104 | Ast_PropertyLetStmt_Node_105 | Ast_PropertyLetStmt_Node_106 | Ast_PropertyLetStmt_Node_107 | Ast_PropertyLetStmt_Node_108 | Ast_PropertyLetStmt_Node_109 | Ast_PropertyLetStmt_Node_110 | Ast_PropertyLetStmt_Node_111 | Ast_FunctionStmt_Node_112 | Ast_FunctionStmt_Node_113 | Ast_FunctionStmt_Node_114 | Ast_FunctionStmt_Node_115 | Ast_FunctionStmt_Node_116 | Ast_FunctionStmt_Node_117 | Ast_FunctionStmt_Node_118 | Ast_FunctionStmt_Node_119 | Ast_FunctionStmt_Node_120 | Ast_FunctionStmt_Node_121 | Ast_FunctionStmt_Node_122 | Ast_FunctionStmt_Node_123 | Ast_FunctionStmt_Node_124 | Ast_FunctionStmt_Node_125 | Ast_FunctionStmt_Node_126 | Ast_FunctionStmt_Node_127 | Ast_FunctionStmt_Node_128 | Ast_FunctionStmt_Node_129 | Ast_FunctionStmt_Node_130 | Ast_FunctionStmt_Node_131 | Ast_FunctionStmt_Node_132 | Ast_FunctionStmt_Node_133 | Ast_FunctionStmt_Node_134 | Ast_FunctionStmt_Node_135 | Ast_FunctionStmt_Node_136 | Ast_FunctionStmt_Node_137 | Ast_FunctionStmt_Node_138 | Ast_FunctionStmt_Node_139 | Ast_FunctionStmt_Node_140 | Ast_FunctionStmt_Node_141 | Ast_FunctionStmt_Node_142 | Ast_FunctionStmt_Node_143 | Ast_FunctionStmt_Node_144 | Ast_FunctionStmt_Node_145 | Ast_FunctionStmt_Node_146 | Ast_FunctionStmt_Node_147 | Ast_FunctionStmt_Node_148 | Ast_FunctionStmt_Node_149 | Ast_FunctionStmt_Node_150 | Ast_FunctionStmt_Node_151 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_158 | Ast_FunctionStmt_Node_159 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_166 | Ast_FunctionStmt_Node_167 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_171 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_FunctionStmt_Node_174 | Ast_FunctionStmt_Node_175 | Ast_ECS_MemberProcedureCall_Node_212 | Ast_ECS_MemberProcedureCall_Node_213 | Ast_ECS_MemberProcedureCall_Node_214 | Ast_ECS_MemberProcedureCall_Node_215 | Ast_ECS_MemberProcedureCall_Node_216 | Ast_ECS_MemberProcedureCall_Node_217 | Ast_ECS_MemberProcedureCall_Node_218 | Ast_ECS_MemberProcedureCall_Node_219 | Ast_ECS_ProcedureCall_Node_220 | Ast_ECS_ProcedureCall_Node_221 | Ast_ECS_ProcedureCall_Node_222 | Ast_ECS_ProcedureCall_Node_223 | Ast_ICS_B_MemberProcedureCall_Node_226 | Ast_ICS_B_MemberProcedureCall_Node_227 | Ast_ICS_B_MemberProcedureCall_Node_228 | Ast_ICS_B_MemberProcedureCall_Node_229 | Ast_ICS_B_MemberProcedureCall_Node_230 | Ast_ICS_B_MemberProcedureCall_Node_231 | Ast_ICS_B_MemberProcedureCall_Node_232 | Ast_ICS_B_MemberProcedureCall_Node_233 | Ast_ICS_B_ProcedureCall_Node_234 | Ast_ICS_B_ProcedureCall_Node_235 | Ast_ICS_B_ProcedureCall_Node_236 | Ast_ICS_B_ProcedureCall_Node_237 | Ast_VariableSubStmt_Node_267 | Ast_VariableSubStmt_Node_268 | Ast_VariableSubStmt_Node_269 | Ast_VariableSubStmt_Node_270 | Ast_VariableSubStmt_Node_271 | Ast_VariableSubStmt_Node_272 | Ast_VariableSubStmt_Node_273 | Ast_VariableSubStmt_Node_274 | Ast_ICS_S_ProcedureOrArrayCall_Node_308 | Ast_ICS_S_ProcedureOrArrayCall_Node_309 | Ast_ICS_S_ProcedureOrArrayCall_Node_310 | Ast_ICS_S_ProcedureOrArrayCall_Node_311 | Ast_ICS_S_ProcedureOrArrayCall_Node_312 | Ast_ICS_S_ProcedureOrArrayCall_Node_313 | Ast_ICS_S_ProcedureOrArrayCall_Node_314 | Ast_ICS_S_ProcedureOrArrayCall_Node_315 | Ast_ICS_S_VariableOrProcedureCall_Node_316 | Ast_ICS_S_VariableOrProcedureCall_Node_317 | Ast_ICS_S_VariableOrProcedureCall_Node_318 | Ast_ICS_S_VariableOrProcedureCall_Node_319 | Ast_DictionaryCallStmt_Node_320 | Ast_DictionaryCallStmt_Node_321 | Ast_Arg_Node_337 | Ast_Arg_Node_338 | Ast_Arg_Node_339 | Ast_Arg_Node_340 | Ast_Arg_Node_341 | Ast_Arg_Node_342 | Ast_Arg_Node_343 | Ast_Arg_Node_344 | Ast_Arg_Node_345 | Ast_Arg_Node_346 | Ast_Arg_Node_347 | Ast_Arg_Node_348 | Ast_Arg_Node_349 | Ast_Arg_Node_350 | Ast_Arg_Node_351 | Ast_Arg_Node_352 | Ast_Arg_Node_353 | Ast_Arg_Node_354 | Ast_Arg_Node_355 | Ast_Arg_Node_356 | Ast_Arg_Node_357 | Ast_Arg_Node_358 | Ast_Arg_Node_359 | Ast_Arg_Node_360 | Ast_Arg_Node_361 | Ast_Arg_Node_362 | Ast_Arg_Node_363 | Ast_Arg_Node_364 | Ast_Arg_Node_365 | Ast_Arg_Node_366 | Ast_Arg_Node_367 | Ast_Arg_Node_368 | Ast_Arg_Node_369 | Ast_Arg_Node_370 | Ast_Arg_Node_371 | Ast_Arg_Node_372 | Ast_Arg_Node_373 | Ast_Arg_Node_374 | Ast_Arg_Node_375 | Ast_Arg_Node_376 | Ast_Arg_Node_377 | Ast_Arg_Node_378 | Ast_Arg_Node_379 | Ast_Arg_Node_380 | Ast_Arg_Node_381 | Ast_Arg_Node_382 | Ast_Arg_Node_383 | Ast_Arg_Node_384 | Ast_Arg_Node_385 | Ast_Arg_Node_386 | Ast_Arg_Node_387 | Ast_Arg_Node_388 | Ast_Arg_Node_389 | Ast_Arg_Node_390 | Ast_Arg_Node_391 | Ast_Arg_Node_392 | Ast_Arg_Node_393 | Ast_Arg_Node_394 | Ast_Arg_Node_395 | Ast_Arg_Node_396 | Ast_Arg_Node_397 | Ast_Arg_Node_398 | Ast_Arg_Node_399 | Ast_Arg_Node_400 | Ast_Arg_Node_401 | Ast_Arg_Node_402 | Ast_Arg_Node_403 | Ast_Arg_Node_404 | Ast_Arg_Node_405 | Ast_Arg_Node_406 | Ast_Arg_Node_407 | Ast_Arg_Node_408 | Ast_Arg_Node_409 | Ast_Arg_Node_410 | Ast_Arg_Node_411 | Ast_Arg_Node_412 | Ast_Arg_Node_413 | Ast_Arg_Node_414 | Ast_Arg_Node_415 | Ast_Arg_Node_416 | Ast_Arg_Node_417 | Ast_Arg_Node_418 | Ast_Arg_Node_419 | Ast_Arg_Node_420 | Ast_Arg_Node_421 | Ast_Arg_Node_422 | Ast_Arg_Node_423 | Ast_Arg_Node_424 | Ast_Arg_Node_425 | Ast_Arg_Node_426 | Ast_Arg_Node_427 | Ast_Arg_Node_428 | Ast_Arg_Node_429 | Ast_Arg_Node_430 | Ast_Arg_Node_431 | Ast_Arg_Node_432 | Ast_Arg_Node_433 | Ast_Arg_Node_434 | Ast_Arg_Node_435 | Ast_Arg_Node_436 | Ast_Arg_Node_437 | Ast_Arg_Node_438 | Ast_Arg_Node_439 | Ast_Arg_Node_440 | Ast_Arg_Node_441 | Ast_Arg_Node_442 | Ast_Arg_Node_443 | Ast_Arg_Node_444 | Ast_Arg_Node_445 | Ast_Arg_Node_446 | Ast_Arg_Node_447 | Ast_Arg_Node_448 | Ast_Arg_Node_449 | Ast_Arg_Node_450 | Ast_Arg_Node_451 | Ast_Arg_Node_452 | Ast_Arg_Node_453 | Ast_Arg_Node_454 | Ast_Arg_Node_455 | Ast_Arg_Node_456 | Ast_Arg_Node_457 | Ast_Arg_Node_458 | Ast_Arg_Node_459 | Ast_Arg_Node_460 | Ast_Arg_Node_461 | Ast_Arg_Node_462 | Ast_Arg_Node_463 | Ast_Arg_Node_464 | Ast_ComplexType_group_def_69_Parent_Node | Ast_ComplexType_Node | Ast_FieldLength_Node_491;
      }
type Ast_AmbiguousIdentifier_Node = Ast_AmbiguousIdentifier_Node_;
export type Ast_Progam_Node = Ast_Progam_Node_0 | Ast_Progam_Node_1 | Ast_Progam_Node_2 | Ast_Progam_Node_3;
export type Ast_EndOfLine_Node = Ast_EndOfLine_Node_4 | Ast_EndOfLine_Node_5 | Ast_EndOfLine_Node_6;
type Ast_EndOfStatement_group_1_Node = Ast_EndOfStatement_group_1_Node_8 | Ast_EndOfStatement_group_1_Node_10;
export type { Ast_EndOfStatement_Node };
export type { Ast_ModuleDeclarations_Node };
export type Ast_ModuleDeclarationsElement_Node = Ast_ModuleDeclarationsElement_Node_14 | Ast_ModuleDeclarationsElement_Node_15 | Ast_ModuleDeclarationsElement_Node_16;
export type Ast_ModuleOption_Node = Ast_ModuleOption_Node_17 | Ast_ModuleOption_Node_18 | Ast_ModuleOption_Node_19 | Ast_ModuleOption_Node_20;
export type { Ast_ModuleBody_Node };
export type Ast_ModuleBodyElement_Node = Ast_ModuleBodyElement_Node_23 | Ast_ModuleBodyElement_Node_24 | Ast_ModuleBodyElement_Node_25 | Ast_ModuleBodyElement_Node_26 | Ast_ModuleBodyElement_Node_27;
export type Ast_Visibility_Node = Ast_Visibility_Node_28 | Ast_Visibility_Node_29 | Ast_Visibility_Node_30 | Ast_Visibility_Node_31;
export type Ast_SubStmt_Node = Ast_SubStmt_Node_32 | Ast_SubStmt_Node_33 | Ast_SubStmt_Node_34 | Ast_SubStmt_Node_35 | Ast_SubStmt_Node_36 | Ast_SubStmt_Node_37 | Ast_SubStmt_Node_38 | Ast_SubStmt_Node_39 | Ast_SubStmt_Node_40 | Ast_SubStmt_Node_41 | Ast_SubStmt_Node_42 | Ast_SubStmt_Node_43 | Ast_SubStmt_Node_44 | Ast_SubStmt_Node_45 | Ast_SubStmt_Node_46 | Ast_SubStmt_Node_47;
export type Ast_PropertyGetStmt_Node = Ast_PropertyGetStmt_Node_48 | Ast_PropertyGetStmt_Node_49 | Ast_PropertyGetStmt_Node_50 | Ast_PropertyGetStmt_Node_51 | Ast_PropertyGetStmt_Node_52 | Ast_PropertyGetStmt_Node_53 | Ast_PropertyGetStmt_Node_54 | Ast_PropertyGetStmt_Node_55 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_69 | Ast_PropertyGetStmt_Node_70 | Ast_PropertyGetStmt_Node_71 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_PropertyGetStmt_Node_78 | Ast_PropertyGetStmt_Node_79;
export type Ast_PropertySetStmt_Node = Ast_PropertySetStmt_Node_80 | Ast_PropertySetStmt_Node_81 | Ast_PropertySetStmt_Node_82 | Ast_PropertySetStmt_Node_83 | Ast_PropertySetStmt_Node_84 | Ast_PropertySetStmt_Node_85 | Ast_PropertySetStmt_Node_86 | Ast_PropertySetStmt_Node_87 | Ast_PropertySetStmt_Node_88 | Ast_PropertySetStmt_Node_89 | Ast_PropertySetStmt_Node_90 | Ast_PropertySetStmt_Node_91 | Ast_PropertySetStmt_Node_92 | Ast_PropertySetStmt_Node_93 | Ast_PropertySetStmt_Node_94 | Ast_PropertySetStmt_Node_95;
export type Ast_PropertyLetStmt_Node = Ast_PropertyLetStmt_Node_96 | Ast_PropertyLetStmt_Node_97 | Ast_PropertyLetStmt_Node_98 | Ast_PropertyLetStmt_Node_99 | Ast_PropertyLetStmt_Node_100 | Ast_PropertyLetStmt_Node_101 | Ast_PropertyLetStmt_Node_102 | Ast_PropertyLetStmt_Node_103 | Ast_PropertyLetStmt_Node_104 | Ast_PropertyLetStmt_Node_105 | Ast_PropertyLetStmt_Node_106 | Ast_PropertyLetStmt_Node_107 | Ast_PropertyLetStmt_Node_108 | Ast_PropertyLetStmt_Node_109 | Ast_PropertyLetStmt_Node_110 | Ast_PropertyLetStmt_Node_111;
export type Ast_FunctionStmt_Node = Ast_FunctionStmt_Node_112 | Ast_FunctionStmt_Node_113 | Ast_FunctionStmt_Node_114 | Ast_FunctionStmt_Node_115 | Ast_FunctionStmt_Node_116 | Ast_FunctionStmt_Node_117 | Ast_FunctionStmt_Node_118 | Ast_FunctionStmt_Node_119 | Ast_FunctionStmt_Node_120 | Ast_FunctionStmt_Node_121 | Ast_FunctionStmt_Node_122 | Ast_FunctionStmt_Node_123 | Ast_FunctionStmt_Node_124 | Ast_FunctionStmt_Node_125 | Ast_FunctionStmt_Node_126 | Ast_FunctionStmt_Node_127 | Ast_FunctionStmt_Node_128 | Ast_FunctionStmt_Node_129 | Ast_FunctionStmt_Node_130 | Ast_FunctionStmt_Node_131 | Ast_FunctionStmt_Node_132 | Ast_FunctionStmt_Node_133 | Ast_FunctionStmt_Node_134 | Ast_FunctionStmt_Node_135 | Ast_FunctionStmt_Node_136 | Ast_FunctionStmt_Node_137 | Ast_FunctionStmt_Node_138 | Ast_FunctionStmt_Node_139 | Ast_FunctionStmt_Node_140 | Ast_FunctionStmt_Node_141 | Ast_FunctionStmt_Node_142 | Ast_FunctionStmt_Node_143 | Ast_FunctionStmt_Node_144 | Ast_FunctionStmt_Node_145 | Ast_FunctionStmt_Node_146 | Ast_FunctionStmt_Node_147 | Ast_FunctionStmt_Node_148 | Ast_FunctionStmt_Node_149 | Ast_FunctionStmt_Node_150 | Ast_FunctionStmt_Node_151 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_158 | Ast_FunctionStmt_Node_159 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_166 | Ast_FunctionStmt_Node_167 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_171 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_FunctionStmt_Node_174 | Ast_FunctionStmt_Node_175;
export type { Ast_Block_Node };
export type Ast_BlockStmt_Node = Ast_BlockStmt_Node_178 | Ast_BlockStmt_Node_179 | Ast_BlockStmt_Node_180 | Ast_BlockStmt_Node_181 | Ast_BlockStmt_Node_182 | Ast_BlockStmt_Node_183 | Ast_BlockStmt_Node_184 | Ast_BlockStmt_Node_185;
export type { Ast_EraseStmt_Node };
export type Ast_RedimStmt_Node = Ast_RedimStmt_Node_189 | Ast_RedimStmt_Node_190;
export type Ast_RedimSubStmt_Node = Ast_RedimSubStmt_Node_191 | Ast_RedimSubStmt_Node_192;
export type Ast_ExitStmt_Node = Ast_ExitStmt_Node_193 | Ast_ExitStmt_Node_194 | Ast_ExitStmt_Node_195 | Ast_ExitStmt_Node_196 | Ast_ExitStmt_Node_197 | Ast_ExitStmt_Node_198;
type Ast_LetStmt_group_14_Node = Ast_LetStmt_group_14_Node_200 | Ast_LetStmt_group_14_Node_202 | Ast_LetStmt_group_14_Node_204;
export type Ast_LetStmt_Node = Ast_LetStmt_Node_205 | Ast_LetStmt_Node_206;
export type { Ast_SetStmt_Node };
export type Ast_ExplicitCallStmt_Node = Ast_ExplicitCallStmt_Node_208 | Ast_ExplicitCallStmt_Node_209;
export type Ast_ECS_MemberProcedureCall_Node = Ast_ECS_MemberProcedureCall_Node_212 | Ast_ECS_MemberProcedureCall_Node_213 | Ast_ECS_MemberProcedureCall_Node_214 | Ast_ECS_MemberProcedureCall_Node_215 | Ast_ECS_MemberProcedureCall_Node_216 | Ast_ECS_MemberProcedureCall_Node_217 | Ast_ECS_MemberProcedureCall_Node_218 | Ast_ECS_MemberProcedureCall_Node_219;
export type Ast_ECS_ProcedureCall_Node = Ast_ECS_ProcedureCall_Node_220 | Ast_ECS_ProcedureCall_Node_221 | Ast_ECS_ProcedureCall_Node_222 | Ast_ECS_ProcedureCall_Node_223;
export type Ast_ImplicitCallStmt_InBlock_Node = Ast_ImplicitCallStmt_InBlock_Node_224 | Ast_ImplicitCallStmt_InBlock_Node_225;
export type Ast_ICS_B_MemberProcedureCall_Node = Ast_ICS_B_MemberProcedureCall_Node_226 | Ast_ICS_B_MemberProcedureCall_Node_227 | Ast_ICS_B_MemberProcedureCall_Node_228 | Ast_ICS_B_MemberProcedureCall_Node_229 | Ast_ICS_B_MemberProcedureCall_Node_230 | Ast_ICS_B_MemberProcedureCall_Node_231 | Ast_ICS_B_MemberProcedureCall_Node_232 | Ast_ICS_B_MemberProcedureCall_Node_233;
export type Ast_ICS_B_ProcedureCall_Node = Ast_ICS_B_ProcedureCall_Node_234 | Ast_ICS_B_ProcedureCall_Node_235 | Ast_ICS_B_ProcedureCall_Node_236 | Ast_ICS_B_ProcedureCall_Node_237;
type Ast_ArgsCall_group_def_27_Node = Ast_ArgsCall_group_def_27_Node_238 | Ast_ArgsCall_group_def_27_Node_239;
export type { Ast_ArgsCall_Node };
type Ast_ArgCall_group_28_Node = Ast_ArgCall_group_28_Node_242 | Ast_ArgCall_group_28_Node_244 | Ast_ArgCall_group_28_Node_246;
export type Ast_ArgCall_Node = Ast_ArgCall_Node_247 | Ast_ArgCall_Node_248 | Ast_ArgCall_Node_249 | Ast_ArgCall_Node_250 | Ast_ArgCall_Node_251 | Ast_ArgCall_Node_252 | Ast_ArgCall_Node_253 | Ast_ArgCall_Node_254;
type Ast_VariableStmt_group_32_Node = Ast_VariableStmt_group_32_Node_256 | Ast_VariableStmt_group_32_Node_258 | Ast_VariableStmt_group_32_Node_260;
export type Ast_VariableStmt_Node = Ast_VariableStmt_Node_261 | Ast_VariableStmt_Node_262;
export type { Ast_VariableListStmt_Node };
type Ast_VariableSubStmt_group_def_39_Node = Ast_VariableSubStmt_group_def_39_Node_265 | Ast_VariableSubStmt_group_def_39_Node_266;
export type Ast_VariableSubStmt_Node = Ast_VariableSubStmt_Node_267 | Ast_VariableSubStmt_Node_268 | Ast_VariableSubStmt_Node_269 | Ast_VariableSubStmt_Node_270 | Ast_VariableSubStmt_Node_271 | Ast_VariableSubStmt_Node_272 | Ast_VariableSubStmt_Node_273 | Ast_VariableSubStmt_Node_274;
export type { Ast_Indexes_Node };
export type Ast_Subscript__Node = Ast_Subscript__Node_277 | Ast_Subscript__Node_278 | Ast_Subscript__Node_281 | Ast_Subscript__Node_282;
export type { Ast_Subscripts_Node };
export type Ast_ArgList_Node = Ast_ArgList_Node_285 | Ast_ArgList_Node_286;
export type Ast_ValueStmt_Node = Ast_ValueStmt_Node_287 | Ast_ValueStmt_Node_288 | Ast_ValueStmt_Node_289;
export type Ast_ImplicitCallStmt_InStmt_Node = Ast_ImplicitCallStmt_InStmt_Node_290 | Ast_ImplicitCallStmt_InStmt_Node_291 | Ast_ImplicitCallStmt_InStmt_Node_292;
type Ast_ICS_S_MembersCall_group_50_Node = Ast_ICS_S_MembersCall_group_50_Node_294 | Ast_ICS_S_MembersCall_group_50_Node_296;
export type Ast_ICS_S_MembersCall_Node = Ast_ICS_S_MembersCall_Node_297 | Ast_ICS_S_MembersCall_Node_298 | Ast_ICS_S_MembersCall_Node_299 | Ast_ICS_S_MembersCall_Node_300;
type Ast_ICS_S_MemberCall_group_54_Node = Ast_ICS_S_MemberCall_group_54_Node_302 | Ast_ICS_S_MemberCall_group_54_Node_304;
type Ast_ICS_S_MemberCall_group_57_Node = Ast_ICS_S_MemberCall_group_57_Node_305 | Ast_ICS_S_MemberCall_group_57_Node_306;
export type { Ast_ICS_S_MemberCall_Node };
export type Ast_ICS_S_ProcedureOrArrayCall_Node = Ast_ICS_S_ProcedureOrArrayCall_Node_308 | Ast_ICS_S_ProcedureOrArrayCall_Node_309 | Ast_ICS_S_ProcedureOrArrayCall_Node_310 | Ast_ICS_S_ProcedureOrArrayCall_Node_311 | Ast_ICS_S_ProcedureOrArrayCall_Node_312 | Ast_ICS_S_ProcedureOrArrayCall_Node_313 | Ast_ICS_S_ProcedureOrArrayCall_Node_314 | Ast_ICS_S_ProcedureOrArrayCall_Node_315;
export type Ast_ICS_S_VariableOrProcedureCall_Node = Ast_ICS_S_VariableOrProcedureCall_Node_316 | Ast_ICS_S_VariableOrProcedureCall_Node_317 | Ast_ICS_S_VariableOrProcedureCall_Node_318 | Ast_ICS_S_VariableOrProcedureCall_Node_319;
export type Ast_DictionaryCallStmt_Node = Ast_DictionaryCallStmt_Node_320 | Ast_DictionaryCallStmt_Node_321;
export type Ast_Literal_Node = Ast_Literal_Node_322 | Ast_Literal_Node_323 | Ast_Literal_Node_324 | Ast_Literal_Node_325 | Ast_Literal_Node_326 | Ast_Literal_Node_327;
export type Ast_TypeHint_Node = Ast_TypeHint_Node_328 | Ast_TypeHint_Node_329 | Ast_TypeHint_Node_330 | Ast_TypeHint_Node_331 | Ast_TypeHint_Node_332 | Ast_TypeHint_Node_333;
type Ast_Arg_group_60_Node = Ast_Arg_group_60_Node_334 | Ast_Arg_group_60_Node_335;
export type Ast_Arg_Node = Ast_Arg_Node_337 | Ast_Arg_Node_338 | Ast_Arg_Node_339 | Ast_Arg_Node_340 | Ast_Arg_Node_341 | Ast_Arg_Node_342 | Ast_Arg_Node_343 | Ast_Arg_Node_344 | Ast_Arg_Node_345 | Ast_Arg_Node_346 | Ast_Arg_Node_347 | Ast_Arg_Node_348 | Ast_Arg_Node_349 | Ast_Arg_Node_350 | Ast_Arg_Node_351 | Ast_Arg_Node_352 | Ast_Arg_Node_353 | Ast_Arg_Node_354 | Ast_Arg_Node_355 | Ast_Arg_Node_356 | Ast_Arg_Node_357 | Ast_Arg_Node_358 | Ast_Arg_Node_359 | Ast_Arg_Node_360 | Ast_Arg_Node_361 | Ast_Arg_Node_362 | Ast_Arg_Node_363 | Ast_Arg_Node_364 | Ast_Arg_Node_365 | Ast_Arg_Node_366 | Ast_Arg_Node_367 | Ast_Arg_Node_368 | Ast_Arg_Node_369 | Ast_Arg_Node_370 | Ast_Arg_Node_371 | Ast_Arg_Node_372 | Ast_Arg_Node_373 | Ast_Arg_Node_374 | Ast_Arg_Node_375 | Ast_Arg_Node_376 | Ast_Arg_Node_377 | Ast_Arg_Node_378 | Ast_Arg_Node_379 | Ast_Arg_Node_380 | Ast_Arg_Node_381 | Ast_Arg_Node_382 | Ast_Arg_Node_383 | Ast_Arg_Node_384 | Ast_Arg_Node_385 | Ast_Arg_Node_386 | Ast_Arg_Node_387 | Ast_Arg_Node_388 | Ast_Arg_Node_389 | Ast_Arg_Node_390 | Ast_Arg_Node_391 | Ast_Arg_Node_392 | Ast_Arg_Node_393 | Ast_Arg_Node_394 | Ast_Arg_Node_395 | Ast_Arg_Node_396 | Ast_Arg_Node_397 | Ast_Arg_Node_398 | Ast_Arg_Node_399 | Ast_Arg_Node_400 | Ast_Arg_Node_401 | Ast_Arg_Node_402 | Ast_Arg_Node_403 | Ast_Arg_Node_404 | Ast_Arg_Node_405 | Ast_Arg_Node_406 | Ast_Arg_Node_407 | Ast_Arg_Node_408 | Ast_Arg_Node_409 | Ast_Arg_Node_410 | Ast_Arg_Node_411 | Ast_Arg_Node_412 | Ast_Arg_Node_413 | Ast_Arg_Node_414 | Ast_Arg_Node_415 | Ast_Arg_Node_416 | Ast_Arg_Node_417 | Ast_Arg_Node_418 | Ast_Arg_Node_419 | Ast_Arg_Node_420 | Ast_Arg_Node_421 | Ast_Arg_Node_422 | Ast_Arg_Node_423 | Ast_Arg_Node_424 | Ast_Arg_Node_425 | Ast_Arg_Node_426 | Ast_Arg_Node_427 | Ast_Arg_Node_428 | Ast_Arg_Node_429 | Ast_Arg_Node_430 | Ast_Arg_Node_431 | Ast_Arg_Node_432 | Ast_Arg_Node_433 | Ast_Arg_Node_434 | Ast_Arg_Node_435 | Ast_Arg_Node_436 | Ast_Arg_Node_437 | Ast_Arg_Node_438 | Ast_Arg_Node_439 | Ast_Arg_Node_440 | Ast_Arg_Node_441 | Ast_Arg_Node_442 | Ast_Arg_Node_443 | Ast_Arg_Node_444 | Ast_Arg_Node_445 | Ast_Arg_Node_446 | Ast_Arg_Node_447 | Ast_Arg_Node_448 | Ast_Arg_Node_449 | Ast_Arg_Node_450 | Ast_Arg_Node_451 | Ast_Arg_Node_452 | Ast_Arg_Node_453 | Ast_Arg_Node_454 | Ast_Arg_Node_455 | Ast_Arg_Node_456 | Ast_Arg_Node_457 | Ast_Arg_Node_458 | Ast_Arg_Node_459 | Ast_Arg_Node_460 | Ast_Arg_Node_461 | Ast_Arg_Node_462 | Ast_Arg_Node_463 | Ast_Arg_Node_464;
export type { Ast_ArgDefaultValue_Node };
export type Ast_AsTypeClause_Node = Ast_AsTypeClause_Node_466 | Ast_AsTypeClause_Node_467 | Ast_AsTypeClause_Node_468 | Ast_AsTypeClause_Node_469;
type Ast_Type__group_63_Node = Ast_Type__group_63_Node_471 | Ast_Type__group_63_Node_473;
export type Ast_Type__Node = Ast_Type__Node_474 | Ast_Type__Node_475;
type Ast_ComplexType_group_68_Node = Ast_ComplexType_group_68_Node_476 | Ast_ComplexType_group_68_Node_477;
export type { Ast_ComplexType_Node };
export type Ast_BaseType_Node = Ast_BaseType_Node_480 | Ast_BaseType_Node_481 | Ast_BaseType_Node_482 | Ast_BaseType_Node_483 | Ast_BaseType_Node_484 | Ast_BaseType_Node_485 | Ast_BaseType_Node_486 | Ast_BaseType_Node_488 | Ast_BaseType_Node_489;
export type Ast_FieldLength_Node = Ast_FieldLength_Node_490 | Ast_FieldLength_Node_491;
export type { Ast_AmbiguousIdentifier_Node };