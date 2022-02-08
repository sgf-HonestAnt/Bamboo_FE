import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { featureInt, reduxStateInt } from "../../../typings/interfaces";
import { Row, Col, Button } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { getMonthByIndex } from "../../../utils/funcs/f_dates";
import BambooPoints from "../XP";
import { Link } from "react-router-dom";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

type DashChallCardProps = {};

const DashChallCard = (props: DashChallCardProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  // const { awaited, in_progress } = state.currentTasks;
  // const { total_xp } = state.currentUser.my_user;
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);
  const features = state.currentFeatures;
  const [featureList, setFeatureList] = useState<featureInt[] | never[]>([]);
  useEffect(() => {
    const currMonth = getMonthByIndex(new Date());
    const foundFeatures = features.features.filter(
      (f) => f.month === currMonth
    );
    setFeatureList(foundFeatures);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [features]);
  return (
    <div className='m-1 bamboo-card-x-dark dashboard__challenge-card'>
      <Row>
        {/* For now, just show first feature with matched month */}
        {/* {featureList < 1 && } */}
        {featureList.length > 0 ? (
          <Col>
            <div className='dashboard__card-header'>Featured Challenge</div>
            {featureList[0].image && (
              <img
                src={featureList[0].image}
                className='dashboard__challenge-card__img'
                alt=''
              />
            )}
            <div>{featureList[0].descrip}</div>
            <div>
              {featureList[0].month} - Level {featureList[0].level} -{" "}
              {featureList[0].value}XP
            </div>
            <Button>TAKE PART</Button>
          </Col>
        ) : (
          <Col>
            <>
              <div className='dashboard__card-header'>
                How to Use{" "}
                {showFirst || showSecond || showThird ? (
                  <span
                    onClick={(e) => {
                      setShowFirst(false);
                      setShowSecond(false);
                      setShowThird(false);
                    }}>
                    <AiOutlineEyeInvisible />
                  </span>
                ) : (
                  <span onClick={(e) => setShowFirst(true)}>
                    <AiOutlineEye />
                  </span>
                )}
              </div>
              {showFirst ? (
                <>
                  <div className='mt-2'>
                    The Bamboo task app is quick and easy to use. You can add
                    tasks at <Link to='/dash'>"dash"</Link> or{" "}
                    <Link to='/tasks'>"tasks"</Link> pages, and edit or delete
                    them with a click. Tasks are dragged between statuses, then
                    marked complete. Completed tasks can no longer be edited and
                    will appear as achievement notifications on larger screens.{" "}
                  </div>
                  <div className='mt-2'>
                    <Button
                      variant='link'
                      onClick={(e) => {
                        setShowFirst(false);
                        setShowSecond(true);
                      }}>
                      Next
                      <GrFormNext />
                    </Button>
                  </div>
                </>
              ) : showSecond ? (
                <>
                  <div className='mt-2'>
                    Each task provides 'Bamboo Points' <BambooPoints /> or XP.
                    You can spend XP on reward badges or send it as a gift to
                    teammates. You can search for teammates using their email or
                    username at <Link to='/dash'>"dash"</Link>
                    or <Link to='/following'>"following"</Link>. Once they have
                    accepted your request, tasks you create can be shared with
                    your team, who will also be able to see when you have
                    achieved a task (but not its details, just in case it's
                    private).{" "}
                  </div>
                  <div className='mt-2'>
                    <Button
                      variant='link'
                      onClick={(e) => {
                        setShowFirst(true);
                        setShowSecond(false);
                      }}>
                      <GrFormPrevious />
                      Back
                    </Button>{" "}
                    |{" "}
                    <Button
                      variant='link'
                      onClick={(e) => {
                        setShowSecond(false);
                        setShowThird(true);
                      }}>
                      Next
                      <GrFormNext />
                    </Button>
                  </div>
                </>
              ) : showThird ? (
                <>
                  <div className='mt-2'>
                    Don't forget to check out <Link to='/stats'>"stats"</Link>{" "}
                    as well! Stats will change as you progress through your
                    tasks. You may notice a sneak peek of your stats under your
                    profile card. Speaking of profiles, don't forget to
                    customise your bio and avatar at{" "}
                    <Link to='/user-settings'>"user settings"</Link> (which will
                    make it easier for teammates to recognise you as well).
                    Thanks for trying Bamboo!
                  </div>
                  <div className='mt-2'>
                    <img
                      className='dotted-border x-tiny-round'
                      src='https://avatars.githubusercontent.com/u/82496944?v=4'
                      alt='sgf-HonestAnt'
                    />{" "}
                    S Fisher @{" "}
                    <a
                      href='https://github.com/sgf-HonestAnt'
                      target='_blank'
                      rel='noreferrer'>
                      sgf-Honest-Ant
                    </a>
                  </div>
                  <div className='mt-2'>
                    <Button
                      variant='link'
                      onClick={(e) => {
                        setShowSecond(true);
                        setShowThird(false);
                      }}>
                      <GrFormPrevious />
                      Back
                    </Button>
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default DashChallCard;
