import * as React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useCategoryStore } from '../../store/category.store';

interface CategeroySelectionProps {
  categoryId: string;
  onPress: () => void;
  onLongPress?: () => void;
}

export default function CategorySelection({
  categoryId,
  onPress,
  onLongPress,
}: CategeroySelectionProps): JSX.Element {
  const categoryData = useCategoryStore((state) => state.data);

  const category = categoryData.get(categoryId);

  return (
    <Pressable
      style={[style.wrapper, { backgroundColor: category?.color }]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={style.icon}>{category?.icon}</Text>
      </View>
      <Text style={style.name}>{category?.name}</Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    paddingLeft: 23,
    paddingRight: 30,
    borderRadius: 500,
    marginVertical: 5,
  },
  name: {
    color: 'white',
    fontSize: 15,
  },
  icon: { fontSize: 18, marginRight: 10 },
});
