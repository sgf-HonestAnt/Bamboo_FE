import { Dispatch } from "react";
import { setUserPoints, setUserRewards } from "../../redux/actions/user";
import { rewardsInt } from "../../typings/interfaces";
import { ENDPOINT_GIFTS, ENDPOINT_MYREWARDS, POST, PUT } from "../const/str";

export async function sendXpGift(
  userId: string,
  xp: number,
  currentPoints: number,
  dispatch: Dispatch<any>
) {
  // console.log("🙋Sending Xp Gift");
  const token = localStorage.getItem("token");
  try {
    const url = `${ENDPOINT_GIFTS}/${userId}`;
    const method = POST;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({ xp });
    const response = await fetch(url, { method, headers, body });
    const { message } = await response.json();
    if (response.ok) {
      dispatch(setUserPoints(currentPoints - xp));
      return message;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function purchaseReward(
  rewards: rewardsInt[],
  reward: rewardsInt,
  xp: number,
  dispatch: Dispatch<any>
) {
  // console.log("🙋Purchasing Reward Badge");
  const token = localStorage.getItem("token");
  try {
    const url = `${ENDPOINT_MYREWARDS}/${reward._id}`;
    const method = PUT;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      reward: reward.reward,
      value: reward.value,
      available: 0,
    }); // remember in future badges can only ever be purchased once.
    const response = await fetch(url, { method, headers, body });
    const { value } = await response.json();
    const remainingXp = xp - value;
    let updatedRewards = rewards.filter((item) => item._id !== reward._id);
    updatedRewards.push({
      reward: reward.reward,
      value: reward.value,
      available: null,
      _id: reward._id,
    });
    if (response.ok) {
      dispatch(setUserPoints(remainingXp));
      dispatch(setUserRewards(updatedRewards));
      return remainingXp;
    }
  } catch (error) {
    console.log(error);
  }
}
