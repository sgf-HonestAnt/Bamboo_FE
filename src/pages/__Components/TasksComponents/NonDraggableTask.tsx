import { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { useDispatch } from "react-redux";
import { reduxStateInt, taskInt } from "../../../typings/interfaces";
import { AcceptButton, DeleteTaskBadge, RejectButton } from "../Buttons";
import { NONE, URGENT } from "../../../utils/const/str";
import { moveTaskBetweenStatus } from "../../../utils/funcs/f_tasks";
import { RemTaskFromCompleted } from "../../../redux/actions/tasks";
import { addIDToTasksToHide } from "../../../utils/funcs/f_users";
import { Badge, Button } from "react-bootstrap";
import { FiFlag, FiUsers } from "react-icons/fi";

type NonDraggableTaskProps = {
  task: taskInt | undefined;
  i: number;
  taskList: taskInt[];
  setTaskList: any;
  // initialData: beautifulDnD;
  // setInitialData: any;
};
const NonDraggableTask = (props: NonDraggableTaskProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const dispatch = useDispatch();
  const { tasks_to_hide, username, email } = state.currentUser.my_user;
  const tasks = state.currentTasks;
  const { completed } = tasks;
  const { task, i, taskList, setTaskList } = props;
  const taskClass = "tasks-page__list-task completed";
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const handleClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setShowDeleteMessage(true);
  };
  const handleDelete = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await addIDToTasksToHide(tasks_to_hide, task!._id, username, email);
    const newCompleted = completed.filter((t) => t._id !== task!._id);
    dispatch(RemTaskFromCompleted(newCompleted)); // remove task from tasklist
    if (task) {
      await moveTaskBetweenStatus(
        "completed",
        null,
        task,
        tasks,
        // initialData,
        // setInitialData,
        dispatch
      );
      const newTaskList = taskList.filter((t) => t._id !== task._id);
      setTaskList(newTaskList);
      setShowDeleteMessage(false);
      // remove task from initialData
    }
  };
  const undoDelete = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setShowDeleteMessage(false);
  };
  return (
    <div className={taskClass} key={i}>
      <Button
        variant='link'
        className='m-1 bamboo-task-completed'
        id='completed'>
        <div>
          <span className={`bamboo-task__title ${task!.category}`}>
            {task!.title}&nbsp;
            {!showDeleteMessage && (
              <DeleteTaskBadge handleClick={handleClick} />
            )}
            &nbsp;
            <Badge bg='light'>{task!.value}xp</Badge>
            &nbsp;
            <Badge bg='light'>
              {task!.category === NONE ? (
                "no category"
              ) : task!.category === URGENT ? (
                <>
                  <FiFlag />
                  &nbsp;
                  {task!.category}
                </>
              ) : (
                task!.category
              )}
            </Badge>
            &nbsp;
            {task!.sharedWith && task!.sharedWith.length > 1 && (
              <Badge bg='info'>
                <FiUsers />+{task!.sharedWith.length - 1}
              </Badge>
            )}
          </span>
        </div>
        <div>{task!.desc}</div>
      </Button>
      {showDeleteMessage && (
        <div>
          This task will no longer be viewable, although your 'completed' total
          will not change. <br />
          Continue? <br />
          <AcceptButton handleClick={handleDelete} />
          <RejectButton handleClick={undoDelete} />
        </div>
      )}
    </div>
  );
};

export default NonDraggableTask;
