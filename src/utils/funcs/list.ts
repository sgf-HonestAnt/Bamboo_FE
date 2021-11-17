import { Dispatch } from "redux";
import { setSuperlist } from "../../redux/actions/achievements";
import { achievementInt } from "../../typings/interfaces";
import { congrats } from "../constants";
import { getCurrDateTimeAsString } from "../funcDates";

const createList = async (
  list: achievementInt[],
  username: string,
  dispatch: Dispatch<any>
) => {
  let super_list: string[] = [];
  let nice: string[] = congrats;
  list.map((ach, i) => {
    const timestamp = getCurrDateTimeAsString(ach);
    const num = i < nice.length ? i : Math.floor(Math.random() * nice.length);
    return super_list.push(
      `${ach.username === username ? "you" : ach.username} completed task: "${
        ach.item
      }" on ${timestamp}. ${nice[num]}`
    );
  });
  dispatch(setSuperlist(super_list));
};

export default createList;
