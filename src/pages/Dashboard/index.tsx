import { History, Location } from "history";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { fillUserAction } from "../../redux/actions/user";
import { reduxStateInt } from "../../typings/interfaces";
import { getSelectedDateAsString } from "../../utils/funcs/f_dates";
import DashProfileCard from "./DashComponents/ProfileCard";
import DashTipsCard from "./DashComponents/DashTipsCard";
import DashNotifications from "./DashComponents/Notifications";
import DashChallCard from "./DashComponents/ChallengeCard";
import FindTeam from "../__Components/FindTeam";
import Achievements from "./DashComponents/Achievements";
import DashStats from "./DashComponents/DashStats";
import AtAGlance from "./DashComponents/AtAGlance";
import "./styles.css";

type DashboardPageProps = {
  history: History<unknown> | string[];
  location: Location<unknown>;
};
export default function DashboardPage(props: DashboardPageProps) {
  //console.log("FIX NEEDED ON DASHBOARDPAGE"); // 🔨 FIX NEEDED: IMPLEMENT BUY REWARDS FEATURE AND STATISTICS PAGE WITH DOWNLOADABLE PDF
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { notification, admin } = state.currentUser.my_user;
  const dispatch = useDispatch();
  const { history, location } = props;
  const [search, setSearch] = useState("");
  // ****************************MEDIA********************************************
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1660px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  // const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  // console.log("isBigScreen", isBigScreen, "isRetina", isRetina);
  // ****************************MEDIA********************************************
  const todayAsDate = new Date();
  const today = getSelectedDateAsString(todayAsDate);
  const attemptLoad = async () => {
    dispatch(fillUserAction());
  };
  useEffect(() => {
    attemptLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);
  // console.log(
  //   "isbig=>",
  //   isBigScreen,
  //   "isdesktop=>",
  //   isDesktopOrLaptop,
  //   "istablet=>",
  //   isTabletOrMobile
  // );
  return isBigScreen ? (
    <Container fluid>
      <Row className='dashboard'>
        <Col className='col-3 dashboard__left-col'>
          <Row className='p-0'>
            <Col className='col-12 p-3'>
              {notification.length > 0 && <DashNotifications />}
              <DashProfileCard history={history} isBigScreen={isBigScreen} />
              {admin && (
                <div className='dashboard__admin-card p-2'>
                  <Link to='/admin-dash'>Go to Admin</Link>
                </div>
              )}
              <DashStats />
            </Col>
          </Row>
        </Col>
        <Col className='col-7 dashboard__center-col p-0'>
          <Row className='py-3'>
            <Col className='col-12'>
              <FindTeam
                history={history}
                search={search}
                setSearch={setSearch}
              />
            </Col>
          </Row>
          <Row className='p-0'>
            <Col className='col-12'>
              <AtAGlance today={today} history={history} location={location} />
            </Col>
          </Row>
        </Col>
        <Col className='col dashboard__right-col p-0'>
          <Row className='pl-3'>
            <Col>
              <Achievements />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  ) : isDesktopOrLaptop ? (
    <Container fluid>
      <Row className='dashboard'>
        <Col className='col-3 dashboard__left-col'>
          <Row className='p-0'>
            <Col className='col-12 p-3'>
              {notification.length > 0 && <DashNotifications />}
              <DashProfileCard history={history} />
              {admin && (
                <div className='dashboard__admin-card p-2'>
                  <Link to='/admin-dash'>Go to Admin</Link>
                </div>
              )}
              {notification.length < 1 && (
                <Col className='col-12 p-0 my-3'>
                  <DashStats />
                </Col>
              )}
            </Col>
          </Row>
        </Col>
        <Col className='col-7 dashboard__center-col p-0'>
          <Row className='py-3'>
            <Col className='col-12'>
              <FindTeam
                history={history}
                search={search}
                setSearch={setSearch}
              />
            </Col>
          </Row>
          <Row className='p-0'>
            <Col className='col-12'>
              <AtAGlance today={today} history={history} location={location} />
            </Col>
          </Row>
        </Col>
        <Col className='col dashboard__right-col p-0'>
          <Row className='pl-3'>
            <Col>
              <Achievements />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  ) : isTabletOrMobile ? (
    <Container fluid>
      <Row className='dashboard'>
        <Col className='col-4 dashboard__left-col'>
          <Row className='p-0'>
            <Col className='col-12 p-3'>
              {notification.length > 0 && <DashNotifications />}
              <DashProfileCard history={history} />
              {admin && (
                <div className='dashboard__admin-card p-2'>
                  <Link to='/admin-dash'>Go to Admin</Link>
                </div>
              )}
              {notification.length < 1 && (
                <Col className='col-12 p-0 my-3'>
                  <DashStats />
                </Col>
              )}
            </Col>
          </Row>
        </Col>
        <Col className='col-7 dashboard__center-col p-0'>
          <Row className='py-3'>
            <Col className='col-12'>
              <FindTeam
                history={history}
                search={search}
                setSearch={setSearch}
              />
            </Col>
          </Row>
          <Row className='p-0'>
            <Col className='col-12'>
              <AtAGlance today={today} history={history} location={location} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  ) : (
    <div>IS NOT DESKTOP, LAPTOP, TABLET OR MOBILE</div>
  );
}
