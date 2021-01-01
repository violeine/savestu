import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native'
import { FontAwesome } from "@expo/vector-icons";

import { getTransactionByCard } from "../db/transaction"

import { Picker } from '@react-native-picker/picker'
import TransItem from '../components/TransItem'
import BtnAction from '../components/BtnAction';


export default function AccountScreen() {

  const [transAll, setTransAll] = useState(undefined);

  // Lấy dữ liệu db gán cho biến dataAll
  const fetchDataAll = async () => {
    const data = await getTransactionByCard(1);
    setTransAll(data);
  };

  // Tự động chạy fetchDataAll khi load xong screen
  useEffect(() => {
    fetchDataAll();
  }, [])

  // console.log('\n===== ACCOUNT SCREEN =====\n');
  // console.log('---- data All -----\n', transAll);


  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor='#238f70' />

      <View style={styles.filter}>
        <FontAwesome name="filter" size={20} color="black" />

        <View style={styles.picker}>
          <Picker
            mode="dropdown"
            prompt="Filter card"
          >
            <Picker.Item label="All Transaction" value="all" />
            <Picker.Item label="By category" value="type" />
            <Picker.Item label="By money" value="money" />
          </Picker>
        </View>
      </View>

      <ScrollView style={styles.container}>

        {
          transAll
            ? transAll.map(el =>
              el.category == 1
                ? null
                : <TransItem el={el} key={el.id} />
            )
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
  },

  centerItem: {
    flex: 1,
    alignSelf: "center",
  },

  filter: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#fafafa",
  },

  picker: {
    width: 170,
    height: 40,
    marginLeft: 5,
    justifyContent: "center",
  },

  txtNotify: {
    fontSize: 16,
  }
});

