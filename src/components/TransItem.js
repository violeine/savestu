import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';


export default function TransItem({ el, onLongPress, isGroup = false }) {


  return (
    <Pressable
      style={({ pressed }) =>
        [
          {
            backgroundColor: pressed ? '#ddd' : 'transparent',
          },
          styles.container,
        ]}
    >
      <Text>{el.cate} {el.date} {el.note} {el.cash}  </Text>
    </Pressable>
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  note: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },

  money: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2cc197',
  },
});