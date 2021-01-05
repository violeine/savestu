import React, { useEffect } from 'react'
import { View, Text, Image, StyleSheet, Button, StatusBar } from 'react-native'


export default function LoadingScreen({ navigation }) {

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Main')
    }, 3000)
  }, [])

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#2cc197" hidden={true} />

      <View style={styles.container}>

        <Image
          source={require('../images/savestu-logo.png')}
          style={styles.logo}
        />

        <Text style={styles.logotxt}>SaveStu</Text>

        <Text style={styles.destxt}>Best financial managment app for students</Text>

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#2cc197',
  },

  logo: {
    width: 200,
    height: 100,
    resizeMode: "center",
  },

  logotxt: {
    fontSize: 25,
    color: '#fff',
    fontWeight: "bold",
    marginTop: 10,
  },

  destxt: {
    width: 180,
    color: '#fff',
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
    fontStyle: "italic",
  },
})