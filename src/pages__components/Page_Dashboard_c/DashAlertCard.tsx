import { Card } from "react-bootstrap";

type DashAlertCardProps = {
  notification: string[];
};

const DashAlertCard = (props: DashAlertCardProps) => {
  const {notification} = props;
  return (
    <div className='dashboard__alerts-card'>
      <Card.Title>Alerts</Card.Title>
      <Card.Text>
      {
      notification.length>0
      ?notification[0]
      :<>NO NOTIFICATIONS</>
      }
      </Card.Text> 
    </div>
  );
};

export default DashAlertCard;
