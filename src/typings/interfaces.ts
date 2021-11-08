import { themeType, statusType, taskType, monthType } from "./types";

export interface reduxStateInt {
  currentUser: currentUserInt;
  currentTasks: currentTasksInt;
  currentAchievements: currentAchievementsInt;
  currentSettings: currentSettingsInt;
  currentFeatures: currentFeaturesInt;
}

export interface currentSettingsInt {
  loading: boolean;
  error: boolean;
  // GET users/me/settings
  selectedTheme: themeType;
}

export interface currentUserInt {
  loading: boolean;
  error: boolean;
  // GET users/me
  my_user: userInt;
  followedUsers: followedUserInt[];
}
export interface userInt {
  // GET users/me, GET users/:id
  _id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  level: number | null;
  xp: number | null;
  admin?: boolean; // required false
  notification: string[];
  createdAt: string;
  updatedAt: string;
  refreshToken?: string;
}
export interface currentTasksInt {
  loading: boolean;
  error: boolean;
  // GET tasks/me
  _id: string;
  categories: string[];
  completed: taskInt[];
  awaited: taskInt[];
  in_progress: taskInt[];
}
export interface currentAchievementsInt {
  loading: boolean;
  error: boolean;
  // GET achievements/me
  _id: string;
  user: string; // user
  list: achievementInt[];
  superlist: string[];
}
export interface currentFeaturesInt {
  loading: boolean;
  error: boolean;
  // GET features
  links: number | null;
  total: number | null;
  features: featureInt[];
  pageTotal: number | null;
}
export interface searchedUsersInt {
  // GET users
  links: number | null;
  total: number;
  publicUsers: publicUserInt;
  pageTotal: number | null;
}
export interface followedUserInt {
  // GET users/me
  _id: string;
  username: string;
  avatar: string;
  bio: string;
  level: number;
  xp: number;
  achievements: achievementInt[];
}
export interface publicUserInt {
  _id: string;
  username: string;
  avatar: string;
  bio: string;
  level: number;
  xp: number;
  joined: string;
}
export interface achievementInt {
  // GET achievements/me, GET users/me, GET achievements/:id
  username: string;
  item: string;
  createdAt: string;
  _id: string;
}
export interface taskInt {
  // GET tasks/me, GET tasks/me/:id
  _id: string;
  category: string;
  title: string;
  image: string;
  desc: string;
  type: taskType | string;
  value: number;
  createdBy: string; // user id
  sharedWith?: string[]; // user id
  status: statusType | string;
  deadline?: string;
  _v: number;
}
export interface featureInt {
  // GET features
  _id: string;
  month: monthType;
  descrip: string;
  level: number;
  value: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
}
