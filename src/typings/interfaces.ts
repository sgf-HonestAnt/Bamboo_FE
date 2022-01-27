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
  customColors: string[];
}
export interface currentUserInt {
  loading: boolean;
  error: boolean;
  // GET users/me
  my_user: userInt;
  followedUsers: followedUserInt[];
}
export interface rewardsInt {
  reward: string;
  value: number;
  available: number;
  _id: string;
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
  xp: number;
  rewards: rewardsInt[];
  total_xp: number; // total cumulative xp
  total_completed: number; // total completed tasks
  tasks_to_hide: string[];
  admin?: boolean;
  notification: string[];
  createdAt: string;
  updatedAt: string;
  refreshToken?: string;
  followedUsers?: {
    accepted: string[];
    rejected: string[];
    requested: string[];
    response_awaited: string[];
  };
}
export interface currentTasksInt {
  loading: boolean;
  error: boolean;
  // GET tasks/me
  _id: string;
  categories: string[];
  categoriesColors: string[];
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
  admin: boolean;
  avatar: string;
  bio: string;
  level: number;
  xp: number;
  rewards: rewardsInt[];
  total_xp: number;
  total_completed: number;
  total_awaited: number;
  total_in_progress: number;
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
  category: string;
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
  repeats: string;
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
export interface setTaskInt {
  // for adding a task
  category: string;
  title: string;
  desc: string;
  value: number;
  repeats: number | string;
  sharedWith: string[];
  deadline: string;
}
export interface listForBeautifulDnd {
  id: string;
  title: string;
  taskIds: string[];
}
export interface beautifulDnD {
  tasks: (taskInt | undefined)[];
  lists: listForBeautifulDnd[];
  listOrder: string[];
}
// statistics page
export interface genericTaskInt {
  name: string;
  total: number;
  tasks: taskInt[];
}
export interface categoryTaskInt {
  category: string;
  total: number;
  awaited: number;
  in_progress: number;
  completed: number;
}
export interface dataInt {
  allByStatus: genericTaskInt[];
  allByCategory: categoryTaskInt[];
  allByValue: genericTaskInt[];
  allByCreatedAt: any[];
  allByUpdatedAt: any[];
  allByType: genericTaskInt[];
  allByDueDate: any[];
  tagCloud: { value: string; count: number }[];
  unusedCategories: categoryTaskInt[];
}
export interface initialValuesInt {
  category: string;
  title: string;
  desc: string;
  value: number;
  repeats: number | string;
  sharedWith: string[];
  deadline: string;
  newCategory: string | undefined;
  newCategoryColor?: string | undefined;
  repeated: string | null;
  repeatsOther: number | string;
  repetitions: string;
  shared: string | null;
  repeatedRadio: string | null;
  sharedRadio: string | null;
}
//
