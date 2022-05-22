import * as React from 'react';
import { Button, ScrollView, StyleSheet } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { p } from '../../constants/Spacing';
import { defaultCategory } from '../../helper/categories';
import { useSubscriptionStore } from '../../store/subscription.store';
import { Category, SubscriptionType } from '../../types';
import CategoryPicker from '../CategoryPicker/CategoryPicker';
import CategorySelection from '../CategoryPicker/CategorySelection';
import MPTextInput from '../Inputs/MPTextInput';
import { Text, TextInput, View } from '../Themed';

interface SubscriptionCreatprProps {
  hide: () => void;
}

export default function SubscriptionCreator({
  hide,
}: SubscriptionCreatprProps): JSX.Element {
  const [amount, setAmount] = React.useState('');
  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState<Category>(defaultCategory);

  const [showCategories, setShowCategories] = React.useState(false);

  const addSubscriptionIdToLibrary = useSubscriptionStore(
    (state) => state.addSubscriptionIdToLibrary
  );
  const addData = useSubscriptionStore((state) => state.addData);

  const createSubscription = () => {
    if (amount && name) {
      const newSubscription: SubscriptionType = {
        id: uuidv4(),
        amount,
        name,
        category,
      };

      // add item id to custom category
      addSubscriptionIdToLibrary({
        categoryId: category.id,
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

  return (
    <>
      <ScrollView>
        <View style={style.topSection}>
          <View style={style.amountWrapper}>
            <TextInput
              autoFocus
              style={style.amountInput}
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
          onChangeText={setName}
          placeholder='Enter name'
        />

        <CategorySelection
          category={category}
          onPress={() => setShowCategories(true)}
        />

        <CategoryPicker
          updateCategory={(cat) => cat && setCategory(cat)}
          visible={showCategories}
          hide={() => setShowCategories(false)}
        />

        <Button title='create' onPress={createSubscription} />
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
