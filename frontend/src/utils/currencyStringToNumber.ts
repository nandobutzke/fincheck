export function currencyStringToNumber(value: string | number) {
  if (typeof value === 'number') {
    return value;
  }

  const sanitezedString = value.replace(/\./g, '').replace(',', '.');

  return Number(sanitezedString);
}
