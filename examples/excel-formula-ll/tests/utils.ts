export function makeString(value: string) {
  return {
    type: 'string' as const,
    value,
  };
}

export function makeNumber(value: number) {
  return {
    type: 'number' as const,
    value,
  };
}

export function makeFormula(formula: string) {
  return {
    type: 'formula' as const,
    formula,
  };
}
