import { Dispatch } from "redux";
import { ACHIEVEMENTS, BE_URL, POST } from "./appConstants";

export const attemptPostAchievement = async (item: string, dispatch: Dispatch<any>) => {
  const token = localStorage.getItem("token");
  try {
    // post an achievement
    // 💡 push achievement to list so it shows up straightaway!
    console.log("ATTEMPTING TO POST AN ACHIEVEMENT")
    const url = `${BE_URL}/${ACHIEVEMENTS}/me`;
    const method = POST;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({item});
    console.log(body);
    const response = await fetch(url, { method, headers, body });
    if (response.ok) {
        console.log("NOW LOAD ACHIEVEMENTS")
    }
  } catch (error) {
    console.log(error);
  }
};
