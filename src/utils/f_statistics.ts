export function findMostUsedValue(data: any) {
  const array = data.map((data: any) => data.total);
  const highestUsed = Math.max(...array);
  const arrayOfHighestUsed = array.filter(
    (value: number) => value === highestUsed
  );
  const index = array.findIndex((value: number) => value === highestUsed);
  const howMany = arrayOfHighestUsed.filter(
    (value: number) => value === highestUsed
  ).length;
  console.log("HIGH=>", data, arrayOfHighestUsed, highestUsed, howMany);
  return highestUsed && howMany > 1
    ? `One of the values you used the most was ${data[index].name}.`
    : highestUsed
    ? `Most of your tasks have a value of ${data[index].name}.`
    : null;
}
