import { execSql } from "./utils";
import { stripObj } from "../services";

export const createCategory = async ({ name, color }) => {
  try {
    const [
      ,
      { insertId },
    ] = await execSql(`insert into categories (name, color) values (?,?)`, [
      name,
      color,
    ]);
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
      const { name, color, id } = { ...oldData, ...stripObj(data) };
      await execSql(
        `
      update categories
        set name=?, color=? where id=?
      `,
        [name, color, id]
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
