import { PayloadAction } from "@reduxjs/toolkit";
import { currentFeaturesInt } from "../../typings/interfaces";
import { initialState } from "../store";
import {
  FILL_FEATURES,
  FILL_FEATURES_ERROR,
  FILL_FEATURES_LOADING,
} from "../../utils/const/str";

const currentFeaturesReducer = (
  state = initialState.currentFeatures,
  action: PayloadAction<currentFeaturesInt | null>
) => {
  switch (action.type) {
    case FILL_FEATURES:
      return {
        ...state,
        ...action.payload,
      };
    case FILL_FEATURES_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case FILL_FEATURES_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default currentFeaturesReducer;
