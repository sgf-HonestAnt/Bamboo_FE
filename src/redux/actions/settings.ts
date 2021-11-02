import type { AppDispatch } from "../store";
import { BE_URL, GET, SET_CURR_USER } from "../../utils/constants";

// fetch('https://reqbin.com/echo/post/json', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({orderId: 1})
// })
//    .then(resp => resp.json())
//    .then( json => console.log(json))

export function fetchUserAction(token: string) {
  return async (dispatch: AppDispatch) => {
    const url = `${BE_URL}/users/me`;
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
        const { my_user, followedUsers } = await response.json();
        setTimeout(() => {
          dispatch({
            type: SET_CURR_USER,
            payload: {
              my_user: my_user,
              followedUsers: followedUsers,
            },
          });
        }, 1000);
      } else if (response.status === 401) {
        console.log("UNAUTHORIZED => TIME TO REFRESH TOKEN!")
      } else {
        console.log("error in try of fetchUserAction");
      }
    } catch (error) {
      console.log("error in catch of fetchUserAction", error);
    }
  };
}

export default fetchUserAction;
