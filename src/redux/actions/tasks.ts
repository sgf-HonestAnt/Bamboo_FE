import type { AppDispatch } from "../store";
import {
  BE_URL,
  GET,
  TASKS,
  FILL_TASKS,
  FILL_TASKS_ERROR,
  FILL_TASKS_LOADING,
} from "../../utils/constants";
import attemptRefresh from "../../utils/funcs/refresh";

export const loadTasksAction = (loading: boolean) => ({
  type: FILL_TASKS_LOADING,
  payload: true,
});

export const fillTasksAction = () => {
  const token = localStorage.getItem("token");
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      const url = `${BE_URL}/${TASKS}/me`;
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
            type: FILL_TASKS_LOADING,
            payload: false,
          });
        }, 1000);
        dispatch({
          type: FILL_TASKS_ERROR,
          payload: false,
        });
        dispatch({
          type: FILL_TASKS,
          payload,
        });
        console.log(
          `🥔tasks=${payload.awaited.length}awaited,${payload.completed.length}completed,${payload.in_progress.length}in_progress`
        );
      } else if (response.status===401) {
        await attemptRefresh(history, refreshToken) // ADD SAME AS BEFORE.
      } else {
        setTimeout(() => {
          dispatch({
            type: FILL_TASKS_LOADING,
            payload: false,
          });
        }, 1000);
        setTimeout(() => {
          dispatch({
            type: FILL_TASKS_ERROR,
            payload: true,
          });
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        dispatch({
          type: FILL_TASKS_LOADING,
          payload: false,
        });
      }, 1000);
      setTimeout(() => {
        dispatch({
          type: FILL_TASKS_ERROR,
          payload: true,
        });
      }, 1000);
    }
  };
};
