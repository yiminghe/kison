// TODO: improve Tuple type
type Optional<T> = T | undefined;
type OneOrMore<T> = T extends Array<infer U> ? [...T, ...U[]] : [T, ...T[]];
type ZeroOrMore<T> = T extends Array<infer U> ? U[] : T[];

export type AstNode = AstSymbolNode | AstTokenNode;

// replace start
export type AstSymbolNode = Progam_Node|EndOfLine_Node|EndOfStatement_Node|ModuleDeclarations_Node|ModuleDeclarationsElement_Node|ModuleBody_Node|ModuleBodyElement_Node|Visibility_Node|SubStmt_Node|PropertyGetStmt_Node|PropertySetStmt_Node|PropertyLetStmt_Node|FunctionStmt_Node|Block_Node|BlockStmt_Node|EraseStmt_Node|RedimStmt_Node|RedimSubStmt_Node|ExitStmt_Node|LetStmt_Node|SetStmt_Node|ExplicitCallStmt_Node|ECS_MemberProcedureCall_Node|ECS_ProcedureCall_Node|ImplicitCallStmt_InBlock_Node|ICS_B_MemberProcedureCall_Node|ICS_B_ProcedureCall_Node|ArgsCall_Node|ArgCall_Node|VariableStmt_Node|VariableListStmt_Node|VariableSubStmt_Node|Indexes_Node|Subscript__Node|Subscripts_Node|ArgList_Node|ValueStmt_Node|ImplicitCallStmt_InStmt_Node|ICS_S_MembersCall_Node|ICS_S_MemberCall_Node|ICS_S_ProcedureOrArrayCall_Node|ICS_S_VariableOrProcedureCall_Node|DictionaryCallStmt_Node|Literal_Node|TypeHint_Node|Arg_Node|ArgDefaultValue_Node|AsTypeClause_Node|Type__Node|ComplexType_Node|BaseType_Node|FieldLength_Node|AmbiguousIdentifier_Node;
export type AstTokenNode = $EOF_Node|$UNKNOWN_Node|NEWLINE_Node|COMMENT_Node|REMCOMMENT_Node|COLON_Node|PRIVATE_Node|PUBLIC_Node|FRIEND_Node|GLOBAL_Node|STATIC_Node|SUB_Node|END_SUB_Node|PROPERTY_GET_Node|LPAREN_Node|RPAREN_Node|END_PROPERTY_Node|PROPERTY_SET_Node|PROPERTY_LET_Node|FUNCTION_Node|END_FUNCTION_Node|ERASE_Node|REDIM_Node|PRESERVE_Node|EXIT_DO_Node|EXIT_FOR_Node|EXIT_FUNCTION_Node|EXIT_PROPERTY_Node|EXIT_SUB_Node|END_Node|LET_Node|EQ_Node|PLUS_EQ_Node|MINUS_EQ_Node|SET_Node|CALL_Node|TOKEN_0_Node|BYREF_Node|BYVAL_Node|PARAMARRAY_Node|DIM_Node|WITHEVENTS_Node|TOKEN_1_Node|INTEGERLITERAL_Node|STRINGLITERAL_Node|TOKEN_2_Node|TOKEN_3_Node|TOKEN_4_Node|TOKEN_5_Node|$_Node|OPTIONAL_Node|AS_Node|NEW_Node|BOOLEAN_Node|BYTE_Node|COLLECTION_Node|DOUBLE_Node|INTEGER_Node|LONG_Node|SINGLE_Node|VARIANT_Node|STRING_Node|MULT_Node|IDENTIFIER_Node|TOKEN_6_Node|TO_Node;
export type LiteralToken = "ACCESS"|"ADDRESSOF"|"ALIAS"|"AND"|"ATTRIBUTE"|"APPACTIVATE"|"APPEND"|"AS"|"BEGIN"|"BEEP"|"BINARY"|"BOOLEAN"|"BYVAL"|"BYREF"|"BYTE"|"CALL"|"CASE"|"CHDIR"|"CHDRIVE"|"CLASS"|"CLOSE"|"COLLECTION"|"CONST"|"DATABASE"|"DECLARE"|"DEFBOOL"|"DEFBYTE"|"DEFDATE"|"DEFDBL"|"DEFDEC"|"DEFCUR"|"DEFINT"|"DEFLNG"|"DEFOBJ"|"DEFSNG"|"DEFSTR"|"DEFVAR"|"DELETESETTING"|"DIM"|"DO"|"DOUBLE"|"EACH"|"ELSE"|"ELSEIF"|"END_ENUM"|"END_FUNCTION"|"END_IF"|"END_PROPERTY"|"END_SELECT"|"END_SUB"|"END_TYPE"|"END_WITH"|"END"|"ENUM"|"EQV"|"ERASE"|"ERROR"|"EVENT"|"EXIT_DO"|"EXIT_FOR"|"EXIT_FUNCTION"|"EXIT_PROPERTY"|"EXIT_SUB"|"FALSE"|"FILECOPY"|"FRIEND"|"FOR"|"FUNCTION"|"GET"|"GLOBAL"|"GOSUB"|"GOTO"|"IF"|"IMP"|"IMPLEMENTS"|"IN"|"INPUT"|"IS"|"INTEGER"|"KILL"|"LOAD"|"LOCK"|"LONG"|"LOOP"|"LEN"|"LET"|"LIB"|"LIKE"|"LINE_INPUT"|"LOCK_READ"|"LOCK_WRITE"|"LOCK_READ_WRITE"|"LSET"|"MACRO_CONST"|"MACRO_IF"|"MACRO_ELSEIF"|"MACRO_ELSE"|"MACRO_END_IF"|"ME"|"MID"|"MKDIR"|"MOD"|"NAME"|"NEXT"|"NEW"|"NOT"|"NOTHING"|"NULL"|"ON"|"ON_ERROR"|"ON_LOCAL_ERROR"|"OPEN"|"OPTIONAL"|"OPTION_BASE"|"OPTION_EXPLICIT"|"OPTION_COMPARE"|"OPTION_PRIVATE_MODULE"|"OR"|"OUTPUT"|"PARAMARRAY"|"PRESERVE"|"PRIVATE"|"PROPERTY_GET"|"PROPERTY_LET"|"PROPERTY_SET"|"PTRSAFE"|"PUBLIC"|"PUT"|"RANDOM"|"RANDOMIZE"|"RAISEEVENT"|"READ"|"READ_WRITE"|"REDIM"|"RESET"|"RESUME"|"RETURN"|"RMDIR"|"RSET"|"SAVEPICTURE"|"SAVESETTING"|"SEEK"|"SELECT"|"SENDKEYS"|"SET"|"SETATTR"|"SHARED"|"SINGLE"|"SPC"|"STATIC"|"STEP"|"STOP"|"STRING"|"SUB"|"TAB"|"TEXT"|"THEN"|"TIME"|"TO"|"TRUE"|"TYPE"|"TYPEOF"|"UNLOAD"|"UNLOCK"|"UNTIL"|"VARIANT"|"VERSION"|"WEND"|"WHILE"|"WIDTH"|"WITH"|"WITHEVENTS"|"WRITE"|"XOR"|"COLON"|"AMPERSAND"|"ASSIGN"|"DIV"|"EQ"|"GEQ"|"GT"|"LEQ"|"LPAREN"|"LT"|"MINUS"|"MINUS_EQ"|"MULT"|"NEQ"|"PLUS"|"PLUS_EQ"|"POW"|"RPAREN"|"L_SQUARE_BRACKET"|"R_SQUARE_BRACKET"|"NEWLINE"|"REMCOMMENT"|"COMMENT"|"HIDDEN"|"STRINGLITERAL"|"INTEGERLITERAL"|"IDENTIFIER"|"$"|"$EOF"|"$UNKNOWN"|"."|"!"|"&"|"%"|"#"|"@"|",";
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
  unicode?:boolean;
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
        
interface Progam_Node_0_ extends BaseSymbolNode {
        symbol:"progam";
        
        children:[ModuleDeclarations_Node,...ZeroOrMore<EndOfLine_Node>,ModuleBody_Node,...ZeroOrMore<EndOfLine_Node>];
        
      }
type Progam_Node_0 = Progam_Node_0_;
interface Progam_Node_1_ extends BaseSymbolNode {
        symbol:"progam";
        
        children:[ModuleDeclarations_Node,...ZeroOrMore<EndOfLine_Node>,...ZeroOrMore<EndOfLine_Node>];
        
      }
type Progam_Node_1 = Progam_Node_1_;
interface Progam_Node_2_ extends BaseSymbolNode {
        symbol:"progam";
        
        children:[...ZeroOrMore<EndOfLine_Node>,ModuleBody_Node,...ZeroOrMore<EndOfLine_Node>];
        
      }
type Progam_Node_2 = Progam_Node_2_;
interface Progam_Node_3_ extends BaseSymbolNode {
        symbol:"progam";
        
        children:[...ZeroOrMore<EndOfLine_Node>,...ZeroOrMore<EndOfLine_Node>];
        
      }
type Progam_Node_3 = Progam_Node_3_;
interface NEWLINE_Node_ extends BaseTokenNode {
            token:"NEWLINE";
            parent:EndOfLine_Node_4;
          }
export type NEWLINE_Node = NEWLINE_Node_;
interface EndOfLine_Node_4_ extends BaseSymbolNode {
        symbol:"endOfLine";
        
        children:[NEWLINE_Node];
        parent:Progam_Node_0 | Progam_Node_1 | Progam_Node_2 | Progam_Node_3 | EndOfStatement_Node_7 | ModuleDeclarations_Node | ModuleBody_Node | ModuleDeclarations_8_group_1_Parent_Node | ModuleBody_10_group_1_Parent_Node;
      }
type EndOfLine_Node_4 = EndOfLine_Node_4_;
interface COMMENT_Node_ extends BaseTokenNode {
            token:"COMMENT";
            parent:EndOfLine_Node_5;
          }
export type COMMENT_Node = COMMENT_Node_;
interface EndOfLine_Node_5_ extends BaseSymbolNode {
        symbol:"endOfLine";
        
        children:[COMMENT_Node];
        parent:Progam_Node_0 | Progam_Node_1 | Progam_Node_2 | Progam_Node_3 | EndOfStatement_Node_7 | ModuleDeclarations_Node | ModuleBody_Node | ModuleDeclarations_8_group_1_Parent_Node | ModuleBody_10_group_1_Parent_Node;
      }
type EndOfLine_Node_5 = EndOfLine_Node_5_;
interface REMCOMMENT_Node_ extends BaseTokenNode {
            token:"REMCOMMENT";
            parent:EndOfLine_Node_6;
          }
export type REMCOMMENT_Node = REMCOMMENT_Node_;
interface EndOfLine_Node_6_ extends BaseSymbolNode {
        symbol:"endOfLine";
        
        children:[REMCOMMENT_Node];
        parent:Progam_Node_0 | Progam_Node_1 | Progam_Node_2 | Progam_Node_3 | EndOfStatement_Node_7 | ModuleDeclarations_Node | ModuleBody_Node | ModuleDeclarations_8_group_1_Parent_Node | ModuleBody_10_group_1_Parent_Node;
      }
type EndOfLine_Node_6 = EndOfLine_Node_6_;
interface EndOfStatement_Node_7_ extends BaseSymbolNode {
        symbol:"endOfStatement";
        
        children:[...ZeroOrMore<EndOfLine_Node>];
        parent:SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_23 | SubStmt_Node_24 | SubStmt_Node_25 | SubStmt_Node_26 | SubStmt_Node_27 | SubStmt_Node_28 | SubStmt_Node_29 | SubStmt_Node_30 | SubStmt_Node_31 | SubStmt_Node_32 | SubStmt_Node_33 | SubStmt_Node_34 | SubStmt_Node_35 | SubStmt_Node_36 | PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_52 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_59 | PropertyGetStmt_Node_60 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_66 | PropertyGetStmt_Node_67 | PropertyGetStmt_Node_68 | PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_71 | PropertySetStmt_Node_72 | PropertySetStmt_Node_73 | PropertySetStmt_Node_74 | PropertySetStmt_Node_75 | PropertySetStmt_Node_76 | PropertySetStmt_Node_77 | PropertySetStmt_Node_78 | PropertySetStmt_Node_79 | PropertySetStmt_Node_80 | PropertySetStmt_Node_81 | PropertySetStmt_Node_82 | PropertySetStmt_Node_83 | PropertySetStmt_Node_84 | PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_87 | PropertyLetStmt_Node_88 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_90 | PropertyLetStmt_Node_91 | PropertyLetStmt_Node_92 | PropertyLetStmt_Node_93 | PropertyLetStmt_Node_94 | PropertyLetStmt_Node_95 | PropertyLetStmt_Node_96 | PropertyLetStmt_Node_97 | PropertyLetStmt_Node_98 | PropertyLetStmt_Node_99 | PropertyLetStmt_Node_100 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_115 | FunctionStmt_Node_116 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_127 | FunctionStmt_Node_128 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_131 | FunctionStmt_Node_132 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_143 | FunctionStmt_Node_144 | FunctionStmt_Node_145 | FunctionStmt_Node_146 | FunctionStmt_Node_147 | FunctionStmt_Node_148 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_155 | FunctionStmt_Node_156 | FunctionStmt_Node_157 | FunctionStmt_Node_158 | FunctionStmt_Node_159 | FunctionStmt_Node_160 | FunctionStmt_Node_161 | FunctionStmt_Node_162 | FunctionStmt_Node_163 | FunctionStmt_Node_164 | Block_Node | Block_25_group_1_Parent_Node;
      }
type EndOfStatement_Node_7 = EndOfStatement_Node_7_;
interface COLON_Node_ extends BaseTokenNode {
            token:"COLON";
            parent:EndOfStatement_Node_8;
          }
export type COLON_Node = COLON_Node_;
interface EndOfStatement_Node_8_ extends BaseSymbolNode {
        symbol:"endOfStatement";
        
        children:[...ZeroOrMore<COLON_Node>];
        parent:SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_23 | SubStmt_Node_24 | SubStmt_Node_25 | SubStmt_Node_26 | SubStmt_Node_27 | SubStmt_Node_28 | SubStmt_Node_29 | SubStmt_Node_30 | SubStmt_Node_31 | SubStmt_Node_32 | SubStmt_Node_33 | SubStmt_Node_34 | SubStmt_Node_35 | SubStmt_Node_36 | PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_52 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_59 | PropertyGetStmt_Node_60 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_66 | PropertyGetStmt_Node_67 | PropertyGetStmt_Node_68 | PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_71 | PropertySetStmt_Node_72 | PropertySetStmt_Node_73 | PropertySetStmt_Node_74 | PropertySetStmt_Node_75 | PropertySetStmt_Node_76 | PropertySetStmt_Node_77 | PropertySetStmt_Node_78 | PropertySetStmt_Node_79 | PropertySetStmt_Node_80 | PropertySetStmt_Node_81 | PropertySetStmt_Node_82 | PropertySetStmt_Node_83 | PropertySetStmt_Node_84 | PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_87 | PropertyLetStmt_Node_88 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_90 | PropertyLetStmt_Node_91 | PropertyLetStmt_Node_92 | PropertyLetStmt_Node_93 | PropertyLetStmt_Node_94 | PropertyLetStmt_Node_95 | PropertyLetStmt_Node_96 | PropertyLetStmt_Node_97 | PropertyLetStmt_Node_98 | PropertyLetStmt_Node_99 | PropertyLetStmt_Node_100 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_115 | FunctionStmt_Node_116 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_127 | FunctionStmt_Node_128 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_131 | FunctionStmt_Node_132 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_143 | FunctionStmt_Node_144 | FunctionStmt_Node_145 | FunctionStmt_Node_146 | FunctionStmt_Node_147 | FunctionStmt_Node_148 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_155 | FunctionStmt_Node_156 | FunctionStmt_Node_157 | FunctionStmt_Node_158 | FunctionStmt_Node_159 | FunctionStmt_Node_160 | FunctionStmt_Node_161 | FunctionStmt_Node_162 | FunctionStmt_Node_163 | FunctionStmt_Node_164 | Block_Node | Block_25_group_1_Parent_Node;
      }
type EndOfStatement_Node_8 = EndOfStatement_Node_8_;
interface ModuleDeclarations_Node_ extends BaseSymbolNode {
        symbol:"moduleDeclarations";
        
        children:[ModuleDeclarationsElement_Node,...ZeroOrMore<ModuleDeclarations_8_group_1_Node>,...ZeroOrMore<EndOfLine_Node>];
        parent:Progam_Node_0 | Progam_Node_1;
      }
type ModuleDeclarations_Node = ModuleDeclarations_Node_;
interface ModuleDeclarationsElement_Node_ extends BaseSymbolNode {
        symbol:"moduleDeclarationsElement";
        
        children:[VariableStmt_Node];
        parent:ModuleDeclarations_Node | ModuleDeclarations_8_group_1_Parent_Node;
      }
type ModuleDeclarationsElement_Node = ModuleDeclarationsElement_Node_;
interface ModuleBody_Node_ extends BaseSymbolNode {
        symbol:"moduleBody";
        
        children:[ModuleBodyElement_Node,...ZeroOrMore<ModuleBody_10_group_1_Node>,...ZeroOrMore<EndOfLine_Node>];
        parent:Progam_Node_0 | Progam_Node_2;
      }
type ModuleBody_Node = ModuleBody_Node_;
interface ModuleBodyElement_Node_12_ extends BaseSymbolNode {
        symbol:"moduleBodyElement";
        
        children:[FunctionStmt_Node];
        parent:ModuleBody_Node | ModuleBody_10_group_1_Parent_Node;
      }
type ModuleBodyElement_Node_12 = ModuleBodyElement_Node_12_;
interface ModuleBodyElement_Node_13_ extends BaseSymbolNode {
        symbol:"moduleBodyElement";
        
        children:[PropertyGetStmt_Node];
        parent:ModuleBody_Node | ModuleBody_10_group_1_Parent_Node;
      }
type ModuleBodyElement_Node_13 = ModuleBodyElement_Node_13_;
interface ModuleBodyElement_Node_14_ extends BaseSymbolNode {
        symbol:"moduleBodyElement";
        
        children:[PropertySetStmt_Node];
        parent:ModuleBody_Node | ModuleBody_10_group_1_Parent_Node;
      }
type ModuleBodyElement_Node_14 = ModuleBodyElement_Node_14_;
interface ModuleBodyElement_Node_15_ extends BaseSymbolNode {
        symbol:"moduleBodyElement";
        
        children:[PropertyLetStmt_Node];
        parent:ModuleBody_Node | ModuleBody_10_group_1_Parent_Node;
      }
type ModuleBodyElement_Node_15 = ModuleBodyElement_Node_15_;
interface ModuleBodyElement_Node_16_ extends BaseSymbolNode {
        symbol:"moduleBodyElement";
        
        children:[SubStmt_Node];
        parent:ModuleBody_Node | ModuleBody_10_group_1_Parent_Node;
      }
type ModuleBodyElement_Node_16 = ModuleBodyElement_Node_16_;
interface PRIVATE_Node_ extends BaseTokenNode {
            token:"PRIVATE";
            parent:Visibility_Node_17;
          }
export type PRIVATE_Node = PRIVATE_Node_;
interface Visibility_Node_17_ extends BaseSymbolNode {
        symbol:"visibility";
        
        children:[PRIVATE_Node];
        parent:SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_23 | SubStmt_Node_24 | SubStmt_Node_25 | SubStmt_Node_26 | SubStmt_Node_27 | SubStmt_Node_28 | PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_52 | PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_71 | PropertySetStmt_Node_72 | PropertySetStmt_Node_73 | PropertySetStmt_Node_74 | PropertySetStmt_Node_75 | PropertySetStmt_Node_76 | PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_87 | PropertyLetStmt_Node_88 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_90 | PropertyLetStmt_Node_91 | PropertyLetStmt_Node_92 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_115 | FunctionStmt_Node_116 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_127 | FunctionStmt_Node_128 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_131 | FunctionStmt_Node_132 | VariableStmt_Node_270 | VariableStmt_Node_271;
      }
type Visibility_Node_17 = Visibility_Node_17_;
interface PUBLIC_Node_ extends BaseTokenNode {
            token:"PUBLIC";
            parent:Visibility_Node_18;
          }
export type PUBLIC_Node = PUBLIC_Node_;
interface Visibility_Node_18_ extends BaseSymbolNode {
        symbol:"visibility";
        
        children:[PUBLIC_Node];
        parent:SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_23 | SubStmt_Node_24 | SubStmt_Node_25 | SubStmt_Node_26 | SubStmt_Node_27 | SubStmt_Node_28 | PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_52 | PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_71 | PropertySetStmt_Node_72 | PropertySetStmt_Node_73 | PropertySetStmt_Node_74 | PropertySetStmt_Node_75 | PropertySetStmt_Node_76 | PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_87 | PropertyLetStmt_Node_88 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_90 | PropertyLetStmt_Node_91 | PropertyLetStmt_Node_92 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_115 | FunctionStmt_Node_116 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_127 | FunctionStmt_Node_128 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_131 | FunctionStmt_Node_132 | VariableStmt_Node_270 | VariableStmt_Node_271;
      }
type Visibility_Node_18 = Visibility_Node_18_;
interface FRIEND_Node_ extends BaseTokenNode {
            token:"FRIEND";
            parent:Visibility_Node_19;
          }
export type FRIEND_Node = FRIEND_Node_;
interface Visibility_Node_19_ extends BaseSymbolNode {
        symbol:"visibility";
        
        children:[FRIEND_Node];
        parent:SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_23 | SubStmt_Node_24 | SubStmt_Node_25 | SubStmt_Node_26 | SubStmt_Node_27 | SubStmt_Node_28 | PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_52 | PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_71 | PropertySetStmt_Node_72 | PropertySetStmt_Node_73 | PropertySetStmt_Node_74 | PropertySetStmt_Node_75 | PropertySetStmt_Node_76 | PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_87 | PropertyLetStmt_Node_88 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_90 | PropertyLetStmt_Node_91 | PropertyLetStmt_Node_92 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_115 | FunctionStmt_Node_116 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_127 | FunctionStmt_Node_128 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_131 | FunctionStmt_Node_132 | VariableStmt_Node_270 | VariableStmt_Node_271;
      }
type Visibility_Node_19 = Visibility_Node_19_;
interface GLOBAL_Node_ extends BaseTokenNode {
            token:"GLOBAL";
            parent:Visibility_Node_20;
          }
export type GLOBAL_Node = GLOBAL_Node_;
interface Visibility_Node_20_ extends BaseSymbolNode {
        symbol:"visibility";
        
        children:[GLOBAL_Node];
        parent:SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_23 | SubStmt_Node_24 | SubStmt_Node_25 | SubStmt_Node_26 | SubStmt_Node_27 | SubStmt_Node_28 | PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_52 | PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_71 | PropertySetStmt_Node_72 | PropertySetStmt_Node_73 | PropertySetStmt_Node_74 | PropertySetStmt_Node_75 | PropertySetStmt_Node_76 | PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_87 | PropertyLetStmt_Node_88 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_90 | PropertyLetStmt_Node_91 | PropertyLetStmt_Node_92 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_115 | FunctionStmt_Node_116 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_127 | FunctionStmt_Node_128 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_131 | FunctionStmt_Node_132 | VariableStmt_Node_270 | VariableStmt_Node_271;
      }
type Visibility_Node_20 = Visibility_Node_20_;
interface STATIC_Node_ extends BaseTokenNode {
            token:"STATIC";
            parent:SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_23 | SubStmt_Node_24 | SubStmt_Node_29 | SubStmt_Node_30 | SubStmt_Node_31 | SubStmt_Node_32 | PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_59 | PropertyGetStmt_Node_60 | PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_71 | PropertySetStmt_Node_72 | PropertySetStmt_Node_77 | PropertySetStmt_Node_78 | PropertySetStmt_Node_79 | PropertySetStmt_Node_80 | PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_87 | PropertyLetStmt_Node_88 | PropertyLetStmt_Node_93 | PropertyLetStmt_Node_94 | PropertyLetStmt_Node_95 | PropertyLetStmt_Node_96 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_115 | FunctionStmt_Node_116 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_143 | FunctionStmt_Node_144 | FunctionStmt_Node_145 | FunctionStmt_Node_146 | FunctionStmt_Node_147 | FunctionStmt_Node_148 | VariableStmt_Node_268 | VariableStmt_Node_269;
          }
export type STATIC_Node = STATIC_Node_;
interface SUB_Node_ extends BaseTokenNode {
            token:"SUB";
            parent:SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_23 | SubStmt_Node_24 | SubStmt_Node_25 | SubStmt_Node_26 | SubStmt_Node_27 | SubStmt_Node_28 | SubStmt_Node_29 | SubStmt_Node_30 | SubStmt_Node_31 | SubStmt_Node_32 | SubStmt_Node_33 | SubStmt_Node_34 | SubStmt_Node_35 | SubStmt_Node_36;
          }
export type SUB_Node = SUB_Node_;
interface END_SUB_Node_ extends BaseTokenNode {
            token:"END_SUB";
            parent:SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_23 | SubStmt_Node_24 | SubStmt_Node_25 | SubStmt_Node_26 | SubStmt_Node_27 | SubStmt_Node_28 | SubStmt_Node_29 | SubStmt_Node_30 | SubStmt_Node_31 | SubStmt_Node_32 | SubStmt_Node_33 | SubStmt_Node_34 | SubStmt_Node_35 | SubStmt_Node_36;
          }
export type END_SUB_Node = END_SUB_Node_;
interface SubStmt_Node_21_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,STATIC_Node,SUB_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
type SubStmt_Node_21 = SubStmt_Node_21_;
interface SubStmt_Node_22_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,STATIC_Node,SUB_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
type SubStmt_Node_22 = SubStmt_Node_22_;
interface SubStmt_Node_23_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,STATIC_Node,SUB_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
type SubStmt_Node_23 = SubStmt_Node_23_;
interface SubStmt_Node_24_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,STATIC_Node,SUB_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
type SubStmt_Node_24 = SubStmt_Node_24_;
interface SubStmt_Node_25_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,SUB_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
type SubStmt_Node_25 = SubStmt_Node_25_;
interface SubStmt_Node_26_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,SUB_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
type SubStmt_Node_26 = SubStmt_Node_26_;
interface SubStmt_Node_27_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,SUB_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
type SubStmt_Node_27 = SubStmt_Node_27_;
interface SubStmt_Node_28_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[Visibility_Node,SUB_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
type SubStmt_Node_28 = SubStmt_Node_28_;
interface SubStmt_Node_29_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[STATIC_Node,SUB_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
type SubStmt_Node_29 = SubStmt_Node_29_;
interface SubStmt_Node_30_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[STATIC_Node,SUB_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
type SubStmt_Node_30 = SubStmt_Node_30_;
interface SubStmt_Node_31_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[STATIC_Node,SUB_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
type SubStmt_Node_31 = SubStmt_Node_31_;
interface SubStmt_Node_32_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[STATIC_Node,SUB_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
type SubStmt_Node_32 = SubStmt_Node_32_;
interface SubStmt_Node_33_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[SUB_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
type SubStmt_Node_33 = SubStmt_Node_33_;
interface SubStmt_Node_34_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[SUB_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
type SubStmt_Node_34 = SubStmt_Node_34_;
interface SubStmt_Node_35_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[SUB_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
type SubStmt_Node_35 = SubStmt_Node_35_;
interface SubStmt_Node_36_ extends BaseSymbolNode {
        symbol:"subStmt";
        
        children:[SUB_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_SUB_Node];
        parent:ModuleBodyElement_Node_16;
      }
type SubStmt_Node_36 = SubStmt_Node_36_;
interface PROPERTY_GET_Node_ extends BaseTokenNode {
            token:"PROPERTY_GET";
            parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_52 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_59 | PropertyGetStmt_Node_60 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_66 | PropertyGetStmt_Node_67 | PropertyGetStmt_Node_68;
          }
export type PROPERTY_GET_Node = PROPERTY_GET_Node_;
interface LPAREN_Node_ extends BaseTokenNode {
            token:"LPAREN";
            parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_52 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_59 | PropertyGetStmt_Node_60 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_66 | PropertyGetStmt_Node_67 | PropertyGetStmt_Node_68 | RedimSubStmt_Node_177 | RedimSubStmt_Node_178 | ArgCall_Node_242 | ArgCall_Node_243 | ArgCall_Node_244 | ArgCall_Node_245 | ArgCall_Node_250 | ArgCall_Node_251 | ArgCall_Node_252 | ArgCall_Node_253 | ArgCall_Node_258 | ArgCall_Node_259 | ArgCall_Node_260 | ArgCall_Node_261 | ArgList_Node_287 | ArgList_Node_288 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_316 | ICS_S_ProcedureOrArrayCall_Node_317 | ICS_S_ProcedureOrArrayCall_Node_318 | ICS_S_ProcedureOrArrayCall_Node_319 | ICS_S_ProcedureOrArrayCall_Node_320 | ICS_S_ProcedureOrArrayCall_Node_321 | ICS_S_ProcedureOrArrayCall_Node_322 | ICS_S_ProcedureOrArrayCall_Node_323 | ICS_S_ProcedureOrArrayCall_Node_324 | ICS_S_ProcedureOrArrayCall_Node_325 | ICS_S_ProcedureOrArrayCall_Node_326 | ICS_S_ProcedureOrArrayCall_Node_327 | ICS_S_ProcedureOrArrayCall_Node_328 | ICS_S_ProcedureOrArrayCall_Node_329 | ECS_MemberProcedureCall_49_group_5_Parent_Node | ECS_MemberProcedureCall_49_group_10_Parent_Node | ICS_B_ProcedureCall_54_group_2_Parent_Node | VariableSubStmt_63_group_1_Parent_Node_639 | VariableSubStmt_63_group_1_Parent_Node_640 | Arg_91_group_7_Parent_Node;
          }
export type LPAREN_Node = LPAREN_Node_;
interface RPAREN_Node_ extends BaseTokenNode {
            token:"RPAREN";
            parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_52 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_59 | PropertyGetStmt_Node_60 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_66 | PropertyGetStmt_Node_67 | PropertyGetStmt_Node_68 | RedimSubStmt_Node_177 | RedimSubStmt_Node_178 | ArgCall_Node_242 | ArgCall_Node_244 | ArgCall_Node_246 | ArgCall_Node_248 | ArgCall_Node_250 | ArgCall_Node_252 | ArgCall_Node_254 | ArgCall_Node_256 | ArgCall_Node_258 | ArgCall_Node_260 | ArgCall_Node_262 | ArgCall_Node_264 | ArgList_Node_287 | ArgList_Node_288 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_316 | ICS_S_ProcedureOrArrayCall_Node_317 | ICS_S_ProcedureOrArrayCall_Node_318 | ICS_S_ProcedureOrArrayCall_Node_319 | ICS_S_ProcedureOrArrayCall_Node_320 | ICS_S_ProcedureOrArrayCall_Node_321 | ICS_S_ProcedureOrArrayCall_Node_322 | ICS_S_ProcedureOrArrayCall_Node_323 | ICS_S_ProcedureOrArrayCall_Node_324 | ICS_S_ProcedureOrArrayCall_Node_325 | ICS_S_ProcedureOrArrayCall_Node_326 | ICS_S_ProcedureOrArrayCall_Node_327 | ICS_S_ProcedureOrArrayCall_Node_328 | ICS_S_ProcedureOrArrayCall_Node_329 | ECS_MemberProcedureCall_49_group_5_Parent_Node | ECS_MemberProcedureCall_49_group_10_Parent_Node | ICS_B_ProcedureCall_54_group_2_Parent_Node | VariableSubStmt_63_group_1_Parent_Node_639 | VariableSubStmt_63_group_1_Parent_Node_640 | Arg_91_group_7_Parent_Node;
          }
export type RPAREN_Node = RPAREN_Node_;
interface END_PROPERTY_Node_ extends BaseTokenNode {
            token:"END_PROPERTY";
            parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_52 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_59 | PropertyGetStmt_Node_60 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_66 | PropertyGetStmt_Node_67 | PropertyGetStmt_Node_68 | PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_71 | PropertySetStmt_Node_72 | PropertySetStmt_Node_73 | PropertySetStmt_Node_74 | PropertySetStmt_Node_75 | PropertySetStmt_Node_76 | PropertySetStmt_Node_77 | PropertySetStmt_Node_78 | PropertySetStmt_Node_79 | PropertySetStmt_Node_80 | PropertySetStmt_Node_81 | PropertySetStmt_Node_82 | PropertySetStmt_Node_83 | PropertySetStmt_Node_84 | PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_87 | PropertyLetStmt_Node_88 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_90 | PropertyLetStmt_Node_91 | PropertyLetStmt_Node_92 | PropertyLetStmt_Node_93 | PropertyLetStmt_Node_94 | PropertyLetStmt_Node_95 | PropertyLetStmt_Node_96 | PropertyLetStmt_Node_97 | PropertyLetStmt_Node_98 | PropertyLetStmt_Node_99 | PropertyLetStmt_Node_100;
          }
export type END_PROPERTY_Node = END_PROPERTY_Node_;
interface PropertyGetStmt_Node_37_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_37 = PropertyGetStmt_Node_37_;
interface PropertyGetStmt_Node_38_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_38 = PropertyGetStmt_Node_38_;
interface PropertyGetStmt_Node_39_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_39 = PropertyGetStmt_Node_39_;
interface PropertyGetStmt_Node_40_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_40 = PropertyGetStmt_Node_40_;
interface PropertyGetStmt_Node_41_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_41 = PropertyGetStmt_Node_41_;
interface PropertyGetStmt_Node_42_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_42 = PropertyGetStmt_Node_42_;
interface PropertyGetStmt_Node_43_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_43 = PropertyGetStmt_Node_43_;
interface PropertyGetStmt_Node_44_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_44 = PropertyGetStmt_Node_44_;
interface PropertyGetStmt_Node_45_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_45 = PropertyGetStmt_Node_45_;
interface PropertyGetStmt_Node_46_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_46 = PropertyGetStmt_Node_46_;
interface PropertyGetStmt_Node_47_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_47 = PropertyGetStmt_Node_47_;
interface PropertyGetStmt_Node_48_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_48 = PropertyGetStmt_Node_48_;
interface PropertyGetStmt_Node_49_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_49 = PropertyGetStmt_Node_49_;
interface PropertyGetStmt_Node_50_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_50 = PropertyGetStmt_Node_50_;
interface PropertyGetStmt_Node_51_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_51 = PropertyGetStmt_Node_51_;
interface PropertyGetStmt_Node_52_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[Visibility_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_52 = PropertyGetStmt_Node_52_;
interface PropertyGetStmt_Node_53_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_53 = PropertyGetStmt_Node_53_;
interface PropertyGetStmt_Node_54_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_54 = PropertyGetStmt_Node_54_;
interface PropertyGetStmt_Node_55_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_55 = PropertyGetStmt_Node_55_;
interface PropertyGetStmt_Node_56_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_56 = PropertyGetStmt_Node_56_;
interface PropertyGetStmt_Node_57_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_57 = PropertyGetStmt_Node_57_;
interface PropertyGetStmt_Node_58_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_58 = PropertyGetStmt_Node_58_;
interface PropertyGetStmt_Node_59_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_59 = PropertyGetStmt_Node_59_;
interface PropertyGetStmt_Node_60_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[STATIC_Node,PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_60 = PropertyGetStmt_Node_60_;
interface PropertyGetStmt_Node_61_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_61 = PropertyGetStmt_Node_61_;
interface PropertyGetStmt_Node_62_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_62 = PropertyGetStmt_Node_62_;
interface PropertyGetStmt_Node_63_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_63 = PropertyGetStmt_Node_63_;
interface PropertyGetStmt_Node_64_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[PROPERTY_GET_Node,AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_64 = PropertyGetStmt_Node_64_;
interface PropertyGetStmt_Node_65_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_65 = PropertyGetStmt_Node_65_;
interface PropertyGetStmt_Node_66_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,AsTypeClause_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_66 = PropertyGetStmt_Node_66_;
interface PropertyGetStmt_Node_67_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_67 = PropertyGetStmt_Node_67_;
interface PropertyGetStmt_Node_68_ extends BaseSymbolNode {
        symbol:"propertyGetStmt";
        
        children:[PROPERTY_GET_Node,AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_13;
      }
type PropertyGetStmt_Node_68 = PropertyGetStmt_Node_68_;
interface PROPERTY_SET_Node_ extends BaseTokenNode {
            token:"PROPERTY_SET";
            parent:PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_71 | PropertySetStmt_Node_72 | PropertySetStmt_Node_73 | PropertySetStmt_Node_74 | PropertySetStmt_Node_75 | PropertySetStmt_Node_76 | PropertySetStmt_Node_77 | PropertySetStmt_Node_78 | PropertySetStmt_Node_79 | PropertySetStmt_Node_80 | PropertySetStmt_Node_81 | PropertySetStmt_Node_82 | PropertySetStmt_Node_83 | PropertySetStmt_Node_84;
          }
export type PROPERTY_SET_Node = PROPERTY_SET_Node_;
interface PropertySetStmt_Node_69_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_SET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
type PropertySetStmt_Node_69 = PropertySetStmt_Node_69_;
interface PropertySetStmt_Node_70_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_SET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
type PropertySetStmt_Node_70 = PropertySetStmt_Node_70_;
interface PropertySetStmt_Node_71_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_SET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
type PropertySetStmt_Node_71 = PropertySetStmt_Node_71_;
interface PropertySetStmt_Node_72_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_SET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
type PropertySetStmt_Node_72 = PropertySetStmt_Node_72_;
interface PropertySetStmt_Node_73_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Visibility_Node,PROPERTY_SET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
type PropertySetStmt_Node_73 = PropertySetStmt_Node_73_;
interface PropertySetStmt_Node_74_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Visibility_Node,PROPERTY_SET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
type PropertySetStmt_Node_74 = PropertySetStmt_Node_74_;
interface PropertySetStmt_Node_75_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Visibility_Node,PROPERTY_SET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
type PropertySetStmt_Node_75 = PropertySetStmt_Node_75_;
interface PropertySetStmt_Node_76_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[Visibility_Node,PROPERTY_SET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
type PropertySetStmt_Node_76 = PropertySetStmt_Node_76_;
interface PropertySetStmt_Node_77_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[STATIC_Node,PROPERTY_SET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
type PropertySetStmt_Node_77 = PropertySetStmt_Node_77_;
interface PropertySetStmt_Node_78_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[STATIC_Node,PROPERTY_SET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
type PropertySetStmt_Node_78 = PropertySetStmt_Node_78_;
interface PropertySetStmt_Node_79_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[STATIC_Node,PROPERTY_SET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
type PropertySetStmt_Node_79 = PropertySetStmt_Node_79_;
interface PropertySetStmt_Node_80_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[STATIC_Node,PROPERTY_SET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
type PropertySetStmt_Node_80 = PropertySetStmt_Node_80_;
interface PropertySetStmt_Node_81_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[PROPERTY_SET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
type PropertySetStmt_Node_81 = PropertySetStmt_Node_81_;
interface PropertySetStmt_Node_82_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[PROPERTY_SET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
type PropertySetStmt_Node_82 = PropertySetStmt_Node_82_;
interface PropertySetStmt_Node_83_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[PROPERTY_SET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
type PropertySetStmt_Node_83 = PropertySetStmt_Node_83_;
interface PropertySetStmt_Node_84_ extends BaseSymbolNode {
        symbol:"propertySetStmt";
        
        children:[PROPERTY_SET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_14;
      }
type PropertySetStmt_Node_84 = PropertySetStmt_Node_84_;
interface PROPERTY_LET_Node_ extends BaseTokenNode {
            token:"PROPERTY_LET";
            parent:PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_87 | PropertyLetStmt_Node_88 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_90 | PropertyLetStmt_Node_91 | PropertyLetStmt_Node_92 | PropertyLetStmt_Node_93 | PropertyLetStmt_Node_94 | PropertyLetStmt_Node_95 | PropertyLetStmt_Node_96 | PropertyLetStmt_Node_97 | PropertyLetStmt_Node_98 | PropertyLetStmt_Node_99 | PropertyLetStmt_Node_100;
          }
export type PROPERTY_LET_Node = PROPERTY_LET_Node_;
interface PropertyLetStmt_Node_85_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_LET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
type PropertyLetStmt_Node_85 = PropertyLetStmt_Node_85_;
interface PropertyLetStmt_Node_86_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_LET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
type PropertyLetStmt_Node_86 = PropertyLetStmt_Node_86_;
interface PropertyLetStmt_Node_87_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_LET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
type PropertyLetStmt_Node_87 = PropertyLetStmt_Node_87_;
interface PropertyLetStmt_Node_88_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Visibility_Node,STATIC_Node,PROPERTY_LET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
type PropertyLetStmt_Node_88 = PropertyLetStmt_Node_88_;
interface PropertyLetStmt_Node_89_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Visibility_Node,PROPERTY_LET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
type PropertyLetStmt_Node_89 = PropertyLetStmt_Node_89_;
interface PropertyLetStmt_Node_90_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Visibility_Node,PROPERTY_LET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
type PropertyLetStmt_Node_90 = PropertyLetStmt_Node_90_;
interface PropertyLetStmt_Node_91_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Visibility_Node,PROPERTY_LET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
type PropertyLetStmt_Node_91 = PropertyLetStmt_Node_91_;
interface PropertyLetStmt_Node_92_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[Visibility_Node,PROPERTY_LET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
type PropertyLetStmt_Node_92 = PropertyLetStmt_Node_92_;
interface PropertyLetStmt_Node_93_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[STATIC_Node,PROPERTY_LET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
type PropertyLetStmt_Node_93 = PropertyLetStmt_Node_93_;
interface PropertyLetStmt_Node_94_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[STATIC_Node,PROPERTY_LET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
type PropertyLetStmt_Node_94 = PropertyLetStmt_Node_94_;
interface PropertyLetStmt_Node_95_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[STATIC_Node,PROPERTY_LET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
type PropertyLetStmt_Node_95 = PropertyLetStmt_Node_95_;
interface PropertyLetStmt_Node_96_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[STATIC_Node,PROPERTY_LET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
type PropertyLetStmt_Node_96 = PropertyLetStmt_Node_96_;
interface PropertyLetStmt_Node_97_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[PROPERTY_LET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
type PropertyLetStmt_Node_97 = PropertyLetStmt_Node_97_;
interface PropertyLetStmt_Node_98_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[PROPERTY_LET_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
type PropertyLetStmt_Node_98 = PropertyLetStmt_Node_98_;
interface PropertyLetStmt_Node_99_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[PROPERTY_LET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
type PropertyLetStmt_Node_99 = PropertyLetStmt_Node_99_;
interface PropertyLetStmt_Node_100_ extends BaseSymbolNode {
        symbol:"propertyLetStmt";
        
        children:[PROPERTY_LET_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_PROPERTY_Node];
        parent:ModuleBodyElement_Node_15;
      }
type PropertyLetStmt_Node_100 = PropertyLetStmt_Node_100_;
interface FUNCTION_Node_ extends BaseTokenNode {
            token:"FUNCTION";
            parent:FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_115 | FunctionStmt_Node_116 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_127 | FunctionStmt_Node_128 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_131 | FunctionStmt_Node_132 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_143 | FunctionStmt_Node_144 | FunctionStmt_Node_145 | FunctionStmt_Node_146 | FunctionStmt_Node_147 | FunctionStmt_Node_148 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_155 | FunctionStmt_Node_156 | FunctionStmt_Node_157 | FunctionStmt_Node_158 | FunctionStmt_Node_159 | FunctionStmt_Node_160 | FunctionStmt_Node_161 | FunctionStmt_Node_162 | FunctionStmt_Node_163 | FunctionStmt_Node_164;
          }
export type FUNCTION_Node = FUNCTION_Node_;
interface END_FUNCTION_Node_ extends BaseTokenNode {
            token:"END_FUNCTION";
            parent:FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_115 | FunctionStmt_Node_116 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_127 | FunctionStmt_Node_128 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_131 | FunctionStmt_Node_132 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_143 | FunctionStmt_Node_144 | FunctionStmt_Node_145 | FunctionStmt_Node_146 | FunctionStmt_Node_147 | FunctionStmt_Node_148 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_155 | FunctionStmt_Node_156 | FunctionStmt_Node_157 | FunctionStmt_Node_158 | FunctionStmt_Node_159 | FunctionStmt_Node_160 | FunctionStmt_Node_161 | FunctionStmt_Node_162 | FunctionStmt_Node_163 | FunctionStmt_Node_164;
          }
export type END_FUNCTION_Node = END_FUNCTION_Node_;
interface FunctionStmt_Node_101_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_101 = FunctionStmt_Node_101_;
interface FunctionStmt_Node_102_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_102 = FunctionStmt_Node_102_;
interface FunctionStmt_Node_103_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_103 = FunctionStmt_Node_103_;
interface FunctionStmt_Node_104_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_104 = FunctionStmt_Node_104_;
interface FunctionStmt_Node_105_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_105 = FunctionStmt_Node_105_;
interface FunctionStmt_Node_106_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_106 = FunctionStmt_Node_106_;
interface FunctionStmt_Node_107_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_107 = FunctionStmt_Node_107_;
interface FunctionStmt_Node_108_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_108 = FunctionStmt_Node_108_;
interface FunctionStmt_Node_109_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_109 = FunctionStmt_Node_109_;
interface FunctionStmt_Node_110_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_110 = FunctionStmt_Node_110_;
interface FunctionStmt_Node_111_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_111 = FunctionStmt_Node_111_;
interface FunctionStmt_Node_112_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_112 = FunctionStmt_Node_112_;
interface FunctionStmt_Node_113_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_113 = FunctionStmt_Node_113_;
interface FunctionStmt_Node_114_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_114 = FunctionStmt_Node_114_;
interface FunctionStmt_Node_115_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_115 = FunctionStmt_Node_115_;
interface FunctionStmt_Node_116_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_116 = FunctionStmt_Node_116_;
interface FunctionStmt_Node_117_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_117 = FunctionStmt_Node_117_;
interface FunctionStmt_Node_118_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_118 = FunctionStmt_Node_118_;
interface FunctionStmt_Node_119_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_119 = FunctionStmt_Node_119_;
interface FunctionStmt_Node_120_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_120 = FunctionStmt_Node_120_;
interface FunctionStmt_Node_121_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_121 = FunctionStmt_Node_121_;
interface FunctionStmt_Node_122_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_122 = FunctionStmt_Node_122_;
interface FunctionStmt_Node_123_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_123 = FunctionStmt_Node_123_;
interface FunctionStmt_Node_124_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_124 = FunctionStmt_Node_124_;
interface FunctionStmt_Node_125_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_125 = FunctionStmt_Node_125_;
interface FunctionStmt_Node_126_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_126 = FunctionStmt_Node_126_;
interface FunctionStmt_Node_127_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_127 = FunctionStmt_Node_127_;
interface FunctionStmt_Node_128_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_128 = FunctionStmt_Node_128_;
interface FunctionStmt_Node_129_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_129 = FunctionStmt_Node_129_;
interface FunctionStmt_Node_130_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_130 = FunctionStmt_Node_130_;
interface FunctionStmt_Node_131_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_131 = FunctionStmt_Node_131_;
interface FunctionStmt_Node_132_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[Visibility_Node,FUNCTION_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_132 = FunctionStmt_Node_132_;
interface FunctionStmt_Node_133_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_133 = FunctionStmt_Node_133_;
interface FunctionStmt_Node_134_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_134 = FunctionStmt_Node_134_;
interface FunctionStmt_Node_135_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_135 = FunctionStmt_Node_135_;
interface FunctionStmt_Node_136_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_136 = FunctionStmt_Node_136_;
interface FunctionStmt_Node_137_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_137 = FunctionStmt_Node_137_;
interface FunctionStmt_Node_138_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_138 = FunctionStmt_Node_138_;
interface FunctionStmt_Node_139_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_139 = FunctionStmt_Node_139_;
interface FunctionStmt_Node_140_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_140 = FunctionStmt_Node_140_;
interface FunctionStmt_Node_141_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_141 = FunctionStmt_Node_141_;
interface FunctionStmt_Node_142_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_142 = FunctionStmt_Node_142_;
interface FunctionStmt_Node_143_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_143 = FunctionStmt_Node_143_;
interface FunctionStmt_Node_144_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_144 = FunctionStmt_Node_144_;
interface FunctionStmt_Node_145_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_145 = FunctionStmt_Node_145_;
interface FunctionStmt_Node_146_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_146 = FunctionStmt_Node_146_;
interface FunctionStmt_Node_147_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_147 = FunctionStmt_Node_147_;
interface FunctionStmt_Node_148_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[STATIC_Node,FUNCTION_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_148 = FunctionStmt_Node_148_;
interface FunctionStmt_Node_149_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_149 = FunctionStmt_Node_149_;
interface FunctionStmt_Node_150_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_150 = FunctionStmt_Node_150_;
interface FunctionStmt_Node_151_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_151 = FunctionStmt_Node_151_;
interface FunctionStmt_Node_152_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgList_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_152 = FunctionStmt_Node_152_;
interface FunctionStmt_Node_153_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_153 = FunctionStmt_Node_153_;
interface FunctionStmt_Node_154_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_154 = FunctionStmt_Node_154_;
interface FunctionStmt_Node_155_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_155 = FunctionStmt_Node_155_;
interface FunctionStmt_Node_156_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,TypeHint_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_156 = FunctionStmt_Node_156_;
interface FunctionStmt_Node_157_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_157 = FunctionStmt_Node_157_;
interface FunctionStmt_Node_158_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_158 = FunctionStmt_Node_158_;
interface FunctionStmt_Node_159_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_159 = FunctionStmt_Node_159_;
interface FunctionStmt_Node_160_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,ArgList_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_160 = FunctionStmt_Node_160_;
interface FunctionStmt_Node_161_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_161 = FunctionStmt_Node_161_;
interface FunctionStmt_Node_162_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_162 = FunctionStmt_Node_162_;
interface FunctionStmt_Node_163_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,Block_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_163 = FunctionStmt_Node_163_;
interface FunctionStmt_Node_164_ extends BaseSymbolNode {
        symbol:"functionStmt";
        
        children:[FUNCTION_Node,AmbiguousIdentifier_Node,EndOfStatement_Node,END_FUNCTION_Node];
        parent:ModuleBodyElement_Node_12;
      }
type FunctionStmt_Node_164 = FunctionStmt_Node_164_;
interface Block_Node_ extends BaseSymbolNode {
        symbol:"block";
        
        children:[BlockStmt_Node,...ZeroOrMore<Block_25_group_1_Node>,EndOfStatement_Node];
        parent:SubStmt_Node_21 | SubStmt_Node_23 | SubStmt_Node_25 | SubStmt_Node_27 | SubStmt_Node_29 | SubStmt_Node_31 | SubStmt_Node_33 | SubStmt_Node_35 | PropertyGetStmt_Node_37 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_59 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_67 | PropertySetStmt_Node_69 | PropertySetStmt_Node_71 | PropertySetStmt_Node_73 | PropertySetStmt_Node_75 | PropertySetStmt_Node_77 | PropertySetStmt_Node_79 | PropertySetStmt_Node_81 | PropertySetStmt_Node_83 | PropertyLetStmt_Node_85 | PropertyLetStmt_Node_87 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_91 | PropertyLetStmt_Node_93 | PropertyLetStmt_Node_95 | PropertyLetStmt_Node_97 | PropertyLetStmt_Node_99 | FunctionStmt_Node_101 | FunctionStmt_Node_103 | FunctionStmt_Node_105 | FunctionStmt_Node_107 | FunctionStmt_Node_109 | FunctionStmt_Node_111 | FunctionStmt_Node_113 | FunctionStmt_Node_115 | FunctionStmt_Node_117 | FunctionStmt_Node_119 | FunctionStmt_Node_121 | FunctionStmt_Node_123 | FunctionStmt_Node_125 | FunctionStmt_Node_127 | FunctionStmt_Node_129 | FunctionStmt_Node_131 | FunctionStmt_Node_133 | FunctionStmt_Node_135 | FunctionStmt_Node_137 | FunctionStmt_Node_139 | FunctionStmt_Node_141 | FunctionStmt_Node_143 | FunctionStmt_Node_145 | FunctionStmt_Node_147 | FunctionStmt_Node_149 | FunctionStmt_Node_151 | FunctionStmt_Node_153 | FunctionStmt_Node_155 | FunctionStmt_Node_157 | FunctionStmt_Node_159 | FunctionStmt_Node_161 | FunctionStmt_Node_163;
      }
type Block_Node = Block_Node_;
interface BlockStmt_Node_166_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[EraseStmt_Node];
        parent:Block_Node | Block_25_group_1_Parent_Node;
      }
type BlockStmt_Node_166 = BlockStmt_Node_166_;
interface BlockStmt_Node_167_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[ExitStmt_Node];
        parent:Block_Node | Block_25_group_1_Parent_Node;
      }
type BlockStmt_Node_167 = BlockStmt_Node_167_;
interface BlockStmt_Node_168_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[ExplicitCallStmt_Node];
        parent:Block_Node | Block_25_group_1_Parent_Node;
      }
type BlockStmt_Node_168 = BlockStmt_Node_168_;
interface BlockStmt_Node_169_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[SetStmt_Node];
        parent:Block_Node | Block_25_group_1_Parent_Node;
      }
type BlockStmt_Node_169 = BlockStmt_Node_169_;
interface BlockStmt_Node_170_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[RedimStmt_Node];
        parent:Block_Node | Block_25_group_1_Parent_Node;
      }
type BlockStmt_Node_170 = BlockStmt_Node_170_;
interface BlockStmt_Node_171_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[LetStmt_Node];
        parent:Block_Node | Block_25_group_1_Parent_Node;
      }
type BlockStmt_Node_171 = BlockStmt_Node_171_;
interface BlockStmt_Node_172_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[VariableStmt_Node];
        parent:Block_Node | Block_25_group_1_Parent_Node;
      }
type BlockStmt_Node_172 = BlockStmt_Node_172_;
interface BlockStmt_Node_173_ extends BaseSymbolNode {
        symbol:"blockStmt";
        
        children:[ImplicitCallStmt_InBlock_Node];
        parent:Block_Node | Block_25_group_1_Parent_Node;
      }
type BlockStmt_Node_173 = BlockStmt_Node_173_;
interface ERASE_Node_ extends BaseTokenNode {
            token:"ERASE";
            parent:EraseStmt_Node;
          }
export type ERASE_Node = ERASE_Node_;
interface EraseStmt_Node_ extends BaseSymbolNode {
        symbol:"eraseStmt";
        
        children:[ERASE_Node,ValueStmt_Node,...ZeroOrMore<EraseStmt_34_group_2_Node>];
        parent:BlockStmt_Node_166;
      }
type EraseStmt_Node = EraseStmt_Node_;
interface REDIM_Node_ extends BaseTokenNode {
            token:"REDIM";
            parent:RedimStmt_Node_175 | RedimStmt_Node_176;
          }
export type REDIM_Node = REDIM_Node_;
interface PRESERVE_Node_ extends BaseTokenNode {
            token:"PRESERVE";
            parent:RedimStmt_Node_175;
          }
export type PRESERVE_Node = PRESERVE_Node_;
interface RedimStmt_Node_175_ extends BaseSymbolNode {
        symbol:"redimStmt";
        
        children:[REDIM_Node,PRESERVE_Node,RedimSubStmt_Node,...ZeroOrMore<RedimStmt_35_group_3_Node>];
        parent:BlockStmt_Node_170;
      }
type RedimStmt_Node_175 = RedimStmt_Node_175_;
interface RedimStmt_Node_176_ extends BaseSymbolNode {
        symbol:"redimStmt";
        
        children:[REDIM_Node,RedimSubStmt_Node,...ZeroOrMore<RedimStmt_35_group_3_Node>];
        parent:BlockStmt_Node_170;
      }
type RedimStmt_Node_176 = RedimStmt_Node_176_;
interface RedimSubStmt_Node_177_ extends BaseSymbolNode {
        symbol:"redimSubStmt";
        
        children:[ImplicitCallStmt_InStmt_Node,LPAREN_Node,Subscripts_Node,RPAREN_Node,AsTypeClause_Node];
        parent:RedimStmt_Node_175 | RedimStmt_Node_176 | RedimStmt_35_group_3_Parent_Node;
      }
type RedimSubStmt_Node_177 = RedimSubStmt_Node_177_;
interface RedimSubStmt_Node_178_ extends BaseSymbolNode {
        symbol:"redimSubStmt";
        
        children:[ImplicitCallStmt_InStmt_Node,LPAREN_Node,Subscripts_Node,RPAREN_Node];
        parent:RedimStmt_Node_175 | RedimStmt_Node_176 | RedimStmt_35_group_3_Parent_Node;
      }
type RedimSubStmt_Node_178 = RedimSubStmt_Node_178_;
interface EXIT_DO_Node_ extends BaseTokenNode {
            token:"EXIT_DO";
            parent:ExitStmt_Node_179;
          }
export type EXIT_DO_Node = EXIT_DO_Node_;
interface ExitStmt_Node_179_ extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[EXIT_DO_Node];
        parent:BlockStmt_Node_167;
      }
type ExitStmt_Node_179 = ExitStmt_Node_179_;
interface EXIT_FOR_Node_ extends BaseTokenNode {
            token:"EXIT_FOR";
            parent:ExitStmt_Node_180;
          }
export type EXIT_FOR_Node = EXIT_FOR_Node_;
interface ExitStmt_Node_180_ extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[EXIT_FOR_Node];
        parent:BlockStmt_Node_167;
      }
type ExitStmt_Node_180 = ExitStmt_Node_180_;
interface EXIT_FUNCTION_Node_ extends BaseTokenNode {
            token:"EXIT_FUNCTION";
            parent:ExitStmt_Node_181;
          }
export type EXIT_FUNCTION_Node = EXIT_FUNCTION_Node_;
interface ExitStmt_Node_181_ extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[EXIT_FUNCTION_Node];
        parent:BlockStmt_Node_167;
      }
type ExitStmt_Node_181 = ExitStmt_Node_181_;
interface EXIT_PROPERTY_Node_ extends BaseTokenNode {
            token:"EXIT_PROPERTY";
            parent:ExitStmt_Node_182;
          }
export type EXIT_PROPERTY_Node = EXIT_PROPERTY_Node_;
interface ExitStmt_Node_182_ extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[EXIT_PROPERTY_Node];
        parent:BlockStmt_Node_167;
      }
type ExitStmt_Node_182 = ExitStmt_Node_182_;
interface EXIT_SUB_Node_ extends BaseTokenNode {
            token:"EXIT_SUB";
            parent:ExitStmt_Node_183;
          }
export type EXIT_SUB_Node = EXIT_SUB_Node_;
interface ExitStmt_Node_183_ extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[EXIT_SUB_Node];
        parent:BlockStmt_Node_167;
      }
type ExitStmt_Node_183 = ExitStmt_Node_183_;
interface END_Node_ extends BaseTokenNode {
            token:"END";
            parent:ExitStmt_Node_184;
          }
export type END_Node = END_Node_;
interface ExitStmt_Node_184_ extends BaseSymbolNode {
        symbol:"exitStmt";
        
        children:[END_Node];
        parent:BlockStmt_Node_167;
      }
type ExitStmt_Node_184 = ExitStmt_Node_184_;
interface LET_Node_ extends BaseTokenNode {
            token:"LET";
            parent:LetStmt_Node_185 | LetStmt_Node_187 | LetStmt_Node_189;
          }
export type LET_Node = LET_Node_;
interface EQ_Node_ extends BaseTokenNode {
            token:"EQ";
            parent:LetStmt_Node_185 | LetStmt_Node_186 | SetStmt_Node | ArgDefaultValue_Node;
          }
export type EQ_Node = EQ_Node_;
interface LetStmt_Node_185_ extends BaseSymbolNode {
        symbol:"letStmt";
        
        children:[LET_Node,ImplicitCallStmt_InStmt_Node,EQ_Node,ValueStmt_Node];
        parent:BlockStmt_Node_171;
      }
type LetStmt_Node_185 = LetStmt_Node_185_;
interface LetStmt_Node_186_ extends BaseSymbolNode {
        symbol:"letStmt";
        
        children:[ImplicitCallStmt_InStmt_Node,EQ_Node,ValueStmt_Node];
        parent:BlockStmt_Node_171;
      }
type LetStmt_Node_186 = LetStmt_Node_186_;
interface PLUS_EQ_Node_ extends BaseTokenNode {
            token:"PLUS_EQ";
            parent:LetStmt_Node_187 | LetStmt_Node_188;
          }
export type PLUS_EQ_Node = PLUS_EQ_Node_;
interface LetStmt_Node_187_ extends BaseSymbolNode {
        symbol:"letStmt";
        
        children:[LET_Node,ImplicitCallStmt_InStmt_Node,PLUS_EQ_Node,ValueStmt_Node];
        parent:BlockStmt_Node_171;
      }
type LetStmt_Node_187 = LetStmt_Node_187_;
interface LetStmt_Node_188_ extends BaseSymbolNode {
        symbol:"letStmt";
        
        children:[ImplicitCallStmt_InStmt_Node,PLUS_EQ_Node,ValueStmt_Node];
        parent:BlockStmt_Node_171;
      }
type LetStmt_Node_188 = LetStmt_Node_188_;
interface MINUS_EQ_Node_ extends BaseTokenNode {
            token:"MINUS_EQ";
            parent:LetStmt_Node_189 | LetStmt_Node_190;
          }
export type MINUS_EQ_Node = MINUS_EQ_Node_;
interface LetStmt_Node_189_ extends BaseSymbolNode {
        symbol:"letStmt";
        
        children:[LET_Node,ImplicitCallStmt_InStmt_Node,MINUS_EQ_Node,ValueStmt_Node];
        parent:BlockStmt_Node_171;
      }
type LetStmt_Node_189 = LetStmt_Node_189_;
interface LetStmt_Node_190_ extends BaseSymbolNode {
        symbol:"letStmt";
        
        children:[ImplicitCallStmt_InStmt_Node,MINUS_EQ_Node,ValueStmt_Node];
        parent:BlockStmt_Node_171;
      }
type LetStmt_Node_190 = LetStmt_Node_190_;
interface SET_Node_ extends BaseTokenNode {
            token:"SET";
            parent:SetStmt_Node;
          }
export type SET_Node = SET_Node_;
interface SetStmt_Node_ extends BaseSymbolNode {
        symbol:"setStmt";
        
        children:[SET_Node,ImplicitCallStmt_InStmt_Node,EQ_Node,ValueStmt_Node];
        parent:BlockStmt_Node_169;
      }
type SetStmt_Node = SetStmt_Node_;
interface ExplicitCallStmt_Node_192_ extends BaseSymbolNode {
        symbol:"explicitCallStmt";
        
        children:[ECS_MemberProcedureCall_Node];
        parent:BlockStmt_Node_168;
      }
type ExplicitCallStmt_Node_192 = ExplicitCallStmt_Node_192_;
interface ExplicitCallStmt_Node_193_ extends BaseSymbolNode {
        symbol:"explicitCallStmt";
        
        children:[ECS_ProcedureCall_Node];
        parent:BlockStmt_Node_168;
      }
type ExplicitCallStmt_Node_193 = ExplicitCallStmt_Node_193_;
interface CALL_Node_ extends BaseTokenNode {
            token:"CALL";
            parent:ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_198 | ECS_MemberProcedureCall_Node_199 | ECS_MemberProcedureCall_Node_200 | ECS_MemberProcedureCall_Node_201 | ECS_MemberProcedureCall_Node_202 | ECS_MemberProcedureCall_Node_203 | ECS_MemberProcedureCall_Node_204 | ECS_MemberProcedureCall_Node_205 | ECS_MemberProcedureCall_Node_206 | ECS_MemberProcedureCall_Node_207 | ECS_MemberProcedureCall_Node_208 | ECS_MemberProcedureCall_Node_209 | ECS_ProcedureCall_Node_210 | ECS_ProcedureCall_Node_211 | ECS_ProcedureCall_Node_212 | ECS_ProcedureCall_Node_213 | ECS_ProcedureCall_Node_214 | ECS_ProcedureCall_Node_215 | ECS_ProcedureCall_Node_216 | ECS_ProcedureCall_Node_217;
          }
export type CALL_Node = CALL_Node_;
interface TOKEN_0_Node_ extends BaseTokenNode {
            token:".";
            parent:ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_198 | ECS_MemberProcedureCall_Node_199 | ECS_MemberProcedureCall_Node_200 | ECS_MemberProcedureCall_Node_201 | ECS_MemberProcedureCall_Node_202 | ECS_MemberProcedureCall_Node_203 | ECS_MemberProcedureCall_Node_204 | ECS_MemberProcedureCall_Node_205 | ECS_MemberProcedureCall_Node_206 | ECS_MemberProcedureCall_Node_207 | ECS_MemberProcedureCall_Node_208 | ECS_MemberProcedureCall_Node_209 | ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_226 | ICS_B_MemberProcedureCall_Node_227 | ICS_B_MemberProcedureCall_Node_228 | ICS_B_MemberProcedureCall_Node_229 | ICS_B_MemberProcedureCall_Node_230 | ICS_B_MemberProcedureCall_Node_231 | ICS_B_MemberProcedureCall_Node_232 | ICS_B_MemberProcedureCall_Node_233 | ICS_B_MemberProcedureCall_Node_234 | ICS_B_MemberProcedureCall_Node_235 | ICS_S_MemberCall_Node_310 | ICS_S_MemberCall_Node_311 | ComplexType_97_group_1_Parent_Node;
          }
export type TOKEN_0_Node = TOKEN_0_Node_;
interface ECS_MemberProcedureCall_Node_194_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,...ECS_MemberProcedureCall_49_group_5_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ExplicitCallStmt_Node_192;
      }
type ECS_MemberProcedureCall_Node_194 = ECS_MemberProcedureCall_Node_194_;
interface ECS_MemberProcedureCall_Node_195_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,...ECS_MemberProcedureCall_49_group_5_Node];
        parent:ExplicitCallStmt_Node_192;
      }
type ECS_MemberProcedureCall_Node_195 = ECS_MemberProcedureCall_Node_195_;
interface ECS_MemberProcedureCall_Node_196_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ExplicitCallStmt_Node_192;
      }
type ECS_MemberProcedureCall_Node_196 = ECS_MemberProcedureCall_Node_196_;
interface ECS_MemberProcedureCall_Node_197_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ExplicitCallStmt_Node_192;
      }
type ECS_MemberProcedureCall_Node_197 = ECS_MemberProcedureCall_Node_197_;
interface ECS_MemberProcedureCall_Node_198_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,...ECS_MemberProcedureCall_49_group_5_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ExplicitCallStmt_Node_192;
      }
type ECS_MemberProcedureCall_Node_198 = ECS_MemberProcedureCall_Node_198_;
interface ECS_MemberProcedureCall_Node_199_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,...ECS_MemberProcedureCall_49_group_5_Node];
        parent:ExplicitCallStmt_Node_192;
      }
type ECS_MemberProcedureCall_Node_199 = ECS_MemberProcedureCall_Node_199_;
interface ECS_MemberProcedureCall_Node_200_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ExplicitCallStmt_Node_192;
      }
type ECS_MemberProcedureCall_Node_200 = ECS_MemberProcedureCall_Node_200_;
interface ECS_MemberProcedureCall_Node_201_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node];
        parent:ExplicitCallStmt_Node_192;
      }
type ECS_MemberProcedureCall_Node_201 = ECS_MemberProcedureCall_Node_201_;
interface ECS_MemberProcedureCall_Node_202_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,...ECS_MemberProcedureCall_49_group_5_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ExplicitCallStmt_Node_192;
      }
type ECS_MemberProcedureCall_Node_202 = ECS_MemberProcedureCall_Node_202_;
interface ECS_MemberProcedureCall_Node_203_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,...ECS_MemberProcedureCall_49_group_5_Node];
        parent:ExplicitCallStmt_Node_192;
      }
type ECS_MemberProcedureCall_Node_203 = ECS_MemberProcedureCall_Node_203_;
interface ECS_MemberProcedureCall_Node_204_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ExplicitCallStmt_Node_192;
      }
type ECS_MemberProcedureCall_Node_204 = ECS_MemberProcedureCall_Node_204_;
interface ECS_MemberProcedureCall_Node_205_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ExplicitCallStmt_Node_192;
      }
type ECS_MemberProcedureCall_Node_205 = ECS_MemberProcedureCall_Node_205_;
interface ECS_MemberProcedureCall_Node_206_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,...ECS_MemberProcedureCall_49_group_5_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ExplicitCallStmt_Node_192;
      }
type ECS_MemberProcedureCall_Node_206 = ECS_MemberProcedureCall_Node_206_;
interface ECS_MemberProcedureCall_Node_207_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,...ECS_MemberProcedureCall_49_group_5_Node];
        parent:ExplicitCallStmt_Node_192;
      }
type ECS_MemberProcedureCall_Node_207 = ECS_MemberProcedureCall_Node_207_;
interface ECS_MemberProcedureCall_Node_208_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ExplicitCallStmt_Node_192;
      }
type ECS_MemberProcedureCall_Node_208 = ECS_MemberProcedureCall_Node_208_;
interface ECS_MemberProcedureCall_Node_209_ extends BaseSymbolNode {
        symbol:"eCS_MemberProcedureCall";
        
        children:[CALL_Node,TOKEN_0_Node,AmbiguousIdentifier_Node];
        parent:ExplicitCallStmt_Node_192;
      }
type ECS_MemberProcedureCall_Node_209 = ECS_MemberProcedureCall_Node_209_;
interface ECS_ProcedureCall_Node_210_ extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[CALL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...ECS_MemberProcedureCall_49_group_5_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ExplicitCallStmt_Node_193;
      }
type ECS_ProcedureCall_Node_210 = ECS_ProcedureCall_Node_210_;
interface ECS_ProcedureCall_Node_211_ extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[CALL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...ECS_MemberProcedureCall_49_group_5_Node];
        parent:ExplicitCallStmt_Node_193;
      }
type ECS_ProcedureCall_Node_211 = ECS_ProcedureCall_Node_211_;
interface ECS_ProcedureCall_Node_212_ extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[CALL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ExplicitCallStmt_Node_193;
      }
type ECS_ProcedureCall_Node_212 = ECS_ProcedureCall_Node_212_;
interface ECS_ProcedureCall_Node_213_ extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[CALL_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ExplicitCallStmt_Node_193;
      }
type ECS_ProcedureCall_Node_213 = ECS_ProcedureCall_Node_213_;
interface ECS_ProcedureCall_Node_214_ extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[CALL_Node,AmbiguousIdentifier_Node,...ECS_MemberProcedureCall_49_group_5_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ExplicitCallStmt_Node_193;
      }
type ECS_ProcedureCall_Node_214 = ECS_ProcedureCall_Node_214_;
interface ECS_ProcedureCall_Node_215_ extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[CALL_Node,AmbiguousIdentifier_Node,...ECS_MemberProcedureCall_49_group_5_Node];
        parent:ExplicitCallStmt_Node_193;
      }
type ECS_ProcedureCall_Node_215 = ECS_ProcedureCall_Node_215_;
interface ECS_ProcedureCall_Node_216_ extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[CALL_Node,AmbiguousIdentifier_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ExplicitCallStmt_Node_193;
      }
type ECS_ProcedureCall_Node_216 = ECS_ProcedureCall_Node_216_;
interface ECS_ProcedureCall_Node_217_ extends BaseSymbolNode {
        symbol:"eCS_ProcedureCall";
        
        children:[CALL_Node,AmbiguousIdentifier_Node];
        parent:ExplicitCallStmt_Node_193;
      }
type ECS_ProcedureCall_Node_217 = ECS_ProcedureCall_Node_217_;
interface ImplicitCallStmt_InBlock_Node_218_ extends BaseSymbolNode {
        symbol:"implicitCallStmt_InBlock";
        
        children:[ICS_B_MemberProcedureCall_Node];
        parent:BlockStmt_Node_173;
      }
type ImplicitCallStmt_InBlock_Node_218 = ImplicitCallStmt_InBlock_Node_218_;
interface ImplicitCallStmt_InBlock_Node_219_ extends BaseSymbolNode {
        symbol:"implicitCallStmt_InBlock";
        
        children:[ICS_B_ProcedureCall_Node];
        parent:BlockStmt_Node_173;
      }
type ImplicitCallStmt_InBlock_Node_219 = ImplicitCallStmt_InBlock_Node_219_;
interface ICS_B_MemberProcedureCall_Node_220_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgsCall_Node,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
type ICS_B_MemberProcedureCall_Node_220 = ICS_B_MemberProcedureCall_Node_220_;
interface ICS_B_MemberProcedureCall_Node_221_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgsCall_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
type ICS_B_MemberProcedureCall_Node_221 = ICS_B_MemberProcedureCall_Node_221_;
interface ICS_B_MemberProcedureCall_Node_222_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgsCall_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
type ICS_B_MemberProcedureCall_Node_222 = ICS_B_MemberProcedureCall_Node_222_;
interface ICS_B_MemberProcedureCall_Node_223_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgsCall_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
type ICS_B_MemberProcedureCall_Node_223 = ICS_B_MemberProcedureCall_Node_223_;
interface ICS_B_MemberProcedureCall_Node_224_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
type ICS_B_MemberProcedureCall_Node_224 = ICS_B_MemberProcedureCall_Node_224_;
interface ICS_B_MemberProcedureCall_Node_225_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
type ICS_B_MemberProcedureCall_Node_225 = ICS_B_MemberProcedureCall_Node_225_;
interface ICS_B_MemberProcedureCall_Node_226_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
type ICS_B_MemberProcedureCall_Node_226 = ICS_B_MemberProcedureCall_Node_226_;
interface ICS_B_MemberProcedureCall_Node_227_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
type ICS_B_MemberProcedureCall_Node_227 = ICS_B_MemberProcedureCall_Node_227_;
interface ICS_B_MemberProcedureCall_Node_228_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,ArgsCall_Node,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
type ICS_B_MemberProcedureCall_Node_228 = ICS_B_MemberProcedureCall_Node_228_;
interface ICS_B_MemberProcedureCall_Node_229_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,ArgsCall_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
type ICS_B_MemberProcedureCall_Node_229 = ICS_B_MemberProcedureCall_Node_229_;
interface ICS_B_MemberProcedureCall_Node_230_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,ArgsCall_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
type ICS_B_MemberProcedureCall_Node_230 = ICS_B_MemberProcedureCall_Node_230_;
interface ICS_B_MemberProcedureCall_Node_231_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,ArgsCall_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
type ICS_B_MemberProcedureCall_Node_231 = ICS_B_MemberProcedureCall_Node_231_;
interface ICS_B_MemberProcedureCall_Node_232_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
type ICS_B_MemberProcedureCall_Node_232 = ICS_B_MemberProcedureCall_Node_232_;
interface ICS_B_MemberProcedureCall_Node_233_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
type ICS_B_MemberProcedureCall_Node_233 = ICS_B_MemberProcedureCall_Node_233_;
interface ICS_B_MemberProcedureCall_Node_234_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
type ICS_B_MemberProcedureCall_Node_234 = ICS_B_MemberProcedureCall_Node_234_;
interface ICS_B_MemberProcedureCall_Node_235_ extends BaseSymbolNode {
        symbol:"iCS_B_MemberProcedureCall";
        
        children:[ImplicitCallStmt_InStmt_Node,TOKEN_0_Node,AmbiguousIdentifier_Node];
        parent:ImplicitCallStmt_InBlock_Node_218;
      }
type ICS_B_MemberProcedureCall_Node_235 = ICS_B_MemberProcedureCall_Node_235_;
interface ICS_B_ProcedureCall_Node_236_ extends BaseSymbolNode {
        symbol:"iCS_B_ProcedureCall";
        
        children:[AmbiguousIdentifier_Node,ArgsCall_Node,...ICS_B_ProcedureCall_54_group_2_Node];
        parent:ImplicitCallStmt_InBlock_Node_219;
      }
type ICS_B_ProcedureCall_Node_236 = ICS_B_ProcedureCall_Node_236_;
interface ICS_B_ProcedureCall_Node_237_ extends BaseSymbolNode {
        symbol:"iCS_B_ProcedureCall";
        
        children:[AmbiguousIdentifier_Node,ArgsCall_Node];
        parent:ImplicitCallStmt_InBlock_Node_219;
      }
type ICS_B_ProcedureCall_Node_237 = ICS_B_ProcedureCall_Node_237_;
interface ICS_B_ProcedureCall_Node_238_ extends BaseSymbolNode {
        symbol:"iCS_B_ProcedureCall";
        
        children:[AmbiguousIdentifier_Node,...ICS_B_ProcedureCall_54_group_2_Node];
        parent:ImplicitCallStmt_InBlock_Node_219;
      }
type ICS_B_ProcedureCall_Node_238 = ICS_B_ProcedureCall_Node_238_;
interface ICS_B_ProcedureCall_Node_239_ extends BaseSymbolNode {
        symbol:"iCS_B_ProcedureCall";
        
        children:[AmbiguousIdentifier_Node];
        parent:ImplicitCallStmt_InBlock_Node_219;
      }
type ICS_B_ProcedureCall_Node_239 = ICS_B_ProcedureCall_Node_239_;
interface ArgsCall_Node_240_ extends BaseSymbolNode {
        symbol:"argsCall";
        
        children:[ArgCall_Node,...ZeroOrMore<ArgsCall_55_group_1_Node>];
        parent:ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_228 | ICS_B_MemberProcedureCall_Node_229 | ICS_B_MemberProcedureCall_Node_230 | ICS_B_MemberProcedureCall_Node_231 | ICS_B_ProcedureCall_Node_236 | ICS_B_ProcedureCall_Node_237 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_316 | ICS_S_ProcedureOrArrayCall_Node_317 | ICS_S_ProcedureOrArrayCall_Node_322 | ICS_S_ProcedureOrArrayCall_Node_323 | ICS_S_ProcedureOrArrayCall_Node_324 | ICS_S_ProcedureOrArrayCall_Node_325 | ECS_MemberProcedureCall_49_group_5_Parent_Node;
      }
type ArgsCall_Node_240 = ArgsCall_Node_240_;
interface ArgsCall_Node_241_ extends BaseSymbolNode {
        symbol:"argsCall";
        
        children:[...ZeroOrMore<ArgsCall_55_group_1_Node>];
        parent:ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_228 | ICS_B_MemberProcedureCall_Node_229 | ICS_B_MemberProcedureCall_Node_230 | ICS_B_MemberProcedureCall_Node_231 | ICS_B_ProcedureCall_Node_236 | ICS_B_ProcedureCall_Node_237 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_316 | ICS_S_ProcedureOrArrayCall_Node_317 | ICS_S_ProcedureOrArrayCall_Node_322 | ICS_S_ProcedureOrArrayCall_Node_323 | ICS_S_ProcedureOrArrayCall_Node_324 | ICS_S_ProcedureOrArrayCall_Node_325 | ECS_MemberProcedureCall_49_group_5_Parent_Node;
      }
type ArgsCall_Node_241 = ArgsCall_Node_241_;
interface BYREF_Node_ extends BaseTokenNode {
            token:"BYREF";
            parent:ArgCall_Node_242 | ArgCall_Node_243 | ArgCall_Node_246 | ArgCall_Node_247 | Arg_Node_476 | Arg_Node_477 | Arg_Node_478 | Arg_Node_479 | Arg_Node_480 | Arg_Node_481 | Arg_Node_482 | Arg_Node_483 | Arg_Node_484 | Arg_Node_485 | Arg_Node_486 | Arg_Node_487 | Arg_Node_488 | Arg_Node_489 | Arg_Node_490 | Arg_Node_491 | Arg_Node_492 | Arg_Node_493 | Arg_Node_494 | Arg_Node_495 | Arg_Node_496 | Arg_Node_497 | Arg_Node_498 | Arg_Node_499 | Arg_Node_500 | Arg_Node_501 | Arg_Node_502 | Arg_Node_503 | Arg_Node_504 | Arg_Node_505 | Arg_Node_506 | Arg_Node_507 | Arg_Node_540 | Arg_Node_541 | Arg_Node_542 | Arg_Node_543 | Arg_Node_544 | Arg_Node_545 | Arg_Node_546 | Arg_Node_547 | Arg_Node_548 | Arg_Node_549 | Arg_Node_550 | Arg_Node_551 | Arg_Node_552 | Arg_Node_553 | Arg_Node_554 | Arg_Node_555 | Arg_Node_556 | Arg_Node_557 | Arg_Node_558 | Arg_Node_559 | Arg_Node_560 | Arg_Node_561 | Arg_Node_562 | Arg_Node_563 | Arg_Node_564 | Arg_Node_565 | Arg_Node_566 | Arg_Node_567 | Arg_Node_568 | Arg_Node_569 | Arg_Node_570 | Arg_Node_571;
          }
export type BYREF_Node = BYREF_Node_;
interface ArgCall_Node_242_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,BYREF_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
type ArgCall_Node_242 = ArgCall_Node_242_;
interface ArgCall_Node_243_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,BYREF_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
type ArgCall_Node_243 = ArgCall_Node_243_;
interface ArgCall_Node_244_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
type ArgCall_Node_244 = ArgCall_Node_244_;
interface ArgCall_Node_245_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
type ArgCall_Node_245 = ArgCall_Node_245_;
interface ArgCall_Node_246_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[BYREF_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
type ArgCall_Node_246 = ArgCall_Node_246_;
interface ArgCall_Node_247_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[BYREF_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
type ArgCall_Node_247 = ArgCall_Node_247_;
interface ArgCall_Node_248_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
type ArgCall_Node_248 = ArgCall_Node_248_;
interface ArgCall_Node_249_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
type ArgCall_Node_249 = ArgCall_Node_249_;
interface BYVAL_Node_ extends BaseTokenNode {
            token:"BYVAL";
            parent:ArgCall_Node_250 | ArgCall_Node_251 | ArgCall_Node_254 | ArgCall_Node_255 | Arg_Node_348 | Arg_Node_349 | Arg_Node_350 | Arg_Node_351 | Arg_Node_352 | Arg_Node_353 | Arg_Node_354 | Arg_Node_355 | Arg_Node_356 | Arg_Node_357 | Arg_Node_358 | Arg_Node_359 | Arg_Node_360 | Arg_Node_361 | Arg_Node_362 | Arg_Node_363 | Arg_Node_364 | Arg_Node_365 | Arg_Node_366 | Arg_Node_367 | Arg_Node_368 | Arg_Node_369 | Arg_Node_370 | Arg_Node_371 | Arg_Node_372 | Arg_Node_373 | Arg_Node_374 | Arg_Node_375 | Arg_Node_376 | Arg_Node_377 | Arg_Node_378 | Arg_Node_379 | Arg_Node_412 | Arg_Node_413 | Arg_Node_414 | Arg_Node_415 | Arg_Node_416 | Arg_Node_417 | Arg_Node_418 | Arg_Node_419 | Arg_Node_420 | Arg_Node_421 | Arg_Node_422 | Arg_Node_423 | Arg_Node_424 | Arg_Node_425 | Arg_Node_426 | Arg_Node_427 | Arg_Node_428 | Arg_Node_429 | Arg_Node_430 | Arg_Node_431 | Arg_Node_432 | Arg_Node_433 | Arg_Node_434 | Arg_Node_435 | Arg_Node_436 | Arg_Node_437 | Arg_Node_438 | Arg_Node_439 | Arg_Node_440 | Arg_Node_441 | Arg_Node_442 | Arg_Node_443;
          }
export type BYVAL_Node = BYVAL_Node_;
interface ArgCall_Node_250_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,BYVAL_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
type ArgCall_Node_250 = ArgCall_Node_250_;
interface ArgCall_Node_251_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,BYVAL_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
type ArgCall_Node_251 = ArgCall_Node_251_;
interface ArgCall_Node_252_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
type ArgCall_Node_252 = ArgCall_Node_252_;
interface ArgCall_Node_253_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
type ArgCall_Node_253 = ArgCall_Node_253_;
interface ArgCall_Node_254_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[BYVAL_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
type ArgCall_Node_254 = ArgCall_Node_254_;
interface ArgCall_Node_255_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[BYVAL_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
type ArgCall_Node_255 = ArgCall_Node_255_;
interface ArgCall_Node_256_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
type ArgCall_Node_256 = ArgCall_Node_256_;
interface ArgCall_Node_257_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
type ArgCall_Node_257 = ArgCall_Node_257_;
interface PARAMARRAY_Node_ extends BaseTokenNode {
            token:"PARAMARRAY";
            parent:ArgCall_Node_258 | ArgCall_Node_259 | ArgCall_Node_262 | ArgCall_Node_263 | Arg_Node_348 | Arg_Node_349 | Arg_Node_350 | Arg_Node_351 | Arg_Node_352 | Arg_Node_353 | Arg_Node_354 | Arg_Node_355 | Arg_Node_356 | Arg_Node_357 | Arg_Node_358 | Arg_Node_359 | Arg_Node_360 | Arg_Node_361 | Arg_Node_362 | Arg_Node_363 | Arg_Node_380 | Arg_Node_381 | Arg_Node_382 | Arg_Node_383 | Arg_Node_384 | Arg_Node_385 | Arg_Node_386 | Arg_Node_387 | Arg_Node_388 | Arg_Node_389 | Arg_Node_390 | Arg_Node_391 | Arg_Node_392 | Arg_Node_393 | Arg_Node_394 | Arg_Node_395 | Arg_Node_412 | Arg_Node_413 | Arg_Node_414 | Arg_Node_415 | Arg_Node_416 | Arg_Node_417 | Arg_Node_418 | Arg_Node_419 | Arg_Node_420 | Arg_Node_421 | Arg_Node_422 | Arg_Node_423 | Arg_Node_424 | Arg_Node_425 | Arg_Node_426 | Arg_Node_427 | Arg_Node_444 | Arg_Node_445 | Arg_Node_446 | Arg_Node_447 | Arg_Node_448 | Arg_Node_449 | Arg_Node_450 | Arg_Node_451 | Arg_Node_452 | Arg_Node_453 | Arg_Node_454 | Arg_Node_455 | Arg_Node_456 | Arg_Node_457 | Arg_Node_458 | Arg_Node_459 | Arg_Node_476 | Arg_Node_477 | Arg_Node_478 | Arg_Node_479 | Arg_Node_480 | Arg_Node_481 | Arg_Node_482 | Arg_Node_483 | Arg_Node_484 | Arg_Node_485 | Arg_Node_486 | Arg_Node_487 | Arg_Node_488 | Arg_Node_489 | Arg_Node_490 | Arg_Node_491 | Arg_Node_508 | Arg_Node_509 | Arg_Node_510 | Arg_Node_511 | Arg_Node_512 | Arg_Node_513 | Arg_Node_514 | Arg_Node_515 | Arg_Node_516 | Arg_Node_517 | Arg_Node_518 | Arg_Node_519 | Arg_Node_520 | Arg_Node_521 | Arg_Node_522 | Arg_Node_523 | Arg_Node_540 | Arg_Node_541 | Arg_Node_542 | Arg_Node_543 | Arg_Node_544 | Arg_Node_545 | Arg_Node_546 | Arg_Node_547 | Arg_Node_548 | Arg_Node_549 | Arg_Node_550 | Arg_Node_551 | Arg_Node_552 | Arg_Node_553 | Arg_Node_554 | Arg_Node_555 | Arg_Node_572 | Arg_Node_573 | Arg_Node_574 | Arg_Node_575 | Arg_Node_576 | Arg_Node_577 | Arg_Node_578 | Arg_Node_579 | Arg_Node_580 | Arg_Node_581 | Arg_Node_582 | Arg_Node_583 | Arg_Node_584 | Arg_Node_585 | Arg_Node_586 | Arg_Node_587;
          }
export type PARAMARRAY_Node = PARAMARRAY_Node_;
interface ArgCall_Node_258_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,PARAMARRAY_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
type ArgCall_Node_258 = ArgCall_Node_258_;
interface ArgCall_Node_259_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,PARAMARRAY_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
type ArgCall_Node_259 = ArgCall_Node_259_;
interface ArgCall_Node_260_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
type ArgCall_Node_260 = ArgCall_Node_260_;
interface ArgCall_Node_261_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[LPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
type ArgCall_Node_261 = ArgCall_Node_261_;
interface ArgCall_Node_262_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[PARAMARRAY_Node,RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
type ArgCall_Node_262 = ArgCall_Node_262_;
interface ArgCall_Node_263_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[PARAMARRAY_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
type ArgCall_Node_263 = ArgCall_Node_263_;
interface ArgCall_Node_264_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[RPAREN_Node,ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
type ArgCall_Node_264 = ArgCall_Node_264_;
interface ArgCall_Node_265_ extends BaseSymbolNode {
        symbol:"argCall";
        
        children:[ValueStmt_Node];
        parent:ArgsCall_Node_240 | ArgsCall_55_group_1_Parent_Node_636;
      }
type ArgCall_Node_265 = ArgCall_Node_265_;
interface DIM_Node_ extends BaseTokenNode {
            token:"DIM";
            parent:VariableStmt_Node_266 | VariableStmt_Node_267;
          }
export type DIM_Node = DIM_Node_;
interface WITHEVENTS_Node_ extends BaseTokenNode {
            token:"WITHEVENTS";
            parent:VariableStmt_Node_266 | VariableStmt_Node_268 | VariableStmt_Node_270;
          }
export type WITHEVENTS_Node = WITHEVENTS_Node_;
interface VariableStmt_Node_266_ extends BaseSymbolNode {
        symbol:"variableStmt";
        
        children:[DIM_Node,WITHEVENTS_Node,VariableListStmt_Node];
        parent:ModuleDeclarationsElement_Node | BlockStmt_Node_172;
      }
type VariableStmt_Node_266 = VariableStmt_Node_266_;
interface VariableStmt_Node_267_ extends BaseSymbolNode {
        symbol:"variableStmt";
        
        children:[DIM_Node,VariableListStmt_Node];
        parent:ModuleDeclarationsElement_Node | BlockStmt_Node_172;
      }
type VariableStmt_Node_267 = VariableStmt_Node_267_;
interface VariableStmt_Node_268_ extends BaseSymbolNode {
        symbol:"variableStmt";
        
        children:[STATIC_Node,WITHEVENTS_Node,VariableListStmt_Node];
        parent:ModuleDeclarationsElement_Node | BlockStmt_Node_172;
      }
type VariableStmt_Node_268 = VariableStmt_Node_268_;
interface VariableStmt_Node_269_ extends BaseSymbolNode {
        symbol:"variableStmt";
        
        children:[STATIC_Node,VariableListStmt_Node];
        parent:ModuleDeclarationsElement_Node | BlockStmt_Node_172;
      }
type VariableStmt_Node_269 = VariableStmt_Node_269_;
interface VariableStmt_Node_270_ extends BaseSymbolNode {
        symbol:"variableStmt";
        
        children:[Visibility_Node,WITHEVENTS_Node,VariableListStmt_Node];
        parent:ModuleDeclarationsElement_Node | BlockStmt_Node_172;
      }
type VariableStmt_Node_270 = VariableStmt_Node_270_;
interface VariableStmt_Node_271_ extends BaseSymbolNode {
        symbol:"variableStmt";
        
        children:[Visibility_Node,VariableListStmt_Node];
        parent:ModuleDeclarationsElement_Node | BlockStmt_Node_172;
      }
type VariableStmt_Node_271 = VariableStmt_Node_271_;
interface VariableListStmt_Node_ extends BaseSymbolNode {
        symbol:"variableListStmt";
        
        children:[VariableSubStmt_Node,...ZeroOrMore<VariableListStmt_62_group_1_Node>];
        parent:VariableStmt_Node_266 | VariableStmt_Node_267 | VariableStmt_Node_268 | VariableStmt_Node_269 | VariableStmt_Node_270 | VariableStmt_Node_271;
      }
type VariableListStmt_Node = VariableListStmt_Node_;
interface VariableSubStmt_Node_273_ extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[AmbiguousIdentifier_Node,...VariableSubStmt_63_group_1_Node,TypeHint_Node,AsTypeClause_Node];
        parent:VariableListStmt_Node | VariableListStmt_62_group_1_Parent_Node;
      }
type VariableSubStmt_Node_273 = VariableSubStmt_Node_273_;
interface VariableSubStmt_Node_274_ extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[AmbiguousIdentifier_Node,...VariableSubStmt_63_group_1_Node,TypeHint_Node];
        parent:VariableListStmt_Node | VariableListStmt_62_group_1_Parent_Node;
      }
type VariableSubStmt_Node_274 = VariableSubStmt_Node_274_;
interface VariableSubStmt_Node_275_ extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[AmbiguousIdentifier_Node,...VariableSubStmt_63_group_1_Node,AsTypeClause_Node];
        parent:VariableListStmt_Node | VariableListStmt_62_group_1_Parent_Node;
      }
type VariableSubStmt_Node_275 = VariableSubStmt_Node_275_;
interface VariableSubStmt_Node_276_ extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[AmbiguousIdentifier_Node,...VariableSubStmt_63_group_1_Node];
        parent:VariableListStmt_Node | VariableListStmt_62_group_1_Parent_Node;
      }
type VariableSubStmt_Node_276 = VariableSubStmt_Node_276_;
interface VariableSubStmt_Node_277_ extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:VariableListStmt_Node | VariableListStmt_62_group_1_Parent_Node;
      }
type VariableSubStmt_Node_277 = VariableSubStmt_Node_277_;
interface VariableSubStmt_Node_278_ extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node];
        parent:VariableListStmt_Node | VariableListStmt_62_group_1_Parent_Node;
      }
type VariableSubStmt_Node_278 = VariableSubStmt_Node_278_;
interface VariableSubStmt_Node_279_ extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:VariableListStmt_Node | VariableListStmt_62_group_1_Parent_Node;
      }
type VariableSubStmt_Node_279 = VariableSubStmt_Node_279_;
interface VariableSubStmt_Node_280_ extends BaseSymbolNode {
        symbol:"variableSubStmt";
        
        children:[AmbiguousIdentifier_Node];
        parent:VariableListStmt_Node | VariableListStmt_62_group_1_Parent_Node;
      }
type VariableSubStmt_Node_280 = VariableSubStmt_Node_280_;
interface Indexes_Node_ extends BaseSymbolNode {
        symbol:"indexes";
        
        children:[ValueStmt_Node,...ZeroOrMore<EraseStmt_34_group_2_Node>];
        parent:ECS_MemberProcedureCall_49_group_10_Parent_Node;
      }
type Indexes_Node = Indexes_Node_;
interface Subscript__Node_282_ extends BaseSymbolNode {
        symbol:"subscript_";
        
        children:[...Subscript__65_group_0_Node,ValueStmt_Node];
        parent:Subscripts_Node | Subscripts_66_group_1_Parent_Node;
      }
type Subscript__Node_282 = Subscript__Node_282_;
interface Subscript__Node_283_ extends BaseSymbolNode {
        symbol:"subscript_";
        
        children:[ValueStmt_Node];
        parent:Subscripts_Node | Subscripts_66_group_1_Parent_Node;
      }
type Subscript__Node_283 = Subscript__Node_283_;
interface Subscripts_Node_ extends BaseSymbolNode {
        symbol:"subscripts";
        
        children:[Subscript__Node,...ZeroOrMore<Subscripts_66_group_1_Node>];
        parent:RedimSubStmt_Node_177 | RedimSubStmt_Node_178 | ICS_B_ProcedureCall_54_group_2_Parent_Node | VariableSubStmt_63_group_1_Parent_Node_639;
      }
type Subscripts_Node = Subscripts_Node_;
interface Subscript__Node_285_ extends BaseSymbolNode {
        symbol:"subscript_";
        
        children:[...Subscript__65_group_0_Node,ValueStmt_Node];
        parent:Subscripts_Node | Subscripts_66_group_1_Parent_Node;
      }
type Subscript__Node_285 = Subscript__Node_285_;
interface Subscript__Node_286_ extends BaseSymbolNode {
        symbol:"subscript_";
        
        children:[ValueStmt_Node];
        parent:Subscripts_Node | Subscripts_66_group_1_Parent_Node;
      }
type Subscript__Node_286 = Subscript__Node_286_;
interface ArgList_Node_287_ extends BaseSymbolNode {
        symbol:"argList";
        
        children:[LPAREN_Node,...ArgList_68_group_1_Node,RPAREN_Node];
        parent:SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_25 | SubStmt_Node_26 | SubStmt_Node_29 | SubStmt_Node_30 | SubStmt_Node_33 | SubStmt_Node_34 | PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_73 | PropertySetStmt_Node_74 | PropertySetStmt_Node_77 | PropertySetStmt_Node_78 | PropertySetStmt_Node_81 | PropertySetStmt_Node_82 | PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_90 | PropertyLetStmt_Node_93 | PropertyLetStmt_Node_94 | PropertyLetStmt_Node_97 | PropertyLetStmt_Node_98 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_127 | FunctionStmt_Node_128 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_143 | FunctionStmt_Node_144 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_157 | FunctionStmt_Node_158 | FunctionStmt_Node_159 | FunctionStmt_Node_160;
      }
type ArgList_Node_287 = ArgList_Node_287_;
interface ArgList_Node_288_ extends BaseSymbolNode {
        symbol:"argList";
        
        children:[LPAREN_Node,RPAREN_Node];
        parent:SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_25 | SubStmt_Node_26 | SubStmt_Node_29 | SubStmt_Node_30 | SubStmt_Node_33 | SubStmt_Node_34 | PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_73 | PropertySetStmt_Node_74 | PropertySetStmt_Node_77 | PropertySetStmt_Node_78 | PropertySetStmt_Node_81 | PropertySetStmt_Node_82 | PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_90 | PropertyLetStmt_Node_93 | PropertyLetStmt_Node_94 | PropertyLetStmt_Node_97 | PropertyLetStmt_Node_98 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_127 | FunctionStmt_Node_128 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_143 | FunctionStmt_Node_144 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_157 | FunctionStmt_Node_158 | FunctionStmt_Node_159 | FunctionStmt_Node_160;
      }
type ArgList_Node_288 = ArgList_Node_288_;
interface ValueStmt_Node_289_ extends BaseSymbolNode {
        symbol:"valueStmt";
        
        children:[Literal_Node];
        parent:EraseStmt_Node | LetStmt_Node_185 | LetStmt_Node_186 | LetStmt_Node_187 | LetStmt_Node_188 | LetStmt_Node_189 | LetStmt_Node_190 | SetStmt_Node | ArgCall_Node_242 | ArgCall_Node_243 | ArgCall_Node_244 | ArgCall_Node_245 | ArgCall_Node_246 | ArgCall_Node_247 | ArgCall_Node_248 | ArgCall_Node_249 | ArgCall_Node_250 | ArgCall_Node_251 | ArgCall_Node_252 | ArgCall_Node_253 | ArgCall_Node_254 | ArgCall_Node_255 | ArgCall_Node_256 | ArgCall_Node_257 | ArgCall_Node_258 | ArgCall_Node_259 | ArgCall_Node_260 | ArgCall_Node_261 | ArgCall_Node_262 | ArgCall_Node_263 | ArgCall_Node_264 | ArgCall_Node_265 | Indexes_Node | Subscript__Node_282 | Subscript__Node_283 | Subscript__Node_285 | Subscript__Node_286 | ArgDefaultValue_Node | EraseStmt_34_group_2_Parent_Node | Subscript__65_group_0_Parent_Node | BaseType_107_group_1_Parent_Node;
      }
type ValueStmt_Node_289 = ValueStmt_Node_289_;
interface ValueStmt_Node_290_ extends BaseSymbolNode {
        symbol:"valueStmt";
        
        children:[ImplicitCallStmt_InStmt_Node];
        parent:EraseStmt_Node | LetStmt_Node_185 | LetStmt_Node_186 | LetStmt_Node_187 | LetStmt_Node_188 | LetStmt_Node_189 | LetStmt_Node_190 | SetStmt_Node | ArgCall_Node_242 | ArgCall_Node_243 | ArgCall_Node_244 | ArgCall_Node_245 | ArgCall_Node_246 | ArgCall_Node_247 | ArgCall_Node_248 | ArgCall_Node_249 | ArgCall_Node_250 | ArgCall_Node_251 | ArgCall_Node_252 | ArgCall_Node_253 | ArgCall_Node_254 | ArgCall_Node_255 | ArgCall_Node_256 | ArgCall_Node_257 | ArgCall_Node_258 | ArgCall_Node_259 | ArgCall_Node_260 | ArgCall_Node_261 | ArgCall_Node_262 | ArgCall_Node_263 | ArgCall_Node_264 | ArgCall_Node_265 | Indexes_Node | Subscript__Node_282 | Subscript__Node_283 | Subscript__Node_285 | Subscript__Node_286 | ArgDefaultValue_Node | EraseStmt_34_group_2_Parent_Node | Subscript__65_group_0_Parent_Node | BaseType_107_group_1_Parent_Node;
      }
type ValueStmt_Node_290 = ValueStmt_Node_290_;
interface ImplicitCallStmt_InStmt_Node_291_ extends BaseSymbolNode {
        symbol:"implicitCallStmt_InStmt";
        
        children:[ICS_S_MembersCall_Node];
        parent:RedimSubStmt_Node_177 | RedimSubStmt_Node_178 | LetStmt_Node_185 | LetStmt_Node_186 | LetStmt_Node_187 | LetStmt_Node_188 | LetStmt_Node_189 | LetStmt_Node_190 | SetStmt_Node | ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_198 | ECS_MemberProcedureCall_Node_199 | ECS_MemberProcedureCall_Node_200 | ECS_MemberProcedureCall_Node_201 | ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_226 | ICS_B_MemberProcedureCall_Node_227 | ICS_B_MemberProcedureCall_Node_228 | ICS_B_MemberProcedureCall_Node_229 | ICS_B_MemberProcedureCall_Node_230 | ICS_B_MemberProcedureCall_Node_231 | ICS_B_MemberProcedureCall_Node_232 | ICS_B_MemberProcedureCall_Node_233 | ICS_B_MemberProcedureCall_Node_234 | ICS_B_MemberProcedureCall_Node_235 | ValueStmt_Node_290;
      }
type ImplicitCallStmt_InStmt_Node_291 = ImplicitCallStmt_InStmt_Node_291_;
interface ImplicitCallStmt_InStmt_Node_292_ extends BaseSymbolNode {
        symbol:"implicitCallStmt_InStmt";
        
        children:[ICS_S_VariableOrProcedureCall_Node];
        parent:RedimSubStmt_Node_177 | RedimSubStmt_Node_178 | LetStmt_Node_185 | LetStmt_Node_186 | LetStmt_Node_187 | LetStmt_Node_188 | LetStmt_Node_189 | LetStmt_Node_190 | SetStmt_Node | ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_198 | ECS_MemberProcedureCall_Node_199 | ECS_MemberProcedureCall_Node_200 | ECS_MemberProcedureCall_Node_201 | ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_226 | ICS_B_MemberProcedureCall_Node_227 | ICS_B_MemberProcedureCall_Node_228 | ICS_B_MemberProcedureCall_Node_229 | ICS_B_MemberProcedureCall_Node_230 | ICS_B_MemberProcedureCall_Node_231 | ICS_B_MemberProcedureCall_Node_232 | ICS_B_MemberProcedureCall_Node_233 | ICS_B_MemberProcedureCall_Node_234 | ICS_B_MemberProcedureCall_Node_235 | ValueStmt_Node_290;
      }
type ImplicitCallStmt_InStmt_Node_292 = ImplicitCallStmt_InStmt_Node_292_;
interface ImplicitCallStmt_InStmt_Node_293_ extends BaseSymbolNode {
        symbol:"implicitCallStmt_InStmt";
        
        children:[ICS_S_ProcedureOrArrayCall_Node];
        parent:RedimSubStmt_Node_177 | RedimSubStmt_Node_178 | LetStmt_Node_185 | LetStmt_Node_186 | LetStmt_Node_187 | LetStmt_Node_188 | LetStmt_Node_189 | LetStmt_Node_190 | SetStmt_Node | ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_198 | ECS_MemberProcedureCall_Node_199 | ECS_MemberProcedureCall_Node_200 | ECS_MemberProcedureCall_Node_201 | ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_226 | ICS_B_MemberProcedureCall_Node_227 | ICS_B_MemberProcedureCall_Node_228 | ICS_B_MemberProcedureCall_Node_229 | ICS_B_MemberProcedureCall_Node_230 | ICS_B_MemberProcedureCall_Node_231 | ICS_B_MemberProcedureCall_Node_232 | ICS_B_MemberProcedureCall_Node_233 | ICS_B_MemberProcedureCall_Node_234 | ICS_B_MemberProcedureCall_Node_235 | ValueStmt_Node_290;
      }
type ImplicitCallStmt_InStmt_Node_293 = ImplicitCallStmt_InStmt_Node_293_;
interface ICS_S_MembersCall_Node_294_ extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[ICS_S_VariableOrProcedureCall_Node,...OneOrMore<ICS_S_MemberCall_Node>,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
type ICS_S_MembersCall_Node_294 = ICS_S_MembersCall_Node_294_;
interface ICS_S_MembersCall_Node_295_ extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[ICS_S_VariableOrProcedureCall_Node,...OneOrMore<ICS_S_MemberCall_Node>,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
type ICS_S_MembersCall_Node_295 = ICS_S_MembersCall_Node_295_;
interface ICS_S_MembersCall_Node_296_ extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[ICS_S_VariableOrProcedureCall_Node,...OneOrMore<ICS_S_MemberCall_Node>,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
type ICS_S_MembersCall_Node_296 = ICS_S_MembersCall_Node_296_;
interface ICS_S_MembersCall_Node_297_ extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[ICS_S_VariableOrProcedureCall_Node,...OneOrMore<ICS_S_MemberCall_Node>];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
type ICS_S_MembersCall_Node_297 = ICS_S_MembersCall_Node_297_;
interface ICS_S_MembersCall_Node_298_ extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[...OneOrMore<ICS_S_MemberCall_Node>,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
type ICS_S_MembersCall_Node_298 = ICS_S_MembersCall_Node_298_;
interface ICS_S_MembersCall_Node_299_ extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[...OneOrMore<ICS_S_MemberCall_Node>,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
type ICS_S_MembersCall_Node_299 = ICS_S_MembersCall_Node_299_;
interface ICS_S_MembersCall_Node_300_ extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[...OneOrMore<ICS_S_MemberCall_Node>,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
type ICS_S_MembersCall_Node_300 = ICS_S_MembersCall_Node_300_;
interface ICS_S_MembersCall_Node_301_ extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[...OneOrMore<ICS_S_MemberCall_Node>];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
type ICS_S_MembersCall_Node_301 = ICS_S_MembersCall_Node_301_;
interface ICS_S_MembersCall_Node_302_ extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[ICS_S_ProcedureOrArrayCall_Node,...OneOrMore<ICS_S_MemberCall_Node>,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
type ICS_S_MembersCall_Node_302 = ICS_S_MembersCall_Node_302_;
interface ICS_S_MembersCall_Node_303_ extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[ICS_S_ProcedureOrArrayCall_Node,...OneOrMore<ICS_S_MemberCall_Node>,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
type ICS_S_MembersCall_Node_303 = ICS_S_MembersCall_Node_303_;
interface ICS_S_MembersCall_Node_304_ extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[ICS_S_ProcedureOrArrayCall_Node,...OneOrMore<ICS_S_MemberCall_Node>,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
type ICS_S_MembersCall_Node_304 = ICS_S_MembersCall_Node_304_;
interface ICS_S_MembersCall_Node_305_ extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[ICS_S_ProcedureOrArrayCall_Node,...OneOrMore<ICS_S_MemberCall_Node>];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
type ICS_S_MembersCall_Node_305 = ICS_S_MembersCall_Node_305_;
interface ICS_S_MembersCall_Node_306_ extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[...OneOrMore<ICS_S_MemberCall_Node>,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
type ICS_S_MembersCall_Node_306 = ICS_S_MembersCall_Node_306_;
interface ICS_S_MembersCall_Node_307_ extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[...OneOrMore<ICS_S_MemberCall_Node>,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
type ICS_S_MembersCall_Node_307 = ICS_S_MembersCall_Node_307_;
interface ICS_S_MembersCall_Node_308_ extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[...OneOrMore<ICS_S_MemberCall_Node>,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
type ICS_S_MembersCall_Node_308 = ICS_S_MembersCall_Node_308_;
interface ICS_S_MembersCall_Node_309_ extends BaseSymbolNode {
        symbol:"iCS_S_MembersCall";
        
        children:[...OneOrMore<ICS_S_MemberCall_Node>];
        parent:ImplicitCallStmt_InStmt_Node_291;
      }
type ICS_S_MembersCall_Node_309 = ICS_S_MembersCall_Node_309_;
interface ICS_S_MemberCall_Node_310_ extends BaseSymbolNode {
        symbol:"iCS_S_MemberCall";
        
        children:[TOKEN_0_Node,ICS_S_VariableOrProcedureCall_Node];
        parent:ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MembersCall_Node_298 | ICS_S_MembersCall_Node_299 | ICS_S_MembersCall_Node_300 | ICS_S_MembersCall_Node_301 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MembersCall_Node_306 | ICS_S_MembersCall_Node_307 | ICS_S_MembersCall_Node_308 | ICS_S_MembersCall_Node_309;
      }
type ICS_S_MemberCall_Node_310 = ICS_S_MemberCall_Node_310_;
interface ICS_S_MemberCall_Node_311_ extends BaseSymbolNode {
        symbol:"iCS_S_MemberCall";
        
        children:[TOKEN_0_Node,ICS_S_ProcedureOrArrayCall_Node];
        parent:ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MembersCall_Node_298 | ICS_S_MembersCall_Node_299 | ICS_S_MembersCall_Node_300 | ICS_S_MembersCall_Node_301 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MembersCall_Node_306 | ICS_S_MembersCall_Node_307 | ICS_S_MembersCall_Node_308 | ICS_S_MembersCall_Node_309;
      }
type ICS_S_MemberCall_Node_311 = ICS_S_MemberCall_Node_311_;
interface TOKEN_1_Node_ extends BaseTokenNode {
            token:"!";
            parent:ICS_S_MemberCall_Node_312 | ICS_S_MemberCall_Node_313 | DictionaryCallStmt_Node_338 | DictionaryCallStmt_Node_339 | TypeHint_Node_345 | ComplexType_98_group_1_Parent_Node;
          }
export type TOKEN_1_Node = TOKEN_1_Node_;
interface ICS_S_MemberCall_Node_312_ extends BaseSymbolNode {
        symbol:"iCS_S_MemberCall";
        
        children:[TOKEN_1_Node,ICS_S_VariableOrProcedureCall_Node];
        parent:ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MembersCall_Node_298 | ICS_S_MembersCall_Node_299 | ICS_S_MembersCall_Node_300 | ICS_S_MembersCall_Node_301 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MembersCall_Node_306 | ICS_S_MembersCall_Node_307 | ICS_S_MembersCall_Node_308 | ICS_S_MembersCall_Node_309;
      }
type ICS_S_MemberCall_Node_312 = ICS_S_MemberCall_Node_312_;
interface ICS_S_MemberCall_Node_313_ extends BaseSymbolNode {
        symbol:"iCS_S_MemberCall";
        
        children:[TOKEN_1_Node,ICS_S_ProcedureOrArrayCall_Node];
        parent:ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MembersCall_Node_298 | ICS_S_MembersCall_Node_299 | ICS_S_MembersCall_Node_300 | ICS_S_MembersCall_Node_301 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MembersCall_Node_306 | ICS_S_MembersCall_Node_307 | ICS_S_MembersCall_Node_308 | ICS_S_MembersCall_Node_309;
      }
type ICS_S_MemberCall_Node_313 = ICS_S_MemberCall_Node_313_;
interface ICS_S_ProcedureOrArrayCall_Node_314_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,ArgsCall_Node,RPAREN_Node,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
type ICS_S_ProcedureOrArrayCall_Node_314 = ICS_S_ProcedureOrArrayCall_Node_314_;
interface ICS_S_ProcedureOrArrayCall_Node_315_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,ArgsCall_Node,RPAREN_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
type ICS_S_ProcedureOrArrayCall_Node_315 = ICS_S_ProcedureOrArrayCall_Node_315_;
interface ICS_S_ProcedureOrArrayCall_Node_316_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,ArgsCall_Node,RPAREN_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
type ICS_S_ProcedureOrArrayCall_Node_316 = ICS_S_ProcedureOrArrayCall_Node_316_;
interface ICS_S_ProcedureOrArrayCall_Node_317_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,ArgsCall_Node,RPAREN_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
type ICS_S_ProcedureOrArrayCall_Node_317 = ICS_S_ProcedureOrArrayCall_Node_317_;
interface ICS_S_ProcedureOrArrayCall_Node_318_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
type ICS_S_ProcedureOrArrayCall_Node_318 = ICS_S_ProcedureOrArrayCall_Node_318_;
interface ICS_S_ProcedureOrArrayCall_Node_319_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
type ICS_S_ProcedureOrArrayCall_Node_319 = ICS_S_ProcedureOrArrayCall_Node_319_;
interface ICS_S_ProcedureOrArrayCall_Node_320_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
type ICS_S_ProcedureOrArrayCall_Node_320 = ICS_S_ProcedureOrArrayCall_Node_320_;
interface ICS_S_ProcedureOrArrayCall_Node_321_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,LPAREN_Node,RPAREN_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
type ICS_S_ProcedureOrArrayCall_Node_321 = ICS_S_ProcedureOrArrayCall_Node_321_;
interface ICS_S_ProcedureOrArrayCall_Node_322_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,LPAREN_Node,ArgsCall_Node,RPAREN_Node,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
type ICS_S_ProcedureOrArrayCall_Node_322 = ICS_S_ProcedureOrArrayCall_Node_322_;
interface ICS_S_ProcedureOrArrayCall_Node_323_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,LPAREN_Node,ArgsCall_Node,RPAREN_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
type ICS_S_ProcedureOrArrayCall_Node_323 = ICS_S_ProcedureOrArrayCall_Node_323_;
interface ICS_S_ProcedureOrArrayCall_Node_324_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,LPAREN_Node,ArgsCall_Node,RPAREN_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
type ICS_S_ProcedureOrArrayCall_Node_324 = ICS_S_ProcedureOrArrayCall_Node_324_;
interface ICS_S_ProcedureOrArrayCall_Node_325_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,LPAREN_Node,ArgsCall_Node,RPAREN_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
type ICS_S_ProcedureOrArrayCall_Node_325 = ICS_S_ProcedureOrArrayCall_Node_325_;
interface ICS_S_ProcedureOrArrayCall_Node_326_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
type ICS_S_ProcedureOrArrayCall_Node_326 = ICS_S_ProcedureOrArrayCall_Node_326_;
interface ICS_S_ProcedureOrArrayCall_Node_327_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
type ICS_S_ProcedureOrArrayCall_Node_327 = ICS_S_ProcedureOrArrayCall_Node_327_;
interface ICS_S_ProcedureOrArrayCall_Node_328_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
type ICS_S_ProcedureOrArrayCall_Node_328 = ICS_S_ProcedureOrArrayCall_Node_328_;
interface ICS_S_ProcedureOrArrayCall_Node_329_ extends BaseSymbolNode {
        symbol:"iCS_S_ProcedureOrArrayCall";
        
        children:[AmbiguousIdentifier_Node,LPAREN_Node,RPAREN_Node];
        parent:ImplicitCallStmt_InStmt_Node_293 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_304 | ICS_S_MembersCall_Node_305 | ICS_S_MemberCall_Node_311 | ICS_S_MemberCall_Node_313;
      }
type ICS_S_ProcedureOrArrayCall_Node_329 = ICS_S_ProcedureOrArrayCall_Node_329_;
interface ICS_S_VariableOrProcedureCall_Node_330_ extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_292 | ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MemberCall_Node_310 | ICS_S_MemberCall_Node_312;
      }
type ICS_S_VariableOrProcedureCall_Node_330 = ICS_S_VariableOrProcedureCall_Node_330_;
interface ICS_S_VariableOrProcedureCall_Node_331_ extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node_292 | ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MemberCall_Node_310 | ICS_S_MemberCall_Node_312;
      }
type ICS_S_VariableOrProcedureCall_Node_331 = ICS_S_VariableOrProcedureCall_Node_331_;
interface ICS_S_VariableOrProcedureCall_Node_332_ extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_292 | ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MemberCall_Node_310 | ICS_S_MemberCall_Node_312;
      }
type ICS_S_VariableOrProcedureCall_Node_332 = ICS_S_VariableOrProcedureCall_Node_332_;
interface ICS_S_VariableOrProcedureCall_Node_333_ extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ImplicitCallStmt_InStmt_Node_292 | ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MemberCall_Node_310 | ICS_S_MemberCall_Node_312;
      }
type ICS_S_VariableOrProcedureCall_Node_333 = ICS_S_VariableOrProcedureCall_Node_333_;
interface ICS_S_VariableOrProcedureCall_Node_334_ extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[AmbiguousIdentifier_Node,DictionaryCallStmt_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_292 | ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MemberCall_Node_310 | ICS_S_MemberCall_Node_312;
      }
type ICS_S_VariableOrProcedureCall_Node_334 = ICS_S_VariableOrProcedureCall_Node_334_;
interface ICS_S_VariableOrProcedureCall_Node_335_ extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[AmbiguousIdentifier_Node,DictionaryCallStmt_Node];
        parent:ImplicitCallStmt_InStmt_Node_292 | ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MemberCall_Node_310 | ICS_S_MemberCall_Node_312;
      }
type ICS_S_VariableOrProcedureCall_Node_335 = ICS_S_VariableOrProcedureCall_Node_335_;
interface ICS_S_VariableOrProcedureCall_Node_336_ extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[AmbiguousIdentifier_Node,...ECS_MemberProcedureCall_49_group_10_Node];
        parent:ImplicitCallStmt_InStmt_Node_292 | ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MemberCall_Node_310 | ICS_S_MemberCall_Node_312;
      }
type ICS_S_VariableOrProcedureCall_Node_336 = ICS_S_VariableOrProcedureCall_Node_336_;
interface ICS_S_VariableOrProcedureCall_Node_337_ extends BaseSymbolNode {
        symbol:"iCS_S_VariableOrProcedureCall";
        
        children:[AmbiguousIdentifier_Node];
        parent:ImplicitCallStmt_InStmt_Node_292 | ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_296 | ICS_S_MembersCall_Node_297 | ICS_S_MemberCall_Node_310 | ICS_S_MemberCall_Node_312;
      }
type ICS_S_VariableOrProcedureCall_Node_337 = ICS_S_VariableOrProcedureCall_Node_337_;
interface DictionaryCallStmt_Node_338_ extends BaseSymbolNode {
        symbol:"dictionaryCallStmt";
        
        children:[TOKEN_1_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_228 | ICS_B_MemberProcedureCall_Node_229 | ICS_B_MemberProcedureCall_Node_232 | ICS_B_MemberProcedureCall_Node_233 | ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_298 | ICS_S_MembersCall_Node_299 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_306 | ICS_S_MembersCall_Node_307 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_318 | ICS_S_ProcedureOrArrayCall_Node_319 | ICS_S_ProcedureOrArrayCall_Node_322 | ICS_S_ProcedureOrArrayCall_Node_323 | ICS_S_ProcedureOrArrayCall_Node_326 | ICS_S_ProcedureOrArrayCall_Node_327 | ICS_S_VariableOrProcedureCall_Node_330 | ICS_S_VariableOrProcedureCall_Node_331 | ICS_S_VariableOrProcedureCall_Node_334 | ICS_S_VariableOrProcedureCall_Node_335;
      }
type DictionaryCallStmt_Node_338 = DictionaryCallStmt_Node_338_;
interface DictionaryCallStmt_Node_339_ extends BaseSymbolNode {
        symbol:"dictionaryCallStmt";
        
        children:[TOKEN_1_Node,AmbiguousIdentifier_Node];
        parent:ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_228 | ICS_B_MemberProcedureCall_Node_229 | ICS_B_MemberProcedureCall_Node_232 | ICS_B_MemberProcedureCall_Node_233 | ICS_S_MembersCall_Node_294 | ICS_S_MembersCall_Node_295 | ICS_S_MembersCall_Node_298 | ICS_S_MembersCall_Node_299 | ICS_S_MembersCall_Node_302 | ICS_S_MembersCall_Node_303 | ICS_S_MembersCall_Node_306 | ICS_S_MembersCall_Node_307 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_318 | ICS_S_ProcedureOrArrayCall_Node_319 | ICS_S_ProcedureOrArrayCall_Node_322 | ICS_S_ProcedureOrArrayCall_Node_323 | ICS_S_ProcedureOrArrayCall_Node_326 | ICS_S_ProcedureOrArrayCall_Node_327 | ICS_S_VariableOrProcedureCall_Node_330 | ICS_S_VariableOrProcedureCall_Node_331 | ICS_S_VariableOrProcedureCall_Node_334 | ICS_S_VariableOrProcedureCall_Node_335;
      }
type DictionaryCallStmt_Node_339 = DictionaryCallStmt_Node_339_;
interface INTEGERLITERAL_Node_ extends BaseTokenNode {
            token:"INTEGERLITERAL";
            parent:Literal_Node_340 | FieldLength_Node_625;
          }
export type INTEGERLITERAL_Node = INTEGERLITERAL_Node_;
interface Literal_Node_340_ extends BaseSymbolNode {
        symbol:"literal";
        
        children:[INTEGERLITERAL_Node];
        parent:ValueStmt_Node_289;
      }
type Literal_Node_340 = Literal_Node_340_;
interface STRINGLITERAL_Node_ extends BaseTokenNode {
            token:"STRINGLITERAL";
            parent:Literal_Node_341;
          }
export type STRINGLITERAL_Node = STRINGLITERAL_Node_;
interface Literal_Node_341_ extends BaseSymbolNode {
        symbol:"literal";
        
        children:[STRINGLITERAL_Node];
        parent:ValueStmt_Node_289;
      }
type Literal_Node_341 = Literal_Node_341_;
interface TOKEN_2_Node_ extends BaseTokenNode {
            token:"&";
            parent:TypeHint_Node_342;
          }
export type TOKEN_2_Node = TOKEN_2_Node_;
interface TypeHint_Node_342_ extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[TOKEN_2_Node];
        parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_155 | FunctionStmt_Node_156 | ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_202 | ECS_MemberProcedureCall_Node_203 | ECS_MemberProcedureCall_Node_204 | ECS_MemberProcedureCall_Node_205 | ECS_ProcedureCall_Node_210 | ECS_ProcedureCall_Node_211 | ECS_ProcedureCall_Node_212 | ECS_ProcedureCall_Node_213 | ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_226 | ICS_B_MemberProcedureCall_Node_227 | VariableSubStmt_Node_273 | VariableSubStmt_Node_274 | VariableSubStmt_Node_277 | VariableSubStmt_Node_278 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_316 | ICS_S_ProcedureOrArrayCall_Node_317 | ICS_S_ProcedureOrArrayCall_Node_318 | ICS_S_ProcedureOrArrayCall_Node_319 | ICS_S_ProcedureOrArrayCall_Node_320 | ICS_S_ProcedureOrArrayCall_Node_321 | ICS_S_VariableOrProcedureCall_Node_330 | ICS_S_VariableOrProcedureCall_Node_331 | ICS_S_VariableOrProcedureCall_Node_332 | ICS_S_VariableOrProcedureCall_Node_333 | DictionaryCallStmt_Node_338 | Arg_Node_348 | Arg_Node_349 | Arg_Node_350 | Arg_Node_351 | Arg_Node_352 | Arg_Node_353 | Arg_Node_354 | Arg_Node_355 | Arg_Node_364 | Arg_Node_365 | Arg_Node_366 | Arg_Node_367 | Arg_Node_368 | Arg_Node_369 | Arg_Node_370 | Arg_Node_371 | Arg_Node_380 | Arg_Node_381 | Arg_Node_382 | Arg_Node_383 | Arg_Node_384 | Arg_Node_385 | Arg_Node_386 | Arg_Node_387 | Arg_Node_396 | Arg_Node_397 | Arg_Node_398 | Arg_Node_399 | Arg_Node_400 | Arg_Node_401 | Arg_Node_402 | Arg_Node_403 | Arg_Node_412 | Arg_Node_413 | Arg_Node_414 | Arg_Node_415 | Arg_Node_416 | Arg_Node_417 | Arg_Node_418 | Arg_Node_419 | Arg_Node_428 | Arg_Node_429 | Arg_Node_430 | Arg_Node_431 | Arg_Node_432 | Arg_Node_433 | Arg_Node_434 | Arg_Node_435 | Arg_Node_444 | Arg_Node_445 | Arg_Node_446 | Arg_Node_447 | Arg_Node_448 | Arg_Node_449 | Arg_Node_450 | Arg_Node_451 | Arg_Node_460 | Arg_Node_461 | Arg_Node_462 | Arg_Node_463 | Arg_Node_464 | Arg_Node_465 | Arg_Node_466 | Arg_Node_467 | Arg_Node_476 | Arg_Node_477 | Arg_Node_478 | Arg_Node_479 | Arg_Node_480 | Arg_Node_481 | Arg_Node_482 | Arg_Node_483 | Arg_Node_492 | Arg_Node_493 | Arg_Node_494 | Arg_Node_495 | Arg_Node_496 | Arg_Node_497 | Arg_Node_498 | Arg_Node_499 | Arg_Node_508 | Arg_Node_509 | Arg_Node_510 | Arg_Node_511 | Arg_Node_512 | Arg_Node_513 | Arg_Node_514 | Arg_Node_515 | Arg_Node_524 | Arg_Node_525 | Arg_Node_526 | Arg_Node_527 | Arg_Node_528 | Arg_Node_529 | Arg_Node_530 | Arg_Node_531 | Arg_Node_540 | Arg_Node_541 | Arg_Node_542 | Arg_Node_543 | Arg_Node_544 | Arg_Node_545 | Arg_Node_546 | Arg_Node_547 | Arg_Node_556 | Arg_Node_557 | Arg_Node_558 | Arg_Node_559 | Arg_Node_560 | Arg_Node_561 | Arg_Node_562 | Arg_Node_563 | Arg_Node_572 | Arg_Node_573 | Arg_Node_574 | Arg_Node_575 | Arg_Node_576 | Arg_Node_577 | Arg_Node_578 | Arg_Node_579 | Arg_Node_588 | Arg_Node_589 | Arg_Node_590 | Arg_Node_591 | Arg_Node_592 | Arg_Node_593 | Arg_Node_594 | Arg_Node_595;
      }
type TypeHint_Node_342 = TypeHint_Node_342_;
interface TOKEN_3_Node_ extends BaseTokenNode {
            token:"%";
            parent:TypeHint_Node_343;
          }
export type TOKEN_3_Node = TOKEN_3_Node_;
interface TypeHint_Node_343_ extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[TOKEN_3_Node];
        parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_155 | FunctionStmt_Node_156 | ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_202 | ECS_MemberProcedureCall_Node_203 | ECS_MemberProcedureCall_Node_204 | ECS_MemberProcedureCall_Node_205 | ECS_ProcedureCall_Node_210 | ECS_ProcedureCall_Node_211 | ECS_ProcedureCall_Node_212 | ECS_ProcedureCall_Node_213 | ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_226 | ICS_B_MemberProcedureCall_Node_227 | VariableSubStmt_Node_273 | VariableSubStmt_Node_274 | VariableSubStmt_Node_277 | VariableSubStmt_Node_278 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_316 | ICS_S_ProcedureOrArrayCall_Node_317 | ICS_S_ProcedureOrArrayCall_Node_318 | ICS_S_ProcedureOrArrayCall_Node_319 | ICS_S_ProcedureOrArrayCall_Node_320 | ICS_S_ProcedureOrArrayCall_Node_321 | ICS_S_VariableOrProcedureCall_Node_330 | ICS_S_VariableOrProcedureCall_Node_331 | ICS_S_VariableOrProcedureCall_Node_332 | ICS_S_VariableOrProcedureCall_Node_333 | DictionaryCallStmt_Node_338 | Arg_Node_348 | Arg_Node_349 | Arg_Node_350 | Arg_Node_351 | Arg_Node_352 | Arg_Node_353 | Arg_Node_354 | Arg_Node_355 | Arg_Node_364 | Arg_Node_365 | Arg_Node_366 | Arg_Node_367 | Arg_Node_368 | Arg_Node_369 | Arg_Node_370 | Arg_Node_371 | Arg_Node_380 | Arg_Node_381 | Arg_Node_382 | Arg_Node_383 | Arg_Node_384 | Arg_Node_385 | Arg_Node_386 | Arg_Node_387 | Arg_Node_396 | Arg_Node_397 | Arg_Node_398 | Arg_Node_399 | Arg_Node_400 | Arg_Node_401 | Arg_Node_402 | Arg_Node_403 | Arg_Node_412 | Arg_Node_413 | Arg_Node_414 | Arg_Node_415 | Arg_Node_416 | Arg_Node_417 | Arg_Node_418 | Arg_Node_419 | Arg_Node_428 | Arg_Node_429 | Arg_Node_430 | Arg_Node_431 | Arg_Node_432 | Arg_Node_433 | Arg_Node_434 | Arg_Node_435 | Arg_Node_444 | Arg_Node_445 | Arg_Node_446 | Arg_Node_447 | Arg_Node_448 | Arg_Node_449 | Arg_Node_450 | Arg_Node_451 | Arg_Node_460 | Arg_Node_461 | Arg_Node_462 | Arg_Node_463 | Arg_Node_464 | Arg_Node_465 | Arg_Node_466 | Arg_Node_467 | Arg_Node_476 | Arg_Node_477 | Arg_Node_478 | Arg_Node_479 | Arg_Node_480 | Arg_Node_481 | Arg_Node_482 | Arg_Node_483 | Arg_Node_492 | Arg_Node_493 | Arg_Node_494 | Arg_Node_495 | Arg_Node_496 | Arg_Node_497 | Arg_Node_498 | Arg_Node_499 | Arg_Node_508 | Arg_Node_509 | Arg_Node_510 | Arg_Node_511 | Arg_Node_512 | Arg_Node_513 | Arg_Node_514 | Arg_Node_515 | Arg_Node_524 | Arg_Node_525 | Arg_Node_526 | Arg_Node_527 | Arg_Node_528 | Arg_Node_529 | Arg_Node_530 | Arg_Node_531 | Arg_Node_540 | Arg_Node_541 | Arg_Node_542 | Arg_Node_543 | Arg_Node_544 | Arg_Node_545 | Arg_Node_546 | Arg_Node_547 | Arg_Node_556 | Arg_Node_557 | Arg_Node_558 | Arg_Node_559 | Arg_Node_560 | Arg_Node_561 | Arg_Node_562 | Arg_Node_563 | Arg_Node_572 | Arg_Node_573 | Arg_Node_574 | Arg_Node_575 | Arg_Node_576 | Arg_Node_577 | Arg_Node_578 | Arg_Node_579 | Arg_Node_588 | Arg_Node_589 | Arg_Node_590 | Arg_Node_591 | Arg_Node_592 | Arg_Node_593 | Arg_Node_594 | Arg_Node_595;
      }
type TypeHint_Node_343 = TypeHint_Node_343_;
interface TOKEN_4_Node_ extends BaseTokenNode {
            token:"#";
            parent:TypeHint_Node_344;
          }
export type TOKEN_4_Node = TOKEN_4_Node_;
interface TypeHint_Node_344_ extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[TOKEN_4_Node];
        parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_155 | FunctionStmt_Node_156 | ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_202 | ECS_MemberProcedureCall_Node_203 | ECS_MemberProcedureCall_Node_204 | ECS_MemberProcedureCall_Node_205 | ECS_ProcedureCall_Node_210 | ECS_ProcedureCall_Node_211 | ECS_ProcedureCall_Node_212 | ECS_ProcedureCall_Node_213 | ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_226 | ICS_B_MemberProcedureCall_Node_227 | VariableSubStmt_Node_273 | VariableSubStmt_Node_274 | VariableSubStmt_Node_277 | VariableSubStmt_Node_278 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_316 | ICS_S_ProcedureOrArrayCall_Node_317 | ICS_S_ProcedureOrArrayCall_Node_318 | ICS_S_ProcedureOrArrayCall_Node_319 | ICS_S_ProcedureOrArrayCall_Node_320 | ICS_S_ProcedureOrArrayCall_Node_321 | ICS_S_VariableOrProcedureCall_Node_330 | ICS_S_VariableOrProcedureCall_Node_331 | ICS_S_VariableOrProcedureCall_Node_332 | ICS_S_VariableOrProcedureCall_Node_333 | DictionaryCallStmt_Node_338 | Arg_Node_348 | Arg_Node_349 | Arg_Node_350 | Arg_Node_351 | Arg_Node_352 | Arg_Node_353 | Arg_Node_354 | Arg_Node_355 | Arg_Node_364 | Arg_Node_365 | Arg_Node_366 | Arg_Node_367 | Arg_Node_368 | Arg_Node_369 | Arg_Node_370 | Arg_Node_371 | Arg_Node_380 | Arg_Node_381 | Arg_Node_382 | Arg_Node_383 | Arg_Node_384 | Arg_Node_385 | Arg_Node_386 | Arg_Node_387 | Arg_Node_396 | Arg_Node_397 | Arg_Node_398 | Arg_Node_399 | Arg_Node_400 | Arg_Node_401 | Arg_Node_402 | Arg_Node_403 | Arg_Node_412 | Arg_Node_413 | Arg_Node_414 | Arg_Node_415 | Arg_Node_416 | Arg_Node_417 | Arg_Node_418 | Arg_Node_419 | Arg_Node_428 | Arg_Node_429 | Arg_Node_430 | Arg_Node_431 | Arg_Node_432 | Arg_Node_433 | Arg_Node_434 | Arg_Node_435 | Arg_Node_444 | Arg_Node_445 | Arg_Node_446 | Arg_Node_447 | Arg_Node_448 | Arg_Node_449 | Arg_Node_450 | Arg_Node_451 | Arg_Node_460 | Arg_Node_461 | Arg_Node_462 | Arg_Node_463 | Arg_Node_464 | Arg_Node_465 | Arg_Node_466 | Arg_Node_467 | Arg_Node_476 | Arg_Node_477 | Arg_Node_478 | Arg_Node_479 | Arg_Node_480 | Arg_Node_481 | Arg_Node_482 | Arg_Node_483 | Arg_Node_492 | Arg_Node_493 | Arg_Node_494 | Arg_Node_495 | Arg_Node_496 | Arg_Node_497 | Arg_Node_498 | Arg_Node_499 | Arg_Node_508 | Arg_Node_509 | Arg_Node_510 | Arg_Node_511 | Arg_Node_512 | Arg_Node_513 | Arg_Node_514 | Arg_Node_515 | Arg_Node_524 | Arg_Node_525 | Arg_Node_526 | Arg_Node_527 | Arg_Node_528 | Arg_Node_529 | Arg_Node_530 | Arg_Node_531 | Arg_Node_540 | Arg_Node_541 | Arg_Node_542 | Arg_Node_543 | Arg_Node_544 | Arg_Node_545 | Arg_Node_546 | Arg_Node_547 | Arg_Node_556 | Arg_Node_557 | Arg_Node_558 | Arg_Node_559 | Arg_Node_560 | Arg_Node_561 | Arg_Node_562 | Arg_Node_563 | Arg_Node_572 | Arg_Node_573 | Arg_Node_574 | Arg_Node_575 | Arg_Node_576 | Arg_Node_577 | Arg_Node_578 | Arg_Node_579 | Arg_Node_588 | Arg_Node_589 | Arg_Node_590 | Arg_Node_591 | Arg_Node_592 | Arg_Node_593 | Arg_Node_594 | Arg_Node_595;
      }
type TypeHint_Node_344 = TypeHint_Node_344_;
interface TypeHint_Node_345_ extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[TOKEN_1_Node];
        parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_155 | FunctionStmt_Node_156 | ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_202 | ECS_MemberProcedureCall_Node_203 | ECS_MemberProcedureCall_Node_204 | ECS_MemberProcedureCall_Node_205 | ECS_ProcedureCall_Node_210 | ECS_ProcedureCall_Node_211 | ECS_ProcedureCall_Node_212 | ECS_ProcedureCall_Node_213 | ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_226 | ICS_B_MemberProcedureCall_Node_227 | VariableSubStmt_Node_273 | VariableSubStmt_Node_274 | VariableSubStmt_Node_277 | VariableSubStmt_Node_278 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_316 | ICS_S_ProcedureOrArrayCall_Node_317 | ICS_S_ProcedureOrArrayCall_Node_318 | ICS_S_ProcedureOrArrayCall_Node_319 | ICS_S_ProcedureOrArrayCall_Node_320 | ICS_S_ProcedureOrArrayCall_Node_321 | ICS_S_VariableOrProcedureCall_Node_330 | ICS_S_VariableOrProcedureCall_Node_331 | ICS_S_VariableOrProcedureCall_Node_332 | ICS_S_VariableOrProcedureCall_Node_333 | DictionaryCallStmt_Node_338 | Arg_Node_348 | Arg_Node_349 | Arg_Node_350 | Arg_Node_351 | Arg_Node_352 | Arg_Node_353 | Arg_Node_354 | Arg_Node_355 | Arg_Node_364 | Arg_Node_365 | Arg_Node_366 | Arg_Node_367 | Arg_Node_368 | Arg_Node_369 | Arg_Node_370 | Arg_Node_371 | Arg_Node_380 | Arg_Node_381 | Arg_Node_382 | Arg_Node_383 | Arg_Node_384 | Arg_Node_385 | Arg_Node_386 | Arg_Node_387 | Arg_Node_396 | Arg_Node_397 | Arg_Node_398 | Arg_Node_399 | Arg_Node_400 | Arg_Node_401 | Arg_Node_402 | Arg_Node_403 | Arg_Node_412 | Arg_Node_413 | Arg_Node_414 | Arg_Node_415 | Arg_Node_416 | Arg_Node_417 | Arg_Node_418 | Arg_Node_419 | Arg_Node_428 | Arg_Node_429 | Arg_Node_430 | Arg_Node_431 | Arg_Node_432 | Arg_Node_433 | Arg_Node_434 | Arg_Node_435 | Arg_Node_444 | Arg_Node_445 | Arg_Node_446 | Arg_Node_447 | Arg_Node_448 | Arg_Node_449 | Arg_Node_450 | Arg_Node_451 | Arg_Node_460 | Arg_Node_461 | Arg_Node_462 | Arg_Node_463 | Arg_Node_464 | Arg_Node_465 | Arg_Node_466 | Arg_Node_467 | Arg_Node_476 | Arg_Node_477 | Arg_Node_478 | Arg_Node_479 | Arg_Node_480 | Arg_Node_481 | Arg_Node_482 | Arg_Node_483 | Arg_Node_492 | Arg_Node_493 | Arg_Node_494 | Arg_Node_495 | Arg_Node_496 | Arg_Node_497 | Arg_Node_498 | Arg_Node_499 | Arg_Node_508 | Arg_Node_509 | Arg_Node_510 | Arg_Node_511 | Arg_Node_512 | Arg_Node_513 | Arg_Node_514 | Arg_Node_515 | Arg_Node_524 | Arg_Node_525 | Arg_Node_526 | Arg_Node_527 | Arg_Node_528 | Arg_Node_529 | Arg_Node_530 | Arg_Node_531 | Arg_Node_540 | Arg_Node_541 | Arg_Node_542 | Arg_Node_543 | Arg_Node_544 | Arg_Node_545 | Arg_Node_546 | Arg_Node_547 | Arg_Node_556 | Arg_Node_557 | Arg_Node_558 | Arg_Node_559 | Arg_Node_560 | Arg_Node_561 | Arg_Node_562 | Arg_Node_563 | Arg_Node_572 | Arg_Node_573 | Arg_Node_574 | Arg_Node_575 | Arg_Node_576 | Arg_Node_577 | Arg_Node_578 | Arg_Node_579 | Arg_Node_588 | Arg_Node_589 | Arg_Node_590 | Arg_Node_591 | Arg_Node_592 | Arg_Node_593 | Arg_Node_594 | Arg_Node_595;
      }
type TypeHint_Node_345 = TypeHint_Node_345_;
interface TOKEN_5_Node_ extends BaseTokenNode {
            token:"@";
            parent:TypeHint_Node_346;
          }
export type TOKEN_5_Node = TOKEN_5_Node_;
interface TypeHint_Node_346_ extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[TOKEN_5_Node];
        parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_155 | FunctionStmt_Node_156 | ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_202 | ECS_MemberProcedureCall_Node_203 | ECS_MemberProcedureCall_Node_204 | ECS_MemberProcedureCall_Node_205 | ECS_ProcedureCall_Node_210 | ECS_ProcedureCall_Node_211 | ECS_ProcedureCall_Node_212 | ECS_ProcedureCall_Node_213 | ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_226 | ICS_B_MemberProcedureCall_Node_227 | VariableSubStmt_Node_273 | VariableSubStmt_Node_274 | VariableSubStmt_Node_277 | VariableSubStmt_Node_278 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_316 | ICS_S_ProcedureOrArrayCall_Node_317 | ICS_S_ProcedureOrArrayCall_Node_318 | ICS_S_ProcedureOrArrayCall_Node_319 | ICS_S_ProcedureOrArrayCall_Node_320 | ICS_S_ProcedureOrArrayCall_Node_321 | ICS_S_VariableOrProcedureCall_Node_330 | ICS_S_VariableOrProcedureCall_Node_331 | ICS_S_VariableOrProcedureCall_Node_332 | ICS_S_VariableOrProcedureCall_Node_333 | DictionaryCallStmt_Node_338 | Arg_Node_348 | Arg_Node_349 | Arg_Node_350 | Arg_Node_351 | Arg_Node_352 | Arg_Node_353 | Arg_Node_354 | Arg_Node_355 | Arg_Node_364 | Arg_Node_365 | Arg_Node_366 | Arg_Node_367 | Arg_Node_368 | Arg_Node_369 | Arg_Node_370 | Arg_Node_371 | Arg_Node_380 | Arg_Node_381 | Arg_Node_382 | Arg_Node_383 | Arg_Node_384 | Arg_Node_385 | Arg_Node_386 | Arg_Node_387 | Arg_Node_396 | Arg_Node_397 | Arg_Node_398 | Arg_Node_399 | Arg_Node_400 | Arg_Node_401 | Arg_Node_402 | Arg_Node_403 | Arg_Node_412 | Arg_Node_413 | Arg_Node_414 | Arg_Node_415 | Arg_Node_416 | Arg_Node_417 | Arg_Node_418 | Arg_Node_419 | Arg_Node_428 | Arg_Node_429 | Arg_Node_430 | Arg_Node_431 | Arg_Node_432 | Arg_Node_433 | Arg_Node_434 | Arg_Node_435 | Arg_Node_444 | Arg_Node_445 | Arg_Node_446 | Arg_Node_447 | Arg_Node_448 | Arg_Node_449 | Arg_Node_450 | Arg_Node_451 | Arg_Node_460 | Arg_Node_461 | Arg_Node_462 | Arg_Node_463 | Arg_Node_464 | Arg_Node_465 | Arg_Node_466 | Arg_Node_467 | Arg_Node_476 | Arg_Node_477 | Arg_Node_478 | Arg_Node_479 | Arg_Node_480 | Arg_Node_481 | Arg_Node_482 | Arg_Node_483 | Arg_Node_492 | Arg_Node_493 | Arg_Node_494 | Arg_Node_495 | Arg_Node_496 | Arg_Node_497 | Arg_Node_498 | Arg_Node_499 | Arg_Node_508 | Arg_Node_509 | Arg_Node_510 | Arg_Node_511 | Arg_Node_512 | Arg_Node_513 | Arg_Node_514 | Arg_Node_515 | Arg_Node_524 | Arg_Node_525 | Arg_Node_526 | Arg_Node_527 | Arg_Node_528 | Arg_Node_529 | Arg_Node_530 | Arg_Node_531 | Arg_Node_540 | Arg_Node_541 | Arg_Node_542 | Arg_Node_543 | Arg_Node_544 | Arg_Node_545 | Arg_Node_546 | Arg_Node_547 | Arg_Node_556 | Arg_Node_557 | Arg_Node_558 | Arg_Node_559 | Arg_Node_560 | Arg_Node_561 | Arg_Node_562 | Arg_Node_563 | Arg_Node_572 | Arg_Node_573 | Arg_Node_574 | Arg_Node_575 | Arg_Node_576 | Arg_Node_577 | Arg_Node_578 | Arg_Node_579 | Arg_Node_588 | Arg_Node_589 | Arg_Node_590 | Arg_Node_591 | Arg_Node_592 | Arg_Node_593 | Arg_Node_594 | Arg_Node_595;
      }
type TypeHint_Node_346 = TypeHint_Node_346_;
interface $_Node_ extends BaseTokenNode {
            token:"$";
            parent:TypeHint_Node_347;
          }
export type $_Node = $_Node_;
interface TypeHint_Node_347_ extends BaseSymbolNode {
        symbol:"typeHint";
        
        children:[$_Node];
        parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_155 | FunctionStmt_Node_156 | ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_202 | ECS_MemberProcedureCall_Node_203 | ECS_MemberProcedureCall_Node_204 | ECS_MemberProcedureCall_Node_205 | ECS_ProcedureCall_Node_210 | ECS_ProcedureCall_Node_211 | ECS_ProcedureCall_Node_212 | ECS_ProcedureCall_Node_213 | ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_226 | ICS_B_MemberProcedureCall_Node_227 | VariableSubStmt_Node_273 | VariableSubStmt_Node_274 | VariableSubStmt_Node_277 | VariableSubStmt_Node_278 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_316 | ICS_S_ProcedureOrArrayCall_Node_317 | ICS_S_ProcedureOrArrayCall_Node_318 | ICS_S_ProcedureOrArrayCall_Node_319 | ICS_S_ProcedureOrArrayCall_Node_320 | ICS_S_ProcedureOrArrayCall_Node_321 | ICS_S_VariableOrProcedureCall_Node_330 | ICS_S_VariableOrProcedureCall_Node_331 | ICS_S_VariableOrProcedureCall_Node_332 | ICS_S_VariableOrProcedureCall_Node_333 | DictionaryCallStmt_Node_338 | Arg_Node_348 | Arg_Node_349 | Arg_Node_350 | Arg_Node_351 | Arg_Node_352 | Arg_Node_353 | Arg_Node_354 | Arg_Node_355 | Arg_Node_364 | Arg_Node_365 | Arg_Node_366 | Arg_Node_367 | Arg_Node_368 | Arg_Node_369 | Arg_Node_370 | Arg_Node_371 | Arg_Node_380 | Arg_Node_381 | Arg_Node_382 | Arg_Node_383 | Arg_Node_384 | Arg_Node_385 | Arg_Node_386 | Arg_Node_387 | Arg_Node_396 | Arg_Node_397 | Arg_Node_398 | Arg_Node_399 | Arg_Node_400 | Arg_Node_401 | Arg_Node_402 | Arg_Node_403 | Arg_Node_412 | Arg_Node_413 | Arg_Node_414 | Arg_Node_415 | Arg_Node_416 | Arg_Node_417 | Arg_Node_418 | Arg_Node_419 | Arg_Node_428 | Arg_Node_429 | Arg_Node_430 | Arg_Node_431 | Arg_Node_432 | Arg_Node_433 | Arg_Node_434 | Arg_Node_435 | Arg_Node_444 | Arg_Node_445 | Arg_Node_446 | Arg_Node_447 | Arg_Node_448 | Arg_Node_449 | Arg_Node_450 | Arg_Node_451 | Arg_Node_460 | Arg_Node_461 | Arg_Node_462 | Arg_Node_463 | Arg_Node_464 | Arg_Node_465 | Arg_Node_466 | Arg_Node_467 | Arg_Node_476 | Arg_Node_477 | Arg_Node_478 | Arg_Node_479 | Arg_Node_480 | Arg_Node_481 | Arg_Node_482 | Arg_Node_483 | Arg_Node_492 | Arg_Node_493 | Arg_Node_494 | Arg_Node_495 | Arg_Node_496 | Arg_Node_497 | Arg_Node_498 | Arg_Node_499 | Arg_Node_508 | Arg_Node_509 | Arg_Node_510 | Arg_Node_511 | Arg_Node_512 | Arg_Node_513 | Arg_Node_514 | Arg_Node_515 | Arg_Node_524 | Arg_Node_525 | Arg_Node_526 | Arg_Node_527 | Arg_Node_528 | Arg_Node_529 | Arg_Node_530 | Arg_Node_531 | Arg_Node_540 | Arg_Node_541 | Arg_Node_542 | Arg_Node_543 | Arg_Node_544 | Arg_Node_545 | Arg_Node_546 | Arg_Node_547 | Arg_Node_556 | Arg_Node_557 | Arg_Node_558 | Arg_Node_559 | Arg_Node_560 | Arg_Node_561 | Arg_Node_562 | Arg_Node_563 | Arg_Node_572 | Arg_Node_573 | Arg_Node_574 | Arg_Node_575 | Arg_Node_576 | Arg_Node_577 | Arg_Node_578 | Arg_Node_579 | Arg_Node_588 | Arg_Node_589 | Arg_Node_590 | Arg_Node_591 | Arg_Node_592 | Arg_Node_593 | Arg_Node_594 | Arg_Node_595;
      }
type TypeHint_Node_347 = TypeHint_Node_347_;
interface OPTIONAL_Node_ extends BaseTokenNode {
            token:"OPTIONAL";
            parent:Arg_Node_348 | Arg_Node_349 | Arg_Node_350 | Arg_Node_351 | Arg_Node_352 | Arg_Node_353 | Arg_Node_354 | Arg_Node_355 | Arg_Node_356 | Arg_Node_357 | Arg_Node_358 | Arg_Node_359 | Arg_Node_360 | Arg_Node_361 | Arg_Node_362 | Arg_Node_363 | Arg_Node_364 | Arg_Node_365 | Arg_Node_366 | Arg_Node_367 | Arg_Node_368 | Arg_Node_369 | Arg_Node_370 | Arg_Node_371 | Arg_Node_372 | Arg_Node_373 | Arg_Node_374 | Arg_Node_375 | Arg_Node_376 | Arg_Node_377 | Arg_Node_378 | Arg_Node_379 | Arg_Node_380 | Arg_Node_381 | Arg_Node_382 | Arg_Node_383 | Arg_Node_384 | Arg_Node_385 | Arg_Node_386 | Arg_Node_387 | Arg_Node_388 | Arg_Node_389 | Arg_Node_390 | Arg_Node_391 | Arg_Node_392 | Arg_Node_393 | Arg_Node_394 | Arg_Node_395 | Arg_Node_396 | Arg_Node_397 | Arg_Node_398 | Arg_Node_399 | Arg_Node_400 | Arg_Node_401 | Arg_Node_402 | Arg_Node_403 | Arg_Node_404 | Arg_Node_405 | Arg_Node_406 | Arg_Node_407 | Arg_Node_408 | Arg_Node_409 | Arg_Node_410 | Arg_Node_411 | Arg_Node_476 | Arg_Node_477 | Arg_Node_478 | Arg_Node_479 | Arg_Node_480 | Arg_Node_481 | Arg_Node_482 | Arg_Node_483 | Arg_Node_484 | Arg_Node_485 | Arg_Node_486 | Arg_Node_487 | Arg_Node_488 | Arg_Node_489 | Arg_Node_490 | Arg_Node_491 | Arg_Node_492 | Arg_Node_493 | Arg_Node_494 | Arg_Node_495 | Arg_Node_496 | Arg_Node_497 | Arg_Node_498 | Arg_Node_499 | Arg_Node_500 | Arg_Node_501 | Arg_Node_502 | Arg_Node_503 | Arg_Node_504 | Arg_Node_505 | Arg_Node_506 | Arg_Node_507 | Arg_Node_508 | Arg_Node_509 | Arg_Node_510 | Arg_Node_511 | Arg_Node_512 | Arg_Node_513 | Arg_Node_514 | Arg_Node_515 | Arg_Node_516 | Arg_Node_517 | Arg_Node_518 | Arg_Node_519 | Arg_Node_520 | Arg_Node_521 | Arg_Node_522 | Arg_Node_523 | Arg_Node_524 | Arg_Node_525 | Arg_Node_526 | Arg_Node_527 | Arg_Node_528 | Arg_Node_529 | Arg_Node_530 | Arg_Node_531 | Arg_Node_532 | Arg_Node_533 | Arg_Node_534 | Arg_Node_535 | Arg_Node_536 | Arg_Node_537 | Arg_Node_538 | Arg_Node_539;
          }
export type OPTIONAL_Node = OPTIONAL_Node_;
interface Arg_Node_348_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_348 = Arg_Node_348_;
interface Arg_Node_349_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_349 = Arg_Node_349_;
interface Arg_Node_350_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_350 = Arg_Node_350_;
interface Arg_Node_351_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_351 = Arg_Node_351_;
interface Arg_Node_352_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_352 = Arg_Node_352_;
interface Arg_Node_353_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_353 = Arg_Node_353_;
interface Arg_Node_354_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_354 = Arg_Node_354_;
interface Arg_Node_355_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_355 = Arg_Node_355_;
interface Arg_Node_356_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_356 = Arg_Node_356_;
interface Arg_Node_357_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_357 = Arg_Node_357_;
interface Arg_Node_358_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_358 = Arg_Node_358_;
interface Arg_Node_359_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_359 = Arg_Node_359_;
interface Arg_Node_360_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_360 = Arg_Node_360_;
interface Arg_Node_361_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_361 = Arg_Node_361_;
interface Arg_Node_362_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_362 = Arg_Node_362_;
interface Arg_Node_363_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_363 = Arg_Node_363_;
interface Arg_Node_364_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_364 = Arg_Node_364_;
interface Arg_Node_365_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_365 = Arg_Node_365_;
interface Arg_Node_366_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_366 = Arg_Node_366_;
interface Arg_Node_367_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_367 = Arg_Node_367_;
interface Arg_Node_368_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_368 = Arg_Node_368_;
interface Arg_Node_369_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_369 = Arg_Node_369_;
interface Arg_Node_370_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_370 = Arg_Node_370_;
interface Arg_Node_371_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_371 = Arg_Node_371_;
interface Arg_Node_372_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_372 = Arg_Node_372_;
interface Arg_Node_373_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_373 = Arg_Node_373_;
interface Arg_Node_374_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_374 = Arg_Node_374_;
interface Arg_Node_375_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_375 = Arg_Node_375_;
interface Arg_Node_376_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_376 = Arg_Node_376_;
interface Arg_Node_377_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_377 = Arg_Node_377_;
interface Arg_Node_378_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_378 = Arg_Node_378_;
interface Arg_Node_379_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYVAL_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_379 = Arg_Node_379_;
interface Arg_Node_380_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_380 = Arg_Node_380_;
interface Arg_Node_381_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_381 = Arg_Node_381_;
interface Arg_Node_382_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_382 = Arg_Node_382_;
interface Arg_Node_383_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_383 = Arg_Node_383_;
interface Arg_Node_384_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_384 = Arg_Node_384_;
interface Arg_Node_385_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_385 = Arg_Node_385_;
interface Arg_Node_386_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_386 = Arg_Node_386_;
interface Arg_Node_387_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_387 = Arg_Node_387_;
interface Arg_Node_388_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_388 = Arg_Node_388_;
interface Arg_Node_389_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_389 = Arg_Node_389_;
interface Arg_Node_390_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_390 = Arg_Node_390_;
interface Arg_Node_391_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_391 = Arg_Node_391_;
interface Arg_Node_392_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_392 = Arg_Node_392_;
interface Arg_Node_393_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_393 = Arg_Node_393_;
interface Arg_Node_394_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_394 = Arg_Node_394_;
interface Arg_Node_395_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_395 = Arg_Node_395_;
interface Arg_Node_396_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_396 = Arg_Node_396_;
interface Arg_Node_397_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_397 = Arg_Node_397_;
interface Arg_Node_398_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_398 = Arg_Node_398_;
interface Arg_Node_399_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_399 = Arg_Node_399_;
interface Arg_Node_400_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_400 = Arg_Node_400_;
interface Arg_Node_401_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_401 = Arg_Node_401_;
interface Arg_Node_402_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_402 = Arg_Node_402_;
interface Arg_Node_403_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_403 = Arg_Node_403_;
interface Arg_Node_404_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_404 = Arg_Node_404_;
interface Arg_Node_405_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_405 = Arg_Node_405_;
interface Arg_Node_406_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_406 = Arg_Node_406_;
interface Arg_Node_407_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_407 = Arg_Node_407_;
interface Arg_Node_408_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_408 = Arg_Node_408_;
interface Arg_Node_409_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_409 = Arg_Node_409_;
interface Arg_Node_410_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_410 = Arg_Node_410_;
interface Arg_Node_411_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_411 = Arg_Node_411_;
interface Arg_Node_412_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_412 = Arg_Node_412_;
interface Arg_Node_413_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_413 = Arg_Node_413_;
interface Arg_Node_414_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_414 = Arg_Node_414_;
interface Arg_Node_415_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_415 = Arg_Node_415_;
interface Arg_Node_416_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_416 = Arg_Node_416_;
interface Arg_Node_417_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_417 = Arg_Node_417_;
interface Arg_Node_418_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_418 = Arg_Node_418_;
interface Arg_Node_419_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_419 = Arg_Node_419_;
interface Arg_Node_420_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_420 = Arg_Node_420_;
interface Arg_Node_421_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_421 = Arg_Node_421_;
interface Arg_Node_422_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_422 = Arg_Node_422_;
interface Arg_Node_423_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_423 = Arg_Node_423_;
interface Arg_Node_424_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_424 = Arg_Node_424_;
interface Arg_Node_425_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_425 = Arg_Node_425_;
interface Arg_Node_426_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_426 = Arg_Node_426_;
interface Arg_Node_427_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_427 = Arg_Node_427_;
interface Arg_Node_428_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_428 = Arg_Node_428_;
interface Arg_Node_429_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_429 = Arg_Node_429_;
interface Arg_Node_430_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_430 = Arg_Node_430_;
interface Arg_Node_431_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_431 = Arg_Node_431_;
interface Arg_Node_432_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_432 = Arg_Node_432_;
interface Arg_Node_433_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_433 = Arg_Node_433_;
interface Arg_Node_434_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_434 = Arg_Node_434_;
interface Arg_Node_435_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_435 = Arg_Node_435_;
interface Arg_Node_436_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_436 = Arg_Node_436_;
interface Arg_Node_437_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_437 = Arg_Node_437_;
interface Arg_Node_438_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_438 = Arg_Node_438_;
interface Arg_Node_439_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_439 = Arg_Node_439_;
interface Arg_Node_440_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_440 = Arg_Node_440_;
interface Arg_Node_441_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_441 = Arg_Node_441_;
interface Arg_Node_442_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_442 = Arg_Node_442_;
interface Arg_Node_443_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYVAL_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_443 = Arg_Node_443_;
interface Arg_Node_444_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_444 = Arg_Node_444_;
interface Arg_Node_445_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_445 = Arg_Node_445_;
interface Arg_Node_446_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_446 = Arg_Node_446_;
interface Arg_Node_447_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_447 = Arg_Node_447_;
interface Arg_Node_448_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_448 = Arg_Node_448_;
interface Arg_Node_449_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_449 = Arg_Node_449_;
interface Arg_Node_450_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_450 = Arg_Node_450_;
interface Arg_Node_451_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_451 = Arg_Node_451_;
interface Arg_Node_452_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_452 = Arg_Node_452_;
interface Arg_Node_453_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_453 = Arg_Node_453_;
interface Arg_Node_454_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_454 = Arg_Node_454_;
interface Arg_Node_455_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_455 = Arg_Node_455_;
interface Arg_Node_456_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_456 = Arg_Node_456_;
interface Arg_Node_457_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_457 = Arg_Node_457_;
interface Arg_Node_458_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_458 = Arg_Node_458_;
interface Arg_Node_459_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_459 = Arg_Node_459_;
interface Arg_Node_460_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_460 = Arg_Node_460_;
interface Arg_Node_461_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_461 = Arg_Node_461_;
interface Arg_Node_462_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_462 = Arg_Node_462_;
interface Arg_Node_463_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_463 = Arg_Node_463_;
interface Arg_Node_464_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_464 = Arg_Node_464_;
interface Arg_Node_465_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_465 = Arg_Node_465_;
interface Arg_Node_466_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_466 = Arg_Node_466_;
interface Arg_Node_467_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_467 = Arg_Node_467_;
interface Arg_Node_468_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_468 = Arg_Node_468_;
interface Arg_Node_469_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_469 = Arg_Node_469_;
interface Arg_Node_470_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_470 = Arg_Node_470_;
interface Arg_Node_471_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_471 = Arg_Node_471_;
interface Arg_Node_472_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_472 = Arg_Node_472_;
interface Arg_Node_473_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_473 = Arg_Node_473_;
interface Arg_Node_474_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_474 = Arg_Node_474_;
interface Arg_Node_475_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_475 = Arg_Node_475_;
interface Arg_Node_476_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_476 = Arg_Node_476_;
interface Arg_Node_477_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_477 = Arg_Node_477_;
interface Arg_Node_478_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_478 = Arg_Node_478_;
interface Arg_Node_479_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_479 = Arg_Node_479_;
interface Arg_Node_480_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_480 = Arg_Node_480_;
interface Arg_Node_481_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_481 = Arg_Node_481_;
interface Arg_Node_482_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_482 = Arg_Node_482_;
interface Arg_Node_483_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_483 = Arg_Node_483_;
interface Arg_Node_484_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_484 = Arg_Node_484_;
interface Arg_Node_485_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_485 = Arg_Node_485_;
interface Arg_Node_486_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_486 = Arg_Node_486_;
interface Arg_Node_487_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_487 = Arg_Node_487_;
interface Arg_Node_488_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_488 = Arg_Node_488_;
interface Arg_Node_489_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_489 = Arg_Node_489_;
interface Arg_Node_490_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_490 = Arg_Node_490_;
interface Arg_Node_491_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_491 = Arg_Node_491_;
interface Arg_Node_492_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_492 = Arg_Node_492_;
interface Arg_Node_493_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_493 = Arg_Node_493_;
interface Arg_Node_494_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_494 = Arg_Node_494_;
interface Arg_Node_495_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_495 = Arg_Node_495_;
interface Arg_Node_496_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_496 = Arg_Node_496_;
interface Arg_Node_497_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_497 = Arg_Node_497_;
interface Arg_Node_498_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_498 = Arg_Node_498_;
interface Arg_Node_499_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_499 = Arg_Node_499_;
interface Arg_Node_500_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_500 = Arg_Node_500_;
interface Arg_Node_501_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_501 = Arg_Node_501_;
interface Arg_Node_502_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_502 = Arg_Node_502_;
interface Arg_Node_503_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_503 = Arg_Node_503_;
interface Arg_Node_504_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_504 = Arg_Node_504_;
interface Arg_Node_505_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_505 = Arg_Node_505_;
interface Arg_Node_506_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_506 = Arg_Node_506_;
interface Arg_Node_507_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,BYREF_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_507 = Arg_Node_507_;
interface Arg_Node_508_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_508 = Arg_Node_508_;
interface Arg_Node_509_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_509 = Arg_Node_509_;
interface Arg_Node_510_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_510 = Arg_Node_510_;
interface Arg_Node_511_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_511 = Arg_Node_511_;
interface Arg_Node_512_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_512 = Arg_Node_512_;
interface Arg_Node_513_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_513 = Arg_Node_513_;
interface Arg_Node_514_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_514 = Arg_Node_514_;
interface Arg_Node_515_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_515 = Arg_Node_515_;
interface Arg_Node_516_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_516 = Arg_Node_516_;
interface Arg_Node_517_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_517 = Arg_Node_517_;
interface Arg_Node_518_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_518 = Arg_Node_518_;
interface Arg_Node_519_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_519 = Arg_Node_519_;
interface Arg_Node_520_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_520 = Arg_Node_520_;
interface Arg_Node_521_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_521 = Arg_Node_521_;
interface Arg_Node_522_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_522 = Arg_Node_522_;
interface Arg_Node_523_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_523 = Arg_Node_523_;
interface Arg_Node_524_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_524 = Arg_Node_524_;
interface Arg_Node_525_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_525 = Arg_Node_525_;
interface Arg_Node_526_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_526 = Arg_Node_526_;
interface Arg_Node_527_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_527 = Arg_Node_527_;
interface Arg_Node_528_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_528 = Arg_Node_528_;
interface Arg_Node_529_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_529 = Arg_Node_529_;
interface Arg_Node_530_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_530 = Arg_Node_530_;
interface Arg_Node_531_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_531 = Arg_Node_531_;
interface Arg_Node_532_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_532 = Arg_Node_532_;
interface Arg_Node_533_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_533 = Arg_Node_533_;
interface Arg_Node_534_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_534 = Arg_Node_534_;
interface Arg_Node_535_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_535 = Arg_Node_535_;
interface Arg_Node_536_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_536 = Arg_Node_536_;
interface Arg_Node_537_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_537 = Arg_Node_537_;
interface Arg_Node_538_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_538 = Arg_Node_538_;
interface Arg_Node_539_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[OPTIONAL_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_539 = Arg_Node_539_;
interface Arg_Node_540_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_540 = Arg_Node_540_;
interface Arg_Node_541_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_541 = Arg_Node_541_;
interface Arg_Node_542_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_542 = Arg_Node_542_;
interface Arg_Node_543_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_543 = Arg_Node_543_;
interface Arg_Node_544_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_544 = Arg_Node_544_;
interface Arg_Node_545_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_545 = Arg_Node_545_;
interface Arg_Node_546_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_546 = Arg_Node_546_;
interface Arg_Node_547_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_547 = Arg_Node_547_;
interface Arg_Node_548_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_548 = Arg_Node_548_;
interface Arg_Node_549_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_549 = Arg_Node_549_;
interface Arg_Node_550_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_550 = Arg_Node_550_;
interface Arg_Node_551_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_551 = Arg_Node_551_;
interface Arg_Node_552_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_552 = Arg_Node_552_;
interface Arg_Node_553_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_553 = Arg_Node_553_;
interface Arg_Node_554_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_554 = Arg_Node_554_;
interface Arg_Node_555_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,PARAMARRAY_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_555 = Arg_Node_555_;
interface Arg_Node_556_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_556 = Arg_Node_556_;
interface Arg_Node_557_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_557 = Arg_Node_557_;
interface Arg_Node_558_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_558 = Arg_Node_558_;
interface Arg_Node_559_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_559 = Arg_Node_559_;
interface Arg_Node_560_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_560 = Arg_Node_560_;
interface Arg_Node_561_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_561 = Arg_Node_561_;
interface Arg_Node_562_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_562 = Arg_Node_562_;
interface Arg_Node_563_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_563 = Arg_Node_563_;
interface Arg_Node_564_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_564 = Arg_Node_564_;
interface Arg_Node_565_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_565 = Arg_Node_565_;
interface Arg_Node_566_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_566 = Arg_Node_566_;
interface Arg_Node_567_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_567 = Arg_Node_567_;
interface Arg_Node_568_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_568 = Arg_Node_568_;
interface Arg_Node_569_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_569 = Arg_Node_569_;
interface Arg_Node_570_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_570 = Arg_Node_570_;
interface Arg_Node_571_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[BYREF_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_571 = Arg_Node_571_;
interface Arg_Node_572_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_572 = Arg_Node_572_;
interface Arg_Node_573_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_573 = Arg_Node_573_;
interface Arg_Node_574_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_574 = Arg_Node_574_;
interface Arg_Node_575_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_575 = Arg_Node_575_;
interface Arg_Node_576_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_576 = Arg_Node_576_;
interface Arg_Node_577_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_577 = Arg_Node_577_;
interface Arg_Node_578_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_578 = Arg_Node_578_;
interface Arg_Node_579_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_579 = Arg_Node_579_;
interface Arg_Node_580_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_580 = Arg_Node_580_;
interface Arg_Node_581_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_581 = Arg_Node_581_;
interface Arg_Node_582_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_582 = Arg_Node_582_;
interface Arg_Node_583_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_583 = Arg_Node_583_;
interface Arg_Node_584_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_584 = Arg_Node_584_;
interface Arg_Node_585_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_585 = Arg_Node_585_;
interface Arg_Node_586_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_586 = Arg_Node_586_;
interface Arg_Node_587_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[PARAMARRAY_Node,AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_587 = Arg_Node_587_;
interface Arg_Node_588_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_588 = Arg_Node_588_;
interface Arg_Node_589_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_589 = Arg_Node_589_;
interface Arg_Node_590_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_590 = Arg_Node_590_;
interface Arg_Node_591_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_591 = Arg_Node_591_;
interface Arg_Node_592_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_592 = Arg_Node_592_;
interface Arg_Node_593_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_593 = Arg_Node_593_;
interface Arg_Node_594_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_594 = Arg_Node_594_;
interface Arg_Node_595_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,TypeHint_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_595 = Arg_Node_595_;
interface Arg_Node_596_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_596 = Arg_Node_596_;
interface Arg_Node_597_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,...Arg_91_group_7_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_597 = Arg_Node_597_;
interface Arg_Node_598_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,...Arg_91_group_7_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_598 = Arg_Node_598_;
interface Arg_Node_599_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,...Arg_91_group_7_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_599 = Arg_Node_599_;
interface Arg_Node_600_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,AsTypeClause_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_600 = Arg_Node_600_;
interface Arg_Node_601_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,AsTypeClause_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_601 = Arg_Node_601_;
interface Arg_Node_602_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node,ArgDefaultValue_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_602 = Arg_Node_602_;
interface Arg_Node_603_ extends BaseSymbolNode {
        symbol:"arg";
        
        children:[AmbiguousIdentifier_Node];
        parent:ArgList_68_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
      }
type Arg_Node_603 = Arg_Node_603_;
interface ArgDefaultValue_Node_ extends BaseSymbolNode {
        symbol:"argDefaultValue";
        
        children:[EQ_Node,ValueStmt_Node];
        parent:Arg_Node_348 | Arg_Node_350 | Arg_Node_352 | Arg_Node_354 | Arg_Node_356 | Arg_Node_358 | Arg_Node_360 | Arg_Node_362 | Arg_Node_364 | Arg_Node_366 | Arg_Node_368 | Arg_Node_370 | Arg_Node_372 | Arg_Node_374 | Arg_Node_376 | Arg_Node_378 | Arg_Node_380 | Arg_Node_382 | Arg_Node_384 | Arg_Node_386 | Arg_Node_388 | Arg_Node_390 | Arg_Node_392 | Arg_Node_394 | Arg_Node_396 | Arg_Node_398 | Arg_Node_400 | Arg_Node_402 | Arg_Node_404 | Arg_Node_406 | Arg_Node_408 | Arg_Node_410 | Arg_Node_412 | Arg_Node_414 | Arg_Node_416 | Arg_Node_418 | Arg_Node_420 | Arg_Node_422 | Arg_Node_424 | Arg_Node_426 | Arg_Node_428 | Arg_Node_430 | Arg_Node_432 | Arg_Node_434 | Arg_Node_436 | Arg_Node_438 | Arg_Node_440 | Arg_Node_442 | Arg_Node_444 | Arg_Node_446 | Arg_Node_448 | Arg_Node_450 | Arg_Node_452 | Arg_Node_454 | Arg_Node_456 | Arg_Node_458 | Arg_Node_460 | Arg_Node_462 | Arg_Node_464 | Arg_Node_466 | Arg_Node_468 | Arg_Node_470 | Arg_Node_472 | Arg_Node_474 | Arg_Node_476 | Arg_Node_478 | Arg_Node_480 | Arg_Node_482 | Arg_Node_484 | Arg_Node_486 | Arg_Node_488 | Arg_Node_490 | Arg_Node_492 | Arg_Node_494 | Arg_Node_496 | Arg_Node_498 | Arg_Node_500 | Arg_Node_502 | Arg_Node_504 | Arg_Node_506 | Arg_Node_508 | Arg_Node_510 | Arg_Node_512 | Arg_Node_514 | Arg_Node_516 | Arg_Node_518 | Arg_Node_520 | Arg_Node_522 | Arg_Node_524 | Arg_Node_526 | Arg_Node_528 | Arg_Node_530 | Arg_Node_532 | Arg_Node_534 | Arg_Node_536 | Arg_Node_538 | Arg_Node_540 | Arg_Node_542 | Arg_Node_544 | Arg_Node_546 | Arg_Node_548 | Arg_Node_550 | Arg_Node_552 | Arg_Node_554 | Arg_Node_556 | Arg_Node_558 | Arg_Node_560 | Arg_Node_562 | Arg_Node_564 | Arg_Node_566 | Arg_Node_568 | Arg_Node_570 | Arg_Node_572 | Arg_Node_574 | Arg_Node_576 | Arg_Node_578 | Arg_Node_580 | Arg_Node_582 | Arg_Node_584 | Arg_Node_586 | Arg_Node_588 | Arg_Node_590 | Arg_Node_592 | Arg_Node_594 | Arg_Node_596 | Arg_Node_598 | Arg_Node_600 | Arg_Node_602;
      }
type ArgDefaultValue_Node = ArgDefaultValue_Node_;
interface AS_Node_ extends BaseTokenNode {
            token:"AS";
            parent:AsTypeClause_Node_605 | AsTypeClause_Node_606 | AsTypeClause_Node_607 | AsTypeClause_Node_608;
          }
export type AS_Node = AS_Node_;
interface NEW_Node_ extends BaseTokenNode {
            token:"NEW";
            parent:AsTypeClause_Node_605 | AsTypeClause_Node_606;
          }
export type NEW_Node = NEW_Node_;
interface AsTypeClause_Node_605_ extends BaseSymbolNode {
        symbol:"asTypeClause";
        
        children:[AS_Node,NEW_Node,Type__Node,FieldLength_Node];
        parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_66 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_145 | FunctionStmt_Node_146 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_157 | FunctionStmt_Node_158 | FunctionStmt_Node_161 | FunctionStmt_Node_162 | RedimSubStmt_Node_177 | VariableSubStmt_Node_273 | VariableSubStmt_Node_275 | VariableSubStmt_Node_277 | VariableSubStmt_Node_279 | Arg_Node_348 | Arg_Node_349 | Arg_Node_352 | Arg_Node_353 | Arg_Node_356 | Arg_Node_357 | Arg_Node_360 | Arg_Node_361 | Arg_Node_364 | Arg_Node_365 | Arg_Node_368 | Arg_Node_369 | Arg_Node_372 | Arg_Node_373 | Arg_Node_376 | Arg_Node_377 | Arg_Node_380 | Arg_Node_381 | Arg_Node_384 | Arg_Node_385 | Arg_Node_388 | Arg_Node_389 | Arg_Node_392 | Arg_Node_393 | Arg_Node_396 | Arg_Node_397 | Arg_Node_400 | Arg_Node_401 | Arg_Node_404 | Arg_Node_405 | Arg_Node_408 | Arg_Node_409 | Arg_Node_412 | Arg_Node_413 | Arg_Node_416 | Arg_Node_417 | Arg_Node_420 | Arg_Node_421 | Arg_Node_424 | Arg_Node_425 | Arg_Node_428 | Arg_Node_429 | Arg_Node_432 | Arg_Node_433 | Arg_Node_436 | Arg_Node_437 | Arg_Node_440 | Arg_Node_441 | Arg_Node_444 | Arg_Node_445 | Arg_Node_448 | Arg_Node_449 | Arg_Node_452 | Arg_Node_453 | Arg_Node_456 | Arg_Node_457 | Arg_Node_460 | Arg_Node_461 | Arg_Node_464 | Arg_Node_465 | Arg_Node_468 | Arg_Node_469 | Arg_Node_472 | Arg_Node_473 | Arg_Node_476 | Arg_Node_477 | Arg_Node_480 | Arg_Node_481 | Arg_Node_484 | Arg_Node_485 | Arg_Node_488 | Arg_Node_489 | Arg_Node_492 | Arg_Node_493 | Arg_Node_496 | Arg_Node_497 | Arg_Node_500 | Arg_Node_501 | Arg_Node_504 | Arg_Node_505 | Arg_Node_508 | Arg_Node_509 | Arg_Node_512 | Arg_Node_513 | Arg_Node_516 | Arg_Node_517 | Arg_Node_520 | Arg_Node_521 | Arg_Node_524 | Arg_Node_525 | Arg_Node_528 | Arg_Node_529 | Arg_Node_532 | Arg_Node_533 | Arg_Node_536 | Arg_Node_537 | Arg_Node_540 | Arg_Node_541 | Arg_Node_544 | Arg_Node_545 | Arg_Node_548 | Arg_Node_549 | Arg_Node_552 | Arg_Node_553 | Arg_Node_556 | Arg_Node_557 | Arg_Node_560 | Arg_Node_561 | Arg_Node_564 | Arg_Node_565 | Arg_Node_568 | Arg_Node_569 | Arg_Node_572 | Arg_Node_573 | Arg_Node_576 | Arg_Node_577 | Arg_Node_580 | Arg_Node_581 | Arg_Node_584 | Arg_Node_585 | Arg_Node_588 | Arg_Node_589 | Arg_Node_592 | Arg_Node_593 | Arg_Node_596 | Arg_Node_597 | Arg_Node_600 | Arg_Node_601;
      }
type AsTypeClause_Node_605 = AsTypeClause_Node_605_;
interface AsTypeClause_Node_606_ extends BaseSymbolNode {
        symbol:"asTypeClause";
        
        children:[AS_Node,NEW_Node,Type__Node];
        parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_66 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_145 | FunctionStmt_Node_146 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_157 | FunctionStmt_Node_158 | FunctionStmt_Node_161 | FunctionStmt_Node_162 | RedimSubStmt_Node_177 | VariableSubStmt_Node_273 | VariableSubStmt_Node_275 | VariableSubStmt_Node_277 | VariableSubStmt_Node_279 | Arg_Node_348 | Arg_Node_349 | Arg_Node_352 | Arg_Node_353 | Arg_Node_356 | Arg_Node_357 | Arg_Node_360 | Arg_Node_361 | Arg_Node_364 | Arg_Node_365 | Arg_Node_368 | Arg_Node_369 | Arg_Node_372 | Arg_Node_373 | Arg_Node_376 | Arg_Node_377 | Arg_Node_380 | Arg_Node_381 | Arg_Node_384 | Arg_Node_385 | Arg_Node_388 | Arg_Node_389 | Arg_Node_392 | Arg_Node_393 | Arg_Node_396 | Arg_Node_397 | Arg_Node_400 | Arg_Node_401 | Arg_Node_404 | Arg_Node_405 | Arg_Node_408 | Arg_Node_409 | Arg_Node_412 | Arg_Node_413 | Arg_Node_416 | Arg_Node_417 | Arg_Node_420 | Arg_Node_421 | Arg_Node_424 | Arg_Node_425 | Arg_Node_428 | Arg_Node_429 | Arg_Node_432 | Arg_Node_433 | Arg_Node_436 | Arg_Node_437 | Arg_Node_440 | Arg_Node_441 | Arg_Node_444 | Arg_Node_445 | Arg_Node_448 | Arg_Node_449 | Arg_Node_452 | Arg_Node_453 | Arg_Node_456 | Arg_Node_457 | Arg_Node_460 | Arg_Node_461 | Arg_Node_464 | Arg_Node_465 | Arg_Node_468 | Arg_Node_469 | Arg_Node_472 | Arg_Node_473 | Arg_Node_476 | Arg_Node_477 | Arg_Node_480 | Arg_Node_481 | Arg_Node_484 | Arg_Node_485 | Arg_Node_488 | Arg_Node_489 | Arg_Node_492 | Arg_Node_493 | Arg_Node_496 | Arg_Node_497 | Arg_Node_500 | Arg_Node_501 | Arg_Node_504 | Arg_Node_505 | Arg_Node_508 | Arg_Node_509 | Arg_Node_512 | Arg_Node_513 | Arg_Node_516 | Arg_Node_517 | Arg_Node_520 | Arg_Node_521 | Arg_Node_524 | Arg_Node_525 | Arg_Node_528 | Arg_Node_529 | Arg_Node_532 | Arg_Node_533 | Arg_Node_536 | Arg_Node_537 | Arg_Node_540 | Arg_Node_541 | Arg_Node_544 | Arg_Node_545 | Arg_Node_548 | Arg_Node_549 | Arg_Node_552 | Arg_Node_553 | Arg_Node_556 | Arg_Node_557 | Arg_Node_560 | Arg_Node_561 | Arg_Node_564 | Arg_Node_565 | Arg_Node_568 | Arg_Node_569 | Arg_Node_572 | Arg_Node_573 | Arg_Node_576 | Arg_Node_577 | Arg_Node_580 | Arg_Node_581 | Arg_Node_584 | Arg_Node_585 | Arg_Node_588 | Arg_Node_589 | Arg_Node_592 | Arg_Node_593 | Arg_Node_596 | Arg_Node_597 | Arg_Node_600 | Arg_Node_601;
      }
type AsTypeClause_Node_606 = AsTypeClause_Node_606_;
interface AsTypeClause_Node_607_ extends BaseSymbolNode {
        symbol:"asTypeClause";
        
        children:[AS_Node,Type__Node,FieldLength_Node];
        parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_66 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_145 | FunctionStmt_Node_146 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_157 | FunctionStmt_Node_158 | FunctionStmt_Node_161 | FunctionStmt_Node_162 | RedimSubStmt_Node_177 | VariableSubStmt_Node_273 | VariableSubStmt_Node_275 | VariableSubStmt_Node_277 | VariableSubStmt_Node_279 | Arg_Node_348 | Arg_Node_349 | Arg_Node_352 | Arg_Node_353 | Arg_Node_356 | Arg_Node_357 | Arg_Node_360 | Arg_Node_361 | Arg_Node_364 | Arg_Node_365 | Arg_Node_368 | Arg_Node_369 | Arg_Node_372 | Arg_Node_373 | Arg_Node_376 | Arg_Node_377 | Arg_Node_380 | Arg_Node_381 | Arg_Node_384 | Arg_Node_385 | Arg_Node_388 | Arg_Node_389 | Arg_Node_392 | Arg_Node_393 | Arg_Node_396 | Arg_Node_397 | Arg_Node_400 | Arg_Node_401 | Arg_Node_404 | Arg_Node_405 | Arg_Node_408 | Arg_Node_409 | Arg_Node_412 | Arg_Node_413 | Arg_Node_416 | Arg_Node_417 | Arg_Node_420 | Arg_Node_421 | Arg_Node_424 | Arg_Node_425 | Arg_Node_428 | Arg_Node_429 | Arg_Node_432 | Arg_Node_433 | Arg_Node_436 | Arg_Node_437 | Arg_Node_440 | Arg_Node_441 | Arg_Node_444 | Arg_Node_445 | Arg_Node_448 | Arg_Node_449 | Arg_Node_452 | Arg_Node_453 | Arg_Node_456 | Arg_Node_457 | Arg_Node_460 | Arg_Node_461 | Arg_Node_464 | Arg_Node_465 | Arg_Node_468 | Arg_Node_469 | Arg_Node_472 | Arg_Node_473 | Arg_Node_476 | Arg_Node_477 | Arg_Node_480 | Arg_Node_481 | Arg_Node_484 | Arg_Node_485 | Arg_Node_488 | Arg_Node_489 | Arg_Node_492 | Arg_Node_493 | Arg_Node_496 | Arg_Node_497 | Arg_Node_500 | Arg_Node_501 | Arg_Node_504 | Arg_Node_505 | Arg_Node_508 | Arg_Node_509 | Arg_Node_512 | Arg_Node_513 | Arg_Node_516 | Arg_Node_517 | Arg_Node_520 | Arg_Node_521 | Arg_Node_524 | Arg_Node_525 | Arg_Node_528 | Arg_Node_529 | Arg_Node_532 | Arg_Node_533 | Arg_Node_536 | Arg_Node_537 | Arg_Node_540 | Arg_Node_541 | Arg_Node_544 | Arg_Node_545 | Arg_Node_548 | Arg_Node_549 | Arg_Node_552 | Arg_Node_553 | Arg_Node_556 | Arg_Node_557 | Arg_Node_560 | Arg_Node_561 | Arg_Node_564 | Arg_Node_565 | Arg_Node_568 | Arg_Node_569 | Arg_Node_572 | Arg_Node_573 | Arg_Node_576 | Arg_Node_577 | Arg_Node_580 | Arg_Node_581 | Arg_Node_584 | Arg_Node_585 | Arg_Node_588 | Arg_Node_589 | Arg_Node_592 | Arg_Node_593 | Arg_Node_596 | Arg_Node_597 | Arg_Node_600 | Arg_Node_601;
      }
type AsTypeClause_Node_607 = AsTypeClause_Node_607_;
interface AsTypeClause_Node_608_ extends BaseSymbolNode {
        symbol:"asTypeClause";
        
        children:[AS_Node,Type__Node];
        parent:PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_66 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_145 | FunctionStmt_Node_146 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_157 | FunctionStmt_Node_158 | FunctionStmt_Node_161 | FunctionStmt_Node_162 | RedimSubStmt_Node_177 | VariableSubStmt_Node_273 | VariableSubStmt_Node_275 | VariableSubStmt_Node_277 | VariableSubStmt_Node_279 | Arg_Node_348 | Arg_Node_349 | Arg_Node_352 | Arg_Node_353 | Arg_Node_356 | Arg_Node_357 | Arg_Node_360 | Arg_Node_361 | Arg_Node_364 | Arg_Node_365 | Arg_Node_368 | Arg_Node_369 | Arg_Node_372 | Arg_Node_373 | Arg_Node_376 | Arg_Node_377 | Arg_Node_380 | Arg_Node_381 | Arg_Node_384 | Arg_Node_385 | Arg_Node_388 | Arg_Node_389 | Arg_Node_392 | Arg_Node_393 | Arg_Node_396 | Arg_Node_397 | Arg_Node_400 | Arg_Node_401 | Arg_Node_404 | Arg_Node_405 | Arg_Node_408 | Arg_Node_409 | Arg_Node_412 | Arg_Node_413 | Arg_Node_416 | Arg_Node_417 | Arg_Node_420 | Arg_Node_421 | Arg_Node_424 | Arg_Node_425 | Arg_Node_428 | Arg_Node_429 | Arg_Node_432 | Arg_Node_433 | Arg_Node_436 | Arg_Node_437 | Arg_Node_440 | Arg_Node_441 | Arg_Node_444 | Arg_Node_445 | Arg_Node_448 | Arg_Node_449 | Arg_Node_452 | Arg_Node_453 | Arg_Node_456 | Arg_Node_457 | Arg_Node_460 | Arg_Node_461 | Arg_Node_464 | Arg_Node_465 | Arg_Node_468 | Arg_Node_469 | Arg_Node_472 | Arg_Node_473 | Arg_Node_476 | Arg_Node_477 | Arg_Node_480 | Arg_Node_481 | Arg_Node_484 | Arg_Node_485 | Arg_Node_488 | Arg_Node_489 | Arg_Node_492 | Arg_Node_493 | Arg_Node_496 | Arg_Node_497 | Arg_Node_500 | Arg_Node_501 | Arg_Node_504 | Arg_Node_505 | Arg_Node_508 | Arg_Node_509 | Arg_Node_512 | Arg_Node_513 | Arg_Node_516 | Arg_Node_517 | Arg_Node_520 | Arg_Node_521 | Arg_Node_524 | Arg_Node_525 | Arg_Node_528 | Arg_Node_529 | Arg_Node_532 | Arg_Node_533 | Arg_Node_536 | Arg_Node_537 | Arg_Node_540 | Arg_Node_541 | Arg_Node_544 | Arg_Node_545 | Arg_Node_548 | Arg_Node_549 | Arg_Node_552 | Arg_Node_553 | Arg_Node_556 | Arg_Node_557 | Arg_Node_560 | Arg_Node_561 | Arg_Node_564 | Arg_Node_565 | Arg_Node_568 | Arg_Node_569 | Arg_Node_572 | Arg_Node_573 | Arg_Node_576 | Arg_Node_577 | Arg_Node_580 | Arg_Node_581 | Arg_Node_584 | Arg_Node_585 | Arg_Node_588 | Arg_Node_589 | Arg_Node_592 | Arg_Node_593 | Arg_Node_596 | Arg_Node_597 | Arg_Node_600 | Arg_Node_601;
      }
type AsTypeClause_Node_608 = AsTypeClause_Node_608_;
interface Type__Node_609_ extends BaseSymbolNode {
        symbol:"type_";
        
        children:[BaseType_Node,...Arg_91_group_7_Node];
        parent:AsTypeClause_Node_605 | AsTypeClause_Node_606 | AsTypeClause_Node_607 | AsTypeClause_Node_608;
      }
type Type__Node_609 = Type__Node_609_;
interface Type__Node_610_ extends BaseSymbolNode {
        symbol:"type_";
        
        children:[BaseType_Node];
        parent:AsTypeClause_Node_605 | AsTypeClause_Node_606 | AsTypeClause_Node_607 | AsTypeClause_Node_608;
      }
type Type__Node_610 = Type__Node_610_;
interface Type__Node_611_ extends BaseSymbolNode {
        symbol:"type_";
        
        children:[ComplexType_Node,...Arg_91_group_7_Node];
        parent:AsTypeClause_Node_605 | AsTypeClause_Node_606 | AsTypeClause_Node_607 | AsTypeClause_Node_608;
      }
type Type__Node_611 = Type__Node_611_;
interface Type__Node_612_ extends BaseSymbolNode {
        symbol:"type_";
        
        children:[ComplexType_Node];
        parent:AsTypeClause_Node_605 | AsTypeClause_Node_606 | AsTypeClause_Node_607 | AsTypeClause_Node_608;
      }
type Type__Node_612 = Type__Node_612_;
interface ComplexType_Node_613_ extends BaseSymbolNode {
        symbol:"complexType";
        
        children:[AmbiguousIdentifier_Node,...ZeroOrMore<ComplexType_97_group_1_Node>];
        parent:Type__Node_611 | Type__Node_612;
      }
type ComplexType_Node_613 = ComplexType_Node_613_;
interface ComplexType_Node_614_ extends BaseSymbolNode {
        symbol:"complexType";
        
        children:[AmbiguousIdentifier_Node,...ZeroOrMore<ComplexType_98_group_1_Node>];
        parent:Type__Node_611 | Type__Node_612;
      }
type ComplexType_Node_614 = ComplexType_Node_614_;
interface BOOLEAN_Node_ extends BaseTokenNode {
            token:"BOOLEAN";
            parent:BaseType_Node_615;
          }
export type BOOLEAN_Node = BOOLEAN_Node_;
interface BaseType_Node_615_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[BOOLEAN_Node];
        parent:Type__Node_609 | Type__Node_610;
      }
type BaseType_Node_615 = BaseType_Node_615_;
interface BYTE_Node_ extends BaseTokenNode {
            token:"BYTE";
            parent:BaseType_Node_616;
          }
export type BYTE_Node = BYTE_Node_;
interface BaseType_Node_616_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[BYTE_Node];
        parent:Type__Node_609 | Type__Node_610;
      }
type BaseType_Node_616 = BaseType_Node_616_;
interface COLLECTION_Node_ extends BaseTokenNode {
            token:"COLLECTION";
            parent:BaseType_Node_617;
          }
export type COLLECTION_Node = COLLECTION_Node_;
interface BaseType_Node_617_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[COLLECTION_Node];
        parent:Type__Node_609 | Type__Node_610;
      }
type BaseType_Node_617 = BaseType_Node_617_;
interface DOUBLE_Node_ extends BaseTokenNode {
            token:"DOUBLE";
            parent:BaseType_Node_618;
          }
export type DOUBLE_Node = DOUBLE_Node_;
interface BaseType_Node_618_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[DOUBLE_Node];
        parent:Type__Node_609 | Type__Node_610;
      }
type BaseType_Node_618 = BaseType_Node_618_;
interface INTEGER_Node_ extends BaseTokenNode {
            token:"INTEGER";
            parent:BaseType_Node_619;
          }
export type INTEGER_Node = INTEGER_Node_;
interface BaseType_Node_619_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[INTEGER_Node];
        parent:Type__Node_609 | Type__Node_610;
      }
type BaseType_Node_619 = BaseType_Node_619_;
interface LONG_Node_ extends BaseTokenNode {
            token:"LONG";
            parent:BaseType_Node_620;
          }
export type LONG_Node = LONG_Node_;
interface BaseType_Node_620_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[LONG_Node];
        parent:Type__Node_609 | Type__Node_610;
      }
type BaseType_Node_620 = BaseType_Node_620_;
interface SINGLE_Node_ extends BaseTokenNode {
            token:"SINGLE";
            parent:BaseType_Node_621;
          }
export type SINGLE_Node = SINGLE_Node_;
interface BaseType_Node_621_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[SINGLE_Node];
        parent:Type__Node_609 | Type__Node_610;
      }
type BaseType_Node_621 = BaseType_Node_621_;
interface VARIANT_Node_ extends BaseTokenNode {
            token:"VARIANT";
            parent:BaseType_Node_622;
          }
export type VARIANT_Node = VARIANT_Node_;
interface BaseType_Node_622_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[VARIANT_Node];
        parent:Type__Node_609 | Type__Node_610;
      }
type BaseType_Node_622 = BaseType_Node_622_;
interface STRING_Node_ extends BaseTokenNode {
            token:"STRING";
            parent:BaseType_Node_623 | BaseType_Node_624;
          }
export type STRING_Node = STRING_Node_;
interface BaseType_Node_623_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[STRING_Node,...BaseType_107_group_1_Node];
        parent:Type__Node_609 | Type__Node_610;
      }
type BaseType_Node_623 = BaseType_Node_623_;
interface BaseType_Node_624_ extends BaseSymbolNode {
        symbol:"baseType";
        
        children:[STRING_Node];
        parent:Type__Node_609 | Type__Node_610;
      }
type BaseType_Node_624 = BaseType_Node_624_;
interface MULT_Node_ extends BaseTokenNode {
            token:"MULT";
            parent:FieldLength_Node_625 | FieldLength_Node_626 | BaseType_107_group_1_Parent_Node;
          }
export type MULT_Node = MULT_Node_;
interface FieldLength_Node_625_ extends BaseSymbolNode {
        symbol:"fieldLength";
        
        children:[MULT_Node,INTEGERLITERAL_Node];
        parent:AsTypeClause_Node_605 | AsTypeClause_Node_607;
      }
type FieldLength_Node_625 = FieldLength_Node_625_;
interface FieldLength_Node_626_ extends BaseSymbolNode {
        symbol:"fieldLength";
        
        children:[MULT_Node,AmbiguousIdentifier_Node];
        parent:AsTypeClause_Node_605 | AsTypeClause_Node_607;
      }
type FieldLength_Node_626 = FieldLength_Node_626_;
interface IDENTIFIER_Node_ extends BaseTokenNode {
            token:"IDENTIFIER";
            parent:AmbiguousIdentifier_Node;
          }
export type IDENTIFIER_Node = IDENTIFIER_Node_;
interface AmbiguousIdentifier_Node_ extends BaseSymbolNode {
        symbol:"ambiguousIdentifier";
        
        children:[IDENTIFIER_Node];
        parent:SubStmt_Node_21 | SubStmt_Node_22 | SubStmt_Node_23 | SubStmt_Node_24 | SubStmt_Node_25 | SubStmt_Node_26 | SubStmt_Node_27 | SubStmt_Node_28 | SubStmt_Node_29 | SubStmt_Node_30 | SubStmt_Node_31 | SubStmt_Node_32 | SubStmt_Node_33 | SubStmt_Node_34 | SubStmt_Node_35 | SubStmt_Node_36 | PropertyGetStmt_Node_37 | PropertyGetStmt_Node_38 | PropertyGetStmt_Node_39 | PropertyGetStmt_Node_40 | PropertyGetStmt_Node_41 | PropertyGetStmt_Node_42 | PropertyGetStmt_Node_43 | PropertyGetStmt_Node_44 | PropertyGetStmt_Node_45 | PropertyGetStmt_Node_46 | PropertyGetStmt_Node_47 | PropertyGetStmt_Node_48 | PropertyGetStmt_Node_49 | PropertyGetStmt_Node_50 | PropertyGetStmt_Node_51 | PropertyGetStmt_Node_52 | PropertyGetStmt_Node_53 | PropertyGetStmt_Node_54 | PropertyGetStmt_Node_55 | PropertyGetStmt_Node_56 | PropertyGetStmt_Node_57 | PropertyGetStmt_Node_58 | PropertyGetStmt_Node_59 | PropertyGetStmt_Node_60 | PropertyGetStmt_Node_61 | PropertyGetStmt_Node_62 | PropertyGetStmt_Node_63 | PropertyGetStmt_Node_64 | PropertyGetStmt_Node_65 | PropertyGetStmt_Node_66 | PropertyGetStmt_Node_67 | PropertyGetStmt_Node_68 | PropertySetStmt_Node_69 | PropertySetStmt_Node_70 | PropertySetStmt_Node_71 | PropertySetStmt_Node_72 | PropertySetStmt_Node_73 | PropertySetStmt_Node_74 | PropertySetStmt_Node_75 | PropertySetStmt_Node_76 | PropertySetStmt_Node_77 | PropertySetStmt_Node_78 | PropertySetStmt_Node_79 | PropertySetStmt_Node_80 | PropertySetStmt_Node_81 | PropertySetStmt_Node_82 | PropertySetStmt_Node_83 | PropertySetStmt_Node_84 | PropertyLetStmt_Node_85 | PropertyLetStmt_Node_86 | PropertyLetStmt_Node_87 | PropertyLetStmt_Node_88 | PropertyLetStmt_Node_89 | PropertyLetStmt_Node_90 | PropertyLetStmt_Node_91 | PropertyLetStmt_Node_92 | PropertyLetStmt_Node_93 | PropertyLetStmt_Node_94 | PropertyLetStmt_Node_95 | PropertyLetStmt_Node_96 | PropertyLetStmt_Node_97 | PropertyLetStmt_Node_98 | PropertyLetStmt_Node_99 | PropertyLetStmt_Node_100 | FunctionStmt_Node_101 | FunctionStmt_Node_102 | FunctionStmt_Node_103 | FunctionStmt_Node_104 | FunctionStmt_Node_105 | FunctionStmt_Node_106 | FunctionStmt_Node_107 | FunctionStmt_Node_108 | FunctionStmt_Node_109 | FunctionStmt_Node_110 | FunctionStmt_Node_111 | FunctionStmt_Node_112 | FunctionStmt_Node_113 | FunctionStmt_Node_114 | FunctionStmt_Node_115 | FunctionStmt_Node_116 | FunctionStmt_Node_117 | FunctionStmt_Node_118 | FunctionStmt_Node_119 | FunctionStmt_Node_120 | FunctionStmt_Node_121 | FunctionStmt_Node_122 | FunctionStmt_Node_123 | FunctionStmt_Node_124 | FunctionStmt_Node_125 | FunctionStmt_Node_126 | FunctionStmt_Node_127 | FunctionStmt_Node_128 | FunctionStmt_Node_129 | FunctionStmt_Node_130 | FunctionStmt_Node_131 | FunctionStmt_Node_132 | FunctionStmt_Node_133 | FunctionStmt_Node_134 | FunctionStmt_Node_135 | FunctionStmt_Node_136 | FunctionStmt_Node_137 | FunctionStmt_Node_138 | FunctionStmt_Node_139 | FunctionStmt_Node_140 | FunctionStmt_Node_141 | FunctionStmt_Node_142 | FunctionStmt_Node_143 | FunctionStmt_Node_144 | FunctionStmt_Node_145 | FunctionStmt_Node_146 | FunctionStmt_Node_147 | FunctionStmt_Node_148 | FunctionStmt_Node_149 | FunctionStmt_Node_150 | FunctionStmt_Node_151 | FunctionStmt_Node_152 | FunctionStmt_Node_153 | FunctionStmt_Node_154 | FunctionStmt_Node_155 | FunctionStmt_Node_156 | FunctionStmt_Node_157 | FunctionStmt_Node_158 | FunctionStmt_Node_159 | FunctionStmt_Node_160 | FunctionStmt_Node_161 | FunctionStmt_Node_162 | FunctionStmt_Node_163 | FunctionStmt_Node_164 | ECS_MemberProcedureCall_Node_194 | ECS_MemberProcedureCall_Node_195 | ECS_MemberProcedureCall_Node_196 | ECS_MemberProcedureCall_Node_197 | ECS_MemberProcedureCall_Node_198 | ECS_MemberProcedureCall_Node_199 | ECS_MemberProcedureCall_Node_200 | ECS_MemberProcedureCall_Node_201 | ECS_MemberProcedureCall_Node_202 | ECS_MemberProcedureCall_Node_203 | ECS_MemberProcedureCall_Node_204 | ECS_MemberProcedureCall_Node_205 | ECS_MemberProcedureCall_Node_206 | ECS_MemberProcedureCall_Node_207 | ECS_MemberProcedureCall_Node_208 | ECS_MemberProcedureCall_Node_209 | ECS_ProcedureCall_Node_210 | ECS_ProcedureCall_Node_211 | ECS_ProcedureCall_Node_212 | ECS_ProcedureCall_Node_213 | ECS_ProcedureCall_Node_214 | ECS_ProcedureCall_Node_215 | ECS_ProcedureCall_Node_216 | ECS_ProcedureCall_Node_217 | ICS_B_MemberProcedureCall_Node_220 | ICS_B_MemberProcedureCall_Node_221 | ICS_B_MemberProcedureCall_Node_222 | ICS_B_MemberProcedureCall_Node_223 | ICS_B_MemberProcedureCall_Node_224 | ICS_B_MemberProcedureCall_Node_225 | ICS_B_MemberProcedureCall_Node_226 | ICS_B_MemberProcedureCall_Node_227 | ICS_B_MemberProcedureCall_Node_228 | ICS_B_MemberProcedureCall_Node_229 | ICS_B_MemberProcedureCall_Node_230 | ICS_B_MemberProcedureCall_Node_231 | ICS_B_MemberProcedureCall_Node_232 | ICS_B_MemberProcedureCall_Node_233 | ICS_B_MemberProcedureCall_Node_234 | ICS_B_MemberProcedureCall_Node_235 | ICS_B_ProcedureCall_Node_236 | ICS_B_ProcedureCall_Node_237 | ICS_B_ProcedureCall_Node_238 | ICS_B_ProcedureCall_Node_239 | VariableSubStmt_Node_273 | VariableSubStmt_Node_274 | VariableSubStmt_Node_275 | VariableSubStmt_Node_276 | VariableSubStmt_Node_277 | VariableSubStmt_Node_278 | VariableSubStmt_Node_279 | VariableSubStmt_Node_280 | ICS_S_ProcedureOrArrayCall_Node_314 | ICS_S_ProcedureOrArrayCall_Node_315 | ICS_S_ProcedureOrArrayCall_Node_316 | ICS_S_ProcedureOrArrayCall_Node_317 | ICS_S_ProcedureOrArrayCall_Node_318 | ICS_S_ProcedureOrArrayCall_Node_319 | ICS_S_ProcedureOrArrayCall_Node_320 | ICS_S_ProcedureOrArrayCall_Node_321 | ICS_S_ProcedureOrArrayCall_Node_322 | ICS_S_ProcedureOrArrayCall_Node_323 | ICS_S_ProcedureOrArrayCall_Node_324 | ICS_S_ProcedureOrArrayCall_Node_325 | ICS_S_ProcedureOrArrayCall_Node_326 | ICS_S_ProcedureOrArrayCall_Node_327 | ICS_S_ProcedureOrArrayCall_Node_328 | ICS_S_ProcedureOrArrayCall_Node_329 | ICS_S_VariableOrProcedureCall_Node_330 | ICS_S_VariableOrProcedureCall_Node_331 | ICS_S_VariableOrProcedureCall_Node_332 | ICS_S_VariableOrProcedureCall_Node_333 | ICS_S_VariableOrProcedureCall_Node_334 | ICS_S_VariableOrProcedureCall_Node_335 | ICS_S_VariableOrProcedureCall_Node_336 | ICS_S_VariableOrProcedureCall_Node_337 | DictionaryCallStmt_Node_338 | DictionaryCallStmt_Node_339 | Arg_Node_348 | Arg_Node_349 | Arg_Node_350 | Arg_Node_351 | Arg_Node_352 | Arg_Node_353 | Arg_Node_354 | Arg_Node_355 | Arg_Node_356 | Arg_Node_357 | Arg_Node_358 | Arg_Node_359 | Arg_Node_360 | Arg_Node_361 | Arg_Node_362 | Arg_Node_363 | Arg_Node_364 | Arg_Node_365 | Arg_Node_366 | Arg_Node_367 | Arg_Node_368 | Arg_Node_369 | Arg_Node_370 | Arg_Node_371 | Arg_Node_372 | Arg_Node_373 | Arg_Node_374 | Arg_Node_375 | Arg_Node_376 | Arg_Node_377 | Arg_Node_378 | Arg_Node_379 | Arg_Node_380 | Arg_Node_381 | Arg_Node_382 | Arg_Node_383 | Arg_Node_384 | Arg_Node_385 | Arg_Node_386 | Arg_Node_387 | Arg_Node_388 | Arg_Node_389 | Arg_Node_390 | Arg_Node_391 | Arg_Node_392 | Arg_Node_393 | Arg_Node_394 | Arg_Node_395 | Arg_Node_396 | Arg_Node_397 | Arg_Node_398 | Arg_Node_399 | Arg_Node_400 | Arg_Node_401 | Arg_Node_402 | Arg_Node_403 | Arg_Node_404 | Arg_Node_405 | Arg_Node_406 | Arg_Node_407 | Arg_Node_408 | Arg_Node_409 | Arg_Node_410 | Arg_Node_411 | Arg_Node_412 | Arg_Node_413 | Arg_Node_414 | Arg_Node_415 | Arg_Node_416 | Arg_Node_417 | Arg_Node_418 | Arg_Node_419 | Arg_Node_420 | Arg_Node_421 | Arg_Node_422 | Arg_Node_423 | Arg_Node_424 | Arg_Node_425 | Arg_Node_426 | Arg_Node_427 | Arg_Node_428 | Arg_Node_429 | Arg_Node_430 | Arg_Node_431 | Arg_Node_432 | Arg_Node_433 | Arg_Node_434 | Arg_Node_435 | Arg_Node_436 | Arg_Node_437 | Arg_Node_438 | Arg_Node_439 | Arg_Node_440 | Arg_Node_441 | Arg_Node_442 | Arg_Node_443 | Arg_Node_444 | Arg_Node_445 | Arg_Node_446 | Arg_Node_447 | Arg_Node_448 | Arg_Node_449 | Arg_Node_450 | Arg_Node_451 | Arg_Node_452 | Arg_Node_453 | Arg_Node_454 | Arg_Node_455 | Arg_Node_456 | Arg_Node_457 | Arg_Node_458 | Arg_Node_459 | Arg_Node_460 | Arg_Node_461 | Arg_Node_462 | Arg_Node_463 | Arg_Node_464 | Arg_Node_465 | Arg_Node_466 | Arg_Node_467 | Arg_Node_468 | Arg_Node_469 | Arg_Node_470 | Arg_Node_471 | Arg_Node_472 | Arg_Node_473 | Arg_Node_474 | Arg_Node_475 | Arg_Node_476 | Arg_Node_477 | Arg_Node_478 | Arg_Node_479 | Arg_Node_480 | Arg_Node_481 | Arg_Node_482 | Arg_Node_483 | Arg_Node_484 | Arg_Node_485 | Arg_Node_486 | Arg_Node_487 | Arg_Node_488 | Arg_Node_489 | Arg_Node_490 | Arg_Node_491 | Arg_Node_492 | Arg_Node_493 | Arg_Node_494 | Arg_Node_495 | Arg_Node_496 | Arg_Node_497 | Arg_Node_498 | Arg_Node_499 | Arg_Node_500 | Arg_Node_501 | Arg_Node_502 | Arg_Node_503 | Arg_Node_504 | Arg_Node_505 | Arg_Node_506 | Arg_Node_507 | Arg_Node_508 | Arg_Node_509 | Arg_Node_510 | Arg_Node_511 | Arg_Node_512 | Arg_Node_513 | Arg_Node_514 | Arg_Node_515 | Arg_Node_516 | Arg_Node_517 | Arg_Node_518 | Arg_Node_519 | Arg_Node_520 | Arg_Node_521 | Arg_Node_522 | Arg_Node_523 | Arg_Node_524 | Arg_Node_525 | Arg_Node_526 | Arg_Node_527 | Arg_Node_528 | Arg_Node_529 | Arg_Node_530 | Arg_Node_531 | Arg_Node_532 | Arg_Node_533 | Arg_Node_534 | Arg_Node_535 | Arg_Node_536 | Arg_Node_537 | Arg_Node_538 | Arg_Node_539 | Arg_Node_540 | Arg_Node_541 | Arg_Node_542 | Arg_Node_543 | Arg_Node_544 | Arg_Node_545 | Arg_Node_546 | Arg_Node_547 | Arg_Node_548 | Arg_Node_549 | Arg_Node_550 | Arg_Node_551 | Arg_Node_552 | Arg_Node_553 | Arg_Node_554 | Arg_Node_555 | Arg_Node_556 | Arg_Node_557 | Arg_Node_558 | Arg_Node_559 | Arg_Node_560 | Arg_Node_561 | Arg_Node_562 | Arg_Node_563 | Arg_Node_564 | Arg_Node_565 | Arg_Node_566 | Arg_Node_567 | Arg_Node_568 | Arg_Node_569 | Arg_Node_570 | Arg_Node_571 | Arg_Node_572 | Arg_Node_573 | Arg_Node_574 | Arg_Node_575 | Arg_Node_576 | Arg_Node_577 | Arg_Node_578 | Arg_Node_579 | Arg_Node_580 | Arg_Node_581 | Arg_Node_582 | Arg_Node_583 | Arg_Node_584 | Arg_Node_585 | Arg_Node_586 | Arg_Node_587 | Arg_Node_588 | Arg_Node_589 | Arg_Node_590 | Arg_Node_591 | Arg_Node_592 | Arg_Node_593 | Arg_Node_594 | Arg_Node_595 | Arg_Node_596 | Arg_Node_597 | Arg_Node_598 | Arg_Node_599 | Arg_Node_600 | Arg_Node_601 | Arg_Node_602 | Arg_Node_603 | ComplexType_Node_613 | ComplexType_Node_614 | FieldLength_Node_626 | ComplexType_97_group_1_Parent_Node | ComplexType_98_group_1_Parent_Node;
      }
type AmbiguousIdentifier_Node = AmbiguousIdentifier_Node_;
type ModuleDeclarations_8_group_1_Node  = [...OneOrMore<EndOfLine_Node>,ModuleDeclarationsElement_Node];
type ModuleBody_10_group_1_Node  = [...OneOrMore<EndOfLine_Node>,ModuleBodyElement_Node];
type Block_25_group_1_Node  = [EndOfStatement_Node,BlockStmt_Node];
interface TOKEN_6_Node_ extends BaseTokenNode {
            token:",";
            parent:EraseStmt_34_group_2_Parent_Node | RedimStmt_35_group_3_Parent_Node | ArgsCall_55_group_1_Parent_Node_636 | ArgsCall_55_group_1_Parent_Node_637 | VariableListStmt_62_group_1_Parent_Node | Subscripts_66_group_1_Parent_Node | ArgList_68_group_1_234_group_1_Parent_Node;
          }
export type TOKEN_6_Node = TOKEN_6_Node_;
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
interface TO_Node_ extends BaseTokenNode {
            token:"TO";
            parent:Subscript__65_group_0_Parent_Node;
          }
export type TO_Node = TO_Node_;
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