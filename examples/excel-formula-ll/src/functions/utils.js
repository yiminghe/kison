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
    value: value || "#error!",
    message
  };
}

export function makeReference(ranges) {
  return {
    type: "reference",
    ranges
  };
}
