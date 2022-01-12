import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { featureInt, reduxStateInt } from "../../../typings/interfaces";
import { Button } from "react-bootstrap";
import { ICOURGENT } from "../../../utils/appIcons";
import { getMonthByIndex } from "../../../utils/f_dates";

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
    <div className='dashboard__challenge-card m-2'>
      {/* For now, just show first feature with matched month */}
      {/* {featureList < 1 && } */}
      <div className='dashboard__card-header'>Featured Challenge</div>
      <div className='red'>
        <ICOURGENT />
        These need to be written
      </div>
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
