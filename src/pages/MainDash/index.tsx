import { History, Location } from "history";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Row, Col } from "react-bootstrap";
import { getSelectedDateAsString } from "../../utils/f_dates";
import DashProfileCard from "./Components/ProfileCard";
import DashTasks from "./Components/DashTasks";
import DashTipsCard from "./Components/DashTipsCard";
import DashNotifications from "./Components/Notifications";
import DashChallCard from "./Components/ChallengeCard";
import DashSearch from "./Components/DashSearch";
import Achievements from "./Components/Achievements";
import { fillUserAction } from "../../redux/actions/user";
import { useDispatch } from "react-redux";
import { reduxStateInt } from "../../typings/interfaces";
import { useAppSelector } from "../../redux/hooks";
import "./styles.css";
import { Link } from "react-router-dom";

type DashboardPageProps = {
  history: History<unknown> | string[];
  location: Location<unknown>;
};
const DashboardPage = (props: DashboardPageProps) => {
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
  // const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
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
  return isDesktopOrLaptop ? (
    <Row className='dashboard p-3 mt-3'>
      <Col sm={12} md={10} className='dashboard__left-col'>
        <Row className='p-0'>
          <Col sm={4} className='p-0'>
            {notification.length < 1 && admin && (
              <div className='dashboard__admin-card m-2'>
                <Link to='/admin-dash'>Go to Admin</Link>
              </div>
            )}
            {notification.length > 0 && <DashNotifications />}
            <DashProfileCard history={history} />
            <DashSearch
              history={history}
              search={search}
              setSearch={setSearch}
            />
          </Col>
          <Col sm={4} className='p-0'>
            {notification.length > 0 && admin && (
              <div className='dashboard__admin-card m-2'>
                <Link to='/admin-dash'>Go to Admin</Link>
              </div>
            )}
            <DashTasks today={today} history={history} location={location} />
            <DashTipsCard />
            <DashChallCard />
          </Col>
          <Col sm={4} className='p-0'>
            <Achievements />
          </Col>
          <Col sm={12} className='p-0'></Col>
        </Row>
      </Col>
    </Row>
  ) : isTabletOrMobile ? (
    <Row className='dashboard p-3 mt-3'>
      <Col sm={12} md={10} className='dashboard__left-col'>
        <Row className='p-0'>
          <Col sm={4} md={6} className='p-0'>
            <DashProfileCard history={history} />
          </Col>
          <Col sm={4} className='p-0'>
            <DashNotifications />
            <DashTasks today={today} history={history} location={location} />
            <DashChallCard />
          </Col>
          <Col sm={4} className='p-0'>
            <DashSearch
              history={history}
              search={search}
              setSearch={setSearch}
            />
            <Achievements />
          </Col>
          <Col sm={12} className='p-0'>
            <DashTipsCard />
          </Col>
        </Row>
      </Col>
    </Row>
  ) : (
    <div>IS NOT DESKTOP, LAPTOP, TABLET OR MOBILE</div>
  );
};

export default DashboardPage;
