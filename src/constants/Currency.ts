export type Currency = {
  sign: string;
  name: string;
};

export const currencies: Currency[] = [
  {
    sign: '€',
    name: 'EUR',
  },
  {
    sign: '$',
    name: 'US',
  },
  {
    sign: '£',
    name: 'GBP',
  },
  {
    sign: 'Fr',
    name: 'CHF',
  },
  {
    sign: 'Kr',
    name: 'NOK',
  },
  {
    sign: '¥',
    name: 'JPY',
  },
];
