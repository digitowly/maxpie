import React from 'react';
import { Pressable } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import MPModal from '../Modal/MPModal';
import { Text, View } from '../Themed';
import Subscription from '../Subscription/Subscription';
import SubscriptionTotal from './SubscriptionTotal';
import { SubscriptionType } from '../../types';

interface SbuscriptionListProps {
  subscriptions: SubscriptionType[];
  removeItem: (id: string) => void;
  setList: React.Dispatch<React.SetStateAction<SubscriptionType[]>>;
}

export default function SubscriptionList({
  subscriptions,
  removeItem,
  setList,
}: SbuscriptionListProps): JSX.Element {
  const [showDetail, setShowDetail] = React.useState(false);
  const [activeSubscription, setActiveSubscription] =
    React.useState<SubscriptionType | null>(null);

  const totalAmount = React.useMemo(
    () =>
      subscriptions.reduce((currentAmount: number, sub) => {
        const subAmount = Number(sub.amount ?? 0);
        return currentAmount + subAmount;
      }, 0),
    [subscriptions]
  );

  return (
    <View style={{ flex: 1 }}>
      <DraggableFlatList
        style={{ height: '85%' }}
        data={subscriptions}
        keyExtractor={({ id }) => id}
        onDragEnd={({ data }) => setList(data)}
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
              removeItem(activeSubscription.id);
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
