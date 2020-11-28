import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

export function createCategory({ name, type }, f = console.log.bind(console)) {
  db.transaction(function (tx) {
    tx.executeSql(`insert into categories (name, type) values (?,?)`, [
      name,
      type,
    ]);
    tx.executeSql(
      `select * from categories`,
      [],
      (_, { rows }) => {
        f(rows);
      },
      (_, err) => console.error("Something went wrong, ", err)
    );
  });
}

export function getCategory(f = console.log.bind(console)) {
  db.transaction(function (tx) {
    tx.executeSql(
      `select * from categories`,
      [],
      (_, { rows }) => {
        f(rows);
      },
      (_, err) => console.error("Something went wrong, ", err)
    );
  });
}

export function updateCategory(
  { name, type, id },
  f = console.log.bind(console)
) {
  db.transaction(function (tx) {
    tx.executeSql(
      `update categories
       set name=?, type=? where id=?
      `,
      [name, type, id]
    );
    getCategory(f);
  });
}

export function deleteCategory(id, f = console.log.bind(console)) {
  db.transaction(function (tx) {
    tx.executeSql(
      `delete from categories
    where id=?
    `,
      [id]
    );
    getCategory(f);
  });
}
