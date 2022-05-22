import create from 'zustand';
import { categories } from '../helper/categories';
import { SubscriptionRegister, SubscriptionType } from '../types';

const defaultSubscriptions: SubscriptionRegister[] = [
  {
    category: categories[0],
    subscriptions: [
      {
        id: '1',
        name: 'Amazon',
        amount: 7.99,
        category: categories[0],
      },
      {
        id: '3',
        name: 'Google',
        amount: 1.99,
        category: categories[0],
      },
    ],
  },
  {
    category: categories[1],
    subscriptions: [
      {
        id: '2',
        name: 'Netflix',
        amount: 9.5,
        category: categories[1],
      },
    ],
  },
  {
    category: categories[2],
    subscriptions: [
      {
        id: '4',
        name: 'Apple',
        amount: 2.99,
        category: categories[2],
      },
    ],
  },
];

interface SubscriptionState {
  library: SubscriptionRegister[];
  setLibrary: ({
    categoryId,
    newSubscriptions,
  }: {
    categoryId?: string;
    newSubscriptions: SubscriptionType[];
  }) => void;
  addSubscription: ({
    newSubscription,
    categoryId,
  }: {
    newSubscription: SubscriptionType;
    categoryId: string;
  }) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  library: defaultSubscriptions,
  setLibrary: ({ categoryId, newSubscriptions }) =>
    set((state) => ({
      ...state,
      library: libraryWithNewSubscriptions({
        state,
        categoryId,
        newSubscriptions,
      }),
    })),

  addSubscription: ({ categoryId, newSubscription }) =>
    set((state) => ({
      ...state,
      library: libraryWithNewSubscription({
        state,
        categoryId,
        newSubscription,
      }),
    })),
}));

function libraryWithNewSubscriptions({
  state,
  categoryId,
  newSubscriptions,
}: {
  state: SubscriptionState;
  categoryId?: string;
  newSubscriptions: SubscriptionType[];
}) {
  return state.library.map((sub) => {
    if (sub.category.id === categoryId) {
      return {
        ...sub,
        subscriptions: newSubscriptions,
      };
    }
    return sub;
  });
}
function libraryWithNewSubscription({
  state,
  categoryId,
  newSubscription,
}: {
  state: SubscriptionState;
  categoryId?: string;
  newSubscription: SubscriptionType;
}) {
  return state.library.map((sub) => {
    if (sub.category.id === categoryId) {
      return {
        ...sub,
        subscriptions: [newSubscription, ...sub.subscriptions],
      };
    }
    return sub;
  });
}
