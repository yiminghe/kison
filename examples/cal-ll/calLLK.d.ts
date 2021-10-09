type AstNode = AstSymbolNode | AstTokenNode;

// replace start
type AstSymbolNode = Exp_Node;
type AstTokenNode = TOKEN_0_Node|TOKEN_1_Node|$EOF_Node|$UNKNOWN_Node|TOKEN_2_Node|TOKEN_3_Node|TOKEN_4_Node|TOKEN_5_Node|TOKEN_6_Node|NUMBER_Node;
type LiteralToken = "$HIDDEN"|"NUMBER"|"$EOF"|"$UNKOWN"|"("|")"|"+"|"-"|"*"|"/"|"^";
type AstRootNode = Exp_Node;
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
  parent?: AstSymbolNode;
  label: '';
}

interface BaseTokenNode extends Position {
  type: 'token';
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
  token: LiteralToken;
}

interface ParseError {
  errorMessage: string;
  expected: LiteralToken[];
  token: Token;
  recovery: Boolean;
  symbol: Symbol;
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
  Position,
  LiteralToken,
  LexerOptions, AstTokenNode, Token, AstNode, AstSymbolNode
}

interface Exp_Node_0 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[TOKEN_0_Node,Exp_Node,TOKEN_1_Node];
        parent:Exp_Node;
      }
interface Exp_Node_2 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Exp_Node,TOKEN_2_Node,Exp_Node];
        parent:Exp_Node;
      }
interface Exp_Node_3 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Exp_Node,TOKEN_3_Node,Exp_Node];
        parent:Exp_Node;
      }
interface Exp_Node_4 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Exp_Node,TOKEN_4_Node,Exp_Node];
        parent:Exp_Node;
      }
interface Exp_Node_5 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Exp_Node,TOKEN_5_Node,Exp_Node];
        parent:Exp_Node;
      }
interface Exp_Node_6 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[TOKEN_3_Node,Exp_Node];
        parent:Exp_Node;
      }
interface Exp_Node_7 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[Exp_Node,TOKEN_6_Node,Exp_Node];
        parent:Exp_Node;
      }
interface Exp_Node_8 extends BaseSymbolNode {
        symbol:"exp";
        
        children:[NUMBER_Node];
        parent:Exp_Node;
      }
type Exp_Node = Exp_Node_0 | Exp_Node_2 | Exp_Node_3 | Exp_Node_4 | Exp_Node_5 | Exp_Node_6 | Exp_Node_7 | Exp_Node_8;
interface TOKEN_0_Node extends BaseTokenNode {
            token:"(";
            parent:Exp_Node;
          }
interface TOKEN_1_Node extends BaseTokenNode {
            token:")";
            parent:Exp_Node;
          }
interface $EOF_Node extends BaseTokenNode {
        token:"$EOF";
        parent:AstSymbolNode;
      }
interface $UNKNOWN_Node extends BaseTokenNode {
        token:"$UNKNOWN";
        parent:AstSymbolNode;
      }
interface TOKEN_2_Node extends BaseTokenNode {
            token:"+";
            parent:Exp_Node_2;
          }
interface TOKEN_3_Node extends BaseTokenNode {
            token:"-";
            parent:Exp_Node_3 | Exp_Node_6;
          }
interface TOKEN_4_Node extends BaseTokenNode {
            token:"*";
            parent:Exp_Node_4;
          }
interface TOKEN_5_Node extends BaseTokenNode {
            token:"/";
            parent:Exp_Node_5;
          }
interface TOKEN_6_Node extends BaseTokenNode {
            token:"^";
            parent:Exp_Node_7;
          }
interface NUMBER_Node extends BaseTokenNode {
            token:"NUMBER";
            parent:Exp_Node_8;
          }
export type { Exp_Node,TOKEN_0_Node,TOKEN_1_Node,$EOF_Node,$UNKNOWN_Node,TOKEN_2_Node,TOKEN_3_Node,TOKEN_4_Node,TOKEN_5_Node,TOKEN_6_Node,NUMBER_Node }