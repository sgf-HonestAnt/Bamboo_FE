import { RouteComponentProps } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  currentAchievementsInt,
  currentFeaturesInt,
  currentTasksInt,
  followedUserInt,
  currentSettingsInt,
  reduxStateInt,
  userInt,
} from "../../typings/interfaces";
import { Container, Row, Col } from "react-bootstrap";
import { fillUserAction } from "../../redux/actions/user";
import { fillTasksAction } from "../../redux/actions/tasks";
import { fillAchievementsAction } from "../../redux/actions/achievements";
import { fillFeaturesAction } from "../../redux/actions/features";
import { fillSettingsAction } from "../../redux/actions/settings";
import MainSideBar from "../MainSideBar";
import Dashboard from "../Page_Dashboard";
import Following from "../Page_Following";
import ErrorPage from "../Page_Error";
import attemptRefresh from "../../utils/funcs/refresh";
import "./styles.css";

const MainBody = ({ history, location, match }: RouteComponentProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const user: userInt = useAppSelector(
    (state: reduxStateInt) => state.currentUser.my_user
  );
  const tasks: currentTasksInt = useAppSelector(
    (state: reduxStateInt) => state.currentTasks
  );
  const achievements: currentAchievementsInt = useAppSelector(
    (state: reduxStateInt) => state.currentAchievements
  );
  const followedUsers: followedUserInt[] = useAppSelector(
    (state: reduxStateInt) => state.currentUser.followedUsers
  );
  const curr_features: currentFeaturesInt = useAppSelector(
    (state: reduxStateInt) => state.currentFeatures
  );
  const curr_settings: currentSettingsInt = useAppSelector(
    (state: reduxStateInt) => state.currentSettings
  );

  const { error, loading } = state.currentUser;

  const dispatch = useDispatch();

  const path = location.pathname;

  const token = localStorage.getItem("token");

  const attemptLoad = () => {
    dispatch(fillUserAction());
    dispatch(fillTasksAction());
    dispatch(fillAchievementsAction());
    dispatch(fillFeaturesAction());
    dispatch(fillSettingsAction());
  };

  useEffect(() => {
    attemptLoad();
    console.log(`TOKEN ${token}`);
    console.log(`LOADING ${loading}`);
    console.log(`ERROR ${error}`);
    error && attemptRefresh(history, user.refreshToken)
  }, []);


  return (
    <Container fluid className='main-page m-0'>
      <Row>
        <Col sm={2} className='p-0'>
          <MainSideBar />
        </Col>
        <Col className='m-0'>
          {path === "/dash" ? (
            <Dashboard
              user={user}
              tasks={tasks}
              achievements={achievements}
              followedUsers={followedUsers}
              curr_features={curr_features}
            />
          ) : // : path === "/stats" ? (
          //   <Stats />
          // ) : path === "/tasks" ? (
          //   <Tasks />
          // ) : path === "/tasks-schedule" ? (
          //   <TasksSchedule />
          // ) : path === "/quests" ? (
          //   <Quests />
          // ) : path === "/inventory" ? (
          //   <Inventory />
          // ) :
          path === "/following" ? (
            <Following followedUsers={followedUsers} />
          ) : (
            <ErrorPage />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MainBody;
