import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

import { LightenDarkenColor } from '../components/ColorFunction'
import { ceil } from 'react-native-reanimated';

export default function BtnAction({ title, onPress, isPrimary = true }) {

  const color = isPrimary ? '#2cc197' : '#d8d8d8';

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
      <Text style={isPrimary ? styles.textPrimary : styles.textSecondary}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 120,
    height: 45,
    borderRadius: 5,
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

  textPrimary: {
    color: '#fff',
    textTransform: "capitalize",
    fontSize: 15,
    fontWeight: "bold",
  },

  textSecondary: {
    color: '#333',
    textTransform: "capitalize",
    fontSize: 15,
  },
});