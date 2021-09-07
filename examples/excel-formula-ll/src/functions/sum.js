import { register } from "./register.js";

function sumValues(values) {
  let ret = 0;
  for (const line of values) {
    if (line) {
      for (const d of line) {
        if (d) {
          if (d.type === "error") {
            return {
              type: "error",
              value: "#error!"
            };
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
        return {
          type: "error",
          value: "#error!"
        };
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
      } else if (a === "number") {
        ret += a;
      }
    }
    return {
      type: "number",
      value: ret
    };
  }
});
