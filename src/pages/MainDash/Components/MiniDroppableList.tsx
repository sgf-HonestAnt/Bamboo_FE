import { Col } from "react-bootstrap";
import { listForBeautifulDnd, taskInt } from "../../../typings/interfaces";
import { Droppable } from "react-beautiful-dnd";
import { AWAITED, IN_PROGRESS, COMPLETED } from "../../../utils/appConstants";
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
    <Col sm={12} className='px-1 py-0'>
      <div
        className={`miniDnD__list ${
          list.title.toLowerCase() === COMPLETED
            ? COMPLETED
            : list.title.toLowerCase() === "to do"
            ? AWAITED
            : IN_PROGRESS
        }`}
        id={list.id}>
        {list.title.toLowerCase() === COMPLETED && (
          <div className='miniDnD__list-title'>Mark As Complete</div>
        )}
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
