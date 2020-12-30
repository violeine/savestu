import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Text ,ScrollView, Pressable} from 'react-native'
import { TextInput } from 'react-native-paper'
import {Picker} from '@react-native-picker/picker';
import {
  deleteTransaction,
  updateTransaction
} from "../db/transaction";
import {getCategory} from '../db/category'
import {getCard} from '../db/card'
import {	
  strRegex,
	capitalizeFirstLetter,
  isCheckChangeColor,
  isCheck,
  objectForUpdate
} from '../services/formHelperFunction'

import BtnAction from './BtnAction'
import HeaderForm from './HeaderForm'
import CalendarPickerModal from './CalendarPickerModal'

const TransactionUpdateForm = ({data}) => {
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

  const [listCategories, setListCategoires] = useState([])
  const [listCards, setListCards] = useState([])
  const [categoryType, setCategoryType] = useState("")

  const getAllCategory = async () => {
    const data = await getCategory();
    setListCategoires(data);
  }

  const getAllCards = async () => {
    const data = await getCard()
    setListCards(data);
  }

  const checkTransactionInfor = (type, value) => {
    let err;

    // Kiểm tra input rỗng
    if (value.length == 0) {
      err = '✘ This field can not be empty';

      switch (type) {
        case 'cash':
          setTransactionError({ ...transactionError, "money": err });
          break;
        case 'category':
          setTransactionError({...transactionError, 'category' : err});
          break;
        case 'card':
          setTransactionError({...transactionError, 'card' : err})
          break;
        case 'date':
          setTransactionError({...transactionError, 'date': err});
          break;
        case 'type':
          setTransactionError({...transactionError, 'type' : err});
          break;
        default: break;
      }
      return;
    }

    switch(type) {
      case 'category':
        setTransactionError({...transactionError, 'category' : "✓ Check"});
        break;
      case 'card':
        setTransactionError({...transactionError, 'card' : "✓ Check"})
        break;
      case 'date':
        setTransactionError({...transactionError, 'date': "✓ Check"});
        break;
      case 'type':
        setTransactionError({...transactionError, 'type' : "✓ Check"});
        break;
      case 'cash' :
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

  const handleUpdateBtn =async () => {
    if (isCheck(transactionError,"update")) {
      if (typeof objectForUpdate(transactionInput, data) === "object") {
        try {
          console.log(transactionInput);
          console.log(await updateTransaction(objectForUpdate(transactionInput,data)));
          //alert Create transaction success
        }
        catch {
          console.error()
        }
      }
      else {
        //alert "Nothing to update"
        console.log("No thing to update")
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
          console.log(await deleteTransaction(transactionInput.id))
          console.log("OK Pressed"), navigation.goBack()
        },
      },
    ]
  );
    
  const getCategoryType = (id) => {
    listCategories.map((item) => {
      if (item.id == id) setCategoryType(item.type)
    })
  }


  useEffect(() => {
    getAllCategory();
    getAllCards();
    setTransactionInput({...data})
    getCategoryType(data.id)

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

  return(
    <>
      <HeaderForm
        title={capitalizeFirstLetter('update') + ' Transaction'}
        onSubmit={handleUpdateBtn}
      />


      <ScrollView style={styles.container}>

        <View>
          <View style={styles.picker}>
            <Picker
              selectedValue={transactionInput.category}
              onValueChange={(itemValue) => {
                  setTransactionInput({ ...transactionInput, category: itemValue })
                  checkTransactionInfor('category',itemValue)
                  getCategoryType(itemValue)
                }
              }
              prompt='Select category'
            >
              <Picker.Item label="Pick Category" value=""/>
              {
                listCategories
                ? listCategories.map( (e, i) => (
                  e.id == "1" ? 
                  null
                  :<Picker.Item label={e.name} value={e.id} key={e+i}/>
                ))
                : null
              }

            </Picker>
          </View>

          <View style={{alignSelf: "center"}}>
            {
              transactionError.category == ""
                ? null
                : <Text style={isCheckChangeColor(transactionError.category)}>{transactionError.category}</Text>
            }
          </View>
        </View>

        <View>
          <View style={styles.picker}>
            <Picker
              selectedValue={transactionInput.card}
              onValueChange={(itemValue) => {
                  setTransactionInput({ ...transactionInput, card: itemValue })
                  checkTransactionInfor('card',itemValue)
                }
              }
              prompt='Select category'
            >
              <Picker.Item label="Pick Card" value=""/>
              {
                listCards
                ? listCards.map( (e, i) => (
                  <Picker.Item label={e.name} value={e.id} key={e+i}/>
                ))
                : null
              }

            </Picker>
          </View>

          <View style={{alignSelf: "center"}}>
            {
              transactionError.card == ""
                ? null
                : <Text style={isCheckChangeColor(transactionError.card)}>{transactionError.card}</Text>
            }
          </View>
        </View>

        <View style={{alignItems : 'center'}}>
          <TextInput
            value={categoryType}
            label='Note'
            placeholder='Write some note'
            mode='outlined'
            style={styles.input}
            theme={categoryType != '' ? theme : themeErr}
            disabled={true}
          />
        </View>

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
          />
          {
            transactionError.cash == ""
              ? null
              : <Text style={isCheckChangeColor(transactionError.cash)}>{transactionError.cash}</Text>
          }
        </View>

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

        <View style={{ alignSelf: "center" }}>
          <Pressable onPress={() => setVisible(true)} style={{backgroundColor: 'cyan', height: 30}}>
            <Text>{transactionInput.date}</Text>
          </Pressable>
          {
            transactionError.date == ""
              ? null
              : <Text style={isCheckChangeColor(transactionError.date)}>{transactionError.date}</Text>
          }
        </View>

        <BtnAction title={capitalizeFirstLetter('update') + ' Transaction'} type='primary' onPress={handleUpdateBtn}/>

        <View style={hideOnCreate('update')}>
          <BtnAction title='Delete card' type='delete' onPress={deleteAlert} />
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

export default TransactionUpdateForm;