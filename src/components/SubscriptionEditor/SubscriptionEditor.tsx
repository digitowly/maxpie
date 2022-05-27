import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import 'react-native-get-random-values';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { v4 as uuidv4 } from 'uuid';
import { p } from '../../constants/Spacing';
import { defaultCategory } from '../../helper/categories';
import { useSubscriptionStore } from '../../store/subscription.store';
import { SubscriptionType } from '../../types';
import MPButton from '../Buttons/MPButton';
import DeleteButton from '../Buttons/presets/DeleteButton';
import CategoryPicker from '../CategoryPicker/CategoryPicker';
import CategorySelection from '../CategoryPicker/CategorySelection';
import MPTextInput from '../Inputs/MPTextInput';
import { Text, TextInput, View } from '../Themed';

interface SubscriptionCreatprProps {
  hide: () => void;
  subscription?: SubscriptionType;
}

export default function SubscriptionEditor({
  hide,
  subscription,
}: SubscriptionCreatprProps): JSX.Element {
  const [amount, setAmount] = React.useState(
    () => subscription?.amount.toString().replace('.', ',') ?? ''
  );
  const [name, setName] = React.useState(() => subscription?.name ?? '');
  const [categoryId, setCategoryId] = React.useState<string>(
    () => subscription?.categoryId ?? defaultCategory.id
  );

  const amountNumber = React.useMemo(
    () => Number(amount.toString().replace(',', '.')),
    [amount]
  );

  const hasAllInputs = !!amount && !!name;

  const [showCategories, setShowCategories] = React.useState(false);

  const addSubscriptionIdToLibrary = useSubscriptionStore(
    (state) => state.addSubscriptionIdToLibrary
  );
  const addData = useSubscriptionStore((state) => state.addData);
  const updateSubscription = useSubscriptionStore(
    (state) => state.updateSubscription
  );
  const removeSubscription = useSubscriptionStore(
    (state) => state.removeSubscription
  );

  const handleAddSubscription = () => {
    if (amount && name) {
      const newSubscription: SubscriptionType = {
        id: uuidv4(),
        amount: amountNumber,
        name,
        categoryId,
      };

      // add item id to custom category
      addSubscriptionIdToLibrary({
        categoryId: categoryId,
        newSubscriptionId: newSubscription.id,
      });

      // also always add item id to 'all' category
      addSubscriptionIdToLibrary({
        categoryId: 'all',
        newSubscriptionId: newSubscription.id,
      });

      // add item to data
      addData(newSubscription);

      // hide modal
      hide();
    }
  };

  const handleRemoveSubscription = () => {
    if (subscription?.id) removeSubscription(subscription.id);
    // hide modal
    hide();
  };

  const handleUpdateSubscription = () => {
    if (subscription) {
      const updatedSubscription: SubscriptionType = {
        ...subscription,
        name,
        amount: amountNumber,
        categoryId,
      };

      updateSubscription(updatedSubscription);

      // hide modal
      hide();
    }
  };

  return (
    <>
      <ScrollView>
        <View style={style.topSection}>
          <View style={style.section}>
            <View style={style.amountWrapper}>
              <TextInput
                autoFocus={!subscription}
                style={style.amountInput}
                value={amount.toString()}
                onChangeText={setAmount}
                placeholder='0'
                keyboardType='numeric'
                returnKeyType='done'
              />
              <Text style={style.amountCurrency}>€</Text>
            </View>
            <Text>per Month</Text>
          </View>
        </View>
        <View style={style.section}>
          <MPTextInput
            value={name}
            onChangeText={setName}
            placeholder='Enter name'
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <CategorySelection
            categoryId={categoryId}
            onPress={() => setShowCategories(true)}
          />
        </View>

        <CategoryPicker
          updateCategory={(cat) => cat && setCategoryId(cat.id)}
          visible={showCategories}
          hide={() => setShowCategories(false)}
        />
        {subscription ? (
          <>
            <MPButton title='update' onPress={handleUpdateSubscription} />
            <DeleteButton onPress={handleRemoveSubscription} />
          </>
        ) : (
          <>
            {hasAllInputs && (
              <Animated.View
                key={hasAllInputs.toString()}
                entering={SlideInDown.springify()}
                exiting={SlideOutDown.springify()}
              >
                <MPButton title='create' onPress={handleAddSubscription} />
              </Animated.View>
            )}
          </>
        )}
      </ScrollView>
    </>
  );
}

const style = StyleSheet.create({
  topSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    alignItems: 'center',
    marginBottom: 30,
  },
  amountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountCurrency: {
    fontSize: 35,
    fontWeight: 'bold',
    paddingLeft: p.sm,
    marginBottom: 5,
  },
  amountInput: {
    fontSize: 60,
    fontWeight: 'bold',
    width: 'auto',
  },
  amountLabel: {
    fontSize: 20,
  },
});
