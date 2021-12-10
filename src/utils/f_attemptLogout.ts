import { BE_URL, DELETE, SESSION, USERS } from "./appConstants";

const attemptLogout = async () => {
  const token = localStorage.getItem("token");
  try {
    // end a session, scrubbing refreshToken
    // 💡 when implementing refreshToken again, make sure it is added to the list of used tokens at backend upon logout
    console.log("🛎️Attempting logout!");
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
export default attemptLogout
