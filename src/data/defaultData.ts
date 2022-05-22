import { categories } from '../helper/categories';
import { SubscriptionRegister, SubscriptionType } from '../types';

export const defaultSubscriptions: SubscriptionRegister[] = [
  {
    category: { id: 'all', name: 'all' },
    subscriptionIds: ['1', '2', '3', '4'],
  },
  {
    category: categories[0],
    subscriptionIds: ['1', '3'],
  },
  {
    category: categories[1],
    subscriptionIds: ['2'],
  },
  {
    category: categories[2],
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
      category: categories[0],
    },
  ],
  [
    '3',
    {
      id: '3',
      name: 'Google',
      amount: 1.99,
      category: categories[0],
    },
  ],
  [
    '2',
    {
      id: '2',
      name: 'Netflix',
      amount: 9.5,
      category: categories[1],
    },
  ],
  [
    '4',
    {
      id: '4',
      name: 'Apple',
      amount: 2.99,
      category: categories[2],
    },
  ],
]);
