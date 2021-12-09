import { History } from "history";
import { Dispatch } from "redux";
import { setRefreshToken, setUserBio } from "../redux/actions/user";
import { userInt } from "../typings/interfaces";
import { loginFormProps, userUpdateType } from "../typings/types";
import {
  BE_URL,
  GET,
  PUT,
  USERS,
  ADMIN,
  SESSION,
  POST,
  DELETE,
} from "./appConstants";

export const findUsernameByEmail = async (email: string) => {
  const url = `${BE_URL}/${USERS}?email=${email}`;
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
  history: string[] | History<unknown>,
  dispatch: Dispatch<any>
) => {
  try {
    console.log("🗝️attempt login!");
    const username = !form.username.includes("@")
      ? form.username
      : await findUsernameByEmail(form.username);
    const password = form.password;
    const url = `${BE_URL}/${USERS}/${SESSION}`;
    const method = POST;
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({ username, password });
    const response = await fetch(url, { method, headers, body });
    if (response.ok) {
      const { accessToken, refreshToken } = await response.json();
      if (refreshToken) {
        dispatch(setRefreshToken(refreshToken));
      }
      if (accessToken) {
        localStorage.setItem("token", accessToken);
      }
    } else {
      console.log("😥TROUBLE LOGGING IN");
      history.push("/login");
    }
  } catch (error) {
    console.log(error);
  }
};
export const getUsers = async () => {
  // get all users to a limit of 25 - public info only
  try {
    const url = `${BE_URL}/${USERS}?limit=25`;
    const method = GET;
    const response = await fetch(url, { method });
    if (response.ok) {
      const users = await response.json();
      console.log("users=>", users);
      return users;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getUserByQuery = async (query: string) => {
  try {
    const queryIsEmail = query.includes("@");
    const criteria = queryIsEmail ? `email=${query}` : `username=${query}`;
    const url = `${BE_URL}/${USERS}?${criteria}`;
    const method = GET;
    const response = await fetch(url, { method });
    if (response.ok) {
      const users = await response.json();
      console.log("users=>", users);
      return users;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getUsersAsAdmin = async (_id: string) => {
  // get all users as admin - all info except refresh token
  const token = localStorage.getItem("token");
  try {
    const url =
      _id.length > 0
        ? `${BE_URL}/${USERS}/${_id}`
        : `${BE_URL}/${USERS}/${ADMIN}`;
    const method = GET;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(url, { method, headers });
    if (response.ok) {
      const users = await response.json();
      users.refreshToken = undefined;
      console.log("users=>", users);
      return _id.length > 0 ? [users] : users;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getUserRole = (level: number | null) => {
  // find user role based on their current level
  return !level || level === null || level < 5
    ? "Newbie!"
    : level > 5 && level < 15
    ? "Bamboo Seeker"
    : level > 15 && level < 30
    ? "Gentle Warrior"
    : level > 30 && level < 50
    ? "Proficient Panda"
    : "Adept";
};
export const clearLastNotification = async (notification: string[]) => {
  const token = localStorage.getItem("token");
  try {
    const url = `${BE_URL}/${USERS}/me`;
    const method = PUT;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    console.log(notification);
    notification.pop();
    console.log(notification);
    const body = JSON.stringify({ notification });
    console.log(body);
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
  const token = localStorage.getItem("token");
  try {
    const url = `${BE_URL}/${USERS}/me`;
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
export const AddUserNotification = async (
  user: userInt,
  newNotification: string
) => {
  const token = localStorage.getItem("token");
  try {
    const url = `${BE_URL}/${USERS}/me`;
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
  const token = localStorage.getItem("token");
  try {
    const url = `${BE_URL}/${USERS}/me`;
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
    console.log(updatedAsJSON);
    return updatedAsJSON;
  } catch (error) {
    console.log(error);
  }
};
export const sendUsersNotification = async (notification: string) => {
  const token = localStorage.getItem("token");
  try {
    const url = `${BE_URL}/${USERS}/notification`;
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
export const refreshUserLevel = async (user: userInt) => {
  const token = localStorage.getItem("token");
  const { username, level, total_xp } = user;
  // each level corresponds to approximately 5 hard tasks (50)
  // for e.g., if we have 500 cumulative xp, level should be 2
  // if we have 550 cumulative xp, level should still be 2
  if (Math.floor(total_xp! / 250) > level!) {
    console.log("🕘time to level up", Math.floor(total_xp! / 250));
    const newLevel = Math.floor(total_xp! / 250);
    try {
      const url = `${BE_URL}/${USERS}/me`;
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
      return updated;
    } catch (error) {
      console.log(error);
    }
  } else {
    return;
  }
};
export const acceptOrRejectUser = async (username: string, action: string) => {
  const token = localStorage.getItem("token");
  try {
    const { publicUsers } = await getUserByQuery(username);
    const { _id } = publicUsers[0];
    const url = `${BE_URL}/${USERS}/${action}/${_id}`;
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
  const token = localStorage.getItem("token");
  try {
    const url = `${BE_URL}/${USERS}/me`;
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
