import { Row, Card } from "react-bootstrap";
import { taskInt } from "../../typings/interfaces";
import { NONE } from "../../utils/constants";

type PageTaskCardsProps = {
  tasks: taskInt[];
};

const PageTaskCards = (props: PageTaskCardsProps) => {
  const { tasks } = props;
  const today = new Date().toString()
  const todayTasks = tasks.filter((t) => t.deadline === today || t.deadline === NONE);
  // const tomorrowTasks
  // then show by date
  return (
    <Row>
      Today
      {todayTasks.map((t: taskInt, i: number) => (
        <Card className='col-12' key={i}>
          <Card.Img variant='top' src={t.image} />
          <Card.Title>{t.title}</Card.Title>
          <Card.Text>worth: {t.value}XP</Card.Text>
          <Card.Text>deadline: {t.deadline}</Card.Text>
          <Card.Text>category: {t.category}</Card.Text>
          <Card.Text>description: {t.desc}</Card.Text>
          <Card.Text>shared with: {t.sharedWith}</Card.Text>
          <Card.Text>created by: {t.createdBy}</Card.Text>
          <Card.Text>status: {t.status}</Card.Text>
          <Card.Text>type: {t.type}</Card.Text>
        </Card>
      ))}
    </Row>
  );
};

export default PageTaskCards;
