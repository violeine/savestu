import React, {useEffect, useState} from 'react';
import {StyleSheet, 
  TouchableOpacity, 
  Text, 
  View, Modal, FlatList,
  ScrollView, ActivityIndicator} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import {getCard} from "../db/card"

const CardModal = ({visible, hideCardModal, showCardModal, listCards}) => {
  console.log(listCards)

  const renderItem = ({item}) => {
    <TouchableOpacity
      onPress={hideCardModal}
    >
      <FontAwesome5 name='wallet'/>
      <View>
      <Text>{item.type}</Text>
      <Text>{item.money}</Text>
      </View>
    </TouchableOpacity>
  }

  return (
    <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>

        {/* { 
          listCards ?
          <FlatList
            data={listCards._array}
            renderItem={renderItem}
            keyExtractor={item => item.id + item.type}
          />
          :
          <ActivityIndicator/> 
        } */}
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