import React from 'react'
import { View, Text, StatusBar } from 'react-native'

export const CardScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'lightcoral', justifyContent: 'center', alignItems: 'center' }} >
            <StatusBar barStyle="light-content" backgroundColor='#238f70'/>
            <Text>Card Screen</Text>
        </View>
    )
}

export default CardScreen

