import * as React from 'react';
import { Text } from '../Themed';
import { StyleSheet } from 'react-native';
import SubscriptionGestureHandler from './SubsciptionGestureHandler';
import { SubscriptionType } from './SubscriptionType';

interface SubscriptionProps {
  subscription: SubscriptionType;
  showDetail: () => void;
  drag: () => void;
}

export default function Subscription({
  subscription,
  showDetail,
  drag,
}: SubscriptionProps): JSX.Element {
  const { name, amount } = subscription;

  return (
    <SubscriptionGestureHandler onLongPress={drag} onPress={showDetail}>
      <Text>{name}</Text>
      <Text>{amount}</Text>
    </SubscriptionGestureHandler>
  );
}

export const subscriptionStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 24,
    color: 'white',
    borderRadius: 6,
    marginVertical: 5,
    marginHorizontal: 20,
  },
});
