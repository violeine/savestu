import React, {useEffect, useState} from 'react'
import {View, TextInput, StyleSheet, Text, Button} from 'react-native'
import {getCardById, updateCard} from '../db/card'

const CardForm = ({id, type}) => {
    const [cardsInput, setCardInput] = useState({
      name: "",
      type: "",
      money: "",
      note: "",
    });

    const updateCardInfor = async () => {
        const data =await getCardById(id);
        setCardInput({
            ...cardsInput,
            ...data,
        })
    }

    useEffect(() => {
        updateCardInfor()
    }, [])

    return (
        <>
           <View>
                <Text>updateCard</Text>
                <TextInput
                    placeholder="name card?"
                    value={cardsInput.name}
                    onChangeText={(t) =>
                        setCardInput({
                            ...cardsInput,
                            name: t,
                        })
                    }
                    style={styles.inputStyle}
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
                    style={styles.inputStyle}
                />
                <TextInput
                    placeholder="money"
                    value={cardsInput.money.toString()}
                    onChangeText={(t) =>
                        setCardInput({
                            ...cardsInput,
                            money: t,
                        })
                    }
                    style={styles.inputStyle}
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
                    style={styles.inputStyle}
                />
                <Button
                    title="Update card"
                    onPress={() => {
                        console.log(`update ${cardsInput.id}`)
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