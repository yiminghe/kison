export function toNumber(a) {
  const { type, value } = a;
  if (type === 'string') {
    return Number(value);
  }
  if (type === 'boolean') {
    return value === 'true' ? 1 : 0;
  }
  return value;
}

export function toError(message) {
  return {
    type: 'error',
    value: '#error!',
    message,
  };
}

export function toReference(ranges) {
  return {
    type: 'reference',
    ranges,
  };
}
