import { History } from "history";
import { setRefreshToken } from "../../redux/actions/user";
import { BE_URL, POST, REFRESH, SESSION, USERS } from "../constants";

const attemptRefresh = async (
  history: History<unknown> | string[],
  token: string | undefined
) => {
  if (token === undefined) {
    history.push("/login");
  } else {
    try {
      console.log("⏰attempt refresh!");
      const url = `${BE_URL}/${USERS}/${SESSION}/${REFRESH}`;
      const method = POST;
      const headers = { "Content-Type": "application/json" };
      const body = JSON.stringify({ actualRefreshToken: token });
      const response = await fetch(url, { method, headers, body });
      if (response.ok) {
        const { accessToken, refreshToken } = await response.json();
        localStorage.setItem("token", accessToken);
        setRefreshToken(refreshToken);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export default attemptRefresh;
