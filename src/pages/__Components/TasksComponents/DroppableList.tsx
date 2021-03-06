import { History, Location } from "history";
import { Col } from "react-bootstrap";
import {
  beautifulDnD,
  listForBeautifulDnd,
  taskInt,
} from "../../../typings/interfaces";
import { Droppable } from "react-beautiful-dnd";
import DraggableTask from "./DraggableTask";
import { COMPLETED } from "../../../utils/const/str";
import NonDraggableTask from "./NonDraggableTask";

type DroppableListProps = {
  list: listForBeautifulDnd;
  tasks: taskInt[] | any;
  taskList: taskInt[];
  setTaskList: any;
  initialData: beautifulDnD;
  setInitialData: any;
  history: History<unknown> | string[];
  location: Location<unknown>;
};
const DroppableList = (props: DroppableListProps) => {
  const {
    list,
    tasks,
    taskList,
    setTaskList,
    initialData,
    setInitialData,
    history,
    location,
  } = props;
  return (
    list &&
    tasks && (
      <Col sm={12} md={6} lg={4} className='p-1'>
        {" "}
        <div className='tasks-page__list p-2' id={list.id}>
          <div className='tasks-page__list-title'>{list.title}</div>
          <Droppable droppableId={list.id}>
            {(provided, snapshot) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  data-is-dragging={snapshot.isDraggingOver}>
                  <div className='dnd-placeholder'>
                    {provided.placeholder}
                    :)
                  </div>
                  {list.id !== COMPLETED && tasks.length > 0 ? (
                    tasks.map((task: taskInt, i: number) => (
                      <DraggableTask
                        key={i}
                        task={task}
                        i={i}
                        initialData={initialData}
                        setInitialData={setInitialData}
                        history={history}
                        location={location}
                      />
                    ))
                  ) : tasks.length > 0 ? (
                    tasks.map((task: taskInt, i: number) => (
                      <NonDraggableTask
                        key={i}
                        task={task}
                        i={i}
                        taskList={taskList}
                        setTaskList={setTaskList}
                      />
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              );
            }}
          </Droppable>
        </div>
      </Col>
    )
  );
};

export default DroppableList;
