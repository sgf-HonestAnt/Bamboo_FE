import { Card } from "react-bootstrap";

type DashTipsCardProps = {};

const DashTipsCard = (props: DashTipsCardProps) => {
  //   const {} = props;
  return (
    <div className='dashboard__tips-card'>
      <Card.Title>Tips</Card.Title>
      <Card.Text>Some info</Card.Text>
    </div>
  );
};

export default DashTipsCard;
