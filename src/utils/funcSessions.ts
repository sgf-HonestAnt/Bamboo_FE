import { History } from "history";
import { Dispatch } from "redux";
import { setRefreshToken } from "../redux/actions/user";
import { BE_URL, POST, REGISTER, DELETE, SESSION, USERS } from "./constants";
 
type registrationForm = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
};

export const attemptRegister = async (
  history: History<unknown> | string[],
  form: registrationForm
) => {
  try {
    console.log("✔️attempt registration!", form);
    const url = `${BE_URL}/${USERS}/${REGISTER}`;
    const method = POST;
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify(form);
    const response = await fetch(url, { method, headers, body });
    const { accessToken, refreshToken } = await response.json();
    localStorage.setItem("token", accessToken);
    setRefreshToken(refreshToken);
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const attemptLogin = async (
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
        localStorage.setItem("token", accessToken);
      }, 1000);
      setTimeout(() => {
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

export const attemptLogout = async () => {
  const token = localStorage.getItem("token");
  try {
    console.log("🛎️attempt logout!");
    const url = `${BE_URL}/${USERS}/${SESSION}`;
    const method = DELETE;
    const headers = { Authorization: `Bearer ${token}` };
    const response = await fetch(url, { method, headers });
    if (response.ok) {
      localStorage.removeItem("token");
    }
  } catch (error) {
    console.log(error);
  }
};
