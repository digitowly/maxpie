import * as React from 'react';
import { useColorScheme } from 'react-native';
import i18n from '../../../lang/i18n';
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
      title={i18n.t('remove')}
      onPress={props.onPress}
    />
  );
}
