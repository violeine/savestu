import React, { useState,useEffect } from 'react'
import { View, ScrollView, StyleSheet, Text } from 'react-native'
import { TextInput } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'
import {useNavigation} from '@react-navigation/native'
import { createCard } from '../db/card'
import { strRegex,
  capitalizeFirstLetter,
  isCheckChangeColor,
  isCheck
} from '../services/formHelperFunction'
import BtnAction from './BtnAction'
import HeaderForm from './HeaderForm'


const CardCreateForm = () => {
  const navigation = useNavigation()
  const [cardInput, setCardInput] = useState({
    name: "",
    type: "",
    money: "",
    goal: "",
    note: "",
  });

  const [cardError, setCardError] = useState({
    name: "✘ This field can not be empty",
    type: "",
    money: "",
    goal: "",
    note: "✓ Check",
  })

  const checkCardInfor = (type, value) => {
    let err;
    // Kiểm tra input rỗng
    if (value.length == 0) {
      err = '✘ This field can not be empty';

      switch (type) {
        case 'name':
          setCardError({ ...cardError, "name": err });
          break;
        case 'type':
          setCardError({ ...cardError, "type": err });
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
      case "type":
        err = "✓ Check"
        setCardError({...cardError, "type": err})
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
  }

  const setCardCreate = async() => {
    if (cardInput.type == 'using') {
      await setCardInput({...cardInput, goal: -1})
    }
    else await setCardInput({...cardInput, money: 0})
  }

  const handleCreateBtn = async () => {
    if (isCheck(cardError,"create", 'card')) {
      try {
        setCardCreate()
        let card = await createCard(cardInput)
        navigation.navigate('Card', {cardId : card.id})
      }
      catch {
        console.error();
      }

    }
    else {
      //alert Something Error -> Check Error
      console.log(cardInput)

      console.log(cardError)
      console.log("Something Error -> Check Error")
    }
  }

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
        title={capitalizeFirstLetter('create') + ' Card'}
        onSubmit={handleCreateBtn}
      />

      <ScrollView style={styles.container}>

        <View>
          <View style={styles.picker}>
            <Picker
              selectedValue={cardInput.type}
              onValueChange={(itemValue) => {
                  setCardInput({ ...cardInput, type: itemValue })
                  checkCardInfor('type',itemValue)
                }
              }
              prompt='Select card type'
            >
              <Picker.Item label="Pick Type" value=""/>
              <Picker.Item label="💳  Using" value="using" />
              <Picker.Item label="💰  Saving" value="saving" />
            </Picker>

          </View>

          <View style={{ alignSelf: "center" }}>
            {
              cardError.type == ""
              ? null
              : <Text style={isCheckChangeColor(cardError.type)}>{cardError.type}</Text>
            }
          </View> 
        </View>

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

        <View style={{ alignSelf: "center" }}>
          <TextInput
            value={cardInput.money.toString()}
            onChangeText={(t) => {
              setCardInput({
                ...cardInput,
                money: t,
              })
              checkCardInfor("money", t)
            }}
            label='Money (using)'
            placeholder='Input money'
            mode='outlined'
            style={styles.input}
            theme={cardError.money == '✓ Check' ? theme : themeErr}
            disabled={cardInput.type == 'using' ? false : true}
          />
          {
            cardError.money == "" || cardInput.type != "using"
              ? null
              : <Text style={isCheckChangeColor(cardError.money)}>{cardError.money}</Text>
          }
        </View>

        <View style={{ alignSelf: "center" }}>
          <TextInput
            value={cardInput.goal.toString()}
            onChangeText={(t) => {
              setCardInput({
                ...cardInput,
                goal: t,
              })
              checkCardInfor("goal", t)
            }}
            label='Goal (saving)'
            placeholder='Input goal'
            mode='outlined'
            style={styles.input}
            theme={cardError.goal == '✓ Check' ? theme : themeErr}
            disabled={cardInput.type == 'saving' ? false : true}
          />
          {
            cardError.goal == "" || cardInput.type != "saving"
              ? null
              : (<Text style={isCheckChangeColor(cardError.goal)}>{cardError.goal}</Text>)
          }
        </View>

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

        <BtnAction title={capitalizeFirstLetter('create') + ' Card'} type='primary' onPress={handleCreateBtn} />

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
    height: 45,
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


export default CardCreateForm;