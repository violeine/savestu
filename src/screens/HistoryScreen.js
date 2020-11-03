import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import * as fs from "expo-file-system";
import { initDb } from "../db/index";
import { getCard, createCard, updateCard, deleteCard } from "../db/card";
import { getCategory } from "../db/category";

export const HistoryScreen = () => {
  const cleanUp = async () => {
    console.log("delete db");
    await fs.deleteAsync(`${fs.documentDirectory}/SQLite/db.db`);
    const { exists } = await fs.getInfoAsync(
      `${fs.documentDirectory}/SQLite/db.db`
    );
    if (!exists) console.log("deleted");
  };
  const init = async () => {
    console.log("init db");
    const { exists } = await fs.getInfoAsync(
      `${fs.documentDirectory}/SQLite/db.db`
    );
    console.log(exists);
    if (!exists) initDb();
  };
  useEffect(() => {
    init();
  }, []);

  const [cards, setCards] = useState(null);
  const [cardsInput, setCardInput] = useState({
    name: "",
    type: "",
    money: "",
    note: "",
  });
  const [cardUpdate, setCardUpdate] = useState({
    name: "test",
    type: "yo",
    money: "1000",
    note: "gone",
    id: "1",
  });
  const [deleteId, setDeleteId] = useState("1");

  const [categories, setCategories] = useState(null);

  const getAllCards = () => {
    getCard(setCards);
  };

  const getAllCategories = () => {
    getCategory(setCategories);
  };

  const clearOutput = () => {
    setCards(null);
    setCategories(null);
  };
  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: "honeydew",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#238f70" />
      <Text onPress={cleanUp}>delete physical db</Text>
      <Text onPress={clearOutput}> clear output</Text>
      <Text>Db screen</Text>
      <Text onPress={getAllCards}> get all cards</Text>
      <Text>{cards}</Text>
      <Text onPress={getAllCategories}> get all categories </Text>
      <Text> {categories} </Text>

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
          style={{
            borderColor: "gray",
            borderWidth: 1,
            width: 300,
            padding: 5,
            marginBottom: 2,
          }}
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
          style={{
            borderColor: "gray",
            borderWidth: 1,
            width: 300,
            padding: 5,
            marginBottom: 2,
          }}
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
          style={{
            borderColor: "gray",
            borderWidth: 1,
            width: 300,
            padding: 5,
            marginBottom: 2,
          }}
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
          style={{
            borderColor: "gray",
            borderWidth: 1,
            width: 300,
            padding: 5,
            marginBottom: 2,
          }}
        />
        <Button
          title="Create card"
          onPress={() => {
            createCard(cardsInput, setCards);
          }}
        />
      </View>
      <View>
        <Text>Update card</Text>
        <TextInput
          placeholder="name card?"
          value={cardUpdate.name}
          onChangeText={(t) =>
            setCardUpdate({
              ...cardUpdate,
              name: t,
            })
          }
          style={{
            borderColor: "gray",
            borderWidth: 1,
            width: 300,
            padding: 5,
            marginBottom: 2,
          }}
        />
        <TextInput
          placeholder="type ?"
          value={cardUpdate.type}
          onChangeText={(t) =>
            setCardUpdate({
              ...cardUpdate,
              type: t,
            })
          }
          style={{
            borderColor: "gray",
            borderWidth: 1,
            width: 300,
            padding: 5,
            marginBottom: 2,
          }}
        />
        <TextInput
          placeholder="money"
          value={cardUpdate.money}
          onChangeText={(t) =>
            setCardUpdate({
              ...cardUpdate,
              money: t,
            })
          }
          style={{
            borderColor: "gray",
            borderWidth: 1,
            width: 300,
            padding: 5,
            marginBottom: 2,
          }}
        />
        <TextInput
          placeholder="note"
          onChangeText={(t) =>
            setCardUpdate({
              ...cardUpdate,
              note: t,
            })
          }
          value={cardUpdate.note}
          style={{
            borderColor: "gray",
            borderWidth: 1,
            width: 300,
            padding: 5,
            marginBottom: 2,
          }}
        />
        <TextInput
          placeholder="id"
          style={{
            borderColor: "gray",
            borderWidth: 1,
            width: 300,
            padding: 5,
            marginBottom: 2,
          }}
          onChangeText={(t) =>
            setCardUpdate({
              ...cardUpdate,
              id: t,
            })
          }
          value={cardUpdate.id}
        />
        <Button
          title="Update Card"
          onPress={() => {
            updateCard(cardUpdate, setCards);
            setCardInput({});
          }}
        />
      </View>
      <View>
        <Text>delete card</Text>
        <TextInput
          placeholder="id"
          style={{
            borderColor: "gray",
            borderWidth: 1,
            width: 300,
            padding: 5,
            marginBottom: 2,
          }}
          value={deleteId}
          onChangeText={(id) => setDeleteId(id)}
        />
        <Button
          title="delete card"
          onPress={() => {
            deleteCard(deleteId, setCards);
          }}
        />
      </View>
    </ScrollView>
  );
};

export default HistoryScreen;
