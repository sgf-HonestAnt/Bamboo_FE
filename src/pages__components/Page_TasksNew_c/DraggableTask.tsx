import { taskInt } from "../../typings/interfaces";
import { Draggable } from "react-beautiful-dnd";

type DraggableTaskProps = {
  task: taskInt|undefined;
  i: number;
};

const DraggableTask = (props: DraggableTaskProps) => {
  const { task, i } = props;
  return (
    <Draggable draggableId={task!._id} index={i}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps} // move to seperate element if we want to drag by specific handle!
          ref={provided.innerRef}
          className='tasks-page__list-task'
          key={i}>
          {task!.title}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableTask;
