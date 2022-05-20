import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Color } from '../../types';

interface ColorFieldProps {
  color: Color;
  isActive: boolean;
  setActive: () => void;
}

const size = 55;

export default function ColorField({
  color,
  isActive,
  setActive,
}: ColorFieldProps): JSX.Element {
  return (
    <TouchableOpacity
      onPress={setActive}
      style={{
        backgroundColor: color,
        borderWidth: 2,
        borderColor: isActive ? 'lightblue' : 'transparent',
        height: size,
        width: size,
        borderRadius: 10,
        margin: 5,
      }}
    />
  );
}
