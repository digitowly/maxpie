import * as React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import i18n from '../../lang/i18n';
import { useCategoryStore } from '../../store/category.store';
import { Category } from '../../types';
import CategoryEditor from '../CategoryEditor/CategoryEditor';
import Plus from '../Icons/Plus';
import Layout from '../Layout';
import MPModal from '../Modal/MPModal';
import All from './All';
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
      title={i18n.t('categories')}
      visible={visible}
      close={hide}
      actionLabel={<Plus />}
      action={() => setShowCategoryEditor(true)}
    >
      <Layout>
        {isStart && (
          <All
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
              isInList
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
      </Layout>
      <MPModal
        title={
          selectedCategory ? i18n.t('editCategory') : i18n.t('createCategory')
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
