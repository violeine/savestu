import { execSql } from "./utils";
import { stripObj } from "../services";

export const createTransaction = async ({
  category,
  card,
  cash,
  date,
  note,
}) => {
  try {
    await execSql(
      `insert into transactions (category, card, cash, date, note) values (?,?,?,?,?)`,
      [category, card, cash, date, note]
    );
    return await getCardById(card);
  } catch (err) {
    console.log(err);
  }
};

export const getTransaction = async () => {
  try {
    const [, data] = await execSql(`select * from transactions`, []);
    return data.rows._array;
  } catch (err) {
    console.log(err);
  }
};

export const getTransactionById = async (id) => {
  try {
    const [, { rows }] = await execSql(
      `select * from transactions where id=?`,
      [id]
    );
    return rows.item(0);
  } catch (err) {
    console.log(err);
  }
};

export const getTransactionByCard = async (card) => {
  try {
    const [
      ,
      { rows },
    ] = await execSql(`select * from transactions where card=?`, [card]);
    return rows._array;
  } catch (err) {
    console.log(err);
  }
};

export const getTransactionByCategory = async (category) => {
  try {
    const [
      ,
      { rows },
    ] = await execSql(`select * from transactions where category=?`, [
      category,
    ]);
    return rows._array;
  } catch (err) {
    console.log(err);
  }
};

export const getTransactionByYear = async (year) => {
  try {
    const [, { rows }] = await execSql(
      `
       SELECT * FROM transactions
       WHERE date LIKE (SELECT '%/'||?)
      `,
      [year.toString()]
    );
    return rows._array;
  } catch (err) {
    console.log(err);
  }
};

export const getTransactionByMonth = async ({ month, year }) => {
  try {
    const [, { rows }] = await execSql(
      `
    SELECT * FROM transactions
    WHERE date LIKE (select ?||'/%/'||?)
  `,
      [month.toString(), year.toString()]
    );
    return rows._array;
  } catch (err) {
    console.log(err);
  }
};

export const getTransactionByDate = async (date) => {
  try {
    const [, { rows }] = await execSql(
      `
    SELECT * FROM transactions
    WHERE date = ?
  `,
      [date]
    );
    return rows._array;
  } catch (err) {
    console.log(err);
  }
};

export const updateTransaction = async (data) => {
  try {
    const oldData = await getTransactionById(data.id);
    const { category, card, cash, date, note, id } = {
      ...oldData,
      ...stripObj(data),
    };
    await execSql(
      `update transactions
    set category=?, card=?, cash=?, date=?, note=?
    where id=?`,
      [category, card, cash, date, note, id]
    );
    return await getCardById(card);
  } catch (err) {
    console.log(err);
  }
};

export const updateInitTransactionCash = async ({ card, cash }) => {
  try {
    await execSql(
      `update transactions
    set cash=?
    where card=?
    and id=(select min(id) from transactions where card=?)`,
      [cash, card, card]
    );
    return await getCardById(card);
  } catch (err) {
    console.log(err);
  }
};

export const deleteTransaction = async (id) => {
  try {
    const card = (await getTransactionById(id)).card;
    await execSql(
      `delete from transactions
      where id=?`,
      [id]
    );
    return await getCardById(card);
  } catch (err) {
    console.log(err);
  }
};

async function getCardById(id) {
  try {
    const [, { rows }] = await execSql(`select * from cards where id=?`, [id]);
    return rows.item(0);
  } catch (err) {
    console.log(err);
  }
}
