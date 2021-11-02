// fetches
export const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgwZWMxMGM3OTVmMjYyYmIxOGI5OTciLCJpYXQiOjE2MzU4NjA5MjQsImV4cCI6MTYzNTg2MTgyNH0.TKN9ct8xupS7EnBOokjDNSvhuATxnZucsfuIV5ygdk4";
// this will come from local storage later
export const BE_URL = process.env.REACT_APP_BE_URL;
export const GET = "GET";
export const USERS = "users";
export const TASKS = "tasks";
export const ACHIEVEMENTS = "achievements";
export const SETTINGS = "settings";
// reducers
export const SET_CURR_USER = "SET_CURR_USER";
export const SET_TASKS = "SET_TASKS";
export const SET_ACHIEVEMENTS = "SET_ACHIEVEMENTS";
export const SET_SETTINGS = "SET_SETTINGS";
// settings themes
export const LIGHT_MODE = "light-mode";
export const DARK_MODE = "dark-mode";
export const THEMES = [LIGHT_MODE, DARK_MODE];
// task type
export const SOLO = "solo";
export const TEAM = "team";
export const TASK_TYPES = [SOLO, TEAM];
// task status
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

export const NONE = "none";
