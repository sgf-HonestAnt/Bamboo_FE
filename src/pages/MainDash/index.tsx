import { History, Location } from "history";
import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import {
  currentAchievementsInt,
  currentFeaturesInt,
  currentTasksInt,
  followedUserInt,
  userInt,
} from "../../typings/interfaces";
import DashProfileCard from "./Components/ProfileCard";
import DashTasksCard from "./Components/TasksCard";
import DashCalenCard from "./Components/Calendar";
import DashTipsCard from "./Components/DashTipsCard";
import DashAlertCard from "./Components/AlertCard";
import DashChallCard from "./Components/ChallengeCard";
import DashSearch from "./Components/DashSearch";
import DashAchievCard from "./Components/Achievements";
// import createSuperlist from "../../utils/f_superlist";
import { getSelectedDateAsString } from "../../utils/f_dates";
import { getTaskByQuery, getTaskByDeadline } from "../../utils/f_tasks";
// import { useMediaQuery } from "react-responsive";
import "./styles.css";

type DashboardPageProps = {
  user: userInt;
  tasks: currentTasksInt;
  categories: string[];
  achievements: currentAchievementsInt;
  followedUsers: followedUserInt[];
  features: currentFeaturesInt;
  history: History<unknown> | string[];
  location: Location<unknown>;
  setErrorMessage: any;
};
const DashboardPage = (props: DashboardPageProps) => {
  const {
    user,
    categories,
    achievements,
    followedUsers,
    features,
    history,
    location,
    setErrorMessage,
  } = props;
  const allTasks = props.tasks;
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  // media query
  // const isDesktopOrLaptop = useMediaQuery({
  //   query: "(min-width: 1224px)",
  // });
  // const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  // const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  // const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  // const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  // //
  const todayAsDate = new Date();
  const today = getSelectedDateAsString(todayAsDate);
  // const { list, superlist } = achievements;
  const { _id, username, admin, bio, avatar, level, xp, notification } = user;
  // const dispatch = useDispatch();
  const attemptLoad = async () => {
    // load tasks with no deadline / deadline for today
    const data = await getTaskByQuery(
      `deadline=${today}&status=awaited&status=in_progress&sort=deadline,title`,
      _id
    );
    const todayDeadline = data.tasks;
    const noDeadline = await getTaskByDeadline(null);
    const tasksForToday = todayDeadline.concat(noDeadline);
    setTasks(tasksForToday);
  };
  useEffect(() => {
    attemptLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);
  return (
    <Row className='dashboard p-3 mt-3'>
      <Col sm={12} md={10} lg={8} className='dashboard__left-col'>
        <Row>
          <Col sm={6} className='p-0'>
            <DashProfileCard
              history={history}
              followedUsers={followedUsers}
              avatar={avatar}
              username={username}
              admin={admin}
              bio={bio}
              level={level}
              xp={xp}
            />
            <DashChallCard features={features} />
          </Col>
          <Col sm={6} className='p-0'>
            <DashTasksCard
              tasks={tasks}
              today={today}
              user={user}
              followedUsers={followedUsers}
              history={history}
              location={location}
              categories={categories}
              setErrorMessage={setErrorMessage}
            />
            {/* 
            🌈 BEFORE FINAL DEPLOYMENT
            Default Tasks "Solve World Hunger", "Brush Your Teeth", and "Buy Groceries" 
            Initial walk through shows you how to complete "Solve World Hunger"
            Change "Brush Your Teeth" to a DAILY task
            And add friends. ("You'll notice that "" is shared with AdminPanda. Try adding our second admin, BigBear, here...")
            */}
            {/* <DashCalenCard user={user} /> */}
            <DashTipsCard
              tasks={allTasks}
              user={user}
              followedUsers={followedUsers}
            />
          </Col>
        </Row>
      </Col>
      <Col sm={12} md={2} lg={4} className='dashboard__right-col'>
        <Row>
          <Col className='p-0'>
            <DashSearch
              user_id={_id}
              followedUsers={followedUsers}
              search={search}
              setSearch={setSearch}
            />
            {notification.length > 0 && (
              <DashAlertCard
                followedUsers={followedUsers}
                notification={notification}
                history={history}
              />
            )}
            <DashAchievCard
              followedUsers={followedUsers}
              achievements={achievements}
              username={user.username}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DashboardPage;
