export type SubscriptionType = {
  id: string;
  name: string;
  amount: number | string;
  categoryId: string;
};

export enum Color {
  red = '#DF5000',
  blue = '#00C5F0',
  green = '#00CC83',
  orange = 'EBA901',
  gray = '#004381',
  lightgray = '#7DC4FF',
  black = '#001629',
  white = '#F2FAFF',
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
