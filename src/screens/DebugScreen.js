import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { cleanUp } from "../db/index";
import {
  getCard,
  countCard,
  createCard,
  updateCard,
  deleteCard,
  transferMoney,
} from "../db/card";
import {
  getCategory,
  getCategoryById,
  getCategoryByCard,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../db/category";
import {
  getTransaction,
  getTransactionByCard,
  getTransactionByCategory,
  getTransactionByDate,
  getTransactionByMonth,
  getTransactionByYear,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../db/transaction";

export default function DebugScreen() {
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
    color: "",
  });
  const [categoryUpdate, setCategoryUpdate] = useState({
    name: "dummy",
    color: "#000000",
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

  const [transferMoneyInput, setTransferMoney] = useState({
    sendId: "1",
    receiveId: "2",
    money: "15",
    note: "Chuyển chơi",
  });

  const [deleteId, setDeleteId] = useState("1");

  const getAllCards = async () => {
    console.log(await getCategoryByCard(1));
    const data = await getCard();
    setCards(JSON.stringify(data, null, 2));
  };

  const getAllCategories = async () => {
    const data = await getCategory();
    setCategories(JSON.stringify(data, null, 2));
  };

  const getAllTransactions = async () => {
    const data = await getTransaction();
    setTransactions(JSON.stringify(data, null, 2));
  };

  const clearOutput = () => {
    setCards(null);
    setCategories(null);
    setTransactions(null);
  };

  const initTrans = async () => {
    const trans = [
      {
        category: 4,
        card: 1,
        cash: -500000,
        date: "02/28/19",
        note: "Gogi",
      },
      {
        category: 5,
        card: 1,
        cash: -200000,
        date: "02/28/19",
        note: "Starbucks",
      },
      {
        category: 12,
        card: 2,
        cash: 3000000,
        date: "03/01/19",
        note: "Đứa nào chuyển nhầm tiền vô thẻ mình",
      },
      {
        category: 12,
        card: 1,
        cash: -3500000,
        date: "04/01/19",
        note: "Sinh nhật crush",
      },
    ];
    console.log(await Promise.all(trans.map((e) => createTransaction(e))));
    console.log(
      await transferMoney({
        sendId: 2,
        receiveId: 2,
        money: 3200000,
        date: "03/01/19",
        note: "Rút tiền iđ sinh nhật",
      })
    );
  };

  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [cardModalVisible, setCardModalVisible] = useState(false);

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
      <Text onPress={initTrans}> some mock transaction </Text>
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
        <Text>transferMonen</Text>
        <TextInput
          placeholder="sendId?"
          value={transferMoneyInput.sendId}
          onChangeText={(t) =>
            setTransferMoney({
              ...transferMoneyInput,
              sendId: t,
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
          placeholder="receiveId??"
          value={transferMoneyInput.receiveId}
          onChangeText={(t) =>
            setTransferMoney({
              ...transferMoneyInput,
              receiveId: t,
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
          value={transferMoneyInput.money}
          onChangeText={(t) =>
            setTransferMoney({
              ...transferMoneyInput,
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
            setTransferMoney({
              ...transferMoneyInput,
              note: t,
            })
          }
          value={transferMoneyInput.note}
          style={{
            borderColor: "gray",
            borderWidth: 1,
            width: 300,
            padding: 5,
            marginBottom: 2,
          }}
        />
        <Button
          title="Transfer"
          onPress={async () => {
            console.log(await transferMoney(transferMoneyInput));
          }}
        />
      </View>
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
            console.log(await createCard(cardsInput));
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
          placeholder="goal"
          value={cardUpdate.goal}
          onChangeText={(t) =>
            setCardUpdate({
              ...cardUpdate,
              goal: t,
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
            console.log(cardUpdate);
            console.log(await updateCard(cardUpdate));
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
            console.log(await deleteCard(deleteId));
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
          placeholder="color ?"
          value={categoryInput.color}
          onChangeText={(t) =>
            setCategoryInput({
              ...categoryInput,
              color: t,
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
          onPress={async () => {
            console.log(await createCategory(categoryInput));
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
          placeholder="color ?"
          value={categoryUpdate.color}
          onChangeText={(t) =>
            setCategoryUpdate({
              ...categoryUpdate,
              color: t,
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
          onPress={async () => {
            console.log(await updateCategory(categoryUpdate));
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
          onPress={async () => {
            console.log(await deleteCategory(deleteId));
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
          onPress={async () => {
            console.log(await createTransaction(transactionInput));
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
          onPress={async () => {
            console.log(await updateTransaction(transactionUpdate));
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
          onPress={async () => {
            console.log(await deleteTransaction(deleteId));
          }}
        />
      </View>
    </ScrollView>
  );
};


