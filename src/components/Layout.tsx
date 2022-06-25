import * as React from 'react';
import { StyleSheet } from 'react-native';
import { p } from '../constants/Spacing';
import { View } from './Themed';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <View style={style.wrapper}>{children}</View>;
}

const style = StyleSheet.create({
  wrapper: {
    padding: p.md,
  },
});
