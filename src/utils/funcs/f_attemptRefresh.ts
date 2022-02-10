import { History } from "history";
import { setRefreshToken, setUserError } from "../../redux/actions/user";
import { ENDPOINT_REFRESH, POST } from "../const/str";

const attemptRefresh = async ( // NOT IN USE
  history: History<unknown> | string[],
  token: string | undefined
) => {
  try {
    // console.log("🙋Refreshing Token");
    const url = `${ENDPOINT_REFRESH}`;
    const method = POST;
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({ actualRefreshToken: token });
    const response = await fetch(url, { method, headers, body });
    if (response.ok) {
      const newTokens = await response.json();
      const { accessToken, refreshToken } = newTokens;
      localStorage.setItem("token", accessToken);
      setRefreshToken(refreshToken);
      setUserError(false);
      return newTokens;
    }
  } catch (error) {
    console.log("😥TROUBLE REFRESHING", error);
    history.push("/login");
  }
};
export default attemptRefresh;
