import { History, Location } from "history";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { beautifulDnD, reduxStateInt, taskInt } from "../../typings/interfaces";
import { Container } from "react-bootstrap";
import TasksFilterRow from "./Components/TasksFilterRow";
import DragDropContainer from "./Components/DragDropContainer";
import "./styles.css";
import { AWAITED, COMPLETED, IN_PROGRESS } from "../../utils/appConstants";

type TasksPageProps = {
  history: History<unknown> | string[];
  location: Location<unknown>;
};
const TasksPage = (props: TasksPageProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const tasks = state.currentTasks;
  const { awaited, in_progress, completed } = tasks;
  const allTasks = awaited.concat(in_progress, completed);
  const { history, location } = props;
  const [taskList, setTaskList] = useState<taskInt[]>(allTasks);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskList]);
  return (
    <Container fluid>
      <TasksFilterRow
        taskList={taskList}
        setTaskList={setTaskList}
        initialData={initialData}
        setInitialData={setInitialData}
        history={history}
        location={location}
      />
      <DragDropContainer
        initialData={initialData}
        setInitialData={setInitialData}
        taskList={taskList}
        setTaskList={setTaskList}
      />
    </Container>
  );
};

export default TasksPage;
