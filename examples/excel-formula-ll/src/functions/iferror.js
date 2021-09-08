import { register } from "./register.js";

register("iferror", {
  argumentLength: 2,
  interceptArgument({ value, index }, args) {
    if (index === 0 && value?.type !== "error") {
      return { value };
    }
  },
  allowErrorArgument: true,
  fn(args) {
    return args[1];
  }
});
