import { register } from "./register.js";

register("index", {
  argumentsOptions: [
    null,
    {
      single: true
    },
    {
      single: true
    }
  ],
  minArgumentLength: 2,
  maxArgumentLength: 3,
  fn() {}
});
