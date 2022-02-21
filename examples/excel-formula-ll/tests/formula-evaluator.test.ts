import { parser as formula, evaluate } from '../src';
import { prettyJson } from 'kison/__tests__/utils';

function parse(input: string) {
  return formula.parse(input).ast;
}

describe('excel-formula-evaluator', () => {
  describe('expression', () => {
    /**
     *  ['left', '=', '<=', '>=', '<>', '>', '<'],
  ['left', '&'],
  ['left', '+', '-'],
  ['left', '*', '/'],
  ['left', '^'],
  ['precedence', '%'],
  ['precedence', 'UMINUS', 'UPLUS'],
  ['precedence', '@'],
     */

    it('binary works', () => {
      expect(prettyJson(evaluate(parse(`{1,2}={1,3}`)))).toMatchInlineSnapshot(`
        "{
          'type': 'array',
          'value': [
            [
              {
                'type': 'boolean',
                'value': true
              },
              {
                'type': 'boolean',
                'value': false
              }
            ]
          ]
        }"
      `);
      expect(prettyJson(evaluate(parse(`{1,2,5}={1,3}`))))
        .toMatchInlineSnapshot(`
        "{
          'type': 'array',
          'value': [
            [
              {
                'type': 'boolean',
                'value': true
              },
              {
                'type': 'boolean',
                'value': false
              },
              {
                'type': 'error',
                'value': '#N/A',
                'message': 'unmatch shape'
              }
            ]
          ]
        }"
      `);
      expect(prettyJson(evaluate(parse(`{1,2}&{"4","5"}`))))
        .toMatchInlineSnapshot(`
        "{
          'type': 'array',
          'value': [
            [
              {
                'type': 'string',
                'value': '14'
              },
              {
                'type': 'string',
                'value': '25'
              }
            ]
          ]
        }"
      `);

      expect(prettyJson(evaluate(parse(`{1,2}^{2,3}`)))).toMatchInlineSnapshot(`
        "{
          'type': 'array',
          'value': [
            [
              {
                'type': 'number',
                'value': 1
              },
              {
                'type': 'number',
                'value': 8
              }
            ]
          ]
        }"
      `);
    });

    it('unary works', () => {
      expect(prettyJson(evaluate(parse(`{1,2}%`)))).toMatchInlineSnapshot(`
        "{
          'type': 'array',
          'value': [
            [
              {
                'type': 'number',
                'value': 0.01
              },
              {
                'type': 'number',
                'value': 0.02
              }
            ]
          ]
        }"
      `);

      expect(prettyJson(evaluate(parse(`+{"1","2"}`)))).toMatchInlineSnapshot(`
        "{
          'type': 'array',
          'value': [
            [
              {
                'type': 'number',
                'value': 1
              },
              {
                'type': 'number',
                'value': 2
              }
            ]
          ]
        }"
      `);

      expect(prettyJson(evaluate(parse(`-{"1","2"}`)))).toMatchInlineSnapshot(`
        "{
          'type': 'array',
          'value': [
            [
              {
                'type': 'number',
                'value': -1
              },
              {
                'type': 'number',
                'value': -2
              }
            ]
          ]
        }"
      `);

      expect(prettyJson(evaluate(parse(`@{"1","2"}`)))).toMatchInlineSnapshot(`
        "{
          'type': 'string',
          'value': '1'
        }"
      `);
    });
  });

  it('function ok', () => {
    expect(prettyJson(evaluate(parse(`sum(1,{1,2}+{5;4})`))))
      .toMatchInlineSnapshot(`
      "{
        'type': 'number',
        'value': 25
      }"
    `);
  });
});
