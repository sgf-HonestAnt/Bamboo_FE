import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { featureInt, reduxStateInt } from "../../../typings/interfaces";
import { Row, Col, Button } from "react-bootstrap";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { getMonthByIndex } from "../../../utils/funcs/f_dates";

type DashChallCardProps = {};

const DashChallCard = (props: DashChallCardProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { awaited, in_progress } = state.currentTasks;
  const { total_xp } = state.currentUser.my_user;
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
            <AiOutlineQuestionCircle />
            {total_xp < 1 || (awaited.length < 1 && in_progress.length < 1) ? (
              <>
                <div className='dashboard__card-header'>
                  Looks like you haven't started any tasks yet.
                </div>
                <div>Click the 'Add Task' button to begin.</div>
              </>
            ) : (
              <>
                <div className='dashboard__card-header'>
                  ...I will write this in time for the demo day
                </div>
                <div>
                  (Note. Gifting works - so does Rewards Badge system. Ability
                  to delete/edit category, category Color Choice will be
                  advanced features added after demo day. I'm constantly
                  thinking of new ways to improve.)
                </div>
              </>
            )}
          </Col>
        )}
      </Row>
    </div>
  );
};

export default DashChallCard;
