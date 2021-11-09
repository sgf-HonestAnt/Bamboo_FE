const getMinMaxDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
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

export default getMinMaxDate;
