import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { colors } from '../../constants/Colors';
import { p } from '../../constants/Spacing';
import { Color, SubscriptionType } from '../../types';
import ColorPicker from '../ColorPicker/ColorPicker';
import MPTextInput from '../Inputs/MPTextInput';
import { Text, TextInput, View } from '../Themed';

interface SubscriptionCreatorProps {
  setNewSubscription: (newSubscription: SubscriptionType) => void;
}

export default function SubscriptionCreator({
  setNewSubscription,
}: SubscriptionCreatorProps): JSX.Element {
  const [amount, setAmount] = React.useState('');
  const [name, setName] = React.useState('');
  const [color, setColor] = React.useState<Color>(Color.orange);

  const handleSubscriptionSet = () =>
    setNewSubscription({ id: '', amount, name, color });

  return (
    <ScrollView>
      <View style={style.topSection}>
        <View style={style.amountWrapper}>
          <TextInput
            autoFocus
            style={style.amountInput}
            onChangeText={(input) => {
              setAmount(input);
              handleSubscriptionSet();
            }}
            placeholder='0,00'
            keyboardType='numeric'
            returnKeyType='done'
          />
          <Text style={style.amountCurrency}>€</Text>
        </View>
      </View>
      <MPTextInput
        label='Name'
        onChangeText={(input) => {
          setName(input);
          handleSubscriptionSet();
        }}
        placeholder='Enter name'
      />
      <ColorPicker
        colors={colors}
        activeColor={color}
        setActiveColor={(color) => {
          setColor(color);
          handleSubscriptionSet();
        }}
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
