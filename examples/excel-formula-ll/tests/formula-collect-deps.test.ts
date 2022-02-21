import { parser as formula, evaluate, Ref_Type } from '../src';
import { prettyJson } from 'kison/__tests__/utils';
import { collect } from '../src/dependency-graph/collectDeps';

function parse(input: string) {
  return formula.parse(input).ast;
}

describe('excel-formula-evaluator', () => {
  it('collect correctly', () => {
    const ast = parse('a1+d$2:$c$3+$b4');
    const deps: Ref_Type[] = [];
    collect(ast, {
      addDep(dep) {
        deps.push(dep);
      },
    });
    expect(prettyJson(deps)).toMatchInlineSnapshot(`
      "[
        {
          'type': 'reference',
          'value': [
            {
              'start': {
                'col': 1,
                'row': 1,
                'isRowAbsolute': false,
                'isColAbsolute': false
              }
            }
          ]
        },
        {
          'type': 'reference',
          'value': [
            {
              'start': {
                'col': 4,
                'row': 2,
                'isRowAbsolute': true,
                'isColAbsolute': false
              },
              'end': {
                'col': 3,
                'row': 3,
                'isRowAbsolute': true,
                'isColAbsolute': true
              }
            }
          ]
        },
        {
          'type': 'reference',
          'value': [
            {
              'start': {
                'col': 2,
                'row': 4,
                'isRowAbsolute': false,
                'isColAbsolute': true
              }
            }
          ]
        }
      ]"
    `);
  });
});
