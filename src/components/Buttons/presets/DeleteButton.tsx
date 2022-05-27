import * as React from 'react';
import { useColorScheme } from 'react-native';
import { Color } from '../../../types';
import MPButton, { MPButtonProps } from '../MPButton';

export default function DeleteButton(props: MPButtonProps): JSX.Element {
  const scheme = useColorScheme();
  const backgroundColor = scheme === 'dark' ? Color.black : Color.white;

  return (
    <MPButton
      secondary
      backgroundColor={backgroundColor}
      textColor={Color.red}
      title='remove'
      onPress={props.onPress}
    />
  );
}
