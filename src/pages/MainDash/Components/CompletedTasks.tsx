import BambooPoints from "../../../pages__SharedComponents/XP";
import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt } from "../../../typings/interfaces";

const CompletedTasks = () => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { total_completed, total_xp } = state.currentUser.my_user;
  return (
    <div className="m-2 p-1 dashboard__tasks-card__task-box">
      {/* <ICOURGENT /> */}
      so far, you have completed {total_completed} tasks and accrued {total_xp}
      <BambooPoints />
    </div>
  );
};

export default CompletedTasks;