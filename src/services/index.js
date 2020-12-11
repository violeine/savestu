export const stripObj = (obj) => {
  for (let key in obj) if (obj[key] == null || obj[key] == "") delete obj[key];
  return obj;
};
