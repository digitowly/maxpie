import * as React from 'react';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { Color } from '../../types';
import { Text } from '../Themed';

interface AllProps {
  onPress: () => void;
  isSmall?: boolean;
}

export default function All({ onPress, isSmall }: AllProps): JSX.Element {
  const scheme = useColorScheme();

  const backgroundColor = scheme === 'dark' ? Color.white : Color.black;
  const color = scheme === 'dark' ? Color.black : Color.white;

  return (
    <Pressable
      onPress={onPress}
      style={[
        style.wrapper,
        {
          backgroundColor,
          padding: isSmall ? 5 : 15,
          width: isSmall ? 80 : 'auto',
        },
      ]}
    >
      <Text
        style={{
          color,
          textAlign: 'center',
          width: '100%',
          fontWeight: 'bold',
          fontSize: 16,
        }}
      >
        all
      </Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    width: 80,
    borderRadius: 500,
    marginVertical: 5,
  },
});
