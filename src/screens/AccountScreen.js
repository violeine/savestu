import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native'

import { getTransactionByCard } from "../db/transaction"

import TransItem from '../components/TransItem'
import BtnAction from '../components/BtnAction';


export default function AccountScreen() {

  const [transAll, setTransAll] = useState(undefined);

  // Lấy dữ liệu db gán cho biến dataAll
  const fetchDataAll = async () => {
    const dataAll = await getTransactionByCard(1);
    setTransAll(dataAll);
  };

  // Tự động chạy fetchDataAll khi load xong screen
  useEffect(() => {
    fetchDataAll();
  }, [])

  console.log('\n\n===== TRANSACTION SCREEN =====\n');
  console.log('\n------- transAll -------\n', transAll);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor='#238f70' />

      <ScrollView style={styles.container}>

        {
          transAll
            ? transAll.map(el => <TransItem el={el} key={el.id} />)
            : <Text style={[styles.centerItem, styles.txtNotify]}>You have no transaction</Text>
        }

        <BtnAction title='Fetch Data All' type='primary' onPress={fetchDataAll} />

      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingTop: 20,
  },

  centerItem: {
    flex: 1,
    alignSelf: "center",
  },

  txtNotify: {
    fontSize: 16,
  }
});

