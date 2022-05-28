import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import 'react-native-get-random-values';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { v4 as uuidv4 } from 'uuid';
import { p } from '../../constants/Spacing';
import { useStore } from '../../store';
import { useSubscriptionStore } from '../../store/subscription.store';
import { Color, SubscriptionType } from '../../types';
import ActionSheet from '../ActionSheet/ActionSheet';
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
  const activeCategory = useStore((state) => state.activeCategory);
  const [amount, setAmount] = React.useState(
    () => subscription?.amount.toString().replace('.', ',') ?? ''
  );
  const [name, setName] = React.useState(() => subscription?.name ?? '');
  const [categoryId, setCategoryId] = React.useState<string>(() => {
    if (subscription) return subscription.categoryId;
    if (activeCategory) return activeCategory.id;
    return 'general';
  });

  const amountNumber = React.useMemo(
    () => Number(amount.toString().replace(',', '.')),
    [amount]
  );

  const hasAllInputs = !!amount && !!name;

  const [showCategories, setShowCategories] = React.useState(false);

  const [showActionSheeht, setShowActionSheet] = React.useState(false);

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
    setShowActionSheet(false);
    if (subscription?.id) removeSubscription(subscription.id);
    // hide modal
    hide();
    // setTimeout(hide, 100);
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
            <Text
              style={{
                color: Color.lightgray,
                fontWeight: 'bold',
                marginTop: 10,
              }}
            >
              per Month
            </Text>
          </View>
        </View>
        <View style={style.section}>
          <MPTextInput
            value={name}
            onChangeText={setName}
            placeholder='Enter a name'
          />
        </View>

        <View style={{ alignItems: 'center' }}>
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
              <>
                {hasAllInputs && (
                  <Animated.View
                    key={hasAllInputs.toString()}
                    entering={FadeInDown}
                    exiting={FadeOutDown}
                  >
                    <MPButton
                      title='update'
                      onPress={handleUpdateSubscription}
                    />
                  </Animated.View>
                )}
              </>
              <DeleteButton onPress={() => setShowActionSheet(true)} />
            </>
          ) : (
            <>
              {hasAllInputs && (
                <Animated.View
                  key={hasAllInputs.toString()}
                  entering={FadeInDown}
                  exiting={FadeOutDown}
                >
                  <MPButton title='create' onPress={handleAddSubscription} />
                </Animated.View>
              )}
            </>
          )}
        </View>
      </ScrollView>
      <ActionSheet
        visible={showActionSheeht}
        hide={() => setShowActionSheet(false)}
      >
        <DeleteButton onPress={handleRemoveSubscription} />
      </ActionSheet>
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
    fontSize: 45,
    fontWeight: 'bold',
    width: 'auto',
  },
  amountLabel: {
    fontSize: 20,
  },
});
