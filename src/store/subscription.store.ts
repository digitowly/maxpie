import create from 'zustand';
import { data, defaultSubscriptions } from '../data/defaultData';
import { SubscriptionRegister, SubscriptionType } from '../types';

interface SubscriptionState {
  data: Map<string, SubscriptionType>;
  addData: (newSubscription: SubscriptionType) => void;

  library: SubscriptionRegister[];
  addLibrary: (categoryId: string) => void;
  setLibrary: ({
    categoryId,
    newSubscriptionIds,
  }: {
    categoryId?: string;
    newSubscriptionIds: string[];
  }) => void;

  addSubscriptionIdToLibrary: ({
    newSubscriptionId,
    categoryId,
  }: {
    newSubscriptionId: string;
    categoryId: string;
  }) => void;

  removeSubscription: (subscriptionId: string) => void;

  updateSubscription: (newSubscription: SubscriptionType) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  data: data,
  addData: (newSubscription) =>
    set((state) => ({
      ...state,
      data: state.data.set(newSubscription.id, newSubscription),
    })),

  library: defaultSubscriptions,
  addLibrary: (categoryId: string) =>
    set((state) => ({
      ...state,
      library: [...state.library, { categoryId, subscriptionIds: [] }],
    })),
  setLibrary: ({ categoryId, newSubscriptionIds }) =>
    set((state) => ({
      ...state,
      library: libraryWithNewSubscriptions({
        state,
        categoryId,
        newSubscriptionIds,
      }),
    })),

  addSubscriptionIdToLibrary: ({ categoryId, newSubscriptionId }) =>
    set((state) => ({
      ...state,
      library: libraryWithNewSubscription({
        state,
        categoryId,
        newSubscriptionId,
      }),
    })),

  removeSubscription: (subscriptionId) =>
    set((state) => {
      state.data.delete(subscriptionId);
      return {
        ...state,
        library: libraryWithoutSubscription({ state, subscriptionId }),
      };
    }),

  updateSubscription: (newSubscription) =>
    set((state) => {
      return {
        ...state,
        library: libraryWithUpdatedSubscription({ state, newSubscription }),
        data: new Map(state.data.set(newSubscription.id, newSubscription)),
      };
    }),
}));

function libraryWithNewSubscriptions({
  state,
  categoryId,
  newSubscriptionIds,
}: {
  state: SubscriptionState;
  categoryId?: string;
  newSubscriptionIds: string[];
}) {
  return state.library.map((sub) => {
    if (sub.categoryId === categoryId) {
      return {
        ...sub,
        subscriptionIds: newSubscriptionIds,
      };
    }
    return sub;
  });
}

function libraryWithNewSubscription({
  state,
  categoryId,
  newSubscriptionId,
}: {
  state: SubscriptionState;
  categoryId?: string;
  newSubscriptionId: string;
}) {
  return state.library.map((sub) => {
    if (sub.categoryId === categoryId) {
      return {
        ...sub,
        subscriptionIds: [newSubscriptionId, ...sub.subscriptionIds],
      };
    }
    return sub;
  });
}

function libraryWithoutSubscription({
  state,
  subscriptionId,
}: {
  state: SubscriptionState;
  subscriptionId: string;
}) {
  return state.library.map((sub) => {
    const newSubIds = sub.subscriptionIds.filter(
      (subId) => subId !== subscriptionId
    );

    return {
      ...sub,
      subscriptionIds: newSubIds,
    };
  });
}

function libraryWithUpdatedSubscription({
  state,
  newSubscription,
}: {
  state: SubscriptionState;
  newSubscription: SubscriptionType;
}) {
  const oldSubscriptionState = state.data.get(newSubscription.id);
  // check if categories changed
  if (oldSubscriptionState?.categoryId !== newSubscription.categoryId) {
    // if so remove subscription from all existing registers and add id toth new ones
    return state.library.map((sub) => {
      if (sub.categoryId === 'all') {
        return sub;
      }
      if (sub.categoryId === newSubscription.categoryId) {
        // add subscription to new categories
        return {
          ...sub,
          subscriptionIds: [newSubscription.id, ...sub.subscriptionIds],
        };
      } else {
        // remove subscription from prev categories

        return {
          ...sub,
          subscriptionIds: [...sub.subscriptionIds].filter(
            (id) => id !== newSubscription?.id
          ),
        };
      }
    });
  }
  // if there is no category change, just return the old library state
  return state.library;
}
