export interface reduxStateInt {
  themes: themesInt;
  currentUser: currentUserInt;
}

export interface themesInt {
  themesList: string[]; // > 8
  selectedTheme: string;
}

export interface currentUserInt {
  _id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  level: number;
  xp: number;
  // password: string;
  settings: {
    difficulty: number;
    selectedTheme: string;
  };
  achievements: achievementsInt[];
  followedUsers: {
    requested: string[];
    pending: string[];
    accepted: followedUsersInt[];
    rejected: string[];
  };
  collection: collectionInt[] | null;
  tasklist: tasksInt[] | null;
  challenges: tasksInt[] | null;
  refreshToken: string | null;
}

export interface achievementsInt {
  user_id: string;
  achievement: {
    _id: string;
    timeDate: string;
    desc: string;
    notes: string;
  };
}

export interface followedUsersInt {
  _id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  level: number;
  xp: number;
  achievements: achievementsInt[];
}

export interface collectionInt {
  user_id: string;
  points: {
    accrued: number;
    spent: number;
    remaining: number;
  };
}

export interface tasksInt {
  user_id: string;
  tasklist: {
    completed: challengeInt[];
    awaited: taskInt[];
    progress: taskInt[];
  };
}

export interface taskInt {
  _id: string;
  category: string;
  title: string;
  image: string;
  desc: string;
  type: string;
  value: number;
  sharedWith?: string[];
  deadline?: string;
}

export interface challengesInt {
  user_id: string;
  challengelist: {
    completed: challengeInt[];
    awaited: challengeInt[];
    progress: challengeInt[];
  };
}

export interface challengeInt {
  _id: string;
  category: string;
  type: string; // "solo"|"team"|"PVP",
  title: string;
  image: string;
  desc: string;
  tasklist: {
    completed: taskInt[];
    progress: taskInt[];
    awaited: taskInt[];
  };
  value: number;
  sharedWith?: string[]; // /USERID/
  deadline: string;
}
