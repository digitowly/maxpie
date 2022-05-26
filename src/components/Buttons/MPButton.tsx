import * as React from 'react';
import {
  Text,
  TouchableHighlight,
  TouchableHighlightProps,
  StyleSheet,
} from 'react-native';
import { p } from '../../constants/Spacing';

import useColorScheme from '../../hooks/useColorScheme';

interface MPButtonProps extends TouchableHighlightProps {
  title: string;
}

export default function MPButton(props: MPButtonProps): JSX.Element {
  const scheme = useColorScheme();

  const backgroundColor = scheme === 'dark' ? 'white' : 'black';
  const color = scheme === 'dark' ? 'black' : 'white';

  return (
    <TouchableHighlight
      style={[style.wrapper, { backgroundColor }]}
      onPress={props.onPress}
    >
      <Text style={[style.text, { color }]}>{props.title}</Text>
    </TouchableHighlight>
  );
}

const style = StyleSheet.create({
  wrapper: {
    padding: p.md,
    borderRadius: 15,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
