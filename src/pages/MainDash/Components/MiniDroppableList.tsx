import { Col } from "react-bootstrap";
import { listForBeautifulDnd, taskInt } from "../../../typings/interfaces";
import { Droppable } from "react-beautiful-dnd";
import { COMPLETED } from "../../../utils/appConstants";
import MiniDraggableTask from "./MiniDraggableTask";
import MiniNonDraggableTask from "./MiniNonDraggableTask";

type MiniDroppableListProps = {
  list: listForBeautifulDnd;
  tasks: (taskInt | undefined)[];
  miniTasks: taskInt[];
  setMiniTasks: any;
};
const MiniDroppableList = (props: MiniDroppableListProps) => {
  const { list, tasks, miniTasks, setMiniTasks } = props;
  return (
    <Col sm={12} className='p-1'>
      <div
        className={
          list.title.toLowerCase() === COMPLETED
            ? "miniDnD__list completed p-2"
            : "miniDnD__list p-2"
        }
        id={list.id}>
        <div className='miniDnD__list-title'>
          {list.title.toLowerCase() !== COMPLETED
            ? list.title
            : "Completed"}
        </div>
        <Droppable droppableId={list.id}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                // isDraggingOver={snapshot.isDraggingOver}
              >
                {list.id !== COMPLETED
                  ? tasks.map((task, i) => (
                      <MiniDraggableTask key={task!._id} task={task} i={i} />
                    ))
                  : tasks.map((task, i) => (
                      <MiniNonDraggableTask
                        key={task!._id}
                        task={task}
                        i={i}
                        miniTasks={miniTasks}
                        setMiniTasks={setMiniTasks}
                      />
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

export default MiniDroppableList;
