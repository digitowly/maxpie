import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './src/hooks/useCachedResources';
import StartScreen from './src/screens/StartScreen';
import useColorScheme from './src/hooks/useColorScheme';
import { Color } from './src/types';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const scheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  }

  const backgroundColor = scheme === 'dark' ? Color.black : Color.white;

  return (
    <SafeAreaProvider style={{ backgroundColor }}>
      <StartScreen />
      <StatusBar hidden />
    </SafeAreaProvider>
  );
}
