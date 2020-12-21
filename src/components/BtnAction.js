import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

import { LightenDarkenColor } from '../services/ColorFunction'


export default function BtnAction({ title, onPress, type = 'primary' }) {

  const color = chooseColor(type);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        [
          {
            backgroundColor: pressed ? LightenDarkenColor(color, -25) : color
          },
          styles.btn
        ]}
    >
      <Text style={chooseStyle(type)}>
        {title}
      </Text>
    </Pressable>
  );
}

function chooseColor(type) {
  switch (type) {
    case 'pirmary': return '#2cc197';
    case 'secondary': return '#cdccce';
    case 'delete': return '#ff4e4e';
    default: return '#2cc197';
  }
}

function chooseStyle(type) {
  if (type == 'primary' || type == 'delete')
    return ({
      color: '#fff',
      fontSize: 15,
      fontWeight: "bold",
      textTransform: "capitalize",
    })

  else return ({
    color: '#333',
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "capitalize",
  })


}

const styles = StyleSheet.create({
  btn: {
    width: 300,
    height: 40,
    marginTop: 20,
    borderRadius: 5,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },




});