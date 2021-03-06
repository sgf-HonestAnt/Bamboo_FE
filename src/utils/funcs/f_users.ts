import { Dispatch } from "redux";
import {
  setRefreshToken,
  setUserBio,
  setUserLevel,
  setUserPoints,
  setUserPointsAndCompleted,
} from "../../redux/actions/user";
import { followedUserInt, userInt } from "../../typings/interfaces";
import { loginFormProps, userUpdateType } from "../../typings/types";
import {
  GET,
  PUT,
  ADMIN,
  SESSION,
  POST,
  DELETE,
  ENDPOINT_USERS,
} from "../const/str";

export const findUsernameByEmail = async (email: string) => {
  // console.log("🙋Finding Username By Email");
  const url = `${ENDPOINT_USERS}?email=${email.toLowerCase()}`;
  const method = GET;
  const response = await fetch(url, { method });
  if (response.ok) {
    const { publicUsers } = await response.json();
    return publicUsers[0].username;
  } else {
    return;
  }
};

export const attemptLoginUser = async (
  form: loginFormProps,
  setLoading: any,
  dispatch: Dispatch<any>
) => {
  try {
    console.log("🗝️Attempting login!");
    const username = !form.username.includes("@")
      ? form.username
      : await findUsernameByEmail(form.username);
    const password = form.password;
    const url = `${ENDPOINT_USERS}/${SESSION}`;
    const method = POST;
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({ username, password });
    const response = await fetch(url, { method, headers, body });
    if (response.ok) {
      const responseAsJSON = await response.json();
      const { accessToken, refreshToken } = responseAsJSON;
      if (refreshToken) {
        dispatch(setRefreshToken(refreshToken));
      }
      if (accessToken) {
        localStorage.setItem("token", accessToken);
      }
      return responseAsJSON;
    } else {
      setLoading(false);
      console.log("😥TROUBLE LOGGING IN");
    }
  } catch (error) {
    console.log(error);
  }
};

export const attemptLogout = async () => {
  const token = localStorage.getItem("token");
  try {
    // end a session, scrubbing refreshToken
    console.log("🛎️Attempting logout!");
    const url = `${ENDPOINT_USERS}/${SESSION}`;
    const method = DELETE;
    const headers = { Authorization: `Bearer ${token}` };
    const response = await fetch(url, { method, headers });
    if (response.ok) {
      localStorage.removeItem("token");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  // get all users to a limit of 25 - public info only
  try {
    // console.log("🙋Getting Public User Info");
    const url = `${ENDPOINT_USERS}?limit=25`;
    const method = GET;
    const response = await fetch(url, { method });
    if (response.ok) {
      const users = await response.json();
      return users;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserByQuery = async (query: string) => {
  try {
    const queryIsEmail = query.includes("@");
    const criteria = queryIsEmail
      ? `email=${query.toLowerCase()}`
      : `username=${query.toLowerCase()}`;
    // console.log("🙋Getting User By Email or Username=>", criteria);
    const url = `${ENDPOINT_USERS}?${criteria}`;
    const method = GET;
    const response = await fetch(url, { method });
    if (response.ok) {
      const users = await response.json();
      return users;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUsersAsAdmin = async (_id: string) => {
  // get all users as admin - all info except refresh token
  // console.log("🙋Getting Users As Admin");
  const token = localStorage.getItem("token");
  try {
    const url =
      _id.length > 0
        ? `${ENDPOINT_USERS}/${_id}`
        : `${ENDPOINT_USERS}/${ADMIN}`;
    const method = GET;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(url, { method, headers });
    if (response.ok) {
      const users = await response.json();
      users.refreshToken = undefined;
      return _id.length > 0 ? [users] : users;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserRole = (level: number | null) => {
  // find user role based on their current level
  // console.log("🙋Getting User Role");
  return !level || level === null || level === 0 ? "Level 0" : `Level ${level}`;
};

export const clearLastNotification = async (notification: string[]) => {
  // console.log("🙋Clearing Last Notification");
  const token = localStorage.getItem("token");
  try {
    const url = `${ENDPOINT_USERS}/me`;
    const method = PUT;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    notification.pop();
    const body = JSON.stringify({ notification });
    const response = await fetch(url, { method, headers, body });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUserBio = async (bio: string, dispatch: Dispatch<any>) => {
  // console.log("🙋Updating User Bio");
  const token = localStorage.getItem("token");
  try {
    const url = `${ENDPOINT_USERS}/me`;
    const method = PUT;
    const body = JSON.stringify({ bio });
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const updated = await fetch(url, { method, headers, body });
    if (updated) {
      dispatch(setUserBio(bio));
    }
    return updated;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserXp = async (xp: number, dispatch: Dispatch<any>) => {
  // console.log("🙋Updating User Xp");
  const token = localStorage.getItem("token");
  try {
    const url = `${ENDPOINT_USERS}/me`;
    const method = PUT;
    const body = JSON.stringify({ xp });
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const updated = await fetch(url, { method, headers, body });
    if (updated) {
      dispatch(setUserPoints(xp));
    }
    return updated;
  } catch (error) {
    console.log(error);
  }
};

export const AddUserNotification = async (
  user: userInt,
  newNotification: string
) => {
  // console.log("🙋Adding User Notification");
  const token = localStorage.getItem("token");
  try {
    const url = `${ENDPOINT_USERS}/me`;
    const method = PUT;
    const { notification } = user;
    notification.push(newNotification);
    const body = JSON.stringify({ notification });
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const updated = await fetch(url, { method, headers, body });
    return updated;
  } catch (error) {
    console.log(error);
  }
};

export const attemptUpdateUser = async (bodyPar: userUpdateType, file: any) => {
  // console.log("🙋Updating My User");
  const token = localStorage.getItem("token");
  try {
    const url = `${ENDPOINT_USERS}/me`;
    const method = PUT;
    const formData = new FormData();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { first_name, last_name, username, email, bio } = bodyPar;
    first_name && formData.append("first_name", first_name);
    last_name && formData.append("last_name", last_name);
    username && formData.append("username", username);
    email && formData.append("email", email);
    bio && formData.append("bio", bio);
    file && formData.append("avatar", file);
    const updated = await fetch(url, { method, headers, body: formData });
    const updatedAsJSON = await updated.json();
    return updatedAsJSON;
  } catch (error) {
    console.log(error);
  }
};

export const addIDToTasksToHide = async (
  tasks_to_hide: string[],
  id: string,
  username: string,
  email: string
) => {
  // console.log("🙋Updating Users Completed Tasks To Hide");
  const token = localStorage.getItem("token");
  try {
    const url = `${ENDPOINT_USERS}/me`;
    const method = PUT;
    tasks_to_hide.push(id);
    const body = JSON.stringify({ tasks_to_hide, username, email });
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const updated = await fetch(url, { method, headers, body });
    return updated;
  } catch (error) {
    console.log(error);
  }
};

export const sendUsersNotification = async (notification: string) => {
  // console.log("🙋Sending Users A Notification");
  const token = localStorage.getItem("token");
  try {
    const url = `${ENDPOINT_USERS}/notification`;
    const method = POST;
    const body = JSON.stringify({ notification });
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const notified = await fetch(url, { method, headers, body });
    return notified;
  } catch (error) {
    console.log(error);
  }
};

export const refreshUserPoints = async (
  user: userInt,
  value: number,
  dispatch: Dispatch<any>
) => {
  // console.log("🙋Refreshing User Points");
  const { total_completed, total_xp, xp } = user;
  const newTotalCompleted = total_completed + 1;
  const newTotalPoints = total_xp + value;
  const newPoints = xp + value;
  dispatch(
    setUserPointsAndCompleted({
      ...user,
      xp: newPoints,
      total_xp: newTotalPoints,
      total_completed: newTotalCompleted,
    })
  );
};

export const refreshUserLevel = async (
  user: userInt,
  value: number,
  dispatch: Dispatch<any>
) => {
  // console.log("🙋Refreshing User Level");
  const token = localStorage.getItem("token");
  const { username, level, total_xp } = user;
  // each level corresponds to approximately 5 hard tasks (50)
  // for e.g., if we have 500 cumulative xp, level should be 2
  // if we have 550 cumulative xp, level should still be 2
  if (Math.floor((total_xp! + value) / 250) > level!) {
    const newLevel = Math.floor((total_xp! + value) / 250);
    try {
      const url = `${ENDPOINT_USERS}/me`;
      const method = PUT;
      const body = JSON.stringify({ level: newLevel });
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const updated = await fetch(url, { method, headers, body });
      const notification = `${username} levelled up to Level ${newLevel}!`;
      await AddUserNotification(
        user,
        `You levelled up to Level ${newLevel}, ${username}!`
      );
      await sendUsersNotification(notification);
      dispatch(setUserLevel(newLevel));
      return updated;
    } catch (error) {
      console.log(error);
    }
  } else {
    return;
  }
};

export const acceptOrRejectUser = async (username: string, action: string) => {
  // console.log("🙋Accepting/Rejecting Follow");
  const token = localStorage.getItem("token");
  try {
    const { publicUsers } = await getUserByQuery(username);
    const { _id } = publicUsers[0];
    const url = `${ENDPOINT_USERS}/${action}/${_id}`;
    const method = POST;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await fetch(url, { method, headers });
  } catch (error) {
    console.log(error);
  }
};

export const attemptDeleteUser = async () => {
  // console.log("🙋Deleting My User");
  const token = localStorage.getItem("token");
  try {
    const url = `${ENDPOINT_USERS}/me`;
    const method = DELETE;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const deleted = await fetch(url, { method, headers });
    return deleted;
  } catch (error) {
    console.log(error);
  }
};

export const getUsernameById = (
  followedUsers: followedUserInt[],
  userId: string
) => {
  const user = followedUsers.find((user) => user._id === userId);
  if (user) {
    return user.username;
  }
};

export const getIdByUsername = (
  followedUsers: followedUserInt[],
  username: string
) => {
  const user = followedUsers.find((user) => user.username === username);
  if (user) {
    return user._id;
  }
};

export const getAvatarById = (
  followedUsers: followedUserInt[],
  userId: string
) => {
  const user = followedUsers.find((user) => user._id === userId);
  if (user) {
    return user.avatar;
  }
};

export const getAvatarByUsername = (
  followedUsers: followedUserInt[],
  username: string
) => {
  const user = followedUsers.find((user) => user.username === username);
  if (user) {
    return user.avatar;
  }
};

// Admin Page Sorting Asc
export const sortUsersAsc = (usersList: userInt[], key: string) => {
  const sortedUsers = usersList.sort((a, b) => {
    const keyA =
      key === "username" ? a.username : key === "fullName" ? a.last_name : "";
    const keyB =
      key === "username" ? b.username : key === "fullName" ? b.last_name : "";
    if (keyA < keyB) {
      return -1;
    } else if (keyA > keyB) {
      return 1;
    } else {
      return 0;
    }
  });
  const checkSort =
    key !== "fullName"
      ? sortedUsers
      : sortedUsers.sort((c, d) => {
          const keyC = c.first_name;
          const keyD = d.first_name;
          if (keyC > keyD) {
            return -1;
          } else if (keyC < keyD) {
            return 1;
          } else {
            return 0;
          }
        });
  return checkSort;
};

// Admin Page Sorting Desc
export const sortUsersDesc = (usersList: userInt[], key: string) => {
  const sortedUsers = usersList.sort((a, b) => {
    const keyA =
      key === "username" ? a.username : key === "fullName" ? a.last_name : "";
    const keyB =
      key === "username" ? b.username : key === "fullName" ? b.last_name : "";
    if (keyA < keyB) {
      return -1;
    } else if (keyA > keyB) {
      return 1;
    } else {
      return 0;
    }
  });
  const checkSort =
    key !== "fullName"
      ? sortedUsers
      : sortedUsers.sort((c, d) => {
          const keyC = c.first_name;
          const keyD = d.first_name;
          if (keyC > keyD) {
            return -1;
          } else if (keyC < keyD) {
            return 1;
          } else {
            return 0;
          }
        });
  return checkSort;
};
