import { createCard } from "./card";
import { createCategory } from "./category";
import { createContext, useState, useEffect } from "react";
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

function initDb() {
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

const init = async () => {
  const { exists } = await fs.getInfoAsync(
    `${fs.documentDirectory}/SQLite/db.db`
  );
  console.log(exists);
  if (!exists) initDb();
};

function useInitDbHook() {
  useEffect(() => {
    init();
  }, []);
}
export { initDb, cleanUp, useInitDbHook };
