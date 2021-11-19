import { taskInt } from "../typings/interfaces";

const getCategories = async (tasks: taskInt[]) => {
  let array: string[] = []
  for (let i = 0; i < tasks.length; i++) {
    !array.includes(tasks[i].category) && array.push(tasks[i].category);
  }
  return array;
};
export default getCategories;
