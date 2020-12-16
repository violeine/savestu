import React, {useState} from 'react'
import {View, StyleSheet, TextInput, Text, Button} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import {
    createTransaction,
    updateTransaction,
} from "../db/transaction";
import {getCategory} from '../db/category'
import {getCard} from '../db/card'

const TransactionForm = ({data, type}) => {
    const [transactionInput, setTransactionInput] = useState({
      category: "",
      card: "",
      cash: "",
      date: "",
      note: "",
    });
    const [listCategories, setListCategoires] = useState([])
    const [listCards, setListCards] = useState([])

    const getAllCategory = async () => {
        const data = await getCategory();
        setListCategoires(data);
    }

    const getAllCards = async () => {
        const data = await getCard()
        setListCards(data);
    }
    
    useEffect(() => {
        getAllCategory();
        getAllCards();
        if (type == "update") {
            setCardInput({
                ...data
            })
        }
    }, [])

    return(
        <>
            <View>
                <Text>{type + 'Transaction'}</Text>
                <TextInput
                    placeholder="card id?"
                    value={transactionInput.card}
                    onChangeText={(t) =>
                        setTransactionInput({
                            ...transactionInput,
                            card: t,
                        })
                    }
                    style={styles.inputStyle}
                />
                <TextInput
                    placeholder="category id ?"
                    value={transactionInput.category}
                    onChangeText={(t) =>
                        setTransactionInput({
                            ...transactionInput,
                            category: t,
                        })
                    }
                    style={styles.inputStyle}
                />
                <TextInput
                    placeholder="cash"
                    value={transactionInput.cash}
                    onChangeText={(t) =>
                        setTransactionInput({
                            ...transactionInput,
                            cash: t,
                        })
                    }
                    style={styles.inputStyle}
                />
                <TextInput
                    placeholder="date"
                    onChangeText={(t) =>
                        setTransactionInput({
                            ...transactionInput,
                            date: t,
                        })
                    }
                    value={transactionInput.date}
                    style={styles.inputStyle}
                />
                <TextInput
                    placeholder="note"
                    onChangeText={(t) =>
                        setTransactionInput({
                            ...transactionInput,
                            note: t,
                        })
                    }
                    value={transactionInput.note}
                    style={styles.inputStyle}
                />
                <Button
                    title={type + " transaction"}
                    onPress={() => {
                        createTransaction(transactionInput, setTransactions);
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

export default TransactionForm;