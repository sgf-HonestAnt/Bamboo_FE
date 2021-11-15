import { achievementInt } from "../../typings/interfaces";

export const getCurrDate = () => {
  return new Date().getDate()
}

export const getCurrDay = () => {
  return new Date().getDay()
}

export const getCurrMonth = () => {
  return new Date().getMonth()
} 

export const getCurrYear = () => {
  return new Date().getFullYear()
}

export const getDayMonthYearAsString = () => {
  // simple func to get current date used for DashTasksCard
  const year = getCurrYear().toString();
  const month = getMonthByIndex();
  const date = getCurrDate().toString();
  const dateEnd =
    date[date.length - 1] === "1"
      ? "st"
      : date[date.length - 1] === "2"
      ? "nd"
      : date[date.length - 1] === "3"
      ? "rd"
      : "th";
  const day = getDayByIndex();
  return `${day}, ${date}${dateEnd} ${month} ${year}`;
};

export const getDayByIndex = () => {
  // simple func to get current day
  const dayAsNum = getCurrDay();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return dayNames[dayAsNum];
};

export const getMonthByIndex = () => {
  // simple func to get current month
  const monthAsNum = getCurrMonth();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[monthAsNum];
};

export const getFirstDayOfThisMonth = () => {
  const year = getCurrYear();
  const day = new Date(year, 1, 1).getDay();
  return day
};

export const getLastDayOfThisMonth = () => {
  const year = getCurrYear();
  const numberOfDays = getNumberOfDaysInMonth()
  const day = new Date(year, 1, numberOfDays).getDay();
  return day
};

export const getNumberOfDaysInMonth = () => {
  const month = getMonthByIndex();
  const year = getCurrYear();
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const number =
    month === "September" ||
    month === "April" ||
    month === "June" ||
    month === "November"
      ? 30
      : month === "February" && isLeapYear
      ? 29
      : month === "February" && !isLeapYear
      ? 28
      : 31;
  return number;
};

export const getCurrDateTimeAsString = (ach: achievementInt) => {
  // simple func to get current time used for achievements
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

export const getTomorrowAsString = (today: Date) => {
  // simple func to get tomorrow date as date string (see getSelectedDateAsString)
  const year = getCurrYear();
  const month = getCurrMonth() + 1;
  const date = getCurrDate() + 1;
  return new Date(`${year}-${month}-${date}`);
};

export const getSelectedDateAsString = (dateAsDate: {
  // date string for tasks looks like `2021-11-15`
  getFullYear: () => any;
  getMonth: () => number;
  getDate: () => any;
}) => {
  const year = dateAsDate.getFullYear();
  const month = dateAsDate.getMonth() + 1;
  const date = dateAsDate.getDate();
  const shortMonth = month.toString().length < 2;
  const shortDate = date.toString().length < 2;
  let dateAsString;
  if (shortMonth && shortDate) {
    dateAsString = `${year}-0${month}-0${date}`;
  } else if (shortMonth) {
    dateAsString = `${year}-0${month}-${date}`;
  } else if (shortDate) {
    dateAsString = `${year}-${month}-0${date}`;
  } else {
    dateAsString = `${year}-${month}-${date}`;
  }
  return dateAsString;
};

export const getMinMaxDateAsString = () => {
  // minimum date for task creation is present date
  // maximum date for task creation is one year from now
  const year = getCurrYear();
  const month = getCurrMonth() + 1;
  const date = getCurrDate();
  const shortMonth = month.toString().length < 2;
  const shortDate = date.toString().length < 2;
  let yearMonthDate;
  let yearMonthDatePlus;
  if (shortMonth && shortDate) {
    yearMonthDate = `${year}-0${month}-0${date}`;
    yearMonthDatePlus = `${year + 2}-0${month}-0${date}`;
  } else if (shortMonth) {
    yearMonthDate = `${year}-0${month}-${date}`;
    yearMonthDatePlus = `${year + 2}-0${month}-${date}`;
  } else if (shortDate) {
    yearMonthDate = `${year}-${month}-0${date}`;
    yearMonthDatePlus = `${year + 2}-${month}-0${date}`;
  } else {
    yearMonthDate = `${year}-${month}-${date}`;
    yearMonthDatePlus = `${year + 2}-${month}-${date}`;
  }
  return {
    min: yearMonthDate,
    max: yearMonthDatePlus,
  };
};
