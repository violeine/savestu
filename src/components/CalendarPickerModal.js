import React, {useState} from 'react';
import { StyleSheet, View, Modal, Pressable } from 'react-native'
import {Calendar} from 'react-native-calendars'

const CalendarPickerModal = ({visible, hideCalendarPicker,transactionInput, setTransactionInput, transactionError, checkTransactionInfor}) => {
  const [selectedDate, setSelectedDate] = useState("")
  const onDayPress = day => {
    setSelectedDate(day.dateString)
    setTransactionInput({...transactionInput, "date" : new Date(day.dateString).toLocaleDateString()})
    checkTransactionInfor('date',day)
    hideCalendarPicker()
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
      >
        <Pressable style={styles.centeredView} onPress={hideCalendarPicker}>

          <View style={styles.modalView}>
            <Calendar
              onDayPress={onDayPress}
              showWeekNumbers
              enableSwipeMonths
              hideExtraDays
              showWeekNumbers
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedColor: 'orange',
                  selectedTextColor: 'red'
                }
              }}
            />
          </View>{/* modalView */}

        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)',
    },
  
    modalView: {
      height: 300,
      width: 300,
      backgroundColor: "#fff",
      borderRadius: 10,
  
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
  
});

export default CalendarPickerModal;