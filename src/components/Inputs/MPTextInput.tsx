import * as React from 'react';
import {
  StyleSheet,
  Pressable,
  TextInput as DefaultTextInput,
} from 'react-native';
import { Text, TextInputProps, TextInput } from '../Themed';

interface MPTextInputProps extends TextInputProps {
  label?: string;
}

export default function MPTextInput(props: MPTextInputProps): JSX.Element {
  const inputRef = React.useRef<DefaultTextInput>(null);
  return (
    <Pressable style={style.wrapper} onPress={() => inputRef.current?.focus()}>
      {props.label && <Text style={style.label}>{props.label}</Text>}
      <TextInput ref={inputRef} style={style.input} {...props} />
    </Pressable>
  );
}

const style = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  label: {
    fontSize: 17,
  },
  input: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
