// @ts-check

// http://msdn.microsoft.com/en-us/library/aa338033%28v=vs.60%29.aspx
import * as n from './names';

function RegexEscape(input) {
  return input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function generateLexerRulesByMap(map) {
  const rules = [];
  for (const token of Object.keys(map)) {
    const regexp = new RegExp(RegexEscape(map[token]));
    rules.push([token, regexp]);
  }
  return rules;
}

function isSingleKeyword(s) {
  return s.indexOf('_') === -1;
}

function generateLexerRulesByKeywords(arr) {
  const rules = [];
  for (const token of arr) {
    const reg = token.replace(/^macro_/i, '#').replace(/_/g, ' ');
    const regexp = new RegExp(RegexEscape(reg) + '\\b', 'i');
    rules.push([
      token,
      regexp,
      function action() {
        this.text = (this.text || '').toLowerCase();
      },
    ]);
  }
  return rules;
}

const LINE_CONTINUATION = `([\\u0020\\t]+_\\r?\\n)`;
const NEWLINE = `([\\r\\n]+)`;
const WS = `((${LINE_CONTINUATION}|[\\u0020\\t])+)`;
const REMCOMMENT = `(\\:?rem${WS}(${LINE_CONTINUATION}|[^\\r\\n])*)`;
const COMMENT = `('(${LINE_CONTINUATION}|[^\\r\\n])*)`;

const HIDDEN_REG = new RegExp(
  `
${WS}
|
(\\s+)
`.replace(/\s/g, ''),
  'i',
);

const operators = [
  ['left', n.NOT],
  ['left', n.IS, n.ISNOT, n.GEQ, n.LEQ, n.GT, n.LT, n.NEQ, n.EQ],
  ['left', n.XOR, n.OR, n.AND],
  ['left', n.PLUS, n.MINUS, n.AMPERSAND],
  ['left', n.MULT, n.DIV, n.IDIV, n.MOD],
  ['left', n.POW],
  ['right', n.PREFIX],
];

const binaryOps = [];
for (const g of operators.slice(0, -1)) {
  let ops = g.slice(1);
  if (ops[0] === n.NOT) {
    ops = ops.slice(1);
  }
  binaryOps.push(...ops);
}

const DIGIT = '\\d';
const WS2 = '\\s';
const AMPM = '(?:' + WS2 + '?(AM|PM|A|P))';
const TIMESEPARATOR = '(?:' + WS2 + '?' + '(:|.)' + WS2 + '?)';
const TIMEVALUE =
  '(?:' +
  DIGIT +
  '+' +
  AMPM +
  '|' +
  DIGIT +
  '+' +
  TIMESEPARATOR +
  DIGIT +
  '+' +
  '(?:' +
  TIMESEPARATOR +
  DIGIT +
  '+)?' +
  AMPM +
  '?)';
const ENGLISHMONTHNAME =
  '(?:J A N U A R Y | F E B R U A R Y | M A R C H | A P R I L | M A Y | J U N E  | A U G U S T | S E P T E M B E R | O C T O B E R | N O V E M B E R | D E C E M B E R)'.replace(
    /\s/g,
    '',
  );
const ENGLISHMONTHABBREVIATION =
  '(?:J A N | F E B | M A R | A P R | J U N | J U L | A U G | S E P |  O C T | N O V | D E C)'.replace(
    /\s/g,
    '',
  );
const MONTHNAME = `(?:${ENGLISHMONTHABBREVIATION}|${ENGLISHMONTHNAME})`;
const DATESEPARATOR = '(?:' + WS2 + '?' + '[\\/,-]?' + WS2 + '?)';
const DATEVALUEPART = '(?:' + DIGIT + '+|' + MONTHNAME + ')';
const DATEVALUE =
  '(?:' +
  DATEVALUEPART +
  DATESEPARATOR +
  DATEVALUEPART +
  '(?:' +
  DATESEPARATOR +
  DATEVALUEPART +
  ')?)';
const DATEORTIME =
  '(?:' +
  DATEVALUE +
  WS2 +
  '?' +
  TIMEVALUE +
  '|' +
  DATEVALUE +
  '|' +
  TIMEVALUE +
  ')';
const DATELITERAL = new RegExp('#' + DATEORTIME + '#', 'i');

module.exports = {
  productions: n.makeProductions([
    [
      n.progam,
      n.endOfLineZeroOrMore,
      n.moduleAttributesOptional,
      n.endOfLineZeroOrMore,
      n.moduleDeclarationsOptional,
      n.endOfLineZeroOrMore,
      n.moduleBodyOptional,
      n.endOfLineZeroOrMore,
      n.$EOF,
    ],
    [
      n.endOfLine,
      n.NEWLINE,
      n.alternationMark,
      n.COMMENT,
      n.alternationMark,
      n.REMCOMMENT,
    ],
    [
      n.endOfStatement,
      n.groupStartMark,
      n.endOfLine,
      n.alternationMark,
      n.COLON,
      n.groupEndOneOrMoreMark,
    ],
    [
      n.moduleAttributes,
      n.groupStartMark,
      n.attributeStmt,
      n.endOfLineOneOrMore,
      n.groupEndOneOrMoreMark,
    ],
    [
      n.attributeStmt,
      n.ATTRIBUTE,
      n.implicitCallStmt_InStmt,
      n.EQ,
      n.literal,
      n.groupStartMark,
      ',',
      n.literal,
      n.groupEndZeroOrMoreMark,
    ],

    [
      n.moduleDeclarations,
      n.moduleDeclarationsElement,
      n.groupStartMark,
      n.endOfLineOneOrMore,
      n.moduleDeclarationsElement,
      n.groupEndZeroOrMoreMark,
      n.endOfLineZeroOrMore,
    ],

    [
      n.moduleDeclarationsElement,
      n.COMMENT,
      n.alternationMark,
      n.variableStmt,
      n.alternationMark,
      n.moduleOption,
    ],

    [
      n.moduleOption,
      n.OPTION_BASE,
      n.INTEGERLITERAL,
      n.alternationMark,
      n.OPTION_COMPARE,
      n.IDENTIFIER,
      n.alternationMark,
      n.OPTION_EXPLICIT,
      n.alternationMark,
      n.OPTION_PRIVATE_MODULE,
    ],

    [
      n.moduleBody,
      n.moduleBodyElement,
      n.groupStartMark,
      n.endOfLineOneOrMore,
      n.moduleBodyElement,
      n.groupEndZeroOrMoreMark,
      n.endOfLineZeroOrMore,
    ],

    [
      n.moduleBodyElement,
      n.functionStmt,
      n.alternationMark,
      n.propertyGetStmt,
      n.alternationMark,
      n.propertySetStmt,
      n.alternationMark,
      n.propertyLetStmt,
      n.alternationMark,
      n.subStmt,
    ],

    [
      n.visibility,
      n.PRIVATE,
      n.alternationMark,
      n.PUBLIC,
      n.alternationMark,
      n.FRIEND,
      n.alternationMark,
      n.GLOBAL,
    ],

    [
      n.subStmt,
      n.visibilityOptional,
      n.STATICOptional,
      n.SUB,
      n.certainIdentifier,
      n.argListOptional,
      n.endOfStatement,
      n.blockOptional,
      n.END_SUB,
    ],

    [
      n.propertyGetStmt,
      n.visibilityOptional,
      n.STATICOptional,
      n.PROPERTY_GET,
      n.certainIdentifier,
      n.typeHintOptional,
      n.argListOptional,
      n.asTypeClauseOptional,
      n.endOfStatement,
      n.blockOptional,
      n.END_PROPERTY,
    ],

    [
      n.propertySetStmt,
      n.visibilityOptional,
      n.STATICOptional,
      n.PROPERTY_SET,
      n.certainIdentifier,
      n.argListOptional,
      n.endOfStatement,
      n.blockOptional,
      n.END_PROPERTY,
    ],

    [
      n.propertyLetStmt,
      n.visibilityOptional,
      n.STATICOptional,
      n.PROPERTY_LET,
      n.certainIdentifier,
      n.argListOptional,
      n.endOfStatement,
      n.blockOptional,
      n.END_PROPERTY,
    ],

    [
      n.functionStmt,
      n.visibilityOptional,
      n.STATICOptional,
      n.FUNCTION,
      n.certainIdentifier,
      n.typeHintOptional,
      n.argListOptional,
      n.asTypeClauseOptional,
      n.endOfStatement,
      n.blockOptional,
      n.END_FUNCTION,
    ],

    [
      n.block,
      n.blockStmt,
      n.groupStartMark,
      n.endOfStatement,
      n.blockStmt,
      n.groupEndZeroOrMoreMark,
      n.endOfStatement,
    ],

    [
      n.blockStmt,
      n.lineLabel,
      n.blockStmtOptional,
      n.alternationMark,
      n.attributeStmt,
      n.alternationMark,
      n.goToStmt,
      n.alternationMark,
      n.resumeStmt,
      n.alternationMark,
      n.ifThenElseStmt,
      n.alternationMark,
      n.selectCaseStmt,
      n.alternationMark,
      n.forNextStmt,
      n.alternationMark,
      n.forEachStmt,
      n.alternationMark,
      n.doLoopStmt,
      n.alternationMark,
      n.whileWendStmt,
      n.alternationMark,
      n.onErrorStmt,
      n.alternationMark,
      n.withStmt,
      n.alternationMark,
      n.eraseStmt,
      n.alternationMark,
      n.exitStmt,
      n.alternationMark,
      n.explicitCallStmt,
      n.alternationMark,
      n.setStmt,
      n.alternationMark,
      n.redimStmt,
      n.alternationMark,
      n.letStmt,
      n.alternationMark,
      n.variableStmt,
      n.alternationMark,
      n.implicitCallStmt_InBlock,
    ],

    [n.resumeStmt, n.RESUME, n.ambiguousIdentifier],

    [n.whileWendStmt, n.WHILE, n.valueStmt, n.endOfStatement, n.block, n.WEND],

    [n.doLoopStmt, n.DO, n.endOfStatement, n.block, n.LOOP],

    [
      n.doLoopStmt,
      n.DO,
      n.groupStartMark,
      n.WHILE,
      n.alternationMark,
      n.UNTIL,
      n.groupEndMark,
      n.valueStmt,
      n.endOfStatement,
      n.block,
      n.LOOP,
    ],

    [
      n.doLoopStmt,
      n.DO,
      n.endOfStatement,
      n.block,
      n.LOOP,
      n.groupStartMark,
      n.WHILE,
      n.alternationMark,
      n.UNTIL,
      n.groupEndMark,
      n.valueStmt,
    ],

    [
      n.forNextStmt,
      n.FOR,
      n.certainIdentifier,
      n.typeHintOptional,
      n.asTypeClauseOptional,
      n.EQ,
      n.valueStmt,
      n.TO,
      n.valueStmt,
      n.groupStartMark,
      n.STEP,
      n.valueStmt,
      n.groupEndOptionalMark,
      n.endOfStatement,
      n.blockOptional,
      n.NEXT,
      n.ambiguousIdentifierOptional,
    ],

    [
      n.forEachStmt,
      n.FOR,
      n.EACH,
      n.certainIdentifier,
      n.typeHintOptional,
      n.IN,
      n.valueStmt,
      n.endOfStatement,
      n.blockOptional,
      n.NEXT,
      n.ambiguousIdentifierOptional,
    ],

    [
      n.selectCaseStmt,
      n.SELECT,
      n.CASE,
      n.valueStmt,
      n.endOfStatement,
      n.sC_CaseZeroOrMore,
      n.END_SELECT,
    ],

    {
      symbol: n.sC_Selection,
      rhs: [n.IS, n.comparisonOperator, n.valueStmt],
      label: 'caseCondIs',
    },
    {
      symbol: n.sC_Selection,
      rhs: [n.valueStmt, n.TO, n.valueStmt],
      label: 'caseCondTo',
    },
    {
      symbol: n.sC_Selection,
      rhs: [n.valueStmt],
      label: 'caseCondValue',
    },
    [n.sC_Case, n.CASE, n.sC_Cond, n.endOfStatement, n.blockOptional],
    {
      symbol: n.sC_Cond,
      rhs: [n.ELSE],
      label: 'caseCondElse',
    },
    {
      symbol: n.sC_Cond,
      rhs: [
        n.sC_Selection,
        n.groupStartMark,
        ',',
        n.sC_Selection,
        n.groupEndZeroOrMoreMark,
      ],
      label: 'caseCondSelection',
    },
    [
      n.comparisonOperator,
      n.LT,
      n.alternationMark,
      n.LEQ,
      n.alternationMark,
      n.GT,
      n.alternationMark,
      n.GEQ,
      n.alternationMark,
      n.EQ,
      n.alternationMark,
      n.NEQ,
      n.alternationMark,
      n.IS,
      n.alternationMark,
    ],
    {
      symbol: n.ifThenElseStmt,
      rhs: [
        n.IF,
        n.valueStmt,
        n.THEN,
        n.blockStmt,
        n.groupStartMark,
        n.ELSE,
        n.blockStmt,
        n.groupEndOptionalMark,
      ],
      label: 'InlineIfThenElse',
    },
    {
      symbol: n.ifThenElseStmt,
      rhs: [
        n.ifBlockStmt,
        n.ifElseIfBlockStmtZeroOrMore,
        n.ifElseBlockStmtOptional,
        n.END_IF,
      ],
      label: 'BlockIfThenElse',
    },
    [
      n.ifBlockStmt,
      n.IF,
      n.valueStmt,
      n.THEN,
      n.endOfStatement,
      n.blockOptional,
    ],
    [
      n.ifElseIfBlockStmt,
      n.ELSEIF,
      n.valueStmt,
      n.THEN,
      n.endOfStatement,
      n.blockOptional,
    ],

    [n.ifElseBlockStmt, n.ELSE, n.endOfStatement, n.blockOptional],

    [
      n.onErrorStmt,
      n.ON_ERROR,
      n.groupStartMark,
      n.GOTO,
      n.groupStartMark,
      n.certainIdentifier,
      n.alternationMark,
      n.MINUS,
      n.INTEGERLITERAL,
      n.groupEndMark,
      n.alternationMark,
      n.RESUME,
      n.NEXT,
      n.groupEndMark,
    ],

    [n.lineLabel, n.certainIdentifier, n.COLON],

    [n.goToStmt, n.GOTO, n.ambiguousIdentifier],

    [
      n.eraseStmt,
      n.ERASE,
      n.valueStmt,
      n.groupStartMark,
      ',',
      n.valueStmt,
      n.groupEndZeroOrMoreMark,
    ],

    [
      n.redimStmt,
      n.REDIM,
      n.PRESERVEOptional,
      n.redimSubStmt,
      n.groupStartMark,
      ',',
      n.redimSubStmt,
      n.groupEndZeroOrMoreMark,
    ],

    [
      n.redimSubStmt,
      n.implicitCallStmt_InStmt,
      n.LPAREN,
      n.subscripts,
      n.RPAREN,
      n.asTypeClauseOptional,
    ],

    [
      n.exitStmt,
      n.EXIT_DO,
      n.alternationMark,
      n.EXIT_FOR,
      n.alternationMark,
      n.EXIT_FUNCTION,
      n.alternationMark,
      n.EXIT_PROPERTY,
      n.alternationMark,
      n.EXIT_SUB,
      n.alternationMark,
      n.END,
    ],
    [
      n.letStmt,
      n.LETOptional,
      n.implicitCallStmt_InStmt,
      n.groupStartMark,
      n.EQ,
      n.alternationMark,
      n.PLUS_EQ,
      n.alternationMark,
      n.MINUS_EQ,
      n.groupEndMark,
      n.valueStmt,
    ],

    [n.setStmt, n.SET, n.implicitCallStmt_InStmt, n.EQ, n.valueStmt],

    [
      n.explicitCallStmt,
      n.eCS_MemberProcedureCall,
      n.alternationMark,
      n.eCS_ProcedureCall,
    ],

    [
      n.eCS_MemberProcedureCall,
      n.CALL,
      n.groupStartMark,
      n.implicitCallStmt_InStmtOptional,
      '.',
      n.alternationMark,
      n.SPACE_DOT,
      n.groupEndMark,
      n.ambiguousIdentifier,
      n.typeHintOptional,
      n.groupStartMark,
      n.LPAREN,
      n.argsCall,
      n.RPAREN,
      n.groupEndOptionalMark,
      n.groupStartMark,
      n.LPAREN,
      n.indexes,
      n.RPAREN,
      n.groupEndZeroOrMoreMark,
    ],

    [
      n.eCS_ProcedureCall,
      n.CALL,
      n.certainIdentifier,
      n.typeHintOptional,
      n.groupStartMark,
      n.LPAREN,
      n.argsCall,
      n.RPAREN,
      n.groupEndOptionalMark,
      n.groupStartMark,
      n.LPAREN,
      n.indexes,
      n.RPAREN,
      n.groupEndZeroOrMoreMark,
    ],

    [
      n.implicitCallStmt_InBlock,
      n.iCS_B_MemberProcedureCall,
      n.alternationMark,
      n.iCS_B_ProcedureCall,
    ],

    [
      n.iCS_B_MemberProcedureCall,
      n.groupStartMark,
      n.SPACE_DOT,
      n.alternationMark,
      n.implicitCallStmt_InStmtOptional,
      '.',
      n.groupEndMark,
      n.ambiguousIdentifier,
      n.typeHintOptional,
      n.argsCallOptional,
      n.groupStartMark,
      n.LPAREN,
      n.indexes,
      n.RPAREN,
      n.groupEndZeroOrMoreMark,
    ],
    [
      n.iCS_B_ProcedureCall,
      n.certainIdentifier,
      n.argsCallOptional,
      n.groupStartMark,
      n.LPAREN,
      n.indexes,
      n.RPAREN,
      n.groupEndOptionalMark,
    ],

    [
      n.argsCall,
      ',*',
      n.argCall,
      n.groupStartMark,
      ',',
      n.argCallOptional,
      n.groupEndZeroOrMoreMark,
    ],

    [n.argCall, n.valueStmt],

    [
      n.variableStmt,
      n.groupStartMark,
      n.DIM,
      n.alternationMark,
      n.STATIC,
      n.alternationMark,
      n.visibility,
      n.groupEndMark,
      n.WITHEVENTSOptional,
      n.variableListStmt,
    ],

    [
      n.withStmt,
      n.WITH,
      n.groupStartMark,
      n.implicitCallStmt_InStmt,
      n.alternationMark,
      n.NEW,
      n.type_,
      n.groupEndMark,
      n.endOfStatement,
      n.blockOptional,
      n.END_WITH,
    ],

    [
      n.variableListStmt,
      n.variableSubStmt,
      n.groupStartMark,
      ',',
      n.variableSubStmt,
      n.groupEndZeroOrMoreMark,
    ],

    [
      n.variableSubStmt,
      n.certainIdentifier,
      n.groupStartMark,
      n.LPAREN,
      n.subscriptsOptional,
      n.RPAREN,
      n.groupEndOptionalMark,
      n.typeHintOptional,
      n.asTypeClauseOptional,
    ],

    [
      n.indexes,
      n.valueStmt,
      n.groupStartMark,
      ',',
      n.valueStmt,
      n.groupEndZeroOrMoreMark,
    ],

    [
      n.subscript_,
      n.groupStartMark,
      n.valueStmt,
      n.TO,
      n.groupEndOptionalMark,
      n.valueStmt,
    ],

    [
      n.subscripts,
      n.subscript_,
      n.groupStartMark,
      ',',
      n.subscript_,
      n.groupEndZeroOrMoreMark,
    ],

    [
      n.subscript_,
      n.groupStartMark,
      n.valueStmt,
      n.TO,
      n.groupEndOptionalMark,
      n.valueStmt,
    ],

    [
      n.argList,
      n.LPAREN,
      n.groupStartMark,
      n.arg,
      n.groupStartMark,
      ',',
      n.arg,
      n.groupEndZeroOrMoreMark,
      n.groupEndOptionalMark,
      n.RPAREN,
    ],

    [
      n.valueStmt,
      n.literal,
      n.alternationMark,
      n.implicitCallStmt_InStmt,
      n.alternationMark,
      n.certainIdentifier,
      n.ASSIGN,
      n.valueStmt,
      n.alternationMark,
      n.NEW,
      n.valueStmt,
    ],
    {
      symbol: n.valueStmt,
      rhs: [n.LPAREN, n.valueStmt, n.RPAREN],
      label: 'AtomExpression',
    },
    ...binaryOps.map((o) => ({
      symbol: n.valueStmt,
      rhs: [n.valueStmt, o, n.valueStmt],
      label: 'BinaryExpression',
    })),
    ...[n.MINUS, n.PLUS].map((o) => ({
      symbol: n.valueStmt,
      rhs: [o, n.valueStmt],
      label: 'PrefixExpression',
      precedence: n.PREFIX,
    })),
    {
      symbol: n.valueStmt,
      rhs: [n.NOT, n.valueStmt],
      label: 'PrefixExpression',
    },
    [
      n.implicitCallStmt_InStmt,
      n.iCS_S_MembersCall,
      n.alternationMark,
      n.iCS_S_VariableOrProcedureCall,
      n.alternationMark,
      n.iCS_S_ProcedureOrArrayCall,
    ],

    [
      n.iCS_S_MembersCall,
      n.groupStartMark,
      n.groupStartMark,
      n.iCS_S_VariableOrProcedureCall,
      n.alternationMark,
      n.iCS_S_ProcedureOrArrayCall,
      n.groupEndOptionalMark,
      n.iCS_S_MemberCall,
      n.alternationMark,
      n.iCS_S_SpaceMemberCall,
      n.groupEndMark,
      n.iCS_S_MemberCallZeroOrMore,
      n.groupStartMark,
      n.LPAREN,
      n.indexes,
      n.RPAREN,
      n.groupEndZeroOrMoreMark,
    ],
    [
      n.iCS_S_MemberCall,
      '.',
      n.groupStartMark,
      n.mCS_S_VariableOrProcedureCall,
      n.alternationMark,
      n.mCS_S_ProcedureOrArrayCall,
      n.groupEndMark,
    ],
    [
      n.iCS_S_SpaceMemberCall,
      n.SPACE_DOT,
      n.groupStartMark,
      n.mCS_S_VariableOrProcedureCall,
      n.alternationMark,
      n.mCS_S_ProcedureOrArrayCall,
      n.groupEndMark,
    ],

    ...[n.mCS_S_ProcedureOrArrayCall, n.iCS_S_ProcedureOrArrayCall].map((s) => [
      s,
      s === n.mCS_S_ProcedureOrArrayCall
        ? n.ambiguousIdentifier
        : n.certainIdentifier,
      n.typeHintOptional,
      n.LPAREN,
      n.argsCallOptional,
      n.RPAREN,
      n.groupStartMark,
      n.LPAREN,
      n.indexes,
      n.RPAREN,
      n.groupEndZeroOrMoreMark,
    ]),

    ...[n.iCS_S_VariableOrProcedureCall, n.mCS_S_VariableOrProcedureCall].map(
      (s) => [
        s,
        s === n.mCS_S_VariableOrProcedureCall
          ? n.ambiguousIdentifier
          : n.certainIdentifier,
        n.typeHintOptional,
        n.groupStartMark,
        n.LPAREN,
        n.indexes,
        n.RPAREN,
        n.groupEndZeroOrMoreMark,
      ],
    ),

    [
      n.literal,
      n.DOUBLELITERAL,
      n.alternationMark,
      n.INTEGERLITERAL,
      n.alternationMark,
      n.STRINGLITERAL,
      n.alternationMark,
      n.NOTHING,
      n.alternationMark,
      n.NULL,
      n.alternationMark,
      n.TRUE,
      n.alternationMark,
      n.FALSE,
      n.alternationMark,
      n.DATELITERAL,
    ],

    [
      n.typeHint,
      '&',
      n.alternationMark,
      '%',
      n.alternationMark,
      '#',
      n.alternationMark,
      '!',
      n.alternationMark,
      '@',
      n.alternationMark,
      '$',
    ],

    [
      n.arg,
      n.OPTIONALOptional,
      n.groupStartMark,
      n.BYVAL,
      n.alternationMark,
      n.BYREF,
      n.groupEndOptionalMark,
      n.PARAMARRAYOptional,
      n.certainIdentifier,
      n.typeHintOptional,
      n.groupStartMark,
      n.LPAREN,
      n.RPAREN,
      n.groupEndOptionalMark,
      n.asTypeClauseOptional,
      n.argDefaultValueOptional,
    ],

    [n.argDefaultValue, n.EQ, n.valueStmt],

    [n.asTypeClause, n.AS, n.NEWOptional, n.type_],

    [
      n.type_,
      n.groupStartMark,
      n.baseType,
      n.alternationMark,
      n.complexType,
      n.groupEndMark,
      n.groupStartMark,
      n.LPAREN,
      n.RPAREN,
      n.groupEndOptionalMark,
    ],

    [
      n.complexType,
      n.certainIdentifier,
      n.groupStartMark,
      '.',
      n.ambiguousIdentifier,
      n.groupEndZeroOrMoreMark,
    ],

    [
      n.baseType,
      n.BOOLEAN,
      n.alternationMark,
      n.BYTE,
      n.alternationMark,
      n.DOUBLE,
      n.alternationMark,
      n.INTEGER,
      n.alternationMark,
      n.LONG,
      n.alternationMark,
      n.SINGLE,
      n.alternationMark,
      n.VARIANT,
      n.alternationMark,
      n.STRING,
      n.alternationMark,
      n.DATE,
    ],

    ...n.KEYWORDS.map((keyword) =>
      isSingleKeyword(keyword)
        ? {
            symbol: n.ambiguousIdentifier,
            rhs: [keyword],
          }
        : null,
    ).filter((n) => !!n),

    [n.certainIdentifier, n.IDENTIFIER],
    [n.ambiguousIdentifier, n.IDENTIFIER],
  ]),

  operators,

  lexer: {
    rules: n.makeLexerRules([
      ...generateLexerRulesByKeywords(n.KEYWORDS),

      [n.DATELITERAL, DATELITERAL],
      [n.DOUBLELITERAL, /[0-9]*\.[0-9]+(E[0-9]+)?/],

      {
        token: n.SPACE_DOT,
        regexp: / +\./,
      },

      ...generateLexerRulesByMap({
        ASSIGN: ':=',
        NEQ: '<>',
        LEQ: '<=',
        GEQ: '>=',
        MINUS_EQ: '-=',
        PLUS_EQ: '+=',
        COLON: ':',
        AMPERSAND: '&',
        DIV: '/',
        IDIV: '\\',
        EQ: '=',

        GT: '>',

        LPAREN: '(',

        LT: '<',

        MINUS: '-',
        MULT: '*',

        PLUS: '+',
        POW: '^',
        RPAREN: ')',
        L_SQUARE_BRACKET: '[',
        R_SQUARE_BRACKET: ']',
      }),

      [n.NEWLINE, new RegExp(NEWLINE)],
      [n.REMCOMMENT, new RegExp(REMCOMMENT)],
      [n.COMMENT, new RegExp(COMMENT)],

      {
        token: 'HIDDEN',
        channel: 'HIDDEN',
        regexp: HIDDEN_REG,
      },

      [n.STRINGLITERAL, /"(""|[^"\r\n])*"/],

      [n.INTEGERLITERAL, /[0-9]+/],

      [
        n.IDENTIFIER,
        /\w[\w\d]*/,
        function action() {
          this.text = (this.text || '').toLowerCase();
        },
      ],
    ]),
  },
};
