import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
} from '@expo/vector-icons';

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


// Ham tang giam do sang cua mau. Input: #HEX -> Output: #HEX
function LightenDarkenColor(color, amt, hasMoney) {
  var usePound = false;

  hasMoney ? null : color = color.substring(0, 7);

  let { b, g, r } = hexToRgb(color);

  r += amt;
  g += amt;
  b += amt;

  r > 255 ? r = 255
    : r < 0 ? r = 0
      : null;

  g > 255 ? g = 255
    : g < 0 ? g = 0
      : null;

  b > 255 ? b = 255
    : b < 0 ? b = 0
      : null;


  const result = RGBToHex(r, g, b) + (hasMoney ? '' : '80');
  console.log(result + ' result');
  return result;
}

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function RGBToHex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
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