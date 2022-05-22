import create from 'zustand';
import { Category } from './types';

interface State {
  activeCategory: Category | null;
  setActiveCategoy: (newCategory: Category | null) => void;
}

export const useStore = create<State>((set) => ({
  activeCategory: null,
  setActiveCategoy: (newCategory) =>
    set((state) => ({ ...state, activeCategory: newCategory })),
}));
