import create from 'zustand';
import { Category, Color } from '../types';

interface CategoryState {
  data: Map<string, Category>;
  setCategoryData: (categoryData: Map<string, Category>) => void;
  addCategory: ({
    newCategoryId,
    newCategory,
  }: {
    newCategoryId: string;
    newCategory: Category;
  }) => void;
}

export const useCategorySore = create<CategoryState>((set) => ({
  data: new Map([
    [
      'general',
      { id: 'general', name: 'general', icon: '⚡️', color: Color.gray },
    ],
  ]),
  setCategoryData: (categoryData) =>
    set((state) => ({ ...state, data: categoryData })),
  addCategory: ({ newCategoryId, newCategory }) =>
    set((state) => ({
      ...state,
      data: state.data.set(newCategoryId, newCategory),
    })),
}));
