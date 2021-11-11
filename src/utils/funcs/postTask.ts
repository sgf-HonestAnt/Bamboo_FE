import { History } from "history";
import { setTaskInt } from "../../typings/interfaces";
import { BE_URL, POST, TASKS, ME } from "../constants";
import checkToken from "./checkToken";

const attemptPostTask = async (
  form: setTaskInt,
  refreshToken: string | undefined,
  history: string[] | History<unknown>
) => {
  try {
    const token = localStorage.getItem("token");
    const username = await checkToken(token, refreshToken, history);
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
      if (response.ok) {
        const newTask = await response.json();
        return newTask;
      }
    }
  } catch (error) {
    console.log(error);
    history.push("/login");
  }
};

export default attemptPostTask;
