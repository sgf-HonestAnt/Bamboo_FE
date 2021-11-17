import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { currentFeaturesInt, featureInt } from "../../typings/interfaces";
import { getMonthByIndex } from "../../utils/dateFuncs";

type DashChallCardProps = {
  features: currentFeaturesInt;
};

const DashChallCard = (props: DashChallCardProps) => {
  const { features } = props;
  const [featureList, setFeatureList] = useState<featureInt[] | never[]>([]);
  useEffect(() => {
    const currMonth = getMonthByIndex();
    const foundFeatures = features.features.filter(
      (f) => f.month === currMonth
    );
    setFeatureList(foundFeatures);
    // console.log(featureList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [features]);
  return (
    <div className='dashboard__challenge-card'>
      {/* For now, just show first feature with matched month */}
      {/* {featureList < 1 && } */}
      <Card.Title>Featured Challenge</Card.Title>
      {featureList.length > 0 ? (
        <>
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
        </>
      ) : (
        <div>NO FEATURED CHALLENGES THIS MONTH!</div>
      )}
    </div>
  );
};

export default DashChallCard;
