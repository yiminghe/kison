import Grammar from '../src/Grammar';
import Utils from '../src/utils';
import { prettyJson, run } from './utils';
import { options } from '../src/options';

const { makeZeroOrMoreGroup, makeAlternates, makeGroup } = options;

describe('common', () => {
  it('escape correctly', function () {
    expect(Utils.escapeString("'\\")).toEqual("\\'\\\\");
    expect(run("'" + Utils.escapeString("'\\") + "'")).toEqual("'\\");
  });

  it('expand group and alteration', () => {
    const grammar = new Grammar({
      productions: [
        {
          symbol: 'start',
          rhs: makeAlternates(
            ['1', '2'],
            [
              '3',
              '4',
              ...makeZeroOrMoreGroup(
                ...makeAlternates(
                  [
                    '5',
                    '6',
                    ...makeGroup(...makeAlternates(['7', '8'], '9')),
                    '10',
                  ],
                  '11',
                ),
              ),
            ],
          ),
        },
      ],
      lexer: {
        rules: [],
      },
    });

    grammar.expandProductionAlternativeAndGroup();
    expect(prettyJson(grammar.productions.slice(1))).toMatchInlineSnapshot(`
      "[
        {
          'symbol': 'start',
          'rhs': [
            '1',
            '2'
          ],
          'ruleIndex': 1
        },
        {
          'ruleIndex': 1,
          'symbol': 'start_group_def_3',
          'rhs': [
            '7',
            '8'
          ],
          'skipAstNode': true
        },
        {
          'symbol': 'start_group_2',
          'ruleIndex': 1,
          'rhs': [
            'start_group_def_3'
          ],
          'skipAstNode': true
        },
        {
          'ruleIndex': 1,
          'symbol': 'start_group_def_4',
          'rhs': [
            '9'
          ],
          'skipAstNode': true
        },
        {
          'symbol': 'start_group_2',
          'ruleIndex': 1,
          'rhs': [
            'start_group_def_4'
          ],
          'skipAstNode': true
        },
        {
          'ruleIndex': 1,
          'symbol': 'start_group_def_5',
          'rhs': [
            '5',
            '6',
            'start_group_2',
            '10'
          ],
          'skipAstNode': true
        },
        {
          'symbol': 'start_group_1',
          'ruleIndex': 1,
          'rhs': [
            'start_group_def_5'
          ],
          'skipAstNode': true
        },
        {
          'ruleIndex': 1,
          'symbol': 'start_group_def_6',
          'rhs': [
            '11'
          ],
          'skipAstNode': true
        },
        {
          'symbol': 'start_group_1',
          'ruleIndex': 1,
          'rhs': [
            'start_group_def_6'
          ],
          'skipAstNode': true
        },
        {
          'symbol': 'start',
          'rhs': [
            '3',
            '4',
            'start_group_1*'
          ],
          'ruleIndex': 1
        }
      ]"
    `);
  });

  it('expand group and alteration-2', () => {
    const grammar = new Grammar({
      productions: [
        {
          symbol: 'start',
          rhs: makeZeroOrMoreGroup(
            '1?',
            ...makeGroup(...makeAlternates(',', ';')),
          ),
        },
      ],
      lexer: {
        rules: [],
      },
    });

    grammar.expandProductionAlternativeAndGroup();

    expect(prettyJson(grammar.productions.slice(1))).toMatchInlineSnapshot(`
      "[
        {
          'ruleIndex': 1,
          'symbol': 'start_group_def_3',
          'rhs': [
            ','
          ],
          'skipAstNode': true
        },
        {
          'symbol': 'start_group_2',
          'ruleIndex': 1,
          'rhs': [
            'start_group_def_3'
          ],
          'skipAstNode': true
        },
        {
          'ruleIndex': 1,
          'symbol': 'start_group_def_4',
          'rhs': [
            ';'
          ],
          'skipAstNode': true
        },
        {
          'symbol': 'start_group_2',
          'ruleIndex': 1,
          'rhs': [
            'start_group_def_4'
          ],
          'skipAstNode': true
        },
        {
          'ruleIndex': 1,
          'symbol': 'start_group_def_5',
          'rhs': [
            '1?',
            'start_group_2'
          ],
          'skipAstNode': true
        },
        {
          'symbol': 'start',
          'rhs': [
            'start_group_def_5*'
          ],
          'ruleIndex': 1
        }
      ]"
    `);
  });
});
