import React from 'react';
import { Button, FlatList, Pressable } from 'react-native';
import MPModal from '../Modal/MPModal';
import { Text } from '../Themed';
import Subscription from '../Subscription/Subscription';
import { SubscriptionType } from '../Subscription/SubscriptionType';

interface SbuscriptionListProps {
  subscriptions: SubscriptionType[];
  removeItem: (id: string) => void;
}

export default function SubscriptionList({
  subscriptions,
  removeItem,
}: SbuscriptionListProps): JSX.Element {
  const [showDetail, setShowDetail] = React.useState(false);
  const [activeSubscription, setActiveSubscription] =
    React.useState<SubscriptionType | null>(null);

  return (
    <>
      <FlatList
        data={subscriptions}
        renderItem={({ item }) => (
          <Subscription
            subscription={item}
            showDetail={() => {
              setActiveSubscription(item);
              setShowDetail(true);
            }}
          />
        )}
      />
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
    </>
  );
}
