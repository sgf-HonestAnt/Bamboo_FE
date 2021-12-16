import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt } from "../../../typings/interfaces";
import { URGENT } from "../../../utils/appConstants";
import { ICOURGENT } from "../../../utils/appIcons";

const UrgentTasks = () => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const tasks = state.currentTasks;
  const { awaited, in_progress } = tasks;
  const allTasks = awaited.concat(in_progress);
  const numOfUrgentTasks = allTasks.filter((task) => task.category === URGENT).length
  return (
    <div className="m-2 p-1 dashboard__tasks-card__task-box">
      <ICOURGENT />
      {numOfUrgentTasks} urgent task{numOfUrgentTasks===1?"":"s"}
    </div>
  );
};

export default UrgentTasks;