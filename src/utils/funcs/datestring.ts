const getDateString = (dateAsDate: { getFullYear: () => any; getMonth: () => number; getDate: () => any; }) => {
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

export default getDateString;
