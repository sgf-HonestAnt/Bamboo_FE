// reducers
export const SET_CURR_USER = "SET_CURR_USER";
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
export const COMPLETED = "completed"
export const IN_PROGRESS = "in_progress"
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

