
import LLKGrammar from '../src/llk/LLKGrammar';
import { prettyJson, run, HIDDEN_LEXER_RULE } from './utils';
import Lexer from '../src/Lexer';
import type Parser from '../src/parser';

const startGroupMarker = `'('`;
const startPredictGroupMarker = `'(?'`;
const endGroupMarker = `')'`;
const alterMark = `'|'`;
const alterPredictMark = `'|?'`;

describe('llk predict', () => {
  it('simple predict', () => {
    interface ThisArg {
      userData: {
        count?: number;
      };
      lexer: Lexer;
    }
    var grammar = new LLKGrammar({
      productions: [
        {
          symbol: 'program',
          rhs: ['sequence+'],
        },

        {
          symbol: 'sequence',
          rhs: ['NUMBER', 'sequence2'],
          action(this: ThisArg) {
            this.userData = {};
          },
        },
        {
          symbol: 'sequence2',
          rhs: [
            'NUMBER',
            function (this: ThisArg) {
              if (this.userData.count) this.userData.count--;
            },
            'sequence2',
          ],
          predict(this: ThisArg) {
            if (this.userData.count === undefined) {
              const tokens = this.lexer.tokens;
              let index = tokens.length - 2;
              let token = tokens[index];
              while (index && token.channel) {
                token = tokens[--index];
              }
              this.userData.count = parseInt(token.text);
            } else if (this.userData.count === 0) {
              return false;
            }
          },
        },
        {
          symbol: 'sequence2',
          rhs: [],
          predict(this: any) {
            if (this.userData.count) {
              return false;
            }
          },
        },
      ],
      lexer: {
        rules: [
          HIDDEN_LEXER_RULE,
          {
            token: 'NUMBER',
            regexp: /\d+/,
          },
        ],
      },
    });

    const code = grammar.genCode();
    const parser = run(code);
    let ret = parser.parse('2 1 1 3 1 1 1');
    expect(ret.error).toBeFalsy();
    expect(prettyJson(ret.ast)).toMatchSnapshot();
    ret = parser.parse('2 1 1 3 1 1 ');
    expect(ret.error).toMatchSnapshot();
  });


  it('support group predict', () => {
    var grammar = new LLKGrammar({
      productions: [
        {
          symbol: 'program',
          rhs: ['sequence+'],
        },

        {
          symbol: 'sequence',
          rhs: ['NUMBER',

            startPredictGroupMarker,

            function (this:typeof Parser){
              const token = this.lexer.getLastToken((t)=>!t.channel);
              return token.text==='3';
            },
            'sequence3',
            alterPredictMark,
            function (this:typeof Parser){
              const token = this.lexer.getLastToken((t)=>!t.channel);
              return token.text==='2';
            },
            'sequence2',
            alterMark,
            'sequence1',
            endGroupMarker,
          ]
        },
        {
          symbol: 'sequence1',
          rhs: [
            'NUMBER',
          ],
        },
        {
          symbol: 'sequence2',
          rhs: ['NUMBER', 'NUMBER',],
        },
        {
          symbol: 'sequence3',
          rhs: ['NUMBER', 'NUMBER', 'NUMBER'],
        },
      ],
      lexer: {
        rules: [
          HIDDEN_LEXER_RULE,
          {
            token: 'NUMBER',
            regexp: /\d+/,
          },
        ],
      },
    });


    const code = grammar.genCode();
    const parser = run(code);
    let ret = parser.parse('2 1 1 3 1 1 1');
    expect(ret.error).toBeFalsy();
    expect(prettyJson(ret.ast)).toMatchSnapshot();
    ret = parser.parse('2 1 1 3 1 1 ');
    expect(ret.error).toMatchSnapshot();
    // global match!
    ret = parser.parse('2 1 1 5');
    expect(ret.error).toMatchSnapshot();
  });
});