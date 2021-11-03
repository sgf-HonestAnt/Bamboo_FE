// fetches
export const BE_URL = process.env.REACT_APP_BE_URL;
export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";
export const DELETE = "DELETE";
export const SESSION = "session";
export const REFRESH = "refresh";
// user reducers
export const USERS = "users";
export const FILL_USER_LOADING = "FILL_USER_LOADING";
export const FILL_USER_ERROR = "FILL_USER_ERROR";
export const FILL_USER = "FILL_USER";
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
export const SET_SUPERLIST = "SET_SUPERLIST"
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
// task repetition
export const NEVER = "never";
export const DAILY = "daily";
export const WEEKLY = "weekly";
export const BIMONTHLY = "bimonthly";
export const MONTHLY = "monthly";
export const NUMBER = `+${!NaN}`;
export const TASK_REPEAT_TYPES = [
  NEVER,
  DAILY,
  WEEKLY,
  BIMONTHLY,
  MONTHLY,
  NUMBER,
];
// other
export const NONE = "none";
// congratulations
export const congrats = [
  "🖐️High five!",
  "😃Well done!",
  "😍Amazing!",
  "✊Fist bump!"
]
