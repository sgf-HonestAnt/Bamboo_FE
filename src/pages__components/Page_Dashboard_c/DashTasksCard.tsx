import { Card, Button } from "react-bootstrap";
import { taskInt } from "../../typings/interfaces";

type DashTasksCardProps = {
  today: taskInt[];
};

const DashTasksCard = (props: DashTasksCardProps) => {
  const { today } = props;
  return (
    <div className='dashboard__tasks-card m-2'>
      <Card.Title>Today's tasks</Card.Title>
      <Card.Text>
        {today?.length < 1 && <span>No tasks awaited today!</span>}
        {today?.map((t, i) => (
          <span className='dashboard__tasks-card__tasks' key={i}>
            {t.title}
          </span>
        ))}
      </Card.Text>
      <Button variant='primary'>Go somewhere</Button>
    </div>
  );
};

export default DashTasksCard;
