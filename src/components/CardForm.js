import React, {useEffect, useState} from 'react'
import {View, TextInput, StyleSheet, Text, Button} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import {getCardById, updateCard} from '../db/card'

const CardForm = ({data, type}) => {
    const [cardInput, setCardInput] = useState({
      name: "",
      type: "",
      money: "",
      note: "",
    });

    const  [cardError, setCardError] = useState({
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

    useEffect(() => {
        if (type == "update") {
            setCardInput({
                ...data
            })
        }
    }, [])

    return (
        <>
           <View>
                <Text>{type} Card</Text>
                <TextInput
                    placeholder="name card?"
                    value={cardInput.name}
                    onChangeText={(t) => {
                            setCardInput({
                                ...cardInput,
                                name: t,
                            })
                            checkCardInfor("name", t)
                        }
                    }
                    style={styles.inputStyle}
                />
                {cardError.name == "" ? null : <Text>{cardError.name}</Text>}

                <TextInput
                    placeholder="type ?"
                    value={cardInput.type}
                    onChangeText={(t) =>
                        setCardInput({
                            ...cardInput,
                            type: t,
                        })
                    }
                    style={styles.inputStyle}
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
                    placeholder="money"
                    value={cardInput.money.toString()}
                    onChangeText={(t) => {
                            setCardInput({
                                ...cardInput,
                                money: t,
                            })
                            checkCardInfor("money", t)
                        }
                    }
                    style={styles.inputStyle}
                />
                {cardError.money == "" ? null : <Text>{cardError.money}</Text>}

                <TextInput
                    placeholder="note"
                    onChangeText={(t) =>
                        setCardInput({
                            ...cardInput,
                            note: t,
                        })
                    }
                    value={cardInput.note}
                    style={styles.inputStyle}
                />
                {cardError.note == "" ? null : <Text>{cardError.note}</Text>}

                <Button
                    title={type + 'Card'}
                    onPress={() => {
                        console.log(`update ${cardInput.id}`)
                    }}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    inputStyle : {
        borderColor: "gray",
        borderWidth: 1,
        width: 300,
        padding: 5,
        marginBottom: 2,
    }
});

export default CardForm;