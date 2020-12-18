import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
} from '@expo/vector-icons';

import { LightenDarkenColor } from '../components/ColorFunction';
import { TextMoney } from './TextMoney';


export default function CateItem({ color, cate, money = 0 }) {
  //Làm mờ màu nếu không có tiền
  color = money ? color : color + '40';

  return (
    <View style={styles.container}>
      <Text style={{ color: color, textTransform: "capitalize", fontSize: 12 }}>
        {cate}
      </Text>

      <Pressable
        onPress={() => console.log('Cate item Pressed')}
        style={({ pressed }) =>
          [
            {
              backgroundColor: pressed ? LightenDarkenColor(color, -50, money ? true : false) : color
            },
            styles.icon
          ]}
      >

        {ChooseIcon(cate)}

      </Pressable>

      <Text style={{ color: color, fontSize: 13 }}>
        {TextMoney(money)}
      </Text>
    </View>
  );
}


function ChooseIcon(cate) {
  const iconSize = 24;
  const iconColor = '#fff';

  switch (cate) {
    case 'Eating': return (
      <MaterialCommunityIcons name="silverware-fork-knife" size={iconSize} color={iconColor} />
    )

    case 'Transportation': return (
      <FontAwesome5 name="bus" size={iconSize} color={iconColor} />
    )

    case 'Parking': return (
      <FontAwesome5 name="parking" size={iconSize} color={iconColor} />
    )

    case 'Drinking': return (
      <MaterialIcons name="local-cafe" size={iconSize} color={iconColor} />
    )

    case 'Transferring': return (
      <MaterialIcons name="compare-arrows" size={iconSize} color={iconColor} />
    )

    case 'Movie': return (
      <MaterialIcons name="local-movies" size={iconSize} color={iconColor} />
    )

    case 'Shopping': return (
      <FontAwesome name="shopping-bag" size={iconSize} color={iconColor} />
    )

    case 'Groceries': return (
      <FontAwesome5 name="shopping-basket" size={iconSize} color={iconColor} />
    )

    case 'Phone': return (
      <FontAwesome name="phone" size={iconSize} color={iconColor} />
    )

    case 'House': return (
      <MaterialCommunityIcons name="home-currency-usd" size={iconSize} color={iconColor} />
    )

    default: return (null)
  }
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