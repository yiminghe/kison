type AstNode = AstSymbolNode | AstTokenNode;

// replace start
type AstSymbolNode = Program_Node|Statements_Node|Exp_Node;
type AstTokenNode = $EOF_Node|$UNKNOWN_Node|TOKEN_0_Node|TOKEN_1_Node|TOKEN_2_Node|TOKEN_3_Node|TOKEN_4_Node|NUMBER_Node|TOKEN_5_Node|TOKEN_6_Node|NEW_LINE_Node;
type LiteralToken = "NEW_LINE"|"$HIDDEN"|"NUMBER"|"$EOF"|"$UNKOWN"|"+"|"-"|"*"|"/"|"^"|"("|")";
type AstRootNode = Program_Node;
// replace end

type AstErrorNode = AstTokenNode & {
  error: ParseError;
}

interface Position {
  start: number;
  end: number;
  firstLine: number;
  lastLine: number;
  firstColumn: number;
  lastColumn: number;
}

interface BaseSymbolNode extends Position {
  type: 'symbol';
  symbol: string;
  parent?: AstSymbolNode;
  label: string;
  children: AstNode[];
}

interface BaseTokenNode extends Position {
  type: 'token';
  token: string;
  t: string;
  text: string;
  parent: AstSymbolNode;
}

type TransformNode = (arg: {
  index: number;
  node: AstNode;
  parent: AstSymbolNode;
  defaultTransformNode: TransformNode;
}) => AstNode | null;

interface Token extends Position {
  text: string;
  t: string;
  recovery?: string;
  token: LiteralToken;
}

interface ParseError {
  errorMessage: string;
  expected: LiteralToken[];
  lexer: Token;
  recovery?: Boolean;
  symbol: AstSymbolNode['symbol'];
  tip: string;
}

interface LexerOptions<T = any> {
  env?: string;
  state?: {
    userData?: T,
    stateStack?: string[];
  }
}

interface ParserOptions {
  lexerOptions?: LexerOptions;
  transformNode?: TransformNode | false;
  onErrorRecovery?: (args: {
    parseTree: AstNode;
    errorNode: AstErrorNode;
  }, recommendedAction: {
    action?: 'del' | 'add'
  }) => void;
}

interface ParseResult {
  ast: AstRootNode;
  error?: ParseError;
  errorNode?: AstErrorNode;
  recoveryTokens: Token[];
  terminalNodes: AstTokenNode[];
  tokens: Token[];
}

interface LexResult<T = any> {
  tokens: Token[];
  state: {
    userData: T,
    stateStack: string[];
  }
}

declare function parse(input: string, options?: ParserOptions): ParseResult;

declare function lex<T = any>(input: string, options?: LexerOptions<T>): LexResult<T>;

declare const parser: { parse: typeof parse, lex: typeof lex };

export default parser;

export type {
  ParseResult, LexResult, ParserOptions,
  TransformNode,
  AstRootNode,
  ParseError,
  Position,
  LiteralToken,
  LexerOptions, AstTokenNode, Token, AstNode, AstSymbolNode
}

interface Program_Node extends BaseSymbolNode {
        symbol:"program";
        
        children:[Statements_Node];
        
      }
interface Statements_Node extends BaseSymbolNode {
        symbol:"statements";
        
        children:Array<Exp_Node | NEW_LINE_Node>;
        parent:Program_Node;
      }
interface Exp_Node_0 extends BaseSymbolNode {
        symbol:"exp";
        label:"binary-exp";
        children:[Exp_Node,TOKEN_0_Node,Exp_Node];
        parent:Exp_Node | Statements_Node;
      }
interface Exp_Node_6 extends BaseSymbolNode {
        symbol:"exp";
        label:"binary-exp";
        children:[Exp_Node,TOKEN_1_Node,Exp_Node];
        parent:Exp_Node | Statements_Node;
      }
interface Exp_Node_7 extends BaseSymbolNode {
        symbol:"exp";
        label:"binary-exp";
        children:[Exp_Node,TOKEN_2_Node,Exp_Node];
        parent:Exp_Node | Statements_Node;
      }
interface Exp_Node_8 extends BaseSymbolNode {
        symbol:"exp";
        label:"binary-exp";
        children:[Exp_Node,TOKEN_3_Node,Exp_Node];
        parent:Exp_Node | Statements_Node;
      }
interface Exp_Node_9 extends BaseSymbolNode {
        symbol:"exp";
        label:"binary-exp";
        children:[Exp_Node,TOKEN_4_Node,Exp_Node];
        parent:Exp_Node | Statements_Node;
      }
interface Exp_Node_10 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[TOKEN_1_Node,Exp_Node];
        parent:Exp_Node | Statements_Node;
      }
interface Exp_Node_11 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[NUMBER_Node];
        parent:Exp_Node | Statements_Node;
      }
interface Exp_Node_12 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[TOKEN_5_Node,Exp_Node,TOKEN_6_Node];
        parent:Exp_Node | Statements_Node;
      }
type Exp_Node = Exp_Node_0 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8 | Exp_Node_9 | Exp_Node_10 | Exp_Node_11 | Exp_Node_12;
interface $EOF_Node extends BaseTokenNode {
        token:"$EOF";
        parent:AstSymbolNode;
      }
interface $UNKNOWN_Node extends BaseTokenNode {
        token:"$UNKNOWN";
        parent:AstSymbolNode;
      }
interface TOKEN_0_Node extends BaseTokenNode {
            token:"+";
            parent:Exp_Node;
          }
interface TOKEN_1_Node extends BaseTokenNode {
            token:"-";
            parent:Exp_Node_6 | Exp_Node_10;
          }
interface TOKEN_2_Node extends BaseTokenNode {
            token:"*";
            parent:Exp_Node_7;
          }
interface TOKEN_3_Node extends BaseTokenNode {
            token:"/";
            parent:Exp_Node_8;
          }
interface TOKEN_4_Node extends BaseTokenNode {
            token:"^";
            parent:Exp_Node_9;
          }
interface NUMBER_Node extends BaseTokenNode {
            token:"NUMBER";
            parent:Exp_Node_11;
          }
interface TOKEN_5_Node extends BaseTokenNode {
            token:"(";
            parent:Exp_Node_12;
          }
interface TOKEN_6_Node extends BaseTokenNode {
            token:")";
            parent:Exp_Node_12;
          }
interface NEW_LINE_Node extends BaseTokenNode {
            token:"NEW_LINE";
            parent:Statements_Node;
          }
export type { Program_Node,Statements_Node,Exp_Node,$EOF_Node,$UNKNOWN_Node,TOKEN_0_Node,TOKEN_1_Node,TOKEN_2_Node,TOKEN_3_Node,TOKEN_4_Node,NUMBER_Node,TOKEN_5_Node,TOKEN_6_Node,NEW_LINE_Node }