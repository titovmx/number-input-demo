export function preciseMathSum(left, right) {
  const [leftFractionLength, rightFractionLength] = getFractionLength(left, right);
  const fractionLength = Math.max(leftFractionLength, rightFractionLength);
  return Number((left + right).toFixed(fractionLength));
}

export function preciseMathSubtract(left, right) {
  const [leftFractionLength, rightFractionLength] = getFractionLength(left, right);
  const fractionLength = Math.max(leftFractionLength, rightFractionLength);
  return Number((left - right).toFixed(fractionLength));
}

export function isValidNumberInput(value, { allowDecimals, allowNegative }) {
  return (
    isNumberString(value, { allowNegative, allowDecimals }) ||
    (value.length === 1 && ((allowDecimals && value[0] === '.') || (allowNegative && value[0] === '-')))
  );
}

function getFractionLength(left, right) {
  const leftFractionLength = left.toString().split('.')[1]?.length ?? 0;
  const rightFractionLength = right.toString().split('.')[1]?.length ?? 0;
  return [leftFractionLength, rightFractionLength];
}

function isNumberString(value, { allowNegative, allowDecimals }) {
  if (value === undefined || value === null) return false;
  if (value === '') return true;
  if (isIntegerString(value, allowNegative)) return true;
  if (!allowDecimals) return false;

  const positiveString = maybeRemoveNegation(value, allowNegative);
  if (positiveString === '.') return false;
  const pattern = /^\d*[\\.,]\d*$/;
  return positiveString.match(pattern) !== null;
}

function maybeRemoveNegation(value, allowNegative) {
  if (!allowNegative) return value;
  return value.startsWith('-') ? value.slice(1) : value;
}

export function isIntegerString(value, allowNegative) {
  const positiveString = maybeRemoveNegation(value, allowNegative);
  const pattern = /^\d+$/;
  return positiveString.match(pattern) !== null;
}
