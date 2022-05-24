import {
  Category,
  Color,
  SubscriptionRegister,
  SubscriptionType,
} from '../types';

// export const defaultCategories: Category[] = [
//     { id: 'general', name: 'general', icon: '⚡️', color: Color.gray },
//     { id: 'household', name: 'household', icon: '🏠', color: Color.orange },
//     {
//       id: 'entertainment',
//       name: 'entertainment',
//       icon: '📺',
//       color: Color.red,
//     },
//   ];
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

export const defaultSubscriptions: SubscriptionRegister[] = [
  {
    categoryId: 'all',
    subscriptionIds: ['1', '2', '3', '4'],
  },
  {
    categoryId: 'general',
    subscriptionIds: ['1', '3'],
  },
  {
    categoryId: 'household',
    subscriptionIds: ['2'],
  },
  {
    categoryId: 'entertainment',
    subscriptionIds: ['4'],
  },
];

export const data: Map<string, SubscriptionType> = new Map([
  [
    '1',
    {
      id: '1',
      name: 'Amazon',
      amount: 7.99,
      categoryId: 'general',
    },
  ],
  [
    '3',
    {
      id: '3',
      name: 'Google',
      amount: 1.99,
      categoryId: 'general',
    },
  ],
  [
    '2',
    {
      id: '2',
      name: 'Netflix',
      amount: 9.5,
      categoryId: 'household',
    },
  ],
  [
    '4',
    {
      id: '4',
      name: 'Apple',
      amount: 2.99,
      categoryId: 'entertainment',
    },
  ],
]);
