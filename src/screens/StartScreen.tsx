import * as React from 'react';

import { Button, StyleSheet } from 'react-native';
import MPModal from '../components/Modal/MPModal';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { SubscriptionType } from '../components/Subscription/SubscriptionType';
import SubscriptionCreator from '../components/SubscriptionCreator/SubscriptionCreator';
import SubscriptionList from '../components/SubscriptionList/SubscriptionList';
import { Text, View } from '../components/Themed';

const defaultList: SubscriptionType[] = [
  {
    id: '1',
    name: 'amazon',
    amount: '7',
  },
];

const emptySubscription: SubscriptionType = {
  id: '',
  name: '',
  amount: '',
};

export default function StartScreen(): JSX.Element {
  const [showModal, setShowModal] = React.useState(false);
  const [subscriptions, setSubscriptions] =
    React.useState<SubscriptionType[]>(defaultList);
  const [newSubscription, setNewSubscription] =
    React.useState<SubscriptionType>(emptySubscription);

  function addNewSubscription() {
    console.log('NEW:', newSubscription);
    if (newSubscription.name && newSubscription.amount) {
      setSubscriptions((s) => [{ ...newSubscription, id: uuidv4() }, ...s]);
      setNewSubscription(emptySubscription);
    }
  }

  function removeSubscription(id: string) {
    setSubscriptions((s) => s.filter((sub) => sub.id !== id));
  }

  console.log(subscriptions);
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <Text>This is my title</Text>
        <Button title='+' onPress={() => setShowModal(true)}></Button>
      </View>
      <View style={styles.container}>
        <SubscriptionList
          subscriptions={subscriptions}
          removeItem={(id) => removeSubscription(id)}
        />
        <View></View>
      </View>
      <MPModal
        title='New Subscription'
        visible={showModal}
        close={() => setShowModal(false)}
        actionLabel='create'
        action={() => {
          addNewSubscription();
          setShowModal(false);
        }}
      >
        <SubscriptionCreator
          newSubscription={newSubscription}
          setNewSubscription={setNewSubscription}
        />
      </MPModal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
