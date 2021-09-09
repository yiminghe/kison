import { register } from "./register.js";

register("match", {
  argumentOptions: [
    {
      single: true
    }
  ],
  minArgumentLength: 2,
  maxArgumentLength: 2
});
