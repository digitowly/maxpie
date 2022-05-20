import * as React from 'react';
import { Text } from '../Themed';
import { StyleSheet } from 'react-native';
import SubscriptionGestureHandler from './SubsciptionGestureHandler';
import { price } from '../../helper/price';
import { SubscriptionType } from '../../types';

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
  const { name, amount, color } = subscription;

  return (
    <SubscriptionGestureHandler
      onLongPress={drag}
      onPress={showDetail}
      backgroundColor={color}
    >
      <Text style={subscriptionStyles.text}>{name}</Text>
      <Text style={subscriptionStyles.text}>{price(amount)}</Text>
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
    borderRadius: 6,
    marginVertical: 5,
    marginHorizontal: 20,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
