import type { AppDispatch } from "../store";
import {
  BE_URL,
  GET,
  USERS,
  FILL_USER,
  FILL_USER_ERROR,
  FILL_USER_LOADING,
  SET_USER_AVATAR,
  SET_USER_FIRST_NAME,
  SET_USER_LAST_NAME,
  SET_USER_USERNAME,
  SET_USER_BIO,
  SET_USER_EMAIL,
  SET_USER_LEVEL,
  SET_USER_POINTS,
} from "../../utils/appConstants";
import { SET_REFRESH_TOKEN } from "../../utils/appConstants";

export const setUserAvatar = (avatar: string | undefined) => ({
  type: SET_USER_AVATAR,
  payload: avatar,
});
export const setUserFirstName = (first_name: string | undefined) => ({
  type: SET_USER_FIRST_NAME,
  payload: first_name,
});
export const setUserLastName = (last_name: string | undefined) => ({
  type: SET_USER_LAST_NAME,
  payload: last_name,
});
export const setUsername = (username: string | undefined) => ({
  type: SET_USER_USERNAME,
  payload: username,
});
export const setUserBio = (bio: string | undefined) => ({
  type: SET_USER_BIO,
  payload: bio,
});
export const setUserEmail = (email: string | undefined) => ({
  type: SET_USER_EMAIL,
  payload: email,
});
export const setUserLevel = (level: number) => ({
  type: SET_USER_LEVEL,
  payload: level,
});
export const setUserPoints = (xp: number) => ({
  type: SET_USER_POINTS,
  payload: xp,
});
export const setUserTotalPoints = (total_xp: number) => ({
  type: SET_USER_POINTS,
  payload: total_xp,
});
export const setUserLoading = (boolean: boolean) => ({
  type: FILL_USER_LOADING,
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
export const fillUserAction = (tokenPar?: string) => {
  return async (dispatch: AppDispatch, getState: any) => {
    const token = tokenPar || localStorage.getItem("token");
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
