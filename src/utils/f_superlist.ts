import { Dispatch } from "redux";
import { setSuperlist } from "../redux/actions/achievements";
import { achievementInt } from "../typings/interfaces";
import { congrats, LIST_OF_VOWELS, NONE } from "./appConstants";
import { getCurrDateTimeAsString } from "./f_dates";

const createSuperlist = async (
  // create list of achievements with randomised congrats
  list: achievementInt[],
  username: string,
  dispatch: Dispatch<any>
) => {
  console.log("🙋Creating Achievement SuperList");
  let super_list: string[] = [];
  let nice: string[] = congrats;
  list.map((ach, i) => {
    const timestamp = getCurrDateTimeAsString(ach);
    const num = i < nice.length ? i : Math.floor(Math.random() * nice.length);
    const achIsGift = ach.item.includes("sent you a");
    if (!achIsGift) {
      return ach.username === username
        ? super_list.push(
            `you completed task: ${ach.item} on ${timestamp}. ${nice[num]}!`
          )
        : super_list.push(
            `${ach.username} completed ${
              LIST_OF_VOWELS.some((v) => v === ach.category.split("")[0])
                ? "an"
                : "a"
            } ${
              ach.category !== NONE ? ach.category! : ""
            } task on ${timestamp}!`
          );
    } else {
      return super_list.push(ach.item);
    }
  });
  dispatch(setSuperlist(super_list));
};

export default createSuperlist;
