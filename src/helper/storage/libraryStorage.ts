import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageId, SubscriptionRegister } from '../../types';

export async function storageSetLibrary(library: SubscriptionRegister[]) {
  try {
    await AsyncStorage.setItem(StorageId.library, JSON.stringify(library));
  } catch (e) {
    console.error(e);
  }
}

export async function storageGetLibrary(): Promise<
  SubscriptionRegister[] | null
> {
  try {
    const libraryJSON = await AsyncStorage.getItem(StorageId.library);
    if (libraryJSON) return JSON.parse(libraryJSON);
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
}
