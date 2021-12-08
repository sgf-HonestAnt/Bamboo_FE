import { BE_URL, USERS, POST } from "./appConstants";

export const requestFollow = async (sendee: string) => {
  const token = localStorage.getItem("token");
  try {
    const url = `${BE_URL}/${USERS}/request/${sendee}`;
    const method = POST;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(url, { method, headers });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
export const acceptFollow = async (sendee: string) => {
  const token = localStorage.getItem("token");
  try {
    const url = `${BE_URL}/${USERS}/accept/${sendee}`;
    const method = POST;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(url, { method, headers });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
export const rejectFollow = async (sendee: string) => {
  const token = localStorage.getItem("token");
  try {
    const url = `${BE_URL}/${USERS}/reject/${sendee}`;
    const method = POST;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(url, { method, headers });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};