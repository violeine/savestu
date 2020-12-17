import React, { useEffect, useState } from 'react'
import { View, ScrollView, StyleSheet, Text, Button } from 'react-native'
import { TextInput } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'

import { getCardById, updateCard } from '../db/card'

import BtnAction from './BtnAction'
import HeaderForm from './HeaderForm'


const CardForm = ({ data, type, navigation }) => {

  const [cardInput, setCardInput] = useState({
    name: "",
    type: "",
    money: "",
    note: "",
  });

  const [cardError, setCardError] = useState({
    name: "",
    type: "",
    money: "",
    note: "",
  })

  const strRegex = (type) => {
    let result;
    switch (type) {
      case "name":
        result = /[\^\\.!\[\]@><;:'"~-]/;
        break;
      case "money":
        result = /\D/;
        break;
      default: result = "";
    }
    return result;
  }

  const [isCheck, setIsCheck] = useState({
    name: true,
    money: true,
    note: true,
  });

  const checkCardInfor = (type, value) => {
    let err;

    // Kiểm tra input rỗng
    if (value.length == 0) {
      err = '✘ This field can not be empty';

      switch (type) {
        case 'name':
          setCardError({ ...cardError, "name": err });
          setIsCheck({ ...isCheck, 'name': false });
          break;

        case 'money':
          setCardError({ ...cardError, "money": err });
          setIsCheck({ ...isCheck, 'money': false });
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
        setIsCheck({ ...isCheck, 'name': err == '✓ Check' ? true : false })
        break

      case "money":
        err = strRegex("money").test(value)
          ? "✘ Money must be number"
          : "✓ Check"
        setCardError({ ...cardError, "money": err })
        setIsCheck({ ...isCheck, 'money': err == '✓ Check' ? true : false })
        break;

      case "note":
        err = value.length >= 30
          ? "✘ Must be less than 30 characters"
          : "✓ Check"
        setCardError({ ...cardError, "note": err })
        setIsCheck({ ...isCheck, 'note': err == '✓ Check' ? true : false })
        break

      default: break;
    }
    return;
  }

  useEffect(() => {
    if (type == "update") {
      setCardInput({
        ...data
      })
    }
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
        navigation={navigation}
        title={capitalizeFirstLetter(type) + ' Card'}
        onSubmit={() => console.log('Form Submit')}
      />

      <ScrollView style={styles.container}>

        <Picker
          selectedValue={cardInput.type}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            setCardInput({ ...cardInput, type: itemValue })
          }
        >
          <Picker.Item label="For Using" value="using" />
          <Picker.Item label="For Saving" value="saving" />
        </Picker>

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
            theme={isCheck.name ? theme : themeErr}
          />
          {
            cardError.name == ""
              ? null
              : <Text style={isCheckChangeColor(isCheck.name)}>{cardError.name}</Text>
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
            label='Money'
            placeholder='Input money'
            mode='outlined'
            style={styles.input}
            theme={isCheck.money ? theme : themeErr}
          />
          {
            cardError.money == ""
              ? null
              : <Text style={isCheckChangeColor(isCheck.money)}>{cardError.money}</Text>
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
            theme={isCheck.note ? theme : themeErr}
          />
          {
            cardError.note == ""
              ? null
              : <Text style={isCheckChangeColor(isCheck.note)}>{cardError.note}</Text>
          }
        </View>

      </ScrollView>
    </>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function isCheckChangeColor(isCheck) {
  if (isCheck == true) return { color: '#2cc197' };
  else return { color: 'red' };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fafafa',
  },

  input: {
    width: 290,
    height: 45,
    marginTop: 15,
    marginBottom: 5,
  },

  picker: {
    width: 150,
    height: 45,
    marginVertical: 5,
    alignSelf: "center",
  },

  btnGroup: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
});

export default CardForm;