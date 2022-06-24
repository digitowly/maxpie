import * as React from 'react';
import { Text } from '../Themed';
import SubscriptionGestureHandler from './SubsciptionGestureHandler';
import { SubscriptionType } from '../../types';
import { subscriptionStyles } from './Subscription.style';
import { View } from 'react-native';
import { useCategoryStore } from '../../store/category.store';
import { usePrice } from '../../hooks/usePrice';

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
  const price = usePrice();
  const { name, amount, categoryId } = subscription;

  const categoryData = useCategoryStore((state) => state.data);
  const category = categoryData.get(categoryId);

  return (
    <SubscriptionGestureHandler
      onLongPress={drag}
      onPress={showDetail}
      backgroundColor={category?.color}
    >
      <View style={subscriptionStyles.titleWrapper}>
        <Text style={subscriptionStyles.icon}>{category?.icon}</Text>
        <Text style={subscriptionStyles.text}>{name}</Text>
      </View>
      <Text style={subscriptionStyles.text}>
        {price(Number(amount).toFixed(2).toString().replace('.', ','))}
      </Text>
    </SubscriptionGestureHandler>
  );
}
