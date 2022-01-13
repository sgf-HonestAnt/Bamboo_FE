import { PayloadAction } from "@reduxjs/toolkit";
import { currentSettingsInt } from "../../typings/interfaces";
import { initialState } from "../store";
import {
  FILL_SETTINGS,
  FILL_SETTINGS_ERROR,
  FILL_SETTINGS_LOADING,
} from "../../utils/const/str";

const currentSettingsReducer = (
  state = initialState.currentSettings,
  action: PayloadAction<currentSettingsInt | null>
) => {
  switch (action.type) {
    case FILL_SETTINGS:
      return {
        ...state,
        ...action.payload,
      };
    case FILL_SETTINGS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case FILL_SETTINGS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default currentSettingsReducer;
