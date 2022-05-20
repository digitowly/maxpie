import React from 'react';
import { Pressable } from 'react-native';
import MPModal from '../Modal/MPModal';
import { Text, View } from '../Themed';
import Subscription from '../Subscription/Subscription';
import { SubscriptionType } from '../Subscription/SubscriptionType';
import DraggableFlatList from 'react-native-draggable-flatlist';

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

  return (
    <View style={{ flex: 1 }}>
      <DraggableFlatList
        style={{ height: '100%' }}
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
