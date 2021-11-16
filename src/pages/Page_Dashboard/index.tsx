import { History, Location } from "history";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { 
  achievementInt,
  currentAchievementsInt,
  currentFeaturesInt,
  currentTasksInt,
  followedUserInt,
  userInt,
} from "../../typings/interfaces";
import DashProfileCard from "../../pages__components/Page_Dashboard_c/DashProfileCard";
import DashTasksCard from "../../pages__components/Page_Dashboard_c/DashTasksCard";
import DashCalenCard from "../../pages__components/Page_Dashboard_c/DashCalenCard";
import DashTipsCard from "../../pages__components/Page_Dashboard_c/DashTipsCard";
import DashAlertCard from "../../pages__components/Page_Dashboard_c/DashAlertCard";
import DashChallCard from "../../pages__components/Page_Dashboard_c/DashChallCard";
import DashSearch from "../../pages__components/Page_Dashboard_c/DashSearch";
import DashAchievCard from "../../pages__components/Page_Dashboard_c/DashAchievCard";
import createList from "../../utils/funcs/list";
import { getSelectedDateAsString } from "../../utils/funcs/dateTimeFuncs";
import { NONE } from "../../utils/constants";
import "./styles.css";

type DashboardProps = {
  user: userInt;
  tasks: currentTasksInt;
  categories: string[];
  achievements: currentAchievementsInt;
  followedUsers: followedUserInt[];
  features: currentFeaturesInt;
  history: History<unknown> | string[];
  location: Location<unknown>;
  setErrorMessage: any
};

const Dashboard = (props: DashboardProps) => {
  const {
    user,
    tasks,
    categories,
    achievements,
    followedUsers,
    features,
    history,
    location,
    setErrorMessage
  } = props;
  const { awaited } = tasks;
  const todayAsDate = new Date();
  const today = getSelectedDateAsString(todayAsDate);
  const todayTasks = awaited.filter(
    (t) => t.deadline?.slice(0, 10) === today || t.deadline === NONE
  );
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
      <Col sm={12}>
        <div>APP-NAME</div>
      </Col>
      <Col sm={8} className='dashboard__left-col'>
        <Row>
          <Col sm={6} className='p-1'>
            <DashProfileCard
              avatar={avatar}
              username={username}
              bio={bio}
              level={level}
              xp={xp}
            />
          </Col>
          <Col sm={6} className='p-1'>
            <DashTasksCard
              today={todayTasks}
              user={user}
              history={history}
              location={location}
              categories={categories}
              setErrorMessage={setErrorMessage}
            />
            <DashCalenCard />
          </Col>
        </Row>
        <Row>
          <Col sm={12} className='p-1'>
            <DashTipsCard />
          </Col>
        </Row>
        <Row>
          <Col sm={6} className='p-1'>
            <DashAlertCard notification={notification} />
          </Col>
          <Col sm={6} className='p-1'>
            <DashChallCard features={features} />
          </Col>
        </Row>
      </Col>
      <Col sm={3} className='dashboard__right-col'>
        <Row>
          <Col className='p-1'>
            <DashSearch />
            <DashAchievCard superlist={superlist} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Dashboard;
