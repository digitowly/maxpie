import i18n from './lang/i18n';

export type SubscriptionType = {
  id: string;
  name: string;
  amount: number | string;
  categoryId: string;
};

export enum Color {
  red = '#DB5461',
  blue = '#00C5F0',
  green = '#00CC83',
  orange = 'coral',
  yellow = '#FFC15E',
  pink = '#FF6392',
  dimgray = '#686963',
  stateblue = '#7D53DE',
  gray = '#004381',
  lightgray = '#7DC4FF',
  black = '#000f1c',
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
  currency = 'currency',
}

export enum Interval {
  perWeek = 'Week',
  perMonth = 'Month',
  perYear = 'Year',
}

export type Rate = {
  interval: Interval;
  text: string;
};

export const Week: Rate = {
  interval: Interval.perWeek,
  text: i18n.t('week'),
};
export const Month: Rate = {
  interval: Interval.perMonth,
  text: i18n.t('month'),
};
export const Year: Rate = {
  interval: Interval.perYear,
  text: i18n.t('year'),
};
