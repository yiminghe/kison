import Grammar from '../lib/Grammar';
import { prettyJson } from './utils';

describe('common', () => {
  it.only('expand group and alteration', () => {
    const startGroupMark = `'('`;
    const endGroupMark = `')'`;
    const alterMark = `'|'`;
    debugger;
    const grammar = new Grammar({
      productions: [
        {
          symbol: 'start',
          rhs: [
            '1',
            '2',
            alterMark,
            '3',
            '4',
            startGroupMark,
            '5',
            '6',
            startGroupMark,
            '7',
            '8',
            alterMark,
            '9',
            endGroupMark,
            '10',
            alterMark,
            '11',
            `${endGroupMark}*`,
          ],
        },
      ],
      lexer: {
        rules: [],
      },
    });

    grammar.expandProductionAlternation();

    expect(prettyJson(grammar.productions)).toMatchInlineSnapshot(`
      "[
        {
          'symbol': '$START',
          'rhs': [
            'start'
          ]
        },
        {
          'symbol': 'start',
          'rhs': [
            '1',
            '2'
          ]
        },
        {
          'symbol': 'start',
          'rhs': [
            '3',
            '4',
            ''('',
            '5',
            '6',
            ''('',
            '7',
            '8',
            '')'',
            '10',
            '')'*'
          ]
        },
        {
          'symbol': 'start',
          'rhs': [
            '3',
            '4',
            ''('',
            '5',
            '6',
            ''('',
            '9',
            '')'',
            '10',
            '')'*'
          ]
        },
        {
          'symbol': 'start',
          'rhs': [
            '3',
            '4',
            ''('',
            '11',
            '')'*'
          ]
        }
      ]"
    `);

    grammar.expandProductions();

    expect(prettyJson(grammar.productions)).toMatchInlineSnapshot(`
      "[
        {
          'symbol': '$START',
          'rhs': [
            'start'
          ]
        },
        {
          'symbol': 'start',
          'rhs': [
            '1',
            '2'
          ]
        },
        {
          'symbol': 'start',
          'rhs': [
            '3',
            '4',
            'start_3_group_2*'
          ]
        },
        {
          'symbol': 'start',
          'rhs': [
            '3',
            '4',
            'start_4_group_2*'
          ]
        },
        {
          'symbol': 'start',
          'rhs': [
            '3',
            '4',
            '11*'
          ]
        },
        {
          'symbol': 'start_3_group_2',
          'rhs': [
            '5',
            '6',
            '7',
            '8',
            '10'
          ],
          'skipAstNode': true
        },
        {
          'symbol': 'start_4_group_2',
          'rhs': [
            '5',
            '6',
            '9',
            '10'
          ],
          'skipAstNode': true
        }
      ]"
    `);
  });
});
