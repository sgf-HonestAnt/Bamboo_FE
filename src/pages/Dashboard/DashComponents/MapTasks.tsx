import { Row, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { taskInt } from "../../../typings/interfaces";
import { NONE, URGENT, COMPLETED } from "../../../utils/appConstants";
import { FiUsers } from "react-icons/fi";

type MapTasksProps = {
  tasks: taskInt[];
};

type TaskButtonProps = {
  i: number;
  task: taskInt;
};

function TaskButton(props: TaskButtonProps) {
  const { i, task } = props;
  return (
    <Button
      variant='link'
      className={`m-1 dashboard__tasks-card__task-box${
        task.status === COMPLETED ? "-completed" : ""
      }`}
      key={i}>
      {task.title}
      &nbsp;
      <Badge bg='dark' style={{ color: "gold" }}>
        {task.value}xp
      </Badge>
      &nbsp;
      <Badge bg={task.category === URGENT ? "danger" : "warning"}>
        {task.category === NONE ? "no category" : task.category}
      </Badge>
      &nbsp;
      {task.sharedWith && task.sharedWith.length > 1 && (
        <Badge bg='info'>
          <FiUsers />+{task.sharedWith.length - 1}
        </Badge>
      )}
    </Button>
  );
}

export default function MapTasks(props: MapTasksProps) {
  const { tasks } = props;
  return (
    <Row className='dashboard__map-tasks px-2'>
      {tasks.map(
        (task, i) =>
          task.status === COMPLETED ? (
            <TaskButton i={i} task={task} />
          ) : (
            <Link to={`/tasks?id=${task._id}`}>
              <TaskButton i={i} task={task} />
            </Link>
          )
      )}
    </Row>
  );
}
