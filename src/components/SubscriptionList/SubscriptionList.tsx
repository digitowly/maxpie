import React from 'react';
import { Button, FlatList } from 'react-native';
import MPModal from '../Modal/MPModal';
import { Text } from '../Themed';
import Subscription from '../Subscription/Subscription';
import { SubscriptionType } from '../Subscription/SubscriptionType';

interface SbuscriptionListProps {
  subscriptions: SubscriptionType[];
}

export default function SubscriptionList({
  subscriptions,
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
      <MPModal
        title={activeSubscription?.name ?? ''}
        close={() => setShowDetail(false)}
        visible={showDetail}
      >
        <></>
      </MPModal>
    </>
  );
}
