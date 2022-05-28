import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../Themed';

export default function EmptyList(): JSX.Element {
  return (
    <View style={style.wrapper}>
      <Text style={style.title}>{`Hey, great to see you!  👋`}</Text>
      <Text style={style.text}>
        {`Start adding your reoccuring expenses by pressing the '+' icon in the top right`}
      </Text>
      <Text style={style.text}>
        {`You can assing them a category and filter them or show them all at once`}
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  wrapper: {
    // justifyContent: 'center',
    height: '100%',
    padding: '12%',
    paddingTop: '25%',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 20,
  },
});
