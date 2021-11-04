import type { AppDispatch } from "../store";
import {
  BE_URL,
  GET,
  FEATURES,
  FILL_FEATURES,
  FILL_FEATURES_ERROR,
  FILL_FEATURES_LOADING,
} from "../../utils/constants";
import { History } from "history";
import attemptRefresh from "../../utils/funcs/refresh";

export const fillFeaturesAction = (
  history: History<unknown>,
  refreshToken: string | undefined
) => {
  const token = localStorage.getItem("token");
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      const url = `${BE_URL}/${FEATURES}`;
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
            type: FILL_FEATURES_LOADING,
            payload: false,
          });
        }, 1000);
        dispatch({
          type: FILL_FEATURES_ERROR,
          payload: false,
        });
        dispatch({
          type: FILL_FEATURES,
          payload,
        });
        console.log(`🥔features=${payload.total}_total`);
      } else if (response.status === 401) {
        await attemptRefresh(history, refreshToken);
      } else {
        setTimeout(() => {
          dispatch({
            type: FILL_FEATURES_LOADING,
            payload: false,
          });
        }, 1000);
        setTimeout(() => {
          dispatch({
            type: FILL_FEATURES_ERROR,
            payload: true,
          });
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        dispatch({
          type: FILL_FEATURES_LOADING,
          payload: false,
        });
      }, 1000);
      setTimeout(() => {
        dispatch({
          type: FILL_FEATURES_ERROR,
          payload: true,
        });
      }, 1000);
    }
  };
};
