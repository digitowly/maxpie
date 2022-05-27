export type SubscriptionType = {
  id: string;
  name: string;
  amount: number | string;
  categoryId: string;
};

export enum Color {
  red = 'red',
  blue = 'blue',
  green = 'green',
  orange = 'orange',
  gray = '#303030',
  black = 'black',
  white = 'white',
}

export type SubscriptionRegister = {
  categoryId: string | { id: 'all'; name: 'all' };
  subscriptionIds: string[];
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: Color;
};

export enum StorageId {
  subscriptions = 'subscriptions',
  categories = 'categories',
  library = 'library',
}
