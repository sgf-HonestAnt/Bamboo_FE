import { BE_URL, GET, TASKS } from "../constants";

const fetchTasksByQuery = async (criteria: string) => {
  try {
    const url = `${BE_URL}/${TASKS}/query?${criteria}&sort=deadline&offset=10&limit=10`;
    const method = GET;
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(url, { method, headers });
    if (response.ok) {
      const tasks = await response.json();
      return tasks;
    }
  } catch (error) {
    console.log(error);
  }
};

export default fetchTasksByQuery;