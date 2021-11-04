import { AppDispatch } from "../../redux/store";
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

const updateTask = (id: string, taskUpdate: taskUpdateType) => {
  const token = localStorage.getItem("token");
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      console.log("✏️update task!", id, taskUpdate);
      const url = `${BE_URL}/${TASKS}/me/${id}`;
      const method = PUT;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const body = JSON.stringify(taskUpdate);
      const response = await fetch(url, { method, headers, body });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // const { accessToken, refreshToken } = await response.json();
        // localStorage.setItem("token", accessToken);
        // setRefreshToken(refreshToken);
        // history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export default updateTask;
