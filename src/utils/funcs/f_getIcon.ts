import { TASK_CATEGORIES, TASK_CATEGORY_ICONS } from "../constants";
import { ICOSTAR } from "../icons";

const getIcon = (category: string) => {
  const index = TASK_CATEGORIES.findIndex(
    (cat) => cat.toLowerCase() === category.toLowerCase()
  );
  if (index !== -1) {
    let CAT_ICON = TASK_CATEGORY_ICONS[index];
    return CAT_ICON;
  } else {
    let CAT_STAR = ICOSTAR;
    return CAT_STAR;
  }
};
export default getIcon;
