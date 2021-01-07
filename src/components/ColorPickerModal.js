import React, {useState} from 'react'
import {View, StyleSheet, Text, Modal, Pressable} from 'react-native'
import {TriangleColorPicker} from 'react-native-color-picker'

const ColorPickerModal = ({visible, hideModal, setCategoryInput, categoryInput,checkCategoryInfor, categoryError }) => {

  return (
    <View style={styles.centeredView} >
      <Modal
        animationType="fade"
        visible={visible}
        transparent={true}
      >
        <Pressable style={styles.centeredView} onPress={hideModal}>
          <View style={{marginTop: 10,height: 200, width: 200, alignSelf:'center'}}>
            <TriangleColorPicker
              onColorSelected={color => {
                  setCategoryInput({...categoryInput, 'color' : color})
                  checkCategoryInfor('color',color)
                  hideModal()
                }
              }
              style={{flex:1}}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  modalView: {
    width: 300,
    maxHeight: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.8,
    elevation: 5
  },

}) 
export default ColorPickerModal;