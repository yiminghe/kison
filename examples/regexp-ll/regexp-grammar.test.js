import { parse, compile } from "./src/index";
import { prettyJson } from "../../__tests__/utils";

describe("regexp", () => {
  describe("parser", () => {
    const reg = [
      "(a|b)*z",
      "^a+z$",
      "\\12\\b",
      "(?:a)+?",
      "a{1,2}",
      "a{1}",
      "[a-z\b]",
      "[^a-z]"
    ];

    for (const r of reg) {
      it(`works for ${r}`, () => {
        expect(prettyJson(parse(r).ast)).toMatchSnapshot();
      });
    }
  });

  function runTest(input, pattern, options = {}) {
    const ret = { native: [], js: [] };

    {
      let flag = "g";
      if (options.multiline) {
        flag += "m";
      }
      if (options.caseInsensitive) {
        flag += "i";
      }
      if (options.dotMatchesLineSeparators) {
        flag += "s";
      }
      const reg = new RegExp(pattern, flag);
      const str = input;
      let m;
      while ((m = reg.exec(str))) {
        ret.native.push(m);
      }
    }

    {
      const patternInstance = compile(pattern);
      const matcher = patternInstance.matcher(input, options);
      let m;
      while ((m = matcher.match())) {
        delete m.input;
        ret.js.push(m);
      }
    }

    return ret;
  }

  describe("evaluate", () => {
    it("character class", () => {
      expect(runTest("2ab.-3cd", "[1-9\\w.]")).toMatchInlineSnapshot(`
        Object {
          "js": Array [
            Object {
              "index": 0,
              "match": "2",
            },
            Object {
              "index": 1,
              "match": "a",
            },
            Object {
              "index": 2,
              "match": "b",
            },
            Object {
              "index": 3,
              "match": ".",
            },
            Object {
              "index": 5,
              "match": "3",
            },
            Object {
              "index": 6,
              "match": "c",
            },
            Object {
              "index": 7,
              "match": "d",
            },
          ],
          "native": Array [
            Array [
              "2",
            ],
            Array [
              "a",
            ],
            Array [
              "b",
            ],
            Array [
              ".",
            ],
            Array [
              "3",
            ],
            Array [
              "c",
            ],
            Array [
              "d",
            ],
          ],
        }
      `);

      expect(runTest("2ab.-3cd", "[^1-9\\w.]")).toMatchInlineSnapshot(`
        Object {
          "js": Array [
            Object {
              "index": 4,
              "match": "-",
            },
          ],
          "native": Array [
            Array [
              "-",
            ],
          ],
        }
      `);
    });

    it("Character Escapes", () => {
      expect(runTest("{[a", "\\{\\[\\u0061")).toMatchInlineSnapshot(`
        Object {
          "js": Array [
            Object {
              "index": 0,
              "match": "{[a",
            },
          ],
          "native": Array [
            Array [
              "{[a",
            ],
          ],
        }
      `);
    });

    it("Anchors", () => {
      expect(runTest("aaa", "^a+$")).toMatchInlineSnapshot(`
        Object {
          "js": Array [
            Object {
              "index": 0,
              "match": "aaa",
            },
          ],
          "native": Array [
            Array [
              "aaa",
            ],
          ],
        }
      `);
    });

    it("Grouping Constructs", () => {
      expect(runTest("abzaaz", "(a|b)*z")).toMatchInlineSnapshot(`
        Object {
          "js": Array [
            Object {
              "groups": Array [
                Object {
                  "index": 1,
                  "match": "b",
                },
              ],
              "index": 0,
              "match": "abz",
            },
            Object {
              "groups": Array [
                Object {
                  "index": 4,
                  "match": "a",
                },
              ],
              "index": 3,
              "match": "aaz",
            },
          ],
          "native": Array [
            Array [
              "abz",
              "b",
            ],
            Array [
              "aaz",
              "a",
            ],
          ],
        }
      `);

      expect(runTest("abzaaz", "(?:a|b)*z")).toMatchInlineSnapshot(`
        Object {
          "js": Array [
            Object {
              "index": 0,
              "match": "abz",
            },
            Object {
              "index": 3,
              "match": "aaz",
            },
          ],
          "native": Array [
            Array [
              "abz",
            ],
            Array [
              "aaz",
            ],
          ],
        }
      `);
    });

    it("Backreferences", () => {
      expect(runTest("aba", "(a)b\\1")).toMatchInlineSnapshot(`
        Object {
          "js": Array [
            Object {
              "groups": Array [
                Object {
                  "index": 0,
                  "match": "a",
                },
              ],
              "index": 0,
              "match": "aba",
            },
          ],
          "native": Array [
            Array [
              "aba",
              "a",
            ],
          ],
        }
      `);
    });

    it("Quantifiers", () => {
      expect(runTest("aaa", "a*?a")).toMatchInlineSnapshot(`
        Object {
          "js": Array [
            Object {
              "index": 0,
              "match": "a",
            },
            Object {
              "index": 1,
              "match": "a",
            },
            Object {
              "index": 2,
              "match": "a",
            },
          ],
          "native": Array [
            Array [
              "a",
            ],
            Array [
              "a",
            ],
            Array [
              "a",
            ],
          ],
        }
      `);

      expect(runTest("ababab", "(a|b){2,4}")).toMatchInlineSnapshot(`
        Object {
          "js": Array [
            Object {
              "groups": Array [
                Object {
                  "index": 3,
                  "match": "b",
                },
              ],
              "index": 0,
              "match": "abab",
            },
            Object {
              "groups": Array [
                Object {
                  "index": 5,
                  "match": "b",
                },
              ],
              "index": 4,
              "match": "ab",
            },
          ],
          "native": Array [
            Array [
              "abab",
              "b",
            ],
            Array [
              "ab",
              "b",
            ],
          ],
        }
      `);

      expect(runTest("ababab", "(a|b){2,}")).toMatchInlineSnapshot(`
        Object {
          "js": Array [
            Object {
              "groups": Array [
                Object {
                  "index": 5,
                  "match": "b",
                },
              ],
              "index": 0,
              "match": "ababab",
            },
          ],
          "native": Array [
            Array [
              "ababab",
              "b",
            ],
          ],
        }
      `);

      expect(runTest("ababab", "(a|b){2}")).toMatchInlineSnapshot(`
        Object {
          "js": Array [
            Object {
              "groups": Array [
                Object {
                  "index": 1,
                  "match": "b",
                },
              ],
              "index": 0,
              "match": "ab",
            },
            Object {
              "groups": Array [
                Object {
                  "index": 3,
                  "match": "b",
                },
              ],
              "index": 2,
              "match": "ab",
            },
            Object {
              "groups": Array [
                Object {
                  "index": 5,
                  "match": "b",
                },
              ],
              "index": 4,
              "match": "ab",
            },
          ],
          "native": Array [
            Array [
              "ab",
              "b",
            ],
            Array [
              "ab",
              "b",
            ],
            Array [
              "ab",
              "b",
            ],
          ],
        }
      `);
    });

    it("Flags", () => {
      expect(runTest("a\na", "^.+$")).toMatchInlineSnapshot(`
        Object {
          "js": Array [],
          "native": Array [],
        }
      `);
      expect(
        runTest("a\na", "^.+$", {
          dotMatchesLineSeparators: true
        })
      ).toMatchInlineSnapshot(`
        Object {
          "js": Array [
            Object {
              "index": 0,
              "match": "a
        a",
            },
          ],
          "native": Array [
            Array [
              "a
        a",
            ],
          ],
        }
      `);

      expect(runTest("a\na", "^.+$")).toMatchInlineSnapshot(`
        Object {
          "js": Array [],
          "native": Array [],
        }
      `);
      expect(
        runTest("a\na", "^.+$", {
          multiline: true
        })
      ).toMatchInlineSnapshot(`
        Object {
          "js": Array [
            Object {
              "index": 0,
              "match": "a",
            },
            Object {
              "index": 2,
              "match": "a",
            },
          ],
          "native": Array [
            Array [
              "a",
            ],
            Array [
              "a",
            ],
          ],
        }
      `);

      expect(runTest("a", "A")).toMatchInlineSnapshot(`
        Object {
          "js": Array [],
          "native": Array [],
        }
      `);
      expect(
        runTest("a", "A", {
          caseInsensitive: true
        })
      ).toMatchInlineSnapshot(`
        Object {
          "js": Array [
            Object {
              "index": 0,
              "match": "a",
            },
          ],
          "native": Array [
            Array [
              "a",
            ],
          ],
        }
      `);
    });
  });
});
