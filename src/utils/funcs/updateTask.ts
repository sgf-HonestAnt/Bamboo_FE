import { Dispatch } from "redux";
import { loadTasksAction } from "../../redux/actions/tasks";
import { statusType, taskType } from "../../typings/types";
import { BE_URL, COMPLETED, PUT, TASKS } from "../constants";
import postAchievement from "../f_postAchievement";
import attemptFetchTask from "./fetchTask";

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
  const { status } = taskUpdate;
  console.log(taskUpdate);
  try {
    console.log("ATTEMPTING TO UPDATE TASK STATUS", id);
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
      if (status === COMPLETED) {
        console.log("STATUS WAS COMPLETED, LET US POST ACHIEVEMENT FOR", id);
        const { title } = await attemptFetchTask(id);
        await postAchievement(title, dispatch);
      }
      dispatch(loadTasksAction(true));
    }
  } catch (error) {
    console.log(error);
  }
};

export default updateTask;
