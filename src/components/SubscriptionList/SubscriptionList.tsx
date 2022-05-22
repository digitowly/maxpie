import React from 'react';
import { Pressable } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import MPModal from '../Modal/MPModal';
import { Text, View } from '../Themed';
import Subscription from '../Subscription/Subscription';
import SubscriptionTotal from './SubscriptionTotal';
import { SubscriptionRegister, SubscriptionType } from '../../types';
import { useStore } from '../../store';
import { useSubscriptionStore } from '../../store/subscription.store';

export default function SubscriptionList(): JSX.Element {
  const [showDetail, setShowDetail] = React.useState(false);
  const [activeSubscription, setActiveSubscription] =
    React.useState<SubscriptionType | null>(null);

  const library = useSubscriptionStore((state) => state.library);
  const setLibrary = useSubscriptionStore((state) => state.setLibrary);

  const activeCategory = useStore((state) => state.activeCategory);

  const categoryId = activeCategory?.id;
  const subscriptionsList: SubscriptionRegister = React.useMemo(() => {
    if (categoryId) {
      return (
        library.find((sub) => sub.category.id === categoryId) ?? library[0]
      );
    } else {
      return library[0];
    }
  }, [library, categoryId]);

  const totalAmount = React.useMemo(
    () =>
      subscriptionsList?.subscriptions.reduce((currentAmount: number, sub) => {
        const subAmount = Number(sub.amount ?? 0);
        return currentAmount + subAmount;
      }, 0),
    [subscriptionsList]
  );

  return (
    <View style={{ flex: 1 }}>
      <DraggableFlatList
        style={{ height: '85%' }}
        data={subscriptionsList?.subscriptions}
        keyExtractor={({ id }) => id}
        onDragEnd={({ data }) =>
          setLibrary({
            categoryId: categoryId,
            newSubscriptions: data,
          })
        }
        renderItem={({ item, drag }) => (
          <Subscription
            drag={drag}
            subscription={item}
            showDetail={() => {
              setActiveSubscription(item);
              setShowDetail(true);
            }}
          />
        )}
      />
      <SubscriptionTotal defaultAmount={totalAmount} />
      {activeSubscription && (
        <MPModal
          title={activeSubscription.name}
          close={() => setShowDetail(false)}
          visible={showDetail}
        >
          <Pressable
            onPress={() => {
              //   removeItem(activeSubscription.id);
              setShowDetail(false);
            }}
          >
            <Text>remove {activeSubscription?.name}</Text>
          </Pressable>
        </MPModal>
      )}
    </View>
  );
}
