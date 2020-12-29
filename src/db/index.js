import { createCard, getCard } from "./card";
import { createCategory } from "./category";
import React, { createContext, useState, useEffect, useContext } from "react";
import * as fs from "expo-file-system";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

const defaultCards = [
  {
    name: "Xài Chính",
    type: "using",
    money: 1000000,
    note: "Xài Chính",
  },
  {
    name: "Mua lap mới",
    type: "saving",
    money: 200000,
    goal: 20000000,
    note: "Dành tiền mua lap mới",
  },
];

const defaultCategory = [
  {
    name: "Card Initialization",
    color: "#ffffff",
    type: "income",
  },
  {
    name: "Transfer (Deposit)",
    color: "#01dfa3",
    type: "income",
  },
  {
    name: "Transfer (Withdrawal)",
    color: "#fe205c",
    type: "expense",
  },
  {
    name: "Food",
    color: "#FF8000",
    type: "expense",
  },
  {
    name: "Drinks",
    color: "#897e2f",
    type: "expense",
  },
  {
    name: "Parking",
    color: "#278cd9",
    type: "expense",
  },
  {
    name: "Transportation",
    color: "#18c20c",
    type: "expense",
  },
  {
    name: "Shopping",
    color: "#ff3e3e",
    type: "expense",
  },
  {
    name: "House",
    color: "#8506ff",
    type: "expense",
  },
  {
    name: "Phone",
    color: "#ff6594",
    type: "expense",
  },
  {
    name: "Groceries",
    color: "#ff00d5",
    type: "expense",
  },
  {
    name: "Movie",
    color: "#ece800",
    type: "expense",
  },
];

function initDb(setFinished) {
  console.log("initDb");
  db.transaction(
    (tx) => {
      tx.executeSql(`
        create table if not exists cards (
          id integer primary key autoincrement,
          name text,
          type text,
          money integer default 0,
          goal integer default -1,
          note text
        );
      `);
      tx.executeSql(`
        create table if not exists categories (
          id integer primary key autoincrement,
          name text,
          color text,
          type text
        );
      `);
      tx.executeSql(`
        create table if not exists transactions (
          id integer primary key autoincrement,
          category integer not null
            references categories (id)
              on update cascade
              on delete restrict,
          card integer not null
            references cards (id)
              on update cascade
              on delete cascade,
          cash integer,
          date text,
          note text
        );
      `);
      tx.executeSql(`
         drop trigger if exists update_card_money_after_insert_transaction;
       `);
      tx.executeSql(`
         drop trigger if exists update_card_money_after_update_transaction;
       `);
      tx.executeSql(`
         drop trigger if exists update_card_money_after_delete_transaction;
       `);
      tx.executeSql(`
         create trigger update_card_money_after_insert_transaction after insert on transactions
           begin
             update cards
             set money = money + new.cash
             where id = new.card;
           end;
       `);
      tx.executeSql(`
         create trigger update_card_money_after_update_transaction after update on transactions
           begin
             update cards
             set money = money - old.cash + new.cash
             where id = new.card;
           end;
       `);
      tx.executeSql(`
         create trigger update_card_money_after_delete_transaction after delete on transactions
           begin
             update cards
             set money = money - old.cash
             where id = old.card;
           end;
       `);
    },
    null,
    async () => {
      await Promise.all(defaultCategory.map((e) => createCategory(e)));
      await Promise.all(defaultCards.map((e) => createCard(e)));
      console.log("run set card");
      setFinished(true);
    }
  );
  console.log("done");
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

  // Lỗi DB: cmt if -> bỏ cmt cleanUp() -> chạy -> bỏ cmt if -> cmt cleanUp()

  if (!exists) initDb(setFinished);
  else setFinished(true);
  // cleanUp();
};

async function useInitDbHook() {
  const dispatch = useCardDispatch();
  const [finish, setFinished] = useState(false);
  useEffect(() => {
    init(setFinished);
  }, []);
  if (finish) {
    const data = (await getCard())[0];
    dispatch(data);
  }
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
};
