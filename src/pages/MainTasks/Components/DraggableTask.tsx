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
  ICOFINANCE,
  ICOFIT,
  ICOSTAR,
  ICOURGENT,
  ICOUSERS,
  ICOWORK,
} from "../../../utils/appIcons";
import { useState } from "react";
import AddEditTaskModal from "../../../pages__SharedComponents/AddEditTaskModal";
import { useAppSelector } from "../../../redux/hooks";

type DraggableTaskProps = {
  task: taskInt | undefined;
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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
            <ICOSTAR />
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
                  {icon} {task!.title} ({task!.value}XP)
                </span>
                {/* <OpenTaskButton
                  label={`${task!.title} (${task!.value}XP)`}
                  handleClick={handleShow}
                /> */}
              </div>
              <div>
                <span onClick={handleShow}>
                  {task!.desc} {task!.type === SOLO ? "" : <ICOUSERS />}
                  {task!.type !== SOLO && ` ${task!.sharedWith!.length}`}
                </span>
              </div>
              <AddEditTaskModal
                show={show}
                handleClose={handleClose}
                user={my_user}
                followedUsers={followedUsers}
                categories={categories}
                history={history}
                location={location}
                initialData={initialData}
                setInitialData={setInitialData}
                taskSet={task ? task : null}
              />
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default DraggableTask;
