import * as React from 'react';
import { useColorScheme } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Color } from '../../types';
import { SvgProps } from './types';

export default function Chevron({ size = 16 }: SvgProps): JSX.Element {
  const scheme = useColorScheme();
  const color = scheme === 'dark' ? Color.white : Color.black;
  return (
    <Svg width={size} height={size} viewBox='0 0 30 15' fill='none'>
      <Path
        d='M2 2L14.3541 12.4534C14.7269 12.7689 15.2731 12.7689 15.6459 12.4534L28 2'
        stroke={color}
        strokeWidth='4'
        strokeLinecap='round'
      />
    </Svg>
  );
}
