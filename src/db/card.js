import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

export function createCard(
  { name, type, money, note },
  f = console.log.bind(console)
) {
  db.transaction(function (tx) {
    tx.executeSql(
      `insert into cards (name, type, money, note) values (?,?,?,?)`,
      [name, type, money, note]
    );
    getCard(f);
  });
}

export function getCard(f = console.log.bind(console)) {
  db.transaction(function (tx) {
    tx.executeSql(
      `select * from cards`,
      [],
      (_, { rows }) => {
        f(JSON.stringify(rows));
      },
      (_, err) => console.error("something went wrong, ", err)
    );
  });
}

export function updateCard(
  { name, type, money, note, id },
  f = console.log.bind(console)
) {
  db.transaction(function (tx) {
    tx.executeSql(
      `update cards
       set
      name=?,
      type=?,
      money=?,
      note=?
      where
      id=?
      `,
      [name, type, money, note, id]
    );
    getCard(f);
  });
}

export function deleteCard(id, f = console.log.bind(console)) {
  db.transaction(function (tx) {
    tx.executeSql(
      `delete from cards
    where id=?
    `,
      [id]
    );
    getCard(f);
  });
}
