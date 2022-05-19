import * as React from 'react';
import { StyleSheet, TextInput as TextInputType } from 'react-native';
import { p } from '../../constants/Spacing';
import { Text, TextInput, TextInputProps, View } from '../Themed';

interface SubscriptionCreatorProps {
  update: (name: string, amount: string) => void;
}

export default function SubscriptionCreator({
  update,
}: SubscriptionCreatorProps): JSX.Element {
  const [name, setName] = React.useState('');
  const [amount, setAmount] = React.useState('');

  React.useEffect(() => {
    update(name, amount);
  }, [name, amount]);

  return (
    <View>
      <View style={style.topSection}>
        <View style={style.amountWrapper}>
          <TextInput
            autoFocus
            style={style.amountInput}
            value={amount}
            onChangeText={(input) => setAmount(input)}
            placeholder='0,00'
            keyboardType='number-pad'
          />
          <Text style={style.amountCurrency}>€</Text>
        </View>
      </View>
      <TextInput
        value={name}
        onChangeText={(input) => setName(input)}
        placeholder='title'
      />
    </View>
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
