import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageId, SubscriptionType } from '../../types';

export async function storageSetSubscriptions(
  subscriptions: Map<string, SubscriptionType>
) {
  try {
    console.log([...subscriptions]);
    await AsyncStorage.setItem(
      StorageId.subscriptions,
      JSON.stringify([...subscriptions])
    );
  } catch (e) {
    console.error(e);
  }
}

export async function storageGetSubscriptions(): Promise<Map<
  string,
  SubscriptionType
> | null> {
  try {
    const subscriptionsJSON = await AsyncStorage.getItem(
      StorageId.subscriptions
    );
    if (subscriptionsJSON) return new Map(JSON.parse(subscriptionsJSON));
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
}
