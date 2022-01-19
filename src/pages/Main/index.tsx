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
import "./styles.css";
// import { useMediaQuery } from "react-responsive";

export default function MainBody({ history, location }: RouteComponentProps) {
  // ****************************MEDIA********************************************
  // const isMobileDevice = useMediaQuery({
  //   query: "(max-width: 560px)",
  // });
  const [mainLoading, setMainLoading] = useState(true);
  const [theme, setTheme] = useState("theme-light");
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const user: userInt = useAppSelector(
    (state: reduxStateInt) => state.currentUser.my_user
  );
  const { refreshToken } = user;
  // const token = localStorage.getItem("token");
  const { error, loading } = state.currentUser;
  const features = state.currentFeatures;
  const dispatch = useDispatch();
  const path = location.pathname;
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
  // useEffect(() => {
  //   console.log("🔐", localStorage.getItem("token"));
  // }, [token]);
  return (
    <Container fluid className='main-page m-0 p-0' id={theme}>
      {loading || mainLoading ? (
        <div>loading</div>
      ) : path === "/user-settings" ? (
        <div>
          <div className='p-0'>
            <SettingsPage history={history} location={location} />
          </div>
        </div>
      ) : (
        <div className='main-page__wrapper'>
          <div
            className={`main-page__sidebar${
              location.pathname === "/admin-dash" ? "-admin" : ""
            }`}>
            <SideBar
              history={history}
              location={location}
              setTheme={setTheme}
            />
          </div>
          {path === "/dash" ? (
            <div className='main-page__main-section'>
              <DashboardPage history={history} location={location} />
            </div>
          ) : path === "/stats" ? (
            <div className='main-page__main-section'>
              <DashboardPage history={history} location={location} />
            </div>
          ) : path === "/tasks" ? (
            <div className='main-page__main-section'>
              <TasksPage history={history} location={location} />
            </div>
          ) : path === "/following" ? (
            <div className='main-page__main-section'>
              <FollowingPage history={history} location={location} />
            </div>
          ) : path === "/admin-dash" ? (
            <div className='main-page__main-section-admin'>
              <AdminPage
                user={user}
                features={features}
                history={history}
                location={location}
              />
            </div>
          ) : (
            <div className='main-page__main-section'>
              <LoadingPage history={history} />
            </div>
          )}
        </div>
      )}
    </Container>
  );
}
