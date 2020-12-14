import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Button, StyleSheet } from 'react-native';

import { getCard } from '../db/card';
import CardItem from '../components/CardItem'



export default function CardScreen() {
  const [card, setCard] = useState(undefined);

  // Lấy dữ liệu db & gán cho biến card
  const fetchData = async () => {
    const data = await getCard();
    setCard(data);
  }

  // Tự động chạy fetchData khi load xong screen
  useEffect(() => {
    fetchData()
  }, [])


  return (
    <ScrollView style={styles.centerItem} >
      {// Get each of element 
        card
          ? card.map(el => <CardItem el={el} />)
          : null
      }
      <Button title='Get card' onPress={fetchData} />
    </ScrollView >
  );
}


const styles = StyleSheet.create({
  centerItem: {
    flex: 1,

  },
});

