import React from 'react'
import { View, Text, StatusBar } from 'react-native'

export const HomeScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'cyan', justifyContent: 'center', alignItems: 'center' }} >
            <StatusBar barStyle="light-content" backgroundColor='#238f70'/>
            <Text>Home Screen</Text>
        </View>
    )
}

export default HomeScreen

