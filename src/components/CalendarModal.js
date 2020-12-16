import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Modal } from 'react-native'

const CalendarModal = ({ visible, hideCalendarModal, showCalendarModal }) => {

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalChild}>
              <TouchableOpacity
                style={{ ...styles.modalChild2, ...styles.borderBottom, ...styles.borderLeft }}
                onPress={hideCalendarModal}
              >
                <Text style={styles.textStyle}>By Day</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.modalChild2, ...styles.borderBottom }}
                onPress={hideCalendarModal}
              >
                <Text style={styles.textStyle}>By Week</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalChild}>
              <TouchableOpacity
                style={{ ...styles.modalChild2, ...styles.borderLeft }}
                onPress={hideCalendarModal}
              >
                <Text style={styles.textStyle}>By Month</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalChild2}
                onPress={hideCalendarModal}
              >
                <Text style={styles.textStyle}>By Year</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    position: "absolute",
    top: 50,
    left: 30,
  },

  modalView: {
    height: 200,
    width: 200,
    flexDirection: 'column',
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  modalChild: {
    flex: 1,
    flexDirection: 'row',
  },

  modalChild2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  borderBottom: {
    borderBottomWidth: 1,
    borderColor: 'black'
  },

  borderLeft: {
    borderRightWidth: 1,
    borderColor: 'black'
  },

  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default CalendarModal;