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

  const subscriptionData = useSubscriptionStore((state) => state.data);
  const library = useSubscriptionStore((state) => state.library);
  const setLibrary = useSubscriptionStore((state) => state.setLibrary);
  const removeSubscription = useSubscriptionStore(
    (state) => state.removeSubscription
  );

  const activeCategory = useStore((state) => state.activeCategory);

  const categoryId = activeCategory?.id;
  const subscriptionsList = React.useMemo(() => {
    let usedLib: SubscriptionRegister = library[0];
    if (categoryId) {
      usedLib =
        library.find((libEntry) => libEntry.category.id === categoryId) ??
        library[0];
    }
    return usedLib.subscriptionIds.reduce((items: SubscriptionType[], id) => {
      const item = subscriptionData.get(id);
      if (item) items.push(item);
      return items;
    }, []);
  }, [library, categoryId]);

  const totalAmount = React.useMemo(
    () =>
      subscriptionsList.reduce((currentAmount: number, sub) => {
        const subAmount = Number(sub?.amount ?? 0);
        return currentAmount + subAmount;
      }, 0),
    [subscriptionsList]
  );

  return (
    <View style={{ flex: 1 }}>
      <DraggableFlatList
        style={{ height: '85%' }}
        data={subscriptionsList}
        keyExtractor={({ id }) => id}
        onDragEnd={({ data }) => {
          const dataIds = data.map((d) => d.id);
          setLibrary({
            categoryId: categoryId ?? 'all',
            newSubscriptionIds: dataIds,
          });
        }}
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
              removeSubscription(activeSubscription.id);
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
