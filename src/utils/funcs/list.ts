import { Dispatch } from "redux";
import { setSuperlist } from "../../redux/actions/achievements";
import { achievementInt, followedUserInt } from "../../typings/interfaces";
import { congrats } from "../constants";
import getTime from "./time";

const createList = async (
  list1: achievementInt[],
  list2: followedUserInt[],
  dispatch: Dispatch<any>
) => {
  let super_list: string[] = [];
  let nice: string[] = congrats;
  list1.map((ach, i) => {
    const timestamp = getTime(ach);
    const num = i < nice.length ? i : Math.floor(Math.random() * nice.length); 
    return super_list.push(
      `you completed task: "${ach.item}" on ${timestamp}. ${nice[num]}`
    );
  });
  list2.map((user, i) => {
    const followedUser = user.username;
    return (
      user.achievements.length > 0 &&
      user.achievements.map((ach) => {
        const timestamp = getTime(ach);
        const num = i < nice.length ? i : 0;
        return super_list.push(
          `${followedUser} completed task: "${ach.item}" on ${timestamp}. ${nice[num]}`
        );
      })
    );
  });
  dispatch(setSuperlist(super_list));
};

export default createList;
