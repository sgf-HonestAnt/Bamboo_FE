import { Dispatch } from "redux";
import { loadTasksAction } from "../../redux/actions/tasks";
import { statusType, taskType } from "../../typings/types";
import { BE_URL, PUT, TASKS } from "../constants";

type taskUpdateType = {
  category?: string;
  title?: string;
  image?: string;
  desc?: string;
  type?: taskType | string;
  value?: number;
  sharedWith?: string[];
  status?: statusType | string;
  deadline?: string;
};

const updateTask = async (
  id: string,
  taskUpdate: taskUpdateType,
  dispatch: Dispatch<any>
) => {
  const token = localStorage.getItem("token");
  console.log(taskUpdate);
  try {
    const url = `${BE_URL}/${TASKS}/me/${id}`;
    const method = PUT;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const body = JSON.stringify(taskUpdate);
    console.log(body);
    const response = await fetch(url, { method, headers, body });
    if (response.ok) {
      // const updated = await response.json();
      // console.log("response was ok", updated);
      dispatch(loadTasksAction(true));
    }
  } catch (error) {
    console.log(error);
  }
};

export default updateTask;
