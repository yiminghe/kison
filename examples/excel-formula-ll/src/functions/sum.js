import { register } from "./register.js";
import { makeError } from "./utils.js";

function sumValues(values) {
  let ret = 0;
  for (const line of values) {
    if (line) {
      for (const d of line) {
        if (d) {
          if (d.type === "error") {
            return d;
          }
          if (typeof d.value === "number") {
            ret += d.value;
          }
        }
      }
    }
  }
  return ret;
}

register("sum", {
  fn(args, context) {
    let ret = 0;
    for (const a of args) {
      if (a.type == "error") {
        return a;
      }
      if (a.type === "array") {
        const v = sumValues(a.value);
        if (v.type === "error") {
          return v;
        }
        ret += v;
      } else if (a.type === "reference") {
        const v = sumValues(context.getCellValues(a));
        if (v.type === "error") {
          return v;
        }
        ret += v;
      } else if (typeof a.value === "number") {
        ret += a.value;
      } else {
        return makeError("not number type!", "#VALUE!");
      }
    }
    return {
      type: "number",
      value: ret
    };
  }
});
