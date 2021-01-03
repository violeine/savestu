import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { getCard } from "../db/card";

import { Picker } from '@react-native-picker/picker'
import CardItem from "../components/CardItem";
import BtnAction from "../components/BtnAction";
import HeaderStack from "../components/HeaderStack";


export default function CardScreen({ navigation }) {
  const [card, setCard] = useState(undefined);
  // Lấy dữ liệu db & gán cho biến card
  const fetchData = async () => {
    const data = await getCard();
    setCard(data);
  };

  // Tự động chạy fetchData khi load xong screen
  useEffect(() => {
    fetchData();
  },[]);

  const onLongPressCardItem = (item) => {
    navigation.navigate("Update", { type: "card", data: { ...item } });
  };

  // Debug
  // console.log('\n===== CARD SCREEN =====');
  // console.log('\n------ All Card -----\n', card);


  return (
    <>
      <HeaderStack
        title="My Card"
        onAction={() => navigation.navigate('Create',{type : 'card'})}
      />

      <View style={styles.filter}>
        <FontAwesome name="filter" size={20} color="black" />

        <View style={styles.picker}>
          <Picker
            mode="dropdown"
            prompt="Filter card"
          >
            <Picker.Item label="All Card" value="all" />
            <Picker.Item label="By type" value="type" />
            <Picker.Item label="By money" value="money" />
          </Picker>
        </View>
      </View>

      <ScrollView style={styles.container}>


        {
          // Get each of element
          card
            ? card.map((el, i) => (
              <CardItem key={i} el={el} onLongPress={onLongPressCardItem} />
            ))
            : <Text style={styles.centerItem}>You have no card</Text>
        }

        <BtnAction title="Refresh" type="primary" onPress={fetchData} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
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
    width: 120,
    height: 40,
    marginLeft: 5,
    justifyContent: "center",
  },
});
