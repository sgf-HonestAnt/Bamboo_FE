const getTomorrow = (today: Date) => {
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate() + 1;
    return new Date(`${year}-${month}-${date}`);
  };

  export default getTomorrow