import React, { useState, useLayoutEffect } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";

import { useCardDispatch } from "../db";
import { getCardById } from "../db/card";

import CalendarModal from "../components/CalendarModal";
import CardModal from "../components/CardModal";
import HeaderBarT from "../components/HeaderBarT";
import AddButton from "../components/AddButton";
import DonutChart from "../components/DonutChart";
import CateItem from "../components/CateItem";





const HomeScreen = ({ navigation }) => {
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [cardModalVisible, setCardModalVisible] = useState(false);
  const [cardId, setCardId] = useState("1");
  const dispatch = useCardDispatch();

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

  const dataPie = [
    { value: 100, stroke: "#22594e", strokeWidth: 6 },
    { value: 60, stroke: "#2f7d6d" },
    { value: 30, stroke: "#3da18d" },
    { value: 20, stroke: "#69c2b0" },
    { value: 10, stroke: "#a1d9ce" },
  ]

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
          <CateItem color='#FF8000' cate='Eating' money={200000} />
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

        <AddButton/>

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
  },
});

export default HomeScreen;
