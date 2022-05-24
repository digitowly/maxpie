import create from 'zustand';
import { defaultCategories } from '../data/defaultData';
import { Category } from '../types';

interface CategoryState {
  data: Map<string, Category>;
  addCategory: ({
    newCategoryId,
    newCategory,
  }: {
    newCategoryId: string;
    newCategory: Category;
  }) => void;
}

export const useCategorySore = create<CategoryState>((set) => ({
  data: defaultCategories,
  addCategory: ({ newCategoryId, newCategory }) =>
    set((state) => ({
      ...state,
      data: state.data.set(newCategoryId, newCategory),
    })),
}));
