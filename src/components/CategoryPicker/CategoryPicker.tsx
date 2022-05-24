import * as React from 'react';
import { Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useCategorySore } from '../../store/category.store';
import { Category } from '../../types';
import CategoryCreater from '../CategoryCreator/CategoryCreator';
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
  const [showCategoryCreator, setShowCategoryCreator] = React.useState(false);
  const categoryData = useCategorySore((state) => state.data);
  const categories = Array.from(categoryData.values());
  return (
    <MPModal
      title='Categories'
      visible={visible}
      close={hide}
      actionLabel='add'
      action={() => setShowCategoryCreator(true)}
    >
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
            categoryId={item.id}
          />
        )}
      />
      <MPModal
        title='Create Category'
        visible={showCategoryCreator}
        close={() => setShowCategoryCreator(false)}
      >
        <CategoryCreater />
      </MPModal>
    </MPModal>
  );
}
