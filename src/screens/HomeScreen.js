import React, {useState, useLayoutEffect} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import CalendarModal from '../components/CalendarModal';
import CardModal from '../components/CardModal'
import HeaderBarT from '../components/HeaderBarT';

const HomeScreen = ({navigation}) => {
    const [calendarModalVisible, setCalendarModalVisible] = useState(false);
    const [cardModalVisible, setCardModalVisible] = useState(false);

    useLayoutEffect(() => navigation.setOptions({
        header: () => <HeaderBarT 
                            showCalendarModal={() => setCalendarModalVisible(true)}
                            showCardModal={() => setCardModalVisible(true)}
                        />
    }));

    return (
        <>
            <CalendarModal visible={calendarModalVisible} 
                showCalendarModal={() => setCalendarModalVisible(true)} 
                hideCalendarModal={() => setCalendarModalVisible(false)}
            />
            
            <CardModal  visible={cardModalVisible}
                showCardModal={() => setCardModalVisible(true)}
                hideCardModal={() => setCardModalVisible(false)}
            />
        </>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
})

export default HomeScreen;