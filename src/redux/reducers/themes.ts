import { PayloadAction } from "@reduxjs/toolkit";
import { themesInt } from "../../typings/interfaces";
import { SELECT_THEME } from "../../utils/constants";
import { initialState } from "../store"; 

const themesReducer = (
  state = initialState.themes,
  action: PayloadAction<themesInt | null>
) => {
  switch (action.type) {
    case SELECT_THEME:
      return {
        ...state,
        selectedTheme: action.payload,
      };
    default:
      return state;
  }
};

export default themesReducer;