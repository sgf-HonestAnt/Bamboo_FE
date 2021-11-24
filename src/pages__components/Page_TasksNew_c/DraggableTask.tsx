import { taskInt } from "../../typings/interfaces";
import {
  Draggable,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";

type DraggableTaskProps = {
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
      className='tasks-page__list-task__drag-handle mr-2'></div>
  );
};
const DraggableTask = (props: DraggableTaskProps) => {
  const { task, i } = props;
  return (
    <Draggable draggableId={task!._id} index={i}>
      {(provided, snapshot) => {
        // console.log(snapshot);
        return (
          <div
            {...provided.draggableProps}
            // {...provided.dragHandleProps} // move to seperate element if we want to drag by specific handle!
            ref={provided.innerRef}
            // isDragging={snapshot.isDragging}
            className='tasks-page__list-task'
            // className={snapshot.isDragging?'tasks-page__list-task':'tasks-page__list-task__dragging'}
            key={i}>
            <Handle dragHandleProps={provided.dragHandleProps} />
            <span>{task!.title}</span>
          </div>
        );
      }}
    </Draggable>
  );
};

export default DraggableTask;
