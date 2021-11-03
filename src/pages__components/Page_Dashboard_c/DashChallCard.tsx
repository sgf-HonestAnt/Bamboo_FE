import { Card } from "react-bootstrap";
import { currentFeaturesInt } from "../../typings/interfaces";

type DashChallCardProps = {
  features: currentFeaturesInt;
};

const DashChallCard = (props: DashChallCardProps) => {
  const { features } = props;
  return (
    <div className='dashboard__challenge-card'>
      <Card.Title>Featured Challenge</Card.Title>
      <Card.Text>{features?.features[0]?.descrip}</Card.Text>
      {/* 🖐️ Should correspond to current month */}
    </div>
  );
};

export default DashChallCard;
