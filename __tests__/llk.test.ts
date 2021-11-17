import LLKGrammar from '../src/llk/LLKGrammar';
// @ts-ignore
import AstProcessor from '../examples/cal-ll/action/AstProcessor';
// @ts-ignore
import calGrammar from '../examples/cal-ll/action/cal-grammar';
import { prettyJson, run, HIDDEN_LEXER, HIDDEN_LEXER_RULE } from './utils';
import type Parser from '../src/parser';
import { AstErrorNode } from '../src/parser';

describe('llk', () => {
  const ANY = '$ANY';

  it('any works', () => {
    var grammar = new LLKGrammar({
      productions: [
        {
          symbol: 'program',
          rhs: [ANY, 'NUM'],
        },
      ],
      lexer: {
        rules: [
          HIDDEN_LEXER_RULE,
          {
            regexp: /\d+/,
            token: 'NUM',
          },
          {
            regexp: /\+/,
            token: '+',
          },
        ],
      },
    });
    var code = grammar.genCode();
    var parser = run(code);
    var ret = parser.parse('+1');
    expect(ret.error).toBeFalsy();
    expect(prettyJson(ret.ast)).toMatchSnapshot();
  });

  it('support parse from startSymbol', () => {
    var grammar = new LLKGrammar({
      productions: [
        {
          symbol: 'program',
          rhs: ['s1', 's2'],
        },
        {
          symbol: 's1',
          rhs: ['exp*'],
        },
        {
          symbol: 's2',
          rhs: ['exp2+'],
        },
        {
          symbol: 's2',
          rhs: ['5'],
        },
        {
          symbol: 'exp',
          rhs: ['1'],
        },
        {
          symbol: 'exp2',
          rhs: ['1'],
        },
      ],
      ...HIDDEN_LEXER,
    });
    var code = grammar.genCode();
    var parser = run(code);
    var ret = parser.parse('1 1 1 1', {
      startSymbol: 's2',
    });
    expect(ret.error).toBeFalsy();
    expect(prettyJson(ret.ast)).toMatchSnapshot();
  });
  it('lazy * symbol works', () => {
    var grammar = new LLKGrammar({
      productions: [
        {
          symbol: 'program',
          rhs: ['exp*', 'exp2+'],
        },
        {
          symbol: 'exp',
          rhs: ['1'],
        },
        {
          symbol: 'exp2',
          rhs: ['1'],
        },
      ],
      ...HIDDEN_LEXER,
    });
    var code = grammar.genCode();
    var parser = run(code);

    var ret = parser.parse('1 1 1 1');
    expect(ret.error).toBeFalsy();
    expect(prettyJson(ret.ast)).toMatchSnapshot();

    var grammar = new LLKGrammar({
      productions: [
        {
          symbol: 'program',
          rhs: ['exp*?', 'exp2+'],
        },
        {
          symbol: 'exp',
          rhs: ['1'],
        },
        {
          symbol: 'exp2',
          rhs: ['1'],
        },
      ],
      ...HIDDEN_LEXER,
    });
    var code = grammar.genCode();
    var parser = run(code);

    var ret = parser.parse('1 1 1 1');
    expect(ret.error).toBeFalsy();
    expect(prettyJson(ret.ast)).toMatchSnapshot();
  });

  it('lazy + symbol works', () => {
    var grammar = new LLKGrammar({
      productions: [
        {
          symbol: 'program',
          rhs: ['exp+', 'exp2+'],
        },
        {
          symbol: 'exp',
          rhs: ['1'],
        },
        {
          symbol: 'exp2',
          rhs: ['1'],
        },
      ],
      ...HIDDEN_LEXER,
    });
    var code = grammar.genCode();
    var parser = run(code);

    var ret = parser.parse('1 1 1 1');
    expect(ret.error).toBeFalsy();
    expect(prettyJson(ret.ast)).toMatchSnapshot();

    var grammar = new LLKGrammar({
      productions: [
        {
          symbol: 'program',
          rhs: ['exp+?', 'exp2+'],
        },
        {
          symbol: 'exp',
          rhs: ['1'],
        },
        {
          symbol: 'exp2',
          rhs: ['1'],
        },
      ],
      ...HIDDEN_LEXER,
    });
    var code = grammar.genCode();
    var parser = run(code);

    var ret = parser.parse('1 1 1 1');
    expect(ret.error).toBeFalsy();
    expect(prettyJson(ret.ast)).toMatchSnapshot();
  });

  it('lazy ? symbol works', () => {
    var grammar = new LLKGrammar({
      productions: [
        {
          symbol: 'program',
          rhs: ['exp?', 'exp2+'],
        },
        {
          symbol: 'exp',
          rhs: ['1'],
        },
        {
          symbol: 'exp2',
          rhs: ['1'],
        },
      ],
      ...HIDDEN_LEXER,
    });
    var code = grammar.genCode();

    var parser = run(code);

    var ret = parser.parse('1 1 1 1');
    expect(ret.error).toBeFalsy();
    expect(prettyJson(ret.ast)).toMatchSnapshot();

    var grammar = new LLKGrammar({
      productions: [
        {
          symbol: 'program',
          rhs: ['exp??', 'exp2+'],
        },
        {
          symbol: 'exp',
          rhs: ['1'],
        },
        {
          symbol: 'exp2',
          rhs: ['1'],
        },
      ],
      ...HIDDEN_LEXER,
    });
    var code = grammar.genCode();
    var parser = run(code);

    var ret = parser.parse('1 1 1 1');
    expect(ret.error).toBeFalsy();
    expect(prettyJson(ret.ast)).toMatchSnapshot();
  });

  it('look ahead more than one', () => {
    var grammar = new LLKGrammar({
      productions: [
        {
          symbol: 'program',
          rhs: ['exp', '1', '1'],
        },
        {
          symbol: 'exp',
          rhs: ['exp2'],
        },
        {
          symbol: 'exp2',
          rhs: ['1'],
        },
        {
          symbol: 'exp2',
          rhs: ['1', '1'],
        },
      ],
      ...HIDDEN_LEXER,
    });
    const code = grammar.genCode();
    const parser = run(code);

    const ret = parser.parse('1 1 1');
    expect(ret.error).toBeFalsy();
    expect(prettyJson(ret.ast)).toMatchSnapshot();
  });

  it('ast works', () => {
    var grammar = new LLKGrammar(calGrammar());
    const code = grammar.genCode();
    const parser = run(code);
    const ast = parser.parse('1+2+3', { onAction() {} }).ast;
    expect(prettyJson(ast)).toMatchSnapshot();
  });

  it('ast works', () => {
    var grammar = new LLKGrammar(calGrammar());
    const code = grammar.genCode();
    const parser = run(code);
    const ast = parser.parse('1+2*3', { onAction() {} }).ast;
    expect(prettyJson(ast)).toMatchSnapshot();
  });

  it('ast works', () => {
    var grammar = new LLKGrammar(calGrammar());
    const code = grammar.genCode();
    const parser = run(code);
    const ast = parser.parse('1+2*4-5^2^3', { onAction() {} }).ast;
    expect(prettyJson(ast)).toMatchSnapshot();
  });

  it('error detection works', () => {
    var grammar = new LLKGrammar(calGrammar());
    const code = grammar.genCode();
    const parser = run(code);
    const { ast, errorNode } = parser.parse('1+2*', { onAction() {} });
    expect(prettyJson(ast)).toMatchSnapshot();
    expect(prettyJson(errorNode)).toMatchSnapshot();
  });

  it('onAction works', () => {
    var grammar = new LLKGrammar(calGrammar());
    const code = grammar.genCode();
    const parser = run(code);
    const astProcessor = new AstProcessor();
    parser.astProcessor = astProcessor;
    parser.parse('1 + 2*3-2^1^3');
    parser.astProcessor = null;
    expect(astProcessor.stack).toMatchSnapshot();
  });

  it('del error recovery works', () => {
    var grammar = new LLKGrammar(calGrammar());
    const code = grammar.genCode();
    let errorCalled: AstErrorNode | null = null;
    const parser: typeof Parser = run(code);
    parser.parse('1+/2', {
      onErrorRecovery({ errorNode }, { action }) {
        errorCalled = errorNode;
        expect(action).toBe('del');
        return { action };
      },
    });
    expect(errorCalled).toMatchSnapshot();
  });

  it('add error recovery works', () => {
    var grammar = new LLKGrammar(calGrammar());
    const code = grammar.genCode();
    let errorCalled: AstErrorNode | null = null;
    const parser: typeof Parser = run(code);
    const { ast, error, errorNode } = parser.parse('1+', {
      onErrorRecovery({ errorNode }, { action }) {
        errorCalled = errorNode;
        if (
          action === 'add' &&
          errorNode.error.expected.indexOf('NUMBER') !== -1
        ) {
          return {
            action,
            token: 'NUMBER',
            text: '0',
          };
        }
      },
    });
    expect(errorNode).toMatchSnapshot(`undefined`);
    expect(prettyJson(ast)).toMatchSnapshot();
    expect(prettyJson(error)).toMatchSnapshot();
    expect(errorCalled).toMatchSnapshot();
  });
});
