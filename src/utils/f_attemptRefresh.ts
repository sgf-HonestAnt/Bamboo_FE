import { History } from "history";
import { setRefreshToken, setUserError } from "../redux/actions/user";
import { BE_URL, POST, REFRESH, SESSION, USERS } from "./constants/str";

const attemptRefresh = async (
  history: History<unknown> | string[],
  token: string | undefined
) => {
  try {
    console.log("🙋Refreshing Token");
    // NOT IN USE // NOT IN USE // NOT IN USE
    const url = `${BE_URL}/${USERS}/${SESSION}/${REFRESH}`;
    const method = POST;
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({ actualRefreshToken: token });
    const response = await fetch(url, { method, headers, body });
    if (response.ok) {
      const newTokens = await response.json();
      const { accessToken, refreshToken } = newTokens;
      // console.log(newTokens);
      localStorage.setItem("token", accessToken);
      setRefreshToken(refreshToken);
      setUserError(false);
      return newTokens;
    }
  } catch (error) { 
    console.log("😥TROUBLE REFRESHING", error)
    history.push("/login");
  }
};
export default attemptRefresh;
