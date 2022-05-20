export type SubscriptionType = {
  id: string;
  name: string;
  amount: string;
  color: Color;
};

export enum Color {
  red = 'red',
  blue = 'blue',
  green = 'green',
  orange = 'orange',
}
