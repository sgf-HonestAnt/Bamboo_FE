import type { AppDispatch } from "../store";
import {
  BE_URL,
  GET,
  USERS,
  SETTINGS,
  FILL_SETTINGS,
  FILL_SETTINGS_ERROR,
  FILL_SETTINGS_LOADING,
} from "../../utils/constants";

export const fillSettingsAction = () => {
  const token = localStorage.getItem("token");
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      const url = `${BE_URL}/${USERS}/me/${SETTINGS}`;
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
            type: FILL_SETTINGS_LOADING,
            payload: false,
          });
        }, 1000);
        dispatch({
          type: FILL_SETTINGS_ERROR,
          payload: false,
        });
        dispatch({
          type: FILL_SETTINGS,
          payload,
        });
        console.log(`🥔theme=${payload.selectedTheme}`);
      } else {
        setTimeout(() => {
          dispatch({
            type: FILL_SETTINGS_LOADING,
            payload: false,
          });
        }, 1000);
        setTimeout(() => {
          dispatch({
            type: FILL_SETTINGS_ERROR,
            payload: true,
          });
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        dispatch({
          type: FILL_SETTINGS_LOADING,
          payload: false,
        });
      }, 1000);
      setTimeout(() => {
        dispatch({
          type: FILL_SETTINGS_ERROR,
          payload: true,
        });
      }, 1000);
    }
  };
};
