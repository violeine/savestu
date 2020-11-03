import { createCard } from "./card";
import { createCategory } from "./category";
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
export function initDb() {
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
      console.log("wtf");
      defaultCards.map((e) => createCard(e));
      defaultCategory.map((e) => createCategory(e));
    }
  );
}
