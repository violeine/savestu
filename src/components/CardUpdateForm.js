import React, { useEffect, useState } from 'react'
import { View, ScrollView, StyleSheet, Text, Button, Alert } from 'react-native'
import { TextInput } from 'react-native-paper'
import {useNavigation} from '@react-navigation/native'
import {useCardDispatch, useCardState} from '../db/index'
import { updateCard, deleteCard, getCardById } from '../db/card'
import {
  strRegex,
  capitalizeFirstLetter,
  isCheckChangeColor,
  isCheck,
  hideOnUsing,
  getEmoji,
  objectForUpdate} from '../services/formHelperFunction'
import {showToastDeleteCardError} from "../services/formHelperFunction"
import {NumberWithSpace, numberWithSpacetoNumber} from '../services/TextMoney'
import BtnAction from './BtnAction'
import HeaderForm from './HeaderForm'


const CardUpdateForm = ({ cardId }) => {
  const dispatch = useCardDispatch()
  const globalCard = useCardState()
  const navigation = useNavigation()
  const [cardInput, setCardInput] = useState({
    name: "",
    type: "",
    money: "",
    goal: "",
    note: "",
  });

  const [cardError, setCardError] = useState({
    name: "✓ Check",
    money: "✓ Check",
    goal: "✓ Check",
    note: "✓ Check",
  })

  const [cardTest, setCardTest] = useState(undefined)

  const setCardObj = async (id) => {
    let card = await getCardById(id);
    setCardInput({...card})
    setCardTest({...card})
  }

  const checkCardInfor = (type, value) => {
    let err;

    // Kiểm tra input rỗng
    if (value.length == 0) {
      err = '✘ Empty';

      switch (type) {
        case 'name':
          setCardError({ ...cardError, "name": err });
          break;

        case 'money':
          setCardError({ ...cardError, "money": err });
          break;

        case 'goal':
          setCardError({ ...cardError, "goal": err });
          break;

        default: break;
      }
      return;
    }

    // Kiểm tra cụ thể từng điều kiện
    switch (type) {
      case "name":
        err = strRegex("name").test(value) || value.length >= 30
          ? "✘ Name must be <= 30 character and no special character"
          : "✓ Check"
        setCardError({ ...cardError, "name": err })
        break

      case "money":
        err = strRegex("money").test(value)
          ? "✘ Money must be number"
          : "✓ Check"
        setCardError({ ...cardError, "money": err })
        break;

      case "goal":
        err = strRegex("goal").test(value)
          ? "✘ Goal must be number"
          : "✓ Check"
        setCardError({ ...cardError, "goal": err })
        break;

      case "note":
        err = value.length >= 50
          ? "✘ Must be less than 30 characters"
          : "✓ Check"
        setCardError({ ...cardError, "note": err })
        break

      default: break;
    }
    return;
  }

  const handleUpdateBtn = async () => {
    let res = objectForUpdate(cardInput, cardTest);

    if (isCheck(cardError,'card')) {
      if (typeof res === "object") {
        try {
          let card =await updateCard(res);
          navigation.navigate('Card', {cardId: card})
        }
        catch {
          console.error()
        }
      }
      else {
        //alert error "No thing to update"
        navigation.goBack()
      }
    }
    else {
      //alert Something Error -> Check Error
      console.log("Something Error -> Check Error")
    }

  }

  const deleteAlert = () =>
    Alert.alert(
      "Warning",
      'Do you want to delete this card',
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: 'cancel',
        },

        {
          text: "OK",
          onPress: async () => {
            if (cardTest.id == globalCard.id) {
              showToastDeleteCardError()
              navigation.navigate('Card', {cardId: cardInput})
            }
            else {
              let card = await deleteCard(cardTest.id)
              navigation.navigate('Card', {cardId: card})
            }
          },
        },
      ]
    );

  useEffect(() => {
    setCardObj(cardId)

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
        title={capitalizeFirstLetter('update') + ' Card'}
        onSubmit={handleUpdateBtn}
      />

      <ScrollView style={styles.container}>
        {/* type */}
        <View style={{ alignSelf: "center" }}>
          <TextInput
            value={getEmoji(cardInput.type) + "  " +capitalizeFirstLetter(cardInput.type)}
            label='Card Type'
            placeholder="Input card name"
            mode='outlined'
            style={styles.input}
            disabled={true}
          />
        </View>

        {/* name */}
        <View style={{ alignSelf: "center" }}>
          <TextInput
            value={cardInput.name}
            onChangeText={(t) => {
              setCardInput({
                ...cardInput,
                name: t,
              })
              checkCardInfor("name", t)
            }}
            label='Name'
            placeholder="Input card name"
            mode='outlined'
            style={styles.input}
            theme={cardError.name == '✓ Check' ? theme : themeErr}
          />
          {
            cardError.name == ""
              ? null
              : <Text style={isCheckChangeColor(cardError.name)}>{cardError.name}</Text>
          }
        </View>

        {/* money */}
        <View style={{ alignSelf: "center" }}>
          <TextInput
            keyboardType={'numeric'}
            value={NumberWithSpace(cardInput.money.toString())}
            label='Money (using)'
            placeholder='Input money'
            mode='outlined'
            style={styles.input}
            keyboardType='numeric'
            disabled={true}
          />
        </View>

        {/* goal */}
        <View style={[{ alignSelf: "center" }, hideOnUsing(cardInput.type)]}>
          <TextInput
            value={NumberWithSpace(cardInput.goal.toString())}
            onChangeText={(t) => {
              setCardInput({
                ...cardInput,
                goal: numberWithSpacetoNumber(t),
              })
              checkCardInfor("goal", numberWithSpacetoNumber(t))
            }}
            label='Goal (saving)'
            placeholder='Input goal'
            mode='outlined'
            style={styles.input}
            theme={cardError.goal == '✓ Check' ? theme : themeErr}
            disabled={cardInput.type == 'saving' ? false : true}
            keyboardType='numeric'
          />
          {
            cardError.goal == "" || cardInput.type != "saving"
              ? null
              : <Text style={isCheckChangeColor(cardError.goal)}>{cardError.goal}</Text>
          }
        </View>
        {/* note */}
        <View style={{ alignSelf: "center" }}>
          <TextInput
            onChangeText={(t) => {
              setCardInput({
                ...cardInput,
                note: t,
              })
              checkCardInfor("note", t)
            }}
            value={cardInput.note}
            label='Note'
            placeholder='Write some note'
            mode='outlined'
            style={styles.input}
            theme={cardError.note == '✓ Check' ? theme : themeErr}
          />
          {
            cardError.note == ""
              ? null
              : <Text style={isCheckChangeColor(cardError.note)}>{cardError.note}</Text>
          }
        </View>

        <BtnAction title='Delete card' type='delete' onPress={deleteAlert} />

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
    width: 150,
    height: 45,
    marginVertical: 5,
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
});

export default CardUpdateForm;
