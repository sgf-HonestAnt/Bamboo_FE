import {
  beautifulDnD,
  reduxStateInt,
  taskInt,
} from "../../../typings/interfaces";
import { History, Location } from "history";
import {
  Draggable,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import {
  FINANCE,
  FITNESS,
  SOLO,
  URGENT,
  WORK,
} from "../../../utils/appConstants";
import {
  ICOCLOCK,
  ICOFINANCE,
  ICOFIT,
  ICOURGENT,
  ICOUSERS,
  ICOWORK,
} from "../../../utils/appIcons";
import { useEffect, useState } from "react";
import AddEditTaskModal from "../../../pages__SharedComponents/AddEditTaskModal";
import { useAppSelector } from "../../../redux/hooks";
import {
  checkTaskOverdue,
  getSelectedDateAsString,
  getShortDateAsString,
} from "../../../utils/f_dates";

type DraggableTaskProps = {
  task: taskInt;
  i: number;
  initialData: beautifulDnD;
  setInitialData: any;
  history: History<unknown> | string[];
  location: Location<unknown>;
};
type HandleProps = {
  dragHandleProps?: DraggableProvidedDragHandleProps | undefined;
};
const Handle = (props: HandleProps) => {
  const { dragHandleProps } = props;
  return (
    <div
      {...dragHandleProps}
      className='tasks-page__list-task__drag-handle mr-2'></div>
  );
};
const DraggableTask = (props: DraggableTaskProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { my_user, followedUsers } = state.currentUser;
  const categories = state.currentTasks.categories;
  const { task, i, initialData, setInitialData, history, location } = props;
  const [taskIsOverdue, setTaskIsOverdue] = useState(false);
  const [view, setView] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const checkIfTaskIsOverdue = async () => {
    const today = getSelectedDateAsString(new Date());
    const boolean = task.deadline
      ? await checkTaskOverdue(today, task.deadline.slice(0, 10))
      : false;
    setTaskIsOverdue(boolean);
  };
  const locationSearch = location.search.split("=")[1];
  useEffect(() => {
    checkIfTaskIsOverdue();
    if (locationSearch !== task!._id) {
      setShow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);
  useEffect(() => {
    if (location.search) {
      if (locationSearch === task!._id) {
        setShow(true);
        setView(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  return (
    <Draggable draggableId={`${task!._id}/${task!.value}`} index={i}>
      {(provided, snapshot) => {
        const taskClass = `tasks-page__list-task ${task!.status}`;
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
            ""
          );
        return (
          <div
            {...provided.draggableProps}
            // {...provided.dragHandleProps} // move to seperate element if we want to drag by specific handle!
            ref={provided.innerRef}
            // isDragging={snapshot.isDragging}
            className={taskClass}
            // className={snapshot.isDragging?'tasks-page__list-task':'tasks-page__list-task__dragging'}
            key={i}>
            <Handle dragHandleProps={provided.dragHandleProps} />
            <div>
              <div>
                <span
                  onClick={handleShow}
                  className={`tasks-page__list-task__title ${task!.category}`}>
                  {taskIsOverdue && (
                    <span style={{ color: "red" }}>
                      <ICOCLOCK />
                    </span>
                  )}
                  {icon} {task!.title} ({task!.value}XP)
                </span>
                {/* <OpenTaskButton
                  label={`${task!.title} (${task!.value}XP)`}
                  handleClick={handleShow}
                /> */}
              </div>
              <div>
                <span onClick={handleShow}>
                  {task!.desc}{" "}
                  {task!.type === SOLO || task!.sharedWith!.length < 2 ? (
                    ""
                  ) : (
                    <ICOUSERS />
                  )}
                  {task!.sharedWith!.length > 1 && task!.sharedWith!.length}
                </span>
                {task!.deadline && (
                  <span>
                    {`${
                      task!.desc.length > 1 || task!.sharedWith!.length > 1
                        ? "|"
                        : ""
                    } ${getShortDateAsString(task.deadline)}`}{" "}
                    {task.deadline.slice(0, 4)}
                  </span>
                )}
              </div>
              <AddEditTaskModal
                view={view}
                setView={setView}
                show={show}
                handleClose={handleClose}
                user={my_user}
                followedUsers={followedUsers}
                categories={categories}
                history={history}
                location={location}
                initialData={initialData}
                setInitialData={setInitialData}
                taskSet={task}
              />
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default DraggableTask;
