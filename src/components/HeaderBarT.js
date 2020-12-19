import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
  StatusBar,
} from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useCardState } from "../db";
import { TextMoney } from "./TextMoney";

const HeaderBarT = ({ showCalendarModal, showCardModal }) => {
  const { money, name, id } = useCardState();

  return (
    <View style={{ ...styles.headerContainer, backgroundColor: "#2CC197" }}>

      <StatusBar barStyle="light-content" backgroundColor="#229B79" />

      <View style={styles.funcContainer}>
        <Pressable style={({ pressed }) =>
          [
            {
              backgroundColor: pressed ? '#fbfbfb31' : 'transparent',
            },
            styles.headerCalendar,
          ]
        }
          onPress={showCalendarModal}>
          <MaterialCommunityIcons
            name="calendar-today"
            size={24}
            color="#fff"
          />
          <Text style={styles.text}> By day</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) =>
            [
              {
                backgroundColor: pressed ? '#fbfbfb31' : 'transparent',
              },
              styles.headerCard,
            ]
          }
          onPress={showCardModal}
        >
          <Text style={styles.text}>{name}:  </Text>
          <Text style={styles.textBig}>{TextMoney(money)}  </Text>
          <FontAwesome5 name="caret-down" color="#fff" size={20} />
        </Pressable>
      </View>

      <View style={styles.dateContainer}>
        <Text style={{ color: "rgba(255,255,255,0.3)" }}>Tue, 27 Oct</Text>
        <Text style={styles.textBig}>Wed, 28 Oct</Text>
        <Text style={{ color: "rgba(255,255,255,0.3)" }}>Thu, 29 Oct</Text>
      </View>

    </View >
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: 90,
    elevation: 5,
  },

  funcContainer: {
    flex: 2,
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },

  headerCalendar: {
    height: 30,
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 5,
  },

  headerCard: {
    height: 30,
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 5,
  },

  dateContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    marginBottom: 5,
  },

  text: {
    color: "#fff",
    fontSize: 14,
  },

  textBig: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 14,
  },
});

export default HeaderBarT;

