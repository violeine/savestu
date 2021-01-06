import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { FAB, Portal, Provider } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native'

const AddButton = () => {
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const navigation = useNavigation();


  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? 'close' : 'plus'}
          color='#FFF'
          style={styles.fab}
          fabStyle={open ? styles.activeBgColor : styles.inactiveBgColor}
          actions={[
            {
              label: 'Add Income',
              icon: 'plus',
              color: '#FFF',
              style: { backgroundColor: '#29e038' },
              onPress: () => navigation.navigate('Create', {type: 'transaction', transactionData: {type : 'income'}}),
            },
            {
              label: 'Add Expense',
              icon: 'minus',
              color: '#FFF',
              style: { backgroundColor: '#f62d2d' },
              onPress: () => navigation.navigate('Create', {type: 'transaction', transactionData: {type : 'expense'}}),
            },
            {
              label: 'Transfer',
              icon: 'arrow-left-right',
              color: '#FFF',
              style: { backgroundColor: '#2da6f6' },
              onPress: () => navigation.navigate('Create', {type: 'tranfer'}),
            },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  activeBgColor: {
    backgroundColor: '#239e7b',
  },

  inactiveBgColor: {
    backgroundColor: '#2CC197',
  },

  fab:{
    position: "absolute",
    paddingRight: 10,
    paddingBottom: 20,
  },
})

export default AddButton