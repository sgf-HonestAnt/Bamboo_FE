import { setRefreshToken } from "../../redux/actions/user";
import { BE_URL } from "../constants";

const refreshSession = async (refreshToken: string) => {
  try {
    const data = { actualRefreshToken: refreshToken };
    const response = await fetch(`${BE_URL}/users/session/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const { accessToken, refreshToken } = await response.json();
      localStorage.setItem("token", accessToken);
      setRefreshToken(refreshToken);
    }
  } catch (error) {
    console.log("error in fetching refreshToken", error);
  }
};

export default refreshSession;