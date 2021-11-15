// TODO: improve Tuple type
type Optional<T> = T | undefined;
type OneOrMore<T> = T extends Array<infer U> ? [...T, ...U[]] : [T, ...T[]];
type ZeroOrMore<T> = T extends Array<infer U> ? U[] : T[];

export type AstNode = AstSymbolNode | AstTokenNode;

// replace start
export type AstSymbolNode = Ast_Regexp_Node|Ast_Expression_Node|Ast_SubExpression_Node|Ast_ExpressionItem_Node|Ast_Group_Node|Ast_Match_Node|Ast_MatchItem_Node|Ast_MatchCharacterClass_Node|Ast_CharacterGroup_Node|Ast_CharacterGroupInner_Node|Ast_CharacterGroupItem_Node|Ast_CharacterClass_Node|Ast_CharacterRange_Node|Ast_Quantifier_Node|Ast_QuantifierType_Node|Ast_Anchor_Node;
export type AstTokenNode = Ast_$EOF_Node|Ast_$UNKNOWN_Node|Ast_TOKEN_0_Node|Ast_TOKEN_1_Node|Ast_Backreference_Node|Ast_TOKEN_2_Node|Ast_TOKEN_3_Node|Ast_TOKEN_4_Node|Ast_NamedGroupPrefix_Node|Ast_AnyChar_Node|Ast_Char_Node|Ast_TOKEN_5_Node|Ast_TOKEN_6_Node|Ast_CharacterClassAnyWordInverted_Node|Ast_CharacterClassAnyWord_Node|Ast_CharacterClassAnyDecimalDigit_Node|Ast_CharacterClassAnyDecimalDigitInverted_Node|Ast_WhitespaceCharacter_Node|Ast_WhitespaceCharacterInverted_Node|Ast_TOKEN_7_Node|Ast_OPTIONAL_Node|Ast_TOKEN_8_Node|Ast_TOKEN_9_Node|Ast_TOKEN_10_Node|Ast_Int_Node|Ast_TOKEN_11_Node|Ast_TOKEN_12_Node|Ast_AnchorWordBoundary_Node|Ast_AnchorNonWordBoundary_Node|Ast_AnchorStartOfStringOnly_Node|Ast_AnchorEndOfStringOnlyNotNewline_Node|Ast_AnchorEndOfStringOnly_Node|Ast_AnchorPreviousMatchEnd_Node|Ast_$_Node|Ast_Lookahead_Node|Ast_NegativeLookahead_Node|Ast_Lookbehind_Node|Ast_NegativeLookbehind_Node;
export type LiteralToken = "characterClassAnyWord"|"characterClassAnyWordInverted"|"whitespaceCharacter"|"whitespaceCharacterInverted"|"characterClassAnyDecimalDigit"|"characterClassAnyDecimalDigitInverted"|"anchorWordBoundary"|"anchorNonWordBoundary"|"anchorStartOfStringOnly"|"anchorEndOfStringOnlyNotNewline"|"anchorEndOfStringOnly"|"anchorPreviousMatchEnd"|"backreference"|"char"|"lookahead"|"negativeLookahead"|"lookbehind"|"negativeLookbehind"|"namedGroupPrefix"|"$"|"OPTIONAL"|"anyChar"|"int"|"$EOF"|"$UNKNOWN"|"^"|"|"|"("|"?:"|")"|"["|"]"|"-"|"*"|"+"|"{"|"}"|",";
export type AstRootNode = Ast_Regexp_Node;
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
}) => AstNode | AstNode[] | null;

export interface Token extends Position {
  text: string;
  t: string;
  more?: boolean;
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
  unicode?: boolean;
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
  startSymbol?: string;
  parseTree?: boolean;
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
Regexp: Ast_Regexp_Node;
Expression: Ast_Expression_Node;
SubExpression: Ast_SubExpression_Node;
ExpressionItem: Ast_ExpressionItem_Node;
Group: Ast_Group_Node;
Match: Ast_Match_Node;
MatchItem: Ast_MatchItem_Node;
MatchCharacterClass: Ast_MatchCharacterClass_Node;
CharacterGroup: Ast_CharacterGroup_Node;
CharacterGroupInner: Ast_CharacterGroupInner_Node;
CharacterGroupItem: Ast_CharacterGroupItem_Node;
CharacterClass: Ast_CharacterClass_Node;
CharacterRange: Ast_CharacterRange_Node;
Quantifier: Ast_Quantifier_Node;
QuantifierType: Ast_QuantifierType_Node;
Anchor: Ast_Anchor_Node;
$EOF: Ast_$EOF_Node;
$UNKNOWN: Ast_$UNKNOWN_Node;
TOKEN_0: Ast_TOKEN_0_Node;
TOKEN_1: Ast_TOKEN_1_Node;
backreference: Ast_Backreference_Node;
TOKEN_2: Ast_TOKEN_2_Node;
TOKEN_3: Ast_TOKEN_3_Node;
TOKEN_4: Ast_TOKEN_4_Node;
namedGroupPrefix: Ast_NamedGroupPrefix_Node;
anyChar: Ast_AnyChar_Node;
char: Ast_Char_Node;
TOKEN_5: Ast_TOKEN_5_Node;
TOKEN_6: Ast_TOKEN_6_Node;
characterClassAnyWordInverted: Ast_CharacterClassAnyWordInverted_Node;
characterClassAnyWord: Ast_CharacterClassAnyWord_Node;
characterClassAnyDecimalDigit: Ast_CharacterClassAnyDecimalDigit_Node;
characterClassAnyDecimalDigitInverted: Ast_CharacterClassAnyDecimalDigitInverted_Node;
whitespaceCharacter: Ast_WhitespaceCharacter_Node;
whitespaceCharacterInverted: Ast_WhitespaceCharacterInverted_Node;
TOKEN_7: Ast_TOKEN_7_Node;
OPTIONAL: Ast_OPTIONAL_Node;
TOKEN_8: Ast_TOKEN_8_Node;
TOKEN_9: Ast_TOKEN_9_Node;
TOKEN_10: Ast_TOKEN_10_Node;
int: Ast_Int_Node;
TOKEN_11: Ast_TOKEN_11_Node;
TOKEN_12: Ast_TOKEN_12_Node;
anchorWordBoundary: Ast_AnchorWordBoundary_Node;
anchorNonWordBoundary: Ast_AnchorNonWordBoundary_Node;
anchorStartOfStringOnly: Ast_AnchorStartOfStringOnly_Node;
anchorEndOfStringOnlyNotNewline: Ast_AnchorEndOfStringOnlyNotNewline_Node;
anchorEndOfStringOnly: Ast_AnchorEndOfStringOnly_Node;
anchorPreviousMatchEnd: Ast_AnchorPreviousMatchEnd_Node;
$: Ast_$_Node;
lookahead: Ast_Lookahead_Node;
negativeLookahead: Ast_NegativeLookahead_Node;
lookbehind: Ast_Lookbehind_Node;
negativeLookbehind: Ast_NegativeLookbehind_Node;
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

declare const parser: {
  parse: typeof parse, lex: typeof lex, lexer: {
    getCurrentToken: Token;
    getLastToken(filter?: (token: Token) => boolean): Token;
  }
};

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
interface Ast_$EOF_Node_ extends BaseTokenNode {
      token:"$EOF";
      parent:AstSymbolNode;
    }
export type Ast_$EOF_Node = Ast_$EOF_Node_ & {userData:AstNodeUserDataType<["$EOF","token","ast"]>};
interface Ast_$UNKNOWN_Node_ extends BaseTokenNode {
      token:"$UNKNOWN";
      parent:AstSymbolNode;
    }
export type Ast_$UNKNOWN_Node = Ast_$UNKNOWN_Node_ & {userData:AstNodeUserDataType<["$UNKNOWN","token","ast"]>};

        type Ast_Expression_group_def_2_Parent_Node = Ast_Expression_Node;
        
interface Ast_TOKEN_0_Node_ extends BaseTokenNode {
            token:"^";
            parent:Ast_Regexp_Node_0 | Ast_CharacterGroup_Node_22;
          }
export type Ast_TOKEN_0_Node = Ast_TOKEN_0_Node_ & {userData:AstNodeUserDataType<["^","token","ast"]>};
interface Ast_Regexp_Node_0_ extends BaseSymbolNode {
        symbol:"Regexp";
        
        children:[Ast_TOKEN_0_Node,Ast_Expression_Node];
        
      }
type Ast_Regexp_Node_0 = Ast_Regexp_Node_0_ & {userData:AstNodeUserDataType<["Regexp","symbol","ast"]>};
interface Ast_Regexp_Node_1_ extends BaseSymbolNode {
        symbol:"Regexp";
        
        children:[Ast_Expression_Node];
        
      }
type Ast_Regexp_Node_1 = Ast_Regexp_Node_1_ & {userData:AstNodeUserDataType<["Regexp","symbol","ast"]>};
interface Ast_TOKEN_1_Node_ extends BaseTokenNode {
            token:"|";
            parent:Ast_Expression_group_def_2_Parent_Node;
          }
export type Ast_TOKEN_1_Node = Ast_TOKEN_1_Node_ & {userData:AstNodeUserDataType<["|","token","ast"]>};
type Ast_Expression_group_def_2_Node  = [Ast_TOKEN_1_Node,Ast_SubExpression_Node];
interface Ast_Expression_Node_ extends BaseSymbolNode {
        symbol:"Expression";
        
        children:[Ast_SubExpression_Node,...ZeroOrMore<Ast_Expression_group_def_2_Node>];
        parent:Ast_Regexp_Node_0 | Ast_Regexp_Node_1 | Ast_Group_Node_9 | Ast_Group_Node_10 | Ast_Group_Node_11 | Ast_Group_Node_12 | Ast_Group_Node_13 | Ast_Group_Node_14 | Ast_Anchor_Node_50 | Ast_Anchor_Node_51 | Ast_Anchor_Node_52 | Ast_Anchor_Node_53;
      }
type Ast_Expression_Node = Ast_Expression_Node_ & {userData:AstNodeUserDataType<["Expression","symbol","ast"]>};
interface Ast_SubExpression_Node_ extends BaseSymbolNode {
        symbol:"SubExpression";
        
        children:[...ZeroOrMore<Ast_ExpressionItem_Node>];
        parent:Ast_Expression_group_def_2_Parent_Node | Ast_Expression_Node;
      }
type Ast_SubExpression_Node = Ast_SubExpression_Node_ & {userData:AstNodeUserDataType<["SubExpression","symbol","ast"]>};
interface Ast_ExpressionItem_Node_5_ extends BaseSymbolNode {
        symbol:"ExpressionItem";
        
        children:[Ast_Match_Node];
        parent:Ast_SubExpression_Node;
      }
type Ast_ExpressionItem_Node_5 = Ast_ExpressionItem_Node_5_ & {userData:AstNodeUserDataType<["ExpressionItem","symbol","ast"]>};
interface Ast_ExpressionItem_Node_6_ extends BaseSymbolNode {
        symbol:"ExpressionItem";
        
        children:[Ast_Group_Node];
        parent:Ast_SubExpression_Node;
      }
type Ast_ExpressionItem_Node_6 = Ast_ExpressionItem_Node_6_ & {userData:AstNodeUserDataType<["ExpressionItem","symbol","ast"]>};
interface Ast_ExpressionItem_Node_7_ extends BaseSymbolNode {
        symbol:"ExpressionItem";
        
        children:[Ast_Anchor_Node];
        parent:Ast_SubExpression_Node;
      }
type Ast_ExpressionItem_Node_7 = Ast_ExpressionItem_Node_7_ & {userData:AstNodeUserDataType<["ExpressionItem","symbol","ast"]>};
interface Ast_Backreference_Node_ extends BaseTokenNode {
            token:"backreference";
            parent:Ast_ExpressionItem_Node_8;
          }
export type Ast_Backreference_Node = Ast_Backreference_Node_ & {userData:AstNodeUserDataType<["backreference","token","ast"]>};
interface Ast_ExpressionItem_Node_8_ extends BaseSymbolNode {
        symbol:"ExpressionItem";
        
        children:[Ast_Backreference_Node];
        parent:Ast_SubExpression_Node;
      }
type Ast_ExpressionItem_Node_8 = Ast_ExpressionItem_Node_8_ & {userData:AstNodeUserDataType<["ExpressionItem","symbol","ast"]>};
interface Ast_TOKEN_2_Node_ extends BaseTokenNode {
            token:"(";
            parent:Ast_Group_Node_9 | Ast_Group_Node_10 | Ast_Group_Node_11 | Ast_Group_Node_12;
          }
export type Ast_TOKEN_2_Node = Ast_TOKEN_2_Node_ & {userData:AstNodeUserDataType<["(","token","ast"]>};
interface Ast_TOKEN_3_Node_ extends BaseTokenNode {
            token:"?:";
            parent:Ast_Group_Node_9 | Ast_Group_Node_10;
          }
export type Ast_TOKEN_3_Node = Ast_TOKEN_3_Node_ & {userData:AstNodeUserDataType<["?:","token","ast"]>};
interface Ast_TOKEN_4_Node_ extends BaseTokenNode {
            token:")";
            parent:Ast_Group_Node_9 | Ast_Group_Node_10 | Ast_Group_Node_11 | Ast_Group_Node_12 | Ast_Group_Node_13 | Ast_Group_Node_14 | Ast_Anchor_Node_50 | Ast_Anchor_Node_51 | Ast_Anchor_Node_52 | Ast_Anchor_Node_53;
          }
export type Ast_TOKEN_4_Node = Ast_TOKEN_4_Node_ & {userData:AstNodeUserDataType<[")","token","ast"]>};
interface Ast_Group_Node_9_ extends BaseSymbolNode {
        symbol:"Group";
        
        children:[Ast_TOKEN_2_Node,Ast_TOKEN_3_Node,Ast_Expression_Node,Ast_TOKEN_4_Node,Ast_Quantifier_Node];
        parent:Ast_ExpressionItem_Node_6;
      }
type Ast_Group_Node_9 = Ast_Group_Node_9_ & {userData:AstNodeUserDataType<["Group","symbol","ast"]>};
interface Ast_Group_Node_10_ extends BaseSymbolNode {
        symbol:"Group";
        
        children:[Ast_TOKEN_2_Node,Ast_TOKEN_3_Node,Ast_Expression_Node,Ast_TOKEN_4_Node];
        parent:Ast_ExpressionItem_Node_6;
      }
type Ast_Group_Node_10 = Ast_Group_Node_10_ & {userData:AstNodeUserDataType<["Group","symbol","ast"]>};
interface Ast_Group_Node_11_ extends BaseSymbolNode {
        symbol:"Group";
        
        children:[Ast_TOKEN_2_Node,Ast_Expression_Node,Ast_TOKEN_4_Node,Ast_Quantifier_Node];
        parent:Ast_ExpressionItem_Node_6;
      }
type Ast_Group_Node_11 = Ast_Group_Node_11_ & {userData:AstNodeUserDataType<["Group","symbol","ast"]>};
interface Ast_Group_Node_12_ extends BaseSymbolNode {
        symbol:"Group";
        
        children:[Ast_TOKEN_2_Node,Ast_Expression_Node,Ast_TOKEN_4_Node];
        parent:Ast_ExpressionItem_Node_6;
      }
type Ast_Group_Node_12 = Ast_Group_Node_12_ & {userData:AstNodeUserDataType<["Group","symbol","ast"]>};
interface Ast_NamedGroupPrefix_Node_ extends BaseTokenNode {
            token:"namedGroupPrefix";
            parent:Ast_Group_Node_13 | Ast_Group_Node_14;
          }
export type Ast_NamedGroupPrefix_Node = Ast_NamedGroupPrefix_Node_ & {userData:AstNodeUserDataType<["namedGroupPrefix","token","ast"]>};
interface Ast_Group_Node_13_ extends BaseSymbolNode {
        symbol:"Group";
        
        children:[Ast_NamedGroupPrefix_Node,Ast_Expression_Node,Ast_TOKEN_4_Node,Ast_Quantifier_Node];
        parent:Ast_ExpressionItem_Node_6;
      }
type Ast_Group_Node_13 = Ast_Group_Node_13_ & {userData:AstNodeUserDataType<["Group","symbol","ast"]>};
interface Ast_Group_Node_14_ extends BaseSymbolNode {
        symbol:"Group";
        
        children:[Ast_NamedGroupPrefix_Node,Ast_Expression_Node,Ast_TOKEN_4_Node];
        parent:Ast_ExpressionItem_Node_6;
      }
type Ast_Group_Node_14 = Ast_Group_Node_14_ & {userData:AstNodeUserDataType<["Group","symbol","ast"]>};
interface Ast_Match_Node_15_ extends BaseSymbolNode {
        symbol:"Match";
        
        children:[Ast_MatchItem_Node,Ast_Quantifier_Node];
        parent:Ast_ExpressionItem_Node_5;
      }
type Ast_Match_Node_15 = Ast_Match_Node_15_ & {userData:AstNodeUserDataType<["Match","symbol","ast"]>};
interface Ast_Match_Node_16_ extends BaseSymbolNode {
        symbol:"Match";
        
        children:[Ast_MatchItem_Node];
        parent:Ast_ExpressionItem_Node_5;
      }
type Ast_Match_Node_16 = Ast_Match_Node_16_ & {userData:AstNodeUserDataType<["Match","symbol","ast"]>};
interface Ast_AnyChar_Node_ extends BaseTokenNode {
            token:"anyChar";
            parent:Ast_MatchItem_Node_17;
          }
export type Ast_AnyChar_Node = Ast_AnyChar_Node_ & {userData:AstNodeUserDataType<["anyChar","token","ast"]>};
interface Ast_MatchItem_Node_17_ extends BaseSymbolNode {
        symbol:"MatchItem";
        
        children:[Ast_AnyChar_Node];
        parent:Ast_Match_Node_15 | Ast_Match_Node_16;
      }
type Ast_MatchItem_Node_17 = Ast_MatchItem_Node_17_ & {userData:AstNodeUserDataType<["MatchItem","symbol","ast"]>};
interface Ast_MatchItem_Node_18_ extends BaseSymbolNode {
        symbol:"MatchItem";
        
        children:[Ast_MatchCharacterClass_Node];
        parent:Ast_Match_Node_15 | Ast_Match_Node_16;
      }
type Ast_MatchItem_Node_18 = Ast_MatchItem_Node_18_ & {userData:AstNodeUserDataType<["MatchItem","symbol","ast"]>};
interface Ast_Char_Node_ extends BaseTokenNode {
            token:"char";
            parent:Ast_MatchItem_Node_19 | Ast_CharacterRange_Node_33 | Ast_CharacterRange_Node_34;
          }
export type Ast_Char_Node = Ast_Char_Node_ & {userData:AstNodeUserDataType<["char","token","ast"]>};
interface Ast_MatchItem_Node_19_ extends BaseSymbolNode {
        symbol:"MatchItem";
        
        children:[Ast_Char_Node];
        parent:Ast_Match_Node_15 | Ast_Match_Node_16;
      }
type Ast_MatchItem_Node_19 = Ast_MatchItem_Node_19_ & {userData:AstNodeUserDataType<["MatchItem","symbol","ast"]>};
interface Ast_MatchCharacterClass_Node_20_ extends BaseSymbolNode {
        symbol:"MatchCharacterClass";
        
        children:[Ast_CharacterGroup_Node];
        parent:Ast_MatchItem_Node_18;
      }
type Ast_MatchCharacterClass_Node_20 = Ast_MatchCharacterClass_Node_20_ & {userData:AstNodeUserDataType<["MatchCharacterClass","symbol","ast"]>};
interface Ast_MatchCharacterClass_Node_21_ extends BaseSymbolNode {
        symbol:"MatchCharacterClass";
        
        children:[Ast_CharacterClass_Node];
        parent:Ast_MatchItem_Node_18;
      }
type Ast_MatchCharacterClass_Node_21 = Ast_MatchCharacterClass_Node_21_ & {userData:AstNodeUserDataType<["MatchCharacterClass","symbol","ast"]>};
interface Ast_TOKEN_5_Node_ extends BaseTokenNode {
            token:"[";
            parent:Ast_CharacterGroup_Node_22 | Ast_CharacterGroup_Node_23;
          }
export type Ast_TOKEN_5_Node = Ast_TOKEN_5_Node_ & {userData:AstNodeUserDataType<["[","token","ast"]>};
interface Ast_TOKEN_6_Node_ extends BaseTokenNode {
            token:"]";
            parent:Ast_CharacterGroup_Node_22 | Ast_CharacterGroup_Node_23;
          }
export type Ast_TOKEN_6_Node = Ast_TOKEN_6_Node_ & {userData:AstNodeUserDataType<["]","token","ast"]>};
interface Ast_CharacterGroup_Node_22_ extends BaseSymbolNode {
        symbol:"CharacterGroup";
        
        children:[Ast_TOKEN_5_Node,Ast_TOKEN_0_Node,Ast_CharacterGroupInner_Node,Ast_TOKEN_6_Node];
        parent:Ast_MatchCharacterClass_Node_20;
      }
type Ast_CharacterGroup_Node_22 = Ast_CharacterGroup_Node_22_ & {userData:AstNodeUserDataType<["CharacterGroup","symbol","ast"]>};
interface Ast_CharacterGroup_Node_23_ extends BaseSymbolNode {
        symbol:"CharacterGroup";
        
        children:[Ast_TOKEN_5_Node,Ast_CharacterGroupInner_Node,Ast_TOKEN_6_Node];
        parent:Ast_MatchCharacterClass_Node_20;
      }
type Ast_CharacterGroup_Node_23 = Ast_CharacterGroup_Node_23_ & {userData:AstNodeUserDataType<["CharacterGroup","symbol","ast"]>};
interface Ast_CharacterGroupInner_Node_ extends BaseSymbolNode {
        symbol:"CharacterGroupInner";
        
        children:[...ZeroOrMore<Ast_CharacterGroupItem_Node>];
        parent:Ast_CharacterGroup_Node_22 | Ast_CharacterGroup_Node_23;
      }
type Ast_CharacterGroupInner_Node = Ast_CharacterGroupInner_Node_ & {userData:AstNodeUserDataType<["CharacterGroupInner","symbol","ast"]>};
interface Ast_CharacterGroupItem_Node_25_ extends BaseSymbolNode {
        symbol:"CharacterGroupItem";
        
        children:[Ast_CharacterClass_Node];
        parent:Ast_CharacterGroupInner_Node;
      }
type Ast_CharacterGroupItem_Node_25 = Ast_CharacterGroupItem_Node_25_ & {userData:AstNodeUserDataType<["CharacterGroupItem","symbol","ast"]>};
interface Ast_CharacterGroupItem_Node_26_ extends BaseSymbolNode {
        symbol:"CharacterGroupItem";
        
        children:[Ast_CharacterRange_Node];
        parent:Ast_CharacterGroupInner_Node;
      }
type Ast_CharacterGroupItem_Node_26 = Ast_CharacterGroupItem_Node_26_ & {userData:AstNodeUserDataType<["CharacterGroupItem","symbol","ast"]>};
interface Ast_CharacterClassAnyWordInverted_Node_ extends BaseTokenNode {
            token:"characterClassAnyWordInverted";
            parent:Ast_CharacterClass_Node_27;
          }
export type Ast_CharacterClassAnyWordInverted_Node = Ast_CharacterClassAnyWordInverted_Node_ & {userData:AstNodeUserDataType<["characterClassAnyWordInverted","token","ast"]>};
interface Ast_CharacterClass_Node_27_ extends BaseSymbolNode {
        symbol:"CharacterClass";
        
        children:[Ast_CharacterClassAnyWordInverted_Node];
        parent:Ast_MatchCharacterClass_Node_21 | Ast_CharacterGroupItem_Node_25;
      }
type Ast_CharacterClass_Node_27 = Ast_CharacterClass_Node_27_ & {userData:AstNodeUserDataType<["CharacterClass","symbol","ast"]>};
interface Ast_CharacterClassAnyWord_Node_ extends BaseTokenNode {
            token:"characterClassAnyWord";
            parent:Ast_CharacterClass_Node_28;
          }
export type Ast_CharacterClassAnyWord_Node = Ast_CharacterClassAnyWord_Node_ & {userData:AstNodeUserDataType<["characterClassAnyWord","token","ast"]>};
interface Ast_CharacterClass_Node_28_ extends BaseSymbolNode {
        symbol:"CharacterClass";
        
        children:[Ast_CharacterClassAnyWord_Node];
        parent:Ast_MatchCharacterClass_Node_21 | Ast_CharacterGroupItem_Node_25;
      }
type Ast_CharacterClass_Node_28 = Ast_CharacterClass_Node_28_ & {userData:AstNodeUserDataType<["CharacterClass","symbol","ast"]>};
interface Ast_CharacterClassAnyDecimalDigit_Node_ extends BaseTokenNode {
            token:"characterClassAnyDecimalDigit";
            parent:Ast_CharacterClass_Node_29;
          }
export type Ast_CharacterClassAnyDecimalDigit_Node = Ast_CharacterClassAnyDecimalDigit_Node_ & {userData:AstNodeUserDataType<["characterClassAnyDecimalDigit","token","ast"]>};
interface Ast_CharacterClass_Node_29_ extends BaseSymbolNode {
        symbol:"CharacterClass";
        
        children:[Ast_CharacterClassAnyDecimalDigit_Node];
        parent:Ast_MatchCharacterClass_Node_21 | Ast_CharacterGroupItem_Node_25;
      }
type Ast_CharacterClass_Node_29 = Ast_CharacterClass_Node_29_ & {userData:AstNodeUserDataType<["CharacterClass","symbol","ast"]>};
interface Ast_CharacterClassAnyDecimalDigitInverted_Node_ extends BaseTokenNode {
            token:"characterClassAnyDecimalDigitInverted";
            parent:Ast_CharacterClass_Node_30;
          }
export type Ast_CharacterClassAnyDecimalDigitInverted_Node = Ast_CharacterClassAnyDecimalDigitInverted_Node_ & {userData:AstNodeUserDataType<["characterClassAnyDecimalDigitInverted","token","ast"]>};
interface Ast_CharacterClass_Node_30_ extends BaseSymbolNode {
        symbol:"CharacterClass";
        
        children:[Ast_CharacterClassAnyDecimalDigitInverted_Node];
        parent:Ast_MatchCharacterClass_Node_21 | Ast_CharacterGroupItem_Node_25;
      }
type Ast_CharacterClass_Node_30 = Ast_CharacterClass_Node_30_ & {userData:AstNodeUserDataType<["CharacterClass","symbol","ast"]>};
interface Ast_WhitespaceCharacter_Node_ extends BaseTokenNode {
            token:"whitespaceCharacter";
            parent:Ast_CharacterClass_Node_31;
          }
export type Ast_WhitespaceCharacter_Node = Ast_WhitespaceCharacter_Node_ & {userData:AstNodeUserDataType<["whitespaceCharacter","token","ast"]>};
interface Ast_CharacterClass_Node_31_ extends BaseSymbolNode {
        symbol:"CharacterClass";
        
        children:[Ast_WhitespaceCharacter_Node];
        parent:Ast_MatchCharacterClass_Node_21 | Ast_CharacterGroupItem_Node_25;
      }
type Ast_CharacterClass_Node_31 = Ast_CharacterClass_Node_31_ & {userData:AstNodeUserDataType<["CharacterClass","symbol","ast"]>};
interface Ast_WhitespaceCharacterInverted_Node_ extends BaseTokenNode {
            token:"whitespaceCharacterInverted";
            parent:Ast_CharacterClass_Node_32;
          }
export type Ast_WhitespaceCharacterInverted_Node = Ast_WhitespaceCharacterInverted_Node_ & {userData:AstNodeUserDataType<["whitespaceCharacterInverted","token","ast"]>};
interface Ast_CharacterClass_Node_32_ extends BaseSymbolNode {
        symbol:"CharacterClass";
        
        children:[Ast_WhitespaceCharacterInverted_Node];
        parent:Ast_MatchCharacterClass_Node_21 | Ast_CharacterGroupItem_Node_25;
      }
type Ast_CharacterClass_Node_32 = Ast_CharacterClass_Node_32_ & {userData:AstNodeUserDataType<["CharacterClass","symbol","ast"]>};
interface Ast_CharacterRange_Node_33_ extends BaseSymbolNode {
        symbol:"CharacterRange";
        
        children:[Ast_Char_Node];
        parent:Ast_CharacterGroupItem_Node_26;
      }
type Ast_CharacterRange_Node_33 = Ast_CharacterRange_Node_33_ & {userData:AstNodeUserDataType<["CharacterRange","symbol","ast"]>};
interface Ast_TOKEN_7_Node_ extends BaseTokenNode {
            token:"-";
            parent:Ast_CharacterRange_Node_34;
          }
export type Ast_TOKEN_7_Node = Ast_TOKEN_7_Node_ & {userData:AstNodeUserDataType<["-","token","ast"]>};
interface Ast_CharacterRange_Node_34_ extends BaseSymbolNode {
        symbol:"CharacterRange";
        
        children:[Ast_Char_Node,Ast_TOKEN_7_Node,Ast_Char_Node];
        parent:Ast_CharacterGroupItem_Node_26;
      }
type Ast_CharacterRange_Node_34 = Ast_CharacterRange_Node_34_ & {userData:AstNodeUserDataType<["CharacterRange","symbol","ast"]>};
interface Ast_OPTIONAL_Node_ extends BaseTokenNode {
            token:"OPTIONAL";
            parent:Ast_Quantifier_Node_35 | Ast_QuantifierType_Node_39;
          }
export type Ast_OPTIONAL_Node = Ast_OPTIONAL_Node_ & {userData:AstNodeUserDataType<["OPTIONAL","token","ast"]>};
interface Ast_Quantifier_Node_35_ extends BaseSymbolNode {
        symbol:"Quantifier";
        
        children:[Ast_QuantifierType_Node,Ast_OPTIONAL_Node];
        parent:Ast_Group_Node_9 | Ast_Group_Node_11 | Ast_Group_Node_13 | Ast_Match_Node_15;
      }
type Ast_Quantifier_Node_35 = Ast_Quantifier_Node_35_ & {userData:AstNodeUserDataType<["Quantifier","symbol","ast"]>};
interface Ast_Quantifier_Node_36_ extends BaseSymbolNode {
        symbol:"Quantifier";
        
        children:[Ast_QuantifierType_Node];
        parent:Ast_Group_Node_9 | Ast_Group_Node_11 | Ast_Group_Node_13 | Ast_Match_Node_15;
      }
type Ast_Quantifier_Node_36 = Ast_Quantifier_Node_36_ & {userData:AstNodeUserDataType<["Quantifier","symbol","ast"]>};
interface Ast_TOKEN_8_Node_ extends BaseTokenNode {
            token:"*";
            parent:Ast_QuantifierType_Node_37;
          }
export type Ast_TOKEN_8_Node = Ast_TOKEN_8_Node_ & {userData:AstNodeUserDataType<["*","token","ast"]>};
interface Ast_QuantifierType_Node_37_ extends BaseSymbolNode {
        symbol:"QuantifierType";
        
        children:[Ast_TOKEN_8_Node];
        parent:Ast_Quantifier_Node_35 | Ast_Quantifier_Node_36;
      }
type Ast_QuantifierType_Node_37 = Ast_QuantifierType_Node_37_ & {userData:AstNodeUserDataType<["QuantifierType","symbol","ast"]>};
interface Ast_TOKEN_9_Node_ extends BaseTokenNode {
            token:"+";
            parent:Ast_QuantifierType_Node_38;
          }
export type Ast_TOKEN_9_Node = Ast_TOKEN_9_Node_ & {userData:AstNodeUserDataType<["+","token","ast"]>};
interface Ast_QuantifierType_Node_38_ extends BaseSymbolNode {
        symbol:"QuantifierType";
        
        children:[Ast_TOKEN_9_Node];
        parent:Ast_Quantifier_Node_35 | Ast_Quantifier_Node_36;
      }
type Ast_QuantifierType_Node_38 = Ast_QuantifierType_Node_38_ & {userData:AstNodeUserDataType<["QuantifierType","symbol","ast"]>};
interface Ast_QuantifierType_Node_39_ extends BaseSymbolNode {
        symbol:"QuantifierType";
        
        children:[Ast_OPTIONAL_Node];
        parent:Ast_Quantifier_Node_35 | Ast_Quantifier_Node_36;
      }
type Ast_QuantifierType_Node_39 = Ast_QuantifierType_Node_39_ & {userData:AstNodeUserDataType<["QuantifierType","symbol","ast"]>};
interface Ast_TOKEN_10_Node_ extends BaseTokenNode {
            token:"{";
            parent:Ast_QuantifierType_Node_40 | Ast_QuantifierType_Node_41 | Ast_QuantifierType_Node_42;
          }
export type Ast_TOKEN_10_Node = Ast_TOKEN_10_Node_ & {userData:AstNodeUserDataType<["{","token","ast"]>};
interface Ast_Int_Node_ extends BaseTokenNode {
            token:"int";
            parent:Ast_QuantifierType_Node_40 | Ast_QuantifierType_Node_41 | Ast_QuantifierType_Node_42;
          }
export type Ast_Int_Node = Ast_Int_Node_ & {userData:AstNodeUserDataType<["int","token","ast"]>};
interface Ast_TOKEN_11_Node_ extends BaseTokenNode {
            token:"}";
            parent:Ast_QuantifierType_Node_40 | Ast_QuantifierType_Node_41 | Ast_QuantifierType_Node_42;
          }
export type Ast_TOKEN_11_Node = Ast_TOKEN_11_Node_ & {userData:AstNodeUserDataType<["}","token","ast"]>};
interface Ast_QuantifierType_Node_40_ extends BaseSymbolNode {
        symbol:"QuantifierType";
        
        children:[Ast_TOKEN_10_Node,Ast_Int_Node,Ast_TOKEN_11_Node];
        parent:Ast_Quantifier_Node_35 | Ast_Quantifier_Node_36;
      }
type Ast_QuantifierType_Node_40 = Ast_QuantifierType_Node_40_ & {userData:AstNodeUserDataType<["QuantifierType","symbol","ast"]>};
interface Ast_TOKEN_12_Node_ extends BaseTokenNode {
            token:",";
            parent:Ast_QuantifierType_Node_41 | Ast_QuantifierType_Node_42;
          }
export type Ast_TOKEN_12_Node = Ast_TOKEN_12_Node_ & {userData:AstNodeUserDataType<[",","token","ast"]>};
interface Ast_QuantifierType_Node_41_ extends BaseSymbolNode {
        symbol:"QuantifierType";
        
        children:[Ast_TOKEN_10_Node,Ast_Int_Node,Ast_TOKEN_12_Node,Ast_Int_Node,Ast_TOKEN_11_Node];
        parent:Ast_Quantifier_Node_35 | Ast_Quantifier_Node_36;
      }
type Ast_QuantifierType_Node_41 = Ast_QuantifierType_Node_41_ & {userData:AstNodeUserDataType<["QuantifierType","symbol","ast"]>};
interface Ast_QuantifierType_Node_42_ extends BaseSymbolNode {
        symbol:"QuantifierType";
        
        children:[Ast_TOKEN_10_Node,Ast_Int_Node,Ast_TOKEN_12_Node,Ast_TOKEN_11_Node];
        parent:Ast_Quantifier_Node_35 | Ast_Quantifier_Node_36;
      }
type Ast_QuantifierType_Node_42 = Ast_QuantifierType_Node_42_ & {userData:AstNodeUserDataType<["QuantifierType","symbol","ast"]>};
interface Ast_AnchorWordBoundary_Node_ extends BaseTokenNode {
            token:"anchorWordBoundary";
            parent:Ast_Anchor_Node_43;
          }
export type Ast_AnchorWordBoundary_Node = Ast_AnchorWordBoundary_Node_ & {userData:AstNodeUserDataType<["anchorWordBoundary","token","ast"]>};
interface Ast_Anchor_Node_43_ extends BaseSymbolNode {
        symbol:"Anchor";
        
        children:[Ast_AnchorWordBoundary_Node];
        parent:Ast_ExpressionItem_Node_7;
      }
type Ast_Anchor_Node_43 = Ast_Anchor_Node_43_ & {userData:AstNodeUserDataType<["Anchor","symbol","ast"]>};
interface Ast_AnchorNonWordBoundary_Node_ extends BaseTokenNode {
            token:"anchorNonWordBoundary";
            parent:Ast_Anchor_Node_44;
          }
export type Ast_AnchorNonWordBoundary_Node = Ast_AnchorNonWordBoundary_Node_ & {userData:AstNodeUserDataType<["anchorNonWordBoundary","token","ast"]>};
interface Ast_Anchor_Node_44_ extends BaseSymbolNode {
        symbol:"Anchor";
        
        children:[Ast_AnchorNonWordBoundary_Node];
        parent:Ast_ExpressionItem_Node_7;
      }
type Ast_Anchor_Node_44 = Ast_Anchor_Node_44_ & {userData:AstNodeUserDataType<["Anchor","symbol","ast"]>};
interface Ast_AnchorStartOfStringOnly_Node_ extends BaseTokenNode {
            token:"anchorStartOfStringOnly";
            parent:Ast_Anchor_Node_45;
          }
export type Ast_AnchorStartOfStringOnly_Node = Ast_AnchorStartOfStringOnly_Node_ & {userData:AstNodeUserDataType<["anchorStartOfStringOnly","token","ast"]>};
interface Ast_Anchor_Node_45_ extends BaseSymbolNode {
        symbol:"Anchor";
        
        children:[Ast_AnchorStartOfStringOnly_Node];
        parent:Ast_ExpressionItem_Node_7;
      }
type Ast_Anchor_Node_45 = Ast_Anchor_Node_45_ & {userData:AstNodeUserDataType<["Anchor","symbol","ast"]>};
interface Ast_AnchorEndOfStringOnlyNotNewline_Node_ extends BaseTokenNode {
            token:"anchorEndOfStringOnlyNotNewline";
            parent:Ast_Anchor_Node_46;
          }
export type Ast_AnchorEndOfStringOnlyNotNewline_Node = Ast_AnchorEndOfStringOnlyNotNewline_Node_ & {userData:AstNodeUserDataType<["anchorEndOfStringOnlyNotNewline","token","ast"]>};
interface Ast_Anchor_Node_46_ extends BaseSymbolNode {
        symbol:"Anchor";
        
        children:[Ast_AnchorEndOfStringOnlyNotNewline_Node];
        parent:Ast_ExpressionItem_Node_7;
      }
type Ast_Anchor_Node_46 = Ast_Anchor_Node_46_ & {userData:AstNodeUserDataType<["Anchor","symbol","ast"]>};
interface Ast_AnchorEndOfStringOnly_Node_ extends BaseTokenNode {
            token:"anchorEndOfStringOnly";
            parent:Ast_Anchor_Node_47;
          }
export type Ast_AnchorEndOfStringOnly_Node = Ast_AnchorEndOfStringOnly_Node_ & {userData:AstNodeUserDataType<["anchorEndOfStringOnly","token","ast"]>};
interface Ast_Anchor_Node_47_ extends BaseSymbolNode {
        symbol:"Anchor";
        
        children:[Ast_AnchorEndOfStringOnly_Node];
        parent:Ast_ExpressionItem_Node_7;
      }
type Ast_Anchor_Node_47 = Ast_Anchor_Node_47_ & {userData:AstNodeUserDataType<["Anchor","symbol","ast"]>};
interface Ast_AnchorPreviousMatchEnd_Node_ extends BaseTokenNode {
            token:"anchorPreviousMatchEnd";
            parent:Ast_Anchor_Node_48;
          }
export type Ast_AnchorPreviousMatchEnd_Node = Ast_AnchorPreviousMatchEnd_Node_ & {userData:AstNodeUserDataType<["anchorPreviousMatchEnd","token","ast"]>};
interface Ast_Anchor_Node_48_ extends BaseSymbolNode {
        symbol:"Anchor";
        
        children:[Ast_AnchorPreviousMatchEnd_Node];
        parent:Ast_ExpressionItem_Node_7;
      }
type Ast_Anchor_Node_48 = Ast_Anchor_Node_48_ & {userData:AstNodeUserDataType<["Anchor","symbol","ast"]>};
interface Ast_$_Node_ extends BaseTokenNode {
            token:"$";
            parent:Ast_Anchor_Node_49;
          }
export type Ast_$_Node = Ast_$_Node_ & {userData:AstNodeUserDataType<["$","token","ast"]>};
interface Ast_Anchor_Node_49_ extends BaseSymbolNode {
        symbol:"Anchor";
        
        children:[Ast_$_Node];
        parent:Ast_ExpressionItem_Node_7;
      }
type Ast_Anchor_Node_49 = Ast_Anchor_Node_49_ & {userData:AstNodeUserDataType<["Anchor","symbol","ast"]>};
interface Ast_Lookahead_Node_ extends BaseTokenNode {
            token:"lookahead";
            parent:Ast_Anchor_Node_50;
          }
export type Ast_Lookahead_Node = Ast_Lookahead_Node_ & {userData:AstNodeUserDataType<["lookahead","token","ast"]>};
interface Ast_Anchor_Node_50_ extends BaseSymbolNode {
        symbol:"Anchor";
        
        children:[Ast_Lookahead_Node,Ast_Expression_Node,Ast_TOKEN_4_Node];
        parent:Ast_ExpressionItem_Node_7;
      }
type Ast_Anchor_Node_50 = Ast_Anchor_Node_50_ & {userData:AstNodeUserDataType<["Anchor","symbol","ast"]>};
interface Ast_NegativeLookahead_Node_ extends BaseTokenNode {
            token:"negativeLookahead";
            parent:Ast_Anchor_Node_51;
          }
export type Ast_NegativeLookahead_Node = Ast_NegativeLookahead_Node_ & {userData:AstNodeUserDataType<["negativeLookahead","token","ast"]>};
interface Ast_Anchor_Node_51_ extends BaseSymbolNode {
        symbol:"Anchor";
        
        children:[Ast_NegativeLookahead_Node,Ast_Expression_Node,Ast_TOKEN_4_Node];
        parent:Ast_ExpressionItem_Node_7;
      }
type Ast_Anchor_Node_51 = Ast_Anchor_Node_51_ & {userData:AstNodeUserDataType<["Anchor","symbol","ast"]>};
interface Ast_Lookbehind_Node_ extends BaseTokenNode {
            token:"lookbehind";
            parent:Ast_Anchor_Node_52;
          }
export type Ast_Lookbehind_Node = Ast_Lookbehind_Node_ & {userData:AstNodeUserDataType<["lookbehind","token","ast"]>};
interface Ast_Anchor_Node_52_ extends BaseSymbolNode {
        symbol:"Anchor";
        
        children:[Ast_Lookbehind_Node,Ast_Expression_Node,Ast_TOKEN_4_Node];
        parent:Ast_ExpressionItem_Node_7;
      }
type Ast_Anchor_Node_52 = Ast_Anchor_Node_52_ & {userData:AstNodeUserDataType<["Anchor","symbol","ast"]>};
interface Ast_NegativeLookbehind_Node_ extends BaseTokenNode {
            token:"negativeLookbehind";
            parent:Ast_Anchor_Node_53;
          }
export type Ast_NegativeLookbehind_Node = Ast_NegativeLookbehind_Node_ & {userData:AstNodeUserDataType<["negativeLookbehind","token","ast"]>};
interface Ast_Anchor_Node_53_ extends BaseSymbolNode {
        symbol:"Anchor";
        
        children:[Ast_NegativeLookbehind_Node,Ast_Expression_Node,Ast_TOKEN_4_Node];
        parent:Ast_ExpressionItem_Node_7;
      }
type Ast_Anchor_Node_53 = Ast_Anchor_Node_53_ & {userData:AstNodeUserDataType<["Anchor","symbol","ast"]>};
export type Ast_Regexp_Node = Ast_Regexp_Node_0 | Ast_Regexp_Node_1;
export type { Ast_Expression_Node };
export type { Ast_SubExpression_Node };
export type Ast_ExpressionItem_Node = Ast_ExpressionItem_Node_5 | Ast_ExpressionItem_Node_6 | Ast_ExpressionItem_Node_7 | Ast_ExpressionItem_Node_8;
export type Ast_Group_Node = Ast_Group_Node_9 | Ast_Group_Node_10 | Ast_Group_Node_11 | Ast_Group_Node_12 | Ast_Group_Node_13 | Ast_Group_Node_14;
export type Ast_Match_Node = Ast_Match_Node_15 | Ast_Match_Node_16;
export type Ast_MatchItem_Node = Ast_MatchItem_Node_17 | Ast_MatchItem_Node_18 | Ast_MatchItem_Node_19;
export type Ast_MatchCharacterClass_Node = Ast_MatchCharacterClass_Node_20 | Ast_MatchCharacterClass_Node_21;
export type Ast_CharacterGroup_Node = Ast_CharacterGroup_Node_22 | Ast_CharacterGroup_Node_23;
export type { Ast_CharacterGroupInner_Node };
export type Ast_CharacterGroupItem_Node = Ast_CharacterGroupItem_Node_25 | Ast_CharacterGroupItem_Node_26;
export type Ast_CharacterClass_Node = Ast_CharacterClass_Node_27 | Ast_CharacterClass_Node_28 | Ast_CharacterClass_Node_29 | Ast_CharacterClass_Node_30 | Ast_CharacterClass_Node_31 | Ast_CharacterClass_Node_32;
export type Ast_CharacterRange_Node = Ast_CharacterRange_Node_33 | Ast_CharacterRange_Node_34;
export type Ast_Quantifier_Node = Ast_Quantifier_Node_35 | Ast_Quantifier_Node_36;
export type Ast_QuantifierType_Node = Ast_QuantifierType_Node_37 | Ast_QuantifierType_Node_38 | Ast_QuantifierType_Node_39 | Ast_QuantifierType_Node_40 | Ast_QuantifierType_Node_41 | Ast_QuantifierType_Node_42;
export type Ast_Anchor_Node = Ast_Anchor_Node_43 | Ast_Anchor_Node_44 | Ast_Anchor_Node_45 | Ast_Anchor_Node_46 | Ast_Anchor_Node_47 | Ast_Anchor_Node_48 | Ast_Anchor_Node_49 | Ast_Anchor_Node_50 | Ast_Anchor_Node_51 | Ast_Anchor_Node_52 | Ast_Anchor_Node_53;