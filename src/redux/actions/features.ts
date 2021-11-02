import { BE_URL, GET, SET_FEATURES } from "../../utils/constants";
import { AppDispatch } from "../store";

export function setFeatures() {
  return async (dispatch: AppDispatch) => {
    const url = `${BE_URL}/features`;
    const method = GET;
    try {
      const response = await fetch(url, {
        method,
      });
      if (response.ok) {
        const payload = await response.json();
        setTimeout(() => {
          dispatch({
            type: SET_FEATURES,
            payload,
          }); 
        }, 1000);
      } else {
        console.log("error in fetching features");
      }
    } catch (error) {
      console.log("error in catch of setFeatures", error);
    }
  };
}
