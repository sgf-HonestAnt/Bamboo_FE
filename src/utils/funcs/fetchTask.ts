import { Dispatch } from "redux";
import { loadTasksAction } from "../../redux/actions/tasks";
import { statusType, taskType } from "../../typings/types";
import { BE_URL, GET, TASKS } from "../constants";

const attemptFetchTask = async (id: string) => {
  const token = localStorage.getItem("token");
  try {
    const url = `${BE_URL}/${TASKS}/me/${id}`;
    const method = GET;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(url, { method, headers });
    if (response.ok) {
      const task = await response.json();
      return task;
    }
  } catch (error) {
    console.log(error);
  }
};

export default attemptFetchTask;
