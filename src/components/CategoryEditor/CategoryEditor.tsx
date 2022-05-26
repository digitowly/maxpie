import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { colors } from '../../constants/Colors';
import { storageSetCategories } from '../../helper/storage/categoryStorage';
import { storageSetLibrary } from '../../helper/storage/libraryStorage';
import { useStore } from '../../store';
import { useCategoryStore } from '../../store/category.store';
import { useSubscriptionStore } from '../../store/subscription.store';
import { Category, Color } from '../../types';
import MPButton from '../Buttons/MPButton';
import ColorPicker from '../ColorPicker/ColorPicker';
import { TextInput, View } from '../Themed';

interface CategoryEditorProps {
  category: Category | null;
  callback?: () => void;
}

export default function CategoryEditor({
  category,
  callback,
}: CategoryEditorProps): JSX.Element {
  const [symbol, setSymbol] = React.useState(() => category?.icon ?? '🐦');
  const [name, setName] = React.useState(() => category?.name ?? '');
  const [color, setColor] = React.useState<Color>(
    () => category?.color ?? Color.blue
  );

  //   const subscriptionData = useSubscriptionStore(state => state.data)

  const categoriesData = useCategoryStore((state) => state.data);
  const addCategory = useCategoryStore((state) => state.addCategory);
  const overwriteCategory = useCategoryStore(
    (state) => state.overwriteCategory
  );
  const removeCategory = useCategoryStore((state) => state.removeCategory);

  const library = useSubscriptionStore((state) => state.library);
  const addLibrary = useSubscriptionStore((state) => state.addLibrary);
  const removeLibrary = useSubscriptionStore((state) => state.removeLibrary);

  const setActiveCategory = useStore((state) => state.setActiveCategoy);

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

    callback && callback();
  };

  const handleUpdate = () => {
    if (category)
      overwriteCategory({
        ...category,
        name,
        color,
        icon: symbol,
      });

    storageSetCategories(categoriesData);

    callback && callback();
  };

  const handleDelete = () => {
    if (category) {
      removeCategory(category.id);
      removeLibrary(category.id);
      setActiveCategory(null);

      storageSetCategories(categoriesData);
      storageSetLibrary(library);

      callback && callback();
    }
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
      {category ? (
        <MPButton title='update' onPress={handleUpdate} />
      ) : (
        <MPButton title='create' onPress={createCategory} />
      )}
      {category && <Button title='remove' onPress={handleDelete} />}
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
