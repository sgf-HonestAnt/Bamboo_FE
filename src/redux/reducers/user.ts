import { PayloadAction } from "@reduxjs/toolkit";
import { currentUserInt } from "../../typings/interfaces";
import { initialState } from "../store";
import {
  FILL_USER,
  FILL_USER_ERROR,
  FILL_USER_LOADING,
  SET_REFRESH_TOKEN,
  SET_USER_AVATAR,
  SET_USER_BIO,
  SET_USER_EMAIL,
  SET_USER_FIRST_NAME,
  SET_USER_LEVEL,
  SET_USER_POINTS,
  SET_USER_POINTS_AND_COMPLETED,
  SET_USER_REWARDS,
  SET_USER_USERNAME,
} from "../../utils/const/str";

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
    case SET_USER_AVATAR:
      return {
        ...state,
        my_user: {
          ...state.my_user,
          avatar: action.payload,
        },
      };
    case SET_USER_FIRST_NAME:
      return {
        ...state,
        my_user: {
          ...state.my_user,
          first_name: action.payload,
        },
      };
    case SET_USER_USERNAME:
      return {
        ...state,
        my_user: {
          ...state.my_user,
          username: action.payload,
        },
      };
    case SET_USER_BIO:
      return {
        ...state,
        my_user: {
          ...state.my_user,
          bio: action.payload,
        },
      };
    case SET_USER_EMAIL:
      return {
        ...state,
        my_user: {
          ...state.my_user,
          email: action.payload,
        },
      };
    case SET_USER_LEVEL:
      return {
        ...state,
        my_user: {
          ...state.my_user,
          level: action.payload,
        },
      };
    case SET_USER_POINTS:
      return {
        ...state,
        my_user: {
          ...state.my_user,
          xp: action.payload,
        },
      };
    case SET_USER_REWARDS: // // <== THERE IS A PROBLEM HERE
      return {
        ...state,
        my_user: {
          ...state.my_user,
          rewards: { ...state.my_user.rewards, ...action.payload },
        },
      };
    case SET_USER_POINTS_AND_COMPLETED:
      return {
        ...state,
        my_user: action.payload,
      };
    case SET_REFRESH_TOKEN:
      return {
        ...state,
        my_user: {
          ...state.my_user,
          refreshToken: action.payload,
        },
      };
    default:
      return state;
  }
};

export default currentUserReducer;
