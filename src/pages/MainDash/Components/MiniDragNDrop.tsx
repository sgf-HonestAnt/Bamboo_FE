import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { beautifulDnD, reduxStateInt } from "../../../typings/interfaces";
// import { Form } from "react-bootstrap";
// import { ICOCIRCLE, ICOCLOCK } from "../../../utils/appIcons";
import { AWAITED, COMPLETED, IN_PROGRESS } from "../../../utils/appConstants";
import { DragDropContext } from "react-beautiful-dnd";
import MiniDroppableList from "./MiniDroppableList";

type MiniDragNDropProps = {
  today: string;
  handleSubmitComplete: any;
  handleChangeCompleted: any;
};
const MiniDragNDrop = (props: MiniDragNDropProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { awaited, in_progress } = state.currentTasks;
  const allTasks = awaited.concat(in_progress);
  const taskList = allTasks.slice(0, 3);
  const [miniTasks, setMiniTasks] = useState(taskList);
  //   const { today, handleSubmitComplete, handleChangeCompleted } = props;
  const [initialData, setInitialData] = useState<beautifulDnD>({
    tasks: [],
    lists: [],
    listOrder: [],
  });
  useEffect(() => {
    setInitialData({
      tasks: miniTasks, //[{}]
      lists: [
        {
          id: AWAITED,
          title: "To do",
          taskIds: miniTasks
            .filter((t) => t.status === AWAITED)
            .map((t) => t._id),
        },
        {
          id: IN_PROGRESS,
          title: "In Progress",
          taskIds: miniTasks
            .filter((t) => t.status === IN_PROGRESS)
            .map((t) => t._id),
        },
        {
          id: COMPLETED,
          title: "Completed",
          taskIds: miniTasks
            .filter((t) => t.status === COMPLETED)
            .map((t) => t._id),
        },
      ],
      listOrder: [COMPLETED, AWAITED, IN_PROGRESS],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [miniTasks]);
  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start = initialData.lists.find((l) => l.id === source.droppableId);
    const finish = initialData.lists.find(
      (l) => l.id === destination.droppableId
    );
    const startIndex = initialData.lists.findIndex((l) => l === start);
    const finishIndex = initialData.lists.findIndex((l) => l === finish);
    if (start === finish) {
      const startTaskIds = Array.from(start!.taskIds);
      startTaskIds.splice(source.index, 1); // remove task id from array by index
      startTaskIds.splice(destination.index, 0, draggableId); // add task id into new index of same array
      const newStart = {
        ...start!,
        taskIds: startTaskIds!,
      };
      initialData.lists.splice(startIndex, 1, newStart);
      const newData = {
        ...initialData,
        lists: [...initialData.lists],
      };
      setInitialData(newData);
    } else {
      const startTaskIds = Array.from(start!.taskIds);
      startTaskIds.splice(source.index, 1); // remove task id from array by index
      const newStart = {
        ...start!,
        taskIds: startTaskIds!,
      };
      const finishTaskIds = Array.from(finish!.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish!,
        taskIds: finishTaskIds!,
      };
      initialData.lists.splice(startIndex, 1, newStart);
      initialData.lists.splice(finishIndex, 1, newFinish);
      const newData = {
        ...initialData,
        lists: [...initialData.lists],
      };
      setInitialData(newData);
      //   await updateTaskStatus(
      //     draggableId.split("/")[0],
      //     source.droppableId,
      //     destination.droppableId,
      //     finish!.id
      //   );
    }
  };
  return (
    <>
      {/* <Form onSubmit={handleSubmitComplete}>
        {allTasks.slice(0, 3).map((t, i) => {
          const clock = t.deadline?.includes(today) ? (
            <ICOCLOCK className='icon-urgent' />
          ) : t.deadline ? (
            <ICOCLOCK className='icon-semi-urgent' />
          ) : (
            <ICOCIRCLE />
          );
          return (
            <Form.Group key={i} controlId={t._id}>
              <div className='mb-0'>
                <Form.Check
                  inline
                  label={t.title}
                  name='today'
                  type='checkbox'
                  value={t._id}
                  onChange={handleChangeCompleted}
                />
                {clock}
              </div>
            </Form.Group> 
          );
        })}
        <div>{allTasks.length > 3 ? `+ ${allTasks.length - 3} more` : ""}</div>
      </Form> */}
      <DragDropContext
        // onDragStart
        // onDragUpdate
        onDragEnd={onDragEnd}>
        {initialData?.listOrder.map((listId, i) => {
          const list = initialData.lists.find((l) => l.id === listId);
          const tasks = list!.taskIds.map((taskId) =>
            initialData.tasks!.find((t) => t!._id === taskId.slice(0, 24))
          );
          return (
            <>
              <MiniDroppableList
                key={listId!}
                list={list!}
                tasks={tasks!}
                miniTasks={miniTasks}
                setMiniTasks={setMiniTasks}
                // initialData={initialData}
                // setInitialData={setInitialData}
              />
              <div>
                {allTasks.length > 3 ? `+ ${allTasks.length - 3} more` : ""}
              </div>
            </>
          );
        })}
      </DragDropContext>
    </>
  );
};

export default MiniDragNDrop;
