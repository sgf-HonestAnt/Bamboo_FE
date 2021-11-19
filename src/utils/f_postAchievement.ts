import { Dispatch } from "redux";
import { ACHIEVEMENTS, BE_URL, POST } from "./constants";

// 💡ADD ACHIEVEMENT TO REDUX UNTIL THE NEXT FETCH IS PERFORMED!
const postAchievement = async (item: string, dispatch: Dispatch<any>) => {
  const token = localStorage.getItem("token");
  try {
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
      // const updated = await response.json();
      // console.log("response was ok", updated);
      // dispatch(loadTasksAction(true));
    }
  } catch (error) {
    console.log(error);
  }
};
export default postAchievement;
