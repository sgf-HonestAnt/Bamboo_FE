import { ENDPOINT_GIFTS, ENDPOINT_MYREWARDS, POST, PUT } from "../const/str";

export async function sendXpGift(userId: string, xp: number) {
  console.log("🙋Sending Xp Gift");
  const token = localStorage.getItem("token");
  try {
    const url = `${ENDPOINT_GIFTS}/${userId}`;
    console.log(url);
    const method = POST;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({ xp });
    const response = await fetch(url, { method, headers, body });
    const { message } = await response.json();
    if (response.ok) {
      console.log("NOW LOAD GIFTS???", message);
      return message;
    } else {
      console.log("CHECK REWARD ID!");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function purchaseReward(
  rewardId: string,
  numAvailable: number,
  xp: number
) {
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
}
