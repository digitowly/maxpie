import { Color } from '../types';

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: Color.black,
    background: Color.white,
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: Color.white,
    background: Color.black,
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};

export const colors: Color[] = [
  Color.blue,
  Color.red,
  Color.green,
  Color.orange,
];
