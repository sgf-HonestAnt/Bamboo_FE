import { History, Location } from "history";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { fillUserAction } from "../../redux/actions/user";
import { fillTasksAction } from "../../redux/actions/tasks";
import { reduxStateInt } from "../../typings/interfaces";
import { getSelectedDateAsString } from "../../utils/funcs/f_dates";
import DashProfileCard from "../__Components/DashComponents/ProfileCard";
import DashNotifications from "../__Components/DashComponents/Notifications";
import FindFollows from "../__Components/FindFollows";
import Achievements from "../__Components/DashComponents/Achievements";
import DashStats from "../__Components/DashComponents/DashStats";
import AtAGlance from "../__Components/DashComponents/AtAGlance";
import AtAGlanceStats from "../__Components/DashComponents/AtAGlanceStats";
import "./styles.css";

type DashboardPageProps = {
  history: History<unknown> | string[];
  location: Location<unknown>;
};
export default function DashboardPage(props: DashboardPageProps) {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { notification } = state.currentUser.my_user;
  const dispatch = useDispatch();
  const { history, location } = props;
  const [search, setSearch] = useState("");
  const isgt1660 = useMediaQuery({
    query: "(min-width: 1660px)",
  });
  const isgt1500 = useMediaQuery({
    query: "(min-width: 1390px)",
  });
  const isgt1390 = useMediaQuery({
    query: "(min-width: 1390px)",
  });
  const isgt999 = useMediaQuery({ query: "(min-width: 999px)" });
  const isgt851 = useMediaQuery({ query: "(min-width: 851px)" });
  const todayAsDate = new Date();
  const today = getSelectedDateAsString(todayAsDate);
  const attemptLoad = async () => {
    dispatch(fillUserAction());
    dispatch(fillTasksAction());
  };
  useEffect(() => {
    attemptLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isgt1660 ? (
    <Container fluid>
      <Row className='dashboard'>
        <Col className='col-3 dashboard__left-col p-3'>
          <Row className='p-0'>
            <Col className='col-12'>
              {notification.length > 0 && <DashNotifications />}
              <DashProfileCard history={history} />
            </Col>
            {location.pathname !== "/stats" && (
              <Col className='col-12 px-3 pt-3 pb-1'>
                <DashStats />
              </Col>
            )}
          </Row>
        </Col>
        <Col className='dashboard__center-col p-0'>
          <Row className='py-3'>
            <Col className='col-12'>
              <FindFollows
                history={history}
                search={search}
                setSearch={setSearch}
              />
            </Col>
          </Row>
          <Row className='p-0 py-3'>
            <Col className='col-12'>
              {location.pathname === "/dash" ? (
                <AtAGlance
                  today={today}
                  history={history}
                  location={location}
                />
              ) : (
                <AtAGlanceStats
                  today={today}
                  history={history}
                  location={location}
                />
              )}
            </Col>
          </Row>
        </Col>
        <Col className='col-2 dashboard__right-col p-0'>
          <div className='pl-3'>
            <Achievements />
          </div>
        </Col>
      </Row>
    </Container>
  ) : isgt1500 ? (
    <Container fluid>
      <Row className='dashboard'>
        <Col className='col-3 dashboard__left-col'>
          <Row className='p-0'>
            {notification.length > 0 && (
              <Col className='col-12 p-3'>
                <DashNotifications />
              </Col>
            )}
            <Col
              className={`col-12 ${notification.length > 0 ? "px-3" : "p-3"}`}>
              <DashProfileCard history={history} />
            </Col>
            {notification.length < 1 && location.pathname !== "/stats" && (
              <Col className='col-12 px-3 pb-1'>
                <DashStats />
              </Col>
            )}
          </Row>
        </Col>
        <Col className='col-7 dashboard__center-col p-0'>
          <Row className='py-3'>
            <Col className='col-12'>
              <FindFollows
                history={history}
                search={search}
                setSearch={setSearch}
              />
            </Col>
          </Row>
          <Row className='p-0'>
            <Col className='col-12'>
              {location.pathname === "/dash" ? (
                <AtAGlance
                  today={today}
                  history={history}
                  location={location}
                />
              ) : (
                <AtAGlanceStats
                  today={today}
                  history={history}
                  location={location}
                />
              )}{" "}
            </Col>
          </Row>
        </Col>
        <Col className='col dashboard__right-col p-0'>
          <Row className='p-0 pl-3'>
            <Col>
              <Achievements />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  ) : isgt1390 ? (
    <Container fluid>
      <Row className='dashboard'>
        <Col className='col-3 dashboard__left-col'>
          <Row className='p-0'>
            <Col className='col-12 p-3'>
              {notification.length > 0 && <DashNotifications />}
              <DashProfileCard history={history} />
              {notification.length < 1 && location.pathname !== "/stats" && (
                <Col className='col-12 p-0 my-3 pb-1'>
                  <DashStats />
                </Col>
              )}
            </Col>
          </Row>
        </Col>
        <Col className='col-7 dashboard__center-col p-0'>
          <Row className='py-3'>
            <Col className='col-12'>
              <FindFollows
                history={history}
                search={search}
                setSearch={setSearch}
              />
            </Col>
          </Row>
          <Row className='p-0'>
            <Col className='col-12'>
              {location.pathname === "/dash" ? (
                <AtAGlance
                  today={today}
                  history={history}
                  location={location}
                />
              ) : (
                <AtAGlanceStats
                  today={today}
                  history={history}
                  location={location}
                />
              )}{" "}
            </Col>
          </Row>
        </Col>
        <Col className='col-2 dashboard__right-col p-0'>
          <Row className='p-0 pl-3'>
            <Col>
              <Achievements />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  ) : isgt999 ? (
    <Container fluid>
      <Row className='dashboard'>
        <Col className='col-12 mt-3 mb-2'>
          <FindFollows
            history={history}
            search={search}
            setSearch={setSearch}
          />
        </Col>
        <Col className='col-4 pt-3 pl-3 pr-3 pb-3'>
          {notification.length > 0 && <DashNotifications />}
          <DashProfileCard history={history} />
          {notification.length < 1 && location.pathname !== "/stats" && (
            <Col className='col-12 p-0 my-3 pb-1'>
              <DashStats />
            </Col>
          )}
        </Col>
        <Col className='p-0 pr-3'>
          {location.pathname === "/dash" ? (
            <AtAGlance today={today} history={history} location={location} />
          ) : (
            <AtAGlanceStats
              today={today}
              history={history}
              location={location}
            />
          )}{" "}
        </Col>
      </Row>
    </Container>
  ) : isgt851 ? (
    <Container fluid>
      <Row className='dashboard'>
        <Col className='col-12 mt-3 mb-2'>
          <FindFollows
            history={history}
            search={search}
            setSearch={setSearch}
          />
        </Col>
        <Col className='col-6 pt-3 pl-3 pr-3 pb-0'>
          {notification.length > 0 && <DashNotifications />}
          <DashProfileCard history={history} />
          {notification.length < 1 && location.pathname !== "/stats" && (
            <Col className='col-12 p-0 my-3 pb-1'>
              <DashStats />
            </Col>
          )}
        </Col>
        <Col className='p-0'>
          {location.pathname === "/dash" ? (
            <AtAGlance today={today} history={history} location={location} />
          ) : (
            <AtAGlanceStats
              today={today}
              history={history}
              location={location}
            />
          )}{" "}
        </Col>
      </Row>
    </Container>
  ) : (
    <Container fluid>
      <Row className='dashboard'>
        <Col className='col-12 mt-3 mb-2'>
          <FindFollows
            history={history}
            search={search}
            setSearch={setSearch}
          />
        </Col>
        <Col className='col-12 pt-3 pl-3 pr-3 pb-3'>
          {notification.length > 0 && <DashNotifications />}
          <DashProfileCard history={history} />
        </Col>
        <Col className='pr-3 pb-3 pl-2 pt-0'>
          {location.pathname === "/dash" ? (
            <AtAGlance today={today} history={history} location={location} />
          ) : (
            <AtAGlanceStats
              today={today}
              history={history}
              location={location}
            />
          )}{" "}
        </Col>
      </Row>
    </Container>
  );
}
