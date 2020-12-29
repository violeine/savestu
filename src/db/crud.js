import { execSql, stripObj } from "./utils";

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

export const createCategory = async ({ name, color, type }) => {
  try {
    const [
      ,
      { insertId },
    ] = await execSql(
      `insert into categories (name, color, type) values (?,?,?)`,
      [name, color, type]
    );
    return await getCategoryById(insertId);
  } catch (err) {
    console.log(err);
  }
};

export const getCategory = async () => {
  try {
    const [, data] = await execSql(`select * from categories`, []);
    return data.rows._array;
  } catch (err) {
    console.log(err);
  }
};

export const getCategoryById = async (id) => {
  try {
    const [, { rows }] = await execSql(`select * from categories where id=?`, [
      id,
    ]);
    return rows.item(0);
  } catch (err) {
    console.log(err);
  }
};

export const updateCategory = async (data) => {
  if (data.id > 2)
    try {
      const oldData = await getCategoryById(data.id);
      const { name, color, type, id } = { ...oldData, ...stripObj(data) };
      await execSql(
        `
      update categories
        set name=?, color=?, type=? where id=?
      `,
        [name, color, type, id]
      );
      return await getCategoryById(id);
    } catch (err) {
      console.log(err);
    }
  else console.log("can't edit init categories");
};

export const deleteCategory = async (id) => {
  if (id > 2)
    try {
      const category = await getCategoryById(id);
      await execSql(`delete from categories where id=?`, [id]);
      return category;
    } catch (err) {
      console.log(err);
    }
  else console.log("can't delete init categories");
};

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
