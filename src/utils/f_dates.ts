import { achievementInt, taskInt } from "../typings/interfaces";
///////////////////////////////////////////////////////////////////
export const getDayByIndex = (date: Date) => {
  // simple func to get current day
  const dayAsNum = date.getDay();
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
///////////////////////////////////////////////////////////////////
export const getMonthByIndex = (date: Date) => {
  // simple func to get current month
  const monthAsNum = date.getMonth();
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
///////////////////////////////////////////////////////////////////
export const getDayMonthYearAsString = (datePar: Date) => {
  // simple func to get current date used for DashTasksCard and Tasks>PageTaskCards
  const year = datePar.getFullYear().toString();
  const month = getMonthByIndex(datePar);
  const date = datePar.getDate().toString();
  const dateEnd =
    date[date.length - 1] === "1"
      ? "st"
      : date[date.length - 1] === "2"
      ? "nd"
      : date[date.length - 1] === "3"
      ? "rd"
      : "th";
  const day = getDayByIndex(new Date());
  return `${day}, ${date}${dateEnd} ${month} ${year}`;
};
///////////////////////////////////////////////////////////////////
export const getFirstLastDayOfMonth = (date: Date) => {
  // get the first and last day of specific month
  const year = date.getFullYear();
  const firstDay = new Date(year, 1, 1).getDay();
  const numberOfDays = getNumberOfDaysInMonth(date);
  const lastDay = new Date(year, 1, numberOfDays).getDay();
  return { firstDay, lastDay };
};
///////////////////////////////////////////////////////////////////
export const getNumberOfDaysInMonth = (date: Date) => {
  // get number of days in specific month
  const month = getMonthByIndex(date);
  const year = date.getFullYear();
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
///////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////
export const getShortDateAsString = (datePar: any) => {
  const dateAsDate = new Date(datePar);
  const day = getDayByIndex(dateAsDate);
  const date = dateAsDate.getDate();
  const month = getMonthByIndex(dateAsDate);
  return `${day.slice(0, 3)}, ${date} ${month.slice(0, 3)}`;
};
///////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////
export const getMinMaxDateAsString = (datePar: Date) => {
  // minimum date for task creation is present date
  // maximum date for task creation is one year from now
  const year = datePar.getFullYear();
  const month = datePar.getMonth() + 1;
  const date = datePar.getDate();
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
///////////////////////////////////////////////////////////////////
export const filterTasksByOverdue = async (tasks: taskInt[]) => {
  let array: taskInt[] = [];
  for (let i = 0; i < tasks.length; i++) {
    const date1 = getSelectedDateAsString(new Date());
    const date2 = tasks[i].deadline!.slice(0, 10);
    const taskIsOverdue = await checkTaskOverdue(date1, date2);
    if (taskIsOverdue) {
      array.push(tasks[i]);
    }
  }
  return array;
};
///////////////////////////////////////////////////////////////////
export const checkTaskOverdue = async (date1: string, date2: string) => {
  const year1 = date1.slice(0, 4);
  const month1 = date1.slice(5, 7);
  const day1 = date1.slice(8, 10);
  const year2 = date2.slice(0, 4);
  const month2 = date2.slice(5, 7);
  const day2 = date2.slice(8, 10);
  if (
    year1 > year2 ||
    (year1 >= year2 && month1 > month2) ||
    (year1 >= year2 && month1 >= month2 && day1 > day2)
  ) {
    return true;
  } else {
    return false;
  }
};
