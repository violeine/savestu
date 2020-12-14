import React from 'react';
import { Text } from 'react-native';


export default function TextMoney({ styles, money }) {
  return (
    <Text>{NumberWithSpace(money)}đ</Text>
  );
}

function NumberWithSpace(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
    x = x.replace(pattern, "$1 $2");
  return x;
}