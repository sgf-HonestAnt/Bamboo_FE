import { PayloadAction } from "@reduxjs/toolkit";
import { currentUserInt } from "../../typings/interfaces";
import { SET_CURR_USER, SET_REFRESH_TOKEN } from "../../utils/constants";
import { initialState } from "../store";

const currentUserReducer = (
  state = initialState.currentUser,
  action: PayloadAction<currentUserInt | null>
) => {
  switch (action.type) {
    case SET_CURR_USER:
      return {
        ...state,
        ...action.payload,
      };
    case SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.payload
      }
    default:
      return state;
  }
};

export default currentUserReducer;
