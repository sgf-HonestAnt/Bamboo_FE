import { History } from "history";
import { BE_URL, GET, USERS } from "../constants";
import attemptRefresh from "./refresh"; 

const checkToken = async (access: string | null, refresh: string | undefined, history: History<unknown> | string[]) => {
  try { 
    const url = `${BE_URL}/${USERS}/test`;
    const method = GET;
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    const response = await fetch(url, { method, headers });
    if (response.ok) {
      console.log("🗝️TOKEN");
      const { username } = await response.json();
      return username;
    } else if (response.status === 401) {
      await attemptRefresh(history, refresh);
      setTimeout(() => {
        history.push("/");
      }, 1000);
    } else {
      history.push("/login");
    }
  } catch (e) {
    console.log(e);
  }
};

export default checkToken;
