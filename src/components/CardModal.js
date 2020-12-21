import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, SectionList, Pressable, ScrollView } from 'react-native';

import { useCardDispatch, useCardState } from '../db'
import { getCard } from "../db/card"

import CardItem from "./CardItem"


const CardModal = ({ visible, hideCardModal, showCardModal }) => {
  const [listCards, setListCards] = useState([]);
  const dispatch = useCardDispatch();
  const { id } = useCardState();

  const getAllCards = async () => {
    const data = await getCard()
    setListCards(data);
  }

  useEffect(() => {
    getAllCards()
  }, [visible])

  const transferData = (cards) => {
    let result = [
      {
        title: 'Using',
        data: []
      },
      {
        title: 'Saving',
        data: []
      }
    ]
    cards.map((card, index) => {
      card.type == 'using' ? result[0].data.push(card) : result[1].data.push(card)
    })
    return result;
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.id == id ? "#85ffe1" : "#fff";
    return (
      <CardItem
        el={item}
        onPress={() => {
          dispatch(item);
          hideCardModal();
        }}
        onLongPress={() => null}
      />
    );

  }

  return (
    <View style={styles.centeredView} >
      <ScrollView style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          visible={visible}
          transparent={true}
        >
          <Pressable style={styles.centeredView} onPress={hideCardModal}>
            <View style={styles.modalView}>
              {
                listCards ?
                  <SectionList
                    sections={transferData(listCards)}
                    keyExtractor={(item, index) => item + index}
                    renderItem={renderItem}
                    renderSectionHeader={({ section }) => (
                      <Text style={styles.header}>{section.title}</Text>)
                    }
                  />
                  : null
              }
            </View>
          </Pressable>
        </Modal>
      </ScrollView>
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
    width: 300,
    maxHeight: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.8,
    elevation: 5
  },

  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },

  header: {
    fontSize: 17,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 5,
  }
});

export default CardModal;