import { BE_URL, DELETE, SESSION, USERS } from "../constants";

const attemptLogout = async () => {
  const token = localStorage.getItem("token");
  try {
    console.log("🛎️attempt logout!");
    const url = `${BE_URL}/${USERS}/${SESSION}`;
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

export default attemptLogout;
