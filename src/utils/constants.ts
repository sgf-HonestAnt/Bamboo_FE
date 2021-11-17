import { ICOEMPTY, ICOFINANCE, ICOFIT, ICOHOUSE, ICOPETS, ICORELATE, ICOSHOP, ICOURGENT, ICOWELLNESS, ICOWORK } from "./icons";

// fetches
export const BE_URL = process.env.REACT_APP_BE_URL;
export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";
export const DELETE = "DELETE";
export const REGISTER = "REGISTER";
export const SESSION = "session";
export const ME = "me";
export const REFRESH = "refresh";
// user reducers
export const USERS = "users";
export const FILL_USER_LOADING = "FILL_USER_LOADING";
export const FILL_USER_ERROR = "FILL_USER_ERROR";
export const FILL_USER = "FILL_USER";
export const SET_EXPIRED = "SET_EXPIRED";
export const SET_REFRESH_TOKEN = "SET_REFRESH_TOKEN";
// tasks reducers
export const TASKS = "tasks";
export const FILL_TASKS_LOADING = "FILL_TASKS_LOADING";
export const FILL_TASKS_ERROR = "FILL_TASKS_ERROR";
export const FILL_TASKS = "FILL_TASKS";
// achievements reducers
export const ACHIEVEMENTS = "achievements";
export const FILL_ACHIEVEMENTS_LOADING = "FILL_ACHIEVEMENTS_LOADING";
export const FILL_ACHIEVEMENTS_ERROR = "FILL_ACHIEVEMENTS_ERROR";
export const FILL_ACHIEVEMENTS = "FILL_ACHIEVEMENTS";
export const SET_SUPERLIST = "SET_SUPERLIST";
// features reducers
export const FEATURES = "features";
export const FILL_FEATURES_LOADING = "FILL_FEATURES_LOADING";
export const FILL_FEATURES_ERROR = "FILL_FEATURES_ERROR";
export const FILL_FEATURES = "FILL_FEATURES";
// settings reducers
export const SETTINGS = "settings";
export const FILL_SETTINGS_LOADING = "FILL_SETTINGS_LOADING";
export const FILL_SETTINGS_ERROR = "FILL_SETTINGS_ERROR";
export const FILL_SETTINGS = "FILL_SETTINGS";
// settings themes
export const LIGHT_MODE = "light-mode";
export const DARK_MODE = "dark-mode";
export const THEMES = [LIGHT_MODE, DARK_MODE];
// task types
export const SOLO = "solo";
export const TEAM = "team";
export const TASK_TYPES = [SOLO, TEAM];
// task statuses
export const AWAITED = "awaited";
export const COMPLETED = "completed";
export const IN_PROGRESS = "in_progress";
export const TASK_STATUS_TYPES = [AWAITED, COMPLETED, IN_PROGRESS];
// task categories
export const URGENT = "Urgent";
export const HOUSEHOLD = "Home";
export const SHOPPING = "Shopping";
export const WORK = "Work";
export const RELATIONSHIPS = "Relationships";
export const FINANCE = "Finance";
export const FITNESS = "Fitness";
export const PETS = "Pets";
export const WELLBEING = "Wellbeing";
export const NONE = "None";
export const TASK_CATEGORIES = [
  URGENT,
  HOUSEHOLD,
  SHOPPING,
  WORK,
  RELATIONSHIPS,
  FINANCE,
  FITNESS,
  PETS,
  WELLBEING,
  NONE
];
export const TASK_CATEGORY_ICONS = [ 
  ICOURGENT,
  ICOHOUSE,
  ICOSHOP,
  ICOWORK,
  ICORELATE,
  ICOFINANCE,
  ICOFIT,
  ICOPETS,
  ICOWELLNESS,
  ICOEMPTY
];
// task repetition
export const NEVER = "never";
export const DAILY = "daily";
export const WEEKLY = "weekly";
// export const BIMONTHLY = "bimonthly";
export const MONTHLY = "monthly";
export const EVERY_X_DAYS = "every 'x' days";
export const TASK_REPEAT_TYPES = [NEVER, DAILY, WEEKLY, MONTHLY, EVERY_X_DAYS];
export const NUMBER = `+${!NaN}`;
// task values
export const TASK_VALUE_NUMS = [10, 20, 30, 40, 50];
export const TASK_VALUES = [
  "easy as pie!",
  "something else",
  "something different",
  "hard as rock",
  "last one",
];
export const ALL_TASKS = "All Tasks";
export const ANY_CAT = "Any Category";
export const ANY_STATUS = "Any Status";
export const ANY_REPEAT = "Any Repeat";
export const TODAY = "Today";
export const TOMORROW = "Tomorrow";
export const NO_DEADLINE = "No deadline";
export const TASKS_TO_SHOW = [TODAY, TOMORROW, NO_DEADLINE, ALL_TASKS];
// other
export const ANY = "any";
export const WILD_STR =
  "some random string used for wild searches, so long as filtered key !== this string it will be displayed";
export const WILD_NUM = 4242424242;
// congratulations
export const congrats = [
  "🖐️High five!",
  "😃Well done!",
  "😍Amazing!",
  "✊Fist bump!",
];
