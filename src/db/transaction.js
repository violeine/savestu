import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

export function createTransaction(
  { category, card, cash, date, note },
  f = console.log.bind(console)
) {
  db.transaction(function (tx) {
    tx.executeSql(
      `insert into transactions (category, card, cash, date, note) values (?,?,?,?,?)`,
      [category, card, cash, date, note]
    );
    getTransaction(f);
  });
}

export function getTransaction(f = console.log.bind(console)) {
  db.transaction(function (tx) {
    tx.executeSql(
      `select * from transactions`,
      [],
      (_, { rows }) => {
        f(rows);
      },
      (_, err) => console.error("something went wrong, ", err)
    );
  });
}

export function updateTransaction(
  { category, card, cash, date, note, id },
  f = console.log.bind(console)
) {
  db.transaction(function (tx) {
    tx.executeSql(
      `update transactions
       set
      category=?,
      card=?,
      cash=?,
      date=?,
      note=?
      where
      id=?
      `,
      [category, card, cash, date, note, id]
    );
    getTransaction(f);
  });
}

export function deleteTransaction(id, f = console.log.bind(console)) {
  db.transaction(function (tx) {
    tx.executeSql(
      `delete from transactions
    where id=?
    `,
      [id]
    );
    getTransaction(f);
  });
}
