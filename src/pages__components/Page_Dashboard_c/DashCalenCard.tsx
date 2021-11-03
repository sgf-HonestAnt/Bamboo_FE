import { Card, Button } from "react-bootstrap";

type DashCalenCardProps = {};

const DashCalenCard = (props: DashCalenCardProps) => {
//   const {} = props;
  return (
    <div className='dashboard__calendar-card m-2'>
      <Card.Text>Calendar</Card.Text>
      <Button variant='primary'>Go somewhere</Button>
    </div>
  );
};

export default DashCalenCard;
