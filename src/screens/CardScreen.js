import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Button, StyleSheet } from 'react-native';

import { getCard } from '../db/card';
import CardItem from '../components/CardItem'
import BtnAction from '../components/BtnAction'



export default function CardScreen({ navigation }) {
  const [card, setCard] = useState(undefined);

  // Lấy dữ liệu db & gán cho biến card
  const fetchData = async () => {
    const data = await getCard();
    setCard(data);
  }

  const onLongPressCardItem = (item) => {
    navigation.navigate('Update', { type: 'card', id: item.id })
    console.log(item)
  }

  // Tự động chạy fetchData khi load xong screen
  useEffect(() => {
    fetchData()
  }, [])


  return (
    <ScrollView style={styles.container} >
      {// Get each of element 
        card
          ? card.map(el => <CardItem el={el} onLongPress={onLongPressCardItem} />)
          : null
      }
      <BtnAction title='Get card' onPress={fetchData} />
    </ScrollView >
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});

