import { Dispatch } from "redux";
import { setNewAchievement } from "../redux/actions/achievements";
import { achievementInt } from "../typings/interfaces";
import { ACHIEVEMENTS, BE_URL, POST } from "./appConstants";

export const attemptPostAchievement = async (
  item: string,
  category: string,
  dispatch: Dispatch<any>,
  achievements: achievementInt[]
) => {
  const token = localStorage.getItem("token");
  try {
    // post an achievement
    // 💡 push achievement to list so it shows up straightaway!
    console.log("ATTEMPTING TO POST AN ACHIEVEMENT");
    const url = `${BE_URL}/${ACHIEVEMENTS}/me`;
    const method = POST;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({ item, category });
    // console.log(body);
    const response = await fetch(url, { method, headers, body });
    const responseAsJSON = await response.json();
    if (response.ok) {
      console.log("NOW LOAD ACHIEVEMENTS", responseAsJSON);
      // const achievementsList = achievements.push(responseAsJSON);
      // setNewAchievement(achievementsList);
    }
  } catch (error) {
    console.log(error);
  }
};
