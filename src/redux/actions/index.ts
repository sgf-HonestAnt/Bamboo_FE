import type { AppDispatch } from "../store";
import { ACHIEVEMENTS } from "../../utils/constants";

// export function initialFetchUsers(
//   token: string | null
// ) {
//   return async (dispatch: AppDispatch) => {
//     console.log("initialFetchUsers")
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
//           // dispatch({
//           //   type: SET_CURR_USER,
//           //   payload: {
//           //     my_user: users.my_user,
//           //     followedUsers: users.followedUsers,
//           //   },
//           // });
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

// export function initialFetchAction(
//   token: string | null,
//   refreshToken: string | undefined,
//   type: string
// ) {
//   return async (dispatch: AppDispatch) => {
//     const endpoint = type === SETTINGS ? "users/me/settings" : `${type}/me`;
//     const url = `${BE_URL}/${endpoint}`;
//     const method = GET;
//     const headers = {
//       // Content-Type: 'application/json',
//       Authorization: `Bearer ${token}`,
//     };
//     try {
//       const response = await fetch(url, {
//         method,
//         headers,
//       });
//       if (response.ok) {
//         const fetched =
//           type === USERS
//             ? "🍓fetched"
//             : type === TASKS
//             ? "🍏fetched"
//             : type === ACHIEVEMENTS
//             ? "🍌fetched"
//             : "🥕fetched";
//         console.log(fetched, type);
//         const body = await response.json();
//         const dispatchType =
//           type === TASKS
//             ? SET_TASKS
//             : type === ACHIEVEMENTS
//             ? SET_ACHIEVEMENTS
//             : SET_SETTINGS;
//         const payload =
//           type === USERS
//             ? {
//                 my_user: body.my_user,
//                 followedUsers: body.followedUsers,
//               }
//             : type === TASKS
//             ? { ...body }
//             : type === ACHIEVEMENTS
//             ? { ...body }
//             : { ...body };
//         setTimeout(() => {
//           dispatch({
//             type: dispatchType,
//             payload,
//           });
//         }, 1000);
//       } else if (response.status === 401) {
//         console.log("⏰TIME TO REFRESH TOKEN!");
//         localStorage.removeItem("token");
//       } else {
//         console.log("error in try of initialFetchAction");
//       }
//     } catch (error) {
//       console.log("error in catch of initialFetchAction", error);
//     }
//   };
// }

// export default initialFetchAction;
