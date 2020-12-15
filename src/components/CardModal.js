import React, {useEffect, useState} from 'react';
import {StyleSheet, 
  TouchableOpacity, 
  Text, Button,
  View, Modal,
  SectionList,
  Pressable} from 'react-native';
import {useCardDispatch, useCardState} from '../db'
import {getCard} from "../db/card"
import CardItem from "./CardItem"

const CardModal = ({visible, hideCardModal, showCardModal}) => {
  const [listCards, setListCards] = useState([]);
  const dispatch = useCardDispatch();
  const {id} = useCardState();

  const getAllCards = async () => {
    const data = await getCard()
    setListCards(data);
  }

  useEffect(()=>{
    getAllCards()
  },[visible])

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
    cards.map((card,index) => {
      card.type == 'using' ? result[0].data.push(card) : result[1].data.push(card)
    })
    return result;
  }

  const renderItem = ({item}) => {
    const backgroundColor = item.id == id ? "#6e3b6e" : "#f9c2ff";
    return (
        <CardItem el={item}         
          onPress={() => {
            dispatch(item);
            hideCardModal();
          }}
        />
    );

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
          {
            listCards ?
              <SectionList
                sections={transferData(listCards)}
                keyExtractor={(item, index) => item + index}
                renderItem={renderItem}
                renderSectionHeader={({section}) => (
                  <Text style={styles.header}>{section.title}</Text>)
                }
              />
              :null
          }
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
    height: 400,
    width: 300,
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
  header : {
    fontSize: 20,
    fontStyle: "italic",
    marginTop: 5
  }
});

export default CardModal;