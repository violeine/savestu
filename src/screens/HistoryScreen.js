import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView, ToastAndroid } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { FontAwesome } from "@expo/vector-icons";
import {showToastError} from '../services/formHelperFunction'

import {useDateState, useCardState} from "../db"
import { getTransactionByCardAndDate,getTransactionByCard,getTransactionByCardAndMonth, getTransactionByCardAndYear } from "../db/transaction"

import {formatDateDB} from "../services/DateFunctions"

import CalendarModal from "../components/CalendarModal";
import CardModal from "../components/CardModal";
import HeaderBarT from "../components/HeaderBarT";
import TransItem from '../components/TransItem'
import BtnAction from '../components/BtnAction';
import AddButton from '../components/AddButton';



export default function HistoryScreen({ navigation,route }) {
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
  const date=useDateState();
  const card=useCardState();
  const {id:cardID, money}=card;
  const fetchDataAll = async (cardID,date) => {

    if (date.type === "date") {
      const data = await getTransactionByCardAndDate({
        card: cardID,
        ...formatDateDB(date)
      })
      setTransAll(data);
    }

    if (date.type === "month") {
      const data = await getTransactionByCardAndMonth({
        card: cardID,
        ...formatDateDB(date)
      });
      setTransAll(data);
    }
    if (date.type === "year") {
      const data = await getTransactionByCardAndYear({
        card: cardID,
        ...formatDateDB(date)
      });
      setTransAll(data);
    }
    if (date.type === "all") {
      const data = await getTransactionByCard(cardID);
      setTransAll(data);
    }
  };

  const onLongPressTranItem = (id) => {
    navigation.navigate('Update', { type: "transaction", id: id })
  }

  useEffect(() => {
    fetchDataAll(cardID,date);
  }, [cardID, date,money, card,route.params?.update])

  // console.log('\n===== HISTORY SCREEN =====\n');
  // console.log('---- data All -----\n', transAll);


  return (
    <View style={styles.container}>

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
      <ScrollView>
        {
          transAll
            ? transAll.map(el =>
              el.category == 1
                ? null
                : el.category <= 3
                ? <TransItem el={el} key={el + Math.floor(Math.random()*500)} onLongPress={showToastError}/>
                : <TransItem el={el} key={el + Math.floor(Math.random()*500)} onLongPress={onLongPressTranItem}/>
            )
            : <Text style={[styles.centerItem, styles.txtNotify]}>You have no transaction</Text>
        }

      </ScrollView>

      <AddButton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingBottom: 100,
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
  },

  picker: {
    width: 170,
    marginLeft: 5,
    justifyContent: "center",
  },

  txtNotify: {
    fontSize: 16,
  }
});

