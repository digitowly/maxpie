const currencies = {
  EUR: '€',
};

export function price(amount: string) {
  return `${amount} ${currencies.EUR}`;
}
