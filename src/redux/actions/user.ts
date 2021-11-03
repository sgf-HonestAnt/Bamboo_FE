import type { AppDispatch } from "../store";
import {
  BE_URL,
  GET,
  USERS,
  FILL_USER,
  FILL_USER_ERROR,
  FILL_USER_LOADING,
} from "../../utils/constants";
import { SET_REFRESH_TOKEN } from "../../utils/constants";

export const setRefreshToken = (token: string) => ({
  type: SET_REFRESH_TOKEN,
  payload: token,
});

export const fillUserAction = () => {
  const token = localStorage.getItem("token");
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      const url = `${BE_URL}/${USERS}/me`;
      const method = GET;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(url, { method, headers });
      if (response.ok) {
        let body = await response.json();
        const payload = {
          my_user: body.my_user,
          followedUsers: body.followedUsers,
        };
        setTimeout(() => {
          dispatch({
            type: FILL_USER_LOADING,
            payload: false,
          });
        }, 1000);
        dispatch({
          type: FILL_USER_ERROR,
          payload: false,
        });
        dispatch({
          type: FILL_USER,
          payload,
        });
        console.log(`🥔user=${payload.my_user.username}`);
      } else {
        setTimeout(() => {
          dispatch({
            type: FILL_USER_LOADING,
            payload: false,
          });
        }, 1000);
        setTimeout(() => {
          dispatch({
            type: FILL_USER_ERROR,
            payload: true,
          });
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        dispatch({
          type: FILL_USER_LOADING,
          payload: false,
        });
      }, 1000);
      setTimeout(() => {
        dispatch({
          type: FILL_USER_ERROR,
          payload: true,
        });
      }, 1000);
    }
  };
};

// export function initialFetchUsers(token: string | null) {
//   return async (dispatch: AppDispatch) => {
//     console.log("initialFetchUsers");
//     const url = `${BE_URL}/${USERS}/me`;
//     const method = GET;
//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };
//     try {
//       const response = await fetch(url, {
//         method,
//         headers,
//       });
//       if (response.ok) {
//         console.log("🍓fetched", USERS);
//         const users = await response.json();
//         setTimeout(() => {
//           dispatch({
//             type: SET_CURR_USER,
//             payload: {
//               my_user: users.my_user,
//               followedUsers: users.followedUsers,
//             },
//           });
//           return users.my_user.username;
//         }, 1000);
//       } else if (response.status === 401) {
//         console.log("⏰TIME TO REFRESH TOKEN!");
//         localStorage.removeItem("token");
//         return null;
//       } else {
//         console.log("error in initialFetchUsers");
//       }
//     } catch (error) {
//       console.log("error in initialFetchUsers", error);
//     }
//   };
// }
