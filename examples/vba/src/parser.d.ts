// TODO: improve Tuple type
type Optional<T> = T | undefined;
type OneOrMore<T> = T extends Array<infer U> ? [...T, ...U[]] : [T, ...T[]];
type ZeroOrMore<T> = T extends Array<infer U> ? U[] : T[];

export type AstNode = AstSymbolNode | AstTokenNode;

// replace start
export type AstSymbolNode = Ast_Progam_Node|Ast_EndOfLine_Node|Ast_EndOfStatement_Node|Ast_ModuleAttributes_Node|Ast_AttributeStmt_Node|Ast_ModuleDeclarations_Node|Ast_ModuleDeclarationsElement_Node|Ast_ModuleOption_Node|Ast_ModuleBody_Node|Ast_ModuleBodyElement_Node|Ast_Visibility_Node|Ast_SubStmt_Node|Ast_PropertyGetStmt_Node|Ast_PropertySetStmt_Node|Ast_PropertyLetStmt_Node|Ast_FunctionStmt_Node|Ast_Block_Node|Ast_BlockStmt_Node|Ast_ResumeStmt_Node|Ast_WhileWendStmt_Node|Ast_DoLoopStmt_Node|Ast_ForNextStmt_Node|Ast_ForEachStmt_Node|Ast_SelectCaseStmt_Node|Ast_SC_Selection_Node|Ast_SC_Case_Node|Ast_SC_Cond_Node|Ast_ComparisonOperator_Node|Ast_IfThenElseStmt_Node|Ast_IfBlockStmt_Node|Ast_IfElseIfBlockStmt_Node|Ast_IfElseBlockStmt_Node|Ast_OnErrorStmt_Node|Ast_LineLabel_Node|Ast_GoToStmt_Node|Ast_EraseStmt_Node|Ast_RedimStmt_Node|Ast_RedimSubStmt_Node|Ast_ExitStmt_Node|Ast_LetStmt_Node|Ast_SetStmt_Node|Ast_ExplicitCallStmt_Node|Ast_ECS_MemberProcedureCall_Node|Ast_ECS_ProcedureCall_Node|Ast_ImplicitCallStmt_InBlock_Node|Ast_ICS_B_MemberProcedureCall_Node|Ast_ICS_B_ProcedureCall_Node|Ast_ArgsCall_Node|Ast_ArgCall_Node|Ast_VariableStmt_Node|Ast_WithStmt_Node|Ast_VariableListStmt_Node|Ast_VariableSubStmt_Node|Ast_Indexes_Node|Ast_Subscript__Node|Ast_Subscripts_Node|Ast_ArgList_Node|Ast_ValueStmt_Node|Ast_ImplicitCallStmt_InStmt_Node|Ast_ICS_S_MembersCall_Node|Ast_ICS_S_MemberCall_Node|Ast_ICS_S_SpaceMemberCall_Node|Ast_MCS_S_ProcedureOrArrayCall_Node|Ast_ICS_S_ProcedureOrArrayCall_Node|Ast_ICS_S_VariableOrProcedureCall_Node|Ast_MCS_S_VariableOrProcedureCall_Node|Ast_Literal_Node|Ast_TypeHint_Node|Ast_Arg_Node|Ast_ArgDefaultValue_Node|Ast_AsTypeClause_Node|Ast_Type__Node|Ast_ComplexType_Node|Ast_BaseType_Node|Ast_AmbiguousIdentifier_Node|Ast_CertainIdentifier_Node;
export type AstTokenNode = Ast_$EOF_Node|Ast_$UNKNOWN_Node|Ast_NEWLINE_Node|Ast_COMMENT_Node|Ast_REMCOMMENT_Node|Ast_COLON_Node|Ast_TOKEN_0_Node|Ast_ATTRIBUTE_Node|Ast_EQ_Node|Ast_OPTION_BASE_Node|Ast_INTEGERLITERAL_Node|Ast_OPTION_COMPARE_Node|Ast_IDENTIFIER_Node|Ast_OPTION_EXPLICIT_Node|Ast_OPTION_PRIVATE_MODULE_Node|Ast_PRIVATE_Node|Ast_PUBLIC_Node|Ast_FRIEND_Node|Ast_GLOBAL_Node|Ast_STATIC_Node|Ast_SUB_Node|Ast_END_SUB_Node|Ast_PROPERTY_GET_Node|Ast_END_PROPERTY_Node|Ast_PROPERTY_SET_Node|Ast_PROPERTY_LET_Node|Ast_FUNCTION_Node|Ast_END_FUNCTION_Node|Ast_RESUME_Node|Ast_WHILE_Node|Ast_WEND_Node|Ast_DO_Node|Ast_LOOP_Node|Ast_UNTIL_Node|Ast_STEP_Node|Ast_FOR_Node|Ast_TO_Node|Ast_NEXT_Node|Ast_EACH_Node|Ast_IN_Node|Ast_SELECT_Node|Ast_CASE_Node|Ast_END_SELECT_Node|Ast_IS_Node|Ast_ELSE_Node|Ast_LT_Node|Ast_LEQ_Node|Ast_GT_Node|Ast_GEQ_Node|Ast_NEQ_Node|Ast_IF_Node|Ast_THEN_Node|Ast_END_IF_Node|Ast_ELSEIF_Node|Ast_MINUS_Node|Ast_GOTO_Node|Ast_ON_ERROR_Node|Ast_ERASE_Node|Ast_REDIM_Node|Ast_PRESERVE_Node|Ast_LPAREN_Node|Ast_RPAREN_Node|Ast_EXIT_DO_Node|Ast_EXIT_FOR_Node|Ast_EXIT_FUNCTION_Node|Ast_EXIT_PROPERTY_Node|Ast_EXIT_SUB_Node|Ast_END_Node|Ast_PLUS_EQ_Node|Ast_MINUS_EQ_Node|Ast_LET_Node|Ast_SET_Node|Ast_TOKEN_1_Node|Ast_SPACE_DOT_Node|Ast_CALL_Node|Ast_DIM_Node|Ast_WITHEVENTS_Node|Ast_NEW_Node|Ast_WITH_Node|Ast_END_WITH_Node|Ast_ASSIGN_Node|Ast_ISNOT_Node|Ast_XOR_Node|Ast_OR_Node|Ast_AND_Node|Ast_PLUS_Node|Ast_AMPERSAND_Node|Ast_MULT_Node|Ast_DIV_Node|Ast_IDIV_Node|Ast_MOD_Node|Ast_POW_Node|Ast_NOT_Node|Ast_DOUBLELITERAL_Node|Ast_STRINGLITERAL_Node|Ast_NOTHING_Node|Ast_NULL_Node|Ast_TRUE_Node|Ast_FALSE_Node|Ast_DATELITERAL_Node|Ast_TOKEN_2_Node|Ast_TOKEN_3_Node|Ast_TOKEN_4_Node|Ast_TOKEN_5_Node|Ast_TOKEN_6_Node|Ast_$_Node|Ast_BYVAL_Node|Ast_BYREF_Node|Ast_OPTIONAL_Node|Ast_PARAMARRAY_Node|Ast_AS_Node|Ast_BOOLEAN_Node|Ast_BYTE_Node|Ast_DOUBLE_Node|Ast_INTEGER_Node|Ast_LONG_Node|Ast_SINGLE_Node|Ast_VARIANT_Node|Ast_STRING_Node|Ast_DATE_Node|Ast_ALIAS_Node|Ast_BEGIN_Node|Ast_CONST_Node|Ast_DECLARE_Node|Ast_DEFBOOL_Node|Ast_DEFBYTE_Node|Ast_DEFDATE_Node|Ast_DEFDBL_Node|Ast_DEFDEC_Node|Ast_DEFCUR_Node|Ast_DEFINT_Node|Ast_DEFLNG_Node|Ast_DEFOBJ_Node|Ast_DEFSNG_Node|Ast_DEFSTR_Node|Ast_DEFVAR_Node|Ast_ENUM_Node|Ast_EQV_Node|Ast_EVENT_Node|Ast_GET_Node|Ast_GOSUB_Node|Ast_IMPLEMENTS_Node|Ast_LEN_Node|Ast_LIB_Node|Ast_LIKE_Node|Ast_LSET_Node|Ast_ON_Node|Ast_PTRSAFE_Node|Ast_RAISEEVENT_Node|Ast_RESET_Node|Ast_RETURN_Node|Ast_STOP_Node|Ast_TYPEOF_Node|Ast_IMP_Node;
export type LiteralToken = "ALIAS"|"AND"|"ATTRIBUTE"|"AS"|"BEGIN"|"BOOLEAN"|"BYVAL"|"BYREF"|"BYTE"|"CALL"|"CASE"|"CONST"|"DATE"|"DECLARE"|"DEFBOOL"|"DEFBYTE"|"DEFDATE"|"DEFDBL"|"DEFDEC"|"DEFCUR"|"DEFINT"|"DEFLNG"|"DEFOBJ"|"DEFSNG"|"DEFSTR"|"DEFVAR"|"DIM"|"DO"|"DOUBLE"|"EACH"|"ELSE"|"ELSEIF"|"END_ENUM"|"END_FUNCTION"|"END_IF"|"END_PROPERTY"|"END_SELECT"|"END_SUB"|"END_TYPE"|"END_WITH"|"END"|"ENUM"|"EQV"|"ERASE"|"EVENT"|"EXIT_DO"|"EXIT_FOR"|"EXIT_FUNCTION"|"EXIT_PROPERTY"|"EXIT_SUB"|"FALSE"|"FRIEND"|"FOR"|"FUNCTION"|"GET"|"GLOBAL"|"GOSUB"|"GOTO"|"IF"|"IMPLEMENTS"|"IN"|"ISNOT"|"IS"|"INTEGER"|"LONG"|"LOOP"|"LEN"|"LET"|"LIB"|"LIKE"|"LSET"|"MOD"|"NEXT"|"NEW"|"NOT"|"NOTHING"|"NULL"|"ON_ERROR"|"ON_LOCAL_ERROR"|"ON"|"OPTIONAL"|"OPTION_BASE"|"OPTION_EXPLICIT"|"OPTION_COMPARE"|"OPTION_PRIVATE_MODULE"|"OR"|"PARAMARRAY"|"PRESERVE"|"PRIVATE"|"PROPERTY_GET"|"PROPERTY_LET"|"PROPERTY_SET"|"PTRSAFE"|"PUBLIC"|"RAISEEVENT"|"REDIM"|"RESET"|"RESUME"|"RETURN"|"SELECT"|"SET"|"SINGLE"|"STATIC"|"STEP"|"STOP"|"STRING"|"SUB"|"THEN"|"TO"|"TRUE"|"TYPEOF"|"UNTIL"|"VARIANT"|"WEND"|"WHILE"|"WITH"|"WITHEVENTS"|"XOR"|"IMP"|"DATELITERAL"|"DOUBLELITERAL"|"SPACE_DOT"|"ASSIGN"|"NEQ"|"LEQ"|"GEQ"|"MINUS_EQ"|"PLUS_EQ"|"COLON"|"AMPERSAND"|"DIV"|"IDIV"|"EQ"|"GT"|"LPAREN"|"LT"|"MINUS"|"MULT"|"PLUS"|"POW"|"RPAREN"|"L_SQUARE_BRACKET"|"R_SQUARE_BRACKET"|"NEWLINE"|"REMCOMMENT"|"COMMENT"|"HIDDEN"|"STRINGLITERAL"|"INTEGERLITERAL"|"IDENTIFIER"|"$"|"$EOF"|"$UNKNOWN"|","|"."|"&"|"%"|"#"|"!"|"@";
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
  memoTable?:MemoTableItem[];
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
moduleAttributes: Ast_ModuleAttributes_Node;
attributeStmt: Ast_AttributeStmt_Node;
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
resumeStmt: Ast_ResumeStmt_Node;
whileWendStmt: Ast_WhileWendStmt_Node;
doLoopStmt: Ast_DoLoopStmt_Node;
forNextStmt: Ast_ForNextStmt_Node;
forEachStmt: Ast_ForEachStmt_Node;
selectCaseStmt: Ast_SelectCaseStmt_Node;
sC_Selection: Ast_SC_Selection_Node;
sC_Case: Ast_SC_Case_Node;
sC_Cond: Ast_SC_Cond_Node;
comparisonOperator: Ast_ComparisonOperator_Node;
ifThenElseStmt: Ast_IfThenElseStmt_Node;
ifBlockStmt: Ast_IfBlockStmt_Node;
ifElseIfBlockStmt: Ast_IfElseIfBlockStmt_Node;
ifElseBlockStmt: Ast_IfElseBlockStmt_Node;
onErrorStmt: Ast_OnErrorStmt_Node;
lineLabel: Ast_LineLabel_Node;
goToStmt: Ast_GoToStmt_Node;
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
withStmt: Ast_WithStmt_Node;
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
iCS_S_SpaceMemberCall: Ast_ICS_S_SpaceMemberCall_Node;
mCS_S_ProcedureOrArrayCall: Ast_MCS_S_ProcedureOrArrayCall_Node;
iCS_S_ProcedureOrArrayCall: Ast_ICS_S_ProcedureOrArrayCall_Node;
iCS_S_VariableOrProcedureCall: Ast_ICS_S_VariableOrProcedureCall_Node;
mCS_S_VariableOrProcedureCall: Ast_MCS_S_VariableOrProcedureCall_Node;
literal: Ast_Literal_Node;
typeHint: Ast_TypeHint_Node;
arg: Ast_Arg_Node;
argDefaultValue: Ast_ArgDefaultValue_Node;
asTypeClause: Ast_AsTypeClause_Node;
type_: Ast_Type__Node;
complexType: Ast_ComplexType_Node;
baseType: Ast_BaseType_Node;
ambiguousIdentifier: Ast_AmbiguousIdentifier_Node;
certainIdentifier: Ast_CertainIdentifier_Node;
caseCondIs: Ast_CaseCondIs_Node;
caseCondTo: Ast_CaseCondTo_Node;
caseCondValue: Ast_CaseCondValue_Node;
caseCondElse: Ast_CaseCondElse_Node;
caseCondSelection: Ast_CaseCondSelection_Node;
InlineIfThenElse: Ast_InlineIfThenElse_Node;
BlockIfThenElse: Ast_BlockIfThenElse_Node;
AtomExpression: Ast_AtomExpression_Node;
BinaryExpression: Ast_BinaryExpression_Node;
PrefixExpression: Ast_PrefixExpression_Node;
$EOF: Ast_$EOF_Node;
$UNKNOWN: Ast_$UNKNOWN_Node;
NEWLINE: Ast_NEWLINE_Node;
COMMENT: Ast_COMMENT_Node;
REMCOMMENT: Ast_REMCOMMENT_Node;
COLON: Ast_COLON_Node;
TOKEN_0: Ast_TOKEN_0_Node;
ATTRIBUTE: Ast_ATTRIBUTE_Node;
EQ: Ast_EQ_Node;
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
END_PROPERTY: Ast_END_PROPERTY_Node;
PROPERTY_SET: Ast_PROPERTY_SET_Node;
PROPERTY_LET: Ast_PROPERTY_LET_Node;
FUNCTION: Ast_FUNCTION_Node;
END_FUNCTION: Ast_END_FUNCTION_Node;
RESUME: Ast_RESUME_Node;
WHILE: Ast_WHILE_Node;
WEND: Ast_WEND_Node;
DO: Ast_DO_Node;
LOOP: Ast_LOOP_Node;
UNTIL: Ast_UNTIL_Node;
STEP: Ast_STEP_Node;
FOR: Ast_FOR_Node;
TO: Ast_TO_Node;
NEXT: Ast_NEXT_Node;
EACH: Ast_EACH_Node;
IN: Ast_IN_Node;
SELECT: Ast_SELECT_Node;
CASE: Ast_CASE_Node;
END_SELECT: Ast_END_SELECT_Node;
IS: Ast_IS_Node;
ELSE: Ast_ELSE_Node;
LT: Ast_LT_Node;
LEQ: Ast_LEQ_Node;
GT: Ast_GT_Node;
GEQ: Ast_GEQ_Node;
NEQ: Ast_NEQ_Node;
IF: Ast_IF_Node;
THEN: Ast_THEN_Node;
END_IF: Ast_END_IF_Node;
ELSEIF: Ast_ELSEIF_Node;
MINUS: Ast_MINUS_Node;
GOTO: Ast_GOTO_Node;
ON_ERROR: Ast_ON_ERROR_Node;
ERASE: Ast_ERASE_Node;
REDIM: Ast_REDIM_Node;
PRESERVE: Ast_PRESERVE_Node;
LPAREN: Ast_LPAREN_Node;
RPAREN: Ast_RPAREN_Node;
EXIT_DO: Ast_EXIT_DO_Node;
EXIT_FOR: Ast_EXIT_FOR_Node;
EXIT_FUNCTION: Ast_EXIT_FUNCTION_Node;
EXIT_PROPERTY: Ast_EXIT_PROPERTY_Node;
EXIT_SUB: Ast_EXIT_SUB_Node;
END: Ast_END_Node;
PLUS_EQ: Ast_PLUS_EQ_Node;
MINUS_EQ: Ast_MINUS_EQ_Node;
LET: Ast_LET_Node;
SET: Ast_SET_Node;
TOKEN_1: Ast_TOKEN_1_Node;
SPACE_DOT: Ast_SPACE_DOT_Node;
CALL: Ast_CALL_Node;
DIM: Ast_DIM_Node;
WITHEVENTS: Ast_WITHEVENTS_Node;
NEW: Ast_NEW_Node;
WITH: Ast_WITH_Node;
END_WITH: Ast_END_WITH_Node;
ASSIGN: Ast_ASSIGN_Node;
ISNOT: Ast_ISNOT_Node;
XOR: Ast_XOR_Node;
OR: Ast_OR_Node;
AND: Ast_AND_Node;
PLUS: Ast_PLUS_Node;
AMPERSAND: Ast_AMPERSAND_Node;
MULT: Ast_MULT_Node;
DIV: Ast_DIV_Node;
IDIV: Ast_IDIV_Node;
MOD: Ast_MOD_Node;
POW: Ast_POW_Node;
NOT: Ast_NOT_Node;
DOUBLELITERAL: Ast_DOUBLELITERAL_Node;
STRINGLITERAL: Ast_STRINGLITERAL_Node;
NOTHING: Ast_NOTHING_Node;
NULL: Ast_NULL_Node;
TRUE: Ast_TRUE_Node;
FALSE: Ast_FALSE_Node;
DATELITERAL: Ast_DATELITERAL_Node;
TOKEN_2: Ast_TOKEN_2_Node;
TOKEN_3: Ast_TOKEN_3_Node;
TOKEN_4: Ast_TOKEN_4_Node;
TOKEN_5: Ast_TOKEN_5_Node;
TOKEN_6: Ast_TOKEN_6_Node;
$: Ast_$_Node;
BYVAL: Ast_BYVAL_Node;
BYREF: Ast_BYREF_Node;
OPTIONAL: Ast_OPTIONAL_Node;
PARAMARRAY: Ast_PARAMARRAY_Node;
AS: Ast_AS_Node;
BOOLEAN: Ast_BOOLEAN_Node;
BYTE: Ast_BYTE_Node;
DOUBLE: Ast_DOUBLE_Node;
INTEGER: Ast_INTEGER_Node;
LONG: Ast_LONG_Node;
SINGLE: Ast_SINGLE_Node;
VARIANT: Ast_VARIANT_Node;
STRING: Ast_STRING_Node;
DATE: Ast_DATE_Node;
ALIAS: Ast_ALIAS_Node;
BEGIN: Ast_BEGIN_Node;
CONST: Ast_CONST_Node;
DECLARE: Ast_DECLARE_Node;
DEFBOOL: Ast_DEFBOOL_Node;
DEFBYTE: Ast_DEFBYTE_Node;
DEFDATE: Ast_DEFDATE_Node;
DEFDBL: Ast_DEFDBL_Node;
DEFDEC: Ast_DEFDEC_Node;
DEFCUR: Ast_DEFCUR_Node;
DEFINT: Ast_DEFINT_Node;
DEFLNG: Ast_DEFLNG_Node;
DEFOBJ: Ast_DEFOBJ_Node;
DEFSNG: Ast_DEFSNG_Node;
DEFSTR: Ast_DEFSTR_Node;
DEFVAR: Ast_DEFVAR_Node;
ENUM: Ast_ENUM_Node;
EQV: Ast_EQV_Node;
EVENT: Ast_EVENT_Node;
GET: Ast_GET_Node;
GOSUB: Ast_GOSUB_Node;
IMPLEMENTS: Ast_IMPLEMENTS_Node;
LEN: Ast_LEN_Node;
LIB: Ast_LIB_Node;
LIKE: Ast_LIKE_Node;
LSET: Ast_LSET_Node;
ON: Ast_ON_Node;
PTRSAFE: Ast_PTRSAFE_Node;
RAISEEVENT: Ast_RAISEEVENT_Node;
RESET: Ast_RESET_Node;
RETURN: Ast_RETURN_Node;
STOP: Ast_STOP_Node;
TYPEOF: Ast_TYPEOF_Node;
IMP: Ast_IMP_Node;
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

        type Ast_EndOfStatement_group_def_2_Parent_Node = Ast_EndOfStatement_group_1_Parent_Node_12;
        

        type Ast_EndOfStatement_group_1_Parent_Node_12 = Ast_EndOfStatement_Node;
        

        type Ast_EndOfStatement_group_def_3_Parent_Node = Ast_EndOfStatement_group_1_Parent_Node_14;
        

        type Ast_EndOfStatement_group_1_Parent_Node_14 = Ast_EndOfStatement_Node;
        

        type Ast_ModuleAttributes_group_def_5_Parent_Node = Ast_ModuleAttributes_Node;
        

        type Ast_AttributeStmt_group_def_7_Parent_Node = Ast_AttributeStmt_Node;
        

        type Ast_ModuleDeclarations_group_def_9_Parent_Node = Ast_ModuleDeclarations_Node;
        

        type Ast_ModuleBody_group_def_11_Parent_Node = Ast_ModuleBody_Node;
        

        type Ast_Block_group_def_13_Parent_Node = Ast_Block_Node;
        

        type Ast_DoLoopStmt_group_def_15_Parent_Node = Ast_DoLoopStmt_group_14_Parent_Node_243|Ast_DoLoopStmt_group_17_Parent_Node_247;
        

        type Ast_DoLoopStmt_group_14_Parent_Node_243 = Ast_DoLoopStmt_Node_246;
        

        type Ast_DoLoopStmt_group_def_16_Parent_Node = Ast_DoLoopStmt_group_14_Parent_Node_245|Ast_DoLoopStmt_group_17_Parent_Node_248;
        

        type Ast_DoLoopStmt_group_14_Parent_Node_245 = Ast_DoLoopStmt_Node_246;
        

        type Ast_DoLoopStmt_group_17_Parent_Node_247 = Ast_DoLoopStmt_Node_249;
        

        type Ast_DoLoopStmt_group_17_Parent_Node_248 = Ast_DoLoopStmt_Node_249;
        

        type Ast_ForNextStmt_group_def_19_Parent_Node = Ast_ForNextStmt_Node_251|Ast_ForNextStmt_Node_252|Ast_ForNextStmt_Node_253|Ast_ForNextStmt_Node_254|Ast_ForNextStmt_Node_259|Ast_ForNextStmt_Node_260|Ast_ForNextStmt_Node_261|Ast_ForNextStmt_Node_262|Ast_ForNextStmt_Node_267|Ast_ForNextStmt_Node_268|Ast_ForNextStmt_Node_269|Ast_ForNextStmt_Node_270|Ast_ForNextStmt_Node_275|Ast_ForNextStmt_Node_276|Ast_ForNextStmt_Node_277|Ast_ForNextStmt_Node_278;
        

        type Ast_SC_Cond_group_def_21_Parent_Node = Ast_SC_Cond_Node_299;
        

        type Ast_IfThenElseStmt_group_def_23_Parent_Node = Ast_IfThenElseStmt_Node_308;
        

        type Ast_OnErrorStmt_group_def_26_Parent_Node = Ast_OnErrorStmt_group_25_Parent_Node_319;
        

        type Ast_OnErrorStmt_group_25_Parent_Node_319 = Ast_OnErrorStmt_group_def_28_Parent_Node;
        

        type Ast_OnErrorStmt_group_def_27_Parent_Node = Ast_OnErrorStmt_group_25_Parent_Node_321;
        

        type Ast_OnErrorStmt_group_25_Parent_Node_321 = Ast_OnErrorStmt_group_def_28_Parent_Node;
        

        type Ast_OnErrorStmt_group_def_28_Parent_Node = Ast_OnErrorStmt_group_24_Parent_Node_323;
        

        type Ast_OnErrorStmt_group_24_Parent_Node_323 = Ast_OnErrorStmt_Node;
        

        type Ast_OnErrorStmt_group_def_29_Parent_Node = Ast_OnErrorStmt_group_24_Parent_Node_325;
        

        type Ast_OnErrorStmt_group_24_Parent_Node_325 = Ast_OnErrorStmt_Node;
        

        type Ast_EraseStmt_group_def_31_Parent_Node = Ast_EraseStmt_Node|Ast_Indexes_Node;
        

        type Ast_RedimStmt_group_def_33_Parent_Node = Ast_RedimStmt_Node_332|Ast_RedimStmt_Node_333;
        

        type Ast_LetStmt_group_def_35_Parent_Node = Ast_LetStmt_group_34_Parent_Node_343;
        

        type Ast_LetStmt_group_34_Parent_Node_343 = Ast_LetStmt_Node_348|Ast_LetStmt_Node_349;
        

        type Ast_LetStmt_group_def_36_Parent_Node = Ast_LetStmt_group_34_Parent_Node_345;
        

        type Ast_LetStmt_group_34_Parent_Node_345 = Ast_LetStmt_Node_348|Ast_LetStmt_Node_349;
        

        type Ast_LetStmt_group_def_37_Parent_Node = Ast_LetStmt_group_34_Parent_Node_347;
        

        type Ast_LetStmt_group_34_Parent_Node_347 = Ast_LetStmt_Node_348|Ast_LetStmt_Node_349;
        

        type Ast_ECS_MemberProcedureCall_group_def_39_Parent_Node_353 = Ast_ECS_MemberProcedureCall_group_38_Parent_Node_355|Ast_ICS_B_MemberProcedureCall_group_47_Parent_Node_371;
        

        type Ast_ECS_MemberProcedureCall_group_def_39_Parent_Node_354 = Ast_ECS_MemberProcedureCall_group_38_Parent_Node_355|Ast_ICS_B_MemberProcedureCall_group_47_Parent_Node_371;
        

        type Ast_ECS_MemberProcedureCall_group_38_Parent_Node_355 = Ast_ECS_MemberProcedureCall_Node_360|Ast_ECS_MemberProcedureCall_Node_361|Ast_ECS_MemberProcedureCall_Node_362|Ast_ECS_MemberProcedureCall_Node_363;
        

        type Ast_ECS_MemberProcedureCall_group_def_40_Parent_Node = Ast_ECS_MemberProcedureCall_group_38_Parent_Node_357|Ast_ICS_B_MemberProcedureCall_group_47_Parent_Node_370;
        

        type Ast_ECS_MemberProcedureCall_group_38_Parent_Node_357 = Ast_ECS_MemberProcedureCall_Node_360|Ast_ECS_MemberProcedureCall_Node_361|Ast_ECS_MemberProcedureCall_Node_362|Ast_ECS_MemberProcedureCall_Node_363;
        

        type Ast_ECS_MemberProcedureCall_group_def_42_Parent_Node = Ast_ECS_MemberProcedureCall_Node_360|Ast_ECS_MemberProcedureCall_Node_362|Ast_ECS_ProcedureCall_Node_364|Ast_ECS_ProcedureCall_Node_366;
        

        type Ast_ECS_MemberProcedureCall_group_def_44_Parent_Node = Ast_ECS_MemberProcedureCall_Node_360|Ast_ECS_MemberProcedureCall_Node_361|Ast_ECS_MemberProcedureCall_Node_362|Ast_ECS_MemberProcedureCall_Node_363|Ast_ECS_ProcedureCall_Node_364|Ast_ECS_ProcedureCall_Node_365|Ast_ECS_ProcedureCall_Node_366|Ast_ECS_ProcedureCall_Node_367|Ast_ICS_B_MemberProcedureCall_Node_372|Ast_ICS_B_MemberProcedureCall_Node_373|Ast_ICS_B_MemberProcedureCall_Node_374|Ast_ICS_B_MemberProcedureCall_Node_375|Ast_ICS_B_ProcedureCall_Node_376|Ast_ICS_B_ProcedureCall_Node_378|Ast_ICS_S_MembersCall_Node|Ast_MCS_S_ProcedureOrArrayCall_Node_470|Ast_MCS_S_ProcedureOrArrayCall_Node_471|Ast_MCS_S_ProcedureOrArrayCall_Node_472|Ast_MCS_S_ProcedureOrArrayCall_Node_473|Ast_ICS_S_ProcedureOrArrayCall_Node_474|Ast_ICS_S_ProcedureOrArrayCall_Node_475|Ast_ICS_S_ProcedureOrArrayCall_Node_476|Ast_ICS_S_ProcedureOrArrayCall_Node_477|Ast_ICS_S_VariableOrProcedureCall_Node_478|Ast_ICS_S_VariableOrProcedureCall_Node_479|Ast_MCS_S_VariableOrProcedureCall_Node_480|Ast_MCS_S_VariableOrProcedureCall_Node_481;
        

        type Ast_ICS_B_MemberProcedureCall_group_47_Parent_Node_370 = Ast_ICS_B_MemberProcedureCall_Node_372|Ast_ICS_B_MemberProcedureCall_Node_373|Ast_ICS_B_MemberProcedureCall_Node_374|Ast_ICS_B_MemberProcedureCall_Node_375;
        

        type Ast_ICS_B_MemberProcedureCall_group_47_Parent_Node_371 = Ast_ICS_B_MemberProcedureCall_Node_372|Ast_ICS_B_MemberProcedureCall_Node_373|Ast_ICS_B_MemberProcedureCall_Node_374|Ast_ICS_B_MemberProcedureCall_Node_375;
        

        type Ast_ArgsCall_group_def_51_Parent_Node_380 = Ast_ArgsCall_Node;
        

        type Ast_ArgsCall_group_def_51_Parent_Node_381 = Ast_ArgsCall_Node;
        

        type Ast_VariableStmt_group_def_53_Parent_Node = Ast_VariableStmt_group_52_Parent_Node_385;
        

        type Ast_VariableStmt_group_52_Parent_Node_385 = Ast_VariableStmt_Node_390|Ast_VariableStmt_Node_391;
        

        type Ast_VariableStmt_group_def_54_Parent_Node = Ast_VariableStmt_group_52_Parent_Node_387;
        

        type Ast_VariableStmt_group_52_Parent_Node_387 = Ast_VariableStmt_Node_390|Ast_VariableStmt_Node_391;
        

        type Ast_VariableStmt_group_def_55_Parent_Node = Ast_VariableStmt_group_52_Parent_Node_389;
        

        type Ast_VariableStmt_group_52_Parent_Node_389 = Ast_VariableStmt_Node_390|Ast_VariableStmt_Node_391;
        

        type Ast_WithStmt_group_def_57_Parent_Node = Ast_WithStmt_group_56_Parent_Node_393;
        

        type Ast_WithStmt_group_56_Parent_Node_393 = Ast_WithStmt_Node_396|Ast_WithStmt_Node_397;
        

        type Ast_WithStmt_group_def_58_Parent_Node = Ast_WithStmt_group_56_Parent_Node_395;
        

        type Ast_WithStmt_group_56_Parent_Node_395 = Ast_WithStmt_Node_396|Ast_WithStmt_Node_397;
        

        type Ast_VariableListStmt_group_def_60_Parent_Node = Ast_VariableListStmt_Node;
        

        type Ast_VariableSubStmt_group_def_62_Parent_Node_400 = Ast_VariableSubStmt_Node_402|Ast_VariableSubStmt_Node_403|Ast_VariableSubStmt_Node_404|Ast_VariableSubStmt_Node_405;
        

        type Ast_VariableSubStmt_group_def_62_Parent_Node_401 = Ast_VariableSubStmt_Node_402|Ast_VariableSubStmt_Node_403|Ast_VariableSubStmt_Node_404|Ast_VariableSubStmt_Node_405;
        

        type Ast_Subscript__group_def_65_Parent_Node = Ast_Subscript__Node_412|Ast_Subscript__Node_416;
        

        type Ast_Subscripts_group_def_67_Parent_Node = Ast_Subscripts_Node;
        

        type Ast_ArgList_group_def_71_Parent_Node = Ast_ArgList_group_def_72_Parent_Node;
        

        type Ast_ArgList_group_def_72_Parent_Node = Ast_ArgList_Node_420;
        

        type Ast_ICS_S_MembersCall_group_def_75_Parent_Node = Ast_ICS_S_MembersCall_group_74_Parent_Node_453;
        

        type Ast_ICS_S_MembersCall_group_74_Parent_Node_453 = Ast_ICS_S_MembersCall_group_def_77_Parent_Node_456;
        

        type Ast_ICS_S_MembersCall_group_def_76_Parent_Node = Ast_ICS_S_MembersCall_group_74_Parent_Node_455;
        

        type Ast_ICS_S_MembersCall_group_74_Parent_Node_455 = Ast_ICS_S_MembersCall_group_def_77_Parent_Node_456;
        

        type Ast_ICS_S_MembersCall_group_def_77_Parent_Node_456 = Ast_ICS_S_MembersCall_group_73_Parent_Node_458;
        

        type Ast_ICS_S_MembersCall_group_def_77_Parent_Node_457 = Ast_ICS_S_MembersCall_group_73_Parent_Node_458;
        

        type Ast_ICS_S_MembersCall_group_73_Parent_Node_458 = Ast_ICS_S_MembersCall_Node;
        

        type Ast_ICS_S_MembersCall_group_def_78_Parent_Node = Ast_ICS_S_MembersCall_group_73_Parent_Node_460;
        

        type Ast_ICS_S_MembersCall_group_73_Parent_Node_460 = Ast_ICS_S_MembersCall_Node;
        

        type Ast_ICS_S_MemberCall_group_def_81_Parent_Node = Ast_ICS_S_MemberCall_group_80_Parent_Node_463|Ast_ICS_S_SpaceMemberCall_group_83_Parent_Node_467;
        

        type Ast_ICS_S_MemberCall_group_80_Parent_Node_463 = Ast_ICS_S_MemberCall_Node;
        

        type Ast_ICS_S_MemberCall_group_def_82_Parent_Node = Ast_ICS_S_MemberCall_group_80_Parent_Node_465|Ast_ICS_S_SpaceMemberCall_group_83_Parent_Node_468;
        

        type Ast_ICS_S_MemberCall_group_80_Parent_Node_465 = Ast_ICS_S_MemberCall_Node;
        

        type Ast_ICS_S_SpaceMemberCall_group_83_Parent_Node_467 = Ast_ICS_S_SpaceMemberCall_Node;
        

        type Ast_ICS_S_SpaceMemberCall_group_83_Parent_Node_468 = Ast_ICS_S_SpaceMemberCall_Node;
        

        type Ast_Arg_group_def_89_Parent_Node = Ast_Arg_group_88_Parent_Node_497;
        

        type Ast_Arg_group_88_Parent_Node_497 = Ast_Arg_Node_501|Ast_Arg_Node_502|Ast_Arg_Node_503|Ast_Arg_Node_504|Ast_Arg_Node_505|Ast_Arg_Node_506|Ast_Arg_Node_507|Ast_Arg_Node_508|Ast_Arg_Node_509|Ast_Arg_Node_510|Ast_Arg_Node_511|Ast_Arg_Node_512|Ast_Arg_Node_513|Ast_Arg_Node_514|Ast_Arg_Node_515|Ast_Arg_Node_516|Ast_Arg_Node_517|Ast_Arg_Node_518|Ast_Arg_Node_519|Ast_Arg_Node_520|Ast_Arg_Node_521|Ast_Arg_Node_522|Ast_Arg_Node_523|Ast_Arg_Node_524|Ast_Arg_Node_525|Ast_Arg_Node_526|Ast_Arg_Node_527|Ast_Arg_Node_528|Ast_Arg_Node_529|Ast_Arg_Node_530|Ast_Arg_Node_531|Ast_Arg_Node_532|Ast_Arg_Node_565|Ast_Arg_Node_566|Ast_Arg_Node_567|Ast_Arg_Node_568|Ast_Arg_Node_569|Ast_Arg_Node_570|Ast_Arg_Node_571|Ast_Arg_Node_572|Ast_Arg_Node_573|Ast_Arg_Node_574|Ast_Arg_Node_575|Ast_Arg_Node_576|Ast_Arg_Node_577|Ast_Arg_Node_578|Ast_Arg_Node_579|Ast_Arg_Node_580|Ast_Arg_Node_581|Ast_Arg_Node_582|Ast_Arg_Node_583|Ast_Arg_Node_584|Ast_Arg_Node_585|Ast_Arg_Node_586|Ast_Arg_Node_587|Ast_Arg_Node_588|Ast_Arg_Node_589|Ast_Arg_Node_590|Ast_Arg_Node_591|Ast_Arg_Node_592|Ast_Arg_Node_593|Ast_Arg_Node_594|Ast_Arg_Node_595|Ast_Arg_Node_596;
        

        type Ast_Arg_group_def_90_Parent_Node = Ast_Arg_group_88_Parent_Node_499;
        

        type Ast_Arg_group_88_Parent_Node_499 = Ast_Arg_Node_501|Ast_Arg_Node_502|Ast_Arg_Node_503|Ast_Arg_Node_504|Ast_Arg_Node_505|Ast_Arg_Node_506|Ast_Arg_Node_507|Ast_Arg_Node_508|Ast_Arg_Node_509|Ast_Arg_Node_510|Ast_Arg_Node_511|Ast_Arg_Node_512|Ast_Arg_Node_513|Ast_Arg_Node_514|Ast_Arg_Node_515|Ast_Arg_Node_516|Ast_Arg_Node_517|Ast_Arg_Node_518|Ast_Arg_Node_519|Ast_Arg_Node_520|Ast_Arg_Node_521|Ast_Arg_Node_522|Ast_Arg_Node_523|Ast_Arg_Node_524|Ast_Arg_Node_525|Ast_Arg_Node_526|Ast_Arg_Node_527|Ast_Arg_Node_528|Ast_Arg_Node_529|Ast_Arg_Node_530|Ast_Arg_Node_531|Ast_Arg_Node_532|Ast_Arg_Node_565|Ast_Arg_Node_566|Ast_Arg_Node_567|Ast_Arg_Node_568|Ast_Arg_Node_569|Ast_Arg_Node_570|Ast_Arg_Node_571|Ast_Arg_Node_572|Ast_Arg_Node_573|Ast_Arg_Node_574|Ast_Arg_Node_575|Ast_Arg_Node_576|Ast_Arg_Node_577|Ast_Arg_Node_578|Ast_Arg_Node_579|Ast_Arg_Node_580|Ast_Arg_Node_581|Ast_Arg_Node_582|Ast_Arg_Node_583|Ast_Arg_Node_584|Ast_Arg_Node_585|Ast_Arg_Node_586|Ast_Arg_Node_587|Ast_Arg_Node_588|Ast_Arg_Node_589|Ast_Arg_Node_590|Ast_Arg_Node_591|Ast_Arg_Node_592|Ast_Arg_Node_593|Ast_Arg_Node_594|Ast_Arg_Node_595|Ast_Arg_Node_596;
        

        type Ast_Arg_group_def_92_Parent_Node = Ast_Arg_Node_501|Ast_Arg_Node_502|Ast_Arg_Node_503|Ast_Arg_Node_504|Ast_Arg_Node_509|Ast_Arg_Node_510|Ast_Arg_Node_511|Ast_Arg_Node_512|Ast_Arg_Node_517|Ast_Arg_Node_518|Ast_Arg_Node_519|Ast_Arg_Node_520|Ast_Arg_Node_525|Ast_Arg_Node_526|Ast_Arg_Node_527|Ast_Arg_Node_528|Ast_Arg_Node_533|Ast_Arg_Node_534|Ast_Arg_Node_535|Ast_Arg_Node_536|Ast_Arg_Node_541|Ast_Arg_Node_542|Ast_Arg_Node_543|Ast_Arg_Node_544|Ast_Arg_Node_549|Ast_Arg_Node_550|Ast_Arg_Node_551|Ast_Arg_Node_552|Ast_Arg_Node_557|Ast_Arg_Node_558|Ast_Arg_Node_559|Ast_Arg_Node_560|Ast_Arg_Node_565|Ast_Arg_Node_566|Ast_Arg_Node_567|Ast_Arg_Node_568|Ast_Arg_Node_573|Ast_Arg_Node_574|Ast_Arg_Node_575|Ast_Arg_Node_576|Ast_Arg_Node_581|Ast_Arg_Node_582|Ast_Arg_Node_583|Ast_Arg_Node_584|Ast_Arg_Node_589|Ast_Arg_Node_590|Ast_Arg_Node_591|Ast_Arg_Node_592|Ast_Arg_Node_597|Ast_Arg_Node_598|Ast_Arg_Node_599|Ast_Arg_Node_600|Ast_Arg_Node_605|Ast_Arg_Node_606|Ast_Arg_Node_607|Ast_Arg_Node_608|Ast_Arg_Node_613|Ast_Arg_Node_614|Ast_Arg_Node_615|Ast_Arg_Node_616|Ast_Arg_Node_621|Ast_Arg_Node_622|Ast_Arg_Node_623|Ast_Arg_Node_624|Ast_Type__Node_636;
        

        type Ast_Type__group_def_94_Parent_Node = Ast_Type__group_93_Parent_Node_633;
        

        type Ast_Type__group_93_Parent_Node_633 = Ast_Type__Node_636|Ast_Type__Node_637;
        

        type Ast_Type__group_def_95_Parent_Node = Ast_Type__group_93_Parent_Node_635;
        

        type Ast_Type__group_93_Parent_Node_635 = Ast_Type__Node_636|Ast_Type__Node_637;
        

        type Ast_ComplexType_group_def_98_Parent_Node = Ast_ComplexType_Node;
        
interface Ast_Progam_Node_0_ extends BaseSymbolNode {
        symbol:"progam";
        
        children:[...ZeroOrMore<Ast_EndOfLine_Node>,Ast_ModuleAttributes_Node,...ZeroOrMore<Ast_EndOfLine_Node>,Ast_ModuleDeclarations_Node,...ZeroOrMore<Ast_EndOfLine_Node>,Ast_ModuleBody_Node,...ZeroOrMore<Ast_EndOfLine_Node>,Ast_$EOF_Node];
        
      }
type Ast_Progam_Node_0 = Ast_Progam_Node_0_;
interface Ast_Progam_Node_1_ extends BaseSymbolNode {
        symbol:"progam";
        
        children:[...ZeroOrMore<Ast_EndOfLine_Node>,Ast_ModuleAttributes_Node,...ZeroOrMore<Ast_EndOfLine_Node>,Ast_ModuleDeclarations_Node,...ZeroOrMore<Ast_EndOfLine_Node>,...ZeroOrMore<Ast_EndOfLine_Node>,Ast_$EOF_Node];
        
      }
type Ast_Progam_Node_1 = Ast_Progam_Node_1_;
interface Ast_Progam_Node_2_ extends BaseSymbolNode {
        symbol:"progam";
        
        children:[...ZeroOrMore<Ast_EndOfLine_Node>,Ast_ModuleAttributes_Node,...ZeroOrMore<Ast_EndOfLine_Node>,...ZeroOrMore<Ast_EndOfLine_Node>,Ast_ModuleBody_Node,...ZeroOrMore<Ast_EndOfLine_Node>,Ast_$EOF_Node];
        
      }
type Ast_Progam_Node_2 = Ast_Progam_Node_2_;
interface Ast_Progam_Node_3_ extends BaseSymbolNode {
        symbol:"progam";
        
        children:[...ZeroOrMore<Ast_EndOfLine_Node>,Ast_ModuleAttributes_Node,...ZeroOrMore<Ast_EndOfLine_Node>,...ZeroOrMore<Ast_EndOfLine_Node>,...ZeroOrMore<Ast_EndOfLine_Node>,Ast_$EOF_Node];
        
      }
type Ast_Progam_Node_3 = Ast_Progam_Node_3_;
interface Ast_Progam_Node_4_ extends BaseSymbolNode {
        symbol:"progam";
        
        children:[...ZeroOrMore<Ast_EndOfLine_Node>,...ZeroOrMore<Ast_EndOfLine_Node>,Ast_ModuleDeclarations_Node,...ZeroOrMore<Ast_EndOfLine_Node>,Ast_ModuleBody_Node,...ZeroOrMore<Ast_EndOfLine_Node>,Ast_$EOF_Node];
        
      }
type Ast_Progam_Node_4 = Ast_Progam_Node_4_;
interface Ast_Progam_Node_5_ extends BaseSymbolNode {
        symbol:"progam";
        
        children:[...ZeroOrMore<Ast_EndOfLine_Node>,...ZeroOrMore<Ast_EndOfLine_Node>,Ast_ModuleDeclarations_Node,...ZeroOrMore<Ast_EndOfLine_Node>,...ZeroOrMore<Ast_EndOfLine_Node>,Ast_$EOF_Node];
        
      }
type Ast_Progam_Node_5 = Ast_Progam_Node_5_;
interface Ast_Progam_Node_6_ extends BaseSymbolNode {
        symbol:"progam";
        
        children:[...ZeroOrMore<Ast_EndOfLine_Node>,...ZeroOrMore<Ast_EndOfLine_Node>,...ZeroOrMore<Ast_EndOfLine_Node>,Ast_ModuleBody_Node,...ZeroOrMore<Ast_EndOfLine_Node>,Ast_$EOF_Node];
        
      }
type Ast_Progam_Node_6 = Ast_Progam_Node_6_;
interface Ast_Progam_Node_7_ extends BaseSymbolNode {
        symbol:"progam";
        
        children:[...ZeroOrMore<Ast_EndOfLine_Node>,...ZeroOrMore<Ast_EndOfLine_Node>,...ZeroOrMore<Ast_EndOfLine_Node>,...ZeroOrMore<Ast_EndOfLine_Node>,Ast_$EOF_Node];
        
      }
type Ast_Progam_Node_7 = Ast_Progam_Node_7_;
interface Ast_NEWLINE_Node_ extends BaseTokenNode {
            token:"NEWLINE";
            parent:Ast_EndOfLine_Node_8;
          }
export type Ast_NEWLINE_Node = Ast_NEWLINE_Node_;
interface Ast_EndOfLine_Node_8_ extends BaseSymbolNode {
        symbol:"endOfLine";
        
        children:[Ast_NEWLINE_Node];
        parent:Ast_Progam_Node_0 | Ast_Progam_Node_1 | Ast_Progam_Node_2 | Ast_Progam_Node_3 | Ast_Progam_Node_4 | Ast_Progam_Node_5 | Ast_Progam_Node_6 | Ast_Progam_Node_7 | Ast_EndOfStatement_group_def_2_Parent_Node | Ast_ModuleAttributes_group_def_5_Parent_Node | Ast_ModuleDeclarations_group_def_9_Parent_Node | Ast_ModuleDeclarations_Node | Ast_ModuleBody_group_def_11_Parent_Node | Ast_ModuleBody_Node;
      }
type Ast_EndOfLine_Node_8 = Ast_EndOfLine_Node_8_;
interface Ast_COMMENT_Node_ extends BaseTokenNode {
            token:"COMMENT";
            parent:Ast_EndOfLine_Node_9 | Ast_ModuleDeclarationsElement_Node_22;
          }
export type Ast_COMMENT_Node = Ast_COMMENT_Node_;
interface Ast_EndOfLine_Node_9_ extends BaseSymbolNode {
        symbol:"endOfLine";
        
        children:[Ast_COMMENT_Node];
        parent:Ast_Progam_Node_0 | Ast_Progam_Node_1 | Ast_Progam_Node_2 | Ast_Progam_Node_3 | Ast_Progam_Node_4 | Ast_Progam_Node_5 | Ast_Progam_Node_6 | Ast_Progam_Node_7 | Ast_EndOfStatement_group_def_2_Parent_Node | Ast_ModuleAttributes_group_def_5_Parent_Node | Ast_ModuleDeclarations_group_def_9_Parent_Node | Ast_ModuleDeclarations_Node | Ast_ModuleBody_group_def_11_Parent_Node | Ast_ModuleBody_Node;
      }
type Ast_EndOfLine_Node_9 = Ast_EndOfLine_Node_9_;
interface Ast_REMCOMMENT_Node_ extends BaseTokenNode {
            token:"REMCOMMENT";
            parent:Ast_EndOfLine_Node_10;
          }
export type Ast_REMCOMMENT_Node = Ast_REMCOMMENT_Node_;
interface Ast_EndOfLine_Node_10_ extends BaseSymbolNode {
        symbol:"endOfLine";
        
        children:[Ast_REMCOMMENT_Node];
        parent:Ast_Progam_Node_0 | Ast_Progam_Node_1 | Ast_Progam_Node_2 | Ast_Progam_Node_3 | Ast_Progam_Node_4 | Ast_Progam_Node_5 | Ast_Progam_Node_6 | Ast_Progam_Node_7 | Ast_EndOfStatement_group_def_2_Parent_Node | Ast_ModuleAttributes_group_def_5_Parent_Node | Ast_ModuleDeclarations_group_def_9_Parent_Node | Ast_ModuleDeclarations_Node | Ast_ModuleBody_group_def_11_Parent_Node | Ast_ModuleBody_Node;
      }
type Ast_EndOfLine_Node_10 = Ast_EndOfLine_Node_10_;
type Ast_EndOfStatement_group_def_2_Node  = [Ast_EndOfLine_Node];
type Ast_EndOfStatement_group_1_Node_12  = [...Ast_EndOfStatement_group_def_2_Node];
interface Ast_COLON_Node_ extends BaseTokenNode {
            token:"COLON";
            parent:Ast_EndOfStatement_group_def_3_Parent_Node | Ast_LineLabel_Node;
          }
export type Ast_COLON_Node = Ast_COLON_Node_;
type Ast_EndOfStatement_group_def_3_Node  = [Ast_COLON_Node];
type Ast_EndOfStatement_group_1_Node_14  = [...Ast_EndOfStatement_group_def_3_Node];
interface Ast_EndOfStatement_Node_ extends BaseSymbolNode {
        symbol:"endOfStatement";
        
        children:[...OneOrMore<Ast_EndOfStatement_group_1_Node>];
        parent:Ast_SubStmt_Node_40 | Ast_SubStmt_Node_41 | Ast_SubStmt_Node_42 | Ast_SubStmt_Node_43 | Ast_SubStmt_Node_44 | Ast_SubStmt_Node_45 | Ast_SubStmt_Node_46 | Ast_SubStmt_Node_47 | Ast_SubStmt_Node_48 | Ast_SubStmt_Node_49 | Ast_SubStmt_Node_50 | Ast_SubStmt_Node_51 | Ast_SubStmt_Node_52 | Ast_SubStmt_Node_53 | Ast_SubStmt_Node_54 | Ast_SubStmt_Node_55 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_69 | Ast_PropertyGetStmt_Node_70 | Ast_PropertyGetStmt_Node_71 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_PropertyGetStmt_Node_78 | Ast_PropertyGetStmt_Node_79 | Ast_PropertyGetStmt_Node_80 | Ast_PropertyGetStmt_Node_81 | Ast_PropertyGetStmt_Node_82 | Ast_PropertyGetStmt_Node_83 | Ast_PropertyGetStmt_Node_84 | Ast_PropertyGetStmt_Node_85 | Ast_PropertyGetStmt_Node_86 | Ast_PropertyGetStmt_Node_87 | Ast_PropertyGetStmt_Node_88 | Ast_PropertyGetStmt_Node_89 | Ast_PropertyGetStmt_Node_90 | Ast_PropertyGetStmt_Node_91 | Ast_PropertyGetStmt_Node_92 | Ast_PropertyGetStmt_Node_93 | Ast_PropertyGetStmt_Node_94 | Ast_PropertyGetStmt_Node_95 | Ast_PropertyGetStmt_Node_96 | Ast_PropertyGetStmt_Node_97 | Ast_PropertyGetStmt_Node_98 | Ast_PropertyGetStmt_Node_99 | Ast_PropertyGetStmt_Node_100 | Ast_PropertyGetStmt_Node_101 | Ast_PropertyGetStmt_Node_102 | Ast_PropertyGetStmt_Node_103 | Ast_PropertyGetStmt_Node_104 | Ast_PropertyGetStmt_Node_105 | Ast_PropertyGetStmt_Node_106 | Ast_PropertyGetStmt_Node_107 | Ast_PropertyGetStmt_Node_108 | Ast_PropertyGetStmt_Node_109 | Ast_PropertyGetStmt_Node_110 | Ast_PropertyGetStmt_Node_111 | Ast_PropertyGetStmt_Node_112 | Ast_PropertyGetStmt_Node_113 | Ast_PropertyGetStmt_Node_114 | Ast_PropertyGetStmt_Node_115 | Ast_PropertyGetStmt_Node_116 | Ast_PropertyGetStmt_Node_117 | Ast_PropertyGetStmt_Node_118 | Ast_PropertyGetStmt_Node_119 | Ast_PropertySetStmt_Node_120 | Ast_PropertySetStmt_Node_121 | Ast_PropertySetStmt_Node_122 | Ast_PropertySetStmt_Node_123 | Ast_PropertySetStmt_Node_124 | Ast_PropertySetStmt_Node_125 | Ast_PropertySetStmt_Node_126 | Ast_PropertySetStmt_Node_127 | Ast_PropertySetStmt_Node_128 | Ast_PropertySetStmt_Node_129 | Ast_PropertySetStmt_Node_130 | Ast_PropertySetStmt_Node_131 | Ast_PropertySetStmt_Node_132 | Ast_PropertySetStmt_Node_133 | Ast_PropertySetStmt_Node_134 | Ast_PropertySetStmt_Node_135 | Ast_PropertyLetStmt_Node_136 | Ast_PropertyLetStmt_Node_137 | Ast_PropertyLetStmt_Node_138 | Ast_PropertyLetStmt_Node_139 | Ast_PropertyLetStmt_Node_140 | Ast_PropertyLetStmt_Node_141 | Ast_PropertyLetStmt_Node_142 | Ast_PropertyLetStmt_Node_143 | Ast_PropertyLetStmt_Node_144 | Ast_PropertyLetStmt_Node_145 | Ast_PropertyLetStmt_Node_146 | Ast_PropertyLetStmt_Node_147 | Ast_PropertyLetStmt_Node_148 | Ast_PropertyLetStmt_Node_149 | Ast_PropertyLetStmt_Node_150 | Ast_PropertyLetStmt_Node_151 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_158 | Ast_FunctionStmt_Node_159 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_166 | Ast_FunctionStmt_Node_167 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_171 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_FunctionStmt_Node_174 | Ast_FunctionStmt_Node_175 | Ast_FunctionStmt_Node_176 | Ast_FunctionStmt_Node_177 | Ast_FunctionStmt_Node_178 | Ast_FunctionStmt_Node_179 | Ast_FunctionStmt_Node_180 | Ast_FunctionStmt_Node_181 | Ast_FunctionStmt_Node_182 | Ast_FunctionStmt_Node_183 | Ast_FunctionStmt_Node_184 | Ast_FunctionStmt_Node_185 | Ast_FunctionStmt_Node_186 | Ast_FunctionStmt_Node_187 | Ast_FunctionStmt_Node_188 | Ast_FunctionStmt_Node_189 | Ast_FunctionStmt_Node_190 | Ast_FunctionStmt_Node_191 | Ast_FunctionStmt_Node_192 | Ast_FunctionStmt_Node_193 | Ast_FunctionStmt_Node_194 | Ast_FunctionStmt_Node_195 | Ast_FunctionStmt_Node_196 | Ast_FunctionStmt_Node_197 | Ast_FunctionStmt_Node_198 | Ast_FunctionStmt_Node_199 | Ast_FunctionStmt_Node_200 | Ast_FunctionStmt_Node_201 | Ast_FunctionStmt_Node_202 | Ast_FunctionStmt_Node_203 | Ast_FunctionStmt_Node_204 | Ast_FunctionStmt_Node_205 | Ast_FunctionStmt_Node_206 | Ast_FunctionStmt_Node_207 | Ast_FunctionStmt_Node_208 | Ast_FunctionStmt_Node_209 | Ast_FunctionStmt_Node_210 | Ast_FunctionStmt_Node_211 | Ast_FunctionStmt_Node_212 | Ast_FunctionStmt_Node_213 | Ast_FunctionStmt_Node_214 | Ast_FunctionStmt_Node_215 | Ast_Block_group_def_13_Parent_Node | Ast_Block_Node | Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_241 | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Case_Node_295 | Ast_SC_Case_Node_296 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_IfElseBlockStmt_Node_316 | Ast_IfElseBlockStmt_Node_317 | Ast_WithStmt_Node_396 | Ast_WithStmt_Node_397;
      }
type Ast_EndOfStatement_Node = Ast_EndOfStatement_Node_;
type Ast_ModuleAttributes_group_def_5_Node  = [Ast_AttributeStmt_Node,...OneOrMore<Ast_EndOfLine_Node>];
interface Ast_ModuleAttributes_Node_ extends BaseSymbolNode {
        symbol:"moduleAttributes";
        
        children:[...OneOrMore<Ast_ModuleAttributes_group_def_5_Node>];
        parent:Ast_Progam_Node_0 | Ast_Progam_Node_1 | Ast_Progam_Node_2 | Ast_Progam_Node_3;
      }
type Ast_ModuleAttributes_Node = Ast_ModuleAttributes_Node_;
interface Ast_TOKEN_0_Node_ extends BaseTokenNode {
            token:",";
            parent:Ast_AttributeStmt_group_def_7_Parent_Node | Ast_SC_Cond_group_def_21_Parent_Node | Ast_EraseStmt_group_def_31_Parent_Node | Ast_RedimStmt_group_def_33_Parent_Node | Ast_ArgsCall_group_def_51_Parent_Node_380 | Ast_ArgsCall_group_def_51_Parent_Node_381 | Ast_ArgsCall_Node | Ast_VariableListStmt_group_def_60_Parent_Node | Ast_Subscripts_group_def_67_Parent_Node | Ast_ArgList_group_def_71_Parent_Node;
          }
export type Ast_TOKEN_0_Node = Ast_TOKEN_0_Node_;
type Ast_AttributeStmt_group_def_7_Node  = [Ast_TOKEN_0_Node,Ast_Literal_Node];
interface Ast_ATTRIBUTE_Node_ extends BaseTokenNode {
            token:"ATTRIBUTE";
            parent:Ast_AttributeStmt_Node | Ast_AmbiguousIdentifier_Node_651;
          }
export type Ast_ATTRIBUTE_Node = Ast_ATTRIBUTE_Node_;
interface Ast_EQ_Node_ extends BaseTokenNode {
            token:"EQ";
            parent:Ast_AttributeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ComparisonOperator_Node_304 | Ast_LetStmt_group_def_35_Parent_Node | Ast_SetStmt_Node | Ast_ValueStmt_Node_434 | Ast_ArgDefaultValue_Node;
          }
export type Ast_EQ_Node = Ast_EQ_Node_;
interface Ast_AttributeStmt_Node_ extends BaseSymbolNode {
        symbol:"attributeStmt";
        
        children:[Ast_ATTRIBUTE_Node,Ast_ImplicitCallStmt_InStmt_Node,Ast_EQ_Node,Ast_Literal_Node,...ZeroOrMore<Ast_AttributeStmt_group_def_7_Node>];
        parent:Ast_ModuleAttributes_group_def_5_Parent_Node | Ast_BlockStmt_Node_220;
      }
type Ast_AttributeStmt_Node = Ast_AttributeStmt_Node_;
type Ast_ModuleDeclarations_group_def_9_Node  = [...OneOrMore<Ast_EndOfLine_Node>,Ast_ModuleDeclarationsElement_Node];
interface Ast_ModuleDeclarations_Node_ extends BaseSymbolNode {
        symbol:"moduleDeclarations";
        
        children:[Ast_ModuleDeclarationsElement_Node,...ZeroOrMore<Ast_ModuleDeclarations_group_def_9_Node>,...ZeroOrMore<Ast_EndOfLine_Node>];
        parent:Ast_Progam_Node_0 | Ast_Progam_Node_1 | Ast_Progam_Node_4 | Ast_Progam_Node_5;
      }
type Ast_ModuleDeclarations_Node = Ast_ModuleDeclarations_Node_;
interface Ast_ModuleDeclarationsElement_Node_22_ extends BaseSymbolNode {
        symbol:"moduleDeclarationsElement";
        
        children:[Ast_COMMENT_Node];
        parent:Ast_ModuleDeclarations_group_def_9_Parent_Node | Ast_ModuleDeclarations_Node;
      }
type Ast_ModuleDeclarationsElement_Node_22 = Ast_ModuleDeclarationsElement_Node_22_;
interface Ast_ModuleDeclarationsElement_Node_23_ extends BaseSymbolNode {
        symbol:"moduleDeclarationsElement";
        
        children:[Ast_VariableStmt_Node];
        parent:Ast_ModuleDeclarations_group_def_9_Parent_Node | Ast_ModuleDeclarations_Node;
      }
type Ast_ModuleDeclarationsElement_Node_23 = Ast_ModuleDeclarationsElement_Node_23_;
interface Ast_ModuleDeclarationsElement_Node_24_ extends BaseSymbolNode {
        symbol:"moduleDeclarationsElement";
        
        children:[Ast_ModuleOption_Node];
        parent:Ast_ModuleDeclarations_group_def_9_Parent_Node | Ast_ModuleDeclarations_Node;
      }
type Ast_ModuleDeclarationsElement_Node_24 = Ast_ModuleDeclarationsElement_Node_24_;
interface Ast_OPTION_BASE_Node_ extends BaseTokenNode {
            token:"OPTION_BASE";
            parent:Ast_ModuleOption_Node_25;
          }
export type Ast_OPTION_BASE_Node = Ast_OPTION_BASE_Node_;
interface Ast_INTEGERLITERAL_Node_ extends BaseTokenNode {
            token:"INTEGERLITERAL";
            parent:Ast_ModuleOption_Node_25 | Ast_OnErrorStmt_group_def_27_Parent_Node | Ast_Literal_Node_483;
          }
export type Ast_INTEGERLITERAL_Node = Ast_INTEGERLITERAL_Node_;
interface Ast_ModuleOption_Node_25_ extends BaseSymbolNode {
        symbol:"moduleOption";
        
        children:[Ast_OPTION_BASE_Node,Ast_INTEGERLITERAL_Node];
        parent:Ast_ModuleDeclarationsElement_Node_24;
      }
type Ast_ModuleOption_Node_25 = Ast_ModuleOption_Node_25_;
interface Ast_OPTION_COMPARE_Node_ extends BaseTokenNode {
            token:"OPTION_COMPARE";
            parent:Ast_ModuleOption_Node_26;
          }
export type Ast_OPTION_COMPARE_Node = Ast_OPTION_COMPARE_Node_;
interface Ast_IDENTIFIER_Node_ extends BaseTokenNode {
            token:"IDENTIFIER";
            parent:Ast_ModuleOption_Node_26 | Ast_CertainIdentifier_Node | Ast_AmbiguousIdentifier_Node_747;
          }
export type Ast_IDENTIFIER_Node = Ast_IDENTIFIER_Node_;
interface Ast_ModuleOption_Node_26_ extends BaseSymbolNode {
        symbol:"moduleOption";
        
        children:[Ast_OPTION_COMPARE_Node,Ast_IDENTIFIER_Node];
        parent:Ast_ModuleDeclarationsElement_Node_24;
      }
type Ast_ModuleOption_Node_26 = Ast_ModuleOption_Node_26_;
interface Ast_OPTION_EXPLICIT_Node_ extends BaseTokenNode {
            token:"OPTION_EXPLICIT";
            parent:Ast_ModuleOption_Node_27;
          }
export type Ast_OPTION_EXPLICIT_Node = Ast_OPTION_EXPLICIT_Node_;
interface Ast_ModuleOption_Node_27_ extends BaseSymbolNode {
        symbol:"moduleOption";
        
        children:[Ast_OPTION_EXPLICIT_Node];
        parent:Ast_ModuleDeclarationsElement_Node_24;
      }
type Ast_ModuleOption_Node_27 = Ast_ModuleOption_Node_27_;
interface Ast_OPTION_PRIVATE_MODULE_Node_ extends BaseTokenNode {
            token:"OPTION_PRIVATE_MODULE";
            parent:Ast_ModuleOption_Node_28;
          }
export type Ast_OPTION_PRIVATE_MODULE_Node = Ast_OPTION_PRIVATE_MODULE_Node_;
interface Ast_ModuleOption_Node_28_ extends BaseSymbolNode {
        symbol:"moduleOption";
        
        children:[Ast_OPTION_PRIVATE_MODULE_Node];
        parent:Ast_ModuleDeclarationsElement_Node_24;
      }
type Ast_ModuleOption_Node_28 = Ast_ModuleOption_Node_28_;
type Ast_ModuleBody_group_def_11_Node  = [...OneOrMore<Ast_EndOfLine_Node>,Ast_ModuleBodyElement_Node];
interface Ast_ModuleBody_Node_ extends BaseSymbolNode {
        symbol:"moduleBody";
        
        children:[Ast_ModuleBodyElement_Node,...ZeroOrMore<Ast_ModuleBody_group_def_11_Node>,...ZeroOrMore<Ast_EndOfLine_Node>];
        parent:Ast_Progam_Node_0 | Ast_Progam_Node_2 | Ast_Progam_Node_4 | Ast_Progam_Node_6;
      }
type Ast_ModuleBody_Node = Ast_ModuleBody_Node_;
interface Ast_ModuleBodyElement_Node_31_ extends BaseSymbolNode {
        symbol:"moduleBodyElement";
        
        children:[Ast_FunctionStmt_Node];
        parent:Ast_ModuleBody_group_def_11_Parent_Node | Ast_ModuleBody_Node;
      }
type Ast_ModuleBodyElement_Node_31 = Ast_ModuleBodyElement_Node_31_;
interface Ast_ModuleBodyElement_Node_32_ extends BaseSymbolNode {
        symbol:"moduleBodyElement";
        
        children:[Ast_PropertyGetStmt_Node];
        parent:Ast_ModuleBody_group_def_11_Parent_Node | Ast_ModuleBody_Node;
      }
type Ast_ModuleBodyElement_Node_32 = Ast_ModuleBodyElement_Node_32_;
interface Ast_ModuleBodyElement_Node_33_ extends BaseSymbolNode {
        symbol:"moduleBodyElement";
        
        children:[Ast_PropertySetStmt_Node];
        parent:Ast_ModuleBody_group_def_11_Parent_Node | Ast_ModuleBody_Node;
      }
type Ast_ModuleBodyElement_Node_33 = Ast_ModuleBodyElement_Node_33_;
interface Ast_ModuleBodyElement_Node_34_ extends BaseSymbolNode {
        symbol:"moduleBodyElement";
        
        children:[Ast_PropertyLetStmt_Node];
        parent:Ast_ModuleBody_group_def_11_Parent_Node | Ast_ModuleBody_Node;
      }
type Ast_ModuleBodyElement_Node_34 = Ast_ModuleBodyElement_Node_34_;
interface Ast_ModuleBodyElement_Node_35_ extends BaseSymbolNode {
        symbol:"moduleBodyElement";
        
        children:[Ast_SubStmt_Node];
        parent:Ast_ModuleBody_group_def_11_Parent_Node | Ast_ModuleBody_Node;
      }
type Ast_ModuleBodyElement_Node_35 = Ast_ModuleBodyElement_Node_35_;
interface Ast_PRIVATE_Node_ extends BaseTokenNode {
            token:"PRIVATE";
            parent:Ast_Visibility_Node_36 | Ast_AmbiguousIdentifier_Node_718;
          }
export type Ast_PRIVATE_Node = Ast_PRIVATE_Node_;
interface Ast_Visibility_Node_36_ extends BaseSymbolNode {
        symbol:"visibility";
        
        children:[Ast_PRIVATE_Node];
        parent:Ast_SubStmt_Node_40 | Ast_SubStmt_Node_41 | Ast_SubStmt_Node_42 | Ast_SubStmt_Node_43 | Ast_SubStmt_Node_44 | Ast_SubStmt_Node_45 | Ast_SubStmt_Node_46 | Ast_SubStmt_Node_47 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_69 | Ast_PropertyGetStmt_Node_70 | Ast_PropertyGetStmt_Node_71 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_PropertyGetStmt_Node_78 | Ast_PropertyGetStmt_Node_79 | Ast_PropertyGetStmt_Node_80 | Ast_PropertyGetStmt_Node_81 | Ast_PropertyGetStmt_Node_82 | Ast_PropertyGetStmt_Node_83 | Ast_PropertyGetStmt_Node_84 | Ast_PropertyGetStmt_Node_85 | Ast_PropertyGetStmt_Node_86 | Ast_PropertyGetStmt_Node_87 | Ast_PropertySetStmt_Node_120 | Ast_PropertySetStmt_Node_121 | Ast_PropertySetStmt_Node_122 | Ast_PropertySetStmt_Node_123 | Ast_PropertySetStmt_Node_124 | Ast_PropertySetStmt_Node_125 | Ast_PropertySetStmt_Node_126 | Ast_PropertySetStmt_Node_127 | Ast_PropertyLetStmt_Node_136 | Ast_PropertyLetStmt_Node_137 | Ast_PropertyLetStmt_Node_138 | Ast_PropertyLetStmt_Node_139 | Ast_PropertyLetStmt_Node_140 | Ast_PropertyLetStmt_Node_141 | Ast_PropertyLetStmt_Node_142 | Ast_PropertyLetStmt_Node_143 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_158 | Ast_FunctionStmt_Node_159 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_166 | Ast_FunctionStmt_Node_167 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_171 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_FunctionStmt_Node_174 | Ast_FunctionStmt_Node_175 | Ast_FunctionStmt_Node_176 | Ast_FunctionStmt_Node_177 | Ast_FunctionStmt_Node_178 | Ast_FunctionStmt_Node_179 | Ast_FunctionStmt_Node_180 | Ast_FunctionStmt_Node_181 | Ast_FunctionStmt_Node_182 | Ast_FunctionStmt_Node_183 | Ast_VariableStmt_group_def_55_Parent_Node;
      }
type Ast_Visibility_Node_36 = Ast_Visibility_Node_36_;
interface Ast_PUBLIC_Node_ extends BaseTokenNode {
            token:"PUBLIC";
            parent:Ast_Visibility_Node_37 | Ast_AmbiguousIdentifier_Node_720;
          }
export type Ast_PUBLIC_Node = Ast_PUBLIC_Node_;
interface Ast_Visibility_Node_37_ extends BaseSymbolNode {
        symbol:"visibility";
        
        children:[Ast_PUBLIC_Node];
        parent:Ast_SubStmt_Node_40 | Ast_SubStmt_Node_41 | Ast_SubStmt_Node_42 | Ast_SubStmt_Node_43 | Ast_SubStmt_Node_44 | Ast_SubStmt_Node_45 | Ast_SubStmt_Node_46 | Ast_SubStmt_Node_47 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_69 | Ast_PropertyGetStmt_Node_70 | Ast_PropertyGetStmt_Node_71 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_PropertyGetStmt_Node_78 | Ast_PropertyGetStmt_Node_79 | Ast_PropertyGetStmt_Node_80 | Ast_PropertyGetStmt_Node_81 | Ast_PropertyGetStmt_Node_82 | Ast_PropertyGetStmt_Node_83 | Ast_PropertyGetStmt_Node_84 | Ast_PropertyGetStmt_Node_85 | Ast_PropertyGetStmt_Node_86 | Ast_PropertyGetStmt_Node_87 | Ast_PropertySetStmt_Node_120 | Ast_PropertySetStmt_Node_121 | Ast_PropertySetStmt_Node_122 | Ast_PropertySetStmt_Node_123 | Ast_PropertySetStmt_Node_124 | Ast_PropertySetStmt_Node_125 | Ast_PropertySetStmt_Node_126 | Ast_PropertySetStmt_Node_127 | Ast_PropertyLetStmt_Node_136 | Ast_PropertyLetStmt_Node_137 | Ast_PropertyLetStmt_Node_138 | Ast_PropertyLetStmt_Node_139 | Ast_PropertyLetStmt_Node_140 | Ast_PropertyLetStmt_Node_141 | Ast_PropertyLetStmt_Node_142 | Ast_PropertyLetStmt_Node_143 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_158 | Ast_FunctionStmt_Node_159 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_166 | Ast_FunctionStmt_Node_167 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_171 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_FunctionStmt_Node_174 | Ast_FunctionStmt_Node_175 | Ast_FunctionStmt_Node_176 | Ast_FunctionStmt_Node_177 | Ast_FunctionStmt_Node_178 | Ast_FunctionStmt_Node_179 | Ast_FunctionStmt_Node_180 | Ast_FunctionStmt_Node_181 | Ast_FunctionStmt_Node_182 | Ast_FunctionStmt_Node_183 | Ast_VariableStmt_group_def_55_Parent_Node;
      }
type Ast_Visibility_Node_37 = Ast_Visibility_Node_37_;
interface Ast_FRIEND_Node_ extends BaseTokenNode {
            token:"FRIEND";
            parent:Ast_Visibility_Node_38 | Ast_AmbiguousIdentifier_Node_687;
          }
export type Ast_FRIEND_Node = Ast_FRIEND_Node_;
interface Ast_Visibility_Node_38_ extends BaseSymbolNode {
        symbol:"visibility";
        
        children:[Ast_FRIEND_Node];
        parent:Ast_SubStmt_Node_40 | Ast_SubStmt_Node_41 | Ast_SubStmt_Node_42 | Ast_SubStmt_Node_43 | Ast_SubStmt_Node_44 | Ast_SubStmt_Node_45 | Ast_SubStmt_Node_46 | Ast_SubStmt_Node_47 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_69 | Ast_PropertyGetStmt_Node_70 | Ast_PropertyGetStmt_Node_71 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_PropertyGetStmt_Node_78 | Ast_PropertyGetStmt_Node_79 | Ast_PropertyGetStmt_Node_80 | Ast_PropertyGetStmt_Node_81 | Ast_PropertyGetStmt_Node_82 | Ast_PropertyGetStmt_Node_83 | Ast_PropertyGetStmt_Node_84 | Ast_PropertyGetStmt_Node_85 | Ast_PropertyGetStmt_Node_86 | Ast_PropertyGetStmt_Node_87 | Ast_PropertySetStmt_Node_120 | Ast_PropertySetStmt_Node_121 | Ast_PropertySetStmt_Node_122 | Ast_PropertySetStmt_Node_123 | Ast_PropertySetStmt_Node_124 | Ast_PropertySetStmt_Node_125 | Ast_PropertySetStmt_Node_126 | Ast_PropertySetStmt_Node_127 | Ast_PropertyLetStmt_Node_136 | Ast_PropertyLetStmt_Node_137 | Ast_PropertyLetStmt_Node_138 | Ast_PropertyLetStmt_Node_139 | Ast_PropertyLetStmt_Node_140 | Ast_PropertyLetStmt_Node_141 | Ast_PropertyLetStmt_Node_142 | Ast_PropertyLetStmt_Node_143 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_158 | Ast_FunctionStmt_Node_159 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_166 | Ast_FunctionStmt_Node_167 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_171 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_FunctionStmt_Node_174 | Ast_FunctionStmt_Node_175 | Ast_FunctionStmt_Node_176 | Ast_FunctionStmt_Node_177 | Ast_FunctionStmt_Node_178 | Ast_FunctionStmt_Node_179 | Ast_FunctionStmt_Node_180 | Ast_FunctionStmt_Node_181 | Ast_FunctionStmt_Node_182 | Ast_FunctionStmt_Node_183 | Ast_VariableStmt_group_def_55_Parent_Node;
      }
type Ast_Visibility_Node_38 = Ast_Visibility_Node_38_;
interface Ast_GLOBAL_Node_ extends BaseTokenNode {
            token:"GLOBAL";
            parent:Ast_Visibility_Node_39 | Ast_AmbiguousIdentifier_Node_691;
          }
export type Ast_GLOBAL_Node = Ast_GLOBAL_Node_;
interface Ast_Visibility_Node_39_ extends BaseSymbolNode {
        symbol:"visibility";
        
        children:[Ast_GLOBAL_Node];
        parent:Ast_SubStmt_Node_40 | Ast_SubStmt_Node_41 | Ast_SubStmt_Node_42 | Ast_SubStmt_Node_43 | Ast_SubStmt_Node_44 | Ast_SubStmt_Node_45 | Ast_SubStmt_Node_46 | Ast_SubStmt_Node_47 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_69 | Ast_PropertyGetStmt_Node_70 | Ast_PropertyGetStmt_Node_71 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_PropertyGetStmt_Node_78 | Ast_PropertyGetStmt_Node_79 | Ast_PropertyGetStmt_Node_80 | Ast_PropertyGetStmt_Node_81 | Ast_PropertyGetStmt_Node_82 | Ast_PropertyGetStmt_Node_83 | Ast_PropertyGetStmt_Node_84 | Ast_PropertyGetStmt_Node_85 | Ast_PropertyGetStmt_Node_86 | Ast_PropertyGetStmt_Node_87 | Ast_PropertySetStmt_Node_120 | Ast_PropertySetStmt_Node_121 | Ast_PropertySetStmt_Node_122 | Ast_PropertySetStmt_Node_123 | Ast_PropertySetStmt_Node_124 | Ast_PropertySetStmt_Node_125 | Ast_PropertySetStmt_Node_126 | Ast_PropertySetStmt_Node_127 | Ast_PropertyLetStmt_Node_136 | Ast_PropertyLetStmt_Node_137 | Ast_PropertyLetStmt_Node_138 | Ast_PropertyLetStmt_Node_139 | Ast_PropertyLetStmt_Node_140 | Ast_PropertyLetStmt_Node_141 | Ast_PropertyLetStmt_Node_142 | Ast_PropertyLetStmt_Node_143 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_158 | Ast_FunctionStmt_Node_159 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_166 | Ast_FunctionStmt_Node_167 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_171 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_FunctionStmt_Node_174 | Ast_FunctionStmt_Node_175 | Ast_FunctionStmt_Node_176 | Ast_FunctionStmt_Node_177 | Ast_FunctionStmt_Node_178 | Ast_FunctionStmt_Node_179 | Ast_FunctionStmt_Node_180 | Ast_FunctionStmt_Node_181 | Ast_FunctionStmt_Node_182 | Ast_FunctionStmt_Node_183 | Ast_VariableStmt_group_def_55_Parent_Node;
      }
type Ast_Visibility_Node_39 = Ast_Visibility_Node_39_;
interface Ast_STATIC_Node_ extends BaseTokenNode {
            token:"STATIC";
            parent:Ast_SubStmt_Node_40 | Ast_SubStmt_Node_41 | Ast_SubStmt_Node_42 | Ast_SubStmt_Node_43 | Ast_SubStmt_Node_48 | Ast_SubStmt_Node_49 | Ast_SubStmt_Node_50 | Ast_SubStmt_Node_51 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_69 | Ast_PropertyGetStmt_Node_70 | Ast_PropertyGetStmt_Node_71 | Ast_PropertyGetStmt_Node_88 | Ast_PropertyGetStmt_Node_89 | Ast_PropertyGetStmt_Node_90 | Ast_PropertyGetStmt_Node_91 | Ast_PropertyGetStmt_Node_92 | Ast_PropertyGetStmt_Node_93 | Ast_PropertyGetStmt_Node_94 | Ast_PropertyGetStmt_Node_95 | Ast_PropertyGetStmt_Node_96 | Ast_PropertyGetStmt_Node_97 | Ast_PropertyGetStmt_Node_98 | Ast_PropertyGetStmt_Node_99 | Ast_PropertyGetStmt_Node_100 | Ast_PropertyGetStmt_Node_101 | Ast_PropertyGetStmt_Node_102 | Ast_PropertyGetStmt_Node_103 | Ast_PropertySetStmt_Node_120 | Ast_PropertySetStmt_Node_121 | Ast_PropertySetStmt_Node_122 | Ast_PropertySetStmt_Node_123 | Ast_PropertySetStmt_Node_128 | Ast_PropertySetStmt_Node_129 | Ast_PropertySetStmt_Node_130 | Ast_PropertySetStmt_Node_131 | Ast_PropertyLetStmt_Node_136 | Ast_PropertyLetStmt_Node_137 | Ast_PropertyLetStmt_Node_138 | Ast_PropertyLetStmt_Node_139 | Ast_PropertyLetStmt_Node_144 | Ast_PropertyLetStmt_Node_145 | Ast_PropertyLetStmt_Node_146 | Ast_PropertyLetStmt_Node_147 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_158 | Ast_FunctionStmt_Node_159 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_166 | Ast_FunctionStmt_Node_167 | Ast_FunctionStmt_Node_184 | Ast_FunctionStmt_Node_185 | Ast_FunctionStmt_Node_186 | Ast_FunctionStmt_Node_187 | Ast_FunctionStmt_Node_188 | Ast_FunctionStmt_Node_189 | Ast_FunctionStmt_Node_190 | Ast_FunctionStmt_Node_191 | Ast_FunctionStmt_Node_192 | Ast_FunctionStmt_Node_193 | Ast_FunctionStmt_Node_194 | Ast_FunctionStmt_Node_195 | Ast_FunctionStmt_Node_196 | Ast_FunctionStmt_Node_197 | Ast_FunctionStmt_Node_198 | Ast_FunctionStmt_Node_199 | Ast_VariableStmt_group_def_54_Parent_Node | Ast_AmbiguousIdentifier_Node_729;
          }
export type Ast_STATIC_Node = Ast_STATIC_Node_;
interface Ast_SUB_Node_ extends BaseTokenNode {
            token:"SUB";
            parent:Ast_SubStmt_Node_40 | Ast_SubStmt_Node_41 | Ast_SubStmt_Node_42 | Ast_SubStmt_Node_43 | Ast_SubStmt_Node_44 | Ast_SubStmt_Node_45 | Ast_SubStmt_Node_46 | Ast_SubStmt_Node_47 | Ast_SubStmt_Node_48 | Ast_SubStmt_Node_49 | Ast_SubStmt_Node_50 | Ast_SubStmt_Node_51 | Ast_SubStmt_Node_52 | Ast_SubStmt_Node_53 | Ast_SubStmt_Node_54 | Ast_SubStmt_Node_55 | Ast_AmbiguousIdentifier_Node_733;
          }
export type Ast_SUB_Node = Ast_SUB_Node_;
interface Ast_END_SUB_Node_ extends BaseTokenNode {
            token:"END_SUB";
            parent:Ast_SubStmt_Node_40 | Ast_SubStmt_Node_41 | Ast_SubStmt_Node_42 | Ast_SubStmt_Node_43 | Ast_SubStmt_Node_44 | Ast_SubStmt_Node_45 | Ast_SubStmt_Node_46 | Ast_SubStmt_Node_47 | Ast_SubStmt_Node_48 | Ast_SubStmt_Node_49 | Ast_SubStmt_Node_50 | Ast_SubStmt_Node_51 | Ast_SubStmt_Node_52 | Ast_SubStmt_Node_53 | Ast_SubStmt_Node_54 | Ast_SubStmt_Node_55;
          }
export type Ast_END_SUB_Node = Ast_END_SUB_Node_;
interface Ast_SubStmt_Node_40_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_SUB_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_35;
      }
type Ast_SubStmt_Node_40 = Ast_SubStmt_Node_40_;
interface Ast_SubStmt_Node_41_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_SUB_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_35;
      }
type Ast_SubStmt_Node_41 = Ast_SubStmt_Node_41_;
interface Ast_SubStmt_Node_42_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_SUB_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_35;
      }
type Ast_SubStmt_Node_42 = Ast_SubStmt_Node_42_;
interface Ast_SubStmt_Node_43_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_SUB_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_35;
      }
type Ast_SubStmt_Node_43 = Ast_SubStmt_Node_43_;
interface Ast_SubStmt_Node_44_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_Visibility_Node,Ast_SUB_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_35;
      }
type Ast_SubStmt_Node_44 = Ast_SubStmt_Node_44_;
interface Ast_SubStmt_Node_45_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_Visibility_Node,Ast_SUB_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_35;
      }
type Ast_SubStmt_Node_45 = Ast_SubStmt_Node_45_;
interface Ast_SubStmt_Node_46_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_Visibility_Node,Ast_SUB_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_35;
      }
type Ast_SubStmt_Node_46 = Ast_SubStmt_Node_46_;
interface Ast_SubStmt_Node_47_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_Visibility_Node,Ast_SUB_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_35;
      }
type Ast_SubStmt_Node_47 = Ast_SubStmt_Node_47_;
interface Ast_SubStmt_Node_48_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_STATIC_Node,Ast_SUB_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_35;
      }
type Ast_SubStmt_Node_48 = Ast_SubStmt_Node_48_;
interface Ast_SubStmt_Node_49_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_STATIC_Node,Ast_SUB_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_35;
      }
type Ast_SubStmt_Node_49 = Ast_SubStmt_Node_49_;
interface Ast_SubStmt_Node_50_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_STATIC_Node,Ast_SUB_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_35;
      }
type Ast_SubStmt_Node_50 = Ast_SubStmt_Node_50_;
interface Ast_SubStmt_Node_51_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_STATIC_Node,Ast_SUB_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_35;
      }
type Ast_SubStmt_Node_51 = Ast_SubStmt_Node_51_;
interface Ast_SubStmt_Node_52_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_SUB_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_35;
      }
type Ast_SubStmt_Node_52 = Ast_SubStmt_Node_52_;
interface Ast_SubStmt_Node_53_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_SUB_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_35;
      }
type Ast_SubStmt_Node_53 = Ast_SubStmt_Node_53_;
interface Ast_SubStmt_Node_54_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_SUB_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_35;
      }
type Ast_SubStmt_Node_54 = Ast_SubStmt_Node_54_;
interface Ast_SubStmt_Node_55_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Ast_SUB_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_SUB_Node];
        parent:Ast_ModuleBodyElement_Node_35;
      }
type Ast_SubStmt_Node_55 = Ast_SubStmt_Node_55_;
interface Ast_PROPERTY_GET_Node_ extends BaseTokenNode {
            token:"PROPERTY_GET";
            parent:Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_69 | Ast_PropertyGetStmt_Node_70 | Ast_PropertyGetStmt_Node_71 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_PropertyGetStmt_Node_78 | Ast_PropertyGetStmt_Node_79 | Ast_PropertyGetStmt_Node_80 | Ast_PropertyGetStmt_Node_81 | Ast_PropertyGetStmt_Node_82 | Ast_PropertyGetStmt_Node_83 | Ast_PropertyGetStmt_Node_84 | Ast_PropertyGetStmt_Node_85 | Ast_PropertyGetStmt_Node_86 | Ast_PropertyGetStmt_Node_87 | Ast_PropertyGetStmt_Node_88 | Ast_PropertyGetStmt_Node_89 | Ast_PropertyGetStmt_Node_90 | Ast_PropertyGetStmt_Node_91 | Ast_PropertyGetStmt_Node_92 | Ast_PropertyGetStmt_Node_93 | Ast_PropertyGetStmt_Node_94 | Ast_PropertyGetStmt_Node_95 | Ast_PropertyGetStmt_Node_96 | Ast_PropertyGetStmt_Node_97 | Ast_PropertyGetStmt_Node_98 | Ast_PropertyGetStmt_Node_99 | Ast_PropertyGetStmt_Node_100 | Ast_PropertyGetStmt_Node_101 | Ast_PropertyGetStmt_Node_102 | Ast_PropertyGetStmt_Node_103 | Ast_PropertyGetStmt_Node_104 | Ast_PropertyGetStmt_Node_105 | Ast_PropertyGetStmt_Node_106 | Ast_PropertyGetStmt_Node_107 | Ast_PropertyGetStmt_Node_108 | Ast_PropertyGetStmt_Node_109 | Ast_PropertyGetStmt_Node_110 | Ast_PropertyGetStmt_Node_111 | Ast_PropertyGetStmt_Node_112 | Ast_PropertyGetStmt_Node_113 | Ast_PropertyGetStmt_Node_114 | Ast_PropertyGetStmt_Node_115 | Ast_PropertyGetStmt_Node_116 | Ast_PropertyGetStmt_Node_117 | Ast_PropertyGetStmt_Node_118 | Ast_PropertyGetStmt_Node_119;
          }
export type Ast_PROPERTY_GET_Node = Ast_PROPERTY_GET_Node_;
interface Ast_END_PROPERTY_Node_ extends BaseTokenNode {
            token:"END_PROPERTY";
            parent:Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_69 | Ast_PropertyGetStmt_Node_70 | Ast_PropertyGetStmt_Node_71 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_PropertyGetStmt_Node_78 | Ast_PropertyGetStmt_Node_79 | Ast_PropertyGetStmt_Node_80 | Ast_PropertyGetStmt_Node_81 | Ast_PropertyGetStmt_Node_82 | Ast_PropertyGetStmt_Node_83 | Ast_PropertyGetStmt_Node_84 | Ast_PropertyGetStmt_Node_85 | Ast_PropertyGetStmt_Node_86 | Ast_PropertyGetStmt_Node_87 | Ast_PropertyGetStmt_Node_88 | Ast_PropertyGetStmt_Node_89 | Ast_PropertyGetStmt_Node_90 | Ast_PropertyGetStmt_Node_91 | Ast_PropertyGetStmt_Node_92 | Ast_PropertyGetStmt_Node_93 | Ast_PropertyGetStmt_Node_94 | Ast_PropertyGetStmt_Node_95 | Ast_PropertyGetStmt_Node_96 | Ast_PropertyGetStmt_Node_97 | Ast_PropertyGetStmt_Node_98 | Ast_PropertyGetStmt_Node_99 | Ast_PropertyGetStmt_Node_100 | Ast_PropertyGetStmt_Node_101 | Ast_PropertyGetStmt_Node_102 | Ast_PropertyGetStmt_Node_103 | Ast_PropertyGetStmt_Node_104 | Ast_PropertyGetStmt_Node_105 | Ast_PropertyGetStmt_Node_106 | Ast_PropertyGetStmt_Node_107 | Ast_PropertyGetStmt_Node_108 | Ast_PropertyGetStmt_Node_109 | Ast_PropertyGetStmt_Node_110 | Ast_PropertyGetStmt_Node_111 | Ast_PropertyGetStmt_Node_112 | Ast_PropertyGetStmt_Node_113 | Ast_PropertyGetStmt_Node_114 | Ast_PropertyGetStmt_Node_115 | Ast_PropertyGetStmt_Node_116 | Ast_PropertyGetStmt_Node_117 | Ast_PropertyGetStmt_Node_118 | Ast_PropertyGetStmt_Node_119 | Ast_PropertySetStmt_Node_120 | Ast_PropertySetStmt_Node_121 | Ast_PropertySetStmt_Node_122 | Ast_PropertySetStmt_Node_123 | Ast_PropertySetStmt_Node_124 | Ast_PropertySetStmt_Node_125 | Ast_PropertySetStmt_Node_126 | Ast_PropertySetStmt_Node_127 | Ast_PropertySetStmt_Node_128 | Ast_PropertySetStmt_Node_129 | Ast_PropertySetStmt_Node_130 | Ast_PropertySetStmt_Node_131 | Ast_PropertySetStmt_Node_132 | Ast_PropertySetStmt_Node_133 | Ast_PropertySetStmt_Node_134 | Ast_PropertySetStmt_Node_135 | Ast_PropertyLetStmt_Node_136 | Ast_PropertyLetStmt_Node_137 | Ast_PropertyLetStmt_Node_138 | Ast_PropertyLetStmt_Node_139 | Ast_PropertyLetStmt_Node_140 | Ast_PropertyLetStmt_Node_141 | Ast_PropertyLetStmt_Node_142 | Ast_PropertyLetStmt_Node_143 | Ast_PropertyLetStmt_Node_144 | Ast_PropertyLetStmt_Node_145 | Ast_PropertyLetStmt_Node_146 | Ast_PropertyLetStmt_Node_147 | Ast_PropertyLetStmt_Node_148 | Ast_PropertyLetStmt_Node_149 | Ast_PropertyLetStmt_Node_150 | Ast_PropertyLetStmt_Node_151;
          }
export type Ast_END_PROPERTY_Node = Ast_END_PROPERTY_Node_;
interface Ast_PropertyGetStmt_Node_56_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_56 = Ast_PropertyGetStmt_Node_56_;
interface Ast_PropertyGetStmt_Node_57_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_57 = Ast_PropertyGetStmt_Node_57_;
interface Ast_PropertyGetStmt_Node_58_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_58 = Ast_PropertyGetStmt_Node_58_;
interface Ast_PropertyGetStmt_Node_59_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_59 = Ast_PropertyGetStmt_Node_59_;
interface Ast_PropertyGetStmt_Node_60_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_60 = Ast_PropertyGetStmt_Node_60_;
interface Ast_PropertyGetStmt_Node_61_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_61 = Ast_PropertyGetStmt_Node_61_;
interface Ast_PropertyGetStmt_Node_62_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_62 = Ast_PropertyGetStmt_Node_62_;
interface Ast_PropertyGetStmt_Node_63_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_63 = Ast_PropertyGetStmt_Node_63_;
interface Ast_PropertyGetStmt_Node_64_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_64 = Ast_PropertyGetStmt_Node_64_;
interface Ast_PropertyGetStmt_Node_65_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_65 = Ast_PropertyGetStmt_Node_65_;
interface Ast_PropertyGetStmt_Node_66_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_66 = Ast_PropertyGetStmt_Node_66_;
interface Ast_PropertyGetStmt_Node_67_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_67 = Ast_PropertyGetStmt_Node_67_;
interface Ast_PropertyGetStmt_Node_68_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_68 = Ast_PropertyGetStmt_Node_68_;
interface Ast_PropertyGetStmt_Node_69_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_69 = Ast_PropertyGetStmt_Node_69_;
interface Ast_PropertyGetStmt_Node_70_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_70 = Ast_PropertyGetStmt_Node_70_;
interface Ast_PropertyGetStmt_Node_71_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_71 = Ast_PropertyGetStmt_Node_71_;
interface Ast_PropertyGetStmt_Node_72_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_72 = Ast_PropertyGetStmt_Node_72_;
interface Ast_PropertyGetStmt_Node_73_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_73 = Ast_PropertyGetStmt_Node_73_;
interface Ast_PropertyGetStmt_Node_74_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_74 = Ast_PropertyGetStmt_Node_74_;
interface Ast_PropertyGetStmt_Node_75_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_75 = Ast_PropertyGetStmt_Node_75_;
interface Ast_PropertyGetStmt_Node_76_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_76 = Ast_PropertyGetStmt_Node_76_;
interface Ast_PropertyGetStmt_Node_77_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_77 = Ast_PropertyGetStmt_Node_77_;
interface Ast_PropertyGetStmt_Node_78_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_78 = Ast_PropertyGetStmt_Node_78_;
interface Ast_PropertyGetStmt_Node_79_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_79 = Ast_PropertyGetStmt_Node_79_;
interface Ast_PropertyGetStmt_Node_80_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_80 = Ast_PropertyGetStmt_Node_80_;
interface Ast_PropertyGetStmt_Node_81_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_81 = Ast_PropertyGetStmt_Node_81_;
interface Ast_PropertyGetStmt_Node_82_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_82 = Ast_PropertyGetStmt_Node_82_;
interface Ast_PropertyGetStmt_Node_83_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_83 = Ast_PropertyGetStmt_Node_83_;
interface Ast_PropertyGetStmt_Node_84_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_84 = Ast_PropertyGetStmt_Node_84_;
interface Ast_PropertyGetStmt_Node_85_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_85 = Ast_PropertyGetStmt_Node_85_;
interface Ast_PropertyGetStmt_Node_86_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_86 = Ast_PropertyGetStmt_Node_86_;
interface Ast_PropertyGetStmt_Node_87_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_87 = Ast_PropertyGetStmt_Node_87_;
interface Ast_PropertyGetStmt_Node_88_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_88 = Ast_PropertyGetStmt_Node_88_;
interface Ast_PropertyGetStmt_Node_89_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_89 = Ast_PropertyGetStmt_Node_89_;
interface Ast_PropertyGetStmt_Node_90_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_90 = Ast_PropertyGetStmt_Node_90_;
interface Ast_PropertyGetStmt_Node_91_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_91 = Ast_PropertyGetStmt_Node_91_;
interface Ast_PropertyGetStmt_Node_92_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_92 = Ast_PropertyGetStmt_Node_92_;
interface Ast_PropertyGetStmt_Node_93_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_93 = Ast_PropertyGetStmt_Node_93_;
interface Ast_PropertyGetStmt_Node_94_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_94 = Ast_PropertyGetStmt_Node_94_;
interface Ast_PropertyGetStmt_Node_95_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_95 = Ast_PropertyGetStmt_Node_95_;
interface Ast_PropertyGetStmt_Node_96_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_96 = Ast_PropertyGetStmt_Node_96_;
interface Ast_PropertyGetStmt_Node_97_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_97 = Ast_PropertyGetStmt_Node_97_;
interface Ast_PropertyGetStmt_Node_98_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_98 = Ast_PropertyGetStmt_Node_98_;
interface Ast_PropertyGetStmt_Node_99_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_99 = Ast_PropertyGetStmt_Node_99_;
interface Ast_PropertyGetStmt_Node_100_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_100 = Ast_PropertyGetStmt_Node_100_;
interface Ast_PropertyGetStmt_Node_101_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_101 = Ast_PropertyGetStmt_Node_101_;
interface Ast_PropertyGetStmt_Node_102_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_102 = Ast_PropertyGetStmt_Node_102_;
interface Ast_PropertyGetStmt_Node_103_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_103 = Ast_PropertyGetStmt_Node_103_;
interface Ast_PropertyGetStmt_Node_104_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_104 = Ast_PropertyGetStmt_Node_104_;
interface Ast_PropertyGetStmt_Node_105_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_105 = Ast_PropertyGetStmt_Node_105_;
interface Ast_PropertyGetStmt_Node_106_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_106 = Ast_PropertyGetStmt_Node_106_;
interface Ast_PropertyGetStmt_Node_107_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_107 = Ast_PropertyGetStmt_Node_107_;
interface Ast_PropertyGetStmt_Node_108_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_108 = Ast_PropertyGetStmt_Node_108_;
interface Ast_PropertyGetStmt_Node_109_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_109 = Ast_PropertyGetStmt_Node_109_;
interface Ast_PropertyGetStmt_Node_110_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_110 = Ast_PropertyGetStmt_Node_110_;
interface Ast_PropertyGetStmt_Node_111_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_111 = Ast_PropertyGetStmt_Node_111_;
interface Ast_PropertyGetStmt_Node_112_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_112 = Ast_PropertyGetStmt_Node_112_;
interface Ast_PropertyGetStmt_Node_113_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_113 = Ast_PropertyGetStmt_Node_113_;
interface Ast_PropertyGetStmt_Node_114_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_114 = Ast_PropertyGetStmt_Node_114_;
interface Ast_PropertyGetStmt_Node_115_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_115 = Ast_PropertyGetStmt_Node_115_;
interface Ast_PropertyGetStmt_Node_116_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_116 = Ast_PropertyGetStmt_Node_116_;
interface Ast_PropertyGetStmt_Node_117_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_117 = Ast_PropertyGetStmt_Node_117_;
interface Ast_PropertyGetStmt_Node_118_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_118 = Ast_PropertyGetStmt_Node_118_;
interface Ast_PropertyGetStmt_Node_119_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Ast_PROPERTY_GET_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_32;
      }
type Ast_PropertyGetStmt_Node_119 = Ast_PropertyGetStmt_Node_119_;
interface Ast_PROPERTY_SET_Node_ extends BaseTokenNode {
            token:"PROPERTY_SET";
            parent:Ast_PropertySetStmt_Node_120 | Ast_PropertySetStmt_Node_121 | Ast_PropertySetStmt_Node_122 | Ast_PropertySetStmt_Node_123 | Ast_PropertySetStmt_Node_124 | Ast_PropertySetStmt_Node_125 | Ast_PropertySetStmt_Node_126 | Ast_PropertySetStmt_Node_127 | Ast_PropertySetStmt_Node_128 | Ast_PropertySetStmt_Node_129 | Ast_PropertySetStmt_Node_130 | Ast_PropertySetStmt_Node_131 | Ast_PropertySetStmt_Node_132 | Ast_PropertySetStmt_Node_133 | Ast_PropertySetStmt_Node_134 | Ast_PropertySetStmt_Node_135;
          }
export type Ast_PROPERTY_SET_Node = Ast_PROPERTY_SET_Node_;
interface Ast_PropertySetStmt_Node_120_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_SET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_33;
      }
type Ast_PropertySetStmt_Node_120 = Ast_PropertySetStmt_Node_120_;
interface Ast_PropertySetStmt_Node_121_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_SET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_33;
      }
type Ast_PropertySetStmt_Node_121 = Ast_PropertySetStmt_Node_121_;
interface Ast_PropertySetStmt_Node_122_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_SET_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_33;
      }
type Ast_PropertySetStmt_Node_122 = Ast_PropertySetStmt_Node_122_;
interface Ast_PropertySetStmt_Node_123_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_SET_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_33;
      }
type Ast_PropertySetStmt_Node_123 = Ast_PropertySetStmt_Node_123_;
interface Ast_PropertySetStmt_Node_124_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_SET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_33;
      }
type Ast_PropertySetStmt_Node_124 = Ast_PropertySetStmt_Node_124_;
interface Ast_PropertySetStmt_Node_125_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_SET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_33;
      }
type Ast_PropertySetStmt_Node_125 = Ast_PropertySetStmt_Node_125_;
interface Ast_PropertySetStmt_Node_126_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_SET_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_33;
      }
type Ast_PropertySetStmt_Node_126 = Ast_PropertySetStmt_Node_126_;
interface Ast_PropertySetStmt_Node_127_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_SET_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_33;
      }
type Ast_PropertySetStmt_Node_127 = Ast_PropertySetStmt_Node_127_;
interface Ast_PropertySetStmt_Node_128_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_SET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_33;
      }
type Ast_PropertySetStmt_Node_128 = Ast_PropertySetStmt_Node_128_;
interface Ast_PropertySetStmt_Node_129_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_SET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_33;
      }
type Ast_PropertySetStmt_Node_129 = Ast_PropertySetStmt_Node_129_;
interface Ast_PropertySetStmt_Node_130_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_SET_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_33;
      }
type Ast_PropertySetStmt_Node_130 = Ast_PropertySetStmt_Node_130_;
interface Ast_PropertySetStmt_Node_131_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_SET_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_33;
      }
type Ast_PropertySetStmt_Node_131 = Ast_PropertySetStmt_Node_131_;
interface Ast_PropertySetStmt_Node_132_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_PROPERTY_SET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_33;
      }
type Ast_PropertySetStmt_Node_132 = Ast_PropertySetStmt_Node_132_;
interface Ast_PropertySetStmt_Node_133_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_PROPERTY_SET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_33;
      }
type Ast_PropertySetStmt_Node_133 = Ast_PropertySetStmt_Node_133_;
interface Ast_PropertySetStmt_Node_134_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_PROPERTY_SET_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_33;
      }
type Ast_PropertySetStmt_Node_134 = Ast_PropertySetStmt_Node_134_;
interface Ast_PropertySetStmt_Node_135_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Ast_PROPERTY_SET_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_33;
      }
type Ast_PropertySetStmt_Node_135 = Ast_PropertySetStmt_Node_135_;
interface Ast_PROPERTY_LET_Node_ extends BaseTokenNode {
            token:"PROPERTY_LET";
            parent:Ast_PropertyLetStmt_Node_136 | Ast_PropertyLetStmt_Node_137 | Ast_PropertyLetStmt_Node_138 | Ast_PropertyLetStmt_Node_139 | Ast_PropertyLetStmt_Node_140 | Ast_PropertyLetStmt_Node_141 | Ast_PropertyLetStmt_Node_142 | Ast_PropertyLetStmt_Node_143 | Ast_PropertyLetStmt_Node_144 | Ast_PropertyLetStmt_Node_145 | Ast_PropertyLetStmt_Node_146 | Ast_PropertyLetStmt_Node_147 | Ast_PropertyLetStmt_Node_148 | Ast_PropertyLetStmt_Node_149 | Ast_PropertyLetStmt_Node_150 | Ast_PropertyLetStmt_Node_151;
          }
export type Ast_PROPERTY_LET_Node = Ast_PROPERTY_LET_Node_;
interface Ast_PropertyLetStmt_Node_136_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_LET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_34;
      }
type Ast_PropertyLetStmt_Node_136 = Ast_PropertyLetStmt_Node_136_;
interface Ast_PropertyLetStmt_Node_137_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_LET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_34;
      }
type Ast_PropertyLetStmt_Node_137 = Ast_PropertyLetStmt_Node_137_;
interface Ast_PropertyLetStmt_Node_138_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_LET_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_34;
      }
type Ast_PropertyLetStmt_Node_138 = Ast_PropertyLetStmt_Node_138_;
interface Ast_PropertyLetStmt_Node_139_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_PROPERTY_LET_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_34;
      }
type Ast_PropertyLetStmt_Node_139 = Ast_PropertyLetStmt_Node_139_;
interface Ast_PropertyLetStmt_Node_140_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_LET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_34;
      }
type Ast_PropertyLetStmt_Node_140 = Ast_PropertyLetStmt_Node_140_;
interface Ast_PropertyLetStmt_Node_141_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_LET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_34;
      }
type Ast_PropertyLetStmt_Node_141 = Ast_PropertyLetStmt_Node_141_;
interface Ast_PropertyLetStmt_Node_142_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_LET_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_34;
      }
type Ast_PropertyLetStmt_Node_142 = Ast_PropertyLetStmt_Node_142_;
interface Ast_PropertyLetStmt_Node_143_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_Visibility_Node,Ast_PROPERTY_LET_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_34;
      }
type Ast_PropertyLetStmt_Node_143 = Ast_PropertyLetStmt_Node_143_;
interface Ast_PropertyLetStmt_Node_144_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_LET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_34;
      }
type Ast_PropertyLetStmt_Node_144 = Ast_PropertyLetStmt_Node_144_;
interface Ast_PropertyLetStmt_Node_145_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_LET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_34;
      }
type Ast_PropertyLetStmt_Node_145 = Ast_PropertyLetStmt_Node_145_;
interface Ast_PropertyLetStmt_Node_146_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_LET_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_34;
      }
type Ast_PropertyLetStmt_Node_146 = Ast_PropertyLetStmt_Node_146_;
interface Ast_PropertyLetStmt_Node_147_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_STATIC_Node,Ast_PROPERTY_LET_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_34;
      }
type Ast_PropertyLetStmt_Node_147 = Ast_PropertyLetStmt_Node_147_;
interface Ast_PropertyLetStmt_Node_148_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_PROPERTY_LET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_34;
      }
type Ast_PropertyLetStmt_Node_148 = Ast_PropertyLetStmt_Node_148_;
interface Ast_PropertyLetStmt_Node_149_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_PROPERTY_LET_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_34;
      }
type Ast_PropertyLetStmt_Node_149 = Ast_PropertyLetStmt_Node_149_;
interface Ast_PropertyLetStmt_Node_150_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_PROPERTY_LET_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_34;
      }
type Ast_PropertyLetStmt_Node_150 = Ast_PropertyLetStmt_Node_150_;
interface Ast_PropertyLetStmt_Node_151_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Ast_PROPERTY_LET_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_PROPERTY_Node];
        parent:Ast_ModuleBodyElement_Node_34;
      }
type Ast_PropertyLetStmt_Node_151 = Ast_PropertyLetStmt_Node_151_;
interface Ast_FUNCTION_Node_ extends BaseTokenNode {
            token:"FUNCTION";
            parent:Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_158 | Ast_FunctionStmt_Node_159 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_166 | Ast_FunctionStmt_Node_167 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_171 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_FunctionStmt_Node_174 | Ast_FunctionStmt_Node_175 | Ast_FunctionStmt_Node_176 | Ast_FunctionStmt_Node_177 | Ast_FunctionStmt_Node_178 | Ast_FunctionStmt_Node_179 | Ast_FunctionStmt_Node_180 | Ast_FunctionStmt_Node_181 | Ast_FunctionStmt_Node_182 | Ast_FunctionStmt_Node_183 | Ast_FunctionStmt_Node_184 | Ast_FunctionStmt_Node_185 | Ast_FunctionStmt_Node_186 | Ast_FunctionStmt_Node_187 | Ast_FunctionStmt_Node_188 | Ast_FunctionStmt_Node_189 | Ast_FunctionStmt_Node_190 | Ast_FunctionStmt_Node_191 | Ast_FunctionStmt_Node_192 | Ast_FunctionStmt_Node_193 | Ast_FunctionStmt_Node_194 | Ast_FunctionStmt_Node_195 | Ast_FunctionStmt_Node_196 | Ast_FunctionStmt_Node_197 | Ast_FunctionStmt_Node_198 | Ast_FunctionStmt_Node_199 | Ast_FunctionStmt_Node_200 | Ast_FunctionStmt_Node_201 | Ast_FunctionStmt_Node_202 | Ast_FunctionStmt_Node_203 | Ast_FunctionStmt_Node_204 | Ast_FunctionStmt_Node_205 | Ast_FunctionStmt_Node_206 | Ast_FunctionStmt_Node_207 | Ast_FunctionStmt_Node_208 | Ast_FunctionStmt_Node_209 | Ast_FunctionStmt_Node_210 | Ast_FunctionStmt_Node_211 | Ast_FunctionStmt_Node_212 | Ast_FunctionStmt_Node_213 | Ast_FunctionStmt_Node_214 | Ast_FunctionStmt_Node_215 | Ast_AmbiguousIdentifier_Node_689;
          }
export type Ast_FUNCTION_Node = Ast_FUNCTION_Node_;
interface Ast_END_FUNCTION_Node_ extends BaseTokenNode {
            token:"END_FUNCTION";
            parent:Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_158 | Ast_FunctionStmt_Node_159 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_166 | Ast_FunctionStmt_Node_167 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_171 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_FunctionStmt_Node_174 | Ast_FunctionStmt_Node_175 | Ast_FunctionStmt_Node_176 | Ast_FunctionStmt_Node_177 | Ast_FunctionStmt_Node_178 | Ast_FunctionStmt_Node_179 | Ast_FunctionStmt_Node_180 | Ast_FunctionStmt_Node_181 | Ast_FunctionStmt_Node_182 | Ast_FunctionStmt_Node_183 | Ast_FunctionStmt_Node_184 | Ast_FunctionStmt_Node_185 | Ast_FunctionStmt_Node_186 | Ast_FunctionStmt_Node_187 | Ast_FunctionStmt_Node_188 | Ast_FunctionStmt_Node_189 | Ast_FunctionStmt_Node_190 | Ast_FunctionStmt_Node_191 | Ast_FunctionStmt_Node_192 | Ast_FunctionStmt_Node_193 | Ast_FunctionStmt_Node_194 | Ast_FunctionStmt_Node_195 | Ast_FunctionStmt_Node_196 | Ast_FunctionStmt_Node_197 | Ast_FunctionStmt_Node_198 | Ast_FunctionStmt_Node_199 | Ast_FunctionStmt_Node_200 | Ast_FunctionStmt_Node_201 | Ast_FunctionStmt_Node_202 | Ast_FunctionStmt_Node_203 | Ast_FunctionStmt_Node_204 | Ast_FunctionStmt_Node_205 | Ast_FunctionStmt_Node_206 | Ast_FunctionStmt_Node_207 | Ast_FunctionStmt_Node_208 | Ast_FunctionStmt_Node_209 | Ast_FunctionStmt_Node_210 | Ast_FunctionStmt_Node_211 | Ast_FunctionStmt_Node_212 | Ast_FunctionStmt_Node_213 | Ast_FunctionStmt_Node_214 | Ast_FunctionStmt_Node_215;
          }
export type Ast_END_FUNCTION_Node = Ast_END_FUNCTION_Node_;
interface Ast_FunctionStmt_Node_152_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_152 = Ast_FunctionStmt_Node_152_;
interface Ast_FunctionStmt_Node_153_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_153 = Ast_FunctionStmt_Node_153_;
interface Ast_FunctionStmt_Node_154_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_154 = Ast_FunctionStmt_Node_154_;
interface Ast_FunctionStmt_Node_155_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_155 = Ast_FunctionStmt_Node_155_;
interface Ast_FunctionStmt_Node_156_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_156 = Ast_FunctionStmt_Node_156_;
interface Ast_FunctionStmt_Node_157_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_157 = Ast_FunctionStmt_Node_157_;
interface Ast_FunctionStmt_Node_158_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_158 = Ast_FunctionStmt_Node_158_;
interface Ast_FunctionStmt_Node_159_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_159 = Ast_FunctionStmt_Node_159_;
interface Ast_FunctionStmt_Node_160_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_160 = Ast_FunctionStmt_Node_160_;
interface Ast_FunctionStmt_Node_161_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_161 = Ast_FunctionStmt_Node_161_;
interface Ast_FunctionStmt_Node_162_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_162 = Ast_FunctionStmt_Node_162_;
interface Ast_FunctionStmt_Node_163_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_163 = Ast_FunctionStmt_Node_163_;
interface Ast_FunctionStmt_Node_164_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_164 = Ast_FunctionStmt_Node_164_;
interface Ast_FunctionStmt_Node_165_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_165 = Ast_FunctionStmt_Node_165_;
interface Ast_FunctionStmt_Node_166_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_166 = Ast_FunctionStmt_Node_166_;
interface Ast_FunctionStmt_Node_167_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_167 = Ast_FunctionStmt_Node_167_;
interface Ast_FunctionStmt_Node_168_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_168 = Ast_FunctionStmt_Node_168_;
interface Ast_FunctionStmt_Node_169_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_169 = Ast_FunctionStmt_Node_169_;
interface Ast_FunctionStmt_Node_170_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_170 = Ast_FunctionStmt_Node_170_;
interface Ast_FunctionStmt_Node_171_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_171 = Ast_FunctionStmt_Node_171_;
interface Ast_FunctionStmt_Node_172_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_172 = Ast_FunctionStmt_Node_172_;
interface Ast_FunctionStmt_Node_173_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_173 = Ast_FunctionStmt_Node_173_;
interface Ast_FunctionStmt_Node_174_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_174 = Ast_FunctionStmt_Node_174_;
interface Ast_FunctionStmt_Node_175_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_175 = Ast_FunctionStmt_Node_175_;
interface Ast_FunctionStmt_Node_176_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_176 = Ast_FunctionStmt_Node_176_;
interface Ast_FunctionStmt_Node_177_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_177 = Ast_FunctionStmt_Node_177_;
interface Ast_FunctionStmt_Node_178_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_178 = Ast_FunctionStmt_Node_178_;
interface Ast_FunctionStmt_Node_179_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_179 = Ast_FunctionStmt_Node_179_;
interface Ast_FunctionStmt_Node_180_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_180 = Ast_FunctionStmt_Node_180_;
interface Ast_FunctionStmt_Node_181_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_181 = Ast_FunctionStmt_Node_181_;
interface Ast_FunctionStmt_Node_182_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_182 = Ast_FunctionStmt_Node_182_;
interface Ast_FunctionStmt_Node_183_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_Visibility_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_183 = Ast_FunctionStmt_Node_183_;
interface Ast_FunctionStmt_Node_184_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_184 = Ast_FunctionStmt_Node_184_;
interface Ast_FunctionStmt_Node_185_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_185 = Ast_FunctionStmt_Node_185_;
interface Ast_FunctionStmt_Node_186_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_186 = Ast_FunctionStmt_Node_186_;
interface Ast_FunctionStmt_Node_187_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_187 = Ast_FunctionStmt_Node_187_;
interface Ast_FunctionStmt_Node_188_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_188 = Ast_FunctionStmt_Node_188_;
interface Ast_FunctionStmt_Node_189_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_189 = Ast_FunctionStmt_Node_189_;
interface Ast_FunctionStmt_Node_190_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_190 = Ast_FunctionStmt_Node_190_;
interface Ast_FunctionStmt_Node_191_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_191 = Ast_FunctionStmt_Node_191_;
interface Ast_FunctionStmt_Node_192_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_192 = Ast_FunctionStmt_Node_192_;
interface Ast_FunctionStmt_Node_193_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_193 = Ast_FunctionStmt_Node_193_;
interface Ast_FunctionStmt_Node_194_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_194 = Ast_FunctionStmt_Node_194_;
interface Ast_FunctionStmt_Node_195_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_195 = Ast_FunctionStmt_Node_195_;
interface Ast_FunctionStmt_Node_196_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_196 = Ast_FunctionStmt_Node_196_;
interface Ast_FunctionStmt_Node_197_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_197 = Ast_FunctionStmt_Node_197_;
interface Ast_FunctionStmt_Node_198_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_198 = Ast_FunctionStmt_Node_198_;
interface Ast_FunctionStmt_Node_199_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_STATIC_Node,Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_199 = Ast_FunctionStmt_Node_199_;
interface Ast_FunctionStmt_Node_200_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_200 = Ast_FunctionStmt_Node_200_;
interface Ast_FunctionStmt_Node_201_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_201 = Ast_FunctionStmt_Node_201_;
interface Ast_FunctionStmt_Node_202_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_202 = Ast_FunctionStmt_Node_202_;
interface Ast_FunctionStmt_Node_203_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_203 = Ast_FunctionStmt_Node_203_;
interface Ast_FunctionStmt_Node_204_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_204 = Ast_FunctionStmt_Node_204_;
interface Ast_FunctionStmt_Node_205_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_205 = Ast_FunctionStmt_Node_205_;
interface Ast_FunctionStmt_Node_206_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_206 = Ast_FunctionStmt_Node_206_;
interface Ast_FunctionStmt_Node_207_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_207 = Ast_FunctionStmt_Node_207_;
interface Ast_FunctionStmt_Node_208_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_208 = Ast_FunctionStmt_Node_208_;
interface Ast_FunctionStmt_Node_209_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_209 = Ast_FunctionStmt_Node_209_;
interface Ast_FunctionStmt_Node_210_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_210 = Ast_FunctionStmt_Node_210_;
interface Ast_FunctionStmt_Node_211_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_ArgList_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_211 = Ast_FunctionStmt_Node_211_;
interface Ast_FunctionStmt_Node_212_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_212 = Ast_FunctionStmt_Node_212_;
interface Ast_FunctionStmt_Node_213_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_213 = Ast_FunctionStmt_Node_213_;
interface Ast_FunctionStmt_Node_214_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_214 = Ast_FunctionStmt_Node_214_;
interface Ast_FunctionStmt_Node_215_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Ast_FUNCTION_Node,Ast_CertainIdentifier_Node,Ast_EndOfStatement_Node,Ast_END_FUNCTION_Node];
        parent:Ast_ModuleBodyElement_Node_31;
      }
type Ast_FunctionStmt_Node_215 = Ast_FunctionStmt_Node_215_;
type Ast_Block_group_def_13_Node  = [Ast_EndOfStatement_Node,Ast_BlockStmt_Node];
interface Ast_Block_Node_ extends BaseSymbolNode {
        symbol:"block";
        
        children:[Ast_BlockStmt_Node,...ZeroOrMore<Ast_Block_group_def_13_Node>,Ast_EndOfStatement_Node];
        parent:Ast_SubStmt_Node_40 | Ast_SubStmt_Node_42 | Ast_SubStmt_Node_44 | Ast_SubStmt_Node_46 | Ast_SubStmt_Node_48 | Ast_SubStmt_Node_50 | Ast_SubStmt_Node_52 | Ast_SubStmt_Node_54 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_70 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_78 | Ast_PropertyGetStmt_Node_80 | Ast_PropertyGetStmt_Node_82 | Ast_PropertyGetStmt_Node_84 | Ast_PropertyGetStmt_Node_86 | Ast_PropertyGetStmt_Node_88 | Ast_PropertyGetStmt_Node_90 | Ast_PropertyGetStmt_Node_92 | Ast_PropertyGetStmt_Node_94 | Ast_PropertyGetStmt_Node_96 | Ast_PropertyGetStmt_Node_98 | Ast_PropertyGetStmt_Node_100 | Ast_PropertyGetStmt_Node_102 | Ast_PropertyGetStmt_Node_104 | Ast_PropertyGetStmt_Node_106 | Ast_PropertyGetStmt_Node_108 | Ast_PropertyGetStmt_Node_110 | Ast_PropertyGetStmt_Node_112 | Ast_PropertyGetStmt_Node_114 | Ast_PropertyGetStmt_Node_116 | Ast_PropertyGetStmt_Node_118 | Ast_PropertySetStmt_Node_120 | Ast_PropertySetStmt_Node_122 | Ast_PropertySetStmt_Node_124 | Ast_PropertySetStmt_Node_126 | Ast_PropertySetStmt_Node_128 | Ast_PropertySetStmt_Node_130 | Ast_PropertySetStmt_Node_132 | Ast_PropertySetStmt_Node_134 | Ast_PropertyLetStmt_Node_136 | Ast_PropertyLetStmt_Node_138 | Ast_PropertyLetStmt_Node_140 | Ast_PropertyLetStmt_Node_142 | Ast_PropertyLetStmt_Node_144 | Ast_PropertyLetStmt_Node_146 | Ast_PropertyLetStmt_Node_148 | Ast_PropertyLetStmt_Node_150 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_158 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_166 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_174 | Ast_FunctionStmt_Node_176 | Ast_FunctionStmt_Node_178 | Ast_FunctionStmt_Node_180 | Ast_FunctionStmt_Node_182 | Ast_FunctionStmt_Node_184 | Ast_FunctionStmt_Node_186 | Ast_FunctionStmt_Node_188 | Ast_FunctionStmt_Node_190 | Ast_FunctionStmt_Node_192 | Ast_FunctionStmt_Node_194 | Ast_FunctionStmt_Node_196 | Ast_FunctionStmt_Node_198 | Ast_FunctionStmt_Node_200 | Ast_FunctionStmt_Node_202 | Ast_FunctionStmt_Node_204 | Ast_FunctionStmt_Node_206 | Ast_FunctionStmt_Node_208 | Ast_FunctionStmt_Node_210 | Ast_FunctionStmt_Node_212 | Ast_FunctionStmt_Node_214 | Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_241 | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_SC_Case_Node_295 | Ast_IfBlockStmt_Node_312 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseBlockStmt_Node_316 | Ast_WithStmt_Node_396;
      }
type Ast_Block_Node = Ast_Block_Node_;
interface Ast_BlockStmt_Node_218_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_LineLabel_Node,Ast_BlockStmt_Node];
        parent:Ast_Block_group_def_13_Parent_Node | Ast_Block_Node | Ast_BlockStmt_Node_218 | Ast_IfThenElseStmt_group_def_23_Parent_Node | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309;
      }
type Ast_BlockStmt_Node_218 = Ast_BlockStmt_Node_218_;
interface Ast_BlockStmt_Node_219_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_LineLabel_Node];
        parent:Ast_Block_group_def_13_Parent_Node | Ast_Block_Node | Ast_BlockStmt_Node_218 | Ast_IfThenElseStmt_group_def_23_Parent_Node | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309;
      }
type Ast_BlockStmt_Node_219 = Ast_BlockStmt_Node_219_;
interface Ast_BlockStmt_Node_220_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_AttributeStmt_Node];
        parent:Ast_Block_group_def_13_Parent_Node | Ast_Block_Node | Ast_BlockStmt_Node_218 | Ast_IfThenElseStmt_group_def_23_Parent_Node | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309;
      }
type Ast_BlockStmt_Node_220 = Ast_BlockStmt_Node_220_;
interface Ast_BlockStmt_Node_221_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_GoToStmt_Node];
        parent:Ast_Block_group_def_13_Parent_Node | Ast_Block_Node | Ast_BlockStmt_Node_218 | Ast_IfThenElseStmt_group_def_23_Parent_Node | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309;
      }
type Ast_BlockStmt_Node_221 = Ast_BlockStmt_Node_221_;
interface Ast_BlockStmt_Node_222_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_ResumeStmt_Node];
        parent:Ast_Block_group_def_13_Parent_Node | Ast_Block_Node | Ast_BlockStmt_Node_218 | Ast_IfThenElseStmt_group_def_23_Parent_Node | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309;
      }
type Ast_BlockStmt_Node_222 = Ast_BlockStmt_Node_222_;
interface Ast_BlockStmt_Node_223_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_IfThenElseStmt_Node];
        parent:Ast_Block_group_def_13_Parent_Node | Ast_Block_Node | Ast_BlockStmt_Node_218 | Ast_IfThenElseStmt_group_def_23_Parent_Node | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309;
      }
type Ast_BlockStmt_Node_223 = Ast_BlockStmt_Node_223_;
interface Ast_BlockStmt_Node_224_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_SelectCaseStmt_Node];
        parent:Ast_Block_group_def_13_Parent_Node | Ast_Block_Node | Ast_BlockStmt_Node_218 | Ast_IfThenElseStmt_group_def_23_Parent_Node | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309;
      }
type Ast_BlockStmt_Node_224 = Ast_BlockStmt_Node_224_;
interface Ast_BlockStmt_Node_225_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_ForNextStmt_Node];
        parent:Ast_Block_group_def_13_Parent_Node | Ast_Block_Node | Ast_BlockStmt_Node_218 | Ast_IfThenElseStmt_group_def_23_Parent_Node | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309;
      }
type Ast_BlockStmt_Node_225 = Ast_BlockStmt_Node_225_;
interface Ast_BlockStmt_Node_226_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_ForEachStmt_Node];
        parent:Ast_Block_group_def_13_Parent_Node | Ast_Block_Node | Ast_BlockStmt_Node_218 | Ast_IfThenElseStmt_group_def_23_Parent_Node | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309;
      }
type Ast_BlockStmt_Node_226 = Ast_BlockStmt_Node_226_;
interface Ast_BlockStmt_Node_227_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_DoLoopStmt_Node];
        parent:Ast_Block_group_def_13_Parent_Node | Ast_Block_Node | Ast_BlockStmt_Node_218 | Ast_IfThenElseStmt_group_def_23_Parent_Node | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309;
      }
type Ast_BlockStmt_Node_227 = Ast_BlockStmt_Node_227_;
interface Ast_BlockStmt_Node_228_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_WhileWendStmt_Node];
        parent:Ast_Block_group_def_13_Parent_Node | Ast_Block_Node | Ast_BlockStmt_Node_218 | Ast_IfThenElseStmt_group_def_23_Parent_Node | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309;
      }
type Ast_BlockStmt_Node_228 = Ast_BlockStmt_Node_228_;
interface Ast_BlockStmt_Node_229_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_OnErrorStmt_Node];
        parent:Ast_Block_group_def_13_Parent_Node | Ast_Block_Node | Ast_BlockStmt_Node_218 | Ast_IfThenElseStmt_group_def_23_Parent_Node | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309;
      }
type Ast_BlockStmt_Node_229 = Ast_BlockStmt_Node_229_;
interface Ast_BlockStmt_Node_230_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_WithStmt_Node];
        parent:Ast_Block_group_def_13_Parent_Node | Ast_Block_Node | Ast_BlockStmt_Node_218 | Ast_IfThenElseStmt_group_def_23_Parent_Node | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309;
      }
type Ast_BlockStmt_Node_230 = Ast_BlockStmt_Node_230_;
interface Ast_BlockStmt_Node_231_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_EraseStmt_Node];
        parent:Ast_Block_group_def_13_Parent_Node | Ast_Block_Node | Ast_BlockStmt_Node_218 | Ast_IfThenElseStmt_group_def_23_Parent_Node | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309;
      }
type Ast_BlockStmt_Node_231 = Ast_BlockStmt_Node_231_;
interface Ast_BlockStmt_Node_232_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_ExitStmt_Node];
        parent:Ast_Block_group_def_13_Parent_Node | Ast_Block_Node | Ast_BlockStmt_Node_218 | Ast_IfThenElseStmt_group_def_23_Parent_Node | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309;
      }
type Ast_BlockStmt_Node_232 = Ast_BlockStmt_Node_232_;
interface Ast_BlockStmt_Node_233_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_ExplicitCallStmt_Node];
        parent:Ast_Block_group_def_13_Parent_Node | Ast_Block_Node | Ast_BlockStmt_Node_218 | Ast_IfThenElseStmt_group_def_23_Parent_Node | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309;
      }
type Ast_BlockStmt_Node_233 = Ast_BlockStmt_Node_233_;
interface Ast_BlockStmt_Node_234_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_SetStmt_Node];
        parent:Ast_Block_group_def_13_Parent_Node | Ast_Block_Node | Ast_BlockStmt_Node_218 | Ast_IfThenElseStmt_group_def_23_Parent_Node | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309;
      }
type Ast_BlockStmt_Node_234 = Ast_BlockStmt_Node_234_;
interface Ast_BlockStmt_Node_235_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_RedimStmt_Node];
        parent:Ast_Block_group_def_13_Parent_Node | Ast_Block_Node | Ast_BlockStmt_Node_218 | Ast_IfThenElseStmt_group_def_23_Parent_Node | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309;
      }
type Ast_BlockStmt_Node_235 = Ast_BlockStmt_Node_235_;
interface Ast_BlockStmt_Node_236_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_LetStmt_Node];
        parent:Ast_Block_group_def_13_Parent_Node | Ast_Block_Node | Ast_BlockStmt_Node_218 | Ast_IfThenElseStmt_group_def_23_Parent_Node | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309;
      }
type Ast_BlockStmt_Node_236 = Ast_BlockStmt_Node_236_;
interface Ast_BlockStmt_Node_237_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_VariableStmt_Node];
        parent:Ast_Block_group_def_13_Parent_Node | Ast_Block_Node | Ast_BlockStmt_Node_218 | Ast_IfThenElseStmt_group_def_23_Parent_Node | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309;
      }
type Ast_BlockStmt_Node_237 = Ast_BlockStmt_Node_237_;
interface Ast_BlockStmt_Node_238_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[Ast_ImplicitCallStmt_InBlock_Node];
        parent:Ast_Block_group_def_13_Parent_Node | Ast_Block_Node | Ast_BlockStmt_Node_218 | Ast_IfThenElseStmt_group_def_23_Parent_Node | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309;
      }
type Ast_BlockStmt_Node_238 = Ast_BlockStmt_Node_238_;
interface Ast_RESUME_Node_ extends BaseTokenNode {
            token:"RESUME";
            parent:Ast_ResumeStmt_Node | Ast_OnErrorStmt_group_def_29_Parent_Node | Ast_AmbiguousIdentifier_Node_724;
          }
export type Ast_RESUME_Node = Ast_RESUME_Node_;
interface Ast_ResumeStmt_Node_ extends BaseSymbolNode {
        symbol:"resumeStmt";
        
        children:[Ast_RESUME_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_BlockStmt_Node_222;
      }
type Ast_ResumeStmt_Node = Ast_ResumeStmt_Node_;
interface Ast_WHILE_Node_ extends BaseTokenNode {
            token:"WHILE";
            parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_group_def_15_Parent_Node | Ast_AmbiguousIdentifier_Node_741;
          }
export type Ast_WHILE_Node = Ast_WHILE_Node_;
interface Ast_WEND_Node_ extends BaseTokenNode {
            token:"WEND";
            parent:Ast_WhileWendStmt_Node | Ast_AmbiguousIdentifier_Node_740;
          }
export type Ast_WEND_Node = Ast_WEND_Node_;
interface Ast_WhileWendStmt_Node_ extends BaseSymbolNode {
        symbol:"whileWendStmt";
        
        children:[Ast_WHILE_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_WEND_Node];
        parent:Ast_BlockStmt_Node_228;
      }
type Ast_WhileWendStmt_Node = Ast_WhileWendStmt_Node_;
interface Ast_DO_Node_ extends BaseTokenNode {
            token:"DO";
            parent:Ast_DoLoopStmt_Node_241 | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_AmbiguousIdentifier_Node_676;
          }
export type Ast_DO_Node = Ast_DO_Node_;
interface Ast_LOOP_Node_ extends BaseTokenNode {
            token:"LOOP";
            parent:Ast_DoLoopStmt_Node_241 | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_AmbiguousIdentifier_Node_701;
          }
export type Ast_LOOP_Node = Ast_LOOP_Node_;
interface Ast_DoLoopStmt_Node_241_ extends BaseSymbolNode {
        symbol:"doLoopStmt";
        
        children:[Ast_DO_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_LOOP_Node];
        parent:Ast_BlockStmt_Node_227;
      }
type Ast_DoLoopStmt_Node_241 = Ast_DoLoopStmt_Node_241_;
type Ast_DoLoopStmt_group_def_15_Node  = [Ast_WHILE_Node];
type Ast_DoLoopStmt_group_14_Node_243  = [...Ast_DoLoopStmt_group_def_15_Node];
interface Ast_UNTIL_Node_ extends BaseTokenNode {
            token:"UNTIL";
            parent:Ast_DoLoopStmt_group_def_16_Parent_Node | Ast_AmbiguousIdentifier_Node_738;
          }
export type Ast_UNTIL_Node = Ast_UNTIL_Node_;
type Ast_DoLoopStmt_group_def_16_Node  = [Ast_UNTIL_Node];
type Ast_DoLoopStmt_group_14_Node_245  = [...Ast_DoLoopStmt_group_def_16_Node];
interface Ast_DoLoopStmt_Node_246_ extends BaseSymbolNode {
        symbol:"doLoopStmt";
        
        children:[Ast_DO_Node,...Ast_DoLoopStmt_group_14_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_LOOP_Node];
        parent:Ast_BlockStmt_Node_227;
      }
type Ast_DoLoopStmt_Node_246 = Ast_DoLoopStmt_Node_246_;
type Ast_DoLoopStmt_group_17_Node_247  = [...Ast_DoLoopStmt_group_def_15_Node];
type Ast_DoLoopStmt_group_17_Node_248  = [...Ast_DoLoopStmt_group_def_16_Node];
interface Ast_DoLoopStmt_Node_249_ extends BaseSymbolNode {
        symbol:"doLoopStmt";
        
        children:[Ast_DO_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_LOOP_Node,...Ast_DoLoopStmt_group_17_Node,Ast_ValueStmt_Node];
        parent:Ast_BlockStmt_Node_227;
      }
type Ast_DoLoopStmt_Node_249 = Ast_DoLoopStmt_Node_249_;
interface Ast_STEP_Node_ extends BaseTokenNode {
            token:"STEP";
            parent:Ast_ForNextStmt_group_def_19_Parent_Node | Ast_AmbiguousIdentifier_Node_730;
          }
export type Ast_STEP_Node = Ast_STEP_Node_;
type Ast_ForNextStmt_group_def_19_Node  = [Ast_STEP_Node,Ast_ValueStmt_Node];
interface Ast_FOR_Node_ extends BaseTokenNode {
            token:"FOR";
            parent:Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_AmbiguousIdentifier_Node_688;
          }
export type Ast_FOR_Node = Ast_FOR_Node_;
interface Ast_TO_Node_ extends BaseTokenNode {
            token:"TO";
            parent:Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_SC_Selection_Node_293 | Ast_Subscript__group_def_65_Parent_Node | Ast_AmbiguousIdentifier_Node_735;
          }
export type Ast_TO_Node = Ast_TO_Node_;
interface Ast_NEXT_Node_ extends BaseTokenNode {
            token:"NEXT";
            parent:Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_OnErrorStmt_group_def_29_Parent_Node | Ast_AmbiguousIdentifier_Node_708;
          }
export type Ast_NEXT_Node = Ast_NEXT_Node_;
interface Ast_ForNextStmt_Node_251_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,...Ast_ForNextStmt_group_def_19_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_NEXT_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_251 = Ast_ForNextStmt_Node_251_;
interface Ast_ForNextStmt_Node_252_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,...Ast_ForNextStmt_group_def_19_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_NEXT_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_252 = Ast_ForNextStmt_Node_252_;
interface Ast_ForNextStmt_Node_253_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,...Ast_ForNextStmt_group_def_19_Node,Ast_EndOfStatement_Node,Ast_NEXT_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_253 = Ast_ForNextStmt_Node_253_;
interface Ast_ForNextStmt_Node_254_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,...Ast_ForNextStmt_group_def_19_Node,Ast_EndOfStatement_Node,Ast_NEXT_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_254 = Ast_ForNextStmt_Node_254_;
interface Ast_ForNextStmt_Node_255_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_NEXT_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_255 = Ast_ForNextStmt_Node_255_;
interface Ast_ForNextStmt_Node_256_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_NEXT_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_256 = Ast_ForNextStmt_Node_256_;
interface Ast_ForNextStmt_Node_257_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_NEXT_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_257 = Ast_ForNextStmt_Node_257_;
interface Ast_ForNextStmt_Node_258_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_NEXT_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_258 = Ast_ForNextStmt_Node_258_;
interface Ast_ForNextStmt_Node_259_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,...Ast_ForNextStmt_group_def_19_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_NEXT_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_259 = Ast_ForNextStmt_Node_259_;
interface Ast_ForNextStmt_Node_260_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,...Ast_ForNextStmt_group_def_19_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_NEXT_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_260 = Ast_ForNextStmt_Node_260_;
interface Ast_ForNextStmt_Node_261_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,...Ast_ForNextStmt_group_def_19_Node,Ast_EndOfStatement_Node,Ast_NEXT_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_261 = Ast_ForNextStmt_Node_261_;
interface Ast_ForNextStmt_Node_262_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,...Ast_ForNextStmt_group_def_19_Node,Ast_EndOfStatement_Node,Ast_NEXT_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_262 = Ast_ForNextStmt_Node_262_;
interface Ast_ForNextStmt_Node_263_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_NEXT_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_263 = Ast_ForNextStmt_Node_263_;
interface Ast_ForNextStmt_Node_264_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_NEXT_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_264 = Ast_ForNextStmt_Node_264_;
interface Ast_ForNextStmt_Node_265_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_NEXT_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_265 = Ast_ForNextStmt_Node_265_;
interface Ast_ForNextStmt_Node_266_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_NEXT_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_266 = Ast_ForNextStmt_Node_266_;
interface Ast_ForNextStmt_Node_267_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,...Ast_ForNextStmt_group_def_19_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_NEXT_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_267 = Ast_ForNextStmt_Node_267_;
interface Ast_ForNextStmt_Node_268_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,...Ast_ForNextStmt_group_def_19_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_NEXT_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_268 = Ast_ForNextStmt_Node_268_;
interface Ast_ForNextStmt_Node_269_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,...Ast_ForNextStmt_group_def_19_Node,Ast_EndOfStatement_Node,Ast_NEXT_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_269 = Ast_ForNextStmt_Node_269_;
interface Ast_ForNextStmt_Node_270_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,...Ast_ForNextStmt_group_def_19_Node,Ast_EndOfStatement_Node,Ast_NEXT_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_270 = Ast_ForNextStmt_Node_270_;
interface Ast_ForNextStmt_Node_271_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_NEXT_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_271 = Ast_ForNextStmt_Node_271_;
interface Ast_ForNextStmt_Node_272_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_NEXT_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_272 = Ast_ForNextStmt_Node_272_;
interface Ast_ForNextStmt_Node_273_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_NEXT_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_273 = Ast_ForNextStmt_Node_273_;
interface Ast_ForNextStmt_Node_274_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_NEXT_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_274 = Ast_ForNextStmt_Node_274_;
interface Ast_ForNextStmt_Node_275_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,...Ast_ForNextStmt_group_def_19_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_NEXT_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_275 = Ast_ForNextStmt_Node_275_;
interface Ast_ForNextStmt_Node_276_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,...Ast_ForNextStmt_group_def_19_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_NEXT_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_276 = Ast_ForNextStmt_Node_276_;
interface Ast_ForNextStmt_Node_277_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,...Ast_ForNextStmt_group_def_19_Node,Ast_EndOfStatement_Node,Ast_NEXT_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_277 = Ast_ForNextStmt_Node_277_;
interface Ast_ForNextStmt_Node_278_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,...Ast_ForNextStmt_group_def_19_Node,Ast_EndOfStatement_Node,Ast_NEXT_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_278 = Ast_ForNextStmt_Node_278_;
interface Ast_ForNextStmt_Node_279_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_NEXT_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_279 = Ast_ForNextStmt_Node_279_;
interface Ast_ForNextStmt_Node_280_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_NEXT_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_280 = Ast_ForNextStmt_Node_280_;
interface Ast_ForNextStmt_Node_281_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_NEXT_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_281 = Ast_ForNextStmt_Node_281_;
interface Ast_ForNextStmt_Node_282_ extends BaseSymbolNode {
        symbol:"forNextStmt";
        
        children:[Ast_FOR_Node,Ast_CertainIdentifier_Node,Ast_EQ_Node,Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_NEXT_Node];
        parent:Ast_BlockStmt_Node_225;
      }
type Ast_ForNextStmt_Node_282 = Ast_ForNextStmt_Node_282_;
interface Ast_EACH_Node_ extends BaseTokenNode {
            token:"EACH";
            parent:Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_AmbiguousIdentifier_Node_678;
          }
export type Ast_EACH_Node = Ast_EACH_Node_;
interface Ast_IN_Node_ extends BaseTokenNode {
            token:"IN";
            parent:Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_AmbiguousIdentifier_Node_696;
          }
export type Ast_IN_Node = Ast_IN_Node_;
interface Ast_ForEachStmt_Node_283_ extends BaseSymbolNode {
        symbol:"forEachStmt";
        
        children:[Ast_FOR_Node,Ast_EACH_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_IN_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_NEXT_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_BlockStmt_Node_226;
      }
type Ast_ForEachStmt_Node_283 = Ast_ForEachStmt_Node_283_;
interface Ast_ForEachStmt_Node_284_ extends BaseSymbolNode {
        symbol:"forEachStmt";
        
        children:[Ast_FOR_Node,Ast_EACH_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_IN_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_NEXT_Node];
        parent:Ast_BlockStmt_Node_226;
      }
type Ast_ForEachStmt_Node_284 = Ast_ForEachStmt_Node_284_;
interface Ast_ForEachStmt_Node_285_ extends BaseSymbolNode {
        symbol:"forEachStmt";
        
        children:[Ast_FOR_Node,Ast_EACH_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_IN_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_NEXT_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_BlockStmt_Node_226;
      }
type Ast_ForEachStmt_Node_285 = Ast_ForEachStmt_Node_285_;
interface Ast_ForEachStmt_Node_286_ extends BaseSymbolNode {
        symbol:"forEachStmt";
        
        children:[Ast_FOR_Node,Ast_EACH_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_IN_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_NEXT_Node];
        parent:Ast_BlockStmt_Node_226;
      }
type Ast_ForEachStmt_Node_286 = Ast_ForEachStmt_Node_286_;
interface Ast_ForEachStmt_Node_287_ extends BaseSymbolNode {
        symbol:"forEachStmt";
        
        children:[Ast_FOR_Node,Ast_EACH_Node,Ast_CertainIdentifier_Node,Ast_IN_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_NEXT_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_BlockStmt_Node_226;
      }
type Ast_ForEachStmt_Node_287 = Ast_ForEachStmt_Node_287_;
interface Ast_ForEachStmt_Node_288_ extends BaseSymbolNode {
        symbol:"forEachStmt";
        
        children:[Ast_FOR_Node,Ast_EACH_Node,Ast_CertainIdentifier_Node,Ast_IN_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_NEXT_Node];
        parent:Ast_BlockStmt_Node_226;
      }
type Ast_ForEachStmt_Node_288 = Ast_ForEachStmt_Node_288_;
interface Ast_ForEachStmt_Node_289_ extends BaseSymbolNode {
        symbol:"forEachStmt";
        
        children:[Ast_FOR_Node,Ast_EACH_Node,Ast_CertainIdentifier_Node,Ast_IN_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_NEXT_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_BlockStmt_Node_226;
      }
type Ast_ForEachStmt_Node_289 = Ast_ForEachStmt_Node_289_;
interface Ast_ForEachStmt_Node_290_ extends BaseSymbolNode {
        symbol:"forEachStmt";
        
        children:[Ast_FOR_Node,Ast_EACH_Node,Ast_CertainIdentifier_Node,Ast_IN_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,Ast_NEXT_Node];
        parent:Ast_BlockStmt_Node_226;
      }
type Ast_ForEachStmt_Node_290 = Ast_ForEachStmt_Node_290_;
interface Ast_SELECT_Node_ extends BaseTokenNode {
            token:"SELECT";
            parent:Ast_SelectCaseStmt_Node | Ast_AmbiguousIdentifier_Node_726;
          }
export type Ast_SELECT_Node = Ast_SELECT_Node_;
interface Ast_CASE_Node_ extends BaseTokenNode {
            token:"CASE";
            parent:Ast_SelectCaseStmt_Node | Ast_SC_Case_Node_295 | Ast_SC_Case_Node_296 | Ast_AmbiguousIdentifier_Node_659;
          }
export type Ast_CASE_Node = Ast_CASE_Node_;
interface Ast_END_SELECT_Node_ extends BaseTokenNode {
            token:"END_SELECT";
            parent:Ast_SelectCaseStmt_Node;
          }
export type Ast_END_SELECT_Node = Ast_END_SELECT_Node_;
interface Ast_SelectCaseStmt_Node_ extends BaseSymbolNode {
        symbol:"selectCaseStmt";
        
        children:[Ast_SELECT_Node,Ast_CASE_Node,Ast_ValueStmt_Node,Ast_EndOfStatement_Node,...ZeroOrMore<Ast_SC_Case_Node>,Ast_END_SELECT_Node];
        parent:Ast_BlockStmt_Node_224;
      }
type Ast_SelectCaseStmt_Node = Ast_SelectCaseStmt_Node_;
interface Ast_IS_Node_ extends BaseTokenNode {
            token:"IS";
            parent:Ast_SC_Selection_Node_292 | Ast_ComparisonOperator_Node_306 | Ast_ValueStmt_Node_427 | Ast_AmbiguousIdentifier_Node_698;
          }
export type Ast_IS_Node = Ast_IS_Node_;
interface Ast_SC_Selection_Node_292_ extends BaseSymbolNode {
        symbol:"sC_Selection";
        label:"caseCondIs";
        children:[Ast_IS_Node,Ast_ComparisonOperator_Node,Ast_ValueStmt_Node];
        parent:Ast_SC_Cond_group_def_21_Parent_Node | Ast_SC_Cond_Node_299;
      }
type Ast_SC_Selection_Node_292 = Ast_SC_Selection_Node_292_;
interface Ast_SC_Selection_Node_293_ extends BaseSymbolNode {
        symbol:"sC_Selection";
        label:"caseCondTo";
        children:[Ast_ValueStmt_Node,Ast_TO_Node,Ast_ValueStmt_Node];
        parent:Ast_SC_Cond_group_def_21_Parent_Node | Ast_SC_Cond_Node_299;
      }
type Ast_SC_Selection_Node_293 = Ast_SC_Selection_Node_293_;
interface Ast_SC_Selection_Node_294_ extends BaseSymbolNode {
        symbol:"sC_Selection";
        label:"caseCondValue";
        children:[Ast_ValueStmt_Node];
        parent:Ast_SC_Cond_group_def_21_Parent_Node | Ast_SC_Cond_Node_299;
      }
type Ast_SC_Selection_Node_294 = Ast_SC_Selection_Node_294_;
interface Ast_SC_Case_Node_295_ extends BaseSymbolNode {
        symbol:"sC_Case";
        
        children:[Ast_CASE_Node,Ast_SC_Cond_Node,Ast_EndOfStatement_Node,Ast_Block_Node];
        parent:Ast_SelectCaseStmt_Node;
      }
type Ast_SC_Case_Node_295 = Ast_SC_Case_Node_295_;
interface Ast_SC_Case_Node_296_ extends BaseSymbolNode {
        symbol:"sC_Case";
        
        children:[Ast_CASE_Node,Ast_SC_Cond_Node,Ast_EndOfStatement_Node];
        parent:Ast_SelectCaseStmt_Node;
      }
type Ast_SC_Case_Node_296 = Ast_SC_Case_Node_296_;
interface Ast_ELSE_Node_ extends BaseTokenNode {
            token:"ELSE";
            parent:Ast_SC_Cond_Node_297 | Ast_IfThenElseStmt_group_def_23_Parent_Node | Ast_IfElseBlockStmt_Node_316 | Ast_IfElseBlockStmt_Node_317 | Ast_AmbiguousIdentifier_Node_679;
          }
export type Ast_ELSE_Node = Ast_ELSE_Node_;
interface Ast_SC_Cond_Node_297_ extends BaseSymbolNode {
        symbol:"sC_Cond";
        label:"caseCondElse";
        children:[Ast_ELSE_Node];
        parent:Ast_SC_Case_Node_295 | Ast_SC_Case_Node_296;
      }
type Ast_SC_Cond_Node_297 = Ast_SC_Cond_Node_297_;
type Ast_SC_Cond_group_def_21_Node  = [Ast_TOKEN_0_Node,Ast_SC_Selection_Node];
interface Ast_SC_Cond_Node_299_ extends BaseSymbolNode {
        symbol:"sC_Cond";
        label:"caseCondSelection";
        children:[Ast_SC_Selection_Node,...ZeroOrMore<Ast_SC_Cond_group_def_21_Node>];
        parent:Ast_SC_Case_Node_295 | Ast_SC_Case_Node_296;
      }
type Ast_SC_Cond_Node_299 = Ast_SC_Cond_Node_299_;
interface Ast_LT_Node_ extends BaseTokenNode {
            token:"LT";
            parent:Ast_ComparisonOperator_Node_300 | Ast_ValueStmt_Node_432;
          }
export type Ast_LT_Node = Ast_LT_Node_;
interface Ast_ComparisonOperator_Node_300_ extends BaseSymbolNode {
        symbol:"comparisonOperator";
        
        children:[Ast_LT_Node];
        parent:Ast_SC_Selection_Node_292;
      }
type Ast_ComparisonOperator_Node_300 = Ast_ComparisonOperator_Node_300_;
interface Ast_LEQ_Node_ extends BaseTokenNode {
            token:"LEQ";
            parent:Ast_ComparisonOperator_Node_301 | Ast_ValueStmt_Node_430;
          }
export type Ast_LEQ_Node = Ast_LEQ_Node_;
interface Ast_ComparisonOperator_Node_301_ extends BaseSymbolNode {
        symbol:"comparisonOperator";
        
        children:[Ast_LEQ_Node];
        parent:Ast_SC_Selection_Node_292;
      }
type Ast_ComparisonOperator_Node_301 = Ast_ComparisonOperator_Node_301_;
interface Ast_GT_Node_ extends BaseTokenNode {
            token:"GT";
            parent:Ast_ComparisonOperator_Node_302 | Ast_ValueStmt_Node_431;
          }
export type Ast_GT_Node = Ast_GT_Node_;
interface Ast_ComparisonOperator_Node_302_ extends BaseSymbolNode {
        symbol:"comparisonOperator";
        
        children:[Ast_GT_Node];
        parent:Ast_SC_Selection_Node_292;
      }
type Ast_ComparisonOperator_Node_302 = Ast_ComparisonOperator_Node_302_;
interface Ast_GEQ_Node_ extends BaseTokenNode {
            token:"GEQ";
            parent:Ast_ComparisonOperator_Node_303 | Ast_ValueStmt_Node_429;
          }
export type Ast_GEQ_Node = Ast_GEQ_Node_;
interface Ast_ComparisonOperator_Node_303_ extends BaseSymbolNode {
        symbol:"comparisonOperator";
        
        children:[Ast_GEQ_Node];
        parent:Ast_SC_Selection_Node_292;
      }
type Ast_ComparisonOperator_Node_303 = Ast_ComparisonOperator_Node_303_;
interface Ast_ComparisonOperator_Node_304_ extends BaseSymbolNode {
        symbol:"comparisonOperator";
        
        children:[Ast_EQ_Node];
        parent:Ast_SC_Selection_Node_292;
      }
type Ast_ComparisonOperator_Node_304 = Ast_ComparisonOperator_Node_304_;
interface Ast_NEQ_Node_ extends BaseTokenNode {
            token:"NEQ";
            parent:Ast_ComparisonOperator_Node_305 | Ast_ValueStmt_Node_433;
          }
export type Ast_NEQ_Node = Ast_NEQ_Node_;
interface Ast_ComparisonOperator_Node_305_ extends BaseSymbolNode {
        symbol:"comparisonOperator";
        
        children:[Ast_NEQ_Node];
        parent:Ast_SC_Selection_Node_292;
      }
type Ast_ComparisonOperator_Node_305 = Ast_ComparisonOperator_Node_305_;
interface Ast_ComparisonOperator_Node_306_ extends BaseSymbolNode {
        symbol:"comparisonOperator";
        
        children:[Ast_IS_Node];
        parent:Ast_SC_Selection_Node_292;
      }
type Ast_ComparisonOperator_Node_306 = Ast_ComparisonOperator_Node_306_;
type Ast_IfThenElseStmt_group_def_23_Node  = [Ast_ELSE_Node,Ast_BlockStmt_Node];
interface Ast_IF_Node_ extends BaseTokenNode {
            token:"IF";
            parent:Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_AmbiguousIdentifier_Node_694;
          }
export type Ast_IF_Node = Ast_IF_Node_;
interface Ast_THEN_Node_ extends BaseTokenNode {
            token:"THEN";
            parent:Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_AmbiguousIdentifier_Node_734;
          }
export type Ast_THEN_Node = Ast_THEN_Node_;
interface Ast_IfThenElseStmt_Node_308_ extends BaseSymbolNode {
        symbol:"ifThenElseStmt";
        label:"InlineIfThenElse";
        children:[Ast_IF_Node,Ast_ValueStmt_Node,Ast_THEN_Node,Ast_BlockStmt_Node,...Ast_IfThenElseStmt_group_def_23_Node];
        parent:Ast_BlockStmt_Node_223;
      }
type Ast_IfThenElseStmt_Node_308 = Ast_IfThenElseStmt_Node_308_;
interface Ast_IfThenElseStmt_Node_309_ extends BaseSymbolNode {
        symbol:"ifThenElseStmt";
        label:"InlineIfThenElse";
        children:[Ast_IF_Node,Ast_ValueStmt_Node,Ast_THEN_Node,Ast_BlockStmt_Node];
        parent:Ast_BlockStmt_Node_223;
      }
type Ast_IfThenElseStmt_Node_309 = Ast_IfThenElseStmt_Node_309_;
interface Ast_END_IF_Node_ extends BaseTokenNode {
            token:"END_IF";
            parent:Ast_IfThenElseStmt_Node_310 | Ast_IfThenElseStmt_Node_311;
          }
export type Ast_END_IF_Node = Ast_END_IF_Node_;
interface Ast_IfThenElseStmt_Node_310_ extends BaseSymbolNode {
        symbol:"ifThenElseStmt";
        label:"BlockIfThenElse";
        children:[Ast_IfBlockStmt_Node,...ZeroOrMore<Ast_IfElseIfBlockStmt_Node>,Ast_IfElseBlockStmt_Node,Ast_END_IF_Node];
        parent:Ast_BlockStmt_Node_223;
      }
type Ast_IfThenElseStmt_Node_310 = Ast_IfThenElseStmt_Node_310_;
interface Ast_IfThenElseStmt_Node_311_ extends BaseSymbolNode {
        symbol:"ifThenElseStmt";
        label:"BlockIfThenElse";
        children:[Ast_IfBlockStmt_Node,...ZeroOrMore<Ast_IfElseIfBlockStmt_Node>,Ast_END_IF_Node];
        parent:Ast_BlockStmt_Node_223;
      }
type Ast_IfThenElseStmt_Node_311 = Ast_IfThenElseStmt_Node_311_;
interface Ast_IfBlockStmt_Node_312_ extends BaseSymbolNode {
        symbol:"ifBlockStmt";
        
        children:[Ast_IF_Node,Ast_ValueStmt_Node,Ast_THEN_Node,Ast_EndOfStatement_Node,Ast_Block_Node];
        parent:Ast_IfThenElseStmt_Node_310 | Ast_IfThenElseStmt_Node_311;
      }
type Ast_IfBlockStmt_Node_312 = Ast_IfBlockStmt_Node_312_;
interface Ast_IfBlockStmt_Node_313_ extends BaseSymbolNode {
        symbol:"ifBlockStmt";
        
        children:[Ast_IF_Node,Ast_ValueStmt_Node,Ast_THEN_Node,Ast_EndOfStatement_Node];
        parent:Ast_IfThenElseStmt_Node_310 | Ast_IfThenElseStmt_Node_311;
      }
type Ast_IfBlockStmt_Node_313 = Ast_IfBlockStmt_Node_313_;
interface Ast_ELSEIF_Node_ extends BaseTokenNode {
            token:"ELSEIF";
            parent:Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_AmbiguousIdentifier_Node_680;
          }
export type Ast_ELSEIF_Node = Ast_ELSEIF_Node_;
interface Ast_IfElseIfBlockStmt_Node_314_ extends BaseSymbolNode {
        symbol:"ifElseIfBlockStmt";
        
        children:[Ast_ELSEIF_Node,Ast_ValueStmt_Node,Ast_THEN_Node,Ast_EndOfStatement_Node,Ast_Block_Node];
        parent:Ast_IfThenElseStmt_Node_310 | Ast_IfThenElseStmt_Node_311;
      }
type Ast_IfElseIfBlockStmt_Node_314 = Ast_IfElseIfBlockStmt_Node_314_;
interface Ast_IfElseIfBlockStmt_Node_315_ extends BaseSymbolNode {
        symbol:"ifElseIfBlockStmt";
        
        children:[Ast_ELSEIF_Node,Ast_ValueStmt_Node,Ast_THEN_Node,Ast_EndOfStatement_Node];
        parent:Ast_IfThenElseStmt_Node_310 | Ast_IfThenElseStmt_Node_311;
      }
type Ast_IfElseIfBlockStmt_Node_315 = Ast_IfElseIfBlockStmt_Node_315_;
interface Ast_IfElseBlockStmt_Node_316_ extends BaseSymbolNode {
        symbol:"ifElseBlockStmt";
        
        children:[Ast_ELSE_Node,Ast_EndOfStatement_Node,Ast_Block_Node];
        parent:Ast_IfThenElseStmt_Node_310;
      }
type Ast_IfElseBlockStmt_Node_316 = Ast_IfElseBlockStmt_Node_316_;
interface Ast_IfElseBlockStmt_Node_317_ extends BaseSymbolNode {
        symbol:"ifElseBlockStmt";
        
        children:[Ast_ELSE_Node,Ast_EndOfStatement_Node];
        parent:Ast_IfThenElseStmt_Node_310;
      }
type Ast_IfElseBlockStmt_Node_317 = Ast_IfElseBlockStmt_Node_317_;
type Ast_OnErrorStmt_group_def_26_Node  = [Ast_CertainIdentifier_Node];
type Ast_OnErrorStmt_group_25_Node_319  = [...Ast_OnErrorStmt_group_def_26_Node];
interface Ast_MINUS_Node_ extends BaseTokenNode {
            token:"MINUS";
            parent:Ast_OnErrorStmt_group_def_27_Parent_Node | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_446;
          }
export type Ast_MINUS_Node = Ast_MINUS_Node_;
type Ast_OnErrorStmt_group_def_27_Node  = [Ast_MINUS_Node,Ast_INTEGERLITERAL_Node];
type Ast_OnErrorStmt_group_25_Node_321  = [...Ast_OnErrorStmt_group_def_27_Node];
interface Ast_GOTO_Node_ extends BaseTokenNode {
            token:"GOTO";
            parent:Ast_OnErrorStmt_group_def_28_Parent_Node | Ast_GoToStmt_Node | Ast_AmbiguousIdentifier_Node_693;
          }
export type Ast_GOTO_Node = Ast_GOTO_Node_;
type Ast_OnErrorStmt_group_def_28_Node  = [Ast_GOTO_Node,...Ast_OnErrorStmt_group_25_Node];
type Ast_OnErrorStmt_group_24_Node_323  = [...Ast_OnErrorStmt_group_def_28_Node];
type Ast_OnErrorStmt_group_def_29_Node  = [Ast_RESUME_Node,Ast_NEXT_Node];
type Ast_OnErrorStmt_group_24_Node_325  = [...Ast_OnErrorStmt_group_def_29_Node];
interface Ast_ON_ERROR_Node_ extends BaseTokenNode {
            token:"ON_ERROR";
            parent:Ast_OnErrorStmt_Node;
          }
export type Ast_ON_ERROR_Node = Ast_ON_ERROR_Node_;
interface Ast_OnErrorStmt_Node_ extends BaseSymbolNode {
        symbol:"onErrorStmt";
        
        children:[Ast_ON_ERROR_Node,...Ast_OnErrorStmt_group_24_Node];
        parent:Ast_BlockStmt_Node_229;
      }
type Ast_OnErrorStmt_Node = Ast_OnErrorStmt_Node_;
interface Ast_LineLabel_Node_ extends BaseSymbolNode {
        symbol:"lineLabel";
        
        children:[Ast_CertainIdentifier_Node,Ast_COLON_Node];
        parent:Ast_BlockStmt_Node_218 | Ast_BlockStmt_Node_219;
      }
type Ast_LineLabel_Node = Ast_LineLabel_Node_;
interface Ast_GoToStmt_Node_ extends BaseSymbolNode {
        symbol:"goToStmt";
        
        children:[Ast_GOTO_Node,Ast_AmbiguousIdentifier_Node];
        parent:Ast_BlockStmt_Node_221;
      }
type Ast_GoToStmt_Node = Ast_GoToStmt_Node_;
type Ast_EraseStmt_group_def_31_Node  = [Ast_TOKEN_0_Node,Ast_ValueStmt_Node];
interface Ast_ERASE_Node_ extends BaseTokenNode {
            token:"ERASE";
            parent:Ast_EraseStmt_Node | Ast_AmbiguousIdentifier_Node_684;
          }
export type Ast_ERASE_Node = Ast_ERASE_Node_;
interface Ast_EraseStmt_Node_ extends BaseSymbolNode {
        symbol:"eraseStmt";
        
        children:[Ast_ERASE_Node,Ast_ValueStmt_Node,...ZeroOrMore<Ast_EraseStmt_group_def_31_Node>];
        parent:Ast_BlockStmt_Node_231;
      }
type Ast_EraseStmt_Node = Ast_EraseStmt_Node_;
type Ast_RedimStmt_group_def_33_Node  = [Ast_TOKEN_0_Node,Ast_RedimSubStmt_Node];
interface Ast_REDIM_Node_ extends BaseTokenNode {
            token:"REDIM";
            parent:Ast_RedimStmt_Node_332 | Ast_RedimStmt_Node_333 | Ast_AmbiguousIdentifier_Node_722;
          }
export type Ast_REDIM_Node = Ast_REDIM_Node_;
interface Ast_PRESERVE_Node_ extends BaseTokenNode {
            token:"PRESERVE";
            parent:Ast_RedimStmt_Node_332 | Ast_AmbiguousIdentifier_Node_717;
          }
export type Ast_PRESERVE_Node = Ast_PRESERVE_Node_;
interface Ast_RedimStmt_Node_332_ extends BaseSymbolNode {
        symbol:"redimStmt";
        
        children:[Ast_REDIM_Node,Ast_PRESERVE_Node,Ast_RedimSubStmt_Node,...ZeroOrMore<Ast_RedimStmt_group_def_33_Node>];
        parent:Ast_BlockStmt_Node_235;
      }
type Ast_RedimStmt_Node_332 = Ast_RedimStmt_Node_332_;
interface Ast_RedimStmt_Node_333_ extends BaseSymbolNode {
        symbol:"redimStmt";
        
        children:[Ast_REDIM_Node,Ast_RedimSubStmt_Node,...ZeroOrMore<Ast_RedimStmt_group_def_33_Node>];
        parent:Ast_BlockStmt_Node_235;
      }
type Ast_RedimStmt_Node_333 = Ast_RedimStmt_Node_333_;
interface Ast_LPAREN_Node_ extends BaseTokenNode {
            token:"LPAREN";
            parent:Ast_RedimSubStmt_Node_334 | Ast_RedimSubStmt_Node_335 | Ast_ECS_MemberProcedureCall_group_def_42_Parent_Node | Ast_ECS_MemberProcedureCall_group_def_44_Parent_Node | Ast_VariableSubStmt_group_def_62_Parent_Node_400 | Ast_VariableSubStmt_group_def_62_Parent_Node_401 | Ast_ArgList_Node_420 | Ast_ArgList_Node_421 | Ast_ValueStmt_Node_426 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_ICS_S_ProcedureOrArrayCall_Node_474 | Ast_ICS_S_ProcedureOrArrayCall_Node_475 | Ast_ICS_S_ProcedureOrArrayCall_Node_476 | Ast_ICS_S_ProcedureOrArrayCall_Node_477 | Ast_Arg_group_def_92_Parent_Node;
          }
export type Ast_LPAREN_Node = Ast_LPAREN_Node_;
interface Ast_RPAREN_Node_ extends BaseTokenNode {
            token:"RPAREN";
            parent:Ast_RedimSubStmt_Node_334 | Ast_RedimSubStmt_Node_335 | Ast_ECS_MemberProcedureCall_group_def_42_Parent_Node | Ast_ECS_MemberProcedureCall_group_def_44_Parent_Node | Ast_VariableSubStmt_group_def_62_Parent_Node_400 | Ast_VariableSubStmt_group_def_62_Parent_Node_401 | Ast_ArgList_Node_420 | Ast_ArgList_Node_421 | Ast_ValueStmt_Node_426 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_ICS_S_ProcedureOrArrayCall_Node_474 | Ast_ICS_S_ProcedureOrArrayCall_Node_475 | Ast_ICS_S_ProcedureOrArrayCall_Node_476 | Ast_ICS_S_ProcedureOrArrayCall_Node_477 | Ast_Arg_group_def_92_Parent_Node;
          }
export type Ast_RPAREN_Node = Ast_RPAREN_Node_;
interface Ast_RedimSubStmt_Node_334_ extends BaseSymbolNode {
        symbol:"redimSubStmt";
        
        children:[Ast_ImplicitCallStmt_InStmt_Node,Ast_LPAREN_Node,Ast_Subscripts_Node,Ast_RPAREN_Node,Ast_AsTypeClause_Node];
        parent:Ast_RedimStmt_group_def_33_Parent_Node | Ast_RedimStmt_Node_332 | Ast_RedimStmt_Node_333;
      }
type Ast_RedimSubStmt_Node_334 = Ast_RedimSubStmt_Node_334_;
interface Ast_RedimSubStmt_Node_335_ extends BaseSymbolNode {
        symbol:"redimSubStmt";
        
        children:[Ast_ImplicitCallStmt_InStmt_Node,Ast_LPAREN_Node,Ast_Subscripts_Node,Ast_RPAREN_Node];
        parent:Ast_RedimStmt_group_def_33_Parent_Node | Ast_RedimStmt_Node_332 | Ast_RedimStmt_Node_333;
      }
type Ast_RedimSubStmt_Node_335 = Ast_RedimSubStmt_Node_335_;
interface Ast_EXIT_DO_Node_ extends BaseTokenNode {
            token:"EXIT_DO";
            parent:Ast_ExitStmt_Node_336;
          }
export type Ast_EXIT_DO_Node = Ast_EXIT_DO_Node_;
interface Ast_ExitStmt_Node_336_ extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[Ast_EXIT_DO_Node];
        parent:Ast_BlockStmt_Node_232;
      }
type Ast_ExitStmt_Node_336 = Ast_ExitStmt_Node_336_;
interface Ast_EXIT_FOR_Node_ extends BaseTokenNode {
            token:"EXIT_FOR";
            parent:Ast_ExitStmt_Node_337;
          }
export type Ast_EXIT_FOR_Node = Ast_EXIT_FOR_Node_;
interface Ast_ExitStmt_Node_337_ extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[Ast_EXIT_FOR_Node];
        parent:Ast_BlockStmt_Node_232;
      }
type Ast_ExitStmt_Node_337 = Ast_ExitStmt_Node_337_;
interface Ast_EXIT_FUNCTION_Node_ extends BaseTokenNode {
            token:"EXIT_FUNCTION";
            parent:Ast_ExitStmt_Node_338;
          }
export type Ast_EXIT_FUNCTION_Node = Ast_EXIT_FUNCTION_Node_;
interface Ast_ExitStmt_Node_338_ extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[Ast_EXIT_FUNCTION_Node];
        parent:Ast_BlockStmt_Node_232;
      }
type Ast_ExitStmt_Node_338 = Ast_ExitStmt_Node_338_;
interface Ast_EXIT_PROPERTY_Node_ extends BaseTokenNode {
            token:"EXIT_PROPERTY";
            parent:Ast_ExitStmt_Node_339;
          }
export type Ast_EXIT_PROPERTY_Node = Ast_EXIT_PROPERTY_Node_;
interface Ast_ExitStmt_Node_339_ extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[Ast_EXIT_PROPERTY_Node];
        parent:Ast_BlockStmt_Node_232;
      }
type Ast_ExitStmt_Node_339 = Ast_ExitStmt_Node_339_;
interface Ast_EXIT_SUB_Node_ extends BaseTokenNode {
            token:"EXIT_SUB";
            parent:Ast_ExitStmt_Node_340;
          }
export type Ast_EXIT_SUB_Node = Ast_EXIT_SUB_Node_;
interface Ast_ExitStmt_Node_340_ extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[Ast_EXIT_SUB_Node];
        parent:Ast_BlockStmt_Node_232;
      }
type Ast_ExitStmt_Node_340 = Ast_ExitStmt_Node_340_;
interface Ast_END_Node_ extends BaseTokenNode {
            token:"END";
            parent:Ast_ExitStmt_Node_341 | Ast_AmbiguousIdentifier_Node_681;
          }
export type Ast_END_Node = Ast_END_Node_;
interface Ast_ExitStmt_Node_341_ extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[Ast_END_Node];
        parent:Ast_BlockStmt_Node_232;
      }
type Ast_ExitStmt_Node_341 = Ast_ExitStmt_Node_341_;
type Ast_LetStmt_group_def_35_Node  = [Ast_EQ_Node];
type Ast_LetStmt_group_34_Node_343  = [...Ast_LetStmt_group_def_35_Node];
interface Ast_PLUS_EQ_Node_ extends BaseTokenNode {
            token:"PLUS_EQ";
            parent:Ast_LetStmt_group_def_36_Parent_Node;
          }
export type Ast_PLUS_EQ_Node = Ast_PLUS_EQ_Node_;
type Ast_LetStmt_group_def_36_Node  = [Ast_PLUS_EQ_Node];
type Ast_LetStmt_group_34_Node_345  = [...Ast_LetStmt_group_def_36_Node];
interface Ast_MINUS_EQ_Node_ extends BaseTokenNode {
            token:"MINUS_EQ";
            parent:Ast_LetStmt_group_def_37_Parent_Node;
          }
export type Ast_MINUS_EQ_Node = Ast_MINUS_EQ_Node_;
type Ast_LetStmt_group_def_37_Node  = [Ast_MINUS_EQ_Node];
type Ast_LetStmt_group_34_Node_347  = [...Ast_LetStmt_group_def_37_Node];
interface Ast_LET_Node_ extends BaseTokenNode {
            token:"LET";
            parent:Ast_LetStmt_Node_348 | Ast_AmbiguousIdentifier_Node_703;
          }
export type Ast_LET_Node = Ast_LET_Node_;
interface Ast_LetStmt_Node_348_ extends BaseSymbolNode {
        symbol:"letStmt";
        
        children:[Ast_LET_Node,Ast_ImplicitCallStmt_InStmt_Node,...Ast_LetStmt_group_34_Node,Ast_ValueStmt_Node];
        parent:Ast_BlockStmt_Node_236;
      }
type Ast_LetStmt_Node_348 = Ast_LetStmt_Node_348_;
interface Ast_LetStmt_Node_349_ extends BaseSymbolNode {
        symbol:"letStmt";
        
        children:[Ast_ImplicitCallStmt_InStmt_Node,...Ast_LetStmt_group_34_Node,Ast_ValueStmt_Node];
        parent:Ast_BlockStmt_Node_236;
      }
type Ast_LetStmt_Node_349 = Ast_LetStmt_Node_349_;
interface Ast_SET_Node_ extends BaseTokenNode {
            token:"SET";
            parent:Ast_SetStmt_Node | Ast_AmbiguousIdentifier_Node_727;
          }
export type Ast_SET_Node = Ast_SET_Node_;
interface Ast_SetStmt_Node_ extends BaseSymbolNode {
        symbol:"setStmt";
        
        children:[Ast_SET_Node,Ast_ImplicitCallStmt_InStmt_Node,Ast_EQ_Node,Ast_ValueStmt_Node];
        parent:Ast_BlockStmt_Node_234;
      }
type Ast_SetStmt_Node = Ast_SetStmt_Node_;
interface Ast_ExplicitCallStmt_Node_351_ extends BaseSymbolNode {
        symbol:"explicitCallStmt";
        
        children:[Ast_ECS_MemberProcedureCall_Node];
        parent:Ast_BlockStmt_Node_233;
      }
type Ast_ExplicitCallStmt_Node_351 = Ast_ExplicitCallStmt_Node_351_;
interface Ast_ExplicitCallStmt_Node_352_ extends BaseSymbolNode {
        symbol:"explicitCallStmt";
        
        children:[Ast_ECS_ProcedureCall_Node];
        parent:Ast_BlockStmt_Node_233;
      }
type Ast_ExplicitCallStmt_Node_352 = Ast_ExplicitCallStmt_Node_352_;
interface Ast_TOKEN_1_Node_ extends BaseTokenNode {
            token:".";
            parent:Ast_ECS_MemberProcedureCall_group_def_39_Parent_Node_353 | Ast_ECS_MemberProcedureCall_group_def_39_Parent_Node_354 | Ast_ICS_S_MemberCall_Node | Ast_ComplexType_group_def_98_Parent_Node;
          }
export type Ast_TOKEN_1_Node = Ast_TOKEN_1_Node_;
type Ast_ECS_MemberProcedureCall_group_def_39_Node_353  = [Ast_ImplicitCallStmt_InStmt_Node,Ast_TOKEN_1_Node];
type Ast_ECS_MemberProcedureCall_group_def_39_Node_354  = [Ast_TOKEN_1_Node];
type Ast_ECS_MemberProcedureCall_group_38_Node_355  = [...Ast_ECS_MemberProcedureCall_group_def_39_Node];
interface Ast_SPACE_DOT_Node_ extends BaseTokenNode {
            token:"SPACE_DOT";
            parent:Ast_ECS_MemberProcedureCall_group_def_40_Parent_Node | Ast_ICS_S_SpaceMemberCall_Node;
          }
export type Ast_SPACE_DOT_Node = Ast_SPACE_DOT_Node_;
type Ast_ECS_MemberProcedureCall_group_def_40_Node  = [Ast_SPACE_DOT_Node];
type Ast_ECS_MemberProcedureCall_group_38_Node_357  = [...Ast_ECS_MemberProcedureCall_group_def_40_Node];
type Ast_ECS_MemberProcedureCall_group_def_42_Node  = [Ast_LPAREN_Node,Ast_ArgsCall_Node,Ast_RPAREN_Node];
type Ast_ECS_MemberProcedureCall_group_def_44_Node  = [Ast_LPAREN_Node,Ast_Indexes_Node,Ast_RPAREN_Node];
interface Ast_CALL_Node_ extends BaseTokenNode {
            token:"CALL";
            parent:Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ECS_ProcedureCall_Node_364 | Ast_ECS_ProcedureCall_Node_365 | Ast_ECS_ProcedureCall_Node_366 | Ast_ECS_ProcedureCall_Node_367 | Ast_AmbiguousIdentifier_Node_658;
          }
export type Ast_CALL_Node = Ast_CALL_Node_;
interface Ast_ECS_MemberProcedureCall_Node_360_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[Ast_CALL_Node,...Ast_ECS_MemberProcedureCall_group_38_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...Ast_ECS_MemberProcedureCall_group_def_42_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ExplicitCallStmt_Node_351;
      }
type Ast_ECS_MemberProcedureCall_Node_360 = Ast_ECS_MemberProcedureCall_Node_360_;
interface Ast_ECS_MemberProcedureCall_Node_361_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[Ast_CALL_Node,...Ast_ECS_MemberProcedureCall_group_38_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ExplicitCallStmt_Node_351;
      }
type Ast_ECS_MemberProcedureCall_Node_361 = Ast_ECS_MemberProcedureCall_Node_361_;
interface Ast_ECS_MemberProcedureCall_Node_362_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[Ast_CALL_Node,...Ast_ECS_MemberProcedureCall_group_38_Node,Ast_AmbiguousIdentifier_Node,...Ast_ECS_MemberProcedureCall_group_def_42_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ExplicitCallStmt_Node_351;
      }
type Ast_ECS_MemberProcedureCall_Node_362 = Ast_ECS_MemberProcedureCall_Node_362_;
interface Ast_ECS_MemberProcedureCall_Node_363_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[Ast_CALL_Node,...Ast_ECS_MemberProcedureCall_group_38_Node,Ast_AmbiguousIdentifier_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ExplicitCallStmt_Node_351;
      }
type Ast_ECS_MemberProcedureCall_Node_363 = Ast_ECS_MemberProcedureCall_Node_363_;
interface Ast_ECS_ProcedureCall_Node_364_ extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[Ast_CALL_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_ECS_MemberProcedureCall_group_def_42_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ExplicitCallStmt_Node_352;
      }
type Ast_ECS_ProcedureCall_Node_364 = Ast_ECS_ProcedureCall_Node_364_;
interface Ast_ECS_ProcedureCall_Node_365_ extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[Ast_CALL_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ExplicitCallStmt_Node_352;
      }
type Ast_ECS_ProcedureCall_Node_365 = Ast_ECS_ProcedureCall_Node_365_;
interface Ast_ECS_ProcedureCall_Node_366_ extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[Ast_CALL_Node,Ast_CertainIdentifier_Node,...Ast_ECS_MemberProcedureCall_group_def_42_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ExplicitCallStmt_Node_352;
      }
type Ast_ECS_ProcedureCall_Node_366 = Ast_ECS_ProcedureCall_Node_366_;
interface Ast_ECS_ProcedureCall_Node_367_ extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[Ast_CALL_Node,Ast_CertainIdentifier_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ExplicitCallStmt_Node_352;
      }
type Ast_ECS_ProcedureCall_Node_367 = Ast_ECS_ProcedureCall_Node_367_;
interface Ast_ImplicitCallStmt_InBlock_Node_368_ extends BaseSymbolNode {
        symbol:"implicitCallStmt_InBlock";
        
        children:[Ast_ICS_B_MemberProcedureCall_Node];
        parent:Ast_BlockStmt_Node_238;
      }
type Ast_ImplicitCallStmt_InBlock_Node_368 = Ast_ImplicitCallStmt_InBlock_Node_368_;
interface Ast_ImplicitCallStmt_InBlock_Node_369_ extends BaseSymbolNode {
        symbol:"implicitCallStmt_InBlock";
        
        children:[Ast_ICS_B_ProcedureCall_Node];
        parent:Ast_BlockStmt_Node_238;
      }
type Ast_ImplicitCallStmt_InBlock_Node_369 = Ast_ImplicitCallStmt_InBlock_Node_369_;
type Ast_ICS_B_MemberProcedureCall_group_47_Node_370  = [...Ast_ECS_MemberProcedureCall_group_def_40_Node];
type Ast_ICS_B_MemberProcedureCall_group_47_Node_371  = [...Ast_ECS_MemberProcedureCall_group_def_39_Node];
interface Ast_ICS_B_MemberProcedureCall_Node_372_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[...Ast_ICS_B_MemberProcedureCall_group_47_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_ArgsCall_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ImplicitCallStmt_InBlock_Node_368;
      }
type Ast_ICS_B_MemberProcedureCall_Node_372 = Ast_ICS_B_MemberProcedureCall_Node_372_;
interface Ast_ICS_B_MemberProcedureCall_Node_373_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[...Ast_ICS_B_MemberProcedureCall_group_47_Node,Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ImplicitCallStmt_InBlock_Node_368;
      }
type Ast_ICS_B_MemberProcedureCall_Node_373 = Ast_ICS_B_MemberProcedureCall_Node_373_;
interface Ast_ICS_B_MemberProcedureCall_Node_374_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[...Ast_ICS_B_MemberProcedureCall_group_47_Node,Ast_AmbiguousIdentifier_Node,Ast_ArgsCall_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ImplicitCallStmt_InBlock_Node_368;
      }
type Ast_ICS_B_MemberProcedureCall_Node_374 = Ast_ICS_B_MemberProcedureCall_Node_374_;
interface Ast_ICS_B_MemberProcedureCall_Node_375_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[...Ast_ICS_B_MemberProcedureCall_group_47_Node,Ast_AmbiguousIdentifier_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ImplicitCallStmt_InBlock_Node_368;
      }
type Ast_ICS_B_MemberProcedureCall_Node_375 = Ast_ICS_B_MemberProcedureCall_Node_375_;
interface Ast_ICS_B_ProcedureCall_Node_376_ extends BaseSymbolNode {
        symbol:"iCS_B_ProcedureCall";
        
        children:[Ast_CertainIdentifier_Node,Ast_ArgsCall_Node,...Ast_ECS_MemberProcedureCall_group_def_44_Node];
        parent:Ast_ImplicitCallStmt_InBlock_Node_369;
      }
type Ast_ICS_B_ProcedureCall_Node_376 = Ast_ICS_B_ProcedureCall_Node_376_;
interface Ast_ICS_B_ProcedureCall_Node_377_ extends BaseSymbolNode {
        symbol:"iCS_B_ProcedureCall";
        
        children:[Ast_CertainIdentifier_Node,Ast_ArgsCall_Node];
        parent:Ast_ImplicitCallStmt_InBlock_Node_369;
      }
type Ast_ICS_B_ProcedureCall_Node_377 = Ast_ICS_B_ProcedureCall_Node_377_;
interface Ast_ICS_B_ProcedureCall_Node_378_ extends BaseSymbolNode {
        symbol:"iCS_B_ProcedureCall";
        
        children:[Ast_CertainIdentifier_Node,...Ast_ECS_MemberProcedureCall_group_def_44_Node];
        parent:Ast_ImplicitCallStmt_InBlock_Node_369;
      }
type Ast_ICS_B_ProcedureCall_Node_378 = Ast_ICS_B_ProcedureCall_Node_378_;
interface Ast_ICS_B_ProcedureCall_Node_379_ extends BaseSymbolNode {
        symbol:"iCS_B_ProcedureCall";
        
        children:[Ast_CertainIdentifier_Node];
        parent:Ast_ImplicitCallStmt_InBlock_Node_369;
      }
type Ast_ICS_B_ProcedureCall_Node_379 = Ast_ICS_B_ProcedureCall_Node_379_;
type Ast_ArgsCall_group_def_51_Node_380  = [Ast_TOKEN_0_Node,Ast_ArgCall_Node];
type Ast_ArgsCall_group_def_51_Node_381  = [Ast_TOKEN_0_Node];
interface Ast_ArgsCall_Node_ extends BaseSymbolNode {
        symbol:"argsCall";
        
        children:[...ZeroOrMore<Ast_TOKEN_0_Node>,Ast_ArgCall_Node,...ZeroOrMore<Ast_ArgsCall_group_def_51_Node>];
        parent:Ast_ECS_MemberProcedureCall_group_def_42_Parent_Node | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_ProcedureCall_Node_376 | Ast_ICS_B_ProcedureCall_Node_377 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_ICS_S_ProcedureOrArrayCall_Node_474 | Ast_ICS_S_ProcedureOrArrayCall_Node_476;
      }
type Ast_ArgsCall_Node = Ast_ArgsCall_Node_;
interface Ast_ArgCall_Node_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[Ast_ValueStmt_Node];
        parent:Ast_ArgsCall_group_def_51_Parent_Node_380 | Ast_ArgsCall_Node;
      }
type Ast_ArgCall_Node = Ast_ArgCall_Node_;
interface Ast_DIM_Node_ extends BaseTokenNode {
            token:"DIM";
            parent:Ast_VariableStmt_group_def_53_Parent_Node | Ast_AmbiguousIdentifier_Node_675;
          }
export type Ast_DIM_Node = Ast_DIM_Node_;
type Ast_VariableStmt_group_def_53_Node  = [Ast_DIM_Node];
type Ast_VariableStmt_group_52_Node_385  = [...Ast_VariableStmt_group_def_53_Node];
type Ast_VariableStmt_group_def_54_Node  = [Ast_STATIC_Node];
type Ast_VariableStmt_group_52_Node_387  = [...Ast_VariableStmt_group_def_54_Node];
type Ast_VariableStmt_group_def_55_Node  = [Ast_Visibility_Node];
type Ast_VariableStmt_group_52_Node_389  = [...Ast_VariableStmt_group_def_55_Node];
interface Ast_WITHEVENTS_Node_ extends BaseTokenNode {
            token:"WITHEVENTS";
            parent:Ast_VariableStmt_Node_390 | Ast_AmbiguousIdentifier_Node_743;
          }
export type Ast_WITHEVENTS_Node = Ast_WITHEVENTS_Node_;
interface Ast_VariableStmt_Node_390_ extends BaseSymbolNode {
        symbol:"variableStmt";
        
        children:[...Ast_VariableStmt_group_52_Node,Ast_WITHEVENTS_Node,Ast_VariableListStmt_Node];
        parent:Ast_ModuleDeclarationsElement_Node_23 | Ast_BlockStmt_Node_237;
      }
type Ast_VariableStmt_Node_390 = Ast_VariableStmt_Node_390_;
interface Ast_VariableStmt_Node_391_ extends BaseSymbolNode {
        symbol:"variableStmt";
        
        children:[...Ast_VariableStmt_group_52_Node,Ast_VariableListStmt_Node];
        parent:Ast_ModuleDeclarationsElement_Node_23 | Ast_BlockStmt_Node_237;
      }
type Ast_VariableStmt_Node_391 = Ast_VariableStmt_Node_391_;
type Ast_WithStmt_group_def_57_Node  = [Ast_ImplicitCallStmt_InStmt_Node];
type Ast_WithStmt_group_56_Node_393  = [...Ast_WithStmt_group_def_57_Node];
interface Ast_NEW_Node_ extends BaseTokenNode {
            token:"NEW";
            parent:Ast_WithStmt_group_def_58_Parent_Node | Ast_ValueStmt_Node_425 | Ast_AsTypeClause_Node_630 | Ast_AmbiguousIdentifier_Node_709;
          }
export type Ast_NEW_Node = Ast_NEW_Node_;
type Ast_WithStmt_group_def_58_Node  = [Ast_NEW_Node,Ast_Type__Node];
type Ast_WithStmt_group_56_Node_395  = [...Ast_WithStmt_group_def_58_Node];
interface Ast_WITH_Node_ extends BaseTokenNode {
            token:"WITH";
            parent:Ast_WithStmt_Node_396 | Ast_WithStmt_Node_397 | Ast_AmbiguousIdentifier_Node_742;
          }
export type Ast_WITH_Node = Ast_WITH_Node_;
interface Ast_END_WITH_Node_ extends BaseTokenNode {
            token:"END_WITH";
            parent:Ast_WithStmt_Node_396 | Ast_WithStmt_Node_397;
          }
export type Ast_END_WITH_Node = Ast_END_WITH_Node_;
interface Ast_WithStmt_Node_396_ extends BaseSymbolNode {
        symbol:"withStmt";
        
        children:[Ast_WITH_Node,...Ast_WithStmt_group_56_Node,Ast_EndOfStatement_Node,Ast_Block_Node,Ast_END_WITH_Node];
        parent:Ast_BlockStmt_Node_230;
      }
type Ast_WithStmt_Node_396 = Ast_WithStmt_Node_396_;
interface Ast_WithStmt_Node_397_ extends BaseSymbolNode {
        symbol:"withStmt";
        
        children:[Ast_WITH_Node,...Ast_WithStmt_group_56_Node,Ast_EndOfStatement_Node,Ast_END_WITH_Node];
        parent:Ast_BlockStmt_Node_230;
      }
type Ast_WithStmt_Node_397 = Ast_WithStmt_Node_397_;
type Ast_VariableListStmt_group_def_60_Node  = [Ast_TOKEN_0_Node,Ast_VariableSubStmt_Node];
interface Ast_VariableListStmt_Node_ extends BaseSymbolNode {
        symbol:"variableListStmt";
        
        children:[Ast_VariableSubStmt_Node,...ZeroOrMore<Ast_VariableListStmt_group_def_60_Node>];
        parent:Ast_VariableStmt_Node_390 | Ast_VariableStmt_Node_391;
      }
type Ast_VariableListStmt_Node = Ast_VariableListStmt_Node_;
type Ast_VariableSubStmt_group_def_62_Node_400  = [Ast_LPAREN_Node,Ast_Subscripts_Node,Ast_RPAREN_Node];
type Ast_VariableSubStmt_group_def_62_Node_401  = [Ast_LPAREN_Node,Ast_RPAREN_Node];
interface Ast_VariableSubStmt_Node_402_ extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[Ast_CertainIdentifier_Node,...Ast_VariableSubStmt_group_def_62_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node];
        parent:Ast_VariableListStmt_group_def_60_Parent_Node | Ast_VariableListStmt_Node;
      }
type Ast_VariableSubStmt_Node_402 = Ast_VariableSubStmt_Node_402_;
interface Ast_VariableSubStmt_Node_403_ extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[Ast_CertainIdentifier_Node,...Ast_VariableSubStmt_group_def_62_Node,Ast_TypeHint_Node];
        parent:Ast_VariableListStmt_group_def_60_Parent_Node | Ast_VariableListStmt_Node;
      }
type Ast_VariableSubStmt_Node_403 = Ast_VariableSubStmt_Node_403_;
interface Ast_VariableSubStmt_Node_404_ extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[Ast_CertainIdentifier_Node,...Ast_VariableSubStmt_group_def_62_Node,Ast_AsTypeClause_Node];
        parent:Ast_VariableListStmt_group_def_60_Parent_Node | Ast_VariableListStmt_Node;
      }
type Ast_VariableSubStmt_Node_404 = Ast_VariableSubStmt_Node_404_;
interface Ast_VariableSubStmt_Node_405_ extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[Ast_CertainIdentifier_Node,...Ast_VariableSubStmt_group_def_62_Node];
        parent:Ast_VariableListStmt_group_def_60_Parent_Node | Ast_VariableListStmt_Node;
      }
type Ast_VariableSubStmt_Node_405 = Ast_VariableSubStmt_Node_405_;
interface Ast_VariableSubStmt_Node_406_ extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node];
        parent:Ast_VariableListStmt_group_def_60_Parent_Node | Ast_VariableListStmt_Node;
      }
type Ast_VariableSubStmt_Node_406 = Ast_VariableSubStmt_Node_406_;
interface Ast_VariableSubStmt_Node_407_ extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[Ast_CertainIdentifier_Node,Ast_TypeHint_Node];
        parent:Ast_VariableListStmt_group_def_60_Parent_Node | Ast_VariableListStmt_Node;
      }
type Ast_VariableSubStmt_Node_407 = Ast_VariableSubStmt_Node_407_;
interface Ast_VariableSubStmt_Node_408_ extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node];
        parent:Ast_VariableListStmt_group_def_60_Parent_Node | Ast_VariableListStmt_Node;
      }
type Ast_VariableSubStmt_Node_408 = Ast_VariableSubStmt_Node_408_;
interface Ast_VariableSubStmt_Node_409_ extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[Ast_CertainIdentifier_Node];
        parent:Ast_VariableListStmt_group_def_60_Parent_Node | Ast_VariableListStmt_Node;
      }
type Ast_VariableSubStmt_Node_409 = Ast_VariableSubStmt_Node_409_;
interface Ast_Indexes_Node_ extends BaseSymbolNode {
        symbol:"indexes";
        
        children:[Ast_ValueStmt_Node,...ZeroOrMore<Ast_EraseStmt_group_def_31_Node>];
        parent:Ast_ECS_MemberProcedureCall_group_def_44_Parent_Node;
      }
type Ast_Indexes_Node = Ast_Indexes_Node_;
type Ast_Subscript__group_def_65_Node  = [Ast_ValueStmt_Node,Ast_TO_Node];
interface Ast_Subscript__Node_412_ extends BaseSymbolNode {
        symbol:"subscript_";
        
        children:[...Ast_Subscript__group_def_65_Node,Ast_ValueStmt_Node];
        parent:Ast_Subscripts_group_def_67_Parent_Node | Ast_Subscripts_Node;
      }
type Ast_Subscript__Node_412 = Ast_Subscript__Node_412_;
interface Ast_Subscript__Node_413_ extends BaseSymbolNode {
        symbol:"subscript_";
        
        children:[Ast_ValueStmt_Node];
        parent:Ast_Subscripts_group_def_67_Parent_Node | Ast_Subscripts_Node;
      }
type Ast_Subscript__Node_413 = Ast_Subscript__Node_413_;
type Ast_Subscripts_group_def_67_Node  = [Ast_TOKEN_0_Node,Ast_Subscript__Node];
interface Ast_Subscripts_Node_ extends BaseSymbolNode {
        symbol:"subscripts";
        
        children:[Ast_Subscript__Node,...ZeroOrMore<Ast_Subscripts_group_def_67_Node>];
        parent:Ast_RedimSubStmt_Node_334 | Ast_RedimSubStmt_Node_335 | Ast_VariableSubStmt_group_def_62_Parent_Node_400;
      }
type Ast_Subscripts_Node = Ast_Subscripts_Node_;
interface Ast_Subscript__Node_416_ extends BaseSymbolNode {
        symbol:"subscript_";
        
        children:[...Ast_Subscript__group_def_65_Node,Ast_ValueStmt_Node];
        parent:Ast_Subscripts_group_def_67_Parent_Node | Ast_Subscripts_Node;
      }
type Ast_Subscript__Node_416 = Ast_Subscript__Node_416_;
interface Ast_Subscript__Node_417_ extends BaseSymbolNode {
        symbol:"subscript_";
        
        children:[Ast_ValueStmt_Node];
        parent:Ast_Subscripts_group_def_67_Parent_Node | Ast_Subscripts_Node;
      }
type Ast_Subscript__Node_417 = Ast_Subscript__Node_417_;
type Ast_ArgList_group_def_71_Node  = [Ast_TOKEN_0_Node,Ast_Arg_Node];
type Ast_ArgList_group_def_72_Node  = [Ast_Arg_Node,...ZeroOrMore<Ast_ArgList_group_def_71_Node>];
interface Ast_ArgList_Node_420_ extends BaseSymbolNode {
        symbol:"argList";
        
        children:[Ast_LPAREN_Node,...Ast_ArgList_group_def_72_Node,Ast_RPAREN_Node];
        parent:Ast_SubStmt_Node_40 | Ast_SubStmt_Node_41 | Ast_SubStmt_Node_44 | Ast_SubStmt_Node_45 | Ast_SubStmt_Node_48 | Ast_SubStmt_Node_49 | Ast_SubStmt_Node_52 | Ast_SubStmt_Node_53 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_PropertyGetStmt_Node_80 | Ast_PropertyGetStmt_Node_81 | Ast_PropertyGetStmt_Node_82 | Ast_PropertyGetStmt_Node_83 | Ast_PropertyGetStmt_Node_88 | Ast_PropertyGetStmt_Node_89 | Ast_PropertyGetStmt_Node_90 | Ast_PropertyGetStmt_Node_91 | Ast_PropertyGetStmt_Node_96 | Ast_PropertyGetStmt_Node_97 | Ast_PropertyGetStmt_Node_98 | Ast_PropertyGetStmt_Node_99 | Ast_PropertyGetStmt_Node_104 | Ast_PropertyGetStmt_Node_105 | Ast_PropertyGetStmt_Node_106 | Ast_PropertyGetStmt_Node_107 | Ast_PropertyGetStmt_Node_112 | Ast_PropertyGetStmt_Node_113 | Ast_PropertyGetStmt_Node_114 | Ast_PropertyGetStmt_Node_115 | Ast_PropertySetStmt_Node_120 | Ast_PropertySetStmt_Node_121 | Ast_PropertySetStmt_Node_124 | Ast_PropertySetStmt_Node_125 | Ast_PropertySetStmt_Node_128 | Ast_PropertySetStmt_Node_129 | Ast_PropertySetStmt_Node_132 | Ast_PropertySetStmt_Node_133 | Ast_PropertyLetStmt_Node_136 | Ast_PropertyLetStmt_Node_137 | Ast_PropertyLetStmt_Node_140 | Ast_PropertyLetStmt_Node_141 | Ast_PropertyLetStmt_Node_144 | Ast_PropertyLetStmt_Node_145 | Ast_PropertyLetStmt_Node_148 | Ast_PropertyLetStmt_Node_149 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_171 | Ast_FunctionStmt_Node_176 | Ast_FunctionStmt_Node_177 | Ast_FunctionStmt_Node_178 | Ast_FunctionStmt_Node_179 | Ast_FunctionStmt_Node_184 | Ast_FunctionStmt_Node_185 | Ast_FunctionStmt_Node_186 | Ast_FunctionStmt_Node_187 | Ast_FunctionStmt_Node_192 | Ast_FunctionStmt_Node_193 | Ast_FunctionStmt_Node_194 | Ast_FunctionStmt_Node_195 | Ast_FunctionStmt_Node_200 | Ast_FunctionStmt_Node_201 | Ast_FunctionStmt_Node_202 | Ast_FunctionStmt_Node_203 | Ast_FunctionStmt_Node_208 | Ast_FunctionStmt_Node_209 | Ast_FunctionStmt_Node_210 | Ast_FunctionStmt_Node_211;
      }
type Ast_ArgList_Node_420 = Ast_ArgList_Node_420_;
interface Ast_ArgList_Node_421_ extends BaseSymbolNode {
        symbol:"argList";
        
        children:[Ast_LPAREN_Node,Ast_RPAREN_Node];
        parent:Ast_SubStmt_Node_40 | Ast_SubStmt_Node_41 | Ast_SubStmt_Node_44 | Ast_SubStmt_Node_45 | Ast_SubStmt_Node_48 | Ast_SubStmt_Node_49 | Ast_SubStmt_Node_52 | Ast_SubStmt_Node_53 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_PropertyGetStmt_Node_80 | Ast_PropertyGetStmt_Node_81 | Ast_PropertyGetStmt_Node_82 | Ast_PropertyGetStmt_Node_83 | Ast_PropertyGetStmt_Node_88 | Ast_PropertyGetStmt_Node_89 | Ast_PropertyGetStmt_Node_90 | Ast_PropertyGetStmt_Node_91 | Ast_PropertyGetStmt_Node_96 | Ast_PropertyGetStmt_Node_97 | Ast_PropertyGetStmt_Node_98 | Ast_PropertyGetStmt_Node_99 | Ast_PropertyGetStmt_Node_104 | Ast_PropertyGetStmt_Node_105 | Ast_PropertyGetStmt_Node_106 | Ast_PropertyGetStmt_Node_107 | Ast_PropertyGetStmt_Node_112 | Ast_PropertyGetStmt_Node_113 | Ast_PropertyGetStmt_Node_114 | Ast_PropertyGetStmt_Node_115 | Ast_PropertySetStmt_Node_120 | Ast_PropertySetStmt_Node_121 | Ast_PropertySetStmt_Node_124 | Ast_PropertySetStmt_Node_125 | Ast_PropertySetStmt_Node_128 | Ast_PropertySetStmt_Node_129 | Ast_PropertySetStmt_Node_132 | Ast_PropertySetStmt_Node_133 | Ast_PropertyLetStmt_Node_136 | Ast_PropertyLetStmt_Node_137 | Ast_PropertyLetStmt_Node_140 | Ast_PropertyLetStmt_Node_141 | Ast_PropertyLetStmt_Node_144 | Ast_PropertyLetStmt_Node_145 | Ast_PropertyLetStmt_Node_148 | Ast_PropertyLetStmt_Node_149 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_171 | Ast_FunctionStmt_Node_176 | Ast_FunctionStmt_Node_177 | Ast_FunctionStmt_Node_178 | Ast_FunctionStmt_Node_179 | Ast_FunctionStmt_Node_184 | Ast_FunctionStmt_Node_185 | Ast_FunctionStmt_Node_186 | Ast_FunctionStmt_Node_187 | Ast_FunctionStmt_Node_192 | Ast_FunctionStmt_Node_193 | Ast_FunctionStmt_Node_194 | Ast_FunctionStmt_Node_195 | Ast_FunctionStmt_Node_200 | Ast_FunctionStmt_Node_201 | Ast_FunctionStmt_Node_202 | Ast_FunctionStmt_Node_203 | Ast_FunctionStmt_Node_208 | Ast_FunctionStmt_Node_209 | Ast_FunctionStmt_Node_210 | Ast_FunctionStmt_Node_211;
      }
type Ast_ArgList_Node_421 = Ast_ArgList_Node_421_;
interface Ast_ValueStmt_Node_422_ extends BaseSymbolNode {
        symbol:"valueStmt";
        
        children:[Ast_Literal_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_422 = Ast_ValueStmt_Node_422_;
interface Ast_ValueStmt_Node_423_ extends BaseSymbolNode {
        symbol:"valueStmt";
        
        children:[Ast_ImplicitCallStmt_InStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_423 = Ast_ValueStmt_Node_423_;
interface Ast_ASSIGN_Node_ extends BaseTokenNode {
            token:"ASSIGN";
            parent:Ast_ValueStmt_Node_424;
          }
export type Ast_ASSIGN_Node = Ast_ASSIGN_Node_;
interface Ast_ValueStmt_Node_424_ extends BaseSymbolNode {
        symbol:"valueStmt";
        
        children:[Ast_CertainIdentifier_Node,Ast_ASSIGN_Node,Ast_ValueStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_424 = Ast_ValueStmt_Node_424_;
interface Ast_ValueStmt_Node_425_ extends BaseSymbolNode {
        symbol:"valueStmt";
        
        children:[Ast_NEW_Node,Ast_ValueStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_425 = Ast_ValueStmt_Node_425_;
interface Ast_ValueStmt_Node_426_ extends BaseSymbolNode {
        symbol:"valueStmt";
        label:"AtomExpression";
        children:[Ast_LPAREN_Node,Ast_ValueStmt_Node,Ast_RPAREN_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_426 = Ast_ValueStmt_Node_426_;
interface Ast_ValueStmt_Node_427_ extends BaseSymbolNode {
        symbol:"valueStmt";
        label:"BinaryExpression";
        children:[Ast_ValueStmt_Node,Ast_IS_Node,Ast_ValueStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_427 = Ast_ValueStmt_Node_427_;
interface Ast_ISNOT_Node_ extends BaseTokenNode {
            token:"ISNOT";
            parent:Ast_ValueStmt_Node_428 | Ast_AmbiguousIdentifier_Node_697;
          }
export type Ast_ISNOT_Node = Ast_ISNOT_Node_;
interface Ast_ValueStmt_Node_428_ extends BaseSymbolNode {
        symbol:"valueStmt";
        label:"BinaryExpression";
        children:[Ast_ValueStmt_Node,Ast_ISNOT_Node,Ast_ValueStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_428 = Ast_ValueStmt_Node_428_;
interface Ast_ValueStmt_Node_429_ extends BaseSymbolNode {
        symbol:"valueStmt";
        label:"BinaryExpression";
        children:[Ast_ValueStmt_Node,Ast_GEQ_Node,Ast_ValueStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_429 = Ast_ValueStmt_Node_429_;
interface Ast_ValueStmt_Node_430_ extends BaseSymbolNode {
        symbol:"valueStmt";
        label:"BinaryExpression";
        children:[Ast_ValueStmt_Node,Ast_LEQ_Node,Ast_ValueStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_430 = Ast_ValueStmt_Node_430_;
interface Ast_ValueStmt_Node_431_ extends BaseSymbolNode {
        symbol:"valueStmt";
        label:"BinaryExpression";
        children:[Ast_ValueStmt_Node,Ast_GT_Node,Ast_ValueStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_431 = Ast_ValueStmt_Node_431_;
interface Ast_ValueStmt_Node_432_ extends BaseSymbolNode {
        symbol:"valueStmt";
        label:"BinaryExpression";
        children:[Ast_ValueStmt_Node,Ast_LT_Node,Ast_ValueStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_432 = Ast_ValueStmt_Node_432_;
interface Ast_ValueStmt_Node_433_ extends BaseSymbolNode {
        symbol:"valueStmt";
        label:"BinaryExpression";
        children:[Ast_ValueStmt_Node,Ast_NEQ_Node,Ast_ValueStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_433 = Ast_ValueStmt_Node_433_;
interface Ast_ValueStmt_Node_434_ extends BaseSymbolNode {
        symbol:"valueStmt";
        label:"BinaryExpression";
        children:[Ast_ValueStmt_Node,Ast_EQ_Node,Ast_ValueStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_434 = Ast_ValueStmt_Node_434_;
interface Ast_XOR_Node_ extends BaseTokenNode {
            token:"XOR";
            parent:Ast_ValueStmt_Node_435 | Ast_AmbiguousIdentifier_Node_744;
          }
export type Ast_XOR_Node = Ast_XOR_Node_;
interface Ast_ValueStmt_Node_435_ extends BaseSymbolNode {
        symbol:"valueStmt";
        label:"BinaryExpression";
        children:[Ast_ValueStmt_Node,Ast_XOR_Node,Ast_ValueStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_435 = Ast_ValueStmt_Node_435_;
interface Ast_OR_Node_ extends BaseTokenNode {
            token:"OR";
            parent:Ast_ValueStmt_Node_436 | Ast_AmbiguousIdentifier_Node_715;
          }
export type Ast_OR_Node = Ast_OR_Node_;
interface Ast_ValueStmt_Node_436_ extends BaseSymbolNode {
        symbol:"valueStmt";
        label:"BinaryExpression";
        children:[Ast_ValueStmt_Node,Ast_OR_Node,Ast_ValueStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_436 = Ast_ValueStmt_Node_436_;
interface Ast_AND_Node_ extends BaseTokenNode {
            token:"AND";
            parent:Ast_ValueStmt_Node_437 | Ast_AmbiguousIdentifier_Node_650;
          }
export type Ast_AND_Node = Ast_AND_Node_;
interface Ast_ValueStmt_Node_437_ extends BaseSymbolNode {
        symbol:"valueStmt";
        label:"BinaryExpression";
        children:[Ast_ValueStmt_Node,Ast_AND_Node,Ast_ValueStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_437 = Ast_ValueStmt_Node_437_;
interface Ast_PLUS_Node_ extends BaseTokenNode {
            token:"PLUS";
            parent:Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_447;
          }
export type Ast_PLUS_Node = Ast_PLUS_Node_;
interface Ast_ValueStmt_Node_438_ extends BaseSymbolNode {
        symbol:"valueStmt";
        label:"BinaryExpression";
        children:[Ast_ValueStmt_Node,Ast_PLUS_Node,Ast_ValueStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_438 = Ast_ValueStmt_Node_438_;
interface Ast_ValueStmt_Node_439_ extends BaseSymbolNode {
        symbol:"valueStmt";
        label:"BinaryExpression";
        children:[Ast_ValueStmt_Node,Ast_MINUS_Node,Ast_ValueStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_439 = Ast_ValueStmt_Node_439_;
interface Ast_AMPERSAND_Node_ extends BaseTokenNode {
            token:"AMPERSAND";
            parent:Ast_ValueStmt_Node_440;
          }
export type Ast_AMPERSAND_Node = Ast_AMPERSAND_Node_;
interface Ast_ValueStmt_Node_440_ extends BaseSymbolNode {
        symbol:"valueStmt";
        label:"BinaryExpression";
        children:[Ast_ValueStmt_Node,Ast_AMPERSAND_Node,Ast_ValueStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_440 = Ast_ValueStmt_Node_440_;
interface Ast_MULT_Node_ extends BaseTokenNode {
            token:"MULT";
            parent:Ast_ValueStmt_Node_441;
          }
export type Ast_MULT_Node = Ast_MULT_Node_;
interface Ast_ValueStmt_Node_441_ extends BaseSymbolNode {
        symbol:"valueStmt";
        label:"BinaryExpression";
        children:[Ast_ValueStmt_Node,Ast_MULT_Node,Ast_ValueStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_441 = Ast_ValueStmt_Node_441_;
interface Ast_DIV_Node_ extends BaseTokenNode {
            token:"DIV";
            parent:Ast_ValueStmt_Node_442;
          }
export type Ast_DIV_Node = Ast_DIV_Node_;
interface Ast_ValueStmt_Node_442_ extends BaseSymbolNode {
        symbol:"valueStmt";
        label:"BinaryExpression";
        children:[Ast_ValueStmt_Node,Ast_DIV_Node,Ast_ValueStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_442 = Ast_ValueStmt_Node_442_;
interface Ast_IDIV_Node_ extends BaseTokenNode {
            token:"IDIV";
            parent:Ast_ValueStmt_Node_443;
          }
export type Ast_IDIV_Node = Ast_IDIV_Node_;
interface Ast_ValueStmt_Node_443_ extends BaseSymbolNode {
        symbol:"valueStmt";
        label:"BinaryExpression";
        children:[Ast_ValueStmt_Node,Ast_IDIV_Node,Ast_ValueStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_443 = Ast_ValueStmt_Node_443_;
interface Ast_MOD_Node_ extends BaseTokenNode {
            token:"MOD";
            parent:Ast_ValueStmt_Node_444 | Ast_AmbiguousIdentifier_Node_707;
          }
export type Ast_MOD_Node = Ast_MOD_Node_;
interface Ast_ValueStmt_Node_444_ extends BaseSymbolNode {
        symbol:"valueStmt";
        label:"BinaryExpression";
        children:[Ast_ValueStmt_Node,Ast_MOD_Node,Ast_ValueStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_444 = Ast_ValueStmt_Node_444_;
interface Ast_POW_Node_ extends BaseTokenNode {
            token:"POW";
            parent:Ast_ValueStmt_Node_445;
          }
export type Ast_POW_Node = Ast_POW_Node_;
interface Ast_ValueStmt_Node_445_ extends BaseSymbolNode {
        symbol:"valueStmt";
        label:"BinaryExpression";
        children:[Ast_ValueStmt_Node,Ast_POW_Node,Ast_ValueStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_445 = Ast_ValueStmt_Node_445_;
interface Ast_ValueStmt_Node_446_ extends BaseSymbolNode {
        symbol:"valueStmt";
        label:"PrefixExpression";
        children:[Ast_MINUS_Node,Ast_ValueStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_446 = Ast_ValueStmt_Node_446_;
interface Ast_ValueStmt_Node_447_ extends BaseSymbolNode {
        symbol:"valueStmt";
        label:"PrefixExpression";
        children:[Ast_PLUS_Node,Ast_ValueStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_447 = Ast_ValueStmt_Node_447_;
interface Ast_NOT_Node_ extends BaseTokenNode {
            token:"NOT";
            parent:Ast_ValueStmt_Node_448 | Ast_AmbiguousIdentifier_Node_710;
          }
export type Ast_NOT_Node = Ast_NOT_Node_;
interface Ast_ValueStmt_Node_448_ extends BaseSymbolNode {
        symbol:"valueStmt";
        label:"PrefixExpression";
        children:[Ast_NOT_Node,Ast_ValueStmt_Node];
        parent:Ast_WhileWendStmt_Node | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249 | Ast_ForNextStmt_group_def_19_Parent_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_SelectCaseStmt_Node | Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294 | Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313 | Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315 | Ast_EraseStmt_group_def_31_Parent_Node | Ast_EraseStmt_Node | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ArgCall_Node | Ast_Indexes_Node | Ast_Subscript__group_def_65_Parent_Node | Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448 | Ast_ArgDefaultValue_Node;
      }
type Ast_ValueStmt_Node_448 = Ast_ValueStmt_Node_448_;
interface Ast_ImplicitCallStmt_InStmt_Node_449_ extends BaseSymbolNode {
        symbol:"implicitCallStmt_InStmt";
        
        children:[Ast_ICS_S_MembersCall_Node];
        parent:Ast_AttributeStmt_Node | Ast_RedimSubStmt_Node_334 | Ast_RedimSubStmt_Node_335 | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ECS_MemberProcedureCall_group_def_39_Parent_Node_353 | Ast_WithStmt_group_def_57_Parent_Node | Ast_ValueStmt_Node_423;
      }
type Ast_ImplicitCallStmt_InStmt_Node_449 = Ast_ImplicitCallStmt_InStmt_Node_449_;
interface Ast_ImplicitCallStmt_InStmt_Node_450_ extends BaseSymbolNode {
        symbol:"implicitCallStmt_InStmt";
        
        children:[Ast_ICS_S_VariableOrProcedureCall_Node];
        parent:Ast_AttributeStmt_Node | Ast_RedimSubStmt_Node_334 | Ast_RedimSubStmt_Node_335 | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ECS_MemberProcedureCall_group_def_39_Parent_Node_353 | Ast_WithStmt_group_def_57_Parent_Node | Ast_ValueStmt_Node_423;
      }
type Ast_ImplicitCallStmt_InStmt_Node_450 = Ast_ImplicitCallStmt_InStmt_Node_450_;
interface Ast_ImplicitCallStmt_InStmt_Node_451_ extends BaseSymbolNode {
        symbol:"implicitCallStmt_InStmt";
        
        children:[Ast_ICS_S_ProcedureOrArrayCall_Node];
        parent:Ast_AttributeStmt_Node | Ast_RedimSubStmt_Node_334 | Ast_RedimSubStmt_Node_335 | Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349 | Ast_SetStmt_Node | Ast_ECS_MemberProcedureCall_group_def_39_Parent_Node_353 | Ast_WithStmt_group_def_57_Parent_Node | Ast_ValueStmt_Node_423;
      }
type Ast_ImplicitCallStmt_InStmt_Node_451 = Ast_ImplicitCallStmt_InStmt_Node_451_;
type Ast_ICS_S_MembersCall_group_def_75_Node  = [Ast_ICS_S_VariableOrProcedureCall_Node];
type Ast_ICS_S_MembersCall_group_74_Node_453  = [...Ast_ICS_S_MembersCall_group_def_75_Node];
type Ast_ICS_S_MembersCall_group_def_76_Node  = [Ast_ICS_S_ProcedureOrArrayCall_Node];
type Ast_ICS_S_MembersCall_group_74_Node_455  = [...Ast_ICS_S_MembersCall_group_def_76_Node];
type Ast_ICS_S_MembersCall_group_def_77_Node_456  = [...Ast_ICS_S_MembersCall_group_74_Node,Ast_ICS_S_MemberCall_Node];
type Ast_ICS_S_MembersCall_group_def_77_Node_457  = [Ast_ICS_S_MemberCall_Node];
type Ast_ICS_S_MembersCall_group_73_Node_458  = [...Ast_ICS_S_MembersCall_group_def_77_Node];
type Ast_ICS_S_MembersCall_group_def_78_Node  = [Ast_ICS_S_SpaceMemberCall_Node];
type Ast_ICS_S_MembersCall_group_73_Node_460  = [...Ast_ICS_S_MembersCall_group_def_78_Node];
interface Ast_ICS_S_MembersCall_Node_ extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[...Ast_ICS_S_MembersCall_group_73_Node,...ZeroOrMore<Ast_ICS_S_MemberCall_Node>,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ImplicitCallStmt_InStmt_Node_449;
      }
type Ast_ICS_S_MembersCall_Node = Ast_ICS_S_MembersCall_Node_;
type Ast_ICS_S_MemberCall_group_def_81_Node  = [Ast_MCS_S_VariableOrProcedureCall_Node];
type Ast_ICS_S_MemberCall_group_80_Node_463  = [...Ast_ICS_S_MemberCall_group_def_81_Node];
type Ast_ICS_S_MemberCall_group_def_82_Node  = [Ast_MCS_S_ProcedureOrArrayCall_Node];
type Ast_ICS_S_MemberCall_group_80_Node_465  = [...Ast_ICS_S_MemberCall_group_def_82_Node];
interface Ast_ICS_S_MemberCall_Node_ extends BaseSymbolNode {
        symbol:"iCS_S_MemberCall";
        
        children:[Ast_TOKEN_1_Node,...Ast_ICS_S_MemberCall_group_80_Node];
        parent:Ast_ICS_S_MembersCall_group_def_77_Parent_Node_456 | Ast_ICS_S_MembersCall_group_def_77_Parent_Node_457 | Ast_ICS_S_MembersCall_Node;
      }
type Ast_ICS_S_MemberCall_Node = Ast_ICS_S_MemberCall_Node_;
type Ast_ICS_S_SpaceMemberCall_group_83_Node_467  = [...Ast_ICS_S_MemberCall_group_def_81_Node];
type Ast_ICS_S_SpaceMemberCall_group_83_Node_468  = [...Ast_ICS_S_MemberCall_group_def_82_Node];
interface Ast_ICS_S_SpaceMemberCall_Node_ extends BaseSymbolNode {
        symbol:"iCS_S_SpaceMemberCall";
        
        children:[Ast_SPACE_DOT_Node,...Ast_ICS_S_SpaceMemberCall_group_83_Node];
        parent:Ast_ICS_S_MembersCall_group_def_78_Parent_Node;
      }
type Ast_ICS_S_SpaceMemberCall_Node = Ast_ICS_S_SpaceMemberCall_Node_;
interface Ast_MCS_S_ProcedureOrArrayCall_Node_470_ extends BaseSymbolNode {
        symbol:"mCS_S_ProcedureOrArrayCall";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_LPAREN_Node,Ast_ArgsCall_Node,Ast_RPAREN_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ICS_S_MemberCall_group_def_82_Parent_Node;
      }
type Ast_MCS_S_ProcedureOrArrayCall_Node_470 = Ast_MCS_S_ProcedureOrArrayCall_Node_470_;
interface Ast_MCS_S_ProcedureOrArrayCall_Node_471_ extends BaseSymbolNode {
        symbol:"mCS_S_ProcedureOrArrayCall";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ICS_S_MemberCall_group_def_82_Parent_Node;
      }
type Ast_MCS_S_ProcedureOrArrayCall_Node_471 = Ast_MCS_S_ProcedureOrArrayCall_Node_471_;
interface Ast_MCS_S_ProcedureOrArrayCall_Node_472_ extends BaseSymbolNode {
        symbol:"mCS_S_ProcedureOrArrayCall";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_LPAREN_Node,Ast_ArgsCall_Node,Ast_RPAREN_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ICS_S_MemberCall_group_def_82_Parent_Node;
      }
type Ast_MCS_S_ProcedureOrArrayCall_Node_472 = Ast_MCS_S_ProcedureOrArrayCall_Node_472_;
interface Ast_MCS_S_ProcedureOrArrayCall_Node_473_ extends BaseSymbolNode {
        symbol:"mCS_S_ProcedureOrArrayCall";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ICS_S_MemberCall_group_def_82_Parent_Node;
      }
type Ast_MCS_S_ProcedureOrArrayCall_Node_473 = Ast_MCS_S_ProcedureOrArrayCall_Node_473_;
interface Ast_ICS_S_ProcedureOrArrayCall_Node_474_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_LPAREN_Node,Ast_ArgsCall_Node,Ast_RPAREN_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ImplicitCallStmt_InStmt_Node_451 | Ast_ICS_S_MembersCall_group_def_76_Parent_Node;
      }
type Ast_ICS_S_ProcedureOrArrayCall_Node_474 = Ast_ICS_S_ProcedureOrArrayCall_Node_474_;
interface Ast_ICS_S_ProcedureOrArrayCall_Node_475_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ImplicitCallStmt_InStmt_Node_451 | Ast_ICS_S_MembersCall_group_def_76_Parent_Node;
      }
type Ast_ICS_S_ProcedureOrArrayCall_Node_475 = Ast_ICS_S_ProcedureOrArrayCall_Node_475_;
interface Ast_ICS_S_ProcedureOrArrayCall_Node_476_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[Ast_CertainIdentifier_Node,Ast_LPAREN_Node,Ast_ArgsCall_Node,Ast_RPAREN_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ImplicitCallStmt_InStmt_Node_451 | Ast_ICS_S_MembersCall_group_def_76_Parent_Node;
      }
type Ast_ICS_S_ProcedureOrArrayCall_Node_476 = Ast_ICS_S_ProcedureOrArrayCall_Node_476_;
interface Ast_ICS_S_ProcedureOrArrayCall_Node_477_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[Ast_CertainIdentifier_Node,Ast_LPAREN_Node,Ast_RPAREN_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ImplicitCallStmt_InStmt_Node_451 | Ast_ICS_S_MembersCall_group_def_76_Parent_Node;
      }
type Ast_ICS_S_ProcedureOrArrayCall_Node_477 = Ast_ICS_S_ProcedureOrArrayCall_Node_477_;
interface Ast_ICS_S_VariableOrProcedureCall_Node_478_ extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ImplicitCallStmt_InStmt_Node_450 | Ast_ICS_S_MembersCall_group_def_75_Parent_Node;
      }
type Ast_ICS_S_VariableOrProcedureCall_Node_478 = Ast_ICS_S_VariableOrProcedureCall_Node_478_;
interface Ast_ICS_S_VariableOrProcedureCall_Node_479_ extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[Ast_CertainIdentifier_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ImplicitCallStmt_InStmt_Node_450 | Ast_ICS_S_MembersCall_group_def_75_Parent_Node;
      }
type Ast_ICS_S_VariableOrProcedureCall_Node_479 = Ast_ICS_S_VariableOrProcedureCall_Node_479_;
interface Ast_MCS_S_VariableOrProcedureCall_Node_480_ extends BaseSymbolNode {
        symbol:"mCS_S_VariableOrProcedureCall";
        
        children:[Ast_AmbiguousIdentifier_Node,Ast_TypeHint_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ICS_S_MemberCall_group_def_81_Parent_Node;
      }
type Ast_MCS_S_VariableOrProcedureCall_Node_480 = Ast_MCS_S_VariableOrProcedureCall_Node_480_;
interface Ast_MCS_S_VariableOrProcedureCall_Node_481_ extends BaseSymbolNode {
        symbol:"mCS_S_VariableOrProcedureCall";
        
        children:[Ast_AmbiguousIdentifier_Node,...ZeroOrMore<Ast_ECS_MemberProcedureCall_group_def_44_Node>];
        parent:Ast_ICS_S_MemberCall_group_def_81_Parent_Node;
      }
type Ast_MCS_S_VariableOrProcedureCall_Node_481 = Ast_MCS_S_VariableOrProcedureCall_Node_481_;
interface Ast_DOUBLELITERAL_Node_ extends BaseTokenNode {
            token:"DOUBLELITERAL";
            parent:Ast_Literal_Node_482;
          }
export type Ast_DOUBLELITERAL_Node = Ast_DOUBLELITERAL_Node_;
interface Ast_Literal_Node_482_ extends BaseSymbolNode {
        symbol:"literal";
        
        children:[Ast_DOUBLELITERAL_Node];
        parent:Ast_AttributeStmt_group_def_7_Parent_Node | Ast_AttributeStmt_Node | Ast_ValueStmt_Node_422;
      }
type Ast_Literal_Node_482 = Ast_Literal_Node_482_;
interface Ast_Literal_Node_483_ extends BaseSymbolNode {
        symbol:"literal";
        
        children:[Ast_INTEGERLITERAL_Node];
        parent:Ast_AttributeStmt_group_def_7_Parent_Node | Ast_AttributeStmt_Node | Ast_ValueStmt_Node_422;
      }
type Ast_Literal_Node_483 = Ast_Literal_Node_483_;
interface Ast_STRINGLITERAL_Node_ extends BaseTokenNode {
            token:"STRINGLITERAL";
            parent:Ast_Literal_Node_484;
          }
export type Ast_STRINGLITERAL_Node = Ast_STRINGLITERAL_Node_;
interface Ast_Literal_Node_484_ extends BaseSymbolNode {
        symbol:"literal";
        
        children:[Ast_STRINGLITERAL_Node];
        parent:Ast_AttributeStmt_group_def_7_Parent_Node | Ast_AttributeStmt_Node | Ast_ValueStmt_Node_422;
      }
type Ast_Literal_Node_484 = Ast_Literal_Node_484_;
interface Ast_NOTHING_Node_ extends BaseTokenNode {
            token:"NOTHING";
            parent:Ast_Literal_Node_485 | Ast_AmbiguousIdentifier_Node_711;
          }
export type Ast_NOTHING_Node = Ast_NOTHING_Node_;
interface Ast_Literal_Node_485_ extends BaseSymbolNode {
        symbol:"literal";
        
        children:[Ast_NOTHING_Node];
        parent:Ast_AttributeStmt_group_def_7_Parent_Node | Ast_AttributeStmt_Node | Ast_ValueStmt_Node_422;
      }
type Ast_Literal_Node_485 = Ast_Literal_Node_485_;
interface Ast_NULL_Node_ extends BaseTokenNode {
            token:"NULL";
            parent:Ast_Literal_Node_486 | Ast_AmbiguousIdentifier_Node_712;
          }
export type Ast_NULL_Node = Ast_NULL_Node_;
interface Ast_Literal_Node_486_ extends BaseSymbolNode {
        symbol:"literal";
        
        children:[Ast_NULL_Node];
        parent:Ast_AttributeStmt_group_def_7_Parent_Node | Ast_AttributeStmt_Node | Ast_ValueStmt_Node_422;
      }
type Ast_Literal_Node_486 = Ast_Literal_Node_486_;
interface Ast_TRUE_Node_ extends BaseTokenNode {
            token:"TRUE";
            parent:Ast_Literal_Node_487 | Ast_AmbiguousIdentifier_Node_736;
          }
export type Ast_TRUE_Node = Ast_TRUE_Node_;
interface Ast_Literal_Node_487_ extends BaseSymbolNode {
        symbol:"literal";
        
        children:[Ast_TRUE_Node];
        parent:Ast_AttributeStmt_group_def_7_Parent_Node | Ast_AttributeStmt_Node | Ast_ValueStmt_Node_422;
      }
type Ast_Literal_Node_487 = Ast_Literal_Node_487_;
interface Ast_FALSE_Node_ extends BaseTokenNode {
            token:"FALSE";
            parent:Ast_Literal_Node_488 | Ast_AmbiguousIdentifier_Node_686;
          }
export type Ast_FALSE_Node = Ast_FALSE_Node_;
interface Ast_Literal_Node_488_ extends BaseSymbolNode {
        symbol:"literal";
        
        children:[Ast_FALSE_Node];
        parent:Ast_AttributeStmt_group_def_7_Parent_Node | Ast_AttributeStmt_Node | Ast_ValueStmt_Node_422;
      }
type Ast_Literal_Node_488 = Ast_Literal_Node_488_;
interface Ast_DATELITERAL_Node_ extends BaseTokenNode {
            token:"DATELITERAL";
            parent:Ast_Literal_Node_489;
          }
export type Ast_DATELITERAL_Node = Ast_DATELITERAL_Node_;
interface Ast_Literal_Node_489_ extends BaseSymbolNode {
        symbol:"literal";
        
        children:[Ast_DATELITERAL_Node];
        parent:Ast_AttributeStmt_group_def_7_Parent_Node | Ast_AttributeStmt_Node | Ast_ValueStmt_Node_422;
      }
type Ast_Literal_Node_489 = Ast_Literal_Node_489_;
interface Ast_TOKEN_2_Node_ extends BaseTokenNode {
            token:"&";
            parent:Ast_TypeHint_Node_490;
          }
export type Ast_TOKEN_2_Node = Ast_TOKEN_2_Node_;
interface Ast_TypeHint_Node_490_ extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[Ast_TOKEN_2_Node];
        parent:Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_PropertyGetStmt_Node_78 | Ast_PropertyGetStmt_Node_79 | Ast_PropertyGetStmt_Node_88 | Ast_PropertyGetStmt_Node_89 | Ast_PropertyGetStmt_Node_90 | Ast_PropertyGetStmt_Node_91 | Ast_PropertyGetStmt_Node_92 | Ast_PropertyGetStmt_Node_93 | Ast_PropertyGetStmt_Node_94 | Ast_PropertyGetStmt_Node_95 | Ast_PropertyGetStmt_Node_104 | Ast_PropertyGetStmt_Node_105 | Ast_PropertyGetStmt_Node_106 | Ast_PropertyGetStmt_Node_107 | Ast_PropertyGetStmt_Node_108 | Ast_PropertyGetStmt_Node_109 | Ast_PropertyGetStmt_Node_110 | Ast_PropertyGetStmt_Node_111 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_158 | Ast_FunctionStmt_Node_159 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_171 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_FunctionStmt_Node_174 | Ast_FunctionStmt_Node_175 | Ast_FunctionStmt_Node_184 | Ast_FunctionStmt_Node_185 | Ast_FunctionStmt_Node_186 | Ast_FunctionStmt_Node_187 | Ast_FunctionStmt_Node_188 | Ast_FunctionStmt_Node_189 | Ast_FunctionStmt_Node_190 | Ast_FunctionStmt_Node_191 | Ast_FunctionStmt_Node_200 | Ast_FunctionStmt_Node_201 | Ast_FunctionStmt_Node_202 | Ast_FunctionStmt_Node_203 | Ast_FunctionStmt_Node_204 | Ast_FunctionStmt_Node_205 | Ast_FunctionStmt_Node_206 | Ast_FunctionStmt_Node_207 | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_ProcedureCall_Node_364 | Ast_ECS_ProcedureCall_Node_365 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_VariableSubStmt_Node_402 | Ast_VariableSubStmt_Node_403 | Ast_VariableSubStmt_Node_406 | Ast_VariableSubStmt_Node_407 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_ICS_S_ProcedureOrArrayCall_Node_474 | Ast_ICS_S_ProcedureOrArrayCall_Node_475 | Ast_ICS_S_VariableOrProcedureCall_Node_478 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_Arg_Node_501 | Ast_Arg_Node_502 | Ast_Arg_Node_503 | Ast_Arg_Node_504 | Ast_Arg_Node_505 | Ast_Arg_Node_506 | Ast_Arg_Node_507 | Ast_Arg_Node_508 | Ast_Arg_Node_517 | Ast_Arg_Node_518 | Ast_Arg_Node_519 | Ast_Arg_Node_520 | Ast_Arg_Node_521 | Ast_Arg_Node_522 | Ast_Arg_Node_523 | Ast_Arg_Node_524 | Ast_Arg_Node_533 | Ast_Arg_Node_534 | Ast_Arg_Node_535 | Ast_Arg_Node_536 | Ast_Arg_Node_537 | Ast_Arg_Node_538 | Ast_Arg_Node_539 | Ast_Arg_Node_540 | Ast_Arg_Node_549 | Ast_Arg_Node_550 | Ast_Arg_Node_551 | Ast_Arg_Node_552 | Ast_Arg_Node_553 | Ast_Arg_Node_554 | Ast_Arg_Node_555 | Ast_Arg_Node_556 | Ast_Arg_Node_565 | Ast_Arg_Node_566 | Ast_Arg_Node_567 | Ast_Arg_Node_568 | Ast_Arg_Node_569 | Ast_Arg_Node_570 | Ast_Arg_Node_571 | Ast_Arg_Node_572 | Ast_Arg_Node_581 | Ast_Arg_Node_582 | Ast_Arg_Node_583 | Ast_Arg_Node_584 | Ast_Arg_Node_585 | Ast_Arg_Node_586 | Ast_Arg_Node_587 | Ast_Arg_Node_588 | Ast_Arg_Node_597 | Ast_Arg_Node_598 | Ast_Arg_Node_599 | Ast_Arg_Node_600 | Ast_Arg_Node_601 | Ast_Arg_Node_602 | Ast_Arg_Node_603 | Ast_Arg_Node_604 | Ast_Arg_Node_613 | Ast_Arg_Node_614 | Ast_Arg_Node_615 | Ast_Arg_Node_616 | Ast_Arg_Node_617 | Ast_Arg_Node_618 | Ast_Arg_Node_619 | Ast_Arg_Node_620;
      }
type Ast_TypeHint_Node_490 = Ast_TypeHint_Node_490_;
interface Ast_TOKEN_3_Node_ extends BaseTokenNode {
            token:"%";
            parent:Ast_TypeHint_Node_491;
          }
export type Ast_TOKEN_3_Node = Ast_TOKEN_3_Node_;
interface Ast_TypeHint_Node_491_ extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[Ast_TOKEN_3_Node];
        parent:Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_PropertyGetStmt_Node_78 | Ast_PropertyGetStmt_Node_79 | Ast_PropertyGetStmt_Node_88 | Ast_PropertyGetStmt_Node_89 | Ast_PropertyGetStmt_Node_90 | Ast_PropertyGetStmt_Node_91 | Ast_PropertyGetStmt_Node_92 | Ast_PropertyGetStmt_Node_93 | Ast_PropertyGetStmt_Node_94 | Ast_PropertyGetStmt_Node_95 | Ast_PropertyGetStmt_Node_104 | Ast_PropertyGetStmt_Node_105 | Ast_PropertyGetStmt_Node_106 | Ast_PropertyGetStmt_Node_107 | Ast_PropertyGetStmt_Node_108 | Ast_PropertyGetStmt_Node_109 | Ast_PropertyGetStmt_Node_110 | Ast_PropertyGetStmt_Node_111 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_158 | Ast_FunctionStmt_Node_159 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_171 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_FunctionStmt_Node_174 | Ast_FunctionStmt_Node_175 | Ast_FunctionStmt_Node_184 | Ast_FunctionStmt_Node_185 | Ast_FunctionStmt_Node_186 | Ast_FunctionStmt_Node_187 | Ast_FunctionStmt_Node_188 | Ast_FunctionStmt_Node_189 | Ast_FunctionStmt_Node_190 | Ast_FunctionStmt_Node_191 | Ast_FunctionStmt_Node_200 | Ast_FunctionStmt_Node_201 | Ast_FunctionStmt_Node_202 | Ast_FunctionStmt_Node_203 | Ast_FunctionStmt_Node_204 | Ast_FunctionStmt_Node_205 | Ast_FunctionStmt_Node_206 | Ast_FunctionStmt_Node_207 | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_ProcedureCall_Node_364 | Ast_ECS_ProcedureCall_Node_365 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_VariableSubStmt_Node_402 | Ast_VariableSubStmt_Node_403 | Ast_VariableSubStmt_Node_406 | Ast_VariableSubStmt_Node_407 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_ICS_S_ProcedureOrArrayCall_Node_474 | Ast_ICS_S_ProcedureOrArrayCall_Node_475 | Ast_ICS_S_VariableOrProcedureCall_Node_478 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_Arg_Node_501 | Ast_Arg_Node_502 | Ast_Arg_Node_503 | Ast_Arg_Node_504 | Ast_Arg_Node_505 | Ast_Arg_Node_506 | Ast_Arg_Node_507 | Ast_Arg_Node_508 | Ast_Arg_Node_517 | Ast_Arg_Node_518 | Ast_Arg_Node_519 | Ast_Arg_Node_520 | Ast_Arg_Node_521 | Ast_Arg_Node_522 | Ast_Arg_Node_523 | Ast_Arg_Node_524 | Ast_Arg_Node_533 | Ast_Arg_Node_534 | Ast_Arg_Node_535 | Ast_Arg_Node_536 | Ast_Arg_Node_537 | Ast_Arg_Node_538 | Ast_Arg_Node_539 | Ast_Arg_Node_540 | Ast_Arg_Node_549 | Ast_Arg_Node_550 | Ast_Arg_Node_551 | Ast_Arg_Node_552 | Ast_Arg_Node_553 | Ast_Arg_Node_554 | Ast_Arg_Node_555 | Ast_Arg_Node_556 | Ast_Arg_Node_565 | Ast_Arg_Node_566 | Ast_Arg_Node_567 | Ast_Arg_Node_568 | Ast_Arg_Node_569 | Ast_Arg_Node_570 | Ast_Arg_Node_571 | Ast_Arg_Node_572 | Ast_Arg_Node_581 | Ast_Arg_Node_582 | Ast_Arg_Node_583 | Ast_Arg_Node_584 | Ast_Arg_Node_585 | Ast_Arg_Node_586 | Ast_Arg_Node_587 | Ast_Arg_Node_588 | Ast_Arg_Node_597 | Ast_Arg_Node_598 | Ast_Arg_Node_599 | Ast_Arg_Node_600 | Ast_Arg_Node_601 | Ast_Arg_Node_602 | Ast_Arg_Node_603 | Ast_Arg_Node_604 | Ast_Arg_Node_613 | Ast_Arg_Node_614 | Ast_Arg_Node_615 | Ast_Arg_Node_616 | Ast_Arg_Node_617 | Ast_Arg_Node_618 | Ast_Arg_Node_619 | Ast_Arg_Node_620;
      }
type Ast_TypeHint_Node_491 = Ast_TypeHint_Node_491_;
interface Ast_TOKEN_4_Node_ extends BaseTokenNode {
            token:"#";
            parent:Ast_TypeHint_Node_492;
          }
export type Ast_TOKEN_4_Node = Ast_TOKEN_4_Node_;
interface Ast_TypeHint_Node_492_ extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[Ast_TOKEN_4_Node];
        parent:Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_PropertyGetStmt_Node_78 | Ast_PropertyGetStmt_Node_79 | Ast_PropertyGetStmt_Node_88 | Ast_PropertyGetStmt_Node_89 | Ast_PropertyGetStmt_Node_90 | Ast_PropertyGetStmt_Node_91 | Ast_PropertyGetStmt_Node_92 | Ast_PropertyGetStmt_Node_93 | Ast_PropertyGetStmt_Node_94 | Ast_PropertyGetStmt_Node_95 | Ast_PropertyGetStmt_Node_104 | Ast_PropertyGetStmt_Node_105 | Ast_PropertyGetStmt_Node_106 | Ast_PropertyGetStmt_Node_107 | Ast_PropertyGetStmt_Node_108 | Ast_PropertyGetStmt_Node_109 | Ast_PropertyGetStmt_Node_110 | Ast_PropertyGetStmt_Node_111 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_158 | Ast_FunctionStmt_Node_159 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_171 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_FunctionStmt_Node_174 | Ast_FunctionStmt_Node_175 | Ast_FunctionStmt_Node_184 | Ast_FunctionStmt_Node_185 | Ast_FunctionStmt_Node_186 | Ast_FunctionStmt_Node_187 | Ast_FunctionStmt_Node_188 | Ast_FunctionStmt_Node_189 | Ast_FunctionStmt_Node_190 | Ast_FunctionStmt_Node_191 | Ast_FunctionStmt_Node_200 | Ast_FunctionStmt_Node_201 | Ast_FunctionStmt_Node_202 | Ast_FunctionStmt_Node_203 | Ast_FunctionStmt_Node_204 | Ast_FunctionStmt_Node_205 | Ast_FunctionStmt_Node_206 | Ast_FunctionStmt_Node_207 | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_ProcedureCall_Node_364 | Ast_ECS_ProcedureCall_Node_365 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_VariableSubStmt_Node_402 | Ast_VariableSubStmt_Node_403 | Ast_VariableSubStmt_Node_406 | Ast_VariableSubStmt_Node_407 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_ICS_S_ProcedureOrArrayCall_Node_474 | Ast_ICS_S_ProcedureOrArrayCall_Node_475 | Ast_ICS_S_VariableOrProcedureCall_Node_478 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_Arg_Node_501 | Ast_Arg_Node_502 | Ast_Arg_Node_503 | Ast_Arg_Node_504 | Ast_Arg_Node_505 | Ast_Arg_Node_506 | Ast_Arg_Node_507 | Ast_Arg_Node_508 | Ast_Arg_Node_517 | Ast_Arg_Node_518 | Ast_Arg_Node_519 | Ast_Arg_Node_520 | Ast_Arg_Node_521 | Ast_Arg_Node_522 | Ast_Arg_Node_523 | Ast_Arg_Node_524 | Ast_Arg_Node_533 | Ast_Arg_Node_534 | Ast_Arg_Node_535 | Ast_Arg_Node_536 | Ast_Arg_Node_537 | Ast_Arg_Node_538 | Ast_Arg_Node_539 | Ast_Arg_Node_540 | Ast_Arg_Node_549 | Ast_Arg_Node_550 | Ast_Arg_Node_551 | Ast_Arg_Node_552 | Ast_Arg_Node_553 | Ast_Arg_Node_554 | Ast_Arg_Node_555 | Ast_Arg_Node_556 | Ast_Arg_Node_565 | Ast_Arg_Node_566 | Ast_Arg_Node_567 | Ast_Arg_Node_568 | Ast_Arg_Node_569 | Ast_Arg_Node_570 | Ast_Arg_Node_571 | Ast_Arg_Node_572 | Ast_Arg_Node_581 | Ast_Arg_Node_582 | Ast_Arg_Node_583 | Ast_Arg_Node_584 | Ast_Arg_Node_585 | Ast_Arg_Node_586 | Ast_Arg_Node_587 | Ast_Arg_Node_588 | Ast_Arg_Node_597 | Ast_Arg_Node_598 | Ast_Arg_Node_599 | Ast_Arg_Node_600 | Ast_Arg_Node_601 | Ast_Arg_Node_602 | Ast_Arg_Node_603 | Ast_Arg_Node_604 | Ast_Arg_Node_613 | Ast_Arg_Node_614 | Ast_Arg_Node_615 | Ast_Arg_Node_616 | Ast_Arg_Node_617 | Ast_Arg_Node_618 | Ast_Arg_Node_619 | Ast_Arg_Node_620;
      }
type Ast_TypeHint_Node_492 = Ast_TypeHint_Node_492_;
interface Ast_TOKEN_5_Node_ extends BaseTokenNode {
            token:"!";
            parent:Ast_TypeHint_Node_493;
          }
export type Ast_TOKEN_5_Node = Ast_TOKEN_5_Node_;
interface Ast_TypeHint_Node_493_ extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[Ast_TOKEN_5_Node];
        parent:Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_PropertyGetStmt_Node_78 | Ast_PropertyGetStmt_Node_79 | Ast_PropertyGetStmt_Node_88 | Ast_PropertyGetStmt_Node_89 | Ast_PropertyGetStmt_Node_90 | Ast_PropertyGetStmt_Node_91 | Ast_PropertyGetStmt_Node_92 | Ast_PropertyGetStmt_Node_93 | Ast_PropertyGetStmt_Node_94 | Ast_PropertyGetStmt_Node_95 | Ast_PropertyGetStmt_Node_104 | Ast_PropertyGetStmt_Node_105 | Ast_PropertyGetStmt_Node_106 | Ast_PropertyGetStmt_Node_107 | Ast_PropertyGetStmt_Node_108 | Ast_PropertyGetStmt_Node_109 | Ast_PropertyGetStmt_Node_110 | Ast_PropertyGetStmt_Node_111 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_158 | Ast_FunctionStmt_Node_159 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_171 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_FunctionStmt_Node_174 | Ast_FunctionStmt_Node_175 | Ast_FunctionStmt_Node_184 | Ast_FunctionStmt_Node_185 | Ast_FunctionStmt_Node_186 | Ast_FunctionStmt_Node_187 | Ast_FunctionStmt_Node_188 | Ast_FunctionStmt_Node_189 | Ast_FunctionStmt_Node_190 | Ast_FunctionStmt_Node_191 | Ast_FunctionStmt_Node_200 | Ast_FunctionStmt_Node_201 | Ast_FunctionStmt_Node_202 | Ast_FunctionStmt_Node_203 | Ast_FunctionStmt_Node_204 | Ast_FunctionStmt_Node_205 | Ast_FunctionStmt_Node_206 | Ast_FunctionStmt_Node_207 | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_ProcedureCall_Node_364 | Ast_ECS_ProcedureCall_Node_365 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_VariableSubStmt_Node_402 | Ast_VariableSubStmt_Node_403 | Ast_VariableSubStmt_Node_406 | Ast_VariableSubStmt_Node_407 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_ICS_S_ProcedureOrArrayCall_Node_474 | Ast_ICS_S_ProcedureOrArrayCall_Node_475 | Ast_ICS_S_VariableOrProcedureCall_Node_478 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_Arg_Node_501 | Ast_Arg_Node_502 | Ast_Arg_Node_503 | Ast_Arg_Node_504 | Ast_Arg_Node_505 | Ast_Arg_Node_506 | Ast_Arg_Node_507 | Ast_Arg_Node_508 | Ast_Arg_Node_517 | Ast_Arg_Node_518 | Ast_Arg_Node_519 | Ast_Arg_Node_520 | Ast_Arg_Node_521 | Ast_Arg_Node_522 | Ast_Arg_Node_523 | Ast_Arg_Node_524 | Ast_Arg_Node_533 | Ast_Arg_Node_534 | Ast_Arg_Node_535 | Ast_Arg_Node_536 | Ast_Arg_Node_537 | Ast_Arg_Node_538 | Ast_Arg_Node_539 | Ast_Arg_Node_540 | Ast_Arg_Node_549 | Ast_Arg_Node_550 | Ast_Arg_Node_551 | Ast_Arg_Node_552 | Ast_Arg_Node_553 | Ast_Arg_Node_554 | Ast_Arg_Node_555 | Ast_Arg_Node_556 | Ast_Arg_Node_565 | Ast_Arg_Node_566 | Ast_Arg_Node_567 | Ast_Arg_Node_568 | Ast_Arg_Node_569 | Ast_Arg_Node_570 | Ast_Arg_Node_571 | Ast_Arg_Node_572 | Ast_Arg_Node_581 | Ast_Arg_Node_582 | Ast_Arg_Node_583 | Ast_Arg_Node_584 | Ast_Arg_Node_585 | Ast_Arg_Node_586 | Ast_Arg_Node_587 | Ast_Arg_Node_588 | Ast_Arg_Node_597 | Ast_Arg_Node_598 | Ast_Arg_Node_599 | Ast_Arg_Node_600 | Ast_Arg_Node_601 | Ast_Arg_Node_602 | Ast_Arg_Node_603 | Ast_Arg_Node_604 | Ast_Arg_Node_613 | Ast_Arg_Node_614 | Ast_Arg_Node_615 | Ast_Arg_Node_616 | Ast_Arg_Node_617 | Ast_Arg_Node_618 | Ast_Arg_Node_619 | Ast_Arg_Node_620;
      }
type Ast_TypeHint_Node_493 = Ast_TypeHint_Node_493_;
interface Ast_TOKEN_6_Node_ extends BaseTokenNode {
            token:"@";
            parent:Ast_TypeHint_Node_494;
          }
export type Ast_TOKEN_6_Node = Ast_TOKEN_6_Node_;
interface Ast_TypeHint_Node_494_ extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[Ast_TOKEN_6_Node];
        parent:Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_PropertyGetStmt_Node_78 | Ast_PropertyGetStmt_Node_79 | Ast_PropertyGetStmt_Node_88 | Ast_PropertyGetStmt_Node_89 | Ast_PropertyGetStmt_Node_90 | Ast_PropertyGetStmt_Node_91 | Ast_PropertyGetStmt_Node_92 | Ast_PropertyGetStmt_Node_93 | Ast_PropertyGetStmt_Node_94 | Ast_PropertyGetStmt_Node_95 | Ast_PropertyGetStmt_Node_104 | Ast_PropertyGetStmt_Node_105 | Ast_PropertyGetStmt_Node_106 | Ast_PropertyGetStmt_Node_107 | Ast_PropertyGetStmt_Node_108 | Ast_PropertyGetStmt_Node_109 | Ast_PropertyGetStmt_Node_110 | Ast_PropertyGetStmt_Node_111 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_158 | Ast_FunctionStmt_Node_159 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_171 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_FunctionStmt_Node_174 | Ast_FunctionStmt_Node_175 | Ast_FunctionStmt_Node_184 | Ast_FunctionStmt_Node_185 | Ast_FunctionStmt_Node_186 | Ast_FunctionStmt_Node_187 | Ast_FunctionStmt_Node_188 | Ast_FunctionStmt_Node_189 | Ast_FunctionStmt_Node_190 | Ast_FunctionStmt_Node_191 | Ast_FunctionStmt_Node_200 | Ast_FunctionStmt_Node_201 | Ast_FunctionStmt_Node_202 | Ast_FunctionStmt_Node_203 | Ast_FunctionStmt_Node_204 | Ast_FunctionStmt_Node_205 | Ast_FunctionStmt_Node_206 | Ast_FunctionStmt_Node_207 | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_ProcedureCall_Node_364 | Ast_ECS_ProcedureCall_Node_365 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_VariableSubStmt_Node_402 | Ast_VariableSubStmt_Node_403 | Ast_VariableSubStmt_Node_406 | Ast_VariableSubStmt_Node_407 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_ICS_S_ProcedureOrArrayCall_Node_474 | Ast_ICS_S_ProcedureOrArrayCall_Node_475 | Ast_ICS_S_VariableOrProcedureCall_Node_478 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_Arg_Node_501 | Ast_Arg_Node_502 | Ast_Arg_Node_503 | Ast_Arg_Node_504 | Ast_Arg_Node_505 | Ast_Arg_Node_506 | Ast_Arg_Node_507 | Ast_Arg_Node_508 | Ast_Arg_Node_517 | Ast_Arg_Node_518 | Ast_Arg_Node_519 | Ast_Arg_Node_520 | Ast_Arg_Node_521 | Ast_Arg_Node_522 | Ast_Arg_Node_523 | Ast_Arg_Node_524 | Ast_Arg_Node_533 | Ast_Arg_Node_534 | Ast_Arg_Node_535 | Ast_Arg_Node_536 | Ast_Arg_Node_537 | Ast_Arg_Node_538 | Ast_Arg_Node_539 | Ast_Arg_Node_540 | Ast_Arg_Node_549 | Ast_Arg_Node_550 | Ast_Arg_Node_551 | Ast_Arg_Node_552 | Ast_Arg_Node_553 | Ast_Arg_Node_554 | Ast_Arg_Node_555 | Ast_Arg_Node_556 | Ast_Arg_Node_565 | Ast_Arg_Node_566 | Ast_Arg_Node_567 | Ast_Arg_Node_568 | Ast_Arg_Node_569 | Ast_Arg_Node_570 | Ast_Arg_Node_571 | Ast_Arg_Node_572 | Ast_Arg_Node_581 | Ast_Arg_Node_582 | Ast_Arg_Node_583 | Ast_Arg_Node_584 | Ast_Arg_Node_585 | Ast_Arg_Node_586 | Ast_Arg_Node_587 | Ast_Arg_Node_588 | Ast_Arg_Node_597 | Ast_Arg_Node_598 | Ast_Arg_Node_599 | Ast_Arg_Node_600 | Ast_Arg_Node_601 | Ast_Arg_Node_602 | Ast_Arg_Node_603 | Ast_Arg_Node_604 | Ast_Arg_Node_613 | Ast_Arg_Node_614 | Ast_Arg_Node_615 | Ast_Arg_Node_616 | Ast_Arg_Node_617 | Ast_Arg_Node_618 | Ast_Arg_Node_619 | Ast_Arg_Node_620;
      }
type Ast_TypeHint_Node_494 = Ast_TypeHint_Node_494_;
interface Ast_$_Node_ extends BaseTokenNode {
            token:"$";
            parent:Ast_TypeHint_Node_495;
          }
export type Ast_$_Node = Ast_$_Node_;
interface Ast_TypeHint_Node_495_ extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[Ast_$_Node];
        parent:Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_PropertyGetStmt_Node_78 | Ast_PropertyGetStmt_Node_79 | Ast_PropertyGetStmt_Node_88 | Ast_PropertyGetStmt_Node_89 | Ast_PropertyGetStmt_Node_90 | Ast_PropertyGetStmt_Node_91 | Ast_PropertyGetStmt_Node_92 | Ast_PropertyGetStmt_Node_93 | Ast_PropertyGetStmt_Node_94 | Ast_PropertyGetStmt_Node_95 | Ast_PropertyGetStmt_Node_104 | Ast_PropertyGetStmt_Node_105 | Ast_PropertyGetStmt_Node_106 | Ast_PropertyGetStmt_Node_107 | Ast_PropertyGetStmt_Node_108 | Ast_PropertyGetStmt_Node_109 | Ast_PropertyGetStmt_Node_110 | Ast_PropertyGetStmt_Node_111 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_158 | Ast_FunctionStmt_Node_159 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_171 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_FunctionStmt_Node_174 | Ast_FunctionStmt_Node_175 | Ast_FunctionStmt_Node_184 | Ast_FunctionStmt_Node_185 | Ast_FunctionStmt_Node_186 | Ast_FunctionStmt_Node_187 | Ast_FunctionStmt_Node_188 | Ast_FunctionStmt_Node_189 | Ast_FunctionStmt_Node_190 | Ast_FunctionStmt_Node_191 | Ast_FunctionStmt_Node_200 | Ast_FunctionStmt_Node_201 | Ast_FunctionStmt_Node_202 | Ast_FunctionStmt_Node_203 | Ast_FunctionStmt_Node_204 | Ast_FunctionStmt_Node_205 | Ast_FunctionStmt_Node_206 | Ast_FunctionStmt_Node_207 | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_ProcedureCall_Node_364 | Ast_ECS_ProcedureCall_Node_365 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_VariableSubStmt_Node_402 | Ast_VariableSubStmt_Node_403 | Ast_VariableSubStmt_Node_406 | Ast_VariableSubStmt_Node_407 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_ICS_S_ProcedureOrArrayCall_Node_474 | Ast_ICS_S_ProcedureOrArrayCall_Node_475 | Ast_ICS_S_VariableOrProcedureCall_Node_478 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_Arg_Node_501 | Ast_Arg_Node_502 | Ast_Arg_Node_503 | Ast_Arg_Node_504 | Ast_Arg_Node_505 | Ast_Arg_Node_506 | Ast_Arg_Node_507 | Ast_Arg_Node_508 | Ast_Arg_Node_517 | Ast_Arg_Node_518 | Ast_Arg_Node_519 | Ast_Arg_Node_520 | Ast_Arg_Node_521 | Ast_Arg_Node_522 | Ast_Arg_Node_523 | Ast_Arg_Node_524 | Ast_Arg_Node_533 | Ast_Arg_Node_534 | Ast_Arg_Node_535 | Ast_Arg_Node_536 | Ast_Arg_Node_537 | Ast_Arg_Node_538 | Ast_Arg_Node_539 | Ast_Arg_Node_540 | Ast_Arg_Node_549 | Ast_Arg_Node_550 | Ast_Arg_Node_551 | Ast_Arg_Node_552 | Ast_Arg_Node_553 | Ast_Arg_Node_554 | Ast_Arg_Node_555 | Ast_Arg_Node_556 | Ast_Arg_Node_565 | Ast_Arg_Node_566 | Ast_Arg_Node_567 | Ast_Arg_Node_568 | Ast_Arg_Node_569 | Ast_Arg_Node_570 | Ast_Arg_Node_571 | Ast_Arg_Node_572 | Ast_Arg_Node_581 | Ast_Arg_Node_582 | Ast_Arg_Node_583 | Ast_Arg_Node_584 | Ast_Arg_Node_585 | Ast_Arg_Node_586 | Ast_Arg_Node_587 | Ast_Arg_Node_588 | Ast_Arg_Node_597 | Ast_Arg_Node_598 | Ast_Arg_Node_599 | Ast_Arg_Node_600 | Ast_Arg_Node_601 | Ast_Arg_Node_602 | Ast_Arg_Node_603 | Ast_Arg_Node_604 | Ast_Arg_Node_613 | Ast_Arg_Node_614 | Ast_Arg_Node_615 | Ast_Arg_Node_616 | Ast_Arg_Node_617 | Ast_Arg_Node_618 | Ast_Arg_Node_619 | Ast_Arg_Node_620;
      }
type Ast_TypeHint_Node_495 = Ast_TypeHint_Node_495_;
interface Ast_BYVAL_Node_ extends BaseTokenNode {
            token:"BYVAL";
            parent:Ast_Arg_group_def_89_Parent_Node | Ast_AmbiguousIdentifier_Node_655;
          }
export type Ast_BYVAL_Node = Ast_BYVAL_Node_;
type Ast_Arg_group_def_89_Node  = [Ast_BYVAL_Node];
type Ast_Arg_group_88_Node_497  = [...Ast_Arg_group_def_89_Node];
interface Ast_BYREF_Node_ extends BaseTokenNode {
            token:"BYREF";
            parent:Ast_Arg_group_def_90_Parent_Node | Ast_AmbiguousIdentifier_Node_656;
          }
export type Ast_BYREF_Node = Ast_BYREF_Node_;
type Ast_Arg_group_def_90_Node  = [Ast_BYREF_Node];
type Ast_Arg_group_88_Node_499  = [...Ast_Arg_group_def_90_Node];
type Ast_Arg_group_def_92_Node  = [Ast_LPAREN_Node,Ast_RPAREN_Node];
interface Ast_OPTIONAL_Node_ extends BaseTokenNode {
            token:"OPTIONAL";
            parent:Ast_Arg_Node_501 | Ast_Arg_Node_502 | Ast_Arg_Node_503 | Ast_Arg_Node_504 | Ast_Arg_Node_505 | Ast_Arg_Node_506 | Ast_Arg_Node_507 | Ast_Arg_Node_508 | Ast_Arg_Node_509 | Ast_Arg_Node_510 | Ast_Arg_Node_511 | Ast_Arg_Node_512 | Ast_Arg_Node_513 | Ast_Arg_Node_514 | Ast_Arg_Node_515 | Ast_Arg_Node_516 | Ast_Arg_Node_517 | Ast_Arg_Node_518 | Ast_Arg_Node_519 | Ast_Arg_Node_520 | Ast_Arg_Node_521 | Ast_Arg_Node_522 | Ast_Arg_Node_523 | Ast_Arg_Node_524 | Ast_Arg_Node_525 | Ast_Arg_Node_526 | Ast_Arg_Node_527 | Ast_Arg_Node_528 | Ast_Arg_Node_529 | Ast_Arg_Node_530 | Ast_Arg_Node_531 | Ast_Arg_Node_532 | Ast_Arg_Node_533 | Ast_Arg_Node_534 | Ast_Arg_Node_535 | Ast_Arg_Node_536 | Ast_Arg_Node_537 | Ast_Arg_Node_538 | Ast_Arg_Node_539 | Ast_Arg_Node_540 | Ast_Arg_Node_541 | Ast_Arg_Node_542 | Ast_Arg_Node_543 | Ast_Arg_Node_544 | Ast_Arg_Node_545 | Ast_Arg_Node_546 | Ast_Arg_Node_547 | Ast_Arg_Node_548 | Ast_Arg_Node_549 | Ast_Arg_Node_550 | Ast_Arg_Node_551 | Ast_Arg_Node_552 | Ast_Arg_Node_553 | Ast_Arg_Node_554 | Ast_Arg_Node_555 | Ast_Arg_Node_556 | Ast_Arg_Node_557 | Ast_Arg_Node_558 | Ast_Arg_Node_559 | Ast_Arg_Node_560 | Ast_Arg_Node_561 | Ast_Arg_Node_562 | Ast_Arg_Node_563 | Ast_Arg_Node_564 | Ast_AmbiguousIdentifier_Node_714;
          }
export type Ast_OPTIONAL_Node = Ast_OPTIONAL_Node_;
interface Ast_PARAMARRAY_Node_ extends BaseTokenNode {
            token:"PARAMARRAY";
            parent:Ast_Arg_Node_501 | Ast_Arg_Node_502 | Ast_Arg_Node_503 | Ast_Arg_Node_504 | Ast_Arg_Node_505 | Ast_Arg_Node_506 | Ast_Arg_Node_507 | Ast_Arg_Node_508 | Ast_Arg_Node_509 | Ast_Arg_Node_510 | Ast_Arg_Node_511 | Ast_Arg_Node_512 | Ast_Arg_Node_513 | Ast_Arg_Node_514 | Ast_Arg_Node_515 | Ast_Arg_Node_516 | Ast_Arg_Node_533 | Ast_Arg_Node_534 | Ast_Arg_Node_535 | Ast_Arg_Node_536 | Ast_Arg_Node_537 | Ast_Arg_Node_538 | Ast_Arg_Node_539 | Ast_Arg_Node_540 | Ast_Arg_Node_541 | Ast_Arg_Node_542 | Ast_Arg_Node_543 | Ast_Arg_Node_544 | Ast_Arg_Node_545 | Ast_Arg_Node_546 | Ast_Arg_Node_547 | Ast_Arg_Node_548 | Ast_Arg_Node_565 | Ast_Arg_Node_566 | Ast_Arg_Node_567 | Ast_Arg_Node_568 | Ast_Arg_Node_569 | Ast_Arg_Node_570 | Ast_Arg_Node_571 | Ast_Arg_Node_572 | Ast_Arg_Node_573 | Ast_Arg_Node_574 | Ast_Arg_Node_575 | Ast_Arg_Node_576 | Ast_Arg_Node_577 | Ast_Arg_Node_578 | Ast_Arg_Node_579 | Ast_Arg_Node_580 | Ast_Arg_Node_597 | Ast_Arg_Node_598 | Ast_Arg_Node_599 | Ast_Arg_Node_600 | Ast_Arg_Node_601 | Ast_Arg_Node_602 | Ast_Arg_Node_603 | Ast_Arg_Node_604 | Ast_Arg_Node_605 | Ast_Arg_Node_606 | Ast_Arg_Node_607 | Ast_Arg_Node_608 | Ast_Arg_Node_609 | Ast_Arg_Node_610 | Ast_Arg_Node_611 | Ast_Arg_Node_612 | Ast_AmbiguousIdentifier_Node_716;
          }
export type Ast_PARAMARRAY_Node = Ast_PARAMARRAY_Node_;
interface Ast_Arg_Node_501_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_501 = Ast_Arg_Node_501_;
interface Ast_Arg_Node_502_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_502 = Ast_Arg_Node_502_;
interface Ast_Arg_Node_503_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_503 = Ast_Arg_Node_503_;
interface Ast_Arg_Node_504_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_504 = Ast_Arg_Node_504_;
interface Ast_Arg_Node_505_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_505 = Ast_Arg_Node_505_;
interface Ast_Arg_Node_506_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_506 = Ast_Arg_Node_506_;
interface Ast_Arg_Node_507_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_507 = Ast_Arg_Node_507_;
interface Ast_Arg_Node_508_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_508 = Ast_Arg_Node_508_;
interface Ast_Arg_Node_509_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_509 = Ast_Arg_Node_509_;
interface Ast_Arg_Node_510_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_510 = Ast_Arg_Node_510_;
interface Ast_Arg_Node_511_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_511 = Ast_Arg_Node_511_;
interface Ast_Arg_Node_512_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_512 = Ast_Arg_Node_512_;
interface Ast_Arg_Node_513_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_513 = Ast_Arg_Node_513_;
interface Ast_Arg_Node_514_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_514 = Ast_Arg_Node_514_;
interface Ast_Arg_Node_515_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_515 = Ast_Arg_Node_515_;
interface Ast_Arg_Node_516_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_516 = Ast_Arg_Node_516_;
interface Ast_Arg_Node_517_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_517 = Ast_Arg_Node_517_;
interface Ast_Arg_Node_518_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_518 = Ast_Arg_Node_518_;
interface Ast_Arg_Node_519_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_519 = Ast_Arg_Node_519_;
interface Ast_Arg_Node_520_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_520 = Ast_Arg_Node_520_;
interface Ast_Arg_Node_521_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_521 = Ast_Arg_Node_521_;
interface Ast_Arg_Node_522_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_522 = Ast_Arg_Node_522_;
interface Ast_Arg_Node_523_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_523 = Ast_Arg_Node_523_;
interface Ast_Arg_Node_524_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_524 = Ast_Arg_Node_524_;
interface Ast_Arg_Node_525_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_525 = Ast_Arg_Node_525_;
interface Ast_Arg_Node_526_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_526 = Ast_Arg_Node_526_;
interface Ast_Arg_Node_527_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_527 = Ast_Arg_Node_527_;
interface Ast_Arg_Node_528_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_528 = Ast_Arg_Node_528_;
interface Ast_Arg_Node_529_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_529 = Ast_Arg_Node_529_;
interface Ast_Arg_Node_530_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_530 = Ast_Arg_Node_530_;
interface Ast_Arg_Node_531_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_531 = Ast_Arg_Node_531_;
interface Ast_Arg_Node_532_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_532 = Ast_Arg_Node_532_;
interface Ast_Arg_Node_533_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_533 = Ast_Arg_Node_533_;
interface Ast_Arg_Node_534_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_534 = Ast_Arg_Node_534_;
interface Ast_Arg_Node_535_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_535 = Ast_Arg_Node_535_;
interface Ast_Arg_Node_536_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_536 = Ast_Arg_Node_536_;
interface Ast_Arg_Node_537_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_537 = Ast_Arg_Node_537_;
interface Ast_Arg_Node_538_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_538 = Ast_Arg_Node_538_;
interface Ast_Arg_Node_539_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_539 = Ast_Arg_Node_539_;
interface Ast_Arg_Node_540_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_540 = Ast_Arg_Node_540_;
interface Ast_Arg_Node_541_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_541 = Ast_Arg_Node_541_;
interface Ast_Arg_Node_542_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_542 = Ast_Arg_Node_542_;
interface Ast_Arg_Node_543_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_543 = Ast_Arg_Node_543_;
interface Ast_Arg_Node_544_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_544 = Ast_Arg_Node_544_;
interface Ast_Arg_Node_545_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_545 = Ast_Arg_Node_545_;
interface Ast_Arg_Node_546_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_546 = Ast_Arg_Node_546_;
interface Ast_Arg_Node_547_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_547 = Ast_Arg_Node_547_;
interface Ast_Arg_Node_548_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_548 = Ast_Arg_Node_548_;
interface Ast_Arg_Node_549_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_549 = Ast_Arg_Node_549_;
interface Ast_Arg_Node_550_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_550 = Ast_Arg_Node_550_;
interface Ast_Arg_Node_551_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_551 = Ast_Arg_Node_551_;
interface Ast_Arg_Node_552_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_552 = Ast_Arg_Node_552_;
interface Ast_Arg_Node_553_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_553 = Ast_Arg_Node_553_;
interface Ast_Arg_Node_554_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_554 = Ast_Arg_Node_554_;
interface Ast_Arg_Node_555_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_555 = Ast_Arg_Node_555_;
interface Ast_Arg_Node_556_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_556 = Ast_Arg_Node_556_;
interface Ast_Arg_Node_557_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_557 = Ast_Arg_Node_557_;
interface Ast_Arg_Node_558_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_558 = Ast_Arg_Node_558_;
interface Ast_Arg_Node_559_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_559 = Ast_Arg_Node_559_;
interface Ast_Arg_Node_560_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_560 = Ast_Arg_Node_560_;
interface Ast_Arg_Node_561_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_561 = Ast_Arg_Node_561_;
interface Ast_Arg_Node_562_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_562 = Ast_Arg_Node_562_;
interface Ast_Arg_Node_563_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_CertainIdentifier_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_563 = Ast_Arg_Node_563_;
interface Ast_Arg_Node_564_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_OPTIONAL_Node,Ast_CertainIdentifier_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_564 = Ast_Arg_Node_564_;
interface Ast_Arg_Node_565_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_565 = Ast_Arg_Node_565_;
interface Ast_Arg_Node_566_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_566 = Ast_Arg_Node_566_;
interface Ast_Arg_Node_567_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_567 = Ast_Arg_Node_567_;
interface Ast_Arg_Node_568_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_568 = Ast_Arg_Node_568_;
interface Ast_Arg_Node_569_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_569 = Ast_Arg_Node_569_;
interface Ast_Arg_Node_570_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_570 = Ast_Arg_Node_570_;
interface Ast_Arg_Node_571_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_571 = Ast_Arg_Node_571_;
interface Ast_Arg_Node_572_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_572 = Ast_Arg_Node_572_;
interface Ast_Arg_Node_573_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_573 = Ast_Arg_Node_573_;
interface Ast_Arg_Node_574_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_574 = Ast_Arg_Node_574_;
interface Ast_Arg_Node_575_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_575 = Ast_Arg_Node_575_;
interface Ast_Arg_Node_576_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_576 = Ast_Arg_Node_576_;
interface Ast_Arg_Node_577_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_577 = Ast_Arg_Node_577_;
interface Ast_Arg_Node_578_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_578 = Ast_Arg_Node_578_;
interface Ast_Arg_Node_579_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_579 = Ast_Arg_Node_579_;
interface Ast_Arg_Node_580_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_580 = Ast_Arg_Node_580_;
interface Ast_Arg_Node_581_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_581 = Ast_Arg_Node_581_;
interface Ast_Arg_Node_582_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_582 = Ast_Arg_Node_582_;
interface Ast_Arg_Node_583_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_583 = Ast_Arg_Node_583_;
interface Ast_Arg_Node_584_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_584 = Ast_Arg_Node_584_;
interface Ast_Arg_Node_585_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_585 = Ast_Arg_Node_585_;
interface Ast_Arg_Node_586_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_586 = Ast_Arg_Node_586_;
interface Ast_Arg_Node_587_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_587 = Ast_Arg_Node_587_;
interface Ast_Arg_Node_588_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_588 = Ast_Arg_Node_588_;
interface Ast_Arg_Node_589_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_589 = Ast_Arg_Node_589_;
interface Ast_Arg_Node_590_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_590 = Ast_Arg_Node_590_;
interface Ast_Arg_Node_591_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_591 = Ast_Arg_Node_591_;
interface Ast_Arg_Node_592_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_592 = Ast_Arg_Node_592_;
interface Ast_Arg_Node_593_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_593 = Ast_Arg_Node_593_;
interface Ast_Arg_Node_594_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_594 = Ast_Arg_Node_594_;
interface Ast_Arg_Node_595_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_595 = Ast_Arg_Node_595_;
interface Ast_Arg_Node_596_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[...Ast_Arg_group_88_Node,Ast_CertainIdentifier_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_596 = Ast_Arg_Node_596_;
interface Ast_Arg_Node_597_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_597 = Ast_Arg_Node_597_;
interface Ast_Arg_Node_598_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_598 = Ast_Arg_Node_598_;
interface Ast_Arg_Node_599_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_599 = Ast_Arg_Node_599_;
interface Ast_Arg_Node_600_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_600 = Ast_Arg_Node_600_;
interface Ast_Arg_Node_601_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_601 = Ast_Arg_Node_601_;
interface Ast_Arg_Node_602_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_602 = Ast_Arg_Node_602_;
interface Ast_Arg_Node_603_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_603 = Ast_Arg_Node_603_;
interface Ast_Arg_Node_604_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_TypeHint_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_604 = Ast_Arg_Node_604_;
interface Ast_Arg_Node_605_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_605 = Ast_Arg_Node_605_;
interface Ast_Arg_Node_606_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_606 = Ast_Arg_Node_606_;
interface Ast_Arg_Node_607_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_607 = Ast_Arg_Node_607_;
interface Ast_Arg_Node_608_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_608 = Ast_Arg_Node_608_;
interface Ast_Arg_Node_609_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_609 = Ast_Arg_Node_609_;
interface Ast_Arg_Node_610_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_610 = Ast_Arg_Node_610_;
interface Ast_Arg_Node_611_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_611 = Ast_Arg_Node_611_;
interface Ast_Arg_Node_612_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_PARAMARRAY_Node,Ast_CertainIdentifier_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_612 = Ast_Arg_Node_612_;
interface Ast_Arg_Node_613_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_613 = Ast_Arg_Node_613_;
interface Ast_Arg_Node_614_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_614 = Ast_Arg_Node_614_;
interface Ast_Arg_Node_615_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_615 = Ast_Arg_Node_615_;
interface Ast_Arg_Node_616_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_CertainIdentifier_Node,Ast_TypeHint_Node,...Ast_Arg_group_def_92_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_616 = Ast_Arg_Node_616_;
interface Ast_Arg_Node_617_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_617 = Ast_Arg_Node_617_;
interface Ast_Arg_Node_618_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_618 = Ast_Arg_Node_618_;
interface Ast_Arg_Node_619_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_CertainIdentifier_Node,Ast_TypeHint_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_619 = Ast_Arg_Node_619_;
interface Ast_Arg_Node_620_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_CertainIdentifier_Node,Ast_TypeHint_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_620 = Ast_Arg_Node_620_;
interface Ast_Arg_Node_621_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_621 = Ast_Arg_Node_621_;
interface Ast_Arg_Node_622_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_622 = Ast_Arg_Node_622_;
interface Ast_Arg_Node_623_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_623 = Ast_Arg_Node_623_;
interface Ast_Arg_Node_624_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_CertainIdentifier_Node,...Ast_Arg_group_def_92_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_624 = Ast_Arg_Node_624_;
interface Ast_Arg_Node_625_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_625 = Ast_Arg_Node_625_;
interface Ast_Arg_Node_626_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_CertainIdentifier_Node,Ast_AsTypeClause_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_626 = Ast_Arg_Node_626_;
interface Ast_Arg_Node_627_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_CertainIdentifier_Node,Ast_ArgDefaultValue_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_627 = Ast_Arg_Node_627_;
interface Ast_Arg_Node_628_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[Ast_CertainIdentifier_Node];
        parent:Ast_ArgList_group_def_71_Parent_Node | Ast_ArgList_group_def_72_Parent_Node;
      }
type Ast_Arg_Node_628 = Ast_Arg_Node_628_;
interface Ast_ArgDefaultValue_Node_ extends BaseSymbolNode {
        symbol:"argDefaultValue";
        
        children:[Ast_EQ_Node,Ast_ValueStmt_Node];
        parent:Ast_Arg_Node_501 | Ast_Arg_Node_503 | Ast_Arg_Node_505 | Ast_Arg_Node_507 | Ast_Arg_Node_509 | Ast_Arg_Node_511 | Ast_Arg_Node_513 | Ast_Arg_Node_515 | Ast_Arg_Node_517 | Ast_Arg_Node_519 | Ast_Arg_Node_521 | Ast_Arg_Node_523 | Ast_Arg_Node_525 | Ast_Arg_Node_527 | Ast_Arg_Node_529 | Ast_Arg_Node_531 | Ast_Arg_Node_533 | Ast_Arg_Node_535 | Ast_Arg_Node_537 | Ast_Arg_Node_539 | Ast_Arg_Node_541 | Ast_Arg_Node_543 | Ast_Arg_Node_545 | Ast_Arg_Node_547 | Ast_Arg_Node_549 | Ast_Arg_Node_551 | Ast_Arg_Node_553 | Ast_Arg_Node_555 | Ast_Arg_Node_557 | Ast_Arg_Node_559 | Ast_Arg_Node_561 | Ast_Arg_Node_563 | Ast_Arg_Node_565 | Ast_Arg_Node_567 | Ast_Arg_Node_569 | Ast_Arg_Node_571 | Ast_Arg_Node_573 | Ast_Arg_Node_575 | Ast_Arg_Node_577 | Ast_Arg_Node_579 | Ast_Arg_Node_581 | Ast_Arg_Node_583 | Ast_Arg_Node_585 | Ast_Arg_Node_587 | Ast_Arg_Node_589 | Ast_Arg_Node_591 | Ast_Arg_Node_593 | Ast_Arg_Node_595 | Ast_Arg_Node_597 | Ast_Arg_Node_599 | Ast_Arg_Node_601 | Ast_Arg_Node_603 | Ast_Arg_Node_605 | Ast_Arg_Node_607 | Ast_Arg_Node_609 | Ast_Arg_Node_611 | Ast_Arg_Node_613 | Ast_Arg_Node_615 | Ast_Arg_Node_617 | Ast_Arg_Node_619 | Ast_Arg_Node_621 | Ast_Arg_Node_623 | Ast_Arg_Node_625 | Ast_Arg_Node_627;
      }
type Ast_ArgDefaultValue_Node = Ast_ArgDefaultValue_Node_;
interface Ast_AS_Node_ extends BaseTokenNode {
            token:"AS";
            parent:Ast_AsTypeClause_Node_630 | Ast_AsTypeClause_Node_631 | Ast_AmbiguousIdentifier_Node_652;
          }
export type Ast_AS_Node = Ast_AS_Node_;
interface Ast_AsTypeClause_Node_630_ extends BaseSymbolNode {
        symbol:"asTypeClause";
        
        children:[Ast_AS_Node,Ast_NEW_Node,Ast_Type__Node];
        parent:Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_69 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_PropertyGetStmt_Node_80 | Ast_PropertyGetStmt_Node_81 | Ast_PropertyGetStmt_Node_84 | Ast_PropertyGetStmt_Node_85 | Ast_PropertyGetStmt_Node_88 | Ast_PropertyGetStmt_Node_89 | Ast_PropertyGetStmt_Node_92 | Ast_PropertyGetStmt_Node_93 | Ast_PropertyGetStmt_Node_96 | Ast_PropertyGetStmt_Node_97 | Ast_PropertyGetStmt_Node_100 | Ast_PropertyGetStmt_Node_101 | Ast_PropertyGetStmt_Node_104 | Ast_PropertyGetStmt_Node_105 | Ast_PropertyGetStmt_Node_108 | Ast_PropertyGetStmt_Node_109 | Ast_PropertyGetStmt_Node_112 | Ast_PropertyGetStmt_Node_113 | Ast_PropertyGetStmt_Node_116 | Ast_PropertyGetStmt_Node_117 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_FunctionStmt_Node_176 | Ast_FunctionStmt_Node_177 | Ast_FunctionStmt_Node_180 | Ast_FunctionStmt_Node_181 | Ast_FunctionStmt_Node_184 | Ast_FunctionStmt_Node_185 | Ast_FunctionStmt_Node_188 | Ast_FunctionStmt_Node_189 | Ast_FunctionStmt_Node_192 | Ast_FunctionStmt_Node_193 | Ast_FunctionStmt_Node_196 | Ast_FunctionStmt_Node_197 | Ast_FunctionStmt_Node_200 | Ast_FunctionStmt_Node_201 | Ast_FunctionStmt_Node_204 | Ast_FunctionStmt_Node_205 | Ast_FunctionStmt_Node_208 | Ast_FunctionStmt_Node_209 | Ast_FunctionStmt_Node_212 | Ast_FunctionStmt_Node_213 | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_RedimSubStmt_Node_334 | Ast_VariableSubStmt_Node_402 | Ast_VariableSubStmt_Node_404 | Ast_VariableSubStmt_Node_406 | Ast_VariableSubStmt_Node_408 | Ast_Arg_Node_501 | Ast_Arg_Node_502 | Ast_Arg_Node_505 | Ast_Arg_Node_506 | Ast_Arg_Node_509 | Ast_Arg_Node_510 | Ast_Arg_Node_513 | Ast_Arg_Node_514 | Ast_Arg_Node_517 | Ast_Arg_Node_518 | Ast_Arg_Node_521 | Ast_Arg_Node_522 | Ast_Arg_Node_525 | Ast_Arg_Node_526 | Ast_Arg_Node_529 | Ast_Arg_Node_530 | Ast_Arg_Node_533 | Ast_Arg_Node_534 | Ast_Arg_Node_537 | Ast_Arg_Node_538 | Ast_Arg_Node_541 | Ast_Arg_Node_542 | Ast_Arg_Node_545 | Ast_Arg_Node_546 | Ast_Arg_Node_549 | Ast_Arg_Node_550 | Ast_Arg_Node_553 | Ast_Arg_Node_554 | Ast_Arg_Node_557 | Ast_Arg_Node_558 | Ast_Arg_Node_561 | Ast_Arg_Node_562 | Ast_Arg_Node_565 | Ast_Arg_Node_566 | Ast_Arg_Node_569 | Ast_Arg_Node_570 | Ast_Arg_Node_573 | Ast_Arg_Node_574 | Ast_Arg_Node_577 | Ast_Arg_Node_578 | Ast_Arg_Node_581 | Ast_Arg_Node_582 | Ast_Arg_Node_585 | Ast_Arg_Node_586 | Ast_Arg_Node_589 | Ast_Arg_Node_590 | Ast_Arg_Node_593 | Ast_Arg_Node_594 | Ast_Arg_Node_597 | Ast_Arg_Node_598 | Ast_Arg_Node_601 | Ast_Arg_Node_602 | Ast_Arg_Node_605 | Ast_Arg_Node_606 | Ast_Arg_Node_609 | Ast_Arg_Node_610 | Ast_Arg_Node_613 | Ast_Arg_Node_614 | Ast_Arg_Node_617 | Ast_Arg_Node_618 | Ast_Arg_Node_621 | Ast_Arg_Node_622 | Ast_Arg_Node_625 | Ast_Arg_Node_626;
      }
type Ast_AsTypeClause_Node_630 = Ast_AsTypeClause_Node_630_;
interface Ast_AsTypeClause_Node_631_ extends BaseSymbolNode {
        symbol:"asTypeClause";
        
        children:[Ast_AS_Node,Ast_Type__Node];
        parent:Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_69 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_PropertyGetStmt_Node_80 | Ast_PropertyGetStmt_Node_81 | Ast_PropertyGetStmt_Node_84 | Ast_PropertyGetStmt_Node_85 | Ast_PropertyGetStmt_Node_88 | Ast_PropertyGetStmt_Node_89 | Ast_PropertyGetStmt_Node_92 | Ast_PropertyGetStmt_Node_93 | Ast_PropertyGetStmt_Node_96 | Ast_PropertyGetStmt_Node_97 | Ast_PropertyGetStmt_Node_100 | Ast_PropertyGetStmt_Node_101 | Ast_PropertyGetStmt_Node_104 | Ast_PropertyGetStmt_Node_105 | Ast_PropertyGetStmt_Node_108 | Ast_PropertyGetStmt_Node_109 | Ast_PropertyGetStmt_Node_112 | Ast_PropertyGetStmt_Node_113 | Ast_PropertyGetStmt_Node_116 | Ast_PropertyGetStmt_Node_117 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_FunctionStmt_Node_176 | Ast_FunctionStmt_Node_177 | Ast_FunctionStmt_Node_180 | Ast_FunctionStmt_Node_181 | Ast_FunctionStmt_Node_184 | Ast_FunctionStmt_Node_185 | Ast_FunctionStmt_Node_188 | Ast_FunctionStmt_Node_189 | Ast_FunctionStmt_Node_192 | Ast_FunctionStmt_Node_193 | Ast_FunctionStmt_Node_196 | Ast_FunctionStmt_Node_197 | Ast_FunctionStmt_Node_200 | Ast_FunctionStmt_Node_201 | Ast_FunctionStmt_Node_204 | Ast_FunctionStmt_Node_205 | Ast_FunctionStmt_Node_208 | Ast_FunctionStmt_Node_209 | Ast_FunctionStmt_Node_212 | Ast_FunctionStmt_Node_213 | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_RedimSubStmt_Node_334 | Ast_VariableSubStmt_Node_402 | Ast_VariableSubStmt_Node_404 | Ast_VariableSubStmt_Node_406 | Ast_VariableSubStmt_Node_408 | Ast_Arg_Node_501 | Ast_Arg_Node_502 | Ast_Arg_Node_505 | Ast_Arg_Node_506 | Ast_Arg_Node_509 | Ast_Arg_Node_510 | Ast_Arg_Node_513 | Ast_Arg_Node_514 | Ast_Arg_Node_517 | Ast_Arg_Node_518 | Ast_Arg_Node_521 | Ast_Arg_Node_522 | Ast_Arg_Node_525 | Ast_Arg_Node_526 | Ast_Arg_Node_529 | Ast_Arg_Node_530 | Ast_Arg_Node_533 | Ast_Arg_Node_534 | Ast_Arg_Node_537 | Ast_Arg_Node_538 | Ast_Arg_Node_541 | Ast_Arg_Node_542 | Ast_Arg_Node_545 | Ast_Arg_Node_546 | Ast_Arg_Node_549 | Ast_Arg_Node_550 | Ast_Arg_Node_553 | Ast_Arg_Node_554 | Ast_Arg_Node_557 | Ast_Arg_Node_558 | Ast_Arg_Node_561 | Ast_Arg_Node_562 | Ast_Arg_Node_565 | Ast_Arg_Node_566 | Ast_Arg_Node_569 | Ast_Arg_Node_570 | Ast_Arg_Node_573 | Ast_Arg_Node_574 | Ast_Arg_Node_577 | Ast_Arg_Node_578 | Ast_Arg_Node_581 | Ast_Arg_Node_582 | Ast_Arg_Node_585 | Ast_Arg_Node_586 | Ast_Arg_Node_589 | Ast_Arg_Node_590 | Ast_Arg_Node_593 | Ast_Arg_Node_594 | Ast_Arg_Node_597 | Ast_Arg_Node_598 | Ast_Arg_Node_601 | Ast_Arg_Node_602 | Ast_Arg_Node_605 | Ast_Arg_Node_606 | Ast_Arg_Node_609 | Ast_Arg_Node_610 | Ast_Arg_Node_613 | Ast_Arg_Node_614 | Ast_Arg_Node_617 | Ast_Arg_Node_618 | Ast_Arg_Node_621 | Ast_Arg_Node_622 | Ast_Arg_Node_625 | Ast_Arg_Node_626;
      }
type Ast_AsTypeClause_Node_631 = Ast_AsTypeClause_Node_631_;
type Ast_Type__group_def_94_Node  = [Ast_BaseType_Node];
type Ast_Type__group_93_Node_633  = [...Ast_Type__group_def_94_Node];
type Ast_Type__group_def_95_Node  = [Ast_ComplexType_Node];
type Ast_Type__group_93_Node_635  = [...Ast_Type__group_def_95_Node];
interface Ast_Type__Node_636_ extends BaseSymbolNode {
        symbol:"type_";
        
        children:[...Ast_Type__group_93_Node,...Ast_Arg_group_def_92_Node];
        parent:Ast_WithStmt_group_def_58_Parent_Node | Ast_AsTypeClause_Node_630 | Ast_AsTypeClause_Node_631;
      }
type Ast_Type__Node_636 = Ast_Type__Node_636_;
interface Ast_Type__Node_637_ extends BaseSymbolNode {
        symbol:"type_";
        
        children:[...Ast_Type__group_93_Node];
        parent:Ast_WithStmt_group_def_58_Parent_Node | Ast_AsTypeClause_Node_630 | Ast_AsTypeClause_Node_631;
      }
type Ast_Type__Node_637 = Ast_Type__Node_637_;
type Ast_ComplexType_group_def_98_Node  = [Ast_TOKEN_1_Node,Ast_AmbiguousIdentifier_Node];
interface Ast_ComplexType_Node_ extends BaseSymbolNode {
        symbol:"complexType";
        
        children:[Ast_CertainIdentifier_Node,...ZeroOrMore<Ast_ComplexType_group_def_98_Node>];
        parent:Ast_Type__group_def_95_Parent_Node;
      }
type Ast_ComplexType_Node = Ast_ComplexType_Node_;
interface Ast_BOOLEAN_Node_ extends BaseTokenNode {
            token:"BOOLEAN";
            parent:Ast_BaseType_Node_640 | Ast_AmbiguousIdentifier_Node_654;
          }
export type Ast_BOOLEAN_Node = Ast_BOOLEAN_Node_;
interface Ast_BaseType_Node_640_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[Ast_BOOLEAN_Node];
        parent:Ast_Type__group_def_94_Parent_Node;
      }
type Ast_BaseType_Node_640 = Ast_BaseType_Node_640_;
interface Ast_BYTE_Node_ extends BaseTokenNode {
            token:"BYTE";
            parent:Ast_BaseType_Node_641 | Ast_AmbiguousIdentifier_Node_657;
          }
export type Ast_BYTE_Node = Ast_BYTE_Node_;
interface Ast_BaseType_Node_641_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[Ast_BYTE_Node];
        parent:Ast_Type__group_def_94_Parent_Node;
      }
type Ast_BaseType_Node_641 = Ast_BaseType_Node_641_;
interface Ast_DOUBLE_Node_ extends BaseTokenNode {
            token:"DOUBLE";
            parent:Ast_BaseType_Node_642 | Ast_AmbiguousIdentifier_Node_677;
          }
export type Ast_DOUBLE_Node = Ast_DOUBLE_Node_;
interface Ast_BaseType_Node_642_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[Ast_DOUBLE_Node];
        parent:Ast_Type__group_def_94_Parent_Node;
      }
type Ast_BaseType_Node_642 = Ast_BaseType_Node_642_;
interface Ast_INTEGER_Node_ extends BaseTokenNode {
            token:"INTEGER";
            parent:Ast_BaseType_Node_643 | Ast_AmbiguousIdentifier_Node_699;
          }
export type Ast_INTEGER_Node = Ast_INTEGER_Node_;
interface Ast_BaseType_Node_643_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[Ast_INTEGER_Node];
        parent:Ast_Type__group_def_94_Parent_Node;
      }
type Ast_BaseType_Node_643 = Ast_BaseType_Node_643_;
interface Ast_LONG_Node_ extends BaseTokenNode {
            token:"LONG";
            parent:Ast_BaseType_Node_644 | Ast_AmbiguousIdentifier_Node_700;
          }
export type Ast_LONG_Node = Ast_LONG_Node_;
interface Ast_BaseType_Node_644_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[Ast_LONG_Node];
        parent:Ast_Type__group_def_94_Parent_Node;
      }
type Ast_BaseType_Node_644 = Ast_BaseType_Node_644_;
interface Ast_SINGLE_Node_ extends BaseTokenNode {
            token:"SINGLE";
            parent:Ast_BaseType_Node_645 | Ast_AmbiguousIdentifier_Node_728;
          }
export type Ast_SINGLE_Node = Ast_SINGLE_Node_;
interface Ast_BaseType_Node_645_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[Ast_SINGLE_Node];
        parent:Ast_Type__group_def_94_Parent_Node;
      }
type Ast_BaseType_Node_645 = Ast_BaseType_Node_645_;
interface Ast_VARIANT_Node_ extends BaseTokenNode {
            token:"VARIANT";
            parent:Ast_BaseType_Node_646 | Ast_AmbiguousIdentifier_Node_739;
          }
export type Ast_VARIANT_Node = Ast_VARIANT_Node_;
interface Ast_BaseType_Node_646_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[Ast_VARIANT_Node];
        parent:Ast_Type__group_def_94_Parent_Node;
      }
type Ast_BaseType_Node_646 = Ast_BaseType_Node_646_;
interface Ast_STRING_Node_ extends BaseTokenNode {
            token:"STRING";
            parent:Ast_BaseType_Node_647 | Ast_AmbiguousIdentifier_Node_732;
          }
export type Ast_STRING_Node = Ast_STRING_Node_;
interface Ast_BaseType_Node_647_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[Ast_STRING_Node];
        parent:Ast_Type__group_def_94_Parent_Node;
      }
type Ast_BaseType_Node_647 = Ast_BaseType_Node_647_;
interface Ast_DATE_Node_ extends BaseTokenNode {
            token:"DATE";
            parent:Ast_BaseType_Node_648 | Ast_AmbiguousIdentifier_Node_661;
          }
export type Ast_DATE_Node = Ast_DATE_Node_;
interface Ast_BaseType_Node_648_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[Ast_DATE_Node];
        parent:Ast_Type__group_def_94_Parent_Node;
      }
type Ast_BaseType_Node_648 = Ast_BaseType_Node_648_;
interface Ast_ALIAS_Node_ extends BaseTokenNode {
            token:"ALIAS";
            parent:Ast_AmbiguousIdentifier_Node_649;
          }
export type Ast_ALIAS_Node = Ast_ALIAS_Node_;
interface Ast_AmbiguousIdentifier_Node_649_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_ALIAS_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_649 = Ast_AmbiguousIdentifier_Node_649_;
interface Ast_AmbiguousIdentifier_Node_650_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_AND_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_650 = Ast_AmbiguousIdentifier_Node_650_;
interface Ast_AmbiguousIdentifier_Node_651_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_ATTRIBUTE_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_651 = Ast_AmbiguousIdentifier_Node_651_;
interface Ast_AmbiguousIdentifier_Node_652_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_AS_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_652 = Ast_AmbiguousIdentifier_Node_652_;
interface Ast_BEGIN_Node_ extends BaseTokenNode {
            token:"BEGIN";
            parent:Ast_AmbiguousIdentifier_Node_653;
          }
export type Ast_BEGIN_Node = Ast_BEGIN_Node_;
interface Ast_AmbiguousIdentifier_Node_653_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_BEGIN_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_653 = Ast_AmbiguousIdentifier_Node_653_;
interface Ast_AmbiguousIdentifier_Node_654_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_BOOLEAN_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_654 = Ast_AmbiguousIdentifier_Node_654_;
interface Ast_AmbiguousIdentifier_Node_655_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_BYVAL_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_655 = Ast_AmbiguousIdentifier_Node_655_;
interface Ast_AmbiguousIdentifier_Node_656_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_BYREF_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_656 = Ast_AmbiguousIdentifier_Node_656_;
interface Ast_AmbiguousIdentifier_Node_657_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_BYTE_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_657 = Ast_AmbiguousIdentifier_Node_657_;
interface Ast_AmbiguousIdentifier_Node_658_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_CALL_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_658 = Ast_AmbiguousIdentifier_Node_658_;
interface Ast_AmbiguousIdentifier_Node_659_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_CASE_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_659 = Ast_AmbiguousIdentifier_Node_659_;
interface Ast_CONST_Node_ extends BaseTokenNode {
            token:"CONST";
            parent:Ast_AmbiguousIdentifier_Node_660;
          }
export type Ast_CONST_Node = Ast_CONST_Node_;
interface Ast_AmbiguousIdentifier_Node_660_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_CONST_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_660 = Ast_AmbiguousIdentifier_Node_660_;
interface Ast_AmbiguousIdentifier_Node_661_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_DATE_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_661 = Ast_AmbiguousIdentifier_Node_661_;
interface Ast_DECLARE_Node_ extends BaseTokenNode {
            token:"DECLARE";
            parent:Ast_AmbiguousIdentifier_Node_662;
          }
export type Ast_DECLARE_Node = Ast_DECLARE_Node_;
interface Ast_AmbiguousIdentifier_Node_662_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_DECLARE_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_662 = Ast_AmbiguousIdentifier_Node_662_;
interface Ast_DEFBOOL_Node_ extends BaseTokenNode {
            token:"DEFBOOL";
            parent:Ast_AmbiguousIdentifier_Node_663;
          }
export type Ast_DEFBOOL_Node = Ast_DEFBOOL_Node_;
interface Ast_AmbiguousIdentifier_Node_663_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_DEFBOOL_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_663 = Ast_AmbiguousIdentifier_Node_663_;
interface Ast_DEFBYTE_Node_ extends BaseTokenNode {
            token:"DEFBYTE";
            parent:Ast_AmbiguousIdentifier_Node_664;
          }
export type Ast_DEFBYTE_Node = Ast_DEFBYTE_Node_;
interface Ast_AmbiguousIdentifier_Node_664_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_DEFBYTE_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_664 = Ast_AmbiguousIdentifier_Node_664_;
interface Ast_DEFDATE_Node_ extends BaseTokenNode {
            token:"DEFDATE";
            parent:Ast_AmbiguousIdentifier_Node_665;
          }
export type Ast_DEFDATE_Node = Ast_DEFDATE_Node_;
interface Ast_AmbiguousIdentifier_Node_665_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_DEFDATE_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_665 = Ast_AmbiguousIdentifier_Node_665_;
interface Ast_DEFDBL_Node_ extends BaseTokenNode {
            token:"DEFDBL";
            parent:Ast_AmbiguousIdentifier_Node_666;
          }
export type Ast_DEFDBL_Node = Ast_DEFDBL_Node_;
interface Ast_AmbiguousIdentifier_Node_666_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_DEFDBL_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_666 = Ast_AmbiguousIdentifier_Node_666_;
interface Ast_DEFDEC_Node_ extends BaseTokenNode {
            token:"DEFDEC";
            parent:Ast_AmbiguousIdentifier_Node_667;
          }
export type Ast_DEFDEC_Node = Ast_DEFDEC_Node_;
interface Ast_AmbiguousIdentifier_Node_667_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_DEFDEC_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_667 = Ast_AmbiguousIdentifier_Node_667_;
interface Ast_DEFCUR_Node_ extends BaseTokenNode {
            token:"DEFCUR";
            parent:Ast_AmbiguousIdentifier_Node_668;
          }
export type Ast_DEFCUR_Node = Ast_DEFCUR_Node_;
interface Ast_AmbiguousIdentifier_Node_668_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_DEFCUR_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_668 = Ast_AmbiguousIdentifier_Node_668_;
interface Ast_DEFINT_Node_ extends BaseTokenNode {
            token:"DEFINT";
            parent:Ast_AmbiguousIdentifier_Node_669;
          }
export type Ast_DEFINT_Node = Ast_DEFINT_Node_;
interface Ast_AmbiguousIdentifier_Node_669_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_DEFINT_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_669 = Ast_AmbiguousIdentifier_Node_669_;
interface Ast_DEFLNG_Node_ extends BaseTokenNode {
            token:"DEFLNG";
            parent:Ast_AmbiguousIdentifier_Node_670;
          }
export type Ast_DEFLNG_Node = Ast_DEFLNG_Node_;
interface Ast_AmbiguousIdentifier_Node_670_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_DEFLNG_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_670 = Ast_AmbiguousIdentifier_Node_670_;
interface Ast_DEFOBJ_Node_ extends BaseTokenNode {
            token:"DEFOBJ";
            parent:Ast_AmbiguousIdentifier_Node_671;
          }
export type Ast_DEFOBJ_Node = Ast_DEFOBJ_Node_;
interface Ast_AmbiguousIdentifier_Node_671_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_DEFOBJ_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_671 = Ast_AmbiguousIdentifier_Node_671_;
interface Ast_DEFSNG_Node_ extends BaseTokenNode {
            token:"DEFSNG";
            parent:Ast_AmbiguousIdentifier_Node_672;
          }
export type Ast_DEFSNG_Node = Ast_DEFSNG_Node_;
interface Ast_AmbiguousIdentifier_Node_672_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_DEFSNG_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_672 = Ast_AmbiguousIdentifier_Node_672_;
interface Ast_DEFSTR_Node_ extends BaseTokenNode {
            token:"DEFSTR";
            parent:Ast_AmbiguousIdentifier_Node_673;
          }
export type Ast_DEFSTR_Node = Ast_DEFSTR_Node_;
interface Ast_AmbiguousIdentifier_Node_673_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_DEFSTR_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_673 = Ast_AmbiguousIdentifier_Node_673_;
interface Ast_DEFVAR_Node_ extends BaseTokenNode {
            token:"DEFVAR";
            parent:Ast_AmbiguousIdentifier_Node_674;
          }
export type Ast_DEFVAR_Node = Ast_DEFVAR_Node_;
interface Ast_AmbiguousIdentifier_Node_674_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_DEFVAR_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_674 = Ast_AmbiguousIdentifier_Node_674_;
interface Ast_AmbiguousIdentifier_Node_675_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_DIM_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_675 = Ast_AmbiguousIdentifier_Node_675_;
interface Ast_AmbiguousIdentifier_Node_676_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_DO_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_676 = Ast_AmbiguousIdentifier_Node_676_;
interface Ast_AmbiguousIdentifier_Node_677_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_DOUBLE_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_677 = Ast_AmbiguousIdentifier_Node_677_;
interface Ast_AmbiguousIdentifier_Node_678_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_EACH_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_678 = Ast_AmbiguousIdentifier_Node_678_;
interface Ast_AmbiguousIdentifier_Node_679_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_ELSE_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_679 = Ast_AmbiguousIdentifier_Node_679_;
interface Ast_AmbiguousIdentifier_Node_680_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_ELSEIF_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_680 = Ast_AmbiguousIdentifier_Node_680_;
interface Ast_AmbiguousIdentifier_Node_681_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_END_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_681 = Ast_AmbiguousIdentifier_Node_681_;
interface Ast_ENUM_Node_ extends BaseTokenNode {
            token:"ENUM";
            parent:Ast_AmbiguousIdentifier_Node_682;
          }
export type Ast_ENUM_Node = Ast_ENUM_Node_;
interface Ast_AmbiguousIdentifier_Node_682_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_ENUM_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_682 = Ast_AmbiguousIdentifier_Node_682_;
interface Ast_EQV_Node_ extends BaseTokenNode {
            token:"EQV";
            parent:Ast_AmbiguousIdentifier_Node_683;
          }
export type Ast_EQV_Node = Ast_EQV_Node_;
interface Ast_AmbiguousIdentifier_Node_683_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_EQV_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_683 = Ast_AmbiguousIdentifier_Node_683_;
interface Ast_AmbiguousIdentifier_Node_684_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_ERASE_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_684 = Ast_AmbiguousIdentifier_Node_684_;
interface Ast_EVENT_Node_ extends BaseTokenNode {
            token:"EVENT";
            parent:Ast_AmbiguousIdentifier_Node_685;
          }
export type Ast_EVENT_Node = Ast_EVENT_Node_;
interface Ast_AmbiguousIdentifier_Node_685_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_EVENT_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_685 = Ast_AmbiguousIdentifier_Node_685_;
interface Ast_AmbiguousIdentifier_Node_686_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_FALSE_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_686 = Ast_AmbiguousIdentifier_Node_686_;
interface Ast_AmbiguousIdentifier_Node_687_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_FRIEND_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_687 = Ast_AmbiguousIdentifier_Node_687_;
interface Ast_AmbiguousIdentifier_Node_688_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_FOR_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_688 = Ast_AmbiguousIdentifier_Node_688_;
interface Ast_AmbiguousIdentifier_Node_689_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_FUNCTION_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_689 = Ast_AmbiguousIdentifier_Node_689_;
interface Ast_GET_Node_ extends BaseTokenNode {
            token:"GET";
            parent:Ast_AmbiguousIdentifier_Node_690;
          }
export type Ast_GET_Node = Ast_GET_Node_;
interface Ast_AmbiguousIdentifier_Node_690_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_GET_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_690 = Ast_AmbiguousIdentifier_Node_690_;
interface Ast_AmbiguousIdentifier_Node_691_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_GLOBAL_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_691 = Ast_AmbiguousIdentifier_Node_691_;
interface Ast_GOSUB_Node_ extends BaseTokenNode {
            token:"GOSUB";
            parent:Ast_AmbiguousIdentifier_Node_692;
          }
export type Ast_GOSUB_Node = Ast_GOSUB_Node_;
interface Ast_AmbiguousIdentifier_Node_692_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_GOSUB_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_692 = Ast_AmbiguousIdentifier_Node_692_;
interface Ast_AmbiguousIdentifier_Node_693_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_GOTO_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_693 = Ast_AmbiguousIdentifier_Node_693_;
interface Ast_AmbiguousIdentifier_Node_694_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_IF_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_694 = Ast_AmbiguousIdentifier_Node_694_;
interface Ast_IMPLEMENTS_Node_ extends BaseTokenNode {
            token:"IMPLEMENTS";
            parent:Ast_AmbiguousIdentifier_Node_695;
          }
export type Ast_IMPLEMENTS_Node = Ast_IMPLEMENTS_Node_;
interface Ast_AmbiguousIdentifier_Node_695_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_IMPLEMENTS_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_695 = Ast_AmbiguousIdentifier_Node_695_;
interface Ast_AmbiguousIdentifier_Node_696_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_IN_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_696 = Ast_AmbiguousIdentifier_Node_696_;
interface Ast_AmbiguousIdentifier_Node_697_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_ISNOT_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_697 = Ast_AmbiguousIdentifier_Node_697_;
interface Ast_AmbiguousIdentifier_Node_698_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_IS_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_698 = Ast_AmbiguousIdentifier_Node_698_;
interface Ast_AmbiguousIdentifier_Node_699_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_INTEGER_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_699 = Ast_AmbiguousIdentifier_Node_699_;
interface Ast_AmbiguousIdentifier_Node_700_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_LONG_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_700 = Ast_AmbiguousIdentifier_Node_700_;
interface Ast_AmbiguousIdentifier_Node_701_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_LOOP_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_701 = Ast_AmbiguousIdentifier_Node_701_;
interface Ast_LEN_Node_ extends BaseTokenNode {
            token:"LEN";
            parent:Ast_AmbiguousIdentifier_Node_702;
          }
export type Ast_LEN_Node = Ast_LEN_Node_;
interface Ast_AmbiguousIdentifier_Node_702_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_LEN_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_702 = Ast_AmbiguousIdentifier_Node_702_;
interface Ast_AmbiguousIdentifier_Node_703_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_LET_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_703 = Ast_AmbiguousIdentifier_Node_703_;
interface Ast_LIB_Node_ extends BaseTokenNode {
            token:"LIB";
            parent:Ast_AmbiguousIdentifier_Node_704;
          }
export type Ast_LIB_Node = Ast_LIB_Node_;
interface Ast_AmbiguousIdentifier_Node_704_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_LIB_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_704 = Ast_AmbiguousIdentifier_Node_704_;
interface Ast_LIKE_Node_ extends BaseTokenNode {
            token:"LIKE";
            parent:Ast_AmbiguousIdentifier_Node_705;
          }
export type Ast_LIKE_Node = Ast_LIKE_Node_;
interface Ast_AmbiguousIdentifier_Node_705_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_LIKE_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_705 = Ast_AmbiguousIdentifier_Node_705_;
interface Ast_LSET_Node_ extends BaseTokenNode {
            token:"LSET";
            parent:Ast_AmbiguousIdentifier_Node_706;
          }
export type Ast_LSET_Node = Ast_LSET_Node_;
interface Ast_AmbiguousIdentifier_Node_706_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_LSET_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_706 = Ast_AmbiguousIdentifier_Node_706_;
interface Ast_AmbiguousIdentifier_Node_707_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_MOD_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_707 = Ast_AmbiguousIdentifier_Node_707_;
interface Ast_AmbiguousIdentifier_Node_708_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_NEXT_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_708 = Ast_AmbiguousIdentifier_Node_708_;
interface Ast_AmbiguousIdentifier_Node_709_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_NEW_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_709 = Ast_AmbiguousIdentifier_Node_709_;
interface Ast_AmbiguousIdentifier_Node_710_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_NOT_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_710 = Ast_AmbiguousIdentifier_Node_710_;
interface Ast_AmbiguousIdentifier_Node_711_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_NOTHING_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_711 = Ast_AmbiguousIdentifier_Node_711_;
interface Ast_AmbiguousIdentifier_Node_712_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_NULL_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_712 = Ast_AmbiguousIdentifier_Node_712_;
interface Ast_ON_Node_ extends BaseTokenNode {
            token:"ON";
            parent:Ast_AmbiguousIdentifier_Node_713;
          }
export type Ast_ON_Node = Ast_ON_Node_;
interface Ast_AmbiguousIdentifier_Node_713_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_ON_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_713 = Ast_AmbiguousIdentifier_Node_713_;
interface Ast_AmbiguousIdentifier_Node_714_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_OPTIONAL_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_714 = Ast_AmbiguousIdentifier_Node_714_;
interface Ast_AmbiguousIdentifier_Node_715_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_OR_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_715 = Ast_AmbiguousIdentifier_Node_715_;
interface Ast_AmbiguousIdentifier_Node_716_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_PARAMARRAY_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_716 = Ast_AmbiguousIdentifier_Node_716_;
interface Ast_AmbiguousIdentifier_Node_717_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_PRESERVE_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_717 = Ast_AmbiguousIdentifier_Node_717_;
interface Ast_AmbiguousIdentifier_Node_718_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_PRIVATE_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_718 = Ast_AmbiguousIdentifier_Node_718_;
interface Ast_PTRSAFE_Node_ extends BaseTokenNode {
            token:"PTRSAFE";
            parent:Ast_AmbiguousIdentifier_Node_719;
          }
export type Ast_PTRSAFE_Node = Ast_PTRSAFE_Node_;
interface Ast_AmbiguousIdentifier_Node_719_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_PTRSAFE_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_719 = Ast_AmbiguousIdentifier_Node_719_;
interface Ast_AmbiguousIdentifier_Node_720_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_PUBLIC_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_720 = Ast_AmbiguousIdentifier_Node_720_;
interface Ast_RAISEEVENT_Node_ extends BaseTokenNode {
            token:"RAISEEVENT";
            parent:Ast_AmbiguousIdentifier_Node_721;
          }
export type Ast_RAISEEVENT_Node = Ast_RAISEEVENT_Node_;
interface Ast_AmbiguousIdentifier_Node_721_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_RAISEEVENT_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_721 = Ast_AmbiguousIdentifier_Node_721_;
interface Ast_AmbiguousIdentifier_Node_722_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_REDIM_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_722 = Ast_AmbiguousIdentifier_Node_722_;
interface Ast_RESET_Node_ extends BaseTokenNode {
            token:"RESET";
            parent:Ast_AmbiguousIdentifier_Node_723;
          }
export type Ast_RESET_Node = Ast_RESET_Node_;
interface Ast_AmbiguousIdentifier_Node_723_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_RESET_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_723 = Ast_AmbiguousIdentifier_Node_723_;
interface Ast_AmbiguousIdentifier_Node_724_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_RESUME_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_724 = Ast_AmbiguousIdentifier_Node_724_;
interface Ast_RETURN_Node_ extends BaseTokenNode {
            token:"RETURN";
            parent:Ast_AmbiguousIdentifier_Node_725;
          }
export type Ast_RETURN_Node = Ast_RETURN_Node_;
interface Ast_AmbiguousIdentifier_Node_725_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_RETURN_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_725 = Ast_AmbiguousIdentifier_Node_725_;
interface Ast_AmbiguousIdentifier_Node_726_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_SELECT_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_726 = Ast_AmbiguousIdentifier_Node_726_;
interface Ast_AmbiguousIdentifier_Node_727_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_SET_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_727 = Ast_AmbiguousIdentifier_Node_727_;
interface Ast_AmbiguousIdentifier_Node_728_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_SINGLE_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_728 = Ast_AmbiguousIdentifier_Node_728_;
interface Ast_AmbiguousIdentifier_Node_729_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_STATIC_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_729 = Ast_AmbiguousIdentifier_Node_729_;
interface Ast_AmbiguousIdentifier_Node_730_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_STEP_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_730 = Ast_AmbiguousIdentifier_Node_730_;
interface Ast_STOP_Node_ extends BaseTokenNode {
            token:"STOP";
            parent:Ast_AmbiguousIdentifier_Node_731;
          }
export type Ast_STOP_Node = Ast_STOP_Node_;
interface Ast_AmbiguousIdentifier_Node_731_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_STOP_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_731 = Ast_AmbiguousIdentifier_Node_731_;
interface Ast_AmbiguousIdentifier_Node_732_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_STRING_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_732 = Ast_AmbiguousIdentifier_Node_732_;
interface Ast_AmbiguousIdentifier_Node_733_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_SUB_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_733 = Ast_AmbiguousIdentifier_Node_733_;
interface Ast_AmbiguousIdentifier_Node_734_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_THEN_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_734 = Ast_AmbiguousIdentifier_Node_734_;
interface Ast_AmbiguousIdentifier_Node_735_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_TO_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_735 = Ast_AmbiguousIdentifier_Node_735_;
interface Ast_AmbiguousIdentifier_Node_736_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_TRUE_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_736 = Ast_AmbiguousIdentifier_Node_736_;
interface Ast_TYPEOF_Node_ extends BaseTokenNode {
            token:"TYPEOF";
            parent:Ast_AmbiguousIdentifier_Node_737;
          }
export type Ast_TYPEOF_Node = Ast_TYPEOF_Node_;
interface Ast_AmbiguousIdentifier_Node_737_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_TYPEOF_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_737 = Ast_AmbiguousIdentifier_Node_737_;
interface Ast_AmbiguousIdentifier_Node_738_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_UNTIL_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_738 = Ast_AmbiguousIdentifier_Node_738_;
interface Ast_AmbiguousIdentifier_Node_739_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_VARIANT_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_739 = Ast_AmbiguousIdentifier_Node_739_;
interface Ast_AmbiguousIdentifier_Node_740_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_WEND_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_740 = Ast_AmbiguousIdentifier_Node_740_;
interface Ast_AmbiguousIdentifier_Node_741_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_WHILE_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_741 = Ast_AmbiguousIdentifier_Node_741_;
interface Ast_AmbiguousIdentifier_Node_742_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_WITH_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_742 = Ast_AmbiguousIdentifier_Node_742_;
interface Ast_AmbiguousIdentifier_Node_743_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_WITHEVENTS_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_743 = Ast_AmbiguousIdentifier_Node_743_;
interface Ast_AmbiguousIdentifier_Node_744_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_XOR_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_744 = Ast_AmbiguousIdentifier_Node_744_;
interface Ast_IMP_Node_ extends BaseTokenNode {
            token:"IMP";
            parent:Ast_AmbiguousIdentifier_Node_745;
          }
export type Ast_IMP_Node = Ast_IMP_Node_;
interface Ast_AmbiguousIdentifier_Node_745_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_IMP_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_745 = Ast_AmbiguousIdentifier_Node_745_;
interface Ast_CertainIdentifier_Node_ extends BaseSymbolNode {
        symbol:"certainIdentifier";
        
        children:[Ast_IDENTIFIER_Node];
        parent:Ast_SubStmt_Node_40 | Ast_SubStmt_Node_41 | Ast_SubStmt_Node_42 | Ast_SubStmt_Node_43 | Ast_SubStmt_Node_44 | Ast_SubStmt_Node_45 | Ast_SubStmt_Node_46 | Ast_SubStmt_Node_47 | Ast_SubStmt_Node_48 | Ast_SubStmt_Node_49 | Ast_SubStmt_Node_50 | Ast_SubStmt_Node_51 | Ast_SubStmt_Node_52 | Ast_SubStmt_Node_53 | Ast_SubStmt_Node_54 | Ast_SubStmt_Node_55 | Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_69 | Ast_PropertyGetStmt_Node_70 | Ast_PropertyGetStmt_Node_71 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_PropertyGetStmt_Node_78 | Ast_PropertyGetStmt_Node_79 | Ast_PropertyGetStmt_Node_80 | Ast_PropertyGetStmt_Node_81 | Ast_PropertyGetStmt_Node_82 | Ast_PropertyGetStmt_Node_83 | Ast_PropertyGetStmt_Node_84 | Ast_PropertyGetStmt_Node_85 | Ast_PropertyGetStmt_Node_86 | Ast_PropertyGetStmt_Node_87 | Ast_PropertyGetStmt_Node_88 | Ast_PropertyGetStmt_Node_89 | Ast_PropertyGetStmt_Node_90 | Ast_PropertyGetStmt_Node_91 | Ast_PropertyGetStmt_Node_92 | Ast_PropertyGetStmt_Node_93 | Ast_PropertyGetStmt_Node_94 | Ast_PropertyGetStmt_Node_95 | Ast_PropertyGetStmt_Node_96 | Ast_PropertyGetStmt_Node_97 | Ast_PropertyGetStmt_Node_98 | Ast_PropertyGetStmt_Node_99 | Ast_PropertyGetStmt_Node_100 | Ast_PropertyGetStmt_Node_101 | Ast_PropertyGetStmt_Node_102 | Ast_PropertyGetStmt_Node_103 | Ast_PropertyGetStmt_Node_104 | Ast_PropertyGetStmt_Node_105 | Ast_PropertyGetStmt_Node_106 | Ast_PropertyGetStmt_Node_107 | Ast_PropertyGetStmt_Node_108 | Ast_PropertyGetStmt_Node_109 | Ast_PropertyGetStmt_Node_110 | Ast_PropertyGetStmt_Node_111 | Ast_PropertyGetStmt_Node_112 | Ast_PropertyGetStmt_Node_113 | Ast_PropertyGetStmt_Node_114 | Ast_PropertyGetStmt_Node_115 | Ast_PropertyGetStmt_Node_116 | Ast_PropertyGetStmt_Node_117 | Ast_PropertyGetStmt_Node_118 | Ast_PropertyGetStmt_Node_119 | Ast_PropertySetStmt_Node_120 | Ast_PropertySetStmt_Node_121 | Ast_PropertySetStmt_Node_122 | Ast_PropertySetStmt_Node_123 | Ast_PropertySetStmt_Node_124 | Ast_PropertySetStmt_Node_125 | Ast_PropertySetStmt_Node_126 | Ast_PropertySetStmt_Node_127 | Ast_PropertySetStmt_Node_128 | Ast_PropertySetStmt_Node_129 | Ast_PropertySetStmt_Node_130 | Ast_PropertySetStmt_Node_131 | Ast_PropertySetStmt_Node_132 | Ast_PropertySetStmt_Node_133 | Ast_PropertySetStmt_Node_134 | Ast_PropertySetStmt_Node_135 | Ast_PropertyLetStmt_Node_136 | Ast_PropertyLetStmt_Node_137 | Ast_PropertyLetStmt_Node_138 | Ast_PropertyLetStmt_Node_139 | Ast_PropertyLetStmt_Node_140 | Ast_PropertyLetStmt_Node_141 | Ast_PropertyLetStmt_Node_142 | Ast_PropertyLetStmt_Node_143 | Ast_PropertyLetStmt_Node_144 | Ast_PropertyLetStmt_Node_145 | Ast_PropertyLetStmt_Node_146 | Ast_PropertyLetStmt_Node_147 | Ast_PropertyLetStmt_Node_148 | Ast_PropertyLetStmt_Node_149 | Ast_PropertyLetStmt_Node_150 | Ast_PropertyLetStmt_Node_151 | Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_158 | Ast_FunctionStmt_Node_159 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_166 | Ast_FunctionStmt_Node_167 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_171 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_FunctionStmt_Node_174 | Ast_FunctionStmt_Node_175 | Ast_FunctionStmt_Node_176 | Ast_FunctionStmt_Node_177 | Ast_FunctionStmt_Node_178 | Ast_FunctionStmt_Node_179 | Ast_FunctionStmt_Node_180 | Ast_FunctionStmt_Node_181 | Ast_FunctionStmt_Node_182 | Ast_FunctionStmt_Node_183 | Ast_FunctionStmt_Node_184 | Ast_FunctionStmt_Node_185 | Ast_FunctionStmt_Node_186 | Ast_FunctionStmt_Node_187 | Ast_FunctionStmt_Node_188 | Ast_FunctionStmt_Node_189 | Ast_FunctionStmt_Node_190 | Ast_FunctionStmt_Node_191 | Ast_FunctionStmt_Node_192 | Ast_FunctionStmt_Node_193 | Ast_FunctionStmt_Node_194 | Ast_FunctionStmt_Node_195 | Ast_FunctionStmt_Node_196 | Ast_FunctionStmt_Node_197 | Ast_FunctionStmt_Node_198 | Ast_FunctionStmt_Node_199 | Ast_FunctionStmt_Node_200 | Ast_FunctionStmt_Node_201 | Ast_FunctionStmt_Node_202 | Ast_FunctionStmt_Node_203 | Ast_FunctionStmt_Node_204 | Ast_FunctionStmt_Node_205 | Ast_FunctionStmt_Node_206 | Ast_FunctionStmt_Node_207 | Ast_FunctionStmt_Node_208 | Ast_FunctionStmt_Node_209 | Ast_FunctionStmt_Node_210 | Ast_FunctionStmt_Node_211 | Ast_FunctionStmt_Node_212 | Ast_FunctionStmt_Node_213 | Ast_FunctionStmt_Node_214 | Ast_FunctionStmt_Node_215 | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290 | Ast_OnErrorStmt_group_def_26_Parent_Node | Ast_LineLabel_Node | Ast_ECS_ProcedureCall_Node_364 | Ast_ECS_ProcedureCall_Node_365 | Ast_ECS_ProcedureCall_Node_366 | Ast_ECS_ProcedureCall_Node_367 | Ast_ICS_B_ProcedureCall_Node_376 | Ast_ICS_B_ProcedureCall_Node_377 | Ast_ICS_B_ProcedureCall_Node_378 | Ast_ICS_B_ProcedureCall_Node_379 | Ast_VariableSubStmt_Node_402 | Ast_VariableSubStmt_Node_403 | Ast_VariableSubStmt_Node_404 | Ast_VariableSubStmt_Node_405 | Ast_VariableSubStmt_Node_406 | Ast_VariableSubStmt_Node_407 | Ast_VariableSubStmt_Node_408 | Ast_VariableSubStmt_Node_409 | Ast_ValueStmt_Node_424 | Ast_ICS_S_ProcedureOrArrayCall_Node_474 | Ast_ICS_S_ProcedureOrArrayCall_Node_475 | Ast_ICS_S_ProcedureOrArrayCall_Node_476 | Ast_ICS_S_ProcedureOrArrayCall_Node_477 | Ast_ICS_S_VariableOrProcedureCall_Node_478 | Ast_ICS_S_VariableOrProcedureCall_Node_479 | Ast_Arg_Node_501 | Ast_Arg_Node_502 | Ast_Arg_Node_503 | Ast_Arg_Node_504 | Ast_Arg_Node_505 | Ast_Arg_Node_506 | Ast_Arg_Node_507 | Ast_Arg_Node_508 | Ast_Arg_Node_509 | Ast_Arg_Node_510 | Ast_Arg_Node_511 | Ast_Arg_Node_512 | Ast_Arg_Node_513 | Ast_Arg_Node_514 | Ast_Arg_Node_515 | Ast_Arg_Node_516 | Ast_Arg_Node_517 | Ast_Arg_Node_518 | Ast_Arg_Node_519 | Ast_Arg_Node_520 | Ast_Arg_Node_521 | Ast_Arg_Node_522 | Ast_Arg_Node_523 | Ast_Arg_Node_524 | Ast_Arg_Node_525 | Ast_Arg_Node_526 | Ast_Arg_Node_527 | Ast_Arg_Node_528 | Ast_Arg_Node_529 | Ast_Arg_Node_530 | Ast_Arg_Node_531 | Ast_Arg_Node_532 | Ast_Arg_Node_533 | Ast_Arg_Node_534 | Ast_Arg_Node_535 | Ast_Arg_Node_536 | Ast_Arg_Node_537 | Ast_Arg_Node_538 | Ast_Arg_Node_539 | Ast_Arg_Node_540 | Ast_Arg_Node_541 | Ast_Arg_Node_542 | Ast_Arg_Node_543 | Ast_Arg_Node_544 | Ast_Arg_Node_545 | Ast_Arg_Node_546 | Ast_Arg_Node_547 | Ast_Arg_Node_548 | Ast_Arg_Node_549 | Ast_Arg_Node_550 | Ast_Arg_Node_551 | Ast_Arg_Node_552 | Ast_Arg_Node_553 | Ast_Arg_Node_554 | Ast_Arg_Node_555 | Ast_Arg_Node_556 | Ast_Arg_Node_557 | Ast_Arg_Node_558 | Ast_Arg_Node_559 | Ast_Arg_Node_560 | Ast_Arg_Node_561 | Ast_Arg_Node_562 | Ast_Arg_Node_563 | Ast_Arg_Node_564 | Ast_Arg_Node_565 | Ast_Arg_Node_566 | Ast_Arg_Node_567 | Ast_Arg_Node_568 | Ast_Arg_Node_569 | Ast_Arg_Node_570 | Ast_Arg_Node_571 | Ast_Arg_Node_572 | Ast_Arg_Node_573 | Ast_Arg_Node_574 | Ast_Arg_Node_575 | Ast_Arg_Node_576 | Ast_Arg_Node_577 | Ast_Arg_Node_578 | Ast_Arg_Node_579 | Ast_Arg_Node_580 | Ast_Arg_Node_581 | Ast_Arg_Node_582 | Ast_Arg_Node_583 | Ast_Arg_Node_584 | Ast_Arg_Node_585 | Ast_Arg_Node_586 | Ast_Arg_Node_587 | Ast_Arg_Node_588 | Ast_Arg_Node_589 | Ast_Arg_Node_590 | Ast_Arg_Node_591 | Ast_Arg_Node_592 | Ast_Arg_Node_593 | Ast_Arg_Node_594 | Ast_Arg_Node_595 | Ast_Arg_Node_596 | Ast_Arg_Node_597 | Ast_Arg_Node_598 | Ast_Arg_Node_599 | Ast_Arg_Node_600 | Ast_Arg_Node_601 | Ast_Arg_Node_602 | Ast_Arg_Node_603 | Ast_Arg_Node_604 | Ast_Arg_Node_605 | Ast_Arg_Node_606 | Ast_Arg_Node_607 | Ast_Arg_Node_608 | Ast_Arg_Node_609 | Ast_Arg_Node_610 | Ast_Arg_Node_611 | Ast_Arg_Node_612 | Ast_Arg_Node_613 | Ast_Arg_Node_614 | Ast_Arg_Node_615 | Ast_Arg_Node_616 | Ast_Arg_Node_617 | Ast_Arg_Node_618 | Ast_Arg_Node_619 | Ast_Arg_Node_620 | Ast_Arg_Node_621 | Ast_Arg_Node_622 | Ast_Arg_Node_623 | Ast_Arg_Node_624 | Ast_Arg_Node_625 | Ast_Arg_Node_626 | Ast_Arg_Node_627 | Ast_Arg_Node_628 | Ast_ComplexType_Node;
      }
type Ast_CertainIdentifier_Node = Ast_CertainIdentifier_Node_;
interface Ast_AmbiguousIdentifier_Node_747_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[Ast_IDENTIFIER_Node];
        parent:Ast_ResumeStmt_Node | Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_281 | Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_289 | Ast_GoToStmt_Node | Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363 | Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375 | Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473 | Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481 | Ast_ComplexType_group_def_98_Parent_Node;
      }
type Ast_AmbiguousIdentifier_Node_747 = Ast_AmbiguousIdentifier_Node_747_;
export type Ast_Progam_Node = Ast_Progam_Node_0 | Ast_Progam_Node_1 | Ast_Progam_Node_2 | Ast_Progam_Node_3 | Ast_Progam_Node_4 | Ast_Progam_Node_5 | Ast_Progam_Node_6 | Ast_Progam_Node_7;
export type Ast_EndOfLine_Node = Ast_EndOfLine_Node_8 | Ast_EndOfLine_Node_9 | Ast_EndOfLine_Node_10;
type Ast_EndOfStatement_group_1_Node = Ast_EndOfStatement_group_1_Node_12 | Ast_EndOfStatement_group_1_Node_14;
export type { Ast_EndOfStatement_Node };
export type { Ast_ModuleAttributes_Node };
export type { Ast_AttributeStmt_Node };
export type { Ast_ModuleDeclarations_Node };
export type Ast_ModuleDeclarationsElement_Node = Ast_ModuleDeclarationsElement_Node_22 | Ast_ModuleDeclarationsElement_Node_23 | Ast_ModuleDeclarationsElement_Node_24;
export type Ast_ModuleOption_Node = Ast_ModuleOption_Node_25 | Ast_ModuleOption_Node_26 | Ast_ModuleOption_Node_27 | Ast_ModuleOption_Node_28;
export type { Ast_ModuleBody_Node };
export type Ast_ModuleBodyElement_Node = Ast_ModuleBodyElement_Node_31 | Ast_ModuleBodyElement_Node_32 | Ast_ModuleBodyElement_Node_33 | Ast_ModuleBodyElement_Node_34 | Ast_ModuleBodyElement_Node_35;
export type Ast_Visibility_Node = Ast_Visibility_Node_36 | Ast_Visibility_Node_37 | Ast_Visibility_Node_38 | Ast_Visibility_Node_39;
export type Ast_SubStmt_Node = Ast_SubStmt_Node_40 | Ast_SubStmt_Node_41 | Ast_SubStmt_Node_42 | Ast_SubStmt_Node_43 | Ast_SubStmt_Node_44 | Ast_SubStmt_Node_45 | Ast_SubStmt_Node_46 | Ast_SubStmt_Node_47 | Ast_SubStmt_Node_48 | Ast_SubStmt_Node_49 | Ast_SubStmt_Node_50 | Ast_SubStmt_Node_51 | Ast_SubStmt_Node_52 | Ast_SubStmt_Node_53 | Ast_SubStmt_Node_54 | Ast_SubStmt_Node_55;
export type Ast_PropertyGetStmt_Node = Ast_PropertyGetStmt_Node_56 | Ast_PropertyGetStmt_Node_57 | Ast_PropertyGetStmt_Node_58 | Ast_PropertyGetStmt_Node_59 | Ast_PropertyGetStmt_Node_60 | Ast_PropertyGetStmt_Node_61 | Ast_PropertyGetStmt_Node_62 | Ast_PropertyGetStmt_Node_63 | Ast_PropertyGetStmt_Node_64 | Ast_PropertyGetStmt_Node_65 | Ast_PropertyGetStmt_Node_66 | Ast_PropertyGetStmt_Node_67 | Ast_PropertyGetStmt_Node_68 | Ast_PropertyGetStmt_Node_69 | Ast_PropertyGetStmt_Node_70 | Ast_PropertyGetStmt_Node_71 | Ast_PropertyGetStmt_Node_72 | Ast_PropertyGetStmt_Node_73 | Ast_PropertyGetStmt_Node_74 | Ast_PropertyGetStmt_Node_75 | Ast_PropertyGetStmt_Node_76 | Ast_PropertyGetStmt_Node_77 | Ast_PropertyGetStmt_Node_78 | Ast_PropertyGetStmt_Node_79 | Ast_PropertyGetStmt_Node_80 | Ast_PropertyGetStmt_Node_81 | Ast_PropertyGetStmt_Node_82 | Ast_PropertyGetStmt_Node_83 | Ast_PropertyGetStmt_Node_84 | Ast_PropertyGetStmt_Node_85 | Ast_PropertyGetStmt_Node_86 | Ast_PropertyGetStmt_Node_87 | Ast_PropertyGetStmt_Node_88 | Ast_PropertyGetStmt_Node_89 | Ast_PropertyGetStmt_Node_90 | Ast_PropertyGetStmt_Node_91 | Ast_PropertyGetStmt_Node_92 | Ast_PropertyGetStmt_Node_93 | Ast_PropertyGetStmt_Node_94 | Ast_PropertyGetStmt_Node_95 | Ast_PropertyGetStmt_Node_96 | Ast_PropertyGetStmt_Node_97 | Ast_PropertyGetStmt_Node_98 | Ast_PropertyGetStmt_Node_99 | Ast_PropertyGetStmt_Node_100 | Ast_PropertyGetStmt_Node_101 | Ast_PropertyGetStmt_Node_102 | Ast_PropertyGetStmt_Node_103 | Ast_PropertyGetStmt_Node_104 | Ast_PropertyGetStmt_Node_105 | Ast_PropertyGetStmt_Node_106 | Ast_PropertyGetStmt_Node_107 | Ast_PropertyGetStmt_Node_108 | Ast_PropertyGetStmt_Node_109 | Ast_PropertyGetStmt_Node_110 | Ast_PropertyGetStmt_Node_111 | Ast_PropertyGetStmt_Node_112 | Ast_PropertyGetStmt_Node_113 | Ast_PropertyGetStmt_Node_114 | Ast_PropertyGetStmt_Node_115 | Ast_PropertyGetStmt_Node_116 | Ast_PropertyGetStmt_Node_117 | Ast_PropertyGetStmt_Node_118 | Ast_PropertyGetStmt_Node_119;
export type Ast_PropertySetStmt_Node = Ast_PropertySetStmt_Node_120 | Ast_PropertySetStmt_Node_121 | Ast_PropertySetStmt_Node_122 | Ast_PropertySetStmt_Node_123 | Ast_PropertySetStmt_Node_124 | Ast_PropertySetStmt_Node_125 | Ast_PropertySetStmt_Node_126 | Ast_PropertySetStmt_Node_127 | Ast_PropertySetStmt_Node_128 | Ast_PropertySetStmt_Node_129 | Ast_PropertySetStmt_Node_130 | Ast_PropertySetStmt_Node_131 | Ast_PropertySetStmt_Node_132 | Ast_PropertySetStmt_Node_133 | Ast_PropertySetStmt_Node_134 | Ast_PropertySetStmt_Node_135;
export type Ast_PropertyLetStmt_Node = Ast_PropertyLetStmt_Node_136 | Ast_PropertyLetStmt_Node_137 | Ast_PropertyLetStmt_Node_138 | Ast_PropertyLetStmt_Node_139 | Ast_PropertyLetStmt_Node_140 | Ast_PropertyLetStmt_Node_141 | Ast_PropertyLetStmt_Node_142 | Ast_PropertyLetStmt_Node_143 | Ast_PropertyLetStmt_Node_144 | Ast_PropertyLetStmt_Node_145 | Ast_PropertyLetStmt_Node_146 | Ast_PropertyLetStmt_Node_147 | Ast_PropertyLetStmt_Node_148 | Ast_PropertyLetStmt_Node_149 | Ast_PropertyLetStmt_Node_150 | Ast_PropertyLetStmt_Node_151;
export type Ast_FunctionStmt_Node = Ast_FunctionStmt_Node_152 | Ast_FunctionStmt_Node_153 | Ast_FunctionStmt_Node_154 | Ast_FunctionStmt_Node_155 | Ast_FunctionStmt_Node_156 | Ast_FunctionStmt_Node_157 | Ast_FunctionStmt_Node_158 | Ast_FunctionStmt_Node_159 | Ast_FunctionStmt_Node_160 | Ast_FunctionStmt_Node_161 | Ast_FunctionStmt_Node_162 | Ast_FunctionStmt_Node_163 | Ast_FunctionStmt_Node_164 | Ast_FunctionStmt_Node_165 | Ast_FunctionStmt_Node_166 | Ast_FunctionStmt_Node_167 | Ast_FunctionStmt_Node_168 | Ast_FunctionStmt_Node_169 | Ast_FunctionStmt_Node_170 | Ast_FunctionStmt_Node_171 | Ast_FunctionStmt_Node_172 | Ast_FunctionStmt_Node_173 | Ast_FunctionStmt_Node_174 | Ast_FunctionStmt_Node_175 | Ast_FunctionStmt_Node_176 | Ast_FunctionStmt_Node_177 | Ast_FunctionStmt_Node_178 | Ast_FunctionStmt_Node_179 | Ast_FunctionStmt_Node_180 | Ast_FunctionStmt_Node_181 | Ast_FunctionStmt_Node_182 | Ast_FunctionStmt_Node_183 | Ast_FunctionStmt_Node_184 | Ast_FunctionStmt_Node_185 | Ast_FunctionStmt_Node_186 | Ast_FunctionStmt_Node_187 | Ast_FunctionStmt_Node_188 | Ast_FunctionStmt_Node_189 | Ast_FunctionStmt_Node_190 | Ast_FunctionStmt_Node_191 | Ast_FunctionStmt_Node_192 | Ast_FunctionStmt_Node_193 | Ast_FunctionStmt_Node_194 | Ast_FunctionStmt_Node_195 | Ast_FunctionStmt_Node_196 | Ast_FunctionStmt_Node_197 | Ast_FunctionStmt_Node_198 | Ast_FunctionStmt_Node_199 | Ast_FunctionStmt_Node_200 | Ast_FunctionStmt_Node_201 | Ast_FunctionStmt_Node_202 | Ast_FunctionStmt_Node_203 | Ast_FunctionStmt_Node_204 | Ast_FunctionStmt_Node_205 | Ast_FunctionStmt_Node_206 | Ast_FunctionStmt_Node_207 | Ast_FunctionStmt_Node_208 | Ast_FunctionStmt_Node_209 | Ast_FunctionStmt_Node_210 | Ast_FunctionStmt_Node_211 | Ast_FunctionStmt_Node_212 | Ast_FunctionStmt_Node_213 | Ast_FunctionStmt_Node_214 | Ast_FunctionStmt_Node_215;
export type { Ast_Block_Node };
export type Ast_BlockStmt_Node = Ast_BlockStmt_Node_218 | Ast_BlockStmt_Node_219 | Ast_BlockStmt_Node_220 | Ast_BlockStmt_Node_221 | Ast_BlockStmt_Node_222 | Ast_BlockStmt_Node_223 | Ast_BlockStmt_Node_224 | Ast_BlockStmt_Node_225 | Ast_BlockStmt_Node_226 | Ast_BlockStmt_Node_227 | Ast_BlockStmt_Node_228 | Ast_BlockStmt_Node_229 | Ast_BlockStmt_Node_230 | Ast_BlockStmt_Node_231 | Ast_BlockStmt_Node_232 | Ast_BlockStmt_Node_233 | Ast_BlockStmt_Node_234 | Ast_BlockStmt_Node_235 | Ast_BlockStmt_Node_236 | Ast_BlockStmt_Node_237 | Ast_BlockStmt_Node_238;
export type { Ast_ResumeStmt_Node };
export type { Ast_WhileWendStmt_Node };
export type Ast_DoLoopStmt_Node = Ast_DoLoopStmt_Node_241 | Ast_DoLoopStmt_Node_246 | Ast_DoLoopStmt_Node_249;
type Ast_DoLoopStmt_group_14_Node = Ast_DoLoopStmt_group_14_Node_243 | Ast_DoLoopStmt_group_14_Node_245;
type Ast_DoLoopStmt_group_17_Node = Ast_DoLoopStmt_group_17_Node_247 | Ast_DoLoopStmt_group_17_Node_248;
export type Ast_ForNextStmt_Node = Ast_ForNextStmt_Node_251 | Ast_ForNextStmt_Node_252 | Ast_ForNextStmt_Node_253 | Ast_ForNextStmt_Node_254 | Ast_ForNextStmt_Node_255 | Ast_ForNextStmt_Node_256 | Ast_ForNextStmt_Node_257 | Ast_ForNextStmt_Node_258 | Ast_ForNextStmt_Node_259 | Ast_ForNextStmt_Node_260 | Ast_ForNextStmt_Node_261 | Ast_ForNextStmt_Node_262 | Ast_ForNextStmt_Node_263 | Ast_ForNextStmt_Node_264 | Ast_ForNextStmt_Node_265 | Ast_ForNextStmt_Node_266 | Ast_ForNextStmt_Node_267 | Ast_ForNextStmt_Node_268 | Ast_ForNextStmt_Node_269 | Ast_ForNextStmt_Node_270 | Ast_ForNextStmt_Node_271 | Ast_ForNextStmt_Node_272 | Ast_ForNextStmt_Node_273 | Ast_ForNextStmt_Node_274 | Ast_ForNextStmt_Node_275 | Ast_ForNextStmt_Node_276 | Ast_ForNextStmt_Node_277 | Ast_ForNextStmt_Node_278 | Ast_ForNextStmt_Node_279 | Ast_ForNextStmt_Node_280 | Ast_ForNextStmt_Node_281 | Ast_ForNextStmt_Node_282;
export type Ast_ForEachStmt_Node = Ast_ForEachStmt_Node_283 | Ast_ForEachStmt_Node_284 | Ast_ForEachStmt_Node_285 | Ast_ForEachStmt_Node_286 | Ast_ForEachStmt_Node_287 | Ast_ForEachStmt_Node_288 | Ast_ForEachStmt_Node_289 | Ast_ForEachStmt_Node_290;
export type { Ast_SelectCaseStmt_Node };
export type Ast_SC_Selection_Node = Ast_SC_Selection_Node_292 | Ast_SC_Selection_Node_293 | Ast_SC_Selection_Node_294;
export type Ast_SC_Case_Node = Ast_SC_Case_Node_295 | Ast_SC_Case_Node_296;
export type Ast_SC_Cond_Node = Ast_SC_Cond_Node_297 | Ast_SC_Cond_Node_299;
export type Ast_ComparisonOperator_Node = Ast_ComparisonOperator_Node_300 | Ast_ComparisonOperator_Node_301 | Ast_ComparisonOperator_Node_302 | Ast_ComparisonOperator_Node_303 | Ast_ComparisonOperator_Node_304 | Ast_ComparisonOperator_Node_305 | Ast_ComparisonOperator_Node_306;
export type Ast_IfThenElseStmt_Node = Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309 | Ast_IfThenElseStmt_Node_310 | Ast_IfThenElseStmt_Node_311;
export type Ast_IfBlockStmt_Node = Ast_IfBlockStmt_Node_312 | Ast_IfBlockStmt_Node_313;
export type Ast_IfElseIfBlockStmt_Node = Ast_IfElseIfBlockStmt_Node_314 | Ast_IfElseIfBlockStmt_Node_315;
export type Ast_IfElseBlockStmt_Node = Ast_IfElseBlockStmt_Node_316 | Ast_IfElseBlockStmt_Node_317;
type Ast_OnErrorStmt_group_25_Node = Ast_OnErrorStmt_group_25_Node_319 | Ast_OnErrorStmt_group_25_Node_321;
type Ast_OnErrorStmt_group_24_Node = Ast_OnErrorStmt_group_24_Node_323 | Ast_OnErrorStmt_group_24_Node_325;
export type { Ast_OnErrorStmt_Node };
export type { Ast_LineLabel_Node };
export type { Ast_GoToStmt_Node };
export type { Ast_EraseStmt_Node };
export type Ast_RedimStmt_Node = Ast_RedimStmt_Node_332 | Ast_RedimStmt_Node_333;
export type Ast_RedimSubStmt_Node = Ast_RedimSubStmt_Node_334 | Ast_RedimSubStmt_Node_335;
export type Ast_ExitStmt_Node = Ast_ExitStmt_Node_336 | Ast_ExitStmt_Node_337 | Ast_ExitStmt_Node_338 | Ast_ExitStmt_Node_339 | Ast_ExitStmt_Node_340 | Ast_ExitStmt_Node_341;
type Ast_LetStmt_group_34_Node = Ast_LetStmt_group_34_Node_343 | Ast_LetStmt_group_34_Node_345 | Ast_LetStmt_group_34_Node_347;
export type Ast_LetStmt_Node = Ast_LetStmt_Node_348 | Ast_LetStmt_Node_349;
export type { Ast_SetStmt_Node };
export type Ast_ExplicitCallStmt_Node = Ast_ExplicitCallStmt_Node_351 | Ast_ExplicitCallStmt_Node_352;
type Ast_ECS_MemberProcedureCall_group_def_39_Node = Ast_ECS_MemberProcedureCall_group_def_39_Node_353 | Ast_ECS_MemberProcedureCall_group_def_39_Node_354;
type Ast_ECS_MemberProcedureCall_group_38_Node = Ast_ECS_MemberProcedureCall_group_38_Node_355 | Ast_ECS_MemberProcedureCall_group_38_Node_357;
export type Ast_ECS_MemberProcedureCall_Node = Ast_ECS_MemberProcedureCall_Node_360 | Ast_ECS_MemberProcedureCall_Node_361 | Ast_ECS_MemberProcedureCall_Node_362 | Ast_ECS_MemberProcedureCall_Node_363;
export type Ast_ECS_ProcedureCall_Node = Ast_ECS_ProcedureCall_Node_364 | Ast_ECS_ProcedureCall_Node_365 | Ast_ECS_ProcedureCall_Node_366 | Ast_ECS_ProcedureCall_Node_367;
export type Ast_ImplicitCallStmt_InBlock_Node = Ast_ImplicitCallStmt_InBlock_Node_368 | Ast_ImplicitCallStmt_InBlock_Node_369;
type Ast_ICS_B_MemberProcedureCall_group_47_Node = Ast_ICS_B_MemberProcedureCall_group_47_Node_370 | Ast_ICS_B_MemberProcedureCall_group_47_Node_371;
export type Ast_ICS_B_MemberProcedureCall_Node = Ast_ICS_B_MemberProcedureCall_Node_372 | Ast_ICS_B_MemberProcedureCall_Node_373 | Ast_ICS_B_MemberProcedureCall_Node_374 | Ast_ICS_B_MemberProcedureCall_Node_375;
export type Ast_ICS_B_ProcedureCall_Node = Ast_ICS_B_ProcedureCall_Node_376 | Ast_ICS_B_ProcedureCall_Node_377 | Ast_ICS_B_ProcedureCall_Node_378 | Ast_ICS_B_ProcedureCall_Node_379;
type Ast_ArgsCall_group_def_51_Node = Ast_ArgsCall_group_def_51_Node_380 | Ast_ArgsCall_group_def_51_Node_381;
export type { Ast_ArgsCall_Node };
export type { Ast_ArgCall_Node };
type Ast_VariableStmt_group_52_Node = Ast_VariableStmt_group_52_Node_385 | Ast_VariableStmt_group_52_Node_387 | Ast_VariableStmt_group_52_Node_389;
export type Ast_VariableStmt_Node = Ast_VariableStmt_Node_390 | Ast_VariableStmt_Node_391;
type Ast_WithStmt_group_56_Node = Ast_WithStmt_group_56_Node_393 | Ast_WithStmt_group_56_Node_395;
export type Ast_WithStmt_Node = Ast_WithStmt_Node_396 | Ast_WithStmt_Node_397;
export type { Ast_VariableListStmt_Node };
type Ast_VariableSubStmt_group_def_62_Node = Ast_VariableSubStmt_group_def_62_Node_400 | Ast_VariableSubStmt_group_def_62_Node_401;
export type Ast_VariableSubStmt_Node = Ast_VariableSubStmt_Node_402 | Ast_VariableSubStmt_Node_403 | Ast_VariableSubStmt_Node_404 | Ast_VariableSubStmt_Node_405 | Ast_VariableSubStmt_Node_406 | Ast_VariableSubStmt_Node_407 | Ast_VariableSubStmt_Node_408 | Ast_VariableSubStmt_Node_409;
export type { Ast_Indexes_Node };
export type Ast_Subscript__Node = Ast_Subscript__Node_412 | Ast_Subscript__Node_413 | Ast_Subscript__Node_416 | Ast_Subscript__Node_417;
export type { Ast_Subscripts_Node };
export type Ast_ArgList_Node = Ast_ArgList_Node_420 | Ast_ArgList_Node_421;
export type Ast_ValueStmt_Node = Ast_ValueStmt_Node_422 | Ast_ValueStmt_Node_423 | Ast_ValueStmt_Node_424 | Ast_ValueStmt_Node_425 | Ast_ValueStmt_Node_426 | Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445 | Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448;
export type Ast_ImplicitCallStmt_InStmt_Node = Ast_ImplicitCallStmt_InStmt_Node_449 | Ast_ImplicitCallStmt_InStmt_Node_450 | Ast_ImplicitCallStmt_InStmt_Node_451;
type Ast_ICS_S_MembersCall_group_74_Node = Ast_ICS_S_MembersCall_group_74_Node_453 | Ast_ICS_S_MembersCall_group_74_Node_455;
type Ast_ICS_S_MembersCall_group_def_77_Node = Ast_ICS_S_MembersCall_group_def_77_Node_456 | Ast_ICS_S_MembersCall_group_def_77_Node_457;
type Ast_ICS_S_MembersCall_group_73_Node = Ast_ICS_S_MembersCall_group_73_Node_458 | Ast_ICS_S_MembersCall_group_73_Node_460;
export type { Ast_ICS_S_MembersCall_Node };
type Ast_ICS_S_MemberCall_group_80_Node = Ast_ICS_S_MemberCall_group_80_Node_463 | Ast_ICS_S_MemberCall_group_80_Node_465;
export type { Ast_ICS_S_MemberCall_Node };
type Ast_ICS_S_SpaceMemberCall_group_83_Node = Ast_ICS_S_SpaceMemberCall_group_83_Node_467 | Ast_ICS_S_SpaceMemberCall_group_83_Node_468;
export type { Ast_ICS_S_SpaceMemberCall_Node };
export type Ast_MCS_S_ProcedureOrArrayCall_Node = Ast_MCS_S_ProcedureOrArrayCall_Node_470 | Ast_MCS_S_ProcedureOrArrayCall_Node_471 | Ast_MCS_S_ProcedureOrArrayCall_Node_472 | Ast_MCS_S_ProcedureOrArrayCall_Node_473;
export type Ast_ICS_S_ProcedureOrArrayCall_Node = Ast_ICS_S_ProcedureOrArrayCall_Node_474 | Ast_ICS_S_ProcedureOrArrayCall_Node_475 | Ast_ICS_S_ProcedureOrArrayCall_Node_476 | Ast_ICS_S_ProcedureOrArrayCall_Node_477;
export type Ast_ICS_S_VariableOrProcedureCall_Node = Ast_ICS_S_VariableOrProcedureCall_Node_478 | Ast_ICS_S_VariableOrProcedureCall_Node_479;
export type Ast_MCS_S_VariableOrProcedureCall_Node = Ast_MCS_S_VariableOrProcedureCall_Node_480 | Ast_MCS_S_VariableOrProcedureCall_Node_481;
export type Ast_Literal_Node = Ast_Literal_Node_482 | Ast_Literal_Node_483 | Ast_Literal_Node_484 | Ast_Literal_Node_485 | Ast_Literal_Node_486 | Ast_Literal_Node_487 | Ast_Literal_Node_488 | Ast_Literal_Node_489;
export type Ast_TypeHint_Node = Ast_TypeHint_Node_490 | Ast_TypeHint_Node_491 | Ast_TypeHint_Node_492 | Ast_TypeHint_Node_493 | Ast_TypeHint_Node_494 | Ast_TypeHint_Node_495;
type Ast_Arg_group_88_Node = Ast_Arg_group_88_Node_497 | Ast_Arg_group_88_Node_499;
export type Ast_Arg_Node = Ast_Arg_Node_501 | Ast_Arg_Node_502 | Ast_Arg_Node_503 | Ast_Arg_Node_504 | Ast_Arg_Node_505 | Ast_Arg_Node_506 | Ast_Arg_Node_507 | Ast_Arg_Node_508 | Ast_Arg_Node_509 | Ast_Arg_Node_510 | Ast_Arg_Node_511 | Ast_Arg_Node_512 | Ast_Arg_Node_513 | Ast_Arg_Node_514 | Ast_Arg_Node_515 | Ast_Arg_Node_516 | Ast_Arg_Node_517 | Ast_Arg_Node_518 | Ast_Arg_Node_519 | Ast_Arg_Node_520 | Ast_Arg_Node_521 | Ast_Arg_Node_522 | Ast_Arg_Node_523 | Ast_Arg_Node_524 | Ast_Arg_Node_525 | Ast_Arg_Node_526 | Ast_Arg_Node_527 | Ast_Arg_Node_528 | Ast_Arg_Node_529 | Ast_Arg_Node_530 | Ast_Arg_Node_531 | Ast_Arg_Node_532 | Ast_Arg_Node_533 | Ast_Arg_Node_534 | Ast_Arg_Node_535 | Ast_Arg_Node_536 | Ast_Arg_Node_537 | Ast_Arg_Node_538 | Ast_Arg_Node_539 | Ast_Arg_Node_540 | Ast_Arg_Node_541 | Ast_Arg_Node_542 | Ast_Arg_Node_543 | Ast_Arg_Node_544 | Ast_Arg_Node_545 | Ast_Arg_Node_546 | Ast_Arg_Node_547 | Ast_Arg_Node_548 | Ast_Arg_Node_549 | Ast_Arg_Node_550 | Ast_Arg_Node_551 | Ast_Arg_Node_552 | Ast_Arg_Node_553 | Ast_Arg_Node_554 | Ast_Arg_Node_555 | Ast_Arg_Node_556 | Ast_Arg_Node_557 | Ast_Arg_Node_558 | Ast_Arg_Node_559 | Ast_Arg_Node_560 | Ast_Arg_Node_561 | Ast_Arg_Node_562 | Ast_Arg_Node_563 | Ast_Arg_Node_564 | Ast_Arg_Node_565 | Ast_Arg_Node_566 | Ast_Arg_Node_567 | Ast_Arg_Node_568 | Ast_Arg_Node_569 | Ast_Arg_Node_570 | Ast_Arg_Node_571 | Ast_Arg_Node_572 | Ast_Arg_Node_573 | Ast_Arg_Node_574 | Ast_Arg_Node_575 | Ast_Arg_Node_576 | Ast_Arg_Node_577 | Ast_Arg_Node_578 | Ast_Arg_Node_579 | Ast_Arg_Node_580 | Ast_Arg_Node_581 | Ast_Arg_Node_582 | Ast_Arg_Node_583 | Ast_Arg_Node_584 | Ast_Arg_Node_585 | Ast_Arg_Node_586 | Ast_Arg_Node_587 | Ast_Arg_Node_588 | Ast_Arg_Node_589 | Ast_Arg_Node_590 | Ast_Arg_Node_591 | Ast_Arg_Node_592 | Ast_Arg_Node_593 | Ast_Arg_Node_594 | Ast_Arg_Node_595 | Ast_Arg_Node_596 | Ast_Arg_Node_597 | Ast_Arg_Node_598 | Ast_Arg_Node_599 | Ast_Arg_Node_600 | Ast_Arg_Node_601 | Ast_Arg_Node_602 | Ast_Arg_Node_603 | Ast_Arg_Node_604 | Ast_Arg_Node_605 | Ast_Arg_Node_606 | Ast_Arg_Node_607 | Ast_Arg_Node_608 | Ast_Arg_Node_609 | Ast_Arg_Node_610 | Ast_Arg_Node_611 | Ast_Arg_Node_612 | Ast_Arg_Node_613 | Ast_Arg_Node_614 | Ast_Arg_Node_615 | Ast_Arg_Node_616 | Ast_Arg_Node_617 | Ast_Arg_Node_618 | Ast_Arg_Node_619 | Ast_Arg_Node_620 | Ast_Arg_Node_621 | Ast_Arg_Node_622 | Ast_Arg_Node_623 | Ast_Arg_Node_624 | Ast_Arg_Node_625 | Ast_Arg_Node_626 | Ast_Arg_Node_627 | Ast_Arg_Node_628;
export type { Ast_ArgDefaultValue_Node };
export type Ast_AsTypeClause_Node = Ast_AsTypeClause_Node_630 | Ast_AsTypeClause_Node_631;
type Ast_Type__group_93_Node = Ast_Type__group_93_Node_633 | Ast_Type__group_93_Node_635;
export type Ast_Type__Node = Ast_Type__Node_636 | Ast_Type__Node_637;
export type { Ast_ComplexType_Node };
export type Ast_BaseType_Node = Ast_BaseType_Node_640 | Ast_BaseType_Node_641 | Ast_BaseType_Node_642 | Ast_BaseType_Node_643 | Ast_BaseType_Node_644 | Ast_BaseType_Node_645 | Ast_BaseType_Node_646 | Ast_BaseType_Node_647 | Ast_BaseType_Node_648;
export type Ast_AmbiguousIdentifier_Node = Ast_AmbiguousIdentifier_Node_649 | Ast_AmbiguousIdentifier_Node_650 | Ast_AmbiguousIdentifier_Node_651 | Ast_AmbiguousIdentifier_Node_652 | Ast_AmbiguousIdentifier_Node_653 | Ast_AmbiguousIdentifier_Node_654 | Ast_AmbiguousIdentifier_Node_655 | Ast_AmbiguousIdentifier_Node_656 | Ast_AmbiguousIdentifier_Node_657 | Ast_AmbiguousIdentifier_Node_658 | Ast_AmbiguousIdentifier_Node_659 | Ast_AmbiguousIdentifier_Node_660 | Ast_AmbiguousIdentifier_Node_661 | Ast_AmbiguousIdentifier_Node_662 | Ast_AmbiguousIdentifier_Node_663 | Ast_AmbiguousIdentifier_Node_664 | Ast_AmbiguousIdentifier_Node_665 | Ast_AmbiguousIdentifier_Node_666 | Ast_AmbiguousIdentifier_Node_667 | Ast_AmbiguousIdentifier_Node_668 | Ast_AmbiguousIdentifier_Node_669 | Ast_AmbiguousIdentifier_Node_670 | Ast_AmbiguousIdentifier_Node_671 | Ast_AmbiguousIdentifier_Node_672 | Ast_AmbiguousIdentifier_Node_673 | Ast_AmbiguousIdentifier_Node_674 | Ast_AmbiguousIdentifier_Node_675 | Ast_AmbiguousIdentifier_Node_676 | Ast_AmbiguousIdentifier_Node_677 | Ast_AmbiguousIdentifier_Node_678 | Ast_AmbiguousIdentifier_Node_679 | Ast_AmbiguousIdentifier_Node_680 | Ast_AmbiguousIdentifier_Node_681 | Ast_AmbiguousIdentifier_Node_682 | Ast_AmbiguousIdentifier_Node_683 | Ast_AmbiguousIdentifier_Node_684 | Ast_AmbiguousIdentifier_Node_685 | Ast_AmbiguousIdentifier_Node_686 | Ast_AmbiguousIdentifier_Node_687 | Ast_AmbiguousIdentifier_Node_688 | Ast_AmbiguousIdentifier_Node_689 | Ast_AmbiguousIdentifier_Node_690 | Ast_AmbiguousIdentifier_Node_691 | Ast_AmbiguousIdentifier_Node_692 | Ast_AmbiguousIdentifier_Node_693 | Ast_AmbiguousIdentifier_Node_694 | Ast_AmbiguousIdentifier_Node_695 | Ast_AmbiguousIdentifier_Node_696 | Ast_AmbiguousIdentifier_Node_697 | Ast_AmbiguousIdentifier_Node_698 | Ast_AmbiguousIdentifier_Node_699 | Ast_AmbiguousIdentifier_Node_700 | Ast_AmbiguousIdentifier_Node_701 | Ast_AmbiguousIdentifier_Node_702 | Ast_AmbiguousIdentifier_Node_703 | Ast_AmbiguousIdentifier_Node_704 | Ast_AmbiguousIdentifier_Node_705 | Ast_AmbiguousIdentifier_Node_706 | Ast_AmbiguousIdentifier_Node_707 | Ast_AmbiguousIdentifier_Node_708 | Ast_AmbiguousIdentifier_Node_709 | Ast_AmbiguousIdentifier_Node_710 | Ast_AmbiguousIdentifier_Node_711 | Ast_AmbiguousIdentifier_Node_712 | Ast_AmbiguousIdentifier_Node_713 | Ast_AmbiguousIdentifier_Node_714 | Ast_AmbiguousIdentifier_Node_715 | Ast_AmbiguousIdentifier_Node_716 | Ast_AmbiguousIdentifier_Node_717 | Ast_AmbiguousIdentifier_Node_718 | Ast_AmbiguousIdentifier_Node_719 | Ast_AmbiguousIdentifier_Node_720 | Ast_AmbiguousIdentifier_Node_721 | Ast_AmbiguousIdentifier_Node_722 | Ast_AmbiguousIdentifier_Node_723 | Ast_AmbiguousIdentifier_Node_724 | Ast_AmbiguousIdentifier_Node_725 | Ast_AmbiguousIdentifier_Node_726 | Ast_AmbiguousIdentifier_Node_727 | Ast_AmbiguousIdentifier_Node_728 | Ast_AmbiguousIdentifier_Node_729 | Ast_AmbiguousIdentifier_Node_730 | Ast_AmbiguousIdentifier_Node_731 | Ast_AmbiguousIdentifier_Node_732 | Ast_AmbiguousIdentifier_Node_733 | Ast_AmbiguousIdentifier_Node_734 | Ast_AmbiguousIdentifier_Node_735 | Ast_AmbiguousIdentifier_Node_736 | Ast_AmbiguousIdentifier_Node_737 | Ast_AmbiguousIdentifier_Node_738 | Ast_AmbiguousIdentifier_Node_739 | Ast_AmbiguousIdentifier_Node_740 | Ast_AmbiguousIdentifier_Node_741 | Ast_AmbiguousIdentifier_Node_742 | Ast_AmbiguousIdentifier_Node_743 | Ast_AmbiguousIdentifier_Node_744 | Ast_AmbiguousIdentifier_Node_745 | Ast_AmbiguousIdentifier_Node_747;
export type { Ast_CertainIdentifier_Node };
export type Ast_CaseCondIs_Node = Ast_SC_Selection_Node_292;
export type Ast_CaseCondTo_Node = Ast_SC_Selection_Node_293;
export type Ast_CaseCondValue_Node = Ast_SC_Selection_Node_294;
export type Ast_CaseCondElse_Node = Ast_SC_Cond_Node_297;
export type Ast_CaseCondSelection_Node = Ast_SC_Cond_Node_299;
export type Ast_InlineIfThenElse_Node = Ast_IfThenElseStmt_Node_308 | Ast_IfThenElseStmt_Node_309;
export type Ast_BlockIfThenElse_Node = Ast_IfThenElseStmt_Node_310 | Ast_IfThenElseStmt_Node_311;
export type Ast_AtomExpression_Node = Ast_ValueStmt_Node_426;
export type Ast_BinaryExpression_Node = Ast_ValueStmt_Node_427 | Ast_ValueStmt_Node_428 | Ast_ValueStmt_Node_429 | Ast_ValueStmt_Node_430 | Ast_ValueStmt_Node_431 | Ast_ValueStmt_Node_432 | Ast_ValueStmt_Node_433 | Ast_ValueStmt_Node_434 | Ast_ValueStmt_Node_435 | Ast_ValueStmt_Node_436 | Ast_ValueStmt_Node_437 | Ast_ValueStmt_Node_438 | Ast_ValueStmt_Node_439 | Ast_ValueStmt_Node_440 | Ast_ValueStmt_Node_441 | Ast_ValueStmt_Node_442 | Ast_ValueStmt_Node_443 | Ast_ValueStmt_Node_444 | Ast_ValueStmt_Node_445;
export type Ast_PrefixExpression_Node = Ast_ValueStmt_Node_446 | Ast_ValueStmt_Node_447 | Ast_ValueStmt_Node_448;