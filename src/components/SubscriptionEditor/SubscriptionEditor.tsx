import * as React from 'react';
import { Button, ScrollView, StyleSheet } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { p } from '../../constants/Spacing';
import { defaultCategory } from '../../helper/categories';
import { useSubscriptionStore } from '../../store/subscription.store';
import { SubscriptionType } from '../../types';
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
  const [amount, setAmount] = React.useState(() => subscription?.amount ?? '');
  const [name, setName] = React.useState(() => subscription?.name ?? '');
  const [categoryId, setCategoryId] = React.useState<string>(
    () => subscription?.categoryId ?? defaultCategory.id
  );

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

  const createSubscription = () => {
    if (amount && name) {
      //   subscription && removeSubscription(subscription.id);

      const newSubscription: SubscriptionType = {
        id: uuidv4(),
        amount,
        name,
        categoryId,
      };

      console.log(newSubscription);

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

  const handleUpdateSubscription = () => {
    if (subscription) {
      const updatedSubscription: SubscriptionType = {
        ...subscription,
        name,
        amount,
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
          <View style={style.amountWrapper}>
            <TextInput
              autoFocus={!subscription}
              style={style.amountInput}
              value={amount.toString()}
              onChangeText={setAmount}
              placeholder='0,00'
              keyboardType='numeric'
              returnKeyType='done'
            />
            <Text style={style.amountCurrency}>€</Text>
          </View>
        </View>
        <MPTextInput
          label='Name'
          value={name}
          onChangeText={setName}
          placeholder='Enter name'
        />

        <CategorySelection
          categoryId={categoryId}
          onPress={() => setShowCategories(true)}
        />

        <CategoryPicker
          updateCategory={(cat) => cat && setCategoryId(cat.id)}
          visible={showCategories}
          hide={() => setShowCategories(false)}
        />
        {subscription ? (
          <>
            <Button title='update' onPress={handleUpdateSubscription} />
            <Button
              title='remove'
              onPress={() => removeSubscription(subscription.id)}
            />
          </>
        ) : (
          <Button title='create' onPress={createSubscription} />
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
  amountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountCurrency: {
    fontSize: 20,
    paddingLeft: p.sm,
  },
  amountInput: {
    fontSize: 20,
    borderWidth: 1,
    padding: p.sm,
    width: 150,
    borderRadius: 5,
    textAlign: 'center',
  },
});
