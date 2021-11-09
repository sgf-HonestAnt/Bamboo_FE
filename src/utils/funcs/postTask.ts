import { setTaskInt } from "../../typings/interfaces";
import { BE_URL, POST, TASKS } from "../constants";

const attemptPostTask = async (form: setTaskInt) => {
  try {
    console.log("✏️attempt post task!");
    const token = localStorage.getItem("token");
    const url = `${BE_URL}/${TASKS}/ME`;
    const method = POST;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const body = JSON.stringify(form);
    const response = await fetch(url, { method, headers, body });
    if (response.ok) {
      return response.json;
    }
  } catch (error) {
    console.log(error);
  }
};

export default attemptPostTask;
