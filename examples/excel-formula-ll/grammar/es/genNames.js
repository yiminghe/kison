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
