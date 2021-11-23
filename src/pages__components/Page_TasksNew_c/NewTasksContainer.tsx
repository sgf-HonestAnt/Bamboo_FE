import { Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { beautifulDnD, taskInt } from "../../typings/interfaces";
import { DragDropContext } from "react-beautiful-dnd";
import { AWAITED, COMPLETED, IN_PROGRESS } from "../../utils/appConstants";
import DroppableList from "./DroppableList";

type NewTasksContainerProps = {
  taskList: taskInt[];
};

const NewTasksContainer = (props: NewTasksContainerProps) => {
  const { taskList } = props;
  const [initialData, setInitialData] = useState<beautifulDnD>({
    tasks: [],
    lists: [],
    listOrder: [],
  });
  useEffect(() => {
    setInitialData({
      tasks: taskList, //[{}]
      lists: [
        {
          id: AWAITED,
          title: "To do",
          taskIds: taskList
            .filter((t) => t.status === AWAITED)
            .map((t) => t._id),
        },
        {
          id: IN_PROGRESS,
          title: "In Progress",
          taskIds: taskList
            .filter((t) => t.status === IN_PROGRESS)
            .map((t) => t._id),
        },
        {
          id: COMPLETED,
          title: "Completed",
          taskIds: taskList
            .filter((t) => t.status === COMPLETED)
            .map((t) => t._id),
        },
      ],
      listOrder: [AWAITED, IN_PROGRESS, COMPLETED],
    });
  }, [taskList]);
  console.log("initial=>", initialData);
  useEffect(() => {
    console.log("CHANGED!");
  }, [initialData]);
  return (
    <Row className='tasks-page'>
      {initialData?.listOrder.map((listId, i) => {
        const list = initialData.lists.find((l) => l.id === listId);
        const tasks = list!.taskIds.map((taskId) =>
          initialData.tasks!.find((t) => t!._id === taskId)
        );
        const onDragEnd = (result: any) => {
          const { destination, source, draggableId } = result;
          console.log("destination=>", destination);
          console.log("source=>", source);
          console.log("draggableId=>", draggableId);

          if (!destination) {
            console.log("NO DEST");
            return;
          }

          if (
            destination.droppableId === source.droppableId &&
            destination.index == source.index
          ) {
            console.log("SOURCE SAME");
            return;
          }

          const list = initialData.lists.find(
            (l) => l.id === source.droppableId
          );
          console.log("list=>", list);
          console.log("task index=>", source.index);

          const newTaskIds = Array.from(list!.taskIds);
          newTaskIds.splice(source.index, 1);
          newTaskIds.splice(destination.index, 0, draggableId);

          const newList = {
            ...list!,
            taskIds: newTaskIds!,
          };
          console.log("newList=>", newList, "isNotSame", newList !== list);

          const newLists = initialData.lists.splice(i, 1, newList);
          console.log("newLists=>", newLists);

          const newData = {
            ...initialData,
            lists: [...initialData.lists],
          };
          console.log("newData=>", newData);
          console.log("newDataIsSame", newData === initialData);

          setInitialData(newData);
        };
        return (
          <DragDropContext
            key={i}
            // onDragStart
            // onDragUpdate
            onDragEnd={onDragEnd}>
            <DroppableList key={listId!} list={list!} tasks={tasks!} />
          </DragDropContext>
        );
      })}
    </Row>
  );
};

export default NewTasksContainer;
