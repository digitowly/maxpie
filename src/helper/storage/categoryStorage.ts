import AsyncStorage from '@react-native-async-storage/async-storage';
import { Category, StorageId } from '../../types';

export async function storageSetCategories(categories: Map<string, Category>) {
  try {
    await AsyncStorage.setItem(
      StorageId.categories,
      JSON.stringify([...categories])
    );
  } catch (e) {
    console.error(e);
  }
}

export async function storageGetCategories(): Promise<Map<
  string,
  Category
> | null> {
  try {
    const categoriesJSON = await AsyncStorage.getItem(StorageId.categories);
    if (categoriesJSON) return new Map(JSON.parse(categoriesJSON));
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
}
