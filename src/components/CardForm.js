import React from 'react'
import {View, Stylesheet, TextInput} from 'react-native'
import {getCard, createCard, updateCard} from '../db/card'

const CardForm = () => {
    const [cards, setCards] = useState(null);
    const [cardsInput, setCardInput] = useState({
      name: "",
      type: "",
      money: "",
      note: "",
    });

    return (
        <>
           <View>
                <Text>createCard</Text>
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
                    value={cardsInput.money}
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
                    title="Create card"
                    onPress={() => {
                        createCard(cardsInput, setCards);
                    }}
                />
            </View>
        </>
    );
}

const styles = Stylesheet.create({
    inputStyle : {
        borderColor: "gray",
        borderWidth: 1,
        width: 300,
        padding: 5,
        marginBottom: 2,
    }
});

export default CardForm;