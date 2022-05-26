import * as React from 'react';
import { Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useCategoryStore } from '../../store/category.store';
import { Category } from '../../types';
import CategoryEditor from '../CategoryEditor/CategoryEditor';
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
  const [showCategoryEditor, setShowCategoryEditor] = React.useState(false);
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category | null>(null);

  const categoryData = useCategoryStore((state) => state.data);
  const categories = Array.from(categoryData.values());
  return (
    <MPModal
      title='Categories'
      visible={visible}
      close={hide}
      actionLabel='add'
      action={() => setShowCategoryEditor(true)}
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
            onLongPress={() => {
              // prevent editing general (default) category
              if (item.id !== 'general') {
                setSelectedCategory(item);
                setShowCategoryEditor(true);
              }
            }}
            categoryId={item.id}
          />
        )}
      />
      <MPModal
        title={
          selectedCategory ? `Edit ${selectedCategory.name}` : 'Create Category'
        }
        visible={showCategoryEditor}
        close={() => {
          setShowCategoryEditor(false);
          setSelectedCategory(null);
        }}
      >
        <CategoryEditor
          category={selectedCategory}
          callback={() => {
            setShowCategoryEditor(false);
            setSelectedCategory(null);
          }}
        />
      </MPModal>
    </MPModal>
  );
}
