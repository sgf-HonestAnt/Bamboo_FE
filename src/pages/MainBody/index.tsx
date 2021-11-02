// import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { RouteComponentProps } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  currentAchievementsInt,
  currentTasksInt,
  followedUserInt,
  // currentSettingsInt,
  // currentUserInt,
  reduxStateInt,
} from "../../typings/interfaces";
import "./styles.css";
import initialFetchAction from "../../redux/actions";
import {
  ACCESS_TOKEN,
  ACHIEVEMENTS,
  SETTINGS,
  TASKS,
  USERS,
} from "../../utils/constants";

const MainBody = ({ history, location, match }: RouteComponentProps) => {
  // const state: reduxStateInt = useSelector((state: reduxStateInt) => state);
  const username: string = useAppSelector(
    (state: reduxStateInt) => state.currentUser.my_user.username
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
  // const settings: currentSettingsInt = useSelector(
  //   (state: reduxStateInt) => state.currentSettings
  // );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialFetchAction(ACCESS_TOKEN, USERS));
    if (username.length > 0) {
      dispatch(initialFetchAction(ACCESS_TOKEN, TASKS));
      dispatch(initialFetchAction(ACCESS_TOKEN, ACHIEVEMENTS));
      dispatch(initialFetchAction(ACCESS_TOKEN, SETTINGS));
    }
    console.log(`🥔${username} successfully logged in`);
    console.log(`🥔${username} has ${tasks.awaited.length} awaited tasks`);
    console.log(`🥔${username} has ${achievements.list.length} achievements`);
    console.log(`🥔${username} has ${followedUsers.length} followed users`);
  }, [
    dispatch,
    username,
    tasks.awaited.length,
    achievements.list.length,
    followedUsers.length,
  ]);
  //const path = location.pathname;
  return (
    <Container fluid className='main-page'>
      <Row>
        <Col sm={2}>{/* <MainSideBar /> */}</Col>
        <Col>
          {/* {path === "/dash" ? (
            <Dashboard />
          ) : path === "/stats" ? (
            <Stats />
          ) : path === "/tasks" ? (
            <Tasks />
          ) : path === "/tasks-schedule" ? (
            <TasksSchedule />
          ) : path === "/quests" ? (
            <Quests />
          ) : path === "/inventory" ? (
            <Inventory />
          ) : path === "/following" ? (
            <Following />
          ) : (
            <ErrorPage />
          )} */}
        </Col>
      </Row>
    </Container>
  );
};

export default MainBody;
