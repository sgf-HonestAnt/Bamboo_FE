import { History } from "history";
import { setExpired, setRefreshToken } from "../../redux/actions/user";
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
        const newTokens = await response.json();
        console.log("🗝️NEW TOKENS=>", newTokens);
        localStorage.setItem("token", newTokens.accessToken);
        setRefreshToken(newTokens.refreshToken);
        setExpired(false); 
        setTimeout(() => {
          history.push("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export default attemptRefresh;
