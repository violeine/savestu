import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");

export const execSql = (sqlQuery, vector) => {
  return new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      db.exec(
        [{ sql: "PRAGMA foreign_keys = ON;", args: [] }],
        false,
        () => {}
      );
      tx.executeSql(
        sqlQuery,
        vector,
        (_, data) => resolve([_, data]),
        (_, err) => reject([_, err])
      );
    });
  });
};

export const stripObj = (obj) => {
  for (let key in obj) if (obj[key] == null || obj[key] == "") delete obj[key];
  return obj;
};
