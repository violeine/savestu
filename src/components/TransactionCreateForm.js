import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native'
import { TextInput } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'
import { useNavigation } from '@react-navigation/native'
import { createTransaction, } from "../db/transaction";
import { getCategory, getCategoryById } from '../db/category'

import {
  strRegex,
  capitalizeFirstLetter,
  isCheckChangeColor,
  isCheck,
  getEmoji
} from '../services/formHelperFunction'

import BtnAction from './BtnAction';
import HeaderForm from './HeaderForm';
import CalendarPickerModal from './CalendarPickerModal';
import CardItem from './CardItem';
import { formatDateDisplay } from '../services/DateFunctions'
import { useCardState, useCardDispatch } from '../db';



const TransactionCreateForm = ({ transactionData }) => {
  const navigation = useNavigation()
  const { type, cateId } = transactionData
  const globalCard = useCardState()
  const dispatch = useCardDispatch()

  const [visible, setVisible] = useState(false)
  const [transactionInput, setTransactionInput] = useState({
    category: "",
    card: "",
    cash: "",
    date: "",
    note: "",
  });

  const [transactionError, setTransactionError] = useState({
    category: "✘ Empty",
    cash: "✘ Empty",
    date: "✘ Empty",
    note: "✓ Check",
  })

  const [listCategories, setListCategoires] = useState([])
  const [categoryType, setCategoryType] = useState("")

  const updateListCategories = async (type) => {
    let data = await getCategory();
    if (type == 'income') {
      data = data.filter((item) => item.type == 'income')
    }
    else if (type == 'expense') {
      data = data.filter((item) => item.type == 'expense')
    }
    setListCategoires(data)
  }

  const getOneCategory = async (cateId) => {
    const data = await getCategoryById(cateId)
    setListCategoires([data]);
    setCategoryType(data.type)
    setTransactionInput({ ...transactionInput, category: cateId, card: globalCard.id.toString() })
    checkTransactionInfor('category', cateId)
  }

  const checkTransactionInfor = (type, value) => {
    let err;

    // Kiểm tra input rỗng
    if (value.length == 0) {
      err = '✘ Empty';

      switch (type) {
        case 'cash':
          setTransactionError({ ...transactionError, "cash": err });
          break;
        case 'category':
          setTransactionError({ ...transactionError, 'category': err });
          break;
        case 'card':
          setTransactionError({ ...transactionError, 'card': err })
          break;
        case 'date':
          setTransactionError({ ...transactionError, 'date': err });
          break;
        default: break;
      }
      return;
    }

    switch (type) {
      case 'category':
        setTransactionError({ ...transactionError, 'category': "✓ Check" });
        break;
      case 'card':
        setTransactionError({ ...transactionError, 'card': "✓ Check" })
        break;
      case 'date':
        setTransactionError({ ...transactionError, 'date': "✓ Check" });
        break;
      case 'type':
        setTransactionError({ ...transactionError, 'type': "✓ Check" });
        break;
      case 'cash':
        err = strRegex("money").test(value)
          ? "✘ Money must be number"
          : "✓ Check"
        setTransactionError({ ...transactionError, "cash": err })
        break
      case 'note':
        err = value.length >= 50
          ? "✘ Must be less than 30 characters"
          : "✓ Check"
        setTransactionError({ ...transactionError, "note": err })
        break
      default: break
    }
  }

  const getTransactionCreate = () => {

    if (categoryType == 'expense') {
      let _cash = transactionInput.cash * -1
      return { ...transactionInput, cash: _cash }
    }
    else return { ...transactionInput }
  }

  const handleCreateBtn = async () => {
    if (isCheck(transactionError, "create", 'transaction')) {
      try {
        dispatch(await createTransaction(getTransactionCreate()))
        navigation.goBack()
        //alert Create transaction success
      }
      catch {

        console.error()
      }

    }
    else {
      //alert Something Error -> Check Error
      console.log(transactionError)
      console.log("Something Error -> Check Error")
    }
  }

  const beforeRender = () => {
    if (cateId) {
      getOneCategory(cateId);
    }
    else {

      updateListCategories(type)
      setCategoryType(type)
    }
    setTransactionInput({ ...transactionInput, card: globalCard.id.toString() })
  }

  useEffect(() => {
    beforeRender()
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
        title={capitalizeFirstLetter('create') + ' Transaction'}
        onSubmit={handleCreateBtn}
      />

      <ScrollView style={styles.container}>

        {/* Card */}
        <View>
          <View style={styles.cardPicker}>
            {
              globalCard
                ? <CardItem el={globalCard} />
                : null
            }
          </View>
        </View>


        {/* date */}
        <View style={{ alignSelf: "center" }}>
          <Pressable
            onPress={() => setVisible(true)}
            style={styles.datePicker}
          >
            <Text>
              {
                transactionInput.date
                  ? formatDateDisplay(transactionInput.date)
                  : 'Add date'
              }
            </Text>
          </Pressable>

          {
            transactionError.date == ""
              ? null
              : <Text
                style={[
                  isCheckChangeColor(transactionError.date),
                  { textAlign: "center" }
                ]}>
                {transactionError.date}
              </Text>
          }
        </View>

        {/* Category picker */}
        <View>
          <View style={styles.picker}>
            <Picker
              selectedValue={transactionInput.category}
              onValueChange={(itemValue) => {
                setTransactionInput({ ...transactionInput, category: itemValue })
                checkTransactionInfor('category', itemValue)
              }
              }
              prompt='Select category'
            >
              <Picker.Item label="Pick Category" value="" />
              {
                listCategories
                  ? listCategories.map((e, i) => (
                    e.id <= "3" ?
                      null
                      : <Picker.Item label={getEmoji(e.name) + " " + e.name} value={e.id} key={e + i} />
                  ))
                  : null
              }

            </Picker>
          </View>

          <View style={{ alignSelf: "center" }}>
            {
              transactionError.category == ""
                ? null
                : <Text
                  style={[
                    isCheckChangeColor(transactionError.category),
                    { textAlign: "center" }
                  ]}>
                  {transactionError.category}
                </Text>
            }
          </View>
        </View>


        {/* Cash */}
        <View style={{ alignSelf: "center" }}>
          <TextInput
            value={transactionInput.cash.toString()}
            onChangeText={(t) => {
              setTransactionInput({
                ...transactionInput,
                cash: t,
              })
              checkTransactionInfor("cash", t)
            }}
            label='Cash'
            placeholder='Input cash'
            mode='outlined'
            style={styles.input}
            theme={transactionError.cash == '✓ Check' ? theme : themeErr}
            keyboardType='numeric'
          />
          {
            transactionError.cash == ""
              ? null
              : <Text style={isCheckChangeColor(transactionError.cash)}>{transactionError.cash}</Text>
          }
        </View>


        {/* Note    */}
        <View style={{ alignSelf: "center" }}>
          <TextInput
            onChangeText={(t) => {
              setTransactionInput({
                ...transactionInput,
                note: t,
              })
              checkTransactionInfor("note", t)
            }}
            value={transactionInput.note}
            label='Note'
            placeholder='Write some note'
            mode='outlined'
            style={styles.input}
            theme={transactionError.note == '✓ Check' ? theme : themeErr}
          />
          {
            transactionError.note == ""
              ? null
              : <Text style={isCheckChangeColor(transactionError.note)}>{transactionError.note}</Text>
          }
        </View>


        <CalendarPickerModal visible={visible}
          setTransactionInput={setTransactionInput}
          transactionInput={transactionInput}
          hideCalendarPicker={() => setVisible(false)}
          checkTransactionInfor={checkTransactionInfor}
          transactionError={transactionError}
        />

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

  cardPicker: {
    width: 300,
    marginTop: 10,
    alignSelf: "center",
  },

  datePicker: {
    width: 200,
    height: 40,
    marginTop: 15,
    marginBottom: 5,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#999',
  },
});

export default TransactionCreateForm;