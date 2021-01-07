import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, Pressable, Alert } from 'react-native'
import { TextInput } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'
import {
  deleteTransaction,
  updateTransaction,
  getTransactionById
} from "../db/transaction";
import { getCategory, getCategoryById } from '../db/category'
import { getCardById } from '../db/card'
import {
  strRegex,
  capitalizeFirstLetter,
  isCheckChangeColor,
  isCheck,
  objectForUpdate,
  getEmoji
} from '../services/formHelperFunction'
import {useCardDispatch} from "../db/index"
import BtnAction from './BtnAction'
import HeaderForm from './HeaderForm'
import CalendarPickerModal from './CalendarPickerModal'
import CardItem from './CardItem'
import { formatDateDisplay } from '../services/DateFunctions'



const TransactionUpdateForm = ({ transactionId }) => {
  const dispatch = useCardDispatch();
  const navigation = useNavigation()
  const [visible, setVisible] = useState(false)
  const [transactionInput, setTransactionInput] = useState({
    category: "",
    card: "",
    cash: "",
    date: "",
    note: "",
  });

  const [transactionError, setTransactionError] = useState({
    category: "✓ Check",
    card: "✓ Check",
    cash: "✓ Check",
    date: "✓ Check",
    note: "✓ Check",
  })

  const [tranTest, setTranTest] = useState(undefined)

  const [listCategories, setListCategoires] = useState([])
  const [card, setCard] = useState(undefined)
  const [categoryType, setCategoryType] = useState("")
  const [dateTran, setDateTran] = useState(undefined)

  const setTranObj = async (id) => {
    let data = await getTransactionById(id);
    getCardOfTran(data.card)
    setDateTran(data.date)
    await getListCategories(data.category)
    setTransactionInput({...data, cash: Math.abs(data.cash), card: data.card });
    setTranTest(data)
  }

  const updateListCategories = async (type, listCate) => {
    let data = listCate.length ? listCategories : (await getCategory())
    if (type == 'income') {
      data = data.filter((item) => item.type == 'income')
    }
    else if (type == 'expense') {
      data = data.filter((item) => item.type == 'expense')
    }
    setListCategoires(data)

  }

  const getListCategories = async (cateId) => {
    let data = await getCategoryById(cateId)
    await updateListCategories(data.type, listCategories)
    setCategoryType(data.type)
  }

  const getCardOfTran = async (cardId) => {
    const data = await getCardById(cardId)
    setCard(data);
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
        case 'type':
          setTransactionError({ ...transactionError, 'type': err });
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

  const handleUpdateBtn = async () => {
    if (isCheck(transactionError)) {
      let res = objectForUpdate(getTransactionCreate(), tranTest)
      console.log(res)
      if (typeof res === "object") {
        try {
          let data = await updateTransaction(res)
          //alert Create transaction success
          dispatch(data);
          navigation.goBack()
        }
        catch {
          console.error()
        }
      }
      else {
        //alert "Nothing to update"
        console.log("No thing to update")
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
    'Do you want to delet this transaction',
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: 'cancel',
      },

      {
        text: "OK",
        onPress: async () =>  {
          let data = await deleteTransaction(transactionInput.id)
          dispatch(data);
          navigation.goBack()
        }
      },
    ]
  );

  useEffect(() => {
    setTranObj(transactionId);
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
        title={capitalizeFirstLetter('update') + ' Transaction'}
        onSubmit={handleUpdateBtn}
      />


      <ScrollView style={styles.container}>


        {/* Card */}
        <View>
          <View style={{ width: 250, alignSelf: 'center' }}>
            {
              card
                ? <CardItem el={card} />
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

        {/* Category type */}
        <View>
          <View style={styles.picker}>
            <Picker
              selectedValue={categoryType}
              onValueChange={(itemValue, listCategories) => {
                updateListCategories(itemValue, listCategories)
                setCategoryType(itemValue)
              }
              }
              prompt='Select category type'
            >
              <Picker.Item label="Income" value="income" />
              <Picker.Item label="Expense" value="expense" />
            </Picker>
          </View>
        </View>

        {/* Category */}
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
                    e.id <= 3 ?
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
                  ]}
                >
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


        {/* note */}
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

        <BtnAction title='Delete card' type='delete' 
          onPress={isCheck(transactionError) ? deleteAlert : null}
        />

        {
          dateTran ?
            <CalendarPickerModal visible={visible}
              dayUpdate={dateTran}
              setTransactionInput={setTransactionInput}
              transactionInput={transactionInput}
              hideCalendarPicker={() => setVisible(false)}
              checkTransactionInfor={checkTransactionInfor}
              transactionError={transactionError}
            />
          : null
        }

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

export default TransactionUpdateForm;