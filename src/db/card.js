import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

export function createCard({ name, type, money, note }) {
  let result;
  console.log(name, type, money, note);
  db.transaction(function (tx) {
    tx.executeSql(
      `insert into cards (name, type, money, note) values (?,?,?,?)`,
      [name, type, money, note]
    );
    tx.executeSql(
      "select * from cards",
      [],
      (_, { rows }) => {
        console.log("createCard");
        console.log(JSON.stringify(rows));
      },
      (_, err) => console.error("Something went wrong, ", err)
    );
  });
  console.log("yo,", result);
  return result;
}

export function getCard(f) {
  db.transaction(function (tx) {
    tx.executeSql(
      `select * from cards`,
      [],
      (_, { rows }) => {
        console.log("getCard");
        f(JSON.stringify(rows));
      },
      (_, err) => console.error("something went wrong, ", err)
    );
  });
}
