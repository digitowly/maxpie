import * as React from 'react';
import { Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { categories } from '../../helper/categories';
import { Category } from '../../types';
import MPModal from '../Modal/MPModal';
import CategorySelection from './CategorySelection';

interface CategoryPickerProps {
  isStart?: boolean;
  visible: boolean;
  hide: () => void;
  updateCategory: (category: Category | null) => void;
}

export default function CategoryPicker({
  isStart,
  visible,
  hide,
  updateCategory,
}: CategoryPickerProps): JSX.Element {
  return (
    <MPModal title='Categories' visible={visible} close={hide}>
      {isStart && (
        <Button
          title='all'
          onPress={() => {
            updateCategory(null);
            hide();
          }}
        />
      )}
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
