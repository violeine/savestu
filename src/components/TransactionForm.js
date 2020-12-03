import React from 'react'
import {View, Stylesheet, TextInput} from 'react-native'
import {
    getTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction,
} from "../db/transaction";

const TransactionForm = () => {
    const [transactions, setTransactions] = useState(null);
    const [transactionInput, setTransactionInput] = useState({
      category: "",
      card: "",
      cash: "",
      date: "",
      note: "",
    });

    return(
        <>
            <View>
                <Text>createTransaction</Text>
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
                    title="Create transaction"
                    onPress={() => {
                        createTransaction(transactionInput, setTransactions);
                    }}
                />
            </View>
        </>
    );
}

const styles = Stylesheet.creates({
    inputStyle : {
        borderColor: "gray",
        borderWidth: 1,
        width: 300,
        padding: 5,
        marginBottom: 2,
    }
});

export default TransactionForm;