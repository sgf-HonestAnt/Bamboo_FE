import { History, Location } from "history";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt, taskInt } from "../../../typings/interfaces";
import { AddNewTaskButton, DashTaskButton } from "../../__Components/Buttons";
import AddEditTaskModal from "../../__Components/AddEditTaskModal";
import MapTasks from "./MapTasks";
import {
  ALL_TASKS,
  AWAITED,
  COMPLETED,
  IN_PROGRESS,
  OVERDUE,
  TODAY,
  URGENT,
} from "../../../utils/appConstants";
import {
  filterTasksByOverdue,
  getSelectedDateAsString,
} from "../../../utils/f_dates";

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
  const { awaited, in_progress, completed } = tasks;
  const allTasks = awaited.concat(in_progress);
  const urgentTasks = allTasks.filter((task) => task.category === URGENT);
  const [overdueTasks, setOverdueTasks] = useState<taskInt[]>([]);
  const today = getSelectedDateAsString(new Date());
  const todayTasks = allTasks.filter(
    (task) => task.deadline?.slice(0, 10) === today
  );
  const sharedTasks = allTasks.filter((task) => task.sharedWith!.length > 1);
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
  const { history, location } = props; // today
  const [taskState, setTaskState] = useState("");
  const handleClick = (e: {
    preventDefault: () => void;
    target: { value: any };
  }) => {
    e.preventDefault();
    const value = e.target.value;
    setTaskState(value);
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    findIfTasksOverdue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {}, [taskState]);
  return (
    <div className='dashboard__tasks-card m-2'>
      <AddNewTaskButton label='Add task' handleClick={handleShow} />
      {(allTasks.length > 0 || completed.length > 0) && (
        <>
          <DashTaskButton
            label={`Urgent|${urgentTasks.length}`}
            value={URGENT}
            handleClick={handleClick}
          />
          <DashTaskButton
            label={`Due Today|${todayTasks.length}`}
            value={TODAY}
            handleClick={handleClick}
          />
          <DashTaskButton
            label={`Awaited|${awaited.length}`}
            value={AWAITED}
            handleClick={handleClick}
          />
          <DashTaskButton
            label={`In Progress|${in_progress.length}`}
            value={IN_PROGRESS}
            handleClick={handleClick}
          />
          <DashTaskButton
            label={`Overdue|${overdueTasks.length}`}
            value={OVERDUE}
            handleClick={handleClick}
          />
          <DashTaskButton
            label={`Completed|${completed.length}`}
            value={COMPLETED}
            handleClick={handleClick}
          />
          <DashTaskButton
            label={`Shared|${sharedTasks.length}`}
            value={"Shared"}
            handleClick={handleClick}
          />
        </>
      )}
      <DashTaskButton
        label={`All tasks|${allTasks.length}`}
        value={ALL_TASKS}
        handleClick={handleClick}
      />
      {taskState === URGENT ? (
        <MapTasks tasks={urgentTasks} />
      ) : taskState === TODAY ? (
        <MapTasks tasks={todayTasks} />
      ) : taskState === AWAITED ? (
        <MapTasks tasks={awaited} />
      ) : taskState === IN_PROGRESS ? (
        <MapTasks tasks={in_progress} />
      ) : taskState === OVERDUE ? (
        <MapTasks tasks={overdueTasks} />
      ) : taskState === COMPLETED ? (
        <MapTasks tasks={completed} />
      ) : taskState === "Shared" ? (
        <MapTasks tasks={sharedTasks} />
      ) : (
        <MapTasks tasks={allTasks} />
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