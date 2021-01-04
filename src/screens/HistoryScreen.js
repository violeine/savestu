import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { FontAwesome } from "@expo/vector-icons";

import { getTransactionByCard } from "../db/transaction"

import CalendarModal from "../components/CalendarModal";
import CardModal from "../components/CardModal";
import HeaderBarT from "../components/HeaderBarT";
import TransItem from '../components/TransItem'
import BtnAction from '../components/BtnAction';



export default function HistoryScreen({ navigation }) {
  // HEADER
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [cardModalVisible, setCardModalVisible] = useState(false);

  useLayoutEffect(() =>
    navigation.setOptions({
      header: () => (
        <HeaderBarT
          showCalendarModal={() => setCalendarModalVisible(true)}
          showCardModal={() => setCardModalVisible(true)}
        />
      ),
    })
  );


  // DATA
  const [transAll, setTransAll] = useState(undefined);

  const fetchDataAll = async () => {
    const data = await getTransactionByCard(1);
    setTransAll(data);
  };

  const onLongPressTranItem = (item) => {
    navigation.navigate('Update', {type: "transaction", data: {...item} })
  }

  useEffect(() => {
    fetchDataAll();
  }, [])

  // console.log('\n===== HISTORY SCREEN =====\n');
  // console.log('---- data All -----\n', transAll);


  return (
    <>

      <View>
        <CalendarModal
          visible={calendarModalVisible}
          showCalendarModal={() => setCalendarModalVisible(true)}
          hideCalendarModal={() => setCalendarModalVisible(false)}
        />

        <CardModal
          visible={cardModalVisible}
          showCardModal={() => setCardModalVisible(true)}
          hideCardModal={() => setCardModalVisible(false)}
        />
      </View>

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
                : <TransItem el={el} key={el.id} onLongPress={onLongPressTranItem}/>
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

