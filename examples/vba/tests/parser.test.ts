import { prettyJson } from '../../../__tests__/utils';
import parser from '../src/parserLLK';

describe('vba parser', () => {
  it('parse correctly', () => {
    const code = `
sub test
MsgBox 1
end sub
`;
    const ret = parser.parse(code);

    expect(ret.error?.errorMessage).toMatchInlineSnapshot(`undefined`);

    expect(prettyJson(ret.ast)).toMatchInlineSnapshot(`
"{
  'symbol': 'progam',
  'type': 'symbol',
  'ruleIndex': 1,
  'children': [
    {
      'symbol': 'moduleBody',
      'type': 'symbol',
      'ruleIndex': 2,
      'children': [
        {
          'symbol': 'moduleBodyElement',
          'type': 'symbol',
          'ruleIndex': 3,
          'children': [
            {
              'symbol': 'subStmt',
              'type': 'symbol',
              'ruleIndex': 8,
              'children': [
                {
                  'type': 'token',
                  'text': 'sub',
                  'token': 'SUB',
                  'start': 1,
                  'end': 4,
                  'firstLine': 2,
                  'lastLine': 2,
                  'firstColumn': 1,
                  'lastColumn': 4
                },
                {
                  'type': 'token',
                  'text': 'test',
                  'token': 'IDENTIFIER',
                  'start': 5,
                  'end': 9,
                  'firstLine': 2,
                  'lastLine': 2,
                  'firstColumn': 5,
                  'lastColumn': 9
                },
                {
                  'symbol': 'block',
                  'type': 'symbol',
                  'ruleIndex': 9,
                  'children': [
                    {
                      'symbol': 'blockStmt',
                      'type': 'symbol',
                      'ruleIndex': 11,
                      'children': [
                        {
                          'symbol': 'implicitCallStmt_InBlock',
                          'type': 'symbol',
                          'ruleIndex': 12,
                          'children': [
                            {
                              'symbol': 'iCS_B_ProcedureCall',
                              'type': 'symbol',
                              'ruleIndex': 13,
                              'children': [
                                {
                                  'type': 'token',
                                  'text': 'MsgBox',
                                  'token': 'IDENTIFIER',
                                  'start': 10,
                                  'end': 16,
                                  'firstLine': 3,
                                  'lastLine': 3,
                                  'firstColumn': 1,
                                  'lastColumn': 7
                                },
                                {
                                  'symbol': 'argsCall',
                                  'type': 'symbol',
                                  'ruleIndex': 14,
                                  'children': [
                                    {
                                      'symbol': 'argCall',
                                      'type': 'symbol',
                                      'ruleIndex': 18,
                                      'children': [
                                        {
                                          'symbol': 'valueStmt',
                                          'type': 'symbol',
                                          'ruleIndex': 28,
                                          'children': [
                                            {
                                              'symbol': 'literal',
                                              'type': 'symbol',
                                              'ruleIndex': 29,
                                              'children': [
                                                {
                                                  'type': 'token',
                                                  'text': '1',
                                                  'token': 'INTEGERLITERAL',
                                                  'start': 17,
                                                  'end': 18,
                                                  'firstLine': 3,
                                                  'lastLine': 3,
                                                  'firstColumn': 8,
                                                  'lastColumn': 9
                                                }
                                              ],
                                              'start': 17,
                                              'end': 18,
                                              'firstLine': 3,
                                              'lastLine': 3,
                                              'firstColumn': 8,
                                              'lastColumn': 9
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ],
                              'start': 10,
                              'firstLine': 3,
                              'firstColumn': 1
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  'type': 'token',
                  'text': 'end sub',
                  'token': 'END_SUB',
                  'start': 19,
                  'end': 26,
                  'firstLine': 4,
                  'lastLine': 4,
                  'firstColumn': 1,
                  'lastColumn': 8
                }
              ],
              'start': 1,
              'end': 26,
              'firstLine': 2,
              'lastLine': 4,
              'firstColumn': 1,
              'lastColumn': 8
            }
          ]
        }
      ]
    }
  ]
}"
`);
  });
});
