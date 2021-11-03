import { Dispatch } from "redux";
import { setSuperlist } from "../../redux/actions/achievements";
import { achievementInt } from "../../typings/interfaces";
import { congrats } from "../constants";
import getTime from "./time";

const createList = async (list: achievementInt[], dispatch: Dispatch<any>) => {
  let super_list: string[] = [];
  let nice: string[] = congrats;
  list.map((ach, i) => {
    const timestamp = getTime(ach);
    const num = i < nice.length ? i : Math.floor(Math.random() * nice.length);
    return super_list.push(
      `${ach.username} completed task: "${ach.item} on ${timestamp}. ${nice[num]}`
    );
  });
  dispatch(setSuperlist(super_list));
};

export default createList;
