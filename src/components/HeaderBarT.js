import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Pressable, Text, StatusBar } from 'react-native'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';


const HeaderBarT = ({ showCalendarModal, showCardModal }) => {

    return (
        <View style={{ ...styles.headerContainer, backgroundColor: '#2CC197' }}>

            <StatusBar barStyle='light-content' backgroundColor="#229B79" />

            <View style={styles.funcContainer}>

                <Pressable style={styles.headerCalendar} onPress={showCalendarModal}>
                    <MaterialCommunityIcons name="calendar-today" size={24} color="#fff" />
                    <Text style={styles.text}>By day</Text>
                </Pressable >

                <Pressable style={styles.headerCard} onPress={showCardModal}>
                    <Text style={styles.text}>Main card:  </Text>
                    <Text style={styles.textBig}>1 200 000d</Text>
                    <FontAwesome5 name="caret-down" color="#fff" size={20} />
                </Pressable>

            </View>

            <View style={styles.dateContainer}>

                <Text style={{ color: 'rgba(255,255,255,0.3)' }}>Tue, 27 Oct</Text>
                <Text style={styles.textBig}>Wed, 28 Oct</Text>
                <Text style={{ color: 'rgba(255,255,255,0.3)' }}>Thu, 29 Oct</Text>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 90,
    },

    funcContainer: {
        flex: 2,
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
    },

    headerCalendar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    headerCard: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    dateContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 5,
        marginBottom: 5,
    },

    text: {
        color: '#fff',
        fontSize: 14,
    },

    textBig: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 14,
    },
})

export default HeaderBarT;