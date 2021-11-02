import { SET_REFRESH_TOKEN } from "../../utils/constants";

export const setRefreshToken = (token: string) => ({
  type: SET_REFRESH_TOKEN,
  payload: token
})


