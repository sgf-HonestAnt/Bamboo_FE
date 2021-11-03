import { History } from "history";
import { setRefreshToken } from "../../redux/actions/user";
import { BE_URL, POST, SESSION, USERS } from "../constants";

const login = async (
  history: History<unknown> | string[],
  email = process.env.REACT_APP_DEV_USER_EMAIL,
  password = process.env.REACT_APP_DEV_USER_PASSWORD
) => {
  try {
    const data = { email, password };
    const response = await fetch(`${BE_URL}/${USERS}/${SESSION}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const { accessToken, refreshToken } = await response.json();
      localStorage.setItem("token", accessToken);
      setRefreshToken(refreshToken);
      history.push("/");
    }
  } catch (error) {
    console.log("error in fetching refreshToken", error);
  }
};

export default login;
