import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { useInitDbHook, cleanUp } from "../db/index";
import { getCard, createCard, updateCard, deleteCard } from "../db/card";
import {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../db/category";
import {
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../db/transaction";

export const HistoryScreen = () => {
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

  const [categories, setCategories] = useState(null);
  const [categoryInput, setCategoryInput] = useState({
    name: "",
    type: "",
  });
  const [categoryUpdate, setCategoryUpdate] = useState({
    name: "dummy",
    type: "type x",
    id: "1",
  });

  const [transactions, setTransactions] = useState(null);
  const [transactionInput, setTransactionInput] = useState({
    category: "",
    card: "",
    cash: "",
    date: "",
    note: "",
  });

  const [transactionUpdate, setTransactionUpdate] = useState({
    category: "1",
    card: "1",
    cash: "1080",
    date: "1/1/1970",
    id: "1",
  });

  const [deleteId, setDeleteId] = useState("1");

  const getAllCards = async () => {
    const data = await getCard();
    setCards(JSON.stringify(data, null, 2));
  };

  const getAllCategories = () => {
    getCategory((data) => setCategories(JSON.stringify(data, null, 2)));
  };

  const getAllTransactions = () => {
    getTransaction((data) => setTransactions(JSON.stringify(data, null, 2)));
  };

  const clearOutput = () => {
    setCards(null);
    setCategories(null);
    setTransactions(null);
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
      <Text> {cards} </Text>
      <Text onPress={getAllCategories}> get all categories </Text>
      <Text> {categories} </Text>
      <Text onPress={getAllTransactions}> get all transactions </Text>
      <Text> {transactions} </Text>
      <Text>--------------------------</Text>
      <Text> --------- Card --------- </Text>
      <Text>--------------------------</Text>
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
          onPress={async () => {
            const data = await createCard(cardsInput);
            setCards(JSON.stringify(data, null, 2));
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
          onPress={async () => {
            const data = await updateCard(cardUpdate);
            setCards(JSON.stringify(data, null, 2));
            setCardUpdate({});
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
          onPress={async () => {
            const data = await deleteCard(deleteId);
            setCards(JSON.stringify(data, null, 2));
          }}
        />
      </View>
      <Text>--------------------------</Text>
      <Text> ------- Category ------- </Text>
      <Text>--------------------------</Text>
      <View>
        <Text>createCategory</Text>
        <TextInput
          placeholder="name category?"
          value={categoryInput.name}
          onChangeText={(t) =>
            setCategoryInput({
              ...categoryInput,
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
          value={categoryInput.type}
          onChangeText={(t) =>
            setCategoryInput({
              ...categoryInput,
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
        <Button
          title="Create category"
          onPress={() => {
            createCategory(categoryInput, setCategories);
          }}
        />
      </View>
      <View>
        <Text>Update category</Text>
        <TextInput
          placeholder="name category?"
          value={categoryUpdate.name}
          onChangeText={(t) =>
            setCategoryUpdate({
              ...categoryUpdate,
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
          value={categoryUpdate.type}
          onChangeText={(t) =>
            setCategoryUpdate({
              ...categoryUpdate,
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
          placeholder="id"
          style={{
            borderColor: "gray",
            borderWidth: 1,
            width: 300,
            padding: 5,
            marginBottom: 2,
          }}
          onChangeText={(t) =>
            setCategoryUpdate({
              ...categoryUpdate,
              id: t,
            })
          }
          value={categoryUpdate.id}
        />
        <Button
          title="Update Category"
          onPress={() => {
            updateCategory(categoryUpdate, setCategories);
          }}
        />
      </View>
      <View>
        <Text>delete category</Text>
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
          title="delete category"
          onPress={() => {
            deleteCategory(deleteId, setCategories);
          }}
        />
      </View>
      <Text>--------------------------</Text>
      <Text> ----- Transaction ----- </Text>
      <Text>--------------------------</Text>
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
          style={{
            borderColor: "gray",
            borderWidth: 1,
            width: 300,
            padding: 5,
            marginBottom: 2,
          }}
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
          style={{
            borderColor: "gray",
            borderWidth: 1,
            width: 300,
            padding: 5,
            marginBottom: 2,
          }}
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
          style={{
            borderColor: "gray",
            borderWidth: 1,
            width: 300,
            padding: 5,
            marginBottom: 2,
          }}
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
            setTransactionInput({
              ...transactionInput,
              note: t,
            })
          }
          value={transactionInput.note}
          style={{
            borderColor: "gray",
            borderWidth: 1,
            width: 300,
            padding: 5,
            marginBottom: 2,
          }}
        />
        <Button
          title="Create transaction"
          onPress={() => {
            createTransaction(transactionInput, setTransactions);
          }}
        />
      </View>
      <View>
        <Text>Update transaction</Text>
        <TextInput
          placeholder="card id?"
          value={transactionUpdate.card}
          onChangeText={(t) =>
            setTransactionUpdate({
              ...transactionUpdate,
              card: t,
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
          placeholder="category id?"
          value={transactionUpdate.category}
          onChangeText={(t) =>
            setTransactionUpdate({
              ...transactionUpdate,
              category: t,
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
          placeholder="cash"
          value={transactionUpdate.cash}
          onChangeText={(t) =>
            setTransactionUpdate({
              ...transactionUpdate,
              cash: t,
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
          placeholder="date"
          onChangeText={(t) =>
            setTransactionUpdate({
              ...transactionUpdate,
              date: t,
            })
          }
          value={transactionUpdate.date}
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
            setTransactionUpdate({
              ...transactionUpdate,
              note: t,
            })
          }
          value={transactionUpdate.note}
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
            setTransactionUpdate({
              ...transactionUpdate,
              id: t,
            })
          }
          value={transactionUpdate.id}
        />
        <Button
          title="Update Transaction"
          onPress={() => {
            updateTransaction(transactionUpdate, setTransactions);
          }}
        />
      </View>
      <View>
        <Text>delete transaction</Text>
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
          title="delete transaction"
          onPress={() => {
            deleteTransaction(deleteId, setTransactions);
          }}
        />
      </View>
    </ScrollView>
  );
};

export default HistoryScreen;
