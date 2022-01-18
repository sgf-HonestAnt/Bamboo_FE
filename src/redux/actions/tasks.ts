import type { AppDispatch } from "../store";
import {
  BE_URL,
  GET,
  TASKS,
  FILL_TASKS,
  FILL_TASKS_ERROR,
  FILL_TASKS_LOADING,
  SET_NEW_TASK,
  ADD_TASK_TO_AWAITED,
  REMOVE_TASK_FROM_AWAITED,
  ADD_TASK_TO_IN_PROGRESS,
  REMOVE_TASK_FROM_IN_PROGRESS,
  ADD_TASK_TO_COMPLETED,
  REMOVE_TASK_FROM_COMPLETED,
  SET_NEW_TASK_CATEGORY,
  DELETE_TASK,
  EDIT_TASK,
} from "../../utils/const/str";
import { taskInt } from "../../typings/interfaces";

export const setNewTask = (task: taskInt) => ({
  type: SET_NEW_TASK,
  payload: task,
});
export const setNewCategory = (categories: string[]) => ({
  type: SET_NEW_TASK_CATEGORY,
  payload: categories,
});
export const AddTaskToAwaited = (status: taskInt[]) => ({
  type: ADD_TASK_TO_AWAITED,
  payload: status,
});
export const RemTaskFromAwaited = (status: taskInt[]) => ({
  type: REMOVE_TASK_FROM_AWAITED,
  payload: status,
});
export const AddTaskToInProgress = (status: taskInt[]) => ({
  type: ADD_TASK_TO_IN_PROGRESS,
  payload: status,
});
export const RemTaskFromInProgress = (status: taskInt[]) => ({
  type: REMOVE_TASK_FROM_IN_PROGRESS,
  payload: status,
});
export const AddTaskToCompleted = (status: taskInt[]) => ({
  type: ADD_TASK_TO_COMPLETED,
  payload: status,
});
export const RemTaskFromCompleted = (status: taskInt[]) => ({
  type: REMOVE_TASK_FROM_COMPLETED,
  payload: status,
});
export const EditTask = (status: string, tasks: taskInt[]) => ({
  type: EDIT_TASK,
  payload: {
    [status]: tasks,
  },
});
// delete if unnecessary
export const DeleteTask = (completed: taskInt[]) => ({
  type: DELETE_TASK,
  payload: completed,
});
//
export const loadTasksAction = (loading: boolean) => ({
  type: FILL_TASKS_LOADING,
  payload: true,
});
export const fillTasksAction = () => {
  console.log("🙋Filling tasks!")
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
