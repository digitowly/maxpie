import AsyncStorage from '@react-native-async-storage/async-storage';
import { Currency } from '../../constants/Currency';
import { StorageId } from '../../types';

export async function storageSetCurrency(currency: Currency) {
  try {
    await AsyncStorage.setItem(StorageId.currency, JSON.stringify(currency));
  } catch (e) {
    console.error(e);
  }
}

export async function storageGetCurrency(): Promise<Currency | null> {
  try {
    const currencyJSON = await AsyncStorage.getItem(StorageId.currency);
    if (currencyJSON) return JSON.parse(currencyJSON) as Currency;
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
}
