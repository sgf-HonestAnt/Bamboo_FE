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
import attemptRefresh from "../../utils/funcs/refresh";
import { History } from "history";

export const setRefreshToken = (token: string) => ({
  type: SET_REFRESH_TOKEN,
  payload: token,
});

export const fillUserAction = (history: History<unknown>, refreshToken: string | undefined) => {
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
      } else if (response.status===401) {
        await attemptRefresh(history, refreshToken)
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
