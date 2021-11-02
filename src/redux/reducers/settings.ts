import { PayloadAction } from "@reduxjs/toolkit";
import { currentSettingsInt } from "../../typings/interfaces";
import { SET_SETTINGS } from "../../utils/constants";
import { initialState } from "../store";

const currentSettingsReducer = (
  state = initialState.currentSettings,
  action: PayloadAction<currentSettingsInt | null>
) => {
  switch (action.type) {
    case SET_SETTINGS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default currentSettingsReducer;