import LLKGrammar from '../src/llk/LLKGrammar';
// @ts-ignore
import calGrammar from '../examples/cal-ll/action/cal-grammar';
import { prettyJson, run } from './utils';

describe.only('llk incremental', () => {
  it.only('ast works', () => {
    var grammar = new LLKGrammar(calGrammar());
    const code = grammar.genCode();
    const parser = run(code);
    let memoTable: any = [];
    debugger;
    let { ast } = parser.parse('1+2+3', { memoTable });
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

    const ret2 = parser.parse('1+2+3', { memoTable });
    expect(ret2.ast === ast).toBe(true);
    const memoTableRet = ret2.applyEdit(2, 3, 1);

    const ret3 = parser.parse('1+4+3', { memoTable: memoTableRet.memoTable });

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
                    'text': '4'
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
  });
});
