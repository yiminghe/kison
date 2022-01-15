/// <reference path="../../../../types/index.d.ts" />
// http://msdn.microsoft.com/en-us/library/aa338033%28v=vs.60%29.aspx
import * as n from './names';

function RegexEscape(input: string) {
  return input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function generateLexerRulesByMap(map: any) {
  const rules = [];
  for (const token of Object.keys(map)) {
    const regexp = new RegExp(RegexEscape(map[token]));
    rules.push([token, regexp]);
  }
  return rules;
}

function isSingleKeyword(s: string) {
  return s.indexOf('_') === -1;
}

function generateLexerRulesByKeywords(arr: any[]) {
  const rules = [];
  for (const token of arr) {
    const reg = token.replace(/^macro_/i, '#').replace(/_/g, ' ');
    const regexp = new RegExp(RegexEscape(reg) + '\\b', 'i');
    rules.push([
      token,
      regexp,
      function action(this: any) {
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

const binaryOps: string[] = [];
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

export default (options: Kison.Options) => {
  const nn = n.makeExtendSymbols(options);
  const {
    makeAlternates,
    makeOptionalGroup,
    makeGroup,
    makeOneOrMoreGroup,
    makeZeroOrMoreGroup,
  } = options;
  return {
    productions: n.makeProductions([
      [
        n.progam,
        nn.endOfLineZeroOrMore,
        nn.moduleAttributesOptional,
        nn.endOfLineZeroOrMore,
        nn.moduleDeclarationsOptional,
        nn.endOfLineZeroOrMore,
        nn.moduleBodyOptional,
        nn.endOfLineZeroOrMore,
        n.$EOF,
      ],
      [n.endOfLine, ...makeAlternates(n.NEWLINE, n.COMMENT, n.REMCOMMENT)],

      [
        n.endOfStatement,
        ...makeOneOrMoreGroup(...makeAlternates(n.endOfLine, n.COLON)),
      ],
      [
        n.moduleAttributes,
        ...makeOneOrMoreGroup(n.attributeStmt, nn.endOfLineOneOrMore),
      ],
      [
        n.attributeStmt,
        n.ATTRIBUTE,
        n.implicitCallStmt_InStmt,
        n.EQ,
        n.literal,
        ...makeZeroOrMoreGroup(',', n.literal),
      ],

      [
        n.moduleDeclarations,
        n.moduleDeclarationsElement,
        ...makeZeroOrMoreGroup(
          nn.endOfLineOneOrMore,
          n.moduleDeclarationsElement,
        ),
        nn.endOfLineZeroOrMore,
      ],
      [
        n.moduleDeclarationsElement,

        ...makeAlternates(n.COMMENT, n.variableStmt, n.moduleOption),
      ],
      [
        n.moduleOption,
        ...makeAlternates(
          [n.OPTION_BASE, n.INTEGERLITERAL],
          [n.OPTION_COMPARE, n.IDENTIFIER],
          n.OPTION_EXPLICIT,
          n.OPTION_PRIVATE_MODULE,
        ),
      ],

      [
        n.moduleBody,
        n.moduleBodyElement,
        ...makeZeroOrMoreGroup(nn.endOfLineOneOrMore, n.moduleBodyElement),
        nn.endOfLineZeroOrMore,
      ],
      [
        n.moduleBodyElement,
        ...makeAlternates(
          n.functionStmt,
          n.propertyGetStmt,
          n.propertySetStmt,
          n.propertyLetStmt,
          n.subStmt,
        ),
      ],
      [
        n.visibility,
        ...makeAlternates(n.PRIVATE, n.PUBLIC, n.FRIEND, n.GLOBAL),
      ],
      [
        n.subStmt,
        nn.visibilityOptional,
        nn.STATICOptional,
        n.SUB,
        n.certainIdentifier,
        nn.argListOptional,
        n.endOfStatement,
        nn.blockOptional,
        n.END_SUB,
      ],

      [
        n.propertyGetStmt,
        nn.visibilityOptional,
        nn.STATICOptional,
        n.PROPERTY_GET,
        n.certainIdentifier,
        nn.typeHintOptional,
        nn.argListOptional,
        nn.asTypeClauseOptional,
        n.endOfStatement,
        nn.blockOptional,
        n.END_PROPERTY,
      ],

      [
        n.propertySetStmt,
        nn.visibilityOptional,
        nn.STATICOptional,
        n.PROPERTY_SET,
        n.certainIdentifier,
        nn.argListOptional,
        n.endOfStatement,
        nn.blockOptional,
        n.END_PROPERTY,
      ],

      [
        n.propertyLetStmt,
        nn.visibilityOptional,
        nn.STATICOptional,
        n.PROPERTY_LET,
        n.certainIdentifier,
        nn.argListOptional,
        n.endOfStatement,
        nn.blockOptional,
        n.END_PROPERTY,
      ],

      [
        n.functionStmt,
        nn.visibilityOptional,
        nn.STATICOptional,
        n.FUNCTION,
        n.certainIdentifier,
        nn.typeHintOptional,
        nn.argListOptional,
        nn.asTypeClauseOptional,
        n.endOfStatement,
        nn.blockOptional,
        n.END_FUNCTION,
      ],

      [
        n.block,
        n.blockStmt,
        ...makeZeroOrMoreGroup(n.endOfStatement, n.blockStmt),
        n.endOfStatement,
      ],
      [
        n.blockStmt,
        ...makeAlternates(
          [n.lineLabel, nn.blockStmtOptional],
          n.attributeStmt,
          n.goToStmt,
          n.resumeStmt,
          n.ifThenElseStmt,
          n.selectCaseStmt,
          n.forNextStmt,
          n.forEachStmt,
          n.doLoopStmt,
          n.whileWendStmt,
          n.onErrorStmt,
          n.withStmt,
          n.eraseStmt,
          n.exitStmt,

          n.explicitCallStmt,
          n.setStmt,
          n.redimStmt,
          n.letStmt,
          n.variableStmt,
          n.implicitCallStmt_InBlock,
        ),
      ],

      [n.resumeStmt, n.RESUME, n.ambiguousIdentifier],

      [
        n.whileWendStmt,
        n.WHILE,
        n.valueStmt,
        n.endOfStatement,
        n.block,
        n.WEND,
      ],

      [n.doLoopStmt, n.DO, n.endOfStatement, n.block, n.LOOP],

      [
        n.doLoopStmt,
        n.DO,
        ...makeGroup(...makeAlternates(n.WHILE, n.UNTIL)),
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
        ...makeGroup(...makeAlternates(n.WHILE, n.UNTIL)),
        n.valueStmt,
      ],

      [
        n.forNextStmt,
        n.FOR,
        n.certainIdentifier,
        nn.typeHintOptional,
        nn.asTypeClauseOptional,
        n.EQ,
        n.valueStmt,
        n.TO,
        n.valueStmt,
        ...makeOptionalGroup(n.STEP, n.valueStmt),
        n.endOfStatement,
        nn.blockOptional,
        n.NEXT,
        nn.ambiguousIdentifierOptional,
      ],

      [
        n.forEachStmt,
        n.FOR,
        n.EACH,
        n.certainIdentifier,
        nn.typeHintOptional,
        n.IN,
        n.valueStmt,
        n.endOfStatement,
        nn.blockOptional,
        n.NEXT,
        nn.ambiguousIdentifierOptional,
      ],

      [
        n.selectCaseStmt,
        n.SELECT,
        n.CASE,
        n.valueStmt,
        n.endOfStatement,
        nn.sC_CaseZeroOrMore,
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
      [n.sC_Case, n.CASE, n.sC_Cond, n.endOfStatement, nn.blockOptional],
      {
        symbol: n.sC_Cond,
        rhs: [n.ELSE],
        label: 'caseCondElse',
      },
      {
        symbol: n.sC_Cond,
        rhs: [n.sC_Selection, ...makeZeroOrMoreGroup(',', n.sC_Selection)],
        label: 'caseCondSelection',
      },
      [
        n.comparisonOperator,
        ...makeAlternates(n.LT, n.LEQ, n.GT, n.GEQ, n.EQ, n.NEQ, n.IS),
      ],
      {
        symbol: n.ifThenElseStmt,
        rhs: [
          n.IF,
          n.valueStmt,
          n.THEN,
          n.blockStmt,
          ...makeOptionalGroup(n.ELSE, n.blockStmt),
        ],
        label: 'InlineIfThenElse',
      },
      {
        symbol: n.ifThenElseStmt,
        rhs: [
          n.ifBlockStmt,
          nn.ifElseIfBlockStmtZeroOrMore,
          nn.ifElseBlockStmtOptional,
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
        nn.blockOptional,
      ],
      [
        n.ifElseIfBlockStmt,
        n.ELSEIF,
        n.valueStmt,
        n.THEN,
        n.endOfStatement,
        nn.blockOptional,
      ],

      [n.ifElseBlockStmt, n.ELSE, n.endOfStatement, nn.blockOptional],

      [
        n.onErrorStmt,
        n.ON_ERROR,
        ...makeGroup(
          ...makeAlternates(
            [
              n.GOTO,
              ...makeGroup(
                ...makeAlternates(n.certainIdentifier, [
                  n.MINUS,
                  n.INTEGERLITERAL,
                ]),
              ),
            ],
            [n.RESUME, n.NEXT],
          ),
        ),
      ],

      [n.lineLabel, n.certainIdentifier, n.COLON],

      [n.goToStmt, n.GOTO, n.ambiguousIdentifier],

      [
        n.eraseStmt,
        n.ERASE,
        n.valueStmt,
        ...makeZeroOrMoreGroup(',', n.valueStmt),
      ],

      [
        n.redimStmt,
        n.REDIM,
        nn.PRESERVEOptional,
        n.redimSubStmt,
        ...makeZeroOrMoreGroup(',', n.redimSubStmt),
      ],

      [
        n.redimSubStmt,
        n.implicitCallStmt_InStmt,
        n.LPAREN,
        n.subscripts,
        n.RPAREN,
        nn.asTypeClauseOptional,
      ],
      [
        n.exitStmt,
        ...makeAlternates(
          n.EXIT_DO,
          n.EXIT_FOR,
          n.EXIT_FUNCTION,
          n.EXIT_PROPERTY,
          n.EXIT_SUB,
          n.END,
        ),
      ],
      [
        n.letStmt,
        nn.LETOptional,
        n.implicitCallStmt_InStmt,
        ...makeGroup(...makeAlternates(n.EQ, n.PLUS_EQ, n.MINUS_EQ)),
        n.valueStmt,
      ],

      [n.setStmt, n.SET, n.implicitCallStmt_InStmt, n.EQ, n.valueStmt],

      [
        n.explicitCallStmt,
        ...makeAlternates(n.eCS_MemberProcedureCall, n.eCS_ProcedureCall),
      ],

      [
        n.eCS_MemberProcedureCall,
        n.CALL,

        ...makeGroup(
          ...makeAlternates(
            [nn.implicitCallStmt_InStmtOptional, '.'],
            n.SPACE_DOT,
          ),
        ),

        n.ambiguousIdentifier,
        nn.typeHintOptional,
        ...makeOptionalGroup(n.LPAREN, n.argsCall, n.RPAREN),

        ...makeZeroOrMoreGroup(n.LPAREN, n.indexes, n.RPAREN),
      ],

      [
        n.eCS_ProcedureCall,
        n.CALL,
        n.certainIdentifier,
        nn.typeHintOptional,

        ...makeOptionalGroup(n.LPAREN, n.argsCall, n.RPAREN),

        ...makeZeroOrMoreGroup(n.LPAREN, n.indexes, n.RPAREN),
      ],

      [
        n.implicitCallStmt_InBlock,
        ...makeAlternates(n.iCS_B_MemberProcedureCall, n.iCS_B_ProcedureCall),
      ],

      [
        n.iCS_B_MemberProcedureCall,

        ...makeGroup(
          ...makeAlternates(n.SPACE_DOT, [
            nn.implicitCallStmt_InStmtOptional,
            '.',
          ]),
        ),

        n.ambiguousIdentifier,
        nn.typeHintOptional,
        nn.argsCallOptional,

        ...makeZeroOrMoreGroup(n.LPAREN, n.indexes, n.RPAREN),
      ],
      [
        n.iCS_B_ProcedureCall,
        n.certainIdentifier,
        nn.argsCallOptional,
        ...makeOptionalGroup(n.LPAREN, n.indexes, n.RPAREN),
      ],

      [
        n.argsCall,
        ',*',
        n.argCall,
        ...makeZeroOrMoreGroup(',', nn.argCallOptional),
      ],

      [n.argCall, n.valueStmt],

      [
        n.variableStmt,

        ...makeGroup(...makeAlternates(n.DIM, n.STATIC, n.visibility)),

        nn.WITHEVENTSOptional,
        n.variableListStmt,
      ],

      [
        n.withStmt,
        n.WITH,

        ...makeGroup(
          ...makeAlternates(n.implicitCallStmt_InStmt, [n.NEW, n.type_]),
        ),

        n.endOfStatement,
        nn.blockOptional,
        n.END_WITH,
      ],

      [
        n.variableListStmt,
        n.variableSubStmt,
        ...makeZeroOrMoreGroup(',', n.variableSubStmt),
      ],

      [
        n.variableSubStmt,
        n.certainIdentifier,

        ...makeOptionalGroup(n.LPAREN, nn.subscriptsOptional, n.RPAREN),

        nn.typeHintOptional,
        nn.asTypeClauseOptional,
      ],

      [n.indexes, n.valueStmt, ...makeZeroOrMoreGroup(',', n.valueStmt)],

      [n.subscript_, ...makeOptionalGroup(n.valueStmt, n.TO), n.valueStmt],

      [n.subscripts, n.subscript_, ...makeZeroOrMoreGroup(',', n.subscript_)],

      [n.subscript_, ...makeOptionalGroup(n.valueStmt, n.TO), n.valueStmt],

      [
        n.argList,
        n.LPAREN,
        ...makeOptionalGroup(n.arg, ...makeZeroOrMoreGroup(',', n.arg)),

        n.RPAREN,
      ],

      [
        n.valueStmt,
        ...makeAlternates(
          n.literal,
          n.implicitCallStmt_InStmt,
          [n.certainIdentifier, n.ASSIGN, n.valueStmt],
          [n.NEW, n.valueStmt],
        ),
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
        ...makeAlternates(
          n.iCS_S_MembersCall,
          n.iCS_S_VariableOrProcedureCall,
          n.iCS_S_ProcedureOrArrayCall,
        ),
      ],

      [
        n.iCS_S_MembersCall,

        ...makeGroup(
          ...makeAlternates(
            [
              ...makeOptionalGroup(
                ...makeAlternates(
                  n.iCS_S_VariableOrProcedureCall,
                  n.iCS_S_ProcedureOrArrayCall,
                ),
              ),

              n.iCS_S_MemberCall,
            ],
            n.iCS_S_SpaceMemberCall,
          ),
        ),

        nn.iCS_S_MemberCallZeroOrMore,
        ...makeZeroOrMoreGroup(n.LPAREN, n.indexes, n.RPAREN),
      ],
      [
        n.iCS_S_MemberCall,
        '.',
        ...makeGroup(
          ...makeAlternates(
            n.mCS_S_VariableOrProcedureCall,
            n.mCS_S_ProcedureOrArrayCall,
          ),
        ),
      ],
      [
        n.iCS_S_SpaceMemberCall,
        n.SPACE_DOT,
        ...makeGroup(
          ...makeAlternates(
            n.mCS_S_VariableOrProcedureCall,
            n.mCS_S_ProcedureOrArrayCall,
          ),
        ),
      ],

      ...[n.mCS_S_ProcedureOrArrayCall, n.iCS_S_ProcedureOrArrayCall].map(
        (s) => [
          s,
          s === n.mCS_S_ProcedureOrArrayCall
            ? n.ambiguousIdentifier
            : n.certainIdentifier,
          nn.typeHintOptional,
          n.LPAREN,
          nn.argsCallOptional,
          n.RPAREN,
          ...makeZeroOrMoreGroup(n.LPAREN, n.indexes, n.RPAREN),
        ],
      ),

      ...[n.iCS_S_VariableOrProcedureCall, n.mCS_S_VariableOrProcedureCall].map(
        (s) => [
          s,
          s === n.mCS_S_VariableOrProcedureCall
            ? n.ambiguousIdentifier
            : n.certainIdentifier,
          nn.typeHintOptional,

          ...makeZeroOrMoreGroup(n.LPAREN, n.indexes, n.RPAREN),
        ],
      ),

      [
        n.literal,
        ...makeAlternates(
          n.DOUBLELITERAL,
          n.INTEGERLITERAL,
          n.STRINGLITERAL,
          n.NOTHING,
          n.NULL,
          n.TRUE,
          n.FALSE,
          n.DATELITERAL,
        ),
      ],

      [n.typeHint, ...makeAlternates('&', '%', '#', '!', '@', '$')],

      [
        n.arg,
        nn.OPTIONALOptional,
        ...makeOptionalGroup(...makeAlternates(n.BYVAL, n.BYREF)),

        nn.PARAMARRAYOptional,
        n.certainIdentifier,
        nn.typeHintOptional,

        ...makeOptionalGroup(n.LPAREN, n.RPAREN),
        nn.asTypeClauseOptional,
        nn.argDefaultValueOptional,
      ],

      [n.argDefaultValue, n.EQ, n.valueStmt],

      [n.asTypeClause, n.AS, nn.NEWOptional, n.type_],

      [
        n.type_,

        ...makeGroup(...makeAlternates(n.baseType, n.complexType)),

        ...makeOptionalGroup(n.LPAREN, n.RPAREN),
      ],

      [
        n.complexType,
        n.certainIdentifier,
        ...makeZeroOrMoreGroup('.', n.ambiguousIdentifier),
      ],

      [
        n.baseType,
        ...makeAlternates(
          n.BOOLEAN,
          n.BYTE,
          n.DOUBLE,
          n.INTEGER,
          n.LONG,
          n.SINGLE,
          n.VARIANT,
          n.STRING,
          n.DATE,
        ),
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
          function action(this: any) {
            this.text = (this.text || '').toLowerCase();
          },
        ],
      ]),
    },
  };
};
