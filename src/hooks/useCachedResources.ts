import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { storageGetLibrary } from '../helper/storage/libraryStorage';
import { storageGetSubscriptions } from '../helper/storage/subscriptionStorage';
import { useSubscriptionStore } from '../store/subscription.store';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const setubscriptionData = useSubscriptionStore((state) => state.setData);
  const setInitLibrary = useSubscriptionStore((state) => state.setInitLibrary);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // get init subsriptions data from storage
        const subscriptions = await storageGetSubscriptions();
        if (subscriptions) setubscriptionData(subscriptions);

        const initLibrary = await storageGetLibrary();
        if (initLibrary) setInitLibrary(initLibrary);

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
