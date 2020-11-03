import * as React from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Modal,SectionList} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const CardModal = ({visible, hideCardModal, showCardModal}) => {

  return (
    <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <TouchableOpacity
              onPress={hideCardModal}
            >
                <FontAwesome5 name='wallet'/>
                <View>
                    <Text>ALL ACCOUNTS:</Text>
                    <Text>1865000</Text>
                </View>
            </TouchableOpacity>

        </View>
      </View>
    </Modal>
  </View>
  );
};

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
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
    textStyle: {
      color: "black",
      fontWeight: "bold",
      textAlign: "center"
    },
});

export default CardModal;