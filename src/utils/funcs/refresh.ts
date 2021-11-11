import { History } from "history";
import { setRefreshToken, setUserError } from "../../redux/actions/user";
import { BE_URL, POST, REFRESH, SESSION, USERS } from "../constants";

const attemptRefresh = async (
  history: History<unknown> | string[],
  token: string | undefined
) => {
  try {
    console.log("⏰REFRESH");
    const url = `${BE_URL}/${USERS}/${SESSION}/${REFRESH}`;
    const method = POST;
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({ actualRefreshToken: token });
    const response = await fetch(url, { method, headers, body });
    if (response.ok) {
      const newTokens = await response.json();
      console.log(newTokens);
      localStorage.setItem("token", newTokens.accessToken);
      setRefreshToken(newTokens.refreshToken);
      setUserError(false);
    }
  } catch (error) {
    console.log(error);
    history.push("/login");
  }
};

export default attemptRefresh;
