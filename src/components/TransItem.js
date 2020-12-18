import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';


export default function TransItem(el, onLongPress, isGroup = false) {
  var date = el.date;
  var cate = el.category;
  var note = el.note;
  var money = el.money;

  console.log(date, cate, note, money);

  return (
    <Pressable style={styles.container}>
      <Text>{cate} {date} {note} {money}</Text>
    </Pressable>
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});