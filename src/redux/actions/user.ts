import type { AppDispatch } from "../store";
import {
  BE_URL,
  GET,
  USERS,
  FILL_USER,
  FILL_USER_ERROR,
  FILL_USER_LOADING,
  SET_EXPIRED,
} from "../../utils/constants";
import { SET_REFRESH_TOKEN } from "../../utils/constants";
import { History } from "history";
import attemptRefresh from "../../utils/funcs/refresh";

export const setExpired = (boolean: boolean) => ({
  type: SET_EXPIRED,
  payload: boolean,
});

export const setRefreshToken = (token: string) => ({
  type: SET_REFRESH_TOKEN,
  payload: token,
});

export const fillUserAction = (history: History<unknown>) => {
  const token = localStorage.getItem("token");
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      console.log("FILL USER ACTION");
      const url = `${BE_URL}/${USERS}/me`;
      const method = GET;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(url, { method, headers });
      console.log(response.status);
      if (response.status === 401) {
        console.log("SET EXPIRED");
        dispatch({
          type: SET_EXPIRED,
          payload: true,
        });
      } else if (response.ok) {
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
