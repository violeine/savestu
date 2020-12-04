import { execSql } from "./utils";
import { stripObj } from "../services";
import { createTransaction } from "./transaction";

export async function createCard({ name, type, money, note }) {
  const [
    ,
    { insertId },
  ] = await execSql(`insert into cards (name, type, note) values (?,?,?)`, [
    name,
    type,
    note,
  ]);
  await createTransaction({
    category: 1,
    card: insertId,
    cash: money,
    date: new Date().toLocaleDateString(),
    note: `Init card ${insertId}`,
  });
  return await getCard();
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

export async function updateCard(data) {
  if (data.id) {
    const oldData = await getCardById(data.id);
    const { name, type, note, id } = { ...oldData, ...stripObj(data) };
    await execSql(`update cards set name=?, type=?, note=?  where id=?`, [
      name,
      type,
      note,
      id,
    ]);
  }
  return await getCard();
}

export async function deleteCard(id) {
  await execSql(`delete from cards where id=?  `, [id]);
  return await getCard();
}
