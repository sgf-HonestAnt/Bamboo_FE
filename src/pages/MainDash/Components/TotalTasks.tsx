import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt } from "../../../typings/interfaces";

const TotalTasks = () => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const tasks = state.currentTasks;
  const { awaited, in_progress } = tasks;
  const allTasks = awaited.concat(in_progress);
  const numOfTotalTasks = allTasks.length;
  return (
    <div className="m-2 p-1 dashboard__tasks-card__task-box">
      {/* <ICOURGENT /> */}
      you have {numOfTotalTasks} task{numOfTotalTasks === 1 ? "" : "s"} to complete:<br />
      {awaited.length} awaited, {in_progress.length} in progress
    </div>
  );
};

export default TotalTasks;
