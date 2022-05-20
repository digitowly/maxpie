import * as React from 'react';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { subscriptionStyles } from './Subscription';

interface SubscriptionGestureHandlerProps {
  children: React.ReactNode;
  onPress: () => void;
  onLongPress: () => void;
}

export default function SubscriptionGestureHandler({
  children,
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
          style={subscriptionStyles.wrapper}
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
