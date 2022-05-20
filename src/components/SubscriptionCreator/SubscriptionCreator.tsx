import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { colors } from '../../constants/Colors';
import { p } from '../../constants/Spacing';
import { SubscriptionType } from '../../types';
import ColorPicker from '../ColorPicker/ColorPicker';
import MPTextInput from '../Inputs/MPTextInput';
import { Text, TextInput, View } from '../Themed';

interface SubscriptionCreatorProps {
  newSubscription: SubscriptionType;
  setNewSubscription: React.Dispatch<React.SetStateAction<SubscriptionType>>;
}

export default function SubscriptionCreator({
  newSubscription,
  setNewSubscription,
}: SubscriptionCreatorProps): JSX.Element {
  const { amount, name, color } = newSubscription;

  return (
    <ScrollView>
      <View style={style.topSection}>
        <View style={style.amountWrapper}>
          <TextInput
            autoFocus
            style={style.amountInput}
            value={amount.toString() ?? ''}
            onChangeText={(input) =>
              setNewSubscription((s) => ({ ...s, amount: input }))
            }
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
        onChangeText={(input) =>
          setNewSubscription((s) => ({ ...s, name: input }))
        }
        placeholder='Enter name'
      />
      <ColorPicker
        colors={colors}
        activeColor={color}
        setActiveColor={(color) => setNewSubscription((s) => ({ ...s, color }))}
      />
    </ScrollView>
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
