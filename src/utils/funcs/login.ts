import { History } from "history";
import { setRefreshToken } from "../../redux/actions/user";
import { BE_URL, POST, SESSION, USERS } from "../constants";

const attemptLogin = async (
  history: History<unknown> | string[],
  email = process.env.REACT_APP_DEV_USER_EMAIL,
  password = process.env.REACT_APP_DEV_USER_PASSWORD
) => { 
  try {
    console.log("🗝️attempt login!");
    const url = `${BE_URL}/${USERS}/${SESSION}`;
    const method = POST;
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({ email, password });
    const response = await fetch(url, { method, headers, body });
    if (response.ok) {
      const { accessToken, refreshToken } = await response.json();
      localStorage.setItem("token", accessToken);
      setRefreshToken(refreshToken);
      history.push("/");
    }
  } catch (error) {
    console.log(error);
  }
};

export default attemptLogin;
