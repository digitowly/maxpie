import { useStore } from '../store';

export function usePrice() {
  const currency = useStore((state) => state.currency);

  function price(amount: string) {
    return `${amount} ${currency.sign}`;
  }

  return price;
}
