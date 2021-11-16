import { History, Location } from "history";
import { setTaskInt } from "../../typings/interfaces";
import { BE_URL, POST, TASKS, ME } from "../constants";
import checkToken from "./checkToken";
import { getCurrDate } from "./dateTimeFuncs";

const attemptPostTask = async (
  form: setTaskInt,
  refreshToken: string | undefined,
  history: string[] | History<unknown>,
  location: Location<unknown> | undefined,
  setErrorMessage: any
) => {
  try {
    const token = localStorage.getItem("token");
    const username = await checkToken(refreshToken, history, location);
    if (username) {
      console.log("✏️attempt post task!");
      const url = `${BE_URL}/${TASKS}/${ME}`;
      const method = POST;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const body = JSON.stringify(form);
      const response = await fetch(url, { method, headers, body });
      const newTask = await response.json();
      return newTask;
    }
  } catch (error) {
    console.log("😥TROUBLE POSTING TASK", error);
    history.push("/login");
  }
};

export default attemptPostTask;
