import { useEffect, useState } from "react";
import { History, Location } from "history";
import { useAppSelector } from "../../../redux/hooks";
import {
  reduxStateInt,
  rewardsInt,
  taskInt,
} from "../../../typings/interfaces";
import { Row, Col } from "react-bootstrap";
import {
  getDayMonthYearAsString,
  filterTasksByOverdue,
  getSelectedDateAsString,
  getMonthByIndex,
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
import { AddNewTaskButton, DashTaskButton } from "../Buttons";
import AddEditTaskModal from "../AddEditTaskModal";
import MapTasks from "./MapTasks";
import DashStats from "./DashStats";
import DashChallCard from "./ChallengeCard";
import { useMediaQuery } from "react-responsive";
import RewardsDropdown from "../RewardsDropdown";

type AtAGlanceDataProps = {
  overdueTasks: taskInt[] | never[];
  urgentTasks: taskInt[] | never[];
  todayTasks: taskInt[] | never[];
  sharedTasks: taskInt[] | never[];
  rewardsAvailable: rewardsInt[] | never[];
};

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
  const { rewards } = my_user;
  const tasks = state.currentTasks;
  const categories = tasks.categories;
  const { awaited, in_progress, completed } = tasks;
  const { history, location } = props; // today
  const [taskState, setTaskState] = useState(ALL_TASKS);
  const [atAGlanceData, setAtAGlanceData] = useState<AtAGlanceDataProps>({
    overdueTasks: [],
    urgentTasks: [],
    todayTasks: [],
    sharedTasks: [],
    rewardsAvailable: [],
  });
  const findIfTasksOverdue = async () => {
    let array: taskInt[] = [];
    const tasksWithDeadlines = allTasks.filter(
      (task: taskInt) => task.deadline !== null
    );
    if (tasksWithDeadlines) {
      array = await filterTasksByOverdue(tasksWithDeadlines);
    }
    return array;
  };
  const findRewardsAvailable = async () => {
    let generalRewards = rewards
      .filter((item) => item.available > 0)
      .filter((item) => !item.reward.includes("SPECIAL"));
    const month = await getMonthByIndex(new Date()).toUpperCase();
    const nextMonth = await getMonthByIndex(new Date(), true).toUpperCase();
    let specialRewards: rewardsInt[] = [];
    for (let i = 0; i < rewards.length; i++) {
      if (
        rewards[i].reward.includes(month) ||
        rewards[i].reward.includes(nextMonth)
      ) {
        specialRewards.push(rewards[i]);
      }
    }
    const rewardsAvailable = generalRewards.concat(specialRewards);
    return rewardsAvailable;
  };
  const tasksLength = awaited.concat(in_progress, completed).length;
  const allTasks = awaited.concat(in_progress);
  const setTasks = async () => {
    const today = await getSelectedDateAsString(new Date());
    const urgentTasks = allTasks.filter((task) => task.category === URGENT);
    const todayTasks = allTasks.filter(
      (task) => task.deadline?.slice(0, 10) === today
    );
    const sharedTasks = allTasks.filter((task) => task.sharedWith!.length > 1);
    const overdueTasks = await findIfTasksOverdue();
    const rewardsAvailable = await findRewardsAvailable();
    setAtAGlanceData({
      overdueTasks,
      urgentTasks,
      todayTasks,
      sharedTasks,
      rewardsAvailable,
    });
  };
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
    setTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {}, [taskState, atAGlanceData]);
  useEffect(() => {
    console.log("tasks changed in state!", tasksLength);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [awaited.length, in_progress.length, completed.length]);
  return (
    <div className='dashboard__tasks-card'>
      <AddNewTaskButton label='Add task' handleClick={handleShow} />
      {(allTasks.length > 0 || completed.length > 0) && (
        <>
          <DashTaskButton
            label={`${URGENT}|${atAGlanceData.urgentTasks.length}`}
            value={URGENT}
            handleClick={handleClick}
            className={taskState === URGENT ? "selected" : "not-selected"}
          />
          <DashTaskButton
            label={`${TODAY}|${atAGlanceData.todayTasks.length}`}
            value={TODAY}
            handleClick={handleClick}
            className={taskState === TODAY ? "selected" : "not-selected"}
          />
          <DashTaskButton
            label={`${AWAITED}|${awaited.length}`}
            value={AWAITED}
            handleClick={handleClick}
            className={taskState === AWAITED ? "selected" : "not-selected"}
          />
          <DashTaskButton
            label={`${IN_PROGRESS}|${in_progress.length}`}
            value={IN_PROGRESS}
            handleClick={handleClick}
            className={taskState === IN_PROGRESS ? "selected" : "not-selected"}
          />
          <DashTaskButton
            label={`${OVERDUE}|${atAGlanceData.overdueTasks.length}`}
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
            label={`${SHARED}|${atAGlanceData.sharedTasks.length}`}
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
      <DashTaskButton
        label={`Rewards|${atAGlanceData.rewardsAvailable.length}`}
        value={"REWARDS"}
        handleClick={handleClick}
        className={taskState === "REWARDS" ? "selected" : "not-selected"}
      />
      {taskState === URGENT ? (
        <MapTasks
          tasks={atAGlanceData.urgentTasks}
          link={`/tasks?category=urgent`}
        />
      ) : taskState === TODAY ? (
        <MapTasks tasks={atAGlanceData.todayTasks} link={TODAY} />
      ) : taskState === AWAITED ? (
        <MapTasks tasks={awaited} link={`/tasks?status=awaited`} />
      ) : taskState === IN_PROGRESS ? (
        <MapTasks tasks={in_progress} link={`/tasks?status=in_progress`} />
      ) : taskState === OVERDUE ? (
        <MapTasks tasks={atAGlanceData.overdueTasks} link={OVERDUE} />
      ) : taskState === "Shared" ? (
        <MapTasks tasks={atAGlanceData.sharedTasks} link={`/tasks?type=team`} />
      ) : taskState === "REWARDS" ? (
        <div>
          <RewardsDropdown
            rewards={atAGlanceData.rewardsAvailable}
            formType='select'
            label='Celebrate your progress! Spend well-earned xp to display a reward badge:'
          />
        </div>
      ) : (
        <MapTasks tasks={allTasks} link={`/tasks`} />
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
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { notification } = state.currentUser.my_user;
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
            {notification.length > 0 ? (
              <>
                <Col className='col-6'>
                  <DashStats />
                </Col>
                <Col className='col-6'>
                  <DashChallCard />
                </Col>
              </>
            ) : (
              <Col>
                <DashChallCard />
              </Col>
            )}
          </>
        )}
      </Row>
    </div>
  );
}
