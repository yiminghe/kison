import regexp from "./src/index";
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
        expect(prettyJson(regexp.parse(r).ast)).toMatchSnapshot();
      });
    }
  });
});
