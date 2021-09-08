// @ts-check
export function toNumber(a) {
  const { type, value } = a;
  if (type === "string") {
    return Number(value);
  }
  if (type === "boolean") {
    return value === "true" ? 1 : 0;
  }
  return value;
}

export function makeError(message, value) {
  return {
    type: "error",
    value: value || "#ERROR!",
    message
  };
}

export function makeReference(ranges) {
  return {
    type: "reference",
    ranges
  };
}

export const VALUE_ERROR = "#VALUE!";
export const NULL_ERROR = "#NULL!";
export const DIV_ERROR = "#DIV/0!";
export const NA_ERROR = "#N/A";
export const REF_ERROR = "#REF!";
export const NUM_ERROR = "#NUM!";
export const NAME_ERROR = "#NAME?";
