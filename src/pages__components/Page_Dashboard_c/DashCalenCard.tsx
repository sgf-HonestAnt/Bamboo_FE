import { Key } from "react";
import { Card } from "react-bootstrap";
import {
  getCurrMonth,
  getFirstDayOfThisMonth,
  getLastDayOfThisMonth,
  getMonthByIndex,
  getNumberOfDaysInMonth,
} from "../../utils/funcs/dateTimeFuncs";

type DashCalenCardProps = {};

const DashCalenCard = (props: DashCalenCardProps) => {
  //   const {} = props;
  const month = getMonthByIndex();
  const numberOfDays = getNumberOfDaysInMonth();
  const firstDay = getFirstDayOfThisMonth(); // 0 for sunday, 1 for monday etc
  const lastDay = getLastDayOfThisMonth();
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
    daysArray.push(i);
    // [1,2,3,4,5,6,7,...]
  }
  for (let i = 0; i < addedDays; i++) {
    daysArray.unshift(0);
    // [0,0,0,1,2,3,4,...] if for e.g. first day fell on thursday
  }
  for (let i = 0; i < addedDaysAtEnd; i++) {
    daysArray.push(0);
    // [0,0,0,1,2,3,4,...] if for e.g. first day fell on thursday
  }
  console.log(
    numberOfDays,
    // addedDays,
    // addedDaysAtEnd,
    numberOfWeeks,
    firstDay,
    lastDay,
    weeksArray,
    daysArray
  );
  return (
    <div className='dashboard__calendar-card m-2'>
      <div className='dashboard__calendar-card__month-line'>{month}</div>
      <div className='dashboard__calendar-card__line'>
        <div className='dashboard__calendar-card__box-empty'>M</div>
        <div className='dashboard__calendar-card__box-empty'>T</div>
        <div className='dashboard__calendar-card__box-empty'>W</div>
        <div className='dashboard__calendar-card__box-empty'>T</div>
        <div className='dashboard__calendar-card__box-empty'>F</div>
        <div className='dashboard__calendar-card__box-empty'>S</div>
        <div className='dashboard__calendar-card__box-empty'>S</div>
      </div>
      {weeksArray.map((w: string | undefined, i: Key | any) => {
        let a = 7 * i;
        // 0 // 7 // 14 // 21
        let b = 7 * (i + 1);
        // 7 // 14 // 21 // 28
        return (
          <div key={i} className='dashboard__calendar-card__line' id={w}>
            {daysArray
              .slice(a, b) //
              .map((d: number) => (
                <div
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
