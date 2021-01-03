import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";

import { useCardDispatch } from "../db";
import { getCardById } from "../db/card";
import {getAllCategory} from '../db/category'

import CalendarModal from "../components/CalendarModal";
import CardModal from "../components/CardModal";
import HeaderBarT from "../components/HeaderBarT";
import AddButton from "../components/AddButton";
import DonutChart from "../components/DonutChart";
import CateItem from "../components/CateItem";
import {getTransactionByCardAndDate} from '../db/transaction'




const HomeScreen = ({ navigation }) => {
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


  // STATE
  const [cardId, setCardId] = useState("1");
  const dispatch = useCardDispatch();
  const [transDate, setTransDate] = useState(undefined);


  // FETCH
  // const fetchTransDate = async () => {
  //   const data = await getTransactionByDate('1/1/2020');
  //   setTransDate(data);
  // }


  // useEffect(() => {
  //   fetchTransDate();
  // }, [type,date]);

  // DEBUG
  // console.log('\n==== HOME SCREEN ====\n');
  // console.log('----- transByDate -----\n', transDate);


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


      <View style={styles.container}>

        {/* first row */}
        <View style={styles.flexBetween}>
          <CateItem color='#ff8000' cate='Eating' money={20} />
          <CateItem color='#18c20c' cate='Transportation' money={50} />
          <CateItem color='#278CD9' cate='Parking' />
          <CateItem color='#B97E2F' cate='Drinking' />
        </View>

        {/* second row */}
        <View style={styles.flexBetween}>
          <View style={styles.aside}>
            <CateItem color='#01dfa3' cate='Transferring' />
            <CateItem color='#ece800' cate='Movie' />
          </View>

          <View>
            <DonutChart />
          </View>

          <View style={styles.aside}>
            <CateItem color='#FF3E3E' cate='Shopping' />
            <CateItem color='#FF00D5' cate='Groceries' />
          </View>
        </View>

        {/* third round */}
        <View style={styles.flexBetween}>
          <CateItem color='#FF6594' cate='Phone' />
          <CateItem color='#B506FF' cate='House' />
          <CateItem color='rgba(0,0,0,0)' />
          <CateItem color='rgba(0,0,0,0)' />
        </View>

        

        <AddButton />

      </View>

    </>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fafafa',
  },

  flexBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  aside: {
    justifyContent: 'space-between',
  }
});

export default HomeScreen;
