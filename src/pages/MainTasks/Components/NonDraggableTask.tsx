import { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { useDispatch } from "react-redux";
import { reduxStateInt, taskInt } from "../../../typings/interfaces";
import {
  AcceptButton,
  DeleteTaskButton,
  RejectButton,
} from "../../../pages__SharedComponents/Buttons";
import { FINANCE, FITNESS, URGENT, WORK } from "../../../utils/appConstants";
import {
  ICOFINANCE,
  ICOFIT,
  ICOSTAR,
  ICOURGENT,
  ICOWORK,
} from "../../../utils/appIcons";
import {
  attemptDeleteTask,
  moveTaskBetweenStatus,
} from "../../../utils/f_tasks";
import { RemTaskFromCompleted } from "../../../redux/actions/tasks";
import { addIDToTasksToHide } from "../../../utils/f_users";

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
  const icon =
    task!.category === URGENT ? (
      <ICOURGENT />
    ) : task!.category === WORK ? (
      <ICOWORK />
    ) : task!.category === FINANCE ? (
      <ICOFINANCE />
    ) : task!.category === FITNESS ? (
      <ICOFIT />
    ) : (
      <ICOSTAR />
    );
  return (
    <div className={taskClass} key={i}>
      <div>
        <div>
          {icon}
          <span className='pl-1'>
            {task!.title} ({task!.value}XP){" "}
            {!showDeleteMessage && (
              <DeleteTaskButton handleClick={handleClick} />
            )}
          </span>
          {showDeleteMessage && (
            <div>
              This task will no longer be viewable, although your 'completed'
              total will not change. <br />
              Continue? <br />
              <AcceptButton handleClick={handleDelete} />
              <RejectButton handleClick={undoDelete} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NonDraggableTask;
