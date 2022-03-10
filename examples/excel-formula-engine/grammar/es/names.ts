export const SPECIFIER_SEPARATOR = 'SPECIFIER_SEPARATOR';
export const TABLE_ITEM_SPECIFIER = 'TABLE_ITEM_SPECIFIER';
export const TABLE_AT = 'TABLE_AT';
export const TABLE_COLUMN_SPECIFIER = 'TABLE_COLUMN_SPECIFIER';
export const ARRAY_SEPARATOR = 'ARRAY_SEPARATOR';
export const REF_UNION_OPERATOR = 'REF_UNION_OPERATOR';
export const REF_RANGE_OPERATOR = 'REF_RANGE_OPERATOR';
export const ARGUMENT_SEPARATOR = 'ARGUMENT_SEPARATOR';
export const STRING = 'STRING';
export const FUNCTION = 'FUNCTION';
export const TABLE_NAME = 'TABLE_NAME';
export const ERROR = 'ERROR';
export const CELL = 'CELL';
export const LOGIC = 'LOGIC';
export const NAME = 'NAME';
export const NUMBER = 'NUMBER';
export const UMINUS = 'UMINUS';
export const UPLUS = 'UPLUS';
export const REF_INTERSECTION_OPERATOR = 'REF_INTERSECTION_OPERATOR';
export const formula = 'formula';
export const exp = 'exp';
export const referenceItem = 'referenceItem';
export const reference = 'reference';
export const arrayElement = 'arrayElement';
export const array = 'array';
export const functionExp = 'functionExp';
export const argumentsList = 'argumentsList';
export const structureReference = 'structureReference';
export const tableSpecifier = 'tableSpecifier';
export const tableThisRow = 'tableThisRow';
export const tableSpecifierInner = 'tableSpecifierInner';
export const tableSpecifierItem = 'tableSpecifierItem';
export const tableColumnSpecifier = 'tableColumnSpecifier';
export const binaryExp = 'binaryExp';
export const prefixExp = 'prefixExp';
export const clipExp = 'clipExp';
export const percentageExp = 'percentageExp';
export const unionReference = 'unionReference';
export const intersectionReference = 'intersectionReference';
export const rangeReference = 'rangeReference';
export const makeExtendSymbols = (options: Kison.Options) => ({
  SPECIFIER_SEPARATOROptional: options.makeOptionalSymbol(SPECIFIER_SEPARATOR),
  SPECIFIER_SEPARATORZeroOrMore:
    options.makeZeroOrMoreSymbol(SPECIFIER_SEPARATOR),
  SPECIFIER_SEPARATOROneOrMore:
    options.makeOneOrMoreSymbol(SPECIFIER_SEPARATOR),
  TABLE_ITEM_SPECIFIEROptional:
    options.makeOptionalSymbol(TABLE_ITEM_SPECIFIER),
  TABLE_ITEM_SPECIFIERZeroOrMore:
    options.makeZeroOrMoreSymbol(TABLE_ITEM_SPECIFIER),
  TABLE_ITEM_SPECIFIEROneOrMore:
    options.makeOneOrMoreSymbol(TABLE_ITEM_SPECIFIER),
  TABLE_ATOptional: options.makeOptionalSymbol(TABLE_AT),
  TABLE_ATZeroOrMore: options.makeZeroOrMoreSymbol(TABLE_AT),
  TABLE_ATOneOrMore: options.makeOneOrMoreSymbol(TABLE_AT),
  TABLE_COLUMN_SPECIFIEROptional: options.makeOptionalSymbol(
    TABLE_COLUMN_SPECIFIER,
  ),
  TABLE_COLUMN_SPECIFIERZeroOrMore: options.makeZeroOrMoreSymbol(
    TABLE_COLUMN_SPECIFIER,
  ),
  TABLE_COLUMN_SPECIFIEROneOrMore: options.makeOneOrMoreSymbol(
    TABLE_COLUMN_SPECIFIER,
  ),
  ARRAY_SEPARATOROptional: options.makeOptionalSymbol(ARRAY_SEPARATOR),
  ARRAY_SEPARATORZeroOrMore: options.makeZeroOrMoreSymbol(ARRAY_SEPARATOR),
  ARRAY_SEPARATOROneOrMore: options.makeOneOrMoreSymbol(ARRAY_SEPARATOR),
  REF_UNION_OPERATOROptional: options.makeOptionalSymbol(REF_UNION_OPERATOR),
  REF_UNION_OPERATORZeroOrMore:
    options.makeZeroOrMoreSymbol(REF_UNION_OPERATOR),
  REF_UNION_OPERATOROneOrMore: options.makeOneOrMoreSymbol(REF_UNION_OPERATOR),
  REF_RANGE_OPERATOROptional: options.makeOptionalSymbol(REF_RANGE_OPERATOR),
  REF_RANGE_OPERATORZeroOrMore:
    options.makeZeroOrMoreSymbol(REF_RANGE_OPERATOR),
  REF_RANGE_OPERATOROneOrMore: options.makeOneOrMoreSymbol(REF_RANGE_OPERATOR),
  ARGUMENT_SEPARATOROptional: options.makeOptionalSymbol(ARGUMENT_SEPARATOR),
  ARGUMENT_SEPARATORZeroOrMore:
    options.makeZeroOrMoreSymbol(ARGUMENT_SEPARATOR),
  ARGUMENT_SEPARATOROneOrMore: options.makeOneOrMoreSymbol(ARGUMENT_SEPARATOR),
  STRINGOptional: options.makeOptionalSymbol(STRING),
  STRINGZeroOrMore: options.makeZeroOrMoreSymbol(STRING),
  STRINGOneOrMore: options.makeOneOrMoreSymbol(STRING),
  FUNCTIONOptional: options.makeOptionalSymbol(FUNCTION),
  FUNCTIONZeroOrMore: options.makeZeroOrMoreSymbol(FUNCTION),
  FUNCTIONOneOrMore: options.makeOneOrMoreSymbol(FUNCTION),
  TABLE_NAMEOptional: options.makeOptionalSymbol(TABLE_NAME),
  TABLE_NAMEZeroOrMore: options.makeZeroOrMoreSymbol(TABLE_NAME),
  TABLE_NAMEOneOrMore: options.makeOneOrMoreSymbol(TABLE_NAME),
  ERROROptional: options.makeOptionalSymbol(ERROR),
  ERRORZeroOrMore: options.makeZeroOrMoreSymbol(ERROR),
  ERROROneOrMore: options.makeOneOrMoreSymbol(ERROR),
  CELLOptional: options.makeOptionalSymbol(CELL),
  CELLZeroOrMore: options.makeZeroOrMoreSymbol(CELL),
  CELLOneOrMore: options.makeOneOrMoreSymbol(CELL),
  LOGICOptional: options.makeOptionalSymbol(LOGIC),
  LOGICZeroOrMore: options.makeZeroOrMoreSymbol(LOGIC),
  LOGICOneOrMore: options.makeOneOrMoreSymbol(LOGIC),
  NAMEOptional: options.makeOptionalSymbol(NAME),
  NAMEZeroOrMore: options.makeZeroOrMoreSymbol(NAME),
  NAMEOneOrMore: options.makeOneOrMoreSymbol(NAME),
  NUMBEROptional: options.makeOptionalSymbol(NUMBER),
  NUMBERZeroOrMore: options.makeZeroOrMoreSymbol(NUMBER),
  NUMBEROneOrMore: options.makeOneOrMoreSymbol(NUMBER),
  UMINUSOptional: options.makeOptionalSymbol(UMINUS),
  UMINUSZeroOrMore: options.makeZeroOrMoreSymbol(UMINUS),
  UMINUSOneOrMore: options.makeOneOrMoreSymbol(UMINUS),
  UPLUSOptional: options.makeOptionalSymbol(UPLUS),
  UPLUSZeroOrMore: options.makeZeroOrMoreSymbol(UPLUS),
  UPLUSOneOrMore: options.makeOneOrMoreSymbol(UPLUS),
  REF_INTERSECTION_OPERATOROptional: options.makeOptionalSymbol(
    REF_INTERSECTION_OPERATOR,
  ),
  REF_INTERSECTION_OPERATORZeroOrMore: options.makeZeroOrMoreSymbol(
    REF_INTERSECTION_OPERATOR,
  ),
  REF_INTERSECTION_OPERATOROneOrMore: options.makeOneOrMoreSymbol(
    REF_INTERSECTION_OPERATOR,
  ),
  formulaOptional: options.makeOptionalSymbol(formula),
  formulaZeroOrMore: options.makeZeroOrMoreSymbol(formula),
  formulaOneOrMore: options.makeOneOrMoreSymbol(formula),
  expOptional: options.makeOptionalSymbol(exp),
  expZeroOrMore: options.makeZeroOrMoreSymbol(exp),
  expOneOrMore: options.makeOneOrMoreSymbol(exp),
  referenceItemOptional: options.makeOptionalSymbol(referenceItem),
  referenceItemZeroOrMore: options.makeZeroOrMoreSymbol(referenceItem),
  referenceItemOneOrMore: options.makeOneOrMoreSymbol(referenceItem),
  referenceOptional: options.makeOptionalSymbol(reference),
  referenceZeroOrMore: options.makeZeroOrMoreSymbol(reference),
  referenceOneOrMore: options.makeOneOrMoreSymbol(reference),
  arrayElementOptional: options.makeOptionalSymbol(arrayElement),
  arrayElementZeroOrMore: options.makeZeroOrMoreSymbol(arrayElement),
  arrayElementOneOrMore: options.makeOneOrMoreSymbol(arrayElement),
  arrayOptional: options.makeOptionalSymbol(array),
  arrayZeroOrMore: options.makeZeroOrMoreSymbol(array),
  arrayOneOrMore: options.makeOneOrMoreSymbol(array),
  functionExpOptional: options.makeOptionalSymbol(functionExp),
  functionExpZeroOrMore: options.makeZeroOrMoreSymbol(functionExp),
  functionExpOneOrMore: options.makeOneOrMoreSymbol(functionExp),
  argumentsListOptional: options.makeOptionalSymbol(argumentsList),
  argumentsListZeroOrMore: options.makeZeroOrMoreSymbol(argumentsList),
  argumentsListOneOrMore: options.makeOneOrMoreSymbol(argumentsList),
  structureReferenceOptional: options.makeOptionalSymbol(structureReference),
  structureReferenceZeroOrMore:
    options.makeZeroOrMoreSymbol(structureReference),
  structureReferenceOneOrMore: options.makeOneOrMoreSymbol(structureReference),
  tableSpecifierOptional: options.makeOptionalSymbol(tableSpecifier),
  tableSpecifierZeroOrMore: options.makeZeroOrMoreSymbol(tableSpecifier),
  tableSpecifierOneOrMore: options.makeOneOrMoreSymbol(tableSpecifier),
  tableThisRowOptional: options.makeOptionalSymbol(tableThisRow),
  tableThisRowZeroOrMore: options.makeZeroOrMoreSymbol(tableThisRow),
  tableThisRowOneOrMore: options.makeOneOrMoreSymbol(tableThisRow),
  tableSpecifierInnerOptional: options.makeOptionalSymbol(tableSpecifierInner),
  tableSpecifierInnerZeroOrMore:
    options.makeZeroOrMoreSymbol(tableSpecifierInner),
  tableSpecifierInnerOneOrMore:
    options.makeOneOrMoreSymbol(tableSpecifierInner),
  tableSpecifierItemOptional: options.makeOptionalSymbol(tableSpecifierItem),
  tableSpecifierItemZeroOrMore:
    options.makeZeroOrMoreSymbol(tableSpecifierItem),
  tableSpecifierItemOneOrMore: options.makeOneOrMoreSymbol(tableSpecifierItem),
  tableColumnSpecifierOptional:
    options.makeOptionalSymbol(tableColumnSpecifier),
  tableColumnSpecifierZeroOrMore:
    options.makeZeroOrMoreSymbol(tableColumnSpecifier),
  tableColumnSpecifierOneOrMore:
    options.makeOneOrMoreSymbol(tableColumnSpecifier),
  binaryExpOptional: options.makeOptionalSymbol(binaryExp),
  binaryExpZeroOrMore: options.makeZeroOrMoreSymbol(binaryExp),
  binaryExpOneOrMore: options.makeOneOrMoreSymbol(binaryExp),
  prefixExpOptional: options.makeOptionalSymbol(prefixExp),
  prefixExpZeroOrMore: options.makeZeroOrMoreSymbol(prefixExp),
  prefixExpOneOrMore: options.makeOneOrMoreSymbol(prefixExp),
  clipExpOptional: options.makeOptionalSymbol(clipExp),
  clipExpZeroOrMore: options.makeZeroOrMoreSymbol(clipExp),
  clipExpOneOrMore: options.makeOneOrMoreSymbol(clipExp),
  percentageExpOptional: options.makeOptionalSymbol(percentageExp),
  percentageExpZeroOrMore: options.makeZeroOrMoreSymbol(percentageExp),
  percentageExpOneOrMore: options.makeOneOrMoreSymbol(percentageExp),
  unionReferenceOptional: options.makeOptionalSymbol(unionReference),
  unionReferenceZeroOrMore: options.makeZeroOrMoreSymbol(unionReference),
  unionReferenceOneOrMore: options.makeOneOrMoreSymbol(unionReference),
  intersectionReferenceOptional: options.makeOptionalSymbol(
    intersectionReference,
  ),
  intersectionReferenceZeroOrMore: options.makeZeroOrMoreSymbol(
    intersectionReference,
  ),
  intersectionReferenceOneOrMore: options.makeOneOrMoreSymbol(
    intersectionReference,
  ),
  rangeReferenceOptional: options.makeOptionalSymbol(rangeReference),
  rangeReferenceZeroOrMore: options.makeZeroOrMoreSymbol(rangeReference),
  rangeReferenceOneOrMore: options.makeOneOrMoreSymbol(rangeReference),
});
