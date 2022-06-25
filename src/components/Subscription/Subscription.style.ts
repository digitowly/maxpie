import { StyleSheet } from 'react-native';
import { p } from '../../constants/Spacing';

export const subscriptionStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: p.md,
    paddingVertical: 16,
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: p.md,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
});
