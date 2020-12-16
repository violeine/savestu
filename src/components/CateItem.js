import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
} from '@expo/vector-icons';

import {LightenDarkenColor} from '../components/ColorFunction';
import TextMoney from './TextMoney';


export default function CateItem({ color, cate, money = 0 }) {
  //Làm mờ màu nếu không có tiền
  color = money ? color : color + '80';

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
        <TextMoney money={money} />
      </Text>
    </View>
  );
}


function ChooseIcon(cate) {
  const iconSize = 24;
  const iconColor = '#fff';

  switch (cate) {
    case 'eat': return (
      <MaterialCommunityIcons name="silverware-fork-knife" size={iconSize} color={iconColor} />
    )

    case 'transport': return (
      <FontAwesome5 name="bus" size={iconSize} color={iconColor} />
    )

    case 'parking': return (
      <FontAwesome5 name="parking" size={iconSize} color={iconColor} />
    )

    case 'drink': return (
      <MaterialIcons name="local-cafe" size={iconSize} color={iconColor} />
    )

    case 'transfer': return (
      <MaterialIcons name="compare-arrows" size={iconSize} color={iconColor} />
    )

    case 'movie': return (
      <MaterialIcons name="local-movies" size={iconSize} color={iconColor} />
    )

    case 'shopping': return (
      <FontAwesome name="shopping-bag" size={iconSize} color={iconColor} />
    )

    case 'groceries': return (
      <FontAwesome5 name="shopping-basket" size={iconSize} color={iconColor} />
    )

    case 'phone': return (
      <FontAwesome name="phone" size={iconSize} color={iconColor} />
    )

    case 'house': return (
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