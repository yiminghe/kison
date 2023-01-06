import LLKGrammar from '../src/llk/LLKGrammar';
// @ts-ignore
import calGrammar from '../examples/cal-ll/action/cal-grammar';
import { prettyJson, run } from './utils';

describe('llk incremental', () => {
  it('ast works', () => {
    var grammar = new LLKGrammar(calGrammar());
    const code = grammar.genCode();
    const parser = run(code);
    let { incremental, ast } = parser.parse('1+2+3', { incremental: {} });

    expect(prettyJson(ast)).toMatchInlineSnapshot(`
      "{
        'start': 0,
        'end': 5,
        'firstLine': 1,
        'lastLine': 1,
        'firstColumn': 1,
        'lastColumn': 6,
        'symbol': 'exp',
        'type': 'symbol',
        'children': [
          {
            'start': 0,
            'end': 3,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 1,
            'lastColumn': 4,
            'symbol': 'exp',
            'type': 'symbol',
            'children': [
              {
                'start': 0,
                'end': 1,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 1,
                'lastColumn': 2,
                'symbol': 'exp',
                'type': 'symbol',
                'children': [
                  {
                    'start': 0,
                    'end': 1,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 1,
                    'lastColumn': 2,
                    'token': 'NUMBER',
                    'type': 'token',
                    'text': '1'
                  }
                ],
                'ruleIndex': 8,
                'internalRuleIndex': 2,
                'id': 6
              },
              {
                'start': 1,
                'end': 2,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 2,
                'lastColumn': 3,
                'token': '+',
                'type': 'token',
                'text': '+'
              },
              {
                'start': 2,
                'end': 3,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 3,
                'lastColumn': 4,
                'symbol': 'exp',
                'type': 'symbol',
                'children': [
                  {
                    'start': 2,
                    'end': 3,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 3,
                    'lastColumn': 4,
                    'token': 'NUMBER',
                    'type': 'token',
                    'text': '2'
                  }
                ],
                'ruleIndex': 8,
                'internalRuleIndex': 2,
                'id': 12
              }
            ],
            'ruleIndex': 8,
            'internalRuleIndex': 2,
            'id': 8,
            'isWrap': true
          },
          {
            'start': 3,
            'end': 4,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 4,
            'lastColumn': 5,
            'token': '+',
            'type': 'token',
            'text': '+'
          },
          {
            'start': 4,
            'end': 5,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 5,
            'lastColumn': 6,
            'symbol': 'exp',
            'type': 'symbol',
            'children': [
              {
                'start': 4,
                'end': 5,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 5,
                'lastColumn': 6,
                'token': 'NUMBER',
                'type': 'token',
                'text': '3'
              }
            ],
            'ruleIndex': 8,
            'internalRuleIndex': 2,
            'id': 18
          }
        ],
        'ruleIndex': 8,
        'internalRuleIndex': 2,
        'id': 14,
        'isWrap': true
      }"
    `);

    const ret2 = parser.parse('1+2+3', { incremental });
    expect(ret2.ast === ast).toBe(true);
    const incrementalRet = ret2.applyEdit(2, 3, 2);
    const ret3 = parser.parse('1+44+3', { incremental: incrementalRet });

    expect(ret3.ast === ast).toBe(false);
    expect(ret3.ast.children[0] === ast.children[0]).toBe(false);
    expect(ret3.ast.children[1] === ast.children[1]).toBe(false);
    expect(ret3.ast.children[2] === ast.children[2]).toBe(true);
    // const f=ret3.ast.children[0].children[0];
    // const f2=ast.children[0].children[0];
    // expect(f === f2).toBe(true);
    expect(prettyJson(ret3.ast)).toMatchInlineSnapshot(`
      "{
        'start': 0,
        'end': 6,
        'firstLine': 1,
        'lastLine': 1,
        'firstColumn': 1,
        'lastColumn': 6,
        'symbol': 'exp',
        'type': 'symbol',
        'children': [
          {
            'start': 0,
            'end': 4,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 1,
            'lastColumn': 5,
            'symbol': 'exp',
            'type': 'symbol',
            'children': [
              {
                'start': 0,
                'end': 1,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 1,
                'lastColumn': 2,
                'symbol': 'exp',
                'type': 'symbol',
                'children': [
                  {
                    'start': 0,
                    'end': 1,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 1,
                    'lastColumn': 2,
                    'token': 'NUMBER',
                    'type': 'token',
                    'text': '1'
                  }
                ],
                'ruleIndex': 8,
                'internalRuleIndex': 2,
                'id': 6
              },
              {
                'start': 1,
                'end': 2,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 2,
                'lastColumn': 3,
                'token': '+',
                'type': 'token',
                'text': '+'
              },
              {
                'start': 2,
                'end': 4,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 3,
                'lastColumn': 5,
                'symbol': 'exp',
                'type': 'symbol',
                'children': [
                  {
                    'start': 2,
                    'end': 4,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 3,
                    'lastColumn': 5,
                    'token': 'NUMBER',
                    'type': 'token',
                    'text': '44'
                  }
                ],
                'ruleIndex': 8,
                'internalRuleIndex': 2,
                'id': 12
              }
            ],
            'ruleIndex': 8,
            'internalRuleIndex': 2,
            'id': 8,
            'isWrap': true
          },
          {
            'start': 4,
            'end': 5,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 5,
            'lastColumn': 6,
            'token': '+',
            'type': 'token',
            'text': '+'
          },
          {
            'start': 5,
            'end': 6,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 5,
            'lastColumn': 6,
            'symbol': 'exp',
            'type': 'symbol',
            'children': [
              {
                'start': 5,
                'end': 6,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 5,
                'lastColumn': 6,
                'token': 'NUMBER',
                'type': 'token',
                'text': '3'
              }
            ],
            'ruleIndex': 8,
            'internalRuleIndex': 2,
            'id': 18
          }
        ],
        'ruleIndex': 8,
        'internalRuleIndex': 2,
        'id': 14,
        'isWrap': true
      }"
    `);
  });
});
