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
  'start': 1,
  'end': 26,
  'firstLine': 2,
  'lastLine': 4,
  'firstColumn': 1,
  'lastColumn': 8,
  'symbol': 'progam',
  'type': 'symbol',
  'children': [
    {
      'start': 1,
      'end': 26,
      'firstLine': 2,
      'lastLine': 4,
      'firstColumn': 1,
      'lastColumn': 8,
      'symbol': 'moduleBody',
      'type': 'symbol',
      'children': [
        {
          'start': 1,
          'end': 26,
          'firstLine': 2,
          'lastLine': 4,
          'firstColumn': 1,
          'lastColumn': 8,
          'symbol': 'moduleBodyElement',
          'type': 'symbol',
          'children': [
            {
              'start': 1,
              'end': 26,
              'firstLine': 2,
              'lastLine': 4,
              'firstColumn': 1,
              'lastColumn': 8,
              'symbol': 'subStmt',
              'type': 'symbol',
              'children': [
                {
                  'start': 1,
                  'end': 4,
                  'firstLine': 2,
                  'lastLine': 2,
                  'firstColumn': 1,
                  'lastColumn': 4,
                  'token': 'SUB',
                  'type': 'token',
                  'text': 'sub'
                },
                {
                  'start': 5,
                  'end': 9,
                  'firstLine': 2,
                  'lastLine': 2,
                  'firstColumn': 5,
                  'lastColumn': 9,
                  'token': 'IDENTIFIER',
                  'type': 'token',
                  'text': 'test'
                },
                {
                  'start': 10,
                  'end': 18,
                  'firstLine': 3,
                  'lastLine': 3,
                  'firstColumn': 1,
                  'lastColumn': 9,
                  'symbol': 'block',
                  'type': 'symbol',
                  'children': [
                    {
                      'start': 10,
                      'end': 18,
                      'firstLine': 3,
                      'lastLine': 3,
                      'firstColumn': 1,
                      'lastColumn': 9,
                      'symbol': 'blockStmt',
                      'type': 'symbol',
                      'children': [
                        {
                          'start': 10,
                          'end': 18,
                          'firstLine': 3,
                          'lastLine': 3,
                          'firstColumn': 1,
                          'lastColumn': 9,
                          'symbol': 'implicitCallStmt_InBlock',
                          'type': 'symbol',
                          'children': [
                            {
                              'start': 10,
                              'end': 18,
                              'firstLine': 3,
                              'lastLine': 3,
                              'firstColumn': 1,
                              'lastColumn': 9,
                              'symbol': 'iCS_B_ProcedureCall',
                              'type': 'symbol',
                              'children': [
                                {
                                  'start': 10,
                                  'end': 16,
                                  'firstLine': 3,
                                  'lastLine': 3,
                                  'firstColumn': 1,
                                  'lastColumn': 7,
                                  'token': 'IDENTIFIER',
                                  'type': 'token',
                                  'text': 'MsgBox'
                                },
                                {
                                  'start': 17,
                                  'end': 18,
                                  'firstLine': 3,
                                  'lastLine': 3,
                                  'firstColumn': 8,
                                  'lastColumn': 9,
                                  'symbol': 'argsCall',
                                  'type': 'symbol',
                                  'children': [
                                    {
                                      'start': 17,
                                      'end': 18,
                                      'firstLine': 3,
                                      'lastLine': 3,
                                      'firstColumn': 8,
                                      'lastColumn': 9,
                                      'symbol': 'argCall',
                                      'type': 'symbol',
                                      'children': [
                                        {
                                          'start': 17,
                                          'end': 18,
                                          'firstLine': 3,
                                          'lastLine': 3,
                                          'firstColumn': 8,
                                          'lastColumn': 9,
                                          'symbol': 'valueStmt',
                                          'type': 'symbol',
                                          'children': [
                                            {
                                              'start': 17,
                                              'end': 18,
                                              'firstLine': 3,
                                              'lastLine': 3,
                                              'firstColumn': 8,
                                              'lastColumn': 9,
                                              'symbol': 'literal',
                                              'type': 'symbol',
                                              'children': [
                                                {
                                                  'start': 17,
                                                  'end': 18,
                                                  'firstLine': 3,
                                                  'lastLine': 3,
                                                  'firstColumn': 8,
                                                  'lastColumn': 9,
                                                  'token': 'INTEGERLITERAL',
                                                  'type': 'token',
                                                  'text': '1'
                                                }
                                              ],
                                              'ruleIndex': 29
                                            }
                                          ],
                                          'ruleIndex': 28
                                        }
                                      ],
                                      'ruleIndex': 18
                                    }
                                  ],
                                  'ruleIndex': 14
                                }
                              ],
                              'ruleIndex': 13
                            }
                          ],
                          'ruleIndex': 12
                        }
                      ],
                      'ruleIndex': 11
                    }
                  ],
                  'ruleIndex': 9
                },
                {
                  'start': 19,
                  'end': 26,
                  'firstLine': 4,
                  'lastLine': 4,
                  'firstColumn': 1,
                  'lastColumn': 8,
                  'token': 'END_SUB',
                  'type': 'token',
                  'text': 'end sub'
                }
              ],
              'ruleIndex': 8
            }
          ],
          'ruleIndex': 3
        }
      ],
      'ruleIndex': 2
    }
  ],
  'ruleIndex': 1
}"
`);
  });
});
