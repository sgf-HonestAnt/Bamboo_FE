import type { AppDispatch } from "../store";
import {
  BE_URL,
  GET,
  ACHIEVEMENTS,
  FILL_ACHIEVEMENTS,
  FILL_ACHIEVEMENTS_ERROR,
  FILL_ACHIEVEMENTS_LOADING,
  SET_SUPERLIST,
} from "../../utils/constants";
import { History } from "history";
import attemptRefresh from "../../utils/funcs/refresh";

export const setSuperlist = (superlist: string[]) => ({
  type: SET_SUPERLIST,
  payload: { superlist, loading: true },
});

export const fillAchievementsAction = (
  history: History<unknown>,
  refreshToken: string | undefined
) => {
  const token = localStorage.getItem("token");
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      const url = `${BE_URL}/${ACHIEVEMENTS}/me`;
      const method = GET;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(url, { method, headers });
      if (response.ok) {
        let body = await response.json();
        const payload = { ...body };
        setTimeout(() => {
          dispatch({
            type: FILL_ACHIEVEMENTS_LOADING,
            payload: false,
          });
        }, 1000);
        dispatch({
          type: FILL_ACHIEVEMENTS_ERROR,
          payload: false,
        });
        dispatch({
          type: FILL_ACHIEVEMENTS,
          payload,
        });
        console.log(`🥔achievements=${payload.list.length}`);
      } else if (response.status === 401) {
        await attemptRefresh(history, refreshToken);
      } else {
        setTimeout(() => {
          dispatch({
            type: FILL_ACHIEVEMENTS_LOADING,
            payload: false,
          });
        }, 1000);
        setTimeout(() => {
          dispatch({
            type: FILL_ACHIEVEMENTS_ERROR,
            payload: true,
          });
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        dispatch({
          type: FILL_ACHIEVEMENTS_LOADING,
          payload: false,
        });
      }, 1000);
      setTimeout(() => {
        dispatch({
          type: FILL_ACHIEVEMENTS_ERROR,
          payload: true,
        });
      }, 1000);
    }
  };
};
