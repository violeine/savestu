export const stripObj = (obj) => {
  for (let key in obj) if (obj[key] == null) delete obj[key];
  return obj;
};
