import React from 'react'
import { View, Text, StatusBar } from 'react-native'

export const AccountScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'lightpink', justifyContent: 'center', alignItems: 'center' }} >
            <StatusBar barStyle="light-content" backgroundColor='#238f70' />
            <Text>Account Screen</Text>
        </View>
    )
}

export default AccountScreen

