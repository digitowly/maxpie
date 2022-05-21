export type SubscriptionType = {
  id: string;
  name: string;
  amount: number | string;
  color: Color;
};

export enum Color {
  red = 'red',
  blue = 'blue',
  green = 'green',
  orange = 'orange',
}
