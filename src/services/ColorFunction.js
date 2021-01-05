import React from 'react';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';


// Ham tang giam do sang cua mau. Input: #HEX -> Output: #HEX
function LightenDarkenColor(color, amt, hasMoney = true) {

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


  const result = RGBToHex(r, g, b) + (hasMoney ? '' : '60');
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


function changMoneyColor(money = 0) {
  if (money >= 0) return (
    {
      color: '#2cc197'
    }
  )

  else return (
    {
      color: '#ff4e4e'
    }
  )
}

function chooseIcon(cate, size = 20, color = '#000') {
  switch (cate) {
    case 'Food': return (
      <MaterialCommunityIcons name="silverware-fork-knife" size={size} color={color} />
    )

    case 'Transportation': return (
      <FontAwesome5 name="bus" size={size} color={color} />
    )

    case 'Parking': return (
      <FontAwesome5 name="parking" size={size} color={color} />
    )

    case 'Drinks': return (
      <MaterialIcons name="local-cafe" size={size} color={color} />
    )

    case 'Transferring': return (
      <MaterialIcons name="compare-arrows" size={size} color={color} />
    )

    case 'Movie': return (
      <MaterialIcons name="local-movies" size={size} color={color} />
    )

    case 'Shopping': return (
      <FontAwesome name="shopping-bag" size={size} color={color} />
    )

    case 'Groceries': return (
      <FontAwesome5 name="shopping-basket" size={size} color={color} />
    )

    case 'Phone': return (
      <FontAwesome name="phone" size={size} color={color} />
    )

    case 'House': return (
      <MaterialCommunityIcons name="home-currency-usd" size={size} color={color} />
    )

    default: return (null)
  }
}

export { LightenDarkenColor, hexToRgb, RGBToHex, changMoneyColor, chooseIcon }
