import { RouteComponentProps } from "react-router-dom";
// import { BarLoader } from 'react-css-loaders';
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { fillUserAction } from "../../redux/actions/user";
import { fillTasksAction } from "../../redux/actions/tasks";
import { fillAchievementsAction } from "../../redux/actions/achievements";
import { fillFeaturesAction } from "../../redux/actions/features";
import { fillSettingsAction } from "../../redux/actions/settings";
import { reduxStateInt, userInt } from "../../typings/interfaces";
import { Container, Row, Col } from "react-bootstrap";
import MainSideBar from "../MainSideBar";
import DashboardPage from "../MainDash";
import FollowingPage from "../MainFollow";
import AddTaskPage from "../MainAddTask";
import SettingsPage from "../Settings";
import AdminPage from "../MainAdmin";
import ErrorPage from "../MainError";
import checkToken from "../../utils/f_checkToken";
import "./styles.css";
import NewTasksPage from "../MainTasksNew";

const MainBody = ({ history, location }: RouteComponentProps) => {
  const [mainLoading, setMainLoading] = useState(true);
  const [sideBarLoading, setSideBarLoading] = useState(false);
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const user: userInt = useAppSelector(
    (state: reduxStateInt) => state.currentUser.my_user
  );
  const { refreshToken } = user;
  const token = localStorage.getItem("token");
  const { followedUsers, error, loading } = state.currentUser;
  const tasks = state.currentTasks;
  // const numberOfTasks = tasks.awaited.length + tasks.in_progress.length;
  const categories = tasks.categories;
  const achievements = state.currentAchievements;
  const features = state.currentFeatures;
  const settings = state.currentSettings;
  const dispatch = useDispatch();
  const path = location.pathname;
  const [errorMessage, setErrorMessage] = useState("");
  const [theme, setTheme] = useState("theme-light");
  const attemptLoad = async () => {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      console.log("⛔NO ACCESS TOKEN");
      history.push("/login");
    }
    // else if (!refreshToken) {
    //   console.log("⛔NO REFRESH TOKEN");
    //   history.push("/login");
    // }
    else {
      const username = await checkToken(refreshToken, history, location);
      if (username) {
        dispatch(fillUserAction(accessToken));
        dispatch(fillTasksAction());
        dispatch(fillAchievementsAction());
        dispatch(fillFeaturesAction());
        dispatch(fillSettingsAction());
        console.log(`🥔user=${username}`);
        console.log(
          `🥔tasks=${tasks.awaited.length}awaited,${tasks.completed.length}completed,${tasks.in_progress.length}in_progress`
        );
        console.log(`🥔achievements=${achievements.list.length}`);
        console.log(`🥔features=${features.total}_total`);
        console.log(`🥔theme=${settings.selectedTheme}`);
      }
      setTimeout(() => {
        // looks like achievements are loading after user
        setMainLoading(false);
        loading && console.log(`🔁LOADING`);
        error && console.log(`💥ERROR`);
      }, 500);
    }
  };
  useEffect(() => {
    attemptLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  useEffect(() => {
    console.log("🔐", localStorage.getItem("token"));
  }, [token]);
  const sideBarSizeSm = location.pathname === "/admin-dash" ? 2 : 3;
  const sideBarSizeMd = location.pathname === "/admin-dash" ? 1 : 2;
  return (
    <Container fluid className='main-page m-0' id={theme}>
      {loading || mainLoading ? (
        <Row className='main-page__spinner'>
          {/* <BarLoader color="red" /> */}
        </Row>
      ) : path === "/user-settings" ? (
        <Row>
          <Col sm={12} className='p-0'>
            <SettingsPage
              history={history}
              location={location}
              user={user}
              settings={settings}
            />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col sm={sideBarSizeSm} md={sideBarSizeMd} className='p-0'>
            <MainSideBar
              history={history}
              location={location}
              user={user}
              tasks={tasks}
              settings={settings}
              followedUsers={followedUsers}
              theme={theme}
              setTheme={setTheme}
              // numberOfTasks={numberOfTasks}
              sideBarLoading={sideBarLoading}
              setSideBarLoading={setSideBarLoading}
            />
          </Col>
          {path === "/dash" ? (
            <Col className='m-0 px-4'>
              <DashboardPage
                user={user}
                categories={categories}
                achievements={achievements}
                followedUsers={followedUsers}
                features={features}
                history={history}
                location={location}
                setErrorMessage={setErrorMessage}
              />
            </Col>
          ) : // : path === "/stats" ? (
          //   <Stats />
          // ) :
          path === "/tasks-add-new" ? (
            <Col className='m-0'>
              <AddTaskPage
                user={user}
                categories={categories}
                followedUsers={followedUsers}
                history={history}
                location={location}
                setErrorMessage={setErrorMessage}
                setSideBarLoading={setSideBarLoading}
              />
            </Col>
          ) : // : path === "/tasks" ? (
          //   <Col className='m-0'>
          //     <TasksPage user={user} categories={categories} />
          //   </Col>
          // )
          path === "/tasks" ? (
            <Col className='m-0'>
              <NewTasksPage
                user={user}
                followedUsers={followedUsers}
                tasks={tasks}
                history={history}
                location={location}
                setSideBarLoading={setSideBarLoading}
              />
            </Col>
          ) : // path === "/tasks-schedule" ? (
          //   <TasksSchedule />
          // ) : path === "/quests" ? (
          //   <Quests />
          // ) : path === "/inventory" ? (
          //   <Inventory />
          // ) :
          path === "/following" ? (
            <Col className='m-0'>
              <FollowingPage user={user} followedUsers={followedUsers} />
            </Col>
          ) : path === "/admin-dash" ? (
            <Col className='m-0 p-0'>
              <AdminPage
                user={user}
                features={features}
                history={history}
                location={location}
              />
            </Col>
          ) : path === "/error" ? (
            <Col className='m-0'>
              <ErrorPage history={history} errorMessage={errorMessage} />
            </Col>
          ) : (
            <Col className='m-0'>
              <ErrorPage history={history} />
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default MainBody;