import { PayloadAction } from "@reduxjs/toolkit";
import { currentTasksInt } from "../../typings/interfaces";
import { initialState } from "../store";
import {
  ADD_TASK_TO_AWAITED,
  ADD_TASK_TO_COMPLETED,
  ADD_TASK_TO_IN_PROGRESS,
  DELETE_TASK,
  EDIT_TASK,
  FILL_TASKS,
  FILL_TASKS_ERROR,
  FILL_TASKS_LOADING,
  REMOVE_TASK_FROM_AWAITED,
  REMOVE_TASK_FROM_COMPLETED,
  REMOVE_TASK_FROM_IN_PROGRESS,
  SET_NEW_TASK,
  SET_NEW_TASK_CATEGORY,
  SET_NEW_TASK_CATEGORY_COLOR,
} from "../../utils/const/str";

const currentTasksReducer = (
  state = initialState.currentTasks,
  action: PayloadAction<currentTasksInt | null>
) => {
  switch (action.type) {
    case FILL_TASKS:
      return {
        ...state,
        ...action.payload,
      };
    case FILL_TASKS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case FILL_TASKS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_NEW_TASK:
      return {
        ...state,
        awaited: [...state.awaited, action.payload],
      };
    case SET_NEW_TASK_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
    case SET_NEW_TASK_CATEGORY_COLOR:
      return {
        ...state,
        categoriesColors: action.payload,
      };
    case ADD_TASK_TO_AWAITED:
      return {
        ...state,
        awaited: action.payload,
      };
    case ADD_TASK_TO_IN_PROGRESS:
      return {
        ...state,
        in_progress: action.payload,
      };
    case ADD_TASK_TO_COMPLETED:
      return {
        ...state,
        completed: action.payload,
      };
    case REMOVE_TASK_FROM_AWAITED:
      return {
        ...state,
        awaited: action.payload,
      };
    case REMOVE_TASK_FROM_IN_PROGRESS:
      return {
        ...state,
        in_progress: action.payload,
      };
    case REMOVE_TASK_FROM_COMPLETED:
      return {
        ...state,
        completed: action.payload,
      };
    case DELETE_TASK:
      return {
        ...state,
        completed: action.payload,
      };
    case EDIT_TASK:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default currentTasksReducer;
