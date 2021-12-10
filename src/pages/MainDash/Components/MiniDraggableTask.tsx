import { taskInt } from "../../../typings/interfaces";
import {
  Draggable,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import {
  FINANCE,
  FITNESS,
  HOUSEHOLD,
  NONE,
  PETS,
  RELATIONSHIPS,
  SHOPPING,
  URGENT,
  WELLBEING,
  WORK,
} from "../../../utils/appConstants";
import {
  ICOEMPTY,
  ICOFINANCE,
  ICOFIT,
  ICOHOUSE,
  ICOPETS,
  ICORELATE,
  ICOSHOP,
  ICOSTAR,
  ICOURGENT,
  ICOWELLNESS,
  ICOWORK,
} from "../../../utils/appIcons";

type MiniDraggableTaskProps = {
  task: taskInt | undefined;
  i: number;
};
type HandleProps = {
  dragHandleProps?: DraggableProvidedDragHandleProps | undefined;
};
const Handle = (props: HandleProps) => {
  const { dragHandleProps } = props;
  return (
    <div
      {...dragHandleProps}
      className='miniDnD__list-task__drag-handle mr-2'></div>
  );
};
const MiniDraggableTask = (props: MiniDraggableTaskProps) => {
  const { task, i } = props;
  return (
    <Draggable draggableId={`${task!._id}/${task!.value}`} index={i}>
      {(provided, snapshot) => {
        const taskClass =
          task!.category === URGENT
            ? "miniDnD__list-task urgent"
            : "miniDnD__list-task";
        const icon =
          task!.category === URGENT ? (
            <ICOURGENT />
          ) : task!.category === HOUSEHOLD ? (
            <ICOHOUSE />
          ) : task!.category === SHOPPING ? (
            <ICOSHOP />
          ) : task!.category === WORK ? (
            <ICOWORK />
          ) : task!.category === RELATIONSHIPS ? (
            <ICORELATE />
          ) : task!.category === FINANCE ? (
            <ICOFINANCE />
          ) : task!.category === FITNESS ? (
            <ICOFIT />
          ) : task!.category === PETS ? (
            <ICOPETS />
          ) : task!.category === WELLBEING ? (
            <ICOWELLNESS />
          ) : task!.category === NONE ? (
            <ICOEMPTY />
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
            // className={snapshot.isDragging?'miniDnD__list-task':'miniDnD__list-task__dragging'}
            key={i}>
            <Handle dragHandleProps={provided.dragHandleProps} />
            <div>
              <div>
                {icon}
                <span className='pl-1'>
                  {task!.title} ({task!.value}XP)
                </span> 
              </div>
              <div>
                {task!.desc}{" "}
                {task!.sharedWith &&
                  task!.sharedWith.length > 1 &&
                  `Shared with ${task!.sharedWith.length - 1} other user${
                    task!.sharedWith.length - 1 > 1 ? "s" : ""
                  }`}
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default MiniDraggableTask;
