const symbols = [
  'Regexp',
  'Expression',
  'SubExpressionPart',
  'SubExpression',
  'ExpressionItem',
  'Group',
  'Match',
  'MatchItem',
  'MatchCharacterClass',
  'CharacterGroup',
  'CharacterGroupInner',
  'CharacterGroupItem',
  'CharacterClass',
  'CharacterRange',
  'Quantifier',
  'QuantifierType',
  'Anchor',
];

const tokens = [
  'characterClassAnyWord',
  'characterClassAnyWordInverted',
  'whitespaceCharacter',
  'whitespaceCharacterInverted',
  'characterClassAnyDecimalDigit',
  'characterClassAnyDecimalDigitInverted',
  'anchorWordBoundary',
  'anchorNonWordBoundary',
  'anchorStartOfStringOnly',
  'anchorEndOfStringOnlyNotNewline',
  'anchorEndOfStringOnly',
  'anchorPreviousMatchEnd',
  'backreference',
  'char',
  'lookahead',
  'negativeLookahead',
  'lookbehind',
  'negativeLookbehind',
  'namedGroupPrefix',
  'anyChar',
  'int',
  'OPTIONAL',
];

const names = Array.from(tokens.concat(symbols)).map((k) =>
  k.replace(/-(\w)/g, (n, d) => {
    return d.toUpperCase();
  }),
);

const code = [];
for (const k of names) {
  if (!k) {
    continue;
  }
  code.push(`export const ${k} = '${k}';`);
}

code.push('export const makeExtendSymbols = (options:Kison.Options)=>({');

for (const k of names) {
  if (!k) {
    continue;
  }
  code.push(`${k}Optional: options.makeOptionalSymbol(${k}),`);
  code.push(`${k}ZeroOrMore: options.makeZeroOrMoreSymbol(${k}),`);
  code.push(`${k}OneOrMore: options.makeOneOrMoreSymbol(${k}),`);
}
code.push('});');

require('fs').writeFileSync(__dirname + '/names.ts', code.join('\n'));
