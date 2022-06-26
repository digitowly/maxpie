import * as React from 'react';
import { Modal, StyleSheet } from 'react-native';
import { View } from '../Themed';
import ModalHeader, { ModalHeaderProps } from './ModalHeader';

const MPModalContext = React.createContext<MPContextType>({
  onCloseCallback: null,
  setOnCloseCallback: null,
});

type MPContextType = {
  onCloseCallback: (() => void) | null | undefined;
  setOnCloseCallback: React.Dispatch<
    React.SetStateAction<(() => void) | null | undefined>
  > | null;
};

export const useMPModal = () => React.useContext(MPModalContext);

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
  const [onCloseCallback, setOnCloseCallback] = React.useState<
    (() => void) | null
  >();

  const handleClose = () => {
    onCloseCallback && onCloseCallback();
    close();
  };

  return (
    <MPModalContext.Provider value={{ onCloseCallback, setOnCloseCallback }}>
      <Modal
        presentationStyle='pageSheet'
        animationType='slide'
        onRequestClose={handleClose}
        visible={visible}
      >
        <ModalHeader
          action={action}
          title={title}
          close={handleClose}
          actionLabel={actionLabel}
        />
        <View style={style.wrapper}>{children}</View>
      </Modal>
    </MPModalContext.Provider>
  );
}

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
