import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, Text, Alert } from 'react-native'
import { TextInput } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { getCard, transferMoney } from '../db/card'
import { useCardState, useCardDispatch } from '../db/index'
import {
  strRegex,
  isCheckChangeColor,
  isCheck,
  getEmoji
} from '../services/formHelperFunction'
import {NumberWithSpace, numberWithSpacetoNumber} from '../services/TextMoney'
import BtnAction from './BtnAction'
import HeaderForm from './HeaderForm'
import CardItem from './CardItem'

const TranferCreateForm = () => {
  const navigation = useNavigation()
  const globalCard = useCardState()
  const dispatch = useCardDispatch()

  const [tranferInput, setTranferInput] = useState({
    sendId: "",
    receiveId: "",
    money: "",
    note: ""
  })

  const [tranferError, setTranferError] = useState({
    sendId: "✓ Check",
    receiveId: "✘ Empty",
    money: "✘ Empty",
    note: "✓ Check"
  })

  const [listCards, setListCards] = useState([])

  const checkTranferInfor = (type, value) => {
    let err;
    // Kiểm tra input rỗng
    if (value.length == 0) {
      err = '✘ Empty';

      switch (type) {
        case 'sendId':
          setTranferError({ ...tranferError, "sendId": err })
          break
        case 'receiveId':
          setTranferError({ ...tranferError, "receiveId": err })
          break
        case 'money':
          setTranferError({ ...tranferError, "money": err })
          break

        case 'note':
          setTranferError({ ...tranferError, "note": err })
          break
        default: break;
      }
      return;
    }

    // Kiểm tra cụ thể từng điều kiện
    switch (type) {
      case 'sendId':
        err = value == tranferInput.receiveId ? "✘ Send Card and Receive Card must be diff" : "✓ Check"
        setTranferError({ ...tranferError, "sendId": err })
        break
      case 'receiveId':
        err = value == tranferInput.sendId ? "✘ Send Card and Receive Card must be diff" : "✓ Check"
        setTranferError({ ...tranferError, "receiveId": err })
        break
      case "money":
        err = strRegex("money").test(value)
          ? "✘ Money must be number"
          : "✓ Check"
        setTranferError({ ...tranferError, "money": err })
        break;

      case "note":
        err = value.length >= 50
          ? "✘ Must be less than 30 characters"
          : "✓ Check"
        setTranferError({ ...tranferError, "note": err })
        break
      default: break;
    }
  }

  const handleCreateBtn = async () => {
    if (isCheck(tranferError)) {
      try {
        const data = await transferMoney(tranferInput)
        console.log(data)
        dispatch(data.sender)
        navigation.goBack()
      }
      catch {
        console.error();
      }

    }
    else {
      //alert Something Error -> Check Error
      console.log(tranferError)
      console.log("Something Error -> Check Error")
    }
  }

  const getAllCards = async () => {
    const data = await getCard();
    setListCards(data);
  }


  const notiAlert = () =>
    Alert.alert(
      "Warning",
      "Do you want to make this tranfer. Can't be undo",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: 'cancel',
        },

        {
          text: "OK",
          onPress: () => {
            handleCreateBtn()
          },
        },
      ]
    );


  useEffect(() => {
    getAllCards()
    setTranferInput({ ...tranferInput, sendId: globalCard.id })
  }, [])

  const theme = {
    colors: {
      text: '#333',
      primary: '#2cc197',
      placeholder: 'gray',
    }
  }

  const themeErr = {
    colors: {
      text: '#333',
      primary: 'red',
      placeholder: 'gray',
    }
  }

  return (
    <>
      <HeaderForm
        title='Tranfer Money'
        onSubmit={notiAlert}
      />

      <ScrollView style={styles.container}>
        {/* Card send */}
        <View>
          <View style={{ width: 250, alignSelf: 'center' }}>
            {
              globalCard
                ? <CardItem el={globalCard} />
                : null
            }
          </View>

        </View>

        <View style={styles.iconTransfer}>
          <AntDesign name="arrowdown" size={24} color="black" />
        </View>

        {/* Card receive */}
        <View>
          <View style={styles.picker}>
            <Picker
              selectedValue={tranferInput.receiveId}
              onValueChange={(itemValue) => {
                checkTranferInfor('receiveId', itemValue)
                setTranferInput({ ...tranferInput, receiveId: itemValue })
              }
              }
              prompt='Select Card Saving'
            >
              <Picker.Item label="Pick Card Saving" value="" />
              {
                listCards ?
                  listCards.map((e, i) => <Picker.Item label={getEmoji(e.type) + "  " + e.name} key={e.name + i} value={e.id} />)
                  : null
              }
            </Picker>

          </View>

          <View style={{ alignSelf: "center" }}>
            {
              tranferError.receiveId == ""
                ? null
                : <Text
                  style={[
                    isCheckChangeColor(tranferError.receiveId),
                    { textAlign: "center" }]}
                >
                  {tranferError.receiveId}
                </Text>
            }
          </View>
        </View>

        {/* money */}
        <View style={{ alignSelf: "center" }}>
          <TextInput
            value={NumberWithSpace(tranferInput.money.toString())}
            onChangeText={(t) => {
              setTranferInput({
                ...tranferInput,
                money: numberWithSpacetoNumber(t),
              })
              checkTranferInfor("money", numberWithSpacetoNumber(t))
            }}
            label='Money (using)'
            placeholder='Input money'
            mode='outlined'
            style={styles.input}
            theme={tranferError.money == '✓ Check' ? theme : themeErr}
            keyboardType='numeric'
          />
          {
            tranferError.money == ""
              ? null
              : <Text style={isCheckChangeColor(tranferError.money)}>{tranferError.money}</Text>
          }
        </View>

        {/* note */}
        {/* <View style={{ alignSelf: "center" }}>
          <TextInput
            onChangeText={(t) => {
              setTranferInput({
                ...tranferInput,
                note: t,
              })
              checkTranferInfor("note", t)
            }}
            value={tranferInput.note}
            label='Note'
            placeholder='Write some note'
            mode='outlined'
            style={styles.input}
            theme={tranferError.note == '✓ Check' ? theme : themeErr}
          />
          {
            tranferError.note == ""
              ? null
              : <Text style={isCheckChangeColor(tranferError.note)}>{tranferError.note}</Text>
          }
        </View> */}

      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fafafa',
  },

  input: {
    width: 300,
    height: 40,
    marginTop: 15,
    marginBottom: 5,
  },

  picker: {
    width: 200,
    height: 40,
    marginTop: 15,
    marginBottom: 5,
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#888',
    justifyContent: "center",
  },

  btnGroup: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },

  iconTransfer: {
    alignSelf: "center",
    marginTop: 15,
  },
})

export default TranferCreateForm;