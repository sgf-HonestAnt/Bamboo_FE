import DashProfileCard from "../../pages__components/Page_Dashboard_c/DashProfileCard";
import DashTasksCard from "../../pages__components/Page_Dashboard_c/DashTasksCard";
import DashCalenCard from "../../pages__components/Page_Dashboard_c/DashCalenCard";
import DashTipsCard from "../../pages__components/Page_Dashboard_c/DashTipsCard";
import DashAlertCard from "../../pages__components/Page_Dashboard_c/DashAlertCard";
import DashChallCard from "../../pages__components/Page_Dashboard_c/DashChallCard";
import DashSearch from "../../pages__components/Page_Dashboard_c/DashSearch";
import DashAchievCard from "../../pages__components/Page_Dashboard_c/DashAchievCard";
import { Row, Col } from "react-bootstrap";
import { History, Location } from "history";
import { useEffect } from "react";
import {
  achievementInt,
  currentAchievementsInt,
  currentFeaturesInt,
  currentTasksInt,
  followedUserInt,
  userInt,
} from "../../typings/interfaces";
import createList from "../../utils/funcs/list";
import "./styles.css";
import { useDispatch } from "react-redux";
import { NONE } from "../../utils/constants";
import getDateString from "../../utils/funcs/datestring";

type DashboardProps = {
  user: userInt;
  tasks: currentTasksInt;
  achievements: currentAchievementsInt;
  followedUsers: followedUserInt[];
  features: currentFeaturesInt;
  history: History<unknown> | string[];
  location: Location<unknown>;
};

const Dashboard = (props: DashboardProps) => {
  const {
    user,
    tasks,
    achievements,
    followedUsers,
    features,
    history,
    location,
  } = props;
  const { awaited } = tasks;
  const todayAsDate = new Date();
  const today = getDateString(todayAsDate);
  const todayTasks = awaited.filter(
    (t) => t.deadline?.slice(0, 10) === today || t.deadline === NONE
  );
  // const dispatch = useDispatch();
  // const checkedTasks: string[] = [];
  const { list, superlist } = achievements;
  const { username, bio, avatar, level, xp, notification } = user;
  const dispatch = useDispatch();
  const attemptLoad = async () => {
    let super_list: achievementInt[] = [];
    followedUsers.map((user, i) => {
      return user.achievements.map((ach, i) => {
        return super_list.push(ach);
      });
    });
    list.map((ach, i) => {
      return super_list.push(ach);
    });
    super_list.sort(function (a, b) {
      const date_a = new Date(a.createdAt).getTime();
      const date_b = new Date(b.createdAt).getTime();
      return date_b - date_a;
    });
    await createList(super_list, user.username, dispatch);
    // 🖐️ in future make only last x achievements display for each user, and get achievements sorted by date
  };
  useEffect(() => {
    attemptLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Row className='dashboard p-2'>
      {/* LOGO/NAME */}
      <Col sm={12}>
        <div>APP-NAME</div>
      </Col>
      {/* LEFT-HAND COLUMN WITH TWO INNER COLUMNS, TAKES UP 8/12 */}
      <Col sm={8} className='dashboard__left-col'>
        <Row>
          {" "}
          {/* Row 1 */}
          <Col sm={6} className='p-1'>
            {/* PROFILE CARD WITHIN THE LEFT-HAND COLUMN, TAKES 3/12 */}
            <DashProfileCard
              avatar={avatar}
              username={username}
              bio={bio}
              level={level}
              xp={xp}
            />
          </Col>
          <Col sm={6} className='p-1'>
            {/* TASK CARD WITHIN THE LEFT-HAND COLUMN, TAKES 3/12 */}
            <DashTasksCard
              today={todayTasks}
              user={user}
              history={history}
              location={location}
            />
            {/* CALENDAR CARD WITHIN THE LEFT-HAND COLUMN, TAKES 3/12 */}
            <DashCalenCard />
          </Col>
        </Row>
        <Row>
          {" "}
          {/* Row 2 */}
          {/* TIPS CARD WITHIN THE LEFT-HAND COLUMN, TAKES 6/12 */}
          <Col sm={12} className='p-1'>
            <DashTipsCard />
          </Col>
        </Row>
        <Row>
          {" "}
          {/* Row 3 */}
          {/* ALERT CARD WITHIN THE LEFT-HAND COLUMN, TAKES 3/12 */}
          <Col sm={6} className='p-1'>
            <DashAlertCard notification={notification} />
          </Col>
          {/* FEATURED CHALLENGE CARD WITHIN THE LEFT-HAND COLUMN, TAKES 3/12 */}
          <Col sm={6} className='p-1'>
            <DashChallCard features={features} />
          </Col>
        </Row>
      </Col>
      {/* RIGHT-HAND COLUMN WITH ONE INNER COLUMN, TAKES UP 3/12 */}
      <Col sm={3} className='dashboard__right-col'>
        <Row>
          <Col className='p-1'>
            {/* SEARCH USERS AREA WITHIN THE RIGHTHAND COLUMN, TAKES 4/12 */}
            <DashSearch />
            {/* USER ACHIEVEMENTS CARD WITHIN THE RIGHTHAND COLUMN, TAKES 4/12 */}
            <DashAchievCard superlist={superlist} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Dashboard;
