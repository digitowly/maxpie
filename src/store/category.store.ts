import create from 'zustand';
import i18n from '../lang/i18n';
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
  overwriteCategory: (category: Category) => void;
  removeCategory: (categoryId: string) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  data: new Map([
    [
      'general',
      {
        id: 'general',
        name: i18n.t('general'),
        icon: '⚡️',
        color: Color.gray,
      },
    ],
  ]),
  setCategoryData: (categoryData) =>
    set((state) => ({ ...state, data: categoryData })),
  addCategory: ({ newCategoryId, newCategory }) =>
    set((state) => ({
      ...state,
      data: state.data.set(newCategoryId, newCategory),
    })),
  overwriteCategory: (category) =>
    set((state) => ({
      ...state,
      data: state.data.set(category.id, category),
    })),
  removeCategory: (categoryId) =>
    set((state) => {
      state.data.delete(categoryId);
      return {
        ...state,
        data: state.data,
      };
    }),
}));
