import * as React from 'react';
import { Picker } from '@react-native-picker/picker';
import { currencies } from '../../../constants/Currency';
import { useStore } from '../../../store';
import { Color } from '../../../types';
import useColorScheme from '../../../hooks/useColorScheme';
import { storageSetCurrency } from '../../../helper/storage/currencyStorage';

export default function CurrencyPicker() {
  const currency = useStore((state) => state.currency);
  const setCurrency = useStore((state) => state.setCurrency);

  const scheme = useColorScheme();

  const color = scheme === 'dark' ? Color.lightgray : Color.gray;

  const updateCurrency = (currencyName: string) => {
    const newCurr = currencies.find((curr) => curr.name === currencyName);
    if (newCurr) {
      storageSetCurrency(newCurr);
      setCurrency(newCurr);
    }
  };

  return (
    <Picker selectedValue={currency.name} onValueChange={updateCurrency}>
      {currencies.map((curr) => (
        <Picker.Item
          key={curr.name}
          color={color}
          label={curr.sign}
          value={curr.name}
        />
      ))}
    </Picker>
  );
}
