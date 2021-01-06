import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Button } from "react-native";


import { useCardDispatch,useCardState,useDateState } from "../db";

import {getCategoryByCard} from '../db/category'

import CalendarModal from "../components/CalendarModal";
import CardModal from "../components/CardModal";
import HeaderBarT from "../components/HeaderBarT";
import AddButton from "../components/AddButton";
import DonutChart from "../components/DonutChart";
import CateItem from "../components/CateItem";
import { getTransactionByCardAndDate } from '../db/transaction'


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
  async function getScreenData(cardID) {
    const data = await getCategoryByCard(cardID);
    setScreenData(data);
  }

  // STATE
  const [screenData, setScreenData]=useState(null);
  const dispatch = useCardDispatch();
  const date= useDateState();
  const {id : cardID, money}  = useCardState();
  const cardData = useCardState();
  useEffect(()=>{
    getScreenData(cardID)
  }, [cardID])



  // TEST DONUT CHART
  const [seriesCateExpense, setSeriesCateExpense] = useState([80, 50, 60]);
  const [sliceCateColor, setSliceCateColor] = useState(['#ff8000', '#18c20c', '#278CD9']);

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

    {screenData?
      <View style={styles.container}>
      {/* first row */}
      {
      <ScrollView>
        <Text>{JSON.stringify(screenData.color,null,2)}</Text>
      </ScrollView>
      }
      <View style={styles.flexBetween}>
        {[1,2,3,4].map((el) => {
          const {id, name, color, sum} = screenData.categories[el];
          return <CateItem color={color} cate={ name } money={Math.abs(sum)} key={id}/>
        })}
      </View>

      {/* second row */}
      <View style={styles.flexBetween}>
      <View style={styles.aside}>
      {[5,6].map((el) => {
        const {id, name, color, sum} = screenData.categories[el];
        return <CateItem color={color} cate={ name } money={Math.abs(sum)} key={id}/>
      })}
      </View>


      <View>
      <DonutChart
      card={cardData}
      series={screenData.sum.length>0 ? screenData.sum : [1]}
      sliceColor={screenData.color.length>0?screenData.color:["#fac"]}
      income={screenData.income}
      expense={screenData.expense}
      />
      </View>


      <View style={styles.aside}>
      {[7,8].map((el) => {
        const {id, name, color, sum} = screenData.categories[el];
        return <CateItem color={color} cate={ name } money={Math.abs(sum)} key={id}/>
      })}
      </View>
      </View>


      {/* third round */}
      <View style={styles.flexBetween}>
      {[9,10,11].map((el) => {
        const {id, name, color, sum} = screenData.categories[el];
        return <CateItem color={color} cate={ name } money={Math.abs(sum)} key={id}/>
      })}

      <CateItem color='#000000' visible={false} />
      </View>

      <AddButton />

      </View>: null}


    </>
);

};

const styles = StyleSheet.create({ container: {
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
