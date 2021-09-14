import * as regexp from "../src/";

describe("regexp", () => {
  it("async works", async () => {
    const buffer = ["c", "a", "b", "x", "a", "a", "b"];
    const patternInstance = regexp.compile("a+b", { async: true });
    const matcher = patternInstance.matcherAsync(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          if (buffer.length) resolve([buffer.shift()]);
        }, 100);
      });
    });
    let ret = await matcher.match();
    expect(ret).toMatchInlineSnapshot(`
      Object {
        "match": "ab",
      }
    `);
    ret = await matcher.match();
    expect(ret).toMatchInlineSnapshot(`
      Object {
        "match": "aab",
      }
    `);
  });
});
