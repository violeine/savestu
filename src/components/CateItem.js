import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';


import { LightenDarkenColor, chooseIcon } from '../services/ColorFunction';
import { TextMoney } from '../services/TextMoney';


export default function CateItem({ color, cate, money = 0, visible = true }) {

  //Làm mờ màu nếu money=0
  color = money ? color : color + '40';
  const iconSize = 24;
  const iconColor = '#ffffff';

  return (
    <View style={
      [
        styles.container,
        visible ? null : { opacity: 0 }
      ]
    }>

      <Text style={{ color: color, textTransform: "capitalize", fontSize: 12 }}>
        {cate}
      </Text>

      <Pressable
        onPress={() => console.log('Cate item Pressed')}
        disabled={visible ? false : true}
        style={({ pressed }) =>
          [
            {
              backgroundColor: pressed ? LightenDarkenColor(color, -50, money ? true : false) : color
            },
            styles.icon
          ]}
      >

        {chooseIcon(cate, iconSize, iconColor)}

      </Pressable>

      <Text style={{ color: color, fontSize: 13 }}>
        {TextMoney(money)}
      </Text>
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  icon: {
    width: 55,
    height: 55,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});