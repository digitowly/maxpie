import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutDown,
  FlipInXUp,
} from 'react-native-reanimated';
import { p } from '../../constants/Spacing';
import { price } from '../../helper/price';
import i18n from '../../lang/i18n';
import { Color, Interval, Month, Rate, Week, Year } from '../../types';
import { View, Text } from '../Themed';

interface SubscriptionTotalProps {
  defaultAmount: number;
}

export default function SubscriptionTotal({
  defaultAmount,
}: SubscriptionTotalProps): JSX.Element {
  const [rate, setRate] = React.useState<Rate>(Month);

  function setNextRate() {
    if (rate.interval === Interval.perWeek) {
      return setRate(Month);
    }
    if (rate.interval === Interval.perMonth) {
      return setRate(Year);
    }
    if (rate.interval === Interval.perYear) {
      return setRate(Week);
    }
  }
  function getAmount() {
    if (rate.interval === Interval.perWeek) {
      return defaultAmount / 4;
    }
    if (rate.interval === Interval.perMonth) {
      return defaultAmount;
    }
    if (rate.interval === Interval.perYear) {
      return defaultAmount * 12;
    }
    return 0;
  }

  return (
    <Pressable onPress={() => setNextRate()} style={[style.wrapper]}>
      <View>
        <Text style={style.totalText}>{i18n.t('expenses')} </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={style.periodText}>{i18n.t('per')} </Text>
          <Animated.View
            key={rate.interval}
            entering={FadeInUp}
            exiting={FadeOutDown}
          >
            <Text style={style.periodText}>{rate.text}</Text>
          </Animated.View>
        </View>
      </View>
      <Animated.View
        key={rate.interval}
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
