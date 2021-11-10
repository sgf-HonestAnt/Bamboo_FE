import { RouteComponentProps } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reduxStateInt, userInt } from "../../typings/interfaces";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import {
  fillUserAction,
  setExpired,
  setRefreshToken,
} from "../../redux/actions/user";
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
  const [mainPageLoading, setMainPageLoading] = useState(true);
  const { refreshToken } = user;
  const { followedUsers, error, loading, expired } = state.currentUser;
  const tasks = state.currentTasks;
  const categories = tasks.categories;
  const achievements = state.currentAchievements;
  const features = state.currentFeatures;
  const settings = state.currentSettings;
  const dispatch = useDispatch();
  const path = location.pathname;
  const token = localStorage.getItem("token");

  const attemptLoad = async () => {
    console.log("MAIN PAGE LOADING!");
    if (!token) {
      console.log("🗝️NO TOKEN");
      history.push("/login");
    } else if (expired) {
      console.log(`💀EXPIRED ${expired}`);
      attemptRefresh(history, refreshToken);
    } else {
      dispatch(fillUserAction(history));
      console.log(user);
      // error && console.log("☠️ACCESS TOKEN HAS EXPIRED");
    }
    console.log(`🗝️TOKEN ${token}`);
    console.log(`🔁LOADING ${loading}`);
    console.log(`💥ERROR ${error}`);
    setMainPageLoading(false);
    // if (response.status)(
    //   console.log(response.status);
    // )
    // if (newTokens) {
    //   console.log("🗝️NEW TOKENS=>", newTokens);
    // localStorage.setItem("token", newTokens.accessToken);
    // setRefreshToken(newTokens.refreshToken);
    // history.push("/");
    //}
    // } else if (response.status === 401) {
    //   console.log("☠️ACCESS TOKEN HAS EXPIRED");
    //   const newTokens = await attemptRefresh(
    //     history,
    //     actualRefreshToken
    //   );
    //   return newTokens
    // dispatch(fillTasksAction(history, refreshToken));
    // dispatch(fillAchievementsAction(history, refreshToken));
    // dispatch(fillFeaturesAction(history, refreshToken));
    // dispatch(fillSettingsAction(history, refreshToken));
  };

  useEffect(() => {
    attemptLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainPageLoading]);

  return (
    <Container fluid className='main-page m-0'>
      {mainPageLoading ? (
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
                user={user}
                categories={categories}
                followedUsers={followedUsers}
                history={history}
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
