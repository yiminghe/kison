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

const names = Array.from(new Set(tokens.concat(symbols)));

const code = [];

for (let k of names) {
  if (!k) {
    continue;
  }
  k = k.replace(/-(\w)/g, (n, d) => {
    return d.toUpperCase();
  });
  const value = k;
  code.push(`export const ${k} = '${value}';`);
  code.push(`export const ${k}Optional = '${value}?';`);
  code.push(`export const ${k}ZeroOrMore = '${value}*';`);
  code.push(`export const ${k}OneOrMore = '${value}+';`);
}

code.push(`export const groupStartMark = "'('";`);
code.push(`export const groupEndMark = "')'";`);
code.push(`export const groupEndOptionalMark = "')'?";`);
code.push(`export const groupEndZeroOrMoreMark = "')'*";`);
code.push(`export const groupEndOneOrMoreMark = "')'+";`);
code.push(`export const alternationMark = "'|'";`);

require('fs').writeFileSync(__dirname + '/names.mjs', code.join('\n'));

require('fs').writeFileSync(
  require('path').join(__dirname, '../../src/names.mjs'),
  code.join('\n'),
);
