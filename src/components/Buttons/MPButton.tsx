import * as React from 'react';
import {
  Text,
  TouchableHighlight,
  TouchableHighlightProps,
  StyleSheet,
} from 'react-native';
import Colors from '../../constants/Colors';
import { p } from '../../constants/Spacing';

import useColorScheme from '../../hooks/useColorScheme';
import { Color } from '../../types';

export interface MPButtonProps extends TouchableHighlightProps {
  title?: string;
  secondary?: boolean;
  backgroundColor?: Color;
  textColor?: Color;
}

export default function MPButton(props: MPButtonProps): JSX.Element {
  const scheme = useColorScheme();

  const backgroundColor = scheme === 'dark' ? 'white' : 'black';
  const color = scheme === 'dark' ? 'black' : 'white';

  return (
    <TouchableHighlight
      underlayColor={scheme === 'dark' ? Colors.dark.tint : Colors.light.tint}
      style={[
        style.wrapper,
        {
          backgroundColor: props.backgroundColor ?? backgroundColor,
          padding: props.secondary ? p.sm : p.md,
        },
      ]}
      onPress={props.onPress}
    >
      <Text style={[style.text, { color: props.textColor ?? color }]}>
        {props.title}
      </Text>
    </TouchableHighlight>
  );
}

const style = StyleSheet.create({
  wrapper: {
    padding: p.md,
    borderRadius: 15,
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
