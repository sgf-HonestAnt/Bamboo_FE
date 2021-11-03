import { History } from "history";
import { Dispatch, AnyAction } from "redux";
// import initialFetchAction, { initialFetchUsers } from "../../redux/actions";
import { userInt } from "../../typings/interfaces";
import { TASKS } from "../constants";
import refreshSession from "./refresh"; 

// const loadMain = async (
//   user: userInt,
//   dispatch: (
//     arg0: (dispatch: Dispatch<AnyAction>) => Promise<null | undefined>
//   ) => any,
//   history: History<unknown> | string[]
// ) => {
//   const token = localStorage.getItem("token");
//   if (user) {
//     const { refreshToken } = user;
//     if (!token && refreshToken) {
//       await refreshSession(refreshToken);
//     } else if (!token && !refreshToken) {
//       history.push("/login");
//     } else {
//       const username = await dispatch(initialFetchUsers(token));
//       if (!username) {
//         await refreshSession(refreshToken!);
//         // dispatch(initialFetchAction(token, refreshToken, TASKS));
//       } else {
//         console.log(username); 
//       }
//       // dispatch(initialFetchAction(token, refreshToken, ACHIEVEMENTS));
//       // dispatch(initialFetchAction(token, refreshToken, SETTINGS));
//       // dispatch(setFeatures());
//       // console.log(`🥔${username} successfully logged in`);
//       // console.log(`🥔${username} has ${tasks.awaited.length} awaited tasks`);
//       // console.log(`🥔${username} has ${achievements.list.length} achievements`);
//       // console.log(`🥔${username} has ${followedUsers.length} followed users`);
//       // console.log(`🥔Found ${curr_features.total} features`);
//     }
//   } else {
//     console.log("no user at loadmain");
//   }
// };

// export default loadMain;
