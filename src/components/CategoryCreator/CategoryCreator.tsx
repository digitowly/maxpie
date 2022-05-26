import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { colors } from '../../constants/Colors';
import { storageSetCategories } from '../../helper/storage/categoryStorage';
import { useCategorySore } from '../../store/category.store';
import { useSubscriptionStore } from '../../store/subscription.store';
import { Category, Color } from '../../types';
import ColorPicker from '../ColorPicker/ColorPicker';
import { TextInput, View } from '../Themed';

export default function CategoryCreater(): JSX.Element {
  const [symbol, setSymbol] = React.useState('🐦');
  const [name, setName] = React.useState('');
  const [color, setColor] = React.useState<Color>(Color.blue);

  const addCategory = useCategorySore((state) => state.addCategory);
  const addLibrary = useSubscriptionStore((state) => state.addLibrary);
  const categoriesData = useCategorySore((state) => state.data);

  const createCategory = () => {
    const newCategory: Category = {
      id: uuidv4(),
      name,
      color,
      icon: symbol,
    };
    addLibrary(newCategory.id);
    addCategory({ newCategoryId: newCategory.id, newCategory });

    storageSetCategories(categoriesData);
  };

  return (
    <View style={[style.wrapper, { backgroundColor: color }]}>
      <TextInput
        placeholder='🐦'
        style={style.symbol}
        value={symbol}
        onChangeText={(text) => setSymbol(text)}
        maxLength={1}
      />
      <TextInput
        placeholder='Name'
        placeholderTextColor={'lightgrey'}
        style={style.name}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <ColorPicker
        colors={colors}
        activeColor={color}
        setActiveColor={(selectedColor) => setColor(selectedColor)}
      />
      <Button title='create' onPress={createCategory} />
    </View>
  );
}

const style = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 20,
  },
  symbol: {
    fontSize: 40,
    width: 80,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  name: {
    fontSize: 20,
    width: 80,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
});
