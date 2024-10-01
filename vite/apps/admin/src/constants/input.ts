import { NumericFormatOptions } from '@mila/components';

export const BaseNumericFormatOptions: NumericFormatOptions = {
  decimalSeparator: ',',
  decimalScale: 0,
  fixedDecimalScale: true,
  thousandSeparator: '.',
  thousandsGroupStyle: 'thousand',
};

export const CurrencyFormatOptions: NumericFormatOptions = {
  ...BaseNumericFormatOptions,
  allowNegative: false,
  allowLeadingZeros: false,
};
