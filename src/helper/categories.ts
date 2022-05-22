import { Category, Color } from '../types';

export const categories: Category[] = [
  { id: 'general', name: 'general', icon: '⚡️', color: Color.gray },
  { id: 'household', name: 'household', icon: '🏠', color: Color.orange },
  {
    id: 'entertainment',
    name: 'entertainment',
    icon: '📺',
    color: Color.red,
  },
];
export const defaultCategory: Category = categories[0];
