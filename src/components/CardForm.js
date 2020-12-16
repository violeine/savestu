import React, { useEffect, useState } from 'react'
import { View, ScrollView, StyleSheet, Text, Button } from 'react-native'
import { TextInput } from 'react-native-paper'
import { getCardById, updateCard } from '../db/card'
import BtnAction from './BtnAction'

const CardForm = ({data, type}) => {
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

  const strRegex  = (type) => {
    let result;
    switch (type) {
      case "name" :
        result = /[\^\\.!\[\]@><;:'"~-]/;
        break;
      case "money" :
        result = /\D/;
        break;
      default : result = "";
    }
    return result;
  }

  const checkCardInfor = (type, value) => {
    let err
    switch(type) {
      case "name":
        err = strRegex("name").test(value) || value.length >= 30 ? "Name must be <= 30 character and no special character" : "Check"
        setCardError({...cardError, "name" : err})
        break;
      case "money":
        err = strRegex("money").test(value) ? "Money must be number" : "Check" 
        setCardError({...cardError, "money" : err})
        break;
      case "note":
        err = value.length >= 50 ? "Must be <= 50 character" : "Check"
        setCardError({...cardError, "note" : err})
        break;
      default: return
    }
  }

  const inputTheme = {
    colors: {
      text: '#333',
      primary: '#2cc197',
      placeholder: 'gray',
    }
  }

  useEffect(() => {
    if (type == "update") {
      setCardInput({
          ...data
      })
    }
  }, [])


  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>

        <Text> {type.toUpperCase() + CARD}</Text>
        <TextInput
          placeholder="name card?"
          value={cardsInput.name}
          onChangeText={(t) => {
              setCardInput({
                ...cardsInput,
                name: t,
              })
              checkCardInfor("name", t)
            }
          }
          style={styles.input}
        />
        {cardError.name == "" ? null : <Text>{cardError.name}</Text>}

        <TextInput
          placeholder="type ?"
          value={cardsInput.type}
          onChangeText={(t) =>
            setCardInput({
              ...cardsInput,
              type: t,
            })
          }
          style={styles.input}
        />
        <Picker
          selectedValue={cardInput.type}
          style={{height: 50, width: 120}}
          onValueChange={(itemValue, itemIndex) =>
            setCardInput({...cardInput, type: itemValue})
          }
                
        >
          <Picker.Item label="Using" value="using" />
          <Picker.Item label="Saving" value="saving" />
        </Picker>

        <TextInput
          placeholder="input money"
          value={cardsInput.money.toString()}
          onChangeText={(t) => {
              setCardInput({
                ...cardsInput,
                money: t,
              })
              checkCardInfor("money", t)
            }
          }
          style={styles.input}
        />
        {cardError.money == "" ? null : <Text>{cardError.money}</Text>}

        <TextInput
          placeholder="note"
          onChangeText={(t) => {
              setCardInput({
                ...cardsInput,
                note: t,
              })
              checkCardInfor("note", t)
            }
          }
          value={cardsInput.note}
          style={styles.input}
        />
        {cardError.note == "" ? null : <Text>{cardError.note}</Text>}

        {/* TEST INPUT */}
        <TextInput
          onChangeText={(t) =>
            setCardInput({
              ...cardsInput,
              name: t,
            })}
          label='Test input'
          placeholder='Input something'
          mode='outlined'
          style={styles.input}
          theme={inputTheme}
        />
      </View>

      {/* buttons */}
      <View style={styles.btnGroup}>
        <BtnAction
          title="Cancel"
          onPress={() => {
            console.log(`Update Cancel`)
          }}
          isPrimary={false}
        />

        <BtnAction
          title="Update"
          onPress={() => {
            console.log(`Update Success`)
          }}
          isPrimary={true}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  input: {
    width: 290,
    height: 50,
    marginVertical: 5,
  },

  inputGroup:{
    justifyContent: 'center',
    alignItems: "center",
  },

  btnGroup: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
});
