const keywords = [
  'ALIAS',
  'AND',
  'ATTRIBUTE',
  'AS',
  'BEGIN',
  'BOOLEAN',
  'BYVAL',
  'BYREF',
  'BYTE',
  'CALL',
  'CASE',
  'CONST',
  'DECLARE',
  'DEFBOOL',
  'DEFBYTE',
  'DEFDATE',
  'DEFDBL',
  'DEFDEC',
  'DEFCUR',
  'DEFINT',
  'DEFLNG',
  'DEFOBJ',
  'DEFSNG',
  'DEFSTR',
  'DEFVAR',
  'DIM',
  'DO',
  'DOUBLE',
  'EACH',
  'ELSE',
  'ELSEIF',
  'END_ENUM',
  'END_FUNCTION',
  'END_IF',
  'END_PROPERTY',
  'END_SELECT',
  'END_SUB',
  'END_TYPE',
  'END_WITH',
  'END',
  'ENUM',
  'EQV',
  'ERASE',
  'EVENT',
  'EXIT_DO',
  'EXIT_FOR',
  'EXIT_FUNCTION',
  'EXIT_PROPERTY',
  'EXIT_SUB',
  'FALSE',
  'FRIEND',
  'FOR',
  'FUNCTION',
  'GET',
  'GLOBAL',
  'GOSUB',
  'GOTO',
  'IF',
  'IMPLEMENTS',
  'IN',
  'IS',
  'INTEGER',
  'LONG',
  'LOOP',
  'LEN',
  'LET',
  'LIB',
  'LIKE',
  'LSET',
  'MACRO_CONST',
  'MACRO_IF',
  'MACRO_ELSEIF',
  'MACRO_ELSE',
  'MACRO_END_IF',
  'MOD',
  'NEXT',
  'NEW',
  'NOT',
  'NOTHING',
  'NULL',
  'ON_ERROR',
  'ON_LOCAL_ERROR',
  'ON',
  'OPTIONAL',
  'OPTION_BASE',
  'OPTION_EXPLICIT',
  'OPTION_COMPARE',
  'OPTION_PRIVATE_MODULE',
  'OR',
  'PARAMARRAY',
  'PRESERVE',
  'PRIVATE',
  'PROPERTY_GET',
  'PROPERTY_LET',
  'PROPERTY_SET',
  'PTRSAFE',
  'PUBLIC',
  'RAISEEVENT',
  'REDIM',
  'RESET',
  'RESUME',
  'RETURN',
  'SELECT',
  'SET',
  'SINGLE',
  'STATIC',
  'STEP',
  'STOP',
  'STRING',
  'SUB',
  'THEN',
  'TO',
  'TRUE',
  'TYPEOF',
  'UNTIL',
  'VARIANT',
  'WEND',
  'WHILE',
  'WITH',
  'WITHEVENTS',
  'XOR',
];

const lexer = [
  'IDENTIFIER',
  'INTEGERLITERAL',
  'STRINGLITERAL',
  'AMPERSAND',
  'ASSIGN',
  'DIV',
  'EQ',
  'GEQ',
  'GT',
  'LEQ',
  'LPAREN',
  'LT',
  'MINUS',
  'MINUS_EQ',
  'MULT',
  'NEQ',
  'PLUS',
  'PLUS_EQ',
  'POW',
  'RPAREN',
  'NEWLINE',
  'COLON',
  'COMMENT',
  'REMCOMMENT',
  'L_SQUARE_BRACKET',
  'R_SQUARE_BRACKET',
  'keywords',
  'SPACE_DOT',
  '$EOF',
];

const symbols = [
  'progam',
  'moduleBody',
  'moduleHeader',
  'moduleConfig',
  'moduleAttributes',
  'moduleDeclarations',
  'moduleBodyElement',
  'ambiguousIdentifier',
  'ambiguousKeyword',
  'subStmt',
  'functionStmt',
  'visibility',
  'argList',
  'block',
  'blockStmt',
  'variableStmt',
  'variableListStmt',
  'variableSubStmt',
  'arg',
  'typeHint',
  'asTypeClause',
  'argDefaultValue',
  'valueStmt',
  'type_',
  'baseType',
  'fieldLength',
  'subscripts',
  'indexes',
  'subscript_',
  'literal',
  'implicitCallStmt_InBlock',
  'iCS_B_ProcedureCall',
  'argsCall',
  'argCall',
  'dictionaryCallStmt',
  'implicitCallStmt_InStmt',
  'iCS_S_VariableOrProcedureCall',
  'explicitCallStmt',
  'eCS_ProcedureCall',
  'setStmt',
  'letStmt',
  'iCS_S_ProcedureOrArrayCall',
  'exitStmt',
  'moduleDeclarationsElement',
  'endOfLine',
  'endOfStatement',
  'redimStmt',
  'redimSubStmt',
  'eraseStmt',
  'complexType',
  'iCS_S_MembersCall',
  'iCS_S_MemberCall',
  'iCS_S_SpaceMemberCall',
  'eCS_MemberProcedureCall',
  'iCS_B_MemberProcedureCall',
  'propertyGetStmt',
  'propertySetStmt',
  'propertyLetStmt',
  'moduleOption',
  'lineLabel',
  'goToStmt',
  'onErrorStmt',
  'withStmt',
  'implicitCallStmt_InBlock',
  'implicitCallStmt_InBlock',
  'implicitCallStmt_InBlock',
  '',
];

const names = Array.from(new Set(keywords.concat(lexer).concat(symbols)));

const code = [];

for (const k of names) {
  if (!k) {
    continue;
  }
  code.push(`export const ${k} = '${k}';`);
  code.push(`export const ${k}Optional = '${k}?';`);
  code.push(`export const ${k}ZeroOrMore = '${k}*';`);
  code.push(`export const ${k}OneOrMore = '${k}+';`);
}

code.push(`export const groupStartMark = "'('";`);
code.push(`export const groupEndMark = "')'";`);
code.push(`export const groupEndOptionalMark = "')'?";`);
code.push(`export const groupEndZeroOrMoreMark = "')'*";`);
code.push(`export const groupEndOneOrMoreMark = "')'+";`);
code.push(`export const alternationMark = "'|'";`);

code.push(`export const KEYWORDS=${JSON.stringify(keywords)};`);

code.push(`
export const makeProductions = (arr)=>{
  return arr.map(a=>{
    if(Array.isArray(a)) {
       return {
         symbol: a[0],
         rhs: a.slice(1)
       };
    }
    return a;
  });
};

export const makeLexerRules = (arr) => {
  return arr.map((a) => {
    if (Array.isArray(a)) {
      const ret = {
        token: a[0],
        regexp: a[1],
      };
      if (a[2]) {
        ret.action = a[2];
      }
      return ret;
    }
    return a;
  });
};
`);

require('fs').writeFileSync(__dirname + '/names.js', code.join('\n'));
