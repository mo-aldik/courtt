export const formatNumber = (numberInput?: string | number): string => {
  if ((!numberInput && numberInput !== 0) || isNaN(Number(numberInput))) return '';

  const _numberInput = Number(numberInput);

  return _numberInput.toLocaleString(undefined, {
    minimumFractionDigits: _numberInput % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
};
