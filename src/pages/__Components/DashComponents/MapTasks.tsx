import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt, taskInt } from "../../../typings/interfaces";
import { Button, Badge } from "react-bootstrap";
import { NONE, URGENT, COMPLETED } from "../../../utils/const/str";
import { FiFlag, FiUsers } from "react-icons/fi";
import { getShortDateAsString } from "../../../utils/funcs/f_dates";

type MapTasksProps = {
  tasks: taskInt[];
  link: string;
};

type TaskButtonProps = {
  i: number;
  task: taskInt;
  bgColor: string;
  margin?: string;
};

export function TaskButton(props: TaskButtonProps) {
  const { i, task, bgColor, margin } = props;
  return (
    <Button
      variant='link'
      className={`${margin || "m-1"} bamboo-task${
        task.status === COMPLETED ? "-completed" : ""
      }`}
      style={{ backgroundColor: `${bgColor}` }}
      key={i}>
      <span className={`bamboo-task__title ${task!.category}`}>
        {task.title}
      </span>
      &nbsp;
      <Badge bg='dark' style={{ color: "gold" }}>
        {task.value}xp
      </Badge>
      &nbsp;
      {task.category !== NONE && (
        <>
          <Badge bg='warning' className={`bg-warning ${task!.category}`}>
            {task.category === URGENT ? (
              <>
                <FiFlag />
                &nbsp;
                {task.category}
              </>
            ) : (
              task.category
            )}
          </Badge>
          &nbsp;
        </>
      )}
      {task.sharedWith && task.sharedWith.length > 1 && (
        <>
          <Badge bg='info'>
            <FiUsers />+{task.sharedWith.length - 1}
          </Badge>
          &nbsp;
        </>
      )}
      {task.deadline && (
        <Badge bg='info'>{`${getShortDateAsString(task.deadline)}`}</Badge>
      )}
    </Button>
  );
}

export default function MapTasks(props: MapTasksProps) {
  const { tasks, link } = props;
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { categories, categoriesColors } = state.currentTasks;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);
  return (
    <div className='dashboard__map-tasks pt-2'>
      {tasks.length > 0 && <hr />}
      {
        // eslint-disable-next-line array-callback-return
        tasks.map((task, i) => (
          <Link to={`${link}?id=${task._id}`} key={i}>
            <TaskButton
              i={i}
              task={task}
              bgColor={
                categoriesColors[
                  categories.findIndex((cat) => cat === task.category)
                ]
              }
            />
          </Link>
        ))
      }
      <hr />
    </div>
  );
}
