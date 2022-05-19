import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from '../Themed';
import { SubscriptionType } from './SubscriptionType';

interface SubscriptionProps {
  subscription: SubscriptionType;
  showDetail: () => void;
}

export default function Subscription({
  subscription,
  showDetail,
}: SubscriptionProps): JSX.Element {
  const { name, amount } = subscription;
  return (
    <Pressable style={styles.wrapper} onPress={showDetail}>
      <Text>{name}</Text>
      <Text>{amount}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
