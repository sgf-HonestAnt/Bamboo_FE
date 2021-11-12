import { History } from "history";
import { Dispatch } from "redux";
import { setRefreshToken } from "../../redux/actions/user";
import { BE_URL, POST, SESSION, USERS } from "../constants";

const attemptLogin = async (
  history: History<unknown> | string[],
  dispatch: Dispatch<any>,
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
      setTimeout(() => {
        // console.log("SETTING ACCESSTOKEN", accessToken)
        localStorage.setItem("token", accessToken);
      }, 1000);
      setTimeout(() => {
        // console.log("SETTING REFRESH TOKEN", refreshToken)
        dispatch(setRefreshToken(refreshToken)); // THIS IS NOT WORKING!
      }, 1000);
      setTimeout(() => {
        history.push("/");
      }, 1000);
    } else {
      console.log("😥TROUBLE LOGGING IN")
      history.push("/login");
    }
  } catch (error) {
    console.log(error);
  }
};

export default attemptLogin;
