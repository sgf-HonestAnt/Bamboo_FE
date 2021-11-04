import { Container, Row, Col } from "react-bootstrap";
import { currentTasksInt, taskInt } from "../../typings/interfaces";
import "./styles.css";

type TasksProps = {
  tasks: currentTasksInt;
};

const Tasks = (props: TasksProps) => {
  const { tasks } = props;
  const allTasks = tasks.awaited.concat(tasks.in_progress, tasks.completed);
  return (
    <Container fluid>
      <Row className='tasks-page'>
        {allTasks.map((t: taskInt, i: number) => {
          return <Col sm={3}>!!!</Col>;
        })}
      </Row>
    </Container>
  );
};

export default Tasks;
