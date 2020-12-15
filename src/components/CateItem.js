import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
} from '@expo/vector-icons';

import TextMoney from './TextMoney';


export default function CateItem({ color, cate }) {
  const money = 500000;

  return (
    <View style={styles.container}>
      <Text style={{ color: color, textTransform: "capitalize" }}>
        {cate}
      </Text>

      <Pressable
        onPress={() => console.log('Cate item Pressed')}
        style={({ pressed }) =>
          [
            {
              backgroundColor: pressed ? LightenDarkenColor(color, 25) : color,
            },
            styles.icon
          ]}
      >

        {ChooseIcon(cate)}

      </Pressable>

      <Text style={{ color: color }}>
        <TextMoney money={money} />
      </Text>
    </View>
  );
}

// Ham tang giam do sang cua mau. Input: #HEX -> Output: #HEX
function LightenDarkenColor(color, amt) {

  var usePound = false;

  if (color[0] == "#") {
    color = color.slice(1);
    usePound = true;
  }

  var num = parseInt(color, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000FF) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
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