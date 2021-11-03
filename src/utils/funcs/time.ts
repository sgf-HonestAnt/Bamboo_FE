import { achievementInt } from "../../typings/interfaces";

const getTime = (ach: achievementInt) => {
  const timestamp = new Date(ach.createdAt).toString().split(" ");
  const weekday = timestamp[0];
  const date = timestamp[2];
  const month = timestamp[1];
  const time = timestamp[4].toString();
  const zone = timestamp[5].toString().split("+")[0];
  return `${weekday}, ${date} ${month} @ ${time.split(":")[0]}:${
    time.split(":")[1]
  } ${zone}`;
};

export default getTime;
