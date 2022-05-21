import * as React from 'react';
import { Text } from '../Themed';
import SubscriptionGestureHandler from './SubsciptionGestureHandler';
import { price } from '../../helper/price';
import { SubscriptionType } from '../../types';
import { subscriptionStyles } from './Subscription.style';

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
      <Text style={subscriptionStyles.text}>
        {price(Number(amount).toString())}
      </Text>
    </SubscriptionGestureHandler>
  );
}
