import { PayloadAction } from "@reduxjs/toolkit";
import { currentUserInt } from "../../typings/interfaces";
import { initialState } from "../store";
import {
  FILL_USER,
  FILL_USER_ERROR,
  FILL_USER_LOADING,
  SET_REFRESH_TOKEN,
} from "../../utils/constants";

const currentUserReducer = (
  state = initialState.currentUser,
  action: PayloadAction<currentUserInt | null>
) => {
  switch (action.type) {
    case FILL_USER:
      return {
        ...state,
        ...action.payload,
      };
    case FILL_USER_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case FILL_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_REFRESH_TOKEN:
      return {
        ...state,
        my_user: {
          refreshToken: action.payload,
        }
      }; 
    default:
      return state;
  }
};

export default currentUserReducer;
