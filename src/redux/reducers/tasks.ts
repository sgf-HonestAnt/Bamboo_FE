import { PayloadAction } from "@reduxjs/toolkit";
import { currentTasksInt } from "../../typings/interfaces";
import { initialState } from "../store";
import {
  FILL_TASKS,
  FILL_TASKS_ERROR,
  FILL_TASKS_LOADING,
} from "../../utils/appConstants";

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
    default:
      return state;
  }
};

export default currentTasksReducer;
