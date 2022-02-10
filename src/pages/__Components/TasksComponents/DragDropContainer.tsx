import { History, Location } from "history";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { DragDropContext } from "react-beautiful-dnd";
import {
  beautifulDnD,
  reduxStateInt,
  taskInt,
} from "../../../typings/interfaces";
import { Row } from "react-bootstrap";
import {
  attemptUpdateTask,
  moveTaskBetweenStatus,
} from "../../../utils/funcs/f_tasks";
import DroppableList from "./DroppableList";

type DragDropContainerProps = {
  taskList: taskInt[];
  setTaskList: any;
  initialData: beautifulDnD;
  setInitialData: any;
  history: History<unknown> | string[];
  location: Location<unknown>;
};
const DragDropContainer = (props: DragDropContainerProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { my_user } = state.currentUser;
  const achievements = state.currentAchievements;
  const currentTasks = state.currentTasks;
  const {
    taskList,
    setTaskList,
    initialData,
    setInitialData,
    history,
    location,
  } = props;
  const dispatch = useDispatch();
  const updateTaskStatus = async (
    draggableId: string,
    sourceStatus: string,
    destinationStatus: string,
    status: string
  ) => {
    await attemptUpdateTask(
      draggableId,
      { status },
      my_user,
      dispatch,
      achievements.list,
      initialData,
      setInitialData
    );
    const taskToMove = taskList.find((t) => t._id === draggableId);
    if (taskToMove) {
      moveTaskBetweenStatus(
        sourceStatus,
        destinationStatus,
        taskToMove,
        currentTasks,
        // initialData,
        // setInitialData,
        dispatch
      );
    }
  };
  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;
    // if task moves outside droppable space
    if (!destination) {
      return;
    }
    // if task moves to same place as it started
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // locate start and finish task lists
    const start = initialData.lists.find((l) => l.id === source.droppableId);
    const finish = initialData.lists.find(
      (l) => l.id === destination.droppableId
    );
    // find index of the start list
    const startIndex = initialData.lists.findIndex((l) => l === start);
    // find index of the finish list
    const finishIndex = initialData.lists.findIndex((l) => l === finish);
    if (start === finish) {
      // if task moved to same list
      const startTaskIds = Array.from(start!.taskIds);
      startTaskIds.splice(source.index, 1); // remove task id from array by index
      startTaskIds.splice(destination.index, 0, draggableId); // add task id into new index of same array
      // rewrite the list
      const newStart = {
        ...start!,
        taskIds: startTaskIds!,
      };
      // replace it inside initialData
      initialData.lists.splice(startIndex, 1, newStart);
      // clone initial data
      const newData = {
        ...initialData,
        lists: [...initialData.lists],
      };
      // set initial data to match clone
      setInitialData(newData);
      // update Task Order in our strings?
    } else {
      // if task moved to different list
      const startTaskIds = Array.from(start!.taskIds);
      startTaskIds.splice(source.index, 1); // remove task id from array by index
      // rewrite the start list
      const newStart = {
        ...start!,
        taskIds: startTaskIds!,
      };
      const finishTaskIds = Array.from(finish!.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId); // add task id into new index of different array
      // rewrite the finish list
      const newFinish = {
        ...finish!,
        taskIds: finishTaskIds!,
      };
      // replace lists inside initialData
      initialData.lists.splice(startIndex, 1, newStart);
      initialData.lists.splice(finishIndex, 1, newFinish);
      // clone initial data
      const newData = {
        ...initialData,
        lists: [...initialData.lists],
      };
      // set initial data to match clone
      setInitialData(newData);
      await updateTaskStatus(
        draggableId.split("/")[0],
        source.droppableId,
        destination.droppableId,
        finish!.id
      );
    }
  };
  useEffect(() => {}, [initialData]);
  return (
    <Row className='tasks-page px-1'>
      <DragDropContext
        // onDragStart
        // onDragUpdate
        onDragEnd={onDragEnd}>
        {initialData.listOrder.map((listId, i) => {
          const list = initialData.lists.find((l) => l.id === listId);
          const tasks = list?.taskIds.map((taskId) =>
            initialData.tasks!.find((t) => t!._id === taskId.slice(0, 24))
          );
          return (
            list &&
            tasks && (
              <DroppableList
                key={listId}
                list={list}
                tasks={tasks}
                taskList={taskList}
                setTaskList={setTaskList}
                initialData={initialData}
                setInitialData={setInitialData}
                history={history}
                location={location}
              />
            )
          );
        })}
      </DragDropContext>
    </Row>
  );
};

export default DragDropContainer;
