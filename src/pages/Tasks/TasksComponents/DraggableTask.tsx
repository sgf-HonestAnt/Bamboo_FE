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
import { NONE, SOLO, URGENT } from "../../../utils/constants/str";
import { ICOCLOCK, ICOUSERS } from "../../../utils/appIcons";
import { useEffect, useState } from "react";
import AddEditTaskModal from "../../__Components/AddEditTaskModal";
import { useAppSelector } from "../../../redux/hooks";
import {
  checkTaskOverdue,
  getSelectedDateAsString,
  getShortDateAsString,
} from "../../../utils/f_dates";
import { Badge, Button } from "react-bootstrap";
import { createColorArray } from "../../../utils/funcs/f_styling";
import { FiFlag, FiUsers } from "react-icons/fi";

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
  const { customColors } = state.currentSettings;
  const categories = state.currentTasks.categories;
  const { task, i, initialData, setInitialData, history, location } = props;
  const [categoryColors, setCategoryColors] = useState<string | any[]>([]);
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
  useEffect(() => {
    createColorArray(customColors, categories, setCategoryColors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Draggable draggableId={`${task!._id}/${task!.value}`} index={i}>
      {(provided, snapshot) => {
        const taskClass = `tasks-page__list-task ${task!.status}`;
        return (
          <div
            {...provided.draggableProps}
            // {...provided.dragHandleProps} // move to seperate element if we want to drag by specific handle!
            ref={provided.innerRef}
            // isDragging={snapshot.isDragging}
            className={taskClass}
            key={i}>
            <Button
              variant='link'
              className='m-1 color-task-btn'
              style={{
                backgroundColor: `${
                  categoryColors[
                    categories.findIndex((cat) => cat === task!.category)
                  ]
                }`,
              }}>
              <div>
                <span
                  onClick={handleShow}
                  className={`color-task-btn__title ${task!.category}`}>
                  {task!.title} &nbsp;
                  <Badge bg='dark' style={{ color: "gold" }}>
                    {task!.value}xp
                  </Badge>
                  &nbsp;
                  <Badge
                    bg='warning'
                    className={`bg-warning ${task!.category}`}>
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
                  {taskIsOverdue && (
                    <span style={{ color: "red" }}>
                      <ICOCLOCK />
                    </span>
                  )}
                </span>
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
            </Button>
            <Handle dragHandleProps={provided.dragHandleProps} />
          </div>
        );
      }}
    </Draggable>
  );
};

export default DraggableTask;
