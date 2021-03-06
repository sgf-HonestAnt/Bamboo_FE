import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { fillUserAction } from "../../redux/actions/user";
import { fillTasksAction } from "../../redux/actions/tasks";
import { fillAchievementsAction } from "../../redux/actions/achievements";
import { fillFeaturesAction } from "../../redux/actions/features";
import { fillSettingsAction } from "../../redux/actions/settings";
import { reduxStateInt, userInt } from "../../typings/interfaces";
import { Container } from "react-bootstrap";
import checkToken from "../../utils/funcs/f_checkToken";
import SideBar from "../SideBar";
import SettingsPage from "../Settings";
import DashboardPage from "../Dashboard";
import TasksPage from "../Tasks";
import FollowingPage from "../Follow";
import AdminPage from "../Admin";
import LoadingPage from "../Loading";
import { useMediaQuery } from "react-responsive";
import "./styles.css";

export default function MainBody({ history, location }: RouteComponentProps) {
  const isLt755 = useMediaQuery({ query: "(max-width: 755px)" });
  const dispatch = useDispatch();
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const user: userInt = useAppSelector(
    (state: reduxStateInt) => state.currentUser.my_user
  );
  const { refreshToken } = user;
  const { error, loading } = state.currentUser;
  const features = state.currentFeatures;
  const path = location.pathname;
  const [theme, setTheme] = useState("theme-light");
  const attemptLoad = async () => {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      console.log("⛔NO ACCESS TOKEN");
      history.push("/login");
    } else {
      const username = await checkToken(refreshToken, history, location);
      if (username) {
        dispatch(fillUserAction(accessToken));
        dispatch(fillTasksAction());
        dispatch(fillAchievementsAction());
        dispatch(fillFeaturesAction());
        dispatch(fillSettingsAction());
      }
      setTimeout(() => {
        loading && console.log(`🔁LOADING`);
        // error && console.log(`💥ERROR`);
        error && console.log(error);
      }, 1000);
    }
  };
  useEffect(() => {
    attemptLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  return (
    <>
      <Container fluid className='main-page m-0 p-0' id={theme}>
        {path === "/user-settings" ? (
          <div className='settings-page__wrapper'>
            <SideBar
              history={history}
              location={location}
              setTheme={setTheme}
            />

            <div className='p-0'>
              <SettingsPage history={history} location={location} />
            </div>
          </div>
        ) : path === "/admin-dash" ? (
          <div className='main-page__wrapper'>
            <div>
              <SideBar
                history={history}
                location={location}
                setTheme={setTheme}
              />
            </div>
            <div className='admin-section'>
              <AdminPage
                user={user}
                features={features}
                history={history}
                location={location}
              />
            </div>{" "}
          </div>
        ) : (
          <div className='main-page__wrapper'>
            {!isLt755 ? (
              <div className='sidebar'>
                {/* {isLt755 && (
                <Badge bg='dark' style={{ maxWidth: "100%" }}>
                  <div className='rotate'>
                    <FiTablet />
                  </div>
                </Badge>
              )}{" "} */}
                <SideBar
                  history={history}
                  location={location}
                  setTheme={setTheme}
                />
              </div>
            ) : (
              <SideBar
                history={history}
                location={location}
                setTheme={setTheme}
              />
            )}
            {path === "/dash" ? (
              <div
                className={`${
                  isLt755 ? "full-width overflow-x-scroll" : "main-section"
                }`}>
                <DashboardPage history={history} location={location} />
              </div>
            ) : path === "/stats" ? (
              <div
                className={`${
                  isLt755 ? "full-width overflow-x-scroll" : "main-section"
                }`}>
                <DashboardPage history={history} location={location} />
              </div>
            ) : path === "/tasks" || path === "/dash-tasks" ? (
              <div
                className={`${
                  isLt755 ? "full-width overflow-x-scroll" : "main-section"
                }`}>
                <TasksPage history={history} location={location} />
              </div>
            ) : path === "/following" ? (
              <div
                className={`${
                  isLt755 ? "full-width overflow-x-scroll" : "main-section"
                }`}>
                <FollowingPage history={history} location={location} />
              </div>
            ) : (
              <div className='main-section'>
                <LoadingPage history={history} location={location} />
              </div>
            )}
          </div>
        )}
      </Container>
    </>
  );
}
