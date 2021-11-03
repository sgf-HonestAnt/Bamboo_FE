import { Card } from "react-bootstrap";

type DashAlertCardProps = {};

const DashAlertCard = (props: DashAlertCardProps) => {
  //   const {} = props;
  return (
    <div className='dashboard__alerts-card'>
      <Card.Title>Alerts</Card.Title>
      <Card.Text>Some info</Card.Text>
    </div>
  );
};

export default DashAlertCard;
