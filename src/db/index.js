import { createCard, getCardById } from "./card";
import { createCategory } from "./category";
import React, { createContext, useState, useEffect, useContext } from "react";
import * as fs from "expo-file-system";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");
const defaultCards = [
  {
    name: "Xài Chính",
    type: "using",
    money: 1000000000,
    note: "Xài Chính",
  },
  {
    name: "Mua lap mới",
    type: "saving",
    money: 1000000,
    note: "Dành tiền mua lap mới",
  },
];

const defaultCategory = [
  {
    name: "ăn",
    type: "eat",
  },
  {
    name: "xăng",
    type: "something",
  },
];

function initDb(setFinished) {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `create table if not exists cards (
    id integer primary key autoincrement,
    name text,
    type text,
    money integer not null,
    note text
    );`
      );
      tx.executeSql(`create table if not exists categories (
    id integer primary key autoincrement,
    name text,
    type text);
    `);
      tx.executeSql(`create table if not exists transactions (
    id integer primary key autoincrement,
    category integer not null,
    card integer not null,
    cash integer,
    date text,
    note text,
    foreign key (category) references category (id),
    foreign key (card) references card (id));
    `);
    },
    null,
    () => {
      defaultCards.map((e) => createCard(e));
      defaultCategory.map((e) => createCategory(e));
      setFinished(true);
    }
  );
}

const cleanUp = async () => {
  console.log("deleting db");
  const { exists } = await fs.getInfoAsync(
    `${fs.documentDirectory}/SQLite/db.db`
  );
  if (!exists) console.log("deleted");
  else {
    await fs.deleteAsync(`${fs.documentDirectory}/SQLite/db.db`);

    const { exists } = await fs.getInfoAsync(
      `${fs.documentDirectory}/SQLite/db.db`
    );
    console.log(exists);
  }
};

const init = async (setFinished) => {
  const { exists } = await fs.getInfoAsync(
    `${fs.documentDirectory}/SQLite/db.db`
  );
  if (!exists) initDb(setFinished);
  else setFinished(true);
};

function useInitDbHook() {
  const dispatch = useCardDispatch();
  const [finish, setFinished] = useState(false);
  useEffect(() => {
    init(setFinished);
  }, []);
  if (finish) getCardById(1, dispatch);
}

function setGlobalCard(id) {
  const dispatch = useCardDispatch();
  getCardById(id, dispatch);
}
const CardStateContext = createContext();
const CardDispatchContext = createContext();

function CardProvider({ children }) {
  const [card, setCard] = useState({});
  return (
    <CardStateContext.Provider value={card}>
      <CardDispatchContext.Provider value={setCard}>
        {children}
      </CardDispatchContext.Provider>
    </CardStateContext.Provider>
  );
}

function useCardState() {
  const context = useContext(CardStateContext);
  if (context === undefined) {
    throw new Error("useCardState must be used within a CardProvider");
  }
  return context;
}

function useCardDispatch() {
  const context = useContext(CardDispatchContext);
  if (context === undefined) {
    throw new Error("useCardDispatch must be used within a CardProvider");
  }
  return context;
}

export {
  initDb,
  cleanUp,
  useInitDbHook,
  CardProvider,
  useCardState,
  useCardDispatch,
  setGlobalCard,
};
