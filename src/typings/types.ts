export type themeType = "dark-mode" | "light-mode";
export type taskType = "solo" | "team";
export type statusType = "awaited" | "completed" | "in_progress";
export type monthType =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";
export type taskUpdateType = {
  category?: string;
  title?: string;
  image?: string;
  desc?: string;
  type?: taskType | string;
  value?: number;
  sharedWith?: string[];
  status?: statusType | string;
  deadline?: string;
};
export type userUpdateType = {
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  avatar?: string;
  bio?: string;
  level?: number | null;
  xp?: number | null;
  admin?: boolean;
  notification?: string[];
};
