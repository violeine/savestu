import { execSql } from "./utils";
import { stripObj } from "../services";

export const createCategory = async ({ name, type }) => {
  await execSql(`insert into categories (name, type) values (?,?)`, [
    name,
    type,
  ]);
  return await getCategory();
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
  const [, { rows }] = await execSql(`select * from categories where id=?`, [
    id,
  ]);
  return rows.item(0);
};

export const updateCategory = async (data) => {
  if (data.id != 1) {
    const oldData = getCategoryById(data.id);
    const { name, type, id } = { ...oldData, ...stripObj(data) };
    await execSql(
      `
      update categories
        set name=?, type=? where id=?
      `,
      [name, type, id]
    );
  } else console.log('can\'t edit category "init"');
  return await getCategory();
};

export const deleteCategory = async (id) => {
  if (id != 1)
    try {
      await execSql(`delete from categories where id=?`, [id]);
    } catch (err) {
      console.log(err);
    }
  else console.log('can\'t delete category "init"');
  return await getCategory();
};
