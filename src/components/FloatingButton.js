import React from 'react'
import { View, StyleSheet, Text, TouchableHighlight, Animated } from 'react-native'
import { AntDesign } from '@expo/vector-icons'


export default class FloatingButton extends React.Component {

    buttonSize = new Animated.Value(1)


    handlePress = () => {
        Animated.timing(this.state.buttonSize, {
            toValue: 100,
            duration: 1000,
        }).start()
        console.log(this.state.buttonSize)
    }

    render = () => {
        const buttonSize = {
            backgroundColor: 'red',
        }

        return (
            <View style={{ alignItems: 'center' }}>

                <Animated.View style={styles.button}>
                    <TouchableHighlight onPress={this.handlePress} underlayColor='#2CC197'>
                        <AntDesign name='plus' size={28} color='#FFF' />
                    </TouchableHighlight>
                </Animated.View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: 65,
        height: 65,
        position: 'absolute',
        top: -60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2CC197',
        elevation: 4,
        borderRadius: 99,
        borderWidth: 2,
        borderColor: '#FFF',
    }
})