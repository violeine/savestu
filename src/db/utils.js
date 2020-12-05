import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

export function execSql(sqlQuery, vector) {
  return new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      tx.executeSql(
        sqlQuery,
        vector,
        (_, data) => resolve([_, data]),
        (_, err) => reject([_, err])
      );
    });
  });
}
