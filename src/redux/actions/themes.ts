import { SELECT_THEME } from "../../utils/constants";
import { themesInt } from "../../typings/interfaces";

export const setTheme = (selectedTheme: themesInt) => ({
  type: SELECT_THEME,
  payload: selectedTheme,
});