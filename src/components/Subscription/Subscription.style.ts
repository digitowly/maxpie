import { StyleSheet } from 'react-native';

export const subscriptionStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 22,
    borderRadius: 6,
    marginVertical: 5,
    marginHorizontal: 20,
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
