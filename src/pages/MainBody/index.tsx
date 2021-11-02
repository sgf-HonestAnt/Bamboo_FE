// import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { RouteComponentProps } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  currentAchievementsInt,
  currentFeaturesInt,
  currentTasksInt,
  followedUserInt,
  // currentSettingsInt,
  reduxStateInt,
  userInt,
} from "../../typings/interfaces";
import "./styles.css";
import initialFetchAction from "../../redux/actions";
import { ACHIEVEMENTS, SETTINGS, TASKS, USERS } from "../../utils/constants";
import { setFeatures } from "../../redux/actions/features";
import refreshSession from "../../utils/funcs/refresh";
import MainSideBar from "../MainSideBar";
import Dashboard from "../Page_Dashboard";
import Following from "../Page_Following";
import ErrorPage from "../Page_Error";

const MainBody = ({ history, location, match }: RouteComponentProps) => {
  // const state: reduxStateInt = useSelector((state: reduxStateInt) => state);
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
  // const settings: currentSettingsInt = useSelector(
  //   (state: reduxStateInt) => state.currentSettings
  // );

  const { username, refreshToken } = user;

  const dispatch = useDispatch();

  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgxNWQwMWFkY2M2ZmJhMzVmOTFjYzEiLCJpYXQiOjE2MzU4ODI3ODEsImV4cCI6MTYzNTg4MzY4MX0.UyxE5rCFQKtn3fbU5MkinEM7SG6DN9YFkniGQcoiSKI";

  const path = location.pathname;

  useEffect(() => {
    if (!token && refreshToken) {
      console.log("no token at mainbody");
      refreshSession(refreshToken);
    } else if (!token && !refreshToken) {
      history.push("/login");
    } else {
      dispatch(initialFetchAction(token, refreshToken, USERS));
      dispatch(initialFetchAction(token, refreshToken, TASKS));
      dispatch(initialFetchAction(token, refreshToken, ACHIEVEMENTS));
      dispatch(initialFetchAction(token, refreshToken, SETTINGS));
      dispatch(setFeatures());
      console.log(`🥔${username} successfully logged in`);
      console.log(`🥔${username} has ${tasks.awaited.length} awaited tasks`);
      console.log(`🥔${username} has ${achievements.list.length} achievements`);
      console.log(`🥔${username} has ${followedUsers.length} followed users`);
      console.log(`🥔Found ${curr_features.total} features`);
    }
  }, [
    dispatch,
    username,
    tasks.awaited.length,
    achievements.list.length,
    followedUsers.length,
    curr_features.total,
    token,
    refreshToken,
    history,
  ]);
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
