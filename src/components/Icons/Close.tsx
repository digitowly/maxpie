import * as React from 'react';
import { useColorScheme, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { Color } from '../../types';
import { SvgProps } from './types';

export default function Close({ size = 16 }: SvgProps): JSX.Element {
  const scheme = useColorScheme();
  const color = scheme === 'dark' ? Color.white : Color.black;
  return (
    <View style={{ transform: [{ rotate: '45deg' }] }}>
      <Svg width={size} height={size} viewBox='0 0 26 26' fill='none'>
        <Rect x='11' width='4' height='26' rx='2' fill={color} />
        <Rect
          x='26'
          y='11'
          width='4'
          height='26'
          rx='2'
          transform='rotate(90 26 11)'
          fill={color}
        />
      </Svg>
    </View>
  );
}
