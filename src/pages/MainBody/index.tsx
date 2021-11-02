import { RouteComponentProps } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { reduxStateInt } from "../../typings/interfaces";
import "./styles.css";

const MainBody = ({ history, location, match }: RouteComponentProps) => {
  const state: reduxStateInt = useSelector((state: reduxStateInt) => state);
  // const selectedTheme: themeType = useSelector(
  //   (state: reduxStateInt) => state.currentSettings.selectedTheme
  // );
  useEffect(() => {
    console.log("USE EFFECT!");
  }, [state]);
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
