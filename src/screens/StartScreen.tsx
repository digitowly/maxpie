import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import MPModal from '../components/Modal/MPModal';
import SubscriptionEditor from '../components/SubscriptionEditor/SubscriptionEditor';
import SubscriptionList from '../components/SubscriptionList/SubscriptionList';
import { View } from '../components/Themed';
import CategorySelection from '../components/CategoryPicker/CategorySelection';
import CategoryPicker from '../components/CategoryPicker/CategoryPicker';
import { useStore } from '../store';
import Plus from '../components/Icons/Plus';
import All from '../components/CategoryPicker/All';
import { SafeAreaView } from 'react-native-safe-area-context';
import i18n from '../lang/i18n';

export default function StartScreen(): JSX.Element {
  const [showCreatorModal, setShowCreatorModal] = React.useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = React.useState(false);

  const activeCategory = useStore((state) => state.activeCategory);
  const setActiveCategoy = useStore((state) => state.setActiveCategoy);

  return (
    <SafeAreaView style={{ minHeight: '100%' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 18,
          paddingVertical: 10,
        }}
      >
        <View style={{ width: 50 }}></View>
        {activeCategory ? (
          <CategorySelection
            isInList
            isSmall
            onPress={() => setShowCategoryPicker(true)}
            categoryId={activeCategory.id}
          />
        ) : (
          <All isSmall onPress={() => setShowCategoryPicker(true)} />
        )}
        <View
          style={{
            width: 50,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Pressable
            style={{ padding: 4 }}
            onPress={() => setShowCreatorModal(true)}
          >
            <Plus />
          </Pressable>
        </View>
      </View>
      <View style={styles.container}>
        <SubscriptionList />
        <View></View>
      </View>
      <MPModal
        title={i18n.t('newExpense')}
        visible={showCreatorModal}
        close={() => setShowCreatorModal(false)}
      >
        <SubscriptionEditor hide={() => setShowCreatorModal(false)} />
      </MPModal>
      <CategoryPicker
        isStart
        visible={showCategoryPicker}
        hide={() => setShowCategoryPicker(false)}
        updateCategory={setActiveCategoy}
      />
    </SafeAreaView>
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
