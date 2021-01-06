import { execSql } from "./utils";
export {
  createCategory,
  getCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "./crud";

export const getCategoryByCard = async (card) => {
  try {
    const [, { rows }] = await execSql(
      `
      SELECT c.*, SUM(
        CASE
          WHEN t.card=? AND t.cash < 0 THEN -t.cash
          WHEN t.card=? AND t.cash > 0 THEN t.cash
          ELSE 0
        END) sum FROM categories c
      LEFT JOIN transactions t ON c.id = t.category
      GROUP BY c.id, c.name, c.color
      ORDER BY sum DESC
    `,
      [card, card]
    );
    return {
      categories: rows._array,
      name: rows._array.map((i) => i.name),
      color: rows._array
        .filter((i) => i.sum != 0 && i.type == "expense")
        .map((i) => i.color),
      sum: rows._array
        .filter((i) => i.sum != 0 && i.type == "expense")
        .map((i) => i.sum),
      income: rows._array.reduce((acc, el) => {
        if (el.type == "income") {
          return acc + el.sum;
        }
        return acc;
      }, 0),
      expense: rows._array.reduce((acc, el) => {
        if (el.type == "expense") {
          return acc + el.sum;
        }
        return acc;
      }, 0),
    };
  } catch (err) {
    console.log(err);
  }
};

export const getCategoryByCardAndDate = async ({ card, date }) => {
  try {
    const [, { rows }] = await execSql(
      `
      SELECT c.*, SUM(
        CASE
          WHEN t.card=? AND t.date=? AND t.cash < 0 THEN -t.cash
          WHEN t.card=? AND t.date=? AND t.cash > 0 THEN t.cash
          ELSE 0
        END) sum FROM categories c
      LEFT JOIN transactions t ON c.id = t.category
      GROUP BY c.id, c.name, c.color
      ORDER BY sum DESC
    `,
      [card, date, card, date]
    );
    return {
      categories: rows._array,
      name: rows._array.map((i) => i.name),
      color: rows._array
        .filter((i) => i.sum != 0 && i.type == "expense")
        .map((i) => i.color),
      sum: rows._array
        .filter((i) => i.sum != 0 && i.type == "expense")
        .map((i) => i.sum),
      income: rows._array.reduce((acc, el) => {
        if (el.type == "income") {
          return acc + el.sum;
        }
        return acc;
      }, 0),
      expense: rows._array.reduce((acc, el) => {
        if (el.type == "expense") {
          return acc + el.sum;
        }
        return acc;
      }, 0),
    };
  } catch (err) {
    console.log(err);
  }
};
