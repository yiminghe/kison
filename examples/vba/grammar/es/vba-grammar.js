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

function generateLexerRulesByKeywords(arr) {
  const rules = [];
  for (const token of arr) {
    const reg = token.replace(/^macro_/i, '#').replace(/_/g, ' ');
    const regexp = new RegExp(RegexEscape(reg + '\\b'), 'i');
    rules.push([token, regexp]);
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

module.exports = {
  productions: n.makeProductions([
    [
      n.progam,
      n.moduleDeclarationsOptional,
      n.endOfLineZeroOrMore,
      n.moduleBodyOptional,
      n.endOfLineZeroOrMore,
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

    [n.moduleDeclarationsElement, n.variableStmt],

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
      n.ambiguousIdentifier,
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
      n.ambiguousIdentifier,
      n.typeHintOptional,
      n.LPAREN,
      n.RPAREN,
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
      n.ambiguousIdentifier,
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
      n.ambiguousIdentifier,
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
      n.ambiguousIdentifier,
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
      n.implicitCallStmt_InStmtOptional,
      '.',
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
      n.groupEndOptionalMark,
    ],

    [
      n.eCS_ProcedureCall,
      // CALL WS ambiguousIdentifier typeHint? (WS? LPAREN WS? argsCall WS? RPAREN)? (WS? LPAREN indexes RPAREN)*;
      n.CALL,
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
      n.groupEndOptionalMark,
    ],

    [
      n.implicitCallStmt_InBlock,
      n.iCS_B_MemberProcedureCall,
      n.alternationMark,
      n.iCS_B_ProcedureCall,
    ],

    [
      n.iCS_B_MemberProcedureCall,
      n.implicitCallStmt_InStmt,
      '.',
      n.ambiguousIdentifier,
      n.typeHintOptional,
      n.argsCallOptional,
      n.dictionaryCallStmtOptional,
      n.groupStartMark,
      n.LPAREN,
      n.indexes,
      n.RPAREN,
      n.groupEndOptionalMark,
    ],
    [
      n.iCS_B_ProcedureCall,
      n.ambiguousIdentifier,
      n.argsCallOptional,
      n.groupStartMark,
      n.LPAREN,
      n.subscripts,
      n.RPAREN,
      n.groupEndOptionalMark,
    ],

    [
      n.argsCall,
      n.argCallOptional,
      n.groupStartMark,
      ',',
      n.argCallOptional,
      n.groupEndZeroOrMoreMark,
    ],

    [
      n.argCall,
      n.LPARENOptional,
      n.groupStartMark,
      n.BYREF,
      n.alternationMark,
      n.BYVAL,
      n.alternationMark,
      n.PARAMARRAY,
      n.groupEndOptionalMark,
      n.RPARENOptional,
      n.valueStmt,
    ],

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
      n.variableListStmt,
      n.variableSubStmt,
      n.groupStartMark,
      ',',
      n.variableSubStmt,
      n.groupEndZeroOrMoreMark,
    ],

    [
      n.variableSubStmt,
      n.ambiguousIdentifier,
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

    [n.valueStmt, n.literal, n.alternationMark, n.implicitCallStmt_InStmt],

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
      n.iCS_S_VariableOrProcedureCall,
      n.alternationMark,
      n.iCS_S_ProcedureOrArrayCall,
      n.groupEndOptionalMark,
      n.iCS_S_MemberCallOneOrMore,
      n.dictionaryCallStmtOptional,
      n.groupStartMark,
      n.LPAREN,
      n.indexes,
      n.RPAREN,
      n.groupEndOptionalMark,
    ],
    [
      n.iCS_S_MemberCall,
      n.groupStartMark,
      '.',
      n.alternationMark,
      '!',
      n.groupEndMark,
      n.groupStartMark,
      n.iCS_S_VariableOrProcedureCall,
      n.alternationMark,
      n.iCS_S_ProcedureOrArrayCall,
      n.groupEndMark,
    ],
    [
      n.iCS_S_ProcedureOrArrayCall,
      n.ambiguousIdentifier,
      n.typeHintOptional,
      n.LPAREN,
      n.argsCallOptional,
      n.RPAREN,
      n.dictionaryCallStmtOptional,
      n.groupStartMark,
      n.LPAREN,
      n.indexes,
      n.RPAREN,
      n.groupEndOptionalMark,
    ],

    [
      n.iCS_S_VariableOrProcedureCall,
      n.ambiguousIdentifier,
      n.typeHintOptional,
      n.dictionaryCallStmtOptional,
      n.groupStartMark,
      n.LPAREN,
      n.indexes,
      n.RPAREN,
      n.groupEndOptionalMark,
    ],

    [n.dictionaryCallStmt, '!', n.ambiguousIdentifier, n.typeHintOptional],

    [n.literal, n.INTEGERLITERAL, n.alternationMark, n.STRINGLITERAL],

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
      n.ambiguousIdentifier,
      n.typeHintOptional,
      n.groupStartMark,
      n.LPAREN,
      n.RPAREN,
      n.groupEndOptionalMark,
      n.asTypeClauseOptional,
      n.argDefaultValueOptional,
    ],

    [n.argDefaultValue, n.EQ, n.valueStmt],

    [n.asTypeClause, n.AS, n.NEWOptional, n.type_, n.fieldLengthOptional],

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
      n.ambiguousIdentifier,
      n.groupStartMark,
      n.groupStartMark,
      '.',
      n.alternationMark,
      '!',
      n.groupEndMark,
      n.ambiguousIdentifier,
      n.groupEndZeroOrMoreMark,
    ],

    [
      n.baseType,
      n.BOOLEAN,
      n.alternationMark,
      n.BYTE,
      n.alternationMark,
      n.COLLECTION,
      n.alternationMark,
      n.DATE,
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
      n.groupStartMark,
      n.MULT,
      n.valueStmt,
      n.groupEndOptionalMark,
    ],

    [
      n.fieldLength,
      n.MULT,
      n.INTEGERLITERAL,
      n.alternationMark,
      n.MULT,
      n.ambiguousIdentifier,
    ],

    // ...n.KEYWORDS.map((keyword) => [n.ambiguousIdentifier, keyword]),

    [n.ambiguousIdentifier, n.IDENTIFIER],
  ]),
  lexer: {
    rules: n.makeLexerRules([
      ...generateLexerRulesByKeywords(n.KEYWORDS),

      ...generateLexerRulesByMap({
        COLON: ':',
        AMPERSAND: '&',
        ASSIGN: ':=',
        DIV: '/',
        EQ: '=',
        GEQ: '>=',
        GT: '>',
        LEQ: '<=',
        LPAREN: '(',
        LT: '<',
        MINUS: '-',
        MINUS_EQ: '-=',
        MULT: '*',
        NEQ: '<>',
        PLUS: '+',
        PLUS_EQ: '+=',
        POW: '^',
        RPAREN: ')',
        L_SQUARE_BRACKET: '[',
        R_SQUARE_BRACKET: ']',
      }),

      [n.NEWLINE, new RegExp(NEWLINE)],
      [n.REMCOMMENT, new RegExp(REMCOMMENT)],
      [n.COMMENT, new RegExp(COMMENT)],

      ['$HIDDEN', HIDDEN_REG],

      [n.STRINGLITERAL, /"[^"\r\n]*"/],

      [n.INTEGERLITERAL, /(\+|-)?[0-9]+/],

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
