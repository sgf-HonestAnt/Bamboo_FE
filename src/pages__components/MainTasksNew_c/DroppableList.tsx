import { Col } from "react-bootstrap";
import { listForBeautifulDnd, taskInt } from "../../typings/interfaces";
import { Droppable } from "react-beautiful-dnd";
import DraggableTask from "./DraggableTask";
import { AWAITED, COMPLETED, IN_PROGRESS } from "../../utils/appConstants";

type DroppableListProps = {
  list: listForBeautifulDnd;
  tasks: (taskInt | undefined)[];
};
const DroppableList = (props: DroppableListProps) => {
  const { list, tasks } = props;
  return (
    <Col sm={12} md={6} lg={4} className='p-1'>
      <div className='tasks-page__list p-2' id={list.id}>
        <div className='tasks-page__list-title'>{list.title}</div>
        <Droppable droppableId={list.id}>
          {(provided, snapshot) => {
            // console.log(snapshot)
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                // isDraggingOver={snapshot.isDraggingOver}
              >
                {list.id !== COMPLETED &&
                  tasks.map((task, i) => (
                    <DraggableTask key={task!._id} task={task} i={i} />
                  ))}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    </Col>
  );
};

export default DroppableList;
