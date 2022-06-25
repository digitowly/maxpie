import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { p } from '../../constants/Spacing';
import { Text } from '../Themed';

interface SettingsRowProps {
  title: string;
  value: string;
  onPress: () => void;
}

export default function SettingsRow({
  title,
  value,
  onPress,
}: SettingsRowProps) {
  return (
    <Pressable style={style.wrapper} onPress={onPress}>
      <Text style={style.text}>{title}</Text>
      <Text style={style.text}>{value}</Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  wrapper: {
    backgroundColor: '#85858512',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: p.md,
    marginVertical: 7,
    padding: 16,
    borderRadius: 4,
  },
  text: {
    fontSize: 18,
  },
});
