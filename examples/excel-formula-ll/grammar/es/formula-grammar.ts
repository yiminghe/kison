/// <reference path="../../../../types/index.d.ts" />

import * as n from './names';
// https://docs.oasis-open.org/office/OpenDocument/v1.3/OpenDocument-v1.3-part4-formula.html

const operators: any = [
  ['left', '=', '<=', '>=', '<>', '>', '<'],
  ['left', '&'],
  ['left', '+', '-'],
  ['left', '*', '/'],
  ['left', '^'],
  ['precedence', '%'],
  ['precedence', n.UMINUS, n.UPLUS],
  ['precedence', '@'],
  ['left', n.REF_UNION_OPERATOR],
  ['left', n.REF_INTERSECTION_OPERATOR],
  ['left', n.REF_RANGE_OPERATOR],
];

const binaryOperators = [].concat(
  ...operators.slice(0, 5).map((a: string[]) => a.slice(1)),
);

const decimalFractionLiteral = '(?:[0-9][0-9]*)';
const decimalIntegerLiteral = '(?:0|[1-9][0-9]*)';
const exponentPart = '(?:[eE][+-]?[0-9]+)';
const namePart = '(?:[_A-Za-z\u4e00-\u9fa5]+[_A-Za-z_0-9\u4e00-\u9fa5]*)';
const fullNamePart = `(?:${namePart}(?:\\.${namePart})*)`;
const cellAddressLiteral = `(?:\\$?[A-Za-z]+\\$?[0-9]+)`;
const rowRangeAddress = `(?:\\d+\\:\\d+)`;
const cellAddress = `(?:
  ${cellAddressLiteral}
  (?:
    \\s*
    \\:
    \\s*
    ${cellAddressLiteral}
    )?
  #?
)`.replace(/\s/g, '');
const sheetAddress = `(?:(?:
  
  (?:'(?:''|[^'])*')
  
  |

(?:${namePart}(?:\\:${namePart})?)

)!)`.replace(/\s/g, '');
const tableColumnSpecifierLiteral = `(?:
  \\[
    (?:
      '.|[^\\]'#]
      )+
    \\]
  )`.replace(/\s/g, '');
const tableColumnRange = `(?:${tableColumnSpecifierLiteral}(?:\\:${tableColumnSpecifierLiteral})?)`;
const tableColumnSpecifier = `(?:${tableColumnRange}|(?:'.|[^\\]#'])+)`;

const my = {
  insideStructureRef: 'inside structure reference',
  markType(self: any, type: string, enter = true) {
    const { userData } = self;
    userData[type] = userData[type] || 0;
    if (enter) {
      ++userData[type];
    } else if (userData.inArray) {
      --userData[type];
    }
  },
  last(arr: any[]) {
    return arr && arr[arr.length - 1];
  },
};

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
    my,
    operators,
    productions: [
      {
        symbol: n.formula,
        rhs: [n.exp],
      },
      ...binaryOperators.map((op) => ({
        symbol: n.exp,
        rhs: [n.exp, op, n.exp],
        label: n.binaryExp,
      })),
      {
        symbol: n.exp,
        rhs: ['+', n.exp],
        precedence: n.UPLUS,
        label: n.prefixExp,
      },
      {
        symbol: n.exp,
        rhs: ['-', n.exp],
        precedence: n.UMINUS,
        label: n.prefixExp,
      },
      {
        symbol: n.exp,
        rhs: ['@', n.exp],
        label: n.clipExp,
      },
      {
        symbol: n.exp,
        rhs: [n.exp, '%'],
        label: n.percentageExp,
      },
      {
        symbol: n.exp,
        rhs: ['(', n.exp, ')'],
      },
      {
        symbol: n.exp,
        rhs: [n.NUMBER],
      },
      {
        symbol: n.exp,
        rhs: [n.STRING],
      },
      {
        symbol: n.exp,
        rhs: [n.LOGIC],
      },
      {
        symbol: n.exp,
        rhs: [n.ERROR],
      },
      {
        symbol: n.exp,
        rhs: [n.reference],
      },
      {
        symbol: n.referenceItem,
        rhs: [n.CELL],
      },
      {
        symbol: n.referenceItem,
        rhs: [n.NAME],
      },
      {
        symbol: n.referenceItem,
        rhs: [n.structureReference],
      },
      // reference operator: : SPACE ,
      {
        symbol: n.reference,
        rhs: [n.reference, n.REF_UNION_OPERATOR, n.reference],
        label: n.unionReference,
      },
      {
        symbol: n.reference,
        rhs: [n.reference, n.reference],
        precedence: n.REF_INTERSECTION_OPERATOR,
        label: n.intersectionReference,
      },
      {
        symbol: n.reference,
        rhs: [n.reference, n.REF_RANGE_OPERATOR, n.reference],
        label: n.rangeReference,
      },
      {
        symbol: n.reference,
        rhs: [n.referenceItem],
      },
      {
        symbol: n.exp,
        rhs: [n.functionExp],
      },
      {
        symbol: n.exp,
        rhs: [n.array],
      },
      {
        symbol: n.arrayElement,
        rhs: [n.STRING],
      },
      {
        symbol: n.arrayElement,
        rhs: [n.NUMBER],
      },
      {
        symbol: n.arrayElement,
        rhs: [n.LOGIC],
      },
      {
        symbol: n.arrayElement,
        rhs: [n.ERROR],
      },
      // array = '{', array-element, array-element-part*, '}'
      {
        symbol: n.array,
        rhs: [
          '{',
          n.arrayElement,
          ...makeZeroOrMoreGroup(n.ARRAY_SEPARATOR, n.arrayElement),
          '}',
        ],
      },

      // function
      {
        symbol: n.functionExp,
        rhs: [n.FUNCTION, '(', n.argumentsList, ')'],
      },
      // arguments => exp?(,exp?)*
      {
        symbol: n.argumentsList,
        rhs: [
          nn.expOptional,
          ...makeZeroOrMoreGroup(n.ARGUMENT_SEPARATOR, nn.expOptional),
        ],
      },

      // structure reference
      {
        symbol: n.structureReference,
        rhs: [n.TABLE_NAME, n.tableSpecifier],
      },
      {
        symbol: n.structureReference,
        rhs: [n.tableSpecifier],
      },
      {
        symbol: n.tableSpecifier,
        rhs: [n.TABLE_ITEM_SPECIFIER],
      },
      {
        symbol: n.tableSpecifier,
        rhs: ['[', n.tableSpecifierInner, ']'],
      },
      {
        symbol: n.tableThisRow,
        rhs: [n.TABLE_AT],
      },
      {
        symbol: n.tableThisRow,
        rhs: [n.TABLE_AT, n.TABLE_COLUMN_SPECIFIER],
      },
      {
        symbol: n.tableSpecifierInner,
        rhs: [n.tableThisRow],
      },
      {
        symbol: n.tableSpecifierInner,
        rhs: [n.tableColumnSpecifier],
      },
      {
        symbol: n.tableSpecifierItem,
        rhs: [n.TABLE_COLUMN_SPECIFIER],
      },
      {
        symbol: n.tableSpecifierItem,
        rhs: [n.TABLE_ITEM_SPECIFIER],
      },
      // table-column-specifier = table-specifier-item (,table-specifier-item)*
      {
        symbol: n.tableColumnSpecifier,
        rhs: [
          n.tableSpecifierItem,
          ...makeZeroOrMoreGroup(n.SPECIFIER_SEPARATOR, n.tableSpecifierItem),
        ],
      },
    ],

    lexer: {
      defaultEnv: 'en',

      rules: [
        {
          state: [my.insideStructureRef, 'I'],
          regexp: /^\s+/,
          token: 'HIDDEN',
          channel: 'HIDDEN',
        },
        {
          regexp: /^\(/,
          token: '(',
          action(this: any) {
            if (this.tokens[this.tokens.length - 1]?.token === 'FUNCTION') {
              return;
            }
            const { userData } = this;
            userData.markParen = userData.markParen || [];
            userData.markParen.push({ func: false });
          },
        },
        {
          regexp: /^\)/,
          token: ')',
          action(this: any) {
            const { userData } = this;
            userData.markParen = userData.markParen || [];
            userData.markParen.pop();
          },
        },
        {
          regexp: /^\{/,
          token: '{',
          action(this: any) {
            // array constants
            my.markType(this, 'a');
          },
        },

        {
          regexp: /^\}/,
          token: '}',
          action(this: any) {
            my.markType(this, 'a', false);
          },
        },

        // structure reference
        {
          state: [my.insideStructureRef],
          regexp: /^,/,
          token: n.SPECIFIER_SEPARATOR,
        },
        {
          state: [my.insideStructureRef, 'I'],
          regexp: /^\[#('.|[^\]#])+\]/,
          token: n.TABLE_ITEM_SPECIFIER,
        },
        {
          state: [my.insideStructureRef],
          regexp: /^@/,
          token: n.TABLE_AT,
        },
        {
          state: [my.insideStructureRef],
          regexp: new RegExp(`^${tableColumnSpecifier}`),
          token: n.TABLE_COLUMN_SPECIFIER,
        },
        {
          state: [my.insideStructureRef, 'I'],
          regexp: /^\[/,
          token: '[',
          action(this: any) {
            this.pushState(my.insideStructureRef);
          },
        },

        {
          state: [my.insideStructureRef],
          regexp: /^\]/,
          token: ']',
          action(this: any) {
            this.popState();
          },
        },
        {
          predict(this: any) {
            return !!this.userData.a;
          },
          regexp: { en: /^[,;]/, de: /^[\\;]/ },
          token: n.ARRAY_SEPARATOR,
        },
        {
          predict(this: any) {
            const lastItem = my.last(this.userData.markParen);
            return !lastItem || !lastItem.func;
          },
          regexp: /^,/,
          token: n.REF_UNION_OPERATOR,
        },
        {
          regexp: /^:/,
          token: n.REF_RANGE_OPERATOR,
        },
        {
          regexp: { en: /^,/, de: /^;/ },
          token: n.ARGUMENT_SEPARATOR,
        },
        {
          regexp: /^"(?:""|[^"])*"/,
          token: n.STRING,
          action(this: any) {
            this.text = this.text.slice(1, -1).replace(/""/g, '"');
          },
        },
        {
          regexp: new RegExp(`^${fullNamePart}(?=[(])`),
          token: n.FUNCTION,
          action(this: any) {
            const { userData } = this;
            userData.markParen = userData.markParen || [];
            userData.markParen.push({ func: true });
          },
        },
        {
          regexp: new RegExp(`^${fullNamePart}(?=[\\[])`),
          token: n.TABLE_NAME,
        },
        {
          regexp: /^#[A-Z0-9\/]+(!|\?)? /,
          token: n.ERROR,
        },
        {
          // @: disable array formula, allow  Implicit Intersection
          // #: spill reference
          regexp: new RegExp(
            `^${sheetAddress}?(?:${cellAddress}|${rowRangeAddress})`,
          ),
          token: n.CELL,
        },
        {
          regexp: /^(TRUE|FALSE)(?=\b)/i,
          token: n.LOGIC,
        },
        {
          regexp: new RegExp(`^${fullNamePart}`),
          token: n.NAME,
        },
        {
          regexp: {
            en: new RegExp(
              `^${decimalIntegerLiteral}?\\.${decimalFractionLiteral}${exponentPart}?`,
            ),
            de: new RegExp(
              `^${decimalIntegerLiteral}?,${decimalFractionLiteral}${exponentPart}?`,
            ),
          },
          token: n.NUMBER,
        },
        {
          regexp: new RegExp(`^${decimalIntegerLiteral}${exponentPart}?`),
          token: n.NUMBER,
        },
      ],
    },
  };
};
