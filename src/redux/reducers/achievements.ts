import { PayloadAction } from "@reduxjs/toolkit";
import { currentAchievementsInt } from "../../typings/interfaces";
import { initialState } from "../store";
import {
  FILL_ACHIEVEMENTS,
  FILL_ACHIEVEMENTS_ERROR,
  FILL_ACHIEVEMENTS_LOADING,
} from "../../utils/constants";

const currentAchievementsReducer = (
  state = initialState.currentAchievements,
  action: PayloadAction<currentAchievementsInt | null>
) => {
  switch (action.type) {
    case FILL_ACHIEVEMENTS:
      return {
        ...state,
        ...action.payload,
      };
    case FILL_ACHIEVEMENTS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case FILL_ACHIEVEMENTS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default currentAchievementsReducer;
