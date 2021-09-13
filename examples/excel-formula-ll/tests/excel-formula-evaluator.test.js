import { parser as formula, evaluate } from "../src";
import { prettyJson } from "../../../__tests__/utils";

function parse(input) {
  return formula.parse(input).ast;
}

describe("excel-formula-evaluator", () => {
  it("array ok", () => {
    expect(prettyJson(evaluate(parse(`sum(1,{1,2}+{5;4})`))))
      .toMatchInlineSnapshot(`
      "{
        'type': 'number',
        'value': 25
      }"
    `);
  });
});
