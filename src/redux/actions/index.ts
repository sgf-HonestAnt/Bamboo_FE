import type { AppDispatch } from "../store";
import {
  ACHIEVEMENTS,
  BE_URL,
  GET,
  SETTINGS,
  SET_ACHIEVEMENTS,
  SET_CURR_USER,
  SET_SETTINGS,
  SET_TASKS,
  TASKS,
  USERS,
} from "../../utils/constants";

// fetch('https://reqbin.com/echo/post/json', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({orderId: 1})
// })
//    .then(resp => resp.json())
//    .then( json => console.log(json))

export function initialFetchAction(token: string, type: string) {
  return async (dispatch: AppDispatch) => {
    const endpoint = type === SETTINGS ? "users/me/settings" : `${type}/me`;
    const url = `${BE_URL}/${endpoint}`;
    const method = GET;
    const headers = {
      // Content-Type: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await fetch(url, {
        method,
        headers,
      });
      if (response.ok) {
        const fetched =
          type === USERS
            ? "🍓fetched"
            : type === TASKS
            ? "🍏fetched"
            : type === ACHIEVEMENTS
            ? "🍌fetched"
            : "🥕fetched";
        console.log(fetched, type);
        const body = await response.json();
        const dispatchType =
          type === USERS
            ? SET_CURR_USER
            : type === TASKS
            ? SET_TASKS
            : type === ACHIEVEMENTS
            ? SET_ACHIEVEMENTS
            : SET_SETTINGS;
        const payload =
          type === USERS
            ? {
                my_user: body.my_user,
                followedUsers: body.followedUsers,
              }
            : type === TASKS
            ? { ...body }
            : type === ACHIEVEMENTS
            ? { ...body }
            : { ...body };
        setTimeout(() => {
          dispatch({
            type: dispatchType,
            payload,
          });
        }, 1000);
      } else if (response.status === 401) {
        console.log("TIME TO REFRESH TOKEN!");
      } else {
        console.log("error in try of initialFetchAction");
      }
    } catch (error) {
      console.log("error in catch of initialFetchAction", error);
    }
  };
}

export default initialFetchAction;
