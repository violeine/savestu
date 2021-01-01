import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import BtnAction from '../components/BtnAction'
import AccountItem from '../components/AccountItem'




export default function AccountScreen({ navigation }) {
  return (
    <View style={styles.container} >

      <View style={styles.avatarContainer}>
        <Image
          source={require('../images/circle-avatar.png')}
          style={styles.avatar}
        />

        <Text style={styles.name}> Elon Musk</Text>
        <Text style={styles.email}> elonmusk@gm.uit.edu.vn</Text>
      </View>

      <ScrollView>
        <AccountItem title='Sync data' icon='sync' />
        <AccountItem title='Edit account' icon='pencil' />
        <AccountItem title='Settings' icon='settings' />
        <AccountItem title='SaveStu guide' icon='help-circle' />
        <AccountItem title='About' icon='account-group' onLongPress={() => navigation.navigate('Debug')} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    paddingTop: 20,
  },

  avatarContainer: {
    marginBottom: 20,
    alignItems: "center",
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(41, 177, 138, 0.5)',
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },

  email: {
    fontStyle: "italic",
  },
})