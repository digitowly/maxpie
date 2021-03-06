import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Color } from '../../types';
import ColorField from './ColorField';

interface ColorPickerProps {
  colors: Color[];
  activeColor: Color;
  setActiveColor: (color: Color) => void;
}

export default function ColorPicker({
  colors,
  activeColor,
  setActiveColor,
}: ColorPickerProps): JSX.Element {
  const row1 = colors.slice(0, 4);
  const row2 = colors.slice(4, 8);

  return (
    <>
      <View style={style.wrapper}>
        {row1.map((color) => (
          <ColorField
            key={color}
            isActive={activeColor === color}
            color={color}
            setActive={() => setActiveColor(color)}
          />
        ))}
      </View>
      <View style={style.wrapper}>
        {row2.map((color) => (
          <ColorField
            key={color}
            isActive={activeColor === color}
            color={color}
            setActive={() => setActiveColor(color)}
          />
        ))}
      </View>
    </>
  );
}

const style = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
});
