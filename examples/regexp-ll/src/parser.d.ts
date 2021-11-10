// TODO: improve Tuple type
type Optional<T> = T | undefined;
type OneOrMore<T> = T extends Array<infer U> ? [...T, ...U[]] : [T, ...T[]];
type ZeroOrMore<T> = T extends Array<infer U> ? U[] : T[];

export type AstNode = AstSymbolNode | AstTokenNode;

// replace start
export type AstSymbolNode = Regexp_Node|Expression_Node|SubExpression_Node|ExpressionItem_Node|Group_Node|Match_Node|MatchItem_Node|MatchCharacterClass_Node|CharacterGroup_Node|CharacterGroupInner_Node|CharacterGroupItem_Node|CharacterClass_Node|CharacterRange_Node|Quantifier_Node|QuantifierType_Node|Anchor_Node;
export type AstTokenNode = $EOF_Node|$UNKNOWN_Node|TOKEN_0_Node|Backreference_Node|TOKEN_1_Node|TOKEN_2_Node|TOKEN_3_Node|NamedGroupPrefix_Node|AnyChar_Node|Char_Node|TOKEN_4_Node|TOKEN_5_Node|CharacterClassAnyWordInverted_Node|CharacterClassAnyWord_Node|CharacterClassAnyDecimalDigit_Node|CharacterClassAnyDecimalDigitInverted_Node|WhitespaceCharacter_Node|WhitespaceCharacterInverted_Node|TOKEN_6_Node|OPTIONAL_Node|TOKEN_7_Node|TOKEN_8_Node|TOKEN_9_Node|Int_Node|TOKEN_10_Node|TOKEN_11_Node|AnchorWordBoundary_Node|AnchorNonWordBoundary_Node|AnchorStartOfStringOnly_Node|AnchorEndOfStringOnlyNotNewline_Node|AnchorEndOfStringOnly_Node|AnchorPreviousMatchEnd_Node|$_Node|Lookahead_Node|NegativeLookahead_Node|Lookbehind_Node|NegativeLookbehind_Node|TOKEN_12_Node;
export type LiteralToken = "characterClassAnyWord"|"characterClassAnyWordInverted"|"whitespaceCharacter"|"whitespaceCharacterInverted"|"characterClassAnyDecimalDigit"|"characterClassAnyDecimalDigitInverted"|"anchorWordBoundary"|"anchorNonWordBoundary"|"anchorStartOfStringOnly"|"anchorEndOfStringOnlyNotNewline"|"anchorEndOfStringOnly"|"anchorPreviousMatchEnd"|"backreference"|"char"|"lookahead"|"negativeLookahead"|"lookbehind"|"negativeLookbehind"|"namedGroupPrefix"|"$"|"OPTIONAL"|"anyChar"|"int"|"$EOF"|"$UNKNOWN"|"^"|"("|"?:"|")"|"["|"]"|"-"|"*"|"+"|"{"|"}"|","|"|";
export type AstRootNode = Regexp_Node;
// replace end

export type AstErrorNode = AstTokenNode & {
  error: ParseError;
}

export interface Position {
  start: number;
  end: number;
  firstLine: number;
  lastLine: number;
  firstColumn: number;
  lastColumn: number;
}

interface BaseSymbolNode extends Position {
  type: 'symbol';
  symbol: '';
  parent?: AstSymbolNode;
  label: '';
  children: AstNode[];
}

interface BaseTokenNode extends Position {
  type: 'token';
  token: '';
  t: string;
  text: string;
  parent: AstSymbolNode;
}

export type TransformNode = (arg: {
  index: number;
  node: AstNode;
  parent: AstSymbolNode;
  defaultTransformNode: TransformNode;
}) => AstNode | null;

export interface Token extends Position {
  text: string;
  t: string;
  channel?: string | string[];
  recovery?: string;
  token: LiteralToken;
}

export interface ParseError {
  errorMessage: string;
  expected: LiteralToken[];
  lexer: Token;
  recovery?: Boolean;
  symbol: AstSymbolNode['symbol'];
  tip: string;
}

export interface LexerOptions<T = any> {
  env?: string;
  unicode?:boolean;
  state?: {
    userData?: T,
    stateStack?: string[];
  }
}

export interface ParserOptions {
  // only for llk, global match improve accuracy but impact parse speed
  globalMatch?: boolean;
  lexerOptions?: LexerOptions;
  transformNode?: TransformNode | false;
  onErrorRecovery?: (args: {
    parseTree: AstNode;
    errorNode: AstErrorNode;
  }, recommendedAction: {
    action?: 'del' | 'add'
  }) => void;
}

export interface ParseResult {
  ast: AstRootNode;
  error?: ParseError;
  errorNode?: AstErrorNode;
  recoveryTokens: Token[];
  terminalNodes: AstTokenNode[];
  tokens: Token[];
}

export interface LexResult<T = any> {
  tokens: Token[];
  state: {
    userData: T,
    stateStack: string[];
  }
}

export type AstNodeTypeMap = { ast: AstNode;
Regexp: Regexp_Node;
Expression: Expression_Node;
SubExpression: SubExpression_Node;
ExpressionItem: ExpressionItem_Node;
Group: Group_Node;
Match: Match_Node;
MatchItem: MatchItem_Node;
MatchCharacterClass: MatchCharacterClass_Node;
CharacterGroup: CharacterGroup_Node;
CharacterGroupInner: CharacterGroupInner_Node;
CharacterGroupItem: CharacterGroupItem_Node;
CharacterClass: CharacterClass_Node;
CharacterRange: CharacterRange_Node;
Quantifier: Quantifier_Node;
QuantifierType: QuantifierType_Node;
Anchor: Anchor_Node;
$EOF: $EOF_Node;
$UNKNOWN: $UNKNOWN_Node;
TOKEN_0: TOKEN_0_Node;
backreference: Backreference_Node;
TOKEN_1: TOKEN_1_Node;
TOKEN_2: TOKEN_2_Node;
TOKEN_3: TOKEN_3_Node;
namedGroupPrefix: NamedGroupPrefix_Node;
anyChar: AnyChar_Node;
char: Char_Node;
TOKEN_4: TOKEN_4_Node;
TOKEN_5: TOKEN_5_Node;
characterClassAnyWordInverted: CharacterClassAnyWordInverted_Node;
characterClassAnyWord: CharacterClassAnyWord_Node;
characterClassAnyDecimalDigit: CharacterClassAnyDecimalDigit_Node;
characterClassAnyDecimalDigitInverted: CharacterClassAnyDecimalDigitInverted_Node;
whitespaceCharacter: WhitespaceCharacter_Node;
whitespaceCharacterInverted: WhitespaceCharacterInverted_Node;
TOKEN_6: TOKEN_6_Node;
OPTIONAL: OPTIONAL_Node;
TOKEN_7: TOKEN_7_Node;
TOKEN_8: TOKEN_8_Node;
TOKEN_9: TOKEN_9_Node;
int: Int_Node;
TOKEN_10: TOKEN_10_Node;
TOKEN_11: TOKEN_11_Node;
anchorWordBoundary: AnchorWordBoundary_Node;
anchorNonWordBoundary: AnchorNonWordBoundary_Node;
anchorStartOfStringOnly: AnchorStartOfStringOnly_Node;
anchorEndOfStringOnlyNotNewline: AnchorEndOfStringOnlyNotNewline_Node;
anchorEndOfStringOnly: AnchorEndOfStringOnly_Node;
anchorPreviousMatchEnd: AnchorPreviousMatchEnd_Node;
$: $_Node;
lookahead: Lookahead_Node;
negativeLookahead: NegativeLookahead_Node;
lookbehind: Lookbehind_Node;
negativeLookbehind: NegativeLookbehind_Node;
TOKEN_12: TOKEN_12_Node;
};

export type All_Names = Exclude<
  LiteralToken | AstSymbolNode['symbol'] | AstSymbolNode['label'],
  ''
>;

export type AstVisitor<T extends string, C, R = any> = (
  node: AstNodeTypeMap[T extends All_Names ? T : 'ast'],
  context: C,
) => R;

export type AstVisitors<T extends string, C, R = any> = {
  [e in All_Names | '' as e extends ''
  ? T
  : `${T}${Capitalize<e>}`]?: AstVisitor<e, C, R>;
};

declare function parse(input: string, options?: ParserOptions): ParseResult;

declare function lex<T = any>(input: string, options?: LexerOptions<T>): LexResult<T>;

declare const parser: { parse: typeof parse, lex: typeof lex };

export default parser;

// BinaryExpNode['userData'] = AstNodeUserDataTypes['binaryExp'] & AstNodeUserDataTypes['exp'] & AstNodeUserDataTypes['symbol'] & AstNodeUserDataTypes['ast'];

type AstNodeUserDataTypes={
  symbol:{
    captureGroupIndex:number;
  }
};

type SingleAstNodeUserDataType<T extends string> =  T extends keyof AstNodeUserDataTypes?AstNodeUserDataTypes[T]:{};

      type ShiftArray<A extends any[]> = A extends [any,...infer U]?U:[];

      type AstNodeUserDataType<T extends string[], R={}> =  
      T['length'] extends 0 ?R:AstNodeUserDataType<ShiftArray<T>,R & SingleAstNodeUserDataType<T[0]>>
      ;
interface $EOF_Node_ extends BaseTokenNode {
      token:"$EOF";
      parent:AstSymbolNode;
    }
export type $EOF_Node = $EOF_Node_ & {userData:AstNodeUserDataType<["$EOF","token","ast"]>};
interface $UNKNOWN_Node_ extends BaseTokenNode {
      token:"$UNKNOWN";
      parent:AstSymbolNode;
    }
export type $UNKNOWN_Node = $UNKNOWN_Node_ & {userData:AstNodeUserDataType<["$UNKNOWN","token","ast"]>};

        type Expression_3_group_1_Parent_Node = Expression_Node;
        
interface TOKEN_0_Node_ extends BaseTokenNode {
            token:"^";
            parent:Regexp_Node_0 | CharacterGroup_Node_21;
          }
export type TOKEN_0_Node = TOKEN_0_Node_ & {userData:AstNodeUserDataType<["^","token","ast"]>};
interface Regexp_Node_0_ extends BaseSymbolNode {
        symbol:"Regexp";
        
        children:[TOKEN_0_Node,Expression_Node];
        
      }
type Regexp_Node_0 = Regexp_Node_0_ & {userData:AstNodeUserDataType<["Regexp","symbol","ast"]>};
interface Regexp_Node_1_ extends BaseSymbolNode {
        symbol:"Regexp";
        
        children:[Expression_Node];
        
      }
type Regexp_Node_1 = Regexp_Node_1_ & {userData:AstNodeUserDataType<["Regexp","symbol","ast"]>};
interface Expression_Node_ extends BaseSymbolNode {
        symbol:"Expression";
        
        children:[SubExpression_Node,...ZeroOrMore<Expression_3_group_1_Node>];
        parent:Regexp_Node_0 | Regexp_Node_1 | Group_Node_8 | Group_Node_9 | Group_Node_10 | Group_Node_11 | Group_Node_12 | Group_Node_13 | Anchor_Node_49 | Anchor_Node_50 | Anchor_Node_51 | Anchor_Node_52;
      }
type Expression_Node = Expression_Node_ & {userData:AstNodeUserDataType<["Expression","symbol","ast"]>};
interface SubExpression_Node_ extends BaseSymbolNode {
        symbol:"SubExpression";
        
        children:[...ZeroOrMore<ExpressionItem_Node>];
        parent:Expression_Node | Expression_3_group_1_Parent_Node;
      }
type SubExpression_Node = SubExpression_Node_ & {userData:AstNodeUserDataType<["SubExpression","symbol","ast"]>};
interface ExpressionItem_Node_4_ extends BaseSymbolNode {
        symbol:"ExpressionItem";
        
        children:[Match_Node];
        parent:SubExpression_Node;
      }
type ExpressionItem_Node_4 = ExpressionItem_Node_4_ & {userData:AstNodeUserDataType<["ExpressionItem","symbol","ast"]>};
interface ExpressionItem_Node_5_ extends BaseSymbolNode {
        symbol:"ExpressionItem";
        
        children:[Group_Node];
        parent:SubExpression_Node;
      }
type ExpressionItem_Node_5 = ExpressionItem_Node_5_ & {userData:AstNodeUserDataType<["ExpressionItem","symbol","ast"]>};
interface ExpressionItem_Node_6_ extends BaseSymbolNode {
        symbol:"ExpressionItem";
        
        children:[Anchor_Node];
        parent:SubExpression_Node;
      }
type ExpressionItem_Node_6 = ExpressionItem_Node_6_ & {userData:AstNodeUserDataType<["ExpressionItem","symbol","ast"]>};
interface Backreference_Node_ extends BaseTokenNode {
            token:"backreference";
            parent:ExpressionItem_Node_7;
          }
export type Backreference_Node = Backreference_Node_ & {userData:AstNodeUserDataType<["backreference","token","ast"]>};
interface ExpressionItem_Node_7_ extends BaseSymbolNode {
        symbol:"ExpressionItem";
        
        children:[Backreference_Node];
        parent:SubExpression_Node;
      }
type ExpressionItem_Node_7 = ExpressionItem_Node_7_ & {userData:AstNodeUserDataType<["ExpressionItem","symbol","ast"]>};
interface TOKEN_1_Node_ extends BaseTokenNode {
            token:"(";
            parent:Group_Node_8 | Group_Node_9 | Group_Node_10 | Group_Node_11;
          }
export type TOKEN_1_Node = TOKEN_1_Node_ & {userData:AstNodeUserDataType<["(","token","ast"]>};
interface TOKEN_2_Node_ extends BaseTokenNode {
            token:"?:";
            parent:Group_Node_8 | Group_Node_9;
          }
export type TOKEN_2_Node = TOKEN_2_Node_ & {userData:AstNodeUserDataType<["?:","token","ast"]>};
interface TOKEN_3_Node_ extends BaseTokenNode {
            token:")";
            parent:Group_Node_8 | Group_Node_9 | Group_Node_10 | Group_Node_11 | Group_Node_12 | Group_Node_13 | Anchor_Node_49 | Anchor_Node_50 | Anchor_Node_51 | Anchor_Node_52;
          }
export type TOKEN_3_Node = TOKEN_3_Node_ & {userData:AstNodeUserDataType<[")","token","ast"]>};
interface Group_Node_8_ extends BaseSymbolNode {
        symbol:"Group";
        
        children:[TOKEN_1_Node,TOKEN_2_Node,Expression_Node,TOKEN_3_Node,Quantifier_Node];
        parent:ExpressionItem_Node_5;
      }
type Group_Node_8 = Group_Node_8_ & {userData:AstNodeUserDataType<["Group","symbol","ast"]>};
interface Group_Node_9_ extends BaseSymbolNode {
        symbol:"Group";
        
        children:[TOKEN_1_Node,TOKEN_2_Node,Expression_Node,TOKEN_3_Node];
        parent:ExpressionItem_Node_5;
      }
type Group_Node_9 = Group_Node_9_ & {userData:AstNodeUserDataType<["Group","symbol","ast"]>};
interface Group_Node_10_ extends BaseSymbolNode {
        symbol:"Group";
        
        children:[TOKEN_1_Node,Expression_Node,TOKEN_3_Node,Quantifier_Node];
        parent:ExpressionItem_Node_5;
      }
type Group_Node_10 = Group_Node_10_ & {userData:AstNodeUserDataType<["Group","symbol","ast"]>};
interface Group_Node_11_ extends BaseSymbolNode {
        symbol:"Group";
        
        children:[TOKEN_1_Node,Expression_Node,TOKEN_3_Node];
        parent:ExpressionItem_Node_5;
      }
type Group_Node_11 = Group_Node_11_ & {userData:AstNodeUserDataType<["Group","symbol","ast"]>};
interface NamedGroupPrefix_Node_ extends BaseTokenNode {
            token:"namedGroupPrefix";
            parent:Group_Node_12 | Group_Node_13;
          }
export type NamedGroupPrefix_Node = NamedGroupPrefix_Node_ & {userData:AstNodeUserDataType<["namedGroupPrefix","token","ast"]>};
interface Group_Node_12_ extends BaseSymbolNode {
        symbol:"Group";
        
        children:[NamedGroupPrefix_Node,Expression_Node,TOKEN_3_Node,Quantifier_Node];
        parent:ExpressionItem_Node_5;
      }
type Group_Node_12 = Group_Node_12_ & {userData:AstNodeUserDataType<["Group","symbol","ast"]>};
interface Group_Node_13_ extends BaseSymbolNode {
        symbol:"Group";
        
        children:[NamedGroupPrefix_Node,Expression_Node,TOKEN_3_Node];
        parent:ExpressionItem_Node_5;
      }
type Group_Node_13 = Group_Node_13_ & {userData:AstNodeUserDataType<["Group","symbol","ast"]>};
interface Match_Node_14_ extends BaseSymbolNode {
        symbol:"Match";
        
        children:[MatchItem_Node,Quantifier_Node];
        parent:ExpressionItem_Node_4;
      }
type Match_Node_14 = Match_Node_14_ & {userData:AstNodeUserDataType<["Match","symbol","ast"]>};
interface Match_Node_15_ extends BaseSymbolNode {
        symbol:"Match";
        
        children:[MatchItem_Node];
        parent:ExpressionItem_Node_4;
      }
type Match_Node_15 = Match_Node_15_ & {userData:AstNodeUserDataType<["Match","symbol","ast"]>};
interface AnyChar_Node_ extends BaseTokenNode {
            token:"anyChar";
            parent:MatchItem_Node_16;
          }
export type AnyChar_Node = AnyChar_Node_ & {userData:AstNodeUserDataType<["anyChar","token","ast"]>};
interface MatchItem_Node_16_ extends BaseSymbolNode {
        symbol:"MatchItem";
        
        children:[AnyChar_Node];
        parent:Match_Node_14 | Match_Node_15;
      }
type MatchItem_Node_16 = MatchItem_Node_16_ & {userData:AstNodeUserDataType<["MatchItem","symbol","ast"]>};
interface MatchItem_Node_17_ extends BaseSymbolNode {
        symbol:"MatchItem";
        
        children:[MatchCharacterClass_Node];
        parent:Match_Node_14 | Match_Node_15;
      }
type MatchItem_Node_17 = MatchItem_Node_17_ & {userData:AstNodeUserDataType<["MatchItem","symbol","ast"]>};
interface Char_Node_ extends BaseTokenNode {
            token:"char";
            parent:MatchItem_Node_18 | CharacterRange_Node_32 | CharacterRange_Node_33;
          }
export type Char_Node = Char_Node_ & {userData:AstNodeUserDataType<["char","token","ast"]>};
interface MatchItem_Node_18_ extends BaseSymbolNode {
        symbol:"MatchItem";
        
        children:[Char_Node];
        parent:Match_Node_14 | Match_Node_15;
      }
type MatchItem_Node_18 = MatchItem_Node_18_ & {userData:AstNodeUserDataType<["MatchItem","symbol","ast"]>};
interface MatchCharacterClass_Node_19_ extends BaseSymbolNode {
        symbol:"MatchCharacterClass";
        
        children:[CharacterGroup_Node];
        parent:MatchItem_Node_17;
      }
type MatchCharacterClass_Node_19 = MatchCharacterClass_Node_19_ & {userData:AstNodeUserDataType<["MatchCharacterClass","symbol","ast"]>};
interface MatchCharacterClass_Node_20_ extends BaseSymbolNode {
        symbol:"MatchCharacterClass";
        
        children:[CharacterClass_Node];
        parent:MatchItem_Node_17;
      }
type MatchCharacterClass_Node_20 = MatchCharacterClass_Node_20_ & {userData:AstNodeUserDataType<["MatchCharacterClass","symbol","ast"]>};
interface TOKEN_4_Node_ extends BaseTokenNode {
            token:"[";
            parent:CharacterGroup_Node_21 | CharacterGroup_Node_22;
          }
export type TOKEN_4_Node = TOKEN_4_Node_ & {userData:AstNodeUserDataType<["[","token","ast"]>};
interface TOKEN_5_Node_ extends BaseTokenNode {
            token:"]";
            parent:CharacterGroup_Node_21 | CharacterGroup_Node_22;
          }
export type TOKEN_5_Node = TOKEN_5_Node_ & {userData:AstNodeUserDataType<["]","token","ast"]>};
interface CharacterGroup_Node_21_ extends BaseSymbolNode {
        symbol:"CharacterGroup";
        
        children:[TOKEN_4_Node,TOKEN_0_Node,CharacterGroupInner_Node,TOKEN_5_Node];
        parent:MatchCharacterClass_Node_19;
      }
type CharacterGroup_Node_21 = CharacterGroup_Node_21_ & {userData:AstNodeUserDataType<["CharacterGroup","symbol","ast"]>};
interface CharacterGroup_Node_22_ extends BaseSymbolNode {
        symbol:"CharacterGroup";
        
        children:[TOKEN_4_Node,CharacterGroupInner_Node,TOKEN_5_Node];
        parent:MatchCharacterClass_Node_19;
      }
type CharacterGroup_Node_22 = CharacterGroup_Node_22_ & {userData:AstNodeUserDataType<["CharacterGroup","symbol","ast"]>};
interface CharacterGroupInner_Node_ extends BaseSymbolNode {
        symbol:"CharacterGroupInner";
        
        children:[...ZeroOrMore<CharacterGroupItem_Node>];
        parent:CharacterGroup_Node_21 | CharacterGroup_Node_22;
      }
type CharacterGroupInner_Node = CharacterGroupInner_Node_ & {userData:AstNodeUserDataType<["CharacterGroupInner","symbol","ast"]>};
interface CharacterGroupItem_Node_24_ extends BaseSymbolNode {
        symbol:"CharacterGroupItem";
        
        children:[CharacterClass_Node];
        parent:CharacterGroupInner_Node;
      }
type CharacterGroupItem_Node_24 = CharacterGroupItem_Node_24_ & {userData:AstNodeUserDataType<["CharacterGroupItem","symbol","ast"]>};
interface CharacterGroupItem_Node_25_ extends BaseSymbolNode {
        symbol:"CharacterGroupItem";
        
        children:[CharacterRange_Node];
        parent:CharacterGroupInner_Node;
      }
type CharacterGroupItem_Node_25 = CharacterGroupItem_Node_25_ & {userData:AstNodeUserDataType<["CharacterGroupItem","symbol","ast"]>};
interface CharacterClassAnyWordInverted_Node_ extends BaseTokenNode {
            token:"characterClassAnyWordInverted";
            parent:CharacterClass_Node_26;
          }
export type CharacterClassAnyWordInverted_Node = CharacterClassAnyWordInverted_Node_ & {userData:AstNodeUserDataType<["characterClassAnyWordInverted","token","ast"]>};
interface CharacterClass_Node_26_ extends BaseSymbolNode {
        symbol:"CharacterClass";
        
        children:[CharacterClassAnyWordInverted_Node];
        parent:MatchCharacterClass_Node_20 | CharacterGroupItem_Node_24;
      }
type CharacterClass_Node_26 = CharacterClass_Node_26_ & {userData:AstNodeUserDataType<["CharacterClass","symbol","ast"]>};
interface CharacterClassAnyWord_Node_ extends BaseTokenNode {
            token:"characterClassAnyWord";
            parent:CharacterClass_Node_27;
          }
export type CharacterClassAnyWord_Node = CharacterClassAnyWord_Node_ & {userData:AstNodeUserDataType<["characterClassAnyWord","token","ast"]>};
interface CharacterClass_Node_27_ extends BaseSymbolNode {
        symbol:"CharacterClass";
        
        children:[CharacterClassAnyWord_Node];
        parent:MatchCharacterClass_Node_20 | CharacterGroupItem_Node_24;
      }
type CharacterClass_Node_27 = CharacterClass_Node_27_ & {userData:AstNodeUserDataType<["CharacterClass","symbol","ast"]>};
interface CharacterClassAnyDecimalDigit_Node_ extends BaseTokenNode {
            token:"characterClassAnyDecimalDigit";
            parent:CharacterClass_Node_28;
          }
export type CharacterClassAnyDecimalDigit_Node = CharacterClassAnyDecimalDigit_Node_ & {userData:AstNodeUserDataType<["characterClassAnyDecimalDigit","token","ast"]>};
interface CharacterClass_Node_28_ extends BaseSymbolNode {
        symbol:"CharacterClass";
        
        children:[CharacterClassAnyDecimalDigit_Node];
        parent:MatchCharacterClass_Node_20 | CharacterGroupItem_Node_24;
      }
type CharacterClass_Node_28 = CharacterClass_Node_28_ & {userData:AstNodeUserDataType<["CharacterClass","symbol","ast"]>};
interface CharacterClassAnyDecimalDigitInverted_Node_ extends BaseTokenNode {
            token:"characterClassAnyDecimalDigitInverted";
            parent:CharacterClass_Node_29;
          }
export type CharacterClassAnyDecimalDigitInverted_Node = CharacterClassAnyDecimalDigitInverted_Node_ & {userData:AstNodeUserDataType<["characterClassAnyDecimalDigitInverted","token","ast"]>};
interface CharacterClass_Node_29_ extends BaseSymbolNode {
        symbol:"CharacterClass";
        
        children:[CharacterClassAnyDecimalDigitInverted_Node];
        parent:MatchCharacterClass_Node_20 | CharacterGroupItem_Node_24;
      }
type CharacterClass_Node_29 = CharacterClass_Node_29_ & {userData:AstNodeUserDataType<["CharacterClass","symbol","ast"]>};
interface WhitespaceCharacter_Node_ extends BaseTokenNode {
            token:"whitespaceCharacter";
            parent:CharacterClass_Node_30;
          }
export type WhitespaceCharacter_Node = WhitespaceCharacter_Node_ & {userData:AstNodeUserDataType<["whitespaceCharacter","token","ast"]>};
interface CharacterClass_Node_30_ extends BaseSymbolNode {
        symbol:"CharacterClass";
        
        children:[WhitespaceCharacter_Node];
        parent:MatchCharacterClass_Node_20 | CharacterGroupItem_Node_24;
      }
type CharacterClass_Node_30 = CharacterClass_Node_30_ & {userData:AstNodeUserDataType<["CharacterClass","symbol","ast"]>};
interface WhitespaceCharacterInverted_Node_ extends BaseTokenNode {
            token:"whitespaceCharacterInverted";
            parent:CharacterClass_Node_31;
          }
export type WhitespaceCharacterInverted_Node = WhitespaceCharacterInverted_Node_ & {userData:AstNodeUserDataType<["whitespaceCharacterInverted","token","ast"]>};
interface CharacterClass_Node_31_ extends BaseSymbolNode {
        symbol:"CharacterClass";
        
        children:[WhitespaceCharacterInverted_Node];
        parent:MatchCharacterClass_Node_20 | CharacterGroupItem_Node_24;
      }
type CharacterClass_Node_31 = CharacterClass_Node_31_ & {userData:AstNodeUserDataType<["CharacterClass","symbol","ast"]>};
interface CharacterRange_Node_32_ extends BaseSymbolNode {
        symbol:"CharacterRange";
        
        children:[Char_Node];
        parent:CharacterGroupItem_Node_25;
      }
type CharacterRange_Node_32 = CharacterRange_Node_32_ & {userData:AstNodeUserDataType<["CharacterRange","symbol","ast"]>};
interface TOKEN_6_Node_ extends BaseTokenNode {
            token:"-";
            parent:CharacterRange_Node_33;
          }
export type TOKEN_6_Node = TOKEN_6_Node_ & {userData:AstNodeUserDataType<["-","token","ast"]>};
interface CharacterRange_Node_33_ extends BaseSymbolNode {
        symbol:"CharacterRange";
        
        children:[Char_Node,TOKEN_6_Node,Char_Node];
        parent:CharacterGroupItem_Node_25;
      }
type CharacterRange_Node_33 = CharacterRange_Node_33_ & {userData:AstNodeUserDataType<["CharacterRange","symbol","ast"]>};
interface OPTIONAL_Node_ extends BaseTokenNode {
            token:"OPTIONAL";
            parent:Quantifier_Node_34 | QuantifierType_Node_38;
          }
export type OPTIONAL_Node = OPTIONAL_Node_ & {userData:AstNodeUserDataType<["OPTIONAL","token","ast"]>};
interface Quantifier_Node_34_ extends BaseSymbolNode {
        symbol:"Quantifier";
        
        children:[QuantifierType_Node,OPTIONAL_Node];
        parent:Group_Node_8 | Group_Node_10 | Group_Node_12 | Match_Node_14;
      }
type Quantifier_Node_34 = Quantifier_Node_34_ & {userData:AstNodeUserDataType<["Quantifier","symbol","ast"]>};
interface Quantifier_Node_35_ extends BaseSymbolNode {
        symbol:"Quantifier";
        
        children:[QuantifierType_Node];
        parent:Group_Node_8 | Group_Node_10 | Group_Node_12 | Match_Node_14;
      }
type Quantifier_Node_35 = Quantifier_Node_35_ & {userData:AstNodeUserDataType<["Quantifier","symbol","ast"]>};
interface TOKEN_7_Node_ extends BaseTokenNode {
            token:"*";
            parent:QuantifierType_Node_36;
          }
export type TOKEN_7_Node = TOKEN_7_Node_ & {userData:AstNodeUserDataType<["*","token","ast"]>};
interface QuantifierType_Node_36_ extends BaseSymbolNode {
        symbol:"QuantifierType";
        
        children:[TOKEN_7_Node];
        parent:Quantifier_Node_34 | Quantifier_Node_35;
      }
type QuantifierType_Node_36 = QuantifierType_Node_36_ & {userData:AstNodeUserDataType<["QuantifierType","symbol","ast"]>};
interface TOKEN_8_Node_ extends BaseTokenNode {
            token:"+";
            parent:QuantifierType_Node_37;
          }
export type TOKEN_8_Node = TOKEN_8_Node_ & {userData:AstNodeUserDataType<["+","token","ast"]>};
interface QuantifierType_Node_37_ extends BaseSymbolNode {
        symbol:"QuantifierType";
        
        children:[TOKEN_8_Node];
        parent:Quantifier_Node_34 | Quantifier_Node_35;
      }
type QuantifierType_Node_37 = QuantifierType_Node_37_ & {userData:AstNodeUserDataType<["QuantifierType","symbol","ast"]>};
interface QuantifierType_Node_38_ extends BaseSymbolNode {
        symbol:"QuantifierType";
        
        children:[OPTIONAL_Node];
        parent:Quantifier_Node_34 | Quantifier_Node_35;
      }
type QuantifierType_Node_38 = QuantifierType_Node_38_ & {userData:AstNodeUserDataType<["QuantifierType","symbol","ast"]>};
interface TOKEN_9_Node_ extends BaseTokenNode {
            token:"{";
            parent:QuantifierType_Node_39 | QuantifierType_Node_40 | QuantifierType_Node_41;
          }
export type TOKEN_9_Node = TOKEN_9_Node_ & {userData:AstNodeUserDataType<["{","token","ast"]>};
interface Int_Node_ extends BaseTokenNode {
            token:"int";
            parent:QuantifierType_Node_39 | QuantifierType_Node_40 | QuantifierType_Node_41;
          }
export type Int_Node = Int_Node_ & {userData:AstNodeUserDataType<["int","token","ast"]>};
interface TOKEN_10_Node_ extends BaseTokenNode {
            token:"}";
            parent:QuantifierType_Node_39 | QuantifierType_Node_40 | QuantifierType_Node_41;
          }
export type TOKEN_10_Node = TOKEN_10_Node_ & {userData:AstNodeUserDataType<["}","token","ast"]>};
interface QuantifierType_Node_39_ extends BaseSymbolNode {
        symbol:"QuantifierType";
        
        children:[TOKEN_9_Node,Int_Node,TOKEN_10_Node];
        parent:Quantifier_Node_34 | Quantifier_Node_35;
      }
type QuantifierType_Node_39 = QuantifierType_Node_39_ & {userData:AstNodeUserDataType<["QuantifierType","symbol","ast"]>};
interface TOKEN_11_Node_ extends BaseTokenNode {
            token:",";
            parent:QuantifierType_Node_40 | QuantifierType_Node_41;
          }
export type TOKEN_11_Node = TOKEN_11_Node_ & {userData:AstNodeUserDataType<[",","token","ast"]>};
interface QuantifierType_Node_40_ extends BaseSymbolNode {
        symbol:"QuantifierType";
        
        children:[TOKEN_9_Node,Int_Node,TOKEN_11_Node,Int_Node,TOKEN_10_Node];
        parent:Quantifier_Node_34 | Quantifier_Node_35;
      }
type QuantifierType_Node_40 = QuantifierType_Node_40_ & {userData:AstNodeUserDataType<["QuantifierType","symbol","ast"]>};
interface QuantifierType_Node_41_ extends BaseSymbolNode {
        symbol:"QuantifierType";
        
        children:[TOKEN_9_Node,Int_Node,TOKEN_11_Node,TOKEN_10_Node];
        parent:Quantifier_Node_34 | Quantifier_Node_35;
      }
type QuantifierType_Node_41 = QuantifierType_Node_41_ & {userData:AstNodeUserDataType<["QuantifierType","symbol","ast"]>};
interface AnchorWordBoundary_Node_ extends BaseTokenNode {
            token:"anchorWordBoundary";
            parent:Anchor_Node_42;
          }
export type AnchorWordBoundary_Node = AnchorWordBoundary_Node_ & {userData:AstNodeUserDataType<["anchorWordBoundary","token","ast"]>};
interface Anchor_Node_42_ extends BaseSymbolNode {
        symbol:"Anchor";
        
        children:[AnchorWordBoundary_Node];
        parent:ExpressionItem_Node_6;
      }
type Anchor_Node_42 = Anchor_Node_42_ & {userData:AstNodeUserDataType<["Anchor","symbol","ast"]>};
interface AnchorNonWordBoundary_Node_ extends BaseTokenNode {
            token:"anchorNonWordBoundary";
            parent:Anchor_Node_43;
          }
export type AnchorNonWordBoundary_Node = AnchorNonWordBoundary_Node_ & {userData:AstNodeUserDataType<["anchorNonWordBoundary","token","ast"]>};
interface Anchor_Node_43_ extends BaseSymbolNode {
        symbol:"Anchor";
        
        children:[AnchorNonWordBoundary_Node];
        parent:ExpressionItem_Node_6;
      }
type Anchor_Node_43 = Anchor_Node_43_ & {userData:AstNodeUserDataType<["Anchor","symbol","ast"]>};
interface AnchorStartOfStringOnly_Node_ extends BaseTokenNode {
            token:"anchorStartOfStringOnly";
            parent:Anchor_Node_44;
          }
export type AnchorStartOfStringOnly_Node = AnchorStartOfStringOnly_Node_ & {userData:AstNodeUserDataType<["anchorStartOfStringOnly","token","ast"]>};
interface Anchor_Node_44_ extends BaseSymbolNode {
        symbol:"Anchor";
        
        children:[AnchorStartOfStringOnly_Node];
        parent:ExpressionItem_Node_6;
      }
type Anchor_Node_44 = Anchor_Node_44_ & {userData:AstNodeUserDataType<["Anchor","symbol","ast"]>};
interface AnchorEndOfStringOnlyNotNewline_Node_ extends BaseTokenNode {
            token:"anchorEndOfStringOnlyNotNewline";
            parent:Anchor_Node_45;
          }
export type AnchorEndOfStringOnlyNotNewline_Node = AnchorEndOfStringOnlyNotNewline_Node_ & {userData:AstNodeUserDataType<["anchorEndOfStringOnlyNotNewline","token","ast"]>};
interface Anchor_Node_45_ extends BaseSymbolNode {
        symbol:"Anchor";
        
        children:[AnchorEndOfStringOnlyNotNewline_Node];
        parent:ExpressionItem_Node_6;
      }
type Anchor_Node_45 = Anchor_Node_45_ & {userData:AstNodeUserDataType<["Anchor","symbol","ast"]>};
interface AnchorEndOfStringOnly_Node_ extends BaseTokenNode {
            token:"anchorEndOfStringOnly";
            parent:Anchor_Node_46;
          }
export type AnchorEndOfStringOnly_Node = AnchorEndOfStringOnly_Node_ & {userData:AstNodeUserDataType<["anchorEndOfStringOnly","token","ast"]>};
interface Anchor_Node_46_ extends BaseSymbolNode {
        symbol:"Anchor";
        
        children:[AnchorEndOfStringOnly_Node];
        parent:ExpressionItem_Node_6;
      }
type Anchor_Node_46 = Anchor_Node_46_ & {userData:AstNodeUserDataType<["Anchor","symbol","ast"]>};
interface AnchorPreviousMatchEnd_Node_ extends BaseTokenNode {
            token:"anchorPreviousMatchEnd";
            parent:Anchor_Node_47;
          }
export type AnchorPreviousMatchEnd_Node = AnchorPreviousMatchEnd_Node_ & {userData:AstNodeUserDataType<["anchorPreviousMatchEnd","token","ast"]>};
interface Anchor_Node_47_ extends BaseSymbolNode {
        symbol:"Anchor";
        
        children:[AnchorPreviousMatchEnd_Node];
        parent:ExpressionItem_Node_6;
      }
type Anchor_Node_47 = Anchor_Node_47_ & {userData:AstNodeUserDataType<["Anchor","symbol","ast"]>};
interface $_Node_ extends BaseTokenNode {
            token:"$";
            parent:Anchor_Node_48;
          }
export type $_Node = $_Node_ & {userData:AstNodeUserDataType<["$","token","ast"]>};
interface Anchor_Node_48_ extends BaseSymbolNode {
        symbol:"Anchor";
        
        children:[$_Node];
        parent:ExpressionItem_Node_6;
      }
type Anchor_Node_48 = Anchor_Node_48_ & {userData:AstNodeUserDataType<["Anchor","symbol","ast"]>};
interface Lookahead_Node_ extends BaseTokenNode {
            token:"lookahead";
            parent:Anchor_Node_49;
          }
export type Lookahead_Node = Lookahead_Node_ & {userData:AstNodeUserDataType<["lookahead","token","ast"]>};
interface Anchor_Node_49_ extends BaseSymbolNode {
        symbol:"Anchor";
        
        children:[Lookahead_Node,Expression_Node,TOKEN_3_Node];
        parent:ExpressionItem_Node_6;
      }
type Anchor_Node_49 = Anchor_Node_49_ & {userData:AstNodeUserDataType<["Anchor","symbol","ast"]>};
interface NegativeLookahead_Node_ extends BaseTokenNode {
            token:"negativeLookahead";
            parent:Anchor_Node_50;
          }
export type NegativeLookahead_Node = NegativeLookahead_Node_ & {userData:AstNodeUserDataType<["negativeLookahead","token","ast"]>};
interface Anchor_Node_50_ extends BaseSymbolNode {
        symbol:"Anchor";
        
        children:[NegativeLookahead_Node,Expression_Node,TOKEN_3_Node];
        parent:ExpressionItem_Node_6;
      }
type Anchor_Node_50 = Anchor_Node_50_ & {userData:AstNodeUserDataType<["Anchor","symbol","ast"]>};
interface Lookbehind_Node_ extends BaseTokenNode {
            token:"lookbehind";
            parent:Anchor_Node_51;
          }
export type Lookbehind_Node = Lookbehind_Node_ & {userData:AstNodeUserDataType<["lookbehind","token","ast"]>};
interface Anchor_Node_51_ extends BaseSymbolNode {
        symbol:"Anchor";
        
        children:[Lookbehind_Node,Expression_Node,TOKEN_3_Node];
        parent:ExpressionItem_Node_6;
      }
type Anchor_Node_51 = Anchor_Node_51_ & {userData:AstNodeUserDataType<["Anchor","symbol","ast"]>};
interface NegativeLookbehind_Node_ extends BaseTokenNode {
            token:"negativeLookbehind";
            parent:Anchor_Node_52;
          }
export type NegativeLookbehind_Node = NegativeLookbehind_Node_ & {userData:AstNodeUserDataType<["negativeLookbehind","token","ast"]>};
interface Anchor_Node_52_ extends BaseSymbolNode {
        symbol:"Anchor";
        
        children:[NegativeLookbehind_Node,Expression_Node,TOKEN_3_Node];
        parent:ExpressionItem_Node_6;
      }
type Anchor_Node_52 = Anchor_Node_52_ & {userData:AstNodeUserDataType<["Anchor","symbol","ast"]>};
interface TOKEN_12_Node_ extends BaseTokenNode {
            token:"|";
            parent:Expression_3_group_1_Parent_Node;
          }
export type TOKEN_12_Node = TOKEN_12_Node_ & {userData:AstNodeUserDataType<["|","token","ast"]>};
type Expression_3_group_1_Node  = [TOKEN_12_Node,SubExpression_Node];
export type Regexp_Node = Regexp_Node_0 | Regexp_Node_1;
export type { Expression_Node };
export type { SubExpression_Node };
export type ExpressionItem_Node = ExpressionItem_Node_4 | ExpressionItem_Node_5 | ExpressionItem_Node_6 | ExpressionItem_Node_7;
export type Group_Node = Group_Node_8 | Group_Node_9 | Group_Node_10 | Group_Node_11 | Group_Node_12 | Group_Node_13;
export type Match_Node = Match_Node_14 | Match_Node_15;
export type MatchItem_Node = MatchItem_Node_16 | MatchItem_Node_17 | MatchItem_Node_18;
export type MatchCharacterClass_Node = MatchCharacterClass_Node_19 | MatchCharacterClass_Node_20;
export type CharacterGroup_Node = CharacterGroup_Node_21 | CharacterGroup_Node_22;
export type { CharacterGroupInner_Node };
export type CharacterGroupItem_Node = CharacterGroupItem_Node_24 | CharacterGroupItem_Node_25;
export type CharacterClass_Node = CharacterClass_Node_26 | CharacterClass_Node_27 | CharacterClass_Node_28 | CharacterClass_Node_29 | CharacterClass_Node_30 | CharacterClass_Node_31;
export type CharacterRange_Node = CharacterRange_Node_32 | CharacterRange_Node_33;
export type Quantifier_Node = Quantifier_Node_34 | Quantifier_Node_35;
export type QuantifierType_Node = QuantifierType_Node_36 | QuantifierType_Node_37 | QuantifierType_Node_38 | QuantifierType_Node_39 | QuantifierType_Node_40 | QuantifierType_Node_41;
export type Anchor_Node = Anchor_Node_42 | Anchor_Node_43 | Anchor_Node_44 | Anchor_Node_45 | Anchor_Node_46 | Anchor_Node_47 | Anchor_Node_48 | Anchor_Node_49 | Anchor_Node_50 | Anchor_Node_51 | Anchor_Node_52;