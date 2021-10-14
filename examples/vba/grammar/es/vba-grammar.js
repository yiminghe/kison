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
    const regexp = new RegExp(RegexEscape(reg), 'i');
    rules.push([token, regexp]);
  }
  return rules;
}

module.exports = {
  productions: n.makeProductions([
    [n.progam, n.moduleBodyOptional],

    [n.moduleBody, n.moduleBodyElementOneOrMore],

    [
      n.moduleBodyElement,
      // 'functionStmt',n.alternationMark,
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
      n.IDENTIFIER,
      n.argListOptional,
      n.blockOptional,
      n.END_SUB,
    ],

    [n.block, n.blockStmtOneOrMore],

    [
      n.blockStmt,
      n.variableStmt,
      n.alternationMark,
      n.implicitCallStmt_InBlock,
    ],

    [n.implicitCallStmt_InBlock, n.iCS_B_ProcedureCall],

    [
      n.iCS_B_ProcedureCall,
      n.IDENTIFIER,
      n.argsCallOptional,
      n.groupStartMark,
      n.LPAREN,
      n.subscripts,
      n.RPAREN,
      n.groupEndZeroOrMoreMark,
    ],

    [
      n.argsCall,
      n.groupStartMark,
      n.argCallOptional,
      n.groupStartMark,
      ',',
      n.alternationMark,
      ';',
      n.groupEndMark,
      n.groupEndZeroOrMoreMark,
      n.argCall,
      n.groupStartMark,
      n.groupStartMark,
      ',',
      n.alternationMark,
      ';',
      n.groupEndMark,
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

    [n.dictionaryCallStmt, '!', n.IDENTIFIER, n.typeHintOptional],

    [
      n.variableStmt,
      n.groupStartMark,
      n.DIM,
      n.STATIC,
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
      n.IDENTIFIER,
      n.groupStartMark,
      n.LPAREN,
      n.subscriptsOptional,
      n.RPAREN,
      n.groupEndOptionalMark,
      n.typeHintOptional,
      n.asTypeClauseOptional,
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

    [n.valueStmt, n.literal],

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
      n.IDENTIFIER,
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
      n.baseType,
      n.groupStartMark,
      n.LPAREN,
      n.RPAREN,
      n.groupEndOptionalMark,
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
      n.IDENTIFIER,
    ],
  ]),
  lexer: {
    rules: n.makeLexerRules([
      ...generateLexerRulesByKeywords(n.KEYWORDS),

      ...generateLexerRulesByMap({
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

      // ['$NEW_LINE', /[\r\n]+/,],

      ['$HIDDEN', /\s+/],

      ['STRINGLITERAL', /"[^"\r\n]*"/],

      ['INTEGERLITERAL', /(\+|-)?[0-9]+/],

      ['IDENTIFIER', /\w[\w\d]*/],
    ]),
  },
};
