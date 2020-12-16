import React, { useEffect, useState } from 'react'
import { View, ScrollView, StyleSheet, Text, Button } from 'react-native'
import { TextInput } from 'react-native-paper'
import { getCardById, updateCard } from '../db/card'
import BtnAction from './BtnAction';

export default CardForm = ({ id, type }) => {
  const [cardsInput, setCardInput] = useState({
    name: "",
    type: "",
    money: "",
    note: "",
  });

  const updateCardInfor = async () => {
    const data = await getCardById(id);
    setCardInput({
      ...cardsInput,
      ...data,
    })
  }

  useEffect(() => {
    updateCardInfor()
  }, [])


  const inputTheme = {
    colors: {
      text: '#333',
      primary: '#2cc197',
      placeholder: 'gray',
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <Text>UPDATE CARD</Text>

        <TextInput
          placeholder="name card?"
          value={cardsInput.name}
          onChangeText={(t) =>
            setCardInput({
              ...cardsInput,
              name: t,
            })
          }
          style={styles.input}
        />

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

        <TextInput
          placeholder="input money"
          value={cardsInput.money.toString()}
          onChangeText={(t) =>
            setCardInput({
              ...cardsInput,
              money: t,
            })
          }
          style={styles.input}
        />

        <TextInput
          placeholder="note"
          onChangeText={(t) =>
            setCardInput({
              ...cardsInput,
              note: t,
            })
          }
          value={cardsInput.note}
          style={styles.input}
        />

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
