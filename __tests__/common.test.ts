import Grammar from '../src/Grammar';
import Utils from '../src/utils';
import { prettyJson, run } from './utils';

describe('common', () => {
  const groupStartMark = `'('`;
  const groupEndMark = `')'`;
  const alternationMark = `'|'`;
  const groupEndZeroOrMoreMark = groupEndMark + '*';
  const groupEndOneOrMoreMark = groupEndMark + '+';
  const groupEndOptionalMark = groupEndMark + '?';

  const n = {
    groupStartMark,
    groupEndMark,
    groupEndOneOrMoreMark,
    groupEndOptionalMark,
    groupEndZeroOrMoreMark,
    alternationMark,
  };

  it('escape correctly', function () {
    expect(Utils.escapeString("'\\")).toEqual("\\'\\\\");
    expect(run("'" + Utils.escapeString("'\\") + "'")).toEqual("'\\");
  });

  it('expand group and alteration', () => {
    const grammar = new Grammar({
      productions: [
        {
          symbol: 'start',
          rhs: [
            '1',
            '2',
            alternationMark,
            '3',
            '4',
            groupStartMark,
            '5',
            '6',
            groupStartMark,
            '7',
            '8',
            alternationMark,
            '9',
            groupEndMark,
            '10',
            alternationMark,
            '11',
            `${groupEndMark}*`,
          ],
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
          rhs: [
            n.groupStartMark,
            '1?',
            n.groupStartMark,
            ',',
            n.alternationMark,
            ';',
            n.groupEndMark,
            n.groupEndZeroOrMoreMark,
            // '1',
            // n.groupStartMark,
            // n.groupStartMark,
            // ',',
            // n.alternationMark,
            // ';',
            // n.groupEndMark,
            // '1?',
            // n.groupEndZeroOrMoreMark,
          ],
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
