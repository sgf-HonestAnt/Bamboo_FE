import { History, Location } from "history";
import { BE_URL, GET, USERS } from "./appConstants";
// import attemptRefresh from "./f_attemptRefresh";

const checkToken = async (
  refresh: string | undefined,
  history: History<unknown> | string[],
  location: Location<unknown> | undefined
) => {
  try {
    // check token still valid. If not, push to "/login"
    const access = localStorage.getItem("token");
    const url = `${BE_URL}/${USERS}/test`;
    const method = GET;
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    const response = await fetch(url, { method, headers });
    if (response.ok) {
      console.log("🗝️CHECKED TOKEN");
      const { username } = await response.json();
      return username;
    } else {
      console.log("⏰TOKEN EXPIRED");
      history.push("/login");
    }
  } catch (e) {
    console.log(e);
  }
};
export default checkToken;
