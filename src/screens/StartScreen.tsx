import * as React from 'react';

import { Button, StyleSheet } from 'react-native';
import MPModal from '../components/Modal/MPModal';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import SubscriptionCreator from '../components/SubscriptionCreator/SubscriptionCreator';
import SubscriptionList from '../components/SubscriptionList/SubscriptionList';
import { Text, View } from '../components/Themed';
import { Color, SubscriptionType } from '../types';

const defaultList: SubscriptionType[] = [
  {
    id: '1',
    name: 'Amazon',
    amount: 7.99,
    color: Color.orange,
  },
  {
    id: '2',
    name: 'Netflix',
    amount: 9.5,
    color: Color.red,
  },
  {
    id: '3',
    name: 'Google',
    amount: 1.99,
    color: Color.blue,
  },
  {
    id: '4',
    name: 'Apple',
    amount: 2.99,
    color: Color.green,
  },
];

const emptySubscription: SubscriptionType = {
  id: '',
  name: '',
  amount: 0,
  color: Color.orange,
};

export default function StartScreen(): JSX.Element {
  const [showModal, setShowModal] = React.useState(false);

  const [subscriptions, setSubscriptions] =
    React.useState<SubscriptionType[]>(defaultList);

  const newSubscriptionRef = React.useRef<SubscriptionType>(emptySubscription);

  function updateNewSubscription(newSub: SubscriptionType) {
    newSubscriptionRef.current = newSub;
  }

  function addNewSubscription() {
    console.log('NEW:', newSubscriptionRef.current);
    if (newSubscriptionRef.current.name && newSubscriptionRef.current.amount) {
      setSubscriptions((s) => [
        { ...newSubscriptionRef.current, id: uuidv4() },
        ...s,
      ]);
      updateNewSubscription(emptySubscription);
    }
  }

  function removeSubscription(id: string) {
    setSubscriptions((s) => s.filter((sub) => sub.id !== id));
  }

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
          setList={setSubscriptions}
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
        <SubscriptionCreator setNewSubscription={updateNewSubscription} />
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
