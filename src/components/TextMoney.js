import React from 'react';
import { Text } from 'react-native';


export default function TextMoney({ money }) {
  return (
    <Text>{NumberWithSpace(money)}đ</Text>
  );
}

function NumberWithSpace(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}