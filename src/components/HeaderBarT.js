import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
  StatusBar,
  ToastAndroid,
} from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

import { useCardState } from "../db";
import { TextMoney } from '../services/TextMoney';
import { formatDateDisplay, formatDateDB, nextDate, nextMonth } from "../services/DateFunctions";




const HeaderBarT = ({ showCalendarModal, showCardModal }) => {

  // STATE
  const { money, name, id } = useCardState();
  const [curDate, setCurDate] = useState('');

  useEffect(() => {
    onPressCurDate();
  }, [])


  // FUNC ONPRESS
  // -- Date --
  const onPressCurDate = () => {
    setCurDate(
      formatDateDB(new Date())
    )
  }

  const onPressNextDate = () => {
    setCurDate(
      nextDate(curDate, 1)
    )
  }

  const onPressPrevDate = () => {
    setCurDate(
      nextDate(curDate, -1)
    )
  }

  // SHOW TOAST
  const showToast = () => {
    ToastAndroid.show("You have returned to current date", ToastAndroid.SHORT);
  };


  return (
    <View style={{ ...styles.headerContainer, backgroundColor: "#2CC197" }}>

      <StatusBar barStyle="light-content" backgroundColor="#229B79" />

      <View style={styles.funcContainer}>
        <Pressable
          onPress={showCalendarModal}
          style={({ pressed }) =>
            [
              {
                backgroundColor: pressed ? '#fbfbfb31' : 'transparent',
              },
              styles.headerCalendar,
            ]}
        >
          <MaterialCommunityIcons name="calendar-today" size={24} color="#fff" />
          <Text style={styles.text}> By date</Text>
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


      {/* Date controller */}
      <View style={styles.dateContainer}>

        <Pressable
          onPress={onPressPrevDate}
          style={({ pressed }) =>
            [
              {
                backgroundColor: pressed ? '#fbfbfb31' : 'transparent',
              },
              styles.controllerIcon,
            ]
          }
        >
          <FontAwesome5 name="less-than" size={12} color="#fff" />
        </Pressable>


        <Pressable
          onLongPress={() => { onPressCurDate(), showToast() }}
          style={({ pressed }) =>
            [
              {
                backgroundColor: pressed ? '#fbfbfb31' : 'transparent',
              },
              styles.textBigContainer,
            ]
          }
        >

          <Text style={styles.textBig}>
            {
              curDate
                ? formatDateDisplay(curDate)
                : null
            }
          </Text>
        </Pressable>


        <Pressable
          onPress={onPressNextDate}
          style={({ pressed }) =>
            [
              {
                backgroundColor: pressed ? '#fbfbfb31' : 'transparent',
              },
              styles.controllerIcon,
            ]
          }
        >
          <FontAwesome5 name="greater-than" size={12} color="#fff" />
        </Pressable>

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
    alignItems: "center",
    paddingHorizontal: 80,
    paddingBottom: 10,
  },

  controllerIcon: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 100,
  },

  dateCenter: {
    width: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  text: {
    color: "#fff",
    fontSize: 14,
  },

  textBigContainer: {
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 10,
  },

  textBig: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 14,
  },
});

export default HeaderBarT;

