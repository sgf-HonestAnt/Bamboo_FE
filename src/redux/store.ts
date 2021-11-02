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
import currentUserReducer from "./reducers/user";
import { LIGHT_MODE } from "../utils/constants";
import currentTasksReducer from "./reducers/tasks";
import currentAchievementsReducer from "./reducers/achievements";
import currentSettingsReducer from "./reducers/settings";

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
  currentUser: {
    // set upon loading with endpoint "/user/me"
    my_user: {
      _id: "",
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      avatar: "",
      bio: "",
      level: null,
      xp: null,
      admin: false,
      createdAt: "",
      updatedAt: "",
    },
    followedUsers: [],
  },
  currentTasks: {
    // set upon loading with endpoint "/tasks/me/"
    _id: "",
    completed: [],
    awaited: [],
    in_progress: [],
  },
  currentAchievements: {
    // set upon loading with endpoint "/achievements/me/"
    _id: "",
    user: "",
    list: [],
  },
  currentSettings: {
    // set upon loading with endpoint "/user/me/settings"
    selectedTheme: LIGHT_MODE,
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
  currentUser: currentUserReducer,
  currentTasks: currentTasksReducer,
  currentAchievements: currentAchievementsReducer,
  currentSettings: currentSettingsReducer,
}) as Reducer<any, AnyAction>;

const persistedReducer = persistReducer(persistConfig, bigReducer);

export const configureStore = createStore(
  persistedReducer,
  initialState,
  process.env.REACT_APP_DEVELOPMENT
    ? composeEnhancers(applyMiddleware(thunk))
    : compose(applyMiddleware(thunk))
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof configureStore.getState>
// Inferred type: {...}
export type AppDispatch = typeof configureStore.dispatch

export const persistor = persistStore(configureStore);
