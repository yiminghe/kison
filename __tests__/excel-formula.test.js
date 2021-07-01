import { expect } from "@jest/globals";
import formula from "../examples/excel-formula-ll/formula";
import { prettyJson } from "./utils";

function parse(input) {
  return formula.parse(input, {
    lexerEnv: "en"
  });
}

describe("excel-formula-parser", () => {
  it("works for simple", () => {
    expect(prettyJson(parse(`sum(a1:a2,b1)`).ast)).toMatchInlineSnapshot(`
      "{
        'symbol': 'formula',
        'children': [
          {
            'symbol': 'atom-exp',
            'label': 'single-exp',
            'children': [
              {
                'symbol': 'function',
                'children': [
                  {
                    'text': 'sum',
                    'token': 'FUNCTION',
                    'start': 0,
                    'end': 3,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 1,
                    'lastColumn': 4
                  },
                  {
                    'text': '(',
                    'token': '(',
                    'start': 3,
                    'end': 4,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 4,
                    'lastColumn': 5
                  },
                  {
                    'symbol': 'arguments',
                    'children': [
                      {
                        'symbol': 'arguments',
                        'children': [
                          {
                            'symbol': 'atom-exp',
                            'label': 'single-exp',
                            'children': [
                              {
                                'symbol': 'reference',
                                'children': [
                                  {
                                    'symbol': 'reference-item',
                                    'children': [
                                      {
                                        'text': 'a1:a2',
                                        'token': 'CELL',
                                        'start': 4,
                                        'end': 9,
                                        'firstLine': 1,
                                        'lastLine': 1,
                                        'firstColumn': 5,
                                        'lastColumn': 10
                                      }
                                    ],
                                    'start': 4,
                                    'end': 9,
                                    'firstLine': 1,
                                    'lastLine': 1,
                                    'firstColumn': 5,
                                    'lastColumn': 10
                                  }
                                ],
                                'start': 4,
                                'end': 9,
                                'firstLine': 1,
                                'lastLine': 1,
                                'firstColumn': 5,
                                'lastColumn': 10
                              }
                            ],
                            'start': 4,
                            'end': 9,
                            'firstLine': 1,
                            'lastLine': 1,
                            'firstColumn': 5,
                            'lastColumn': 10
                          }
                        ],
                        'start': 4,
                        'end': 9,
                        'firstLine': 1,
                        'lastLine': 1,
                        'firstColumn': 5,
                        'lastColumn': 10
                      },
                      {
                        'text': ',',
                        'token': 'ARGUMENT_SEPARATOR',
                        'start': 9,
                        'end': 10,
                        'firstLine': 1,
                        'lastLine': 1,
                        'firstColumn': 10,
                        'lastColumn': 11
                      },
                      {
                        'symbol': 'atom-exp',
                        'label': 'single-exp',
                        'children': [
                          {
                            'symbol': 'reference',
                            'children': [
                              {
                                'symbol': 'reference-item',
                                'children': [
                                  {
                                    'text': 'b1',
                                    'token': 'CELL',
                                    'start': 10,
                                    'end': 12,
                                    'firstLine': 1,
                                    'lastLine': 1,
                                    'firstColumn': 11,
                                    'lastColumn': 13
                                  }
                                ],
                                'start': 10,
                                'end': 12,
                                'firstLine': 1,
                                'lastLine': 1,
                                'firstColumn': 11,
                                'lastColumn': 13
                              }
                            ],
                            'start': 10,
                            'end': 12,
                            'firstLine': 1,
                            'lastLine': 1,
                            'firstColumn': 11,
                            'lastColumn': 13
                          }
                        ],
                        'start': 10,
                        'end': 12,
                        'firstLine': 1,
                        'lastLine': 1,
                        'firstColumn': 11,
                        'lastColumn': 13
                      }
                    ],
                    'start': 4,
                    'end': 12,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 5,
                    'lastColumn': 13
                  },
                  {
                    'text': ')',
                    'token': ')',
                    'start': 12,
                    'end': 13,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 13,
                    'lastColumn': 14
                  }
                ],
                'start': 0,
                'end': 13,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 1,
                'lastColumn': 14
              }
            ],
            'start': 0,
            'end': 13,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 1,
            'lastColumn': 14
          }
        ],
        'start': 0,
        'end': 13,
        'firstLine': 1,
        'lastLine': 1,
        'firstColumn': 1,
        'lastColumn': 14
      }"
    `);
  });

  it("works for intersection", () => {
    expect(prettyJson(parse(`sum(a1:a2 b1)`).ast)).toMatchInlineSnapshot(`
      "{
        'symbol': 'formula',
        'children': [
          {
            'symbol': 'atom-exp',
            'label': 'single-exp',
            'children': [
              {
                'symbol': 'function',
                'children': [
                  {
                    'text': 'sum',
                    'token': 'FUNCTION',
                    'start': 0,
                    'end': 3,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 1,
                    'lastColumn': 4
                  },
                  {
                    'text': '(',
                    'token': '(',
                    'start': 3,
                    'end': 4,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 4,
                    'lastColumn': 5
                  },
                  {
                    'symbol': 'arguments',
                    'children': [
                      {
                        'symbol': 'atom-exp',
                        'label': 'single-exp',
                        'children': [
                          {
                            'symbol': 'reference',
                            'children': [
                              {
                                'symbol': 'reference',
                                'children': [
                                  {
                                    'symbol': 'reference-item',
                                    'children': [
                                      {
                                        'text': 'a1:a2',
                                        'token': 'CELL',
                                        'start': 4,
                                        'end': 9,
                                        'firstLine': 1,
                                        'lastLine': 1,
                                        'firstColumn': 5,
                                        'lastColumn': 10
                                      }
                                    ],
                                    'start': 4,
                                    'end': 9,
                                    'firstLine': 1,
                                    'lastLine': 1,
                                    'firstColumn': 5,
                                    'lastColumn': 10
                                  }
                                ],
                                'start': 4,
                                'end': 9,
                                'firstLine': 1,
                                'lastLine': 1,
                                'firstColumn': 5,
                                'lastColumn': 10
                              },
                              {
                                'symbol': 'reference-item',
                                'children': [
                                  {
                                    'text': 'b1',
                                    'token': 'CELL',
                                    'start': 10,
                                    'end': 12,
                                    'firstLine': 1,
                                    'lastLine': 1,
                                    'firstColumn': 11,
                                    'lastColumn': 13
                                  }
                                ],
                                'start': 10,
                                'end': 12,
                                'firstLine': 1,
                                'lastLine': 1,
                                'firstColumn': 11,
                                'lastColumn': 13
                              }
                            ],
                            'start': 4,
                            'end': 12,
                            'firstLine': 1,
                            'lastLine': 1,
                            'firstColumn': 5,
                            'lastColumn': 13
                          }
                        ],
                        'start': 4,
                        'end': 12,
                        'firstLine': 1,
                        'lastLine': 1,
                        'firstColumn': 5,
                        'lastColumn': 13
                      }
                    ],
                    'start': 4,
                    'end': 12,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 5,
                    'lastColumn': 13
                  },
                  {
                    'text': ')',
                    'token': ')',
                    'start': 12,
                    'end': 13,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 13,
                    'lastColumn': 14
                  }
                ],
                'start': 0,
                'end': 13,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 1,
                'lastColumn': 14
              }
            ],
            'start': 0,
            'end': 13,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 1,
            'lastColumn': 14
          }
        ],
        'start': 0,
        'end': 13,
        'firstLine': 1,
        'lastLine': 1,
        'firstColumn': 1,
        'lastColumn': 14
      }"
    `);
  });
  it("works for union", () => {
    expect(prettyJson(parse(`sum((a1:a2,b1))`).ast)).toMatchInlineSnapshot(`
      "{
        'symbol': 'formula',
        'children': [
          {
            'symbol': 'atom-exp',
            'label': 'single-exp',
            'children': [
              {
                'symbol': 'function',
                'children': [
                  {
                    'text': 'sum',
                    'token': 'FUNCTION',
                    'start': 0,
                    'end': 3,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 1,
                    'lastColumn': 4
                  },
                  {
                    'text': '(',
                    'token': '(',
                    'start': 3,
                    'end': 4,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 4,
                    'lastColumn': 5
                  },
                  {
                    'symbol': 'arguments',
                    'children': [
                      {
                        'symbol': 'atom-exp',
                        'label': 'single-exp',
                        'children': [
                          {
                            'text': '(',
                            'token': '(',
                            'start': 4,
                            'end': 5,
                            'firstLine': 1,
                            'lastLine': 1,
                            'firstColumn': 5,
                            'lastColumn': 6
                          },
                          {
                            'symbol': 'atom-exp',
                            'children': [
                              {
                                'symbol': 'reference',
                                'children': [
                                  {
                                    'symbol': 'reference',
                                    'children': [
                                      {
                                        'symbol': 'reference-item',
                                        'children': [
                                          {
                                            'text': 'a1:a2',
                                            'token': 'CELL',
                                            'start': 5,
                                            'end': 10,
                                            'firstLine': 1,
                                            'lastLine': 1,
                                            'firstColumn': 6,
                                            'lastColumn': 11
                                          }
                                        ],
                                        'start': 5,
                                        'end': 10,
                                        'firstLine': 1,
                                        'lastLine': 1,
                                        'firstColumn': 6,
                                        'lastColumn': 11
                                      }
                                    ],
                                    'start': 5,
                                    'end': 10,
                                    'firstLine': 1,
                                    'lastLine': 1,
                                    'firstColumn': 6,
                                    'lastColumn': 11
                                  },
                                  {
                                    'text': ',',
                                    'token': 'REF_SEPARATOR',
                                    'start': 10,
                                    'end': 11,
                                    'firstLine': 1,
                                    'lastLine': 1,
                                    'firstColumn': 11,
                                    'lastColumn': 12
                                  },
                                  {
                                    'symbol': 'reference-item',
                                    'children': [
                                      {
                                        'text': 'b1',
                                        'token': 'CELL',
                                        'start': 11,
                                        'end': 13,
                                        'firstLine': 1,
                                        'lastLine': 1,
                                        'firstColumn': 12,
                                        'lastColumn': 14
                                      }
                                    ],
                                    'start': 11,
                                    'end': 13,
                                    'firstLine': 1,
                                    'lastLine': 1,
                                    'firstColumn': 12,
                                    'lastColumn': 14
                                  }
                                ],
                                'start': 5,
                                'end': 13,
                                'firstLine': 1,
                                'lastLine': 1,
                                'firstColumn': 6,
                                'lastColumn': 14
                              }
                            ],
                            'label': 'single-exp',
                            'start': 5,
                            'end': 13,
                            'firstLine': 1,
                            'lastLine': 1,
                            'firstColumn': 6,
                            'lastColumn': 14
                          },
                          {
                            'text': ')',
                            'token': ')',
                            'start': 13,
                            'end': 14,
                            'firstLine': 1,
                            'lastLine': 1,
                            'firstColumn': 14,
                            'lastColumn': 15
                          }
                        ],
                        'start': 4,
                        'end': 14,
                        'firstLine': 1,
                        'lastLine': 1,
                        'firstColumn': 5,
                        'lastColumn': 15
                      }
                    ],
                    'start': 4,
                    'end': 14,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 5,
                    'lastColumn': 15
                  },
                  {
                    'text': ')',
                    'token': ')',
                    'start': 14,
                    'end': 15,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 15,
                    'lastColumn': 16
                  }
                ],
                'start': 0,
                'end': 15,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 1,
                'lastColumn': 16
              }
            ],
            'start': 0,
            'end': 15,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 1,
            'lastColumn': 16
          }
        ],
        'start': 0,
        'end': 15,
        'firstLine': 1,
        'lastLine': 1,
        'firstColumn': 1,
        'lastColumn': 16
      }"
    `);
  });

  it("works for 3d reference", () => {
    expect(prettyJson(parse(`sum(shee1:sheet2!a1:a2)`).ast))
      .toMatchInlineSnapshot(`
      "{
        'symbol': 'formula',
        'children': [
          {
            'symbol': 'atom-exp',
            'label': 'single-exp',
            'children': [
              {
                'symbol': 'function',
                'children': [
                  {
                    'text': 'sum',
                    'token': 'FUNCTION',
                    'start': 0,
                    'end': 3,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 1,
                    'lastColumn': 4
                  },
                  {
                    'text': '(',
                    'token': '(',
                    'start': 3,
                    'end': 4,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 4,
                    'lastColumn': 5
                  },
                  {
                    'symbol': 'arguments',
                    'children': [
                      {
                        'symbol': 'atom-exp',
                        'label': 'single-exp',
                        'children': [
                          {
                            'symbol': 'reference',
                            'children': [
                              {
                                'symbol': 'reference-item',
                                'children': [
                                  {
                                    'text': 'shee1:sheet2!a1:a2',
                                    'token': 'CELL',
                                    'start': 4,
                                    'end': 22,
                                    'firstLine': 1,
                                    'lastLine': 1,
                                    'firstColumn': 5,
                                    'lastColumn': 23
                                  }
                                ],
                                'start': 4,
                                'end': 22,
                                'firstLine': 1,
                                'lastLine': 1,
                                'firstColumn': 5,
                                'lastColumn': 23
                              }
                            ],
                            'start': 4,
                            'end': 22,
                            'firstLine': 1,
                            'lastLine': 1,
                            'firstColumn': 5,
                            'lastColumn': 23
                          }
                        ],
                        'start': 4,
                        'end': 22,
                        'firstLine': 1,
                        'lastLine': 1,
                        'firstColumn': 5,
                        'lastColumn': 23
                      }
                    ],
                    'start': 4,
                    'end': 22,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 5,
                    'lastColumn': 23
                  },
                  {
                    'text': ')',
                    'token': ')',
                    'start': 22,
                    'end': 23,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 23,
                    'lastColumn': 24
                  }
                ],
                'start': 0,
                'end': 23,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 1,
                'lastColumn': 24
              }
            ],
            'start': 0,
            'end': 23,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 1,
            'lastColumn': 24
          }
        ],
        'start': 0,
        'end': 23,
        'firstLine': 1,
        'lastLine': 1,
        'firstColumn': 1,
        'lastColumn': 24
      }"
    `);
  });

  it("works for structure reference", () => {
    expect(prettyJson(parse(`sum(t[[#total],[y]],t[x])`).ast))
      .toMatchInlineSnapshot(`
      "{
        'symbol': 'formula',
        'children': [
          {
            'symbol': 'atom-exp',
            'label': 'single-exp',
            'children': [
              {
                'symbol': 'function',
                'children': [
                  {
                    'text': 'sum',
                    'token': 'FUNCTION',
                    'start': 0,
                    'end': 3,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 1,
                    'lastColumn': 4
                  },
                  {
                    'text': '(',
                    'token': '(',
                    'start': 3,
                    'end': 4,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 4,
                    'lastColumn': 5
                  },
                  {
                    'symbol': 'arguments',
                    'children': [
                      {
                        'symbol': 'arguments',
                        'children': [
                          {
                            'symbol': 'atom-exp',
                            'label': 'single-exp',
                            'children': [
                              {
                                'symbol': 'reference',
                                'children': [
                                  {
                                    'symbol': 'reference-item',
                                    'children': [
                                      {
                                        'symbol': 'structure-reference',
                                        'children': [
                                          {
                                            'text': 't',
                                            'token': 'TABLE_NAME',
                                            'start': 4,
                                            'end': 5,
                                            'firstLine': 1,
                                            'lastLine': 1,
                                            'firstColumn': 5,
                                            'lastColumn': 6
                                          },
                                          {
                                            'symbol': 'table-specifier',
                                            'children': [
                                              {
                                                'text': '[',
                                                'token': '[',
                                                'start': 5,
                                                'end': 6,
                                                'firstLine': 1,
                                                'lastLine': 1,
                                                'firstColumn': 6,
                                                'lastColumn': 7
                                              },
                                              {
                                                'symbol': 'table-specifier-inner',
                                                'children': [
                                                  {
                                                    'symbol': 'table-column-specifier',
                                                    'children': [
                                                      {
                                                        'symbol': 'table-column-specifier',
                                                        'children': [
                                                          {
                                                            'symbol': 'table-specifier-item',
                                                            'children': [
                                                              {
                                                                'text': '[#total]',
                                                                'token': 'TABLE_ITEM_SPECIFIER',
                                                                'start': 6,
                                                                'end': 14,
                                                                'firstLine': 1,
                                                                'lastLine': 1,
                                                                'firstColumn': 7,
                                                                'lastColumn': 15
                                                              }
                                                            ],
                                                            'start': 6,
                                                            'end': 14,
                                                            'firstLine': 1,
                                                            'lastLine': 1,
                                                            'firstColumn': 7,
                                                            'lastColumn': 15
                                                          }
                                                        ],
                                                        'start': 6,
                                                        'end': 14,
                                                        'firstLine': 1,
                                                        'lastLine': 1,
                                                        'firstColumn': 7,
                                                        'lastColumn': 15
                                                      },
                                                      {
                                                        'text': ',',
                                                        'token': 'SPECIFIER_SEPARATOR',
                                                        'start': 14,
                                                        'end': 15,
                                                        'firstLine': 1,
                                                        'lastLine': 1,
                                                        'firstColumn': 15,
                                                        'lastColumn': 16
                                                      },
                                                      {
                                                        'symbol': 'table-specifier-item',
                                                        'children': [
                                                          {
                                                            'text': '[y]',
                                                            'token': 'TABLE_COLUMN_SPECIFIER',
                                                            'start': 15,
                                                            'end': 18,
                                                            'firstLine': 1,
                                                            'lastLine': 1,
                                                            'firstColumn': 16,
                                                            'lastColumn': 19
                                                          }
                                                        ],
                                                        'start': 15,
                                                        'end': 18,
                                                        'firstLine': 1,
                                                        'lastLine': 1,
                                                        'firstColumn': 16,
                                                        'lastColumn': 19
                                                      }
                                                    ],
                                                    'start': 6,
                                                    'end': 18,
                                                    'firstLine': 1,
                                                    'lastLine': 1,
                                                    'firstColumn': 7,
                                                    'lastColumn': 19
                                                  }
                                                ],
                                                'start': 6,
                                                'end': 18,
                                                'firstLine': 1,
                                                'lastLine': 1,
                                                'firstColumn': 7,
                                                'lastColumn': 19
                                              },
                                              {
                                                'text': ']',
                                                'token': ']',
                                                'start': 18,
                                                'end': 19,
                                                'firstLine': 1,
                                                'lastLine': 1,
                                                'firstColumn': 19,
                                                'lastColumn': 20
                                              }
                                            ],
                                            'start': 5,
                                            'end': 19,
                                            'firstLine': 1,
                                            'lastLine': 1,
                                            'firstColumn': 6,
                                            'lastColumn': 20
                                          }
                                        ],
                                        'start': 4,
                                        'end': 19,
                                        'firstLine': 1,
                                        'lastLine': 1,
                                        'firstColumn': 5,
                                        'lastColumn': 20
                                      }
                                    ],
                                    'start': 4,
                                    'end': 19,
                                    'firstLine': 1,
                                    'lastLine': 1,
                                    'firstColumn': 5,
                                    'lastColumn': 20
                                  }
                                ],
                                'start': 4,
                                'end': 19,
                                'firstLine': 1,
                                'lastLine': 1,
                                'firstColumn': 5,
                                'lastColumn': 20
                              }
                            ],
                            'start': 4,
                            'end': 19,
                            'firstLine': 1,
                            'lastLine': 1,
                            'firstColumn': 5,
                            'lastColumn': 20
                          }
                        ],
                        'start': 4,
                        'end': 19,
                        'firstLine': 1,
                        'lastLine': 1,
                        'firstColumn': 5,
                        'lastColumn': 20
                      },
                      {
                        'text': ',',
                        'token': 'ARGUMENT_SEPARATOR',
                        'start': 19,
                        'end': 20,
                        'firstLine': 1,
                        'lastLine': 1,
                        'firstColumn': 20,
                        'lastColumn': 21
                      },
                      {
                        'symbol': 'atom-exp',
                        'label': 'single-exp',
                        'children': [
                          {
                            'symbol': 'reference',
                            'children': [
                              {
                                'symbol': 'reference-item',
                                'children': [
                                  {
                                    'symbol': 'structure-reference',
                                    'children': [
                                      {
                                        'text': 't',
                                        'token': 'TABLE_NAME',
                                        'start': 20,
                                        'end': 21,
                                        'firstLine': 1,
                                        'lastLine': 1,
                                        'firstColumn': 21,
                                        'lastColumn': 22
                                      },
                                      {
                                        'symbol': 'table-specifier',
                                        'children': [
                                          {
                                            'text': '[',
                                            'token': '[',
                                            'start': 21,
                                            'end': 22,
                                            'firstLine': 1,
                                            'lastLine': 1,
                                            'firstColumn': 22,
                                            'lastColumn': 23
                                          },
                                          {
                                            'symbol': 'table-specifier-inner',
                                            'children': [
                                              {
                                                'symbol': 'table-column-specifier',
                                                'children': [
                                                  {
                                                    'symbol': 'table-specifier-item',
                                                    'children': [
                                                      {
                                                        'text': 'x',
                                                        'token': 'TABLE_COLUMN_SPECIFIER',
                                                        'start': 22,
                                                        'end': 23,
                                                        'firstLine': 1,
                                                        'lastLine': 1,
                                                        'firstColumn': 23,
                                                        'lastColumn': 24
                                                      }
                                                    ],
                                                    'start': 22,
                                                    'end': 23,
                                                    'firstLine': 1,
                                                    'lastLine': 1,
                                                    'firstColumn': 23,
                                                    'lastColumn': 24
                                                  }
                                                ],
                                                'start': 22,
                                                'end': 23,
                                                'firstLine': 1,
                                                'lastLine': 1,
                                                'firstColumn': 23,
                                                'lastColumn': 24
                                              }
                                            ],
                                            'start': 22,
                                            'end': 23,
                                            'firstLine': 1,
                                            'lastLine': 1,
                                            'firstColumn': 23,
                                            'lastColumn': 24
                                          },
                                          {
                                            'text': ']',
                                            'token': ']',
                                            'start': 23,
                                            'end': 24,
                                            'firstLine': 1,
                                            'lastLine': 1,
                                            'firstColumn': 24,
                                            'lastColumn': 25
                                          }
                                        ],
                                        'start': 21,
                                        'end': 24,
                                        'firstLine': 1,
                                        'lastLine': 1,
                                        'firstColumn': 22,
                                        'lastColumn': 25
                                      }
                                    ],
                                    'start': 20,
                                    'end': 24,
                                    'firstLine': 1,
                                    'lastLine': 1,
                                    'firstColumn': 21,
                                    'lastColumn': 25
                                  }
                                ],
                                'start': 20,
                                'end': 24,
                                'firstLine': 1,
                                'lastLine': 1,
                                'firstColumn': 21,
                                'lastColumn': 25
                              }
                            ],
                            'start': 20,
                            'end': 24,
                            'firstLine': 1,
                            'lastLine': 1,
                            'firstColumn': 21,
                            'lastColumn': 25
                          }
                        ],
                        'start': 20,
                        'end': 24,
                        'firstLine': 1,
                        'lastLine': 1,
                        'firstColumn': 21,
                        'lastColumn': 25
                      }
                    ],
                    'start': 4,
                    'end': 24,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 5,
                    'lastColumn': 25
                  },
                  {
                    'text': ')',
                    'token': ')',
                    'start': 24,
                    'end': 25,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 25,
                    'lastColumn': 26
                  }
                ],
                'start': 0,
                'end': 25,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 1,
                'lastColumn': 26
              }
            ],
            'start': 0,
            'end': 25,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 1,
            'lastColumn': 26
          }
        ],
        'start': 0,
        'end': 25,
        'firstLine': 1,
        'lastLine': 1,
        'firstColumn': 1,
        'lastColumn': 26
      }"
    `);
  });
});
