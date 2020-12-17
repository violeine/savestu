import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { FontAwesome } from '@expo/vector-icons';

import { getCard } from '../db/card';
import CardItem from '../components/CardItem'
import BtnAction from '../components/BtnAction'
import HeaderStack from '../components/HeaderStack';



export default function CardScreen({ navigation }) {
  const [card, setCard] = useState(undefined);

  // Lấy dữ liệu db & gán cho biến card
  const fetchData = async () => {
    const data = await getCard();
    setCard(data);
  }

  const onLongPressCardItem = (item) => {
    navigation.navigate('Update', { type: 'card', data: { ...item } })
  }

  // Tự động chạy fetchData khi load xong screen
  useEffect(() => {
    fetchData()
  }, [])


  return (
    <>
      <HeaderStack title='My Card' onAction={() => console.log('Action Pressed')} />

      <ScrollView style={styles.container} >

        <View style={styles.filter} >
          <FontAwesome name="filter" size={20} color="black" />

          <View style={styles.picker}>
            <Picker
              mode='dropdown'
              prompt='Filter card'
            >
              <Picker.Item label="All Card" value="all" />
              <Picker.Item label="By type" value="type" />
              <Picker.Item label="By money" value="money" />
            </Picker>
          </View>
        </View>


        {// Get each of element 
          card
            ? card.map(el => <CardItem el={el} onLongPress={onLongPressCardItem} />)
            : null
        }
        <BtnAction title='Get card' onPress={fetchData} />
      </ScrollView >
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  filter: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
  },

  picker: {
    width: 120,
    height: 40,
    marginVertical: 5,
    marginLeft: 5,
    justifyContent: "center",
  },
});

