import { execSql } from "./utils";
import { stripObj } from "../services";
import { createTransaction, updateInitTransactionCash } from "./transaction";

export async function createCard(arg) {
  let { name, type, money, note, goal } = stripObj(arg);
  if (goal == null) goal = -1;
  try {
    const [
      ,
      { insertId },
    ] = await execSql(
      `insert into cards (name, type, goal, note) values (?,?,?,?)`,
      [name, type, goal, note]
    );
    return await createTransaction({
      category: 1,
      card: insertId,
      cash: money,
      date: new Date().toLocaleDateString(),
      note: `Init card ${insertId}`,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function getCard() {
  try {
    const [, data] = await execSql(`select * from cards`, []);
    return data.rows._array;
  } catch (err) {
    console.log(err);
  }
}

export async function getCardById(id) {
  try {
    const [, { rows }] = await execSql(`select * from cards where id=?`, [id]);
    return rows.item(0);
  } catch (err) {
    console.log(err);
  }
}

export async function countCard() {
  try {
    const [, { rows }] = await execSql(
      `select count(*) as count from cards`,
      []
    );
    return rows.item(0).count;
  } catch (err) {
    console.log(err);
  }
}

export async function updateCard(data) {
  if (data.id)
    try {
      const beforeUpdated = await getCardById(data.id);
      const { name, type, goal, note, id, money } = {
        ...beforeUpdated,
        ...stripObj(data),
      };
      await execSql(
        `update cards set name=?, type=?, goal=?, note=?  where id=?`,
        [name, type, goal, note, id]
      );
      return await updateInitTransactionCash({
        card: id,
        cash: money,
      });
    } catch (err) {
      console.log(err);
    }
}

export async function deleteCard(id) {
  if ((await countCard()) > 1)
    try {
      const beforeDeleted = await getCardById(id);
      await execSql(`delete from cards where id=?  `, [id]);
      return beforeDeleted;
    } catch (err) {
      console.log(err);
    }
}

export const transferMoney = async ({ sendId, receiveId, money, note }) => {
  try {
    const sender = await createTransaction({
      category: 2,
      card: sendId,
      cash: -money,
      date: new Date().toLocaleDateString(),
      note: `(Transfer money to card ${receiveId}) ${note}`,
    });
    const recipient = await createTransaction({
      category: 2,
      card: receiveId,
      cash: money,
      date: new Date().toLocaleDateString(),
      note: `(Receive money from card ${sendId}) ${note}`,
    });
    return {
      sender,
      recipient,
    };
  } catch (err) {
    console.log(err);
  }
};
