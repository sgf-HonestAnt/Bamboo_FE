import { Row, Col, Card, Button } from "react-bootstrap";
import { useAppSelector } from "../../redux/hooks";
import {
  currentAchievementsInt,
  currentFeaturesInt,
  currentTasksInt,
  // followedUserInt,
  reduxStateInt,
  userInt,
} from "../../typings/interfaces";
import "./styles.css";

const Dashboard = () => {
  const user: userInt = useAppSelector(
    (state: reduxStateInt) => state.currentUser.my_user
  );
  const tasks: currentTasksInt = useAppSelector(
    (state: reduxStateInt) => state.currentTasks
  );
  const achievements: currentAchievementsInt = useAppSelector(
    (state: reduxStateInt) => state.currentAchievements
  );
  // const followedUsers: followedUserInt[] = useAppSelector(
  //   (state: reduxStateInt) => state.currentUser.followedUsers
  // );
  const features: currentFeaturesInt = useAppSelector(
    (state: reduxStateInt) => state.currentFeatures
  );
  const today = tasks.awaited; // 🖐️ add where date equals today!
  const list = achievements.list;
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
            <div className='dashboard__profile-card m-1'>
              <Card.Img variant='top' src={avatar} />
              <Card.Title>{username}</Card.Title>
              <Card.Text>{bio}</Card.Text>
              <Button variant='primary'>Go somewhere</Button>
            </div>
          </Col>
          <Col sm={6} className='p-1'>
            {/* TASK CARD WITHIN THE LEFT-HAND COLUMN, TAKES 3/12 */}
            <div className='dashboard__tasks-card m-2'>
              <Card.Title>Today's tasks</Card.Title>
              <Card.Text>
                {today.length < 1 && <span>No tasks awaited today!</span>}
                {today.map((t, i) => (
                  <span>TASK {i + 1}</span>
                ))}
              </Card.Text>
              <Button variant='primary'>Go somewhere</Button>
            </div>
            {/* CALENDAR CARD WITHIN THE LEFT-HAND COLUMN, TAKES 3/12 */}
            <div className='dashboard__calendar-card m-2'>
              <Card.Text>Calendar</Card.Text>
              <Button variant='primary'>Go somewhere</Button>
            </div>
          </Col>
        </Row>
        <Row>
          {" "}
          {/* Row 2 */}
          {/* TIPS CARD WITHIN THE LEFT-HAND COLUMN, TAKES 6/12 */}
          <Col sm={12} className='p-1'>
            <div className='dashboard__tips-card'>
              <Card.Title>Tips</Card.Title>
              <Card.Text>Some info</Card.Text>
            </div>
          </Col>
        </Row>
        <Row>
          {" "}
          {/* Row 3 */}
          {/* ALERT CARD WITHIN THE LEFT-HAND COLUMN, TAKES 3/12 */}
          <Col sm={6} className='p-1'>
            <div className='dashboard__alerts-card'>
              <Card.Title>Alerts</Card.Title>
              <Card.Text>Some info</Card.Text>
            </div>
          </Col>
          {/* FEATURED CHALLENGE CARD WITHIN THE LEFT-HAND COLUMN, TAKES 3/12 */}
          <Col sm={6} className='p-1'>
            <div className='dashboard__challenge-card'>
              <Card.Title>Featured Challenge</Card.Title>
              <Card.Text>{features.features[0].descrip}</Card.Text>
              {/* 🖐️ Should correspond to current month */}
            </div>
          </Col>
        </Row>
      </Col>
      {/* RIGHT-HAND COLUMN WITH ONE INNER COLUMN, TAKES UP 4/12 */}
      <Col sm={4} className='dashboard__right-col m-2'>
        <div className='dashboard__search-bar m-2'>
          SEARCH
          <Button variant='primary'>Button</Button>
        </div>
        <div className='dashboard__activities m-2 p-2'>
          {list.length < 1 && <p>No achievements!</p>}
          {list.map((l, i) => (
            <p>LIST {i + 1}</p>
          ))}
        </div>
      </Col>
    </Row>
  );
};

export default Dashboard;
