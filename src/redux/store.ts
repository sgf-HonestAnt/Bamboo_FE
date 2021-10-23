import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
  AnyAction,
} from "redux";
import { persistStore, persistReducer } from "redux-persist";
//import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { reduxStateInt } from "../typings/interfaces";
import { Reducer } from "react";
import thunk from "redux-thunk";
import sessionStorage from "redux-persist/lib/storage/session";
import themesReducer from "./reducers/themes";
import currentUserReducer from "./reducers/user";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }
  interface EncryptTransformConfig {
    secretKey: string;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

export const initialState: reduxStateInt = {
  themes: {
    themesList: ["light-mode", "dark-mode"],
    selectedTheme: "light-mode", // default theme
  },
  // set upon loading with endpoint "/user/me"
  currentUser: {
    _id: "1",
    first_name: "Sarah",
    last_name: "Fisher",
    username: "sgfisher",
    email: "me@email.com",
    avatar: "",
    bio: "",
    level: 0,
    xp: 0,
    // password
    settings: {
      difficulty: 1, // default difficulty
      selectedTheme: "light-mode",
    },
    achievements: [],
    followedUsers: {
      requested: [],
      pending: [],
      accepted: [],
      rejected: [],
    },
    collection: [],
    tasklist: [],
    challenges: [],
    refreshToken: "",
  },
};

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_ENCRYPT_KEY || "random string",
    }),
  ],
};

const bigReducer = combineReducers({
  themes: themesReducer,
  currentUser: currentUserReducer,
}) as Reducer<any, AnyAction>;

const persistedReducer = persistReducer(persistConfig, bigReducer);

export const configureStore = createStore(
  persistedReducer,
  initialState,
  process.env.REACT_APP_DEVELOPMENT
    ? composeEnhancers(applyMiddleware(thunk))
    : compose(applyMiddleware(thunk))
);

export const persistor = persistStore(configureStore);
