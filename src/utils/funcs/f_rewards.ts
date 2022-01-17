import { ENDPOINT_MYREWARDS, PUT } from "../const/str";

export const purchaseReward = async (
  rewardId: string,
  numAvailable: number,
  xp: number
) => {
  console.log("🙋Purchasing Reward Badge");
  const token = localStorage.getItem("token");
  try {
    const url = `${ENDPOINT_MYREWARDS}/${rewardId}`;
    console.log(url);
    const method = PUT;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const available = numAvailable - 1;
    const body = JSON.stringify({ available });
    const response = await fetch(url, { method, headers, body });
    const { value } = await response.json();
    const remainingXp = xp - value;
    if (response.ok) {
      console.log("NOW LOAD REWARDS???", remainingXp);
      return remainingXp;
    } else {
      console.log("CHECK REWARD ID!");
    }
  } catch (error) {
    console.log(error);
  }
};
