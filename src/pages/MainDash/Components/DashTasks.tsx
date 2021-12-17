import { History, Location } from "history";
import { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt } from "../../../typings/interfaces";
// import { Form } from "react-bootstrap";
// import { ICOCIRCLE, ICOCLOCK, ICOURGENT } from "../../../utils/appIcons";
import { AddNewTaskButton } from "../../../pages__SharedComponents/Buttons";
import {
  getDayMonthYearAsString,
  // getMinMaxDateAsString,
} from "../../../utils/f_dates";
import AddEditTaskModal from "../../../pages__SharedComponents/AddEditTaskModal";
import UrgentTasks from "./UrgentTasks";
import TodayTasks from "./TodayTasks";
import TotalTasks from "./TotalTasks";
import CompletedTasks from "./CompletedTasks";
// import MiniDragNDrop from "./MiniDragNDrop";

type DashTasksProps = {
  today: string;
  history: History<unknown> | string[];
  location: Location<unknown>;
};
const DashTasks = (props: DashTasksProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { followedUsers, my_user } = state.currentUser;
  const tasks = state.currentTasks;
  const categories = tasks.categories;
  const { awaited, in_progress } = tasks;
  const allTasks = awaited.concat(in_progress);
  const { history, location } = props; // today
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dayMonthYearAsString = getDayMonthYearAsString(new Date());
  return (
    <div className='dashboard__tasks-card m-2'>
      <div className='dashboard__card-header'>{dayMonthYearAsString}</div>
      {allTasks.length < 1 ? (
        <>
          <div>No tasks awaited today!</div>
          <CompletedTasks />
          <AddNewTaskButton label='Add task' handleClick={handleShow} />
        </>
      ) : (
        <>
          <UrgentTasks />
          <TodayTasks />
          <TotalTasks />
          <CompletedTasks />
        </>
      )}
      <AddEditTaskModal
        show={show}
        handleClose={handleClose}
        user={my_user}
        followedUsers={followedUsers}
        categories={categories}
        history={history}
        location={location}
        taskSet={null}
      />
    </div>
  );
};

export default DashTasks;
