import React from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';


export default function AccountItem({ icon, title, onPress = null, onLongPress = null }) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) =>
        [
          {
            backgroundColor: pressed ? '#ddd' : 'transparent',
          },
          styles.container,
        ]}
    >

      <View style={styles.leftSide}>
        <MaterialCommunityIcons name={icon} size={24} color='#333' style={styles.icon} />

        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.rightSide}>
        <AntDesign name="rightcircleo" size={18} color="#333" />
      </View>

    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: 15,
    paddingHorizontal: 20,

    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rightSide: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },

  icon: {
    width: 30,
    marginRight: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

})