import React, { useEffect, useState } from 'react'
import { View, ScrollView, StyleSheet, Text, Button, Alert } from 'react-native'
import { TextInput } from 'react-native-paper'
import {useNavigation} from '@react-navigation/native'

import { updateCard, deleteCard } from '../db/card'
import {	
  strRegex,
	hideOnCreate,
	capitalizeFirstLetter,
  isCheckChangeColor,
  isCheck,
  objectForUpdate} from '../services/formHelperFunction'
import BtnAction from './BtnAction'
import HeaderForm from './HeaderForm'


const CardUpdateForm = ({ data }) => {
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

  const checkCardInfor = (type, value) => {
    let err;

    // Kiểm tra input rỗng
    if (value.length == 0) {
      err = '✘ This field can not be empty';

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
    if (isCheck(cardError,"update",'card')) {
      if (typeof objectForUpdate(cardInput, data) === "object") {
        try {
          console.log(objectForUpdate(cardInput,data))
          console.log(await updateCard(objectForUpdate(cardInput,data)));
          // alert success
          console.log('update success')
          navigation.goBack()
        }
        catch {
          console.error()
        }
      }
      else {
        //alert error "No thing to update"
        console.log('No thing to update')
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
    'Do you want to delet this card',
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: 'cancel',
      },

      {
        text: "OK",
        onPress: async () =>  {
          console.log(await deleteCard(data.id))
          console.log("OK Pressed"), navigation.goBack()
        },
      },
    ]
  );

  useEffect(() => {
    setCardInput({
      ...data
    })

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
            cardError.money == ""
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
            cardError.goal == ""
              ? null
              : <Text style={isCheckChangeColor(cardError.goal)}>{cardError.goal}</Text>
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

        <BtnAction title={capitalizeFirstLetter('update') + ' Card'} type='primary' onPress={handleUpdateBtn}/>
        <View style={hideOnCreate('update')}>
          <BtnAction title='Delete card' type='delete' onPress={deleteAlert} />
        </View>

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

export default CardUpdateForm;