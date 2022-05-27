import * as React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { p } from '../../constants/Spacing';
import { useCategoryStore } from '../../store/category.store';

interface CategeroySelectionProps {
  categoryId: string;
  onPress: () => void;
  onLongPress?: () => void;
  isSmall?: boolean;
  isInList?: boolean;
}

export default function CategorySelection({
  categoryId,
  onPress,
  onLongPress,
  isSmall,
  isInList,
}: CategeroySelectionProps): JSX.Element {
  const categoryData = useCategoryStore((state) => state.data);

  const category = categoryData.get(categoryId);

  return (
    <Pressable
      style={[
        style.wrapper,
        {
          backgroundColor: category?.color,
          padding: isSmall ? 5 : 15,
          width: isInList ? 'auto' : 250,
        },
      ]}
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
    width: 250,
  },
  name: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  icon: { fontSize: 18, marginRight: 10 },
});
