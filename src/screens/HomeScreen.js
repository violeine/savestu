import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";
import { Entypo } from '@expo/vector-icons';

import { useCardDispatch,useCardState,useDateState } from "../db";
import {formatDateDB} from "../services/DateFunctions"

import {getCategoryByCard, getCategoryByCardAndDate, getCategoryByCardAndMonth,getCategoryByCardAndYear} from '../db/category'

import CalendarModal from "../components/CalendarModal";
import CardModal from "../components/CardModal";
import HeaderBarT from "../components/HeaderBarT";
import AddButton from "../components/AddButton";
import DonutChart from "../components/DonutChart";
import CateItem from "../components/CateItem";

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
  async function getScreenData(cardID,date) {
    if (date.type === "date")
    {const data = await getCategoryByCardAndDate({card:cardID,
                                                  ...formatDateDB(date)})
    setScreenData(data);
    }

    if (date.type === "month")
    {const data = await getCategoryByCardAndMonth({card:cardID,
                                                  ...formatDateDB(date)});
    setScreenData(data); }
    if (date.type === "year")
    {const data = await getCategoryByCardAndYear({card:cardID,
                                                  ...formatDateDB(date)});
    setScreenData(data); }
    if (date.type === "all")
    {const data = await getCategoryByCard(cardID);
    setScreenData(data); }
  }

  // STATE
  const [screenData, setScreenData]=useState(null);
  const date= useDateState();
  const {id : cardID, money}  = useCardState();
  const cardData = useCardState();
  useEffect(()=>{
    getScreenData(cardID,date)
  }, [cardID,date,money])




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
      // <ScrollView>
      //     <Text>{JSON.stringify({card:cardID,
      //       ...date},null,2)}</Text>
      // </ScrollView>
      }
      <View style={styles.flexBetween}>
        {[3,4,5,6].map((el) => {
          const {id, name, color, sum} = screenData.categories[el];
          return <CateItem color={color} cate={ name } money={Math.abs(sum)} key={id} id={id}/>
        })}
      </View>

      {/* second row */}
      <View style={styles.flexBetween}>
      <View style={styles.aside}>
      {[7,8].map((el) => {
        const {id, name, color, sum} = screenData.categories[el];
        return <CateItem color={color} cate={ name } money={Math.abs(sum)} key={id} id={id}/>
      })}
      </View>


      <View>
      <DonutChart
      card={cardData}
      series={screenData.sum.length>0 ? screenData.sum : [1]}
      sliceColor={screenData.color.length>0?screenData.color:["#cacaca"]}
      income={screenData.income}
      expense={screenData.expense}
      />
      </View>


      <View style={styles.aside}>
      {[9,10].map((el) => {
        const {id, name, color, sum} = screenData.categories[el];
        return <CateItem color={color} cate={ name } money={Math.abs(sum)} key={id} id={id}/>
      })}
      </View>
      </View>


      {/* third round */}
      <View style={styles.flexBetween}>
      {[11,12,13,14].map((el) => {
        const {id, name, color, sum} = screenData.categories[el];
        return <CateItem color={color} cate={ name } money={Math.abs(sum)} key={id} id={id}/>
      })}

      </View>

       {/* Add Cate */}
       <View style={{ flexDirection: "row" }}>
          <Pressable
              onPress={() => console.log('Add Cate Pressed')}
              style={({ pressed }) =>
                [
                  {
                    backgroundColor: pressed ? '#ececec' : 'transparent'
                  },
                  styles.addCate,
                ]}
            >
              <Entypo name="edit" size={20} color="#535353" />
          </Pressable>
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
  },

  addCate:{
    borderRadius: 100,
    padding: 15,
    marginLeft: 10,
  }
  
});

export default HomeScreen;
