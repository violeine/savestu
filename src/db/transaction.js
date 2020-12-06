import { execSql } from "./utils";
import { stripObj } from "../services";

export const createTransaction = async ({
  category,
  card,
  cash,
  date,
  note,
}) => {
  await execSql(
    `insert into transactions (category, card, cash, date, note) values (?,?,?,?,?)`,
    [category, card, cash, date, note]
  );
  return await getTransaction();
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
  const [, { rows }] = await execSql(`select * from transactions where id=?`, [
    id,
  ]);
  return rows.item(0);
};

export const updateTransaction = async (data) => {
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
  return await getTransaction();
};

export const deleteTransaction = async (id) => {
  await execSql(
    `delete from transactions
      where id=?`,
    [id]
  );
  return await getTransaction();
};
