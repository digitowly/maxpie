import create from 'zustand';
import { currencies, Currency } from './constants/Currency';
import { Category } from './types';

interface State {
  activeCategory: Category | null;
  setActiveCategoy: (newCategory: Category | null) => void;

  currency: Currency;
  setCurrency: (newCurrency: Currency) => void;
}

export const useStore = create<State>((set) => ({
  activeCategory: null,
  setActiveCategoy: (newCategory) =>
    set((state) => ({ ...state, activeCategory: newCategory })),

  currency: currencies[0],
  setCurrency: (newCurrency) =>
    set((state) => ({ ...state, currency: newCurrency })),
}));
