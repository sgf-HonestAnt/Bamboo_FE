import { PayloadAction } from "@reduxjs/toolkit";
import { currentAchievementsInt } from "../../typings/interfaces";
import { SET_ACHIEVEMENTS } from "../../utils/constants";
import { initialState } from "../store";

const currentAchievementsReducer = (
  state = initialState.currentAchievements,
  action: PayloadAction<currentAchievementsInt | null>
) => {
  switch (action.type) {
    case SET_ACHIEVEMENTS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default currentAchievementsReducer;
