import * as React from 'react';
import { StyleSheet } from 'react-native';
import { p } from '../../constants/Spacing';
import { price } from '../../helper/price';
import { View, Text } from '../Themed';

interface SubscriptionTotalProps {
  totalAmount: number;
}

export default function SubscriptionTotal({
  totalAmount,
}: SubscriptionTotalProps): JSX.Element {
  return (
    <View style={style.wrapper}>
      <View>
        <Text style={style.periodText}>Total </Text>
      </View>
      <Text style={style.amountText}>
        {price(totalAmount.toFixed(2).toString())}
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: p.md,
    borderColor: 'lightgrey',
    borderTopWidth: 1,
  },
  periodText: {
    fontSize: 20,
    color: 'grey',
    fontWeight: 'bold',
  },
  amountText: {
    fontSize: 21,
    fontWeight: 'bold',
  },
});
