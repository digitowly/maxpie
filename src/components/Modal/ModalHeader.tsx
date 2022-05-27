import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { p } from '../../constants/Spacing';
import Chevron from '../Icons/Chevron';
import { Text, View } from '../Themed';

export interface ModalHeaderProps {
  title?: string;
  close: () => void;
  action?: () => void;
  actionLabel?: JSX.Element;
}

export default function ModalHeader({
  title,
  close,
  action,
  actionLabel,
}: ModalHeaderProps): JSX.Element {
  return (
    <View style={style.wrapper}>
      <Pressable style={[style.side, { padding: 3 }]} onPress={close}>
        <Chevron />
      </Pressable>
      <Text>{title}</Text>
      <View style={style.side}>
        {actionLabel && action && (
          <View style={{ alignItems: 'flex-end' }}>
            <Pressable style={{ padding: 3 }} onPress={action}>
              {actionLabel}
            </Pressable>
          </View>
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
