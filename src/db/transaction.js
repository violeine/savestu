import { execSql } from "./utils";
export {
  createTransaction,
  getTransaction,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "./crud";

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

export const getTransactionByCardAndCategory = async ({ category, card }) => {
  try {
    const [
      ,
      { rows },
    ] = await execSql(
      `select * from transactions where card=? and category=?`,
      [card, category]
    );
    return rows._array;
  } catch (err) {
    console.log(err);
  }
};

export const getTransactionByCardAndYear = async ({ card, year }) => {
  try {
    const [, { rows }] = await execSql(
      `
       SELECT * FROM transactions
       WHERE card=? AND date LIKE (SELECT '%/'||?)
      `,
      [card, year]
    );
    return rows._array;
  } catch (err) {
    console.log(err);
  }
};

export const getTransactionByCardAndMonth = async ({ card, month, year }) => {
  try {
    const [, { rows }] = await execSql(
      `
    SELECT * FROM transactions
    WHERE card=? AND date LIKE (select ?||'/%/'||?)
  `,
      [card, month, year]
    );
    return rows._array;
  } catch (err) {
    console.log(err);
  }
};

export const getTransactionByCardAndDate = async ({ card, date }) => {
  try {
    const [, { rows }] = await execSql(
      `
    SELECT * FROM transactions
    WHERE card=? AND date=?
  `,
      [card,date]
    );
    return rows._array;
  } catch (err) {
    console.log(err);
  }
};
