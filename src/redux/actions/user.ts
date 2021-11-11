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

export const setExpired = (boolean: boolean) => ({
  type: SET_EXPIRED,
  payload: boolean,
});

export const setUserError = (boolean: boolean) => ({
  type: FILL_USER_ERROR,
  payload: boolean,
});

export const setRefreshToken = (token: string) => ({
  type: SET_REFRESH_TOKEN,
  payload: token,
});

export const fillUserAction = (token: string) => {
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      const url = `${BE_URL}/${USERS}/me`;
      const method = GET;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(url, { method, headers });
      if (response.ok) {
        let data = await response.json();
        const payload = {
          my_user: data.my_user,
          followedUsers: data.followedUsers,
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
