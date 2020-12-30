import * as React from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'

import { LightenDarkenColor } from '../services/ColorFunction';

const CalendarModal = ({ visible, hideCalendarModal, showCalendarModal }) => {


  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
      >
        <Pressable style={styles.centeredView} onPress={hideCalendarModal}>


          <View style={styles.modalView}>

            {/* By day, week */}
            <View style={styles.modalChild}>
              <Pressable
                onPress={hideCalendarModal}
                style={({ pressed }) =>
                  [
                    {
                      backgroundColor: pressed ? LightenDarkenColor('#ffffff', -20) : '#fff'
                    },
                    styles.modalChild2, styles.borderBottom, styles.borderRight,
                  ]}
              >
                <Text style={{ fontWeight: "bold" }}>By Day</Text>
              </Pressable>

              <Pressable
                onPress={hideCalendarModal}
                style={({ pressed }) =>
                  [
                    {
                      backgroundColor: pressed ? LightenDarkenColor('#ffffff', -20) : '#fff'
                    },
                    styles.modalChild2, styles.borderBottom,
                  ]}
              >
                <Text style={{ fontWeight: "bold" }}>By Week</Text>
              </Pressable>
            </View>


            {/* By month, year */}
            <View style={styles.modalChild}>
              <Pressable
                onPress={hideCalendarModal}
                style={({ pressed }) =>
                  [
                    {
                      backgroundColor: pressed ? LightenDarkenColor('#ffffff', -20) : '#fff'
                    },
                    styles.modalChild2, styles.borderRight,
                  ]}
              >
                <Text style={{ fontWeight: "bold" }}>By Month</Text>
              </Pressable>

              <Pressable
                onPress={hideCalendarModal}
                style={({ pressed }) =>
                  [
                    {
                      backgroundColor: pressed ? LightenDarkenColor('#ffffff', -20) : '#fff'
                    },
                    styles.modalChild2,
                  ]}
              >
                <Text style={{ fontWeight: "bold" }}>By Year</Text>
              </Pressable>
            </View>

          </View>{/* modalView */}


        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  modalView: {
    height: 200,
    width: 200,
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

  modalChild: {
    flex: 1,
    flexDirection: 'row',
  },

  modalChild2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  borderBottom: {
    borderBottomWidth: 1,
    borderColor: 'lightgray'
  },

  borderRight: {
    borderRightWidth: 1,
    borderColor: 'lightgray'
  },

  txt: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default CalendarModal;