import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt, taskInt } from "../../../typings/interfaces";
import { Row, Button, Badge } from "react-bootstrap";
import { NONE, URGENT, COMPLETED } from "../../../utils/const/str";
import { FiFlag, FiUsers } from "react-icons/fi";
import { createColorArray } from "../../../utils/funcs/f_styling";

type MapTasksProps = {
  tasks: taskInt[];
};

type TaskButtonProps = {
  i: number;
  task: taskInt;
  bgColor: string;
};

export function TaskButton(props: TaskButtonProps) {
  const { i, task, bgColor } = props;
  return (
    <Button
      variant='link'
      className={`m-1 bamboo-task${
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
      <Badge bg="warning" className={`bg-warning ${task!.category}`}>
        {task.category === NONE ? (
          "no category"
        ) : task.category === URGENT ? (
          <>
            <FiFlag />&nbsp;
            {task.category}
          </>
        ) : (
          task.category
        )}
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
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { categories } = state.currentTasks;
  const { customColors } = state.currentSettings;
  const [categoryColors, setCategoryColors] = useState<string | any[]>([]);
  useEffect(() => {
    createColorArray(customColors, categories, setCategoryColors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Row className='dashboard__map-tasks px-2'>
      {tasks.map((task, i) =>
        task.status === COMPLETED ? (
          <TaskButton
            key={task._id}
            i={i}
            task={task}
            bgColor={
              categoryColors[
                categories.findIndex((cat) => cat === task.category)
              ]
            }
          />
        ) : (
          <Link to={`/tasks?id=${task._id}`}>
            <TaskButton
              key={task._id}
              i={i}
              task={task}
              bgColor={
                categoryColors[
                  categories.findIndex((cat) => cat === task.category)
                ]
              }
            />
          </Link>
        )
      )}
    </Row>
  );
}
