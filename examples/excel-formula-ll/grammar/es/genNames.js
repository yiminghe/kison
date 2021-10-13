const symbols = [
  'formula',
  'exp',
  'reference-item',
  'reference',
  'array-element',
  'array',
  'functionExp',
  'argumentsList',
  'structureReference',
  'table-specifier',
  'table-this-row',
  'table-specifier-inner',
  'table-specifier-item',
  'table-column-specifier',
  'binaryExp',
  'prefix-exp',
  'clip-exp',
  'percentage-exp',
  'unionReference',
  'intersectionReference',
  'rangeReference',
];

const tokens = [
  'SPECIFIER_SEPARATOR',
  'TABLE_ITEM_SPECIFIER',
  'TABLE_AT',
  'TABLE_COLUMN_SPECIFIER',
  'ARRAY_SEPARATOR',
  'REF_UNION_OPERATOR',
  'REF_RANGE_OPERATOR',
  'ARGUMENT_SEPARATOR',
  'STRING',
  'FUNCTION',
  'TABLE_NAME',
  'ERROR',
  'CELL',
  'LOGIC',
  'NAME',
  'NUMBER',
  'UMINUS',
  'UPLUS',
  'REF_INTERSECTION_OPERATOR',
];

const names = Array.from(tokens.concat(symbols));

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

require('fs').writeFileSync(__dirname + '/names.js', code.join('\n'));

// require('fs').writeFileSync(require('path').join(__dirname , '../../src/names.ts'), code.join('\n'));
