import { Key } from "react";
import {
  getFirstDayOfThisMonth,
  getLastDayOfThisMonth,
  getMonthByIndex,
  getNumberOfDaysInMonth,
} from "../../utils/dateFuncs";

type DashCalenCardProps = {};

const DashCalenCard = (props: DashCalenCardProps) => {
  //   const {} = props;
  const month = getMonthByIndex();
  const numberOfDays = getNumberOfDaysInMonth();
  const firstDay = getFirstDayOfThisMonth();
  const lastDay = getLastDayOfThisMonth();
  // first day being monday for our purposes, if firstDay === Sunday it falls at end of week
  const addedDays =
    firstDay === 0
      ? 6
      : firstDay === 1
      ? 0
      : firstDay === 2
      ? 1
      : firstDay === 3
      ? 2
      : firstDay === 4
      ? 3
      : firstDay === 5
      ? 4
      : 5;
  const addedDaysAtEnd =
    lastDay === 0
      ? 0
      : lastDay === 1
      ? 6
      : lastDay === 2
      ? 5
      : lastDay === 3
      ? 4
      : lastDay === 4
      ? 3
      : lastDay === 5
      ? 2
      : 1;
  const numberOfWeeks = firstDay === 1 && numberOfDays === 28 ? 4 : 5;
  let daysArray: number[] | any = [];
  let weeksArray: number[] | any = [];
  for (let i = 1; i < numberOfWeeks + 1; i++) {
    weeksArray.push(i);
  }
  for (let i = 1; i < numberOfDays + 1; i++) {
    daysArray.push(i); // if for e.g. 31 days this month: [1,2,3,4,...29,30,31]
  }
  for (let i = 0; i < addedDays; i++) {
    daysArray.unshift(0); // if for e.g. first day falls on wednesday: [0,0,1,2,3,4...29,30,31]
  }
  for (let i = 0; i < addedDaysAtEnd; i++) {
    daysArray.push(0); // if for e.g. last day falls on friday: [0,0,1,2,3,4...29,30,31,0,0]
  }
  return (
    <div className='dashboard__calendar-card m-2'>
      <div className='dashboard__calendar-card__month-line'>{month}</div>
      <div className='dashboard__calendar-card__line'>
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <div key={i} className='dashboard__calendar-card__box-empty'>
            {d}
          </div>
        ))}
      </div>
      {weeksArray.map((w: string | undefined, i: Key | any) => {
        let a = 7 * i;
        let b = 7 * (i + 1);
        return (
          <div key={i} className='dashboard__calendar-card__line' id={w}>
            {daysArray
              .slice(a, b) //
              .map((d: number, i: Key | null | undefined) => (
                <div
                  key={i}
                  className={
                    d !== 0
                      ? "dashboard__calendar-card__box"
                      : "dashboard__calendar-card__box-empty"
                  }>
                  {d !== 0 && d}
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default DashCalenCard;
