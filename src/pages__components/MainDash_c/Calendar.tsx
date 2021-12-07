import { Key, useEffect, useState } from "react";
import { taskInt, userInt } from "../../typings/interfaces";
import { ICOURGENT } from "../../utils/appIcons";
import {
  getFirstLastDayOfMonth,
  getMonthByIndex,
  getNumberOfDaysInMonth,
} from "../../utils/f_dates";
import { getTasks } from "../../utils/f_tasks";

type DashCalenCardProps = { user: userInt };
const DashCalenCard = (props: DashCalenCardProps) => {
  const { user } = props;
  const [tasks, setTasks] = useState([]);
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const attemptLoad = async () => {
    // load tasks with deadline this month
    const currentMonth = `${year}-${month + 1}`;
    const data = await getTasks();
    const { awaited, in_progress } = data;
    const tasksDueThisMonth = awaited
      .concat(in_progress)
      .filter((t: taskInt) => t.deadline !== null);
    const tasksThisMonth = tasksDueThisMonth.filter(
      (t: taskInt) => t.deadline!.slice(0, 7) === currentMonth
    );
    // console.log(tasksThisMonth); // this isn't working so well...
    setTasks(tasksThisMonth);
  };

  const numberOfDays = getNumberOfDaysInMonth(new Date());
  const { firstDay, lastDay } = getFirstLastDayOfMonth(new Date());
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
    if (i < 10) {
      daysArray.push(`0${i}`);
    } else {
      daysArray.push(`${i}`); // if for e.g. 31 days this month: [01,02,03,04,...29,30,31]
    }
  }
  for (let i = 0; i < addedDays; i++) {
    daysArray.unshift(0); // if for e.g. first day falls on wednesday: [0,0,01,02,03,04...29,30,31]
  }
  for (let i = 0; i < addedDaysAtEnd; i++) {
    daysArray.push(0); // if for e.g. last day falls on friday: [0,0,01,02,03,04...29,30,31,0,0]
  }

  useEffect(() => {
    attemptLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='dashboard__calendar-card m-2'>
      <div className='dashboard__card-header'>
        {getMonthByIndex(new Date())}
      </div>
      <div className='red'>
        <ICOURGENT />
        Show number of tasks per day, and when click, go to tasks for that day
      </div>
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
              .map((d: number | string, i: Key | null | undefined) => (
                <div
                  key={i}
                  className={
                    d !== 0
                      ? "dashboard__calendar-card__box"
                      : "dashboard__calendar-card__box-empty"
                  }>
                  <div>{d !== 0 && tasks.filter(
                        (t: taskInt) => t.deadline!.slice(8, 10) === d
                      ).length < 1 && d}</div>
                  <div>
                    {`${
                      tasks.filter(
                        (t: taskInt) => t.deadline!.slice(8, 10) === d
                      ).length > 0
                        ? `[${
                            tasks.filter(
                              (t: taskInt) => t.deadline!.slice(8, 10) === d
                            ).length
                          }]`
                        : ""
                    }`}
                  </div>
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default DashCalenCard;
