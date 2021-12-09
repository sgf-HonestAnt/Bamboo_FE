import { History } from "history";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { setUserPoints, setUserTotalPoints } from "../../../redux/actions/user";
import { DragDropContext } from "react-beautiful-dnd";
import {
  beautifulDnD,
  reduxStateInt,
  taskInt,
} from "../../../typings/interfaces";
import { Row } from "react-bootstrap";
import { AWAITED, COMPLETED, IN_PROGRESS } from "../../../utils/appConstants";
import {
  attemptUpdateTask,
  moveTaskBetweenStatus,
} from "../../../utils/f_tasks";
import DroppableList from "./DroppableList";

type DragDropContainerProps = {
  taskList: taskInt[];
  setTaskList: any;
  initialData: beautifulDnD;
  setInitialData: any;
};
const DragDropContainer = (props: DragDropContainerProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { my_user } = state.currentUser;
  const { xp, total_xp } = my_user;
  const achievements = state.currentAchievements;
  const currentTasks = state.currentTasks;
  const { taskList, setTaskList, initialData, setInitialData } = props;
  const dispatch = useDispatch();
  // const [initialData, setInitialData] = useState<beautifulDnD>({
  //   tasks: [],
  //   lists: [],
  //   listOrder: [],
  // });
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
    // console.log("start list=>", start);
    const finish = initialData.lists.find(
      (l) => l.id === destination.droppableId
    );
    // find index of the start list
    const startIndex = initialData.lists.findIndex((l) => l === start);
    // find index of the finish list
    const finishIndex = initialData.lists.findIndex((l) => l === finish);
    if (start === finish) {
      // ********** if task moved to same list ********** //
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
      // ********** if task moved to different list ********** //
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
      // const allTasks = awaited.concat(in_progress, completed);
      // setTaskList(allTasks);
      // dispatch(fillTasksAction()); // 👈HERE!
      if (newFinish.id === COMPLETED) {
        // ADD BAMBOO POINTS
        const value = parseInt(draggableId.split("/")[1]);
        setUserPoints(xp! + value);
        setUserTotalPoints(total_xp! + value);
      }
    }
  };
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
      achievements.list
    );
    const taskToMove = taskList.find((t) => t._id === draggableId);
    moveTaskBetweenStatus(
      sourceStatus,
      destinationStatus,
      taskToMove,
      currentTasks,
      dispatch
    );
  };
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskList]);
  useEffect(() => {}, [initialData]);
  return (
    <Row className='tasks-page'>
      <DragDropContext
        // onDragStart
        // onDragUpdate
        onDragEnd={onDragEnd}>
        {initialData?.listOrder.map((listId, i) => {
          const list = initialData.lists.find((l) => l.id === listId);
          const tasks = list!.taskIds.map((taskId) =>
            initialData.tasks!.find((t) => t!._id === taskId.slice(0, 24))
          );
          return <DroppableList key={listId!} list={list!} tasks={tasks!} />;
        })}
      </DragDropContext>
    </Row>
  );
};

export default DragDropContainer;
