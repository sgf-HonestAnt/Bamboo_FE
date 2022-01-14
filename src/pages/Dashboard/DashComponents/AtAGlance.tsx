import { useEffect, useState } from "react";
import { History, Location } from "history";
import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt, taskInt } from "../../../typings/interfaces";
import { Row, Col } from "react-bootstrap";
import {
  getDayMonthYearAsString,
  filterTasksByOverdue,
  getSelectedDateAsString,
} from "../../../utils/funcs/f_dates";
import {
  ALL_TASKS,
  AWAITED,
  // COMPLETED,
  IN_PROGRESS,
  OVERDUE,
  SHARED,
  TODAY,
  URGENT,
} from "../../../utils/const/str";
import { FiCalendar } from "react-icons/fi";
import { AddNewTaskButton, DashTaskButton } from "../../__Components/Buttons";
import AddEditTaskModal from "../../__Components/AddEditTaskModal";
import MapTasks from "./MapTasks";
import DashStats from "./DashStats";
import DashChallCard from "./ChallengeCard";
import { useMediaQuery } from "react-responsive";

type AtAGlanceTasksProps = {
  today: string;
  history: History<unknown> | string[];
  location: Location<unknown>;
};

type AtAGlanceProps = {
  today: string;
  history: History<unknown> | string[];
  location: Location<unknown>;
};

function AtAGlanceTasks(props: AtAGlanceTasksProps) {
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
  const [taskState, setTaskState] = useState(ALL_TASKS);
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
    <div className='dashboard__tasks-card'>
      <AddNewTaskButton label='Add task' handleClick={handleShow} />
      {(allTasks.length > 0 || completed.length > 0) && (
        <>
          <DashTaskButton
            label={`Urgent|${urgentTasks.length}`}
            value={URGENT}
            handleClick={handleClick}
            className={taskState === URGENT ? "selected" : "not-selected"}
          />
          <DashTaskButton
            label={`Due Today|${todayTasks.length}`}
            value={TODAY}
            handleClick={handleClick}
            className={taskState === TODAY ? "selected" : "not-selected"}
          />
          <DashTaskButton
            label={`Awaited|${awaited.length}`}
            value={AWAITED}
            handleClick={handleClick}
            className={taskState === AWAITED ? "selected" : "not-selected"}
          />
          <DashTaskButton
            label={`In Progress|${in_progress.length}`}
            value={IN_PROGRESS}
            handleClick={handleClick}
            className={taskState === IN_PROGRESS ? "selected" : "not-selected"}
          />
          <DashTaskButton
            label={`Overdue|${overdueTasks.length}`}
            value={OVERDUE}
            handleClick={handleClick}
            className={taskState === OVERDUE ? "selected" : "not-selected"}
          />
          {/* <DashTaskButton
            label={`Completed|${completed.length}`}
            value={COMPLETED}
            handleClick={handleClick}
          /> */}
          <DashTaskButton
            label={`Shared|${sharedTasks.length}`}
            value={SHARED}
            handleClick={handleClick}
            className={taskState === SHARED ? "selected" : "not-selected"}
          />
        </>
      )}
      <DashTaskButton
        label={`All tasks|${allTasks.length}`}
        value={ALL_TASKS}
        handleClick={handleClick}
        className={taskState === ALL_TASKS ? "selected" : "not-selected"}
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
      ) : // : taskState === COMPLETED ? (
      //   <MapTasks tasks={completed} />
      // )
      taskState === "Shared" ? (
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
}

export default function AtAGlance(props: AtAGlanceProps) {
  const { today, history, location } = props;
  const isBigScreen = useMediaQuery({ query: "(min-width: 1660px)" });
  const dayMonthYearAsString = getDayMonthYearAsString(new Date());
  return (
    <div className='dashboard__at-a-glance m-2'>
      <div className='dashboard__alt__card-header'>
        At A Glance
        <h5>
          <FiCalendar />
          &nbsp;{dayMonthYearAsString}
        </h5>
      </div>
      <Row>
        <Col className='col-12 pb-3'>
          <AtAGlanceTasks today={today} history={history} location={location} />
        </Col>
        {isBigScreen ? (
          <Col className='col-12'>
            <DashChallCard />
          </Col>
        ) : (
          <>
            <Col className='col-6'>
              <DashStats />
            </Col>
            <Col className='col-6'>
              <DashChallCard />
            </Col>
          </>
        )}
      </Row>
    </div>
  );
}
