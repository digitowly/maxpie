import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Color } from '../../types';
import { Text } from '../Themed';

interface EmptyCategoryProps {
  name: string;
}

export default function EmptyCategory({
  name,
}: EmptyCategoryProps): JSX.Element {
  return (
    <View style={style.wrapper}>
      <Text style={style.title}>{`'${name}' is empty`}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    height: '100%',
    padding: '12%',
    paddingTop: '25%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Color.gray,
  },
});
