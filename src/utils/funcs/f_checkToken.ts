import { History, Location } from "history";
import { BE_URL, GET, USERS } from "../const/str";
// import attemptRefresh from "./f_attemptRefresh";

const checkToken = async (
  refresh: string | undefined,
  history: History<unknown> | string[],
  location: Location<unknown> | undefined
) => {
  try {
    // check token still valid. If not, push to "/login"
    console.log("🙋Checking Token");
    const access = localStorage.getItem("token");
    const url = `${BE_URL}/${USERS}/test`;
    const method = GET;
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    const response = await fetch(url, { method, headers });
    if (response.ok) {
      const { username } = await response.json();
      return username;
    } else {
      history.push("/login");
    }
  } catch (e) {
    console.log(e);
  }
};
export default checkToken;
