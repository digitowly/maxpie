import create from 'zustand';
import { data, defaultSubscriptions } from '../data/defaultData';
import { SubscriptionRegister, SubscriptionType } from '../types';

interface SubscriptionState {
  data: Map<string, SubscriptionType>;
  addData: (newSubscription: SubscriptionType) => void;

  library: SubscriptionRegister[];
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
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  data: data,
  addData: (newSubscription) =>
    set((state) => ({
      ...state,
      data: state.data.set(newSubscription.id, newSubscription),
    })),

  library: defaultSubscriptions,
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
    if (sub.category.id === categoryId) {
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
    if (sub.category.id === categoryId) {
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
