import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';


import { getCategoryById } from '../db/category'

import { TextMoney } from '../services/TextMoney';
import { changMoneyColor, chooseIcon } from '../services/ColorFunction';
import { formatDateDisplay } from '../services/DateFunctions';




export default function TransItem({ el, onLongPress, isGroup = false }) {

  const [dataCate, setDataCate] = useState(undefined);

  // Lấy dữ liệu db gán cho biến dataAll
  const fetchDataCate = async () => {
    const data = await getCategoryById(el.category);
    setDataCate(data);
  };

  // Tự động lấy dữ liệu khi load screen lần đầu
  useEffect(() => {
    fetchDataCate();
  }, [])


  // console.log('\n----- TRANS ITEM -------\n');

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

      {/* Left side */}
      <View style={styles.leftSide}>

        {dataCate ? chooseIcon(dataCate.name, 24, dataCate.color) : null}

        <Text style={styles.date}>
          {formatDateDisplay(el.date)}
        </Text>

        <Text style={styles.note}>{el.note}</Text>
      </View>


      {/* Right side */}
      <View>
        <Text style={[changMoneyColor(el.cash), styles.money]}>
          {TextMoney(el.cash)}
        </Text>
      </View>

    </Pressable>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leftSide: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: 'lightblue',
  },

  date: {
    width: 80,
    marginLeft: 10,
    fontSize: 13,
    fontStyle: "italic",
    // backgroundColor: 'lightcoral',
  },

  note: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',

  },

  money: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});