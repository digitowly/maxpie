import * as React from 'react';
import { Modal, Pressable } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { View } from '../Themed';
import { Color } from '../../types';
import MPButton from '../Buttons/MPButton';
import i18n from '../../lang/i18n';

interface ActionSheetProps {
  visible: boolean;
  children: React.ReactNode;
  hide: () => void;
  closeLabel?: string;
}

export default function ActionSheet({
  visible,
  children,
  hide,
  closeLabel = i18n.t('cancel'),
}: ActionSheetProps): JSX.Element {
  const bottom = useSharedValue(-200);
  const bdOpacity = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    bottom: bottom.value,
  }));

  const bdStyle = useAnimatedStyle(() => ({
    opacity: bdOpacity.value,
  }));

  const hideModal = () => {
    'worklet';

    bdOpacity.value = withTiming(0);
    bottom.value = withTiming(-200, {}, (isFinished) => {
      if (isFinished) {
        runOnJS(hide)();
      }
    });
  };

  const showModal = () => {
    'worklet';
    bottom.value = withTiming(0);
    bdOpacity.value = withTiming(0.75);
  };
  return (
    <>
      <Modal visible={visible} onShow={showModal} transparent>
        <Animated.View
          style={[
            bdStyle,
            {
              backgroundColor: Color.black,
              height: '100%',
              width: '100%',
              position: 'absolute',
              top: 0,
            },
          ]}
        ></Animated.View>
        <Pressable
          onPress={hideModal}
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'red',
            top: 0,
            position: 'absolute',
            opacity: 0,
            zIndex: 100,
          }}
        />
        <Animated.View
          style={[
            style,
            {
              justifyContent: 'flex-end',
              width: '100%',
              zIndex: 100,
              position: 'absolute',
            },
          ]}
        >
          <View
            style={{
              padding: 18,
            }}
          >
            {children}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MPButton title={closeLabel} onPress={hideModal} />
            </View>
          </View>
        </Animated.View>
      </Modal>
    </>
  );
}
