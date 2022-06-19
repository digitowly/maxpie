import { Dimensions } from 'react-native';

export function getListCols() {
  const width = Dimensions.get('screen').width;

  //   console.log(width);

  if (width > 420) return 9;

  return 8;
}
