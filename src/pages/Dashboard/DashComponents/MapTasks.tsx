import { Badge, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { taskInt } from "../../../typings/interfaces";
import { NONE, URGENT } from "../../../utils/appConstants";
import { FiUsers } from "react-icons/fi";

type MapTasksProps = {
  tasks: taskInt[];
};

export default function MapTasks(props: MapTasksProps) {
  const { tasks } = props;
  return (
    <Row className="px-2">
      {tasks.map((task, i) => (
        <div className='m-1 p-1 dashboard__tasks-card__task-box' key={i}>
          <Link to={`/tasks?id=${task._id}`}>
            {task.title}
            {/* {task.desc !== " " && `:${task.desc}`} */}
          </Link>
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
        </div>
      ))}
    </Row>
  );
}
