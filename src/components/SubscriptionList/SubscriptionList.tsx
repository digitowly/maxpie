import * as React from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import MPModal from '../Modal/MPModal';
import { View } from '../Themed';
import Subscription from '../Subscription/Subscription';
import SubscriptionTotal from './SubscriptionTotal';
import { SubscriptionRegister, SubscriptionType } from '../../types';
import { useStore } from '../../store';
import { useSubscriptionStore } from '../../store/subscription.store';
import SubscriptionEditor from '../SubscriptionEditor/SubscriptionEditor';
import { storageSetSubscriptions } from '../../helper/storage/subscriptionStorage';
import { storageSetLibrary } from '../../helper/storage/libraryStorage';
import Animated, {
  Easing,
  FadeInDown,
  FadeOutDown,
  Layout,
} from 'react-native-reanimated';

export default function SubscriptionList(): JSX.Element {
  const [showDetail, setShowDetail] = React.useState(false);
  const [activeSubscription, setActiveSubscription] =
    React.useState<SubscriptionType | null>(null);

  const subscriptionData = useSubscriptionStore((state) => state.data);
  const library = useSubscriptionStore((state) => state.library);
  const setLibrary = useSubscriptionStore((state) => state.setLibrary);

  const activeCategory = useStore((state) => state.activeCategory);

  const categoryId = activeCategory?.id;
  const subscriptionsList = React.useMemo(() => {
    let usedLib: SubscriptionRegister = library[0];
    if (categoryId) {
      usedLib =
        library.find((libEntry) => libEntry.categoryId === categoryId) ??
        library[0];
    }
    return usedLib.subscriptionIds.reduce((items: SubscriptionType[], id) => {
      const item = subscriptionData.get(id);
      if (item) items.push(item);
      return items;
    }, []);
  }, [library, categoryId, subscriptionData]);

  const totalAmount = React.useMemo(
    () =>
      subscriptionsList.reduce((currentAmount: number, sub) => {
        const subAmount = Number(sub?.amount ?? 0);
        return currentAmount + subAmount;
      }, 0),
    [subscriptionsList]
  );

  // TODO put in separate hoook
  React.useEffect(() => {
    storageSetLibrary(library);
    storageSetSubscriptions(subscriptionData);
  }, [subscriptionData, library]);

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
        renderItem={({ item, drag, index }) => (
          <Animated.View
            key={item.id}
            entering={FadeInDown.springify()}
            exiting={FadeOutDown.springify()}
            layout={Layout.easing(Easing.bounce).delay(index ?? 1 * 100)}
          >
            <Subscription
              drag={drag}
              subscription={item}
              showDetail={() => {
                setActiveSubscription(item);
                setShowDetail(true);
              }}
            />
          </Animated.View>
        )}
      />
      <SubscriptionTotal defaultAmount={totalAmount} />
      {activeSubscription && (
        <MPModal close={() => setShowDetail(false)} visible={showDetail}>
          <SubscriptionEditor
            hide={() => setShowDetail(false)}
            subscription={activeSubscription}
          />
        </MPModal>
      )}
    </View>
  );
}
