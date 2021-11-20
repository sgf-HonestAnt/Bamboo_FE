import { BE_URL, GET, TASKS } from "./constants";

export const getTasks = async () => {
  const token = localStorage.getItem("token");
  try {
    const url = `${BE_URL}/${TASKS}/me`;
    const method = GET;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(url, { method, headers });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
// export const getTasksWithoutDeadline /me/null with access token!!
export const getTaskByDeadline = async (par: string | null) => {
  const tasks = await getTasks();
  const { awaited, in_progress } = tasks;
  const allTasks = awaited.concat(in_progress);
  const filtered = allTasks.filter(
    (t: { deadline: string | null }) => t.deadline === par
  );
  return filtered;
};
export const getAllTasks = async () => {
  try {
    const url = `${BE_URL}/${TASKS}/query`;
    const method = GET;
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(url, { method, headers });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getTaskByQuery = async (criteria: string, _id: string) => {
  try {
    const url = `${BE_URL}/${TASKS}/query?createdBy=${_id}&${criteria}`;
    const method = GET;
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(url, { method, headers });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
