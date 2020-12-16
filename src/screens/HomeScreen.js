import React, { useState, useLayoutEffect } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";

import { useCardDispatch } from "../db";
import { getCardById } from "../db/card";

import CalendarModal from "../components/CalendarModal";
import CardModal from "../components/CardModal";
import HeaderBarT from "../components/HeaderBarT";
import AddButton from "../components/AddButton";
import DonutChart from "../components/DonutChart";

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

  return (
    <>
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


      {/* donut chart */}
      {/* <DonutChart style={styles.chart} /> */}


      <>
        <Text style={{ alignSelf: "center" }}>Home Screen {cardId} </Text>
        <TextInput
          placeholder="id"
          style={styles.input}
          value={cardId}
          onChangeText={(t) => setCardId(t)}
        />
        <Button
          title="Update Global Card"
          onPress={async () => {
            const data = await getCardById(cardId);
            dispatch(data);
          }}
        />
      </>

      <AddButton />
    </>
  );

};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  input: {
    borderColor: "gray",
    borderWidth: 1,
    width: 300,
    padding: 5,
    marginBottom: 2,
    alignSelf: "center",
  },

  chart: {
    height: 200,
    width: 200,
    backgroundColor: 'blue',
  }
});

export default HomeScreen;
