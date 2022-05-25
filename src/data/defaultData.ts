import { Category, Color } from '../types';

export const defaultCategories: Map<string, Category> = new Map([
  [
    'general',
    { id: 'general', name: 'general', icon: '⚡️', color: Color.gray },
  ],
  [
    'household',
    { id: 'household', name: 'household', icon: '🏠', color: Color.orange },
  ],
  [
    'entertainment',
    {
      id: 'entertainment',
      name: 'entertainment',
      icon: '📺',
      color: Color.red,
    },
  ],
]);
