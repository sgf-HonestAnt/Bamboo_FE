export const createColorArray = (
  customColors: string[],
  categories: string[],
  setCategoryColors: any
) => {
  let array = [];
  for (let i = 0; i < categories.length; i++) {
    array.push(customColors[i]);
  }
  setCategoryColors(array);
};
