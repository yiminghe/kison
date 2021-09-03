import { evaluators } from "./evaluators.js";
import "./evaluateValues.js";
import "./evaluateFunction.js";
import './evaluateReference.js';

export const evaluate = evaluators.evaluate;

export { evaluators };
