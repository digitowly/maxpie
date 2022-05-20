import { StyleSheet } from 'react-native';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Text } from '../Themed';
import { SubscriptionType } from './SubscriptionType';

interface SubscriptionProps {
  subscription: SubscriptionType;
  showDetail: () => void;
  drag: () => void;
}

export default function Subscription({
  subscription,
  showDetail,
  drag,
}: SubscriptionProps): JSX.Element {
  const { name, amount } = subscription;

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
            drag();
            isPressed.value = false;
          }}
          style={styles.wrapper}
          onPress={() => {
            showDetail();
            isPressed.value = true;
            setTimeout(() => {
              isPressed.value = false;
            }, 300);
          }}
        >
          <Text>{name}</Text>
          <Text>{amount}</Text>
        </TouchableWithoutFeedback>
      </Animated.View>
    </ScaleDecorator>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 24,
    color: 'white',
    borderRadius: 6,
    marginVertical: 5,
    marginHorizontal: 20,
  },
});
