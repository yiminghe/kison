import { evaluators } from "./evaluators.js";
import "./evaluateValues.js";
import "./evaluateFunction.js";
import "./evaluateReference.js";
import "./evaluateExpression.js";

export const evaluate = evaluators.evaluate;

export { evaluators };
