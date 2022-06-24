import * as React from 'react';
import { View } from 'react-native';
import i18n from '../../lang/i18n';
import { useStore } from '../../store';
import ActionSheet from '../ActionSheet/ActionSheet';
import CurrencyPicker from './CurrencyPicker/CurrencyPicker';
import SettingsRow from './SettingsRow';

export default function Settings() {
  const currency = useStore((state) => state.currency);

  const [showActionSheet, setShowActionSheet] = React.useState(false);
  return (
    <View>
      <SettingsRow
        title={i18n.t('currency')}
        value={currency.sign}
        onPress={() => setShowActionSheet(true)}
      />

      <ActionSheet
        visible={showActionSheet}
        hide={() => setShowActionSheet(false)}
        closeLabel={i18n.t('confirm')}
      >
        <CurrencyPicker />
      </ActionSheet>
    </View>
  );
}
