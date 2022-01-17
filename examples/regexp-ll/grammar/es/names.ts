export const characterClassAnyWord = 'characterClassAnyWord';
export const characterClassAnyWordInverted = 'characterClassAnyWordInverted';
export const whitespaceCharacter = 'whitespaceCharacter';
export const whitespaceCharacterInverted = 'whitespaceCharacterInverted';
export const characterClassAnyDecimalDigit = 'characterClassAnyDecimalDigit';
export const characterClassAnyDecimalDigitInverted =
  'characterClassAnyDecimalDigitInverted';
export const anchorWordBoundary = 'anchorWordBoundary';
export const anchorNonWordBoundary = 'anchorNonWordBoundary';
export const anchorStartOfStringOnly = 'anchorStartOfStringOnly';
export const anchorEndOfStringOnlyNotNewline =
  'anchorEndOfStringOnlyNotNewline';
export const anchorEndOfStringOnly = 'anchorEndOfStringOnly';
export const anchorPreviousMatchEnd = 'anchorPreviousMatchEnd';
export const backreference = 'backreference';
export const char = 'char';
export const lookahead = 'lookahead';
export const negativeLookahead = 'negativeLookahead';
export const lookbehind = 'lookbehind';
export const negativeLookbehind = 'negativeLookbehind';
export const namedGroupPrefix = 'namedGroupPrefix';
export const anyChar = 'anyChar';
export const int = 'int';
export const OPTIONAL = 'OPTIONAL';
export const Regexp = 'Regexp';
export const Expression = 'Expression';
export const SubExpressionPart = 'SubExpressionPart';
export const SubExpression = 'SubExpression';
export const ExpressionItem = 'ExpressionItem';
export const Group = 'Group';
export const Match = 'Match';
export const MatchItem = 'MatchItem';
export const MatchCharacterClass = 'MatchCharacterClass';
export const CharacterGroup = 'CharacterGroup';
export const CharacterGroupInner = 'CharacterGroupInner';
export const CharacterGroupItem = 'CharacterGroupItem';
export const CharacterClass = 'CharacterClass';
export const CharacterRange = 'CharacterRange';
export const Quantifier = 'Quantifier';
export const QuantifierType = 'QuantifierType';
export const Anchor = 'Anchor';
export const makeExtendSymbols = (options: Kison.Options) => ({
  characterClassAnyWordOptional: options.makeOptionalSymbol(
    characterClassAnyWord,
  ),
  characterClassAnyWordZeroOrMore: options.makeZeroOrMoreSymbol(
    characterClassAnyWord,
  ),
  characterClassAnyWordOneOrMore: options.makeOneOrMoreSymbol(
    characterClassAnyWord,
  ),
  characterClassAnyWordInvertedOptional: options.makeOptionalSymbol(
    characterClassAnyWordInverted,
  ),
  characterClassAnyWordInvertedZeroOrMore: options.makeZeroOrMoreSymbol(
    characterClassAnyWordInverted,
  ),
  characterClassAnyWordInvertedOneOrMore: options.makeOneOrMoreSymbol(
    characterClassAnyWordInverted,
  ),
  whitespaceCharacterOptional: options.makeOptionalSymbol(whitespaceCharacter),
  whitespaceCharacterZeroOrMore:
    options.makeZeroOrMoreSymbol(whitespaceCharacter),
  whitespaceCharacterOneOrMore:
    options.makeOneOrMoreSymbol(whitespaceCharacter),
  whitespaceCharacterInvertedOptional: options.makeOptionalSymbol(
    whitespaceCharacterInverted,
  ),
  whitespaceCharacterInvertedZeroOrMore: options.makeZeroOrMoreSymbol(
    whitespaceCharacterInverted,
  ),
  whitespaceCharacterInvertedOneOrMore: options.makeOneOrMoreSymbol(
    whitespaceCharacterInverted,
  ),
  characterClassAnyDecimalDigitOptional: options.makeOptionalSymbol(
    characterClassAnyDecimalDigit,
  ),
  characterClassAnyDecimalDigitZeroOrMore: options.makeZeroOrMoreSymbol(
    characterClassAnyDecimalDigit,
  ),
  characterClassAnyDecimalDigitOneOrMore: options.makeOneOrMoreSymbol(
    characterClassAnyDecimalDigit,
  ),
  characterClassAnyDecimalDigitInvertedOptional: options.makeOptionalSymbol(
    characterClassAnyDecimalDigitInverted,
  ),
  characterClassAnyDecimalDigitInvertedZeroOrMore: options.makeZeroOrMoreSymbol(
    characterClassAnyDecimalDigitInverted,
  ),
  characterClassAnyDecimalDigitInvertedOneOrMore: options.makeOneOrMoreSymbol(
    characterClassAnyDecimalDigitInverted,
  ),
  anchorWordBoundaryOptional: options.makeOptionalSymbol(anchorWordBoundary),
  anchorWordBoundaryZeroOrMore:
    options.makeZeroOrMoreSymbol(anchorWordBoundary),
  anchorWordBoundaryOneOrMore: options.makeOneOrMoreSymbol(anchorWordBoundary),
  anchorNonWordBoundaryOptional: options.makeOptionalSymbol(
    anchorNonWordBoundary,
  ),
  anchorNonWordBoundaryZeroOrMore: options.makeZeroOrMoreSymbol(
    anchorNonWordBoundary,
  ),
  anchorNonWordBoundaryOneOrMore: options.makeOneOrMoreSymbol(
    anchorNonWordBoundary,
  ),
  anchorStartOfStringOnlyOptional: options.makeOptionalSymbol(
    anchorStartOfStringOnly,
  ),
  anchorStartOfStringOnlyZeroOrMore: options.makeZeroOrMoreSymbol(
    anchorStartOfStringOnly,
  ),
  anchorStartOfStringOnlyOneOrMore: options.makeOneOrMoreSymbol(
    anchorStartOfStringOnly,
  ),
  anchorEndOfStringOnlyNotNewlineOptional: options.makeOptionalSymbol(
    anchorEndOfStringOnlyNotNewline,
  ),
  anchorEndOfStringOnlyNotNewlineZeroOrMore: options.makeZeroOrMoreSymbol(
    anchorEndOfStringOnlyNotNewline,
  ),
  anchorEndOfStringOnlyNotNewlineOneOrMore: options.makeOneOrMoreSymbol(
    anchorEndOfStringOnlyNotNewline,
  ),
  anchorEndOfStringOnlyOptional: options.makeOptionalSymbol(
    anchorEndOfStringOnly,
  ),
  anchorEndOfStringOnlyZeroOrMore: options.makeZeroOrMoreSymbol(
    anchorEndOfStringOnly,
  ),
  anchorEndOfStringOnlyOneOrMore: options.makeOneOrMoreSymbol(
    anchorEndOfStringOnly,
  ),
  anchorPreviousMatchEndOptional: options.makeOptionalSymbol(
    anchorPreviousMatchEnd,
  ),
  anchorPreviousMatchEndZeroOrMore: options.makeZeroOrMoreSymbol(
    anchorPreviousMatchEnd,
  ),
  anchorPreviousMatchEndOneOrMore: options.makeOneOrMoreSymbol(
    anchorPreviousMatchEnd,
  ),
  backreferenceOptional: options.makeOptionalSymbol(backreference),
  backreferenceZeroOrMore: options.makeZeroOrMoreSymbol(backreference),
  backreferenceOneOrMore: options.makeOneOrMoreSymbol(backreference),
  charOptional: options.makeOptionalSymbol(char),
  charZeroOrMore: options.makeZeroOrMoreSymbol(char),
  charOneOrMore: options.makeOneOrMoreSymbol(char),
  lookaheadOptional: options.makeOptionalSymbol(lookahead),
  lookaheadZeroOrMore: options.makeZeroOrMoreSymbol(lookahead),
  lookaheadOneOrMore: options.makeOneOrMoreSymbol(lookahead),
  negativeLookaheadOptional: options.makeOptionalSymbol(negativeLookahead),
  negativeLookaheadZeroOrMore: options.makeZeroOrMoreSymbol(negativeLookahead),
  negativeLookaheadOneOrMore: options.makeOneOrMoreSymbol(negativeLookahead),
  lookbehindOptional: options.makeOptionalSymbol(lookbehind),
  lookbehindZeroOrMore: options.makeZeroOrMoreSymbol(lookbehind),
  lookbehindOneOrMore: options.makeOneOrMoreSymbol(lookbehind),
  negativeLookbehindOptional: options.makeOptionalSymbol(negativeLookbehind),
  negativeLookbehindZeroOrMore:
    options.makeZeroOrMoreSymbol(negativeLookbehind),
  negativeLookbehindOneOrMore: options.makeOneOrMoreSymbol(negativeLookbehind),
  namedGroupPrefixOptional: options.makeOptionalSymbol(namedGroupPrefix),
  namedGroupPrefixZeroOrMore: options.makeZeroOrMoreSymbol(namedGroupPrefix),
  namedGroupPrefixOneOrMore: options.makeOneOrMoreSymbol(namedGroupPrefix),
  anyCharOptional: options.makeOptionalSymbol(anyChar),
  anyCharZeroOrMore: options.makeZeroOrMoreSymbol(anyChar),
  anyCharOneOrMore: options.makeOneOrMoreSymbol(anyChar),
  intOptional: options.makeOptionalSymbol(int),
  intZeroOrMore: options.makeZeroOrMoreSymbol(int),
  intOneOrMore: options.makeOneOrMoreSymbol(int),
  OPTIONALOptional: options.makeOptionalSymbol(OPTIONAL),
  OPTIONALZeroOrMore: options.makeZeroOrMoreSymbol(OPTIONAL),
  OPTIONALOneOrMore: options.makeOneOrMoreSymbol(OPTIONAL),
  RegexpOptional: options.makeOptionalSymbol(Regexp),
  RegexpZeroOrMore: options.makeZeroOrMoreSymbol(Regexp),
  RegexpOneOrMore: options.makeOneOrMoreSymbol(Regexp),
  ExpressionOptional: options.makeOptionalSymbol(Expression),
  ExpressionZeroOrMore: options.makeZeroOrMoreSymbol(Expression),
  ExpressionOneOrMore: options.makeOneOrMoreSymbol(Expression),
  SubExpressionPartOptional: options.makeOptionalSymbol(SubExpressionPart),
  SubExpressionPartZeroOrMore: options.makeZeroOrMoreSymbol(SubExpressionPart),
  SubExpressionPartOneOrMore: options.makeOneOrMoreSymbol(SubExpressionPart),
  SubExpressionOptional: options.makeOptionalSymbol(SubExpression),
  SubExpressionZeroOrMore: options.makeZeroOrMoreSymbol(SubExpression),
  SubExpressionOneOrMore: options.makeOneOrMoreSymbol(SubExpression),
  ExpressionItemOptional: options.makeOptionalSymbol(ExpressionItem),
  ExpressionItemZeroOrMore: options.makeZeroOrMoreSymbol(ExpressionItem),
  ExpressionItemOneOrMore: options.makeOneOrMoreSymbol(ExpressionItem),
  GroupOptional: options.makeOptionalSymbol(Group),
  GroupZeroOrMore: options.makeZeroOrMoreSymbol(Group),
  GroupOneOrMore: options.makeOneOrMoreSymbol(Group),
  MatchOptional: options.makeOptionalSymbol(Match),
  MatchZeroOrMore: options.makeZeroOrMoreSymbol(Match),
  MatchOneOrMore: options.makeOneOrMoreSymbol(Match),
  MatchItemOptional: options.makeOptionalSymbol(MatchItem),
  MatchItemZeroOrMore: options.makeZeroOrMoreSymbol(MatchItem),
  MatchItemOneOrMore: options.makeOneOrMoreSymbol(MatchItem),
  MatchCharacterClassOptional: options.makeOptionalSymbol(MatchCharacterClass),
  MatchCharacterClassZeroOrMore:
    options.makeZeroOrMoreSymbol(MatchCharacterClass),
  MatchCharacterClassOneOrMore:
    options.makeOneOrMoreSymbol(MatchCharacterClass),
  CharacterGroupOptional: options.makeOptionalSymbol(CharacterGroup),
  CharacterGroupZeroOrMore: options.makeZeroOrMoreSymbol(CharacterGroup),
  CharacterGroupOneOrMore: options.makeOneOrMoreSymbol(CharacterGroup),
  CharacterGroupInnerOptional: options.makeOptionalSymbol(CharacterGroupInner),
  CharacterGroupInnerZeroOrMore:
    options.makeZeroOrMoreSymbol(CharacterGroupInner),
  CharacterGroupInnerOneOrMore:
    options.makeOneOrMoreSymbol(CharacterGroupInner),
  CharacterGroupItemOptional: options.makeOptionalSymbol(CharacterGroupItem),
  CharacterGroupItemZeroOrMore:
    options.makeZeroOrMoreSymbol(CharacterGroupItem),
  CharacterGroupItemOneOrMore: options.makeOneOrMoreSymbol(CharacterGroupItem),
  CharacterClassOptional: options.makeOptionalSymbol(CharacterClass),
  CharacterClassZeroOrMore: options.makeZeroOrMoreSymbol(CharacterClass),
  CharacterClassOneOrMore: options.makeOneOrMoreSymbol(CharacterClass),
  CharacterRangeOptional: options.makeOptionalSymbol(CharacterRange),
  CharacterRangeZeroOrMore: options.makeZeroOrMoreSymbol(CharacterRange),
  CharacterRangeOneOrMore: options.makeOneOrMoreSymbol(CharacterRange),
  QuantifierOptional: options.makeOptionalSymbol(Quantifier),
  QuantifierZeroOrMore: options.makeZeroOrMoreSymbol(Quantifier),
  QuantifierOneOrMore: options.makeOneOrMoreSymbol(Quantifier),
  QuantifierTypeOptional: options.makeOptionalSymbol(QuantifierType),
  QuantifierTypeZeroOrMore: options.makeZeroOrMoreSymbol(QuantifierType),
  QuantifierTypeOneOrMore: options.makeOneOrMoreSymbol(QuantifierType),
  AnchorOptional: options.makeOptionalSymbol(Anchor),
  AnchorZeroOrMore: options.makeZeroOrMoreSymbol(Anchor),
  AnchorOneOrMore: options.makeOneOrMoreSymbol(Anchor),
});
