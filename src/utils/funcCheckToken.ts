import { History, Location } from "history";
import { BE_URL, GET, USERS } from "./constants";
import attemptRefresh from "./funcRefresh";

const checkToken = async (
  refresh: string | undefined,
  history: History<unknown> | string[],
  location: Location<unknown> | undefined
) => {
  try {
    const access = localStorage.getItem("token");
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
      console.log("⏰TOKEN EXPIRED");
      const { refreshToken } = await attemptRefresh(history, refresh);
      setTimeout(() => {
        console.log("🙈CHECKING TOKEN AT=>", location?.pathname);
        location?.pathname !== "/tasks-add-new" && history.push("/");
        return refreshToken;
      }, 1000);
    } else {
      console.log("😥TROUBLE CHECKING TOKEN");
      history.push("/login");
    }
  } catch (e) {
    console.log(e);
  }
};

export default checkToken;
