import * as React from 'react';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Color } from '../../types';
import { subscriptionStyles } from './Subscription.style';

interface SubscriptionGestureHandlerProps {
  children: React.ReactNode;
  backgroundColor?: Color;
  onPress: () => void;
  onLongPress: () => void;
}

export default function SubscriptionGestureHandler({
  children,
  backgroundColor,
  onPress,
  onLongPress,
}: SubscriptionGestureHandlerProps): JSX.Element {
  const isPressed = useSharedValue(false);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(isPressed.value ? 1.1 : 1),
        },
      ],
    };
  });

  return (
    <ScaleDecorator>
      <Animated.View style={animatedStyles}>
        <TouchableWithoutFeedback
          onLongPress={() => {
            onLongPress();
            isPressed.value = false;
          }}
          style={[subscriptionStyles.wrapper, { backgroundColor }]}
          onPress={() => {
            onPress();
            isPressed.value = true;
            setTimeout(() => {
              isPressed.value = false;
            }, 300);
          }}
        >
          {children}
        </TouchableWithoutFeedback>
      </Animated.View>
    </ScaleDecorator>
  );
}
