import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt } from "../../../typings/interfaces";
import { ICOSUN } from "../../../utils/appIcons";
import { getSelectedDateAsString } from "../../../utils/f_dates";

const TodayTasks = () => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const tasks = state.currentTasks;
  const { awaited, in_progress } = tasks;
  const allTasks = awaited.concat(in_progress);
  const today = getSelectedDateAsString(new Date())
  console.log(today)
  console.log(allTasks)
  const numOfTodayTasks = allTasks.filter((task) => task.deadline?.slice(0,10) === today).length
  return (
    <div className="m-2 p-1 dashboard__tasks-card__task-box">
      <ICOSUN /> {numOfTodayTasks} task{numOfTodayTasks===1?"":"s"} today
    </div>
  );
}; 

export default TodayTasks;
