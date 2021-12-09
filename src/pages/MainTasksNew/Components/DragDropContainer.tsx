import { Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { History } from "history";
import { useDispatch } from "react-redux";
import { beautifulDnD, taskInt, userInt } from "../../../typings/interfaces";
import { DragDropContext } from "react-beautiful-dnd";
import { AWAITED, COMPLETED, IN_PROGRESS } from "../../../utils/appConstants";
import DroppableList from "./DroppableList";
import { attemptUpdateTask } from "../../../utils/f_tasks";
import { fillTasksAction } from "../../../redux/actions/tasks";
import { setUserLoading, setUserPoints, setUserTotalPoints } from "../../../redux/actions/user";

type DragDropContainerProps = {
  user: userInt;
  taskList: taskInt[];
  history: History<unknown> | string[];
  setSideBarLoading: any;
};
const DragDropContainer = (props: DragDropContainerProps) => {
  const { taskList, user } = props;
  const dispatch = useDispatch();
  const [initialData, setInitialData] = useState<beautifulDnD>({
    tasks: [],
    lists: [],
    listOrder: [],
  });
  // const loadSideBar = async () => {
  //   console.log("LOAD SIDE BAR AT DRAG DROP");
  //   await setSideBarLoading(true);
  // };
  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;
    // if task moves outside droppable space
    if (!destination) {
      return;
    }
    // if task moved to same place as it started
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
      updateTaskStatus(draggableId, finish!.id);
      dispatch(fillTasksAction());
      if (newFinish.id === COMPLETED) {



        // ADD VALUE TO USER BAMBOO POINTS!!!!
        // NEED TO GET THE POINTS FROM SOMEWHERE!!!!
        // setUserPoints()
        // setUserTotalPoints()



        
      }
    }
  };
  const updateTaskStatus = async (draggableId: string, status: string) => {
    await attemptUpdateTask(draggableId, { status }, user, dispatch);
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
  }, [taskList]);
  useEffect(() => {
    // history.push("/tasks")
  }, [initialData]);
  return (
    <Row className='tasks-page'>
      <DragDropContext
        // onDragStart
        // onDragUpdate
        onDragEnd={onDragEnd}>
        {initialData?.listOrder.map((listId, i) => {
          const list = initialData.lists.find((l) => l.id === listId);
          const tasks = list!.taskIds.map((taskId) =>
            initialData.tasks!.find((t) => t!._id === taskId)
          );
          return <DroppableList key={listId!} list={list!} tasks={tasks!} />;
        })}
      </DragDropContext>
    </Row>
  );
};

export default DragDropContainer;
