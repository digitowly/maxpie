import * as React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { categories } from '../../helper/categories';
import { Category } from '../../types';
import MPModal from '../Modal/MPModal';
import CategorySelection from './CategorySelection';

interface CategoryPickerProps {
  visible: boolean;
  hide: () => void;
  updateCategory: (category: Category) => void;
}

export default function CategoryPicker({
  visible,
  hide,
  updateCategory,
}: CategoryPickerProps): JSX.Element {
  return (
    <MPModal title='Categories' visible={visible} close={hide}>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategorySelection
            onPress={() => {
              updateCategory(item);
              hide();
            }}
            category={item}
          />
        )}
      />
    </MPModal>
  );
}
