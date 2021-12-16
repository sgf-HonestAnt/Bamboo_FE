import { History, Location } from "history";
import { useEffect, useState } from "react";
// import { useMediaQuery } from "react-responsive";
import { useAppSelector } from "../../redux/hooks";
import { reduxStateInt } from "../../typings/interfaces";
import { Row, Col } from "react-bootstrap";
// import createSuperlist from "../../utils/f_superlist";
import { getSelectedDateAsString } from "../../utils/f_dates";
import DashProfileCard from "./Components/ProfileCard";
import DashTasksCard from "./Components/TasksCard";
// import DashCalenCard from "./Components/Calendar";
import DashTipsCard from "./Components/DashTipsCard";
import DashAlertCard from "./Components/AlertCard";
import DashChallCard from "./Components/ChallengeCard";
import DashSearch from "./Components/DashSearch";
import DashAchievCard from "./Components/Achievements";
import "./styles.css";

type DashboardPageProps = {
  history: History<unknown> | string[];
  location: Location<unknown>;
};
const DashboardPage = (props: DashboardPageProps) => {
  console.log("FIX NEEDED ON DASHBOARDPAGE") // 🔨 FIX NEEDED: IMPLEMENT BUY REWARDS FEATURE AND STATISTICS PAGE WITH DOWNLOADABLE PDF
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { my_user } = state.currentUser;
  const { notification } = my_user;
  const { history, location } = props;
  const [search, setSearch] = useState("");
  // ****************************MEDIA********************************************
  // const isDesktopOrLaptop = useMediaQuery({
  //   query: "(min-width: 1224px)",
  // });
  // const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  // const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  // const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  // const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  // ****************************MEDIA********************************************
  const todayAsDate = new Date();
  const today = getSelectedDateAsString(todayAsDate);
  const attemptLoad = async () => {
    // dispatch(setUserLoading(true)); // 👈HERE!
    //   // load tasks with no deadline / deadline for today
    //   const data = await getTaskByQuery(
    //     `deadline=${today}&status=awaited&status=in_progress&sort=deadline,title`,
    //     _id
    //   );
    //   const todayDeadline = data.tasks;
    //   const noDeadline = await getTaskByDeadline(null);
    //   const tasksForToday = todayDeadline.concat(noDeadline);
  };
  useEffect(() => {
    attemptLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);
  return (
    <Row className='dashboard p-3 mt-3'>
      <Col sm={12} md={10} lg={8} className='dashboard__left-col'>
        <Row>
          <Col sm={6} className='p-0'>
            <DashProfileCard history={history} />
            <DashChallCard />
          </Col>
          <Col sm={6} className='p-0'>
            <DashTasksCard
              today={today}
              history={history}
              location={location}
            />
            {/* 
            🌈 BEFORE FINAL DEPLOYMENT
            Default Tasks "Solve World Hunger", "Brush Your Teeth", and "Buy Groceries" 
            Initial walk through shows you how to complete "Solve World Hunger"
            Change "Brush Your Teeth" to a DAILY task
            And add friends. ("You'll notice that "" is shared with AdminPanda. Try adding our second admin, BigBear, here...")
            */}
            {/* <DashCalenCard user={user} /> */}
            <DashTipsCard />
          </Col>
        </Row>
      </Col>
      <Col sm={12} md={2} lg={4} className='dashboard__right-col'>
        <Row>
          <Col className='p-0'>
            <DashSearch search={search} setSearch={setSearch} />
            {notification?.length > 0 && <DashAlertCard />}
            <DashAchievCard />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DashboardPage;
