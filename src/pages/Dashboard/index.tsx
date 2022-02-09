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
// import DashTipsCard from "./DashComponents/DashTipsCard";
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
  // const { awaited, in_progress, completed } = state.currentTasks;
  // const currLength = awaited.concat(in_progress, completed).length;
  const dispatch = useDispatch();
  const { history, location } = props;
  const [search, setSearch] = useState("");
  // ****************************MEDIA********************************************
  const isGt1660 = useMediaQuery({
    query: "(min-width: 1660px)",
  });
  const isGt1500 = useMediaQuery({
    query: "(min-width: 1390px)",
  });
  const isGt1390 = useMediaQuery({
    query: "(min-width: 1390px)",
  });
  const isGt999 = useMediaQuery({ query: "(min-width: 999px)" });
  const isGt755 = useMediaQuery({ query: "(min-width: 755px)" });
  // const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
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
  return isGt1660 ? (
    <Container fluid>
      <Row className='dashboard'>
        <Col className='col-3 dashboard__left-col p-3'>
          <Row className='p-0'>
            <Col className='col-12'>
              {notification.length > 0 && <DashNotifications />}
              {/* {location.pathname === "/user-settings" ? (
                <ProfileSettings history={history} isBigScreen={isBigScreen} />
              ) : ( */}
              <DashProfileCard history={history} />
              {/* )} */}
              {/* {admin && (
                <Link to='/admin-dash'>
                  <Button variant='info' className='dashboard__admin-card'>
                    Go to Admin
                  </Button>
                </Link>
              )} */}
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
  ) : isGt1500 ? (
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
              {/* {location.pathname === "/user-settings" ? (
                <ProfileSettings history={history} />
              ) : ( */}
              <DashProfileCard history={history} />
              {/* )} */}
              {/* {admin && (
                <Link to='/admin-dash'>
                  <Button variant='info' className='dashboard__admin-card'>
                    Go to Admin
                  </Button>
                </Link>
              )} */}
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
  ) : isGt1390 ? (
    <Container fluid>
      <Row className='dashboard'>
        <Col className='col-3 dashboard__left-col'>
          <Row className='p-0'>
            <Col className='col-12 p-3'>
              {notification.length > 0 && <DashNotifications />}
              {/* {location.pathname === "/user-settings" ? (
              <ProfileSettings history={history} />
            ) : ( */}
              <DashProfileCard history={history} />
              {/* )} */}
              {/* {admin && (
                <Link to='/admin-dash'>
                  <Button variant='info' className='dashboard__admin-card'>
                    Go to Admin
                  </Button>
                </Link>
              )} */}
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
  ) : isGt999 ? (
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
          {/* {location.pathname === "/user-settings" ? (
            <ProfileSettings history={history} />
          ) : ( */}
          <DashProfileCard history={history} />
          {/* )} */}
          {/* {admin && (
            <Link to='/admin-dash'>
              <Button variant='info' className='dashboard__admin-card'>
                Go to Admin
              </Button>
            </Link>
          )} */}
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
  ) : isGt755 ? (
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
          {/* {location.pathname === "/user-settings" ? (
            <ProfileSettings history={history} />
          ) : ( */}
          <DashProfileCard history={history} />
          {/* )} */}
          {/* {admin && (
            <Link to='/admin-dash'>
              <Button variant='info' className='dashboard__admin-card'>
                Go to Admin
              </Button>
            </Link>
          )} */}
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
          {/* {location.pathname === "/user-settings" ? (
            <ProfileSettings history={history} />
          ) : ( */}
          <DashProfileCard history={history} />
          {/* )} */}
          {/* {admin && (
            <Link to='/admin-dash'>
              <Button variant='info' className='dashboard__admin-card'>
                Go to Admin
              </Button>
            </Link>
          )} */}
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
  // : (
  //   <Container fluid>
  //     <Row className='dashboard py-3'>
  //       <Col className='col-12'>
  //         <FindFollows
  //           history={history}
  //           search={search}
  //           setSearch={setSearch}
  //         />
  //       </Col>
  //       <Col className={`${isTiny ? "col-12" : "col-5"} p-3`}>
  //         {notification.length > 0 && <DashNotifications />}
  //         {/* {location.pathname === "/user-settings" ? (
  //           <ProfileSettings history={history} />
  //         ) : ( */}
  //         <DashProfileCard history={history} />
  //         {/* )} */}
  //         {admin && (
  //           <Link to='/admin-dash'>
  //             <Button variant='info' className='dashboard__admin-card'>
  //               Go to Admin
  //             </Button>
  //           </Link>
  //         )}
  //         {notification.length < 1 && location.pathname !== "/stats" && (
  //           <Col className='col-12 p-0 my-3'>
  //             <DashStats />
  //           </Col>
  //         )}
  //       </Col>
  //       <Col className={`${isTiny ? "col-12" : "col-7"} px-3 pb-3`}>
  //         {location.pathname === "/dash" ? (
  //           <AtAGlance today={today} history={history} location={location} />
  //         ) : (
  //           <AtAGlanceStats
  //             today={today}
  //             history={history}
  //             location={location}
  //           />
  //         )}{" "}
  //       </Col>
  //     </Row>
  //   </Container>
  // );
}
