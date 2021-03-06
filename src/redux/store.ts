import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
  AnyAction,
} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { reduxStateInt } from "../typings/interfaces";
import { Reducer } from "react";
import thunk from "redux-thunk";
// import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import currentUserReducer from "./reducers/user";
import currentTasksReducer from "./reducers/tasks";
import currentAchievementsReducer from "./reducers/achievements";
import currentSettingsReducer from "./reducers/settings";
import currentFeaturesReducer from "./reducers/features";
import { LIGHT_MODE } from "../utils/const/str";
import { CUSTOM_COLORS } from "../utils/const/arr";

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
    loading: true,
    error: false,
    my_user: {
      _id: "",
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      avatar: "",
      bio: "",
      level: null,
      xp: 0,
      rewards: [],
      total_xp: 0,
      total_completed: 0,
      tasks_to_hide: [],
      admin: false,
      notification: [],
      createdAt: "",
      updatedAt: "",
    },
    followedUsers: [],
  },
  currentTasks: {
    loading: true,
    error: false,
    _id: "",
    categories: [],
    categoriesColors: [],
    completed: [],
    awaited: [],
    in_progress: [],
  },
  currentAchievements: {
    loading: true,
    error: false,
    _id: "",
    user: "",
    list: [],
    superlist: [],
  },
  currentSettings: {
    loading: true,
    error: false,
    selectedTheme: LIGHT_MODE,
    customColors: CUSTOM_COLORS,
  },
  currentFeatures: {
    loading: true,
    error: false,
    links: 0,
    total: 0,
    features: [],
    pageTotal: 0,
  },
};

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_ENCRYPT_KEY!,
    }),
  ],
};

const bigReducer = combineReducers({
  currentUser: currentUserReducer,
  currentTasks: currentTasksReducer,
  currentAchievements: currentAchievementsReducer,
  currentSettings: currentSettingsReducer,
  currentFeatures: currentFeaturesReducer,
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
export type RootState = ReturnType<typeof configureStore.getState>;
// Inferred type: {...}
export type AppDispatch = typeof configureStore.dispatch;

export const persistor = persistStore(configureStore);
