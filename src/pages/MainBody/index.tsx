//react and redux
import { RouteComponentProps } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
//actions and interfaces
import { fillUserAction } from "../../redux/actions/user";
import { fillTasksAction } from "../../redux/actions/tasks";
import { fillAchievementsAction } from "../../redux/actions/achievements";
import { fillFeaturesAction } from "../../redux/actions/features";
import { fillSettingsAction } from "../../redux/actions/settings";
import { reduxStateInt, userInt } from "../../typings/interfaces";
//bootstrap and components
import { Spinner, Container, Row, Col } from "react-bootstrap";
import MainSideBar from "../MainSideBar";
import Dashboard from "../Page_Dashboard";
import Tasks from "../Page_Tasks";
import Following from "../Page_Following";
import ErrorPage from "../Page_Error";
//functions and styles
import AddTask from "../Page_AddTask";
import checkToken from "../../utils/funcs/checkToken";
import "./styles.css";

const MainBody = ({ history, location, match }: RouteComponentProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const user: userInt = useAppSelector(
    (state: reduxStateInt) => state.currentUser.my_user
  );
  const { refreshToken } = user;
  const { followedUsers, error, loading } = state.currentUser;
  const tasks = state.currentTasks;
  const categories = tasks.categories;
  const achievements = state.currentAchievements;
  const features = state.currentFeatures;
  // const settings = state.currentSettings;
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const path = location.pathname;

  const attemptLoad = async () => {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      console.log("⛔NO TOKEN");
      history.push("/login");
    }
    else if (!refreshToken) {
      console.log("⛔NO TOKEN");
      history.push("/login")
    } else {
      const username = await checkToken(refreshToken, history, location);
      setTimeout(() => {
        // if (!username) {
        //   console.log("⛔NO USER");
        //   history.push("/login");
        // } else {
        console.log(`🥔user=${username}`);
        dispatch(fillUserAction(accessToken));
        dispatch(fillTasksAction());
        dispatch(fillAchievementsAction());
        dispatch(fillFeaturesAction());
        dispatch(fillSettingsAction());
        loading && console.log(`🔁LOADING`);
        error && console.log(`💥ERROR`);
        // }
      }, 1000);
    }
  };

  useEffect(() => {
    attemptLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(location.pathname)
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
                history={history} 
                location={location}
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
                location={location}
                setErrorMessage={setErrorMessage}
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
            ) : path === "/error" ? (
              <ErrorPage history={history} errorMessage={errorMessage} />
            ) : (
              <ErrorPage history={history} />
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default MainBody;
