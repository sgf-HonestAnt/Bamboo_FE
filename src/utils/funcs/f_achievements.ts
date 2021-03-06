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
    const url = `${ENDPOINT_MYACH}`;
    const method = POST;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({ item, category });
    const response = await fetch(url, { method, headers, body });
    await response.json();
  } catch (error) {
    console.log(error);
  }
};
