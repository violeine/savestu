import { execSql } from "./utils";
import { getCardById, createTransaction } from "./crud";
export { createCard, getCard, getCardById, updateCard } from "./crud";

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

export const transferMoney = async ({ sendId, receiveId, money, note }) => {
  try {
    sendName = (await getCardById(sendId)).name;
    receiveName = (await getCardById(receiveId)).name;
    const sender = await createTransaction({
      category: 2,
      card: sendId,
      cash: -money,
      date: new Date().toLocaleDateString(),
      note: `(Transfer money to card ${receiveName}) ${note}`,
    });
    const recipient = await createTransaction({
      category: 2,
      card: receiveId,
      cash: money,
      date: new Date().toLocaleDateString(),
      note: `(Receive money from card ${sendName}) ${note}`,
    });
    return {
      sender,
      recipient,
    };
  } catch (err) {
    console.log(err);
  }
};
