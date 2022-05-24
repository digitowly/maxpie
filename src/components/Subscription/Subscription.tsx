import * as React from 'react';
import { Text } from '../Themed';
import SubscriptionGestureHandler from './SubsciptionGestureHandler';
import { price } from '../../helper/price';
import { SubscriptionType } from '../../types';
import { subscriptionStyles } from './Subscription.style';
import { View } from 'react-native';
import { useCategorySore } from '../../store/category.store';

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
  const { name, amount, categoryId } = subscription;

  const categoryData = useCategorySore((state) => state.data);

  const category = React.useMemo(
    () => categoryData.get(categoryId),
    [categoryId, categoryData]
  );

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
        {price(Number(amount).toString())}
      </Text>
    </SubscriptionGestureHandler>
  );
}
