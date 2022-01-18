import { Dispatch } from "redux";
import { achievementInt } from "../../typings/interfaces";
import { ENDPOINT_MYACH, POST } from "../const/str";

export const attemptPostAchievement = async (
  item: string,
  category: string,
  dispatch: Dispatch<any>,
  achievements: achievementInt[]
) => {
  // console.log("🙋Posting New Achievement");
  const token = localStorage.getItem("token");
  try {
    // post an achievement
    // 💡 push achievement to list so it shows up straightaway!
    const url = `${ENDPOINT_MYACH}`;
    const method = POST;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({ item, category });
    // console.log(body)
    const response = await fetch(url, { method, headers, body });
    const responseAsJSON = await response.json();
    if (response.ok) {
      console.log("NOW LOAD ACHIEVEMENTS???", responseAsJSON);
    }
  } catch (error) {
    console.log(error);
  }
};
