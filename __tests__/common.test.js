import Grammar from '../lib/Grammar';
import Utils from '../lib/utils';
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

    grammar.expandProductionAlternative();

    expect(prettyJson(grammar.productions.slice(1))).toMatchInlineSnapshot(`
"[
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

    expect(prettyJson(grammar.productions.slice(1))).toMatchInlineSnapshot(`
"[
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

    grammar.expandProductionAlternative();

    expect(prettyJson(grammar.productions.slice(1))).toMatchInlineSnapshot(`
"[
  {
    'symbol': 'start',
    'rhs': [
      ''('',
      '1?',
      ''('',
      ',',
      '')'',
      '')'*'
    ]
  },
  {
    'symbol': 'start',
    'rhs': [
      ''('',
      '1?',
      ''('',
      ';',
      '')'',
      '')'*'
    ]
  }
]"
`);
  });
});
