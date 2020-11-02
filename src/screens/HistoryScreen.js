import React from 'react'
import { View, Text, StatusBar } from 'react-native'

export const HistoryScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'honeydew', justifyContent: 'center', alignItems: 'center' }} >
            <StatusBar barStyle="light-content" backgroundColor='#238f70' />
            <Text>History Screen</Text>
        </View>
    )
}

export default HistoryScreen

