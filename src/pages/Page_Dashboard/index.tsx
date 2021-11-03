import { Row, Col, Button } from "react-bootstrap";
import DashActivCard from "../../pages__components/Page_Dashboard_c/DashActivCard";
import DashAlertCard from "../../pages__components/Page_Dashboard_c/DashAlertCard";
import DashCalenCard from "../../pages__components/Page_Dashboard_c/DashCalenCard";
import DashChallCard from "../../pages__components/Page_Dashboard_c/DashChallCard";
import DashProfileCard from "../../pages__components/Page_Dashboard_c/DashProfileCard";
import DashSearch from "../../pages__components/Page_Dashboard_c/DashSearch";
import DashTasksCard from "../../pages__components/Page_Dashboard_c/DashTasksCard";
import DashTipsCard from "../../pages__components/Page_Dashboard_c/DashTipsCard";
import {
  currentAchievementsInt,
  currentFeaturesInt,
  currentTasksInt,
  followedUserInt,
  userInt,
} from "../../typings/interfaces";
import "./styles.css";

type DashboardProps = {
  user: userInt;
  tasks: currentTasksInt;
  achievements: currentAchievementsInt;
  followedUsers: followedUserInt[];
  features: currentFeaturesInt;
};

const Dashboard = (props: DashboardProps) => {
  const { user, tasks, achievements, features } = props;
  const today = tasks.awaited; // 🖐️ add where date equals today!
  const list = achievements.list;
  // followedUsers.achievements.list;
  const { username, bio, avatar } = user;
  return (
    <Row className='dashboard p-0'>
      {/* LOGO/NAME */}
      <Col sm={10}>
        <div>APP-NAME</div>
      </Col>
      {/* LEFT-HAND COLUMN WITH TWO INNER COLUMNS, TAKES UP 6/12 */}
      <Col sm={6} className='dashboard__left-col m-2'>
        <Row>
          {" "}
          {/* Row 1 */}
          <Col sm={6} className='p-1'>
            {/* PROFILE CARD WITHIN THE LEFT-HAND COLUMN, TAKES 3/12 */}
            <DashProfileCard avatar={avatar} username={username} bio={bio} />
          </Col>
          <Col sm={6} className='p-1'>
            {/* TASK CARD WITHIN THE LEFT-HAND COLUMN, TAKES 3/12 */}
            <DashTasksCard today={today} />
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
            <DashAlertCard />
          </Col>
          {/* FEATURED CHALLENGE CARD WITHIN THE LEFT-HAND COLUMN, TAKES 3/12 */}
          <Col sm={6} className='p-1'>
            <DashChallCard features={features} />
          </Col>
        </Row>
      </Col>
      {/* RIGHT-HAND COLUMN WITH ONE INNER COLUMN, TAKES UP 4/12 */}
      <Col sm={4} className='dashboard__right-col m-2'>
        {/* SEARCH USERS AREA WITHIN THE RIGHTHAND COLUMN, TAKES 4/12 */}
        <DashSearch />
        {/* USER ACTIVITIES CARD WITHIN THE RIGHTHAND COLUMN, TAKES 4/12 */}
        <DashActivCard list={list} username={username} />
      </Col>
    </Row>
  );
}; 

export default Dashboard;
