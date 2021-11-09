import { RouteComponentProps } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reduxStateInt, userInt } from "../../typings/interfaces";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import { fillUserAction } from "../../redux/actions/user";
import { fillTasksAction } from "../../redux/actions/tasks";
import { fillAchievementsAction } from "../../redux/actions/achievements";
import { fillFeaturesAction } from "../../redux/actions/features";
import { fillSettingsAction } from "../../redux/actions/settings";
import MainSideBar from "../MainSideBar";
import Dashboard from "../Page_Dashboard";
import Tasks from "../Page_Tasks";
import Following from "../Page_Following";
import ErrorPage from "../Page_Error";
import attemptRefresh from "../../utils/funcs/refresh";
import "./styles.css";
import AddTask from "../Page_AddTask";

const MainBody = ({ history, location, match }: RouteComponentProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const user: userInt = useAppSelector(
    (state: reduxStateInt) => state.currentUser.my_user
  );
  const { refreshToken } = user;
  const tasks = state.currentTasks;
  const categories = tasks.categories;
  const achievements = state.currentAchievements;
  const followedUsers = state.currentUser.followedUsers;
  const features = state.currentFeatures;
  const settings = state.currentSettings;
  const { error, loading } = state.currentUser;
  const reloading =
    state.currentUser.loading ||
    tasks.loading ||
    achievements.loading ||
    settings.loading ||
    features.loading;
  const dispatch = useDispatch();
  const path = location.pathname;
  const token = localStorage.getItem("token");

  const attemptLoad = async () => {
    dispatch(fillUserAction(history, refreshToken));
    dispatch(fillTasksAction(history, refreshToken));
    dispatch(fillAchievementsAction(history, refreshToken));
    dispatch(fillFeaturesAction(history, refreshToken));
    dispatch(fillSettingsAction(history, refreshToken));
  };

  useEffect(() => {
    attemptLoad();
    console.log(`🗝️TOKEN ${token}`);
    console.log(`🔄RELOADING ${reloading}`);
    console.log(`🔁LOADING ${loading}`);
    console.log(`💥ERROR ${error}`);
    error && attemptRefresh(history, refreshToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloading]);

  return (
    <Container fluid className='main-page m-0'>
      {loading ? (
        <Row className='main-page__spinner'>
          <Spinner animation='grow' />
        </Row>
      ) : (
        <Row>
          <Col sm={2} className='p-0'>
            <MainSideBar
              history={history}
              user={user}
              tasks={tasks}
              followedUsers={followedUsers}
            />
          </Col>
          <Col className='m-0'>
            {path === "/dash" ? (
              <Dashboard
                user={user}
                tasks={tasks}
                achievements={achievements}
                followedUsers={followedUsers}
                features={features}
              />
            ) : // : path === "/stats" ? (
            //   <Stats />
            // ) :
            path === "/tasks-add-new" ? (
              <AddTask
                history={history}
                categories={categories}
                followedUsers={followedUsers}
              />
            ) : path === "/tasks" ? (
              <Tasks tasks={tasks} />
            ) : // path === "/tasks-schedule" ? (
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
      )}
    </Container>
  );
};

export default MainBody;
