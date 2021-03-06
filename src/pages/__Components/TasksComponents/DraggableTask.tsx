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
import { NONE, URGENT } from "../../../utils/const/str";
import { useEffect, useState } from "react";
import AddEditTaskModal from "../AddEditTaskModal";
import { useAppSelector } from "../../../redux/hooks";
import {
  checkTaskOverdue,
  getSelectedDateAsString,
  getShortDateAsString,
} from "../../../utils/funcs/f_dates";
import { Badge, Button } from "react-bootstrap";
import { FiClock, FiFlag, FiUsers } from "react-icons/fi";
import { MdDragIndicator } from "react-icons/md";

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
      className='tasks-page__list-task__drag-handle mr-2'>
      <MdDragIndicator />
      <MdDragIndicator />
    </div>
  );
};
const DraggableTask = (props: DraggableTaskProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { my_user, followedUsers } = state.currentUser;
  const { categories, categoriesColors } = state.currentTasks;
  const { task, i, initialData, setInitialData, history, location } = props;
  const [taskIsOverdue, setTaskIsOverdue] = useState(false);
  const [view, setView] = useState(true);
  const [show, setShow] = useState(false);
  const isFromDash = location.pathname === "/dash-tasks";
  const handleClose = () => {
    setShow(false);
    isFromDash && history.push("/dash");
  };
  const handleShow = () => {
    setShow(true);
  };
  const checkIfTaskIsOverdue = async () => {
    const today = await getSelectedDateAsString(new Date());
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
  }, [initialData, setInitialData]);
  useEffect(() => {
    const { search } = location;
    if (search.includes(task!._id)) {
      setShow(true);
      setView(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  return (
    task && (
      <Draggable draggableId={`${task._id}/${task.value}`} index={i}>
        {(provided, snapshot) => {
          const taskClass = `tasks-page__list-task ${task.status}`;
          return (
            <div
              {...provided.draggableProps}
              // move to seperate element if we want to drag by specific handle!
              ref={provided.innerRef}
              // isDragging={snapshot.isDragging}
              className={taskClass}
              key={i}>
              <Button
                variant='link'
                className='m-1 bamboo-task'
                style={{
                  backgroundColor: `${
                    categoriesColors[
                      categories.findIndex((cat) => cat === task.category)
                    ]
                  }`,
                }}>
                <div>
                  <span
                    onClick={handleShow}
                    className={`bamboo-task__title ${task.category}`}
                    id={task._id}>
                    {task.title} &nbsp;
                    <Badge bg='dark' style={{ color: "gold" }}>
                      {task.value}xp
                    </Badge>
                    &nbsp;
                    {task.category !== NONE && (
                      <>
                        <Badge
                          bg='warning'
                          className={`bg-warning ${task.category}`}>
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
                      <Badge bg='info'>
                        <FiUsers />+{task.sharedWith.length - 1}
                      </Badge>
                    )}
                    {task.deadline && (
                      <Badge bg='info'>
                        {`${getShortDateAsString(task.deadline)}`}{" "}
                        {task.deadline.slice(0, 4)}
                      </Badge>
                    )}
                    {taskIsOverdue && (
                      <span style={{ color: "red" }} className='pl-1'>
                        <FiClock />
                      </span>
                    )}
                  </span>
                </div>
                <div>
                  <span onClick={handleShow}>{task.desc} </span>
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
              </Button>
              <Handle dragHandleProps={provided.dragHandleProps} />
            </div>
          );
        }}
      </Draggable>
    )
  );
};

export default DraggableTask;
