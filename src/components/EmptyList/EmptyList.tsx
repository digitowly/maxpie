import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import i18n from '../../lang/i18n';
import { Text } from '../Themed';

export default function EmptyList(): JSX.Element {
  return (
    <View style={style.wrapper}>
      <Text style={style.title}>{i18n.t('introTitle')}</Text>
      <Text style={style.text}>{i18n.t('introBody1')}</Text>
      {/* <Text style={style.text}>{i18n.t('introBody2')}</Text> */}
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
