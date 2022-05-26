import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { p } from '../../constants/Spacing';
import { Text, View } from '../Themed';

export interface ModalHeaderProps {
  title?: string;
  close: () => void;
  action?: () => void;
  actionLabel?: string;
}

export default function ModalHeader({
  title,
  close,
  action,
  actionLabel,
}: ModalHeaderProps): JSX.Element {
  return (
    <View style={style.wrapper}>
      <Pressable style={style.side} onPress={close}>
        <Text>close</Text>
      </Pressable>
      <Text>{title}</Text>
      <View style={style.side}>
        {actionLabel && action && (
          <Pressable onPress={action}>
            <Text>{actionLabel}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    padding: p.md,
    justifyContent: 'space-between',
  },
  side: {
    width: 50,
  },
});
