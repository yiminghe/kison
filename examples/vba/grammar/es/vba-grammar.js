// @ts-check

// http://msdn.microsoft.com/en-us/library/aa338033%28v=vs.60%29.aspx
import * as n from './names';

function RegexEscape(input) {
  return input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

const skipAstNode = true;

function generateLexerRulesByMap(map) {
  const rules = [];
  for (const token of Object.keys(map)) {
    const regexp = new RegExp(RegexEscape(map[token]));
    rules.push({
      token,
      regexp,
    });
  }
  return rules;
}

function generateLexerRulesByKeywords(arr) {
  const rules = [];
  for (const token of arr) {
    const reg = token.replace(/^macro_/i, '#').replace(/_/g, ' ');
    const regexp = new RegExp(RegexEscape(reg), 'i');
    rules.push({
      token,
      regexp,
    });
  }
  return rules;
}

module.exports = {
  productions: [
    {
      symbol: n.progam,
      rhs: [n.moduleBodyOptional],
    },
    {
      symbol: n.moduleBody,
      rhs: [n.moduleBodyElementOneOrMore],
    },
    {
      symbol: n.moduleBodyElement,
      rhs: [
        // 'functionStmt',n.alternationMark,
        n.subStmt,
      ],
    },
    {
      symbol: n.visibility,
      rhs: [
        n.PRIVATE,
        n.alternationMark,
        n.PUBLIC,
        n.alternationMark,
        n.FRIEND,
        n.alternationMark,
        n.GLOBAL,
      ],
    },
    {
      symbol: n.subStmt,
      rhs: [
        n.visibilityOptional,
        n.STATICOptional,
        n.SUB,
        n.IDENTIFIER,
        n.argListOptional,
        n.blockOptional,
        n.END_SUB,
      ],
    },
    {
      symbol: n.block,
      rhs: [n.blockStmtOneOrMore],
    },
    {
      symbol: n.blockStmt,
      rhs: [n.variableStmt, n.alternationMark, n.implicitCallStmt_InBlock],
    },
    {
      symbol: n.implicitCallStmt_InBlock,
      rhs: [n.iCS_B_ProcedureCall],
    },
    {
      symbol: n.iCS_B_ProcedureCall,
      rhs: [
        n.IDENTIFIER,
        n.argsCallOptional,
        n.groupStartMark,
        n.LPAREN,
        n.subscripts,
        n.RPAREN,
        n.groupEndZeroOrMoreMark,
      ],
    },
    {
      symbol: n.argsCall,
      rhs: [
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
    },
    {
      symbol: n.argCall,
      rhs: [
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
    },
    {
      symbol: n.dictionaryCallStmt,
      rhs: ['!', n.IDENTIFIER, n.typeHintOptional],
    },
    {
      symbol: n.variableStmt,
      rhs: [
        n.groupStartMark,
        n.DIM,
        n.STATIC,
        n.visibility,
        n.groupEndMark,
        n.WITHEVENTSOptional,
        n.variableListStmt,
      ],
    },

    {
      symbol: n.variableListStmt,
      rhs: [
        n.variableSubStmt,
        n.groupStartMark,
        ',',
        n.variableSubStmt,
        n.groupEndZeroOrMoreMark,
      ],
    },

    {
      symbol: n.variableSubStmt,
      rhs: [
        n.IDENTIFIER,
        n.groupStartMark,
        n.LPAREN,
        n.subscriptsOptional,
        n.RPAREN,
        n.groupEndOptionalMark,
        n.typeHintOptional,
        n.asTypeClauseOptional,
      ],
    },

    {
      symbol: n.subscripts,
      rhs: [
        n.subscript_,
        n.groupStartMark,
        ',',
        n.subscript_,
        n.groupEndZeroOrMoreMark,
      ],
    },

    {
      symbol: n.subscript_,
      rhs: [
        n.groupStartMark,
        n.valueStmt,
        n.TO,
        n.groupEndOptionalMark,
        n.valueStmt,
      ],
    },

    {
      symbol: n.argList,
      rhs: [
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
    },
    {
      symbol: n.valueStmt,
      rhs: [n.literal],
    },
    {
      symbol: n.literal,
      rhs: [n.INTEGERLITERAL, n.alternationMark, n.STRINGLITERAL],
    },
    {
      symbol: n.typeHint,
      rhs: [
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
    },

    {
      symbol: '_paren',
      skipAstNode,
      rhs: [n.LPAREN, n.RPAREN],
    },
    {
      symbol: n.arg,
      rhs: [
        n.OPTIONALOptional,
        n.groupStartMark,
        n.BYVAL,
        n.alternationMark,
        n.BYREF,
        n.groupEndOptionalMark,
        n.PARAMARRAYOptional,
        n.IDENTIFIER,
        n.typeHintOptional,
        '_paren?',
        n.asTypeClauseOptional,
        n.argDefaultValueOptional,
      ],
    },
    {
      symbol: n.argDefaultValue,
      rhs: [n.EQ, n.valueStmt],
    },
    {
      symbol: n.asTypeClause,
      rhs: [n.AS, n.NEWOptional, n.type_, n.fieldLengthOptional],
    },
    {
      symbol: n.type_,
      rhs: [n.baseType, '_paren?'],
    },

    {
      symbol: n.baseType,
      rhs: [
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
        [
          n.STRING,
          n.groupStartMark,
          n.MULT,
          n.valueStmt,
          n.groupEndOptionalMark,
        ],
      ],
    },
    {
      symbol: n.fieldLength,
      rhs: [n.MULT, n.INTEGERLITERAL, n.alternationMark, n.MULT, n.IDENTIFIER],
    },
  ],
  lexer: {
    rules: [
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
      // {
      //   token: "NEW_LINE",
      //   regexp: /[\r\n]+/,
      // },
      {
        token: '$HIDDEN',
        regexp: /\s+/,
      },
      {
        token: 'STRINGLITERAL',
        regexp: /"[^"\r\n]*"/,
      },
      {
        token: 'INTEGERLITERAL',
        regexp: /(\+|-)?[0-9]+/,
      },
      {
        token: 'IDENTIFIER',
        regexp: /\w[\w\d]*/,
      },
    ],
  },
};
