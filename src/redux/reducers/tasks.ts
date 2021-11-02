import { PayloadAction } from "@reduxjs/toolkit";
import { currentTasksInt } from "../../typings/interfaces";
import { SET_TASKS } from "../../utils/constants";
import { initialState } from "../store";

const currentTasksReducer = (
  state = initialState.currentTasks,
  action: PayloadAction<currentTasksInt | null>
) => {
  switch (action.type) {
    case SET_TASKS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default currentTasksReducer;