import * as React from 'react';
import { Modal, StyleSheet } from 'react-native';
import { View } from '../Themed';
import ModalHeader, { ModalHeaderProps } from './ModalHeader';

interface ModalProps extends ModalHeaderProps {
  children: React.ReactNode;
  visible: boolean;
}

export default function MPModal({
  children,
  visible,
  close,
  action,
  actionLabel,
  title,
}: ModalProps): JSX.Element {
  return (
    <Modal
      presentationStyle='pageSheet'
      animationType='slide'
      onRequestClose={close}
      visible={visible}
    >
      <ModalHeader
        action={action}
        title={title}
        close={close}
        actionLabel={actionLabel}
      />
      <View style={style.wrapper}>{children}</View>
    </Modal>
  );
}

const style = StyleSheet.create({
  wrapper: {
    padding: 20,
    flex: 1,
  },
});
