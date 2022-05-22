export type SubscriptionType = {
  id: string;
  name: string;
  amount: number | string;
  category: Category;
};

export enum Color {
  red = 'red',
  blue = 'blue',
  green = 'green',
  orange = 'orange',
  gray = '#303030',
}

export type SubscriptionRegister = {
  category: Category | { id: 'all'; name: 'all' };
  subscriptions: SubscriptionType[];
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: Color;
};
