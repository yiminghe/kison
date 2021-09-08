import { makeError, VALUE_ERROR } from "../functions/utils.js";
import { evaluators } from "./evaluators.js";

Object.assign(evaluators, {
  evaluate_NUMBER(node) {
    return {
      type: "number",
      value: Number(node.text)
    };
  },
  evaluate_STRING(node) {
    return {
      type: "string",
      value: node.text
    };
  },

  evaluate_array(node) {
    return evaluators.evaluate(node.children[1]);
  },

  [`evaluate_array-list`](node) {
    const { children } = node;
    const ret = [];
    let row = [];
    let lastRow;
    let error = 0;

    function pushRow() {
      if (lastRow && row.length !== lastRow.length) {
        error = 1;
      }
      ret.push(row);
      lastRow = row;
    }

    for (const c of children) {
      if (c.token === "ARRAY_SEPARATOR") {
        if (c.text === ";") {
          pushRow();
          row = [];
        }
        continue;
      }
      row.push(evaluators.evaluate(c));
    }

    if (row.length) {
      pushRow();
    }

    if (error) {
      return makeError("array cols is not same!", VALUE_ERROR);
    }

    return {
      type: "array",
      value: ret
    };
  }
});
