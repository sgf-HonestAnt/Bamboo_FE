import { BE_URL, GET, USERS, TASKS, ADMIN } from "./constants";

export const getUsers = async () => {
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
export const getUsersAsAdmin = async (_id: string) => { 
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
      console.log("users=>", users);
      return _id.length > 0 ? [users] : users;
    }
  } catch (error) {
    console.log(error);
  }
};
