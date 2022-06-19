import * as React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import 'react-native-get-random-values';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { v4 as uuidv4 } from 'uuid';
import { colors } from '../../constants/Colors';
import { storageSetCategories } from '../../helper/storage/categoryStorage';
import { storageSetLibrary } from '../../helper/storage/libraryStorage';
import i18n from '../../lang/i18n';
import { useStore } from '../../store';
import { useCategoryStore } from '../../store/category.store';
import { useSubscriptionStore } from '../../store/subscription.store';
import { Category, Color } from '../../types';
import ActionSheet from '../ActionSheet/ActionSheet';
import MPButton from '../Buttons/MPButton';
import DeleteButton from '../Buttons/presets/DeleteButton';
import ColorPicker from '../ColorPicker/ColorPicker';
import EmojiPicker, { EmojiPickerRef } from '../EmojiPicker/EmojiPicker';
import Close from '../Icons/Close';
import MPTextInput from '../Inputs/MPTextInput';
import Layout from '../Layout';
import { View } from '../Themed';

interface CategoryEditorProps {
  category: Category | null;
  callback?: () => void;
}

export default function CategoryEditor({
  category,
  callback,
}: CategoryEditorProps): JSX.Element {
  const emojiPickerRef = React.useRef<EmojiPickerRef>(null);
  const [symbol, setSymbol] = React.useState(() => category?.icon ?? '🐦');
  const [name, setName] = React.useState(() => category?.name ?? '');
  const [color, setColor] = React.useState<Color>(
    () => category?.color ?? Color.blue
  );

  const hasAllInputs = !!symbol && !!name;

  const [showActionSheeht, setShowActionSheet] = React.useState(false);

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
    <>
      <Layout>
        <View style={[style.wrapper, { backgroundColor: color }]}>
          <Pressable onPress={() => emojiPickerRef.current?.show()}>
            <Text style={style.symbol}>{symbol}</Text>
          </Pressable>

          <MPTextInput
            placeholderTextColor={Color.gray}
            darkColor={Color.white}
            lightColor={Color.white}
            placeholder={i18n.t('enterName')}
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <ColorPicker
            colors={colors}
            activeColor={color}
            setActiveColor={(selectedColor) => setColor(selectedColor)}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          {category ? (
            <>
              {hasAllInputs && (
                <Animated.View
                  key={hasAllInputs.toString()}
                  entering={FadeInDown}
                  exiting={FadeOutDown}
                >
                  <MPButton title={i18n.t('update')} onPress={handleUpdate} />
                </Animated.View>
              )}
            </>
          ) : (
            <>
              {hasAllInputs && (
                <Animated.View
                  key={hasAllInputs.toString()}
                  entering={FadeInDown}
                  exiting={FadeOutDown}
                >
                  <MPButton title={i18n.t('create')} onPress={createCategory} />
                </Animated.View>
              )}
            </>
          )}
          {category && (
            <DeleteButton onPress={() => setShowActionSheet(true)} />
          )}
          {category && (
            <ActionSheet
              visible={showActionSheeht}
              hide={() => setShowActionSheet(false)}
            >
              <DeleteButton onPress={handleDelete} />
            </ActionSheet>
          )}
        </View>
      </Layout>
      <EmojiPicker
        ref={emojiPickerRef}
        setEmoji={(em) => setSymbol(em)}
        topBar={{
          closeElement: <Close />,
        }}
      />
    </>
  );
}

const style = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: Color.green,
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  symbol: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    color: Color.white,
  },
});
