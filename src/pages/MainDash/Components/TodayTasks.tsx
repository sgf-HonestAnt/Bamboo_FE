import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt, taskInt } from "../../../typings/interfaces";
import {
  filterTasksByOverdue,
  getSelectedDateAsString,
} from "../../../utils/f_dates";

const TodayTasks = () => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const tasks = state.currentTasks;
  const { awaited, in_progress } = tasks;
  const allTasks = awaited.concat(in_progress);
  const today = getSelectedDateAsString(new Date());
  const [overdueTasks, setOverdueTasks] = useState<taskInt[]>([]);
  const findIfTasksOverdue = async () => {
    let array: taskInt[] = [];
    const tasksWithDeadlines = allTasks.filter(
      (task: taskInt) => task.deadline !== null
    );
    if (tasksWithDeadlines) {
      array = await filterTasksByOverdue(tasksWithDeadlines);
    }
    setOverdueTasks(array);
  };
  const numOfTodayTasks = allTasks.filter(
    (task) => task.deadline?.slice(0, 10) === today
  ).length;
  useEffect(() => {
    findIfTasksOverdue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='m-2 p-1 dashboard__tasks-card__task-box'>
      {numOfTodayTasks + overdueTasks.length} task
      {numOfTodayTasks === 1 ? "" : "s"} due now{" "}
      {overdueTasks.length > 0 && `with ${overdueTasks.length} overdue`}
    </div>
  );
};

export default TodayTasks;
