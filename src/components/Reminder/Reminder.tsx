import RNDateTimePicker from '@react-native-community/datetimepicker';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../Themed';

interface ReminderProps {
  date: Date | null;
  updateDate: (newDate: Date) => void;
}

export default function Reminder({ date, updateDate }: ReminderProps) {
  return (
    <View style={[style.wrapper]}>
      <Text>Reminder</Text>
      <View style={style.datepickerWrapper}>
        {date ? (
          <RNDateTimePicker
            value={date}
            onChange={(_, date) => date && updateDate(date)}
          />
        ) : (
          <Text>none</Text>
        )}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  datepickerWrapper: {
    width: '50%',
  },
});
