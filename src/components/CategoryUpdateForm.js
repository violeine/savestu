import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Text, ScrollView, Pressable} from 'react-native'
import { TextInput } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'

import { strRegex,
  capitalizeFirstLetter,
  isCheckChangeColor,
  isCheck,
  objectForUpdate
} from '../services/formHelperFunction'
import {
  updateCategory,
  getCategoryByCard,
  getCategoryById
} from '../db/category'

import HeaderForm from './HeaderForm'
import BtnAction from './BtnAction'
import ColorPickerModal from './ColorPickerModal'

const CategoryUpdateForm = ({categoryId}) => {

  const [categoryInput, setCategoryInput] = useState({
    "name" : "",
    "color" : "",
    "type" : "",
  })

  const [categoryError, setCategoryError] = useState({
    "name" : "✓ Check",
    "color" : "✓ Check",
    "type" : "✓ Check"
  })

  const [visible, setVisible] = useState(false)

  const setCateObj = async (id) => {
    let cate = await getCategoryById(id)
    setCategoryInput({...cate})
  }

  const checkCategoryInfor = (type, value) => {
    let err;
    // Kiểm tra input rỗng
    if (value.length == 0) {
      err = '✘ This field can not be empty';

      switch (type) {
        case 'name':
          setCategoryError({ ...categoryError, "name": err });
          break;
        case 'type':
          setCategoryError({ ...categoryError, "type": err });
          break;
        default: break;
        case 'color':
          setCategoryError({...categoryError, 'color' : err})
      }
      return;
    }

    // Kiểm tra cụ thể từng điều kiện
    switch (type) {
      case "name":
        err = strRegex("name").test(value) || value.length >= 30
          ? "✘ Name must be <= 30 character and no special character"
          : "✓ Check"
        setCategoryError({ ...categoryError, "name": err })
        break
      case "type":
        err = "✓ Check"
        setCategoryError({...categoryError, "type": err})
        break
      case "type":
        err = "✓ Check"
        setCategoryError({...categoryError, "color": err})
        break
      default: break;
    }
  }

  const handleCreateBtn = async () => {
    if (isCheck(categoryError)) {
      try {

        console.log(await updateCategory(categoryInput))
        console.log(categoryInput)
        // navigation.goBack()
      }
      catch {
        console.error();
      }

    }
    else {
      //alert Something Error -> Check Error
      console.log(categoryInput)

      console.log(categoryError)
      console.log("Something Error -> Check Error")
    }
  }

  useEffect(() => {
    setCateObj(categoryId)
  },[])

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
        title={capitalizeFirstLetter('update') + ' Category'}
        onSubmit={() => console.log('text')}
      />

      <ScrollView style={styles.container}>

        <View>
          <View style={styles.picker}>
            <Picker
              selectedValue={categoryInput.type}
              onValueChange={(itemValue) => {
                  setCategoryInput({ ...categoryInput, type: itemValue })
                  checkCategoryInfor('type',itemValue)
                }
              }
              prompt='Select Type'
            >
              <Picker.Item label="Pick Type" value=""/>
              <Picker.Item label="Income" value="income"/>
              <Picker.Item label="Expense" value="expense"/>

            </Picker>
          </View>
              
          <View style={{alignSelf: "center"}}>
            {
              categoryError.type == ""
                ? null
                : <Text style={isCheckChangeColor(categoryError.type)}>{categoryError.type}</Text>
            }
          </View>
        </View>

        <View style={{ alignSelf: "center" }}>
          <TextInput
            value={categoryInput.name}
            onChangeText={(t) => {
              setCategoryInput({
                ...categoryInput,
                name: t,
              })
              checkCategoryInfor("name", t)
            }}
            label='Name'
            placeholder="Input category name"
            mode='outlined'
            style={styles.input}
            theme={categoryError.name == '✓ Check' ? theme : themeErr}
          />
          {
            categoryError.name == ""
              ? null
              : <Text style={isCheckChangeColor(categoryError.name)}>{categoryError.name}</Text>
          }
        </View>
        
        <View style={{alignSelf: "center", marginTop: 10}}>
          
          <Pressable
            onPress={() => setVisible(true)}
          >
            <View style={{alignSelf: "center", height: 20, width:20, backgroundColor: categoryInput.color}}></View>
          </Pressable>
          {
            categoryError.color == ""
              ? null
              : <Text style={isCheckChangeColor(categoryError.color)}>{categoryError.color}</Text>
          }
        </View>

        
        <BtnAction title={capitalizeFirstLetter('update') + ' category'} type='primary' onPress={handleCreateBtn}/>

        <ColorPickerModal 
          visible={visible}
          hideModal={() => setVisible(false)}
          setCategoryInput={setCategoryInput}
          categoryInput={categoryInput}
          setCategoryError={setCategoryError}
          categoryError={categoryError}
          checkCategoryInfor={checkCategoryInfor}
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
})

export default CategoryUpdateForm;