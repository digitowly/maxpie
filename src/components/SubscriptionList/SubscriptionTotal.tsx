import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutDown,
  FlipInXUp,
} from 'react-native-reanimated';
import { p } from '../../constants/Spacing';
import { price } from '../../helper/price';
import { Color } from '../../types';
import { View, Text } from '../Themed';

enum Rate {
  perWeek = 'Week',
  perMonth = 'Month',
  perYear = 'Year',
}

interface SubscriptionTotalProps {
  defaultAmount: number;
}

export default function SubscriptionTotal({
  defaultAmount,
}: SubscriptionTotalProps): JSX.Element {
  const [rate, setRate] = React.useState<Rate>(Rate.perMonth);

  function setNextRate() {
    if (rate === Rate.perWeek) {
      return setRate(Rate.perMonth);
    }
    if (rate === Rate.perMonth) {
      return setRate(Rate.perYear);
    }
    if (rate === Rate.perYear) {
      return setRate(Rate.perWeek);
    }
  }
  function getAmount() {
    if (rate === Rate.perWeek) {
      return defaultAmount / 4;
    }
    if (rate === Rate.perMonth) {
      return defaultAmount;
    }
    if (rate === Rate.perYear) {
      return defaultAmount * 12;
    }
    return 0;
  }

  return (
    <Pressable onPress={() => setNextRate()} style={[style.wrapper]}>
      <View>
        <Text style={style.totalText}>Expenses </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={style.periodText}>per </Text>
          <Animated.View key={rate} entering={FadeInUp} exiting={FadeOutDown}>
            <Text style={style.periodText}>{rate}</Text>
          </Animated.View>
        </View>
      </View>
      <Animated.View
        key={rate}
        entering={FlipInXUp.springify()}
        exiting={FadeOutDown.springify()}
      >
        <Text style={style.amountText}>
          {price(getAmount().toFixed(2).toString().replace('.', ','))}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: p.md,
    borderColor: Color.lightgray,
    borderTopWidth: 1,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  periodText: {
    fontSize: 18,
    color: Color.lightgray,
    fontWeight: 'bold',
  },
  amountText: {
    fontSize: 21,
    fontWeight: 'bold',
  },
});
