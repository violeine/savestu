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
      SELECT c.*, SUM(CASE WHEN t.card=? AND t.cash < 0 THEN t.cash ELSE 0 END) sum FROM categories c
      LEFT JOIN transactions t ON c.id = t.category
      GROUP BY c.id, c.name, c.color
    `,
      [card]
    );
    return {
      categories: rows._array,
      name: rows._array.map((i) => i.name),
      color: rows._array.filter(i => i.sum != 0).map((i) => i.color),
      sum: rows._array.map((i) => i.sum).filter(i => i!= 0),
      income:rows._array.reduce((acc, el) => {
        if (el.type =="income") {
          return acc+el.sum
        }
        return acc;
      },0),
      expense:rows._array.reduce((acc, el) => {
        if (el.type =="expense") {
          return acc+el.sum
        }
        return acc;
      },0)

    };
  } catch (err) {
    console.log(err);
  }
};
