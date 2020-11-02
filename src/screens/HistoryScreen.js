import React, { useEffect, useState } from "react";
import { View, Text, StatusBar } from "react-native";
import * as fs from "expo-file-system";
import { initDb } from "../db/index";
import { getCard } from "../db/card";

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

  const onPressHandler = () => {
    getCard(setCards);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "honeydew",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#238f70" />
      <Text onPress={onPressHandler}>Db screen</Text>
      <Text>{cards}</Text>
      <Text onPress={cleanUp}>clear</Text>
    </View>
  );
};

export default HistoryScreen;
