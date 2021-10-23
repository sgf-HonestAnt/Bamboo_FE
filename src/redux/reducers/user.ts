import { PayloadAction } from "@reduxjs/toolkit";
import { currentUserInt } from "../../typings/interfaces";
import { SET_CURR_USER } from "../../utils/constants";
import { initialState } from "../store";

const currentUserReducer = (
  state = initialState,
  action: PayloadAction<currentUserInt | null>
) => {
  switch (action.type) {
    case SET_CURR_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default currentUserReducer;
