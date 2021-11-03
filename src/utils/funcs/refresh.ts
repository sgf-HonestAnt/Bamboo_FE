import { History } from "history";
import { setRefreshToken } from "../../redux/actions/user";
import { BE_URL, POST, REFRESH, SESSION, USERS } from "../constants";

const attemptRefresh = async (history: History<unknown> | string[], token: string | undefined) => {
  if (token === undefined) {
    history.push("/login");
  } else {
    try {
      const data = { actualRefreshToken: token };
      const response = await fetch(`${BE_URL}/${USERS}/${SESSION}/${REFRESH}`, {
        method: POST,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const { accessToken, refreshToken } = await response.json();
        localStorage.setItem("token", accessToken);
        setRefreshToken(refreshToken);
      }
    } catch (error) {
      console.log("error in fetching refreshToken", error);
    }
  }
};

export default attemptRefresh;
