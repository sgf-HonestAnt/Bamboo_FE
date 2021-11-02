import { PayloadAction } from "@reduxjs/toolkit";
import { currentFeaturesInt } from "../../typings/interfaces";
import { SET_FEATURES } from "../../utils/constants";
import { initialState } from "../store";

const currentFeaturesReducer = (
  state = initialState.currentFeatures,
  action: PayloadAction<currentFeaturesInt | null>
) => {
  switch (action.type) {
    case SET_FEATURES: 
      return { 
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default currentFeaturesReducer;