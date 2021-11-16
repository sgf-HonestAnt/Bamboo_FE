import { History } from "history";
import { setRefreshToken } from "../../redux/actions/user";
import { BE_URL, POST, REGISTER, USERS } from "../constants";

type registrationForm = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
};

const attemptRegister = async (
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

export default attemptRegister;
