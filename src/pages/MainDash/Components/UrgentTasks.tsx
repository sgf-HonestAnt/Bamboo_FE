import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt } from "../../../typings/interfaces";
import { URGENT } from "../../../utils/appConstants";

const UrgentTasks = () => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const tasks = state.currentTasks;
  const { awaited, in_progress } = tasks;
  const allTasks = awaited.concat(in_progress);
  const numOfUrgentTasks = allTasks.filter((task) => task.category === URGENT).length
  return (
    <div className="m-2 p-1 dashboard__tasks-card__task-box">
      {numOfUrgentTasks} task{numOfUrgentTasks===1?" is":"s are"} marked urgent
    </div>
  );
};

export default UrgentTasks;
