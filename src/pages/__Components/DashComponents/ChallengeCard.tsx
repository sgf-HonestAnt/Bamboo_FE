import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { featureInt, reduxStateInt } from "../../../typings/interfaces";
import { Row, Col, Button } from "react-bootstrap";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { getMonthByIndex } from "../../../utils/funcs/f_dates";

type DashChallCardProps = {};

const DashChallCard = (props: DashChallCardProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
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
    <Row className='bamboo-card-x-dark dashboard__challenge-card'>
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
          <div className='dashboard__card-header'>How to Use</div>
          <div>
            I will write this in time for demo day in lieu of Featured
            Challenges
          </div>
        </Col>
      )}
    </Row>
  );
};

export default DashChallCard;
