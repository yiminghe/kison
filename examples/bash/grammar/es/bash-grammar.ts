/// <reference path="../../../../types/index.d.ts" />
// http://msdn.microsoft.com/en-us/library/aa338033%28v=vs.60%29.aspx
import * as n from './names';

function RegexEscape(input: string) {
  return input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function generateLexerRulesByMap(map: any) {
  const rules: any = [];
  for (const token of Object.keys(map)) {
    const regexp = new RegExp(RegexEscape(map[token]));
    rules.push([token, regexp]);
  }
  return rules;
}

function generateLexerRulesByKeywords(arr: any[]) {
  const rules: any = [];
  for (const token of arr) {
    const regexp = new RegExp(RegexEscape(token) + '\\b', 'i');
    rules.push([
      token,
      regexp,
      function action(this: any) {
        this.text = (this.text || '').toLowerCase();
      },
    ]);
  }
  return rules;
}

const LINE_CONTINUATION = `([\\u0020\\t]+_\\r?\\n)`;
const WS = `((${LINE_CONTINUATION}|[\\u0020\\t])+)`;
const HIDDEN_REG = new RegExp(
  `
${WS}
|
(\\s+)
|
#.*
`.replace(/\s/g, ''),
  'i',
);

export default (options: Kison.Options) => {
  const nn = n.makeExtendSymbols(options);
  const {
    makeAlternates,
    makeOptionalGroup,
    makeGroup,
    makeOneOrMoreGroup,
    makeZeroOrMoreGroup,
  } = options;
  return {
    productions: n.makeProductions([
      [n.progamName, ...makeOneOrMoreGroup(n.commandName)],

      [n.commandName, ...makeOneOrMoreGroup(n.literalName)],

      [
        n.literalName,
        ...makeAlternates(
          n.WORDName,
          n.stringName,
          n.RAW_STRINGName,
          n.ANSII_C_STRINGName,
        ),
      ],

      [
        n.stringName,
        n.QUOTEName,
        ...makeZeroOrMoreGroup(nn.DOLLAROptional, n.STRING_CONTENTName),
        n.QUOTEName,
      ],
    ]),

    lexer: {
      rules: n.makeLexerRules([
        {
          regexp: /^"/,
          token: n.QUOTEName,
          action(this: any) {
            this.userData.stringTag = this.userData.stringTag || [];
            const { stringTag } = this.userData;
            if (stringTag[stringTag.length - 1]?.inString) {
              stringTag.pop();
            } else {
              stringTag.push({
                inString: 1,
              });
            }
          },
        },

        {
          regexp: /^([^"`$\\]|\\(.|\r?\n))+/,
          token: n.STRING_CONTENTName,
          predict(this: any) {
            const { stringTag } = this.userData;
            return !!(stringTag && stringTag[stringTag.length - 1]?.inString);
          },
        },

        ...generateLexerRulesByKeywords([]),

        [
          n.WORDName,
          /(([^#'\"<>{}\[\]()`$|&;\\\s])|(\\[^\s]))(([^'"<>{}\[\]()`$|&;\\\s])|(\\[^\s]))*/,
        ],

        [n.RAW_STRINGName, /'[^']*'/],

        [n.ANSII_C_STRINGName, /\$'([^']|\\')*'/],

        ...generateLexerRulesByMap({}),

        {
          token: 'HIDDEN',
          channel: 'HIDDEN',
          regexp: HIDDEN_REG,
        },
      ]),
    },
  };
};
