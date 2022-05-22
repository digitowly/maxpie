import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import MPModal from '../components/Modal/MPModal';
import SubscriptionCreator from '../components/SubscriptionCreator/SubscriptionCreator';
import SubscriptionList from '../components/SubscriptionList/SubscriptionList';
import { View } from '../components/Themed';
import CategorySelection from '../components/CategoryPicker/CategorySelection';
import CategoryPicker from '../components/CategoryPicker/CategoryPicker';
import { useStore } from '../store';

export default function StartScreen(): JSX.Element {
  const [showModal, setShowModal] = React.useState(false);

  const activeCategory = useStore((state) => state.activeCategory);
  const setActiveCategoy = useStore((state) => state.setActiveCategoy);

  const [showCategoryPicker, setShowCategoryPicker] = React.useState(false);

  //   function updateNewSubscription(newSub: SubscriptionType) {
  //     newSubscriptionRef.current = newSub;
  //   }

  //   function removeSubscription(id: string) {
  //     setSubscriptions((s) => s.filter((sub) => sub.id !== id));
  //   }

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <View></View>
        {activeCategory ? (
          <CategorySelection
            onPress={() => setShowCategoryPicker(true)}
            category={activeCategory}
          />
        ) : (
          <Button title='all' onPress={() => setShowCategoryPicker(true)} />
        )}
        <Button title='+' onPress={() => setShowModal(true)}></Button>
      </View>
      <View style={styles.container}>
        <SubscriptionList />
        <View></View>
      </View>
      <MPModal
        title='New Subscription'
        visible={showModal}
        close={() => setShowModal(false)}
      >
        <SubscriptionCreator />
      </MPModal>
      <CategoryPicker
        visible={showCategoryPicker}
        hide={() => setShowCategoryPicker(false)}
        updateCategory={setActiveCategoy}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
