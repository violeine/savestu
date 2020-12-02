import { execSql } from "./utils";

export async function createCard({ name, type, money, note }) {
  await execSql(
    `insert into cards (name, type, money, note) values (?,?,?,?)`,
    [name, type, money, note]
  );
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
  const [, { rows }] = await execSql(`select * from cards where id=?`, [id]);
  return rows.item(0);
}

export async function updateCard({ name, type, money, note, id }) {
  await execSql(
    `update cards set name=?, type=?, money=?, note=?  where id=?`,
    [name, type, money, note, id]
  );
  return await getCard();
}

export async function deleteCard(id) {
  await execSql(`delete from cards where id=?  `, [id]);
  return await getCard();
}
