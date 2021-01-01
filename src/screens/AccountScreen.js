import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import BtnAction from '../components/BtnAction'




export default function AccountScreen({ navigation }) {
  return (
    <View style={styles.container} >
      <BtnAction
        title='debug screen'
        onPress={() => navigation.navigate('Debug')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})