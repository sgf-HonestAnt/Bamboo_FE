import { ICOFINANCE, ICOFIT, ICOURGENT, ICOWORK } from "../appIcons";
// ********** CRUD **********
export const BE_URL = process.env.REACT_APP_BE_URL;
export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";
export const DELETE = "DELETE";
export const REGISTER = "REGISTER";
export const SESSION = "session";
export const REFRESH = "refresh";
// export const ME = "me";
export const ADMIN = "admin";
export const ACHIEVEMENTS = "achievements";
export const USERS = "users";
export const TASKS = "tasks";
export const ENDPOINT_REFRESH = `${BE_URL}/${USERS}/${SESSION}/${REFRESH}`;
export const ENDPOINT_USERS = `${BE_URL}/${USERS}`;
export const ENDPOINT_TASKS = `${BE_URL}/${TASKS}`;
export const ENDPOINT_GIFTS = `${BE_URL}/${USERS}/gift`;
export const ENDPOINT_MYACH = `${BE_URL}/${ACHIEVEMENTS}/me`;
export const ENDPOINT_MYREWARDS = `${BE_URL}/${USERS}/me/rewards`;
// ********** STORE **********
export const FILL_USER_LOADING = "FILL_USER_LOADING";
export const FILL_USER_ERROR = "FILL_USER_ERROR";
export const FILL_USER = "FILL_USER";
export const SET_USER_AVATAR = "SET_USER_AVATAR";
export const SET_USER_FIRST_NAME = "SET_USER_FIRST_NAME";
export const SET_USER_LAST_NAME = "SET_USER_LAST_NAME";
export const SET_USER_USERNAME = "SET_USER_USERNAME";
export const SET_USER_BIO = "SET_USER_BIO";
export const SET_USER_EMAIL = "SET_USER_EMAIL";
export const SET_USER_LEVEL = "SET_USER_LEVEL";
export const SET_USER_POINTS_AND_COMPLETED = "SET_USER_POINTS_AND_COMPLETED";
export const SET_USER_POINTS = "SET_USER_POINTS";
export const SET_USER_POINTS_TOTAL = "SET_USER_POINTS_TOTAL";
export const SET_USER_COMPLETED_TOTAL = "SET_USER_COMPLETED_TOTAL";
export const SET_USER_REWARDS = "SET_USER_REWARDS";
export const SPEND_USER_POINTS = "SPEND_USER_POINTS";
export const CLEAR_LAST_NOTIFICATION = "CLEAR_LAST_NOTIFICATION";
export const SET_REFRESH_TOKEN = "SET_REFRESH_TOKEN";
export const FILL_TASKS_LOADING = "FILL_TASKS_LOADING";
export const FILL_TASKS_ERROR = "FILL_TASKS_ERROR";
export const FILL_TASKS = "FILL_TASKS";
export const SET_NEW_TASK = "SET_NEW_TASK";
export const SET_NEW_TASK_CATEGORY = "SET_NEW_TASK_CATEGORY";
export const ADD_TASK_TO_AWAITED = "ADD_TASK_TO_AWAITED";
export const ADD_TASK_TO_IN_PROGRESS = "ADD_TASK_TO_IN_PROGRESS";
export const ADD_TASK_TO_COMPLETED = "ADD_TASK_TO_COMPLETED";
export const REMOVE_TASK_FROM_AWAITED = "REMOVE_TASK_FROM_AWAITED";
export const REMOVE_TASK_FROM_IN_PROGRESS = "REMOVE_TASK_FROM_IN_PROGRESS";
export const REMOVE_TASK_FROM_COMPLETED = "REMOVE_TASK_FROM_COMPLETED";
export const EDIT_TASK = "EDIT_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const FILL_ACHIEVEMENTS_LOADING = "FILL_ACHIEVEMENTS_LOADING";
export const FILL_ACHIEVEMENTS_ERROR = "FILL_ACHIEVEMENTS_ERROR";
export const FILL_ACHIEVEMENTS = "FILL_ACHIEVEMENTS";
export const SET_SUPERLIST = "SET_SUPERLIST";
export const SET_NEW_ACHIEVEMENT = "SET_NEW_ACHIEVEMENT";
export const NOTIFICATIONS = "notifications";
export const FEATURES = "features";
export const FILL_FEATURES_LOADING = "FILL_FEATURES_LOADING";
export const FILL_FEATURES_ERROR = "FILL_FEATURES_ERROR";
export const FILL_FEATURES = "FILL_FEATURES";
export const SETTINGS = "settings";
export const FILL_SETTINGS_LOADING = "FILL_SETTINGS_LOADING";
export const FILL_SETTINGS_ERROR = "FILL_SETTINGS_ERROR";
export const FILL_SETTINGS = "FILL_SETTINGS";
// ********** REST **********
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
export const URGENT = "urgent";
export const HOUSEHOLD = "home";
export const SHOPPING = "shopping";
export const WORK = "work";
export const RELATIONSHIPS = "relationships";
export const FINANCE = "finance";
export const FITNESS = "fitness";
export const PETS = "pets";
export const WELLBEING = "wellbeing";
export const NONE = "none";
export const TASK_CATEGORIES = [URGENT, NONE];
export const TASK_CATEGORY_ICONS = [ICOURGENT, ICOWORK, ICOFINANCE, ICOFIT];
// task repetition
export const NEVER = "never";
export const DAILY = "daily";
export const WEEKLY = "weekly";
export const MONTHLY = "monthly";
export const EVERY_X_DAYS = "every 'x' days";
export const TASK_REPEAT_TYPES = [NEVER, DAILY, WEEKLY, MONTHLY, EVERY_X_DAYS];
export const NUMBER = `+${!NaN}`;
// task values
export const ANY_VAL = "Any Value";
export const ANY_CAT = "Any Category";
export const ANY_STATUS = "Any Status";
export const ANY_REPEAT = "Any Repeat";
export const ANY_DUE = "Any Due Date";
export const ANY_TYPE = "Any Type";
export const YESTERDAY = "Yesterday";
export const ALL_TASKS = "All Tasks";
export const SHARED = "Shared";
export const NO_DEADLINE = "No Deadline";
export const TODAY = "Today";
export const TOMORROW = "Tomorrow";
export const OVERDUE = "Overdue";
export const TASKS_TO_SHOW = [TODAY, TOMORROW, OVERDUE];
// *
export const ANY = "any";
export const WILD_STR =
  "some random string used for wild searches, so long as filtered key !== this string it will be displayed";
export const WILD_NUM = 4242424242;
// Admin Page Sorting
export const NAME_ASC = "Name (Asc)";
export const USERNAME_ASC = "Username (Asc)";
export const EMAIL_ASC = "Email (Asc)";
export const ROLE_ASC = "Role (Admin-General)";
export const LEVEL_ASC = "Level (Asc)";
export const XP_ASC = "XP (Asc)";
export const TOTAL_XP_ASC = "Total XP (Asc)";
export const TOTAL_COMPLETED_ASC = "Total Completed (Asc)";
export const NAME_DESC = "Name (Desc)";
export const USERNAME_DESC = "Username (Desc)";
export const EMAIL_DESC = "Email (Desc)";
export const ROLE_DESC = "Role (General-Admin)";
export const LEVEL_DESC = "Level (Desc)";
export const XP_DESC = "XP (Desc)";
export const TOTAL_XP_DESC = "Total XP (Desc)";
export const TOTAL_COMPLETED_DESC = "Total Completed (Desc)";
export const USERS_SORT_BY = [
  NAME_ASC,
  USERNAME_ASC,
  EMAIL_ASC,
  ROLE_ASC,
  LEVEL_ASC,
  XP_ASC,
  TOTAL_XP_ASC,
  TOTAL_COMPLETED_ASC,
  NAME_DESC,
  USERNAME_DESC,
  EMAIL_DESC,
  ROLE_DESC,
  LEVEL_DESC,
  XP_DESC,
  TOTAL_XP_DESC,
  TOTAL_COMPLETED_DESC,
];
